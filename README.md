# cf-starter

A template repository for building Cloudflare Workers apps with [Hono](https://hono.dev), pre-configured with devcontainers and AI coding tool support.

## What's included

- **Hono + TypeScript** on Cloudflare Workers
- **KV** and **R2** binding examples with CRUD routes
- **Devcontainer** with Node 22 LTS (works with GitHub Codespaces, VS Code, etc.)
- **Cloudflare Docs MCP** pre-configured for both [OpenCode](https://opencode.ai) and [Claude Code](https://docs.anthropic.com/en/docs/claude-code)
- **Cloudflare Bindings MCP** for AI-assisted development with Workers bindings

## Quick start

### With devcontainer (recommended)

1. Open this repo in VS Code or GitHub Codespaces
2. When prompted, reopen in the devcontainer
3. Authenticate with Cloudflare:
   ```sh
   wrangler login
   ```
4. Create the required resources:
   ```sh
   npx wrangler kv namespace create MY_KV
   npx wrangler r2 bucket create my-bucket
   ```
5. Update `wrangler.jsonc` with the KV namespace ID from step 4
6. Start developing:
   ```sh
   pnpm dev
   ```

### Without devcontainer

Requires Node.js 20+ and [corepack](https://nodejs.org/api/corepack.html) (ships with Node).

```sh
corepack enable
pnpm install
wrangler login
pnpm dev
```

## AI-assisted development

This template is set up for AI coding tools out of the box.

### OpenCode

```sh
opencode
```

The `opencode.jsonc` config connects to Cloudflare's docs and bindings MCP servers. Permissions are pre-set for autonomous operation (grant all).

### Claude Code

```sh
claude
```

The `.mcp.json` config connects to the same Cloudflare MCP servers via `mcp-remote`. The `CLAUDE.md` file provides project context.

## Deploy

```sh
pnpm deploy
```

## Project structure

```
.devcontainer/       Devcontainer configuration
src/index.ts         Hono app with KV + R2 routes
wrangler.jsonc       Wrangler config with bindings
opencode.jsonc       OpenCode MCP + permissions config
.mcp.json            Claude Code MCP config
CLAUDE.md            AI agent project context
```
