import { ArrowRight, ArrowUpRight, BookOpen, Check } from "lucide-react";
import { faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Accordion,
  Badge,
  Button,
  Container,
  CTA,
  Eyebrow,
  IconCard,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";
import { getFeature, type FeatureTier } from "../features/_data";
import { highlight } from "../_highlight";
import {
  getRecipe,
  manualUrl,
  RECIPE_CTA,
  RECIPE_GROUPS,
  type ManualRef,
  type Recipe,
} from "./_recipes";

const tierTone = (tier: FeatureTier) =>
  tier === "Free" ? "highlight" : tier === "Pro" ? "dark" : "primary";

/** Unique manual references across a recipe's steps, in first-seen order. */
function manualRefsFromSteps(recipe: Recipe): ManualRef[] {
  const seen = new Set<string>();
  const refs: ManualRef[] = [];
  for (const step of recipe.steps) {
    if (step.manual && !seen.has(step.manual.href)) {
      seen.add(step.manual.href);
      refs.push(step.manual);
    }
  }
  return refs;
}

/**
 * Shared template for every `/deals/arraysubs/use-cases/recipes/<slug>/` page.
 * Copy comes from `_recipes.ts`; related features and sibling recipes resolve
 * their slugs into cross-links, and step manual references render a docs box.
 */
export function RecipeDetail({ recipe }: { recipe: Recipe }) {
  const group = RECIPE_GROUPS.find((entry) => entry.key === recipe.group);
  const manualRefs = manualRefsFromSteps(recipe);

  const relatedFeatures = recipe.relatedFeatures
    .map((slug) => getFeature(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const relatedRecipes = (recipe.relatedRecipes ?? [])
    .map((slug) => getRecipe(slug))
    .filter((item): item is Recipe => Boolean(item));

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "ArraySubs", href: "/deals/arraysubs/" },
          { name: "Use cases", href: "/deals/arraysubs/use-cases/" },
          {
            name: recipe.name,
            href: `/deals/arraysubs/use-cases/recipes/${recipe.slug}/`,
          },
        ]}
        title={recipe.h1}
        subtitle={recipe.heroSubtitle}
        highlights={recipe.heroHighlights}
        actions={
          <Button
            href={RECIPE_CTA}
            size="lg"
            magnetic
            iconRight={<ArrowRight className="size-5" />}
          >
            Start Trial
          </Button>
        }
        trust="No credit card required"
      />

      {/* ---- Overview + outcomes ---------------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone={tierTone(recipe.tier)}>{recipe.tier}</Badge>
            {group && <Badge tone="outline">{group.eyebrow}</Badge>}
          </div>
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <p className="text-xl leading-9 text-muted text-pretty sm:text-2xl sm:leading-10">
              {highlight(recipe.intro)}
            </p>
            <div className="rounded-2xl bg-card p-6 text-foreground sm:p-8">
              <Eyebrow>What you get</Eyebrow>
              <ul className="mt-5 flex flex-col gap-3">
                {recipe.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2.5">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-primary"
                    />
                    <span className="text-muted text-pretty">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- The exact settings ----------------------------------------- */}
      <Section surface="surface" spacing="md" id="settings">
        <Container>
          <SectionTitle
            eyebrow="Copy these settings"
            title="The exact configuration"
            subtitle="Enter these values and you have the setup live. Every field maps to a real ArraySubs setting."
            align="center"
          />
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl bg-card">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-foreground/10 text-sm text-muted">
                  <th className="px-6 py-4 font-display font-semibold">Setting</th>
                  <th className="px-6 py-4 font-display font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                {recipe.settings.map((row) => (
                  <tr
                    key={row.setting}
                    className="border-b border-foreground/5 align-top last:border-0"
                  >
                    <td className="px-6 py-4 text-foreground">
                      <span className="font-display font-semibold">
                        {row.setting}
                      </span>
                      {row.where && (
                        <span className="mt-1 block text-sm text-muted">
                          {row.where}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground text-pretty">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {manualRefs.length > 0 && (
            <div className="mx-auto mt-[0.1875rem] max-w-3xl rounded-2xl bg-card p-6 text-foreground sm:p-8">
              <Eyebrow>From the manual</Eyebrow>
              <p className="mt-3 text-muted text-pretty">
                This configuration is built from these ArraySubs user-manual
                guides:
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {manualRefs.map((ref) => (
                  <li key={ref.href}>
                    <a
                      href={manualUrl(ref)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                    >
                      <BookOpen aria-hidden="true" className="size-4" />
                      {ref.label}
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>

      {/* ---- Best for --------------------------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Best for"
            title="When to use this setup"
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
            {recipe.bestFor.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-card p-6 text-foreground"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-on-dark"
                >
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <span className="text-pretty">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Related features and recipes ------------------------------- */}
      {(relatedFeatures.length > 0 || relatedRecipes.length > 0) && (
        <Section surface="surface" spacing="md">
          <Container>
            <SectionTitle
              eyebrow="Build and explore"
              title="Modules and related setups"
              subtitle="See what powers this configuration, then explore recipes that reuse the same building blocks."
              align="center"
            />
            {relatedFeatures.length > 0 && (
              <div className="mt-12">
                <h3 className="font-display text-2xl text-balance">
                  Modules used in this recipe
                </h3>
                <div className="mt-6 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
                  {relatedFeatures.map((feature) => (
                    <IconCard
                      key={feature.slug}
                      icon={<feature.icon className="size-6" />}
                      title={feature.name}
                      description={feature.cardDescription}
                      badge={
                        <Badge tone={tierTone(feature.tier)}>
                          {feature.tier}
                        </Badge>
                      }
                    />
                  ))}
                </div>
              </div>
            )}
            {relatedRecipes.length > 0 && (
              <div className="mt-12 border-t border-border pt-12">
                <h3 className="font-display text-2xl text-balance">
                  Related setups to explore
                </h3>
                <div className="mt-6 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
                  {relatedRecipes.map((item) => (
                    <IconCard
                      key={item.slug}
                      icon={<item.icon className="size-6" />}
                      title={item.name}
                      description={item.cardDescription}
                      href={`/deals/arraysubs/use-cases/recipes/${item.slug}/`}
                      badge={
                        <Badge tone={tierTone(item.tier)}>{item.tier}</Badge>
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </Container>
        </Section>
      )}

      {/* ---- FAQ -------------------------------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle eyebrow="FAQ" title="Questions, answered" align="center" />
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion items={recipe.faq} defaultOpen={[0]} />
          </div>
        </Container>
        <JsonLd data={faqSchema(recipe.faq)} />
      </Section>

      {/* ---- CTA -------------------------------------------------------- */}
      <Section surface="primary" spacing="md">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="Paid Pro plans"
            title="Unlock the complete Pro stack"
            subtitle="Start on the free-forever core today, then choose a paid Pro plan when you need the advanced Pro feature set."
            microcopy="No credit card required · Annual and lifetime options available"
            actions={
              <Button
                href={RECIPE_CTA}
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
    </>
  );
}
