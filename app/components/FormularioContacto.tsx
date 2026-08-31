"use client";

import { useState, type FormEvent } from "react";
import styles from "./Contacto.module.css";

type Estado = "inicial" | "a-enviar" | "enviado" | "erro";

export function FormularioContacto() {
  const [estado, setEstado] = useState<Estado>("inicial");

  async function aoSubmeter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("a-enviar");

    const dados = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const resposta = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) throw new Error("Falha no envio");
      setEstado("enviado");
      e.currentTarget.reset();
    } catch {
      setEstado("erro");
    }
  }

  if (estado === "enviado") {
    return (
      <p className={styles.estado} role="status">
        Pedido recebido. Entramos em contacto em breve.
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={aoSubmeter}>
      <div className={styles.campo}>
        <label htmlFor="nome">Nome</label>
        <input id="nome" name="nome" required placeholder="O teu nome" />
      </div>
      <div className={styles.campo}>
        <label htmlFor="contacto">Telefone ou WhatsApp</label>
        <input id="contacto" name="contacto" required placeholder="84/82... " />
      </div>
      <div className={styles.campo}>
        <label htmlFor="tipoServico">Tipo de trabalho</label>
        <select id="tipoServico" name="tipoServico" defaultValue="interior">
          <option value="interior">Pintura interior</option>
          <option value="exterior">Pintura exterior / fachada</option>
          <option value="comercial">Espaço comercial</option>
          <option value="decorativo">Acabamento decorativo</option>
        </select>
      </div>
      <div className={styles.campo}>
        <label htmlFor="mensagem">Detalhes (opcional)</label>
        <textarea id="mensagem" name="mensagem" rows={3} placeholder="Área aproximada, bairro, prazo desejado..." />
      </div>

      <button type="submit" className={`botao ${styles.enviar}`} disabled={estado === "a-enviar"}>
        {estado === "a-enviar" ? "A enviar..." : "Pedir orçamento"}
      </button>

      {estado === "erro" && (
        <p className={styles.estado} role="alert">
          Não foi possível enviar agora. Tenta pelo WhatsApp aqui em baixo.
        </p>
      )}
    </form>
  );
}
