// Service Worker für Caching von statischen Assets
const CACHE_NAME = 'kira-marie-static-cache-v1';
const STATIC_ASSETS = [
  '/images/',
  '/uploads/',
  '/js/bundle.js',
  '/fonts/',
  '/favicon.ico'
];

// Service Worker Installation
// eslint-disable-next-line no-restricted-globals
addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
  );
});

// Cache-First Strategie für statische Assets
// eslint-disable-next-line no-restricted-globals
addEventListener('fetch', (event) => {
  // Nur GET-Anfragen cachen
  if (event.request.method !== 'GET') return;
  
  // URL-Objekt aus der Anfrage erstellen
  const requestURL = new URL(event.request.url);
  
  // Prüfen, ob es sich um eine statische Asset-Anfrage handelt
  const isStaticAsset = STATIC_ASSETS.some(asset => 
    requestURL.pathname.startsWith(asset) || 
    requestURL.pathname.endsWith('.js') || 
    requestURL.pathname.endsWith('.css') || 
    requestURL.pathname.endsWith('.webp') || 
    requestURL.pathname.endsWith('.png') || 
    requestURL.pathname.endsWith('.jpg') || 
    requestURL.pathname.endsWith('.jpeg')
  );
  
  if (isStaticAsset) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Cache hit - return response
          if (response) {
            return response;
          }
          
          // Anfrage klonen, da sie nur einmal verwendet werden kann
          const fetchRequest = event.request.clone();
          
          return fetch(fetchRequest).then((response) => {
            // Prüfen, ob wir eine gültige Antwort erhalten haben
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Antwort klonen, da sie nur einmal verwendet werden kann
            const responseToCache = response.clone();
            
            // Cache öffnen und Antwort speichern
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
        })
    );
  }
});
