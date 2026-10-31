"""从 Wikimedia Commons 抓每个景点的实景照片，裁成 3:2、压到 720x480，存进 App 本地。

用法：python tools/fetch-photos.py
输出：img/sights/<slug>-<n>.jpg  +  img/sights/credits.json
"""
import io
import json
import sys
import os
import urllib.parse
import urllib.request

from PIL import Image, ImageStat

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(APP, "img", "sights")
PROXY = os.environ.get("HTTPS_PROXY") or os.environ.get("HTTP_PROXY") or ""

opener = urllib.request.build_opener(
    urllib.request.ProxyHandler({"http": PROXY, "https": PROXY})
) if PROXY else urllib.request.build_opener()
opener.addheaders = [("User-Agent", "travel-plan-app/1.0 (personal trip planner)")]

SIGHTS = [
    ("rollins",    "Rollins College campus Winter Park"),
    ("library",    "Orlando Public Library Florida"),
    ("eola",       "Lake Eola Park Orlando"),
    ("fsc",        "Florida Southern College Annie Pfeiffer Chapel"),
    ("bluespring", "Blue Spring State Park manatee"),
    ("animal",     "Tree of Life Disney Animal Kingdom"),
    ("ksc",        "Kennedy Space Center Vehicle Assembly Building"),
    ("bonnet",     "Bonnet House Fort Lauderdale"),
    ("nsu",        "NSU Art Museum Fort Lauderdale"),
    ("vizcaya",    "Vizcaya Museum and Gardens Miami"),
]

WANT = 3
TARGET = (720, 480)


def api(term, limit=12):
    q = urllib.parse.urlencode({
        "action": "query",
        "generator": "search",
        "gsrnamespace": "6",
        "gsrsearch": "filetype:bitmap " + term,
        "gsrlimit": str(limit),
        "prop": "imageinfo",
        "iiprop": "url|size|extmetadata",
        "iiurlwidth": "960",
        "format": "json",
    })
    url = "https://commons.wikimedia.org/w/api.php?" + q
    with opener.open(url, timeout=45) as r:
        return json.loads(r.read().decode("utf-8"))


def clean_html(s):
    import re
    s = re.sub(r"<[^>]+>", "", s or "")
    return " ".join(s.split())[:120]


def crop_32(im):
    w, h = im.size
    target = 3 / 2
    if w / h > target:          # 太宽，裁两侧
        nw = int(h * target)
        left = (w - nw) // 2
        im = im.crop((left, 0, left + nw, h))
    else:                        # 太高，裁上下
        nh = int(w / target)
        top = int((h - nh) * 0.35)   # 稍微偏上，保留天空/立面
        im = im.crop((0, top, w, top + nh))
    return im.resize(TARGET, Image.LANCZOS)


def main():
    os.makedirs(OUT, exist_ok=True)
    credits = []
    for slug, term in SIGHTS:
        try:
            data = api(term)
        except Exception as e:
            print("API 失败", slug, e)
            continue
        pages = (data.get("query") or {}).get("pages") or {}
        cands = []
        for p in pages.values():
            ii = (p.get("imageinfo") or [{}])[0]
            if not ii.get("thumburl"):
                continue
            w, hh = ii.get("width", 0), ii.get("height", 0)
            if w < 700 or hh < 400:
                continue
            if w / hh < 1.1:      # 只要横图
                continue
            t = (p.get('title') or '').upper()
            if 'HABS' in t or 'HAER' in t or t.endswith('.TIF'):
                continue          # 跳过档案馆的黑白测绘照
            import re as _re
            if _re.search(r'PLAQUE|SIGN|LOGO|MAP|PORTRAIT|BUST|STATUE|MONUMENT|HISTORICAL MARKER|INTERPRETIVE', t):
                continue          # 跳过铭牌、标志、地图这类说明性图片
            cands.append((p.get("index", 99), p.get("title", ""), ii))
        cands.sort(key=lambda x: x[0])

        picked = 0
        for idx, title, ii in cands:
            if picked >= WANT:
                break
            url = ii["thumburl"].split("?")[0]
            try:
                with opener.open(url, timeout=60) as r:
                    raw = r.read()
                im = Image.open(io.BytesIO(raw)).convert("RGB")
                im = crop_32(im)
                name = "%s-%d.jpg" % (slug, picked + 1)
                im.save(os.path.join(OUT, name), "JPEG", quality=76, optimize=True)
                meta = ii.get("extmetadata") or {}
                credits.append({
                    "file": name,
                    "title": title,
                    "author": clean_html((meta.get("Artist") or {}).get("value", "")),
                    "license": clean_html((meta.get("LicenseShortName") or {}).get("value", "")),
                    "source": "https://commons.wikimedia.org/wiki/" + urllib.parse.quote(title.replace(" ", "_")),
                })
                picked += 1
                print("✓", slug, name, len(raw) // 1024, "KB →", os.path.getsize(os.path.join(OUT, name)) // 1024, "KB")
            except Exception as e:
                print("  下载失败", slug, e)
        if picked == 0:
            print("✗", slug, "没有可用图片")

    with open(os.path.join(OUT, "credits.json"), "w", encoding="utf-8") as f:
        json.dump(credits, f, ensure_ascii=False, indent=1)
    total = sum(os.path.getsize(os.path.join(OUT, c["file"])) for c in credits)
    print("\n共 %d 张，合计 %.1f MB" % (len(credits), total / 1024 / 1024))


if __name__ == "__main__":
    main()
