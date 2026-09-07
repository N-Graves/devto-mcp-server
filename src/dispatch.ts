/**
 * The generic caller: one tool that can reach every covered operation.
 *
 * 49 operations behind one tool rather than 49 tools, because every tool's
 * name and description is paid for in the model's context window on every
 * single turn, whether or not it is used. The four common-path operations get
 * first-class tools in tools.ts; everything else is reachable here.
 */

import { HttpClient, ToolError } from "@nasdigital/mcp-server-core";
import { OPERATIONS, OPERATIONS_BY_ID, type ForemOperation } from "./generated/operations.js";

export const COVERED = OPERATIONS.filter((o) => o.status === "covered");

/** Build the concrete path, refusing anything left unresolved. */
export function buildPath(op: ForemOperation, params: Record<string, unknown>): string {
  let path = op.path;
  for (const name of op.pathParams) {
    const value = params[name];
    if (value === undefined || value === null || `${value}` === "") {
      throw new ToolError(
        `${op.id} needs the path parameter "${name}". ` +
          `Its route is ${op.method} ${op.path}.`,
      );
    }
    path = path.replace(`{${name}}`, encodeURIComponent(String(value)));
  }
  // A template that still has braces in it means the spec declares a parameter
  // the catalogue did not capture. Better to refuse than to send Forem a
  // literal "{id}" and get back an opaque 404.
  const unresolved = path.match(/\{([^}]+)\}/);
  if (unresolved) {
    throw new ToolError(
      `${op.id} has an unresolved path parameter "${unresolved[1]}". This is a bug in the operation catalogue.`,
    );
  }
  return path;
}

export function resolveOperation(id: string): ForemOperation {
  const op = OPERATIONS_BY_ID.get(id);
  if (!op) {
    // Suggest rather than just refuse - the id is long and easy to mistype.
    const near = COVERED.map((o) => o.id)
      .filter((k) => k.toLowerCase().includes(id.toLowerCase().slice(0, 6)))
      .slice(0, 5);
    throw new ToolError(
      `No operation "${id}". ` +
        (near.length
          ? `Did you mean: ${near.join(", ")}? `
          : "") +
        `Call devto_list_operations to see all ${COVERED.length}.`,
    );
  }
  if (op.status === "excluded") {
    throw new ToolError(
      `${id} is not available through this server. ${op.reason} ` +
        `It is listed in the catalogue so the omission is visible rather than silent.`,
    );
  }
  return op;
}

export async function callOperation(
  http: HttpClient,
  id: string,
  params: Record<string, unknown> = {},
  body?: unknown,
): Promise<unknown> {
  const op = resolveOperation(id);
  const path = buildPath(op, params);

  // Anything that is not a path parameter becomes a query parameter. Sending
  // an unknown one is harmless - Forem ignores it - and the alternative is
  // silently dropping something the caller meant.
  const query: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) {
    if (op.pathParams.includes(k)) continue;
    if (v === undefined || v === null || v === "") continue;
    query[k] = v as string | number | boolean;
  }

  if (op.hasBody && body === undefined && op.method !== "GET") {
    throw new ToolError(`${id} (${op.method} ${op.path}) needs a request body.`);
  }

  return http.request(path, {
    method: op.method,
    query,
    body: op.method === "GET" ? undefined : body,
  });
}
