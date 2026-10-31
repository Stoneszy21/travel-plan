from PIL import Image, ImageDraw

S = 512

def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))

def gradient(size):
    img = Image.new("RGB", (size, size))
    px = img.load()
    for y in range(size):
        for x in range(size):
            t = (x + y) / (2.0 * size - 2.0)
            if t <= 0.55:
                c = lerp((10, 88, 80), (16, 122, 111), t / 0.55)
            else:
                c = lerp((16, 122, 111), (24, 152, 137), (t - 0.55) / 0.45)
            px[x, y] = c
    return img

img = gradient(S).convert("RGBA")
d = ImageDraw.Draw(img, "RGBA")

# 太阳
d.ellipse([300, 78, 412, 190], fill=(250, 197, 84, 255))
d.ellipse([322, 100, 390, 168], fill=(255, 220, 138, 255))

# 远山
d.polygon([(-10, 512), (168, 186), (346, 512)], fill=(255, 255, 255, 168))
# 近山
d.polygon([(150, 512), (330, 236), (522, 512)], fill=(230, 247, 242, 240))
# 近山受光面
d.polygon([(330, 236), (522, 512), (330, 512)], fill=(255, 255, 255, 250))

import os
APP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

for size, name in [(512, "icon-512.png"), (192, "icon-192.png"), (180, "icon-180.png")]:
    img.resize((size, size), Image.LANCZOS).save(os.path.join(APP, name))

print("ok")
