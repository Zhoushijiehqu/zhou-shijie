/**
 * sw.js - 游戏小屋 Service Worker
 * 策略：
 *   - 同源静态资源（HTML/CSS/JS/SVG/数据）：stale-while-revalidate
 *   - Google Fonts：network-first，失败时尝试缓存
 *   - 导航请求：network-first，离线回退缓存
 */
const CACHE_VERSION = 'game-house-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './games.html',
  './projects.html',
  './manifest.webmanifest',
  './assets/css/base.css',
  './assets/css/layout.css',
  './assets/css/components.css',
  './assets/css/animations.css',
  './assets/js/app.js',
  './assets/js/components.js',
  './assets/js/game-utils.js',
  './assets/js/interactions.js',
  './assets/js/particles.js',
  './assets/js/utils.js',
  './data/profile.js',
  './assets/images/avatar.svg',
  './assets/images/project-github.svg',
  './assets/images/project-portfolio.svg',
  './games/snake.html',
  './games/mine.html',
  './games/puzzle.html',
  './games/memory.html',
  './games/prism.html',
  './games/sonic.html',
  './games/gravity.html',
  './games/eco.html',
  './games/cube2048.html',
  './games/rhythm.html'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_VERSION).then(function (cache) {
      // 使用 addAll 但容忍个别失败（如字体跨域）
      return Promise.all(
        CORE_ASSETS.map(function (url) {
          return cache.add(url).catch(function () { /* 忽略单项失败 */ });
        })
      );
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_VERSION; })
            .map(function (k) { return caches.delete(k); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (e) {
  const req = e.request;
  // 仅处理 GET
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 导航请求（HTML 页面）：network-first，离线回退缓存
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (res) {
        const clone = res.clone();
        caches.open(CACHE_VERSION).then(function (c) { c.put(req, clone); }).catch(function () {});
        return res;
      }).catch(function () {
        return caches.match(req).then(function (cached) {
          return cached || caches.match('./games.html');
        });
      })
    );
    return;
  }

  // 同源资源：stale-while-revalidate
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then(function (cached) {
        const fetchPromise = fetch(req).then(function (res) {
          // 只缓存成功的同源响应
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_VERSION).then(function (c) { c.put(req, clone); }).catch(function () {});
          }
          return res;
        }).catch(function () { return cached; });
        return cached || fetchPromise;
      })
    );
    return;
  }

  // 跨域（Google Fonts 等）：network-first，失败时尝试缓存
  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.status === 200 && res.type !== 'opaque') {
        const clone = res.clone();
        caches.open(CACHE_VERSION).then(function (c) { c.put(req, clone); }).catch(function () {});
      }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (cached) { return cached || Response.error(); });
    })
  );
});

// 接收页面发来的"立即接管"消息，配合 PWA 更新提示
self.addEventListener('message', function (e) {
  if (e.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
