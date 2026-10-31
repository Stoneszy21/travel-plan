# 启动行程 App 的局域网服务，让 iPhone 在同一个 WiFi 下打开
# 用法：右键 → 使用 PowerShell 运行；或命令行 .\start-server.ps1

$ErrorActionPreference = 'Stop'
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location $dir

# ---- 找 Python ----
$py = $null
foreach ($name in @('python', 'py')) {
    $cmd = Get-Command $name -ErrorAction SilentlyContinue
    if ($cmd) { $py = $cmd.Source; break }
}
if (-not $py) {
    $candidate = Join-Path $env:USERPROFILE '.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\python\python.exe'
    if (Test-Path $candidate) { $py = $candidate }
}
if (-not $py) {
    Write-Host ''
    Write-Host '没找到 Python。' -ForegroundColor Red
    Write-Host '装一个 Python 3（勾选 Add to PATH），或改用任意静态服务器指向这个文件夹。'
    Write-Host ''
    Read-Host '按回车关闭'
    Pop-Location
    exit 1
}

# ---- 找一个空闲端口 ----
function Test-PortFree([int]$p) {
    try {
        $l = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $p)
        $l.Start()
        $l.Stop()
        return $true
    } catch {
        return $false
    }
}

$port = 8080
while (-not (Test-PortFree $port) -and $port -lt 8090) { $port++ }
if (-not (Test-PortFree $port)) {
    Write-Host '8080-8089 都被占用了，先关掉占端口的程序再试。' -ForegroundColor Red
    Read-Host '按回车关闭'
    Pop-Location
    exit 1
}

# ---- 取局域网 IP ----
$ip = $null
$lines = ipconfig | Select-String -Pattern 'IPv4'
foreach ($l in $lines) {
    $addr = ($l.Line -split ':')[-1].Trim()
    if ($addr -match '^\d+\.\d+\.\d+\.\d+$' -and $addr -notlike '127.*' -and $addr -notlike '169.254.*') {
        $ip = $addr
        break
    }
}

Write-Host ''
Write-Host '  行程 App 已启动' -ForegroundColor Green
Write-Host ''
Write-Host ('  本机打开： http://127.0.0.1:{0}' -f $port) -ForegroundColor Cyan
if ($ip) {
    Write-Host ('  手机上开： http://{0}:{1}' -f $ip, $port) -ForegroundColor Green
    Write-Host ''
    Write-Host '  iPhone 步骤：Safari 打开上面的地址 → 分享 → 添加到主屏幕' -ForegroundColor DarkGray
    Write-Host '  前提：iPhone 和这台电脑连同一个 WiFi' -ForegroundColor DarkGray
} else {
    Write-Host '  没读到局域网 IP，用 ipconfig 自己看一下。' -ForegroundColor Yellow
}
Write-Host ''
Write-Host '  改完 trip-data.js 后，手机上刷新页面就生效。' -ForegroundColor DarkGray
Write-Host '  这个窗口关掉服务就停了。' -ForegroundColor DarkGray
Write-Host ''

Start-Process "http://127.0.0.1:$port" 2>$null | Out-Null
& $py -m http.server $port --bind 0.0.0.0

Pop-Location
