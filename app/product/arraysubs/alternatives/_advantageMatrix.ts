import type {
  ComparisonCell,
  ComparisonGroup,
  ComparisonRow,
} from "@/components/ui";
import {
  FREE_VS_PRO_GROUPS,
  type FvpRow,
} from "../_components/freeVsProRows";
import {
  FEATURES,
  type Feature,
  type FeatureTier,
} from "../features/_data";

export type CompetitorSlug =
  | "woocommerce-subscriptions"
  | "woocommerce-memberships"
  | "yith-woocommerce-subscription"
  | "yith-woocommerce-membership"
  | "wp-swings-subscriptions"
  | "sumo-subscriptions"
  | "wpsubscription";

type FieldKey = "woo" | "yith" | "wpswings" | "wpsub" | "sumo";
type Coverage = Record<CompetitorSlug, ComparisonCell>;
type CoverageOverrides = Partial<Coverage>;

type SourceSpec =
  | { source: "feature"; slug: string; coverage: Coverage }
  | { source: "free-vs-pro"; label: string; coverage: Coverage };

type SourceGroup = { label: string; rows: SourceSpec[] };

const WOO_SUB = "woocommerce-subscriptions";
const WOO_MEM = "woocommerce-memberships";
const YITH_SUB = "yith-woocommerce-subscription";
const YITH_MEM = "yith-woocommerce-membership";
const WP_SWINGS = "wp-swings-subscriptions";
const SUMO = "sumo-subscriptions";
const WP_SUB = "wpsubscription";

const COMPETITOR_SLUGS: CompetitorSlug[] = [
  WOO_SUB,
  WOO_MEM,
  YITH_SUB,
  YITH_MEM,
  WP_SWINGS,
  SUMO,
  WP_SUB,
];

const FIELD_SLUGS: Record<FieldKey, CompetitorSlug> = {
  woo: WOO_SUB,
  yith: YITH_SUB,
  wpswings: WP_SWINGS,
  wpsub: WP_SUB,
  sumo: SUMO,
};

const check = (note?: string): ComparisonCell => ({ kind: "check", note });
const no = (): ComparisonCell => ({ kind: "no" });
const partial = (label: string): ComparisonCell => ({ kind: "partial", label });

const coverage = (
  fallback: "no" | "not-documented",
  overrides: CoverageOverrides = {},
): Coverage =>
  Object.fromEntries(
    COMPETITOR_SLUGS.map((slug) => [
      slug,
      overrides[slug] ??
        (fallback === "no" ? no() : partial("Not documented")),
    ]),
  ) as Coverage;

/** No equivalent was found in the reviewed competitor feature set. */
const none = (overrides: CoverageOverrides = {}): Coverage =>
  coverage("no", overrides);

/** Coverage was not specific enough to support a definitive yes/no. */
const reviewed = (overrides: CoverageOverrides = {}): Coverage =>
  coverage("not-documented", overrides);

const feature = (
  slug: string,
  competitorCoverage: Coverage,
): SourceSpec => ({
  source: "feature",
  slug,
  coverage: competitorCoverage,
});

const capability = (
  label: string,
  competitorCoverage: Coverage,
): SourceSpec => ({
  source: "free-vs-pro",
  label,
  coverage: competitorCoverage,
});

/**
 * Extra comparison depth sourced directly from the live feature cards and the
 * canonical Free-vs-Pro matrix. Competitor cells follow the repository's
 * July 2026 competitor review; "Not documented" is deliberately used when
 * that review does not support a definitive negative.
 */
