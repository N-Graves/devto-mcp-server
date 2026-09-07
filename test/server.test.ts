import { describe, it, expect, vi } from "vitest";
import { HttpClient, ToolError } from "@nasdigitaluk/mcp-server-core";
import { buildTools } from "../src/tools.js";
import { createDispatcher } from "../src/dispatch.js";
import { OPERATIONS_BY_ID } from "../src/generated/operations.js";

/** Records what would have been sent, and answers with a canned body. */
function recordingClient() {
  const calls: { url: string; method: string; body?: string }[] = [];
  const http = new HttpClient({
    baseUrl: "https://dev.to",
    fetchImpl: (async (url: string, opts: RequestInit = {}) => {
      calls.push({ url, method: opts.method ?? "GET", body: opts.body as string | undefined });
      return new Response('{"ok":true}', {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }) as unknown as typeof fetch,
  });
  return { http, calls };
}

const toolNamed = (http: HttpClient, name: string) => {
  const t = buildTools(http).find((x) => x.name === name);
  if (!t) throw new Error(`no tool ${name}`);
  return t;
};

/**
 * The dispatcher's own behaviour - near matches, excluded reasons, path
 * building - is covered in @nasdigitaluk/mcp-server-core. These check that
 * THIS catalogue is wired to it correctly, which is a different question.
 */
describe("the Forem catalogue is wired to the dispatcher", () => {
  it("refuses an unknown operation and suggests real Forem ids", () => {
    const { http } = recordingClient();
    expect(() => createDispatcher(http).resolve("getArticl")).toThrow(/getArticles/);
  });

  it("gives Forem's own reason for an excluded operation", () => {
    const { http } = recordingClient();
    const suspend = [...OPERATIONS_BY_ID.values()].find((o) => o.path.endsWith("/suspend"))!;
    expect(() => createDispatcher(http).resolve(suspend.id)).toThrow(/moderator or admin privileges/i);
  });

  it("resolves a real Forem route, prefix and all", async () => {
    const { http, calls } = recordingClient();
    await createDispatcher(http).call("getArticleById", { id: 42 });
    expect(calls[0]!.url).toContain("/api/articles/42");
  });

  it("passes Forem's documented query parameters through", async () => {
    const { http, calls } = recordingClient();
    await createDispatcher(http).call("getArticles", { tag: "typescript", per_page: 5 });
    expect(calls[0]!.url).toContain("tag=typescript");
    expect(calls[0]!.url).toContain("per_page=5");
  });
});

describe("tools", () => {
  it("creates a draft unless publishing is asked for explicitly", async () => {
    const { http, calls } = recordingClient();
    await toolNamed(http, "devto_create_article").handler({
      title: "T",
      body_markdown: "B",
      published: false,
    });
    expect(JSON.parse(calls[0]!.body!)).toEqual({
      article: { title: "T", body_markdown: "B", published: false },
    });
  });

  it("will publish on create when told to, which the fleet version could not", async () => {
    // The private version hard-coded published:false with no way to override,
    // which is right for that system and wrong for a general-purpose tool.
    const { http, calls } = recordingClient();
    await toolNamed(http, "devto_create_article").handler({
      title: "T",
      body_markdown: "B",
      published: true,
    });
    expect(JSON.parse(calls[0]!.body!).article.published).toBe(true);
  });

  it("never changes publish state through an ordinary edit", async () => {
    const { http, calls } = recordingClient();
    await toolNamed(http, "devto_update_article").handler({ id: 1, title: "New" });
    const sent = JSON.parse(calls[0]!.body!);
    expect(sent.article).toEqual({ title: "New" });
    expect("published" in sent.article).toBe(false);
  });

  it("drops fields the caller never mentioned, because PUT here is a merge", async () => {
    const { http, calls } = recordingClient();
    await toolNamed(http, "devto_update_article").handler({
      id: 1,
      title: "New",
      description: undefined,
    });
    // Sending description:null would really clear it on Forem's side.
    expect(JSON.parse(calls[0]!.body!).article).toEqual({ title: "New" });
  });

  it("refuses an update with nothing in it", async () => {
    const { http } = recordingClient();
    await expect(toolNamed(http, "devto_update_article").handler({ id: 1 })).rejects.toBeInstanceOf(
      ToolError,
    );
  });

  it("publishes by setting only the flag, touching nothing else", async () => {
    const { http, calls } = recordingClient();
    await toolNamed(http, "devto_publish_article").handler({ id: 7 });
    expect(calls[0]!.url).toContain("/api/articles/7");
    expect(JSON.parse(calls[0]!.body!)).toEqual({ article: { published: true } });
  });

  it("lists ALL of the author's articles by default", async () => {
    // /articles/me returns published only, so a drafts-only account looks empty.
    const { http, calls } = recordingClient();
    await toolNamed(http, "devto_list_my_articles").handler({
      state: "all",
      page: 1,
      per_page: 30,
    });
    expect(calls[0]!.url).toContain("/api/articles/me/all");
  });

  it("marks unpublishing destructive so MCP_NO_DESTRUCTIVE catches it", () => {
    const { http } = recordingClient();
    expect(toolNamed(http, "devto_unpublish_article").action).toBe("destructive");
  });

  it("advertises a small surface despite covering the whole API", () => {
    const { http } = recordingClient();
    const tools = buildTools(http);
    // Every tool description is paid for in context on every turn, so 49
    // operations behind 9 tools is the point of the dispatcher.
    expect(tools.length).toBeLessThanOrEqual(10);
  });

  it("explains an excluded operation when asked, rather than hiding it", async () => {
    const { http } = recordingClient();
    const res = (await toolNamed(http, "devto_list_operations").handler({
      search: "suspend",
      include_excluded: true,
    })) as { operations: { available?: boolean; why?: string }[] };
    expect(res.operations.length).toBeGreaterThan(0);
    expect(res.operations[0]!.available).toBe(false);
    expect(res.operations[0]!.why).toMatch(/moderator/i);
  });
});
