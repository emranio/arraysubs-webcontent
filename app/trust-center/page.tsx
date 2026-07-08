import type { Metadata } from "next";
import {
  Accessibility,
  ArrowRight,
  BadgeCheck,
  CreditCard,
  FileCheck2,
  LockKeyhole,
  Mail,
  ReceiptText,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { createMetadata } from "@/lib/seo";
import {
  Button,
  Container,
  CTA,
  Eyebrow,
  IconCard,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, site } from "@/lib/site";
import {
  EFFECTIVE_DATE,
  ExternalLink,
  InlineLink,
  PolicyList,
  REVIEWED_DATE,
  TRUST_LINKS,
} from "./_components";

export const metadata: Metadata = createMetadata({
  title: "Trust Center",
  description:
    "ArrayHash Trust Center for ArraySubs privacy, data safety, refunds, terms, GDPR and CCPA compliance, accessibility, payment providers, and GA4 practices.",
  path: "/trust-center/",
});

const TRUST_ITEMS = [
  {
    icon: <LockKeyhole className="size-6" />,
    title: TRUST_LINKS[0].title,
    description: TRUST_LINKS[0].description,
    href: TRUST_LINKS[0].href,
  },
  {
    icon: <ShieldCheck className="size-6" />,
    title: TRUST_LINKS[1].title,
    description: TRUST_LINKS[1].description,
    href: TRUST_LINKS[1].href,
  },
  {
    icon: <ReceiptText className="size-6" />,
    title: TRUST_LINKS[2].title,
    description: TRUST_LINKS[2].description,
    href: TRUST_LINKS[2].href,
  },
  {
    icon: <FileCheck2 className="size-6" />,
    title: TRUST_LINKS[3].title,
    description: TRUST_LINKS[3].description,
    href: TRUST_LINKS[3].href,
  },
  {
    icon: <Scale className="size-6" />,
    title: TRUST_LINKS[4].title,
    description: TRUST_LINKS[4].description,
    href: TRUST_LINKS[4].href,
  },
  {
    icon: <Accessibility className="size-6" />,
    title: TRUST_LINKS[5].title,
    description: TRUST_LINKS[5].description,
    href: TRUST_LINKS[5].href,
  },
];

export default function TrustCenterPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Trust Center", href: "/trust-center/" },
        ]}
        title="Trust Center — Everything legal and operational in one place"
        subtitle="Clear policies for ArrayHash, ArraySubs, website analytics, payment processing, licensing, refunds, privacy rights, and accessibility. These pages explain what ArrayHash collects on this website, what payment and licensing providers process, and what ArraySubs does not send from your WordPress site."
        highlights={[
          "Consent-gated analytics disclosed",
          "No plugin telemetry or WooCommerce store metrics",
          "Privacy rights handled by email",
        ]}
      />

      {/* ---- Contact (moved here from the header nav) ------------------- */}
      <Section surface="surface" spacing="sm">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-card p-6 text-foreground sm:p-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <Eyebrow>Contact</Eyebrow>
              <h2 className="mt-3 font-display text-2xl leading-tight text-balance sm:text-3xl">
                Talk to the {site.name} team
              </h2>
              <p className="mt-3 text-muted text-pretty">
                Sales, support, privacy and rights requests, refunds, licensing,
                and accessibility reports are all handled from one place. Reach
                out and a human replies.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button
                href="/contact/"
                size="md"
                magnetic
                iconRight={<ArrowRight className="size-4" />}
              >
                Contact us
              </Button>
              <Button
                href={`mailto:${site.email}`}
                variant="outline"
                size="md"
                iconRight={<Mail className="size-4" />}
              >
                Email {site.name}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section surface="default" spacing="md">
        <Container>
          <div className="mt-12 grid gap-[0.1875rem] md:grid-cols-2 xl:grid-cols-3">
            {TRUST_ITEMS.map((item) => (
              <IconCard
                key={item.href}
                icon={item.icon}
                title={item.title}
                description={item.description}
                href={item.href}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="surface" spacing="md">
        <Container>
          <div className="grid gap-[0.1875rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="rounded-2xl bg-card p-6 text-foreground sm:p-8">
              <SectionTitle
                eyebrow="Data posture"
                title="Website data is limited. Plugin data stays with the merchant."
                subtitle="ArraySubs runs inside your own WordPress and WooCommerce environment. ArrayHash does not receive your store's customer data or business metrics."
                size="md"
              />
              <div className="mt-8">
                <PolicyList
                  items={[
                    "Website forms collect only the fields needed for signup, license request, newsletter, support and contact workflows.",
                    "GA4/GTM analytics loads only after analytics consent is accepted.",
                    "Payment, checkout and licensing providers are active for purchases, licenses, taxes where applicable, account management and transaction support.",
                    "ArraySubs does not collect plugin or theme installations, activations, usage telemetry, WooCommerce store metrics, WordPress admin emails, user emails or plugin logs.",
                  ]}
                />
              </div>
            </div>

            <div className="rounded-2xl bg-card p-6 text-foreground sm:p-8">
              <SectionTitle
                eyebrow="Third parties"
                title="Payment and analytics providers are disclosed"
                subtitle="ArrayHash uses established providers for website analytics, checkout, card handling, tax and licensing workflows."
                size="md"
              />
              <dl className="mt-8 grid gap-[0.1875rem]">
                {[
                  ["Google Analytics 4 / GTM", "Consent-gated aggregate website analytics"],
                  ["Stripe", "Payment processing and card handling"],
                  ["Checkout and licensing provider", "Checkout, licensing, account and transaction management"],
                ].map(([name, value]) => (
                  <div
                    key={name}
                    className="rounded-xl border border-border bg-background p-5"
                  >
                    <dt className="font-semibold text-foreground">{name}</dt>
                    <dd className="mt-1 text-muted">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      <Section surface="default" spacing="md">
        <Container>
          <div className="grid gap-[0.1875rem] lg:grid-cols-3">
            <div className="rounded-xl bg-card p-6 text-foreground">
              <BadgeCheck aria-hidden="true" className="size-8 text-primary" />
              <h2 className="mt-6 font-display text-2xl">Last reviewed</h2>
              <p className="mt-3 text-muted">
                Trust pages are reviewed when data practices, providers, payment
                flows or legal requirements change. Current review date:{" "}
                {REVIEWED_DATE}. Effective date: {EFFECTIVE_DATE}.
              </p>
            </div>
            <div className="rounded-xl bg-card p-6 text-foreground">
              <CreditCard aria-hidden="true" className="size-8 text-primary" />
              <h2 className="mt-6 font-display text-2xl">Payment privacy</h2>
              <p className="mt-3 text-muted">
                ArrayHash does not store card details. Payment details are
                handled by the provider used at checkout. Read the{" "}
                <ExternalLink href="https://stripe.com/privacy">
                  Stripe privacy policy
                </ExternalLink>
                {" "}for card processing details.
              </p>
            </div>
            <div className="rounded-xl bg-card p-6 text-foreground">
              <Scale aria-hidden="true" className="size-8 text-primary" />
              <h2 className="mt-6 font-display text-2xl">Rights requests</h2>
              <p className="mt-3 text-muted">
                To request access, correction, deletion or other privacy rights,
                email{" "}
                <InlineLink href={`mailto:${site.email}`}>
                  {site.email}
                </InlineLink>
                . See the{" "}
                <InlineLink href="/trust-center/gdpr-ccpa-compliance/">
                  GDPR and CCPA page
                </InlineLink>{" "}
                for details.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section surface="primary" spacing="md">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="Questions"
            title="Need a privacy, refund, or accessibility answer?"
            subtitle={`Email ${site.name}. We handle rights requests, payment questions, and accessibility reports from the same support channel.`}
            actions={
              <>
                <Button
                  href={`mailto:${site.email}`}
                  variant="dark"
                  size="lg"
                  layers="2layer"
                  magnetic
                >
                  Email {site.name}
                </Button>
                <Button
                  href="/contact/"
                  variant="outline"
                  size="lg"
                  layers="2layer"
                  magnetic
                >
                  Contact page
                </Button>
              </>
            }
          />
        </Container>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "ArrayHash Trust Center",
          url: absoluteUrl("/trust-center/"),
          about: TRUST_LINKS.map((item) => item.title),
        }}
      />
    </>
  );
}
