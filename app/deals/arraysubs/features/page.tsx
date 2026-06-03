import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { createMetadata, softwareApplicationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Badge,
  Button,
  ComparisonTable,
  Container,
  CTA,
  Eyebrow,
  IconCard,
  PageHero,
  Section,
  SectionTitle,
  type ComparisonCell,
  type ComparisonColumn,
  type ComparisonGroup,
} from "@/components/ui";
import {
  FEATURE_CATEGORIES,
  featuresByCategory,
  type FeatureTier,
} from "./_data";

export const metadata: Metadata = createMetadata({
  title: "All Features — WooCommerce Subscriptions & Memberships",
  description:
    "Explore all 15 ArraySubs feature modules — subscriptions, memberships, billing, retention, store credit, checkout builder, analytics, and more. A generous free core, plus Pro.",
  path: "/deals/arraysubs/features/",
});

const GET_PRO = "/deals/arraysubs/pricing/#get-pro";

const tierTone = (tier: FeatureTier) => (tier === "Free" ? "highlight" : "primary");

/* Free vs Pro availability table, built from the feature data. */
const CHECK: ComparisonCell = { kind: "check" };
const NO: ComparisonCell = { kind: "no" };

const COMPARISON_COLUMNS: ComparisonColumn[] = [
  { key: "free", name: "ArraySubs Free", offer: "$0 — free forever" },
  { key: "pro", name: "ArraySubs Pro", offer: "Free for 4 months", featured: true },
];

const COMPARISON_GROUPS: ComparisonGroup[] = FEATURE_CATEGORIES.map(
  (category) => ({
    label: category.label,
    rows: featuresByCategory(category.key).map((feature) => ({
      feature: feature.name,
      cells: { free: feature.tier === "Pro" ? NO : CHECK, pro: CHECK },
    })),
  }),
);

export default function FeaturesHubPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "ArraySubs", href: "/deals/arraysubs/" },
          { name: "Features", href: "/deals/arraysubs/features/" },
        ]}
        title="Everything you need to run subscriptions & memberships"
        subtitle="Fifteen integrated modules. A generous free tier. One plugin — no duct-taping five separate tools together."
        highlights={[
          "15 feature modules",
          "Generous free-forever core",
          "Pro free for 4 months",
        ]}
        actions={
          <Button
            href={GET_PRO}
            size="lg"
            magnetic
            iconRight={<ArrowRight className="size-5" />}
          >
            Get Pro — Free
          </Button>
        }
      />

      {/* ---- Category grid ---------------------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="All features"
            title="15 modules, five categories"
            subtitle="Browse every module — each links to a full breakdown of what it does."
            align="center"
          />
          <div className="mt-12 flex flex-col gap-12">
            {FEATURE_CATEGORIES.map((category) => (
              <div key={category.key}>
                <Eyebrow>{category.label}</Eyebrow>
                <div className="mt-5 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
                  {featuresByCategory(category.key).map((feature) => (
                    <IconCard
                      key={feature.slug}
                      icon={<feature.icon className="size-6" />}
                      title={feature.name}
                      description={feature.cardDescription}
                      href={`/deals/arraysubs/features/${feature.slug}/`}
                      badge={
                        <Badge tone={tierTone(feature.tier)}>
                          {feature.tier}
                        </Badge>
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Free vs Pro availability ----------------------------------- */}
      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Free vs Pro"
            title="What's in each plan"
            subtitle="Most modules are in the free core. Pro unlocks the rest — free for 4 months during early launch."
            align="center"
          />
          <div className="mt-12">
            <ComparisonTable
              caption="ArraySubs feature availability in the Free core versus Pro, grouped by category."
              columns={COMPARISON_COLUMNS}
              groups={COMPARISON_GROUPS}
            />
          </div>
        </Container>
      </Section>

      {/* ---- CTA -------------------------------------------------------- */}
      <Section surface="primary" spacing="md">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="Early launch offer"
            title="Get ArraySubs Pro — free for 4 months"
            subtitle="Install the free core today, then unlock every Pro module free while early launch is open."
            microcopy="Limited time · no credit card required"
            actions={
              <Button
                href={GET_PRO}
                variant="dark"
                size="lg"
                layers="2layer"
                magnetic
                iconRight={<ArrowRight className="size-5" />}
              >
                Get Pro — Free
              </Button>
            }
          />
        </Container>
      </Section>

      <JsonLd data={softwareApplicationSchema()} />
    </>
  );
}
