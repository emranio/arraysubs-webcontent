import type { Metadata } from "next";
import { site } from "@/lib/site";

type SeoInput = {
  title?: string;
  description?: string;
  /** Canonical path beginning with "/" (e.g. "/deals/arraysubs/"). */
  path?: string;
  /** Set true for internal / non-marketing pages (design system, previews). */
  noindex?: boolean;
  /** Absolute or root-relative OG image. */
  ogImage?: string;
  type?: "website" | "article";
};

/**
 * Build a Next.js Metadata object with consistent canonical URL, Open Graph
 * and Twitter cards. Use in every `page.tsx` via `export const metadata`.
 */
export function createMetadata(input: SeoInput = {}): Metadata {
  const {
    title,
    description = site.description,
    path = "/",
    noindex = false,
    ogImage = site.ogImage,
    type = "website",
  } = input;

  const canonical = path;
  const resolvedTitle = title ?? site.defaultTitle;

  return {
    title,
    description,
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      title: resolvedTitle,
      description,
      url: canonical,
      siteName: site.brand,
      locale: site.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: resolvedTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [ogImage],
    },
  };
}

/* ============================================================================
   JSON-LD STRUCTURED DATA BUILDERS  (rich snippets + GEO/AEO)
   Pass the result to the <JsonLd /> component.
   ========================================================================== */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand,
    url: site.url,
    logo: `${site.url}/logo.png`,
    sameAs: [...site.sameAs],
    contactPoint: {
      "@type": "ContactPoint",
      email: site.email,
      contactType: "customer support",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.brand,
    url: site.url,
    description: site.description,
    inLanguage: site.lang,
    publisher: { "@type": "Organization", name: site.brand },
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.brand,
    applicationCategory: "BusinessApplication",
    operatingSystem: "WordPress 6.0+",
    description: site.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    softwareRequirements: "WooCommerce 8.0+, PHP 8.0+",
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export type Faq = { question: string; answer: string };

export function faqSchema(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
