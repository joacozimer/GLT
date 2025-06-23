const CACHE_NAME = 'greenlime-cache-v3'; // IMPORTANT: Increment the cache version!
const urlsToCache = [
    '/GLT/', // Cache the base URL for your GitHub Pages project
    '/GLT/index.html',
    '/GLT/Css/style.css',
    '/GLT/Js/script.js',
    '/GLT/Img/GreenLimeWhiteBackground.jpg',
    '/GLT/Img/GreenLimeGreyBackground.jpg',
    '/GLT/Img/FondoGLT.png',
    '/GLT/Img/Logo.ico',
    '/GLT/Js/manifest.json', // Cache the manifest file
    // Add external fonts if you want them cached for offline use
    'https://fonts.googleapis.com/css2?family=Mukta+Mahee:wght@700&family=Montserrat:wght@500&family=Source+Sans+Pro:wght@400&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching assets');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
            .catch(error => {
                console.error('Service Worker: Caching failed:', error);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.map(key => {
                if (key !== CACHE_NAME) {
                    console.log('Service Worker: Deleting old cache', key);
                    return caches.delete(key);
                }
            }))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(resp => {
            // Cache hit - return response
            if (resp) {
                return resp;
            }
            // No cache hit - fetch from network
            return fetch(event.request).then(
                function (response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    var responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(function (cache) {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            ).catch(error => {
                console.log('Fetch failed, returning offline page.', error);
                // Example: return caches.match('/offline.html');
            });
        })
    );
});