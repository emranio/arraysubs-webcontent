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

// Homepage Components for MDX
import { GrowthCard } from '@/components/homepage/growth-card';
import { ComparisonTable } from '@/components/homepage/comparison-table';
import { TestimonialCard } from '@/components/homepage/testimonial-card';
import { StatsBar } from '@/components/homepage/stats-bar';
import { EarlyAccessForm } from '@/components/homepage/early-access-form';

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

  if (href.startsWith('http') || href.startsWith('//')) {
    return (
      <a href={href} title={titleText} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} title={titleText} {...rest}>
      {children}
    </Link>
  );
}

export const mdxComponents: MDXComponents = {
  img: MdxImage,
  a: MdxLink,
  // UI components available in MDX
  Section,
  SectionHeading,
  Grid,
  Card,
  FeatureCard,
  Button,
  Flex,
  Badge,
  // Homepage components
  GrowthCard,
  ComparisonTable,
  TestimonialCard,
  StatsBar,
  EarlyAccessForm,
};
