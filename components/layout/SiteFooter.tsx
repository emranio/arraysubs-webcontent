import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { PrivacyChoicesButton } from "@/components/layout/PrivacyChoicesButton";

const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: "Product",
    links: [
      ["ArraySubs", "/deals/arraysubs/"],
      ["Features", "/deals/arraysubs/features/"],
      ["Pricing", "/deals/arraysubs/pricing/"],
      ["Use Cases", "/deals/arraysubs/use-cases/"],
      ["Download", "https://wordpress.org/plugins/arraysubs/"],
    ],
  },
  {
    title: "Compare",
    links: [
      [
        "vs WooCommerce Subscriptions",
        "/deals/arraysubs/alternatives/woocommerce-subscriptions/",
      ],
      [
        "vs WooCommerce Memberships",
        "/deals/arraysubs/alternatives/woocommerce-memberships/",
      ],
      [
        "vs YITH Subscription",
        "/deals/arraysubs/alternatives/yith-woocommerce-subscription/",
      ],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Documentation", "https://support.arrayhash.com/arraysubs/"],
      ["Use Cases", "/deals/arraysubs/use-cases/"],
      ["Support", "https://support.arrayhash.com/arraysubs/"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Trust Center", "/trust-center/"],
      ["Privacy", "/trust-center/privacy-policy/"],
      ["Data Safety", "/trust-center/data-safety/"],
      ["Refund Policy", "/trust-center/refund-policy/"],
      ["Terms", "/trust-center/terms-of-service/"],
      ["GDPR + CCPA", "/trust-center/gdpr-ccpa-compliance/"],
      ["Accessibility", "/trust-center/accessibility-compliance/"],
      ["Contact", "/contact/"],
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer data-surface="dark" className="on-dark bg-dark text-on-dark">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.6fr_repeat(4,1fr)]">
          <div className="flex max-w-xs flex-col gap-4">
            <img
              src={site.logo}
              alt={site.name}
              width={494}
              height={120}
              decoding="async"
              className="h-auto w-32 max-w-full"
            />
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

        <div className="flex flex-col gap-4 border-t border-on-dark-border py-6 text-sm text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <PrivacyChoicesButton />
            <p>Built for WooCommerce store owners.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
