import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  HeartHandshake,
  Layers,
  LineChart,
  PanelsTopLeft,
  Rocket,
  ScrollText,
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
  type ComparisonRow,
} from "@/components/ui";
import { COMPARISONS } from "./_data";
import { FEATURES } from "../features/_data";
import { RECIPES } from "../use-cases/_recipes";

const MODULE_COUNT = FEATURES.length;
const CORE_MODULE_COUNT = FEATURES.filter((feature) => feature.tier !== "Pro").length;
const PRO_ONLY_MODULE_COUNT = FEATURES.filter((feature) => feature.tier === "Pro").length;
const RECIPE_COUNT = RECIPES.length;

export const metadata: Metadata = createMetadata({
  title: "ArraySubs Alternatives & Comparisons — Subscription Plugins (2026)",
  description:
    `How ArraySubs compares to WooCommerce Subscriptions, WooCommerce Memberships, YITH, WP Swings, SUMO and WPSubscription across ${MODULE_COUNT} root modules, pricing, feature matrices and migration notes for 2026.`,
  path: "/deals/arraysubs/alternatives/",
});

const GET_PRO = "/deals/arraysubs/pricing/";

/* Compact "ArraySubs vs the field" differentiator matrix. */
/** Bare tick. The optional arg is ignored — no note text beside checks. */
const yes = (_note?: string): ComparisonCell => ({ kind: "check" });
const no: ComparisonCell = { kind: "no" };
const part = (label?: string): ComparisonCell => ({ kind: "partial", label });
const txt = (value: string): ComparisonCell => ({ kind: "text", value });
const r = (
  feature: string,
  arraysubs: ComparisonCell,
  woo: ComparisonCell,
  yith: ComparisonCell,
  wpswings: ComparisonCell,
  wpsub: ComparisonCell,
  sumo: ComparisonCell,
): ComparisonRow => ({
  feature,
  cells: { arraysubs, woo, yith, wpswings, wpsub, sumo },
});

const FIELD_COLUMNS: ComparisonColumn[] = [
  { key: "arraysubs", name: "ArraySubs", offer: "Free + Pro", featured: true },
  { key: "woo", name: "Woo Subscriptions", offer: "$279/yr" },
  { key: "yith", name: "YITH Subscription", offer: "€199.99/yr" },
  { key: "wpswings", name: "WP Swings", offer: "$129/yr" },
  { key: "wpsub", name: "WPSubscription", offer: "$89/yr" },
  { key: "sumo", name: "SUMO", offer: "~$49 once" },
];

const FIELD_GROUPS: ComparisonGroup[] = [
  {
    label: "Plans & pricing",
    rows: [
      r("Free-forever core", yes(), no, part("limited"), yes(), yes(), no),
      r(`${MODULE_COUNT} root-module map`, yes(), no, no, no, no, no),
      r(`${CORE_MODULE_COUNT} core-accessible modules`, yes(), no, no, no, no, no),
      r(`${PRO_ONLY_MODULE_COUNT} Pro-only root modules`, yes(), no, no, no, no, no),
      r(`${RECIPE_COUNT} documented setup recipes`, yes(), no, no, no, no, no),
      r("Subscriptions + memberships in one plugin", yes(), no, no, no, no, no),
      r("No annual renewal fee", yes(), no, no, no, no, yes()),
    ],
  },
  {
    label: "Subscriptions & billing",
    rows: [
      r("Simple subscriptions", yes(), yes(), yes(), yes(), yes(), yes()),
      r("Variable-product subscriptions", yes(), yes(), part("premium"), part("Pro"), part("Pro"), yes()),
      r("Variable subscriptions in the free tier", yes(), no, no, no, no, no),
      r("Plan switching (upgrade / downgrade)", yes(), yes(), part("variable"), part("Pro"), part("Pro"), part("variation")),
      r("Different renewal price", yes(), no, no, no, part("Pro"), no),
      r("Skip next renewal", yes(), no, no, no, no, no),
      r("Pause / vacation mode", yes(), yes(), part("premium"), part("Pro"), yes(), yes()),
      r("Two-phase grace period", yes(), part("basic"), part("premium"), part("Pro"), part("Pro"), yes()),
      r("Installment / split payments", no, no, no, no, yes(), part("limited")),
      r("Payment gateways", txt("3 + manual"), txt("25+"), txt("PayPal + add-ons"), txt("4 + Pro"), txt("6"), txt("Stripe/PayPal")),
    ],
  },
  {
    label: "Memberships & access",
    rows: [
      r("Member access control", yes(), no, no, no, no, no),
      r("Content dripping & scheduling", yes(), no, no, no, no, no),
      r("URL + role-based rules engine", yes(), no, no, no, no, no),
    ],
  },
  {
    label: "Retention, revenue & insight",
    rows: [
      r("Retention flow builder", yes(), no, no, no, no, no),
      r("Store credit wallet", yes(), no, no, no, no, no),
      r("Feature Manager entitlements", yes(), no, no, no, no, no),
      r("Gateway Health dashboard", yes(), no, no, no, no, no),
      r("Analytics", yes(), part("basic"), part("basic"), part("basic"), part("basic"), no),
    ],
  },
  {
    label: "Audits, logs & support operations",
    rows: [
      r("Activity audits", yes(), no, part("basic"), part("errors"), part("basic"), part("basic")),
      r("Gateway logs", yes(), no, no, no, no, no),
      r("Renewal-failure logs", yes(), no, no, no, no, no),
      r("Portal action-failure logs", yes(), no, no, no, no, no),
      r("Access-rule conflict logs", yes(), no, no, no, no, no),
      r("Scheduled-job logs", yes(), no, no, no, no, no),
    ],
  },
  {
    label: "Setup, support & platform",
    rows: [
      r("Guided setup wizard", yes(), no, no, no, no, no),
      r("Settings export / import", yes(), no, no, no, no, no),
      r("Modern React admin", yes(), no, no, no, no, no),
      r("Login as User support workflow", yes(), no, no, no, no, no),
      r("Member Insight profile dashboard", yes(), no, no, no, no, no),
      r("Listed on WordPress.org", yes(), no, yes(), yes(), yes(), no),
      r("Actively maintained in 2026", yes(), yes(), yes(), yes(), yes(), part("infrequent")),
      r("Subscription box module", no, no, yes(), yes(), no, no),
    ],
  },
];

