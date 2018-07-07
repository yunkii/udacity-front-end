
var CACHE_VERSION = 'restaurant-v1';
var CACHE_FILES = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/data/restaurants.json',
    '/js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      console.log('Opened cache');
      return cache.addAll(CACHE_FILES);
    })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request)
    })
  );
})

