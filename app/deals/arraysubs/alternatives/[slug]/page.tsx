import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { COMPARISONS, getComparison } from "../_data";
import { ComparisonDetail } from "../_ComparisonDetail";

// Only the known competitor slugs are valid; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARISONS.map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) return {};
  return createMetadata({
    title: comparison.seoTitle,
    description: comparison.metaDescription,
    path: `/deals/arraysubs/alternatives/${comparison.slug}/`,
    type: "article",
  });
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();
  return <ComparisonDetail comparison={comparison} />;
}
