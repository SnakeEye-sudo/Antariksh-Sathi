const CACHE = "antariksh-sathi-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./data.js",
  "./app.js",
  "./live-pack.json",
  "./manifest.json",
  "./logo.svg",
  "./favicon.svg",
  "./about.html",
  "./resources.html",
  "./contact.html",
  "./privacy-policy.html",
  "./terms.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const isLivePack = url.pathname.endsWith("/live-pack.json") || url.pathname.endsWith("live-pack.json");

  if (isLivePack) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(CACHE).then((cache) => cache.put("./live-pack.json", cloned));
          return response;
        })
        .catch(() => caches.match("./live-pack.json"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
