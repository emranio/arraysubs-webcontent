import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type TagTone = "highlight" | "primary" | "gold";

type TagCardProps = {
  /** Uppercase pill at the top (e.g., "BATTLE-TESTED"). */
  tag: string;
  title: ReactNode;
  description: ReactNode;
  /** Color of the tag pill. Default: highlight (lime). */
  tagTone?: TagTone;
  /** When set, the whole card becomes a link. */
  href?: string;
  /** Accessible label for the arrow CTA. */
  cta?: string;
  /** Pin the card to its hover/active look statically. */
  active?: boolean;
  /**
   * Cell mode: drop the card's own border + rounding so it sits flush inside a
   * connected grid (the grid's `gap-px` over a tinted container draws the
   * hairline dividers). Use for the seamless capabilities-grid layout.
   */
  bare?: boolean;
  className?: string;
};

const tagBg: Record<TagTone, string> = {
  highlight: "bg-highlight",
  primary: "bg-primary",
  gold: "bg-gold",
};

/**
 * Tag-pill feature card.
 *
 * Rest: surface with a lime/gold/primary pill on top, dark title + muted
 * description, faint arrow bottom-right.
 *
 * Hover (or `active`): the cell fills dark (deep teal), the title flips to
 * light, the description goes muted-on-dark, and the arrow brightens to lime
 * and nudges up-right.
 *
 * `bare` removes the border + rounding so cards tile seamlessly in a grid.
 */
export function TagCard({
  tag,
  title,
  description,
  tagTone = "highlight",
  href,
  cta = "Learn more",
  active = false,
  bare = false,
  className,
}: TagCardProps) {
  const shape = bare ? "" : "rounded-2xl border-2";

  const surface = active
    ? cn("bg-dark text-on-dark on-dark", !bare && "border-dark")
    : cn(
        "bg-background text-foreground hover:bg-dark hover:text-on-dark",
        !bare && "border-border hover:border-dark",
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
        className={cn(
          "inline-flex w-fit items-center rounded-pill px-3 py-1 text-xs font-semibold tracking-wider text-dark uppercase",
          tagBg[tagTone],
        )}
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
            ? "text-primary"
            : "text-faint group-hover/tag:translate-x-1 group-hover/tag:-translate-y-1 group-hover/tag:text-primary",
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
