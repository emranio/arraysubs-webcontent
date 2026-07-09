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
  ModuleShowcase,
  PageHero,
  Section,
  SectionTitle,
  StepCard,
  TagCard,
} from "@/components/ui";
import {
  FEATURES,
  FEATURE_CATEGORIES,
  featuresByCategory,
  type Feature,
  type FeatureTier,
} from "./_data";
import { FreeVsProTable } from "../_components/FreeVsProTable";

const MODULE_COUNT = FEATURES.length;
const CORE_MODULE_COUNT = FEATURES.filter((feature) => feature.tier !== "Pro").length;
const PRO_ONLY_MODULE_COUNT = FEATURES.filter((feature) => feature.tier === "Pro").length;
const CATEGORY_COUNT = FEATURE_CATEGORIES.length;

export const metadata: Metadata = createMetadata({
  title: "All Features — WooCommerce Subscriptions & Memberships",
  description:
    `Explore all ${MODULE_COUNT} ArraySubs feature cards — subscriptions, memberships, billing, payment gateways, retention, store credit, checkout builder, analytics, site access tools, and more. ${CORE_MODULE_COUNT} are available in the core path, with ${PRO_ONLY_MODULE_COUNT} Pro-only features.`,
  path: "/deals/arraysubs/features/",
});

const GET_PRO = "/deals/arraysubs/pricing/";

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

const SYSTEMS = [
  {
    tag: "Setup",
    title: "Guided setup and settings migration",
    description:
      "Easy Setup Wizard turns first configuration into a 9-step interview and includes JSON settings export/import for repeatable launches.",
  },
  {
    tag: "Toolkit",
    title: "Guided setup, page builders, and access cleanup",
    description:
      "Easy Setup Wizard, Checkout Page Builder, My Account Page Builder, login routing, dashboard cleanup, support impersonation, and Pro session limits sit together.",
  },
  {
    tag: "Products",
    title: "Products, checkout URLs, coupons, and entitlements",
    description:
      "Subscription products, coupons, one-click checkout URLs, product redirects, shipping, and Feature Manager shape how subscriptions are sold.",
  },
  {
    tag: "Payments",
    title: "Gateways, manual payments, and tax",
    description:
      "Stripe, Paddle, PayPal, WooCommerce manual payments, and WooCommerce tax handling explain how subscription payments are collected.",
  },
  {
    tag: "Operations",
    title: "Subscription records and customer self-service",
    description:
      "Manage Subscriptions, Customer Portal, Billing and Renewals, plan switching, retry, grace, pause, and skip tools keep recurring relationships running.",
  },
  {
    tag: "Members",
    title: "Accounts, access rules, and support context",
    description:
      "Profile Builder, Shortcodes, Member Access, Member Discounts, Content Dripping, Restricted Downloads, and Member Insight shape subscriber experiences.",
  },
  {
    tag: "Revenue",
    title: "Retention, analytics, and credit",
    description:
      "Retention Flow Builder, Retention Analytics, and Store Credit explain cancellation behavior and keep more value inside the store.",
  },
  {
    tag: "Infra",
    title: "Reports, emails, audits, and gateway health",
    description:
      "Analytics, Emails, Audits and Logs, and Gateway Health give operators visibility into renewals, gateways, and system behavior.",
  },
];

const SETUP_STEPS = [
  {
    title: "Start from the manual map",
    description:
      "Start with Easy Setup Wizard, then use the module map to separate product modules from settings screens and Pro extensions.",
  },
  {
    title: "Configure the core path",
    description:
      `Set up the ${CORE_MODULE_COUNT} core-accessible modules: wizard, products, billing, portal, retention, access rules, reports, and Toolkit basics.`,
  },
  {
    title: "Layer in Pro modules",
    description:
      `Add the ${PRO_ONLY_MODULE_COUNT} Pro-only features when the store needs credit, entitlements, shipping, gateway monitoring, and account sharing controls.`,
  },
  {
    title: "Operate from shared data",
    description:
      "Let subscriptions, notes, portal actions, analytics, emails, and audits read from the same subscription records.",
  },
];

