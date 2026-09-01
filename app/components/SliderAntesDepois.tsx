"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import styles from "./SliderAntesDepois.module.css";

type Props = {
  // Caminhos para as fotos reais — deixa null para mostrar o gráfico
  // ilustrativo em gradiente enquanto não há fotos.
  antesSrc?: string | null;
  depoisSrc?: string | null;
  rotuloAntes?: string;
  rotuloDepois?: string;
};

export function SliderAntesDepois({
  antesSrc = null,
  depoisSrc = null,
  rotuloAntes = "Antes",
  rotuloDepois = "Depois",
}: Props) {
  const contentorRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const [arrastando, setArrastando] = useState(false);

  const actualizarPct = useCallback((clientX: number) => {
    const el = contentorRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nova = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(100, Math.max(0, nova)));
  }, []);

  // Enquanto se arrasta, ouve o movimento no window inteiro — assim o
  // arrasto não "parte" se o ponteiro sair da área do slider por um instante.
  useEffect(() => {
    if (!arrastando) return;

    function aoMover(e: PointerEvent) {
      actualizarPct(e.clientX);
    }
    function aoLargar() {
      setArrastando(false);
    }

    window.addEventListener("pointermove", aoMover);
    window.addEventListener("pointerup", aoLargar);
    window.addEventListener("pointercancel", aoLargar);
    return () => {
      window.removeEventListener("pointermove", aoMover);
      window.removeEventListener("pointerup", aoLargar);
      window.removeEventListener("pointercancel", aoLargar);
    };
  }, [arrastando, actualizarPct]);

  function aoPointerDown(e: ReactPointerEvent) {
    setArrastando(true);
    actualizarPct(e.clientX);
  }

  function aoTeclado(e: KeyboardEvent) {
    if (e.key === "ArrowLeft") setPct((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPct((p) => Math.min(100, p + 5));
  }

  return (
    <div
      ref={contentorRef}
      className={styles.contentor}
      onPointerDown={aoPointerDown}
    >
      <div
        className={styles.camadaDepois}
        style={depoisSrc ? { backgroundImage: `url(${depoisSrc})` } : undefined}
      />
      <div
        className={styles.camadaAntes}
        style={{
          clipPath: `inset(0 ${100 - pct}% 0 0)`,
          ...(antesSrc ? { backgroundImage: `url(${antesSrc})` } : {}),
        }}
      />

      <div className={styles.divisor} style={{ left: `${pct}%` }}>
        <div
          className={styles.alca}
          role="slider"
          aria-label="Comparar antes e depois"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          onKeyDown={aoTeclado}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 8 5 12l4 4" />
            <path d="M15 8l4 4-4 4" />
          </svg>
        </div>
      </div>

      <span className={styles.rotulo} data-lado="antes">{rotuloAntes}</span>
      <span className={styles.rotulo} data-lado="depois">{rotuloDepois}</span>
    </div>
  );
}
