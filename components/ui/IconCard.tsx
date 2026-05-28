import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type IconCardProps = {
  /** Decorative icon (e.g. a lucide-react icon). Rendered aria-hidden. */
  icon?: ReactNode;
  title: string;
  description: string;
  /** When set, the whole card becomes a link. */
  href?: string;
  /** Optional pill in the top-right (e.g. a <Badge />). */
  badge?: ReactNode;
  className?: string;
};

/** Icon + title + description card. Becomes a single clickable link when href set. */
export function IconCard({
  icon,
  title,
  description,
  href,
  badge,
  className,
}: IconCardProps) {
  const classes = cn(
    "group relative flex h-full flex-col gap-5 rounded-xl border border-border bg-background p-6",
    "transition-[transform,border-color] duration-300 ease-out",
    href && "hover:-translate-y-1 hover:border-dark",
    className,
  );

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        {icon && (
          <span
            aria-hidden="true"
            className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg bg-surface text-dark transition-colors duration-300 group-hover:bg-primary"
          >
            {icon}
          </span>
        )}
        {badge && <span className="shrink-0">{badge}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-xl leading-tight">
          {title}
          {href && (
            <ArrowUpRight
              aria-hidden="true"
              className="ml-1 inline size-5 -translate-y-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </h3>
        <p className="text-muted text-pretty">{description}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return <div className={classes}>{content}</div>;
}
