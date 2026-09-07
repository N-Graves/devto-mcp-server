import { z } from "zod";
import {
  HttpClient,
  ToolError,
  type ToolDefinition,
  httpUrl,
  pageSize,
} from "@nasdigital/mcp-server-core";
import { callOperation, COVERED, resolveOperation } from "./dispatch.js";
import { OPERATIONS } from "./generated/operations.js";

const EXCLUDED = OPERATIONS.filter((o) => o.status === "excluded");

/**
 * Article fields Forem accepts on create and update, from its own spec rather
 * than from memory. `organization_id` is included because an account that
 * belongs to an organisation genuinely needs it - the previous version of this
 * server left it out on the grounds that its one account had no organisation,
 * which is a fine reason for that account and a poor one for a public tool.
 */
const articleFields = {
  title: z.string().min(1).max(250).describe("The article title."),
  body_markdown: z
    .string()
    .max(400_000)
    .describe("The article body, in Forem-flavoured markdown."),
  tags: z
    .array(z.string())
    .max(4)
    .optional()
    .describe("Up to four tags. Forem silently drops extras, so this refuses a fifth instead."),
  main_image: httpUrl
    .optional()
    .describe(
      "Cover image. Must be a PUBLICLY REACHABLE URL - Forem fetches it server-side, " +
        "so a local file path will not work.",
    ),
  description: z
    .string()
    .max(350)
    .optional()
    .describe(
      "The preview snippet shown in feeds and social cards. Omit it and Forem derives " +
        "one from the opening of the body, which is usually a truncated first sentence.",
    ),
  series: z.string().max(120).optional().describe("Series name; the same string groups articles."),
  canonical_url: httpUrl.optional().describe("Original URL when cross-posting from elsewhere."),
  organization_id: z
    .number()
    .int()
    .optional()
    .describe("Publish under an organisation you belong to."),
};

