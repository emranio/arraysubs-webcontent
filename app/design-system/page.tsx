import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Download,
  HeartHandshake,
  LayoutGrid,
  Repeat,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { createMetadata } from "@/lib/seo";
import { siteColors } from "@/lib/colors";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import {
  Accordion,
  ArrayHashMark,
  Badge,
  BigText,
  Button,
  Checkbox,
  Container,
  CTA,
  Eyebrow,
  Field,
  IconCard,
  Input,
  OfferCard,
  Statement,
  StepCard,
  TagCard,
  LeadForm,
  Manifesto,
  type ManifestoLine,
  MultiStepForm,
  Multiselect,
  Range,
  RadioGroup,
  Section,
  SectionTitle,
  Select,
  Slider,
  Switch,
  Tabs,
  Testimonials,
  Textarea,
} from "@/components/ui";

export const metadata: Metadata = createMetadata({
  title: "Design System",
  description:
    "The ArrayHash design system — reusable, accessible, SEO-ready building blocks: typography, color, buttons, cards, accordions, tabs, sliders, forms and motion.",
  path: "/",
  noindex: true,
});

const BRAND_COLORS: [string, string, string][] = [
  ["Highlight", "--color-highlight", siteColors.highlight],
  ["Primary", "--color-primary", siteColors.primary],
  ["Primary strong", "--color-primary-strong", siteColors.primaryStrong],
  ["Dark", "--color-dark", siteColors.dark],
  ["Dark 2", "--color-dark-2", siteColors.dark2],
];

const NEUTRAL_COLORS: [string, string, string][] = [
  ["Background", "--color-background", siteColors.background],
  ["Card", "--color-card", siteColors.card],
  ["Surface", "--color-surface", siteColors.surface],
  ["Foreground", "--color-foreground", siteColors.foreground],
  ["Muted", "--color-muted", siteColors.muted],
  ["Faint", "--color-faint", siteColors.faint],
  ["Dark edge", "--color-dark-edge", siteColors.darkEdge],
  ["Border", "--color-border", siteColors.border],
  ["Border strong", "--color-border-strong", siteColors.borderStrong],
];

const FEEDBACK_COLORS: [string, string, string][] = [
  ["Danger", "--color-danger", siteColors.danger],
  ["Success", "--color-success", siteColors.success],
];

const DISPLAY_SIZES: [string, string][] = [
  ["text-display-xl", "Aa"],
  ["text-display-lg", "Subscriptions"],
  ["text-display", "Memberships"],
  ["text-display-sm", "Retention flows"],
];

const TEXT_SCALE: [string, string][] = [
  ["text-6xl", "The quick brown fox"],
  ["text-5xl", "The quick brown fox"],
  ["text-4xl", "The quick brown fox jumps"],
  ["text-3xl", "The quick brown fox jumps over"],
  ["text-2xl", "The quick brown fox jumps over the lazy dog"],
  ["text-xl", "The quick brown fox jumps over the lazy dog"],
  ["text-lg", "The quick brown fox jumps over the lazy dog"],
  ["text-base", "The quick brown fox jumps over the lazy dog"],
  ["text-sm", "The quick brown fox jumps over the lazy dog"],
  ["text-xs", "The quick brown fox jumps over the lazy dog"],
];

const FEATURES = [
  {
    icon: <Repeat className="size-6" />,
    title: "Subscriptions",
    description:
      "Turn any product into a simple or variable subscription with trials, sign-up fees and flexible billing cycles.",
    badge: <Badge tone="primary">Free</Badge>,
  },
  {
    icon: <ShieldCheck className="size-6" />,
    title: "Member access",
    description:
      "Restrict content, products and downloads with a 10-condition rules engine and automatic role mapping.",
    badge: <Badge tone="primary">Free</Badge>,
  },
  {
    icon: <HeartHandshake className="size-6" />,
    title: "Retention flow",
    description:
      "Intercept cancellations with targeted offers — discount, pause, downgrade or support. A category first.",
    badge: <Badge tone="primary">Free</Badge>,
  },
  {
    icon: <Wallet className="size-6" />,
    title: "Store credit",
    description:
      "A virtual wallet with 8 credit sources, auto-apply to renewals and checkout, plus expiry management.",
    badge: <Badge tone="dark">Pro</Badge>,
  },
  {
    icon: <BarChart3 className="size-6" />,
    title: "Analytics",
    description:
      "40+ reports and 10 KPI cards — MRR, churn, ARPU and trial conversions — with retention analytics.",
    badge: <Badge tone="dark">Pro</Badge>,
  },
  {
    icon: <LayoutGrid className="size-6" />,
    title: "Checkout builder",
    description:
      "Drag-and-drop checkout with 27 field types, multi-step layouts and conditional logic. No code.",
    badge: <Badge tone="dark">Pro</Badge>,
  },
];

