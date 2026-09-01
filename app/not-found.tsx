import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import styles from "./nao-encontrado.module.css";
import { linkWhatsApp } from "./lib/site-config";

export default function NaoEncontrado() {
  return (
    <>
      <Header />
      <main className={styles.pagina}>
        <div className={`envolvente ${styles.caixa}`}>
          <span className={styles.numero}>404</span>
          <h1>Esta parede ainda não foi pintada.</h1>
          <p>A página que procuras não existe ou foi movida. Vamos levar-te de volta.</p>
          <div className={styles.acoes}>
            <a href="/" className="botao botao-primario">Voltar ao início</a>
            <a
              href={linkWhatsApp("Olá! Estava no site e a página que procurava não abriu.")}
              target="_blank"
              rel="noopener noreferrer"
              className="botao botao-secundario"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
