import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarClock,
  Check,
  Cookie,
  HandCoins,
  Megaphone,
  ShieldCheck,
  UserPlus,
  Wallet,
} from "lucide-react";
import { createMetadata, faqSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  ARRAYSUBS_PRO_PLANS,
  formatUsd,
} from "@/app/deals/arraysubs/pricing/_plans";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Accordion,
  Button,
  Container,
  CTA,
  IconCard,
  PageHero,
  Section,
  SectionTitle,
  StepCard,
} from "@/components/ui";

export const metadata: Metadata = createMetadata({
  title: "Become an ArrayHash Affiliate — Earn 35% Commission",
  description:
    "Join the ArrayHash affiliate program and earn 35% commission on every new ArrayHash Pro license — yearly or lifetime. 60-day cookie, monthly PayPal payouts.",
  path: "/become-an-affiliate/",
});

const APPLY = "#apply";
const PRODUCT = "/deals/arraysubs/";

/** Affiliate sign-up and dashboard live in the GoAffPro portal. */
const AFFILIATE_SIGNUP_URL = "https://arrayhash.goaffpro.com/create-account";
const AFFILIATE_LOGIN_URL = "https://arrayhash.goaffpro.com/login";

const STATS: { value: string; label: string }[] = [
  { value: "35%", label: "Commission on every new license" },
  { value: "60 days", label: "Tracking cookie after the first visit" },
  { value: "$100", label: "Minimum payout amount" },
  { value: "Monthly", label: "PayPal payouts, in USD" },
];

const STEPS: { title: string; description: string }[] = [
  {
    title: "Sign up in a minute",
    description:
      "Create your account in the affiliate portal below. No giant network, no approval queue — you're in straight away.",
  },
  {
    title: "Get your referral link",
    description:
      "Your dashboard hands you a unique link with a 60-day tracking cookie already working in your favour.",
  },
  {
    title: "Recommend ArrayHash",
    description:
      "Share it with WooCommerce store owners — in your content, your emails, your course, or your community.",
  },
  {
    title: "Earn on every sale",
    description:
      "Collect 35% on every new license you refer. Cash out monthly via PayPal once your balance passes $100.",
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
// so the numbers never drift.
const COMMISSION_RATE = 0.35;

const agencyPlan = ARRAYSUBS_PRO_PLANS.find((plan) => plan.name === "Agency")!;

function commissionUsd(amount: number) {
  return formatUsd(Math.round(amount * COMMISSION_RATE));
}

const FAQ_ITEMS = [
  {
    question: "How much can I earn as an ArrayHash affiliate?",
    answer:
      "You earn 35% commission on every new ArrayHash Pro license purchased through your link — on both yearly and lifetime plans. There's no cap on how much you can make.",
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
      "Anyone with a relevant audience — bloggers, YouTubers, course creators, agencies, freelancers and WooCommerce communities. Create your account in the affiliate portal and you can start sharing your link right away.",
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
        subtitle="Recommend ArrayHash to your audience and earn a generous 35% commission on every customer you refer to ArrayHash Pro."
        highlights={[
          "35% on every new license",
          "Yearly & lifetime plans count",
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
              Become an affiliate
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
            title="Before you sign up"
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
                eyebrow="Sign up"
                title="Join the ArrayHash affiliate program"
                subtitle="Create your account in the affiliate portal and get your referral link straight away — no waiting, no approval queue."
              />
              <ul className="mt-8 flex flex-col gap-5">
                {[
                  {
                    icon: UserPlus,
                    title: "Create your account",
                    text: "Sign up in the affiliate portal — it takes about a minute.",
                  },
                  {
                    icon: Megaphone,
                    title: "Grab your link",
                    text: "Get your referral link and share it with your audience.",
                  },
                  {
                    icon: HandCoins,
                    title: "Start earning",
                    text: "35% on every new license, paid monthly via PayPal.",
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

            {/* Sign-up: handled by the GoAffPro affiliate portal */}
            <div className="flex flex-col rounded-2xl bg-card p-6 text-foreground sm:p-8">
              <h3 className="font-display text-2xl sm:text-3xl">
                Create your affiliate account
              </h3>
              <p className="mt-2 text-muted">
                Sign up in our affiliate portal. You&apos;ll get your referral
                link and a dashboard to track clicks, sales and commissions in
                real time.
              </p>

              <ul className="mt-7 flex flex-col gap-3">
                {[
                  "Your own referral link and marketing assets",
                  "Live clicks, sales and commission tracking",
                  "Payout requests once your balance clears $100",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-primary"
                    />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  href={AFFILIATE_SIGNUP_URL}
                  size="lg"
                  fullWidth
                  magnetic
                  iconRight={<ArrowRight className="size-5" />}
                >
                  Create affiliate account
                </Button>
              </div>

              <p className="mt-5 text-sm text-faint">
                Already an affiliate?{" "}
                <a
                  href={AFFILIATE_LOGIN_URL}
                  className="font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:decoration-dark"
                >
                  Log in to your dashboard
                </a>
                . Questions? Write to{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:decoration-dark"
                >
                  {site.email}
                </a>
                .
              </p>
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
            title="Turn recommendations into real income"
            subtitle="Promote ArrayHash software that store owners actually keep — and earn 35% on every new license you refer."
            microcopy="Free to join · No minimum audience"
            actions={
              <>
                <Button href={APPLY} variant="dark" size="lg" layers="2layer" magnetic>
                  Become an affiliate
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
            New Pro license, yearly
          </dt>
          <dd className="font-bold text-primary">35%</dd>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3.5">
          <dt className="flex items-center gap-2.5 font-medium">
            <HandCoins aria-hidden="true" className="size-5 text-primary" />
            New Pro license, lifetime
          </dt>
          <dd className="font-bold text-primary">35%</dd>
        </div>
      </dl>

      <p className="mt-4 rounded-xl bg-highlight px-4 py-3 text-sm text-dark">
        <span className="font-semibold">Example:</span> an ArrayHash Pro Agency
        license at {formatUsd(agencyPlan.annualPrice)} pays you{" "}
        <span className="font-semibold">
          {commissionUsd(agencyPlan.annualPrice)}
        </span>
        .
      </p>

      <p className="mt-4 flex items-center gap-2 text-sm text-muted">
        <Cookie aria-hidden="true" className="size-4 shrink-0 text-primary" />
        60-day tracking cookie after the first visit
      </p>
    </div>
  );
}
