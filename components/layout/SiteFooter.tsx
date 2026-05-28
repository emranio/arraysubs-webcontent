import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";

const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: "Product",
    links: [
      ["Features", "#"],
      ["Pricing", "#"],
      ["Download", "#"],
      ["Changelog", "#"],
    ],
  },
  {
    title: "Compare",
    links: [
      ["vs WooCommerce Subscriptions", "#"],
      ["vs WooCommerce Memberships", "#"],
      ["vs YITH", "#"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Documentation", "#"],
      ["Blog", "#"],
      ["Use Cases", "#"],
      ["Support", "#"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Trust Center", "#"],
      ["Terms", "#"],
      ["Privacy", "#"],
      ["Refund Policy", "#"],
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-surface="dark"
      className="on-dark bg-dark text-on-dark"
    >
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.6fr_repeat(4,1fr)]">
          <div className="flex max-w-xs flex-col gap-4">
            <span className="flex items-center gap-2 font-display text-xl font-bold">
              <span
                aria-hidden="true"
                className="inline-block size-5 rounded-[0.3rem] bg-primary"
              />
              {site.name}
            </span>
            <p className="text-sm text-on-dark-muted">
              The all-in-one WooCommerce subscription &amp; membership platform.
              One plugin, generous free tier.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="flex flex-col gap-3"
            >
              <h2 className="text-sm font-semibold tracking-wider text-on-dark-muted uppercase">
                {column.title}
              </h2>
              <ul className="flex flex-col gap-2 text-sm">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-on-dark/90 transition-colors hover:text-highlight"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-on-dark-border py-6 text-sm text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Built for WooCommerce store owners.</p>
        </div>
      </Container>
    </footer>
  );
}
