import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getContentBySlug, getAllSlugs } from '@/lib/content';
import { generateContentMetadata } from '@/lib/seo';
import { generateSchemaJsonLd } from '@/lib/schema';
import { TemplateWrapper } from '@/components/templates/template-wrapper';
import { MDXRenderer } from '@/components/mdx-renderer';

interface ArticleProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('articles');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentBySlug('articles', slug);
  if (!content) return {};
  return generateContentMetadata(content.meta);
}

export default async function ArticlePage({ params }: ArticleProps) {
  const { slug } = await params;
  const content = getContentBySlug('articles', slug);
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
