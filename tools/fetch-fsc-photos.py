"""补齐 FSC（赖特校园）的照片：按文件标题精确抓取。"""
import io
import json
import os
import urllib.parse
import urllib.request

from PIL import Image

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(APP, "img", "sights")
PROXY = os.environ.get("HTTPS_PROXY") or os.environ.get("HTTP_PROXY") or ""

opener = urllib.request.build_opener(
    urllib.request.ProxyHandler({"http": PROXY, "https": PROXY})
) if PROXY else urllib.request.build_opener()
opener.addheaders = [("User-Agent", "travel-plan-app/1.0 (personal trip planner)")]

TITLES = [
    "File:Annie Pfeiffer Chapel.JPG",
    "File:Lakeland FSC Water Dome pool02.jpg",
    "File:Lakeland FSC Water Dome pool05.jpg",
]

TARGET = (720, 480)


def crop_32(im):
    w, h = im.size
    target = 3 / 2
    if w / h > target:
        nw = int(h * target)
        left = (w - nw) // 2
        im = im.crop((left, 0, left + nw, h))
    else:
        nh = int(w / target)
        top = int((h - nh) * 0.35)
        im = im.crop((0, top, w, top + nh))
    return im.resize(TARGET, Image.LANCZOS)


def info(title):
    q = urllib.parse.urlencode({
        "action": "query", "titles": title, "prop": "imageinfo",
        "iiprop": "url|size|extmetadata", "iiurlwidth": "960", "format": "json",
    })
    with opener.open("https://commons.wikimedia.org/w/api.php?" + q, timeout=45) as r:
        j = json.loads(r.read().decode("utf-8"))
    for p in (j.get("query") or {}).get("pages", {}).values():
        return (p.get("imageinfo") or [{}])[0], p.get("title", title)
    return {}, title


credits_path = os.path.join(OUT, "credits.json")
credits = json.load(open(credits_path, encoding="utf-8")) if os.path.exists(credits_path) else []
credits = [c for c in credits if not c["file"].startswith("fsc-")]

for i, title in enumerate(TITLES, 1):
    ii, real = info(title)
    if not ii.get("thumburl"):
        print("skip", title)
        continue
    url = ii["thumburl"].split("?")[0]
    with opener.open(url, timeout=60) as r:
        raw = r.read()
    im = crop_32(Image.open(io.BytesIO(raw)).convert("RGB"))
    name = "fsc-%d.jpg" % i
    im.save(os.path.join(OUT, name), "JPEG", quality=76, optimize=True)
    meta = ii.get("extmetadata") or {}
    import re
    clean = lambda s: " ".join(re.sub(r"<[^>]+>", "", s or "").split())[:120]
    credits.append({
        "file": name, "title": real,
        "author": clean((meta.get("Artist") or {}).get("value", "")),
        "license": clean((meta.get("LicenseShortName") or {}).get("value", "")),
        "source": "https://commons.wikimedia.org/wiki/" + urllib.parse.quote(real.replace(" ", "_")),
    })
    print("ok", name, os.path.getsize(os.path.join(OUT, name)) // 1024, "KB")

json.dump(credits, open(credits_path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("credits 共", len(credits), "条")
