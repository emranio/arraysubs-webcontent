import type { ContentMeta } from './content';
import { getPageRouteBreadcrumbs } from './breadcrumbs';
import siteConfig from '@/site.config.json';

function getOrganizationSchema() {
  return {
    '@type': 'Organization',
    name: siteConfig.organization.name,
    url: siteConfig.organization.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.siteUrl}${siteConfig.organization.logo}`,
    },
  };
}

function getWebsiteSchema() {
  return {
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
  };
}

function getBreadcrumbSchema(meta: ContentMeta) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl;
  const items = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
  ];

  if (meta.contentType !== 'page') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: meta.contentType.charAt(0).toUpperCase() + meta.contentType.slice(1),
      item: `${siteUrl}/${meta.contentType}/`,
    });

    if (meta.slug) {
      items.push({
        '@type': 'ListItem',
        position: 3,
        name: meta.title,
        item: `${siteUrl}/${meta.contentType}/${meta.slug}/`,
      });
    }
  } else if (meta.slug) {
    getPageRouteBreadcrumbs(meta.slug).forEach((item, index) => {
      items.push({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: `${siteUrl}${item.href}`,
      });
    });
  }

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

function getBlogPostSchema(meta: ContentMeta) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl;
  return {
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    author: meta.author
      ? { '@type': 'Person', name: meta.author }
      : undefined,
    url: `${siteUrl}/${meta.contentType}/${meta.slug}/`,
    ...(meta.coverImage && {
      image: meta.coverImage.startsWith('http')
        ? meta.coverImage
        : `${siteUrl}/contents/${meta.coverImage}`,
    }),
  };
}

export function generateSchemaJsonLd(meta: ContentMeta): string {
  const schemas: object[] = [
    getOrganizationSchema(),
    getWebsiteSchema(),
    getBreadcrumbSchema(meta),
  ];

  // Template-specific schemas
  if (meta.template === 'blog') {
    schemas.push(getBlogPostSchema(meta));
  }

  // Content-specific schema from frontmatter
  if (meta.schema) {
    try {
      const contentSchema = JSON.parse(meta.schema);
      if (Array.isArray(contentSchema)) {
        schemas.push(...contentSchema);
      } else {
        schemas.push(contentSchema);
      }
    } catch {
      // Skip invalid schema
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };

  return JSON.stringify(jsonLd);
}
