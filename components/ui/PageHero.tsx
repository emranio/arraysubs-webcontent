"use client";

import Link from "next/link";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrayHashMark } from "./ArrayHashMark";
import type { BreadcrumbItem } from "./Breadcrumbs";
import { Container } from "./Container";
import { Section } from "./Section";

type PageHeroProps = {
  /** Optional breadcrumb items for inner pages. */
  breadcrumbs?: BreadcrumbItem[];
  /** Emit BreadcrumbList JSON-LD when breadcrumbs are present. */
  withBreadcrumbSchema?: boolean;
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Short proof points shown under the subtitle. */
  highlights?: ReactNode[];
  /** Buttons / CTA row. */
  actions?: ReactNode;
  /** Trust badges / logo row beneath the actions. */
  trust?: ReactNode;
  /** Heading element for the title. Keep h1 on real pages. */
  headingLevel?: ElementType;
  className?: string;
};

/**
 * Shared page title header. This intentionally matches the design-system page
 * intro: pale full-width surface, narrow left rail, oversized purple heading,
 * readable intro copy, proof points and CTA row.
 */
export function PageHero({
  breadcrumbs,
  withBreadcrumbSchema = true,
  eyebrow,
  title,
  subtitle,
  highlights,
  actions,
  trust,
  headingLevel: Heading = "h1",
  className,
}: PageHeroProps) {
  const breadcrumbJsonLd =
    breadcrumbs && withBreadcrumbSchema ? (
      <JsonLd
        data={breadcrumbSchema(
          breadcrumbs.map((item) => ({ name: item.name, path: item.href })),
        )}
      />
    ) : null;

  const rail = breadcrumbs ? (
    <PageHeroBreadcrumbs items={breadcrumbs} />
  ) : (
    eyebrow && (
      <p className="inline-flex items-center gap-2 text-sm font-medium text-primary">
        <ArrayHashMark className="text-[0.95em]" />
        <span>{eyebrow}</span>
      </p>
    )
  );

  return (
    <>
      <Section
        spacing="none"
        surface="surface"
        className={cn(
          "pt-20 pb-10 sm:pt-24 sm:pb-14",
          className,
        )}
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:items-start">
            <div className="lg:pt-3">{rail}</div>

            <div>
              <Heading className="font-display text-6xl leading-none font-semibold text-primary [text-wrap:wrap] sm:text-[5rem] lg:text-[5.875rem] xl:text-[6.5rem]">
                {title}
              </Heading>

              {subtitle && (
                <p className="mt-10 text-lg leading-8 text-dark [text-wrap:wrap] sm:text-xl">
                  {subtitle}
                </p>
              )}

              {highlights && highlights.length > 0 && (
                <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-dark sm:text-base">
                  {highlights.map((item, index) => (
                    <li
                      key={index}
                      className="inline-flex items-center gap-2 text-pretty"
                    >
                      <ArrayHashMark className="text-[0.78em] opacity-75" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {actions && (
                <div className="mt-11 flex flex-wrap items-center gap-4">
                  {actions}
                </div>
              )}

              {trust && <div className="mt-8 text-sm text-muted">{trust}</div>}
            </div>
          </div>
        </Container>
      </Section>
      {breadcrumbJsonLd}
    </>
  );
}

function PageHeroBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="inline-flex flex-wrap items-center gap-2 font-medium">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="inline-flex items-center gap-2">
              {index === 0 ? (
                <ArrayHashMark className="text-[0.95em] text-primary" />
              ) : (
                <span aria-hidden="true" className="text-muted">
                  /
                </span>
              )}
              {isLast ? (
                <span aria-current="page" className="text-foreground">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-primary transition-colors hover:text-primary-strong"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
