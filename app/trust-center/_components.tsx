import Link from "next/link";
import type { ReactNode } from "react";
import { Mail } from "lucide-react";
import { site } from "@/lib/site";
import { Button, CTA, Container, Section, SectionTitle } from "@/components/ui";

export const REVIEWED_DATE = "June 7, 2026";
export const EFFECTIVE_DATE = "April 10, 2026";

export const TRUST_LINKS = [
  {
    title: "Privacy Policy",
    href: "/trust-center/privacy-policy/",
    description:
      "What the ArrayHash website collects, why it is used, cookie consent behavior, and how to exercise privacy rights.",
  },
  {
    title: "Data Safety",
    href: "/trust-center/data-safety/",
    description:
      "How website data, payment data, and merchant WordPress data are separated.",
  },
  {
    title: "Refund Policy",
    href: "/trust-center/refund-policy/",
    description:
      "The 30-day ArraySubs Pro refund guarantee and how refund requests are handled.",
  },
  {
    title: "Terms of Service",
    href: "/trust-center/terms-of-service/",
    description:
      "The terms for using the ArrayHash website and ArraySubs Pro licenses.",
  },
  {
    title: "GDPR + CCPA",
    href: "/trust-center/gdpr-ccpa-compliance/",
    description:
      "Rights request handling, no-sale commitments, consent withdrawal, GPC, and regional privacy controls.",
  },
  {
    title: "Accessibility",
    href: "/trust-center/accessibility-compliance/",
    description:
      "Accessibility standards, supported interaction patterns, and issue reporting.",
  },
] as const;

type Fact = {
  label: string;
  value: ReactNode;
};

export function PolicyIntro({ facts }: { facts: Fact[] }) {
  return (
    <Section surface="default" spacing="sm">
      <Container>
        <dl className="grid gap-[0.1875rem] md:grid-cols-2 xl:grid-cols-4">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-xl bg-card p-6 text-foreground"
            >
              <dt className="text-sm font-semibold text-faint">{fact.label}</dt>
              <dd className="mt-2 text-lg font-semibold text-foreground">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

export function PolicyBody({ children }: { children: ReactNode }) {
  return (
    <Section surface="default" spacing="md">
      <Container>
        <div className="mx-auto max-w-5xl">{children}</div>
      </Container>
    </Section>
  );
}

export function PolicySection({
  title,
  subtitle,
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-border py-12 first:border-t-0 first:pt-0 last:pb-0">
      <SectionTitle title={title} subtitle={subtitle} size="sm" />
      <div className="mt-8 space-y-6 text-muted">{children}</div>
    </section>
  );
}

export function PolicyList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3 text-pretty">
          <span
            aria-hidden="true"
            className="mt-[0.55rem] size-2 shrink-0 rounded-full bg-primary"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

type TableProps = {
  caption: string;
  headers: string[];
  rows: ReactNode[][];
};

export function PolicyTable({ caption, headers, rows }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border text-foreground">
            {headers.map((header) => (
              <th key={header} scope="col" className="px-5 py-4 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-border last:border-b-0"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-5 py-4 align-top text-muted first:font-semibold first:text-foreground"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PolicyNote({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-foreground">
      <h3 className="font-display text-xl">{title}</h3>
      <div className="mt-3 space-y-4 text-muted">{children}</div>
    </div>
  );
}

export function InlineLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:decoration-dark"
    >
      {children}
    </Link>
  );
}

export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:decoration-dark"
    >
      {children}
    </a>
  );
}

export function TrustCrossLinks({
  currentPath,
}: {
  currentPath: string;
}) {
  const links = TRUST_LINKS.filter((item) => item.href !== currentPath);

  return (
    <Section surface="surface" spacing="md">
      <Container>
        <SectionTitle
          eyebrow="More trust resources"
          title="Related policies"
          subtitle="Each page covers one part of how ArrayHash handles privacy, payments, licenses, refunds, and accessibility."
          align="center"
        />
        <div className="mt-12 grid gap-[0.1875rem] md:grid-cols-2 xl:grid-cols-3">
          {links.slice(0, 3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex h-full flex-col rounded-xl bg-card p-6 text-foreground"
            >
              <h3 className="font-display text-xl">{item.title}</h3>
              <p className="mt-3 text-muted">{item.description}</p>
              <span className="mt-6 text-sm font-semibold text-primary group-hover:text-primary-strong">
                Read policy
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function TrustContactCta({
  title = "Need a privacy, billing, or accessibility answer?",
  subtitle = `Email ${site.name}. We route rights requests, refund questions, and accessibility reports to the right place.`,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <Section surface="primary" spacing="md">
      <Container>
        <CTA
          surface="primary"
          flat
          eyebrow="Contact"
          title={title}
          subtitle={subtitle}
          actions={
            <>
              <Button
                href={`mailto:${site.email}`}
                variant="dark"
                size="lg"
                layers="2layer"
                magnetic
                iconLeft={<Mail className="size-5" />}
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
  );
}
