"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import styles from "./Portfolio.module.css";
import { Lightbox, type ItemLightbox } from "./Lightbox";

// TODO — troca cada entrada por um trabalho real. Coloca o ficheiro em
// /public/portfolio/ (fotos .jpg/.webp, vídeos .mp4 curtos e leves) e
// aponta "src" para esse caminho. "tipo" controla se renderiza <img> ou <video>.
type Categoria = "Interior" | "Exterior" | "Comercial" | "Decorativo";
type Peca = {
  id: string;
  titulo: string;
  categoria: Categoria;
  tipo: "foto" | "video";
  src: string | null; // null enquanto não houver ficheiro real
};

const TRABALHOS: Peca[] = [
  { id: "p1", titulo: "Sala — Matola", categoria: "Interior", tipo: "foto", src: null },
  { id: "p2", titulo: "Fachada — Sommerschield", categoria: "Exterior", tipo: "foto", src: null },
  { id: "p3", titulo: "Loja — Baixa", categoria: "Comercial", tipo: "video", src: null },
  { id: "p4", titulo: "Quarto — Polana", categoria: "Interior", tipo: "foto", src: null },
  { id: "p5", titulo: "Escritório — Malhangalene", categoria: "Comercial", tipo: "foto", src: null },
  { id: "p6", titulo: "Muro — Costa do Sol", categoria: "Exterior", tipo: "foto", src: null },
];

const CATEGORIAS: Array<Categoria | "Todos"> = ["Todos", "Interior", "Exterior", "Comercial", "Decorativo"];

function IconeFoto() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <circle cx="12" cy="13" r="3.2" />
      <path d="M8 6l1.4-2h5.2L16 6" />
    </svg>
  );
}

export function Portfolio() {
  const [indiceAberto, setIndiceAberto] = useState<number | null>(null);
  const [filtro, setFiltro] = useState<Categoria | "Todos">("Todos");

  const trabalhosFiltrados = useMemo(
    () => (filtro === "Todos" ? TRABALHOS : TRABALHOS.filter((t) => t.categoria === filtro)),
    [filtro]
  );

  // Só entram no lightbox as peças que já têm ficheiro real (dentro do filtro actual).
  const itensComFicheiro: ItemLightbox[] = trabalhosFiltrados.filter(
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

        <div className={styles.filtros} role="tablist" aria-label="Filtrar por categoria">
          {CATEGORIAS.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={filtro === c}
              className={styles.filtro}
              data-activo={filtro === c}
              onClick={() => setFiltro(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className={styles.grelha}>
          {trabalhosFiltrados.map((t) => (
            <button
              type="button"
              className={styles.peca}
              key={t.id}
              onClick={() => aoClicar(t)}
              data-clicavel={!!t.src}
              aria-label={t.src ? `Ver ${t.titulo}` : undefined}
            >
              <span className={styles.marcador}>{t.src ? t.tipo.toUpperCase() : t.categoria}</span>

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
                <div className={styles.placeholder}>
                  <span className={styles.placeholderIcone}><IconeFoto /></span>
                  <span className={styles.placeholderTexto}>Foto em breve</span>
                </div>
              )}

              <span className={styles.legenda}>{t.titulo}</span>
            </button>
          ))}
        </div>

        {trabalhosFiltrados.length === 0 && (
          <p className={styles.vazio}>Ainda não há trabalhos nesta categoria.</p>
        )}
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
