import type { MetadataRoute } from "next";
import { URL_SITE } from "./lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: URL_SITE,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
