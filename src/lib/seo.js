import { siteConfig } from "@/lib/site-config";

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  canonical,
  keywords = [],
  ogTitle,
  ogDescription,
  ogImage = siteConfig.defaultOgImage,
  ogType = "website",
} = {}) {
  const imageList = ogImage
    ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.defaultTitle,
        },
      ]
    : [];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonical || path,
    },
    openGraph: {
      title: ogTitle || title || siteConfig.defaultTitle,
      description: ogDescription || description,
      url: canonical || path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: ogType,
      images: imageList,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle || title || siteConfig.defaultTitle,
      description: ogDescription || description,
      images: imageList.map((image) => image.url),
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`,
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
  };
}

export function buildSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "WordPress 6.0+",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description:
        "Free core plugin with subscriptions, memberships, billing, retention flow, and customer portal.",
    },
    softwareRequirements: "WooCommerce 8.0+, PHP 8.0+",
  };
}

export function buildFaqSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href
        ? `${siteConfig.siteUrl}${item.href}`
        : siteConfig.siteUrl,
    })),
  };
}
