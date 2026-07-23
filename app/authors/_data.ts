import type { AuthorSchemaInput } from "@/lib/seo";
import { site } from "@/lib/site";

/**
 * Author identities for the ArraySubs resource library.
 *
 * Every field here must be factual and externally verifiable (see `profiles`).
 * Do not invent credentials, certifications, talks, or publications. When a
 * signal does not exist for an author, omit it rather than padding the bio.
 */

export type AuthorProfile = {
  label: string;
  /** Absolute URL to a verifiable external profile (feeds schema `sameAs`). */
  url: string;
};

export type AuthorWork = {
  name: string;
  description: string;
  /** Absolute URL or root-relative path. */
  url: string;
};

export type Author = {
  slug: string;
  name: string;
  jobTitle: string;
  /**
   * Narrative voice for the visible prose (`headline`, `bio`). Use "first"
   * only for the site owner writing as themselves; every third-party author
   * uses "third" (he/she/they). Controls person-referencing generated copy.
   */
  voice: "first" | "third";
  /** One-line summary shown under the name, written in `voice`. */
  headline: string;
  /**
   * Optional third-person entity statement for JSON-LD `Person.description`.
   * Keeps structured data entity-clear ("Emran is …") even when the visible
   * bio is first-person. Falls back to `headline` when omitted.
   */
  schemaDescription?: string;
  /** Headshot in /public (verifiable photo of the real person). */
  image: string;
  imageWidth: number;
  imageHeight: number;
  /** Factual biography, one entry per paragraph. */
  bio: string[];
  /** Verifiable experience / credentials. No certifications are claimed. */
  credentials: string[];
  /** Topics the person is genuinely qualified to cover. Feeds `knowsAbout`. */
  topics: string[];
  /** Selected real work, projects, and publications. */
  selectedWork: AuthorWork[];
  /** Verifiable external profiles. Feeds schema `sameAs`. */
  profiles: AuthorProfile[];
  /** Formal education, if any. Feeds schema `alumniOf`. */
  alumniOf?: string;
  /** Contact / verification for the publishing organization. */
  email: string;
};

export const AUTHOR_BASE = "/authors/";
export const DEFAULT_AUTHOR_SLUG = "emran";

export const AUTHORS: Record<string, Author> = {
  emran: {
    slug: "emran",
    name: "Emran",
    jobTitle: "Founder & Lead Engineer, ArrayHash",
    voice: "first",
    headline:
      "I founded ArrayHash and develop ArraySubs. 12+ years building WordPress, WooCommerce, and SaaS platforms.",
    schemaDescription:
      "Emran is the founder and lead engineer of ArrayHash, with 12+ years building WordPress, WooCommerce, and SaaS platforms.",
    image: "/authors/emran.webp",
    imageWidth: 512,
    imageHeight: 512,
    bio: [
      "I'm Emran — I founded ArrayHash and I'm the lead engineer of the plugins here. I've spent 12+ years building web platforms, specializing in system design and architecture across WordPress, WooCommerce, and SaaS products. I previously led big products ElementsKit, GetGenie, ShopEngine in Wpmet, and worked in Themewinter, XpeedStudio, and Bdthemes. Before ArraySubs I led engineering as CTO at multiple SaaS and WordPress product companies, including 5+ years scaling subscription and WordPress platforms.",
      "Every guide in this library comes from first-hand engineering of the exact subsystems it describes — the subscription data model, renewal scheduling, off-session Stripe payments, failed-payment recovery, and membership access control. I designed and coded these systems, so the guidance reflects how the software actually behaves rather than a summary of third-party articles.",
      "I'm a registered WordPress.org plugin developer (member since 2020) and the author and lead engineer of ArraySubs, shipping frequent releases to its public repository. ",
      "I hold a B.Sc in Computer Science & Engineering from Daffodil International University and work across PHP, WordPress, Node.js, React/Next.js, and AWS. I also maintain open-source WordPress and server tooling on GitHub.",
    ],
    credentials: [
      "Founder & Lead Engineer of ArrayHash - ArraySubs",
      "WordPress.org plugin developer since 2020 — sole author and maintainer of ArraySubs",
      "12+ years building WordPress, WooCommerce, and SaaS platforms",
      "Has led engineering as CTO at multiple SaaS / WordPress product companies",
      "B.Sc, Computer Science & Engineering — Daffodil International University",
    ],
    topics: [
      "WooCommerce subscriptions & recurring billing",
      "Memberships & content restriction",
      "Stripe & off-session / SCA renewals",
      "Failed-payment recovery & churn",
      "Subscription data modeling & architecture",
      "WordPress plugin engineering",
      "WooCommerce plugin engineering",
    ],
    selectedWork: [
      {
        name: "WooCommerce subscription engineering",
        description:
          "Architecture and operating guidance for WooCommerce renewals, payment gateways, memberships, and recurring billing.",
        url: "/articles/subscription-foundations/",
      },
      {
        name: "ArraySubs resource library",
        description:
          "Author of 75+ engineering-grade guides on subscription and membership operations.",
        url: "/articles/",
      },
      {
        name: "Open-source tooling",
        description:
          "WordPress and server utilities published on GitHub (@emranio).",
        url: "https://github.com/emranio",
      },
    ],
    profiles: [
      { label: "Personal site", url: "https://emran.io/" },
      { label: "WordPress.org", url: "https://profiles.wordpress.org/emranio/" },
      { label: "GitHub", url: "https://github.com/emranio" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/emranio/" },
    ],
    alumniOf: "Daffodil International University",
    email: site.email,
  },
};

export const AUTHOR_LIST: Author[] = Object.values(AUTHORS);

export function getAuthor(slug: string): Author | undefined {
  return AUTHORS[slug];
}

/** Resolve a resource article's `author` string to an Author record. */
export function getAuthorByName(name: string): Author {
  const match = AUTHOR_LIST.find((author) => author.name === name);
  return match ?? AUTHORS[DEFAULT_AUTHOR_SLUG];
}

export function getAuthorPath(author: Pick<Author, "slug">): string {
  return `${AUTHOR_BASE}${author.slug}/`;
}

/** Map an Author record to the primitive shape lib/seo needs for Person JSON-LD. */
export function authorSchemaInput(author: Author): AuthorSchemaInput {
  return {
    name: author.name,
    path: getAuthorPath(author),
    image: author.image,
    jobTitle: author.jobTitle,
    description: author.schemaDescription ?? author.headline,
    sameAs: author.profiles.map((profile) => profile.url),
    knowsAbout: author.topics,
    alumniOf: author.alumniOf,
  };
}
