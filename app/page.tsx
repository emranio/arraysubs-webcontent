import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getContentBySlug } from '@/lib/content';
import { generateContentMetadata } from '@/lib/seo';
import { generateSchemaJsonLd } from '@/lib/schema';
import { TemplateWrapper } from '@/components/templates/template-wrapper';
import { MDXRenderer } from '@/components/mdx-renderer';

export async function generateMetadata(): Promise<Metadata> {
  const content = getContentBySlug('page', []);
  if (!content) return {};
  return generateContentMetadata(content.meta);
}

export default async function HomePage() {
  const content = getContentBySlug('page', []);
  if (!content) notFound();

  const schemaJsonLd = generateSchemaJsonLd(content.meta);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJsonLd }}
      />
      <TemplateWrapper meta={content.meta}>
        <MDXRenderer source={content.content} />
      </TemplateWrapper>
    </>
  );
}
