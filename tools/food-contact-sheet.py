"""菜品图联络表：一眼检查每张是不是该有的东西。"""
import os

from PIL import Image, ImageDraw

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(APP, "img", "food")
OUT = os.path.join(APP, "_foodsheet.png")

keys = sorted(set(f.replace("-t.jpg", "").replace("-m.jpg", "").replace(".jpg", "")
                  for f in os.listdir(SRC) if f.endswith(".jpg")))

COLS, CW, CH, LAB = 4, 260, 170, 18
rows = (len(keys) + COLS - 1) // COLS
sheet = Image.new("RGB", (COLS * CW, rows * (CH + LAB)), (30, 32, 38))
d = ImageDraw.Draw(sheet)

for i, k in enumerate(keys):
    p = os.path.join(SRC, k + ".jpg")
    if not os.path.exists(p):
        continue
    x = (i % COLS) * CW
    y = (i // COLS) * (CH + LAB)
    d.text((x + 4, y + 3), k, fill=(120, 220, 200))
    im = Image.open(p).resize((CW - 6, CH - 6), Image.LANCZOS)
    sheet.paste(im, (x + 3, y + LAB))

sheet.save(OUT)
print("saved", OUT, sheet.size, len(keys), "种")
