import type { Metadata } from "next";
import "./globals.css";
import { BotaoWhatsAppFlutuante } from "./components/BotaoWhatsAppFlutuante";
import { RegistoServiceWorker } from "./components/RegistoServiceWorker";
import { AvisoDados } from "./components/AvisoDados";
import { BotaoTopo } from "./components/BotaoTopo";
import {
  URL_SITE,
  NOME_EMPRESA,
  TELEFONE_EXIBIDO,
  EMAIL_CONTACTO,
  CIDADE,
  PAIS,
  AREA_SERVICO,
  REDES_SOCIAIS,
} from "./lib/site-config";

const TITULO = `${NOME_EMPRESA} | Pintura residencial e comercial em ${CIDADE}`;
const DESCRICAO =
  `Pintura de casas, prédios e espaços comerciais em ${AREA_SERVICO}. ` +
  "Preparação cuidada, acabamento de precisão e orçamento sem compromisso.";

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITE),
  title: TITULO,
  description: DESCRICAO,
  manifest: "/manifest.json",
  keywords: [
    "pintor Maputo",
    "pintura residencial Maputo",
    "pintura comercial Moçambique",
    "pintura de fachadas",
    "reparação de imóveis Maputo",
    "empresa de pintura Moçambique",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: URL_SITE },
  openGraph: {
    type: "website",
    locale: "pt_MZ",
    url: URL_SITE,
    siteName: NOME_EMPRESA,
    title: TITULO,
    description: DESCRICAO,
  },
};

const DADOS_ESTRUTURADOS = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: NOME_EMPRESA,
  image: `${URL_SITE}/icon.png`,
  telephone: TELEFONE_EXIBIDO,
  email: EMAIL_CONTACTO,
  url: URL_SITE,
  address: {
    "@type": "PostalAddress",
    addressLocality: CIDADE,
    addressCountry: "MZ",
  },
  areaServed: AREA_SERVICO,
  priceRange: "$$",
  sameAs: REDES_SOCIAIS.map((r) => r.href),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-MZ">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Work+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#1E4B5F" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(DADOS_ESTRUTURADOS) }}
        />
      </head>
      <body>
        {children}
        <BotaoTopo />
        <BotaoWhatsAppFlutuante />
        <AvisoDados />
        <RegistoServiceWorker />
      </body>
    </html>
  );
}
