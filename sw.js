const CACHE='app-cache-v1';
const FILES=['/index.html','/equipment.html','/style.css','/script.js','/sw.js','/manifest.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
