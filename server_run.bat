@echo off
setlocal EnableExtensions
cd /d "%~dp0"

REM ASCII-only for reliable parsing on JP Windows.
py -3 -c "import sys" >nul 2>&1
if not errorlevel 1 (
  py -3 "%~dp0server\app.py"
  endlocal
  exit /b 0
)

python -c "import sys" >nul 2>&1
if not errorlevel 1 (
  python "%~dp0server\app.py"
  endlocal
  exit /b 0
)

echo [ERROR] Python 3 not found. Add py or python to PATH.
pause
endlocal
exit /b 1
