/**
 * Central site configuration. Import everywhere instead of hard-coding strings,
 * so SEO metadata, structured data, sitemap and robots all stay consistent.
 */
export const site = {
  /** Umbrella site / publisher (multi-product). */
  name: "ArrayHash",
  /** Primary product brand for this section of the site. */
  brand: "ArraySubs",
  /** Canonical production origin (no trailing slash). */
  url: "https://arrayhash.com",
  lang: "en",
  locale: "en_US",
  email: "emran@arraysubs.com",
  defaultTitle:
    "ArraySubs — Free WooCommerce Subscription & Membership Plugin",
  titleTemplate: "%s — ArraySubs",
  description:
    "Free WooCommerce subscription & membership plugin with automated billing, retention flows, store credit, checkout builder & analytics. One plugin replaces your entire subscription stack.",
  /** Public brand assets. */
  logo: "/arrayhash-logo.webp",
  favicon: "/arrayhash-favicon.webp",
  /** Default social share image (1200x630). Add the asset to /public. */
  ogImage: "/og/default.png",
  /** External profiles for the Organization sameAs graph. */
  sameAs: ["https://wordpress.org/plugins/arraysubs/"],
} as const;

export type Site = typeof site;
