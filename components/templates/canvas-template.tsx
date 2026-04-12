import React from 'react';
import type { ContentMeta } from '@/lib/content';

interface CanvasTemplateProps {
  meta: ContentMeta;
  children: React.ReactNode;
}

export function CanvasTemplate({ meta, children }: CanvasTemplateProps) {
  return (
    <article className={`page page--canvas ${meta.bodyClass || ''}`}>
      <div className="mdx-content">
        {children}
      </div>
    </article>
  );
}
