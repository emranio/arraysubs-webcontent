import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  ExternalLink,
  Globe,
  GraduationCap,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { createMetadata, profilePageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Button,
  Container,
  CTA,
  OrganicPortrait,
  PageHero,
  Pagination,
  Section,
} from "@/components/ui";
import { site } from "@/lib/site";
import {
  AUTHOR_BASE,
  AUTHOR_LIST,
  authorSchemaInput,
  getAuthor,
  getAuthorByName,
  getAuthorPath,
  type Author,
  type AuthorProfile,
} from "../_data";
import {
  RESOURCE_ARTICLES,
  RESOURCE_CATEGORIES,
  formatArticleDate,
  getArticlePath,
  paginateArticles,
  readPageNumber,
} from "@/app/articles/_data";

export const dynamicParams = false;

type RouteParams = Promise<{ slug: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export function generateStaticParams() {
  return AUTHOR_LIST.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: RouteParams;
  searchParams: SearchParams;
}): Promise<Metadata> {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const author = getAuthor(slug);
  if (!author) return {};
  const page = readPageNumber(query.page);
  const authorPath = getAuthorPath(author);

  return createMetadata({
    title:
      page > 1
        ? `${author.name} — ${author.jobTitle} — Page ${page}`
        : `${author.name} — ${author.jobTitle}`,
    description: author.headline,
    path: page > 1 ? `${authorPath}?page=${page}` : authorPath,
    ogImage: author.image,
  });
}

const CATEGORY_NAME = new Map(
  RESOURCE_CATEGORIES.map((category) => [category.slug, category.name]),
);
const AUTHOR_ARTICLES_PAGE_SIZE = 15;

