import styles from "./Hero.module.css";

// Quando tiveres a foto real de uma fachada concluída, define o caminho
// aqui (ex: "/portfolio/fachada-01.jpg"). Enquanto for null, mostra-se o
// gráfico "antes / depois" ilustrativo em vez de um espaço vazio.
const FOTO_FACHADA: string | null = null;

function IconeSetas() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--carvao)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 8 5 12l4 4" />
      <path d="M15 8l4 4-4 4" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className={styles.hero} id="topo">
      <div className="envolvente">
        <div className={styles.grelha}>
          <div className={styles.coluna}>
            <h1>Cada parede merece o traço certo.</h1>
            <p>
              Pintura de casas, prédios e espaços comerciais em Maputo e
              arredores. Preparação cuidada, cor bem aplicada, acabamento que
              dura — do orçamento à última demão.
            </p>
            <div className={styles.acoes}>
              <a href="#contacto" className="botao botao-primario">
                Pedir orçamento grátis
              </a>
              <a href="#portfolio" className="botao botao-secundario">
                Ver trabalhos feitos
              </a>
            </div>
            <p className={styles.selo}>
              +[X] anos de experiência · trabalhos residenciais e comerciais
            </p>
          </div>

          <div className={styles.paleta} aria-hidden="false">
            <div
              className={`${styles.amostra} ${styles.amostraFoto}`}
              style={FOTO_FACHADA ? { backgroundImage: `url(${FOTO_FACHADA})` } : undefined}
            >
              <span className={styles.marcador}>FACHADA · ANTES / DEPOIS</span>

              {!FOTO_FACHADA && (
                <div className={styles.antesDepois}>
                  <div className={styles.ladoAntes} />
                  <div className={styles.ladoDepois} />
                  <div className={styles.divisor}>
                    <span className={styles.alca}><IconeSetas /></span>
                  </div>
                </div>
              )}

              <span className={styles.rotuloAmostra}>Exterior</span>
            </div>
            <div className={styles.amostra} style={{ background: "var(--azul-baia)" }}>
              Interior
            </div>
            <div className={styles.amostra} style={{ background: "var(--terracota)" }}>
              Comercial
            </div>
            <div className={styles.amostra} style={{ background: "var(--ocre)", color: "var(--carvao)" }}>
              Decorativo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
