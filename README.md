# word_siege
タイピング × タワーディフェンス型 Webブラウザゲーム

## 実行・ビルド

- **プレイ時**: **Node.js は不要**です。Python 3 と Flask でサーバーを起動し、ブラウザで `client/dist/bundle.js` を読み込みます（`start.bat` / `start.sh`）。
- **フロントの再バンドル**（TypeScript を変更したとき）: [Deno](https://deno.com/) の `deno bundle` のみを使用します（`deno.json` の import マップ）。npm / `package.json` はありません。
- リポジトリにはビルド済みの `client/dist/bundle.js` を同梱しているため、Deno が無くても起動できます。
