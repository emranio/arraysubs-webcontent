import type { LucideIcon } from "lucide-react";

/**
 * Feature pillar pages — the 15 evergreen `/features/<slug>/` guide pages.
 *
 * Pillars are broader, SEO/GEO-focused topic pages layered above the granular
 * 67-module hub grid in `../_data.ts`. Slugs and `seoTitle` values are LOCKED:
 * they restore previously indexed URLs and browser titles, so never rename a
 * slug or seoTitle without a redirect plan. Copy inside is fully rewritable.
 */

export type PillarTier = "Free" | "Pro" | "Free + Pro";

export type PillarStat = { value: string; label: string };

export type PillarCapability = {
  title: string;
  description: string;
  /** Tier badge for this specific capability (defaults to no badge). */
  tier?: "Free" | "Pro";
};

/**
 * A question-led content block ("How does X work?", "Can I…?"). Rendered as an
 * `h2` with anchor id so search engines and AI answer engines can lift the
 * question + answer pair directly (GEO).
 */
export type PillarSection = {
  /** Anchor id, kebab-case, unique within the page. */
  id: string;
  /** The question, phrased the way a merchant actually searches it. */
  question: string;
  /** 1–3 readable paragraphs. `==text==` renders the brand highlight marker. */
  paragraphs: string[];
  /** Optional supporting bullet list rendered after the paragraphs. */
  bullets?: string[];
};

export type PillarStep = { title: string; description: string };

export type PillarFaq = { question: string; answer: string };

export type FeaturePillar = {
  /** LOCKED URL slug (see file header). */
  slug: string;
  icon: LucideIcon;
  /** Short display name for cards, nav, and related links. */
  name: string;
  /** One-line description for pillar cards on the hub and related grids. */
  cardDescription: string;
  tier: PillarTier;
  /** LOCKED `<title>` — the root layout appends " — ArraySubs". */
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  /** Short proof points under the hero subtitle. */
  heroHighlights: string[];
  /**
   * Quotable 2–3 sentence answer to "what is this / what does it do" written
   * in plain text (no highlight markers). Surfaced as the Quick-answer panel
   * and written to be liftable by AI answer engines verbatim.
   */
  directAnswer: string;
  /** Lead paragraph with `==highlight==` markers. */
  intro: string;
  /** Four at-a-glance tiles. */
  stats: PillarStat[];
  capabilities: PillarCapability[];
  /** Question-led deep content — the core of the page. */
  sections: PillarSection[];
  /** Setup walkthrough, also emitted as HowTo JSON-LD. */
  steps: PillarStep[];
  /** What ships free vs what Pro adds, scoped to this pillar only. */
  planSplit: { free: string[]; pro: string[] };
  /** Granular module slugs from `../_data.ts` rendered as hub cross-links. */
  moduleSlugs: string[];
  /** Resource article slugs from `../../resources/_data.ts`. */
  articleSlugs: string[];
  /** Use-case slugs from `../../use-cases/_data.ts`. */
  useCaseSlugs: string[];
  /** Sibling pillar slugs for the related-guides row. */
  relatedPillars: string[];
  faq: PillarFaq[];
};
