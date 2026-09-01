import styles from "./FaixaConfianca.module.css";

const ITENS = [
  {
    titulo: "Garantia no serviço",
    icone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    titulo: "Orçamento sem compromisso",
    icone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="3.5" width="16" height="17" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h4" />
      </svg>
    ),
  },
  {
    titulo: "Equipa experiente",
    icone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19c.7-3 3-5 5.5-5s4.8 2 5.5 5" />
        <circle cx="17" cy="8.5" r="2.2" />
        <path d="M15.8 14.2c1.9.4 3.4 2 3.9 4.3" />
      </svg>
    ),
  },
  {
    titulo: "Resposta rápida no WhatsApp",
    icone: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 3 4 14h6l-1 7 9-11h-6Z" />
      </svg>
    ),
  },
];

export function FaixaConfianca() {
  return (
    <div className={styles.faixa}>
      <div className={`envolvente ${styles.linha}`}>
        {ITENS.map((item) => (
          <div className={styles.item} key={item.titulo}>
            <span className={styles.icone}>{item.icone}</span>
            <span>{item.titulo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
