"use client";

import { useEffect } from "react";
import styles from "./Lightbox.module.css";

export type ItemLightbox = { titulo: string; tipo: "foto" | "video"; src: string };

type Props = {
  itens: ItemLightbox[];
  indiceActual: number;
  onFechar: () => void;
  onNavegar: (indice: number) => void;
};

export function Lightbox({ itens, indiceActual, onFechar, onNavegar }: Props) {
  const item = itens[indiceActual];

  useEffect(() => {
    function aoTeclado(e: KeyboardEvent) {
      if (e.key === "Escape") onFechar();
      if (e.key === "ArrowRight") onNavegar((indiceActual + 1) % itens.length);
      if (e.key === "ArrowLeft") onNavegar((indiceActual - 1 + itens.length) % itens.length);
    }
    window.addEventListener("keydown", aoTeclado);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", aoTeclado);
      document.body.style.overflow = "";
    };
  }, [indiceActual, itens.length, onFechar, onNavegar]);

  if (!item) return null;

  return (
    <div className={styles.fundo} onClick={onFechar} role="dialog" aria-modal="true" aria-label={item.titulo}>
      <button type="button" className={styles.fechar} onClick={onFechar} aria-label="Fechar">✕</button>

      {itens.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.seta} ${styles.setaEsquerda}`}
            onClick={(e) => { e.stopPropagation(); onNavegar((indiceActual - 1 + itens.length) % itens.length); }}
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className={`${styles.seta} ${styles.setaDireita}`}
            onClick={(e) => { e.stopPropagation(); onNavegar((indiceActual + 1) % itens.length); }}
            aria-label="Seguinte"
          >
            ›
          </button>
        </>
      )}

      <div className={styles.conteudo} onClick={(e) => e.stopPropagation()}>
        {item.tipo === "foto" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.src} alt={item.titulo} />
        ) : (
          <video src={item.src} controls autoPlay />
        )}
        <p className={styles.legenda}>{item.titulo}</p>
      </div>
    </div>
  );
}
