"use client";

import { useEffect } from "react";

const CHAVE_SESSAO = "ads-construcoes-visita-registada";

export function ContadorVisitas() {
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(CHAVE_SESSAO)) return;
      window.sessionStorage.setItem(CHAVE_SESSAO, "1");
    } catch {
      // Sem sessionStorage disponível — regista na mesma, sem controlo de
      // duplicados (raro, e não é um dado crítico).
    }

    fetch("/api/visita", { method: "POST" }).catch(() => {
      // Falha silenciosa — contar visitas é um extra, não deve incomodar
      // o visitante nem aparecer na consola em produção.
    });
  }, []);

  return null;
}
