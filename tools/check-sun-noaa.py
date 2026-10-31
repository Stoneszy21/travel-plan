"""独立复核日出日落：用 NOAA / Almanac 经典算法（与 App 里的 SunCalc 风格实现不同），
再用朔望月周期算月相，跟 App 的输出逐日对比。

时区不硬编码，从 astro-out.json 里的 tzOffsetMin 读（App 按行程时区算出来的）。

用法：
    node tools/check-astro.js        # 先跑 App 自己的算法，生成 tools/astro-out.json
    python tools/check-sun-noaa.py   # 再用另一套算法对比
"""
import json
import math
import os
import datetime as dt
from math import sin, cos, tan, asin, atan, radians, degrees, floor

HERE = os.path.dirname(os.path.abspath(__file__))


def sun_times(lat, lon, date, tz_h):
    """返回 {'rise': 本地小时, 'set': 本地小时}"""
    n = date.timetuple().tm_yday
    lng_hour = lon / 15.0
    out = {}
    for kind in ("rise", "set"):
        t = n + ((6 - lng_hour) / 24.0 if kind == "rise" else (18 - lng_hour) / 24.0)
        m = 0.9856 * t - 3.289
        l = m + 1.916 * sin(radians(m)) + 0.020 * sin(radians(2 * m)) + 282.634
        l %= 360
        ra = degrees(atan(0.91764 * tan(radians(l)))) % 360
        lq = floor(l / 90) * 90
        raq = floor(ra / 90) * 90
        ra = (ra + (lq - raq)) / 15.0
        sin_dec = 0.39782 * sin(radians(l))
        cos_dec = cos(asin(sin_dec))
        cos_h = (cos(radians(90.833)) - sin_dec * sin(radians(lat))) / (cos_dec * cos(radians(lat)))
        if abs(cos_h) > 1:
            out[kind] = None
            continue
        h = (360 - degrees(math.acos(cos_h))) if kind == "rise" else degrees(math.acos(cos_h))
        h /= 15.0
        tt = h + ra - 0.06571 * t - 6.622
        ut = (tt - lng_hour) % 24
        out[kind] = (ut + tz_h) % 24
    return out


def hhmm(x):
    if x is None:
        return "--"
    h = int(x) % 24
    m = int(round((x - int(x)) * 60))
    if m == 60:
        h, m = (h + 1) % 24, 0
    return f"{h:02d}:{m:02d}"


def tomin(s):
    h, m = s.split(":")
    return int(h) * 60 + int(m)


# 朔望月：以 2000-01-06 18:14 UTC 的新月为基准
NEW_MOON_EPOCH = dt.datetime(2000, 1, 6, 18, 14, tzinfo=dt.timezone.utc)
SYNODIC = 29.530588853

data = json.load(open(os.path.join(HERE, "astro-out.json"), encoding="utf-8"))
print(f"{'date':<12}{'app rise':<10}{'noaa rise':<11}{'d':<5}"
      f"{'app set':<10}{'noaa set':<11}{'d':<5}{'app age':<9}{'synodic':<9}{'d':<6}")
worst = 0
worst_age = 0
for r in data:
    y, m, d = map(int, r["date"].split("-"))
    date = dt.date(y, m, d)
    tz_h = r["tzOffsetMin"] / 60.0
    t = sun_times(r["lat"], r["lng"], date, tz_h)
    dr = (tomin(r["rise"]) - tomin(hhmm(t["rise"])) + 720) % 1440 - 720
    ds = (tomin(r["set"]) - tomin(hhmm(t["set"])) + 720) % 1440 - 720
    noon = dt.datetime(y, m, d, 12, 0, tzinfo=dt.timezone(dt.timedelta(minutes=r["tzOffsetMin"])))
    age = ((noon - NEW_MOON_EPOCH).total_seconds() / 86400) % SYNODIC
    da = r["age"] - age
    worst = max(worst, abs(dr), abs(ds))
    worst_age = max(worst_age, abs(da))
    print(f"{r['date']:<12}{r['rise']:<10}{hhmm(t['rise']):<11}{dr:<5}"
          f"{r['set']:<10}{hhmm(t['set']):<11}{ds:<5}{r['age']:<9}{age:<9.1f}{da:<6.1f}")

print()
print(f"sun max diff: {worst} min (two independent algorithms, expect <= 3)")
print(f"moon age max diff: {worst_age:.2f} d (simplified moon model, expect <= 1)")
print("RESULT:", "PASS" if worst <= 3 and worst_age <= 1.0 else "CHECK")
