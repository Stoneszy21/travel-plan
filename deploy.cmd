@echo off
rem Deploy the latest edits to GitHub Pages. ASCII-only wrapper.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy.ps1" %*
echo.
pause
