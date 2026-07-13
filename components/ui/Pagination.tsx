import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  hrefForPage: (page: number) => string;
  label?: string;
};

/** Numbered, link-based pagination for crawlable archive pages. */
export function Pagination({
  currentPage,
  totalPages,
  hrefForPage,
  label = "Resource pages",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label={label} className="mt-12 border-t border-border pt-8">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <PaginationDirection
          href={currentPage > 1 ? hrefForPage(currentPage - 1) : undefined}
          label="Previous"
          icon={<ArrowLeft aria-hidden="true" className="size-4" />}
        />

        <ol className="flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => {
              const isCurrent = page === currentPage;
              return (
                <li key={page}>
                  <Link
                    href={hrefForPage(page)}
                    aria-current={isCurrent ? "page" : undefined}
                    aria-label={
                      isCurrent ? `Page ${page}, current page` : `Go to page ${page}`
                    }
                    className={cn(
                      "inline-flex size-11 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                      isCurrent
                        ? "border-primary bg-primary text-on-dark"
                        : "border-border-strong bg-background text-foreground hover:border-primary hover:text-primary",
                    )}
                  >
                    {page}
                  </Link>
                </li>
              );
            },
          )}
        </ol>

        <PaginationDirection
          href={
            currentPage < totalPages
              ? hrefForPage(currentPage + 1)
              : undefined
          }
          label="Next"
          icon={<ArrowRight aria-hidden="true" className="size-4" />}
          iconRight
        />
      </div>
    </nav>
  );
}

function PaginationDirection({
  href,
  label,
  icon,
  iconRight = false,
}: {
  href?: string;
  label: string;
  icon: ReactNode;
  iconRight?: boolean;
}) {
  const classes = cn(
    "inline-flex min-w-28 items-center justify-center gap-2 rounded-pill border px-5 py-2.5 text-sm font-semibold",
    href
      ? "border-border-strong bg-background text-foreground transition-colors hover:border-primary hover:text-primary"
      : "cursor-not-allowed border-border bg-surface text-faint opacity-60",
  );

  if (!href) {
    return (
      <span aria-disabled="true" className={classes}>
        {!iconRight && icon}
        {label}
        {iconRight && icon}
      </span>
    );
  }

  return (
    <Link href={href} className={classes}>
      {!iconRight && icon}
      {label}
      {iconRight && icon}
    </Link>
  );
}
