# 把本地改动推送到 GitHub，Pages 会自动重新发布（约 1 分钟）
#
# 用法：
#   .\deploy.ps1                     自动生成提交信息
#   .\deploy.ps1 "改了箱根的晚餐"      自定义提交信息
#
# 认证方式：用 gh 里的 token 走一次性 http.extraheader。
# 不用 git 凭据助手，因为 Git for Windows 自带的 Credential Manager 在无人值守时会卡住。

param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Message)

$ErrorActionPreference = 'Continue'
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $dir

$gh = "$env:USERPROFILE\.dsh\tools\gh\gh.exe"
if (-not (Test-Path $gh)) {
    Write-Host ''
    Write-Host "  没找到 gh（$gh）。" -ForegroundColor Red
    Write-Host '  gh 是用来认证 GitHub 的，需要重装的话告诉我。' -ForegroundColor DarkGray
    exit 1
}

# 有梯子时走系统代理：GitHub 在国内直连不稳
$reg = Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings' -ErrorAction SilentlyContinue
if ($reg -and $reg.ProxyEnable -eq 1 -and $reg.ProxyServer) {
    $env:HTTPS_PROXY = "http://$($reg.ProxyServer)"
    $env:HTTP_PROXY = "http://$($reg.ProxyServer)"
    Write-Host "  代理：$($reg.ProxyServer)" -ForegroundColor DarkGray
} else {
    Write-Host '  没检测到系统代理，尝试直连（国内多半会失败）' -ForegroundColor Yellow
}

$msg = if ($Message -and $Message.Count) { $Message -join ' ' } else { "更新行程 $(Get-Date -Format 'yyyy-MM-dd HH:mm')" }

Write-Host ''
Write-Host "  提交：$msg" -ForegroundColor Cyan
& git add -A
& git -c core.autocrlf=false commit -m $msg 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host '  没有新的改动要提交。' -ForegroundColor Yellow
}

$token = (& $gh auth token 2>&1 | Out-String).Trim()
if (-not $token) {
    Write-Host '  拿不到 GitHub token，可能需要重新执行 gh auth login。' -ForegroundColor Red
    exit 1
}
$b64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("x-access-token:$token"))
$env:GIT_CONFIG_COUNT = '1'
$env:GIT_CONFIG_KEY_0 = 'http.https://github.com/.extraheader'
$env:GIT_CONFIG_VALUE_0 = "AUTHORIZATION: basic $b64"
$env:GIT_TERMINAL_PROMPT = '0'

Write-Host ''
Write-Host '  推送到 GitHub...' -ForegroundColor Cyan
$pushOut = & git push origin main 2>&1 | Out-String
Write-Host $pushOut

if ($LASTEXITCODE -eq 0) {
    Write-Host ''
    Write-Host '  推送成功，约 1 分钟后生效：' -ForegroundColor Green
    Write-Host '  https://stoneszy21.github.io/travel-plan/' -ForegroundColor Green
    Write-Host '  手机上刷新页面即可。' -ForegroundColor DarkGray
} else {
    Write-Host ''
    Write-Host '  推送失败，多半是梯子没开。代码改动不会丢，开好梯子重跑这条命令即可。' -ForegroundColor Red
}
Write-Host ''
