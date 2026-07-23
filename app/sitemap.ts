import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { USE_CASES } from "@/app/deals/arraysubs/use-cases/_data";
import { RECIPES } from "@/app/deals/arraysubs/use-cases/_recipes";
import { COMPARISONS } from "@/app/deals/arraysubs/alternatives/_data";
import { PILLARS } from "@/app/deals/arraysubs/features/_pillars";
import {
  RESOURCE_ARTICLES,
  RESOURCE_CATEGORIES,
  getArticlePath,
  getCategoryPath,
} from "@/app/articles/_data";
import {
  AUTHOR_BASE,
  AUTHOR_LIST,
  getAuthorPath,
} from "@/app/authors/_data";

/**
 * Add a route entry here when a new indexable page ships.
 * The design-system page is intentionally excluded (noindex).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const dealsRoutes = [
    ["/deals/arraysubs/pricing/", 0.8],
    ["/deals/arraysubs/features/", 0.8],
    ["/deals/arraysubs/features/woocommerce-membership/", 0.9],
    ["/deals/arraysubs/use-cases/", 0.8],
    ["/deals/arraysubs/use-cases/can-i/", 0.7],
    ["/deals/arraysubs/alternatives/", 0.8],
    ["/articles/", 0.8],
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
    {
      url: absoluteUrl("/roadmap/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/changelog/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...dealsRoutes.map(([path, priority]) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...PILLARS.map((pillar) => ({
      url: absoluteUrl(`/deals/arraysubs/features/${pillar.slug}/`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
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
    ...RESOURCE_CATEGORIES.map((category) => ({
      url: absoluteUrl(getCategoryPath(category.slug)),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...RESOURCE_ARTICLES.map((article) => ({
      url: absoluteUrl(getArticlePath(article)),
      lastModified: new Date(`${article.updatedAt}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: absoluteUrl(AUTHOR_BASE),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    ...AUTHOR_LIST.map((author) => ({
      url: absoluteUrl(getAuthorPath(author)),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...trustRoutes.map(([path, priority]) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
    })),
  ];
}
