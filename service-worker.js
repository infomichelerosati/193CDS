// Definisce un nome e una versione per la cache
const CACHE_NAME = 'simulatore-193-cache-v2';

// Elenco dei file da memorizzare nella cache per il funzionamento offline
// In questo caso, la pagina principale e le risorse esterne
const urlsToCache = [
  './', // La pagina index.html
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Evento 'install': si verifica quando il service worker viene installato
self.addEventListener('install', event => {
  // Attende che l'installazione sia completata
  event.waitUntil(
    // Apre la cache con il nome definito
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aperta');
        // Aggiunge tutte le risorse specificate alla cache
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': si verifica ogni volta che l'app richiede una risorsa (es. pagina, script, css)
self.addEventListener('fetch', event => {
  event.respondWith(
    // Cerca la risorsa richiesta nella cache
    caches.match(event.request)
      .then(response => {
        // Se la risorsa è trovata nella cache, la restituisce
        if (response) {
          return response;
        }
        // Altrimenti, richiede la risorsa dalla rete
        return fetch(event.request);
      }
    )
  );
});

