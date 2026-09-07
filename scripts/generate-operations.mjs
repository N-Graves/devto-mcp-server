/**
 * Generate src/generated/operations.ts from the vendored Forem OpenAPI spec.
 *
 *   node scripts/generate-operations.mjs
 *
 * The catalogue is generated rather than hand-written for the same reason the
 * spec is vendored rather than fetched at test time: when Forem ships a new
 * endpoint, the change should arrive as a reviewable diff in a pull request,
 * not as a silent gap between what the README claims and what the server does.
 *
 * To refresh:
 *   curl -o vendor/forem-openapi.json \
 *     https://raw.githubusercontent.com/forem/forem/main/swagger/v1/api_v1.json
 *   node scripts/generate-operations.mjs
 *   npm test        # the coverage test will name anything newly unclassified
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const spec = JSON.parse(readFileSync(join(ROOT, "vendor/forem-openapi.json"), "utf8"));

const VERBS = new Set(["get", "post", "put", "patch", "delete"]);

/**
 * Why an operation is not reachable from this server.
 *
 * These are exclusions with stated reasons, not omissions. Everything here was
 * checked against Forem's own spec and dev.to's hosted behaviour rather than
 * assumed - the coverage test refuses an exclusion that gives no reason.
 */
const EXCLUSIONS = [
  {
    match: (op) => op.tags.includes("admin"),
    reason:
      "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; " +
      "hosted dev.to does not issue one to ordinary accounts.",
  },
  {
    match: (op) => op.path.startsWith("/api/segments"),
    reason:
      "Audience segments are a Forem instance feature for billboard targeting, " +
      "not available to a hosted dev.to author account.",
  },
  {
    match: (op) => op.path.startsWith("/api/billboards"),
    reason:
      "Billboards are instance-level advertising units, administered by the Forem " +
      "operator rather than by an author.",
  },
  {
    match: (op) => op.path.startsWith("/api/surveys"),
    reason: "Surveys are an instance feature, created by the Forem operator.",
  },
  {
    match: (op) => op.path.startsWith("/api/concepts"),
    reason: "Concepts are an instance-level taxonomy feature, not author-facing.",
  },
  {
    match: (op) => op.path.startsWith("/api/health_checks"),
    reason:
      "Instance health checks, for the operator of a Forem deployment. Reports on " +
      "the server, not on anything belonging to the authenticated account.",
  },
  {
    match: (op) => op.path.startsWith("/api/agent_sessions"),
    reason:
      "Forem's own agent-session feature. Unrelated to the Model Context Protocol " +
      "and not part of the authoring surface this server exposes.",
  },
  {
    // The route is /api/v1/openapi.json, not /api/openapi - an earlier version
    // of this rule matched nothing at all, which the covered-operations listing
    // made obvious and the operation count alone would not have.
    match: (op) => op.path.includes("openapi"),
    reason: "Serves the spec document itself, which is already vendored in this repo.",
  },
  {
    /**
     * Moderation actions. Forem tags these `users` rather than `admin`, so the
     * tag rule above does not catch them - but suspending an account, marking
     * someone as spam, or unpublishing all of a user's posts are moderator
     * powers, not things an ordinary author's API key can do.
     *
     * Excluded rather than exposed-and-failing, which is the lesson from the
     * LinkedIn comment endpoints in this family: a tool that 403s only after
     * the caller has committed to it is worse than one that was never offered.
     * Revisit if this server is ever pointed at an account that genuinely holds
     * moderator privileges on the instance.
     */
    match: (op) =>
      /^\/api\/users\/\{[^}]+\}\/(limited|spam|suspend|trusted|unpublish)$/.test(op.path),
    reason:
      "Moderation action. Requires moderator or admin privileges on the Forem " +
      "instance, which a standard dev.to author API key does not carry.",
  },
  {
    // Badges are instance-level awards. Reading them is fine; minting one or
    // awarding it to somebody is the operator's job.
    match: (op) =>
      op.method.toUpperCase() !== "GET" &&
      (op.path.startsWith("/api/badges") || op.path.startsWith("/api/badge_achievements")),
    reason:
      "Creating, editing or awarding badges is an instance-administration action " +
      "on Forem. The read endpoints are covered.",
  },
  {
    // Same shape: listing organisations is public, creating one is not an API
    // action available to an author account on hosted dev.to.
    match: (op) =>
      op.method.toUpperCase() !== "GET" && op.path.startsWith("/api/organizations"),
    reason:
      "Creating, editing or deleting an organisation requires instance " +
      "administration. The read endpoints are covered.",
  },
  {
    match: (op) => op.path.startsWith("/api/subforems"),
    reason: "Subforems are an instance-level structure created by the Forem operator.",
  },
  {
    match: (op) => op.path.startsWith("/api/recommended_articles_lists"),
    reason: "Curated recommendation lists are administered at instance level.",
  },
  {
    match: (op) => op.path.startsWith("/api/events"),
    reason: "Instance events are created by the Forem operator, not by an author.",
  },
  {
    match: (op) => op.path.startsWith("/api/pages"),
    reason: "Static instance pages, administered by the Forem operator.",
  },
];

