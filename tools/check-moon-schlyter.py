"""独立复核月升月落：用 Schlyter 低精度月球轨道模型（与 App 里的 SunCalc 简化式不同来源），
逐日对比 App 的输出。

用法：
    node tools/check-astro.js            # 先生成 tools/astro-out.json
    python tools/check-moon-schlyter.py  # 再用这套模型对比
"""
import json
import math
import os
import datetime as dt
from math import sin, cos, tan, asin, atan2, sqrt, radians, degrees

HERE = os.path.dirname(os.path.abspath(__file__))


def jd(ts):
    return ts / 86400.0 + 2440587.5


def moon_ecl(d):
    """返回 (黄经, 黄纬, 地心距 km)，d 为距 2000-01-00.0 (JD 2451543.5) 的天数"""
    n = radians(125.1228 - 0.0529538083 * d)
    i = radians(5.1454)
    w = radians(318.0634 + 0.1643573223 * d)
    a, e = 60.2666, 0.054900
    m = radians(115.3654 + 13.0649929509 * d)
    ee = m + e * sin(m) * (1 + e * cos(m))
    x = a * (cos(ee) - e)
    y = a * sqrt(1 - e * e) * sin(ee)
    r = sqrt(x * x + y * y)
    v = atan2(y, x)
    xe = r * (cos(n) * cos(v + w) - sin(n) * sin(v + w) * cos(i))
    ye = r * (sin(n) * cos(v + w) + cos(n) * sin(v + w) * cos(i))
    ze = r * sin(v + w) * sin(i)
    lon = atan2(ye, xe)
    lat = atan2(ze, sqrt(xe * xe + ye * ye))

    # 主要摄动项
    ls = radians(282.9404 + 4.70935e-5 * d)
    ms = radians(356.0470 + 0.9856002585 * d)
    mm = m
    lm = n + w + mm
    dd = lm - ls
    f = lm - n
    lon += radians(
        -1.274 * sin(mm - 2 * dd)
        + 0.658 * sin(2 * dd)
        - 0.186 * sin(ms)
        - 0.059 * sin(2 * mm - 2 * dd)
        - 0.057 * sin(mm - 2 * dd + ms)
        + 0.053 * sin(mm + 2 * dd)
        + 0.046 * sin(2 * dd - ms)
        + 0.041 * sin(mm - ms)
        - 0.035 * sin(dd)
        - 0.031 * sin(mm + ms)
        - 0.015 * sin(2 * f - 2 * dd)
        + 0.011 * sin(mm - 4 * dd)
    )
    lat += radians(
        -0.173 * sin(f - 2 * dd)
        - 0.055 * sin(mm - f - 2 * dd)
        - 0.046 * sin(mm + f - 2 * dd)
        + 0.033 * sin(f + 2 * dd)
        + 0.017 * sin(2 * mm + f)
    )
    return lon, lat, r * 6378.14


def moon_alt(ts, lat, lng):
    j = jd(ts)
    d = j - 2451543.5            # Schlyter 的时间基准
    lon, blat, dist = moon_ecl(d)
    d2000 = j - 2451545.0        # 恒星时公式用 J2000
    obl = radians(23.4393 - 3.563e-7 * d2000)

    x = cos(lon) * cos(blat)
    y = sin(lon) * cos(blat)
    z = sin(blat)
    xe = x
    ye = y * cos(obl) - z * sin(obl)
    ze = y * sin(obl) + z * cos(obl)
    ra = atan2(ye, xe)
    dec = asin(ze)

    gmst = (280.46061837 + 360.98564736629 * d2000) % 360
    h = radians(gmst + lng) - ra
    phi = radians(lat)
    return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(h)), dist


def rise_set(lat, lng, day_start, day_end):
    h0 = radians(0.7275 * degrees(asin(6378.14 / 384400.0)) - 0.5667)
    step = 600
    out = {"rise": None, "set": None}
    prev_t = day_start
    prev = moon_alt(day_start, lat, lng)[0] - h0
    t = day_start + step
    while t <= day_end:
        cur = moon_alt(t, lat, lng)[0] - h0
        if prev * cur < 0:
            a, b, fa = prev_t, t, prev
            for _ in range(40):
                m = (a + b) / 2
                fm = moon_alt(m, lat, lng)[0] - h0
                if fa * fm <= 0:
                    b = m
                else:
                    a, fa = m, fm
            key = "rise" if cur > 0 else "set"
            if out[key] is None:
                out[key] = (a + b) / 2
        prev_t, prev = t, cur
        t += step
    return out


def fmt(ts, tz_h=9):
    if ts is None:
        return "—"
    return dt.datetime.fromtimestamp(ts, dt.timezone(dt.timedelta(hours=tz_h))).strftime("%H:%M")


def tomin(s):
    h, m = s.split(":")
    return int(h) * 60 + int(m)


data = json.load(open(os.path.join(HERE, "astro-out.json"), encoding="utf-8"))
print(f"{'date':<12}{'app rise':<10}{'ref rise':<10}{'d':<5}"
      f"{'app set':<10}{'ref set':<10}{'d':<5}")
worst = 0
for r in data:
    y, m, d = map(int, r["date"].split("-"))
    start = dt.datetime(y, m, d, 0, 0, tzinfo=dt.timezone(dt.timedelta(hours=9))).timestamp()
    ref = rise_set(r["lat"], r["lng"], start, start + 86400 - 1)
    dr = "" if ref["rise"] is None or r["moonRise"] is None else str(tomin(r["moonRise"]) - tomin(fmt(ref["rise"])))
    ds = "" if ref["set"] is None or r["moonSet"] is None else str(tomin(r["moonSet"]) - tomin(fmt(ref["set"])))
    for v in (dr, ds):
        if v:
            worst = max(worst, abs(int(v)))
    print(f"{r['date']:<12}{str(r['moonRise']):<10}{fmt(ref['rise']):<10}{dr:<5}"
          f"{str(r['moonSet']):<10}{fmt(ref['set']):<10}{ds:<5}")

print()
print(f"moon max diff: {worst} min (simplified model, expect <= 10)")
print("RESULT:", "PASS" if worst <= 10 else "CHECK")