const ADVANTAGE_SOURCES: SourceGroup[] = [
  {
    label: "ArraySubs module depth",
    rows: [
      feature(
        "easy-setup-wizard",
        none({
          [WP_SWINGS]: partial("Basic setup"),
          [WP_SUB]: partial("Onboarding"),
        }),
      ),
      feature("checkout-page-builder", none()),
      feature("my-account-page-builder", none()),
      feature("profile-builder", none()),
      feature("login-as-user", none()),
      feature("multi-login-prevention", none()),
      feature("member-insight", none()),
      feature(
        "retention-analytics",
        none({
          [WP_SWINGS]: partial("Pro reports"),
          [WP_SUB]: partial("Health view"),
        }),
      ),
      feature(
        "ai-reports",
        none({
          [WP_SWINGS]: partial("AI health"),
          [WP_SUB]: partial("Health view"),
        }),
      ),
      feature(
        "audits-and-logs",
        none({
          [WOO_SUB]: partial("Health check"),
          [WP_SWINGS]: partial("Error logs"),
          [SUMO]: partial("Transaction log"),
          [WP_SUB]: partial("Subscription notes"),
        }),
      ),
      feature(
        "gateway-health",
        none({ [WOO_SUB]: partial("Health check") }),
      ),
      feature("feature-manager", none()),
      feature(
        "subscription-box",
        none({
          [YITH_SUB]: check("Premium"),
          [WP_SWINGS]: check("Free"),
        }),
      ),
      feature(
        "subscription-bundle",
        none({
          [WOO_SUB]: partial("All Products"),
          [SUMO]: partial("Grouped products"),
          [WP_SUB]: partial("Bundled, Pro"),
        }),
      ),
      feature(
        "donation-crowdfunding-module",
        none({ [SUMO]: partial("Separate add-on") }),
      ),
    ],
  },
  {
    label: "Products & checkout depth",
    rows: [
      capability(
        "Fixed-date subscriptions (cohorts, seasons, enrollment windows)",
        none(),
      ),
      capability(
        "Per-plan feature entitlements + 'What's included' on the product page",
        none(),
      ),
      capability(
        "Hide first billing-cycle, shipping-charge & duration details in cart, checkout, mini-cart & emails",
        none(),
      ),
      capability(
        "Redirect or 404 direct product URLs to a sales page",
        none({ [WP_SUB]: partial("Role visibility") }),
      ),
      capability(
        "Customer-chosen subscription length and billing period at checkout",
        none(),
      ),
      capability(
        "Box step builder with product, category, text, choice & file-upload elements",
        none({
          [YITH_SUB]: partial("Box module"),
          [WP_SWINGS]: partial("Box module"),
        }),
      ),
      capability(
        "Box discount tiers by total value or item count, with free gifts and live 'unlock' hints",
        none({
          [YITH_SUB]: partial("Box module"),
          [WP_SWINGS]: partial("Box module"),
        }),
      ),
      capability(
        "Renewals reproduce the exact box the customer built (contents, quantities, freebies & inputs at the frozen price)",
        reviewed({
          [WOO_SUB]: no(),
          [WOO_MEM]: no(),
          [YITH_MEM]: no(),
          [SUMO]: no(),
          [WP_SUB]: no(),
        }),
      ),
      capability(
        "Recurring shipping charges on physical subscriptions",
        none({
          [WOO_SUB]: check(),
          [YITH_SUB]: check("Premium"),
          [SUMO]: check(),
          [WP_SUB]: check("Pro"),
        }),
      ),
      capability(
        "Installment / split payments on a fixed-price product",
        none({
          [SUMO]: partial("Limited"),
          [WP_SUB]: check("Pro"),
        }),
      ),
    ],
  },
  {
    label: "Payments & renewal resilience",
    rows: [
      capability(
        "500+ WooCommerce gateways for checkout & manual renewals",
        none({
          [WOO_SUB]: check(),
          [YITH_SUB]: partial("PayPal + add-ons"),
          [WP_SWINGS]: check("Manual"),
          [SUMO]: check("Manual"),
          [WP_SUB]: check("Manual"),
        }),
      ),
      capability(
        "Automatic renewals via Paddle (native VAT, merchant of record)",
        none({ [WP_SUB]: check("Pro") }),
      ),
      capability(
        "Automatic renewals via Mollie (card & SEPA Direct Debit mandates)",
        none({
          [WOO_SUB]: partial("Third-party"),
          [WP_SWINGS]: check("Pro"),
          [WP_SUB]: check("Pro"),
        }),
      ),
      capability(
        "Delayed-settlement renewals tracked to completion (SEPA Direct Debit)",
        reviewed({
          [WOO_MEM]: no(),
          [YITH_SUB]: no(),
          [YITH_MEM]: no(),
          [SUMO]: no(),
        }),
      ),
      capability(
        "Missed-webhook reconciliation sweep for unconfirmed renewals",
        reviewed({
          [WOO_MEM]: no(),
          [YITH_MEM]: no(),
        }),
      ),
      capability(
        "Double-charge protection on interrupted renewal attempts",
        reviewed({
          [WOO_MEM]: no(),
          [YITH_MEM]: no(),
        }),
      ),
      capability(
        "Automatic retry of failed renewals (dunning)",
        none({
          [WOO_SUB]: check(),
          [YITH_SUB]: check("Premium"),
          [WP_SWINGS]: check("Pro"),
          [WP_SUB]: check("Pro"),
        }),
      ),
      capability(
        "Auto-downgrade to a fallback plan instead of cancelling",
        none(),
      ),
      capability(
        "Flexible renewal sync (align renewals to one date for batch billing)",
        none({
          [WOO_SUB]: check(),
          [YITH_SUB]: check("Premium"),
          [SUMO]: check(),
          [WP_SUB]: check("Pro"),
        }),
      ),
      capability(
        "Let customers renew early, before the due date",
        reviewed({
          [WOO_MEM]: no(),
          [YITH_MEM]: no(),
        }),
      ),
      capability(
        "3 proration methods (charge now, at renewal, or none)",
        none({
          [WOO_SUB]: check(),
          [YITH_SUB]: partial("Limited"),
          [WP_SWINGS]: partial("Pro"),
          [SUMO]: partial("Limited"),
        }),
      ),
      capability(
        "Self-service payment-method update",
        none({
          [WOO_SUB]: check(),
          [SUMO]: check(),
        }),
      ),
    ],
  },
  {
    label: "Member access depth",
    rows: [
      capability(
        "URL path rules (exact, prefix, contains & regex)",
        none({ [SUMO]: partial("Membership add-on") }),
      ),
      capability(
        "Partial, in-page content restriction with teasers",
        none({ [YITH_MEM]: check("Limited preview") }),
      ),
      capability(
        "Native Elementor container restriction",
        none({ [YITH_MEM]: partial("Elementor compatible") }),
      ),
      capability(
        "Native Gutenberg block restriction",
        none({ [YITH_MEM]: check("Members-only block") }),
      ),
      capability("Nested AND/OR advanced condition builder", none()),
      capability(
        "Gated / restricted file downloads",
        none({
          [WOO_MEM]: check(),
          [YITH_MEM]: check(),
        }),
      ),
      capability(
        "Shop & product-catalog restrictions (redirect, 404, block purchase)",
        none({
          [WOO_MEM]: check(),
          [YITH_MEM]: check("Private shop"),
          [WP_SWINGS]: partial("Basic access rules"),
          [SUMO]: partial("Membership add-on"),
          [WP_SUB]: partial("Role visibility"),
        }),
      ),
      capability(
        "Member-only discounts and pricing",
        none({
          [WOO_MEM]: check(),
          [YITH_MEM]: check(),
          [WP_SWINGS]: partial("Membership plugin"),
        }),
      ),
      capability(
        "Member-only free shipping on every paid shipping method",
        none({
          [WOO_MEM]: check(),
          [YITH_MEM]: check(),
          [WP_SWINGS]: partial("Membership plugin"),
        }),
      ),
      capability(
        "Comment reading and posting rules by post type, taxonomy term or specific content",
        none(),
      ),
      capability(
        "Per-product or per-order purchase quantity limits for matching or non-matching shoppers",
        none(),
      ),
      capability(
        "Member Styling: conditional body classes and custom CSS on the storefront or wp-admin",
        none(),
      ),
      capability(
        "Logged-in / guest and negative subscription or variation conditions",
        none(),
      ),
      capability("Gate access by per-plan feature entitlement", none()),
    ],
  },
  {
    label: "Retention, credit & revenue depth",
    rows: [
      capability(
        "AI churn risk scoring per subscriber, with reasons & next steps",
        none({
          [WP_SWINGS]: partial("AI health"),
          [WP_SUB]: partial("Health view"),
        }),
      ),
      capability(
        "Store credit wallet with balances & transaction history",
        none(),
      ),
      capability(
        "Refund an order to store credit instead of cash",
        none(),
      ),
      capability(
        "Sell prepaid credit packs with an optional bonus percentage",
        none(),
      ),
      capability(
        "Credit expiry + Added / Used / Expiring / Expired emails",
        none(),
      ),
      capability(
        "Recurring donations & crowdfunding contributions",
        none({ [SUMO]: partial("Separate add-on") }),
      ),
    ],
  },
  {
    label: "Operations, support & insight depth",
    rows: [
      capability(
        "Export subscriptions to CSV or JSON",
        none({
          [WOO_SUB]: check("CSV"),
          [WOO_MEM]: check("CSV"),
          [YITH_SUB]: check("CSV, Premium"),
          [WP_SWINGS]: partial("Membership export"),
        }),
      ),
      capability(
        "Create a subscription from WP-Admin (migrations, phone orders)",
        none({
          [WOO_SUB]: check(),
          [YITH_SUB]: check("Premium"),
          [WP_SWINGS]: check("Pro"),
          [SUMO]: check(),
        }),
      ),
      capability(
        "Prorated, full & partial refunds",
        reviewed({
          [WOO_MEM]: no(),
          [YITH_MEM]: no(),
        }),
      ),
      capability(
        "Subscription notes & full lifecycle timeline",
        none({
          [WOO_SUB]: check(),
          [SUMO]: partial("Log history"),
          [WP_SUB]: check("Notes"),
        }),
      ),
      capability(
        "Subscription & revenue analytics (MRR, churn, ARPU, retention)",
        none({
          [WOO_SUB]: partial("Basic reports"),
          [YITH_SUB]: partial("Basic dashboard"),
          [WP_SWINGS]: partial("Pro reports"),
          [WP_SUB]: partial("MRR / churn"),
        }),
      ),
      capability(
        "AI revenue forecast: MRR & ARR projected 6, 12 or 24 months",
        none(),
      ),
      capability(
        "Renewal, portal & access troubleshooting logs",
        none({
          [WOO_SUB]: partial("Health check"),
          [WP_SWINGS]: partial("Error logs"),
          [SUMO]: partial("Transaction log"),
          [WP_SUB]: partial("Subscription notes"),
        }),
      ),
      capability(
        "Activity audit trail + scheduled-job logs",
        none({ [SUMO]: partial("Transaction log") }),
      ),
      capability("Member Insight: one unified customer dashboard", none()),
      capability(
        "Gateway Health: webhook status & connection monitoring",
        none({ [WOO_SUB]: partial("Health check") }),
      ),
      capability(
        "Per-gateway capability notes explaining what each provider can't do",
        none(),
      ),
      capability(
        "HPOS (high-performance order storage) compatible",
        none({
          [WOO_SUB]: check(),
          [WOO_MEM]: check(),
          [YITH_SUB]: check(),
          [YITH_MEM]: check(),
          [WP_SWINGS]: check(),
          [SUMO]: check(),
          [WP_SUB]: check(),
        }),
      ),
    ],
  },
];

