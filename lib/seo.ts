import type { Metadata } from "next";
import { absoluteUrl, site, withTrailingSlash } from "@/lib/site";

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

  const canonical = withTrailingSlash(path);
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
    url: absoluteUrl("/"),
    logo: absoluteUrl(site.logo),
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
    url: absoluteUrl("/"),
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
      item: absoluteUrl(item.path),
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

export type HowToStep = { name: string; text: string };

/**
 * HowTo JSON-LD for step-by-step setup guides. Helps search and AI answer
 * engines surface the steps directly (GEO/AEO) for "how to set up X" queries.
 */
export function howToSchema(name: string, steps: HowToStep[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export type ArticleInput = {
  headline: string;
  description: string;
  /** Canonical path beginning with "/". */
  path: string;
  /** ISO date (YYYY-MM-DD) the article first published. */
  datePublished: string;
  /** ISO date (YYYY-MM-DD) of the last meaningful update — drives freshness. */
  dateModified: string;
};

/**
 * TechArticle JSON-LD for editorial/comparison pages. Signals authored,
 * dated, citable content to search and AI answer engines (GEO/AEO).
 */
export function articleSchema(input: ArticleInput) {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: input.headline,
    description: input.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    inLanguage: site.lang,
    author: { "@type": "Organization", name: site.brand, url: absoluteUrl("/") },
    publisher: {
      "@type": "Organization",
      name: site.brand,
      logo: { "@type": "ImageObject", url: absoluteUrl(site.logo) },
    },
  };
}
