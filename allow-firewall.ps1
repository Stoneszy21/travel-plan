# 让 iPhone 能访问本机的 8080 端口（行程 App）
# 规则只对「本网段」生效：remoteip=LocalSubnet，公共 WiFi 上的陌生人访问不到
# 需要管理员权限，脚本会自己申请 UAC 提权

$ErrorActionPreference = 'Continue'
$ruleName = 'TravelApp-8080'

function Test-Admin {
    $id = [Security.Principal.WindowsIdentity]::GetCurrent()
    $p = New-Object Security.Principal.WindowsPrincipal($id)
    return $p.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

if (-not (Test-Admin)) {
    Write-Host ''
    Write-Host '  需要管理员权限来添加防火墙规则。' -ForegroundColor Yellow
    Write-Host '  接下来会弹出一个 UAC 窗口，请点「是」。' -ForegroundColor Yellow
    Write-Host ''
    try {
        Start-Process -FilePath 'powershell.exe' `
            -ArgumentList @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', "`"$PSCommandPath`"") `
            -Verb RunAs
    } catch {
        Write-Host '  提权失败（可能是取消了 UAC，或当前账户没有管理员权限）。' -ForegroundColor Red
        Write-Host '  可以把这句截图发给助手。' -ForegroundColor DarkGray
        Read-Host '  按回车关闭'
    }
    exit
}

Write-Host ''
Write-Host '  正在添加防火墙规则（仅允许本网段访问 8080）...' -ForegroundColor Cyan
Write-Host ''

netsh advfirewall firewall delete rule name="$ruleName" | Out-Null
$out = netsh advfirewall firewall add rule name="$ruleName" dir=in action=allow protocol=TCP localport=8080 remoteip=LocalSubnet profile=any 2>&1
$ok = ($LASTEXITCODE -eq 0)

Write-Host ($out | Out-String).Trim()
Write-Host ''

if ($ok) {
    Write-Host '  完成，规则已生效。' -ForegroundColor Green
    Write-Host ''
    Write-Host '  回到 iPhone，Safari 打开：' -ForegroundColor Green
    Write-Host '    http://192.168.31.165:8080' -ForegroundColor Green
    Write-Host ''
    Write-Host '  （电脑换了 WiFi 的话，地址里的 IP 要换成 start-server 窗口里打印的那个）' -ForegroundColor DarkGray
} else {
    Write-Host '  添加失败，把上面的报错发给助手。' -ForegroundColor Red
}

Write-Host ''
Read-Host '  按回车关闭这个窗口'
