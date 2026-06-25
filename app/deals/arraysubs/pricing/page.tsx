import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  ClipboardList,
  CreditCard,
  LayoutGrid,
  ListChecks,
  Lock,
  Wallet,
} from "lucide-react";
import { createMetadata, faqSchema, softwareApplicationSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollFillCard } from "@/components/animation/ScrollFillCard";
import { FEATURES } from "../features/_data";
import {
  Accordion,
  Badge,
  Button,
  ComparisonTable,
  Container,
  CTA,
  IconCard,
  LeadForm,
  PageHero,
  Section,
  SectionTitle,
  type ComparisonCell,
  type ComparisonColumn,
  type ComparisonGroup,
  type ComparisonRow,
} from "@/components/ui";

export const metadata: Metadata = {
  // `createMetadata` sets canonical + OG/Twitter (OG title resolves from the
  // string title below). The absolute override defeats the root layout's
  // "%s — ArraySubs" template so the document <title> is exactly as specified.
  ...createMetadata({
    title: "Pricing Plans for ArraySubs",
    description:
      "Compare ArraySubs Free vs Pro for WooCommerce subscriptions & memberships, then claim ArraySubs Pro free for 4 months — no credit card, no commitment.",
    path: "/deals/arraysubs/pricing/",
  }),
  title: { absolute: "Pricing Plans for ArraySubs" },
};

/* ===========================================================================
   CONTENT — all copy lives here so the page reads as one editable document.
   ArraySubs only (multi-product site): do not mix in other products' copy.
   ========================================================================= */

const OFFER_UNLOCKS = [
  "Store Credit wallet and refund-to-credit",
  "Feature Manager product entitlements",
  "Member Insight customer profile dashboard",
  "Gateway Health and webhook monitoring",
  "Multi-Login Prevention session limits",
  "Redirect Product Page controls",
  "Subscription Shipping rules",
];

const PRO_FEATURES: { icon: ReactNode; title: string; description: string }[] =
  [
    {
      icon: <Wallet className="size-6" />,
      title: "Store Credit",
      description:
        "A virtual wallet for balances, purchases, transaction history, expirations, dedicated emails, and refund-to-credit workflows.",
    },
    {
      icon: <LayoutGrid className="size-6" />,
      title: "Redirect Product Page",
      description:
        "Send direct subscription product URLs to a sales page or return a 404 while checkout links and backend management keep working.",
    },
    {
      icon: <CreditCard className="size-6" />,
      title: "Subscription Shipping",
      description:
        "Choose one-time shipping at checkout or recurring shipping charges on each renewal for physical subscription products.",
    },
    {
      icon: <ClipboardList className="size-6" />,
      title: "Member Insight",
      description:
        "Look up any customer, view their complete subscription and commerce profile, and jump to related support actions.",
    },
    {
      icon: <ListChecks className="size-6" />,
      title: "Feature Manager",
      description:
        "Define product entitlements, limits, and capabilities so customers know exactly what each subscription includes.",
    },
    {
      icon: <BarChart3 className="size-6" />,
      title: "Gateway Health",
      description:
        "Monitor gateway connections, subscription counts, webhook URLs, capabilities, and webhook event logs from one admin screen.",
    },
    {
      icon: <Lock className="size-6" />,
      title: "Multi-Login Prevention",
      description:
        "Limit concurrent sessions per account with global limits, plan overrides, and Login as User exclusions.",
    },
  ];

const MODULE_COUNT = FEATURES.length;
const CORE_MODULE_COUNT = FEATURES.filter((feature) => feature.tier !== "Pro").length;
const PRO_ONLY_MODULE_COUNT = FEATURES.filter((feature) => feature.tier === "Pro").length;

const STATS = [
  { value: String(MODULE_COUNT), label: "Root modules" },
  { value: String(CORE_MODULE_COUNT), label: "Core-accessible" },
  { value: String(PRO_ONLY_MODULE_COUNT), label: "Pro-only modules" },
  { value: "6+", label: "Plugins replaced" },
];

/* ---- Free vs Pro comparison (data only; structure lives in ComparisonTable) */

