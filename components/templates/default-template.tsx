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

function HomeBreadcrumbIcon() {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className="breadcrumb__home-icon"
    >
      <path
        fill="currentColor"
        d="M19.6,9.6c0,0-3,0-4,0c-0.4,0-1.8-0.2-1.8-0.2c-0.6-0.1-1.1-0.2-1.6-0.6c-0.5-0.3-0.9-0.8-1.2-1.2 c-0.3-0.4-0.4-0.9-0.5-1.4c0,0-0.1-1.1-0.2-1.5c-0.1-1.1,0-4.4,0-4.4C10.4,0.2,10.2,0,10,0S9.6,0.2,9.6,0.4c0,0,0.1,3.3,0,4.4 c0,0.4-0.2,1.5-0.2,1.5C9.4,6.7,9.2,7.2,9,7.6C8.7,8.1,8.2,8.5,7.8,8.9c-0.5,0.3-1,0.5-1.6,0.6c0,0-1.2,0.1-1.7,0.2 c-1,0.1-4.2,0-4.2,0C0.2,9.6,0,9.8,0,10c0,0.2,0.2,0.4,0.4,0.4c0,0,3.1-0.1,4.2,0c0.4,0,1.7,0.2,1.7,0.2c0.6,0.1,1.1,0.2,1.6,0.6 c0.4,0.3,0.8,0.7,1.1,1.1c0.3,0.5,0.5,1,0.6,1.6c0,0,0.1,1.3,0.2,1.7c0,1,0,4.1,0,4.1c0,0.2,0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4 c0,0,0-3.1,0-4.1c0-0.4,0.2-1.7,0.2-1.7c0.1-0.6,0.2-1.1,0.6-1.6c0.3-0.4,0.7-0.8,1.1-1.1c0.5-0.3,1-0.5,1.6-0.6 c0,0,1.3-0.1,1.8-0.2c1,0,4,0,4,0c0.2,0,0.4-0.2,0.4-0.4C20,9.8,19.8,9.6,19.6,9.6L19.6,9.6z"
      />
    </svg>
  );
}

function HeroBreadcrumb({ meta, titleText }: { meta: ContentMeta; titleText: string }) {
  const isSubContent = meta.contentType !== 'page';
  const categoryLabel = isSubContent
    ? meta.contentType.charAt(0).toUpperCase() + meta.contentType.slice(1)
    : undefined;
  const pageBreadcrumbs = isSubContent ? [] : getPageRouteBreadcrumbs(meta.slug);

  return (
    <p className="breadcrumb breadcrumb--hero">
      <Link href="/" title="Home" aria-label="Home" className="breadcrumb__home-link">
        <HomeBreadcrumbIcon />
      </Link>
      {isSubContent && categoryLabel && (
        <>
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
            {index > 0 && ' / '}
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
