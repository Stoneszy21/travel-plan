/* 行程 App · 离线缓存 + 秒开
 *
 * 两层缓存：
 *   1. 应用文件（同源）——「缓存优先 + 后台静默更新」（stale-while-revalidate）
 *      打开先用缓存，立刻出画面；同时后台拉一遍新文件，
 *      内容变了就更新缓存并通知页面「有新版本」，由用户点一下刷新。
 *      这样既秒开，又不会永远停在旧版本。
 *   2. 地图瓦片（tile.openstreetmap.org）——缓存优先 + 后台更新。
 *      OSM 瓦片是 no-cache，不缓存的话每次看地图都要重新验证几十张。
 *      只缓存「用户实际看过的」瓦片，不做预下载（符合 OSM 的 tile usage policy）。
 */
const CACHE = 'trip-v18';
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

// 轻量对比：ETag / Last-Modified / 长度，任一变就认为有新版本
function sameVersion(a, b) {
  if (!a || !b) return true;
  const ka = [a.headers.get('etag'), a.headers.get('last-modified'), a.headers.get('content-length')].join('|');
  const kb = [b.headers.get('etag'), b.headers.get('last-modified'), b.headers.get('content-length')].join('|');
  return ka === kb;
}

async function notifyClients(file) {
  const all = await self.clients.matchAll({ type: 'window' });
  all.forEach(c => c.postMessage({ type: 'update-ready', file: file }));
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

  // ---- 应用文件：缓存优先秒开 + 后台更新 ----
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req, { ignoreSearch: true });

    // 后台静默拉新（不阻塞页面）
    const refresh = (async () => {
      try {
        // no-store 绕过 GitHub Pages 的 max-age=600
        const res = await fetch(req, { cache: 'no-store' });
        if (!res || res.status !== 200 || res.type !== 'basic') return;
        if (cached && sameVersion(cached, res)) return;      // 没变就不打扰
        await cache.put(req, res.clone());
        if (cached) notifyClients(url.pathname);
      } catch (_) { }
    })();

    if (cached) {
      e.waitUntil(refresh);                                   // 让后台任务活下来
      return cached;                                          // 立即返回
    }

    // 首次访问：等网络
    try {
      const res = await fetch(req, { cache: 'no-store' });
      if (res && res.status === 200 && res.type === 'basic') {
        cache.put(req, res.clone()).catch(() => { });
      }
      return res;
    } catch (err) {
      const fb = await caches.match('./index.html');
      return fb || new Response('离线且无缓存', { status: 503 });
    }
  })());
});
