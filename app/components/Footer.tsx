"use client";

import { useState, type FormEvent } from "react";
import styles from "./Footer.module.css";

const WHATSAPP_NUMERO = "258847775566";
const TELEFONE_EXIBIDO = "+258 84 777 5566";
const EMAIL = "sithoyada@gmail.com";

const LINKS_RAPIDOS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Trabalhos" },
  { href: "#processo", label: "Como trabalhamos" },
  { href: "#contacto", label: "Pedir orçamento" },
];

function Newsletter() {
  const [estado, setEstado] = useState<"inicial" | "a-enviar" | "enviado" | "erro">("inicial");

  async function aoSubmeter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("a-enviar");
    const email = new FormData(e.currentTarget).get("email");

    try {
      const resposta = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!resposta.ok) throw new Error();
      setEstado("enviado");
      e.currentTarget.reset();
    } catch {
      setEstado("erro");
    }
  }

  if (estado === "enviado") {
    return <p className={styles.avisoNewsletter}>Inscrito. Obrigado!</p>;
  }

  return (
    <>
      <form className={styles.formNewsletter} onSubmit={aoSubmeter}>
        <input
          type="email"
          name="email"
          required
          placeholder="o-teu-email@exemplo.com"
          aria-label="O teu e-mail"
        />
        <button type="submit" className="botao" disabled={estado === "a-enviar"}>
          {estado === "a-enviar" ? "..." : "Subscrever"}
        </button>
      </form>
      {estado === "erro" && (
        <p className={styles.avisoNewsletter}>Não foi possível agora — tenta mais tarde.</p>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer className={styles.rodape}>
      <div className={styles.tira} aria-hidden="true">
        <span style={{ background: "var(--azul-baia)" }} />
        <span style={{ background: "var(--terracota)" }} />
        <span style={{ background: "var(--ocre)" }} />
        <span style={{ background: "var(--verde-caju)" }} />
      </div>

      <div className="envolvente">
        <div className={styles.grelha}>
          <div className={styles.colunaMarca}>
            <a href="#topo" className={styles.marca}>
              <img src="/logo-mark.svg" alt="" width={38} height={38} />
              ADS<span>-Construções</span>
            </a>
            <p>
              Pintura residencial e comercial em Maputo e arredores —
              preparação cuidada, cor bem aplicada, acabamento que dura.
            </p>
          </div>

          <div>
            <h3 className={styles.tituloColuna}>NAVEGAÇÃO</h3>
            <ul className={styles.listaLinks}>
              {LINKS_RAPIDOS.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.tituloColuna}>CONTACTO</h3>
            <a className={styles.contactoItem} href={`https://wa.me/${WHATSAPP_NUMERO}`} target="_blank" rel="noopener noreferrer">
              WhatsApp: {TELEFONE_EXIBIDO}
            </a>
            <a className={styles.contactoItem} href={`tel:${WHATSAPP_NUMERO}`}>
              Chamada: {TELEFONE_EXIBIDO}
            </a>
            <a className={styles.contactoItem} href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <a className={styles.contactoItem} href="#topo">
              Maputo, Moçambique
            </a>
          </div>

          <div className={styles.newsletter}>
            <h3 className={styles.tituloColuna}>NOVIDADES</h3>
            <p>Recebe dicas de manutenção e promoções pontuais — sem spam.</p>
            <Newsletter />
          </div>
        </div>

        <div className={styles.barraFinal}>
          <span>© {new Date().getFullYear()} ADS-Construções, Lda</span>
          <span>Maputo, Moçambique</span>
        </div>
      </div>
    </footer>
  );
}
