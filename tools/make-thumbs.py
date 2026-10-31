"""给景点照片生成两档小图，用于列表显示。

产出（每个原图 xxx-1.jpg）：
    xxx-1-t.jpg   120x120 居中裁方，约 5-8 KB   —— 卡片头部缩略图
    xxx-1-m.jpg   360x240 3:2，约 20-30 KB      —— 列表里的照片条
原图保留，只在点开大图时加载。
"""
import os
import sys

from PIL import Image

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(APP, "img", "sights")


def cover(im, size):
    """居中裁成目标比例再缩放（cover）"""
    tw, th = size
    w, h = im.size
    target = tw / th
    if w / h > target:
        nw = int(h * target)
        left = (w - nw) // 2
        im = im.crop((left, 0, left + nw, h))
    else:
        nh = int(w / target)
        top = int((h - nh) * 0.35)
        im = im.crop((0, top, w, top + nh))
    return im.resize(size, Image.LANCZOS)


def main():
    files = sorted(f for f in os.listdir(SRC) if f.endswith(".jpg") and not f.endswith("-t.jpg") and not f.endswith("-m.jpg"))
    total_t = total_m = 0
    for f in files:
        p = os.path.join(SRC, f)
        im = Image.open(p).convert("RGB")
        base = f[:-4]

        t = cover(im, (120, 120))
        tp = os.path.join(SRC, base + "-t.jpg")
        t.save(tp, "JPEG", quality=72, optimize=True)

        m = cover(im, (360, 240))
        mp = os.path.join(SRC, base + "-m.jpg")
        m.save(mp, "JPEG", quality=72, optimize=True)

        total_t += os.path.getsize(tp)
        total_m += os.path.getsize(mp)

    n = len(files)
    print("生成 %d 个缩略图 + %d 个中图" % (n, n))
    print("缩略图合计 %.0f KB（平均 %.1f KB）" % (total_t / 1024, total_t / 1024 / n))
    print("中图合计 %.0f KB（平均 %.1f KB）" % (total_m / 1024, total_m / 1024 / n))


if __name__ == "__main__":
    main()
