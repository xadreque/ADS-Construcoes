import styles from "./Portfolio.module.css";

// TODO — troca cada entrada por um trabalho real. Coloca o ficheiro em
// /public/portfolio/ (fotos .jpg/.webp, vídeos .mp4 curtos e leves) e
// aponta "src" para esse caminho. "tipo" controla se renderiza <img> ou <video>.
type Peca = {
  id: string;
  titulo: string;
  tipo: "foto" | "video";
  src: string | null; // null enquanto não houver ficheiro real
};

const TRABALHOS: Peca[] = [
  { id: "p1", titulo: "Sala — Matola", tipo: "foto", src: null },
  { id: "p2", titulo: "Fachada — Sommerschield", tipo: "foto", src: null },
  { id: "p3", titulo: "Loja — Baixa", tipo: "video", src: null },
  { id: "p4", titulo: "Quarto — Polana", tipo: "foto", src: null },
  { id: "p5", titulo: "Escritório — Malhangalene", tipo: "foto", src: null },
  { id: "p6", titulo: "Muro — Costa do Sol", tipo: "foto", src: null },
];

export function Portfolio() {
  return (
    <section className="secao" id="portfolio">
      <div className="envolvente">
        <div className={styles.cabecalho}>
          <div>
            <h2>Trabalhos feitos</h2>
            <p>Uma amostra do que já foi pintado — fotos e vídeos reais das obras.</p>
          </div>
        </div>

        <div className={styles.grelha}>
          {TRABALHOS.map((t) => (
            <div className={styles.peca} key={t.id}>
              <span className={styles.marcador}>
                {t.src ? t.tipo.toUpperCase() : "ESPAÇO RESERVADO"}
              </span>

              {t.src && t.tipo === "foto" && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.src} alt={t.titulo} loading="lazy" />
              )}
              {t.src && t.tipo === "video" && (
                <video src={t.src} muted loop playsInline autoPlay />
              )}
              {!t.src && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "repeating-linear-gradient(135deg, rgba(42,38,34,0.06) 0 10px, rgba(42,38,34,0.02) 10px 20px)",
                  }}
                />
              )}

              <span className={styles.legenda}>{t.titulo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
