const CACHE_NAME = 'space_lookup_v1';
const urlsToCache = ['index.html', 'offline.html'];

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => {
			cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(cacheName => {
			return fetch(event.request).catch(() => caches.match('offline.html'));
		})
	);
});

self.addEventListener('activate', event => {
	const cacheWhiteList = [];
	cacheWhiteList.push(CACHE_NAME);

	event.waitUntil(
		caches.keys().then(cacheNames => Promise.all(
			cacheNames.map(cacheName => {
				if(!cacheWhiteList.includes(cacheName)) return caches.delete(cacheNames);
			})
		))
	);
});