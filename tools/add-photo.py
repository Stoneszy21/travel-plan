"""把用户提供的照片接进景点图库。

用法：
    python tools/add-photo.py <源图路径> <slug> [序号] [纵向裁切位置 0-1]

例：
    python tools/add-photo.py "C:/.../ksc.jpg" ksc 2
    python tools/add-photo.py "C:/.../shot.jpg" morse 2 0.40   # 截图取偏上一点的区域

效果：
    1. 自动去掉截图的黑边（上下/左右的长条纯色区）
    2. 裁成 3:2、压到 720x480，存成 img/sights/<slug>-<序号>.jpg
    3. 自动生成 -t / -m 两档小图
    旧图会先备份到 img/sights/backup/
"""
import os
import shutil
import sys

from PIL import Image

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(APP, "img", "sights")
BACKUP = os.path.join(OUT, "backup")
TARGET = (720, 480)


def trim_bars(im, thresh=16):
    """裁掉截图四周的纯黑/纯白长条（小红书、微信截图常见）"""
    g = im.convert("L")
    w, h = im.size
    px = g.load()

    def row_plain(y):
        vals = [px[int(w * i / 24), y] for i in range(24)]
        m = sum(vals) / len(vals)
        return m < thresh or m > 255 - thresh

    def col_plain(x):
        vals = [px[x, int(h * i / 24)] for i in range(24)]
        m = sum(vals) / len(vals)
        return m < thresh or m > 255 - thresh

    top = 0
    while top < h // 3 and row_plain(top):
        top += 1
    bot = h - 1
    while bot > h * 2 // 3 and row_plain(bot):
        bot -= 1
    left = 0
    while left < w // 4 and col_plain(left):
        left += 1
    right = w - 1
    while right > w * 3 // 4 and col_plain(right):
        right -= 1

    if (top, left, bot, right) == (0, 0, h - 1, w - 1):
        return im
    if bot - top < h * 0.3 or right - left < w * 0.3:
        return im                       # 裁得太多，说明判断错了，放弃
    return im.crop((left, top, right + 1, bot + 1))


def crop_32(im, anchor=0.35):
    """裁成 3:2。anchor 决定保留哪一段（0=顶部，1=底部）"""
    w, h = im.size
    t = 3 / 2
    if w / h > t:                       # 太宽：裁左右
        nw = int(h * t)
        left = (w - nw) // 2
        return im.crop((left, 0, left + nw, h)).resize(TARGET, Image.LANCZOS)

    nh = int(w / t)                     # 太高：裁上下
    top = int((h - nh) * anchor)
    return im.crop((0, top, w, top + nh)).resize(TARGET, Image.LANCZOS)


def cover_square(im, size=120):
    w, h = im.size
    s = min(w, h)
    left = (w - s) // 2
    top = (h - s) // 2
    return im.crop((left, top, left + s, top + s)).resize((size, size), Image.LANCZOS)


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    src, slug = sys.argv[1], sys.argv[2]
    idx = sys.argv[3] if len(sys.argv) > 3 else "1"
    anchor = float(sys.argv[4]) if len(sys.argv) > 4 else 0.35
    if not os.path.exists(src):
        print("找不到文件:", src)
        sys.exit(1)

    im = Image.open(src).convert("RGB")
    orig = im.size
    im = trim_bars(im)
    trimmed = im.size

    res = crop_32(im, anchor)

    os.makedirs(BACKUP, exist_ok=True)
    base = "%s-%s" % (slug, idx)
    dst = os.path.join(OUT, base + ".jpg")
    if os.path.exists(dst):
        shutil.copy2(dst, os.path.join(BACKUP, base + ".jpg"))

    res.save(dst, "JPEG", quality=80, optimize=True)

    # 同时生成缩略图与中图
    cover_square(res, 120).save(os.path.join(OUT, base + "-t.jpg"), "JPEG", quality=72, optimize=True)
    res.resize((360, 240), Image.LANCZOS).save(os.path.join(OUT, base + "-m.jpg"), "JPEG", quality=72, optimize=True)

    note = ""
    if trimmed != orig:
        note = "（已去黑边 %dx%d → %dx%d）" % (orig[0], orig[1], trimmed[0], trimmed[1])
    print("已写入 %s  原图 %dx%d %s  主图 %d KB / 缩略 %d KB / 中图 %d KB" % (
        os.path.basename(dst), orig[0], orig[1], note,
        os.path.getsize(dst) // 1024,
        os.path.getsize(os.path.join(OUT, base + "-t.jpg")) // 1024,
        os.path.getsize(os.path.join(OUT, base + "-m.jpg")) // 1024,
    ))


if __name__ == "__main__":
    main()
