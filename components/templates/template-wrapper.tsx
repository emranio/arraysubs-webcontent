import React from 'react';
import type { ContentMeta } from '@/lib/content';
import { DefaultTemplate } from './default-template';
import { CanvasTemplate } from './canvas-template';
import { BlankTemplate } from './blank-template';
import { BlogTemplate } from './blog-template';

interface TemplateWrapperProps {
  meta: ContentMeta;
  children: React.ReactNode;
}

export function TemplateWrapper({ meta, children }: TemplateWrapperProps) {
  switch (meta.template) {
    case 'canvas':
      return <CanvasTemplate meta={meta}>{children}</CanvasTemplate>;
    case 'blank':
      return <BlankTemplate meta={meta}>{children}</BlankTemplate>;
    case 'blog':
      return <BlogTemplate meta={meta}>{children}</BlogTemplate>;
    default:
      return <DefaultTemplate meta={meta}>{children}</DefaultTemplate>;
  }
}
