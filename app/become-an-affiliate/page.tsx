import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarClock,
  CircleDollarSign,
  Cookie,
  HandCoins,
  Megaphone,
  Repeat,
  ShieldCheck,
  UserPlus,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { createMetadata, faqSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  ARRAYSUBS_PRO_PLANS,
  formatUsd,
} from "@/app/deals/arraysubs/pricing/_plans";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import {
  Accordion,
  AffiliateForm,
  Badge,
  Button,
  Container,
  CTA,
  Eyebrow,
  IconCard,
  PageHero,
  Section,
  SectionTitle,
  StepCard,
} from "@/components/ui";

export const metadata: Metadata = createMetadata({
  title: "Become an ArrayHash Affiliate — Earn 35% Recurring Commission",
  description:
    "Join the ArrayHash affiliate program and earn 35% commission on every new ArrayHash Pro license — plus recurring commission on automatic renewals. 60-day cookie, monthly PayPal payouts.",
  path: "/become-an-affiliate/",
});

const APPLY = "#apply";
const PRODUCT = "/deals/arraysubs/";

const STATS: { value: string; label: string }[] = [
  { value: "35%", label: "Commission on every new license" },
  { value: "60 days", label: "Tracking cookie after the first visit" },
  { value: "$100", label: "Minimum payout amount" },
  { value: "Monthly", label: "PayPal payouts, in USD" },
];

const STEPS: { title: string; description: string }[] = [
  {
    title: "Apply in two minutes",
    description:
      "Fill in the short form below. We review every application personally — no giant network, no waiting in a queue.",
  },
  {
    title: "Get your referral link",
    description:
      "Once you're approved, you get a unique link with a 60-day tracking cookie already working in your favour.",
  },
  {
    title: "Recommend ArrayHash",
    description:
      "Share it with WooCommerce store owners — in your content, your emails, your course, or your community.",
  },
  {
    title: "Earn on every sale",
    description:
      "Collect 35% on new licenses and on renewals. Cash out monthly via PayPal once your balance passes $100.",
  },
];

const TERMS: {
  icon: typeof Cookie;
  title: string;
  description: string;
}[] = [
  {
    icon: Cookie,
    title: "60-day tracking cookie",
    description:
      "The cookie is set on the first visit, so purchases made up to 60 days later still count as yours.",
  },
  {
    icon: Wallet,
    title: "$100 minimum payout",
    description:
      "Your commissions build up until the balance clears $100 — then it's ready to be paid out.",
  },
  {
    icon: CalendarClock,
    title: "Paid monthly via PayPal",
    description:
      "Payouts are processed once a month in USD, straight to your PayPal account.",
  },
  {
    icon: ShieldCheck,
    title: "30-day refund reserve",
    description:
      "We reserve 30 days for potential refunds, so we only pay commissions that are older than 30 days.",
  },
];

// Commission math shown in real dollars, driven by live ArrayHash Pro pricing
// (Personal + Agency, yearly and lifetime) so the numbers never drift.
const COMMISSION_RATE = 0.35;

const personalPlan = ARRAYSUBS_PRO_PLANS.find((plan) => plan.name === "Personal")!;
const agencyPlan = ARRAYSUBS_PRO_PLANS.find((plan) => plan.name === "Agency")!;

function commissionUsd(amount: number) {
  return formatUsd(Math.round(amount * COMMISSION_RATE));
}

type CommissionExample = {
  plan: string;
  cycle: string;
  price: string;
  cut: string;
  cadence: string;
  recurring: boolean;
};

const COMMISSION_EXAMPLES: CommissionExample[] = [
  {
    plan: "ArrayHash Pro Personal",
    cycle: "Yearly",
    price: `${formatUsd(personalPlan.annualPrice)}/yr`,
    cut: commissionUsd(personalPlan.annualPrice),
    cadence: "every year they renew",
    recurring: true,
  },
  {
    plan: "ArrayHash Pro Agency",
    cycle: "Yearly",
    price: `${formatUsd(agencyPlan.annualPrice)}/yr`,
    cut: commissionUsd(agencyPlan.annualPrice),
    cadence: "every year they renew",
    recurring: true,
  },
  {
    plan: "ArrayHash Pro Personal",
    cycle: "Lifetime",
    price: formatUsd(personalPlan.lifetimePrice),
    cut: commissionUsd(personalPlan.lifetimePrice),
    cadence: "one-time",
    recurring: false,
  },
  {
    plan: "ArrayHash Pro Agency",
    cycle: "Lifetime",
    price: formatUsd(agencyPlan.lifetimePrice),
    cut: commissionUsd(agencyPlan.lifetimePrice),
    cadence: "one-time",
    recurring: false,
  },
];

