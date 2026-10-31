// 静态检查：内联脚本语法 + JS 里引用的 id 是否都存在 + JS 生成的 class 是否有样式
// 用法：node tools/check-static.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const APP = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(APP, 'index.html'), 'utf8');

// 1. 内联脚本（唯一一个没有 src 的 script 块）
const blocks = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
if (blocks.length !== 1) {
  console.log('内联脚本块数量异常:', blocks.length);
  process.exit(1);
}
const js = blocks[0];

// 2. 语法检查
const targets = [
  ['index.html <script>', js],
  ['sw.js', fs.readFileSync(path.join(APP, 'sw.js'), 'utf8')],
  ['trip-data.js', fs.readFileSync(path.join(APP, 'trip-data.js'), 'utf8')]
];
for (const [name, src] of targets) {
  try {
    new vm.Script(src, { filename: name });
    console.log('语法 OK  :', name);
  } catch (e) {
    console.log('语法 FAIL:', name, '-', e.message);
    process.exitCode = 1;
  }
}
try {
  JSON.parse(fs.readFileSync(path.join(APP, 'manifest.webmanifest'), 'utf8'));
  console.log('JSON OK  : manifest.webmanifest');
} catch (e) {
  console.log('JSON FAIL: manifest.webmanifest -', e.message);
  process.exitCode = 1;
}

// 3. id 一致性
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
const used = new Set();
for (const m of js.matchAll(/\$\('#([A-Za-z0-9_-]+)'/g)) used.add(m[1]);
for (const m of js.matchAll(/getElementById\('([A-Za-z0-9_-]+)'/g)) used.add(m[1]);

const dynamic = ['day-', 'view-'];           // 运行时拼接出来的 id 前缀
const missing = [...used].filter(x => !ids.has(x) && !dynamic.some(p => x.startsWith(p)));
console.log('引用 id 数:', used.size, '| HTML 定义:', ids.size);
console.log(missing.length ? '缺失 id: ' + missing.join(', ') : 'ID 引用全部存在');
if (missing.length) process.exitCode = 1;

// 4. class 是否都有样式
const cssClasses = new Set([...html.matchAll(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g)].map(m => m[1]));
const usedClasses = new Set();
for (const m of js.matchAll(/el\('[a-z0-9]+',\s*'([^']+)'/g)) {
  m[1].split(/\s+/).filter(Boolean).forEach(c => usedClasses.add(c));
}
const noStyle = [...usedClasses].filter(c => !cssClasses.has(c));
console.log(noStyle.length ? '没有样式的 class: ' + noStyle.join(', ') : 'JS 生成的 class 都有样式');
if (noStyle.length) process.exitCode = 1;
