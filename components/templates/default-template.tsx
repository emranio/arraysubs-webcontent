import React from 'react';
import type { ContentMeta } from '@/lib/content';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flex } from '@/components/ui/flex';
import { Section } from '@/components/ui/section';

interface DefaultTemplateProps {
  meta: ContentMeta;
  children: React.ReactNode;
}

export function DefaultTemplate({ meta, children }: DefaultTemplateProps) {
  const breadcrumbItems = [];
  const heroSubText = meta.subText;

  if (meta.contentType !== 'page') {
    breadcrumbItems.push({
      label: meta.contentType.charAt(0).toUpperCase() + meta.contentType.slice(1),
      href: `/${meta.contentType}/`,
    });
  }

  if (meta.slug) {
    breadcrumbItems.push({ label: meta.title });
  }

  return (
    <article className={`page page--default ${meta.bodyClass || ''}`}>
      <Section background="light" fullWidth>
        <div className="landing-hero container">
          {breadcrumbItems.length > 0 && (
            <Breadcrumb
              items={breadcrumbItems}
              variant="hero"
              className="landing-hero__breadcrumb"
            />
          )}
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
