import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui";
import { createMetadata } from "@/lib/seo";
import { ResourceArchive } from "../_components/ResourceArchive";
import {
  RESOURCE_CATEGORIES,
  getCategoryArticles,
  getCategoryPath,
  getResourceCategory,
  paginateArticles,
  readPageNumber,
} from "../_data";

export const dynamicParams = false;

type RouteParams = Promise<{ category: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export function generateStaticParams() {
  return RESOURCE_CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: RouteParams;
  searchParams: SearchParams;
}): Promise<Metadata> {
  const [{ category: categorySlug }, query] = await Promise.all([
    params,
    searchParams,
  ]);
  const category = getResourceCategory(categorySlug);
  if (!category) return {};
  const page = readPageNumber(query.page);
  const path = getCategoryPath(category.slug);

  return createMetadata({
    title: page > 1 ? `${category.name} — Page ${page}` : category.name,
    description: category.description,
    path: page > 1 ? `${path}?page=${page}` : path,
  });
}

export default async function ResourceCategoryPage({
  params,
  searchParams,
}: {
  params: RouteParams;
  searchParams: SearchParams;
}) {
  const [{ category: categorySlug }, query] = await Promise.all([
    params,
    searchParams,
  ]);
  const category = getResourceCategory(categorySlug);
  if (!category) notFound();

  const page = readPageNumber(query.page);
  const articles = getCategoryArticles(category.slug);
  const paginated = paginateArticles(articles, page);
  if (page > paginated.totalPages) notFound();

  const categoryPath = getCategoryPath(category.slug);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/deals/arraysubs/resources/" },
          { name: category.name, href: categoryPath },
        ]}
        title={`${category.name}.`}
        titleSize="article"
        subtitle={category.description}
        highlights={category.highlights}
      />

      <ResourceArchive
        articles={articles}
        page={page}
        basePath={categoryPath}
        activeCategory={category.slug}
        heading={`${category.name} guides`}
        intro={category.intro}
      />
    </>
  );
}
