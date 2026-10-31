"""给新增的几个景点补照片（每个 3 张，含 -t/-m 小图），并写回 guides.js。"""
import io
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

from PIL import Image

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(APP, "img", "sights")
PROXY = os.environ.get("HTTPS_PROXY") or os.environ.get("HTTP_PROXY") or ""
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

opener = urllib.request.build_opener(
    urllib.request.ProxyHandler({"http": PROXY, "https": PROXY})
) if PROXY else urllib.request.build_opener()
opener.addheaders = [("User-Agent", "travel-plan-app/1.0 (personal trip planner)")]

TARGETS = [
    ("morse", "Morse Museum Winter Park Tiffany"),
    ("boattour", "Winter Park scenic boat tour canal"),
    ("market", "farmers market Florida produce stall"),
    ("renningers", "Renningers Mount Dora antique market"),
]

# guides.js 里对应的景点名（用来插入 photos 字段）
NAME_MAP = {
    "morse": "Morse Museum of American Art",
    "boattour": "Winter Park Scenic Boat Tour",
    "market": "Winter Park Farmers' Market",
    "renningers": "Renningers Mt. Dora 跳蚤市场 + 古董中心",
}

SIZES = [("t", (120, 120), 72), ("m", (360, 240), 72), ("", (720, 480), 76)]


def cover(im, size):
    tw, th = size
    w, h = im.size
    t = tw / th
    if w / h > t:
        nw = int(h * t); left = (w - nw) // 2
        im = im.crop((left, 0, left + nw, h))
    else:
        nh = int(w / t); top = int((h - nh) * 0.35)
        im = im.crop((0, top, w, top + nh))
    return im.resize(size, Image.LANCZOS)


def api(term, limit=10):
    q = urllib.parse.urlencode({
        "action": "query", "generator": "search", "gsrnamespace": "6",
        "gsrsearch": "filetype:bitmap " + term, "gsrlimit": str(limit),
        "prop": "imageinfo", "iiprop": "url|size", "iiurlwidth": "960", "format": "json",
    })
    for attempt in range(3):
        try:
            with opener.open("https://commons.wikimedia.org/w/api.php?" + q, timeout=45) as r:
                return json.loads(r.read().decode("utf-8"))
        except Exception:
            time.sleep(5 * (attempt + 1))
    return {}


made = {}
for slug, term in TARGETS:
    time.sleep(4)
    j = api(term)
    pages = (j.get("query") or {}).get("pages") or {}
    cands = []
    for p in pages.values():
        ii = (p.get("imageinfo") or [{}])[0]
        w, h = ii.get("width", 0), ii.get("height", 0)
        if ii.get("thumburl") and w >= 700 and w * 0.75 > h:
            cands.append((p.get("index", 99), ii))
    cands.sort(key=lambda x: x[0])
    n = 0
    for _, ii in cands:
        if n >= 3:
            break
        try:
            with opener.open(ii["thumburl"].split("?")[0], timeout=60) as r:
                raw = r.read()
            im = Image.open(io.BytesIO(raw)).convert("RGB")
            for suffix, size, q in SIZES:
                nm = "%s-%d%s.jpg" % (slug, n + 1, ("-" + suffix) if suffix else "")
                cover(im, size).save(os.path.join(OUT, nm), "JPEG", quality=q, optimize=True)
            n += 1
            time.sleep(1.5)
        except Exception as e:
            print("  下载失败", slug, e)
    made[slug] = n
    print("✓" if n else "✗", slug, n, "张")

# 把 photos 写回 guides.js
gf = os.path.join(APP, "guides.js")
src = open(gf, encoding="utf-8").read()
for slug, name in NAME_MAP.items():
    if not made.get(slug):
        continue
    anchor = "      name: '" + name.replace("'", "\\'") + "',"
    if anchor not in src:
        print("  未匹配到景点名:", name)
        continue
    arr = ["      photos: ["]
    for i in (1, 2, 3):
        base = "img/sights/%s-%d" % (slug, i)
        arr.append("        { t: '%s-t.jpg', m: '%s-m.jpg', f: '%s.jpg' }%s" % (base, base, base, "," if i < 3 else ""))
    arr.append("      ],")
    src = src.replace(anchor, "\n".join(arr) + "\n" + anchor)
    print("  + photos 已写入", name)

open(gf, "w", encoding="utf-8").write(src)
print("完成")
