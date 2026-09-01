import styles from "./Testemunhos.module.css";

// Substitui cada entrada por um testemunho REAL assim que o tiveres —
// nunca inventes nomes/comentários, isso é publicidade enganosa. Até lá,
// os cartões ficam marcados como "por preencher" (estrelas vazias, texto
// em itálico) para não parecerem avaliações verdadeiras.
type Testemunho = {
  estrelas: number; // 0 = ainda sem avaliação
  comentario: string;
  nome: string;
  local: string;
};

const TESTEMUNHOS: Testemunho[] = [
  { estrelas: 0, comentario: "O comentário do cliente aparece aqui.", nome: "[Nome do cliente]", local: "[Bairro, Maputo]" },
  { estrelas: 0, comentario: "O comentário do cliente aparece aqui.", nome: "[Nome do cliente]", local: "[Bairro, Maputo]" },
  { estrelas: 0, comentario: "O comentário do cliente aparece aqui.", nome: "[Nome do cliente]", local: "[Bairro, Maputo]" },
];

function Estrelas({ quantidade }: { quantidade: number }) {
  return (
    <div className={styles.estrelas} aria-label={quantidade > 0 ? `${quantidade} de 5 estrelas` : "Ainda sem avaliação"}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={i < quantidade ? styles.estrelaCheia : styles.estrelaVazia}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8Z" />
        </svg>
      ))}
    </div>
  );
}

export function Testemunhos() {
  return (
    <section className={`secao ${styles.secao}`}>
      <div className="envolvente">
        <div className={styles.cabecalho}>
          <h2>O que dizem os clientes</h2>
          <p>Espaço reservado para os primeiros testemunhos reais.</p>
        </div>

        <div className={styles.grelha}>
          {TESTEMUNHOS.map((t, i) => (
            <div className={styles.cartao} key={i}>
              <Estrelas quantidade={t.estrelas} />
              <p className={styles.comentario}>&ldquo;{t.comentario}&rdquo;</p>
              <div className={styles.autor}>
                <span className={styles.nome}>{t.nome}</span>
                <span className={styles.local}>{t.local}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