const FAQ_ITEMS = [
  {
    question: "Is ArraySubs really free?",
    answer:
      "Yes. The core plugin is free on WordPress.org — not a time-limited trial. You get subscriptions, member access, recurring billing, the customer portal and the Retention Flow Builder at no cost.",
  },
  {
    question: "What does ArraySubs Pro add?",
    answer:
      "Store credit, the checkout builder, automatic payments (Stripe, PayPal, Paddle), advanced analytics, audit logs, the feature manager and more.",
  },
  {
    question: "Does it support Stripe, PayPal and Paddle?",
    answer:
      "Free supports manual renewals with any WooCommerce gateway. Pro adds automatic recurring payments with Stripe (SCA/3DS), PayPal billing agreements and Paddle as merchant of record.",
  },
  {
    question: "Can I use memberships without subscriptions?",
    answer:
      "Absolutely. Member access control — content restriction, role mapping, URL restriction and member discounts — works independently of subscription billing.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We replaced two plugins with ArraySubs. The Retention Flow alone made switching worth it.",
    name: "Early adopter",
    context: "SaaS / Membership site",
  },
  {
    quote:
      "The setup wizard had us running in under 10 minutes. Easiest subscription plugin to configure.",
    name: "Early adopter",
    context: "Subscription box",
  },
  {
    quote:
      "Skip, pause and renewal sync are features I couldn't find in any free plugin. All built in.",
    name: "Early adopter",
    context: "Online courses",
  },
  {
    quote:
      "Store credit turned our refunds into retained revenue. Lifetime value went up immediately.",
    name: "Early adopter",
    context: "Service business",
  },
];

const FEATURE_OPTIONS = [
  { label: "Subscriptions", value: "subscriptions" },
  { label: "Memberships", value: "memberships" },
  { label: "Store credit", value: "store-credit" },
  { label: "Analytics", value: "analytics" },
  { label: "Retention flow", value: "retention" },
];

const MANIFESTO_LINES: ManifestoLine[] = [
  [
    { type: "text", text: "The" },
    {
      type: "pill",
      icon: <Repeat className="size-6 sm:size-8 lg:size-10" />,
      label: "Recurring",
      color: "highlight",
    },
    { type: "text", text: "Complete Subscription", color: "highlight" },
  ],
  [
    { type: "text", text: "& Membership" },
    {
      type: "pill",
      icon: <ShieldCheck className="size-6 sm:size-8 lg:size-10" />,
      label: "Members",
      color: "gold",
    },
    { type: "text", text: "Engine for", color: "gold" },
  ],
  [
    { type: "text", text: "Ambitious" },
    {
      type: "pill",
      icon: <HeartHandshake className="size-6 sm:size-8 lg:size-10" />,
      label: "Retention",
      color: "primary",
    },
    { type: "text", text: "WooCommerce", color: "highlight" },
  ],
  [
    { type: "text", text: "Stores", color: "gold" },
    {
      type: "pill",
      icon: <BarChart3 className="size-6 sm:size-8 lg:size-10" />,
      label: "Analytics",
      color: "white",
    },
    { type: "text", text: "Today!" },
  ],
];

