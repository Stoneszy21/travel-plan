"""把景点照片拼成一张联络表，方便一眼检查哪几张不合适。"""
import os

from PIL import Image, ImageDraw

APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(APP, "img", "sights")
OUT = os.path.join(APP, "_contact.png")

SLUGS = ["rollins", "library", "eola", "fsc", "bluespring", "animal", "ksc", "bonnet", "nsu", "vizcaya"]
COLS = 3
CW, CH = 240, 160
LABEL = 16

rows = []
for slug in SLUGS:
    files = [os.path.join(SRC, "%s-%d.jpg" % (slug, i)) for i in (1, 2, 3)]
    files = [f for f in files if os.path.exists(f)]
    rows.append((slug, files))

height = len(rows) * (CH + LABEL)
sheet = Image.new("RGB", (COLS * CW, height), (30, 32, 38))
d = ImageDraw.Draw(sheet)

y = 0
for slug, files in rows:
    d.text((4, y + 3), slug, fill=(120, 220, 200))
    for i, f in enumerate(files):
        im = Image.open(f).resize((CW - 4, CH - 4), Image.LANCZOS)
        sheet.paste(im, (i * CW + 2, y + LABEL))
    y += CH + LABEL

sheet.save(OUT)
print("saved", OUT, sheet.size)
