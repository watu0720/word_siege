#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "[WORD SIEGE] フロントをビルドしています (client/dist/bundle.js)..."

if ! command -v deno &>/dev/null; then
  echo "[エラー] Deno が見つかりません。"
  echo "インストール: https://docs.deno.com/runtime/getting_started/installation/"
  echo ""
  echo "ビルドしなくても、同梱の bundle.js で start.sh から遊べます。"
  exit 1
fi

deno bundle --import-map=deno.json client/src/main.tsx client/dist/bundle.js
echo "[完了] bundle.js を更新しました。"
