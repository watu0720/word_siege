# WORD SIEGE

シューティング × タワーディフェンス × ローグライク要素の Web ブラウザゲームです。

## 遊び方（Windows）

**`start.bat` をダブルクリックするだけです。**  
ターミナルで `pip` などを打つ必要はありません。初回起動時に、必要なら Flask のインストールが自動で行われます。

- 前提: **Python 3.8 以上**が PC に入っており、`py` または `python` で起動できること（インストール時に PATH へ追加推奨）。
- ブラウザが開いたらそのままプレイできます。タイトルの「サーバーを終了する」でサーバーを止められます。

Mac / Linux は **`./start.sh`**（実行権限: `chmod +x start.sh`）。こちらも同様に初回は依存関係を自動インストールします。

同梱の **`client/dist/bundle.js`** を読み込みます。**Node.js は不要**です。

## ソースを直した開発者向け

`client/src` を変更したら **[Deno](https://deno.com/)** を入れたうえで **`build.bat`** または **`./build.sh`** で `bundle.js` を再生成してください（`deno task bundle` でも可）。型チェックは `deno task check` です。

エディタでは **Deno 公式拡張** を入れ、`.vscode/settings.json` のとおり `client/src` を Deno として解析させると補完・型が安定します（**Node / npm は不要**）。

## 技術メモ

- バンドル・依存解決: **Deno** のみ（`deno.json` の import map → esm.sh）。**npm / `node_modules` は使いません**（フォルダがあれば削除して問題ありません）。
- サーバー: Python 3 + Flask（`server/requirements.txt`）。
