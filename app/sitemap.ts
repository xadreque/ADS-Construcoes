import type { MetadataRoute } from "next";
import { URL_SITE } from "./lib/site-config";
import { ARTIGOS } from "./dicas/artigos";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: URL_SITE,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${URL_SITE}/dicas`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...ARTIGOS.map((artigo) => ({
      url: `${URL_SITE}/dicas/${artigo.slug}`,
      lastModified: new Date(artigo.dataPublicacao),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
