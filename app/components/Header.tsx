"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";

const LINKS = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#calculadora", label: "Orçamento rápido" },
  { href: "/#portfolio", label: "Trabalhos" },
  { href: "/dicas", label: "Dicas" },
  { href: "/#contacto", label: "Contacto" },
];

export function Header() {
  const [aberto, setAberto] = useState(false);
  const cabecalhoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!aberto) return;

    function aoClicarFora(e: MouseEvent) {
      if (cabecalhoRef.current && !cabecalhoRef.current.contains(e.target as Node)) {
        setAberto(false);
      }
    }
    function aoPressionarTecla(e: KeyboardEvent) {
      if (e.key === "Escape") setAberto(false);
    }

    document.addEventListener("mousedown", aoClicarFora);
    document.addEventListener("keydown", aoPressionarTecla);
    return () => {
      document.removeEventListener("mousedown", aoClicarFora);
      document.removeEventListener("keydown", aoPressionarTecla);
    };
  }, [aberto]);

  return (
    <header className={styles.cabecalho} ref={cabecalhoRef}>
      <div className={styles.linha}>
        <a href="/#topo" className={styles.marca} onClick={() => setAberto(false)}>
          <img src="/logo-mark.svg" alt="" width={40} height={40} />
          ADS <span>- Construções</span>
        </a>

        <ul className={styles.nav}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className={styles.acoesDireita}>
          <a href="/#contacto" className={`botao botao-primario ${styles.botaoDesktop}`}>
            Pedir orçamento
          </a>
          <button
            type="button"
            className={styles.hamburguer}
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={aberto}
            onClick={() => setAberto((v) => !v)}
          >
            <span data-aberto={aberto} />
          </button>
        </div>
      </div>

      {aberto && (
        <div className={styles.navMobile}>
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setAberto(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="/#contacto" className="botao botao-primario" onClick={() => setAberto(false)}>
            Pedir orçamento
          </a>
        </div>
      )}
    </header>
  );
}

