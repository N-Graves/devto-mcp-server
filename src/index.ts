#!/usr/bin/env node
/**
 * devto-mcp-server — a Model Context Protocol server for the Dev.to / Forem API.
 *
 *   DEVTO_API_KEY=... npx @nasdigital/devto-mcp
 *
 * Configuration:
 *   DEVTO_API_KEY        required. dev.to → Settings → Extensions → API Keys.
 *   DEVTO_BASE_URL       optional. Point at a self-hosted Forem instance.
 *                        Defaults to https://dev.to
 *   MCP_READ_ONLY=1      optional. Refuse anything that changes state.
 *   MCP_NO_DESTRUCTIVE=1 optional. Allow writes, refuse unpublishing.
 *
 * Nothing else is needed. There is no account to register, no capability to
 * grant and no service to run alongside it — the API key is the authorization.
 */

import {
  HttpClient,
  authorizerFromEnv,
  requireEnv,
  runServer,
} from "@nasdigital/mcp-server-core";
import { buildTools } from "./tools.js";
import { COVERED } from "./dispatch.js";
import { OPERATIONS } from "./generated/operations.js";

const VERSION = "1.0.0";

async function main() {
  const apiKey = requireEnv(
    "DEVTO_API_KEY",
    "Create one at https://dev.to/settings/extensions under API Keys.",
  );

  const http = new HttpClient({
    baseUrl: process.env.DEVTO_BASE_URL || "https://dev.to",
    headers: {
      "api-key": apiKey,
      Accept: "application/vnd.forem.api-v1+json",
    },
    // Forem is generally quick; a request still running after 30s is stuck
    // rather than slow.
    timeoutMs: 30_000,
  });

  await runServer({
    name: "devto-mcp-server",
    version: VERSION,
    authorizer: authorizerFromEnv(),
    tools: buildTools(http),
  });

  console.error(
    `Forem API: ${COVERED.length} of ${OPERATIONS.length} operations reachable, ` +
      `${OPERATIONS.length - COVERED.length} excluded with stated reasons.`,
  );
}

main().catch((err) => {
  // Startup failures are for the operator, so they go to stderr in full - this
  // is the one place detail is wanted, because nothing has connected yet and
  // no model will ever see it.
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
