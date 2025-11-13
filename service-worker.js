const CACHE_NAME = "spotify-cache-v2";

const FILES_TO_CACHE = [
  "/Spotify-clone-offline/",
  "/Spotify-clone-offline/index.html",
  "/Spotify-clone-offline/manifest.json",
  "/Spotify-clone-offline/icon-192.png",
  "/Spotify-clone-offline/icon-512.png",

  // MUSIC FILES
  "/Spotify-clone-offline/music/song0.mp3",
  "/Spotify-clone-offline/music/song1.mp3",
  "/Spotify-clone-offline/music/song2.mp3",
  "/Spotify-clone-offline/music/song3.mp3",
  "/Spotify-clone-offline/music/song4.mp3",
  "/Spotify-clone-offline/music/song5.mp3",
  "/Spotify-clone-offline/music/song6.mp3",
  "/Spotify-clone-offline/music/song7.mp3",
  "/Spotify-clone-offline/music/song8.mp3",
  "/Spotify-clone-offline/music/song9.mp3",
  "/Spotify-clone-offline/music/song10.mp3"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});