const FREE_VS_PRO_ROWS = new Map<string, FvpRow>(
  FREE_VS_PRO_GROUPS.flatMap((group) => group.rows).map((row) => [
    row.label,
    row,
  ]),
);
const FEATURES_BY_SLUG = new Map<string, Feature>(
  FEATURES.map((item) => [item.slug, item]),
);

type ResolvedRow = {
  feature: string;
  hint?: string;
  free: ComparisonCell;
  pro: ComparisonCell;
  coverage: Coverage;
};

const cellsForTier = (
  tier: FeatureTier,
  comingSoon: boolean,
): Pick<ResolvedRow, "free" | "pro"> => {
  if (tier === "Pro") {
    return {
      free: no(),
      pro: check(comingSoon ? "Coming soon" : undefined),
    };
  }

  return { free: check(), pro: check() };
};

const resolveSource = (spec: SourceSpec): ResolvedRow => {
  if (spec.source === "feature") {
    const item = FEATURES_BY_SLUG.get(spec.slug);
    if (!item) throw new Error(`Unknown ArraySubs feature source: ${spec.slug}`);

    return {
      feature: item.name,
      hint: item.cardDescription,
      ...cellsForTier(item.tier, item.status === "coming-soon"),
      coverage: spec.coverage,
    };
  }

  const item = FREE_VS_PRO_ROWS.get(spec.label);
  if (!item) {
    throw new Error(`Unknown Free-vs-Pro capability source: ${spec.label}`);
  }

  return {
    feature: item.label,
    hint: item.hint,
    free: item.proOnly ? no() : check(item.freeNote),
    pro: check(item.proNote),
    coverage: spec.coverage,
  };
};

