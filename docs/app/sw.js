/*! Bynd-Calist. Copyright (c) 2026 Mohammad Farmani. All rights reserved. */
const CACHE = "bynd-calist-1.2.1-4bcc3fe318";
const FILES = ["./", "_ds/modernist-8eed4452-5ebb-4676-9259-445c93d856a5/_ds_bundle.js", "_ds/modernist-8eed4452-5ebb-4676-9259-445c93d856a5/styles.css", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "index.html", "manifest.webmanifest"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request).catch(() => caches.match("./index.html"))));
});
