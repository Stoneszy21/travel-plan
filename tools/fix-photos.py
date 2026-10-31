"""按文件标题精确替换指定的几张景点照片（用于修掉不合适的图）。"""
import io
import json
import os
import re
import urllib.parse
import time
import urllib.request

from PIL import Image

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(APP, "img", "sights")
PROXY = os.environ.get("HTTPS_PROXY") or os.environ.get("HTTP_PROXY") or ""

opener = urllib.request.build_opener(
    urllib.request.ProxyHandler({"http": PROXY, "https": PROXY})
) if PROXY else urllib.request.build_opener()
opener.addheaders = [("User-Agent", "travel-plan-app/1.0 (personal trip planner)")]

PICKS = [
    ("rollins-3.jpg", "File:Rollins College Campus.jpg"),
    ("animal-3.jpg", "File:Expedition Everest.jpg"),
    ("ksc-2.jpg", "File:Space Shuttle Atlantis exhibit, Kennedy Space Center, Cape Canaveral, FL, KW (15545743177).jpg"),
    ("bonnet-1.jpg", "File:Bonnet House Museum & Gardens (Fort Lauderdale, Florida) 001.jpg"),
    ("nsu-3.jpg", "File:Museum of Art Fort Lauderdale, exterior.JPG"),
    ("vizcaya-1.jpg", "File:VizcayaMansion.JPG"),
    ("vizcaya-2.jpg", "File:Stone barge, Vizcaya Museum and Gardens , Miami 060524 DSC6654.jpg"),
]

TARGET = (720, 480)


def crop_32(im):
    w, h = im.size
    t = 3 / 2
    if w / h > t:
        nw = int(h * t)
        left = (w - nw) // 2
        im = im.crop((left, 0, left + nw, h))
    else:
        nh = int(w / t)
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


def clean(s):
    return " ".join(re.sub(r"<[^>]+>", "", s or "").split())[:120]


credits_path = os.path.join(OUT, "credits.json")
credits = json.load(open(credits_path, encoding="utf-8"))
by_file = {c["file"]: c for c in credits}

for fname, title in PICKS:
    time.sleep(3)
    ii, real = info(title)
    if not ii.get("thumburl"):
        print("skip", fname, title)
        continue
    try:
        with opener.open(ii["thumburl"].split("?")[0], timeout=60) as r:
            raw = r.read()
        im = crop_32(Image.open(io.BytesIO(raw)).convert("RGB"))
        im.save(os.path.join(OUT, fname), "JPEG", quality=76, optimize=True)
        meta = ii.get("extmetadata") or {}
        by_file[fname] = {
            "file": fname,
            "title": real,
            "author": clean((meta.get("Artist") or {}).get("value", "")),
            "license": clean((meta.get("LicenseShortName") or {}).get("value", "")),
            "source": "https://commons.wikimedia.org/wiki/" + urllib.parse.quote(real.replace(" ", "_")),
        }
        print("ok", fname, os.path.getsize(os.path.join(OUT, fname)) // 1024, "KB")
    except Exception as e:
        print("fail", fname, e)

json.dump(list(by_file.values()), open(credits_path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("credits", len(by_file))
