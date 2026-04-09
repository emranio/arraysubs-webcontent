import React from 'react';
import * as runtime from 'react/jsx-runtime';
import { evaluate } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { mdxComponents } from './mdx-components';

interface MDXRendererProps {
  source: string;
  className?: string;
}

export async function MDXRenderer({ source, className }: MDXRendererProps) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  });

  return (
    <div className={className}>
      <Content components={mdxComponents} />
    </div>
  );
}
