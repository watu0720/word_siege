@echo off
setlocal EnableExtensions
cd /d "%~dp0"

chcp 65001 >nul 2>&1

echo [WORD SIEGE] Starting...
echo.

REM --- Client bundle: Deno only (no Node.js). See deno.json + README. ---
where deno >nul 2>&1
if not errorlevel 1 (
  echo [INFO] Bundling with Deno...
  deno bundle --import-map=deno.json client/src/main.tsx client/dist/bundle.js
  if errorlevel 1 echo [WARN] Deno bundle failed. Using existing bundle if any.
  goto :run_server
)

echo [WARN] Deno が見つかりません。リポジトリ同梱の client\dist\bundle.js を使います。
echo [HINT] ソースから再バンドルする場合: https://docs.deno.com/runtime/getting_started/installation/

:run_server
if not exist "client\dist\bundle.js" (
  echo [ERROR] client\dist\bundle.js がありません。
  echo Deno をインストールしてから start.bat を再実行するか、リポジトリを最新の状態に取得してください。
  pause
  exit /b 1
)

REM cmd /c で終了時にコンソールごと閉じる（server_run.bat 内に pause は無し）
echo [INFO] Flask サーバーを別ウィンドウで起動しています ^(最小化^)...
start "WORD SIEGE Server" /MIN cmd.exe /c ""%~dp0server_run.bat""

timeout /t 2 /nobreak >nul
start "" "http://localhost:5000/"

echo.
echo [INFO] ブラウザを開きました。
echo [INFO] サーバーは別のウィンドウ（最小化）で動いています。
echo [INFO] ゲームのタイトルで「サーバーを終了する」とサーバー窓は自動で閉じます。
echo [INFO] このランチャーは数秒後に閉じます…
timeout /t 5 /nobreak >nul
endlocal
exit /b 0
