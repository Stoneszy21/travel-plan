"""把用户提供的照片接进景点图库。

用法：
    python tools/add-photo.py <源图路径> <slug> [序号]

例：
    python tools/add-photo.py "C:/Users/.../Downloads/ksc.jpg" ksc 2

效果：裁成 3:2、压到 720x480、存成 img/sights/<slug>-<序号>.jpg
      （会自动备份被覆盖的旧图到 img/sights/backup/）
"""
import os
import shutil
import sys

from PIL import Image

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(APP, "img", "sights")
BACKUP = os.path.join(OUT, "backup")
TARGET = (720, 480)


def crop_32(im):
    w, h = im.size
    t = 3 / 2
    if w / h > t:                      # 太宽：裁左右
        nw = int(h * t)
        left = (w - nw) // 2
        im = im.crop((left, 0, left + nw, h))
    else:                              # 太高：裁上下，偏上一点（保留建筑/天空）
        nh = int(w / t)
        top = int((h - nh) * 0.35)
        im = im.crop((0, top, w, top + nh))
    return im.resize(TARGET, Image.LANCZOS)


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    src, slug = sys.argv[1], sys.argv[2]
    idx = sys.argv[3] if len(sys.argv) > 3 else "1"
    if not os.path.exists(src):
        print("找不到文件:", src)
        sys.exit(1)

    im = Image.open(src)
    im = im.convert("RGB")
    w, h = im.size
    res = crop_32(im)

    os.makedirs(BACKUP, exist_ok=True)
    dst = os.path.join(OUT, "%s-%s.jpg" % (slug, idx))
    if os.path.exists(dst):
        shutil.copy2(dst, os.path.join(BACKUP, "%s-%s.jpg" % (slug, idx)))

    res.save(dst, "JPEG", quality=80, optimize=True)
    print("原图 %dx%d → %s（%d KB）" % (w, h, dst, os.path.getsize(dst) // 1024))
    print("提示：这张是你自己提供的，不用写 CC 授权；credits.json 里可标「自备」")


if __name__ == "__main__":
    main()