const WPORG_REVIEWS = [
  {
    quote:
      "Working with ArraySubs has been a game-changer for our store. The Retention Flow alone saved more subscriptions than we expected — and the free tier covers more than our old paid stack.",
    name: "Esther Howard",
    context: "WooCommerce store owner",
    rating: 5,
  },
  {
    quote:
      "The setup wizard had us live in under ten minutes. Skip, pause and renewal sync are features I couldn't find in any other free subscription plugin.",
    name: "Marvin McKinney",
    context: "Subscription box founder",
    rating: 5,
  },
  {
    quote:
      "One plugin replaced four. Subscriptions, memberships, store credit and analytics finally share the same data layer — zero conflicts since we switched.",
    name: "Jenny Wilson",
    context: "Membership site owner",
    rating: 5,
  },
];

export default function DesignSystemPage() {
  return (
    <>
      {/* ---- Page intro ------------------------------------------------- */}
      <Section
        spacing="none"
        surface="surface"
        className="flex min-h-[44rem] items-center pt-28 pb-16 sm:pt-32 sm:pb-20 lg:min-h-[50rem]"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:items-start">
            <div className="lg:pt-3">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                <ArrayHashMark className="text-[0.95em]" />
                <span>arraysubs</span>
                <span aria-hidden="true" className="text-muted">
                  /
                </span>
                <span className="text-foreground">features</span>
              </p>
            </div>

            <div>
              <h1 className="font-display text-6xl leading-none font-semibold text-primary [text-wrap:wrap] sm:text-[5rem] lg:text-[5.875rem] xl:text-[6.5rem]">
                Everything You Need to Run Subscriptions &amp; Memberships on
                WooCommerce
              </h1>

              <p className="mt-10 text-lg leading-8 text-dark [text-wrap:wrap] sm:text-xl">
                ArraySubs combines subscription billing, membership access,
                retention tooling, checkout control, analytics, and plan
                entitlements in one WooCommerce-first product. Start with the
                generous free tier, then layer on Pro when you need deeper
                automation and growth features.
              </p>

              <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-dark sm:text-base">
                {[
                  "Free subscriptions + memberships",
                  "Manual renewals with any WooCommerce gateway",
                  "Single plugin instead of a stitched stack",
                  "Pro adds automation, credit, analytics, and entitlements",
                ].map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 text-pretty"
                  >
                    <ArrayHashMark className="text-[0.78em] opacity-75" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-11 flex flex-wrap items-center gap-4">
                <Button size="lg" magnetic>
                  Live Demo
                </Button>
                <Button variant="outline" size="lg" magnetic>
                  Get Pro Free for 4 Months
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Foundations: color ---------------------------------------- */}
      <Section id="foundations" surface="surface">
        <Container>
          <SectionTitle
            eyebrow="Foundations"
            title="Color"
            subtitle="A focused purple palette built from #873EFF. Primary carries actions, light tints carry soft surfaces, and the dark purple anchors text and dark sections."
          />
          <div className="mt-12 flex flex-col gap-10">
            <ColorGroup title="Brand" colors={BRAND_COLORS} />
            <ColorGroup title="Neutral" colors={NEUTRAL_COLORS} />
            <ColorGroup title="Feedback" colors={FEEDBACK_COLORS} />
          </div>
        </Container>
      </Section>

      {/* ---- Foundations: typography ----------------------------------- */}
      <Section id="typography">
        <Container>
          <SectionTitle
            eyebrow="Foundations"
            title="Typography"
            subtitle="Funnel Display for headings, Funnel Sans for body. The display scale uses fluid clamp() sizing; the text scale is a fixed rem ramp."
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="mb-6 text-sm font-semibold tracking-wider text-muted uppercase">
                Display scale
              </h3>
              <div className="flex flex-col gap-6">
                {DISPLAY_SIZES.map(([label, sample]) => (
                  <div key={label}>
                    <code className="text-xs text-faint">{label}</code>
                    <p className={cn("font-display leading-none", label)}>
                      {sample}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-sm font-semibold tracking-wider text-muted uppercase">
                Text scale
              </h3>
              <div className="flex flex-col divide-y divide-border">
                {TEXT_SCALE.map(([label, sample]) => (
                  <div
                    key={label}
                    className="grid items-baseline gap-1 py-3 sm:grid-cols-[7rem_1fr]"
                  >
                    <code className="text-xs text-faint">{label}</code>
                    <p className={cn("truncate", label)}>{sample}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Prose elements */}
          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold tracking-wider text-muted uppercase">
                Body &amp; inline
              </h3>
              <p className="text-lg">
                This is a lead paragraph. ArraySubs is the only WooCommerce
                plugin that combines subscriptions, memberships, store credit and
                retention in <span className="marker-highlight">one solution</span>.
              </p>
              <p className="text-muted">
                This is muted secondary text used for descriptions and supporting
                copy. It pairs with <a className="font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:decoration-dark" href="#components">inline links</a>, <strong>strong emphasis</strong> and <em>italics</em>.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold tracking-wider text-muted uppercase">
                Lists &amp; quote
              </h3>
              <ul className="flex list-disc flex-col gap-1 pl-5 text-muted marker:text-primary-strong">
                <li>Subscriptions &amp; recurring products</li>
                <li>Member access control</li>
                <li>Retention flow builder</li>
              </ul>
              <blockquote className="border-l-4 border-primary pl-4 text-lg text-pretty italic">
                “Replace your entire WooCommerce subscription and membership
                plugin stack with one free solution.”
              </blockquote>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Big display text (scroll-fill) ---------------------------- */}
      <Section id="big-text" surface="surface">
        <Container>
          <SectionTitle
            eyebrow="Foundations"
            title="Big text"
            subtitle="Oversized display headings that ink in with color as they scroll into view (scrubbed background-clip fill). Scroll slowly to watch it fill."
          />
          <div className="mt-12 flex flex-col gap-10">
            <BigText size="display-xl">Subscriptions, solved.</BigText>
            <BigText size="display-lg" variant="primary">
              Built to grow your business at max.
            </BigText>
          </div>
        </Container>
      </Section>

      {/* ---- Components: buttons --------------------------------------- */}
      <Section id="components">
        <Container>
          <SectionTitle
            eyebrow="Components"
            title="Buttons"
            subtitle="One Button component. Variants are named by style; sizes and icons are props. Hover any button to feel the GSAP magnet effect."
          />

          <div className="mt-12 flex flex-col gap-10">
            <DemoRow label="Variants">
              <Button variant="primary" magnetic>
                Primary
              </Button>
              <Button variant="dark" magnetic>
                Dark
              </Button>
              <Button variant="highlight" magnetic>
                Highlight
              </Button>
              <Button variant="outline" magnetic>
                Outline
              </Button>
              <Button variant="ghost" magnetic>
                Ghost
              </Button>
            </DemoRow>

            <DemoRow label="Sizes">
              <Button size="sm" magnetic>
                Small
              </Button>
              <Button size="md" magnetic>
                Medium
              </Button>
              <Button size="lg" magnetic>
                Large
              </Button>
            </DemoRow>

            <DemoRow label="With icons">
              <Button iconRight={<ArrowRight className="size-5" />} magnetic>
                Get Pro — Free
              </Button>
              <Button
                variant="outline"
                magnetic
                iconLeft={<Download className="size-5" />}
              >
                Download
              </Button>
            </DemoRow>

            <DemoRow label="States">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>
                Disabled
              </Button>
              <a
                href="#components"
                className="font-semibold text-primary underline decoration-current underline-offset-4"
              >
                As a link
              </a>
            </DemoRow>
          </div>
        </Container>
      </Section>

      {/* ---- Components: section titles + icon cards ------------------- */}
      <Section id="cards" surface="surface">
        <Container>
          <SectionTitle
            eyebrow="Components"
            title="Section titles &amp; icon cards"
            subtitle="SectionTitle composes an eyebrow, heading and sub text with left or center alignment. IconCard is a reusable, optionally linked card."
            align="center"
          />
          <ScrollReveal
            stagger={0.08}
            className="mt-14 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3"
          >
            {FEATURES.map((feature) => (
              <IconCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                badge={feature.badge}
                href="#components"
              />
            ))}
          </ScrollReveal>
        </Container>
      </Section>

      {/* ---- Components: offer cards ----------------------------------- */}
      <Section id="offer-cards">
        <Container>
          <SectionTitle
            eyebrow="Components"
            title="Offer cards"
            subtitle="Numbered tier / package cards with a title, eyebrow, footer stat and arrow CTA. Hover a card for the number chip and filled arrow."
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2">
            <OfferCard
              number={1}
              badge="Free forever"
              title="ArraySubs Free Core"
              eyebrow="Always shipping on WordPress.org"
              description="The foundation for any subscription store — recurring billing, member access, the customer portal and the Retention Flow Builder, free forever."
              metaLabel="Price"
              metaValue="$0"
              metaSuffix="forever"
              href="#cta"
              cta="Download the free plugin"
            />
            <OfferCard
              number={2}
              badge="Limited early access"
              title="ArraySubs Pro"
              eyebrow="Unlock the full subscription stack"
              description="Adds store credit, the visual checkout builder, automatic payments (Stripe / PayPal / Paddle), advanced analytics and audit logs."
              metaLabel="Early access"
              metaValue="4 months"
              metaSuffix="free"
              href="#cta"
              cta="Claim a Pro license"
            />
          </div>
        </Container>
      </Section>

      {/* ---- Components: step cards ------------------------------------ */}
      <Section id="step-cards" surface="surface">
        <Container>
          <SectionTitle
            eyebrow="Components"
            title="Step cards"
            subtitle="Numbered process steps for engagement flows, onboarding or how-it-works rows. Hover any card to lift it and fill the outlined number."
          />
          <ScrollReveal
            stagger={0.08}
            y={0}
            className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-4"
          >
            <StepCard
              number={1}
              title="30-min fit call"
              description="We learn your store, your stack and what you're trying to ship. If we're not a fit, we say so up front."
            />
            <StepCard
              number={2}
              title="1-page proposal"
              description="Scope, deliverables, timeline and license terms. No fluff — sent within 48 hours."
            />
            <StepCard
              number={3}
              title="Kickoff in 7 days"
              description="Async-first, weekly steering and daily Slack overlap. Your team stays in the loop, never blocked."
            />
            <StepCard
              number={4}
              title="Ship → review → refund window"
              description="Day 14 you decide: keep going, adjust scope, or walk with a full refund."
            />
          </ScrollReveal>
        </Container>
      </Section>

      {/* ---- Components: tag cards ------------------------------------- */}
      <Section id="tag-cards">
        <Container>
          <SectionTitle
            eyebrow="Components"
            title="Tag cards"
            subtitle="Tag-pill feature tiles in a quiet grid with subtle card surfaces. Hover any cell to watch it fill with the dark state."
          />
          <div className="mt-12">
            <div className="grid overflow-hidden rounded-2xl gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-4">
              <TagCard
                bare
                tag="Battle-tested"
                title="Subscriptions at scale"
                description="Simple and variable products, trials, sign-up fees and per-variation billing — proven on real WooCommerce stores."
                href="#tag-cards"
              />
              <TagCard
                bare
                tag="Day-one stack"
                title="Member access"
                description="A 10-condition rules engine with role mapping, content dripping and four URL pattern types — no add-ons required."
                href="#tag-cards"
              />
              <TagCard
                bare
                tag="ROI-first"
                title="Retention flow"
                description="Intercept cancellations with targeted offers — discount, pause, downgrade or support. A category first, free in the core."
                href="#tag-cards"
              />
              <TagCard
                bare
                tag="Edge"
                title="Analytics & audits"
                description="40+ reports, 10 KPI cards, a 21-event audit timeline and a gateway health dashboard."
                href="#tag-cards"
              />
              <TagCard
                bare
                tag="Specialty"
                title="Store credit"
                description="A virtual wallet with 8 credit sources, auto-apply to renewals and checkout, plus expiry management."
                href="#tag-cards"
              />
              <TagCard
                bare
                tag="Cost-aware"
                title="Checkout builder"
                description="Drag-and-drop checkout with 27 field types, multi-step layouts and conditional logic. No code."
                href="#tag-cards"
              />
              <TagCard
                bare
                tag="Recurring"
                title="Automatic payments"
                description="Stripe, PayPal and Paddle with SCA/3DS, billing agreements and merchant-of-record support."
                href="#tag-cards"
              />
              <TagCard
                bare
                tag="C-level"
                title="Customer portal"
                description="Self-service skip, pause, plan switch, cancel and reactivate — fewer support tickets, happier members."
                href="#tag-cards"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Components: accordion + tabs ------------------------------ */}
      <Section id="accordion">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionTitle
                eyebrow="Components"
                title="Accordion"
                size="md"
                subtitle="Accessible disclosure list with keyboard support and animated panels."
              />
              <div className="mt-8">
                <Accordion items={FAQ_ITEMS} defaultOpen={[0]} />
              </div>
            </div>
            <div>
              <SectionTitle
                eyebrow="Components"
                title="Tabs"
                size="md"
                subtitle="WAI-ARIA tabs with arrow-key navigation and a fade-in panel."
              />
              <div className="mt-8">
                <Tabs
                  label="Plugin overview"
                  tabs={[
                    {
                      label: "Overview",
                      content: (
                        <p className="text-muted">
                          ArraySubs combines subscriptions, memberships, billing,
                          retention, store credit and analytics into a single
                          WooCommerce plugin with a generous free tier.
                        </p>
                      ),
                    },
                    {
                      label: "Features",
                      content: (
                        <ul className="flex list-disc flex-col gap-1 pl-5 text-muted marker:text-primary-strong">
                          <li>15 integrated modules</li>
                          <li>Retention Flow Builder (free)</li>
                          <li>Stripe, PayPal &amp; Paddle (Pro)</li>
                        </ul>
                      ),
                    },
                    {
                      label: "Pricing",
                      content: (
                        <p className="text-muted">
                          The core is free forever. Pro is currently free for 4
                          months in early access — no credit card required.
                        </p>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Components: slider ---------------------------------------- */}
      <Section id="slider" surface="surface">
        <Container>
          <SectionTitle
            eyebrow="Components"
            title="Slider"
            subtitle="A touch-friendly, accessible carousel built on native scroll-snap with labelled controls."
          />
          <div className="mt-12">
            <Slider label="What early adopters say">
              {TESTIMONIALS.map((item, i) => (
                <figure
                  key={i}
                  className="flex h-full flex-col justify-between gap-6 rounded-xl bg-card p-6 text-foreground"
                >
                  <blockquote className="text-lg text-pretty">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="inline-block size-10 rounded-full bg-primary"
                    />
                    <span className="flex flex-col">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-muted">{item.context}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </Slider>
          </div>
        </Container>
      </Section>

      {/* ---- Feature manifesto (dark editorial section) ----------------- */}
      <Manifesto id="manifesto" lines={MANIFESTO_LINES} />

      {/* ---- Editorial statement -------------------------------------- */}
      <Section id="statement" surface="surface">
        <Container>
          <Statement
            eyebrow="Statement"
            heading={[
              { text: "Built for stores that " },
              { text: "ship subscriptions, memberships and retention", italic: true },
              { text: " — without the " },
              { text: "plugin sprawl.", italic: true },
            ]}
            description="We obsess over the unglamorous stuff so your stack stays small, your data stays clean, and your team ships features instead of patching plugin conflicts."
            cta={
              <Button
                variant="dark"
                size="md"
                magnetic
                iconRight={<ArrowUpRight className="size-5" />}
              >
                Learn more
              </Button>
            }
          />
        </Container>
      </Section>

      {/* ---- Testimonials (WordPress.org reviews) ---------------------- */}
      <Section id="testimonials">
        <Container>
          <Testimonials items={WPORG_REVIEWS} />
        </Container>
      </Section>

      {/* ---- Forms ----------------------------------------------------- */}
      <Section id="forms" surface="surface">
        <Container>
          <SectionTitle
            eyebrow="Components"
            title="Forms"
            subtitle="Accessible form primitives — Field wires labels, descriptions, errors and ARIA automatically. The lead form validates and confirms inline."
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <h3 className="text-sm font-semibold tracking-wider text-muted uppercase">
                Inputs
              </h3>
              <Field label="Text input" description="A standard single-line input.">
                <Input placeholder="jane@store.com" />
              </Field>
              <Field label="Select (custom)">
                <Select placeholder="Choose a feature…" options={FEATURE_OPTIONS} />
              </Field>
              <Field label="Multi-select (custom)">
                <Multiselect
                  placeholder="Pick a few features…"
                  defaultValue={["subscriptions"]}
                  options={FEATURE_OPTIONS}
                />
              </Field>
              <Field label="Textarea">
                <Textarea placeholder="Tell us about your store…" />
              </Field>
              <Field label="Range slider">
                <Range defaultValue={60} aria-label="Example range" />
              </Field>
              <Field
                label="Invalid example"
                required
                error="Please enter a valid value."
              >
                <Input defaultValue="not-an-email" />
              </Field>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-sm font-semibold tracking-wider text-muted uppercase">
                Toggles &amp; choices
              </h3>
              <RadioGroup
                legend="Billing cycle"
                name="cycle-demo"
                defaultValue="monthly"
                options={[
                  { label: "Monthly", value: "monthly" },
                  { label: "Yearly — save 20%", value: "yearly" },
                ]}
              />
              <div className="flex flex-col gap-4">
                <Switch
                  label="Automatic renewals"
                  description="Charge the saved method each cycle."
                  defaultChecked
                />
                <Switch label="Email me product updates" />
              </div>
              <div className="flex flex-col gap-3">
                <Checkbox
                  label="I agree to the terms and conditions."
                  defaultChecked
                />
                <Checkbox label="Subscribe to the newsletter." />
              </div>
            </div>
          </div>

          <div className="mt-12 grid items-start gap-12 lg:grid-cols-2">
            <div id="lead-capture" className="flex flex-col gap-6 scroll-mt-32">
              <h3 className="text-sm font-semibold tracking-wider text-muted uppercase">
                Lead capture
              </h3>
              <div className="rounded-2xl bg-card p-6 text-foreground sm:p-8">
                <LeadForm />
              </div>
            </div>
            <div id="multistep" className="flex flex-col gap-6 scroll-mt-32">
              <h3 className="text-sm font-semibold tracking-wider text-muted uppercase">
                Multi-step form
              </h3>
              <MultiStepForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Motion: scroll tone sequence ------------------------------ */}
      <Section
        id="scroll-bg"
        surface="transparent"
        scrollBg="surface"
        className="flex min-h-screen items-center"
      >
        <Container>
          <div className="grid items-end gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="max-w-2xl">
              <Eyebrow>Motion pattern</Eyebrow>
              <h2 className="mt-5 font-display text-display-sm text-balance">
                A tone shift for each decision point
              </h2>
              <p className="mt-5 text-lg text-pretty opacity-75 sm:text-xl">
                Use the page surface as a pacing device: quiet for overview,
                dark for risk, bright for action, then clean again for the next
                workflow.
              </p>
            </div>

            <div className="grid gap-[0.1875rem] sm:grid-cols-3">
              <MotionPanel label="01" title="Overview">
                Start with a low-contrast surface that keeps product detail easy
                to scan.
              </MotionPanel>
              <MotionPanel label="02" title="Risk">
                Shift into a focused state when churn, payment failure or access
                changes need attention.
              </MotionPanel>
              <MotionPanel label="03" title="Action">
                Move into the offer moment without adding extra visual chrome.
              </MotionPanel>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        surface="transparent"
        scrollBg="dark"
        className="flex min-h-screen items-center"
      >
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.18em] uppercase opacity-65">
                <span>02</span>
                <ArrayHashMark className="text-[0.9em]" />
                <span>Risk window</span>
              </p>
              <h2 className="mt-5 font-display text-display-sm text-balance">
                Put the critical state in its own room
              </h2>
              <p className="mt-5 max-w-xl text-lg text-pretty opacity-75 sm:text-xl">
                A darker tone is reserved for moments where the store owner must
                understand impact before choosing a save path.
              </p>
            </div>

            <div className="grid gap-[0.1875rem] md:grid-cols-3">
              <MotionPanel label="Signal" title="Cancel intent">
                Plan, billing cycle and customer history stay visible before the
                choice is made.
              </MotionPanel>
              <MotionPanel label="Impact" title="Revenue at risk">
                The number is framed plainly, without a chart competing for
                attention.
              </MotionPanel>
              <MotionPanel label="Next" title="Save path">
                The action appears after context, not before it.
              </MotionPanel>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        surface="transparent"
        scrollBg="highlight"
        className="flex min-h-screen items-center"
      >
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <div className="grid gap-[0.1875rem] sm:grid-cols-2">
              <MotionPanel label="Offer" title="Pause">
                Give the customer a lower-friction option when cancellation is
                about timing.
              </MotionPanel>
              <MotionPanel label="Offer" title="Downgrade">
                Keep access alive with a smaller commitment.
              </MotionPanel>
              <MotionPanel label="Offer" title="Discount">
                Use sparingly, with the reason and expiry attached.
              </MotionPanel>
              <MotionPanel label="Offer" title="Support">
                Route complex cases to a human before the subscription is lost.
              </MotionPanel>
            </div>

            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.18em] uppercase opacity-65">
                <span>03</span>
                <ArrayHashMark className="text-[0.9em]" />
                <span>Action surface</span>
              </p>
              <h2 className="mt-5 font-display text-display-sm text-balance">
                Let the offer moment feel lighter
              </h2>
              <p className="mt-5 max-w-xl text-lg text-pretty opacity-75 sm:text-xl">
                The bright stage signals that the user has moved from diagnosis
                into a choice set.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        surface="transparent"
        scrollBg="light"
        className="flex min-h-[80vh] items-center"
      >
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.18em] uppercase opacity-65">
                <span>04</span>
                <ArrayHashMark className="text-[0.9em]" />
                <span>Reset</span>
              </p>
              <h2 className="mt-5 font-display text-display-sm text-balance">
                Return to the workspace
              </h2>
              <p className="mt-5 max-w-xl text-lg text-pretty opacity-75 sm:text-xl">
                Once the decision is complete, the interface settles back into
                the standard light surface so the next task is easy to read.
              </p>
            </div>

            <div className="grid gap-[0.1875rem] sm:grid-cols-3">
              <MotionPanel label="State" title="Readable">
                Text uses the page foreground, so the section stays legible
                throughout the sequence.
              </MotionPanel>
              <MotionPanel label="Motion" title="Reduced">
                Motion-sensitive users get instant tone changes instead of
                animated tweens.
              </MotionPanel>
              <MotionPanel label="System" title="Reusable">
                Any section can opt into the sequence with the same surface
                tokens.
              </MotionPanel>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Final CTA ------------------------------------------------- */}
      <Section id="cta" surface="primary">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="Get started"
            title="Get ArraySubs Pro free for 4 months"
            subtitle="No strings attached. We'll send your license key immediately — no credit card required."
            actions={
              <>
                <Button variant="dark" size="lg" layers="2layer" magnetic>
                  Claim My Free Pro License
                </Button>
                <Button variant="outline" size="lg" layers="2layer" magnetic>
                  Live Demo
                </Button>
              </>
            }
          />
        </Container>
      </Section>
    </>
  );
}

/* ============================================================================
   Local presentational helpers (page-only)
   ========================================================================== */

function ColorGroup({
  title,
  colors,
}: {
  title: string;
  colors: [string, string, string][];
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold tracking-wider text-muted uppercase">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {colors.map(([name, varName, hex]) => (
          <div
            key={varName}
            className="overflow-hidden rounded-lg bg-card text-foreground"
          >
            <div className="h-20" style={{ backgroundColor: `var(${varName})` }} />
            <div className="flex flex-col gap-0.5 p-3">
              <span className="text-sm font-medium">{name}</span>
              <span className="text-xs text-faint">{hex}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-[8rem_1fr] sm:items-center">
      <code className="text-xs text-faint">{label}</code>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

function MotionPanel({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-card p-6 text-foreground">
      <p className="text-xs font-semibold tracking-[0.18em] uppercase opacity-60">
        {label}
      </p>
      <h3 className="mt-4 font-display text-2xl leading-tight font-bold text-balance">
        {title}
      </h3>
      <p className="mt-3 text-base text-pretty opacity-75">{children}</p>
    </div>
  );
}
