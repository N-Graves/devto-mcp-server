import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { checkCoverage, formatCoverage, operationsFromOpenApi } from "@nasdigital/mcp-server-core";
import { OPERATIONS } from "../src/generated/operations.js";
import { COVERED } from "../src/dispatch.js";

const spec = JSON.parse(
  readFileSync(join(import.meta.dirname, "../vendor/forem-openapi.json"), "utf8"),
);

describe("API coverage", () => {
  it("accounts for every operation Forem publishes", () => {
    // The point of this test: when Forem ships a new endpoint, this goes red
    // instead of the README quietly becoming untrue. If it fails after a spec
    // refresh, classify the new operation in scripts/generate-operations.mjs
    // and re-run `npm run generate`.
    const report = checkCoverage(OPERATIONS, operationsFromOpenApi(spec));
    expect(report.ok, formatCoverage(report)).toBe(true);
  });

  it("gives a reason for every exclusion", () => {
    const excluded = OPERATIONS.filter((o) => o.status === "excluded");
    const silent = excluded.filter((o) => !o.reason?.trim());
    expect(silent.map((o) => o.id)).toEqual([]);
    // A server that excluded everything would trivially satisfy the check above.
    expect(excluded.length).toBeGreaterThan(0);
    expect(COVERED.length).toBeGreaterThan(0);
  });

  it("names a tool for every covered operation", () => {
    expect(COVERED.filter((o) => !o.tool).map((o) => o.id)).toEqual([]);
  });

  it("excludes moderation endpoints, which need privileges an author key lacks", () => {
    // These are tagged `users` rather than `admin` in Forem's own spec, so a
    // tag-based rule alone misses them - and they suspend accounts, mark people
    // as spam, and unpublish other people's articles.
    for (const path of [
      "/api/users/{id}/suspend",
      "/api/users/{id}/spam",
      "/api/users/{id}/limited",
      "/api/users/{id}/trusted",
      "/api/users/{id}/unpublish",
    ]) {
      const ops = OPERATIONS.filter((o) => o.path === path);
      expect(ops.length, `${path} should exist in the spec`).toBeGreaterThan(0);
      for (const op of ops) {
        expect(op.status, `${op.method} ${path} must not be reachable`).toBe("excluded");
      }
    }
  });

  it("keeps the author-facing writes reachable", () => {
    // The mirror of the test above: excluding aggressively is only correct if
    // the things an author actually needs survive it.
    const writes = COVERED.filter((o) => o.method !== "GET").map((o) => `${o.method} ${o.path}`);
    expect(writes).toContain("POST /api/articles");
    expect(writes).toContain("PUT /api/articles/{id}");
    expect(writes).toContain("PUT /api/articles/{id}/unpublish");
  });

  it("reaches every analytics report Forem offers", () => {
    const analytics = OPERATIONS.filter((o) => o.path.startsWith("/api/analytics"));
    expect(analytics.length).toBe(8);
    expect(analytics.every((o) => o.status === "covered")).toBe(true);
  });
});
