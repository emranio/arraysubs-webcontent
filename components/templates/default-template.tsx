import React from 'react';
import Link from 'next/link';
import type { ContentMeta } from '@/lib/content';
import { getPageRouteBreadcrumbs } from '@/lib/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import { Section } from '@/components/ui/section';

interface DefaultTemplateProps {
  meta: ContentMeta;
  children: React.ReactNode;
}

function HeroBreadcrumb({ meta, titleText }: { meta: ContentMeta; titleText: string }) {
  const isSubContent = meta.contentType !== 'page';
  const categoryLabel = isSubContent
    ? meta.contentType.charAt(0).toUpperCase() + meta.contentType.slice(1)
    : undefined;
  const pageBreadcrumbs = isSubContent ? [] : getPageRouteBreadcrumbs(meta.slug);

  return (
    <p className="landing-hero__breadcrumb">
      <Link href="/" title="Home">Home</Link>
      {isSubContent && categoryLabel && (
        <>
          {' / '}
          <Link href={`/${meta.contentType}/`} title={categoryLabel}>{categoryLabel}</Link>
        </>
      )}
      {isSubContent && meta.slug && (
        <>
          {' / '}
          <span>{titleText}</span>
        </>
      )}
      {!isSubContent && pageBreadcrumbs.map((item, index) => {
        const isCurrent = index === pageBreadcrumbs.length - 1;

        return (
          <React.Fragment key={item.href}>
            {' / '}
            {isCurrent ? (
              <span>{item.label}</span>
            ) : (
              <Link href={item.href} title={item.label}>{item.label}</Link>
            )}
          </React.Fragment>
        );
      })}
    </p>
  );
}

export function DefaultTemplate({ meta, children }: DefaultTemplateProps) {
  const pageHeadline = meta.headline || meta.title;
  const heroSubText = meta.subText;

  return (
    <article className={`page page--default ${meta.bodyClass || ''}`}>
      <Section background="light" fullWidth>
        <div className="landing-hero container">
          <HeroBreadcrumb meta={meta} titleText={pageHeadline} />
          {meta.headerBadge && (
            <Badge
              variant={meta.headerBadge.variant ?? 'default'}
              className="landing-hero__badge"
            >
              {meta.headerBadge.label}
            </Badge>
          )}
          <h1 className="landing-hero__title">{pageHeadline}</h1>

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
