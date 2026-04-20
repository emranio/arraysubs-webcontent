import React from 'react';
import type { ContentMeta } from '@/lib/content';
import { getPageRouteBreadcrumbs } from '@/lib/breadcrumbs';
import { Breadcrumb, type BreadcrumbItem } from '@/components/layout/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import { Section } from '@/components/ui/section';

interface DefaultTemplateProps {
  meta: ContentMeta;
  children: React.ReactNode;
}

function getDefaultTemplateBreadcrumbItems(meta: ContentMeta, titleText: string): BreadcrumbItem[] {
  if (meta.contentType !== 'page') {
    const categoryLabel = meta.contentType.charAt(0).toUpperCase() + meta.contentType.slice(1);

    return [
      { label: categoryLabel, href: `/${meta.contentType}/` },
      { label: titleText },
    ];
  }

  const pageBreadcrumbs = getPageRouteBreadcrumbs(meta.slug);

  return pageBreadcrumbs.map((item, index) => {
    const isCurrent = index === pageBreadcrumbs.length - 1;

    if (isCurrent) {
      return {
        label: item.label,
        className: item.className,
      };
    }

    return item;
  });
}

export function DefaultTemplate({ meta, children }: DefaultTemplateProps) {
  const pageHeadline = meta.headline || meta.title;
  const heroSubText = meta.subText;
  const breadcrumbItems = getDefaultTemplateBreadcrumbItems(meta, pageHeadline);

  return (
    <article className={`page page--default ${meta.bodyClass || ''}`}>
      <Section  fullWidth className="page-hero-section">
        <div className="page-hero container">
          <Breadcrumb items={breadcrumbItems} />
          <div className="page-hero__content">
            {meta.headerBadge && (
              <Badge
                variant={meta.headerBadge.variant ?? 'default'}
                className="page-hero__badge"
              >
                {meta.headerBadge.label}
              </Badge>
            )}
            <h1 className="page-hero__title">{pageHeadline}</h1>

            {heroSubText && (
              <p className="page-hero__subtitle">{heroSubText}</p>
            )}

            {meta.headerTags && meta.headerTags.length > 0 && (
              <Flex gap="sm" justify="start" wrap className="page-hero__trust">
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
            
            {meta.actionButtons && meta.actionButtons.length > 0 && (
              <Flex gap="md" justify="start" wrap className="page-hero__actions">
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
          </div>
        </div>
        <svg
          className="page-wave-shape"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
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
