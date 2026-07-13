import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  FileCheck2,
  UserRound,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  ArticleCard,
  Button,
  Container,
  CTA,
  EditorialArtwork,
  PageHero,
  Section,
} from "@/components/ui";
import { blogPostSchema, faqSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  RESOURCE_BASE,
  RESOURCE_CATEGORIES,
  formatArticleDate,
  getArticlePath,
  getCategoryPath,
  getRelatedArticles,
  type ResourceArticle,
} from "../_data";
import type { ArticleFaq, ArticleHeading } from "../_content";
import { MarkdownArticle } from "./MarkdownArticle";

type ArticleDetailProps = {
  article: ResourceArticle;
  markdown: string;
  headings: ArticleHeading[];
  faqs: ArticleFaq[];
  wordCount: number;
};

export function ArticleDetail({
  article,
  markdown,
  headings,
  faqs,
  wordCount,
}: ArticleDetailProps) {
  const category = RESOURCE_CATEGORIES.find(
    (candidate) => candidate.slug === article.categorySlug,
  );

  if (!category) return null;

  const related = getRelatedArticles(article);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Resources", href: RESOURCE_BASE },
          { name: article.title, href: getArticlePath(article) },
        ]}
        title={article.title}
        titleSize="article"
        subtitle={article.excerpt}
        trust={<ArticleMeta article={article} />}
        className="pt-14 pb-12 sm:pt-16 sm:pb-16"
      />

      <Section surface="default" spacing="md">
        <Container>
          <EditorialArtwork
            eyebrow={category.name}
            title={article.cover.label}
            image={article.cover.image}
            tone={article.cover.tone}
            className="aspect-[4/3] min-h-0 sm:aspect-[16/7] sm:min-h-[19rem]"
          />

          <div className="mt-12 grid items-start gap-12 xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-20">
            <article className="min-w-0 max-w-4xl">
              <MarkdownArticle markdown={markdown} />

              <section
                aria-labelledby="implementation-title"
                className="mt-14 border-y border-border py-10"
              >
                <p className="text-sm font-semibold tracking-[0.12em] text-primary uppercase">
                  Continue from strategy to setup
                </p>
                <h2 id="implementation-title" className="mt-3 text-3xl">
                  Use a recipe when the model is settled
                </h2>
                <p className="mt-5 text-lg leading-8 text-muted">
                  These articles own the decision and operating model. The
                  ArraySubs feature map and recipes cover the exact product,
                  billing, and customer-workflow configuration.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    href="/deals/arraysubs/features/"
                    variant="outline"
                    size="sm"
                    iconRight={<ArrowRight className="size-4" />}
                  >
                    Browse features
                  </Button>
                  <Button
                    href="/deals/arraysubs/use-cases/"
                    variant="ghost"
                    size="sm"
                    iconRight={<ArrowRight className="size-4" />}
                  >
                    Explore recipes
                  </Button>
                </div>
              </section>

              <section
                aria-labelledby="author-title"
                className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2"
              >
                <div className="rounded-xl bg-card p-6 sm:p-7">
                  <UserRound aria-hidden="true" className="size-7 text-primary" />
                  <p className="mt-5 text-sm font-semibold tracking-[0.12em] text-faint uppercase">
                    Written by
                  </p>
                  <h2 id="author-title" className="mt-2 text-2xl">
                    {article.author} // {site.name}
                  </h2>
                  <p className="mt-3 leading-7 text-muted">
                    Research and practical guidance for WooCommerce
                    subscription operators and implementation teams.
                  </p>
                </div>
                <div className="rounded-xl bg-card p-6 sm:p-7">
                  <FileCheck2 aria-hidden="true" className="size-7 text-primary" />
                  <p className="mt-5 text-sm font-semibold tracking-[0.12em] text-faint uppercase">
                    Technical review
                  </p>
                  <h2 className="mt-2 text-2xl">{article.reviewer}</h2>
                  <p className="mt-3 leading-7 text-muted">
                    Reviewed against current ArraySubs code, product
                    documentation, and the linked primary platform sources.
                  </p>
                </div>
              </section>
            </article>

            <aside className="xl:sticky xl:top-24" aria-label="Article navigation">
              <div className="rounded-xl bg-surface p-6">
                <p className="font-display text-xl font-semibold">On this page</p>
                <nav
                  aria-label="Table of contents"
                  className="mt-5 max-h-[50vh] overflow-y-auto pr-2"
                >
                  <ol className="grid gap-3 border-l border-border-strong pl-4 text-sm font-medium text-muted">
                    {headings.map((heading) => (
                      <li key={heading.id}>
                        <a
                          className="transition-colors hover:text-primary"
                          href={`#${heading.id}`}
                        >
                          {heading.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>

              <Link
                href={getCategoryPath(category.slug)}
                className="group mt-[0.1875rem] flex items-center justify-between gap-4 rounded-xl bg-primary p-6 text-on-dark"
              >
                <span>
                  <span className="block text-sm font-medium text-on-dark-muted">
                    More in
                  </span>
                  <span className="mt-1 block font-display text-xl font-semibold">
                    {category.name}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </aside>
          </div>
        </Container>
      </Section>

      <Section surface="surface" spacing="md" aria-labelledby="related-title">
        <Container>
          <p className="text-sm font-semibold tracking-[0.12em] text-primary uppercase">
            Keep learning
          </p>
          <h2 id="related-title" className="mt-3 text-4xl sm:text-5xl">
            Continue the foundation cluster
          </h2>
          <div className="mt-8 grid gap-[0.1875rem] md:grid-cols-2">
            {related.map((relatedArticle) => (
              <ArticleCard
                key={relatedArticle.slug}
                href={getArticlePath(relatedArticle)}
                category={category.name}
                title={relatedArticle.title}
                excerpt={relatedArticle.excerpt}
                date={formatArticleDate(relatedArticle.updatedAt)}
                dateTime={relatedArticle.updatedAt}
                readTime={relatedArticle.readTime}
                coverLabel={relatedArticle.cover.label}
                coverImage={relatedArticle.cover.image}
                coverTone={relatedArticle.cover.tone}
                headingLevel="h3"
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="primary" spacing="md">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="From plan to working store"
            title="Build the subscription system you just mapped"
            subtitle="Start with the free ArraySubs core, then add Pro automation when the store needs supported automatic gateways and deeper operations."
            microcopy="No credit card required · Keep the same subscription records as you grow"
            actions={
              <Button
                href="/deals/arraysubs/pricing/"
                variant="dark"
                size="lg"
                layers="2layer"
                magnetic
                iconRight={<ArrowRight className="size-5" />}
              >
                View Pro Pricing
              </Button>
            }
          />
        </Container>
      </Section>

      <JsonLd
        data={[
          blogPostSchema({
            headline: article.title,
            description: article.metaDescription,
            abstract: article.directAnswer,
            path: getArticlePath(article),
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            author: article.author,
            reviewer: article.reviewer,
            image: article.cover.image,
            imageWidth: 1672,
            imageHeight: 941,
            articleSection: category.name,
            format: article.format,
            keywords: article.keywords,
            wordCount,
          }),
          ...(faqs.length >= 2
            ? [faqSchema(faqs, getArticlePath(article))]
            : []),
        ]}
      />
    </>
  );
}

function ArticleMeta({ article }: { article: ResourceArticle }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-foreground">
      <span className="inline-flex items-center gap-2 font-semibold">
        <UserRound aria-hidden="true" className="size-4 text-primary" />
        {article.author} // {site.name}
      </span>
      <span className="inline-flex items-center gap-2">
        <CalendarDays aria-hidden="true" className="size-4 text-primary" />
        <time dateTime={article.updatedAt}>
          Updated {formatArticleDate(article.updatedAt)}
        </time>
      </span>
      <span className="inline-flex items-center gap-2">
        <Clock3 aria-hidden="true" className="size-4 text-primary" />
        {article.readTime}
      </span>
    </div>
  );
}
