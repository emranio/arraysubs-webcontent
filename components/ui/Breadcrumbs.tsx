import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export type BreadcrumbItem = { name: string; href: string };

type BreadcrumbsProps = {
  /** Ordered from root to current page. The last item is the current page. */
  items: BreadcrumbItem[];
  /** Emit BreadcrumbList JSON-LD (on by default). */
  withSchema?: boolean;
  className?: string;
};

/**
 * Accessible breadcrumb trail. Used on inner pages directly or through PageHero.
 * The homepage and product landing pages omit breadcrumbs.
 */
export function Breadcrumbs({
  items,
  withSchema = true,
  className,
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight
                  aria-hidden="true"
                  className="size-4 text-faint"
                />
              )}
              {isLast ? (
                <span aria-current="page" className="font-medium text-foreground">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      {withSchema && (
        <JsonLd
          data={breadcrumbSchema(
            items.map((item) => ({ name: item.name, path: item.href })),
          )}
        />
      )}
    </nav>
  );
}
