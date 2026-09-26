// Offline support: serve the app from cache, refresh the cache in the background.
// Bump CACHE when releasing a new version so phones pick it up right away.
const CACHE = 'liftlog-v2';
const ASSETS = ['./', './manifest.webmanifest', './icons/icon-180.png', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  // One cache entry per file: every page load is the app shell, and query strings are ignored.
  const key = req.mode === 'navigate' ? new URL('./', self.registration.scope).href : url.origin + url.pathname;
  const cacheP = caches.open(CACHE);
  const fresh = fetch(req, { cache: 'no-cache' }).then(async res => {
    if (res.ok) await (await cacheP).put(key, res.clone());
    return res;
  });
  e.waitUntil(fresh.catch(() => {}));
  e.respondWith(cacheP.then(c => c.match(key)).then(cached => cached || fresh));
});
