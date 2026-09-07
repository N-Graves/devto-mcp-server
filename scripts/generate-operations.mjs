/**
 * Generate src/generated/operations.ts from the vendored Forem OpenAPI spec.
 *
 *   npm run generate
 *
 * The spec is vendored rather than fetched at test time so that when Forem
 * ships an endpoint the change arrives as a reviewable diff, not as a silent
 * gap between what the README claims and what the server does.
 *
 * To refresh:
 *   curl -o vendor/forem-openapi.json \
 *     https://raw.githubusercontent.com/forem/forem/main/swagger/v1/api_v1.json
 *   npm run generate && npm test
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { buildCatalogue, renderCatalogue, reportBuild } from "@nasdigitaluk/mcp-server-core/generate";

const ROOT = new URL("..", import.meta.url).pathname;
const spec = JSON.parse(readFileSync(join(ROOT, "vendor/forem-openapi.json"), "utf8"));

/**
 * Forem's API is one spec serving both hosted dev.to and self-hosted
 * instances, so much of it belongs to whoever operates the instance rather
 * than whoever writes on it.
 *
 * These are exclusions with stated reasons, not omissions - the coverage test
 * refuses an exclusion that gives none, and the generator reports any rule
 * that matches nothing, because a dead rule is otherwise invisible.
 */
const exclusions = [
  {
    label: "moderation actions",
    /**
     * Forem tags these `users`, not `admin`, so the tag rule below sails past
     * them - and they suspend accounts, mark people as spam, and unpublish
     * other people's articles. Excluded rather than exposed-and-failing: a
     * tool that 403s only after the caller has committed to it is worse than
     * one that was never offered.
     */
    match: (op) => /^\/api\/users\/\{[^}]+\}\/(limited|spam|suspend|trusted|unpublish)$/.test(op.path),
    reason:
      "Moderation action. Requires moderator or admin privileges on the Forem instance, " +
      "which a standard dev.to author API key does not carry.",
  },
  {
    label: "admin-tagged",
    match: (op) => op.tags.includes("admin"),
    reason:
      "Admin endpoint. Requires an admin API key on a self-hosted Forem instance; " +
      "hosted dev.to does not issue one to ordinary accounts.",
  },
  {
    label: "badge/organisation mutations",
    match: (op) =>
      op.method !== "GET" &&
      (op.path.startsWith("/api/badges") ||
        op.path.startsWith("/api/badge_achievements") ||
        op.path.startsWith("/api/organizations")),
    reason:
      "Minting or awarding a badge, and creating or deleting an organisation, are " +
      "instance-administration actions. The read endpoints are covered.",
  },
  {
    label: "instance features",
    match: (op) =>
      /^\/api\/(segments|billboards|surveys|concepts|pages|events|subforems|recommended_articles_lists)/.test(
        op.path,
      ),
    reason:
      "An instance-level feature, created and administered by the Forem operator rather " +
      "than by an author.",
  },
  {
    label: "health checks",
    match: (op) => op.path.startsWith("/api/health_checks"),
    reason:
      "Instance health checks, for the operator of a Forem deployment. Reports on the " +
      "server, not on anything belonging to the authenticated account.",
  },
  {
    label: "forem agent sessions",
    match: (op) => op.path.startsWith("/api/agent_sessions"),
    reason:
      "Forem's own agent-session feature. Unrelated to the Model Context Protocol and " +
      "not part of the authoring surface this server exposes.",
  },
  {
    label: "the spec endpoint",
    // The route is /api/v1/openapi.json, not /api/openapi - an earlier version
    // of this rule matched nothing at all and nobody noticed, which is why the
    // generator now reports dead rules.
    match: (op) => op.path.includes("openapi"),
    reason: "Serves the spec document itself, which is already vendored in this repo.",
  },
];

const result = buildCatalogue(spec, {
  stripPrefix: "/api",
  exclusions,
  toolFor: () => "devto_call",
});

const header = `/**
 * GENERATED FILE - do not edit by hand.
 *
 * Produced by scripts/generate-operations.mjs from vendor/forem-openapi.json
 * (Forem API V1, OpenAPI ${spec.openapi}).
 *
 * ${result.operations.length} operations: ${result.covered} reachable through this server,
 * ${result.excluded} excluded with a stated reason.
 */`;

mkdirSync(join(ROOT, "src/generated"), { recursive: true });
writeFileSync(join(ROOT, "src/generated/operations.ts"), renderCatalogue(result, header), "utf8");
reportBuild(result);
