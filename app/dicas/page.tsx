import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ARTIGOS } from "./artigos";
import styles from "./dicas.module.css";
import { URL_SITE, NOME_EMPRESA } from "../lib/site-config";

export const metadata: Metadata = {
  title: `Dicas de pintura e manutenção | ${NOME_EMPRESA}`,
  description: "Conselhos práticos sobre pintura, manutenção e reparação de imóveis em Maputo, escritos pela nossa equipa.",
  alternates: { canonical: `${URL_SITE}/dicas` },
};

function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" });
}

export default function PaginaDicas() {
  return (
    <>
      <Header />
      <main className={styles.pagina}>
        <div className="envolvente">
          <div className={styles.cabecalho}>
            <h1>Dicas de pintura e manutenção</h1>
            <p>Conselhos práticos, sem enrolação, para quem vai pintar ou já pintou e quer que dure.</p>
          </div>

          <div className={styles.grelha}>
            {ARTIGOS.map((artigo) => (
              <Link key={artigo.slug} href={`/dicas/${artigo.slug}`} className={styles.cartao}>
                <span className={styles.data}>{formatarData(artigo.dataPublicacao)}</span>
                <h2>{artigo.titulo}</h2>
                <p>{artigo.resumo}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