function getAuthoredArticles(author: Author) {
  return RESOURCE_ARTICLES.filter(
    (article) => getAuthorByName(article.author).slug === author.slug,
  ).sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

function profileIcon(profile: AuthorProfile) {
  if (/wordpress/i.test(profile.label)) return Boxes;
  if (/personal|site/i.test(profile.label)) return Globe;
  return ExternalLink;
}

function isExternal(url: string) {
  return /^https?:\/\//i.test(url);
}

export default async function AuthorPage({
  params,
  searchParams,
}: {
  params: RouteParams;
  searchParams: SearchParams;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const author = getAuthor(slug);
  if (!author) notFound();

  const articles = getAuthoredArticles(author);
  const page = readPageNumber(query.page);
  const paginated = paginateArticles(articles, page, AUTHOR_ARTICLES_PAGE_SIZE);
  if (page > paginated.totalPages) notFound();
  const authorPath = getAuthorPath(author);

  return (
    <>
      <PageHero
        layout="showcase"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Authors", href: AUTHOR_BASE },
          { name: author.name, href: getAuthorPath(author) },
        ]}
        eyebrow="ArraySubs author"
        title={author.name}
        subtitle={author.headline}
        highlights={author.credentials.slice(0, 3)}
        visual={
          <OrganicPortrait
            src={author.image}
            width={author.imageWidth}
            height={author.imageHeight}
            alt={`Portrait of ${author.name}`}
            caption={author.jobTitle}
          />
        }
      />

      <Section surface="default" spacing="md">
        <Container>
          <div className="grid items-start gap-12 xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-20">
            <div className="w-full min-w-0 max-w-none xl:max-w-3xl">
              <figure className="mb-10 flex items-center gap-4 lg:hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={author.image}
                  width={author.imageWidth}
                  height={author.imageHeight}
                  alt={`Portrait of ${author.name}`}
                  className="size-20 shrink-0 rounded-xl object-cover"
                />
                <figcaption className="flex items-center gap-2 text-sm font-medium text-primary">
                  <ShieldCheck aria-hidden="true" className="size-4" />
                  {author.jobTitle}
                </figcaption>
              </figure>

              <section aria-labelledby="about-title">
                <h2
                  id="about-title"
                  className="text-sm font-semibold tracking-[0.12em] text-primary uppercase"
                >
                  About
                </h2>
                <div className="mt-5 grid gap-5 text-lg leading-8 text-muted">
                  {author.bio.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="text-left md:text-justify"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              <section aria-labelledby="topics-title" className="mt-12">
                <h2
                  id="topics-title"
                  className="text-sm font-semibold tracking-[0.12em] text-primary uppercase"
                >
                  {author.voice === "first"
                    ? "Topics I'm qualified to cover"
                    : `Topics ${author.name} is qualified to cover`}
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {author.topics.map((topic) => (
                    <li
                      key={topic}
                      className="rounded-full bg-card px-4 py-2 text-sm font-medium text-foreground"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="work-title" className="mt-12">
                <h2
                  id="work-title"
                  className="text-sm font-semibold tracking-[0.12em] text-primary uppercase"
                >
                  Selected work
                </h2>
                <div className="mt-5 grid gap-[0.1875rem] sm:grid-cols-2">
                  {author.selectedWork.map((work) => {
                    const external = isExternal(work.url);
                    return (
                      <a
                        key={work.name}
                        href={work.url}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group flex h-full flex-col rounded-xl bg-card p-6 outline-none transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                      >
                        <span className="flex items-center gap-2 font-display text-xl font-semibold">
                          {work.name}
                          <ArrowRight
                            aria-hidden="true"
                            className="size-4 text-primary transition-transform duration-200 group-hover:translate-x-1"
                          />
                        </span>
                        <span className="mt-3 leading-7 text-muted">
                          {work.description}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </section>
            </div>

            <aside
              className="grid gap-[0.1875rem] xl:sticky xl:top-24"
              aria-label="Author verification"
            >
              <div className="rounded-xl bg-card p-6">
                <p className="text-sm font-semibold tracking-[0.12em] text-faint uppercase">
                  Verified profiles
                </p>
                <ul className="mt-4 grid gap-2">
                  {author.profiles.map((profile) => {
                    const Icon = profileIcon(profile);
                    return (
                      <li key={profile.url}>
                        <a
                          href={profile.url}
                          target="_blank"
                          rel="me noopener noreferrer"
                          className="group flex items-center gap-3 rounded-lg px-2 py-2 text-foreground transition-colors hover:bg-surface"
                        >
                          <Icon
                            aria-hidden="true"
                            className="size-5 shrink-0 text-primary"
                          />
                          <span className="font-medium">{profile.label}</span>
                          <ExternalLink
                            aria-hidden="true"
                            className="ml-auto size-4 text-faint transition-colors group-hover:text-primary"
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-xl bg-card p-6">
                <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.12em] text-faint uppercase">
                  <BadgeCheck aria-hidden="true" className="size-4 text-primary" />
                  Experience & credentials
                </p>
                <ul className="mt-4 grid gap-3">
                  {author.credentials.map((credential) => (
                    <li
                      key={credential}
                      className="flex gap-2.5 text-sm leading-6 text-muted"
                    >
                      <GraduationCap
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-primary"
                      />
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-primary p-6 text-on-dark">
                <p className="text-sm font-semibold tracking-[0.12em] text-on-dark-muted uppercase">
                  Contact & verify
                </p>
                <p className="mt-3 text-sm leading-6 text-on-dark-muted">
                  Published by {site.name} · {site.brand}. Reach the team to
                  verify authorship or request a correction.
                </p>
                <a
                  href={`mailto:${author.email}`}
                  className="mt-4 inline-flex items-center gap-2 font-medium underline underline-offset-4"
                >
                  <Mail aria-hidden="true" className="size-4" />
                  {author.email}
                </a>
                <div className="mt-3">
                  <Button href="/contact/" variant="dark" size="sm">
                    Contact the team
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section
        surface="surface"
        spacing="md"
        aria-labelledby="articles-title"
        id="articles"
      >
        <Container>
          <p className="text-sm font-semibold tracking-[0.12em] text-primary uppercase">
            {articles.length} guides
          </p>
          <h2 id="articles-title" className="mt-3 text-4xl sm:text-5xl">
            Articles by {author.name}
          </h2>
          <ul className="mt-8 grid gap-[0.1875rem] md:grid-cols-2 xl:grid-cols-3">
            {paginated.articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={getArticlePath(article)}
                  className="group flex h-full flex-col rounded-xl bg-background p-6 outline-none transition-colors hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:p-7"
                >
                  <span className="text-sm font-semibold tracking-[0.1em] text-primary uppercase">
                    {CATEGORY_NAME.get(article.categorySlug) ?? "Resource"}
                  </span>
                  <h3 className="mt-4 text-2xl leading-tight transition-colors group-hover:text-primary">
                    {article.title}
                  </h3>
                  <span className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-7 text-sm font-medium text-faint">
                    <time dateTime={article.updatedAt}>
                      Updated {formatArticleDate(article.updatedAt)}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={page}
            totalPages={paginated.totalPages}
            label={`Articles by ${author.name} pages`}
            hrefForPage={(targetPage) =>
              targetPage === 1
                ? `${authorPath}#articles`
                : `${authorPath}?page=${targetPage}#articles`
            }
          />
        </Container>
      </Section>

      <Section surface="primary" spacing="md">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="From strategy to working store"
            title="Build the subscription system these guides describe"
            subtitle="Start with the free ArraySubs core, then add Pro automation when you need supported automatic gateways and deeper operations."
            microcopy="No credit card required · Written and maintained by the developer who builds ArraySubs"
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

      <JsonLd data={[profilePageSchema(authorSchemaInput(author))]} />
    </>
  );
}
