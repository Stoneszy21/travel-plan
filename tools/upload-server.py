"""手机传图服务：手机连同一个 Wi-Fi，打开页面直接选相册上传。

用法：
    python tools/upload-server.py [端口]

照片存到 img/inbox/，文件名带时间戳。
只在局域网内可见，不往外网开放；Ctrl+C 结束。
"""
import http.server
import json
import os
import re
import socket
import sys
import time
import urllib.parse

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INBOX = os.path.join(APP, "img", "inbox")
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8081

PAGE = """<!DOCTYPE html>
<html lang="zh-CN"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>传照片</title>
<style>
  :root { --bg:#f4f4f2; --card:#fff; --text:#1a1c1e; --muted:#6b7280; --accent:#0f766e; --line:#e5e7eb; }
  @media (prefers-color-scheme: dark) {
    :root { --bg:#0f1115; --card:#191c21; --text:#e8eaed; --muted:#9aa3ad; --accent:#2dd4bf; --line:#2a2f37; }
  }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--text);
         font: 15px/1.6 -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
         padding: 24px 16px calc(24px + env(safe-area-inset-bottom)); }
  h1 { font-size: 19px; margin: 0 0 6px; }
  p.sub { color: var(--muted); font-size: 13px; margin: 0 0 20px; }
  .drop { display:block; background:var(--card); border:2px dashed var(--line); border-radius:16px;
          padding: 36px 20px; text-align:center; cursor:pointer; }
  .drop:active { border-color: var(--accent); }
  .big { font-size: 40px; line-height:1; margin-bottom:10px; }
  .hint { color: var(--muted); font-size: 12.5px; margin-top: 8px; }
  input[type=file] { display:none; }
  #log { margin-top: 18px; font-size: 13.5px; }
  .item { display:flex; align-items:center; gap:10px; padding:8px 0; border-bottom:1px solid var(--line); }
  .item img { width:44px; height:44px; border-radius:8px; object-fit:cover; background:var(--line); }
  .item .nm { flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .ok { color: var(--accent); font-weight:700; }
  .err { color: #dc2626; }
  .bar { position:fixed; left:0; top:0; height:3px; background:var(--accent); width:0; transition:width .2s; }
</style></head>
<body>
<div class="bar" id="bar"></div>
<h1>传照片给行程 App</h1>
<p class="sub">从相册选，或者直接拍。传完就能在电脑上直接用。</p>

<label class="drop" for="f">
  <div class="big">📷</div>
  <div><b>点这里选照片</b></div>
  <div class="hint">可以一次选多张 · iPhone 会自动转成 JPG</div>
</label>
<input id="f" type="file" accept="image/*" multiple>

<div id="log"></div>

<script>
const f = document.getElementById('f');
const log = document.getElementById('log');
const bar = document.getElementById('bar');

function row(html) {
  const d = document.createElement('div');
  d.className = 'item';
  d.innerHTML = html;
  log.prepend(d);
  return d;
}

f.addEventListener('change', async () => {
  const files = [...f.files];
  if (!files.length) return;
  let done = 0;
  for (const file of files) {
    const d = row('<img src="' + URL.createObjectURL(file) + '"><div class="nm">' +
      file.name + '</div><div class="st">上传中…</div>');
    try {
      const r = await fetch('/u?name=' + encodeURIComponent(file.name), {
        method: 'POST',
        headers: { 'Content-Type': file.type || 'application/octet-stream' },
        body: file
      });
      const j = await r.json();
      if (j.ok) {
        d.querySelector('.st').outerHTML = '<div class="st ok">✓</div>';
        done++;
      } else {
        throw new Error(j.error || '失败');
      }
    } catch (e) {
      d.querySelector('.st').outerHTML = '<div class="st err">✗ ' + (e.message || '') + '</div>';
    }
    bar.style.width = Math.round(((done) / files.length) * 100) + '%';
  }
  bar.style.width = '100%';
  setTimeout(() => { bar.style.width = '0'; }, 700);
  f.value = '';
});
</script>
</body></html>
"""


class Handler(http.server.BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, fmt, *args):
        pass                                    # 别刷屏

    def _json(self, obj, code=200):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path.startswith("/list"):
            files = sorted(
                (f for f in os.listdir(INBOX) if not f.startswith(".")),
                reverse=True,
            )[:50]
            return self._json({"files": files})
        if self.path in ("/", "/index.html"):
            body = PAGE.encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        self.send_error(404)

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > 60 * 1024 * 1024:
                return self._json({"ok": False, "error": "文件太大或为空"}, 400)

            q = urllib.parse.urlparse(self.path).query
            name = urllib.parse.parse_qs(q).get("name", ["photo.jpg"])[0]
            name = os.path.basename(name)
            name = re.sub(r"[^\w.\-]+", "_", name) or "photo.jpg"

            stamp = time.strftime("%Y%m%d-%H%M%S")
            base, ext = os.path.splitext(name)
            if ext.lower() not in (".jpg", ".jpeg", ".png", ".heic", ".heif", ".webp", ""):
                ext = ".jpg"
            out = os.path.join(INBOX, "%s-%s%s" % (stamp, base[:40], ext))

            remaining = length
            with open(out, "wb") as fh:
                while remaining > 0:
                    chunk = self.rfile.read(min(65536, remaining))
                    if not chunk:
                        break
                    fh.write(chunk)
                    remaining -= len(chunk)

            size = os.path.getsize(out)
            print("  收到 %s（%.1f KB）" % (os.path.basename(out), size / 1024))
            return self._json({"ok": True, "saved": os.path.basename(out), "size": size})
        except Exception as e:
            return self._json({"ok": False, "error": str(e)}, 500)


def lan_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        return s.getsockname()[0]
    except Exception:
        return "127.0.0.1"
    finally:
        s.close()


def main():
    os.makedirs(INBOX, exist_ok=True)
    ip = lan_ip()
    print()
    print("  手机传图服务已启动")
    print("  ---------------------------------------------")
    print("  手机（连同一个 Wi-Fi）打开：")
    print("    http://%s:%d/" % (ip, PORT))
    print("  ---------------------------------------------")
    print("  照片会存到 img/inbox/，传完跟我说一声就行。")
    print("  退出：按 Ctrl+C")
    print()
    httpd = http.server.ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n  已停止。")


if __name__ == "__main__":
    main()
