/* 行程 App · 离线缓存
 *
 * 两层缓存：
 *   1. 应用文件（同源）——网络优先，断网回落。内容会更新，所以在线时总是先取网络。
 *      因为 GitHub Pages 给了 ETag + max-age=600，正常打开基本是 304，不重复下载。
 *   2. 地图瓦片（tile.openstreetmap.org）——缓存优先 + 后台更新。
 *      OSM 瓦片是 no-cache，不缓存的话每次看地图都要重新验证几十张。
 *      只缓存「用户实际看过的」瓦片，不做预下载（符合 OSM 的 tile usage policy）。
 */
const CACHE = 'trip-v8';
const TILE_CACHE = 'tiles-v1';
const TILE_MAX = 500;

const ASSETS = [
  './',
  './index.html',
  './trip-data.js',
  './guides.js',
  './manifest.webmanifest',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .catch(() => { })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE && k !== TILE_CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// 瓦片缓存别无限涨：超过上限就删最早的一批
async function trimTiles(cache, max) {
  const keys = await cache.keys();
  if (keys.length <= max) return;
  const drop = keys.length - max;
  for (let i = 0; i < drop; i++) await cache.delete(keys[i]);
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (_) { return; }

  // ---- 地图瓦片：缓存优先，不发重复请求 ----
  // 注意：<img> 发出的是 no-cors 请求，响应是 opaque（status 0、ok 为 false），
  // 只能原样缓存，读不了 body、也改不了头。
  if (url.hostname === 'tile.openstreetmap.org') {
    e.respondWith(
      caches.open(TILE_CACHE).then(async cache => {
        const hit = await cache.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res && (res.ok || res.type === 'opaque')) {
            cache.put(req, res.clone());
            trimTiles(cache, TILE_MAX);
          }
          return res;
        } catch (err) {
          return new Response('', { status: 504, statusText: 'offline' });
        }
      })
    );
    return;
  }
  // ---- 其他跨域请求（天气、路由）：不接管 ----
  if (url.origin !== location.origin) return;

  // ---- 应用文件：网络优先，失败回落缓存 ----
  // cache: 'no-store' 是关键：GitHub Pages 给 max-age=600，
  // 不加这个的话 fetch 会吃到浏览器 HTTP 缓存，部署后最多 10 分钟还是旧文件。
  e.respondWith(
    fetch(req, { cache: 'no-store' })
      .then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => { });
        }
        return res;
      })
      .catch(() =>
        caches.match(req, { ignoreSearch: true })
          .then(hit => hit || caches.match('./index.html'))
      )
  );
});
