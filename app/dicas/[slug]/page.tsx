import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ARTIGOS, obterArtigoPorSlug } from "../artigos";
import styles from "../dicas.module.css";
import { URL_SITE } from "../../lib/site-config";

export function generateStaticParams() {
  return ARTIGOS.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const artigo = obterArtigoPorSlug(params.slug);
  if (!artigo) return {};

  return {
    title: `${artigo.titulo} | Dicas`,
    description: artigo.resumo,
    alternates: { canonical: `${URL_SITE}/dicas/${artigo.slug}` },
    openGraph: {
      title: artigo.titulo,
      description: artigo.resumo,
      type: "article",
      publishedTime: artigo.dataPublicacao,
    },
  };
}

function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" });
}

export default function PaginaArtigo({ params }: { params: { slug: string } }) {
  const artigo = obterArtigoPorSlug(params.slug);
  if (!artigo) notFound();

  return (
    <>
      <Header />
      <main>
        <article className={`envolvente ${styles.artigo}`}>
          <Link href="/dicas" className={styles.voltar}>← Voltar às dicas</Link>
          <span className={styles.data}>{formatarData(artigo.dataPublicacao)}</span>
          <h1>{artigo.titulo}</h1>
          {artigo.paragrafos.map((paragrafo, i) => (
            <p key={i}>{paragrafo}</p>
          ))}

          <div className={styles.cta}>
            <p>Precisas de ajuda com um trabalho parecido?</p>
            <a href="/#contacto" className="botao botao-primario">Pedir orçamento</a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
