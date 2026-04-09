import React from 'react';
import type { ContentMeta } from '@/lib/content';
import { Breadcrumb } from '@/components/layout/breadcrumb';

interface DefaultTemplateProps {
  meta: ContentMeta;
  children: React.ReactNode;
}

export function DefaultTemplate({ meta, children }: DefaultTemplateProps) {
  const breadcrumbItems = [];

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
      <div className="container">
        <div className="page__content">
          {breadcrumbItems.length > 0 && <Breadcrumb items={breadcrumbItems} />}
          <header className="page__header">
            <h1 className="page__title">{meta.title}</h1>
            {meta.description && (
              <p className="page__description">{meta.description}</p>
            )}
          </header>
          <div className="mdx-content">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}
