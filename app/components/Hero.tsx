import styles from "./Hero.module.css";

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
              style={{
                // TODO: troca por uma foto real de um trabalho concluído,
                // ex: backgroundImage: "url(/portfolio/sala-01.jpg)"
              }}
            >
              <span className={styles.marcador}>FACHADA · ANTES / DEPOIS</span>
              <span>Exterior</span>
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