const FAQ_ITEMS = [
  {
    question: "How much can I earn as an ArrayHash affiliate?",
    answer:
      "You earn 35% commission on every new ArrayHash Pro license purchased through your link — and you keep earning 35% when those licenses renew automatically. There's no cap on how much you can make.",
  },
  {
    question: "Do I really earn commission on renewals?",
    answer:
      "Yes. ArrayHash products are subscription-based, so the customers you refer bill on a recurring cycle and their licenses auto-renew. You get your commission on those automatic renewals too, not just the first sale — so one good referral can pay you month after month.",
  },
  {
    question: "When and how do I get paid?",
    answer:
      "Payouts are processed monthly in USD via PayPal, once your balance passes the $100 minimum. Because we reserve 30 days for potential refunds, we pay commissions that are older than 30 days.",
  },
  {
    question: "How long does the tracking cookie last?",
    answer:
      "60 days. The cookie is set the first time someone clicks your link, so even if they come back and buy weeks later, the sale is still attributed to you.",
  },
  {
    question: "Who can join the program?",
    answer:
      "Anyone with a relevant audience — bloggers, YouTubers, course creators, agencies, freelancers and WooCommerce communities. Tell us how you plan to promote ArrayHash in the application and we'll take it from there.",
  },
];

export default function BecomeAnAffiliatePage() {
  return (
    <>
      <PageHero
        layout="showcase"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Become an Affiliate", href: "/become-an-affiliate/" },
        ]}
        title="Earn 35% for every store you send to ArrayHash."
        subtitle="Recommend ArrayHash to your audience and earn a generous, recurring commission on every customer you refer — on the first sale and every renewal after it."
        highlights={[
          "35% on new licenses",
          "Recurring commission on renewals",
          "60-day tracking cookie",
        ]}
        actions={
          <>
            <Button
              href={APPLY}
              size="lg"
              magnetic
              iconRight={<ArrowRight className="size-5" />}
            >
              Apply to become an affiliate
            </Button>
            <Button href={PRODUCT} variant="outline" size="lg" magnetic>
              See what you&apos;ll promote
            </Button>
          </>
        }
        visual={<HeroCommissionCard />}
      />

      {/* ---- Program at a glance -------------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <dl className="grid grid-cols-2 gap-[0.1875rem] lg:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-2 rounded-2xl bg-card p-6 sm:p-8"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-4xl font-semibold text-primary sm:text-5xl">
                  {stat.value}
                </dd>
                <p aria-hidden="true" className="text-sm text-muted sm:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ---- Dedicated recurring-commission section ------------------- */}
      <Section surface="dark" spacing="lg">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Eyebrow className="text-on-dark-muted">Recurring by design</Eyebrow>
              <h2 className="mt-4 font-display text-4xl text-balance sm:text-display-sm">
                You get paid again every time they renew.
              </h2>
              <p className="mt-6 max-w-xl text-lg text-pretty text-on-dark/85 sm:text-xl">
                {
                  "ArrayHash products are subscription-based — the customers you refer keep paying on a recurring cycle, and their licenses auto-renew. Your 35% doesn't stop at the first sale. You earn it on every automatic renewal, so a single referral can keep paying you month after month."
                }
              </p>
              <ul className="mt-8 flex flex-col gap-4">
                {[
                  "Commission on the first license and on every automated renewal.",
                  "Recurring revenue for the store means recurring commission for you.",
                  "The longer their customers stay subscribed, the more you earn.",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Repeat
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-highlight"
                    />
                    <span className="text-on-dark/90">{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-on-dark-muted">
                Renewal commissions follow the same 30-day refund reserve as new
                sales — you&apos;re paid once each renewal clears the refund window.
              </p>
            </div>

            <ScrollReveal y={1}>
              <CommissionExamples />
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* ---- How it works -------------------------------------------- */}
      <Section surface="surface" spacing="lg">
        <Container>
          <SectionTitle
            eyebrow="How it works"
            title="From sign-up to payout in four steps"
            subtitle="No approval maze and no complicated dashboard — just a link to share and commissions that add up."
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

      {/* ---- Program terms ------------------------------------------- */}
      <Section surface="default" spacing="lg">
        <Container>
          <SectionTitle
            eyebrow="The details"
            title="Simple, transparent terms"
            subtitle="Everything you need to know about how commissions are tracked and paid."
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-4">
            {TERMS.map((term) => (
              <IconCard
                key={term.title}
                icon={<term.icon className="size-6" />}
                title={term.title}
                description={term.description}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- FAQ ----------------------------------------------------- */}
      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="FAQ"
            title="Before you apply"
            subtitle="Quick answers to the questions affiliates ask most."
            align="center"
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion items={FAQ_ITEMS} defaultOpen={[0]} />
          </div>
        </Container>
        <JsonLd data={faqSchema(FAQ_ITEMS)} />
      </Section>

      {/* ---- Apply --------------------------------------------------- */}
      <Section id="apply" surface="default" spacing="lg">
        <Container>
          <div className="grid items-start gap-[0.1875rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            {/* Persuasion recap */}
            <div className="lg:pr-8">
              <SectionTitle
                eyebrow="Apply now"
                title="Join the ArrayHash affiliate program"
                subtitle="Tell us a little about your audience. We review every application personally and reply by email — you'll also hear from Emran, our founder."
              />
              <ul className="mt-8 flex flex-col gap-5">
                {[
                  {
                    icon: UserPlus,
                    title: "Apply",
                    text: "Share your details and how you plan to promote ArrayHash.",
                  },
                  {
                    icon: Megaphone,
                    title: "Get approved",
                    text: "We review it personally and send your referral link.",
                  },
                  {
                    icon: HandCoins,
                    title: "Start earning",
                    text: "35% on new licenses and renewals, paid monthly via PayPal.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-surface text-primary"
                    >
                      <item.icon className="size-5" />
                    </span>
                    <div>
                      <p className="font-display text-lg">{item.title}</p>
                      <p className="text-muted">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Application form */}
            <div className="rounded-2xl bg-card p-6 text-foreground sm:p-8">
              <h3 className="font-display text-2xl sm:text-3xl">
                Affiliate application
              </h3>
              <p className="mt-2 text-muted">
                It takes about two minutes. Prefer email? Write to{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:decoration-dark"
                >
                  {site.email}
                </a>
                .
              </p>
              <AffiliateForm className="mt-8" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- Closing CTA --------------------------------------------- */}
      <Section surface="primary" spacing="md">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="Ready when you are"
            title="Turn recommendations into recurring income"
            subtitle="Promote ArrayHash software that store owners actually keep — and earn 35% on every sale and renewal."
            microcopy="Free to join · No minimum audience"
            actions={
              <>
                <Button href={APPLY} variant="dark" size="lg" layers="2layer" magnetic>
                  Apply to become an affiliate
                </Button>
                <Button
                  href={PRODUCT}
                  variant="outline"
                  size="lg"
                  layers="2layer"
                  magnetic
                >
                  Explore our products
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
   Local, token-based visuals (flat, no shadows / gradients — house style).
   ========================================================================== */

/** Hero visual: a compact "your commission" card. */
function HeroCommissionCard() {
  return (
    <div className="rounded-2xl bg-card p-6 text-foreground sm:p-7">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-faint">
          Your commission
        </p>
        <span className="rounded-pill bg-primary px-3 py-1 text-sm font-bold text-on-dark">
          35%
        </span>
      </div>

      <dl className="mt-6 flex flex-col gap-[0.1875rem]">
        <div className="flex items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3.5">
          <dt className="flex items-center gap-2.5 font-medium">
            <HandCoins aria-hidden="true" className="size-5 text-primary" />
            New ArrayHash Pro sale
          </dt>
          <dd className="font-bold text-primary">35%</dd>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3.5">
          <dt className="flex items-center gap-2.5 font-medium">
            <Repeat aria-hidden="true" className="size-5 text-primary" />
            Every automatic renewal
          </dt>
          <dd className="font-bold text-primary">35%</dd>
        </div>
      </dl>

      <p className="mt-4 rounded-xl bg-highlight px-4 py-3 text-sm text-dark">
        <span className="font-semibold">Example:</span> an ArrayHash Pro Agency
        license at {formatUsd(agencyPlan.annualPrice)}/yr pays you{" "}
        <span className="font-semibold">
          {commissionUsd(agencyPlan.annualPrice)}
        </span>{" "}
        — every year they renew.
      </p>

      <p className="mt-4 flex items-center gap-2 text-sm text-muted">
        <Cookie aria-hidden="true" className="size-4 shrink-0 text-primary" />
        60-day tracking cookie after the first visit
      </p>
    </div>
  );
}

/** Recurring section visual: what one referral pays you, in real dollars. */
function CommissionExamples() {
  return (
    <div className="rounded-2xl bg-card p-6 text-foreground sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-lg">What one referral pays you</p>
        <Badge tone="primary">35%</Badge>
      </div>
      <p className="mt-2 flex items-center gap-2 text-sm text-muted">
        <CircleDollarSign
          aria-hidden="true"
          className="size-4 shrink-0 text-primary"
        />
        Real ArrayHash Pro pricing — your 35%, in dollars.
      </p>

      <ul className="mt-5 flex flex-col gap-[0.1875rem]">
        {COMMISSION_EXAMPLES.map((example) => (
          <li
            key={`${example.plan}-${example.cycle}`}
            className={cn(
              "flex items-center justify-between gap-3 rounded-xl px-4 py-3",
              example.recurring ? "bg-highlight" : "bg-surface",
            )}
          >
            <div className="min-w-0">
              <p className="truncate font-medium">{example.plan}</p>
              <p className="text-xs text-muted">
                {example.cycle} · {example.price}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-bold text-primary">+{example.cut}</p>
              <p className="text-xs text-faint">{example.cadence}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-muted">
        Yearly plans renew, so you earn your 35% again every year they stay.
        Shown on list price.
      </p>
    </div>
  );
}
