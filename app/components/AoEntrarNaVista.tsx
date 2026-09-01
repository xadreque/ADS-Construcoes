"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./AoEntrarNaVista.module.css";

export function AoEntrarNaVista({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respeita quem prefere menos animação — mostra logo, sem transição.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisivel(true);
      return;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true);
          observador.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.contentor} data-visivel={visivel}>
      {children}
    </div>
  );
}
