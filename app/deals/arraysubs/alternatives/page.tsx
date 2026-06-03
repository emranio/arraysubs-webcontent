import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  HeartHandshake,
  Layers,
  LineChart,
  MoveRight,
  PanelsTopLeft,
  Rocket,
  Wand2,
} from "lucide-react";
import { createMetadata, softwareApplicationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Button,
  ComparisonTable,
  Container,
  CTA,
  Eyebrow,
  IconCard,
  Marqueue,
  PageHero,
  Section,
  SectionTitle,
  type ComparisonCell,
  type ComparisonColumn,
  type ComparisonGroup,
} from "@/components/ui";
import { COMPARISONS } from "./_data";

export const metadata: Metadata = createMetadata({
  title: "ArraySubs Alternatives & Comparisons — Subscription Plugins (2026)",
  description:
    "How ArraySubs compares to WooCommerce Subscriptions, WooCommerce Memberships, YITH, WP Swings, SUMO and WPSubscription. Free vs paid, feature matrices and migration notes for 2026.",
  path: "/deals/arraysubs/alternatives/",
});

const GET_PRO = "/deals/arraysubs/pricing/#get-pro";

/* Compact "ArraySubs vs the field" differentiator matrix. */
/** Bare tick. The optional arg is ignored — no note text beside checks. */
const yes = (_note?: string): ComparisonCell => ({ kind: "check" });
const no: ComparisonCell = { kind: "no" };
const part = (label?: string): ComparisonCell => ({ kind: "partial", label });

const FIELD_COLUMNS: ComparisonColumn[] = [
  { key: "arraysubs", name: "ArraySubs", offer: "Free + Pro", featured: true },
  { key: "woo", name: "Woo Subscriptions", offer: "$279/yr" },
  { key: "yith", name: "YITH Subscription", offer: "€199.99/yr" },
  { key: "wpswings", name: "WP Swings", offer: "Free + Pro" },
  { key: "wpsub", name: "WPSubscription", offer: "$55/yr" },
  { key: "sumo", name: "SUMO", offer: "~$49 once" },
];

const FIELD_GROUPS: ComparisonGroup[] = [
  {
    label: "What sets ArraySubs apart",
    rows: [
      {
        feature: "Generous free tier",
        cells: {
          arraysubs: yes(),
          woo: no,
          yith: part("limited"),
          wpswings: yes(),
          wpsub: yes(),
          sumo: no,
        },
      },
      {
        feature: "Subscriptions + memberships in one plugin",
        cells: {
          arraysubs: yes(),
          woo: no,
          yith: no,
          wpswings: no,
          wpsub: no,
          sumo: no,
        },
      },
      {
        feature: "Retention flow builder",
        cells: { arraysubs: yes(), woo: no, yith: no, wpswings: no, wpsub: no, sumo: no },
      },
      {
        feature: "Store credit system",
        cells: { arraysubs: yes("Pro"), woo: no, yith: no, wpswings: no, wpsub: no, sumo: no },
      },
      {
        feature: "Advanced analytics",
        cells: {
          arraysubs: yes("Pro"),
          woo: part("basic"),
          yith: part("basic"),
          wpswings: no,
          wpsub: no,
          sumo: no,
        },
      },
      {
        feature: "Guided setup wizard",
        cells: { arraysubs: yes(), woo: no, yith: no, wpswings: no, wpsub: no, sumo: no },
      },
      {
        feature: "Actively maintained",
        cells: {
          arraysubs: yes(),
          woo: yes(),
          yith: yes(),
          wpswings: yes(),
          wpsub: yes(),
          sumo: no,
        },
      },
    ],
  },
];

const WHY_SWITCH = [
  {
    icon: <Layers className="size-6" />,
    title: "All-in-one, not a plugin pile",
    description:
      "Subscriptions and memberships in one plugin — no $478/yr two-plugin stacks or vendor add-ons to stitch together.",
  },
  {
    icon: <HeartHandshake className="size-6" />,
    title: "Retention that fights churn",
    description:
      "A built-in retention flow builder intercepts cancellations with offers — a feature no competitor ships.",
  },
  {
    icon: <Wand2 className="size-6" />,
    title: "A genuinely usable free tier",
    description:
      "Memberships, plan switching, grace periods, retention and a setup wizard — free, where rivals charge or omit them.",
  },
  {
    icon: <LineChart className="size-6" />,
    title: "Modern analytics & store credit",
    description:
      "Pro adds 10-KPI analytics, audit logs and a store-credit wallet that the rest of the field simply doesn't have.",
  },
  {
    icon: <PanelsTopLeft className="size-6" />,
    title: "Visual checkout builder",
    description:
      "Pro ships a 27-field drag-and-drop checkout builder with multi-step flows and conditional fields — no rival offers one.",
  },
  {
    icon: <Rocket className="size-6" />,
    title: "Guided setup & migration",
    description:
      "A 9-step wizard configures ArraySubs to your business, and JSON export/import clones settings across stores — unique to ArraySubs.",
  },
  {
    icon: <Globe className="size-6" />,
    title: "Built for global selling",
    description:
      "Paddle as merchant of record handles sales tax and compliance in 200+ countries — rare in the subscription space.",
  },
];