const yes: ComparisonCell = { kind: "check" };
const no: ComparisonCell = { kind: "no" };
const txt = (value: string): ComparisonCell => ({ kind: "text", value });
const row = (
  feature: string,
  free: ComparisonCell,
  pro: ComparisonCell,
): ComparisonRow => ({ feature, cells: { free, pro } });

const COMPARISON_COLUMNS: ComparisonColumn[] = [
  { key: "free", name: "ArraySubs Free", offer: "$0 — free forever" },
  { key: "pro", name: "ArraySubs Pro", offer: "Free for 4 months", featured: true },
];

const COMPARISON_GROUPS: ComparisonGroup[] = [
  {
    label: "Subscriptions & billing",
    rows: [
      row("Subscription products (simple & variable)", yes, yes),
      row("Flexible billing cycles (daily–yearly)", yes, yes),
      row("Free trials & sign-up fees", yes, yes),
      row("Different renewal price", yes, yes),
      row("Plan switching (upgrade, downgrade, crossgrade)", yes, yes),
      row("3 proration methods", yes, yes),
      row("Skip next renewal", yes, yes),
      row("Pause / vacation mode", yes, yes),
      row("2-phase grace period & recovery", yes, yes),
      row("Coupon integration", yes, yes),
      row("Fixed-period membership product", no, yes),
    ],
  },
  {
    label: "Memberships & access",
    rows: [
      row("Content restriction (10 conditions, AND/OR)", yes, yes),
      row("Content dripping", yes, yes),
      row("Role mapping", yes, yes),
      row("URL restriction (4 patterns)", yes, yes),
      row("Member discounts", yes, yes),
      row("Customer self-service portal", yes, yes),
      row("Profile builder & shortcodes", yes, yes),
      row("Elementor section gating (no code)", yes, yes),
    ],
  },
  {
    label: "Retention & revenue",
    rows: [
      row("Retention Flow builder", yes, yes),
      row("Email notifications (20+ triggers)", yes, yes),
      row("Store credit system", no, yes),
    ],
  },
  {
    label: "Operations & insights",
    rows: [
      row("Manage subscriptions dashboard", yes, yes),
      row("Easy setup wizard (9 steps)", yes, yes),
      row("Advanced analytics (MRR, churn, ARPU)", txt("Retention only"), yes),
      row("Checkout builder (27 field types)", no, yes),
      row("Audit logs & activity timeline", no, yes),
      row("Gateway Health root module", no, yes),
      row("Feature manager (per-plan entitlements)", no, yes),
      row("Member Insight customer profile", no, yes),
    ],
  },
  {
    label: "Site access toolkit",
    rows: [
      row("Admin bar visibility", yes, yes),
      row("Admin dashboard access restriction", yes, yes),
      row("WordPress login page redirect", yes, yes),
      row("Login as User support impersonation", yes, yes),
      row("Multi-Login Prevention root module", no, yes),
    ],
  },
  {
    label: "Payments & platform",
    rows: [
      row("Automatic payments (Stripe, PayPal, Paddle)", txt("Manual only"), yes),
      row("Paddle — merchant of record", no, yes),
      row("Auto-retry failed payments", no, yes),
      row("Auto-downgrade on failure", no, yes),
      row("HPOS compatible", yes, yes),
      row("Plugins required", txt("1"), txt("1 + add-on")),
    ],
  },
];

/* ---- Pricing FAQ (distinct from the homepage FAQ; plain strings for JSON-LD) */