const FAQ_ITEMS = [
  {
    question: "How many features does ArraySubs have?",
    answer: `There are ${MODULE_COUNT} manual-backed features. ${CORE_MODULE_COUNT} are available in the free/core path, and ${PRO_ONLY_MODULE_COUNT} are Pro-only.`,
  },
  {
    question: "Do I need Pro to run a subscription business?",
    answer:
      "No. The free core covers subscription products, free trials, signup fees, coupons, manual payment flows, customer portal actions, plan switching with proration, skip, pause, 2-phase grace recovery, member access, content restriction, content dripping, member discounts, retention flows, emails, analytics basics, setup, and the free Toolkit modules. Pro adds automatic gateways, failed-payment retry, auto-downgrade, store credit, the checkout builder, Feature Manager, Gateway Health, audits, and Multi-Login Prevention.",
  },
  {
    question: "How much content restriction is included?",
    answer:
      "Member access is the largest category. Member Access gates content by subscription, role, purchased products, lifetime spend, and Pro feature entitlements — across pages, posts, any custom post type, taxonomy terms, URL paths, partial sections, Elementor Containers, and Gutenberg blocks — with content dripping and restricted downloads.",
  },
  {
    question: "What is in the Site Access Toolkit section?",
    answer:
      "It groups Easy Setup Wizard, Checkout Page Builder, and My Account Page Builder with the WordPress-facing access modules: Admin Bar Visibility, Admin Dashboard Access, WordPress Login Page, Login as User, and Multi-Login Prevention.",
  },
  {
    question: "Which features are Pro-only?",
    answer: `There are ${PRO_ONLY_MODULE_COUNT} Pro-only features, including the Checkout Page Builder, automatic Stripe/PayPal/Paddle billing, Flexible Renewal Sync, Auto-Retry, Auto-Downgrade, Fixed-Date Subscriptions, Subscription Shipping, Product Page Redirection, Multi-Login Prevention, Feature Manager, Feature-Based Conditions, Member Insight, Store Credit, Gateway Health, and the coming-soon Early Renew, Installment / Split Payments, Customer-Chosen Subscription Duration, and Donation & Crowdfunding modules.`,
  },
  {
    question: "Are all features in one plugin, or paid add-ons?",
    answer:
      "Every feature ships in the same plugin on one shared subscription record — no add-on store, no per-feature pricing. Install the free core from WordPress.org and activate Pro when you need the automation and revenue features.",
  },
];

