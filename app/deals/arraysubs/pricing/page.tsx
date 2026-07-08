import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowDown,
  BarChart3,
  ClipboardList,
  CreditCard,
  LayoutGrid,
  ListChecks,
  Lock,
  ShieldCheck,
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
  PageHero,
  Section,
  SectionTitle,
  type ComparisonCell,
  type ComparisonColumn,
  type ComparisonGroup,
  type ComparisonRow,
} from "@/components/ui";
import { PricingPlanCards } from "./PricingPlanCards";
import { ARRAYSUBS_PRO_PLANS } from "./_plans";

export const metadata: Metadata = {
  ...createMetadata({
    title: "ArraySubs Pro Pricing",
    description:
      "Choose an ArraySubs Pro plan for 1, 10, or 1000 sites. Every paid plan includes the full Pro feature set, annual and lifetime options, and a 30-day money-back guarantee.",
    path: "/deals/arraysubs/pricing/",
  }),
  title: { absolute: "ArraySubs Pro Pricing" },
};

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
  { value: String(MODULE_COUNT), label: "Features" },
  { value: String(CORE_MODULE_COUNT), label: "Core-accessible" },
  { value: String(PRO_ONLY_MODULE_COUNT), label: "Pro-only features" },
  { value: "6+", label: "Plugins replaced" },
];

const TRIAL_PLAN = ARRAYSUBS_PRO_PLANS[0];

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
  { key: "pro", name: "ArraySubs Pro", offer: "Paid plans from $129/yr", featured: true },
];

