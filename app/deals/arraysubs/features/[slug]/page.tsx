import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { PILLARS, getPillar } from "../_pillars";
import { PillarDetail } from "../_PillarDetail";

// Only the 15 restored pillar slugs are valid; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PILLARS.map((pillar) => ({ slug: pillar.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) return {};
  return createMetadata({
    title: pillar.seoTitle,
    description: pillar.metaDescription,
    path: `/deals/arraysubs/features/${pillar.slug}/`,
  });
}

export default async function FeaturePillarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();
  return <PillarDetail pillar={pillar} />;
}
