// Офлайн-режим личной версии: сначала сеть (чтобы обновления приходили сразу), без сети — сохранённая копия.
const CACHE = 'who-wallet-my-v1';
const CORE = ['./', './manifest.webmanifest', './icon.svg', './icon-192.png', '../app.css', '../app.js'];
// чужие адреса, которые тоже стоит держать офлайн: шрифт и скрипт Telegram. Курс ЦБ не кешируется — он должен быть свежим.
const EXTERNAL = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com', 'https://telegram.org'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  if (url.origin !== location.origin && !EXTERNAL.some((o) => req.url.startsWith(o))) return;
  e.respondWith(
    fetch(req).then((res) => {
      if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || (req.mode === 'navigate' ? caches.match('./') : Response.error())))
  );
});
