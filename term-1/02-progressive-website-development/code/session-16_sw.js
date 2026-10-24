const CACHE = 'prime-cafe-v1';
const APP_SHELL = ['./', './index.html', './offline.html', './css/style.css', './js/app.js',
                   './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();                              // activate the new version immediately
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;     // never cache form posts
  if (event.request.mode === 'navigate') {        // HTML pages: network first
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request).then(r => r || caches.match('./offline.html')))
    );
    return;
  }
  event.respondWith(                              // assets: cache first
    caches.match(event.request).then(cached => cached || fetch(event.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy));
      return res;
    }))
  );
});
