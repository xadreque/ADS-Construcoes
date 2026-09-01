"use client";

import { useEffect } from "react";

export function RegistoServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Falha silenciosa — instalar como app é um extra, não crítico.
      });
    }
  }, []);

  return null;
}
