const CACHE_NAME = 'greenlime-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/Css/style.css',
    '/Js/script.js',
    '/Img/GreenLimeWhiteBackground.jpg',
    '/Img/GreenLimeGreyBackground.jpg',
    '/Img/FondoGLT.png',
    '/Img/Logo.ico',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            }))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(resp => {
            return resp || fetch(event.request);
        })
    );
});
