@echo off
setlocal EnableExtensions
cd /d "%~dp0"

REM ASCII-only: safe for cmd.exe on Japanese Windows (CP932).
chcp 65001 >nul 2>&1

echo [WORD SIEGE] Building client ^(client\dist\bundle.js^)...
echo.

where deno >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Deno not found.
  echo Install: https://docs.deno.com/runtime/getting_started/installation/
  echo.
  echo You can still play using the bundled client\dist\bundle.js via start.bat.
  pause
  exit /b 1
)

deno bundle --import-map=deno.json client/src/main.tsx client/dist/bundle.js
if errorlevel 1 (
  echo [ERROR] deno bundle failed.
  pause
  exit /b 1
)
echo [OK] bundle.js updated ^(Deno^).
pause
exit /b 0