const rows = [];
for (const [path, item] of Object.entries(spec.paths ?? {})) {
  for (const [verb, op] of Object.entries(item)) {
    if (!VERBS.has(verb.toLowerCase())) continue;

    const entry = {
      id:
        op.operationId ||
        // Not every Forem operation declares an operationId (all eight analytics
        // endpoints omit it), so derive a stable one from the route.
        `${verb}${path.replace(/^\/api/, "").replace(/[{}]/g, "").split(/[\/_-]/).filter(Boolean).map((s) => s[0].toUpperCase() + s.slice(1)).join("")}`,
      method: verb.toUpperCase(),
      path,
      tags: op.tags ?? [],
      summary: (op.summary || op.description || "").split("\n")[0].trim(),
      // A path parameter is required; everything else the caller may omit.
      pathParams: (op.parameters ?? [])
        .filter((p) => p.in === "path")
        .map((p) => p.name),
      queryParams: (op.parameters ?? [])
        .filter((p) => p.in === "query")
        .map((p) => p.name),
      hasBody: Boolean(op.requestBody),
    };

    const excluded = EXCLUSIONS.find((e) => e.match(entry));
    entry.status = excluded ? "excluded" : "covered";
    if (excluded) entry.reason = excluded.reason;
    else entry.tool = entry.method === "GET" ? "devto_call" : "devto_call";

    rows.push(entry);
  }
}

rows.sort((a, b) => (a.path === b.path ? a.method.localeCompare(b.method) : a.path.localeCompare(b.path)));

const covered = rows.filter((r) => r.status === "covered");
const header = `/**
 * GENERATED FILE - do not edit by hand.
 *
 * Produced by scripts/generate-operations.mjs from vendor/forem-openapi.json
 * (Forem API V1, OpenAPI ${spec.openapi}).
 *
 * ${rows.length} operations: ${covered.length} reachable through this server,
 * ${rows.length - covered.length} excluded with a stated reason.
 *
 * The coverage test compares this against the vendored spec, so an endpoint
 * Forem adds shows up as a test failure rather than as a README that has
 * quietly stopped being true.
 */
import type { Operation } from "@nasdigital/mcp-server-core";

export interface ForemOperation extends Operation {
  tags: string[];
  summary: string;
  pathParams: string[];
  queryParams: string[];
  hasBody: boolean;
}

export const OPERATIONS: ForemOperation[] = ${JSON.stringify(rows, null, 2)};

export const OPERATIONS_BY_ID = new Map(OPERATIONS.map((o) => [o.id, o]));
`;

mkdirSync(join(ROOT, "src/generated"), { recursive: true });
writeFileSync(join(ROOT, "src/generated/operations.ts"), header, "utf8");

console.log(`${rows.length} operations written`);
console.log(`  covered:  ${covered.length}`);
console.log(`  excluded: ${rows.length - covered.length}`);
const byReason = {};
for (const r of rows.filter((r) => r.status === "excluded")) {
  byReason[r.reason.slice(0, 48)] = (byReason[r.reason.slice(0, 48)] ?? 0) + 1;
}
for (const [reason, n] of Object.entries(byReason)) console.log(`    ${String(n).padStart(3)} ${reason}...`);
