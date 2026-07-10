import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { USE_CASES } from "@/app/deals/arraysubs/use-cases/_data";
import { RECIPES } from "@/app/deals/arraysubs/use-cases/_recipes";
import { COMPARISONS } from "@/app/deals/arraysubs/alternatives/_data";

/**
 * Add a route entry here when a new indexable page ships.
 * The design-system page is intentionally excluded (noindex).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const dealsRoutes = [
    ["/deals/arraysubs/pricing/", 0.8],
    ["/deals/arraysubs/features/", 0.8],
    ["/deals/arraysubs/use-cases/", 0.8],
    ["/deals/arraysubs/use-cases/can-i/", 0.7],
    ["/deals/arraysubs/alternatives/", 0.8],
  ] as const;

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
      url: absoluteUrl("/deals/arraysubs/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/contact/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/become-an-affiliate/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...dealsRoutes.map(([path, priority]) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...USE_CASES.map((useCase) => ({
      url: absoluteUrl(`/deals/arraysubs/use-cases/${useCase.slug}/`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...RECIPES.map((recipe) => ({
      url: absoluteUrl(`/deals/arraysubs/use-cases/recipes/${recipe.slug}/`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...COMPARISONS.map((comparison) => ({
      url: absoluteUrl(`/deals/arraysubs/alternatives/${comparison.slug}/`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...trustRoutes.map(([path, priority]) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
    })),
  ];
}
