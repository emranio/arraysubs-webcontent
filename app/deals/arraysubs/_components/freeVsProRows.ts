/**
 * Curated Free-vs-Pro capability matrix for the {@link FreeVsProTable}.
 *
 * Deliberately NOT derived from the raw 67-module feature list: comparison
 * tables need concrete, self-explanatory capability rows, not generic module
 * names. Several modules are split into the distinct things a buyer actually
 * evaluates (e.g. Subscription Products → simple / variable / trials / fees),
 * and `freeNote` / `proNote` carry the Free-vs-Pro nuance a plain tick can't
 * (e.g. billing: "Manual invoices" in Free, "Automatic off-session" in Pro).
 *
 * Rows are grouped by capability area so the table scans cleanly. Tiers match
 * the manual-aligned source of truth in `../features/_data.ts`.
 */

export type FvpRow = {
  /** Elaborate, self-explanatory capability label (no bare module names). */
  label: string;
  /** Optional sub-label under the capability (e.g. "Coming soon"). */
  hint?: string;
  /** true = Pro-only (blank Free column). Omit for capabilities in the free core. */
  proOnly?: boolean;
  /** Short note beside the Free tick (e.g. a limit or "Manual"). */
  freeNote?: string;
  /** Short note beside the Pro tick (e.g. "Automatic", "Advanced"). */
  proNote?: string;
};

export type FvpGroup = { label: string; rows: FvpRow[] };

