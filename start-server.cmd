@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo   Starting travel app server...
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-server.ps1"
echo.
echo   Server stopped.
pause