const WHY_SWITCH = [
  {
    icon: <Layers className="size-6" />,
    title: "All-in-one, not a plugin pile",
    description:
      `${MODULE_COUNT} root modules and ${RECIPE_COUNT} documented setups in one ArraySubs ecosystem — no $478/yr two-plugin stacks or vendor add-ons to stitch together.`,
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
    title: "Store Credit, analytics & operations",
    description:
      "Pro adds Store Credit, Gateway Health, Feature Manager, Member Insight, and deeper analytics workflows competitors usually split across add-ons.",
  },
  {
    icon: <ScrollText className="size-6" />,
    title: "Forensic-grade audit logs",
    description:
      "Audits and Logs combines troubleshooting guides with Pro activity audits, scheduled-job logs, gateway context, and portal failure diagnosis.",
  },
  {
    icon: <PanelsTopLeft className="size-6" />,
    title: "Checkout and payments depth",
    description:
      "Checkout and Payments covers subscription checkout, manual fallback, Stripe, PayPal, Paddle, and Pro checkout customization.",
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
        subtitle={`Comparing WooCommerce subscription and membership plugins? See how ArraySubs stacks up with ${MODULE_COUNT} root modules, ${CORE_MODULE_COUNT} core-accessible modules, pricing, and migration notes.`}
        highlights={[
          "7 detailed comparisons",
          `${MODULE_COUNT} root modules`,
          "Free vs paid, side by side",
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
                retention, analytics, support operations and WordPress access.
              </p>
            </div>

            <p className="max-w-[39rem] text-lg leading-8 font-normal text-muted sm:text-xl">
              ArraySubs combines them in one ecosystem.{" "}
              <span className="text-foreground">
                The comparisons below show where it leads, where the match is
                even, and where each competitor still has the edge.
              </span>
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-16">
              <Button
                href={GET_PRO}
                size="md"
                iconRight={<ArrowRight aria-hidden="true" className="size-5" />}
              >
                Start Trial
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
              className="group flex flex-col justify-between gap-8 overflow-hidden rounded-2xl bg-dark p-8 text-on-dark sm:p-12 lg:col-span-2"
            >
              <div className="flex items-center gap-3 lg:gap-5">
                <span className="font-display text-[1.6rem] leading-none font-bold whitespace-nowrap lg:text-5xl xl:text-7xl">
                  All Features
                </span>
                <svg
                  viewBox="0 0 120 12"
                  fill="none"
                  aria-hidden="true"
                  className="h-auto w-14 mt-2 shrink-0 text-primary transition-transform duration-300 ease-out group-hover:translate-x-2 lg:w-24 xl:w-32"
                >
                  <path
                    d="M1 6H113M113 6L104.5 1.5M113 6L104.5 10.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex justify-end">
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
              caption={`How ArraySubs compares with WooCommerce Subscriptions, YITH Subscription, WP Swings, WPSubscription and SUMO on free tier, ${MODULE_COUNT} root-module coverage, retention, Store Credit, analytics, setup and operations.`}
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
    </>
  );
}