export const FREE_VS_PRO_GROUPS: FvpGroup[] = [
  {
    label: "Subscription products & checkout",
    rows: [
      {
        label: "Simple subscription products (one recurring price)",
      },
      {
        label: "Variable subscriptions with per-plan price, cycle & trial",
      },
      {
        label: "Free trials before the first charge",
      },
      {
        label: "One-time signup / setup fees at checkout",
      },
      {
        label: "Introductory price that changes on renewal",
      },
      {
        label: "Lifetime deals (one payment, ongoing access, no renewals)",
      },
      {
        label: "One-click / direct-to-checkout purchase URLs",
      },
      {
        label: "Coupons on subscriptions (recurring discounts & cycle limits)",
      },
      {
        label: "Purchase guardrails (one-per-customer, mixed-cart & migration rules)",
      },
      {
        label: "Fixed-date subscriptions (cohorts, seasons, enrollment windows)",
        proOnly: true,
      },
      {
        label: "Recurring shipping charges on physical subscriptions",
        proOnly: true,
      },
      {
        label: "Per-plan feature entitlements + 'What's included' on the product page",
        proOnly: true,
      },
      {
        label: "Drag-and-drop multi-step checkout builder with conditional fields",
        proOnly: true,
      },
      {
        label: "Redirect or 404 direct product URLs to a sales page",
        proOnly: true,
      },
      {
        label: "Customer-chosen subscription length at checkout",
        hint: "Coming soon",
        proOnly: true,
      },
      {
        label: "Installment / split payments on a fixed-price product",
        hint: "Coming soon",
        proOnly: true,
      },
    ],
  },
  {
    label: "Payments, billing & dunning",
    rows: [
      {
        label: "Recurring renewal billing engine & schedule",
        freeNote: "Manual invoices",
        proNote: "Automatic",
      },
      {
        label: "500+ WooCommerce gateways for checkout & manual renewals",
      },
      {
        label: "WooCommerce tax on checkout and every renewal",
      },
      {
        label: "Automatic off-session renewals via Stripe (saved cards)",
        proOnly: true,
      },
      {
        label: "Automatic renewals via PayPal billing agreements",
        proOnly: true,
      },
      {
        label: "Automatic renewals via Paddle (native VAT, merchant of record)",
        proOnly: true,
      },
      {
        label: "SCA / 3D Secure handling, off-session for renewals",
        proOnly: true,
      },
      {
        label: "2-phase grace period keeps access alive on a failed payment",
      },
      {
        label: "Automatic retry of failed renewals (dunning)",
        proOnly: true,
      },
      {
        label: "Auto-downgrade to a fallback plan instead of cancelling",
        proOnly: true,
      },
      {
        label: "Flexible renewal sync (align renewals to one date for batch billing)",
        proOnly: true,
      },
      {
        label: "Let customers renew early, before the due date",
        hint: "Coming soon",
        proOnly: true,
      },
    ],
  },
  {
    label: "Plan changes & customer self-service",
    rows: [
      {
        label: "Customer portal: view subscriptions, invoices & details",
      },
      {
        label: "Self-service cancel (with undo) and reactivate",
      },
      {
        label: "Pause / vacation mode without cancelling",
      },
      {
        label: "Skip the next renewal and keep the schedule",
      },
      {
        label: "Upgrade, downgrade & crossgrade between plans",
      },
      {
        label: "3 proration methods (charge now, at renewal, or none)",
      },
      {
        label: "Self-service payment-method update",
        proNote: "Stripe / PayPal / Paddle",
        proOnly: true,
      },
    ],
  },
  {
    label: "Member access & content restriction",
    rows: [
      {
        label: "Gate pages, posts & any custom post type",
      },
      {
        label: "Restrict by subscription, plan or product purchased",
      },
      {
        label: "Restrict by WordPress role",
      },
      {
        label: "Restrict by lifetime spend or purchase history",
      },
      {
        label: "URL path rules (exact, prefix, contains & regex)",
      },
      {
        label: "Partial, in-page content restriction with teasers",
      },
      {
        label: "Native Elementor container restriction",
      },
      {
        label: "Native Gutenberg block restriction",
      },
      {
        label: "Nested AND/OR advanced condition builder",
      },
      {
        label: "Scheduled content dripping (days-since-join or fixed date)",
      },
      {
        label: "Gated / restricted file downloads",
      },
      {
        label: "Shop & product-catalog restrictions (redirect, 404, block purchase)",
      },
      {
        label: "Member-only discounts and pricing",
      },
      {
        label: "Gate access by per-plan feature entitlement",
        proOnly: true,
      },
    ],
  },
  {
    label: "Accounts, profiles & site access",
    rows: [
      {
        label: "Guided 9-step setup wizard + settings import/export",
      },
      {
        label: "Custom profile fields & avatars on My Account",
      },
      {
        label: "My Account page builder (reorder, rename, custom endpoints)",
      },
      {
        label: "Shortcodes for account links, gated content & forms",
      },
      {
        label: "Hide the WordPress admin bar from customers",
      },
      {
        label: "Redirect customers away from wp-admin",
      },
      {
        label: "Route login & registration through My Account",
      },
      {
        label: "Log in as a customer for support (no password needed)",
      },
      {
        label: "Multi-login prevention (limit concurrent sessions per account)",
        proOnly: true,
      },
    ],
  },
  {
    label: "Retention, revenue & store credit",
    rows: [
      {
        label: "Cancellation retention flow (capture reason, present save offers)",
      },
      {
        label: "Retention analytics (offer performance & cancel reasons)",
      },
      {
        label: "Store credit wallet with balances & transaction history",
        proOnly: true,
      },
      {
        label: "Refund an order to store credit instead of cash",
        proOnly: true,
      },
      {
        label: "Sell prepaid credit packs with an optional bonus percentage",
        proOnly: true,
      },
      {
        label: "Credit expiry + Added / Used / Expiring / Expired emails",
        proOnly: true,
      },
      {
        label: "Recurring donations & crowdfunding contributions",
        hint: "Coming soon",
        proOnly: true,
      },
    ],
  },
  {
    label: "Operations, support & insight",
    rows: [
      {
        label: "Central subscription management (view, edit, bulk actions)",
      },
      {
        label: "Export subscriptions to CSV or JSON",
      },
      {
        label: "Create a subscription from WP-Admin (migrations, phone orders)",
      },
      {
        label: "Prorated, full & partial refunds",
        proNote: "+ to store credit",
      },
      {
        label: "Subscription notes & full lifecycle timeline",
      },
      {
        label: "Automated lifecycle emails (signup, renewal, failure, cancel)",
      },
      {
        label: "Subscription & revenue analytics (MRR, churn, ARPU, retention)",
        freeNote: "Core reports",
        proNote: "Full dashboard",
      },
      {
        label: "Renewal, portal & access troubleshooting logs",
      },
      {
        label: "Activity audit trail + scheduled-job logs",
        proOnly: true,
      },
      {
        label: "Member Insight: one unified customer dashboard",
        proOnly: true,
      },
      {
        label: "Gateway Health: webhook status & connection monitoring",
        proOnly: true,
      },
      {
        label: "HPOS (high-performance order storage) compatible",
      },
    ],
  },
];
