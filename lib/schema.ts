import type { ContentMeta } from './content';
import { getRouteBreadcrumbs, normalizeBreadcrumbPath } from './breadcrumbs';
import siteConfig from '@/site.config.json';

interface RouteSchemaOptions {
  pathname: string;
  currentLabel?: string;
}

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl;
}

function getContentPath(meta: ContentMeta): string {
  if (meta.contentType === 'page') {
    return meta.slug ? `/${meta.slug}/` : '/';
  }

  return `/${meta.contentType}/${meta.slug}/`;
}

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

function getBreadcrumbSchema({ pathname, currentLabel }: RouteSchemaOptions) {
  const siteUrl = getSiteUrl();
  const items = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
  ];

  getRouteBreadcrumbs(pathname, currentLabel).forEach((item, index) => {
    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: item.label,
      item: `${siteUrl}${item.href}`,
    });
  });

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

function getBlogPostSchema(meta: ContentMeta, pathname: string) {
  const siteUrl = getSiteUrl();
  const normalizedPath = normalizeBreadcrumbPath(pathname);

  return {
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    author: meta.author
      ? { '@type': 'Person', name: meta.author }
      : undefined,
    url: `${siteUrl}${normalizedPath}`,
    ...(meta.coverImage && {
      image: meta.coverImage.startsWith('http')
        ? meta.coverImage
        : `${siteUrl}/contents/${meta.coverImage}`,
    }),
  };
}

function stringifySchemaGraph(schemas: object[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': schemas,
  });
}

export function generateRouteSchemaJsonLd({ pathname, currentLabel }: RouteSchemaOptions): string {
  return stringifySchemaGraph([
    getOrganizationSchema(),
    getWebsiteSchema(),
    getBreadcrumbSchema({ pathname, currentLabel }),
  ]);
}

export function generateSchemaJsonLd(meta: ContentMeta): string {
  const pathname = getContentPath(meta);
  const schemas: object[] = [
    getOrganizationSchema(),
    getWebsiteSchema(),
    getBreadcrumbSchema({
      pathname,
      currentLabel: meta.contentType === 'page' ? undefined : meta.title,
    }),
  ];

  // Template-specific schemas
  if (meta.template === 'blog') {
    schemas.push(getBlogPostSchema(meta, pathname));
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

  return stringifySchemaGraph(schemas);
}
