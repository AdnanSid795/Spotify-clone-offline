const CACHE_NAME = "spotify-cache-v5";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",

  // MUSIC FILES
  "./music/song1.mp3",
  "./music/song2.mp3",
  "./music/song3.mp3",
  "./music/song4.mp3",
  "./music/song5.mp3",
  "./music/song6.mp3",
  "./music/song7.mp3",
  "./music/song8.mp3",
  "./music/song9.mp3",
  "./music/song10.mp3"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
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
