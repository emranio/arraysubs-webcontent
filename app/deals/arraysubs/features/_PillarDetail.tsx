import { ArrowRight, Check, Sparkles } from "lucide-react";
import { faqSchema, softwareApplicationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import {
  Accordion,
  ArticleCard,
  Badge,
  Button,
  Container,
  CTA,
  Eyebrow,
  IconCard,
  PageHero,
  Section,
  SectionTitle,
  TagCard,
} from "@/components/ui";
import { getPillar } from "./_pillars";
import type { FeaturePillar } from "./_pillars/types";
import {
  RESOURCE_ARTICLES,
  RESOURCE_CATEGORIES,
  formatArticleDate,
  getArticlePath,
} from "../resources/_data";
import { highlight } from "../_highlight";

const GET_PRO = "/deals/arraysubs/pricing/";
const ALL_FEATURES = "/deals/arraysubs/features/";
const MEMBERSHIP_FEATURE =
  "/deals/arraysubs/features/woocommerce-membership/";

/**
 * Shared template for the 15 `/deals/arraysubs/features/<slug>/` pillar pages.
 * All copy comes from `_pillars/`; this file only arranges it with the design
 * system. The layout is question-led on purpose: each deep-dive block is an
 * `h2` question with an anchor id so search and AI answer engines can lift the
 * question + answer pair directly (SEO/GEO).
 */
export function PillarDetail({ pillar }: { pillar: FeaturePillar }) {
  const path = `/deals/arraysubs/features/${pillar.slug}/`;

  const articles = pillar.articleSlugs
    .map((slug) => RESOURCE_ARTICLES.find((article) => article.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const relatedPillars = pillar.relatedPillars
    .map((slug) => getPillar(slug))
    .filter((item): item is FeaturePillar => Boolean(item));

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "ArraySubs", href: "/deals/arraysubs/" },
          { name: "Features", href: ALL_FEATURES },
          { name: pillar.name, href: path },
        ]}
        title={pillar.h1}
        subtitle={pillar.heroSubtitle}
        highlights={[pillar.tier, ...pillar.heroHighlights]}
        actions={
          <>
            <Button
              href={GET_PRO}
              size="lg"
              magnetic
              iconRight={<ArrowRight className="size-5" />}
            >
              Start Trial
            </Button>
            {pillar.slug === "member-access-control" && (
              <Button href={MEMBERSHIP_FEATURE} variant="outline" size="lg">
                Membership overview
              </Button>
            )}
            <Button
              href={ALL_FEATURES}
              variant={
                pillar.slug === "member-access-control" ? "ghost" : "outline"
              }
              size="lg"
              magnetic
            >
              All features
            </Button>
          </>
        }
        trust="No credit card required · Free core on WordPress.org"
      />

      {/* ---- Lead -------------------------------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <p className="mx-auto max-w-5xl text-xl leading-9 text-muted text-pretty sm:text-2xl sm:leading-10">
            {highlight(pillar.intro)}
          </p>
        </Container>
      </Section>

      {/* ---- Capabilities ------------------------------------------------ */}
      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Capabilities"
            title={`What ${pillar.name} gives you`}
            subtitle="Every capability listed here reflects the current plugin build — free means free."
            align="center"
          />
          <ScrollReveal
            stagger={0.04}
            y={0}
            className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3"
          >
            {pillar.capabilities.map((capability) => (
              <IconCard
                key={capability.title}
                icon={<Check className="size-6" />}
                title={capability.title}
                description={capability.description}
                badge={
                  capability.tier ? (
                    <Badge tone={capability.tier === "Free" ? "highlight" : "dark"}>
                      {capability.tier}
                    </Badge>
                  ) : undefined
                }
              />
            ))}
          </ScrollReveal>
        </Container>
      </Section>

      {/* ---- Question-led deep dive -------------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start">
            <nav
              aria-label="On this page"
              className="lg:sticky lg:top-24 max-lg:-mx-6 max-lg:overflow-x-auto max-lg:px-6 sm:max-lg:-mx-8 sm:max-lg:px-8"
            >
              <Eyebrow>On this page</Eyebrow>
              <ul className="mt-4 flex gap-2 max-lg:w-max max-lg:pb-2 lg:flex-col lg:gap-0">
                {pillar.sections.map((section) => (
                  <li key={section.id} className="lg:border-l lg:border-border">
                    <a
                      href={`#${section.id}`}
                      className="block rounded-md text-sm text-muted transition-colors hover:text-primary max-lg:whitespace-nowrap max-lg:rounded-pill max-lg:bg-card max-lg:px-4 max-lg:py-2 lg:-ml-px lg:border-l lg:border-transparent lg:py-2 lg:pl-4 lg:hover:border-primary"
                    >
                      {section.question}
                    </a>
                  </li>
                ))}
                <li className="lg:border-l lg:border-border">
                  <a
                    href="#frequently-asked-questions"
                    className="block rounded-md text-sm text-muted transition-colors hover:text-primary max-lg:whitespace-nowrap max-lg:rounded-pill max-lg:bg-card max-lg:px-4 max-lg:py-2 lg:-ml-px lg:border-l lg:border-transparent lg:py-2 lg:pl-4 lg:hover:border-primary"
                  >
                    Frequently asked questions
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex flex-col">
              {pillar.sections.map((section, index) => (
                <article
                  key={section.id}
                  id={section.id}
                  className={
                    index === 0
                      ? "scroll-mt-24"
                      : "mt-12 scroll-mt-24 border-t border-border pt-12"
                  }
                >
                  <h2 className="font-display text-2xl text-balance sm:text-3xl">
                    {section.question}
                  </h2>
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="mt-5 text-lg leading-8 text-muted text-pretty"
                    >
                      {highlight(paragraph)}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-5 flex flex-col gap-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5">
                          <Check
                            aria-hidden="true"
                            className="mt-1 size-5 shrink-0 text-primary"
                          />
                          <span className="text-muted text-pretty">
                            {highlight(bullet)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}

              <section
                id="frequently-asked-questions"
                className="mt-12 scroll-mt-24 border-t border-border pt-12"
              >
                <h2 className="font-display text-2xl text-balance sm:text-3xl">
                  {pillar.name} questions, answered
                </h2>
                <div className="mt-6">
                  <Accordion items={pillar.faq} defaultOpen={[0]} />
                </div>
              </section>
            </div>
          </div>
        </Container>
        <JsonLd data={faqSchema(pillar.faq, path)} />
      </Section>

      {/* ---- Free vs Pro for this area ----------------------------------- */}
      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Free vs Pro"
            title={`${pillar.name}: what's free, what's Pro`}
            subtitle="The free core is a real product, not a demo. Pro adds the automation and revenue layer."
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-[0.1875rem] md:grid-cols-2">
            <div className="flex h-full flex-col rounded-2xl bg-card p-6 text-foreground sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-xl">In the free core</h3>
                <Badge tone="highlight">Free</Badge>
              </div>
              <ul className="mt-6 flex flex-col gap-3">
                {pillar.planSplit.free.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-primary"
                    />
                    <span className="text-muted text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex h-full flex-col rounded-2xl bg-dark p-6 text-on-dark sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-xl">Pro adds</h3>
                <Badge tone="primary">Pro</Badge>
              </div>
              <ul className="mt-6 flex flex-col gap-3">
                {pillar.planSplit.pro.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Sparkles
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-highlight"
                    />
                    <span className="text-on-dark-muted text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button
                  href={GET_PRO}
                  variant="highlight"
                  size="md"
                  magnetic
                  iconRight={<ArrowRight className="size-4" />}
                >
                  View Pro pricing
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Further reading + related guides ---------------------------- */}
      {(articles.length > 0 || relatedPillars.length > 0) && (
        <Section surface="default" spacing="md">
          <Container>
            <SectionTitle
              eyebrow="Go deeper"
              title="From the resource library"
              subtitle="Strategy articles and neighboring feature guides for the harder questions around this part of the subscription system."
              align="center"
            />
            {articles.length > 0 && (
              <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    href={getArticlePath(article)}
                    category={
                      RESOURCE_CATEGORIES.find(
                        (category) => category.slug === article.categorySlug,
                      )?.name ?? "Resources"
                    }
                    title={article.title}
                    excerpt={article.excerpt}
                    date={formatArticleDate(article.updatedAt)}
                    dateTime={article.updatedAt}
                    readTime={article.readTime}
                    coverLabel={article.cover.label}
                    coverImage={article.cover.image}
                    coverTone={article.cover.tone}
                    headingLevel="h3"
                  />
                ))}
              </div>
            )}
            {relatedPillars.length > 0 && (
              <div
                className={
                  articles.length > 0
                    ? "mt-12 border-t border-border pt-12"
                    : "mt-12"
                }
              >
                <h3 className="font-display text-2xl text-balance">
                  Related feature guides
                </h3>
                <div className="mt-6 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
                  {relatedPillars.map((related) => (
                    <TagCard
                      key={related.slug}
                      tag={related.tier}
                      title={related.name}
                      description={related.cardDescription}
                      href={`/deals/arraysubs/features/${related.slug}/`}
                      cta={`Read the ${related.name} guide`}
                    />
                  ))}
                </div>
              </div>
            )}
          </Container>
        </Section>
      )}

      {/* ---- CTA --------------------------------------------------------- */}
      <Section surface="primary" spacing="md">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="Try it on your store"
            title={`Put ${pillar.name.toLowerCase()} to work`}
            subtitle="Install the free core from WordPress.org today, then start a Pro trial when you want the automation and revenue features."
            microcopy="No credit card required · 30-day money-back guarantee"
            actions={
              <>
                <Button
                  href={GET_PRO}
                  variant="dark"
                  size="lg"
                  layers="2layer"
                  magnetic
                  iconRight={<ArrowRight className="size-5" />}
                >
                  Start Trial
                </Button>
                <Button
                  href={ALL_FEATURES}
                  variant="outline"
                  size="lg"
                  layers="2layer"
                  magnetic
                >
                  Browse all features
                </Button>
              </>
            }
          />
        </Container>
      </Section>

      <JsonLd data={softwareApplicationSchema()} />
    </>
  );
}
