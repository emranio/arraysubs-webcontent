import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import {
  Badge,
  BigText,
  Button,
  Container,
  CTA,
  Eyebrow,
  IconCard,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";
import { USE_CASES } from "./_data";
import { FEATURES, type FeatureTier } from "../features/_data";
import { RECIPE_GROUPS, RECIPES, recipesForGroup } from "./_recipes";

const tierTone = (tier: FeatureTier) =>
  tier === "Free" ? "highlight" : tier === "Pro" ? "dark" : "primary";

export const metadata: Metadata = createMetadata({
  title: "Use Cases — WooCommerce Subscriptions for Every Business",
  description:
    "See how ArraySubs powers SaaS, memberships, subscription boxes, online courses, publishers, service retainers, wholesale memberships, support operations, and store credit workflows.",
  path: "/deals/arraysubs/use-cases/",
});

const GET_PRO = "/deals/arraysubs/pricing/";
const USE_CASE_COUNT = USE_CASES.length;
const MODULE_COUNT = FEATURES.length;

export default function UseCasesHubPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "ArraySubs", href: "/deals/arraysubs/" },
          { name: "Use cases", href: "/deals/arraysubs/use-cases/" },
        ]}
        title="Whatever you sell, map it to ArraySubs"
        subtitle={`Browse ${USE_CASE_COUNT} practical workflows built from the current ${MODULE_COUNT}-module ArraySubs manual map.`}
        highlights={[
          `${USE_CASE_COUNT} use cases`,
          `${MODULE_COUNT} feature modules`,
          "One free-forever core",
        ]}
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

      {/* ---- Use case grid ---------------------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Use cases"
            title="Built for every subscription business"
            subtitle="Pick the model closest to yours. Each guide maps the exact ArraySubs root modules behind the workflow."
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((useCase) => (
              <IconCard
                key={useCase.slug}
                icon={<useCase.icon className="size-6" />}
                title={useCase.name}
                description={useCase.cardDescription}
                href={`/deals/arraysubs/use-cases/${useCase.slug}/`}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Big link to the "Can I…?" answers page --------------------- */}
      <Section surface="default" spacing="sm">
        <Container>
          <div className="flex justify-center">
            <Button
              href="/deals/arraysubs/use-cases/can-i/"
              variant="outline"
              size="lg"
              magnetic
              iconRight={<ArrowRight className="size-5" />}
            >
              “Can I…?” — see every answer
            </Button>
          </div>
        </Container>
      </Section>

      {/* ---- Configuration recipes, grouped by module ------------------- */}
      <Section surface="surface" spacing="md" id="recipes">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <div>
              <BigText size="display-lg" align="center">
                Whatever you can imagine,
              </BigText>
              <BigText size="display-lg" variant="primary" align="center">
                ArraySubs covers you.
              </BigText>
            </div>
            <p className="text-lg text-muted text-pretty sm:text-xl">
              {`Pricing that bends, retention that fights, promos that convert — explore ${RECIPES.length} real-world setups built from live ArraySubs settings. However unconventional your subscription idea, the plumbing is already here.`}
            </p>
          </div>
          <div className="mt-12 flex flex-col gap-16">
            {RECIPE_GROUPS.map((group) => {
              const recipes = recipesForGroup(group.key);
              if (recipes.length === 0) return null;
              return (
                <div key={group.key}>
                  <div className="mx-auto max-w-2xl text-center">
                    <Eyebrow>{group.eyebrow}</Eyebrow>
                    <h3 className="mt-3 font-display text-2xl leading-tight text-balance sm:text-3xl">
                      {group.label}
                    </h3>
                    <p className="mt-3 text-muted text-pretty">
                      {group.description}
                    </p>
                  </div>
                  <div className="mt-8 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
                    {recipes.map((recipe) => (
                      <IconCard
                        key={recipe.slug}
                        icon={<recipe.icon className="size-6" />}
                        title={recipe.name}
                        description={recipe.cardDescription}
                        href={`/deals/arraysubs/use-cases/recipes/${recipe.slug}/`}
                        badge={
                          <Badge tone={tierTone(recipe.tier)}>{recipe.tier}</Badge>
                        }
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ---- CTA -------------------------------------------------------- */}
      <Section surface="primary" spacing="md">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="Paid Pro plans"
            title="Unlock Pro workflows when you need them"
            subtitle="Install the free core today, then choose a paid Pro plan for advanced modules, automation, analytics, and payment workflows."
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
    </>
  );
}
