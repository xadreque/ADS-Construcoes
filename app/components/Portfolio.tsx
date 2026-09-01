"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Portfolio.module.css";
import { Lightbox, type ItemLightbox } from "./Lightbox";

// TODO — troca cada entrada por um trabalho real. Coloca o ficheiro em
// /public/portfolio/ (fotos .jpg/.webp, vídeos .mp4 curtos e leves) e
// aponta "src" para esse caminho. "tipo" controla se renderiza <img> ou <video>.
type Peca = {
  id: string;
  titulo: string;
  tipo: "foto" | "video";
  src: string | null; // null enquanto não houver ficheiro real
};

const TRABALHOS: Peca[] = [
  { id: "p1", titulo: "Sala — Matola", tipo: "foto", src: null },
  { id: "p2", titulo: "Fachada — Sommerschield", tipo: "foto", src: null },
  { id: "p3", titulo: "Loja — Baixa", tipo: "video", src: null },
  { id: "p4", titulo: "Quarto — Polana", tipo: "foto", src: null },
  { id: "p5", titulo: "Escritório — Malhangalene", tipo: "foto", src: null },
  { id: "p6", titulo: "Muro — Costa do Sol", tipo: "foto", src: null },
];

export function Portfolio() {
  const [indiceAberto, setIndiceAberto] = useState<number | null>(null);

  // Só entram no lightbox as peças que já têm ficheiro real.
  const itensComFicheiro: ItemLightbox[] = TRABALHOS.filter(
    (t): t is Peca & { src: string } => t.src !== null
  ).map((t) => ({ titulo: t.titulo, tipo: t.tipo, src: t.src }));

  function aoClicar(t: Peca) {
    if (!t.src) return; // placeholder — nada para mostrar ainda
    const indice = itensComFicheiro.findIndex((i) => i.src === t.src);
    setIndiceAberto(indice);
  }

  return (
    <section className="secao" id="portfolio">
      <div className="envolvente">
        <div className={styles.cabecalho}>
          <div>
            <h2>Trabalhos feitos</h2>
            <p>Uma amostra do que já foi pintado — fotos e vídeos reais das obras.</p>
          </div>
        </div>

        <div className={styles.grelha}>
          {TRABALHOS.map((t) => (
            <button
              type="button"
              className={styles.peca}
              key={t.id}
              onClick={() => aoClicar(t)}
              data-clicavel={!!t.src}
              aria-label={t.src ? `Ver ${t.titulo}` : undefined}
            >
              <span className={styles.marcador}>
                {t.src ? t.tipo.toUpperCase() : "ESPAÇO RESERVADO"}
              </span>

              {t.src && t.tipo === "foto" && (
                <Image
                  src={t.src}
                  alt={t.titulo}
                  fill
                  sizes="(max-width: 760px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
              )}
              {t.src && t.tipo === "video" && (
                <video src={t.src} muted loop playsInline autoPlay />
              )}
              {!t.src && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "repeating-linear-gradient(135deg, rgba(42,38,34,0.06) 0 10px, rgba(42,38,34,0.02) 10px 20px)",
                  }}
                />
              )}

              <span className={styles.legenda}>{t.titulo}</span>
            </button>
          ))}
        </div>
      </div>

      {indiceAberto !== null && (
        <Lightbox
          itens={itensComFicheiro}
          indiceActual={indiceAberto}
          onFechar={() => setIndiceAberto(null)}
          onNavegar={setIndiceAberto}
        />
      )}
    </section>
  );
}
