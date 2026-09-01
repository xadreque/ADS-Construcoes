"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import styles from "./SeletorPersonalizado.module.css";

export type Opcao = { valor: string; rotulo: string };

type Props = {
  valor: string;
  aoMudar: (v: string) => void;
  opcoes: Opcao[];
  nomeCampo?: string; // se definido, cria um input escondido para integrar com FormData
  rotuloAcessivel?: string;
  variante?: "claro" | "escuro";
};

export function SeletorPersonalizado({ valor, aoMudar, opcoes, nomeCampo, rotuloAcessivel, variante = "claro" }: Props) {
  const [aberto, setAberto] = useState(false);
  const [indiceFoco, setIndiceFoco] = useState(() => Math.max(0, opcoes.findIndex((o) => o.valor === valor)));
  const contentorRef = useRef<HTMLDivElement>(null);
  const idListbox = useId();

  const opcaoActual = opcoes.find((o) => o.valor === valor) ?? opcoes[0];

  useEffect(() => {
    function aoClicarFora(e: MouseEvent) {
      if (contentorRef.current && !contentorRef.current.contains(e.target as Node)) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", aoClicarFora);
    return () => document.removeEventListener("mousedown", aoClicarFora);
  }, []);

  function escolher(o: Opcao) {
    aoMudar(o.valor);
    setAberto(false);
  }

  function aoTeclado(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!aberto) { setAberto(true); return; }
      escolher(opcoes[indiceFoco]);
    } else if (e.key === "Escape") {
      setAberto(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!aberto) { setAberto(true); return; }
      setIndiceFoco((i) => Math.min(opcoes.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!aberto) { setAberto(true); return; }
      setIndiceFoco((i) => Math.max(0, i - 1));
    } else if (e.key === "Home") {
      setIndiceFoco(0);
    } else if (e.key === "End") {
      setIndiceFoco(opcoes.length - 1);
    }
  }

  return (
    <div className={`${styles.contentor} ${variante === "escuro" ? styles.contentorEscuro : ""}`} ref={contentorRef}>
      {nomeCampo && <input type="hidden" name={nomeCampo} value={valor} />}
      <button
        type="button"
        className={styles.botao}
        onClick={() => setAberto((v) => !v)}
        onKeyDown={aoTeclado}
        aria-haspopup="listbox"
        aria-expanded={aberto}
        aria-label={rotuloAcessivel}
        data-aberto={aberto}
      >
        <span>{opcaoActual?.rotulo}</span>
        <svg className={styles.seta} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m5 7.5 5 5 5-5" />
        </svg>
      </button>

      {aberto && (
        <ul className={styles.lista} role="listbox" id={idListbox} tabIndex={-1}>
          {opcoes.map((o, i) => (
            <li
              key={o.valor}
              role="option"
              aria-selected={o.valor === valor}
              className={styles.opcao}
              data-focada={i === indiceFoco}
              data-seleccionada={o.valor === valor}
              onMouseEnter={() => setIndiceFoco(i)}
              onClick={() => escolher(o)}
            >
              {o.rotulo}
              {o.valor === valor && (
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 10.5 8 14l8-8" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