const resolvedGroups = (): { label: string; rows: ResolvedRow[] }[] =>
  ADVANTAGE_SOURCES.map((group) => ({
    label: group.label,
    rows: group.rows.map(resolveSource),
  }));

const arraySubsSummary = (row: ResolvedRow): ComparisonCell => {
  if (row.free.kind === "check") return check("Free + Pro");
  if (row.pro.kind === "check") {
    return check(row.pro.note === "Coming soon" ? "Pro · coming soon" : "Pro");
  }
  return row.pro;
};

export function getAdvantageHubGroups(): ComparisonGroup[] {
  return resolvedGroups().map((group) => ({
    label: group.label,
    rows: group.rows.map((item): ComparisonRow => ({
      feature: item.feature,
      hint: item.hint,
      cells: {
        arraysubs: arraySubsSummary(item),
        ...Object.fromEntries(
          Object.entries(FIELD_SLUGS).map(([key, slug]) => [
            key,
            item.coverage[slug],
          ]),
        ),
      },
    })),
  }));
}

export function getAdvantageDetailGroups(
  competitorSlug: CompetitorSlug,
): ComparisonGroup[] {
  return resolvedGroups().map((group) => ({
    label: group.label,
    rows: group.rows.map((item): ComparisonRow => ({
      feature: item.feature,
      hint: item.hint,
      cells: {
        free: item.free,
        pro: item.pro,
        competitor: item.coverage[competitorSlug],
      },
    })),
  }));
}

export function mergeComparisonGroups(
  baseGroups: ComparisonGroup[],
  extraGroups: ComparisonGroup[],
): ComparisonGroup[] {
  const used = new Set(
    baseGroups.flatMap((group) =>
      group.rows.map((row) => row.feature.trim().toLocaleLowerCase()),
    ),
  );

  return [
    ...baseGroups,
    ...extraGroups.flatMap((group) => {
      const rows = group.rows.filter((row) => {
        const key = row.feature.trim().toLocaleLowerCase();
        if (used.has(key)) return false;
        used.add(key);
        return true;
      });

      return rows.length > 0 ? [{ ...group, rows }] : [];
    }),
  ];
}
