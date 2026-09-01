"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

// NOTA: as respostas sobre formas de pagamento e duração exacta da
// garantia estão em termos gerais — confirma os detalhes reais e ajusta
// o texto abaixo antes de publicar.
const PERGUNTAS = [
  {
    pergunta: "Quanto tempo demora um trabalho de pintura?",
    resposta:
      "Depende da área e do estado da parede, mas uma pintura interior de uma casa típica demora normalmente entre 2 a 5 dias úteis, incluindo preparação e secagem entre demãos. Fachadas e espaços comerciais maiores levam mais tempo — combinamos o prazo exacto na visita.",
  },
  {
    pergunta: "Que formas de pagamento aceitam?",
    resposta:
      "Aceitamos os métodos mais comuns em Moçambique — M-Pesa, eMola, mKesh e transferência bancária. Combinamos o método e as condições (ex: sinal + saldo final) no momento do orçamento.",
  },
  {
    pergunta: "Trabalham só em Maputo ou também nos arredores?",
    resposta: "Trabalhamos em Maputo e arredores. Se o teu caso for fora desta zona, fala connosco na mesma — avaliamos caso a caso.",
  },
  {
    pergunta: "Preciso de tirar os móveis antes de vocês começarem?",
    resposta:
      "Nós protegemos móveis e chão com lonas antes de começar, mas ajuda bastante se retirares objectos pequenos, frágeis ou de valor sentimental da divisão antes do início do trabalho.",
  },
  {
    pergunta: "Dão garantia no serviço?",
    resposta:
      "Sim — o período exacto de garantia é combinado no orçamento, consoante o tipo de serviço e a tinta usada.",
  },
  {
    pergunta: "Como peço um orçamento?",
    resposta:
      "O mais rápido é usar a calculadora acima para uma estimativa instantânea, ou falar directamente connosco pelo WhatsApp. Também podes preencher o formulário mais abaixo.",
  },
];

const DADOS_ESTRUTURADOS_FAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PERGUNTAS.map((p) => ({
    "@type": "Question",
    name: p.pergunta,
    acceptedAnswer: { "@type": "Answer", text: p.resposta },
  })),
};

export function FAQ() {
  const [abertas, setAbertas] = useState<Set<number>>(new Set());

  function alternar(i: number) {
    setAbertas((anteriores) => {
      const novas = new Set(anteriores);
      if (novas.has(i)) novas.delete(i);
      else novas.add(i);
      return novas;
    });
  }

  return (
    <section className={`secao ${styles.secao}`} id="faq">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DADOS_ESTRUTURADOS_FAQ) }}
      />
      <div className="envolvente">
        <div className={styles.cabecalho}>
          <h2>Perguntas frequentes</h2>
        </div>

        <div className={styles.lista}>
          {PERGUNTAS.map((item, i) => {
            const aberta = abertas.has(i);
            return (
              <div className={styles.item} key={item.pergunta} data-aberta={aberta}>
                <button
                  type="button"
                  className={styles.pergunta}
                  onClick={() => alternar(i)}
                  aria-expanded={aberta}
                >
                  {item.pergunta}
                  <span className={styles.icone} aria-hidden="true" />
                </button>
                {aberta && <p className={styles.resposta}>{item.resposta}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
