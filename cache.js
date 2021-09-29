self.addEventListener("install", (event) => {
  console.log("Service worker installed: ", event);
});

const cache = "cache-47";

self.addEventListener("activate", (event) => {
  event.waitUntil(handleRemoveAndCache());
});

async function removeOldCaches() {
  await caches.keys().then((cacheNames) => {
    cacheNames.filter((oldCache) => {
      caches.delete(oldCache !== cache);

      console.log("Old caches cleared");

      return true;
    });
  });
}

function cacheFiles() {
  caches
    .open(cache)
    .then((cache) => {
      console.log("Service Worker Caching Files");
      cache.addAll(["home.html", "script.js", "style.css"]);
    })
    .then(() => self.skipWaiting());
}

function handleRemoveAndCache() {
  removeOldCaches();
  cacheFiles();
}

self.addEventListener("fetch", (event) => {
  console.log("Service Worker Fetching:", event);

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
