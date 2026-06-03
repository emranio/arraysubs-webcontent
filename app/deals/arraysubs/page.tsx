import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  Check,
  Gift,
  HeartHandshake,
  Layers,
  LayoutGrid,
  Lock,
  Repeat,
  Rocket,
  RotateCcw,
  ShieldCheck,
  Shuffle,
  Sparkles,
  TrendingUp,
  UserCheck,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { createMetadata, faqSchema, softwareApplicationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import {
  Accordion,
  Badge,
  BigText,
  Button,
  ComparisonTable,
  Container,
  CTA,
  Eyebrow,
  IconCard,
  Manifesto,
  Marqueue,
  ModuleShowcase,
  Section,
  SectionTitle,
  StepCard,
  type ComparisonCell,
  type ComparisonColumn,
  type ComparisonGroup,
  type ManifestoLine,
} from "@/components/ui";
import {
  FEATURE_CATEGORIES,
  featuresByCategory,
  type FeatureTier,
} from "@/app/deals/arraysubs/features/_data";
import { USE_CASES } from "@/app/deals/arraysubs/use-cases/_data";

export const metadata: Metadata = {
  ...createMetadata({
    title: "ArraySubs — Free WooCommerce Subscription & Membership Plugin",
    description:
      "Free WooCommerce subscription & membership plugin with automated billing, retention flows, store credit, checkout builder & analytics. One plugin replaces your entire subscription stack.",
    path: "/deals/arraysubs/",
  }),
  title: {
    absolute: "ArraySubs — Free WooCommerce Subscription & Membership Plugin",
  },
};

/* ---- Routes (match the shipped deal pages) -------------------------------- */
const GET_PRO = "/deals/arraysubs/pricing/#get-pro";
const FEATURES_URL = "/deals/arraysubs/features/";
const USE_CASES_URL = "/deals/arraysubs/use-cases/";
const COMPARE_URL = "/deals/arraysubs/alternatives/";
const COMPARE_WOO = "/deals/arraysubs/alternatives/woocommerce-subscriptions/";

const tierTone = (tier: FeatureTier) =>
  tier === "Free" ? "highlight" : tier === "Pro" ? "dark" : "primary";

/**
 * Landing-only one-liners. Deliberately reworded from the feature/use-case
 * pages so the homepage never republishes their copy (avoids SEO cannibalism)
 * and stays benefit-led for conversion.
 */
const FEATURE_BLURB: Record<string, string> = {
  "subscriptions-and-recurring-products":
    "Turn any product into recurring revenue in a few clicks — simple or variable, trials and sign-up fees included.",
  "member-access-control":
    "Lock premium content, products and URLs to the right plans — no second membership plugin to buy.",
  "billing-renewals-and-refunds":
    "Renewals, grace periods and refunds run themselves, so you keep more payments without lifting a finger.",
  "retention-flow-builder":
    "Catch cancellations mid-click and offer a save — the churn-fighter no rival ships.",
  "customer-portal":
    "Members skip, pause, switch plans and pay invoices themselves. Your inbox stays quiet.",
  "store-credit":
    "Refund to a wallet instead of cash — reward loyalty and keep the money in your store.",
  "checkout-builder":
    "Drag-and-drop a checkout that converts: 27 field types, multi-step, zero code.",
  analytics:
    "Watch MRR, churn and ARPU move in real time — no separate analytics tool bolted on.",
  emails:
    "Every lifecycle moment gets the right email automatically — on-brand and on-time.",
  "payment-gateways":
    "Charge automatically on Stripe, PayPal and Paddle — or take manual renewals on any gateway.",
  "easy-setup":
    "Answer a few questions and go live in minutes — the wizard wires up the rest.",
  "audits-and-logs":
    "Six categorized log types show exactly what happened, when, and why.",
  "manage-subscriptions":
    "Run every subscription from one dashboard — bulk actions, exports and a full timeline.",
  "profile-builder":
    "Shape My Account with custom fields and shortcodes — make the member area yours.",
  "feature-manager":
    "Show shoppers exactly what each plan includes — and meter usage per seat.",
};

const USE_CASE_BLURB: Record<string, string> = {
  "saas-digital-products":
    "License software in tiers, gate features by plan, and bill automatically.",
  "membership-sites":
    "Build a paid community with content gating and automatic role mapping.",
  "subscription-boxes":
    "Run recurring boxes with renewal sync, skip and pause built right in.",
  "online-courses":
    "Drip lessons, gate modules by tier, and let students change plans anytime.",
  "content-publishers":
    "Put your best work behind a paywall with URL-level access control.",
  "service-businesses":
    "Sell retainers and maintenance plans clients can pause when life happens.",
};

/* ---- Hero umbrella visual ------------------------------------------------- */
const HERO_PILLARS: { icon: ReactNode; label: string; tier: "Free" | "Pro" }[] = [
  { icon: <Repeat className="size-5" />, label: "Subscriptions", tier: "Free" },
  { icon: <ShieldCheck className="size-5" />, label: "Memberships", tier: "Free" },
  { icon: <HeartHandshake className="size-5" />, label: "Retention flow", tier: "Free" },
  { icon: <Wallet className="size-5" />, label: "Store credit", tier: "Pro" },
];

const TRUST = ["WordPress.org", "WooCommerce 8+", "Stripe · PayPal · Paddle", "HPOS compatible"];

/* ---- The 6-plugin problem ------------------------------------------------- */
const OLD_STACK = [
  "Subscriptions & recurring billing",
  "Memberships & access control",
  "Retention / churn prevention",
  "Store credit / virtual wallet",
  "Checkout customization",
  "Analytics & MRR tracking",
];

/* ---- Why store owners switch (3 differentiators) -------------------------- */
const DIFFERENTIATORS = [
  {
    icon: <Layers className="size-7" />,
    eyebrow: "All-in-one architecture",
    title: "One plugin instead of six",
    body: "Subscriptions, memberships, billing, retention, store credit, analytics and audits share one data layer. No API bridges, no webhook hacks, no compatibility prayers.",
    proof: "15 built-in modules that normally need 6+ separate plugins.",
    stat: "6→1",
    statLabel: "plugins collapsed into one",
  },
  {
    icon: <Gift className="size-7" />,
    eyebrow: "Generous free tier",
    title: "Free does the heavy lifting",
    body: "Subscriptions, member access, 2-phase grace periods, plan switching with proration, the customer portal and the Retention Flow Builder — free forever, already live on WordPress.org.",
    proof: "Not a trial. Not a feature-locked demo. Free, for real.",
    stat: "$0",
    statLabel: "free core, forever",
  },
  {
    icon: <HeartHandshake className="size-7" />,
    eyebrow: "Retention-first design",
    title: "Churn meets its match",
    body: "The only WooCommerce subscription plugin with a built-in Retention Flow. When a customer clicks cancel, they pick a reason and get a targeted offer — discount, pause, downgrade or support.",
    proof: "4 offer types + per-reason targeting + retention analytics — free.",
    stat: "4",
    statLabel: "ways to save a customer",
  },
];

/* ---- Growth-engine benefits (centerpiece) --------------------------------- */
const BENEFITS = [
  {
    icon: <RotateCcw className="size-6" />,
    title: "Recover revenue you're losing today",
    body: "A 2-phase grace period keeps access live while you collect, auto-retry re-attempts failed charges, and auto-downgrade saves the customer instead of cancelling.",
    outcome: "Fewer silent cancellations. Higher lifetime value.",
  },
  {
    icon: <HeartHandshake className="size-6" />,
    title: "Turn cancellations into saves",
    body: "Intercept every cancel with a guided flow — capture the reason, present a discount, pause, downgrade or support offer, and learn exactly why people leave.",
    outcome: "Lower churn. Insights you can act on.",
  },
  {
    icon: <UserCheck className="size-6" />,
    title: "Let customers serve themselves",
    body: "The portal puts skip, pause, plan switching, cancel-with-undo, invoice payment and payment-method updates in customers' hands.",
    outcome: "Fewer tickets. Happier members.",
  },
  {
    icon: <ShieldCheck className="size-6" />,
    title: "Gate content with surgical precision",
    body: "10 condition types, 12 operators, nested AND/OR groups, URL restriction, content dripping and automatic role mapping — the deepest access engine in WooCommerce.",
    outcome: "Complex tiers without complex workarounds.",
  },
  {
    icon: <Shuffle className="size-6" />,
    title: "Give every customer their perfect plan",
    body: "Simple and variable products with per-variation billing. Customers upgrade, downgrade or crossgrade any time with one of three proration methods.",
    outcome: "Match every budget. Grow revenue per customer.",
  },
  {
    icon: <Wallet className="size-6" />,
    title: "Reward loyalty, shrink refunds",
    body: "Store credit turns refunds into wallet balance customers spend next renewal — 8 credit sources, auto-apply, expiry control and a credit-purchase product.",
    outcome: "Refunds become retained revenue.",
  },
  {
    icon: <LayoutGrid className="size-6" />,
    title: "Convert more at the checkout",
    body: "A visual drag-and-drop checkout builder with 27 field types, multi-step layouts and conditional logic — tailored to your business, without code.",
    outcome: "Higher conversion. Zero dev dependency.",
  },
  {
    icon: <BarChart3 className="size-6" />,
    title: "Know your numbers, no extra tools",
    body: "40+ reports, 10 KPI cards (MRR, churn, ARPU), retention analytics, a 6-type audit log and a gateway health dashboard — built into the same plugin.",
    outcome: "Full business intelligence, no add-on.",
  },
  {
    icon: <Lock className="size-6" />,
    title: "Protect revenue per seat",
    body: "Multi-Login Prevention detects concurrent sessions and enforces your policy, so one subscription means one active user.",
    outcome: "Each subscription pays for itself.",
  },
  {
    icon: <Rocket className="size-6" />,
    title: "Go live in under 10 minutes",
    body: "A 9-step wizard with 7 business profiles auto-configures billing, checkout, cancellation, access and emails in one pass. Export it all as JSON.",
    outcome: "Install to live subscription, fast.",
  },
];

/* ---- Comparison ----------------------------------------------------------- */
const yes: ComparisonCell = { kind: "check" };
const no: ComparisonCell = { kind: "no" };
const part = (label: string): ComparisonCell => ({ kind: "partial", label });
const txt = (value: string): ComparisonCell => ({ kind: "text", value });
const cmp = (
  feature: string,
  free: ComparisonCell,
  pro: ComparisonCell,
  woo: ComparisonCell,
) => ({ feature, cells: { free, pro, woo } });

const COMPARE_COLUMNS: ComparisonColumn[] = [
  { key: "free", name: "ArraySubs Free", offer: "$0 — free forever" },
  { key: "pro", name: "ArraySubs Pro", offer: "Free for 4 months", featured: true },
  { key: "woo", name: "Woo Subs + Memberships", offer: "$478/yr · 2 plugins" },
];

const COMPARE_GROUPS: ComparisonGroup[] = [
  {
    label: "Subscriptions & billing",
    rows: [
      cmp("Simple & variable subscriptions", yes, yes, yes),
      cmp("Different renewal price", yes, yes, no),
      cmp("Plan switching + 3 proration methods", yes, yes, part("limited")),
      cmp("Skip next renewal", yes, yes, no),
      cmp("Pause / vacation mode", yes, yes, part("suspend")),
      cmp("2-phase grace period", yes, yes, part("basic")),
      cmp("Automatic payments (Stripe/PayPal/Paddle)", part("manual"), yes, part("Stripe/PayPal")),
      cmp("Auto-retry & auto-downgrade on failure", no, yes, part("retry only")),
    ],
  },
  {
    label: "Memberships & access",
    rows: [
      cmp("Subscriptions + memberships in one plugin", yes, yes, no),
      cmp("Rules engine (10 conditions, AND/OR)", yes, yes, part("basic")),
      cmp("URL restriction & role mapping", yes, yes, no),
      cmp("Content dripping", yes, yes, yes),
    ],
  },
  {
    label: "Growth, revenue & operations",
    rows: [
      cmp("Retention Flow Builder", yes, yes, no),
      cmp("Store credit wallet", no, yes, no),
      cmp("Visual checkout builder", no, yes, no),
      cmp("Advanced analytics (MRR, churn, ARPU)", part("retention only"), yes, part("basic")),
      cmp("Audit logs (6 categorized types)", no, yes, no),
      cmp("Guided setup wizard", yes, yes, no),
      cmp("Plugins required", txt("1"), txt("1 + add-on"), txt("2 plugins")),
    ],
  },
];

/* ---- Early-adopter voices ------------------------------------------------- */
const VOICES = [
  {
    quote:
      "We replaced two plugins with ArraySubs. The Retention Flow alone made switching worth it — and the free tier covers more than what we were paying for.",
    name: "Early adopter",
    context: "SaaS / membership site",
  },
  {
    quote:
      "The setup wizard had us running in under 10 minutes. No subscription plugin was this easy to configure.",
    name: "Early adopter",
    context: "Subscription box",
  },
  {
    quote:
      "Skip, pause and renewal sync are features I couldn't find in any free plugin. ArraySubs has them all built in.",
    name: "Early adopter",
    context: "Online courses",
  },
  {
    quote:
      "Store credit turned our refunds into retained revenue. Lifetime value went up the month we switched.",
    name: "Early adopter",
    context: "Service business",
  },
];

const PRO_UNLOCKS = [
  "Store Credit — virtual wallet, 8 sources",
  "Checkout Builder — 27 fields, multi-step",
  "Advanced Analytics — MRR, churn, ARPU",
  "Audit logs — 6 categorized log types",
  "Automatic payments — Stripe · PayPal · Paddle",
  "Feature Manager — per-plan entitlements",
  "Multi-Login Prevention — protect per-seat revenue",
];

const STEPS = [
  {
    title: "Install & run the wizard",
    description:
      "Install from WordPress.org. The 9-step wizard asks your business type and auto-configures billing, checkout, retention and access rules.",
  },
  {
    title: "Create your first product",
    description:
      "Open any WooCommerce product, flip on the Subscription tab, set your cycle, trial and sign-up fee. Publish — you're live.",
  },
  {
    title: "Watch your business grow",
    description:
      "Renewals run automatically, the Retention Flow prevents churn, and the dashboard tracks your MRR in real time.",
  },
];

const INTEGRATIONS: { group: string; items: string[] }[] = [
  { group: "Payment gateways", items: ["Stripe", "PayPal", "Paddle", "+ any Woo gateway (manual)"] },
  { group: "Funnel builders", items: ["FunnelKit", "CartFlows", "OptimizeFunnels"] },
  { group: "CRM & email", items: ["FluentCRM", "Groundhogg", "Jetpack CRM", "HubSpot", "Mailchimp", "Klaviyo"] },
  { group: "Affiliate", items: ["AffiliateWP", "SliceWP"] },
  { group: "Page builders", items: ["Elementor", "Beaver Builder", "Divi"] },
];

const FAQ_ITEMS = [
  {
    question: "What is ArraySubs?",
    answer:
      "ArraySubs is a free WooCommerce plugin that combines subscriptions, memberships, recurring billing, retention flows, store credit, a checkout builder, analytics and audits in one solution — replacing several separate plugins.",
  },
  {
    question: "Is ArraySubs really free?",
    answer:
      "Yes. The core plugin is free on WordPress.org — not a time-limited trial. You get subscription products, member access control, recurring billing with a 2-phase grace period, the customer portal, plan switching, the Retention Flow Builder and the setup wizard at no cost. Pro is an optional add-on.",
  },
  {
    question: "What does ArraySubs Pro add?",
    answer:
      "Store credit, the visual checkout builder, automatic payments (Stripe, PayPal, Paddle), advanced analytics (MRR, churn, ARPU), audit logs, a gateway health dashboard, auto-retry and auto-downgrade, the feature manager and multi-login prevention.",
  },
  {
    question: "How does ArraySubs compare to WooCommerce Subscriptions?",
    answer:
      "WooCommerce Subscriptions only covers subscription billing — no memberships, retention flow, store credit, analytics or audits. ArraySubs includes subscriptions and memberships in one free plugin, plus a Retention Flow Builder, skip & pause, content dripping and a 9-step setup wizard.",
  },
  {
    question: "Does ArraySubs support Stripe, PayPal and Paddle?",
    answer:
      "Yes. Free supports manual renewals with any WooCommerce gateway. Pro adds automatic recurring payments with Stripe (SCA/3DS), PayPal (billing agreements) and Paddle (merchant of record with tax/VAT across 200+ countries).",
  },
  {
    question: "Can I use ArraySubs for memberships without subscriptions?",
    answer:
      "Absolutely. Member access control — content restriction, role mapping, URL restriction, download gating and member discounts — works independently of subscription billing.",
  },
  {
    question: "What happens if a customer's payment fails?",
    answer:
      "ArraySubs uses a 2-phase grace period: the subscription stays active for a configurable period, then moves to on-hold, and only then cancels. Pro adds automatic retry and auto-downgrade. Customers can pay the outstanding invoice any time during the grace period.",
  },
  {
    question: "Is there a setup wizard?",
    answer:
      "Yes. A 9-step guided wizard asks your business type (SaaS, subscription box, membership, courses, services, nonprofit or custom) and automatically configures billing, checkout, retention, access control and emails — most stores are live in under 10 minutes.",
  },
];

const MANIFESTO_LINES: ManifestoLine[] = [
  [
    { type: "text", text: "The" },
    { type: "pill", icon: <Sparkles className="size-6 sm:size-8 lg:size-10" />, label: "Complete", color: "highlight" },
    { type: "text", text: "Subscription &", color: "highlight" },
  ],
  [
    { type: "text", text: "Membership" },
    { type: "pill", icon: <ShieldCheck className="size-6 sm:size-8 lg:size-10" />, label: "Members", color: "gold" },
    { type: "text", text: "Engine for", color: "gold" },
  ],
  [
    { type: "text", text: "Ambitious" },
    { type: "pill", icon: <HeartHandshake className="size-6 sm:size-8 lg:size-10" />, label: "Retention", color: "primary" },
    { type: "text", text: "WooCommerce", color: "highlight" },
  ],
  [
    { type: "text", text: "Stores", color: "gold" },
    { type: "pill", icon: <BarChart3 className="size-6 sm:size-8 lg:size-10" />, label: "Analytics", color: "white" },
    { type: "text", text: "— Today." },
  ],
];

export default function ArraySubsLanding() {
  return (
    <>
      {/* ====== 1. HERO (bespoke) ========================================= */}
      <section className="section-surface relative overflow-hidden bg-surface text-foreground">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-24 size-[42rem] rounded-full bg-primary/10 blur-3xl"
        />
        <Container className="relative grid gap-14 pt-20 pb-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-12 lg:pt-24 lg:pb-24">
          {/* Copy */}
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-pill border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted">
              <Sparkles className="size-4 text-primary" />
              Free on WordPress.org · Pro in early access
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.03] font-bold tracking-tight text-balance text-foreground sm:text-6xl lg:text-[4.25rem]">
              Sell subscriptions, gate memberships, and{" "}
              <span className="text-primary">stop churn</span> — from one free
              WooCommerce plugin.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted text-pretty sm:text-xl">
              ArraySubs replaces five disconnected tools with one integrated
              plugin — so you launch in minutes, recover failed payments
              automatically, and turn cancellations into saves.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button
                href={GET_PRO}
                size="lg"
                magnetic
                iconRight={<ArrowRight className="size-5" />}
              >
                Get Pro — Free for 4 months
              </Button>
              <Button href={FEATURES_URL} variant="outline" size="lg" magnetic>
                Explore features
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted">
              {TRUST.map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <Check className="size-4 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Umbrella product visual */}
          <div className="relative min-w-0">
            <div className="rounded-3xl border border-border bg-card p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-border-strong" />
                    <span className="size-2.5 rounded-full bg-border-strong" />
                    <span className="size-2.5 rounded-full bg-border-strong" />
                  </span>
                  <span className="text-sm font-medium text-muted">
                    ArraySubs · Dashboard
                  </span>
                </span>
                <Badge tone="primary">Live</Badge>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <Kpi label="MRR" value="$12,480" delta="+18%" dir="up" />
                <Kpi label="Churn" value="2.1%" delta="-0.6pt" dir="down" />
                <Kpi label="Saves" value="34" delta="this mo" />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                {HERO_PILLARS.map((p) => (
                  <Pillar key={p.label} icon={p.icon} label={p.label} tier={p.tier} />
                ))}
              </div>
            </div>

            {/* floating proof toasts (desktop only) */}
            <div className="absolute -left-4 bottom-10 hidden items-center gap-2 rounded-pill border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground lg:inline-flex">
              <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-on-dark">
                <Check className="size-3.5" />
              </span>
              Renewal recovered
            </div>
            <div className="absolute -top-4 -right-3 hidden items-center gap-2 rounded-pill border border-on-dark-border bg-dark px-4 py-2 text-sm font-semibold text-on-dark lg:inline-flex">
              <HeartHandshake className="size-4 text-highlight" />
              Save offer accepted
            </div>
          </div>
        </Container>
      </section>

      {/* ====== 2. THE PLUGIN-OVERLOAD PROBLEM ============================= */}
      <Section surface="default" spacing="lg">
        <Container>
          <SectionTitle
            eyebrow="The problem"
            title="Six plugins to sell subscriptions? That's the old way."
            subtitle="A subscription plugin, a membership plugin, a retention tool, a store-credit add-on, a checkout customizer, an analytics dashboard. Six update cycles. Six conflicts waiting to happen."
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-[0.1875rem] lg:grid-cols-2">
            <div className="flex flex-col rounded-2xl bg-card p-8">
              <Eyebrow>The old way</Eyebrow>
              <ul className="mt-6 flex flex-col gap-3">
                {OLD_STACK.map((item, i) => (
                  <li key={item} className="flex items-center gap-3 text-muted">
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-semibold text-faint">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm font-medium text-faint">
                6 plugins · 6 update cycles · 6 support channels
              </p>
            </div>
            <div className="flex flex-col rounded-2xl bg-dark p-8 text-on-dark">
              <Badge tone="highlight" className="self-start">
                The ArraySubs way
              </Badge>
              <p className="mt-6 font-display text-2xl leading-tight font-semibold">
                One plugin. One data layer. Zero conflicts.
              </p>
              <p className="mt-4 text-on-dark/75 text-pretty">
                Everything you'd stitch together — built to work as one, because
                it's built as one.
              </p>
              <Button
                href={COMPARE_WOO}
                variant="highlight"
                magnetic
                className="mt-8 self-start"
                iconRight={<ArrowRight className="size-5" />}
              >
                See the comparison
              </Button>
            </div>
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center font-display text-2xl leading-snug text-balance text-foreground sm:text-3xl">
            <span className="marker-highlight">
              Replace your entire WooCommerce subscription and membership plugin
              stack with one free solution.
            </span>
          </p>
        </Container>
      </Section>

      {/* ====== 3. AVAILABLE MODULES (moved here — lead-in to features) ==== */}
      <ModuleShowcase moduleCount={15} />

      {/* ====== 4. FEATURE GRID (15 modules) =============================== */}
      <Section surface="surface" spacing="lg">
        <Container>
          <SectionTitle
            eyebrow="Features"
            title="Everything it takes to run a subscription business"
            subtitle="Fifteen modules that already talk to each other — so you spend time growing, not patching plugin conflicts."
            align="center"
          />
          <div className="mt-14 flex flex-col gap-12">
            {FEATURE_CATEGORIES.map((category) => (
              <div key={category.key}>
                <Eyebrow>{category.label}</Eyebrow>
                <ScrollReveal
                  stagger={0.06}
                  y={0}
                  className="mt-5 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3"
                >
                  {featuresByCategory(category.key).map((feature) => (
                    <IconCard
                      key={feature.slug}
                      icon={<feature.icon className="size-6" />}
                      title={feature.name}
                      description={FEATURE_BLURB[feature.slug] ?? feature.cardDescription}
                      href={`${FEATURES_URL}${feature.slug}/`}
                      badge={<Badge tone={tierTone(feature.tier)}>{feature.tier}</Badge>}
                    />
                  ))}
                </ScrollReveal>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button href={FEATURES_URL} size="lg" magnetic iconRight={<ArrowRight className="size-5" />}>
              Explore all 15 features
            </Button>
          </div>
        </Container>
      </Section>

      {/* ====== 5. WHY STORE OWNERS SWITCH (3 differentiators) ============= */}
      <Section surface="default" spacing="lg">
        <Container>
          <SectionTitle
            eyebrow="Why ArraySubs"
            title="Built different. Built complete."
            align="center"
          />
          <div className="mt-14 flex flex-col gap-[0.1875rem]">
            {DIFFERENTIATORS.map((d, i) => (
              <div
                key={d.title}
                className="grid items-center gap-8 rounded-2xl bg-card p-8 lg:grid-cols-2 lg:gap-12 lg:p-12"
              >
                <div
                  className={cn(
                    "flex flex-col items-start justify-center gap-6 rounded-2xl bg-dark p-10 text-on-dark",
                    i % 2 === 1 && "lg:order-last",
                  )}
                >
                  <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-on-dark">
                    {d.icon}
                  </span>
                  <div>
                    <span className="block font-display text-6xl font-bold text-highlight sm:text-7xl">
                      {d.stat}
                    </span>
                    <span className="mt-2 block text-on-dark/70">{d.statLabel}</span>
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-first" : undefined}>
                  <Eyebrow>{d.eyebrow}</Eyebrow>
                  <h3 className="mt-4 font-display text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
                    {d.title}
                  </h3>
                  <p className="mt-5 text-lg leading-8 text-muted text-pretty">{d.body}</p>
                  <p className="mt-5 flex items-start gap-2 font-medium text-foreground">
                    <Check className="mt-1 size-5 shrink-0 text-primary" />
                    {d.proof}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ====== 6. GROWTH ENGINE (centerpiece) ============================= */}
      <Section surface="surface" spacing="lg">
        <Container>
          <Eyebrow>Growth engine</Eyebrow>
          <div className="mt-4">
            <BigText size="display-lg" variant="primary">
              Built to grow your business at max.
            </BigText>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-muted text-pretty sm:text-xl">
            Every feature earns its place by doing one of three things — grow
            revenue, protect it from churn, or buy back your time. Here's how.
          </p>
          <ScrollReveal stagger={0.05} y={0} className="mt-14 grid gap-[0.1875rem] sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="group flex flex-col gap-4 rounded-2xl bg-card p-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-surface text-dark transition-colors duration-300 group-hover:bg-primary group-hover:text-on-dark">
                  {b.icon}
                </span>
                <h3 className="font-display text-xl leading-tight font-semibold text-foreground">
                  {b.title}
                </h3>
                <p className="text-muted text-pretty">{b.body}</p>
                <p className="mt-auto flex items-start gap-2 pt-2 text-sm font-semibold text-primary">
                  <TrendingUp className="mt-0.5 size-4 shrink-0" />
                  {b.outcome}
                </p>
              </div>
            ))}
          </ScrollReveal>
        </Container>
      </Section>

      {/* ====== 7. COMPARISON ============================================= */}
      <Section surface="default" spacing="lg">
        <Container>
          <SectionTitle
            eyebrow="Comparison"
            title="The all-in-one alternative to the multi-plugin stack"
            subtitle="What you'd buy as WooCommerce Subscriptions plus WooCommerce Memberships — in one plugin, with a free tier."
            align="center"
          />
          <div className="mt-12">
            <ComparisonTable
              caption="ArraySubs Free and Pro compared with WooCommerce Subscriptions plus WooCommerce Memberships across billing, memberships, retention, analytics and operations."
              columns={COMPARE_COLUMNS}
              groups={COMPARE_GROUPS}
            />
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href={COMPARE_URL} size="lg" magnetic iconRight={<ArrowRight className="size-5" />}>
              See every comparison
            </Button>
            <Button href={COMPARE_WOO} variant="outline" size="lg" magnetic>
              vs WooCommerce Subscriptions
            </Button>
          </div>
        </Container>
      </Section>

      {/* ====== 8. USE CASES ============================================== */}
      <Section surface="surface" spacing="lg">
        <Container>
          <SectionTitle
            eyebrow="Use cases"
            title="Whatever you sell, ArraySubs powers it"
            subtitle="Digital or physical, content or service — store owners run it all on ArraySubs."
            align="center"
          />
          <ScrollReveal
            stagger={0.06}
            y={0}
            className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3"
          >
            {USE_CASES.map((useCase) => (
              <IconCard
                key={useCase.slug}
                icon={<useCase.icon className="size-6" />}
                title={useCase.name}
                description={USE_CASE_BLURB[useCase.slug] ?? useCase.cardDescription}
                href={`${USE_CASES_URL}${useCase.slug}/`}
              />
            ))}
          </ScrollReveal>
        </Container>
      </Section>

      {/* ====== 9. EDITORIAL MANIFESTO ===================================== */}
      <Manifesto lines={MANIFESTO_LINES} />

      {/* ====== 10. EARLY ADOPTERS ======================================== */}
      <Section surface="surface" spacing="lg">
        <Container>
          <SectionTitle eyebrow="Early adopters" title="The stores switching first" align="center" />
          <div className="mt-12">
            <Marqueue label="What early adopters say">
              {VOICES.map((item, i) => (
                <figure
                  key={i}
                  className="flex h-full flex-col justify-between gap-6 rounded-2xl bg-card p-8 text-foreground"
                >
                  <blockquote className="text-lg leading-8 text-pretty">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <span aria-hidden="true" className="inline-block size-10 rounded-full bg-primary" />
                    <span className="flex flex-col">
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-sm text-muted">{item.context}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </Marqueue>
          </div>
        </Container>
      </Section>

      {/* ====== 11. EARLY ACCESS / LEAD CAPTURE =========================== */}
      <Section id="early-access" surface="highlight" spacing="lg">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>Early access</Eyebrow>
              <h2 className="mt-4 font-display text-display-sm text-balance text-dark">
                Get Pro free for 4 months — before anyone pays
              </h2>
              <p className="mt-5 text-lg leading-8 text-dark/80 text-pretty">
                We're opening Pro to early adopters. A full Pro license — store
                credit, checkout builder, analytics, audits, automatic payments
                and more — free for 4 months. No card. No commitment.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {PRO_UNLOCKS.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-medium text-dark">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={GET_PRO}
              aria-label="Claim your free 4-month ArraySubs Pro license"
              className="group flex items-center justify-center"
            >
              <span className="float-anim inline-block">
                <img
                  src="/shapes/claim-my-pro.webp"
                  alt="Claim your free 4-month ArraySubs Pro license"
                  className="h-auto w-full max-w-md transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              </span>
            </Link>
          </div>
        </Container>
      </Section>

      {/* ====== 12. HOW IT WORKS ========================================== */}
      <Section surface="default" spacing="lg">
        <Container>
          <SectionTitle
            eyebrow="How it works"
            title="Install to first subscription in under 10 minutes"
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] md:grid-cols-3">
            {STEPS.map((step, i) => (
              <StepCard
                key={step.title}
                number={i + 1}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ====== 13. INTEGRATIONS ========================================== */}
      <Section surface="surface" spacing="lg">
        <Container>
          <SectionTitle
            eyebrow="Integrations"
            title="WooCommerce-first. Your stack already works."
            subtitle="Built on WooCommerce, not bolted on — your funnel builder, CRM, affiliate system and page builder keep working exactly as they do today."
            align="center"
          />
          <div className="mt-12 flex flex-col gap-8">
            {INTEGRATIONS.map((row) => (
              <div
                key={row.group}
                className="grid gap-4 border-b border-border pb-8 last:border-b-0 sm:grid-cols-[12rem_1fr] sm:items-center"
              >
                <span className="text-sm font-semibold tracking-wide text-faint uppercase">
                  {row.group}
                </span>
                <div className="flex flex-wrap gap-3">
                  {row.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-pill bg-card px-4 py-2 text-sm font-medium text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-muted">
            <Boxes className="size-4 text-primary" />
            HPOS compatible · built for the classic WooCommerce checkout · works with your theme & builders.
          </p>
        </Container>
      </Section>

      {/* ====== 14. FAQ =================================================== */}
      <Section surface="default" spacing="lg">
        <Container>
          <SectionTitle eyebrow="FAQ" title="Questions, answered" align="center" />
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion items={FAQ_ITEMS} defaultOpen={[0]} />
          </div>
        </Container>
        <JsonLd data={faqSchema(FAQ_ITEMS)} />
      </Section>

      {/* ====== 15. FINAL CTA ============================================= */}
      <Section surface="primary" spacing="lg">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="Get started"
            title="Start building your subscription business today"
            subtitle="The free core is already on WordPress.org — install it, run the wizard, and have your first subscription live in minutes. Want the full power of Pro? Grab your 4-month license, free while early access is open."
            microcopy="Free forever · no credit card required · installs in 2 minutes"
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
                  Get Pro — Free for 4 months
                </Button>
                <Button href={FEATURES_URL} variant="outline" size="lg" layers="2layer" magnetic>
                  Explore all features
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

/* ============================================================================
   Hero visual helpers (page-only)
   ========================================================================== */

function Kpi({
  label,
  value,
  delta,
  dir,
}: {
  label: string;
  value: string;
  delta: string;
  dir?: "up" | "down";
}) {
  return (
    <div className="rounded-xl bg-surface p-3">
      <span className="text-xs font-medium text-faint">{label}</span>
      <span className="mt-1 block font-display text-lg leading-none font-bold text-foreground">
        {value}
      </span>
      <span
        className={cn(
          "mt-1.5 inline-flex items-center gap-0.5 text-xs font-semibold",
          dir ? "text-primary" : "text-faint",
        )}
      >
        {dir === "up" && <ArrowUpRight className="size-3" />}
        {dir === "down" && <ArrowDownRight className="size-3" />}
        {delta}
      </span>
    </div>
  );
}

function Pillar({
  icon,
  label,
  tier,
}: {
  icon: ReactNode;
  label: string;
  tier: "Free" | "Pro";
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface text-primary">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-semibold text-foreground">{label}</span>
        <span
          className={cn(
            "text-xs font-medium",
            tier === "Pro" ? "text-faint" : "text-primary",
          )}
        >
          {tier}
        </span>
      </span>
    </div>
  );
}
