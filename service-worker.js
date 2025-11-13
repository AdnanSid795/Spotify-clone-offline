self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("spotify-cache-v1").then(cache => {
      return cache.addAll([
        "./",
        "/index.html",
        "/manifest.json",
        "/icon-192.png",
        "/icon-512.png",

        // --- MUSIC FILES ---
        "/music/song0.mp3",
        "/music/song1.mp3",
        "/music/song2.mp3",
        "/music/song3.mp3",
        "/music/song4.mp3",
        "/music/song5.mp3",
        "/music/song6.mp3",
        "/music/song7.mp3",
        "/music/song8.mp3",
        "/music/song9.mp3",
        "/music/song10.mp3"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
