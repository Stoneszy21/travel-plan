@echo off
chcp 65001 >nul
title Upload photos from phone
cd /d "%~dp0"
set PY="C:\Users\szywi\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\python\python.exe"
if not exist %PY% set PY=python
echo.
echo   Starting photo upload server on port 8080...
echo   Keep this window open while you send photos.
echo.
%PY% "%~dp0tools\upload-server.py" 8080
pause