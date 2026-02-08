const CACHE = 'readify-v1';
const FILES = [
  '/',
  '/index.html',
  '/book-explorer.html',
  '/reading-tracker.html',
  '/recommender.html',
  '/reading-flow.html',
  '/feedback.html',
  '/styles.css',
  '/common.js',
  '/home.js',
  '/books.js',
  '/explorer.js',
  '/tracker.js',
  '/recommender.js',
  '/flow.js',
  '/feedback.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
