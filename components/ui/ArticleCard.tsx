import type { ElementType } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge } from "./Badge";
import { EditorialArtwork } from "./EditorialArtwork";

type ArticleCardProps = {
  href: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  dateTime: string;
  readTime: string;
  coverLabel: string;
  coverImage: string;
  coverTone?: "primary" | "dark" | "highlight";
  headingLevel?: ElementType;
  className?: string;
};

/** Reusable editorial preview card with a single accessible link target. */
export function ArticleCard({
  href,
  category,
  title,
  excerpt,
  date,
  dateTime,
  readTime,
  coverLabel,
  coverImage,
  coverTone = "primary",
  headingLevel: Heading = "h2",
  className,
}: ArticleCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl bg-card text-foreground",
        "outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
        className,
      )}
    >
      <EditorialArtwork
        eyebrow={category}
        title={coverLabel}
        image={coverImage}
        tone={coverTone}
        className="rounded-none"
      />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div>
          <Badge tone="outline" className="text-primary">
            {category}
          </Badge>
          <Heading className="mt-5 font-display text-2xl leading-tight">
            {title}
            <ArrowUpRight
              aria-hidden="true"
              className="ml-1.5 inline size-5 -translate-y-0.5 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
            />
          </Heading>
          <p className="mt-4 leading-7 text-muted text-pretty">{excerpt}</p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-5 text-sm font-medium text-faint">
          <time dateTime={dateTime}>Updated {date}</time>
          <span aria-hidden="true">·</span>
          <span>{readTime}</span>
        </div>
      </div>
    </Link>
  );
}
