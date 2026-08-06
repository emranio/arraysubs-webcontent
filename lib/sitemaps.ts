import { COMPARISONS } from "@/app/product/arraysubs/alternatives/_data";
import { PILLARS } from "@/app/product/arraysubs/features/_pillars";
import { USE_CASES } from "@/app/product/arraysubs/use-cases/_data";
import { RECIPES } from "@/app/product/arraysubs/use-cases/_recipes";
import {
  RESOURCE_ARTICLES,
  RESOURCE_CATEGORIES,
  getArticlePath,
  getCategoryArticles,
  getCategoryPath,
} from "@/app/articles/_data";
import { AUTHOR_LIST, getAuthorPath } from "@/app/authors/_data";
import { absoluteUrl } from "@/lib/site";

export type SitemapEntry = {
  url: string;
  lastModified?: string | Date;
};

export const sitemapPaths = {
  articles: "/sitemap-articles.xml",
  recipes: "/sitemap-recipes.xml",
  pages: "/sitemap-pages.xml",
} as const;

const staticPagePaths = [
  "/product/arraysubs/",
  "/contact/",
  "/become-an-affiliate/",
  "/roadmap/",
  "/changelog/",
  "/product/arraysubs/pricing/",
  "/product/arraysubs/features/",
  "/product/arraysubs/features/woocommerce-membership/",
  "/product/arraysubs/use-cases/",
  "/product/arraysubs/use-cases/can-i/",
  "/product/arraysubs/alternatives/",
  "/trust-center/",
  "/trust-center/privacy-policy/",
  "/trust-center/refund-policy/",
  "/trust-center/terms-of-service/",
  "/trust-center/data-safety/",
  "/trust-center/gdpr-ccpa-compliance/",
  "/trust-center/accessibility-compliance/",
  "/trust-center/editorial-standards/",
] as const;

function latestArticleUpdate(categorySlug: string): string | undefined {
  const dates = getCategoryArticles(categorySlug).map(
    (article) => article.updatedAt,
  );

  return dates.sort().at(-1);
}

export function getArticleSitemapEntries(): SitemapEntry[] {
  return RESOURCE_ARTICLES.map((article) => ({
    url: absoluteUrl(getArticlePath(article)),
    lastModified: article.updatedAt,
  }));
}

export function getRecipeSitemapEntries(): SitemapEntry[] {
  return RECIPES.map((recipe) => ({
    url: absoluteUrl(`/product/arraysubs/use-cases/recipes/${recipe.slug}/`),
  }));
}

export function getPageSitemapEntries(): SitemapEntry[] {
  return [
    ...staticPagePaths.map((path) => ({ url: absoluteUrl(path) })),
    ...PILLARS.map((pillar) => ({
      url: absoluteUrl(`/product/arraysubs/features/${pillar.slug}/`),
    })),
    ...USE_CASES.map((useCase) => ({
      url: absoluteUrl(`/product/arraysubs/use-cases/${useCase.slug}/`),
    })),
    ...COMPARISONS.map((comparison) => ({
      url: absoluteUrl(
        `/product/arraysubs/alternatives/${comparison.slug}/`,
      ),
    })),
    ...RESOURCE_CATEGORIES.map((category) => ({
      url: absoluteUrl(getCategoryPath(category.slug)),
      lastModified: latestArticleUpdate(category.slug),
    })),
    ...AUTHOR_LIST.map((author) => ({
      url: absoluteUrl(getAuthorPath(author)),
    })),
  ];
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function formatLastModified(value: string | Date): string {
  return value instanceof Date ? value.toISOString() : value;
}

export function renderSitemap(entries: SitemapEntry[]): string {
  const urls = entries
    .map(({ url, lastModified }) => {
      const lastmod = lastModified
        ? `\n    <lastmod>${escapeXml(formatLastModified(lastModified))}</lastmod>`
        : "";

      return `  <url>\n    <loc>${escapeXml(url)}</loc>${lastmod}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function renderSitemapIndex(paths: readonly string[]): string {
  const sitemaps = paths
    .map(
      (path) =>
        `  <sitemap>\n    <loc>${escapeXml(absoluteUrl(path))}</loc>\n  </sitemap>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps}\n</sitemapindex>\n`;
}

export function xmlResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600",
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
