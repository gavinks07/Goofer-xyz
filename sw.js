self.addEventListener("install", e => {
    e.waitsUntil(
        caches.open("static").then(cache => {
            return cache.addAkk(["./", "./index.html", "icon-192x192.png", "script.js"]);
        })
    );
});

