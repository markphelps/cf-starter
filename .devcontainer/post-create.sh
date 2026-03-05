#!/usr/bin/env bash
set -euo pipefail

echo "Enabling corepack for pnpm..."
sudo corepack enable

echo "Installing dependencies..."
pnpm install

echo ""
echo "Setup complete! Next steps:"
echo "  1. Run 'wrangler login' to authenticate with Cloudflare"
echo "  2. Run 'pnpm dev' to start the local dev server on :8787"
echo "  3. Run 'pnpm deploy' to deploy to Cloudflare Workers"
