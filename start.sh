#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if [[ ! -f client/dist/bundle.js ]]; then
  echo ""
  echo "[エラー] client/dist/bundle.js がありません。"
  echo "配布物を入れ直すか、./build.sh を実行してください。"
  echo ""
  exit 1
fi

if ! command -v python3 &>/dev/null; then
  echo "[エラー] python3 が見つかりません。Python 3.8 以上をインストールしてください。"
  exit 1
fi

if ! python3 -c "import sys; assert sys.version_info >= (3, 8)" 2>/dev/null; then
  echo "[エラー] Python 3.8 以上が必要です。"
  exit 1
fi

if ! python3 -c "import flask" 2>/dev/null; then
  echo "[情報] 初回の準備です。サーバー用ライブラリをインストールしています…"
  python3 -m pip install -r server/requirements.txt --disable-pip-version-check
fi

if ! python3 -c "import flask" 2>/dev/null; then
  echo "[エラー] Flask を利用できません。pip の状態を確認してください。"
  exit 1
fi

echo "[WORD SIEGE] 起動しています…"

python3 server/app.py &
SERVER_PID=$!
sleep 2
open "http://localhost:5000" 2>/dev/null || xdg-open "http://localhost:5000" 2>/dev/null || true

echo "[情報] ブラウザを開きました。サーバーを止めるには Ctrl+C です。"
trap 'kill $SERVER_PID 2>/dev/null; exit 0' INT TERM
wait $SERVER_PID
