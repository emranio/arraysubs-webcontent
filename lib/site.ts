const URL_WITH_SCHEME = /^[a-z][a-z\d+.-]*:/i;
const FILE_PATH = /\/[^/?#]+\.[^/?#]+$/;

function hasFilePath(base: string): boolean {
  if (URL_WITH_SCHEME.test(base)) {
    try {
      return FILE_PATH.test(new URL(base).pathname);
    } catch {
      return FILE_PATH.test(base);
    }
  }

  return FILE_PATH.test(base);
}

/**
 * Central site configuration. Import everywhere instead of hard-coding strings,
 * so SEO metadata, structured data, sitemap and robots all stay consistent.
 */
export const site = {
  /** Umbrella site / publisher (multi-product). */
  name: "ArrayHash",
  /** Primary product brand for this section of the site. */
  brand: "ArraySubs",
  /** Canonical production origin. Route URLs get trailing slashes via helpers. */
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

export function withTrailingSlash(urlOrPath: string): string {
  if (
    !urlOrPath ||
    urlOrPath === "/" ||
    urlOrPath.startsWith("#") ||
    /^(mailto|tel):/i.test(urlOrPath)
  ) {
    return urlOrPath || "/";
  }

  const splitAt = urlOrPath.search(/[?#]/);
  const base = splitAt === -1 ? urlOrPath : urlOrPath.slice(0, splitAt);
  const suffix = splitAt === -1 ? "" : urlOrPath.slice(splitAt);

  if (!base || base.endsWith("/") || hasFilePath(base)) {
    return `${base}${suffix}`;
  }

  return `${base}/${suffix}`;
}

export function absoluteUrl(path = "/"): string {
  if (URL_WITH_SCHEME.test(path)) {
    return withTrailingSlash(path);
  }

  const normalizedPath = withTrailingSlash(path);
  const origin = site.url.replace(/\/+$/, "");

  return `${origin}${normalizedPath.startsWith("/") ? "" : "/"}${normalizedPath}`;
}
