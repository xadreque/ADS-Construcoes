"use client";

import { useEffect } from "react";

export function RegistoServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      // Em desenvolvimento, um service worker registado interfere com o
      // Fast Refresh e com os pedidos internos do Next.js (RSC), causando
      // erros de rede confusos. Garante que fica desregistado em dev,
      // incluindo de sessões anteriores em que possa ter ficado activo.
      navigator.serviceWorker.getRegistrations().then((registos) => {
        registos.forEach((r) => r.unregister());
      });
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Falha silenciosa — instalar como app é um extra, não crítico.
    });
  }, []);

  return null;
}
