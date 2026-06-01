import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Add a route entry here when a new indexable page ships.
 * The design-system page is intentionally excluded (noindex).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/contact/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
