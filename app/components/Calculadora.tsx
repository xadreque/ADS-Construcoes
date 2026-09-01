"use client";

import { useState, type FormEvent } from "react";
import styles from "./Calculadora.module.css";
import { linkWhatsApp } from "../lib/site-config";

// Valores de referência por m² (em Meticais) — AJUSTA aos teus preços reais.
// São intervalos propositadamente largos para cobrir variação de material
// e estado da superfície.
const TABELA_PRECOS: Record<string, { label: string; min: number; max: number }> = {
  interior: { label: "Pintura interior", min: 300, max: 450 },
  exterior: { label: "Pintura exterior / fachada", min: 400, max: 600 },
  comercial: { label: "Espaço comercial", min: 350, max: 520 },
  decorativo: { label: "Acabamento decorativo", min: 550, max: 850 },
  reparacao: { label: "Reparação de imóveis e pintura geral", min: 450, max: 700 },
};

function formatarMT(valor: number): string {
  return `${Math.round(valor).toLocaleString("pt-PT")} MT`;
}

export function Calculadora() {
  const [area, setArea] = useState("");
  const [tipo, setTipo] = useState("interior");
  const [erro, setErro] = useState<string | undefined>();
  const [resultado, setResultado] = useState<{ min: number; max: number } | null>(null);

  function aoCalcular(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const areaNumerica = Number(area.replace(",", "."));

    if (!area || Number.isNaN(areaNumerica) || areaNumerica <= 0) {
      setErro("Escreve uma área válida em m² (ex: 45).");
      setResultado(null);
      return;
    }
    if (areaNumerica > 5000) {
      setErro("Para áreas acima de 5.000 m², fala directamente connosco.");
      setResultado(null);
      return;
    }

    setErro(undefined);
    const precos = TABELA_PRECOS[tipo];
    setResultado({ min: areaNumerica * precos.min, max: areaNumerica * precos.max });
  }

  const precos = TABELA_PRECOS[tipo];

  const mensagemWhatsApp = resultado
    ? `Olá! Fiz uma simulação no site: ${area} m² de "${precos.label}", estimativa entre ${formatarMT(resultado.min)} e ${formatarMT(resultado.max)}. Gostava de um orçamento exacto.`
    : "";

  return (
    <section className={`secao ${styles.secao}`} id="calculadora">
      <div className="envolvente">
        <div className={styles.cabecalho}>
          <h2>Simula o teu orçamento</h2>
          <p>Uma estimativa instantânea — o valor exacto vem depois de vermos o espaço.</p>
        </div>

        <div className={styles.caixa}>
          <form className={styles.form} onSubmit={aoCalcular} noValidate>
            <div className={styles.campo}>
              <label htmlFor="area">Área aproximada (m²)</label>
              <input
                id="area"
                inputMode="decimal"
                placeholder="ex: 45"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                data-invalido={!!erro}
              />
            </div>

            <div className={styles.campo}>
              <label htmlFor="tipoCalc">Tipo de trabalho</label>
              <select id="tipoCalc" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                {Object.entries(TABELA_PRECOS).map(([chave, valor]) => (
                  <option key={chave} value={chave}>{valor.label}</option>
                ))}
              </select>
            </div>

            <button type="submit" className={`botao ${styles.botaoCalcular}`}>
              Calcular estimativa
            </button>
          </form>

          {erro && <p className={styles.erro}>{erro}</p>}

          {resultado && (
            <div className={styles.resultado}>
              <span className={styles.rotuloResultado}>Estimativa</span>
              <strong className={styles.valorResultado}>
                {formatarMT(resultado.min)} – {formatarMT(resultado.max)}
              </strong>
              <p className={styles.notaResultado}>
                Valor de referência para {precos.label.toLowerCase()}. O orçamento final
                depende do estado da superfície e da tinta escolhida.
              </p>
              <a
                href={linkWhatsApp(mensagemWhatsApp)}
                target="_blank"
                rel="noopener noreferrer"
                className={`botao ${styles.botaoWhatsApp}`}
              >
                Pedir orçamento exacto no WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