export default function FeaturesHubPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "ArraySubs", href: "/deals/arraysubs/" },
          { name: "Features", href: "/deals/arraysubs/features/" },
        ]}
        title={
          <>
            <span className="block">ArraySubs</span>
            <span className="block">features</span>
          </>
        }
        subtitle="Launch subscriptions, memberships, gated content, retention offers, and renewal workflows from one WooCommerce plugin instead of stitching together a fragile stack of add-ons."
        highlights={[
          "Start with a free core built for real stores",
          "Add Pro automation when revenue scales",
          `${MODULE_COUNT} features across billing, access, and retention`,
        ]}
        actions={
          <>
            <Button
              href={GET_PRO}
              size="lg"
              magnetic
              iconRight={<ArrowRight className="size-5" />}
            >
              Start Trial
            </Button>
            <span className="whitespace-nowrap text-sm font-medium text-muted">
              No credit card required
            </span>
          </>
        }
      />

      <ModuleShowcase
        moduleCount={MODULE_COUNT}
        compact
        artworkSrc="/shapes/feature-count.png"
        artworkAlt="ArraySubs features"
        primaryHref={GET_PRO}
        primaryLabel="Start Trial"
        secondaryHref="#all-modules"
        secondaryLabel="Browse features"
      />

      {/* ---- Category grid ---------------------------------------------- */}
      <Section id="all-modules" surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="All features"
            title={`${MODULE_COUNT} features, ${CATEGORY_COUNT} categories`}
            subtitle="Browse the manual-backed feature grid by current user-manual coverage, tier, and workflow ownership."
            align="center"
          />
          <div className="mt-12 flex flex-col gap-12">
            {FEATURE_CATEGORIES.map((category) => (
              <div key={category.key} id={category.key} className="scroll-mt-24">
                <Eyebrow>{category.label}</Eyebrow>
                <ScrollReveal
                  stagger={0.04}
                  y={0}
                  className="mt-5 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3"
                >
                  {featuresByCategory(category.key).map((feature) => (
                    <IconCard
                      key={feature.slug}
                      icon={<feature.icon className="size-6" />}
                      title={feature.name}
                      description={feature.cardDescription}
                      badge={featureBadges(feature)}
                    />
                  ))}
                </ScrollReveal>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Feature systems -------------------------------------------- */}
      <Section surface="default" spacing="lg">
        <Container>
          <Eyebrow>How the features fit together</Eyebrow>
          <div className="mt-4">
            <BigText size="display-lg" variant="primary">
              One subscription system, not a plugin pile.
            </BigText>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-muted text-pretty sm:text-xl">
            The feature list is broad because subscription businesses are broad:
            products, billing, access, support, retention,
            reporting, and WordPress access cleanup all need to share the same
            subscription data.
          </p>
          <div className="mt-14 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
            {SYSTEMS.map((system, index) => (
              <TagCard
                key={system.title}
                tag={system.tag}
                title={system.title}
                description={system.description}
                active={index === 0}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Trial and refund guarantee --------------------------------- */}
      <Section surface="surface" spacing="md">
        <Container>
          <div className="grid items-stretch gap-[0.1875rem] lg:grid-cols-2">
            <article className="flex h-full flex-col rounded-2xl bg-card p-6 text-foreground sm:p-8">
              <img
                src="/shapes/10-day-trial.png"
                alt="10 day trial, no credit card required"
                width={1574}
                height={586}
                className="mx-auto w-full max-w-[34rem]"
              />
              <div className="mt-auto flex flex-col items-center pt-8 text-center">
                <Button
                  href={GET_PRO}
                  size="lg"
                  magnetic
                  iconRight={<ArrowRight className="size-5" />}
                >
                  Choose trial now
                </Button>
                <p className="mt-3 text-sm font-semibold text-muted">
                  Use it first. Pay later.
                </p>
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
                <h2 className="mt-3 font-display text-3xl text-balance sm:text-4xl">
                  Try ArraySubs Pro without second thoughts.
                </h2>
                <p className="mt-4 text-muted text-pretty">
                  If the Pro workflow is not the right fit, request a refund
                  within 30 days. No drawn-out review, no pressure to stay.
                </p>
              </div>
            </article>
          </div>
        </Container>
      </Section>

      {/* ---- Workflow map ----------------------------------------------- */}
      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Workflow map"
            title="From first product to protected revenue"
            subtitle="Use the features in sequence, or turn on only the parts your store needs today."
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] md:grid-cols-4">
            {SETUP_STEPS.map((step, index) => (
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

      {/* ---- Free vs Pro availability ----------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Free vs Pro"
            title="What's in each plan"
            subtitle={`Every capability compared, Pro-only upgrades first. A tick in the Free column ships in the free core; Pro adds automatic billing, failed-payment recovery, store credit, the checkout builder, and deeper insight — ${PRO_ONLY_MODULE_COUNT} Pro-only upgrades in all.`}
            align="center"
          />
          <div className="mt-12">
            <FreeVsProTable />
          </div>
        </Container>
      </Section>

      {/* ---- Toolkit callout -------------------------------------------- */}
      <Section surface="highlight" spacing="md">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <Eyebrow>Site access toolkit</Eyebrow>
              <h2 className="mt-4 font-display text-4xl text-balance text-dark sm:text-display-sm">
                Site access is now a first-class section.
              </h2>
              <p className="mt-5 text-lg leading-8 text-dark/80 text-pretty">
                These features clean up WordPress for customer-facing subscription
                sites: guide setup, shape checkout and My Account pages, hide
                backend chrome, route logins properly, support customers by
                impersonating their portal, and enforce session limits with Pro.
              </p>
            </div>
            <div className="grid gap-[0.1875rem] sm:grid-cols-2">
              {featuresByCategory("site-access-toolkit").map((feature) => (
                <IconCard
                  key={feature.slug}
                  icon={<feature.icon className="size-6" />}
                  title={feature.name}
                  description={feature.cardDescription}
                  badge={featureBadges(feature)}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- FAQ -------------------------------------------------------- */}
      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="FAQ"
            title="Feature questions, answered"
            align="center"
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion items={FAQ_ITEMS} defaultOpen={[0]} />
          </div>
        </Container>
        <JsonLd data={faqSchema(FAQ_ITEMS)} />
      </Section>

      {/* ---- CTA -------------------------------------------------------- */}
      <Section surface="primary" spacing="md">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="Pro upgrade"
            title="Unlock the complete Pro stack"
            subtitle="Install the free core today, then activate Pro when you need advanced features, automation, analytics, and payment workflows."
            microcopy="No credit card required · Annual and lifetime options available"
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
                  Start Trial
                </Button>
                <Button
                  href="#all-modules"
                  variant="outline"
                  size="lg"
                  layers="2layer"
                  magnetic
                  iconRight={<Check className="size-5" />}
                >
                  Review features
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