const FAQ_ITEMS = [
  {
    question: "Is ArraySubs really free?",
    answer:
      "Yes. The ArraySubs core plugin is free forever on WordPress.org — not a trial. You get subscription products, member access control, recurring billing with a 2-phase grace period, a customer self-service portal, plan switching, the Retention Flow builder, email notifications, and a 9-step setup wizard at no cost.",
  },
  {
    question: "What do I get with “Pro free for 4 months”?",
    answer:
      "A full ArraySubs Pro license — the seven Pro-only root modules, plus Pro workflows inside checkout, automatic payments, analytics, audits, customer portal, refunds, emails, and shared modules — free for 4 months. No credit card, no commitment. We email your license key and download links right after you sign up.",
  },
  {
    question: "What happens after the 4 free months?",
    answer:
      "Nothing is charged automatically. You keep every free-forever feature. If you want to keep Pro you can choose to continue when paid pricing goes live — otherwise your store keeps running on the free core with no interruption.",
  },
  {
    question: "Do I need both the free plugin and Pro?",
    answer:
      "Pro extends the free core — it isn’t a separate plugin you migrate to. You install ArraySubs (free), then add the Pro add-on on top. You never lose free features by upgrading.",
  },
  {
    question: "Which payment gateways are supported?",
    answer:
      "The free version supports manual renewals with any WooCommerce payment gateway. Pro adds automatic recurring payments with Stripe (SCA/3DS), PayPal (billing agreements), and Paddle (merchant of record).",
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Yes — ArraySubs Pro is backed by a 60-day, no-questions-asked refund guarantee. During early launch there is nothing to refund, since Pro is free for 4 months.",
  },
];

/* ===========================================================================
   PAGE
   ========================================================================= */

