/**
 * The Forem dispatcher.
 *
 * All the behaviour lives in the shared Dispatcher: near-match suggestions for
 * a mistyped id, the reason rather than a bare refusal for an excluded one,
 * and a named path parameter instead of a literal "{id}" reaching Forem. This
 * file only supplies the catalogue and the name of the browse tool.
 */

import { Dispatcher, type HttpClient } from "@nasdigital/mcp-server-core";
import { OPERATIONS, type CataloguedOperation } from "./generated/operations.js";

export const COVERED = OPERATIONS.filter((o) => o.status === "covered");

export function createDispatcher(http: HttpClient): Dispatcher<CataloguedOperation> {
  return new Dispatcher(http, OPERATIONS, "devto_list_operations");
}
