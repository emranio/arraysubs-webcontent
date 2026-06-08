import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { FEATURES, getFeature } from "../_data";
import { FeatureDetail } from "../_FeatureDetail";

// Only known feature slugs are valid; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return FEATURES.map((feature) => ({ slug: feature.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) return {};
  return createMetadata({
    title: feature.seoTitle,
    description: feature.metaDescription,
    path: `/deals/arraysubs/features/${feature.slug}/`,
  });
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) notFound();
  return <FeatureDetail feature={feature} />;
}
