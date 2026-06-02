import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Add a route entry here when a new indexable page ships.
 * The design-system page is intentionally excluded (noindex).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const dealsRoutes = [["/deals/arraysubs/pricing/", 0.8]] as const;

  const trustRoutes = [
    ["/trust-center/", 0.7],
    ["/trust-center/privacy-policy/", 0.6],
    ["/trust-center/refund-policy/", 0.6],
    ["/trust-center/terms-of-service/", 0.6],
    ["/trust-center/data-safety/", 0.6],
    ["/trust-center/gdpr-ccpa-compliance/", 0.6],
    ["/trust-center/accessibility-compliance/", 0.6],
  ] as const;

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
    ...dealsRoutes.map(([path, priority]) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...trustRoutes.map(([path, priority]) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
    })),
  ];
}
