const CACHE_NAME = "spotify-cache-v6";
const PREFIX = "/Spotify-clone-offline";

const FILES_TO_CACHE = [
  `${PREFIX}/`,
  `${PREFIX}/index.html`,
  `${PREFIX}/manifest.json`,
  `${PREFIX}/icon-192.png`,
  `${PREFIX}/icon-512.png`,

  // MUSIC
  `${PREFIX}/music/song1.mp3`,
  `${PREFIX}/music/song2.mp3`,
  `${PREFIX}/music/song3.mp3`,
  `${PREFIX}/music/song4.mp3`,
  `${PREFIX}/music/song5.mp3`,
  `${PREFIX}/music/song6.mp3`,
  `${PREFIX}/music/song7.mp3`,
  `${PREFIX}/music/song8.mp3`,
  `${PREFIX}/music/song9.mp3`,
  `${PREFIX}/music/song10.mp3`
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => 
      response || fetch(event.request)
    )
  );
});
