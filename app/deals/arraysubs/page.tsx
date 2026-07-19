import type { Metadata } from "next";
import {
  ArrowRight,
  ChartColumn,
  Check,
  ClipboardList,
  ReceiptText,
  type LucideIcon,
} from "lucide-react";
import { createMetadata, faqSchema, softwareApplicationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import {
  Accordion,
  Badge,
  BigText,
  Button,
  Container,
  CTA,
  Eyebrow,
  IconCard,
  Marqueue,
  ModuleShowcase,
  PageHero,
  Section,
  SectionTitle,
  StepCard,
} from "@/components/ui";
import {
  FEATURES,
  getFeature,
  type Feature,
  type FeatureTier,
} from "./features/_data";
import { FreeVsProTable } from "./_components/FreeVsProTable";
import { ArraySubsHeroVisual } from "./_components/ArraySubsHeroVisual";
import { RetentionEnginePanel } from "./_components/RetentionEnginePanel";
import { ARRAYSUBS_PRO_PLANS } from "./pricing/_plans";

export const metadata: Metadata = {
  ...createMetadata({
    title:
      "ArraySubs – Effortless Memberships, Subscriptions, Content Restriction & Recurring Payments for WooCommerce",
    description:
      "WooCommerce subscription manager and membership plugin that gives you everything you need to sell subscriptions, manage recurring billing, restrict member-only content, and reduce churn — without paying for multiple plugins or stitching together separate tools.",
    path: "/deals/arraysubs/",
  }),
  title: {
    absolute:
      "ArraySubs – Effortless Memberships, Subscriptions, Content Restriction & Recurring Payments for WooCommerce",
  },
};

const GET_PRO = "/deals/arraysubs/pricing/";
const ALL_FEATURES = "/deals/arraysubs/features/";
const FREE_PLUGIN_URL = "https://wordpress.org/plugins/arraysubs/";

const MODULE_COUNT = FEATURES.length;
const CORE_MODULE_COUNT = FEATURES.filter(
  (feature) => feature.tier !== "Pro",
).length;
const PRO_ONLY_MODULE_COUNT = FEATURES.filter(
  (feature) => feature.tier === "Pro",
).length;

const tierTone = (tier: FeatureTier) =>
  tier === "Free" ? "highlight" : tier === "Pro" ? "dark" : "primary";

const featureBadges = (feature: Pick<Feature, "tier" | "status">) => (
  <span className="flex flex-wrap justify-end gap-1.5">
    <Badge tone={tierTone(feature.tier)}>{feature.tier}</Badge>
    {feature.status === "coming-soon" && (
      <Badge tone="outline">Coming soon</Badge>
    )}
  </span>
);

const featuresBySlugs = (slugs: readonly string[]): Feature[] =>
  slugs
    .map((slug) => getFeature(slug))
    .filter((feature): feature is Feature => Boolean(feature));

/* ---- Benefit blocks ----------------------------------------------------- */

type BenefitCustomCard = {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
};

type BenefitBlock = {
  eyebrow: string;
  title: string;
  lead: string;
  bullets: string[];
  linkLabel: string;
  /** Deep link into the matching category anchor on the features hub. */
  linkHref: string;
  /** Optional deep-dive pillar guide for this benefit area. */
  guideHref?: string;
  guideLabel?: string;
  slugs: string[];
  customCards?: BenefitCustomCard[];
  surface: "surface" | "default";
};

const BENEFIT_BLOCKS: BenefitBlock[] = [
  {
    eyebrow: "Launch & sell",
    title: "Any product can become a plan",
    lead: "Simple or variable subscriptions can launch with trials, signup fees, different renewal pricing, and fixed-period rules that match a date range or billing-cycle model.",
    bullets: [
      "Intro prices can move to a different renewal price after the chosen cycle",
      "Fixed-date subscriptions keep cohorts, seasons, and memberships on a known period",
      "Customers can choose their own subscription length, and billing period, within your limits",
      "Trials, signup fees, and checkout shortcuts stay inside the product editor",
    ],
    linkLabel: "All product features",
    linkHref: `${ALL_FEATURES}#products-checkout`,
    guideHref: `${ALL_FEATURES}subscriptions-and-recurring-products/`,
    guideLabel: "Subscription products guide",
    slugs: [
      "subscription-products",
      "different-renewal-price",
      "fixed-date-subscriptions",
      "customer-chosen-subscription-duration",
      "free-trials",
      "signup-fees",
      "lifetime-deals",
    ],
    surface: "surface",
  },
  {
    eyebrow: "Recurring billing",
    title: "Renewals that collect themselves",
    lead: "Stripe, PayPal, and Paddle run automatic off-session renewals with Pro, while the free core keeps 500+ WooCommerce gateways working through manual renewal invoices.",
    bullets: [
      "ArraySubs-managed Stripe billing with saved cards and SCA handling",
      "Failed payments hit auto-retry, a 2-phase grace period, or auto-downgrade — not churn",
      "WooCommerce-native tax on every renewal; Paddle handles VAT itself",
    ],
    linkLabel: "All payment features",
    linkHref: `${ALL_FEATURES}#payment-gateways`,
    guideHref: `${ALL_FEATURES}payment-gateways/`,
    guideLabel: "Payment gateways guide",
    slugs: [
      "stripe-payments",
      "paypal-payments",
      "paddle-payments",
      "woocommerce-manual-payments",
    ],
    surface: "default",
  },
  {
    eyebrow: "Retention",
    title: "The cancel button becomes a save flow",
    lead: "When a customer heads for the exit, the Retention Flow Builder saves the cancellation reason and can answer with conditional discounts, pause offers, downgrade paths, or support handoff.",
    bullets: [
      "Cancellation reasons are stored before the final cancel confirmation",
      "Conditional save discounts can appear only for the reasons and plans you choose",
      "Accepted and declined offers feed retention analytics for future decisions",
    ],
    linkLabel: "All retention features",
    linkHref: `${ALL_FEATURES}#retention-revenue`,
    guideHref: `${ALL_FEATURES}retention-flow-builder/`,
    guideLabel: "Retention flow guide",
    slugs: [
      "retention-and-refunds",
      "customer-portal",
      "retention-analytics",
      "pause-vacation-mode",
    ],
    customCards: [
      {
        icon: ReceiptText,
        title: "Conditional Save Discounts",
        description:
          "Show a discount only when the selected cancellation reason, plan, or churn risk deserves a price-based save offer.",
        badge: "Flow",
      },
      {
        icon: ClipboardList,
        title: "Saved Cancellation Reasons",
        description:
          "Keep every cancellation reason tied to the subscription record so retention reports explain what customers are really reacting to.",
        badge: "Insight",
      },
    ],
    surface: "surface",
  },
  {
    eyebrow: "Store toolkit",
    title: "Build the subscription experience around your store",
    lead: "Create subscriptions from wp-admin, turn refunds into store credit, shape checkout plus My Account, and control how plan changes and synced renewals handle money.",
    bullets: [
      "Issue store credit from refunds, downgrades, promotions, or direct credit purchases",
      "Sync renewals with full payment, prorated payment, or flexible next-cycle handling",
      "Use 3 proration methods for upgrades, downgrades, and crossgrades",
    ],
    linkLabel: "Browse related features",
    linkHref: ALL_FEATURES,
    guideHref: `${ALL_FEATURES}store-credit/`,
    guideLabel: "Store credit guide",
    slugs: [
      "store-credit",
      "create-subscription-admin",
      "checkout-page-builder",
      "my-account-page-builder",
      "renewal-sync",
      "proration-methods",
    ],
    surface: "default",
  },
  {
    eyebrow: "Renewal recovery",
    title: "Failed payments get a recovery path before churn",
    lead: "Renewal invoices, failed-payment recovery, grace periods, early renewal, retry automation, and fallback downgrades all share the same subscription schedule and customer communication layer.",
    bullets: [
      "Manual renewals in core, automatic collection and retry automation in Pro",
      "Two-phase grace windows protect access while customers update payment details",
      "Fallback downgrades preserve the relationship when recovery attempts are exhausted",
    ],
    linkLabel: "All renewal features",
    linkHref: `${ALL_FEATURES}#subscription-operations`,
    guideHref: `${ALL_FEATURES}billing-renewals-and-refunds/`,
    guideLabel: "Billing & renewals guide",
    slugs: [
      "billing-and-renewals",
      "grace-period-recovery",
      "auto-retry-failed-payments",
      "auto-downgrade-on-failure",
    ],
    surface: "surface",
  },
  {
    eyebrow: "Membership access",
    title: "A subscription can unlock the right member experience",
    lead: "Use subscription status, roles, purchase history, lifetime spend, and Pro feature entitlements to decide who gets access, discounts, downloads, products, and account privileges.",
    bullets: [
      "Rule-based member access for content, products, discounts, downloads, and roles",
      "Commerce-aware conditions from purchased products, variations, categories, and spend",
      "Nested AND/OR logic models real membership tiers without duplicating rules",
    ],
    linkLabel: "All membership features",
    linkHref: `${ALL_FEATURES}#member-experience`,
    guideHref: `${ALL_FEATURES}member-access-control/`,
    guideLabel: "Member access guide",
    slugs: [
      "member-access",
      "member-discounts",
      "product-purchase-value-conditions",
      "advanced-condition-builder",
    ],
    surface: "default",
  },
  {
    eyebrow: "Content restriction",
    title: "Protect lessons, downloads, paths, and page sections",
    lead: "Keep public sales pages visible while locking the valuable pieces behind membership rules — from CPT archives and URL paths to Elementor Containers, Gutenberg blocks, staged lessons, and gated files.",
    bullets: [
      "Gate pages, posts, custom post types, taxonomy terms, archives, and arbitrary URL paths",
      "Protect only selected sections with shortcodes, Elementor Containers, or Gutenberg blocks",
      "Drip lessons and restricted downloads over time as the member relationship matures",
    ],
    linkLabel: "All content restriction features",
    linkHref: `${ALL_FEATURES}#member-experience`,
    guideHref: `${ALL_FEATURES}member-access-control/`,
    guideLabel: "Content restriction guide",
    slugs: [
      "cpt-content-restrictions",
      "url-path-rules",
      "partial-content-restriction",
      "content-dripping",
      "restricted-downloads",
      "gutenberg-content-restrictions",
    ],
    surface: "surface",
  },
  {
    eyebrow: "Analytics & audit",
    title: "Know what happened before support has to ask",
    lead: "Growth reports, profit-and-loss views, audit trails, scheduled-job logs, and gateway health checks turn subscription activity into decisions operators can act on.",
    bullets: [
      "Subscription analytics tracks revenue, growth, churn, retention, and customer behavior",
      "Profit and loss reporting connects revenue, refunds, payment recovery, and gateway performance",
      "Deep reports reveal the trends behind pricing, retention, access, and operational decisions",
    ],
    linkLabel: "All analytics features",
    linkHref: `${ALL_FEATURES}#analytics-infrastructure`,
    guideHref: `${ALL_FEATURES}analytics/`,
    guideLabel: "Analytics guide",
    slugs: ["analytics", "audits-and-logs", "gateway-health"],
    customCards: [
      {
        icon: ChartColumn,
        title: "Business Growth Reports",
        description:
          "Track MRR, churn, retention saves, trial conversion, product momentum, and subscriber movement before choosing the next growth play.",
        badge: "Report",
      },
      {
        icon: ReceiptText,
        title: "Profit & Loss Reports",
        description:
          "Compare recurring revenue, refunds, failed payments, recovery, discounts, and gateway performance before margin problems hide in order history.",
        badge: "Report",
      },
      {
        icon: ClipboardList,
        title: "Decision-Ready Deep Reports",
        description:
          "Drill into products, cohorts, gateways, retention offers, scheduled jobs, and customer behavior before changing pricing or operations.",
        badge: "Deep report",
      },
    ],
    surface: "default",
  },
];

const SHOWCASED_SLUGS = new Set(BENEFIT_BLOCKS.flatMap((block) => block.slugs));
const MARQUEE_FEATURES = FEATURES.filter(
  (feature) => !SHOWCASED_SLUGS.has(feature.slug),
);
const MARQUEE_FEATURE_ROWS = [
  MARQUEE_FEATURES.filter((_, index) => index % 2 === 0),
  MARQUEE_FEATURES.filter((_, index) => index % 2 === 1),
];

/* ---- How it starts ------------------------------------------------------ */

const STEPS = [
  {
    title: "Install the free core",
    description:
      "Download ArraySubs from WordPress.org and activate it on any WooCommerce store. No license key, no card, no sales call.",
  },
  {
    title: "Answer the 9-step wizard",
    description:
      "Pick a business profile and the Easy Setup Wizard turns plain-language answers into recommended subscription settings.",
  },
  {
    title: "Publish your first plan",
    description:
      "Price it, set the billing period, add a trial or signup fee, and share a one-click checkout URL anywhere you sell.",
  },
  {
    title: "Switch on Pro when it pays",
    description:
      "Add automatic Stripe, PayPal, and Paddle renewals, failed-payment recovery, store credit, and advanced analytics.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Is the free version of ArraySubs actually usable, or just a demo?",
    answer: `${CORE_MODULE_COUNT} of the ${MODULE_COUNT} features work without paying: subscription products, free trials, signup fees, coupons, manual renewals across 500+ WooCommerce gateways, the customer portal, member access and content restriction, content dripping, retention flows, emails, and the setup wizard. Pro adds the ${PRO_ONLY_MODULE_COUNT} automation and revenue features — automatic gateway billing, failed-payment recovery, store credit, the checkout builder, and advanced analytics.`,
  },
  {
    question: "Which payment gateways renew subscriptions automatically?",
    answer:
      "Stripe, PayPal, and Paddle run automatic off-session renewals with ArraySubs Pro. On the free core, renewals create invoices that customers pay through any of the 500+ WooCommerce-compatible gateways, including offline methods like bank transfer.",
  },
  {
    question: "Can I restrict content by subscription plan?",
    answer:
      "Yes. Member Access gates pages, posts, any custom post type, URL paths, partial content, Elementor Containers, and Gutenberg blocks by plan, role, purchase, spend, or Pro feature conditions — with scheduled content dripping and restricted downloads on top.",
  },
  {
    question: "What happens when a renewal payment fails?",
    answer:
      "The subscription enters a 2-phase grace period instead of dying instantly. Pro can auto-retry the charge on a schedule, and if it still fails, auto-downgrade the customer to a fallback plan instead of losing the relationship outright.",
  },
  {
    question: "Can customers manage their own subscriptions?",
    answer:
      "Yes. The customer portal lets subscribers pause, skip a renewal, switch plans with proration, update payment details, and cancel on their own — and every cancel attempt can route through your retention flow before it completes.",
  },
  {
    question: "Can I reduce churn and keep refunds inside the store?",
    answer:
      "Yes. The Retention Flow Builder answers cancellations with targeted discount, pause, or downgrade offers, and Pro Store Credit turns refunds into a spendable wallet balance instead of cash leaving the store.",
  },
  {
    question: "Does ArraySubs work with my WooCommerce setup and HPOS?",
    answer:
      "Yes. ArraySubs is built on native WooCommerce products, checkout, coupons, and tax, and declares full HPOS (high-performance order storage) compatibility. Paddle is the one tax exception, handling VAT natively as merchant of record.",
  },
  {
    question: "How is ArraySubs Pro licensed?",
    answer: `Three sizes — ${ARRAYSUBS_PRO_PLANS.map(
      (plan) => `${plan.name} (${plan.siteLabel})`,
    ).join(
      ", ",
    )} — each with the identical Pro feature set, available as annual or lifetime licenses, all covered by the 30-day money-back guarantee. Full pricing lives on the Pro pricing page.`,
  },
  {
    question: "Do I need a credit card for the 10-day Pro trial?",
    answer:
      "No. The 10-day Pro trial starts without a credit card, and the free core stays free forever either way.",
  },
];

export default function ArraySubsPage() {
  return (
    <>
      {/* ---- Hero ------------------------------------------------------- */}
      <PageHero
        layout="showcase"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "ArraySubs", href: "/deals/arraysubs/" },
        ]}
        title={
          <>
            <span className="block">
              Sell subscriptions.
            </span>
            <span className="block text-dark">
              Keep the relationship.
            </span>
          </>
        }
        subtitle="ArraySubs unites recurring billing, memberships, protected content, customer self-service, and retention in one WooCommerce workflow."
        highlights={[
          "Launch recurring products",
          "Protect member experiences",
          "Recover customers before they leave",
        ]}
        actions={
          <>
            <Button
              href={GET_PRO}
              size="lg"
              magnetic
              iconRight={<ArrowRight className="size-5" />}
            >
              Get ArraySubs Pro
            </Button>
            <Button
              href={ALL_FEATURES}
              variant="outline"
              size="lg"
              magnetic
              className="max-sm:hidden"
            >
              Explore Features
            </Button>
          </>
        }
        trust="WooCommerce-native · Customer self-service · Money-back guarantee"
        visual={<ArraySubsHeroVisual />}
      />

      {/* ---- Problem → positioning --------------------------------------- */}
      <Section surface="dark" spacing="lg">
        <Container>
          <Eyebrow className="text-on-dark-muted">The old way is a plugin pile</Eyebrow>
          <div className="mt-5">
            <BigText size="display-lg" variant="highlight">
              Billing, access, retention — one plugin.
            </BigText>
          </div>
          <p className="mt-10 ml-auto max-w-2xl text-lg leading-8 text-on-dark-muted text-pretty sm:text-xl">
            Billing in one plugin. Member access in another. A third for
            cancellation offers, a fourth for store credit, a fifth for
            analytics — each with its own license, updates, and conflicts.
            ArraySubs ships the whole stack as one system on one subscription
            record.
          </p>
        </Container>
      </Section>

      {/* ---- Retention save studio --------------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <RetentionEnginePanel />
        </Container>
      </Section>

      {/* ---- Breadth statement ------------------------------------------- */}
      <ModuleShowcase
        moduleCount={MODULE_COUNT}
        compact
        artworkSrc="/shapes/feature-count.webp"
        artworkAlt={`${MODULE_COUNT}+ ArraySubs features`}
        primaryHref={GET_PRO}
        primaryLabel="View Pro Pricing"
        secondaryHref=""
        secondaryLabel=""
      />

      {/* ---- Benefit blocks — cards straight from the feature hub -------- */}
      {BENEFIT_BLOCKS.map((block) => (
        <Section key={block.title} surface={block.surface} spacing="md">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
              <div>
                <SectionTitle
                  eyebrow={block.eyebrow}
                  title={block.title}
                  subtitle={block.lead}
                />
                <ul className="mt-8 flex flex-col gap-3">
                  {block.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-base text-muted"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-primary"
                      />
                      <span className="text-pretty">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button
                    href={block.linkHref}
                    variant="outline"
                    size="sm"
                    magnetic
                    iconRight={<ArrowRight className="size-4" />}
                  >
                    {block.linkLabel}
                  </Button>
                  {block.guideHref && block.guideLabel && (
                    <Button
                      href={block.guideHref}
                      variant="ghost"
                      size="sm"
                      iconRight={<ArrowRight className="size-4" />}
                    >
                      {block.guideLabel}
                    </Button>
                  )}
                </div>
              </div>
              <ScrollReveal
                stagger={0.04}
                y={0}
                className="grid gap-[0.1875rem] sm:grid-cols-2"
              >
                {featuresBySlugs(block.slugs).map((feature) => (
                  <IconCard
                    key={feature.slug}
                    icon={<feature.icon className="size-6" />}
                    title={feature.name}
                    description={feature.cardDescription}
                    badge={featureBadges(feature)}
                  />
                ))}
                {block.customCards?.map((card) => (
                  <IconCard
                    key={card.title}
                    icon={<card.icon className="size-6" />}
                    title={card.title}
                    description={card.description}
                    badge={<Badge tone="primary">{card.badge ?? "Report"}</Badge>}
                  />
                ))}
              </ScrollReveal>
            </div>
          </Container>
        </Section>
      ))}

      {/* ---- Everything else, drifting past --------------------------------- */}
      <Section surface="dark" spacing="md">
        <Container>
          <div className="flex max-w-3xl flex-col gap-4">
            <Eyebrow className="text-on-dark-muted">Still counting</Eyebrow>
            <h2 className="-ml-[3px] font-display text-4xl text-on-dark text-balance sm:text-display-sm">
              And {MARQUEE_FEATURES.length} more, already in the box
            </h2>
            <p className="max-w-2xl text-lg text-on-dark-muted text-pretty sm:text-xl">
              Everything below ships in the same plugin — no add-on store, no
              per-feature pricing, one shared subscription record.
            </p>
          </div>
        </Container>
        <Container className="mt-12">
          <div className="flex flex-col gap-[0.1875rem]">
            {MARQUEE_FEATURE_ROWS.map((row, rowIndex) => (
              <Marqueue
                key={`feature-row-${rowIndex}`}
                label={`More ArraySubs features row ${rowIndex + 1}`}
              >
                {row.map((feature) => (
                  <div
                    key={feature.slug}
                    className="flex h-full flex-col gap-4 rounded-xl bg-card p-6 text-foreground"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        aria-hidden="true"
                        className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-surface text-dark"
                      >
                        <feature.icon className="size-5" />
                      </span>
                      {featureBadges(feature)}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-display text-lg leading-tight">
                        {feature.name}
                      </h3>
                      <p className="text-sm text-muted text-pretty">
                        {feature.cardDescription}
                      </p>
                    </div>
                  </div>
                ))}
              </Marqueue>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button
              href={ALL_FEATURES}
              variant="highlight"
              size="md"
              magnetic
              iconRight={<ArrowRight className="size-5" />}
            >
              Browse all {MODULE_COUNT} features
            </Button>
          </div>
        </Container>
      </Section>

      {/* ---- Free vs Pro — the honest split ------------------------------ */}
      <Section id="free-vs-pro" surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Free vs Pro"
            title="Start on free. Upgrade for autopilot."
            subtitle={`The honest split: ${CORE_MODULE_COUNT} of ${MODULE_COUNT} features work without paying a cent. The ${PRO_ONLY_MODULE_COUNT} Pro-only upgrades are listed first; a tick in the Free column ships in the free core.`}
            align="center"
          />
          <div className="mt-12">
            <FreeVsProTable />
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href={FREE_PLUGIN_URL} variant="outline" size="lg" magnetic>
              Get the free plugin
            </Button>
            <Button
              href={GET_PRO}
              size="lg"
              magnetic
              iconRight={<ArrowRight className="size-5" />}
            >
              View Pro Pricing
            </Button>
          </div>
          <p className="mt-4 text-center text-sm text-muted">
            Free forever on WordPress.org · Annual &amp; lifetime Pro licenses
          </p>
        </Container>
      </Section>

      {/* ---- How it starts ------------------------------------------------ */}
      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="How it starts"
            title="Live before your coffee cools"
            subtitle="Four steps from empty store to recurring revenue — three of them on the free core."
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <StepCard
                key={step.title}
                number={index + 1}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Risk reversal ------------------------------------------------ */}
      <Section surface="highlight" spacing="md">
        <Container>
          <div className="grid items-stretch gap-[0.1875rem] lg:grid-cols-2">
            <article className="flex h-full flex-col rounded-2xl bg-card p-6 text-foreground sm:p-8">
              <img
                src="/shapes/10-day-trial.webp"
                alt="10-day Pro trial, no credit card required"
                width={1574}
                height={586}
                className="mx-auto w-full max-w-[30rem]"
              />
              <div className="mt-auto flex flex-col items-center gap-4 pt-8 text-center">
                <p className="max-w-md text-muted text-pretty">
                  Take the full Pro feature set for a 10-day spin before any
                  money moves. No credit card at the door.
                </p>
                <Button
                  href={GET_PRO}
                  size="lg"
                  magnetic
                  iconRight={<ArrowRight className="size-5" />}
                >
                  Start the free trial
                </Button>
              </div>
            </article>

            <article className="grid h-full items-center gap-8 rounded-2xl bg-card p-6 text-center text-foreground sm:p-8 md:grid-cols-[10rem_1fr] md:text-left">
              <img
                src="/shapes/30-days-refund.webp"
                alt="30-day money-back guarantee"
                width={500}
                height={500}
                className="mx-auto w-full max-w-40 md:mx-0"
              />
              <div>
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                  30-day guarantee
                </p>
                <h2 className="mt-3 font-display text-3xl text-balance sm:text-4xl">
                  Bought it and changed your mind? Fine.
                </h2>
                <p className="mt-4 text-muted text-pretty">
                  If Pro doesn&rsquo;t earn its keep in your store, request a
                  refund within 30 days of purchase. No drawn-out review, no
                  exit interview.
                </p>
              </div>
            </article>
          </div>
        </Container>
      </Section>

      {/* ---- FAQ ----------------------------------------------------------- */}
      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="FAQ"
            title="Questions stores ask before switching"
            align="center"
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion items={FAQ_ITEMS} defaultOpen={[0]} />
          </div>
        </Container>
        <JsonLd data={faqSchema(FAQ_ITEMS)} />
      </Section>

      {/* ---- Final CTA ------------------------------------------------------ */}
      <Section surface="primary" spacing="md">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="Get ArraySubs"
            title="Make your next order the first of many"
            subtitle="Install the free core today, publish a plan this afternoon, and switch on Pro automation once the renewals justify it."
            microcopy="Free core forever · Annual & lifetime licenses · 30-day money-back guarantee"
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
                  View Pro Pricing
                </Button>
                <Button
                  href={ALL_FEATURES}
                  variant="outline"
                  size="lg"
                  layers="2layer"
                  magnetic
                  iconRight={<Check className="size-5" />}
                >
                  Explore all {MODULE_COUNT} features
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