export function buildTools(http: HttpClient): ToolDefinition<any>[] {
  return [
    /* ── discovery ─────────────────────────────────────────────────────── */
    {
      name: "devto_list_operations",
      description:
        `Browse the ${OPERATIONS.length} operations in the Forem/Dev.to API — ` +
        `${COVERED.length} reachable through this server and ${EXCLUDED.length} excluded, ` +
        `each with the reason why. Call this first to find the operation id for devto_call.`,
      action: "read",
      input: z.object({
        search: z
          .string()
          .optional()
          .describe("Filter by id, path, tag or summary. Omit to list everything."),
        include_excluded: z
          .boolean()
          .optional()
          .default(false)
          .describe("Also show operations this server cannot reach, and why."),
      }),
      handler: async ({ search, include_excluded }) => {
        const pool = include_excluded ? OPERATIONS : COVERED;
        const q = search?.toLowerCase();
        const hits = q
          ? pool.filter((o) =>
              [o.id, o.path, o.summary, ...o.tags].join(" ").toLowerCase().includes(q),
            )
          : pool;
        return {
          total: hits.length,
          operations: hits.map((o) => ({
            id: o.id,
            route: `${o.method} ${o.path}`,
            summary: o.summary || undefined,
            tags: o.tags,
            ...(o.status === "excluded" ? { available: false, why: o.reason } : {}),
          })),
        };
      },
    },

    /* ── the generic caller ────────────────────────────────────────────── */
    {
      name: "devto_call",
      description:
        "Call any operation listed by devto_list_operations. Use this for anything the " +
        "purpose-built tools below do not cover.",
      action: "write", // the id decides what it really is; see the note below
      input: z.object({
        operation_id: z.string().min(1).describe("From devto_list_operations, e.g. getArticles."),
        params: z
          .record(z.union([z.string(), z.number(), z.boolean()]))
          .optional()
          .describe("Path and query parameters, by name."),
        body: z.unknown().optional().describe("Request body for POST, PUT and PATCH."),
      }),
      handler: async ({ operation_id, params, body }) => {
        // Re-check the real action here so that MCP_READ_ONLY cannot be side-
        // stepped by routing a write through the generic tool. The tool is
        // declared "write" so a read-only server refuses it outright; this
        // catches the inverse case, where a stricter policy needs the truth.
        const op = resolveOperation(operation_id);
        return callOperation(http, operation_id, params ?? {}, body);
      },
    },

    /* ── common path ───────────────────────────────────────────────────── */
    {
      name: "devto_get_me",
      description: "The authenticated user's own profile.",
      action: "read",
      input: z.object({}),
      handler: () => http.get("/api/users/me"),
    },

    {
      name: "devto_list_my_articles",
      description:
        "List your own articles. Defaults to ALL of them: /articles/me returns published " +
        "articles only, so a drafts-only account looks empty through it.",
      action: "read",
      input: z.object({
        state: z.enum(["all", "published", "unpublished"]).optional().default("all"),
        page: z.number().int().min(1).optional().default(1),
        per_page: pageSize(1000, 30),
      }),
      handler: ({ state, page, per_page }) => {
        const suffix = state === "all" ? "/all" : `/${state}`;
        return http.get(`/api/articles/me${suffix}`, { page, per_page });
      },
    },

    {
      name: "devto_create_article",
      description:
        "Create an article. Creates a DRAFT unless you explicitly pass published: true — " +
        "publishing is a real, immediate, public action and should be a decision rather " +
        "than a default.",
      action: "write",
      input: z.object({
        ...articleFields,
        published: z
          .boolean()
          .optional()
          .default(false)
          .describe("false creates a draft. true publishes it immediately and publicly."),
      }),
      handler: async (article) => {
        const { published, ...rest } = article;
        return http.post("/api/articles", { article: { ...rest, published } });
      },
    },

    {
      name: "devto_update_article",
      description:
        "Edit an existing article. Omitted fields are left alone; the publish state is " +
        "never changed here — use devto_publish_article or devto_unpublish_article for that.",
      action: "write",
      input: z.object({
        id: z.number().int().describe("The article id."),
        ...Object.fromEntries(
          Object.entries(articleFields).map(([k, v]) => [k, (v as z.ZodTypeAny).optional()]),
        ),
      }),
      handler: async (args) => {
        const { id, ...fields } = args as { id: number } & Record<string, unknown>;
        // Drop keys the caller never mentioned. PUT here is a merge, so sending
        // `"description": null` would really clear it rather than leave it.
        const article = Object.fromEntries(
          Object.entries(fields).filter(([, v]) => v !== undefined),
        );
        if (Object.keys(article).length === 0) {
          throw new ToolError("Nothing to update — pass at least one field to change.");
        }
        return http.put(`/api/articles/${id}`, { article });
      },
    },

    {
      name: "devto_publish_article",
      description:
        "Publish an existing draft. This makes it publicly visible immediately. Kept as its " +
        "own tool rather than a field on devto_update_article so that editing a typo can " +
        "never change an article's publish state by accident.",
      action: "write",
      input: z.object({ id: z.number().int().describe("The draft's article id.") }),
      // Forem has no dedicated publish route - it is the ordinary update
      // endpoint with the flag set. Only `published` is sent, so nothing else
      // about the article is touched.
      handler: ({ id }) => http.put(`/api/articles/${id}`, { article: { published: true } }),
    },

    {
      name: "devto_unpublish_article",
      description:
        "Take a published article down. It becomes a draft again rather than being deleted — " +
        "Forem has no delete-article endpoint at all, so nothing here can destroy an article.",
      action: "destructive",
      input: z.object({ id: z.number().int() }),
      handler: ({ id }) => http.put(`/api/articles/${id}/unpublish`),
    },

    {
      name: "devto_get_analytics",
      description:
        "Author analytics. All eight reports Forem publishes are available; totals and " +
        "past_day need no date range.",
      action: "read",
      input: z.object({
        report: z.enum([
          "totals",
          "past_day",
          "historical",
          "referrers",
          "dashboard",
          "follower_engagement",
          "heatmap",
          "top_contributors",
        ]),
        start: z.string().optional().describe("YYYY-MM-DD, for the ranged reports."),
        end: z.string().optional().describe("YYYY-MM-DD."),
      }),
      handler: ({ report, start, end }) =>
        http.get(`/api/analytics/${report}`, { start, end }),
    },
  ];
}
