import type { LucideIcon } from "lucide-react";
import { Boxes, Crown, Lock, Package, Repeat, Sparkles, Users } from "lucide-react";
import type {
  ComparisonCell,
  ComparisonColumn,
  ComparisonGroup,
  ComparisonRow,
} from "@/components/ui";

/**
 * Single source of truth for the ArraySubs comparison ("alternatives") pages.
 * The hub (`alternatives/page.tsx`) and the dynamic detail route
 * (`alternatives/[slug]/page.tsx`) both read from here.
 *
 * Competitor facts (pricing, ratings, feature support) are sourced from
 * `marketing-materials/research/competitor-analysis.md` (verified April 2026)
 * and each page brief in `marketing-materials/page-strategy/t3-comparisons/`.
 * Keep claims defensible and date-stamped — see each entry's `updated`.
 */

export type DifferenceWinner = "arraysubs" | "competitor" | "tie";

export type Comparison = {
  slug: string;
  /** Display name of the competing product. */
  competitor: string;
  /** Vendor behind the competitor (for context + entity clarity). */
  competitorVendor: string;
  /** Short label for the competitor column in the table (kept compact). */
  competitorShort: string;
  icon: LucideIcon;
  /** Two-line description for the hub grid card. */
  cardDescription: string;
  /** Descriptive <title> — the root layout appends " — ArraySubs". */
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  /** Short proof points shown under the hero subtitle. */
  heroHighlights: string[];
  /** Definition-style lead paragraph (answerable for GEO/AI extraction). */
  intro: string;
  /** Answer-first TL;DR block — the GEO money section. */
  verdict: {
    summary: string;
    arraysubsBestFor: string[];
    competitorBestFor: string[];
  };
  pricing: {
    arraysubs: string;
    competitor: string;
    /** e.g. "+ $199/yr for WooCommerce Memberships = $478/yr". */
    combinedNote?: string;
    /** Headline savings/value line. */
    savings?: string;
  };
  /** Optional "last updated" date for the competitor, shown as a fact. */
  competitorUpdated?: string;
  /** Feature-matrix groups; cells keyed "free" | "pro" | "competitor". */
  tableGroups: ComparisonGroup[];
  /** Balanced feature deep-dives, each tagged with a winner. */
  differences: { title: string; description: string; winner: DifferenceWinner }[];
  /** Short "how to switch from X" paragraph (omit when not applicable). */
  migration?: string;
  faq: { question: string; answer: string }[];
  /** Slugs of related comparisons (internal links). */
  related: string[];
  /** ISO date (YYYY-MM-DD) — drives Article freshness signals. */
  updated: string;
};

/* ---- Cell helpers ---------------------------------------------------------- */

/** Bare tick. The optional arg is ignored — no note text beside checks. */
const yes = (_note?: string): ComparisonCell => ({ kind: "check" });
/** `no()` → plain "not included"; `no("caveat")` → shows the caveat text. */
const no = (note?: string): ComparisonCell =>
  note ? { kind: "partial", label: note } : { kind: "no" };
const part = (label?: string): ComparisonCell => ({ kind: "partial", label });
const txt = (value: string): ComparisonCell => ({ kind: "text", value });

/** Build a 3-column row: ArraySubs Free, ArraySubs Pro, competitor. */
const row = (
  feature: string,
  free: ComparisonCell,
  pro: ComparisonCell,
  competitor: ComparisonCell,
  hint?: string,
): ComparisonRow => ({ feature, hint, cells: { free, pro, competitor } });

/** The fixed 3-column header used by every comparison table. */
export function comparisonColumns(c: Comparison): ComparisonColumn[] {
  return [
    { key: "free", name: "ArraySubs Free", offer: "$0 — free forever" },
    { key: "pro", name: "ArraySubs Pro", offer: "Free for 4 months", featured: true },
    { key: "competitor", name: c.competitorShort, offer: c.pricing.competitor },
  ];
}

const UPDATED = "2026-06-03";

