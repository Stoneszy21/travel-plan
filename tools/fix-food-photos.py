"""替换三张不对的菜品图（diner / icecream / seafood），按确切标题抓取。"""
import io
import json
import os
import sys
import time
import urllib.parse
import urllib.request

from PIL import Image

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(APP, "img", "food")
PROXY = os.environ.get("HTTPS_PROXY") or os.environ.get("HTTP_PROXY") or ""

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

opener = urllib.request.build_opener(
    urllib.request.ProxyHandler({"http": PROXY, "https": PROXY})
) if PROXY else urllib.request.build_opener()
opener.addheaders = [("User-Agent", "travel-plan-app/1.0 (personal trip planner)")]

PICKS = [
    ("diner", "File:Blueberry Pancakes in New Orleans.jpg"),
    ("icecream", "File:Strawberry Ice Cream Sundae (26853326174).jpg"),
    ("seafood", "File:Shrimp basket from Hutton's Seafood.jpg"),
]

SIZES = [("t", (120, 120), 72), ("m", (360, 240), 72), ("", (720, 480), 76)]


def cover(im, size):
    tw, th = size
    w, h = im.size
    target = tw / th
    if w / h > target:
        nw = int(h * target)
        left = (w - nw) // 2
        im = im.crop((left, 0, left + nw, h))
    else:
        nh = int(w / target)
        top = int((h - nh) * 0.4)
        im = im.crop((0, top, w, top + nh))
    return im.resize(size, Image.LANCZOS)


def info(title):
    q = urllib.parse.urlencode({
        "action": "query", "titles": title, "prop": "imageinfo",
        "iiprop": "url|size", "iiurlwidth": "960", "format": "json",
    })
    with opener.open("https://commons.wikimedia.org/w/api.php?" + q, timeout=45) as r:
        j = json.loads(r.read().decode("utf-8"))
    for p in (j.get("query") or {}).get("pages", {}).values():
        return (p.get("imageinfo") or [{}])[0]
    return {}


for key, title in PICKS:
    time.sleep(3)
    ii = info(title)
    if not ii.get("thumburl"):
        print("skip", key, title)
        continue
    try:
        with opener.open(ii["thumburl"].split("?")[0], timeout=60) as r:
            raw = r.read()
        im = Image.open(io.BytesIO(raw)).convert("RGB")
        for suffix, size, q in SIZES:
            name = key + (("-" + suffix) if suffix else "") + ".jpg"
            cover(im, size).save(os.path.join(OUT, name), "JPEG", quality=q, optimize=True)
        print("ok", key, os.path.getsize(os.path.join(OUT, key + ".jpg")) // 1024, "KB")
    except Exception as e:
        print("fail", key, e)
