// Service worker mínimo: torna o site instalável ("Adicionar ao ecrã
// inicial"). Não faz cache agressivo para não mostrar conteúdo antigo —
// deixa tudo passar direto à rede.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
