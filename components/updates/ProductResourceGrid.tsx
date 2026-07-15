import Link from "next/link";
import { MoveRight } from "lucide-react";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { Badge, SectionTitle } from "@/components/ui";
import { cn } from "@/lib/cn";

type ResourceKind = "changelog" | "roadmap";

type ProductResource = {
  id: string;
  name: string;
  versions: string;
  description: string;
  changelogHref: string;
  roadmapHref: string;
};

const PRODUCTS: ProductResource[] = [
  {
    id: "arraysubs",
    name: "ArraySubs",
    versions: "Core 1.8.10 · Pro 1.1.1",
    description:
      "WooCommerce subscriptions, memberships, recurring billing and retention tools.",
    changelogHref: "/changelog/#arraysubs",
    roadmapHref: "/roadmap/#arraysubs",
  },
];

export function ProductResourceGrid({ active }: { active: ResourceKind }) {
  return (
    <>
      <SectionTitle
        eyebrow="Product updates"
        title="Choose a product"
        subtitle="ArraySubs is here now. This grid is ready for more ArrayHash products as they ship."
      />

      <ScrollReveal className="mt-10">
        <div className="grid gap-[0.1875rem] md:grid-cols-2 xl:grid-cols-3">
          {PRODUCTS.map((product) => (
            <article
              key={product.id}
              id={product.id}
              className="rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h3 className="font-display text-3xl">{product.name}</h3>
                <Badge tone="highlight">{product.versions}</Badge>
              </div>
              <p className="mt-5 max-w-xl leading-7 text-muted">
                {product.description}
              </p>
              <nav
                aria-label={`${product.name} updates`}
                className="mt-8 flex flex-wrap items-center justify-between gap-y-4"
              >
                <ProductLink
                  href={product.changelogHref}
                  label="Changelog"
                  current={active === "changelog"}
                />
                <ProductLink
                  href={product.roadmapHref}
                  label="Roadmap"
                  current={active === "roadmap"}
                />
              </nav>
            </article>
          ))}
        </div>
      </ScrollReveal>
    </>
  );
}

function ProductLink({
  href,
  label,
  current,
}: {
  href: string;
  label: string;
  current: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={cn(
        "group inline-flex items-center gap-3 text-base font-semibold transition-colors",
        current
          ? "text-primary"
          : "text-foreground hover:text-primary-strong",
      )}
    >
      <span>{label}</span>
      <MoveRight
        aria-hidden="true"
        className="h-5 w-10 transition-transform duration-200 group-hover:translate-x-1"
      />
    </Link>
  );
}
