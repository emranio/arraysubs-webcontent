import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { RECIPES, getRecipe } from "../../_recipes";
import { RecipeDetail } from "../../_RecipeDetail";

// Only the known recipe slugs are valid; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return RECIPES.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) return {};
  return createMetadata({
    title: recipe.seoTitle,
    description: recipe.metaDescription,
    path: `/deals/arraysubs/use-cases/recipes/${recipe.slug}/`,
  });
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();
  return <RecipeDetail recipe={recipe} />;
}
