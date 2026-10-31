// 行程 ↔ 景点卡片 覆盖比对（含别名与「园内项目归属园区」判断）
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

// 不需要单独卡片的：后勤动作
const LOGISTICS = /回酒店|退房|入住|休息|准备|出发|过夜|check-?in|取行李|还车|加油|汇报|旁听|会场|Gala|交流|订.*酒店|值机|安检/;
// 属于某个大园区的子项目
const PARK_OF = [
  { park: '迪士尼 Animal Kingdom', re: /Animal Kingdom|Avatar|Safari|Na.vi|Expedition Everest|Lion King|Maharajah|Pandora|DinoLand|Kali/ },
  { park: '肯尼迪航天中心', re: /Atlantis|土星五号|Saturn|巴士|Gateway|Heroes|IMAX|火箭花园|KSC|航天中心|Moon Rock|商店买纪念品/ }
];
// 名称别名
const ALIAS = [
  [/scenic boat tour|运河游船.*winter|winter.*boat/i, 'Winter Park Scenic Boat Tour'],
  [/renninger/i, "Renninger's Mt. Dora 跳蚤市场 + 古董中心"],
  [/farmers.*market|农贸市集/i, "Winter Park Farmers' Market"],
  [/morse|蒂芙尼/i, 'Morse Museum of American Art'],
  [/park avenue/i, 'Park Avenue'],
  [/casa feliz/i, 'Casa Feliz Historic Home'],
  [/kraft azalea/i, 'Kraft Azalea Garden'],
  [/history center/i, 'Orange County Regional History Center'],
  [/mount dora 老城/i, 'Mount Dora 老城'],
  [/riverwalk/i, 'Fort Lauderdale Riverwalk'],
  [/wynwood/i, 'Wynwood Walls'],
  [/south beach|ocean drive/i, 'South Beach / Ocean Drive'],
  [/water taxi|水上巴士/i, 'Water Taxi（运河水上巴士）'],
  [/劳德代尔堡海滩|las olas 逛街/i, 'Fort Lauderdale Beach（含 Las Olas）'],
  [/lake baldwin|狗公园/i, 'Lake Baldwin 狗公园'],
  [/海滩散步|早餐 . 海滩/i, 'Fort Lauderdale Beach（含 Las Olas）'],
  [/lake eola/i, 'Lake Eola Park'],
  [/public library|图书馆/i, 'Orlando Public Library'],
  [/church street/i, 'Church Street Station'],
  [/bonnet/i, 'Bonnet House Museum & Gardens'],
  [/nsu|art museum/i, 'NSU Art Museum'],
  [/vizcaya/i, 'Vizcaya Museum & Gardens'],
  [/blue spring|海牛/i, 'Blue Spring State Park'],
  [/rollins/i, 'Rollins College'],
  [/florida southern|赖特校园|fsc|校园自由逛/i, 'Florida Southern College（赖特校园）']
];

const names = new Set((G.sights || []).map(s => s.name));

function resolved(itemName, date) {
  if (names.has(itemName)) return itemName;
  if (date === '11-21' && /运河游船|water taxi/.test(itemName)) return 'Water Taxi（运河水上巴士）';
  if (date === '11-14' && /运河游船/.test(itemName)) return 'Winter Park Scenic Boat Tour';
  for (const [re, target] of ALIAS) {
    if (re.test(itemName) && names.has(target)) return target;
  }
  for (const p of PARK_OF) {
    if (p.re.test(itemName) && names.has(p.park)) return p.park + '（园区内项目）';
  }
  return null;
}

const rows = [];
(T.days || []).forEach(d => {
  (d.items || []).forEach(it => {
    if (it.type === 'divider' || !it.name) return;
    if (!/^(sight|shop|landmark|other)$/.test(it.type)) return;   // 只检查「要去的地方」，餐/交通/活动不算
    if (LOGISTICS.test(it.name)) return;
    rows.push({ date: d.date.slice(5), name: it.name, r: resolved(it.name, d.date.slice(5)) });
  });
});

let bad = 0, park = 0;
let last = '';
console.log('=== 行程目的地覆盖 ===');
rows.forEach(r => {
  if (r.date !== last) { console.log('\n' + r.date); last = r.date; }
  if (!r.r) { console.log('  ✗ ' + r.name); bad++; }
  else if (/园区内项目/.test(r.r)) { park++; }
  else console.log('  ✓ ' + r.name);
});
console.log('\n需要梳理的目的地 ' + rows.length + ' 处：独立景点 ' + (rows.length - bad - park) + '，园区内项目 ' + park + '，缺卡片 ' + bad);

if (bad) process.exitCode = 1;
