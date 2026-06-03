import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type StepCardProps = {
  /** Step number — rendered as 01, 02, 03 … */
  number: number;
  title: ReactNode;
  description: ReactNode;
  className?: string;
};

/**
 * Modern numbered process step card.
 *
 * Layout: a hover arrow on the top row, an oversized **outlined** display
 * number, then the title and description.
 *
 * Hover state: the card lifts, the arrow fades in, and the giant
 * outlined number fills in solid (-webkit-text-stroke + transparent fill →
 * currentColor fill).
 */
export function StepCard({
  number,
  title,
  description,
  className,
}: StepCardProps) {
  const numStr = String(number).padStart(2, "0");

  return (
    <article
      className={cn(
        "group/step relative flex h-full flex-col overflow-hidden rounded-2xl bg-card px-6 py-5 text-foreground transition-transform duration-300 ease-out hover:-translate-y-1 sm:px-8 sm:py-6",
        className,
      )}
    >
      {/* Top row — number + hover arrow */}
      <div className="flex items-start justify-between gap-3">
        {/* Outlined display number — fills solid on hover */}
        <span
          aria-hidden="true"
          className={cn(
            "inline-block font-display text-6xl leading-[0.85] font-bold tracking-tight tabular-nums sm:text-7xl",
            "text-transparent transition-colors duration-500 ease-out",
            "[-webkit-text-stroke:0.125rem_var(--color-foreground)]",
            "group-hover/step:text-primary",
          )}
        >
          {numStr}
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 shrink-0 text-primary opacity-0 transition-opacity duration-200 group-hover/step:opacity-100"
        />
      </div>

      {/* Extra-large space after the number */}
      <h3 className="mt-14 font-display text-xl leading-tight font-bold text-balance sm:mt-16 sm:text-2xl">
        {title}
      </h3>
      {/* Generous space after the title */}
      <p className="mt-5 text-base text-muted text-pretty">{description}</p>
    </article>
  );
}
