import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { USE_CASES, getUseCase } from "../_data";
import { UseCaseDetail } from "../_UseCaseDetail";

// Only the known use-case slugs are valid; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return USE_CASES.map((useCase) => ({ slug: useCase.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) return {};
  return createMetadata({
    title: useCase.seoTitle,
    description: useCase.metaDescription,
    path: `/deals/arraysubs/use-cases/${useCase.slug}/`,
  });
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) notFound();
  return <UseCaseDetail useCase={useCase} />;
}
