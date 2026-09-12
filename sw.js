/* Grol Kompas — service worker
   Zorgt dat de app ook zonder internet werkt (bijv. op het sportpark).
   Verhoog CACHE_VERSIE bij elke nieuwe versie van de app. */
const CACHE_VERSIE = 'grol-kompas-v4';

/* De kern van de app: altijd offline beschikbaar */
const SCHIL = [
  './',
  './index.html',
  './manifest.json',
  './img/logo.png',
  './img/favicon.png',
  './img/icon-192.png',
  './img/icon-512.png',
  './img/visie-1.jpg', './img/visie-2.jpg', './img/visie-3.jpg', './img/visie-4.jpg',
  './img/visie-5.jpg', './img/visie-6.jpg', './img/visie-7.jpg', './img/visie-8.jpg',
  './img/hero/home.jpg', './img/hero/juich.jpg', './img/hero/duel.jpg',
  './img/hero/team.jpg', './img/hero/vlv.jpg', './img/hero/veld.jpg', './img/hero/avond.jpg',
  './fonts/barlow-condensed-latin-600-normal.woff2',
  './fonts/barlow-condensed-latin-700-normal.woff2',
  './fonts/inter-latin-400-normal.woff2',
  './fonts/inter-latin-600-normal.woff2',
  './fonts/inter-latin-700-normal.woff2'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_VERSIE)
      .then(c => Promise.allSettled(SCHIL.map(u => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(sleutels => Promise.all(sleutels.filter(s => s !== CACHE_VERSIE).map(s => caches.delete(s))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* index.html: eerst het netwerk (zo zie je updates meteen), anders uit de cache */
  const isPagina = req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('index.html');
  if (isPagina) {
    e.respondWith(
      fetch(req)
        .then(res => {
          const kopie = res.clone();
          caches.open(CACHE_VERSIE).then(c => c.put('./index.html', kopie));
          return res;
        })
        .catch(() => caches.match('./index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  /* Afbeeldingen en documenten: eerst de cache, daarna pas het netwerk.
     Wat je één keer hebt geopend, blijft offline beschikbaar. */
  e.respondWith(
    caches.match(req).then(gecached => gecached || fetch(req).then(res => {
      if (res && res.status === 200 && res.type === 'basic') {
        const kopie = res.clone();
        caches.open(CACHE_VERSIE).then(c => c.put(req, kopie));
      }
      return res;
    }).catch(() => gecached))
  );
});
