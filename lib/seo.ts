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
  /** ISO dates used by article Open Graph metadata. */
  publishedTime?: string;
  modifiedTime?: string;
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
    publishedTime,
    modifiedTime,
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
    openGraph:
      type === "article"
        ? {
            type: "article",
            title: resolvedTitle,
            description,
            url: canonical,
            siteName: site.brand,
            locale: site.locale,
            publishedTime,
            modifiedTime,
            images: [{ url: ogImage, width: 1672, height: 941, alt: resolvedTitle }],
          }
        : {
            type: "website",
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
  const organizationId = `${absoluteUrl("/")}#organization`;
  const logoId = `${absoluteUrl("/")}#logo`;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    alternateName: site.brand,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      "@id": logoId,
      url: absoluteUrl(site.logo),
      contentUrl: absoluteUrl(site.logo),
      width: 494,
      height: 120,
    },
    brand: { "@type": "Brand", name: site.brand },
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
    "@id": `${absoluteUrl("/")}#website`,
    name: site.name,
    alternateName: site.brand,
    url: absoluteUrl("/"),
    description: site.description,
    inLanguage: site.lang,
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
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

export function faqSchema(items: Faq[], path?: string) {
  const url = path ? absoluteUrl(path) : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(url ? { "@id": `${url}#faq`, url } : {}),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/* ----------------------------------------------------------------------------
   AUTHOR / PERSON  (E-E-A-T: named, credentialed, externally verifiable author)
   -------------------------------------------------------------------------- */

export type AuthorSchemaInput = {
  name: string;
  /** Canonical author-page path beginning with "/". */
  path: string;
  /** Headshot path or absolute URL. */
  image: string;
  jobTitle: string;
  /** One-line factual summary of the person. */
  description: string;
  /** Verifiable external profiles (personal site, WordPress.org, GitHub, LinkedIn). */
  sameAs: string[];
  /** Topics the person is qualified to cover. */
  knowsAbout?: string[];
  /** Formal education institution. */
  alumniOf?: string;
};

/**
 * Person JSON-LD for an author. Emitted inline on each article (so every page
 * carries author authority standalone) and as the `mainEntity` of the author
 * ProfilePage. The shared `@id` lets search and AI engines resolve one entity.
 */
export function authorPersonSchema(author: AuthorSchemaInput) {
  const url = absoluteUrl(author.path);
  const organizationId = `${absoluteUrl("/")}#organization`;

  return {
    "@type": "Person",
    "@id": `${url}#person`,
    name: author.name,
    url,
    image: absoluteUrl(author.image),
    jobTitle: author.jobTitle,
    description: author.description,
    worksFor: { "@id": organizationId },
    sameAs: author.sameAs,
    ...(author.knowsAbout ? { knowsAbout: author.knowsAbout } : {}),
    ...(author.alumniOf
      ? { alumniOf: { "@type": "CollegeOrUniversity", name: author.alumniOf } }
      : {}),
  };
}

/** ProfilePage JSON-LD wrapping the author Person for a dedicated author page. */
export function profilePageSchema(author: AuthorSchemaInput) {
  const url = absoluteUrl(author.path);

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profilepage`,
    url,
    name: `${author.name} — Author profile`,
    isPartOf: { "@id": `${absoluteUrl("/")}#website` },
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
    mainEntity: authorPersonSchema(author),
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

export type BlogPostInput = {
  headline: string;
  description: string;
  abstract: string;
  /** Canonical path beginning with "/". */
  path: string;
  /** ISO date (YYYY-MM-DD) the article first published. */
  datePublished: string;
  /** ISO date (YYYY-MM-DD) of the last meaningful update — drives freshness. */
  dateModified: string;
  author: AuthorSchemaInput;
  image: string;
  imageWidth: number;
  imageHeight: number;
  articleSection: string;
  format: string;
  keywords: string[];
  topics?: string[];
  wordCount: number;
};

/**
 * BlogPosting JSON-LD for resource articles. Signals authored,
 * dated, citable content to search and AI answer engines (GEO/AEO).
 */
export function blogPostSchema(input: BlogPostInput) {
  const url = absoluteUrl(input.path);
  const organizationId = `${absoluteUrl("/")}#organization`;
  const logoId = `${absoluteUrl("/")}#logo`;
  const imageUrl = absoluteUrl(input.image);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: input.headline,
    description: input.description,
    abstract: input.abstract,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": `${absoluteUrl("/")}#website` },
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    inLanguage: site.lang,
    isAccessibleForFree: true,
    articleSection: input.articleSection,
    genre: input.format,
    keywords: input.keywords.join(", "),
    wordCount: input.wordCount,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      contentUrl: imageUrl,
      width: input.imageWidth,
      height: input.imageHeight,
      caption: input.headline,
    },
    thumbnailUrl: imageUrl,
    author: authorPersonSchema(input.author),
    publisher: {
      "@type": "Organization",
      "@id": organizationId,
      name: site.name,
      url: absoluteUrl("/"),
      logo: { "@id": logoId },
    },
    about: [
      ...(input.topics ?? ["WooCommerce subscriptions"]).map((name) => ({
        "@type": "Thing",
        name,
      })),
      { "@type": "SoftwareApplication", name: "WooCommerce" },
    ],
    mentions: {
      "@type": "SoftwareApplication",
      name: site.brand,
      url: absoluteUrl("/deals/arraysubs/"),
    },
    copyrightHolder: { "@id": organizationId },
  };
}

export type ArticleInput = {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
};

/** General Article schema retained for comparison and editorial landing pages. */
export function articleSchema(input: ArticleInput) {
  const url = absoluteUrl(input.path);
  const organizationId = `${absoluteUrl("/")}#organization`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: input.headline,
    description: input.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    inLanguage: site.lang,
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
  };
}
