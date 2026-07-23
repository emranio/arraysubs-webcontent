import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarDays, Clock3 } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  authorSchemaInput,
  getAuthorByName,
  getAuthorPath,
} from "@/app/authors/_data";
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
import {
  PILLARS,
  pillarPath,
} from "@/app/deals/arraysubs/features/_pillars";
import { MarkdownArticle } from "./MarkdownArticle";

const MEMBERSHIP_FEATURE =
  "/deals/arraysubs/features/woocommerce-membership/";
const MEMBERSHIP_USE_CASE = "/deals/arraysubs/use-cases/membership-sites/";

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

  const author = getAuthorByName(article.author);
  const related = getRelatedArticles(article);
  const isMembershipArticle = article.categorySlug === "membership-strategy";
  // Feature guide that cites this article, for the strategy → feature bridge.
  const featurePillar = PILLARS.find((pillar) =>
    pillar.articleSlugs.includes(article.slug),
  );
  const implementationFeature =
    isMembershipArticle
      ? {
          href: MEMBERSHIP_FEATURE,
          label: "Explore membership features",
        }
      : featurePillar
        ? {
            href: pillarPath(featurePillar.slug),
            label: `${featurePillar.name} feature guide`,
          }
        : undefined;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Articles", href: RESOURCE_BASE },
          { name: category.name, href: getCategoryPath(category.slug) },
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
            preserveImageAspect
            className="aspect-[4/3] min-h-0 sm:aspect-[16/7] sm:min-h-[19rem]"
          />

          <div className="mt-12 grid items-start gap-12 xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-20">
            <article className="w-full min-w-0 max-w-none xl:max-w-4xl">
              <MarkdownArticle markdown={markdown} />

              <section
                aria-labelledby="implementation-title"
                className="mt-14 border-y border-border py-10"
              >
                <p className="text-sm font-semibold tracking-[0.12em] text-primary uppercase">
                  {isMembershipArticle
                    ? "Apply this membership strategy"
                    : "Continue from strategy to setup"}
                </p>
                <h2 id="implementation-title" className="mt-3 text-3xl">
                  {isMembershipArticle
                    ? "See the complete WooCommerce membership system"
                    : "Use a recipe when the model is settled"}
                </h2>
                <p className="mt-5 text-lg leading-8 text-muted">
                  {isMembershipArticle
                    ? "Connect the decision you just made to recurring or one-time billing, eight free access conditions, content dripping, protected downloads, member self-service, and retention in ArraySubs."
                    : "These articles own the decision and operating model. The ArraySubs feature map and recipes cover the exact product, billing, and customer-workflow configuration."}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  {implementationFeature && (
                    <Button
                      href={implementationFeature.href}
                      variant="outline"
                      size="sm"
                      iconRight={<ArrowRight className="size-4" />}
                    >
                      {implementationFeature.label}
                    </Button>
                  )}
                  {isMembershipArticle && featurePillar ? (
                    <Button
                      href={pillarPath(featurePillar.slug)}
                      variant="ghost"
                      size="sm"
                      iconRight={<ArrowRight className="size-4" />}
                    >
                      {featurePillar.name}
                    </Button>
                  ) : (
                    <Button
                      href="/deals/arraysubs/features/"
                      variant={implementationFeature ? "ghost" : "outline"}
                      size="sm"
                      iconRight={<ArrowRight className="size-4" />}
                    >
                      Browse features
                    </Button>
                  )}
                  <Button
                    href={
                      isMembershipArticle
                        ? MEMBERSHIP_USE_CASE
                        : "/deals/arraysubs/use-cases/"
                    }
                    variant="ghost"
                    size="sm"
                    iconRight={<ArrowRight className="size-4" />}
                  >
                    {isMembershipArticle
                      ? "See the membership use case"
                      : "Explore recipes"}
                  </Button>
                </div>
              </section>

              <section aria-labelledby="author-title" className="mt-12">
                <div className="rounded-xl bg-card p-6 sm:p-7">
                  <p className="text-sm font-semibold tracking-[0.12em] text-faint uppercase">
                    Written by
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={author.image}
                      width={author.imageWidth}
                      height={author.imageHeight}
                      alt={`Portrait of ${author.name}`}
                      className="size-16 shrink-0 rounded-xl object-cover"
                    />
                    <span className="min-w-0">
                      <h2 id="author-title" className="text-xl leading-tight">
                        <Link
                          href={getAuthorPath(author)}
                          className="transition-colors hover:text-primary"
                        >
                          {author.name}
                        </Link>
                      </h2>
                      <span className="mt-1 block text-sm font-medium text-primary">
                        {author.jobTitle}
                      </span>
                    </span>
                  </div>
                  <p className="mt-4 leading-7 text-muted">{author.headline}</p>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                    <Link
                      href={getAuthorPath(author)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      View author profile
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                    <Link
                      href="/trust-center/editorial-standards/"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      Content Standard and Correction Requests
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </div>
                </div>
              </section>
            </article>

            <aside
              className="hidden xl:sticky xl:top-24 xl:block"
              aria-label="Article navigation"
            >
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
            {isMembershipArticle
              ? "Continue the membership strategy cluster"
              : "Continue the foundation cluster"}
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
            eyebrow={
              isMembershipArticle
                ? "From strategy to membership system"
                : "From plan to working store"
            }
            title={
              isMembershipArticle
                ? "Turn this membership strategy into a working store"
                : "Build the subscription system you just mapped"
            }
            subtitle={
              isMembershipArticle
                ? "See how ArraySubs connects the member offer, billing record, access policy, protected value, self-service, and lifecycle operations."
                : "Start with the free ArraySubs core, then add Pro automation when the store needs supported automatic gateways and deeper operations."
            }
            microcopy={
              isMembershipArticle
                ? "Eight access conditions, dripping, downloads, and role mapping ship in the free core"
                : "No credit card required · Keep the same subscription records as you grow"
            }
            actions={
              isMembershipArticle ? (
                <>
                  <Button
                    href={MEMBERSHIP_FEATURE}
                    variant="dark"
                    size="lg"
                    layers="2layer"
                    magnetic
                    iconRight={<ArrowRight className="size-5" />}
                  >
                    Explore Membership Features
                  </Button>
                  <Button
                    href="/deals/arraysubs/pricing/"
                    variant="highlight"
                    size="lg"
                    layers="2layer"
                  >
                    View Pro Pricing
                  </Button>
                </>
              ) : (
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
              )
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
            author: authorSchemaInput(author),
            image: article.cover.image,
            imageWidth: 1672,
            imageHeight: 941,
            articleSection: category.name,
            format: article.format,
            keywords: article.keywords,
            topics: isMembershipArticle
              ? [
                  "WooCommerce memberships",
                  "WooCommerce content restriction",
                  "Membership access strategy",
                ]
              : undefined,
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
  const author = getAuthorByName(article.author);
  const reviewerCandidate = article.reviewer
    ? getAuthorByName(article.reviewer)
    : undefined;
  const reviewer =
    reviewerCandidate?.name === article.reviewer
      ? reviewerCandidate
      : undefined;

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-foreground">
      <Link
        href={getAuthorPath(author)}
        className="group inline-flex items-center gap-2 font-semibold transition-colors hover:text-primary"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={author.image}
          width={author.imageWidth}
          height={author.imageHeight}
          alt={`Portrait of ${author.name}`}
          className="size-6 rounded-full object-cover"
        />
        Written by {author.name}
      </Link>
      <span className="inline-flex items-center gap-2">
        <CalendarDays aria-hidden="true" className="size-4 text-primary" />
        <time dateTime={article.publishedAt}>
          Published {formatArticleDate(article.publishedAt)}
        </time>
      </span>
      <span className="inline-flex items-center gap-2">
        <CalendarDays aria-hidden="true" className="size-4 text-primary" />
        <time dateTime={article.updatedAt}>
          Updated {formatArticleDate(article.updatedAt)}
        </time>
      </span>
      {reviewer && (
        <Link
          href={getAuthorPath(reviewer)}
          className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-primary"
        >
          <BadgeCheck aria-hidden="true" className="size-4 text-primary" />
          Reviewed by {reviewer.name}
        </Link>
      )}
      <span className="inline-flex items-center gap-2">
        <BadgeCheck aria-hidden="true" className="size-4 text-primary" />
        <time dateTime={article.lastVerifiedAt}>
          Last verified {formatArticleDate(article.lastVerifiedAt)}
        </time>
      </span>
      <span className="inline-flex items-center gap-2">
        <Clock3 aria-hidden="true" className="size-4 text-primary" />
        {article.readTime}
      </span>
    </div>
  );
}
