"""抓一组「菜系菜品照」，给美食页做配图。

餐厅本身的实拍在 Wikimedia Commons 上基本没有（小馆子没有词条），
所以这里用同菜系的菜品照做视觉锚点，页面上会注明「菜系示意」。

产出：img/food/<key>.jpg 以及 -t / -m 两档小图
"""
import io
import os
import sys
import time

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
import urllib.parse
import urllib.request

from PIL import Image

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(APP, "img", "food")
PROXY = os.environ.get("HTTPS_PROXY") or os.environ.get("HTTP_PROXY") or ""

opener = urllib.request.build_opener(
    urllib.request.ProxyHandler({"http": PROXY, "https": PROXY})
) if PROXY else urllib.request.build_opener()
opener.addheaders = [("User-Agent", "travel-plan-app/1.0 (personal trip planner)")]

DISHES = {
    "breakfast": "biscuits and gravy breakfast",
    "brunch": "eggs benedict brunch",
    "sandwich": "club sandwich",
    "burger": "cheeseburger fries",
    "barbecue": "barbecue pulled pork plate",
    "cuban": "cuban sandwich",
    "taco": "tacos al pastor",
    "oyster": "raw oysters plate",
    "crab": "stone crab claws",
    "seafood": "grilled fish plate restaurant",
    "italian": "pasta carbonara",
    "asian": "pad thai noodles",
    "steak": "steak dinner plate",
    "icecream": "ice cream cone",
    "diner": "pancakes stack breakfast",
}

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


def search(term):
    q = urllib.parse.urlencode({
        "action": "query", "generator": "search", "gsrnamespace": "6",
        "gsrsearch": "filetype:bitmap " + term, "gsrlimit": "8",
        "prop": "imageinfo", "iiprop": "url|size", "iiurlwidth": "960", "format": "json",
    })
    with opener.open("https://commons.wikimedia.org/w/api.php?" + q, timeout=45) as r:
        import json
        return json.loads(r.read().decode("utf-8"))


def main():
    os.makedirs(OUT, exist_ok=True)
    ok = 0
    for key, term in DISHES.items():
        if os.path.exists(os.path.join(OUT, key + '.jpg')):
            print('-', key, '已存在，跳过')
            continue
        time.sleep(2.5)
        try:
            j = search(term)
        except Exception as e:
            print("查询失败", key, e)
            continue
        pages = (j.get("query") or {}).get("pages") or {}
        cand = None
        for p in sorted(pages.values(), key=lambda x: x.get("index", 99)):
            ii = (p.get("imageinfo") or [{}])[0]
            w, h = ii.get("width", 0), ii.get("height", 0)
            if ii.get("thumburl") and w >= 700 and w > h:
                cand = ii
                break
        if not cand:
            print("没找到", key)
            continue
        try:
            with opener.open(cand["thumburl"].split("?")[0], timeout=60) as r:
                raw = r.read()
            im = Image.open(io.BytesIO(raw)).convert("RGB")
            for suffix, size, q in SIZES:
                name = key + (("-" + suffix) if suffix else "") + ".jpg"
                cover(im, size).save(os.path.join(OUT, name), "JPEG", quality=q, optimize=True)
            ok += 1
            print("✓", key, os.path.getsize(os.path.join(OUT, key + ".jpg")) // 1024, "KB")
        except Exception as e:
            print("下载失败", key, e)
    total = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
    print("\n完成 %d 张菜品图，目录合计 %.0f KB" % (ok, total / 1024))


if __name__ == "__main__":
    main()