export default function ArraySubsPricingPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "ArraySubs", href: "/deals/arraysubs/" },
          { name: "Pricing", href: "/deals/arraysubs/pricing/" },
        ]}
        title="Get ArraySubs Pro — free for 4 months."
        subtitle="ArraySubs is the all-in-one WooCommerce subscriptions and memberships plugin. The core is free forever — and right now you can unlock every Pro feature, free for 4 months. No credit card, no commitment."
        highlights={[
          "Free-forever core plugin",
          "Early launch offer · limited time",
          "Pro free for 4 months",
          "No credit card required",
        ]}
        actions={
          <Button
            href="#get-pro"
            size="lg"
            magnetic
            iconRight={<ArrowRight className="size-5" />}
          >
            Get Pro — Free
          </Button>
        }
      />

      {/* ---- Offer + lead capture (the loudest moment) ------------------- */}
      <Section id="get-pro" surface="highlight" spacing="md">
        <Container>
          <div className="grid items-stretch gap-[0.1875rem] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            {/* Offer pitch */}
            <div className="flex h-full flex-col rounded-2xl bg-card p-6 text-foreground sm:p-10">
              <Badge tone="primary">Early launch offer</Badge>
              <h2 className="mt-5 font-display text-3xl text-balance sm:text-4xl">
                Unlock every Pro feature —{" "}
                <span className="marker-highlight">free for 4 months</span>
              </h2>
              <p className="mt-4 text-lg text-muted text-pretty">
                Submit your details and we’ll email your ArraySubs Pro license
                and download links straight away. No pricing table, no credit
                card, cancel anytime.
              </p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {OFFER_UNLOCKS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm font-medium text-foreground"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-primary"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-7 text-sm text-faint">
                Limited time · 4-month Pro license · No credit card required
              </p>
            </div>

            {/* Lead form (reused component, pricing context) */}
            <div className="h-full rounded-2xl bg-card p-6 text-foreground sm:p-10">
              <h3 className="font-display text-xl sm:text-2xl">
                Claim your free Pro license
              </h3>
              <p className="mt-2 text-muted">
                Free for 4 months — we’ll send your key by email.
              </p>
              <LeadForm className="mt-7" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Feature comparison ------------------------------------------ */}
      <Section id="compare" surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Free vs Pro"
            title="Everything in Free — and everything you unlock in Pro"
            subtitle="Every free feature stays free forever. Here’s exactly what the Pro add-on adds on top."
            align="center"
          />
          <div className="mt-12">
            <ComparisonTable
              caption="Feature comparison of ArraySubs Free versus ArraySubs Pro, grouped by subscriptions and billing, memberships and access, retention and revenue, operations and insights, and payments and platform."
              columns={COMPARISON_COLUMNS}
              groups={COMPARISON_GROUPS}
            />
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            Pro is free for 4 months during early launch — no credit card
            required.
          </p>
        </Container>
      </Section>

      {/* ---- What's included in Pro -------------------------------------- */}
      <Section id="pro-features" surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="What’s in Pro"
            title="Seven Pro-only root modules you unlock"
            subtitle="The free core already runs your store. Pro adds the dedicated modules the current manual marks as Pro-only."
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
            {PRO_FEATURES.map((feature) => (
              <IconCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                badge={<Badge tone="primary">Pro</Badge>}
              />
            ))}

            {/* "All features" CTA — fills the empty cells (spans 2 cols on lg). */}
            <ScrollFillCard
              href="/deals/arraysubs/features/"
              aria-label="Explore all ArraySubs features"
              className="group flex h-full flex-col justify-between gap-10 overflow-hidden rounded-xl bg-dark p-8 text-on-dark focus-visible:outline-highlight sm:p-10 lg:col-span-2"
            >
              <span className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <span className="font-display text-4xl leading-[1.05] font-semibold text-balance sm:text-5xl lg:text-6xl">
                  All Features
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex items-center text-on-dark"
                >
                  <span className="h-[0.1875rem] w-16 rounded-full bg-on-dark transition-all duration-300 ease-out group-hover:w-24 sm:w-24 sm:group-hover:w-36" />
                  <ArrowRight className="-ml-2 size-10" strokeWidth={2.25} />
                </span>
              </span>
              <span className="self-end text-sm font-semibold tracking-wide text-on-dark-muted uppercase transition-colors duration-300 group-hover:text-on-dark">
                Check Now
              </span>
            </ScrollFillCard>
          </div>
        </Container>
      </Section>

      {/* ---- Social proof / stats ---------------------------------------- */}
      <Section id="proof" surface="dark" spacing="md">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold tracking-[0.18em] text-on-dark-muted uppercase">
              Why store owners switch
            </span>
            <h2 className="mt-4 font-display text-4xl text-balance sm:text-display-sm">
              One plugin replaces your entire subscription stack
            </h2>
            <p className="mt-4 text-lg text-on-dark-muted text-pretty">
              Subscriptions, memberships, billing, retention, store credit, and
              analytics share one data layer — so there’s nothing to duct-tape
              together.
            </p>
          </div>

          <ul className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <li
                key={stat.label}
                className="rounded-2xl border border-on-dark-border bg-dark-2 p-6 text-center"
              >
                <span className="block font-display text-4xl font-semibold text-on-dark sm:text-display-sm">
                  {stat.value}
                </span>
                <span className="mt-2 block text-sm text-on-dark-muted">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center text-sm text-on-dark-muted text-pretty">
            Available on WordPress.org · Works with WooCommerce 8+ · Stripe ·
            PayPal · Paddle · HPOS compatible
          </p>
          <p className="mt-4 text-center text-sm">
            <a
              href={site.sameAs[0]}
              className="font-semibold text-on-dark underline decoration-on-dark-border decoration-2 underline-offset-4 hover:decoration-on-dark"
            >
              View ArraySubs on WordPress.org →
            </a>
          </p>
        </Container>
      </Section>

      {/* ---- Pricing FAQ ------------------------------------------------- */}
      <Section id="faq" surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Pricing FAQ"
            title="Questions about plans & pricing"
            subtitle="The early-launch offer, the free tier, gateways, and the guarantee — answered."
            align="center"
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion items={FAQ_ITEMS} defaultOpen={[0]} />
            <p className="mt-8 text-center text-sm text-muted">
              Looking for the fine print? Read the{" "}
              <Link
                href="/trust-center/refund-policy/"
                className="font-semibold text-primary underline decoration-2 underline-offset-4 hover:text-primary-strong"
              >
                refund policy
              </Link>
              .
            </p>
          </div>
        </Container>
        <JsonLd data={faqSchema(FAQ_ITEMS)} />
      </Section>

      {/* ---- Final CTA --------------------------------------------------- */}
      <Section surface="primary" spacing="md">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="Early launch offer"
            title="Get ArraySubs Pro — free for 4 months"
            subtitle="Start on the free-forever core today, and unlock every Pro feature free while early launch is open."
            microcopy="Limited time · no credit card required"
            actions={
              <Button
                href="#get-pro"
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
