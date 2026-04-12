import React from 'react';
import Link from 'next/link';
import type { ContentMeta } from '@/lib/content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import { Section } from '@/components/ui/section';

interface DefaultTemplateProps {
  meta: ContentMeta;
  children: React.ReactNode;
}

function HeroBreadcrumb({ meta }: { meta: ContentMeta }) {
  const isSubContent = meta.contentType !== 'page';
  const categoryLabel = isSubContent
    ? meta.contentType.charAt(0).toUpperCase() + meta.contentType.slice(1)
    : undefined;

  return (
    <p className="landing-hero__breadcrumb">
      <Link href="/">Home</Link>
      {categoryLabel && (
        <>
          {' / '}
          <Link href={`/${meta.contentType}/`}>{categoryLabel}</Link>
        </>
      )}
      {meta.slug && (
        <>
          {' / '}
          <span>{meta.title}</span>
        </>
      )}
    </p>
  );
}

export function DefaultTemplate({ meta, children }: DefaultTemplateProps) {
  const heroSubText = meta.subText;

  return (
    <article className={`page page--default ${meta.bodyClass || ''}`}>
      <Section background="light" fullWidth>
        <div className="landing-hero container">
          <HeroBreadcrumb meta={meta} />
          <h1 className="landing-hero__title">{meta.title}</h1>

          {heroSubText && (
            <p className="landing-hero__subtitle">{heroSubText}</p>
          )}

          {meta.actionButtons && meta.actionButtons.length > 0 && (
            <Flex gap="md" justify="center" wrap className="landing-hero__actions">
              {meta.actionButtons.map((action, index) => (
                <Button
                  key={`${action.href}-${action.label}-${index}`}
                  href={action.href}
                  variant={action.variant ?? (index === 0 ? 'primary' : 'outline')}
                  size={action.size ?? 'lg'}
                >
                  {action.label}
                </Button>
              ))}
            </Flex>
          )}

          {meta.headerTags && meta.headerTags.length > 0 && (
            <Flex gap="md" justify="center" wrap className="landing-hero__trust">
              {meta.headerTags.map((tag, index) => (
                <Badge
                  key={`${tag.label}-${index}`}
                  variant={tag.variant ?? 'default'}
                >
                  {tag.label}
                </Badge>
              ))}
            </Flex>
          )}
        </div>
      </Section>

      <section className="page__body">
        <div className="container">
          <div className="page__content page__content--default">
            <div className="mdx-content">
              {children}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