export const COMPARISONS: Comparison[] = [
  /* ===================================================================== *
   * 1. WooCommerce Subscriptions (official)
   * ===================================================================== */
  {
    slug: "woocommerce-subscriptions",
    competitor: "WooCommerce Subscriptions",
    competitorVendor: "Automattic / WooCommerce",
    competitorShort: "Woo Subscriptions",
    icon: Crown,
    cardDescription:
      "The official $279/yr subscriptions plugin. ArraySubs matches its billing and adds memberships, retention, Store Credit, Feature Manager, Gateway Health, Member Insight & Analytics — free.",
    seoTitle: "ArraySubs vs WooCommerce Subscriptions — Free Alternative (2026)",
    metaDescription:
      "Side-by-side comparison of ArraySubs (free + Pro) vs WooCommerce Subscriptions ($279/yr). Feature matrix, pricing, memberships, retention flows and analytics compared for 2026.",
    h1: "ArraySubs vs WooCommerce Subscriptions",
    heroSubtitle:
      "WooCommerce Subscriptions is the official $279/yr recurring-billing plugin. ArraySubs covers the same billing in a free core — then adds memberships, retention flows, Store Credit, Feature Manager, Gateway Health, Member Insight and Analytics that Woo Subscriptions doesn't have.",
    heroHighlights: [
      "Free vs $279/yr",
      "Memberships built in",
      "Retention flow builder",
    ],
    intro:
      "ArraySubs is a ==free WooCommerce subscription and membership plugin== and a direct alternative to WooCommerce Subscriptions. It handles the same recurring billing — simple and variable products, trials, sign-up fees, plan switching — but bundles ==memberships, a retention flow builder, Store Credit, Feature Manager, Gateway Health, Member Insight, and Analytics workflows== that WooCommerce Subscriptions either omits or sells as a separate $199/yr plugin.",
    verdict: {
      summary:
        "Short answer: choose ArraySubs if you want subscriptions ==and== memberships in one plugin with churn-fighting retention flows, for free. WooCommerce Subscriptions ($279/yr) is mature and supports 25+ payment gateways, so it still fits stores deep in the official Woo ecosystem that need a niche gateway — but it has no memberships, retention, Store Credit, Feature Manager, Gateway Health, Member Insight or Analytics, and reaches $478/yr once you add WooCommerce Memberships.",
      arraysubsBestFor: [
        "Stores that need subscriptions and memberships together",
        "Anyone who wants to reduce churn with retention offers",
        "Budget-conscious merchants avoiding $279–$478/yr renewals",
        "Teams that want Analytics, Store Credit, Feature Manager, Gateway Health, and Member Insight",
      ],
      competitorBestFor: [
        "Stores already invested in the official Woo stack",
        "Merchants needing a niche gateway from Woo's 25+ list",
        "Buyers who prioritise the largest install base and brand",
      ],
    },
    pricing: {
      arraysubs: "Free core, forever. Pro is free for 4 months during early launch.",
      competitor: "$279/yr (1 site)",
      combinedNote:
        "Add WooCommerce Memberships ($199/yr) for member access — $478/yr for both, renewed annually.",
      savings: "Replaces a $478/yr two-plugin stack with one free plugin.",
    },
    tableGroups: [
      {
        label: "Pricing & licensing",
        rows: [
          row("Price", txt("$0"), txt("Free 4 months"), txt("$279/yr")),
          row("Free tier", yes(), yes(), no()),
          row("Subscriptions + memberships in one plugin", yes(), yes(), no("needs $199/yr add-on")),
        ],
      },
      {
        label: "Subscriptions & billing",
        rows: [
          row("Simple & variable subscriptions", yes(), yes(), yes()),
          row("Free trials & sign-up fees", yes(), yes(), yes()),
          row("Plan switching (upgrade/downgrade)", yes(), yes(), yes()),
          row("Different renewal price", yes(), yes(), no()),
          row("Skip next renewal", yes(), yes(), no()),
          row("Two-phase grace period", yes(), yes(), part("basic")),
          row("Auto-retry failed payments", no(), yes(), yes()),
          row("Gifting subscriptions", no(), no(), yes()),
          row("Payment gateways", part("manual"), txt("Stripe/PayPal/Paddle"), txt("25+")),
        ],
      },
      {
        label: "Memberships & access",
        rows: [
          row("Member access control", yes(), yes(), no("separate plugin")),
          row("Content dripping", yes(), yes(), no("separate plugin")),
          row("URL restriction & role mapping", yes(), yes(), no()),
        ],
      },
      {
        label: "Retention, revenue & insight",
        rows: [
          row("Retention flow builder", yes(), yes(), no()),
          row("Store Credit", no(), yes(), no()),
          row("Checkout and Payments", no(), yes(), no()),
          row("Analytics", no(), yes(), part("basic reports")),
          row("Setup wizard", yes(), yes(), no()),
        ],
      },
    ],
    differences: [
      {
        title: "Memberships are built in",
        description:
          "ArraySubs includes content restriction, dripping and role mapping free. WooCommerce Subscriptions needs the separate WooCommerce Memberships plugin ($199/yr) for any access control.",
        winner: "arraysubs",
      },
      {
        title: "Retention flows vs a bare cancel button",
        description:
          "ArraySubs intercepts cancellations with discount, pause and downgrade offers plus retention analytics. In Woo Subscriptions a customer clicks cancel and they're gone.",
        winner: "arraysubs",
      },
      {
        title: "Store credit & Checkout and Payments",
        description:
          "ArraySubs Pro adds Store Credit plus Checkout and Payments, including Pro checkout-builder workflows. WooCommerce Subscriptions has neither.",
        winner: "arraysubs",
      },
      {
        title: "Payment gateway breadth",
        description:
          "WooCommerce Subscriptions integrates 25+ gateways — its biggest moat. ArraySubs covers Stripe, PayPal and Paddle automatically plus manual renewal on any gateway.",
        winner: "competitor",
      },
      {
        title: "Install base & maturity",
        description:
          "WooCommerce Subscriptions has 100k+ installs and years of hardening, though its WordPress rating sits at 3.2★. ArraySubs is newer with a modern React admin.",
        winner: "competitor",
      },
      {
        title: "Recurring billing core",
        description:
          "Both handle simple and variable recurring products, trials, sign-up fees and plan switching reliably. This is a genuine tie on the fundamentals.",
        winner: "tie",
      },
    ],
    migration:
      "Switching from WooCommerce Subscriptions means recreating your subscription products in ArraySubs and migrating active subscribers. Because ArraySubs locks pricing at purchase, existing subscribers keep their rate. Install the free core alongside your current setup, rebuild products, then move subscribers — no need to also buy a membership plugin.",
    faq: [
      {
        question: "Is ArraySubs a free alternative to WooCommerce Subscriptions?",
        answer:
          "Yes. ArraySubs' free core handles simple and variable subscriptions, trials, sign-up fees, plan switching, grace periods and a customer portal — the recurring-billing essentials WooCommerce Subscriptions charges $279/yr for — plus memberships and retention flows at no cost.",
      },
      {
        question: "Can ArraySubs replace both WooCommerce Subscriptions and Memberships?",
        answer:
          "Yes. ArraySubs combines subscription billing and membership access control in one plugin, so you don't need WooCommerce Subscriptions ($279/yr) and WooCommerce Memberships ($199/yr) separately — a $478/yr stack replaced by one free plugin.",
      },
      {
        question: "Is WooCommerce Subscriptions better than ArraySubs?",
        answer:
          "WooCommerce Subscriptions is more established and supports 25+ payment gateways, which matters if you need a niche processor. But it lacks memberships, retention flows, Store Credit, Feature Manager, Gateway Health, Member Insight, and Analytics workflows, and costs $279/yr with no free tier.",
      },
      {
        question: "Can I migrate from WooCommerce Subscriptions to ArraySubs?",
        answer:
          "Yes. Install ArraySubs alongside your current setup, recreate your subscription products, then migrate active subscribers. Pricing is locked at purchase so subscribers keep their original rate.",
      },
      {
        question: "Does ArraySubs support automatic recurring payments like WooCommerce Subscriptions?",
        answer:
          "Yes. ArraySubs Pro adds automatic recurring billing via Stripe, PayPal and Paddle, and the free core supports manual renewal on any WooCommerce gateway.",
      },
    ],
    related: ["woocommerce-memberships", "yith-woocommerce-subscription", "wpsubscription"],
    updated: UPDATED,
  },

  /* ===================================================================== *
   * 2. WooCommerce Memberships (official)
   * ===================================================================== */
  {
    slug: "woocommerce-memberships",
    competitor: "WooCommerce Memberships",
    competitorVendor: "SkyVerge / WooCommerce",
    competitorShort: "Woo Memberships",
    icon: Users,
    cardDescription:
      "The official $199/yr memberships plugin — but it needs WooCommerce Subscriptions for recurring billing. ArraySubs does both, free.",
    seoTitle: "ArraySubs vs WooCommerce Memberships — Free Alternative (2026)",
    metaDescription:
      "Compare ArraySubs (free memberships + subscriptions) with WooCommerce Memberships ($199/yr, requires a separate subscription plugin). Content restriction, dripping, billing and pricing compared.",
    h1: "ArraySubs vs WooCommerce Memberships",
    heroSubtitle:
      "WooCommerce Memberships handles access control but needs WooCommerce Subscriptions for recurring billing. ArraySubs does memberships and subscriptions in one free plugin.",
    heroHighlights: [
      "Free vs $199/yr",
      "Recurring billing built in",
      "No second plugin needed",
    ],
    intro:
      "ArraySubs is a ==free WooCommerce membership and subscription plugin== and a direct alternative to WooCommerce Memberships. It restricts content by rules, drips content and maps roles like WooCommerce Memberships does — but it also ==bills memberships recurringly on its own==, so you avoid pairing it with the separate WooCommerce Subscriptions plugin ($279/yr) to charge members.",
    verdict: {
      summary:
        "Short answer: choose ArraySubs if you want memberships with built-in recurring billing, retention and analytics, for free. WooCommerce Memberships ($199/yr) is a solid access-control plugin with content dripping and a Teams add-on, but it has no billing engine of its own — recurring memberships require WooCommerce Subscriptions too, totalling $478/yr.",
      arraysubsBestFor: [
        "Paid membership sites that bill recurringly",
        "Anyone wanting memberships + subscriptions in one plugin",
        "Sites that want retention flows and member analytics",
        "Merchants avoiding a $478/yr two-plugin bill",
      ],
      competitorBestFor: [
        "Stores already on the official Woo stack",
        "Free or one-time memberships with no recurring billing",
        "Teams that need the $129/yr group-membership add-on",
      ],
    },
    pricing: {
      arraysubs: "Free core, forever. Pro is free for 4 months during early launch.",
      competitor: "$199/yr (1 site)",
      combinedNote:
        "Recurring memberships also need WooCommerce Subscriptions ($279/yr) — $478/yr for both.",
      savings: "Memberships + recurring billing in one free plugin, vs $478/yr.",
    },
    tableGroups: [
      {
        label: "Pricing & licensing",
        rows: [
          row("Price", txt("$0"), txt("Free 4 months"), txt("$199/yr")),
          row("Free tier", yes(), yes(), no()),
          row("Built-in recurring billing", yes(), yes(), no("needs Woo Subscriptions")),
        ],
      },
      {
        label: "Memberships & access",
        rows: [
          row("Content restriction rules", yes(), yes(), yes()),
          row("Content dripping / scheduling", yes(), yes(), yes()),
          row("Product & category restriction", yes(), yes(), yes()),
          row("Download restriction", yes(), yes(), yes()),
          row("URL pattern restriction", yes(), yes(), no()),
          row("Role mapping", yes(), yes(), no()),
          row("Rules engine (AND/OR groups)", yes(), yes(), no()),
          row("Restriction shortcodes", yes(), yes(), no()),
          row("Member-only free shipping", no(), no(), yes()),
          row("Teams / group memberships", no(), no(), part("$129/yr add-on")),
        ],
      },
      {
        label: "Subscriptions & billing",
        rows: [
          row("Recurring subscription products", yes(), yes(), no()),
          row("Plan switching & proration", yes(), yes(), no()),
          row("Customer self-service portal", yes(), yes(), part("members area")),
        ],
      },
      {
        label: "Retention, revenue & insight",
        rows: [
          row("Retention flow builder", yes(), yes(), no()),
          row("Store Credit", no(), yes(), no()),
          row("Analytics", no(), yes(), no()),
        ],
      },
    ],
    differences: [
      {
        title: "Built-in recurring billing",
        description:
          "ArraySubs bills memberships recurringly on its own. WooCommerce Memberships has no billing engine — it needs WooCommerce Subscriptions ($279/yr) to charge members on a schedule.",
        winner: "arraysubs",
      },
      {
        title: "Deeper restriction rules",
        description:
          "ArraySubs adds URL pattern restriction, role mapping and an AND/OR rules engine on top of standard content and product restriction. WooCommerce Memberships covers the basics well but without those.",
        winner: "arraysubs",
      },
      {
        title: "Retention, Store Credit, Feature Manager, Gateway Health, Member Insight & Analytics",
        description:
          "ArraySubs layers a retention flow builder, Store Credit, Retention Analytics, and Member Insight over access control. WooCommerce Memberships has none of these.",
        winner: "arraysubs",
      },
      {
        title: "Teams / group memberships",
        description:
          "WooCommerce Memberships offers a Teams add-on ($129/yr) for organisation-level memberships. ArraySubs does not yet have group memberships.",
        winner: "competitor",
      },
      {
        title: "Member-only free shipping",
        description:
          "WooCommerce Memberships includes member-only free shipping out of the box. In ArraySubs this is approximated with member discount rules.",
        winner: "competitor",
      },
      {
        title: "Core content restriction",
        description:
          "Both restrict pages, posts, products and downloads and support content dripping. On standard access control they are closely matched.",
        winner: "tie",
      },
    ],
    migration:
      "Moving from WooCommerce Memberships to ArraySubs means recreating your membership plans and restriction rules — most map directly to ArraySubs' rule types. The upside: you can drop WooCommerce Subscriptions at the same time, since ArraySubs bills members recurringly itself.",
    faq: [
      {
        question: "Can ArraySubs replace WooCommerce Memberships?",
        answer:
          "Yes. ArraySubs offers the same access control — content restriction, dripping, product/category and download restriction — plus URL restriction, role mapping and an AND/OR rules engine, all free, with recurring billing built in.",
      },
      {
        question: "Does WooCommerce Memberships work without WooCommerce Subscriptions?",
        answer:
          "Only for free or one-time memberships. To charge members on a recurring schedule, WooCommerce Memberships requires WooCommerce Subscriptions ($279/yr), totalling $478/yr. ArraySubs bills recurringly on its own.",
      },
      {
        question: "Is ArraySubs membership really free?",
        answer:
          "Yes. Content restriction, content dripping, role mapping, the rules engine and recurring member billing are all in the free core.",
      },
      {
        question: "What does WooCommerce Memberships do that ArraySubs doesn't?",
        answer:
          "WooCommerce Memberships has a paid Teams add-on for group memberships and built-in member-only free shipping. ArraySubs lacks group memberships today and handles member perks through discount rules instead.",
      },
    ],
    related: ["woocommerce-subscriptions", "yith-woocommerce-membership"],
    updated: UPDATED,
  },

  /* ===================================================================== *
   * 3. YITH WooCommerce Subscription
   * ===================================================================== */
  {
    slug: "yith-woocommerce-subscription",
    competitor: "YITH WooCommerce Subscription",
    competitorVendor: "YITH (Your Inspiration Solutions)",
    competitorShort: "YITH Subscription",
    icon: Repeat,
    cardDescription:
      "YITH's €199.99/yr subscription plugin with a limited free tier. ArraySubs adds memberships, retention and store credit — and a fuller free core.",
    seoTitle: "ArraySubs vs YITH WooCommerce Subscription — Comparison (2026)",
    metaDescription:
      "Compare ArraySubs (free subscriptions + memberships) with YITH WooCommerce Subscription (€199.99/yr). Feature matrix, pricing, gateways and unique capabilities compared for 2026.",
    h1: "ArraySubs vs YITH WooCommerce Subscription",
    heroSubtitle:
      "YITH WooCommerce Subscription is a freemium plugin whose useful features sit behind a €199.99/yr premium. ArraySubs offers a far fuller free core plus memberships, retention and store credit.",
    heroHighlights: [
      "Fuller free tier",
      "Memberships included",
      "Not locked to one vendor's gateways",
    ],
    intro:
      "ArraySubs is an ==all-in-one alternative to YITH WooCommerce Subscription==. Both create recurring products, but YITH's free version is limited (PayPal-only auto-pay) and its real capabilities — trials, sign-up fees, failed-payment handling — need the €199.99/yr premium. ArraySubs puts ==subscriptions, memberships, retention flows, Store Credit, Feature Manager, Gateway Health, Member Insight, and Analytics workflows== in one plugin without locking you into a single vendor's gateway add-ons.",
    verdict: {
      summary:
        "Short answer: choose ArraySubs for a genuinely capable free tier plus memberships, retention and store credit in one plugin. YITH WooCommerce Subscription suits stores already invested in the YITH ecosystem, and it has a unique Subscription Box module — but its free tier is thin, upgrade/downgrade is limited to variable products, its gateways are mostly YITH's own paid plugins, and its WordPress.org rating is 3.0★.",
      arraysubsBestFor: [
        "Stores wanting a capable free subscription core",
        "Anyone needing subscriptions and memberships together",
        "Merchants who want retention flows, Store Credit, Feature Manager, Gateway Health, Member Insight, and Analytics workflows",
        "Teams avoiding YITH's add-on gateway lock-in",
      ],
      competitorBestFor: [
        "Stores already standardised on YITH plugins",
        "Curated subscription boxes (YITH's Box module)",
        "Sellers wanting YITH's delivery scheduling features",
      ],
    },
    pricing: {
      arraysubs: "Free core, forever. Pro is free for 4 months during early launch.",
      competitor: "€199.99/yr",
      combinedNote:
        "Memberships need YITH WooCommerce Membership too (€179.99/yr) — €379.98/yr (~$413) combined.",
      savings: "One free plugin instead of a ~€379.98/yr YITH pair.",
    },
    tableGroups: [
      {
        label: "Pricing & licensing",
        rows: [
          row("Price", txt("$0"), txt("Free 4 months"), txt("€199.99/yr")),
          row("Capable free tier", yes(), yes(), part("very limited")),
          row("Memberships in same plugin", yes(), yes(), no("€179.99/yr add-on")),
        ],
      },
      {
        label: "Subscriptions & billing",
        rows: [
          row("Simple subscriptions", yes(), yes(), yes("free")),
          row("Variable-product subscriptions", yes(), yes(), part("premium")),
          row("Free trials & sign-up fees", yes(), yes(), part("premium")),
          row("Plan switching", yes(), yes(), part("variable only")),
          row("Different renewal price", yes(), yes(), no()),
          row("Skip next renewal", yes(), yes(), no()),
          row("Auto-suspend / retry on failure", yes("auto-downgrade, Pro"), yes(), yes("premium")),
          row("Subscription box module", no(), no(), yes("premium")),
          row("Gateways", part("manual"), txt("Stripe/PayPal/Paddle"), txt("YITH add-ons")),
        ],
      },
      {
        label: "Memberships & access",
        rows: [
          row("Member access control", yes(), yes(), no("separate plugin")),
          row("Content dripping", yes(), yes(), no("separate plugin")),
        ],
      },
      {
        label: "Retention, revenue & insight",
        rows: [
          row("Retention flow builder", yes(), yes(), no()),
          row("Store Credit", no(), yes(), no()),
          row("Checkout and Payments", no(), yes(), no()),
          row("Analytics", no(), yes(), part("basic dashboard")),
          row("Setup wizard", yes(), yes(), no()),
        ],
      },
    ],
    differences: [
      {
        title: "A free tier that actually does the job",
        description:
          "ArraySubs' free core includes variable products, trials, sign-up fees and plan switching. YITH's free version is limited to PayPal auto-pay and pushes the useful features into the €199.99/yr premium.",
        winner: "arraysubs",
      },
      {
        title: "No gateway lock-in",
        description:
          "ArraySubs supports Stripe, PayPal and Paddle directly. YITH's automatic gateways mostly require buying additional YITH plugins (YITH Stripe, PayPal Express), raising the real cost.",
        winner: "arraysubs",
      },
      {
        title: "Memberships, retention & store credit",
        description:
          "ArraySubs bundles memberships, a retention flow builder, Store Credit, and Pro operational modules. YITH needs a separate €179.99/yr membership plugin and has no retention or store credit at all.",
        winner: "arraysubs",
      },
      {
        title: "Subscription Box module",
        description:
          "YITH WooCommerce Subscription has a polished Subscription Box module letting customers choose box contents — useful for curated-box businesses. ArraySubs doesn't offer this yet.",
        winner: "competitor",
      },
      {
        title: "Delivery scheduling",
        description:
          "YITH includes delivery scheduling with sync and PDF shipping labels for physical subscriptions. ArraySubs covers subscription shipping but without YITH's scheduling depth.",
        winner: "competitor",
      },
      {
        title: "Core recurring products",
        description:
          "Both create simple and variable recurring products with daily-to-yearly cycles. On the fundamentals they're comparable.",
        winner: "tie",
      },
    ],
    migration:
      "Coming from YITH WooCommerce Subscription, you'll recreate subscription products in ArraySubs and migrate subscribers. The win is consolidation: features you'd buy across YITH Subscription and YITH Membership (€379.98/yr) live in one free ArraySubs install, with no per-gateway add-ons.",
    faq: [
      {
        question: "Is ArraySubs a good YITH WooCommerce Subscription alternative?",
        answer:
          "Yes. ArraySubs offers a much fuller free tier — variable products, trials, sign-up fees, plan switching — plus memberships, retention flows and Store Credit, Feature Manager, Gateway Health, Member Insight, and Analytics workflows that YITH lacks, without YITH's per-gateway add-on costs.",
      },
      {
        question: "Is ArraySubs cheaper than YITH WooCommerce Subscription?",
        answer:
          "Yes. ArraySubs' core is free and Pro is free for 4 months during early launch, while YITH's premium is €199.99/yr — and €379.98/yr once you add YITH Membership for access control.",
      },
      {
        question: "Does ArraySubs have a subscription box feature like YITH?",
        answer:
          "Not yet. YITH's Subscription Box module, which lets customers choose box contents, is a genuine YITH advantage for curated-box stores. ArraySubs focuses on subscriptions, memberships, retention and analytics.",
      },
      {
        question: "Can I get memberships with ArraySubs without a second plugin?",
        answer:
          "Yes. ArraySubs includes member access control free. YITH requires the separate YITH WooCommerce Membership plugin (€179.99/yr) for the same.",
      },
    ],
    related: ["yith-woocommerce-membership", "woocommerce-subscriptions"],
    updated: UPDATED,
  },

  /* ===================================================================== *
   * 4. YITH WooCommerce Membership
   * ===================================================================== */
  {
    slug: "yith-woocommerce-membership",
    competitor: "YITH WooCommerce Membership",
    competitorVendor: "YITH (Your Inspiration Solutions)",
    competitorShort: "YITH Membership",
    icon: Lock,
    cardDescription:
      "YITH's premium-only €179.99/yr membership plugin that needs YITH Subscription to bill. ArraySubs does memberships + billing free.",
    seoTitle: "ArraySubs vs YITH WooCommerce Membership — Comparison (2026)",
    metaDescription:
      "Compare ArraySubs (free memberships + subscriptions) with YITH WooCommerce Membership (€179.99/yr). Content restriction, dripping, billing and pricing compared for 2026.",
    h1: "ArraySubs vs YITH WooCommerce Membership",
    heroSubtitle:
      "YITH WooCommerce Membership is premium-only (€179.99/yr) and needs YITH Subscription for recurring billing. ArraySubs gives you memberships and subscription billing in one free plugin.",
    heroHighlights: [
      "Free vs €179.99/yr",
      "Recurring billing built in",
      "AND/OR rules engine",
    ],
    intro:
      "ArraySubs is a ==free alternative to YITH WooCommerce Membership==. It restricts content, drips access and maps roles like YITH does, but adds a ==URL-pattern rules engine and recurring subscription billing== in the same plugin — where YITH Membership is premium-only and depends on YITH Subscription (€199.99/yr) to charge members.",
    verdict: {
      summary:
        "Short answer: choose ArraySubs for free memberships with built-in recurring billing, a rules engine and retention. YITH WooCommerce Membership is well-rated (4.47★) with niche strengths like a download-credit system and a 'limited content preview' paywall model — but it has no free tier, no billing of its own, and needs YITH Subscription too, for €379.98/yr combined.",
      arraysubsBestFor: [
        "Membership sites that need recurring billing built in",
        "Anyone wanting an AND/OR rules engine and URL restriction",
        "Merchants who want retention flows, Store Credit, Feature Manager, Gateway Health, Member Insight, and Analytics workflows",
        "Sites avoiding a €379.98/yr YITH pair",
      ],
      competitorBestFor: [
        "Stock-image / resource sites needing download credits",
        "Paywall publishers wanting limited-preview content",
        "Stores already committed to the YITH ecosystem",
      ],
    },
    pricing: {
      arraysubs: "Free core, forever. Pro is free for 4 months during early launch.",
      competitor: "€179.99/yr (premium-only)",
      combinedNote:
        "Recurring memberships also need YITH Subscription (€199.99/yr) — €379.98/yr (~$413) combined.",
      savings: "Memberships + recurring billing free, vs ~€379.98/yr.",
    },
    tableGroups: [
      {
        label: "Pricing & licensing",
        rows: [
          row("Price", txt("$0"), txt("Free 4 months"), txt("€179.99/yr")),
          row("Free tier", yes(), yes(), no()),
          row("Built-in recurring billing", yes(), yes(), no("needs YITH Subscription")),
        ],
      },
      {
        label: "Memberships & access",
        rows: [
          row("Content restriction rules", yes(), yes(), yes()),
          row("Content dripping", yes(), yes(), yes()),
          row("Download restriction", yes(), yes(), yes()),
          row("Private / hidden shop", yes(), yes(), yes()),
          row("URL pattern restriction", yes(), yes(), no()),
          row("Role mapping", yes(), yes(), no()),
          row("Rules engine (AND/OR groups)", yes(), yes(), no()),
          row("Limited content preview (paywall)", no(), no(), yes()),
          row("Download credit system", no(), no(), yes()),
        ],
      },
      {
        label: "Subscriptions & billing",
        rows: [
          row("Recurring subscription products", yes(), yes(), no()),
          row("Customer self-service portal", yes(), yes(), part("member area")),
        ],
      },
      {
        label: "Retention, revenue & insight",
        rows: [
          row("Retention flow builder", yes(), yes(), no()),
          row("Store Credit", no(), yes(), no()),
          row("Analytics", no(), yes(), no()),
        ],
      },
    ],
    differences: [
      {
        title: "Free, with billing built in",
        description:
          "ArraySubs offers memberships free with recurring billing included. YITH Membership is premium-only (€179.99/yr) and needs YITH Subscription (€199.99/yr) to charge members.",
        winner: "arraysubs",
      },
      {
        title: "Rules engine & URL restriction",
        description:
          "ArraySubs adds an AND/OR rules engine and URL-pattern restriction. YITH Membership lacks both, restricting by simpler permission rules.",
        winner: "arraysubs",
      },
      {
        title: "Retention, Store Credit & operations",
        description:
          "ArraySubs includes a retention flow builder, Store Credit, and Pro operational modules. YITH Membership has neither.",
        winner: "arraysubs",
      },
      {
        title: "Download credit system",
        description:
          "YITH Membership's download-credit system is purpose-built for stock-image and resource platforms that meter downloads. ArraySubs doesn't offer download credits.",
        winner: "competitor",
      },
      {
        title: "Limited content preview",
        description:
          "YITH's 'newspaper model' shows a content preview then blocks the rest — handy for paywalled publishers. ArraySubs restricts at the block level without that partial-preview mode.",
        winner: "competitor",
      },
      {
        title: "Core access control",
        description:
          "Both restrict content, drip access and hide products from non-members. On standard membership access they're well matched.",
        winner: "tie",
      },
    ],
    migration:
      "From YITH WooCommerce Membership, recreate your plans and restriction rules in ArraySubs — most permission rules map across. You can also drop YITH Subscription, since ArraySubs bills members recurringly itself, collapsing a €379.98/yr pair into one free plugin.",
    faq: [
      {
        question: "Is ArraySubs a free YITH WooCommerce Membership alternative?",
        answer:
          "Yes. ArraySubs provides content restriction, dripping, download restriction and a private shop free, plus a rules engine and URL restriction YITH lacks — and it bills members recurringly without a second plugin.",
      },
      {
        question: "Does YITH Membership include recurring billing?",
        answer:
          "No. YITH WooCommerce Membership requires YITH WooCommerce Subscription (€199.99/yr) for recurring billing, totalling €379.98/yr. ArraySubs includes billing in its free core.",
      },
      {
        question: "What does YITH Membership do that ArraySubs doesn't?",
        answer:
          "YITH has a download-credit system for stock-resource sites and a limited content-preview paywall mode. ArraySubs focuses on rules-based restriction with built-in billing, retention and analytics.",
      },
      {
        question: "Is ArraySubs cheaper than YITH WooCommerce Membership?",
        answer:
          "Yes. ArraySubs is free (Pro free for 4 months during early launch), while YITH Membership is €179.99/yr and premium-only, rising to €379.98/yr with YITH Subscription for billing.",
      },
    ],
    related: ["yith-woocommerce-subscription", "woocommerce-memberships"],
    updated: UPDATED,
  },

  /* ===================================================================== *
   * 5. Subscriptions for WooCommerce by WP Swings
   * ===================================================================== */
  {
    slug: "wp-swings-subscriptions",
    competitor: "Subscriptions for WooCommerce (WP Swings)",
    competitorVendor: "WP Swings",
    competitorShort: "WP Swings",
    icon: Boxes,
    cardDescription:
      "A popular free subscription plugin with 10k+ installs. ArraySubs is also free but adds memberships, retention flows and a setup wizard.",
    seoTitle: "ArraySubs vs WP Swings Subscriptions for WooCommerce (2026)",
    metaDescription:
      "Two free WooCommerce subscription plugins compared. ArraySubs vs Subscriptions for WooCommerce by WP Swings — memberships, retention flows, plan switching and analytics side by side for 2026.",
    h1: "ArraySubs vs WP Swings Subscriptions",
    heroSubtitle:
      "Both ArraySubs and WP Swings' Subscriptions for WooCommerce are free. WP Swings has the longer track record; ArraySubs adds memberships, retention flows, plan switching and a setup wizard on top of free billing.",
    heroHighlights: [
      "Free vs free",
      "Memberships included",
      "Plan switching + retention",
    ],
    intro:
      "ArraySubs and Subscriptions for WooCommerce by WP Swings are both ==free WooCommerce subscription plugins==. WP Swings is well-established (10k+ installs, 4.4★) and even has a free subscription-box option, but its ==free tier lacks plan switching, memberships and retention flows== — those need WP Swings Pro ($129/yr) or a separate plugin. ArraySubs puts plan switching, memberships, a retention flow builder and a setup wizard in its free core.",
    verdict: {
      summary:
        "Short answer: pick ArraySubs if you want more from a free plugin — memberships, plan switching, retention flows and a setup wizard, all in the free tier. WP Swings' Subscriptions for WooCommerce is a proven option (10k+ installs) with a free subscription box, but its free tier is thinner: plan switching, pause, grace periods and analytics are Pro ($129/yr), and memberships need its separate plugin.",
      arraysubsBestFor: [
        "Stores wanting memberships and subscriptions free",
        "Anyone needing plan switching with proration",
        "Merchants who want retention flows and a setup wizard",
        "Teams that value a modern React admin",
      ],
      competitorBestFor: [
        "Stores wanting the most-installed free option",
        "Simple subscription boxes on a free plugin",
        "Merchants who only need basic recurring billing",
      ],
    },
    pricing: {
      arraysubs: "Free core, forever. Pro is free for 4 months during early launch.",
      competitor: "Free + Pro ($129/yr)",
      combinedNote:
        "Memberships need WP Swings' separate Membership plugin (800+ installs).",
      savings: "More in the free tier, plus memberships, with no second plugin.",
    },
    tableGroups: [
      {
        label: "Pricing & licensing",
        rows: [
          row("Price", txt("$0"), txt("Free 4 months"), txt("$129/yr")),
          row("Free tier", yes(), yes(), yes()),
          row("Memberships in same plugin", yes(), yes(), no("separate plugin")),
        ],
      },
      {
        label: "Subscriptions & billing",
        rows: [
          row("Simple subscriptions", yes(), yes(), yes("free")),
          row("Variable subscriptions", yes(), yes(), part("Pro")),
          row("Free trial & sign-up fee", yes(), yes(), yes("free")),
          row("Plan switching (upgrade/downgrade)", yes(), yes(), part("Pro")),
          row("Different renewal price / skip renewal", yes(), yes(), no()),
          row("Two-phase grace period", yes(), yes(), part("Pro")),
          row("Auto-retry failed payments", no(), yes(), part("Pro")),
          row("Subscription box", no(), no(), yes("free")),
          row("Multiple gateways", part("manual"), txt("Stripe/PayPal/Paddle"), part("4 free, +Pro")),
        ],
      },
      {
        label: "Memberships & access",
        rows: [
          row("Member access control", yes(), yes(), no("separate plugin")),
          row("Content dripping & role mapping", yes(), yes(), no()),
        ],
      },
      {
        label: "Retention, revenue & insight",
        rows: [
          row("Retention flow builder", yes(), yes(), no()),
          row("Store Credit", no(), yes(), no()),
          row("Analytics", no(), yes(), part("Pro")),
          row("Setup wizard", yes(), yes(), part("basic")),
        ],
      },
    ],
    differences: [
      {
        title: "Plan switching — free vs Pro",
        description:
          "ArraySubs includes upgrade / downgrade / crossgrade with proration in its free core. WP Swings offers plan switching too, but only in its Pro tier ($129/yr) and on variable products.",
        winner: "arraysubs",
      },
      {
        title: "Memberships in the box",
        description:
          "ArraySubs includes member access control free. WP Swings needs its separate Membership plugin (only 800+ installs) for any restriction.",
        winner: "arraysubs",
      },
      {
        title: "Retention & free analytics",
        description:
          "ArraySubs adds a retention flow builder, analytics and a guided setup wizard in its free core. WP Swings has no retention flow, and its analytics sit behind Pro.",
        winner: "arraysubs",
      },
      {
        title: "Install base & track record",
        description:
          "WP Swings' Subscriptions has 10k+ installs and a 4.4★ rating over years of updates. ArraySubs is newer and still building its base.",
        winner: "competitor",
      },
      {
        title: "Free subscription box",
        description:
          "WP Swings offers subscription-box support in its free tier. ArraySubs doesn't have a dedicated box module yet.",
        winner: "competitor",
      },
      {
        title: "Free recurring billing",
        description:
          "Both offer free simple subscriptions with trials and sign-up fees and active development. On basic free billing they're comparable.",
        winner: "tie",
      },
    ],
    migration:
      "Both are free, so trialling ArraySubs alongside WP Swings is low-risk. Recreate your subscription products in ArraySubs, then move subscribers when ready — you gain plan switching, memberships and retention without adding a second plugin.",
    faq: [
      {
        question: "Which is better, ArraySubs or WP Swings Subscriptions?",
        answer:
          "Both have free tiers. ArraySubs' free tier offers more — memberships, plan switching, retention flows and a setup wizard — where WP Swings keeps plan switching and analytics in Pro and memberships in a separate plugin. WP Swings has a larger install base and a free subscription box.",
      },
      {
        question: "Does WP Swings Subscriptions support plan switching?",
        answer:
          "Yes — in its Pro tier ($129/yr), as upgrade/downgrade on variable products. ArraySubs includes plan switching with three proration methods in its free core.",
      },
      {
        question: "Can ArraySubs handle memberships like WP Swings' membership plugin?",
        answer:
          "Yes, in one plugin. ArraySubs includes member access control free, whereas WP Swings ships memberships as a separate plugin with a much smaller user base.",
      },
      {
        question: "Is ArraySubs' free tier bigger than WP Swings'?",
        answer:
          "Generally yes. ArraySubs' free core adds memberships, plan switching, grace periods, retention flows and a setup wizard that WP Swings' free subscription plugin doesn't include.",
      },
    ],
    related: ["woocommerce-subscriptions", "wpsubscription"],
    updated: UPDATED,
  },

  /* ===================================================================== *
   * 6. SUMO Subscriptions
   * ===================================================================== */
  {
    slug: "sumo-subscriptions",
    competitor: "SUMO Subscriptions",
    competitorVendor: "Fantastic Plugins (CodeCanyon)",
    competitorShort: "SUMO",
    icon: Package,
    cardDescription:
      "A deep but infrequently-updated CodeCanyon plugin (~$49 one-time, premium-only; last release Feb 2026). ArraySubs matches the billing depth but adds memberships, retention, Store Credit, Feature Manager, Gateway Health, Member Insight, and Analytics, free.",
    seoTitle: "ArraySubs vs SUMO Subscriptions — WooCommerce Comparison (2026)",
    metaDescription:
      "Compare ArraySubs (free + Pro) with SUMO Subscriptions, a CodeCanyon plugin. Feature matrix, one-time vs free pricing, support and update cadence compared for 2026.",
    h1: "ArraySubs vs SUMO Subscriptions",
    heroSubtitle:
      "SUMO Subscriptions is a feature-deep, premium-only CodeCanyon plugin with one-time pricing and a legacy admin. ArraySubs covers the same billing depth and adds memberships, retention and analytics in a modern, free core.",
    heroHighlights: [
      "Free vs ~$49 one-time",
      "Modern admin & free tier",
      "Memberships + retention",
    ],
    intro:
      "ArraySubs is a modern alternative to SUMO Subscriptions. SUMO is a ==deep, premium-only CodeCanyon plugin== — grouped products, paid trials, a master transaction log — but it ships updates infrequently (==last release Feb 2026==), has no free tier or WordPress.org listing, runs a legacy admin, and has no memberships, retention, Store Credit, Feature Manager, Gateway Health, Member Insight or Analytics. ArraySubs delivers all of those on a modern React stack, free.",
    verdict: {
      summary:
        "Short answer: choose ArraySubs for a free tier and a far broader feature set — memberships, retention, Store Credit, Feature Manager, Gateway Health, Member Insight, and Analytics — on a modern admin. SUMO Subscriptions still appeals for its one-time CodeCanyon pricing and niche billing features like grouped-product subscriptions and paid trials — but it's premium-only (no free tier), updated infrequently (last release Feb 2026), runs a legacy admin, and has none of those modern modules.",
      arraysubsBestFor: [
        "Stores that want a free tier, not premium-only",
        "Anyone needing memberships, retention and analytics",
        "Merchants who prefer a modern React admin",
        "Teams that want an all-in-one, not add-ons",
      ],
      competitorBestFor: [
        "Buyers who insist on one-time CodeCanyon pricing",
        "Stores needing grouped-product subscriptions",
        "Niche cases needing paid (not free) trials",
      ],
    },
    pricing: {
      arraysubs: "Free core, forever. Pro is free for 4 months during early launch.",
      competitor: "~$49 one-time (CodeCanyon)",
      combinedNote:
        "Access control needs SUMO Memberships too (~$39) — ~$88 one-time, premium-only.",
      savings: "A free, all-in-one plugin vs a premium-only, two-purchase stack.",
    },
    competitorUpdated: "23 February 2026",
    tableGroups: [
      {
        label: "Pricing, support & maintenance",
        rows: [
          row("Price", txt("$0"), txt("Free 4 months"), txt("~$49 one-time")),
          row("Free tier", yes(), yes(), no()),
          row("Modern React admin", yes(), yes(), no("legacy")),
          row("WordPress.org listing", yes(), yes(), no("CodeCanyon only")),
          row("Dedicated support", yes(), yes(), part("marketplace")),
        ],
      },
      {
        label: "Subscriptions & billing",
        rows: [
          row("Simple & variable subscriptions", yes(), yes(), yes()),
          row("Grouped product subscriptions", no(), no(), yes()),
          row("Free trial", yes(), yes(), yes()),
          row("Paid trial", no(), no(), yes()),
          row("Plan switching", yes(), yes(), part("variation only")),
          row("Different renewal price / skip renewal", yes(), yes(), no()),
          row("Pause & grace period", yes(), yes(), yes()),
        ],
      },
      {
        label: "Memberships & access",
        rows: [
          row("Member access control", yes(), yes(), no("separate plugin")),
          row("URL & role-based restriction", yes(), yes(), part("SUMO Memberships")),
        ],
      },
      {
        label: "Retention, revenue & insight",
        rows: [
          row("Retention flow builder", yes(), yes(), no()),
          row("Store Credit", no(), yes(), no()),
          row("Analytics", no(), yes(), no()),
          row("Audit & activity logs", no(), yes(), part("transaction log")),
          row("Setup wizard", yes(), yes(), no()),
        ],
      },
    ],
    differences: [
      {
        title: "Modern stack & free tier",
        description:
          "ArraySubs is free and runs a modern React admin with memberships, retention and analytics. SUMO is premium-only on CodeCanyon with a legacy admin, infrequent updates (last release Feb 2026), and none of those modules.",
        winner: "arraysubs",
      },
      {
        title: "Free tier and dedicated support",
        description:
          "ArraySubs has a generous free tier and dedicated support. SUMO is premium-only via CodeCanyon, with marketplace-style support and no free version.",
        winner: "arraysubs",
      },
      {
        title: "Memberships, retention & analytics",
        description:
          "ArraySubs bundles memberships, retention flows and analytics. SUMO needs a separate SUMO Memberships purchase and has no retention or analytics.",
        winner: "arraysubs",
      },
      {
        title: "Grouped-product subscriptions",
        description:
          "SUMO supports grouped-product subscriptions, a genuinely uncommon capability. ArraySubs doesn't offer grouped subscriptions today.",
        winner: "competitor",
      },
      {
        title: "Paid trials & one-time pricing",
        description:
          "SUMO offers paid trials and a one-time CodeCanyon license, which some buyers prefer over recurring fees. ArraySubs uses free + Pro and free trials only.",
        winner: "competitor",
      },
      {
        title: "Core subscription depth",
        description:
          "Both offer rich subscription controls — cycles, pause, grace periods, manual creation. On core subscription features they're closely matched.",
        winner: "tie",
      },
    ],
    migration:
      "Migrating from SUMO Subscriptions means rebuilding products in ArraySubs. You move from a premium-only CodeCanyon plugin with a legacy admin to a free core with a modern admin and built-in memberships, retention and analytics — and you drop the separate SUMO Memberships purchase.",
    faq: [
      {
        question: "Is ArraySubs a good SUMO Subscriptions alternative?",
        answer:
          "Yes. ArraySubs has a free tier and adds memberships, retention flows and analytics on a modern admin. SUMO is a mature CodeCanyon plugin but updated infrequently (last release Feb 2026), premium-only, with a legacy admin and none of those modules.",
      },
      {
        question: "Is SUMO Subscriptions still maintained?",
        answer:
          "Its most recent release was v17.5.0 in February 2026, so updates are infrequent. It's also premium-only with no free tier, uses a legacy admin, and lacks memberships, retention, Store Credit, Feature Manager, Gateway Health, Member Insight, and Analytics — all of which ArraySubs includes.",
      },
      {
        question: "Does ArraySubs use one-time pricing like SUMO?",
        answer:
          "No. ArraySubs is free at the core with a Pro tier (free for 4 months during early launch), rather than SUMO's ~$49 one-time CodeCanyon license. The trade-off is active development and a free tier.",
      },
      {
        question: "What does SUMO do that ArraySubs doesn't?",
        answer:
          "SUMO supports grouped-product subscriptions and paid trials, both uncommon. ArraySubs prioritises memberships, retention, analytics and active maintenance instead.",
      },
    ],
    related: ["woocommerce-subscriptions", "wp-swings-subscriptions"],
    updated: UPDATED,
  },

  /* ===================================================================== *
   * 7. WPSubscription (Convers Lab)
   * ===================================================================== */
  {
    slug: "wpsubscription",
    competitor: "WPSubscription",
    competitorVendor: "Convers Lab",
    competitorShort: "WPSubscription",
    icon: Sparkles,
    cardDescription:
      "A well-reviewed newer plugin (4.9★) with installment payments and 6 gateways. ArraySubs is broader — memberships, retention, store credit, analytics.",
    seoTitle: "ArraySubs vs WPSubscription — WooCommerce Comparison (2026)",
    metaDescription:
      "Compare ArraySubs and WPSubscription for WooCommerce. Feature matrix, pricing, memberships, gateways and unique capabilities like installment payments and retention compared for 2026.",
    h1: "ArraySubs vs WPSubscription",
    heroSubtitle:
      "WPSubscription is a newer, well-reviewed plugin (4.9★) with installment payments and six gateways. ArraySubs is broader — adding memberships, retention flows, Store Credit, Feature Manager, Gateway Health, Member Insight and Analytics on top of subscriptions.",
    heroHighlights: [
      "Memberships included",
      "Retention + store credit",
      "Broader free core",
    ],
    intro:
      "ArraySubs is a broader ==alternative to WPSubscription== by Convers Lab. WPSubscription is a promising newer plugin (700+ installs, 4.9★) with strengths ArraySubs lacks — ==installment/split payments and six payment gateways== — but it's subscriptions-only, with no memberships, store credit, retention or analytics. ArraySubs bundles all of those into one free plugin.",
    verdict: {
      summary:
        "Short answer: choose ArraySubs for a broader all-in-one — memberships, retention flows, Store Credit, Feature Manager, Gateway Health, Member Insight and Analytics alongside subscriptions. WPSubscription is excellent if your priorities are installment/split payments and the widest gateway list (six, including Razorpay and Xendit) — but it's subscriptions-only, very early stage (700+ installs), and has no membership, retention or analytics features.",
      arraysubsBestFor: [
        "Stores needing subscriptions and memberships together",
        "Anyone who wants retention flows, Store Credit, Feature Manager, Gateway Health, Member Insight, and Analytics workflows",
        "Merchants who value analytics and a setup wizard",
        "Teams wanting a broad free feature set",
      ],
      competitorBestFor: [
        "Stores that need installment / split payments",
        "Merchants needing Razorpay or Xendit gateways",
        "Buyers prioritising top-rated, focused subscriptions",
      ],
    },
    pricing: {
      arraysubs: "Free core, forever. Pro is free for 4 months during early launch.",
      competitor: "Free + Pro ($89/yr, 1 site)",
      savings: "Memberships, retention and analytics included — not just billing.",
    },
    tableGroups: [
      {
        label: "Pricing & licensing",
        rows: [
          row("Price", txt("$0"), txt("Free 4 months"), txt("$89/yr Pro")),
          row("Free tier", yes(), yes(), yes()),
          row("Memberships in same plugin", yes(), yes(), no()),
        ],
      },
      {
        label: "Subscriptions & billing",
        rows: [
          row("Simple & variable subscriptions", yes(), yes(), yes("Pro for variable")),
          row("Free trial & sign-up fee", yes(), yes(), part("Pro")),
          row("Plan switching", yes(), yes(), yes("Pro")),
          row("Installment / split payments", no(), no(), yes("Pro")),
          row("Different renewal price", yes(), yes(), part("coming soon")),
          row("Skip next renewal", yes(), yes(), no()),
          row("Grace period", yes(), yes(), yes("Pro")),
          row("Payment gateways", part("manual"), txt("Stripe/PayPal/Paddle"), txt("6 gateways")),
        ],
      },
      {
        label: "Memberships & access",
        rows: [
          row("Member access control", yes(), yes(), no()),
          row("Content dripping & role mapping", yes(), yes(), no()),
        ],
      },
      {
        label: "Retention, revenue & insight",
        rows: [
          row("Retention flow builder", yes(), yes(), no()),
          row("Store Credit", no(), yes(), no()),
          row("Checkout and Payments", no(), yes(), no()),
          row("Analytics", no(), yes(), no()),
          row("Setup wizard", yes(), yes(), no()),
        ],
      },
    ],
    differences: [
      {
        title: "All-in-one vs subscriptions-only",
        description:
          "ArraySubs bundles memberships, retention flows, Store Credit, Feature Manager, Gateway Health, Member Insight and Analytics with subscriptions. WPSubscription is focused purely on subscription billing.",
        winner: "arraysubs",
      },
      {
        title: "Retention, Store Credit & operations",
        description:
          "ArraySubs intercepts cancellations and offers a Store Credit wallet. WPSubscription has neither retention flows nor store credit.",
        winner: "arraysubs",
      },
      {
        title: "Memberships & analytics",
        description:
          "ArraySubs adds member access control and Analytics. WPSubscription has no membership or analytics features.",
        winner: "arraysubs",
      },
      {
        title: "Installment / split payments",
        description:
          "WPSubscription supports installment and split payments — a genuinely useful BNPL-style feature ArraySubs doesn't offer yet.",
        winner: "competitor",
      },
      {
        title: "Gateway breadth",
        description:
          "WPSubscription supports six gateways including Razorpay and Xendit, helping India and Southeast-Asia stores. ArraySubs covers Stripe, PayPal and Paddle.",
        winner: "competitor",
      },
      {
        title: "Core subscriptions & reviews",
        description:
          "WPSubscription is well-rated (4.9★) and handles core subscriptions cleanly, as does ArraySubs. On fundamentals they're well matched.",
        winner: "tie",
      },
    ],
    migration:
      "Both offer free tiers, so you can trial ArraySubs alongside WPSubscription. Recreate your products in ArraySubs to gain memberships, retention and analytics — keeping in mind ArraySubs doesn't yet match WPSubscription's installment payments or extra gateways.",
    faq: [
      {
        question: "Is ArraySubs a good WPSubscription alternative?",
        answer:
          "Yes, if you want more than billing. ArraySubs adds memberships, retention flows, Store Credit, Feature Manager, Gateway Health, Member Insight and Analytics. WPSubscription is a strong, well-reviewed subscriptions-only plugin with installment payments and six gateways.",
      },
      {
        question: "Does ArraySubs support installment payments like WPSubscription?",
        answer:
          "Not yet. Installment/split payments are a real WPSubscription advantage. ArraySubs focuses on all-in-one subscriptions, memberships, retention and analytics.",
      },
      {
        question: "Which has more features, ArraySubs or WPSubscription?",
        answer:
          "ArraySubs has the broader feature set — memberships, retention, store credit, Checkout and Payments and analytics — while WPSubscription goes deeper on payment options (installments, six gateways).",
      },
      {
        question: "Are both ArraySubs and WPSubscription free?",
        answer:
          "Both have free tiers. ArraySubs' free core is broader (it includes memberships and retention), while WPSubscription's Pro adds installments and gateways for $89/yr.",
      },
    ],
    related: ["woocommerce-subscriptions", "wp-swings-subscriptions"],
    updated: UPDATED,
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
