import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui";
import { createMetadata } from "@/lib/seo";
import { ResourceArchive } from "./_components/ResourceArchive";
import {
  RESOURCE_ARTICLES,
  RESOURCE_BASE,
  paginateArticles,
  readPageNumber,
} from "./_data";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const query = await searchParams;
  const page = readPageNumber(query.page);
  return createMetadata({
    title: page > 1 ? `WooCommerce Subscription Resources — Page ${page}` : "WooCommerce Subscription Resources",
    description:
      "Practical WooCommerce subscription guides for product models, billing, payment recovery, memberships, retention, and customer operations.",
    path: page > 1 ? `${RESOURCE_BASE}?page=${page}` : RESOURCE_BASE,
  });
}

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = await searchParams;
  const page = readPageNumber(query.page);
  const featuredArticle = RESOURCE_ARTICLES[0];
  const archiveArticles = RESOURCE_ARTICLES.slice(1);
  const paginated = paginateArticles(archiveArticles, page);

  if (page > paginated.totalPages) notFound();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "ArraySubs", href: "/deals/arraysubs/" },
          { name: "Resources", href: RESOURCE_BASE },
        ]}
        title={
          <>
            <span className="block max-[30rem]:text-[3.25rem]">Subscription</span>
            <span className="block max-[30rem]:text-[3.25rem]">field guides.</span>
          </>
        }
        subtitle="Clear, operator-focused guidance for WooCommerce subscriptions: choose the model, understand the lifecycle, test the edge cases, and move into configuration with fewer surprises."
        highlights={[
          "Answer-first guides for real store decisions",
          "Current lifecycle and product architecture",
          "Numbered pages you can browse and return to",
        ]}
      />

      <ResourceArchive
        articles={archiveArticles}
        page={page}
        basePath={RESOURCE_BASE}
        featuredArticle={featuredArticle}
      />
    </>
  );
}
