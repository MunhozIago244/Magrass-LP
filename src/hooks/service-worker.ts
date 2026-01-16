/// <reference lib="webworker" />

/**
 * Service Worker para Magrass Landing Page
 * Esta diretiva no topo carrega os tipos ServiceWorkerGlobalScope, ExtendableEvent e FetchEvent.
 */

// Faz o cast do self para o escopo correto do Worker
const sw = self as unknown as ServiceWorkerGlobalScope;

const CACHE_NAME = 'magrass-v1';
const urlsToCache = [
  '/',
  '/index.html',
];

// O evento agora é reconhecido corretamente como ExtendableEvent
sw.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching assets');
        return cache.addAll(urlsToCache);
      })
  );
});

// O evento agora é reconhecido corretamente como FetchEvent
sw.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

sw.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Export vazio para garantir que o TS trate como módulo
export type {};