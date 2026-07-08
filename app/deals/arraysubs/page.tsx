import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
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
import { MembershipLockSection } from "./_components/MembershipLockSection";
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

const featuresBySlugs = (slugs: readonly string[]): Feature[] =>
  slugs
    .map((slug) => getFeature(slug))
    .filter((feature): feature is Feature => Boolean(feature));

/* ---- Benefit blocks (cards come straight from the feature hub data) ----- */

type BenefitBlock = {
  eyebrow: string;
  title: string;
  lead: string;
  bullets: string[];
  linkLabel: string;
  /** Deep link into the matching category anchor on the features hub. */
  linkHref: string;
  slugs: string[];
  surface: "surface" | "default";
};

const BENEFIT_BLOCKS: BenefitBlock[] = [
  {
    eyebrow: "Launch & sell",
    title: "Any product can become a plan",
    lead: "Simple or variable subscriptions with trials, signup fees, intro-to-renewal pricing, and lifetime deals — configured inside the WooCommerce product editor you already know.",
    bullets: [
      "Trials, signup fees, and a different renewal price after checkout",
      "Lifetime deals and Pro fixed-date memberships for cohorts and seasons",
      "One-click checkout URLs that send buyers straight past the cart",
    ],
    linkLabel: "All product features",
    linkHref: `${ALL_FEATURES}#products-checkout`,
    slugs: ["subscription-products", "free-trials", "signup-fees", "lifetime-deals"],
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
    lead: "When a customer heads for the exit, the Retention Flow Builder captures the reason and answers with the right counter-offer — while portal self-service quietly prevents the ticket in the first place.",
    bullets: [
      "Cancellation reasons routed into targeted save offers",
      "Pause, vacation mode, and skip-next-renewal instead of hard cancels",
      "Plan switching with 3 proration methods, tracked by retention analytics",
    ],
    linkLabel: "All retention features",
    linkHref: `${ALL_FEATURES}#retention-revenue`,
    slugs: [
      "retention-and-refunds",
      "customer-portal",
      "plan-switching",
      "pause-vacation-mode",
    ],
    surface: "surface",
  },
];

const SHOWCASED_SLUGS = new Set(BENEFIT_BLOCKS.flatMap((block) => block.slugs));
// Membership features get their own dedicated MembershipLockSection, so keep the
// whole member-experience category out of the "everything else" marquee.
const MARQUEE_FEATURES = FEATURES.filter(
  (feature) =>
    !SHOWCASED_SLUGS.has(feature.slug) &&
    feature.category !== "member-experience",
);

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
    question: "Is the free version actually usable, or just a demo?",
    answer: `${CORE_MODULE_COUNT} of the ${MODULE_COUNT} features work without paying: subscription products, trials, signup fees, coupons, manual renewals across 500+ WooCommerce gateways, the customer portal, member access and content restriction, retention flows, emails, and the setup wizard. Pro adds the ${PRO_ONLY_MODULE_COUNT} automation and revenue features like automatic gateway billing, payment recovery, store credit, and the checkout builder.`,
  },
  {
    question: "Which payment gateways renew automatically?",
    answer:
      "Stripe, PayPal, and Paddle run automatic off-session renewals with ArraySubs Pro. On the free core, renewals create invoices that customers pay through any of the 500+ WooCommerce-compatible gateways, including offline methods like bank transfer.",
  },
  {
    question: "Can I restrict content by subscription plan?",
    answer:
      "Yes. Pages, posts, any custom post type, URL paths, partial content, Elementor containers, and Gutenberg blocks can all be gated by plan, role, purchase, or feature conditions — with scheduled content dripping and restricted downloads on top.",
  },
  {
    question: "What happens when a renewal payment fails?",
    answer:
      "The subscription enters a 2-phase grace period instead of dying instantly. Pro can auto-retry the charge on a schedule, and if it still fails, auto-downgrade the customer to a fallback plan instead of losing the relationship outright.",
  },
  {
    question: "Can customers manage their own subscriptions?",
    answer:
      "The customer portal lets subscribers pause, skip a renewal, switch plans with proration, and cancel on their own — and every cancel attempt can route through your retention flow before it completes.",
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
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "ArraySubs", href: "/deals/arraysubs/" },
        ]}
        title={
          <>
            {/* Sized down below `sm` so "subscriptions." never breaks mid-word. */}
            <span className="block max-sm:text-[2.875rem]">
              Sell subscriptions.
            </span>
            <span className="block max-sm:text-[2.875rem]">
              Keep subscribers.
            </span>
          </>
        }
        subtitle="ArraySubs turns WooCommerce into a complete subscription business — recurring billing, memberships, gated content, retention offers, and analytics in one plugin, with a free core generous enough to launch on."
        highlights={[
          `${MODULE_COUNT} features in one plugin`,
          `${CORE_MODULE_COUNT} available free`,
          "Replaces 6+ single-purpose plugins",
        ]}
        actions={
          <>
            <Button
              href={GET_PRO}
              size="lg"
              magnetic
              iconRight={<ArrowRight className="size-5" />}
            >
              View Pro Pricing
            </Button>
            <Button href="#free-vs-pro" variant="outline" size="lg" magnetic>
              See what&rsquo;s free
            </Button>
          </>
        }
        trust="Free core on WordPress.org · 10-day Pro trial — no credit card · 30-day money-back guarantee"
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

      {/* ---- Live retention engine proof (JSX mockup, no screenshots) ---- */}
      <Section surface="surface" spacing="md">
        <Container>
          <RetentionEnginePanel />
        </Container>
      </Section>

      {/* ---- Breadth statement ------------------------------------------- */}
      <ModuleShowcase
        moduleCount={MODULE_COUNT}
        compact
        artworkSrc="/shapes/feature-count.png"
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
                <div className="mt-8">
                  <Button
                    href={block.linkHref}
                    variant="outline"
                    size="sm"
                    magnetic
                    iconRight={<ArrowRight className="size-4" />}
                  >
                    {block.linkLabel}
                  </Button>
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
                    badge={
                      <Badge tone={tierTone(feature.tier)}>{feature.tier}</Badge>
                    }
                  />
                ))}
              </ScrollReveal>
            </div>
          </Container>
        </Section>
      ))}

      {/* ---- Membership spotlight (dedicated creative section) ----------- */}
      <MembershipLockSection />

      {/* ---- Everything else, drifting past --------------------------------- */}
      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Still counting"
            title={`And ${MARQUEE_FEATURES.length} more, already in the box`}
            subtitle="Everything below ships in the same plugin — no add-on store, no per-feature pricing, one shared subscription record."
          />
        </Container>
        <Container className="mt-12">
          <Marqueue label="More ArraySubs features">
            {MARQUEE_FEATURES.map((feature) => (
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
                  <Badge tone={tierTone(feature.tier)}>{feature.tier}</Badge>
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
          <div className="mt-10 flex justify-center">
            <Button
              href={ALL_FEATURES}
              variant="dark"
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
            subtitle={`The honest split: ${CORE_MODULE_COUNT} of ${MODULE_COUNT} features are usable without paying a cent. Pro adds the ${PRO_ONLY_MODULE_COUNT} automation and revenue features listed first.`}
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
                src="/shapes/10-day-trial.png"
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

            <article className="grid h-full items-center gap-8 rounded-2xl bg-card p-6 text-foreground sm:p-8 md:grid-cols-[10rem_1fr]">
              <img
                src="/shapes/30-days-refund-removebg.png"
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
