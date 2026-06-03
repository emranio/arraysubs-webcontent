import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { ArrayHashMark } from "./ArrayHashMark";

type OfferCardProps = {
  /** Sequence number — rendered with the ArrayHash marker, e.g. [hash]01. */
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
  /** Pin the card to the "hover" look — number chip and filled arrow. */
  featured?: boolean;
  /** When set, the whole card becomes a link to this href. */
  href?: string;
  /** Accessible label for the CTA arrow. */
  cta?: string;
  className?: string;
};

/**
 * Numbered offer / tier card.
 *
 * The "colored" look (number chip and filled CTA arrow) is a proper **hover
 * state** by default — every card animates into it on hover.
 * Pass `featured` to pin a card in that look statically (e.g., for promos).
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
  const numStr = String(number).padStart(2, "0");

  const Body = (
    <article
      className={cn(
        "group/offer relative flex h-full flex-col rounded-2xl bg-card p-6 text-foreground sm:p-8",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Number — slides between faint text and a primary chip. */}
        <span className="relative inline-flex font-display text-base font-bold tabular-nums">
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 -mx-1 rounded-md bg-primary transition-opacity duration-200",
              featured ? "opacity-100" : "opacity-0 group-hover/offer:opacity-100",
            )}
          />
          <span
            className={cn(
              "relative inline-flex items-center gap-1 px-1 transition-colors duration-200",
              featured
                ? "text-on-dark"
                : "text-faint group-hover/offer:text-on-dark",
            )}
          >
            <ArrayHashMark className="text-[0.82em]" />
            {numStr}
          </span>
        </span>

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
            "mt-3 text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-200",
            featured
              ? "text-foreground"
              : "text-muted group-hover/offer:text-foreground",
          )}
        >
          {eyebrow}
        </p>
      )}

      <p className="mt-5 text-base text-muted text-pretty">{description}</p>

      <div className="mt-8 h-px w-full bg-border" />

      <div className="mt-6 flex items-end justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            {metaLabel}
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="font-display text-2xl font-bold text-primary sm:text-3xl">
              {metaValue}
            </span>
            {metaSuffix && (
              <span className="text-sm font-medium text-primary">
                {metaSuffix}
              </span>
            )}
          </div>
        </div>

        {/* Arrow CTA — switches from outline to a filled primary pill on hover. */}
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex size-12 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
            featured
              ? "border-primary bg-primary text-on-dark"
              : "border-border-strong bg-card text-foreground group-hover/offer:border-primary group-hover/offer:bg-primary group-hover/offer:text-on-dark",
          )}
        >
          <ArrowUpRight className="size-5 transition-transform duration-200 group-hover/offer:-translate-y-0.5 group-hover/offer:translate-x-0.5" />
        </span>
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
