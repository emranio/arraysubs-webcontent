import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type TagCardProps = {
  /** Uppercase pill at the top (e.g., "BATTLE-TESTED"). */
  tag: string;
  title: ReactNode;
  description: ReactNode;
  /** When set, the whole card becomes a link. */
  href?: string;
  /** Accessible label for the arrow CTA. */
  cta?: string;
  /** Pin the card to its hover/active look statically. */
  active?: boolean;
  /**
   * Cell mode: drop the card's own rounding so it sits flush inside a connected
   * grid. Use for the seamless capabilities-grid layout.
   */
  bare?: boolean;
  className?: string;
};

/**
 * Tag-pill feature card.
 *
 * Rest: surface with a primary pill on top, dark title + muted description,
 * faint arrow bottom-right.
 *
 * Hover (or `active`): the cell fills dark, the title flips to light, the
 * description goes muted-on-dark, and the arrow brightens to primary
 * and nudges up-right.
 *
 * `bare` removes the rounding so cards tile seamlessly in a grid.
 */
export function TagCard({
  tag,
  title,
  description,
  href,
  cta = "Learn more",
  active = false,
  bare = false,
  className,
}: TagCardProps) {
  const shape = bare ? "" : "rounded-2xl";

  const surface = active
    ? "bg-dark text-on-dark on-dark"
    : cn(
        "bg-card text-foreground hover:bg-dark hover:text-on-dark",
      );

  const Body = (
    <article
      data-surface={active ? "dark" : undefined}
      className={cn(
        "group/tag relative flex h-full min-h-56 flex-col overflow-hidden p-6 transition-colors duration-300 sm:p-8",
        shape,
        surface,
        className,
      )}
    >
      <span
        className="inline-flex w-fit items-center rounded-pill bg-primary px-3 py-1 text-xs font-semibold tracking-wider text-on-dark uppercase"
      >
        {tag}
      </span>

      <h3 className="mt-6 font-display text-xl leading-tight font-bold text-balance sm:text-2xl">
        {title}
      </h3>

      <p
        className={cn(
          "mt-3 max-w-xs text-base text-pretty transition-colors duration-300",
          active
            ? "text-on-dark-muted"
            : "text-muted group-hover/tag:text-on-dark-muted",
        )}
      >
        {description}
      </p>

      <ArrowUpRight
        aria-hidden="true"
        className={cn(
          "absolute right-6 bottom-6 size-5 transition-all duration-300 sm:right-8 sm:bottom-8",
          active
            ? "text-on-dark"
            : "text-faint group-hover/tag:translate-x-1 group-hover/tag:-translate-y-1 group-hover/tag:text-on-dark",
        )}
      />
    </article>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={cta}
        className="block h-full focus-visible:outline-none"
      >
        {Body}
      </Link>
    );
  }
  return Body;
}