const COMPARISON_GROUPS: ComparisonGroup[] = [
  {
    label: "Subscriptions & billing",
    rows: [
      row("Subscription products (simple & variable)", yes, yes),
      row("Flexible billing cycles (daily-yearly)", yes, yes),
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

const FAQ_ITEMS = [
  {
    question: "Do all paid plans include every Pro feature?",
    answer:
      "Yes. Personal, Professional, and Agency all include the complete ArraySubs Pro feature set. The difference is the number of sites covered by the license.",
  },
  {
    question: "Which plan should I buy?",
    answer:
      "Choose Personal for one store, Professional for up to 10 sites, and Agency for up to 1000 sites. If you manage client stores or staging environments, Professional is usually the best fit.",
  },
  {
    question: "Can I still use ArraySubs for free?",
    answer:
      "Yes. The ArraySubs core plugin remains free forever on WordPress.org. ArraySubs Pro is now a paid upgrade for advanced modules and workflows.",
  },
  {
    question: "Are free Pro requests still available?",
    answer:
      "No. Free Pro request access has ended. New Pro licenses are purchased through the secure checkout from this pricing page.",
  },
  {
    question: "Can I choose annual or lifetime at checkout?",
    answer:
      "Yes. The pricing cards show annual and lifetime prices for each plan, and the secure checkout handles the license, invoice, and account flow.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Yes. ArraySubs Pro is backed by a 30-day, no-questions-asked refund guarantee for eligible purchases.",
  },
];

export default function ArraySubsPricingPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "ArraySubs", href: "/deals/arraysubs/" },
          { name: "Pricing Plan", href: "/deals/arraysubs/pricing/" },
        ]}
        title="ArraySubs Pro pricing."
        subtitle="Choose by site count, not feature access. Every ArraySubs Pro plan includes the complete Pro feature set, annual and lifetime options, and the same 30-day guarantee."
        highlights={[
          "Personal · 1 site",
          "Professional · 10 sites",
          "Agency · 1000 sites",
          "All Pro features included",
        ]}
        actions={
          <>
            <Button
              href={site.sameAs[0]}
              variant="outline"
              size="lg"
              magnetic
            >
              Get Free Core - WP.ORG
            </Button>
            <Button
              href="#plans"
              size="lg"
              magnetic
              iconRight={<ArrowDown className="size-5" />}
            >
              Compare Plans
            </Button>
          </>
        }
      />

      <Section id="plans" surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Plans"
            title="Pick the license size that matches your store count"
            subtitle="No feature gating between paid tiers. Personal, Professional, and Agency all unlock the full Pro stack."
            align="left"
          />
          <PricingPlanCards />
          <div className="mt-[0.1875rem] grid rounded-2xl bg-card p-6 text-foreground sm:p-8 lg:grid-cols-[1fr_2fr] lg:gap-10">
            <div className="flex flex-col">
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                What every plan includes
              </p>
              <h3 className="mt-3 font-display text-3xl text-balance sm:text-4xl">
                Every paid plan includes every Pro feature and module.
              </h3>
              <p className="mt-auto pt-8 text-sm text-muted">
                Taxes and invoices are calculated during checkout where
                applicable.
              </p>
            </div>
            <div className="grid gap-5 text-muted">
              <p>
                <span className="font-semibold text-foreground">
                  All plans include all features and all modules.
                </span>{" "}
                Personal, Professional, and Agency only differ by licensed site
                count.
              </p>
              <p>
                Yearly plans receive Pro support, new features, and security
                updates while the license is active.{" "}
                <span className="font-semibold text-foreground underline decoration-current underline-offset-4">
                  After expiry, Pro support, new features, and security updates
                  stop until renewal.
                </span>
              </p>
              <p className=" ">
                <span className="bg-highlight text-foreground"><span className="font-semibold leading-tight">Lifetime plans</span> are a one-time purchase and  continue receiving Pro support, new features, and security updates without yearly renewal.</span>
              </p>
              <p>
                <span className="font-semibold text-foreground">
                  I value support the most.
                </span>{" "}
                For any support, email{" "}
                <a
                  href="mailto:emran@arrayhash.com"
                  className="font-semibold text-primary underline decoration-current underline-offset-4"
                >
                  emran@arrayhash.com
                </a>
                . I will help you out. I always do.
              </p>
            </div>
          </div>

          <div className="mt-24 grid items-stretch gap-[0.1875rem] lg:grid-cols-2">
            <article className="flex h-full flex-col rounded-2xl bg-card p-6 text-foreground sm:p-8">
              <img
                src="/shapes/10-day-trial.png"
                alt="10 day trial, no credit card required"
                width={1574}
                height={586}
                className="mx-auto w-full max-w-[34rem]"
              />
              <div className="mt-auto flex justify-center pt-8">
                <Button
                  href={`/deals/arraysubs/checkout/${TRIAL_PLAN.id}/`}
                  size="lg"
                  magnetic
                  iconRight={<ArrowRight className="size-5" />}
                >
                  Start Trial
                </Button>
              </div>
            </article>

            <article className="grid h-full items-center gap-8 rounded-2xl p-6 text-foreground sm:p-8 md:grid-cols-[10rem_1fr]">
              <img
                src="/shapes/30-days-refund-removebg.png"
                alt="30 days refund guarantee"
                width={500}
                height={500}
                className="mx-auto w-full max-w-40 md:mx-0"
              />
              <div>
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                  30-day guarantee
                </p>
                <h3 className="mt-3 font-display text-3xl text-balance sm:text-4xl">
                  Try ArraySubs Pro without second thoughts.
                </h3>
                <p className="mt-4 text-muted text-pretty">
                  If the Pro workflow is not the right fit, request a refund
                  within 30 days. No drawn-out review, no pressure to stay.
                </p>
              </div>
            </article>
          </div>
        </Container>
      </Section>

      <Section id="compare" surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Free vs Pro"
            title="Start free, upgrade when the store needs the full operating stack"
            subtitle="The free core keeps running subscriptions and memberships. Pro adds the advanced revenue, analytics, payment, and operations modules."
            align="center"
          />
          <div className="mt-12">
            <ComparisonTable
              caption="Feature comparison of ArraySubs Free versus ArraySubs Pro, grouped by subscriptions and billing, memberships and access, retention and revenue, operations and insights, and payments and platform."
              columns={COMPARISON_COLUMNS}
              groups={COMPARISON_GROUPS}
            />
          </div>
        </Container>
      </Section>

      <Section id="pro-features" surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="What’s in Pro"
            title="Seven Pro-only root modules you unlock"
            subtitle="Every paid license includes these modules plus Pro workflows across checkout, payments, analytics, refunds, and customer operations."
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
              analytics share one data layer, so there is nothing to stitch
              together across separate tools.
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

      <Section id="faq" surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Pricing FAQ"
            title="Questions about plans & checkout"
            subtitle="Plan limits, annual and lifetime pricing, secure checkout, and the free core."
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

      <Section surface="primary" spacing="md">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="Ready to upgrade"
            title="Buy ArraySubs Pro with the site count you need"
            subtitle="Every paid plan includes the same Pro feature set. Choose Personal, Professional, or Agency and complete checkout securely."
            microcopy="Secure checkout · Annual and lifetime options · 30-day guarantee"
            actions={
              <Button
                href="#plans"
                variant="dark"
                size="lg"
                layers="2layer"
                magnetic
                iconRight={<ShieldCheck className="size-5" />}
              >
                Choose a Plan
              </Button>
            }
          />
        </Container>
      </Section>

      <JsonLd data={softwareApplicationSchema()} />
    </>
  );
}
