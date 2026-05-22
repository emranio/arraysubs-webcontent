import type { Metadata } from 'next';
import type { ContentMeta } from './content';
import siteConfig from '@/site.config.json';

export function generateContentMetadata(meta: ContentMeta): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl;

  let canonicalPath: string;
  if (meta.contentType === 'page') {
    canonicalPath = meta.slug ? `/${meta.slug}/` : '/';
  } else {
    canonicalPath = `/${meta.contentType}/${meta.slug}/`;
  }

  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const ogImage = meta.coverImage
    ? meta.coverImage.startsWith('http')
      ? meta.coverImage
      : `${siteUrl}/contents/${meta.coverImage}`
    : undefined;

  return {
    title: `${meta.title} — ${siteConfig.siteName}`,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      siteName: siteConfig.siteName,
      type: meta.template === 'blog' ? 'article' : 'website',
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: meta.title }],
      }),
      ...(meta.template === 'blog' && {
        publishedTime: meta.date,
        authors: meta.author ? [meta.author] : undefined,
        tags: meta.tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      ...(ogImage && { images: [ogImage] }),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
