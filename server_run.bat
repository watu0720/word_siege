@echo off
setlocal EnableExtensions
cd /d "%~dp0"

py -3 -c "import sys" >nul 2>&1
if not errorlevel 1 (
  py -3 "%~dp0server\app.py"
  endlocal
  exit 0
)

python -c "import sys" >nul 2>&1
if not errorlevel 1 (
  python "%~dp0server\app.py"
  endlocal
  exit 0
)

echo [ERROR] Python 3 が見つかりません。
echo py または python を PATH に追加してください。
pause
endlocal
exit /b 1
