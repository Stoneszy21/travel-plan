@echo off
rem ASCII-only launcher: avoids cmd.exe codepage issues with Chinese text.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0allow-firewall.ps1"
