# cf-starter

A Cloudflare Workers app using Hono (TypeScript) with KV and R2 bindings.

## Commands

- `pnpm dev` - Start local dev server on port 8787
- `pnpm deploy` - Deploy to Cloudflare Workers
- `pnpm cf-typegen` - Regenerate Cloudflare types from wrangler.jsonc

## Architecture

- **Framework**: Hono on Cloudflare Workers
- **Bindings**: `MY_KV` (KV namespace), `MY_BUCKET` (R2 bucket)
- **Entry point**: `src/index.ts`
- **Config**: `wrangler.jsonc`

## Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health check |
| GET | `/kv/:key` | Read KV value |
| PUT | `/kv/:key` | Write KV value (body = value) |
| DELETE | `/kv/:key` | Delete KV key |
| GET | `/r2` | List R2 objects |
| GET | `/r2/:key` | Download R2 object |
| PUT | `/r2/:key` | Upload R2 object (body = file) |
| DELETE | `/r2/:key` | Delete R2 object |

## Setup

1. `wrangler login`
2. Create KV namespace: `npx wrangler kv namespace create MY_KV`
3. Create R2 bucket: `npx wrangler r2 bucket create my-bucket`
4. Update `wrangler.jsonc` with the KV namespace ID from step 2
