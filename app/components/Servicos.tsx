import styles from "./Servicos.module.css";

const SERVICOS = [
  {
    cor: "var(--azul-baia)",
    titulo: "Pintura interior",
    texto:
      "Salas, quartos, cozinhas e casas de banho. Massa, lixagem, primário e duas demãos de acabamento — sem manchas, sem marcas de rolo.",
  },
  {
    cor: "var(--terracota)",
    titulo: "Pintura exterior e fachadas",
    texto:
      "Preparação para o clima moçambicano: tratamento de fissuras, impermeabilização e tintas resistentes a sol e chuva.",
  },
  {
    cor: "var(--ocre)",
    titulo: "Espaços comerciais",
    texto:
      "Lojas, escritórios e prédios com prazos e horários combinados para não parar o teu negócio.",
  },
  {
    cor: "var(--verde-caju)",
    titulo: "Acabamentos decorativos",
    texto:
      "Texturas, efeitos e paletas personalizadas para quem quer um espaço com identidade própria.",
  },
  {
    cor: "var(--azul-baia-claro)",
    titulo: "Reparação de imóveis e pintura geral",
    texto:
      "Pequenas obras e reparações — rebocos, fissuras, humidade, gesso e acabamentos — seguidas da pintura geral do espaço, tudo tratado pela mesma equipa.",
  },
];

export function Servicos() {
  return (
    <section className={`secao ${styles.secao}`} id="servicos">
      <div className="envolvente">
        <div className={styles.cabecalho}>
          <h2>O que fazemos</h2>
        </div>
        <div className={styles.lista}>
          {SERVICOS.map((s) => (
            <div className={styles.item} key={s.titulo}>
              <div className={styles.mancha} style={{ background: s.cor }} />
              <h3>{s.titulo}</h3>
              <p>{s.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
