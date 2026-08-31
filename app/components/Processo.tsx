import styles from "./Processo.module.css";

const PASSOS = [
  { n: "1", t: "Visita e orçamento", d: "Vemos o espaço, medimos e enviamos um orçamento claro, sem surpresas." },
  { n: "2", t: "Preparação", d: "Protecção de móveis e chão, reparação de fissuras, lixagem e primário." },
  { n: "3", t: "Pintura", d: "Aplicação em duas ou mais demãos, com os prazos combinados contigo." },
  { n: "4", t: "Entrega e limpeza", d: "Vistoria final contigo e limpeza do espaço antes de sair." },
];

export function Processo() {
  return (
    <section className={`secao ${styles.secao}`} id="processo">
      <div className="envolvente">
        <h2 style={{ marginBottom: "2.8rem", fontSize: "clamp(1.9rem, 3.6vw, 2.6rem)" }}>
          Como trabalhamos
        </h2>
        <div className={styles.grelha}>
          {PASSOS.map((p) => (
            <div className={styles.passo} key={p.n}>
              <span className={styles.num}>{p.n}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
