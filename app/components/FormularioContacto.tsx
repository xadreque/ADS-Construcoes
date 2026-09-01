"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import styles from "./Contacto.module.css";

type Estado = "inicial" | "a-enviar" | "enviado" | "erro";
type Erros = { nome?: string; contacto?: string };

// Números moçambicanos: 9 dígitos depois do +258, a começar por 8[2-7].
const REGEX_TELEFONE_MZ = /^8[2-7]\d{7}$/;
const REGEX_NOME = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,60}$/;

function IconeErro() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={styles.iconeMensagem} aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="url(#gradErro)" />
      <path d="M10 5.5v5M10 13.2h.01" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <defs>
        <linearGradient id="gradErro" x1="0" y1="0" x2="20" y2="20">
          <stop offset="0%" stopColor="#c0522f" />
          <stop offset="100%" stopColor="#8a3a1f" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconeSucesso() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={styles.iconeMensagem} aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="url(#gradSucesso)" />
      <path d="M6 10.3l2.4 2.4L14.2 7" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="gradSucesso" x1="0" y1="0" x2="20" y2="20">
          <stop offset="0%" stopColor="#6b8a4a" />
          <stop offset="100%" stopColor="#4a6234" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FormularioContacto() {
  const [estado, setEstado] = useState<Estado>("inicial");
  const [nome, setNome] = useState("");
  const [digitos, setDigitos] = useState(""); // só os 9 dígitos, sem +258
  const [tocado, setTocado] = useState<{ nome?: boolean; contacto?: boolean }>({});
  const [erros, setErros] = useState<Erros>({});
  const [agitar, setAgitar] = useState(false);

  const contactoValido = REGEX_TELEFONE_MZ.test(digitos);
  const nomeValido = REGEX_NOME.test(nome.trim());

  function validarNome(valor: string): string | undefined {
    if (!valor.trim()) return "Escreve o teu nome.";
    if (!REGEX_NOME.test(valor.trim())) return "Usa só letras (mín. 2 caracteres).";
    return undefined;
  }

  function validarContacto(valor: string): string | undefined {
    if (!valor) return "Escreve o número depois do +258.";
    if (valor.length < 9) return "Falta(m) dígito(s) — precisa de 9 no total.";
    if (!REGEX_TELEFONE_MZ.test(valor)) return "Número moçambicano inválido (ex: 84 777 5566).";
    return undefined;
  }

  function aoMudarDigitos(e: ChangeEvent<HTMLInputElement>) {
    const apenasDigitos = e.target.value.replace(/\D/g, "").slice(0, 9);
    setDigitos(apenasDigitos);
    if (tocado.contacto) {
      setErros((anteriores) => ({ ...anteriores, contacto: validarContacto(apenasDigitos) }));
    }
  }

  function dispararAgitacao() {
    setAgitar(true);
    setTimeout(() => setAgitar(false), 420);
  }

  async function aoSubmeter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const erroNome = validarNome(nome);
    const erroContacto = validarContacto(digitos);
    setErros({ nome: erroNome, contacto: erroContacto });
    setTocado({ nome: true, contacto: true });

    if (erroNome || erroContacto) {
      dispararAgitacao();
      return;
    }

    setEstado("a-enviar");
    const formulario = e.currentTarget;
    const dadosForm = new FormData(formulario);

    const dados = {
      nome: nome.trim(),
      contacto: `+258 ${digitos}`,
      tipoServico: dadosForm.get("tipoServico"),
      mensagem: dadosForm.get("mensagem"),
    };

    try {
      const resposta = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) throw new Error("Falha no envio");
      setEstado("enviado");
      formulario.reset();
      setNome("");
      setDigitos("");
      setTocado({});
      setErros({});
    } catch {
      setEstado("erro");
    }
  }

  if (estado === "enviado") {
    return (
      <div className={`${styles.mensagemEstado} ${styles.mensagemSucesso}`} role="status">
        <IconeSucesso />
        <p>Pedido recebido. Entramos em contacto em breve.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={aoSubmeter} noValidate>
      <div className={styles.campo}>
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          placeholder="O teu nome"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            if (tocado.nome) setErros((a) => ({ ...a, nome: validarNome(e.target.value) }));
          }}
          onBlur={() => {
            setTocado((t) => ({ ...t, nome: true }));
            setErros((a) => ({ ...a, nome: validarNome(nome) }));
          }}
          data-invalido={tocado.nome && !!erros.nome}
          data-valido={tocado.nome && nomeValido}
        />
        {tocado.nome && erros.nome && (
          <p className={styles.mensagemErroCampo}>
            <IconeErro /> {erros.nome}
          </p>
        )}
      </div>

      <div className={styles.campo}>
        <label htmlFor="contacto">Telefone ou WhatsApp</label>
        <div
          className={styles.grupoTelefone}
          data-invalido={tocado.contacto && !!erros.contacto}
          data-valido={tocado.contacto && contactoValido}
        >
          <span className={styles.prefixoTelefone}>+258</span>
          <input
            id="contacto"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="84 777 5566"
            value={digitos}
            onChange={aoMudarDigitos}
            onBlur={() => {
              setTocado((t) => ({ ...t, contacto: true }));
              setErros((a) => ({ ...a, contacto: validarContacto(digitos) }));
            }}
            maxLength={9}
          />
          {tocado.contacto && contactoValido && (
            <span className={styles.iconeInline}><IconeSucesso /></span>
          )}
        </div>
        {tocado.contacto && erros.contacto && (
          <p className={`${styles.mensagemErroCampo} ${agitar ? styles.agitar : ""}`}>
            <IconeErro /> {erros.contacto}
          </p>
        )}
      </div>

      <div className={styles.campo}>
        <label htmlFor="tipoServico">Tipo de trabalho</label>
        <select id="tipoServico" name="tipoServico" defaultValue="interior">
          <option value="interior">Pintura interior</option>
          <option value="exterior">Pintura exterior / fachada</option>
          <option value="comercial">Espaço comercial</option>
          <option value="decorativo">Acabamento decorativo</option>
          <option value="reparacao">Reparação de imóveis e pintura geral</option>
        </select>
      </div>

      <div className={styles.campo}>
        <label htmlFor="mensagem">Detalhes (opcional)</label>
        <textarea id="mensagem" name="mensagem" rows={3} maxLength={500} placeholder="Área aproximada, bairro, prazo desejado..." />
      </div>

      <button
        type="submit"
        className={`botao ${styles.enviar} ${agitar ? styles.agitar : ""}`}
        disabled={estado === "a-enviar"}
      >
        {estado === "a-enviar" ? "A enviar..." : "Pedir orçamento"}
      </button>

      {estado === "erro" && (
        <div className={`${styles.mensagemEstado} ${styles.mensagemErro}`} role="alert">
          <IconeErro />
          <p>Não foi possível enviar agora. Tenta pelo WhatsApp aqui em baixo.</p>
        </div>
      )}
    </form>
  );
}
