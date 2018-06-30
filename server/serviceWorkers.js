import {
CACHE_NAME,
CACHE_NAME_V1,
URLS_TO_CACHE } from './constants';

const allCaches = [
  CACHE_NAME_V1,
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME_V1).then(cache => cache.addAll(URLS_TO_CACHE)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.filter(cacheName => cacheName.startsWith(CACHE_NAME) && !allCaches.includes(cacheName)).map(cacheName => caches.delete(cacheName)),
    )),
  );
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === './') {
      event.respondWith(caches.match('./'));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request)),
  );
});

self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
