@echo off
setlocal EnableExtensions
cd /d "%~dp0"

REM Keep this file ASCII-only so cmd.exe parses it on any code page (JP Windows).
chcp 65001 >nul 2>&1

REM One double-click: rebuild client when sources changed, then server + browser.
REM Uses Deno if available, otherwise npm + esbuild (see package.json).

REM --- Decide if client/dist/bundle.js needs rebuild ---
set REBUILD=1
if exist "client\dist\bundle.js" (
  powershell -NoProfile -ExecutionPolicy Bypass -Command "$b='client/dist/bundle.js'; $all=@(Get-ChildItem 'client/src' -Recurse -File -ErrorAction SilentlyContinue); foreach ($n in @('deno.json','package.json')) { $i=Get-Item $n -ErrorAction SilentlyContinue; if ($i) { $all+=$i } }; if ($all.Count -lt 1) { exit 0 }; $m=($all | Measure-Object -Property LastWriteTime -Maximum).Maximum; if ($m -gt (Get-Item -LiteralPath $b).LastWriteTime) { exit 0 } else { exit 1 }"
  if errorlevel 1 set REBUILD=0
)

if "%REBUILD%"=="0" goto skip_client_build

where deno >nul 2>&1
if errorlevel 1 goto try_npm_build
echo [WORD SIEGE] Building client ^(Deno^)...
deno bundle --import-map=deno.json client/src/main.tsx client/dist/bundle.js
if errorlevel 1 (
  echo [WARN] Deno bundle failed; trying npm...
  goto try_npm_build
)
echo [INFO] bundle.js updated.
goto client_build_done

:try_npm_build
where npm >nul 2>&1
if errorlevel 1 goto client_build_failed
if not exist "package.json" goto client_build_failed
echo [WORD SIEGE] Building client ^(npm / esbuild^)...
if not exist "node_modules\esbuild\package.json" (
  call npm install
  if errorlevel 1 (
    echo [ERROR] npm install failed.
    goto client_build_failed
  )
)
call npm run build:client
if errorlevel 1 (
  echo [ERROR] npm run build:client failed.
  goto client_build_failed
)
echo [INFO] bundle.js updated.
goto client_build_done

:client_build_failed
if not exist "client\dist\bundle.js" (
  echo.
  echo [ERROR] Client bundle missing and build failed.
  echo Install Deno ^(https://docs.deno.com/^) or Node.js ^(https://nodejs.org/^) and run from the game folder.
  echo.
  pause
  exit /b 1
)
echo [WARN] Rebuild failed; using existing client\dist\bundle.js ^(may be outdated^).
goto client_build_done

:skip_client_build
echo [INFO] Client bundle is up to date. ^(Skipping build.^)

:client_build_done
echo.

echo [WORD SIEGE] Starting...
echo.

REM --- Python 3 ---
set "PY_CMD="
py -3 -c "import sys; assert sys.version_info >= (3, 8)" >nul 2>&1
if not errorlevel 1 set "PY_CMD=py -3"

if not defined PY_CMD (
  python -c "import sys; assert sys.version_info >= (3, 8)" >nul 2>&1
  if not errorlevel 1 set "PY_CMD=python"
)

if not defined PY_CMD (
  echo [ERROR] Python 3.8+ not found.
  echo https://www.python.org/downloads/ ^(enable Add python.exe to PATH^)
  echo.
  pause
  exit /b 1
)

REM --- Flask (first run auto pip install) ---
%PY_CMD% -c "import flask" >nul 2>&1
if errorlevel 1 (
  echo [INFO] Installing server dependencies ^(may take a minute^)...
  %PY_CMD% -m pip install -r "%~dp0server\requirements.txt" --disable-pip-version-check
  if errorlevel 1 (
    echo.
    echo [ERROR] pip install failed. Check network or Python setup.
    echo.
    pause
    exit /b 1
  )
  %PY_CMD% -c "import flask" >nul 2>&1
  if errorlevel 1 (
    echo [ERROR] Flask still unavailable.
    pause
    exit /b 1
  )
  echo [INFO] Server dependencies ready.
  echo.
)

echo [INFO] Starting server in a minimized window...
start "WORD SIEGE Server" /MIN cmd.exe /c ""%~dp0server_run.bat""

timeout /t 2 /nobreak >nul
start "" "http://localhost:5000/"

echo [INFO] Browser opened. Use Title screen to stop the server.
echo [INFO] This window closes in 5 seconds...
timeout /t 5 /nobreak >nul
endlocal
exit /b 0
