// 数据完整性自检：照片文件是否存在、交通是否有坐标、餐次是否齐全
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const APP = path.join(__dirname, '..');
const ctx = { window: {}, console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(APP, 'guides.js'), 'utf8'), ctx);
vm.runInContext(fs.readFileSync(path.join(APP, 'trip-data.js'), 'utf8'), ctx);

const G = ctx.window.TRIP_GUIDES;
const T = ctx.window.TRIP;
let bad = 0;
const fail = m => { console.log('  ✗ ' + m); bad++; };

// 1) 照片引用是否都在磁盘上
let photoCount = 0;
(G.sights || []).forEach(s => {
  (s.photos || []).forEach(p => {
    photoCount++;
    const paths = (typeof p === 'string') ? [p] : [p.t, p.m, p.f].filter(Boolean);
    paths.forEach(x => {
      if (!fs.existsSync(path.join(APP, x))) fail(s.name + ' 缺图：' + x);
    });
  });
  if (!s.photos || !s.photos.length) fail(s.name + ' 没有照片');
});
console.log('景点 ' + (G.sights || []).length + ' 个，引用照片 ' + photoCount + ' 张');

// 2) 交通必须有起终点坐标（距离和地图快照都依赖它）
(G.ground || []).forEach(g => {
  if (!g.from || !g.to) fail('交通缺坐标：' + g.title);
  if (!g.options || !g.options.length) fail('交通没有方案：' + g.title);
});
console.log('交通 ' + (G.ground || []).length + ' 条');

// 3) 美食：每天 4 餐，槽位齐全
(G.food || []).forEach(d => {
  const slots = (d.meals || []).map(m => m.slot);
  ['早餐', '午餐', '晚餐', '夜宵'].forEach(s => {
    if (slots.indexOf(s) < 0) fail(d.day + ' 缺 ' + s);
  });
});
console.log('美食 ' + (G.food || []).length + ' 天，共 ' + (G.food || []).reduce((n, d) => n + d.meals.length, 0) + ' 餐');

// 4) 酒店：入住早于离店
(G.hotels || []).forEach(h => {
  if (h.checkIn && h.checkOut && h.checkIn >= h.checkOut) fail(h.name + ' 日期反了');
});
console.log('酒店 ' + (G.hotels || []).length + ' 条');

// 5) 行程：每天都有 base、日期连续、点位有名字和时间
const days = T.days || [];
console.log('行程 ' + days.length + ' 天，点位 ' + days.reduce((n, d) => n + (d.items || []).filter(i => i.type !== 'divider').length, 0));
days.forEach((d, i) => {
  if (!d.base) fail(d.date + ' 缺 base 坐标');
  (d.items || []).forEach(it => {
    if (it.type === 'divider') return;
    if (!it.name) fail(d.date + ' 有点位没名字');
    if (it.time === undefined) fail(d.date + ' 点位缺时间：' + it.name);
    if (typeof it.lat === 'number' && typeof it.lng === 'number') {
      if (it.lat < -90 || it.lat > 90 || it.lng < -180 || it.lng > 180) fail(d.date + ' 坐标越界：' + it.name);
    }
  });
  if (i > 0) {
    const prev = new Date(days[i - 1].date + 'T00:00:00Z');
    const cur = new Date(d.date + 'T00:00:00Z');
    const diff = Math.round((cur - prev) / 86400000);
    if (diff !== 1) fail('日期不连续：' + days[i - 1].date + ' → ' + d.date);
  }
});

console.log(bad ? '\n' + bad + ' 项问题' : '\n全部通过');
process.exitCode = bad ? 1 : 0;
