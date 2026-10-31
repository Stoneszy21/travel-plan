// 给每天的行程加 summary（一句话核心）和 tag（标签）
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'trip-data.js');
let src = fs.readFileSync(file, 'utf8');

const META = {
  '2026-11-13': ['上海 10:00 起飞 → 底特律转机 → 劳德代尔堡 18:40 落地，当晚两个选择', '航班'],
  '2026-11-14': ['Winter Park 校园 + 奥兰多市区；下午可选赖特校园或市区线', '城市'],
  '2026-11-15': ['Blue Spring 皮划艇看海牛，海牛季第一天', '自然'],
  '2026-11-16': ['迪士尼 Animal Kingdom 全天，走路最多的一天', '玩'],
  '2026-11-17': ['肯尼迪航天中心 9:00–15:30，晚上开到劳德代尔堡', '重头戏'],
  '2026-11-18': ['WAF Day 1：14:00 桐安里、17:00 南山里', '汇报'],
  '2026-11-19': ['WAF Day 2：11:00 东石村养老、15:20 金光汇', '汇报'],
  '2026-11-20': ['WAF Day 3：19:00 Gala 颁奖典礼', '汇报'],
  '2026-11-21': ['自由日：A 劳德代尔堡慢游 / B 迈阿密建筑线', '自由'],
  '2026-11-22': ['07:20 值机，09:20 起飞回上海', '返程']
};

let count = 0;
for (const [date, [summary, tag]] of Object.entries(META)) {
  const re = new RegExp("(      date: '" + date + "',\\n      title: '[^']*',\\n      area: '[^']*',\\n)");
  if (!re.test(src)) { console.log('未匹配：' + date); continue; }
  src = src.replace(re, `$1      summary: '${summary}',\n      tag: '${tag}',\n`);
  count++;
}

fs.writeFileSync(file, src, 'utf8');
console.log('已加 summary/tag：' + count + ' 天');
