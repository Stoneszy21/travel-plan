// 天文算法自检：跑 App 里的真实代码，输出每天日出日落/月升月落/月相，并检查不变式
// 用法：node tools/check-astro.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const APP = path.join(__dirname, '..');
const dir = __dirname;
const html = fs.readFileSync(path.join(APP, 'index.html'), 'utf8');
const js = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)][0][1];

const start = js.indexOf('const TRIP = window.TRIP');
const marker = js.indexOf('* 3. 状态');
const end = js.lastIndexOf('/*', marker);
if (start < 0 || end < 0) { console.error('切片失败'); process.exit(1); }
const slice = js.slice(start, end);

const src = [
  fs.readFileSync(path.join(APP, 'trip-data.js'), 'utf8'),
  'globalThis.window = globalThis;',
  '(function(){',
  slice,
  'globalThis.__api = { TRIP, astroFor, fmtHM, zoned, phaseInfo, phaseName, dateParts, weekdayCN, dayDiff, todayInTZ };',
  '})();'
].join('\n');

const ctx = { console, Intl, Date, Math, JSON };
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(src, ctx, { filename: 'astro-harness.js' });

const api = ctx.__api;
const out = api.TRIP.days.map(d => {
  const a = api.astroFor(d);
  return {
    date: d.date,
    lat: d.base.lat,
    lng: d.base.lng,
    rise: api.fmtHM(a.rise),
    set: api.fmtHM(a.set),
    riseAz: a.riseAz == null ? null : Math.round(a.riseAz),
    setAz: a.setAz == null ? null : Math.round(a.setAz),
    goldenAm: a.goldenAm ? a.goldenAm.map(api.fmtHM) : null,
    goldenPm: a.goldenPm ? a.goldenPm.map(api.fmtHM) : null,
    blueAm: a.blueAm ? a.blueAm.map(api.fmtHM) : null,
    bluePm: a.bluePm ? a.bluePm.map(api.fmtHM) : null,
    moonRise: a.moonRise ? api.fmtHM(a.moonRise) : null,
    moonSet: a.moonSet ? api.fmtHM(a.moonSet) : null,
    phasePct: Math.round(a.phase.fraction * 100),
    phaseName: api.phaseName(a.phase.phase),
    age: +a.phase.age.toFixed(1),
    dayMin: a.rise && a.set ? Math.round((a.set - a.rise) / 60000) : null,
    riseMs: a.rise, setMs: a.set, moonRiseMs: a.moonRise, moonSetMs: a.moonSet
  };
});

console.log(JSON.stringify(out, null, 1));
fs.writeFileSync(path.join(dir, 'astro-out.json'), JSON.stringify(out, null, 1));

// 不变式检查
let bad = 0;
function chk(cond, msg) { if (!cond) { console.log('  ✗ ' + msg); bad++; } }
console.log('\n--- 不变式 ---');
out.forEach((r, i) => {
  chk(!!r.rise && !!r.set, r.date + ' 有日出日落');
  chk(r.dayMin > 0, r.date + ' 白昼为正');
  if (i > 0) {
    const prev = out[i - 1];
    const dDay = r.dayMin - prev.dayMin;
    chk(Math.abs(dDay) <= 4, r.date + ' 白昼变化合理 (' + dDay + ' 分钟)');
  }
  // 月亮每天晚 30~80 分钟升起（有点变化，放宽到 10~100）
  if (i > 0 && r.moonRiseMs && out[i - 1].moonRiseMs) {
    const dm = ((r.moonRiseMs - out[i - 1].moonRiseMs) / 60000 + 1440) % 1440;
    chk(dm > 10 && dm < 110, r.date + ' 月升每天推迟 ' + Math.round(dm) + ' 分钟');
  }
  chk(r.phasePct >= 0 && r.phasePct <= 100, r.date + ' 月相百分比有效');
  // 黄金时刻应当包住日出/日落
  if (r.goldenAm) chk(r.goldenAm[0] <= r.rise && r.rise <= r.goldenAm[1], r.date + ' 黄金时刻(早)包含日出');
  chk(r.riseAz > 90 && r.riseAz < 180, r.date + ' 冬日日出方位在东南 (' + r.riseAz + '°)');
  chk(r.setAz > 180 && r.setAz < 270, r.date + ' 冬日日落方位在西南 (' + r.setAz + '°)');
});
console.log(bad ? bad + ' 项不通过' : '全部通过');
process.exitCode = bad ? 1 : 0;
