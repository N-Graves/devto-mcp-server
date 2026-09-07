/**
 * End-to-end proof that the fleet coupling is gone.
 *
 *   node scripts/smoke.mjs
 *
 * Speaks real MCP over stdio to the built server, with FLEET_BOARD_URL and
 * OPENCLAW_MCP_AGENT_ID explicitly cleared from the environment. In the
 * original server every write tool called a private task board at
 * 127.0.0.1:8420 and FAILED CLOSED, so this exact scenario - somebody else's
 * machine, no fleet running - left the server advertising tools that could
 * never succeed.
 *
 * Uses a dummy API key on purpose: every assertion here is about the server's
 * own behaviour, so nothing touches dev.to and nothing needs a real account.
 */
import { spawn } from "node:child_process";

const env = { ...process.env, DEVTO_API_KEY: "smoke-test-not-a-real-key" };
delete env.FLEET_BOARD_URL;
delete env.OPENCLAW_MCP_AGENT_ID;

const child = spawn("node", ["dist/index.js"], {
  cwd: new URL("..", import.meta.url).pathname,
  env,
  stdio: ["pipe", "pipe", "pipe"],
});

let stderr = "";
child.stderr.on("data", (d) => (stderr += d.toString()));

let buffer = "";
const pending = new Map();
child.stdout.on("data", (chunk) => {
  buffer += chunk.toString();
  let nl;
  while ((nl = buffer.indexOf("\n")) !== -1) {
    const line = buffer.slice(0, nl).trim();
    buffer = buffer.slice(nl + 1);
    if (!line) continue;
    try {
      const msg = JSON.parse(line);
      const resolve = pending.get(msg.id);
      if (resolve) {
        pending.delete(msg.id);
        resolve(msg);
      }
    } catch {
      /* not a protocol line */
    }
  }
});

let nextId = 1;
const send = (method, params) =>
  new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, resolve);
    child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n");
    setTimeout(() => reject(new Error(`${method} timed out`)), 10_000);
  });

const checks = [];
const check = (name, ok, detail = "") => {
  checks.push({ name, ok, detail });
  console.log(`${ok ? "✓" : "✗"} ${name}${detail && !ok ? `\n    ${detail}` : ""}`);
};

try {
  const init = await send("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "smoke", version: "0" },
  });
  check("initializes with no fleet board reachable", Boolean(init.result?.serverInfo));

  const listed = await send("tools/list", {});
  const tools = listed.result?.tools ?? [];
  check("advertises tools", tools.length > 0, `got ${tools.length}`);

  // The headline: agent_id was a REQUIRED field on every write tool, and the
  // private system's capability names were interpolated into the descriptions.
  const withAgentId = tools.filter(
    (t) =>
      JSON.stringify(t.inputSchema).includes("agent_id") ||
      /agent_id/.test(t.description ?? ""),
  );
  check("no tool asks for agent_id", withAgentId.length === 0, withAgentId.map((t) => t.name).join(", "));

  const leaky = tools.filter((t) =>
    /fleet board|capability|with_nate|nas_digital|misaki|\bjoel\b|HERALD|ECHO|LEDGER|NEXUS/i.test(
      `${t.name} ${t.description} ${JSON.stringify(t.inputSchema)}`,
    ),
  );
  check("no private vocabulary in the advertised surface", leaky.length === 0, leaky.map((t) => t.name).join(", "));

  const listOps = await send("tools/call", {
    name: "devto_list_operations",
    arguments: { search: "article" },
  });
  const opsText = listOps.result?.content?.[0]?.text ?? "";
  check("a read tool works with no fleet running", !listOps.result?.isError && opsText.includes("getArticles"));

  // An excluded operation must say WHY, not just refuse.
  const excluded = await send("tools/call", {
    name: "devto_call",
    arguments: { operation_id: "suspendUser" },
  });
  const exText = excluded.result?.content?.[0]?.text ?? "";
  check(
    "an excluded operation explains itself",
    excluded.result?.isError === true && /moderator|admin/i.test(exText),
    exText.slice(0, 120),
  );

  // Bad input must be caught before anything is sent.
  const bad = await send("tools/call", {
    name: "devto_create_article",
    arguments: { title: "x" },
  });
  check(
    "invalid arguments are refused with the field named",
    bad.result?.isError === true && /body_markdown/.test(bad.result.content[0].text),
    bad.result?.content?.[0]?.text?.slice(0, 120),
  );

  // A URL scheme a provider would fetch server-side must not get through.
  const badUrl = await send("tools/call", {
    name: "devto_create_article",
    arguments: { title: "x", body_markdown: "y", main_image: "javascript:alert(1)" },
  });
  check(
    "a dangerous URL scheme is refused",
    badUrl.result?.isError === true && /main_image/.test(badUrl.result.content[0].text),
  );

  check("nothing was written to stdout that is not protocol", !buffer.trim());
} finally {
  child.kill();
}

const failed = checks.filter((c) => !c.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} checks passed`);
if (failed.length) {
  console.log("\nserver stderr:\n" + stderr.split("\n").slice(0, 15).join("\n"));
  process.exit(1);
}
