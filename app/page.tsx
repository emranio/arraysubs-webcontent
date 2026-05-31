import type { Metadata } from "next";
import {
  ArrowRight,
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
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import {
  Accordion,
  Badge,
  BigText,
  Breadcrumbs,
  Button,
  Checkbox,
  Container,
  CTA,
  Eyebrow,
  Field,
  Hero,
  IconCard,
  Input,
  OfferCard,
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
  ["Highlight", "--color-highlight", "#e1ff51"],
  ["Primary", "--color-primary", "#c2e82e"],
  ["Primary strong", "--color-primary-strong", "#a9d016"],
  ["Dark", "--color-dark", "#01171a"],
  ["Dark 2", "--color-dark-2", "#013b43"],
];

const NEUTRAL_COLORS: [string, string, string][] = [
  ["Background", "--color-background", "#ffffff"],
  ["Surface", "--color-surface", "#f5f8f2"],
  ["Surface 2", "--color-surface-2", "#eef2e8"],
  ["Foreground", "--color-foreground", "#01171a"],
  ["Muted", "--color-muted", "#4a5f63"],
  ["Faint", "--color-faint", "#7c8f92"],
  ["Border", "--color-border", "#e3e9e3"],
  ["Border strong", "--color-border-strong", "#c9d3cb"],
];

const FEEDBACK_COLORS: [string, string, string][] = [
  ["Danger", "--color-danger", "#c2362b"],
  ["Success", "--color-success", "#1f7a4d"],
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
      <Section spacing="md" className="pt-28 sm:pt-32">
        <Container>
          <Breadcrumbs
            className="mb-8"
            items={[
              { name: "Home", href: "/" },
              { name: "Design System", href: "/" },
            ]}
          />
          <Eyebrow>Foundations &amp; components</Eyebrow>
          <h1 className="mt-5 font-display text-display-sm text-balance sm:text-display">
            The ArrayHash Design System
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted text-pretty sm:text-xl">
            A living library of reusable, accessible, SEO-ready building blocks.
            Every element is generically named, variant-driven and 100% reusable
            on any page — built with Funnel Display, Funnel Sans and rem units.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Badge tone="dark">Light mode</Badge>
            <Badge tone="neutral">1400px container</Badge>
            <Badge tone="neutral">rem units</Badge>
            <Badge tone="outline">WCAG-minded</Badge>
            <Badge tone="primary">GSAP motion</Badge>
          </div>
        </Container>
      </Section>

      {/* ---- Foundations: color ---------------------------------------- */}
      <Section id="foundations" surface="surface">
        <Container>
          <SectionTitle
            eyebrow="Foundations"
            title="Color"
            subtitle="A focused palette built from the lime highlight and the deep teal dark. Primary is a deeper highlight for actions; the dark anchors text and dark sections."
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
              <Button href="#components" variant="ghost" magnetic>
                As a link
              </Button>
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
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
            subtitle="Numbered tier / package cards with a title, eyebrow, footer stat and arrow CTA. Mark one as featured to set it apart with a primary border, a lime number chip and a filled arrow."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
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
              featured
              href="#cta"
              cta="Claim a Pro license"
            />
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
                  className="flex h-full flex-col justify-between gap-6 rounded-xl border border-border bg-background p-6"
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

      {/* ---- Testimonials (WordPress.org reviews) ---------------------- */}
      <Section id="testimonials">
        <Container>
          <Testimonials items={WPORG_REVIEWS} />
        </Container>
      </Section>

      {/* ---- Components: CTA panels ------------------------------------ */}
      <Section id="cta-panels">
        <Container>
          <SectionTitle
            eyebrow="Components"
            title="Call to action"
            subtitle="The CTA band is a single reusable component with surface variants."
          />
          <div className="mt-12 grid gap-8">
            <CTA
              surface="dark"
              eyebrow="Early access"
              title="Start building your subscription business today"
              subtitle="Install the free core, run the wizard, and have your first subscription live in minutes."
              actions={
                <>
                  <Button
                    variant="primary"
                    size="lg"
                    magnetic
                    iconRight={<ArrowRight className="size-5" />}
                  >
                    Get Pro — Free
                  </Button>
                  <Button variant="outline" size="lg">
                    Live Demo
                  </Button>
                </>
              }
              microcopy="Free forever. No credit card required."
            />
          </div>
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
              <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
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

      {/* ---- Motion: hero --------------------------------------------- */}
      <Section id="motion">
        <Container>
          <SectionTitle
            eyebrow="Patterns"
            title="Hero"
            subtitle="The landing hero used by the homepage and product landing pages (no breadcrumb). Move your cursor over it to feel the parallax."
          />
          <div className="mt-12 overflow-hidden rounded-2xl border border-border">
            <Hero
              headingLevel="h3"
              eyebrow="Trusted by WooCommerce store owners"
              title="One plugin for subscriptions, memberships & retention"
              subtitle="Create subscription products, restrict member content, automate billing and reduce churn — all from a single free plugin."
              actions={
                <>
                  <Button
                    variant="primary"
                    size="lg"
                    magnetic
                    iconRight={<ArrowRight className="size-5" />}
                  >
                    Get Pro — Free
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    magnetic
                    iconLeft={<Download className="size-5" />}
                  >
                    Download Free
                  </Button>
                </>
              }
              trust="WordPress.org · WooCommerce 8+ · Stripe · PayPal · Paddle · HPOS"
            />
          </div>
        </Container>
      </Section>

      {/* ---- Motion: scroll-reactive background band ------------------- */}
      <Section
        id="scroll-bg"
        surface="transparent"
        scrollBg="dark"
        className="flex min-h-[80vh] items-center"
      >
        <Container width="narrow">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase opacity-70">
            Motion · Scroll background
          </p>
          <h2 className="mt-4 font-display text-display-sm text-balance">
            The background reacts to scroll
          </h2>
          <p className="mt-5 text-lg text-pretty opacity-80">
            As each band crosses the center of the viewport, the page background
            and text color tween together with GSAP ScrollTrigger. Content here
            uses the inherited color, so it stays readable through every shift.
          </p>
        </Container>
      </Section>

      <Section
        surface="transparent"
        scrollBg="highlight"
        className="flex min-h-[80vh] items-center justify-center text-center"
      >
        <Container width="narrow">
          <BigText size="display" variant="ink" align="center">
            Light. Dark. Bright.
          </BigText>
        </Container>
      </Section>

      <Section
        surface="transparent"
        scrollBg="light"
        className="flex min-h-[70vh] items-center"
      >
        <Container width="narrow">
          <h2 className="font-display text-display-sm text-balance">
            …and smoothly back to light.
          </h2>
          <p className="mt-5 text-lg text-pretty opacity-80">
            All motion respects <code>prefers-reduced-motion</code> — when it is
            on, the cursor, magnets, parallax, reveals and background shifts are
            disabled and content renders fully visible.
          </p>
        </Container>
      </Section>

      {/* ---- Final CTA ------------------------------------------------- */}
      <Section id="cta">
        <Container>
          <CTA
            surface="primary"
            eyebrow="Get started"
            title="Get ArraySubs Pro free for 4 months"
            subtitle="No strings attached. We'll send your license key immediately — no credit card required."
            actions={
              <>
                <Button variant="dark" size="lg" magnetic>
                  Claim My Free Pro License
                </Button>
                <Button variant="outline" size="lg">
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
            className="overflow-hidden rounded-lg border border-border bg-background"
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
