# 把本地改动推送到 GitHub，Pages 会自动重新发布（约 1 分钟）
# 用法：
#   .\deploy.ps1                    # 自动提交信息
#   .\deploy.ps1 "改了箱根的晚餐"     # 自定义提交信息

param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Message)

$ErrorActionPreference = 'Continue'
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $dir

# 有梯子时走代理（GitHub 在国内直连不稳），没梯子就直连试
$reg = Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings' -ErrorAction SilentlyContinue
if ($reg -and $reg.ProxyEnable -eq 1 -and $reg.ProxyServer) {
    $env:HTTPS_PROXY = "http://$($reg.ProxyServer)"
    $env:HTTP_PROXY = "http://$($reg.ProxyServer)"
    Write-Host "  使用系统代理 $($reg.ProxyServer)" -ForegroundColor DarkGray
}

$msg = if ($Message -and $Message.Count) { $Message -join ' ' } else { "更新行程 $(Get-Date -Format 'yyyy-MM-dd HH:mm')" }

Write-Host ''
Write-Host "  提交：$msg" -ForegroundColor Cyan

& git add -A
& git -c core.autocrlf=false commit -m $msg
if ($LASTEXITCODE -ne 0) {
    Write-Host "  没有需要提交的改动。" -ForegroundColor Yellow
}

Write-Host ''
Write-Host "  推送到 GitHub..." -ForegroundColor Cyan
& git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ''
    Write-Host "  推送成功。" -ForegroundColor Green
    Write-Host "  约 1 分钟后生效： https://stoneszy21.github.io/travel-plan/" -ForegroundColor Green
    Write-Host "  手机上刷新页面即可（这次改成了网络优先，不会卡在旧版本）。" -ForegroundColor DarkGray
} else {
    Write-Host ''
    Write-Host "  推送失败。多半是梯子没开——GitHub 在国内直连不稳定。" -ForegroundColor Red
    Write-Host "  开梯子后重跑这条命令即可；代码改动不会丢。" -ForegroundColor DarkGray
}
Write-Host ''
