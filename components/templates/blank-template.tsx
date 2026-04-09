import React from 'react';
import type { ContentMeta } from '@/lib/content';

interface BlankTemplateProps {
  meta: ContentMeta;
  children: React.ReactNode;
}

export function BlankTemplate({ meta, children }: BlankTemplateProps) {
  return (
    <article className={`page page--blank ${meta.bodyClass || ''}`}>
      {children}
    </article>
  );
}
