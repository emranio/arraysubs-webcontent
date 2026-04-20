import React from 'react';
import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

// UI Components for MDX
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { Grid } from '@/components/ui/grid';
import { Card } from '@/components/ui/card';
import { FeatureCard } from '@/components/ui/feature-card';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { ResponsiveTable } from '@/components/ui/responsive-table';
import { normalizeInternalHref } from '@/lib/internal-links';

// Reusable content components for MDX
import { EarlyAccessForm } from '@/components/content/early-access-form';

function MdxImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt, title, width, height, ...rest } = props;
  if (!src || typeof src !== 'string') return null;

  const altText = alt || 'Image';
  const titleText = title || altText;

  if (src.startsWith('http') || src.startsWith('//')) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={altText} title={titleText} loading="lazy" {...rest} />
    );
  }

  return (
    <Image
      src={src}
      alt={altText}
      title={titleText}
      width={Number(width) || 800}
      height={Number(height) || 450}
      loading="lazy"
    />
  );
}

function MdxLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href, children, title, ...rest } = props;
  if (!href) return <span>{children}</span>;

  const titleText = title || (typeof children === 'string' ? children : '');
  const resolvedHref = normalizeInternalHref(href);
  const opensNewTab = resolvedHref.startsWith('http') || resolvedHref.startsWith('//');
  const shouldUseAnchor = resolvedHref.startsWith('#')
    || resolvedHref.startsWith('?')
    || /^[a-z][a-z0-9+.-]*:/i.test(resolvedHref)
    || resolvedHref.startsWith('//');

  if (shouldUseAnchor) {
    return (
      <a
        href={resolvedHref}
        title={titleText}
        {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={resolvedHref} title={titleText} {...rest}>
      {children}
    </Link>
  );
}

export const mdxComponents: MDXComponents = {
  img: MdxImage,
  a: MdxLink,
  table: ResponsiveTable,
  // UI components available in MDX
  Section,
  SectionHeading,
  Grid,
  Card,
  FeatureCard,
  Button,
  Flex,
  Badge,
  Icon,
  // Reusable content components
  EarlyAccessForm,
};
