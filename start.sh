#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
echo "[WORD SIEGE] Starting..."

if command -v deno &>/dev/null; then
  echo "[INFO] Bundling with Deno..."
  deno bundle --import-map=deno.json client/src/main.tsx client/dist/bundle.js
else
  echo "[WARN] Deno not found. Using committed client/dist/bundle.js if present."
  echo "[HINT] To rebuild from source: https://docs.deno.com/runtime/getting_started/installation/"
fi

if [[ ! -f client/dist/bundle.js ]]; then
  echo "[ERROR] client/dist/bundle.js is missing. Install Deno and re-run, or pull the full repo."
  exit 1
fi

python3 server/app.py &
sleep 2
open "http://localhost:5000" 2>/dev/null || xdg-open "http://localhost:5000" 2>/dev/null || true

echo "[INFO] Server running. Press Ctrl+C to stop."
wait
