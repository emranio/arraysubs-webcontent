import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from "./constants";

/**
 * Build a complete Next.js metadata object from minimal page-level input.
 *
 * Usage in any page.jsx:
 *
 *   import { buildMetadata } from '@/lib/seo';
 *
 *   export const metadata = buildMetadata({
 *       title: 'Features',
 *       description: 'All the features you need.',
 *       path: '/features',
 *       ogImage: '/images/og-features.png',       // optional
 *       schema: { ... },                           // optional JSON-LD object
 *       noIndex: false,                            // optional
 *       canonical: '/features',                    // optional, defaults to path
 *   });
 *
 * @param {Object} opts
 * @returns {Object} Next.js metadata object
 */
export function buildMetadata(opts = {}) {
  const {
    title,
    description = DEFAULT_DESCRIPTION,
    path = "",
    ogImage,
    noIndex = false,
    canonical,
    keywords,
    type = "website",
  } = opts;

  const url = `${SITE_URL}${canonical || path}`;
  const image = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${SITE_URL}${ogImage}`
    : DEFAULT_OG_IMAGE;

  const meta = {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonical || path || "/",
    },
    openGraph: {
      type,
      title: typeof title === "string" ? title : title?.default || SITE_NAME,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: typeof title === "string" ? title : SITE_NAME,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: typeof title === "string" ? title : title?.default || SITE_NAME,
      description,
      images: [image],
    },
  };

  if (keywords) {
    meta.keywords = Array.isArray(keywords) ? keywords : [keywords];
  }

  if (noIndex) {
    meta.robots = { index: false, follow: false };
  }

  return meta;
}

/**
 * Build a JSON-LD script object for Next.js metadata.
 *
 * Usage — export from page alongside metadata, then render via <SchemaScript />
 * or embed in the page directly.
 *
 * @param {Object|Object[]} schema - Single or array of JSON-LD objects
 * @returns {string} Serialised JSON-LD string
 */
export function buildSchemaMarkup(schema) {
  if (!schema) return null;
  const items = Array.isArray(schema) ? schema : [schema];
  return JSON.stringify(
    items.length === 1
      ? { "@context": "https://schema.org", ...items[0] }
      : items.map((s) => ({ "@context": "https://schema.org", ...s })),
  );
}

/**
 * Helpers to create common schema types quickly.
 */
export const Schema = {
  organization() {
    return {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
    };
  },

  website() {
    return {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    };
  },

  webpage({ title, description, path }) {
    return {
      "@type": "WebPage",
      name: title,
      description,
      url: `${SITE_URL}${path}`,
    };
  },

  breadcrumb(items) {
    return {
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.url ? `${SITE_URL}${item.url}` : undefined,
      })),
    };
  },

  softwareApplication({
    name = SITE_NAME,
    description,
    price,
    priceCurrency = "USD",
  } = {}) {
    return {
      "@type": "SoftwareApplication",
      name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description,
      offers:
        price != null
          ? { "@type": "Offer", price: String(price), priceCurrency }
          : undefined,
    };
  },

  article({
    title,
    description,
    path,
    datePublished,
    dateModified,
    authorName,
  }) {
    return {
      "@type": "Article",
      headline: title,
      description,
      url: `${SITE_URL}${path}`,
      datePublished,
      dateModified: dateModified || datePublished,
      author: { "@type": "Person", name: authorName || SITE_NAME },
      publisher: Schema.organization(),
    };
  },

  faq(items) {
    return {
      "@type": "FAQPage",
      mainEntity: items.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    };
  },
};
