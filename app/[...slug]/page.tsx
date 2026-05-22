import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getContentBySlug, getAllSlugs } from '@/lib/content';
import { generateContentMetadata } from '@/lib/seo';
import { generateSchemaJsonLd } from '@/lib/schema';
import { TemplateWrapper } from '@/components/templates/template-wrapper';
import { MDXRenderer } from '@/components/mdx-renderer';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('page');
  return slugs.filter(s => s.length > 0).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentBySlug('page', slug);
  if (!content) return {};
  return generateContentMetadata(content.meta);
}

export default async function PageRoute({ params }: PageProps) {
  const { slug } = await params;
  const content = getContentBySlug('page', slug);
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
