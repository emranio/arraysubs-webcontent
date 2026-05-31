import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type OfferCardProps = {
  /** Sequence number — rendered as /01 etc. */
  number: number;
  /** Top-right pill (e.g., "Free", "4 weeks", "Limited"). */
  badge?: ReactNode;
  title: ReactNode;
  /** Small uppercase accent line under the title. */
  eyebrow?: string;
  description: ReactNode;
  /** Bottom-left label (e.g., "INVESTMENT", "PRICE", "TIMELINE"). */
  metaLabel: string;
  /** Bottom-left main value (e.g., "Free", "$1,500 – $7,500"). */
  metaValue: ReactNode;
  /** Optional small suffix after the value (e.g., "USD", "forever"). */
  metaSuffix?: string;
  /** Featured = primary-color border + filled CTA arrow + prominent number chip. */
  featured?: boolean;
  /** When set, the whole card and its CTA become a link to this href. */
  href?: string;
  /** Accessible label for the CTA arrow. */
  cta?: string;
  className?: string;
};

/**
 * Numbered offer / tier card.
 *
 * Layout: `/NN` number top-left + optional badge top-right, big title with an
 * optional uppercase eyebrow, description, divider, then a footer with a
 * label/value pair on the left and an arrow CTA on the right. `featured` swaps
 * the neutral border for a primary-color border and fills the CTA, and renders
 * the number as a lime chip.
 */
export function OfferCard({
  number,
  badge,
  title,
  eyebrow,
  description,
  metaLabel,
  metaValue,
  metaSuffix,
  featured = false,
  href,
  cta = "Learn more",
  className,
}: OfferCardProps) {
  const numStr = `/${String(number).padStart(2, "0")}`;

  const arrow = (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-full transition-colors",
        featured
          ? "bg-primary text-dark group-hover/offer:bg-primary-strong"
          : "border border-border-strong text-foreground group-hover/offer:border-dark",
      )}
    >
      <ArrowUpRight className="size-5" />
    </span>
  );

  const numberChip = featured ? (
    <span className="inline-flex items-center rounded-md bg-primary px-2 py-1 font-display text-base font-bold text-dark tabular-nums">
      {numStr}
    </span>
  ) : (
    <span className="font-display text-base font-bold text-faint tabular-nums">
      {numStr}
    </span>
  );

  const Body = (
    <article
      className={cn(
        "group/offer relative flex h-full flex-col rounded-2xl bg-background p-6 transition-colors sm:p-8",
        featured
          ? "border-2 border-primary"
          : "border border-border hover:border-border-strong",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {numberChip}
        {badge && (
          <span className="inline-flex items-center rounded-pill border border-border-strong px-3 py-1 text-xs font-semibold tracking-wider text-muted uppercase">
            {badge}
          </span>
        )}
      </div>

      <h3 className="mt-8 font-display text-3xl leading-[1.05] font-bold text-balance sm:text-4xl">
        {title}
      </h3>

      {eyebrow && (
        <p
          className={cn(
            "mt-3 text-xs font-semibold tracking-[0.18em] uppercase",
            featured ? "text-foreground" : "text-muted",
          )}
        >
          {eyebrow}
        </p>
      )}

      <p className="mt-5 text-base text-muted text-pretty">{description}</p>

      <div className="mt-8 h-px w-full bg-border" />

      <div className="mt-6 flex items-end justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs font-semibold tracking-[0.18em] text-faint uppercase">
            {metaLabel}
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="font-display text-2xl font-bold sm:text-3xl">
              {metaValue}
            </span>
            {metaSuffix && (
              <span className="text-sm font-medium text-muted">
                {metaSuffix}
              </span>
            )}
          </div>
        </div>
        {arrow}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={cta}
        className="block focus-visible:outline-none"
      >
        {Body}
      </Link>
    );
  }
  return Body;
}
