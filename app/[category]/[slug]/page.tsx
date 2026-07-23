import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetail } from "@/app/articles/_components/ArticleDetail";
import {
  RESOURCE_ARTICLES,
  getArticlePath,
  getResourceArticle,
} from "@/app/articles/_data";
import {
  getArticleFaqs,
  getArticleHeadings,
  getArticleMarkdown,
  getArticleWordCount,
} from "@/app/articles/_content";
import { createMetadata } from "@/lib/seo";

export const dynamicParams = false;

type RouteParams = Promise<{ category: string; slug: string }>;

export function generateStaticParams() {
  return RESOURCE_ARTICLES.map((article) => ({
    category: article.categorySlug,
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getResourceArticle(category, slug);
  if (!article) return {};

  return createMetadata({
    title: article.seoTitle,
    description: article.metaDescription,
    path: getArticlePath(article),
    type: "article",
    ogImage: article.cover.image,
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

export default async function ResourceArticlePage({
  params,
}: {
  params: RouteParams;
}) {
  const { category, slug } = await params;
  const article = getResourceArticle(category, slug);
  if (!article) notFound();

  const markdown = getArticleMarkdown(article.slug);
  const headings = getArticleHeadings(markdown);
  const faqs = getArticleFaqs(markdown);
  const wordCount = getArticleWordCount(markdown);

  return (
    <ArticleDetail
      article={article}
      markdown={markdown}
      headings={headings}
      faqs={faqs}
      wordCount={wordCount}
    />
  );
}