export default function AlternativesHubPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "ArraySubs", href: "/deals/arraysubs/" },
          { name: "Compare", href: "/deals/arraysubs/alternatives/" },
        ]}
        title="ArraySubs vs the alternatives"
        subtitle="Comparing WooCommerce subscription and membership plugins? See how ArraySubs stacks up against the incumbents — honestly, feature by feature, with pricing and migration notes."
        highlights={[
          "7 detailed comparisons",
          "Free vs paid, side by side",
          "Balanced — not just our wins",
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

      {/* ---- All-in-one showcase (two-column statement) ----------------- */}
      <Section surface="default" spacing="none" className="overflow-hidden">
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.75fr)] lg:gap-16 lg:py-24">
          <div className="flex flex-col font-display">
            <Eyebrow className="mb-6">All-in-one</Eyebrow>
            <h2 className="max-w-[52rem] font-display text-[2.875rem] leading-[0.9] font-bold tracking-normal text-foreground sm:text-[5rem] lg:text-[5rem] xl:text-[5.5rem]">
              One plugin <span className="text-primary">replaces</span> the stack
            </h2>
            <div className="mt-10 sm:mt-12">
              <span className="block font-display text-[5rem] leading-none font-bold text-primary sm:text-[7rem]">
                $0
              </span>
              <span className="mt-4 block max-w-sm text-lg leading-7 text-muted">
                replaces up to{" "}
                <span className="font-semibold text-foreground">$478/yr</span> in
                separate subscription + membership plugins.
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:pt-24">
            <div className="mb-10 flex items-start gap-5 sm:mb-12">
              <img
                src="/shapes/shape-3.webp"
                alt=""
                width={86}
                height={90}
                aria-hidden="true"
                className="mt-3 h-[5.625rem] w-[5.375rem] shrink-0"
              />
              <p className="min-w-0 max-w-[22rem] font-display text-xl leading-tight font-semibold tracking-normal text-foreground sm:text-3xl">
                You do not need five plugins for subscriptions, memberships,
                retention and analytics.
              </p>
            </div>

            <p className="max-w-[39rem] text-lg leading-8 font-normal text-muted sm:text-xl">
              ArraySubs combines them in one ecosystem.{" "}
              <span className="text-foreground">
                The comparisons below show exactly where it leads, where the match
                is even, and where each competitor still has the edge.
              </span>
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-16">
              <Button
                href={GET_PRO}
                size="md"
                iconRight={<ArrowRight aria-hidden="true" className="size-5" />}
              >
                Get Pro — Free
              </Button>
              <Button
                href="/deals/arraysubs/features/"
                variant="outline"
                size="md"
                iconRight={<ArrowRight aria-hidden="true" className="size-5" />}
              >
                See all features
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Comparison grid -------------------------------------------- */}
      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Comparisons"
            title="Pick a head-to-head"
            subtitle="Detailed, fact-checked breakdowns against each major subscription and membership plugin."
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
            {COMPARISONS.map((comparison) => (
              <IconCard
                key={comparison.slug}
                icon={<comparison.icon className="size-6" />}
                title={`vs ${comparison.competitorShort}`}
                description={comparison.cardDescription}
                href={`/deals/arraysubs/alternatives/${comparison.slug}/`}
              />
            ))}

            {/* All-features prompt fills the grid's leftover cells: spans 2
                columns on desktop, full width (1 column) on mobile + tablet.
                Lives inside the grid so it never starts its own row. */}
            <Link
              href="/deals/arraysubs/features/"
              aria-label="See all ArraySubs features"
              className="group grid items-end gap-8 overflow-hidden rounded-2xl bg-dark p-8 text-on-dark sm:p-12 lg:col-span-2 lg:grid-cols-2"
            >
            <div className="flex items-center gap-4 sm:gap-5">
              <span className="min-w-0 font-display text-5xl leading-none font-bold sm:text-6xl lg:text-7xl">
                All Features
              </span>
              <MoveRight
                aria-hidden="true"
                className="size-12 shrink-0 text-primary transition-transform duration-300 ease-out group-hover:translate-x-2 sm:size-14 lg:size-16"
              />
            </div>
            <div className="flex items-end justify-start lg:justify-end">
              <span className="text-sm font-semibold tracking-[0.18em] text-on-dark/70 uppercase transition-colors group-hover:text-on-dark">
                Check Now
              </span>
            </div>
          </Link>
          </div>
        </Container>
      </Section>

      {/* ---- ArraySubs vs the field matrix ------------------------------ */}
      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="At a glance"
            title="ArraySubs vs the field"
            subtitle="The differentiators that hold across the market — and a fair note where rivals match on the basics."
            align="center"
          />
          <div className="mt-12">
            <ComparisonTable
              caption="How ArraySubs compares with WooCommerce Subscriptions, YITH Subscription, WP Swings, WPSubscription and SUMO on free tier, all-in-one scope, retention, store credit, analytics, setup and maintenance."
              columns={FIELD_COLUMNS}
              groups={FIELD_GROUPS}
            />
          </div>
        </Container>
      </Section>

      {/* ---- Why teams switch ------------------------------------------- */}
      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Why teams switch"
            title="What you gain with ArraySubs"
            align="center"
          />
          <Marqueue
            label="Reasons teams switch to ArraySubs"
            className="mt-12"
          >
            {WHY_SWITCH.map((item) => (
              <IconCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </Marqueue>
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
