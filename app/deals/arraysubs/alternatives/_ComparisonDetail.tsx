import type { ReactNode } from "react";
import { ArrowRight, Check, Equal, Minus } from "lucide-react";
import { articleSchema, faqSchema, softwareApplicationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Accordion,
  Badge,
  Button,
  ComparisonTable,
  Container,
  CTA,
  IconCard,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";
import {
  comparisonColumns,
  getComparison,
  type Comparison,
  type DifferenceWinner,
} from "./_data";
import { FEATURES } from "../features/_data";
import { RECIPES } from "../use-cases/_recipes";
import { highlight } from "../_highlight";

const GET_PRO = "/deals/arraysubs/pricing/";
const ALTERNATIVES = "/deals/arraysubs/alternatives/";
const MODULE_COUNT = FEATURES.length;
const CORE_MODULE_COUNT = FEATURES.filter((feature) => feature.tier !== "Pro").length;
const PRO_ONLY_FEATURES = FEATURES.filter((feature) => feature.tier === "Pro");
const PRO_ONLY_MODULE_COUNT = PRO_ONLY_FEATURES.length;
const PRO_ONLY_MODULE_NAMES = PRO_ONLY_FEATURES.map((feature) => feature.name).join(", ");
const RECIPE_COUNT = RECIPES.length;

/** Visual treatment per "who wins this difference" verdict. */
const WINNER_META: Record<
  DifferenceWinner,
  { tone: "primary" | "neutral" | "highlight"; icon: ReactNode }
> = {
  arraysubs: { tone: "primary", icon: <Check className="size-6" /> },
  tie: { tone: "neutral", icon: <Equal className="size-6" /> },
  competitor: { tone: "highlight", icon: <Minus className="size-6" /> },
};

/**
 * Shared template for every `/deals/arraysubs/alternatives/<slug>/` page. All
 * copy comes from `_data.ts`; this only arranges it with the design system,
 * GEO-ordered: answer-first verdict, then table, pricing, balanced differences,
 * migration, FAQ and related comparisons.
 */
export function ComparisonDetail({ comparison }: { comparison: Comparison }) {
  const c = comparison;
  const related = c.related
    .map((slug) => getComparison(slug))
    .filter((item): item is Comparison => Boolean(item));

  const winnerLabel = (winner: DifferenceWinner) =>
    winner === "arraysubs"
      ? "ArraySubs"
      : winner === "competitor"
        ? c.competitorShort
        : "Even";

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "ArraySubs", href: "/deals/arraysubs/" },
          { name: "Compare", href: ALTERNATIVES },
          { name: c.competitorShort, href: `${ALTERNATIVES}${c.slug}/` },
        ]}
        title={c.h1}
        subtitle={c.heroSubtitle}
        highlights={c.heroHighlights}
        actions={
          <Button
            href={GET_PRO}
            size="lg"
            magnetic
            iconRight={<ArrowRight className="size-5" />}
          >
            Start Trial
          </Button>
        }
        trust="No credit card required"
      />

      {/* ---- Verdict / TL;DR (answer-first — the GEO money block) -------- */}
      <Section surface="highlight" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="The verdict"
            title={`ArraySubs vs ${c.competitorShort}, in short`}
            align="center"
          />
          <p className="mx-auto mt-8 max-w-3xl text-center text-xl leading-9 text-dark text-pretty sm:text-2xl sm:leading-10">
            {highlight(c.verdict.summary)}
          </p>
          <div className="mx-auto mt-12 grid max-w-4xl gap-[0.1875rem] sm:grid-cols-2">
            <div className="rounded-2xl bg-card p-8">
              <h3 className="font-display text-xl text-foreground">
                Choose ArraySubs if…
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {c.verdict.arraysubsBestFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-primary"
                    />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-card p-8">
              <h3 className="font-display text-xl text-foreground">
                Choose {c.competitorShort} if…
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {c.verdict.competitorBestFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-faint"
                    />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Manual-backed module coverage ------------------------------ */}
      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Module coverage"
            title={`One plugin, ${MODULE_COUNT} modules, ${RECIPE_COUNT} ready setups`}
            subtitle={`${CORE_MODULE_COUNT} modules are free/core-accessible and ${PRO_ONLY_MODULE_COUNT} are Pro-only (${PRO_ONLY_MODULE_NAMES}) — consolidating what stores otherwise license as 5–6 separate plugins, with ${RECIPE_COUNT} documented, copy-me configurations to start from.`}
            align="center"
          />
          <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-[0.1875rem] lg:grid-cols-4">
            <li className="rounded-2xl bg-card p-6 text-center">
              <span className="block font-display text-4xl font-semibold text-primary">
                {MODULE_COUNT}
              </span>
              <span className="mt-2 block text-sm text-muted">
                root modules
              </span>
            </li>
            <li className="rounded-2xl bg-card p-6 text-center">
              <span className="block font-display text-4xl font-semibold text-primary">
                {CORE_MODULE_COUNT}
              </span>
              <span className="mt-2 block text-sm text-muted">
                core-accessible
              </span>
            </li>
            <li className="rounded-2xl bg-card p-6 text-center">
              <span className="block font-display text-4xl font-semibold text-primary">
                {PRO_ONLY_MODULE_COUNT}
              </span>
              <span className="mt-2 block text-sm text-muted">
                Pro-only
              </span>
            </li>
            <li className="rounded-2xl bg-card p-6 text-center">
              <span className="block font-display text-4xl font-semibold text-primary">
                {RECIPE_COUNT}
              </span>
              <span className="mt-2 block text-sm text-muted">
                documented setups
              </span>
            </li>
          </ul>
        </Container>
      </Section>

      {/* ---- Overview / definition lead --------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-muted text-pretty sm:text-xl sm:leading-9">
            {highlight(c.intro)}
          </p>
        </Container>
      </Section>

      {/* ---- At-a-glance comparison table ------------------------------- */}
      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Side by side"
            title={`ArraySubs vs ${c.competitorShort}: feature comparison`}
            subtitle={`How ArraySubs Free and Pro compare with ${c.competitor}.`}
            align="center"
          />
          <div className="mt-12">
            <ComparisonTable
              caption={`Feature-by-feature comparison of ArraySubs (Free and Pro) versus ${c.competitor} across pricing, root-module coverage, subscriptions, memberships, retention and operations.`}
              columns={comparisonColumns(c)}
              groups={c.tableGroups}
            />
          </div>
        </Container>
      </Section>

      {/* ---- Pricing ---------------------------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Pricing"
            title={`ArraySubs vs ${c.competitorShort} pricing`}
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-[0.1875rem] sm:grid-cols-2">
            <div className="flex flex-col rounded-2xl border-2 border-primary bg-card p-8">
              <Badge tone="primary" className="self-start">
                ArraySubs
              </Badge>
              <p className="mt-5 text-lg leading-8 text-foreground text-pretty">
                {c.pricing.arraysubs}
              </p>
              {c.pricing.savings && (
                <p className="mt-4 font-display text-lg text-primary text-pretty">
                  {c.pricing.savings}
                </p>
              )}
            </div>
            <div className="flex flex-col rounded-2xl bg-card p-8">
              <Badge tone="neutral" className="self-start">
                {c.competitorShort}
              </Badge>
              <p className="mt-5 font-display text-2xl text-foreground">
                {c.pricing.competitor}
              </p>
              {c.pricing.combinedNote && (
                <p className="mt-4 text-muted text-pretty">
                  {c.pricing.combinedNote}
                </p>
              )}
              {c.competitorUpdated && (
                <p className="mt-3 text-sm text-faint">
                  Last updated: {c.competitorUpdated}
                </p>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Key differences (balanced — every winner tagged) ----------- */}
      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Key differences"
            title="Where each plugin pulls ahead"
            subtitle="An honest read on what ArraySubs does better, what wins are even, and where the competitor leads."
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
            {c.differences.map((diff) => {
              const meta = WINNER_META[diff.winner];
              return (
                <IconCard
                  key={diff.title}
                  icon={meta.icon}
                  title={diff.title}
                  description={diff.description}
                  badge={<Badge tone={meta.tone}>{winnerLabel(diff.winner)}</Badge>}
                />
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ---- Migration -------------------------------------------------- */}
      {c.migration && (
        <Section surface="default" spacing="md">
          <Container>
            <div className="mx-auto max-w-3xl">
              <SectionTitle
                eyebrow="Switching"
                title={`Moving from ${c.competitorShort} to ArraySubs`}
              />
              <p className="mt-6 text-lg leading-8 text-muted text-pretty">
                {c.migration}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  href="/deals/arraysubs/features/"
                  variant="outline"
                  iconRight={<ArrowRight className="size-5" />}
                >
                  See all features
                </Button>
                <Button
                  href={GET_PRO}
                  iconRight={<ArrowRight className="size-5" />}
                >
                  Start Trial
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ---- FAQ -------------------------------------------------------- */}
      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="FAQ"
            title={`ArraySubs vs ${c.competitorShort}: common questions`}
            align="center"
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion items={c.faq} defaultOpen={[0]} />
          </div>
        </Container>
        <JsonLd data={faqSchema(c.faq)} />
      </Section>

      {/* ---- Related comparisons ---------------------------------------- */}
      {related.length > 0 && (
        <Section surface="default" spacing="md">
          <Container>
            <SectionTitle
              eyebrow="Keep comparing"
              title="Related comparisons"
              subtitle="See how ArraySubs stacks up against other subscription and membership plugins."
              align="center"
            />
            <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <IconCard
                  key={item.slug}
                  icon={<item.icon className="size-6" />}
                  title={`vs ${item.competitorShort}`}
                  description={item.cardDescription}
                  href={`${ALTERNATIVES}${item.slug}/`}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ---- CTA -------------------------------------------------------- */}
      <Section surface="primary" spacing="md">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="Paid Pro plans"
            title="Choose the ArraySubs Pro plan that fits"
            subtitle="Install the free core today, then upgrade securely when you need the full Pro feature set."
            microcopy="No credit card required · Plans from $129/year · Lifetime options available"
            actions={
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
            }
          />
        </Container>
      </Section>

      <JsonLd data={softwareApplicationSchema()} />
      <JsonLd
        data={articleSchema({
          headline: c.h1,
          description: c.metaDescription,
          path: `${ALTERNATIVES}${c.slug}/`,
          datePublished: c.updated,
          dateModified: c.updated,
        })}
      />
    </>
  );
}
