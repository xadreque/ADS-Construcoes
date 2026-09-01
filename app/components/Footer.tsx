"use client";

import { useState, type FormEvent } from "react";
import styles from "./Footer.module.css";

const WHATSAPP_NUMERO = "258847775566";
const TELEFONE_EXIBIDO = "+258 84 777 5566";
const EMAIL = "sithoyada@gmail.com";

// Sugestão de identidade profissional — cria estas contas com o mesmo
// identificador para ficar coerente com o domínio (ver LEIA-ME.md).
const REDES_SOCIAIS = [
  {
    nome: "Facebook",
    href: "https://facebook.com/adsconstrucoes",
    icone: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.5c0-.93.26-1.56 1.6-1.56h1.7V3.1C15.94 3.05 15.02 3 13.94 3c-2.4 0-4.05 1.47-4.05 4.16v2.44H7.13v3.2h2.76V21h3.6Z" />
      </svg>
    ),
  },
  {
    nome: "Instagram",
    href: "https://instagram.com/adsconstrucoes",
    icone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    nome: "LinkedIn",
    href: "https://linkedin.com/company/adsconstrucoes",
    icone: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20h-3.37v-5.9c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1V20H9.5V8.5h3.24v1.57h.05c.45-.86 1.56-1.77 3.2-1.77 3.42 0 4.05 2.25 4.05 5.18V20Z" />
      </svg>
    ),
  },
];

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
              ADS <span>- Construções</span>
            </a>
            <p>
              Pintura residencial e comercial em Maputo e arredores —
              preparação cuidada, cor bem aplicada, acabamento que dura.
            </p>
            <div className={styles.redesSociais}>
              {REDES_SOCIAIS.map((r) => (
                <a
                  key={r.nome}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.redeIcone}
                  aria-label={r.nome}
                >
                  {r.icone}
                </a>
              ))}
            </div>
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
          <span>© {new Date().getFullYear()} ADS - Construções, Lda</span>
          <span>Maputo, Moçambique</span>
        </div>
      </div>
    </footer>
  );
}
