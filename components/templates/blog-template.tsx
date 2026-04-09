import React from 'react';
import type { ContentMeta } from '@/lib/content';
import { Breadcrumb } from '@/components/layout/breadcrumb';

interface BlogTemplateProps {
  meta: ContentMeta;
  children: React.ReactNode;
}

export function BlogTemplate({ meta, children }: BlogTemplateProps) {
  const breadcrumbItems = [
    { label: 'Blog', href: '/articles/' },
    { label: meta.title },
  ];

  const formattedDate = meta.date
    ? new Date(meta.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <article className={`page page--blog ${meta.bodyClass || ''}`}>
      <div className="container">
        <div className="page__content page__content--blog">
          <Breadcrumb items={breadcrumbItems} />
          <header className="page__header page__header--blog">
            {meta.category && (
              <span className="page__category">{meta.category}</span>
            )}
            <h1 className="page__title">{meta.title}</h1>
            {meta.description && (
              <p className="page__description">{meta.description}</p>
            )}
            <div className="page__meta">
              {meta.author && (
                <span className="page__author">By {meta.author}</span>
              )}
              {formattedDate && (
                <time className="page__date" dateTime={meta.date}>
                  {formattedDate}
                </time>
              )}
              <span className="page__reading-time">{meta.readingTime}</span>
            </div>
            {meta.tags && meta.tags.length > 0 && (
              <div className="page__tags">
                {meta.tags.map((tag) => (
                  <span key={tag} className="page__tag">
                    {tag}
                  </span>
                ))}
              </div>
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
