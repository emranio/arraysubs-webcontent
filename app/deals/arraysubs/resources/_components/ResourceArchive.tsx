import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  ArticleCard,
  Badge,
  Container,
  EditorialArtwork,
  Pagination,
  Section,
} from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  RESOURCE_ARTICLES,
  RESOURCE_BASE,
  RESOURCE_CATEGORIES,
  formatArticleDate,
  getArticlePath,
  getCategoryPath,
  paginateArticles,
  type ResourceArticle,
} from "../_data";

type ResourceArchiveProps = {
  articles: ResourceArticle[];
  page: number;
  basePath: string;
  activeCategory?: string;
  featuredArticle?: ResourceArticle;
  heading?: string;
  intro?: string[];
};

export function ResourceArchive({
  articles,
  page,
  basePath,
  activeCategory,
  featuredArticle,
  heading = "Latest field guides",
  intro,
}: ResourceArchiveProps) {
  const paginated = paginateArticles(articles, page);
  const firstItem = (page - 1) * 6 + 1;
  const lastItem = Math.min(firstItem + paginated.articles.length - 1, articles.length);

  return (
    <>
      <Section surface="default" spacing="sm">
        <Container>
          {intro && intro.length > 0 && (
            <div className="mb-10 grid gap-6 border-b border-border pb-10 lg:grid-cols-[16rem_1fr]">
              <p className="font-display text-2xl font-semibold text-primary">
                About this topic
              </p>
              <div className="grid max-w-4xl gap-5 text-lg leading-8 text-muted">
                {intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}
          <CategoryNavigation activeCategory={activeCategory} />

          {featuredArticle && page === 1 && (
            <div className="mt-10">
              <FeaturedArticle article={featuredArticle} />
            </div>
          )}
        </Container>
      </Section>

      <Section surface="surface" spacing="md" aria-labelledby="resource-grid-title">
        <Container>
          <div className="flex flex-col gap-3 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.12em] text-primary uppercase">
                Browse the library
              </p>
              <h2
                id="resource-grid-title"
                className="mt-2 font-display text-4xl leading-tight sm:text-5xl"
              >
                {heading}
              </h2>
            </div>
            <p className="text-sm font-medium text-faint" aria-live="polite">
              Showing {firstItem}–{lastItem} of {articles.length} articles
            </p>
          </div>

          <div className="mt-8 grid gap-[0.1875rem] md:grid-cols-2 xl:grid-cols-3">
            {paginated.articles.map((article) => {
              const category = RESOURCE_CATEGORIES.find(
                (candidate) => candidate.slug === article.categorySlug,
              );
              return (
                <ArticleCard
                  key={article.slug}
                  href={getArticlePath(article)}
                  category={category?.name ?? "Resources"}
                  title={article.title}
                  excerpt={article.excerpt}
                  date={formatArticleDate(article.updatedAt)}
                  dateTime={article.updatedAt}
                  readTime={article.readTime}
                  coverLabel={article.cover.label}
                  coverImage={article.cover.image}
                  coverTone={article.cover.tone}
                />
              );
            })}
          </div>

          <Pagination
            currentPage={page}
            totalPages={paginated.totalPages}
            label={activeCategory ? `${heading} pages` : "Resource library pages"}
            hrefForPage={(targetPage) =>
              targetPage === 1 ? basePath : `${basePath}?page=${targetPage}`
            }
          />
        </Container>
      </Section>
    </>
  );
}

function CategoryNavigation({ activeCategory }: { activeCategory?: string }) {
  return (
    <nav aria-label="Resource categories">
      <div className="flex items-center justify-between gap-5">
        <p className="font-display text-xl font-semibold">Explore by topic</p>
        <span className="hidden text-sm font-medium text-faint sm:inline">
          {RESOURCE_ARTICLES.length} practical guides
        </span>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2">
        <li>
          <CategoryLink
            href={RESOURCE_BASE}
            label="All resources"
            count={RESOURCE_ARTICLES.length}
            active={!activeCategory}
          />
        </li>
        {RESOURCE_CATEGORIES.map((category) => (
          <li key={category.slug}>
            <CategoryLink
              href={getCategoryPath(category.slug)}
              label={category.name}
              count={
                RESOURCE_ARTICLES.filter(
                  (article) => article.categorySlug === category.slug,
                ).length
              }
              active={activeCategory === category.slug}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function CategoryLink({
  href,
  label,
  count,
  active,
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-pill border px-4 py-2 text-sm font-semibold transition-colors",
        active
          ? "border-primary bg-primary text-on-dark"
          : "border-border-strong bg-background text-foreground hover:border-primary hover:text-primary",
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "inline-flex min-w-6 items-center justify-center rounded-pill px-1.5 py-0.5 text-xs",
          active ? "bg-background/20 text-on-dark" : "bg-surface text-faint",
        )}
      >
        {count}
      </span>
    </Link>
  );
}

function FeaturedArticle({ article }: { article: ResourceArticle }) {
  const category = RESOURCE_CATEGORIES.find(
    (candidate) => candidate.slug === article.categorySlug,
  );

  return (
    <Link
      href={getArticlePath(article)}
      className="group grid overflow-hidden rounded-2xl bg-card outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
    >
      <EditorialArtwork
        eyebrow={category?.name ?? "Resources"}
        title={article.cover.label}
        image={article.cover.image}
        tone={article.cover.tone}
        className="h-full min-h-[20rem] rounded-none lg:aspect-auto"
      />
      <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
        <div>
          <Badge tone="primary">Editor&apos;s pick</Badge>
          <p className="mt-6 text-sm font-semibold tracking-[0.12em] text-primary uppercase">
            {category?.name}
          </p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl">
            {article.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted text-pretty">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-6">
          <p className="text-sm font-medium text-faint">
            <time dateTime={article.updatedAt}>
              Updated {formatArticleDate(article.updatedAt)}
            </time>{" "}
            · {article.readTime}
          </p>
          <span className="inline-flex items-center gap-2 font-semibold text-primary">
            Read the guide
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
