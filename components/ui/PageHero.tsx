"use client";

import Link from "next/link";
import {
  Children,
  Fragment,
  isValidElement,
  type ElementType,
  type ReactNode,
} from "react";
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
  /** Trust note: inline after one action, otherwise beneath the action row. */
  trust?: ReactNode;
  /** Optional visual for product-led landing page heroes. */
  visual?: ReactNode;
  /** `showcase` places the copy beside a prominent product visual. */
  layout?: "default" | "showcase";
  /** Long editorial titles use a more compact scale while preserving PageHero. */
  titleSize?: "default" | "article";
  /** Heading element for the title. Keep h1 on real pages. */
  headingLevel?: ElementType;
  className?: string;
};

/** Count rendered action items, including children nested in fragments. */
function countActionItems(actions: ReactNode): number {
  let count = 0;

  Children.forEach(actions, (action) => {
    if (
      isValidElement<{ children?: ReactNode }>(action) &&
      action.type === Fragment
    ) {
      count += countActionItems(action.props.children);
      return;
    }

    if (action !== null && action !== undefined && action !== false) {
      count += 1;
    }
  });

  return count;
}

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
  visual,
  layout = "default",
  titleSize = "default",
  headingLevel: Heading = "h1",
  className,
}: PageHeroProps) {
  const trustFollowsSingleAction = Boolean(
    trust && actions && countActionItems(actions) === 1,
  );
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

  const heroContent = (
    <div className="min-w-0">
      <Heading
        className={cn(
          "break-words font-display font-semibold text-primary tracking-normal [text-wrap:wrap]",
          layout === "showcase"
            ? "text-[2.875rem] leading-[0.98] max-[22.499rem]:text-[2.5rem] sm:text-[3.75rem] md:text-[4.25rem] lg:text-[4.75rem] xl:text-[5.5rem]"
            : titleSize === "article"
              ? "text-[2.75rem] leading-[1.02] max-[22.499rem]:text-[2.375rem] sm:text-[3.5rem] lg:text-[4.25rem] xl:text-[4.75rem]"
            : "text-6xl leading-none sm:text-[5rem] lg:text-[5.875rem] xl:text-[6.5rem]",
        )}
      >
        {title}
      </Heading>

      {subtitle && (
        <p
          className={cn(
            "text-dark [text-wrap:wrap]",
            layout === "showcase"
              ? "mt-6 max-w-2xl text-base leading-7 sm:mt-7 sm:text-xl sm:leading-8"
              : "mt-10 text-lg leading-8 sm:text-xl",
          )}
        >
          {subtitle}
        </p>
      )}

      {highlights && highlights.length > 0 && (
        <ul
          className={cn(
            "flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-dark sm:text-base",
            layout === "showcase" ? "mt-7 hidden lg:flex" : "mt-9",
          )}
        >
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
        <div
          className={cn(
            "flex flex-wrap items-center gap-4",
            layout === "showcase" ? "mt-7 sm:mt-9" : "mt-11",
          )}
        >
          {actions}
          {trustFollowsSingleAction && (
            <div
              className={cn(
                "shrink-0 whitespace-nowrap text-sm font-medium text-muted",
                layout === "showcase" && "hidden lg:block",
              )}
            >
              {trust}
            </div>
          )}
        </div>
      )}

      {trust && !trustFollowsSingleAction && (
        <div
          className={cn(
            "text-sm text-muted",
            layout === "showcase" ? "mt-6 hidden lg:block" : "mt-8",
          )}
        >
          {trust}
        </div>
      )}
    </div>
  );

  return (
    <>
      <Section
        spacing="none"
        surface="surface"
        className={cn(
          layout === "showcase"
            ? "pt-10 pb-8 sm:pt-14 sm:pb-12 lg:pt-14 lg:pb-16"
            : "pt-20 pb-10 sm:pt-24 sm:pb-14",
          className,
        )}
      >
        <Container>
          {layout === "showcase" ? (
            <div>
              <div className="min-w-0">{rail}</div>
              <div className="mt-8 grid items-center gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.04fr)_minmax(25rem,0.96fr)] lg:gap-12 xl:gap-16">
                {heroContent}
                {visual && <div className="min-w-0 max-[63.999rem]:hidden lg:block">{visual}</div>}
              </div>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:items-start">
              <div className="min-w-0 lg:pt-3">{rail}</div>
              {heroContent}
            </div>
          )}
        </Container>
      </Section>
      {breadcrumbJsonLd}
    </>
  );
}

function PageHeroBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="inline-flex flex-wrap items-start gap-2 font-medium">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="inline-flex items-start gap-2">
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
