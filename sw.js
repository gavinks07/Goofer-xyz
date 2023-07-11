self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./index.html", "icon-192x192.png", "script.js"]);
        })
    );
});

self.addEventListener("fetch", e =>{
   console.log('Intercepting fetch request for: ${e.request.url}');
});