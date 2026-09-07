# devto-mcp-server

A [Model Context Protocol](https://modelcontextprotocol.io) server for the **Dev.to / Forem API**.

Every one of Forem's 139 published operations is accounted for: 49 are reachable through this server, and the other 90 are listed with the reason they are not. That claim is checked by a test against Forem's own OpenAPI spec, so when Forem ships an endpoint the build goes red rather than the README quietly becoming untrue.

MIT licensed.

## Install

```bash
npm install -g @nasdigital/devto-mcp
```

Get an API key from **dev.to → Settings → Extensions → API Keys**.

```json
{
  "mcpServers": {
    "devto": {
      "command": "devto-mcp",
      "env": { "DEVTO_API_KEY": "your-key-here" }
    }
  }
}
```

That is the whole setup. There is no account to register, no capability to grant and no service to run alongside it — the API key is the authorization.

## Configuration

| Variable | |
|---|---|
| `DEVTO_API_KEY` | **Required.** |
| `DEVTO_BASE_URL` | Point at a self-hosted Forem instance. Defaults to `https://dev.to`. |
| `MCP_READ_ONLY=1` | Refuse anything that changes state. |
| `MCP_NO_DESTRUCTIVE=1` | Allow writes, refuse unpublishing. |

## Tools

Nine tools cover 49 operations. That ratio is deliberate: every tool's name and description is paid for in the model's context window on every turn, used or not, so the common path gets purpose-built tools and the long tail goes through one dispatcher.

| Tool | |
|---|---|
| `devto_list_operations` | Browse the catalogue, including what is excluded and why. Start here. |
| `devto_call` | Call any covered operation by id. |
| `devto_get_me` | The authenticated profile. |
| `devto_list_my_articles` | Your own articles. Defaults to **all**, see below. |
| `devto_create_article` | Create. Drafts unless you ask otherwise. |
| `devto_update_article` | Edit content. Never changes publish state. |
| `devto_publish_article` | Publish a draft. Its own tool, deliberately. |
| `devto_unpublish_article` | Take one down. Marked destructive. |
| `devto_get_analytics` | All eight of Forem's reports. |

### Three behaviours worth knowing

**Listing your articles defaults to `all`.** `/articles/me` returns *published* articles only. An account whose work is all drafts looks completely empty through it, which is exactly what happened in the server this was rewritten from — six real drafts, and the tool reported two articles.

**Creating an article makes a draft.** Publishing is immediate and public, so it is a decision rather than a default: pass `published: true`, or use `devto_publish_article` afterwards.

**Editing never changes publish state.** Publishing is a separate tool so that fixing a typo can never take a live article down, and unpublishing can never happen as a side effect of an edit.

## What is excluded, and why

Forem's API is one spec serving both hosted dev.to and self-hosted instances, so a large part of it is for whoever operates the instance rather than whoever writes on it.

| Excluded | Count | Why |
|---|---|---|
| Admin-tagged endpoints | 26 | Need an admin key on a self-hosted Forem. |
| Moderation actions | 8 | Suspend, spam, limited, trusted, unpublish-user. Forem tags these `users`, not `admin`, but they need moderator privileges an author key does not carry. |
| Segments, surveys, billboards, concepts | 24 | Instance features, administered by the operator. |
| Pages, events, subforems, recommendation lists | 15 | Instance structure. |
| Badge and organisation **mutations** | 8 | Minting a badge or creating an organisation is instance administration. The reads are covered. |
| Health checks | 3 | Report on the server, not on your account. |
| Agent sessions | 5 | Forem's own feature; unrelated to MCP. |
| The spec endpoint | 1 | Already vendored in this repo. |

`devto_list_operations` with `include_excluded: true` gives the same information at runtime, per operation.

The exclusions are enforced rather than documented: asking `devto_call` for `suspendUser` returns the reason, not a 403 from Forem after the fact.

## Refreshing the catalogue

```bash
curl -o vendor/forem-openapi.json \
  https://raw.githubusercontent.com/forem/forem/main/swagger/v1/api_v1.json
npm run generate
npm test
```

The coverage test names anything newly unclassified. Classify it in `scripts/generate-operations.mjs` and regenerate.

## Testing

```bash
npm test                  # 21 tests
npm run build
node scripts/smoke.mjs    # real MCP over stdio, 9 checks
```

The smoke test is the one that matters. It speaks actual MCP to the built server with `FLEET_BOARD_URL` and `OPENCLAW_MCP_AGENT_ID` explicitly cleared, and asserts that no tool asks for an `agent_id`, that no private vocabulary appears in any description, and that a read tool works with nothing else running.

That is not hypothetical. This server was extracted from one where every write tool called a private task board at `127.0.0.1:8420` and **failed closed** — so cloned by anyone else, every write tool was permanently broken, and `agent_id` was a required field on all of them.

## Built on

[`@nasdigital/mcp-server-core`](https://github.com/N-Graves/mcp-server-core) — the hardened fetch layer, pluggable authorization, error sanitisation and coverage checking shared across this family of servers.

## Licence

MIT.
