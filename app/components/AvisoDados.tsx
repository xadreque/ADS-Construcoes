"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AvisoDados.module.css";

const CHAVE_ARMAZENAMENTO = "ads-construcoes-aviso-privacidade-aceite";

export function AvisoDados() {
  const [visivel, setVisivel] = useState(false);
  const faixaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const jaAceitou = window.localStorage.getItem(CHAVE_ARMAZENAMENTO);
      if (!jaAceitou) setVisivel(true);
    } catch {
      // Se o localStorage não estiver disponível, simplesmente não mostra
      // o aviso repetidamente — não é crítico.
    }
  }, []);

  // Mede a altura real da faixa (varia com o tamanho do ecrã, por causa da
  // quebra de linha) e propaga-a via CSS var, para os botões flutuantes
  // (WhatsApp, voltar ao topo) subirem e não ficarem tapados.
  useEffect(() => {
    if (!visivel) {
      document.documentElement.style.setProperty("--aviso-altura", "0px");
      return;
    }
    const el = faixaRef.current;
    if (!el) return;

    function actualizarAltura() {
      document.documentElement.style.setProperty("--aviso-altura", `${el!.offsetHeight}px`);
    }
    actualizarAltura();

    const observador = new ResizeObserver(actualizarAltura);
    observador.observe(el);
    return () => observador.disconnect();
  }, [visivel]);

  function aceitar() {
    try {
      window.localStorage.setItem(CHAVE_ARMAZENAMENTO, "1");
    } catch {
      // ignora
    }
    setVisivel(false);
  }

  if (!visivel) return null;

  return (
    <div ref={faixaRef} className={styles.faixa} role="dialog" aria-label="Aviso sobre dados pessoais">
      <div className={styles.linha}>
        <p>
          Guardamos apenas os dados que preenches no formulário (nome, contacto, e-mail
          da newsletter) para te podermos responder. Não usamos cookies de publicidade.{" "}
          <a href="/politica-privacidade">Saber mais</a>
        </p>
        <button type="button" className={`botao ${styles.botao}`} onClick={aceitar}>
          Entendi
        </button>
      </div>
    </div>
  );
}
