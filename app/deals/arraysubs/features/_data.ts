import type { LucideIcon } from "lucide-react";
import {
  ChartColumn,
  ClipboardList,
  CircleUser,
  CreditCard,
  HeartHandshake,
  LayoutGrid,
  Mail,
  ReceiptText,
  Repeat,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  UserCog,
  Wallet,
  Wand2,
} from "lucide-react";

/**
 * Single source of truth for the ArraySubs feature pages. The hub
 * (`features/page.tsx`) and the dynamic detail route (`features/[slug]/page.tsx`)
 * both read from here, so copy stays editable in one place. ArraySubs only —
 * keep other products' content out of this file.
 */

export type FeatureTier = "Free" | "Pro" | "Free + Pro";

export type FeatureCapability = { title: string; description: string };
export type FeatureStat = { value: string; label: string };
export type FeatureFaq = { question: string; answer: string };

export type FeatureCategoryKey =
  | "subscriptions-billing"
  | "memberships-access"
  | "retention-revenue"
  | "operations-insights"
  | "product-entitlements";

export type Feature = {
  slug: string;
  category: FeatureCategoryKey;
  icon: LucideIcon;
  /** Short name for cards and nav. */
  name: string;
  /** Two-line description for the hub grid. */
  cardDescription: string;
  tier: FeatureTier;
  /** Descriptive <title> — the root layout appends " — ArraySubs". */
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  /** Short hashtag-style proof points shown under the hero subtitle. */
  heroHighlights: string[];
  /** Definition-style lead paragraph (answerable for GEO/AI extraction). */
  intro: string;
  capabilities: FeatureCapability[];
  stats: FeatureStat[];
  faq: FeatureFaq[];
  /** Slugs of related features (rendered as cross-links). */
  related: string[];
};

export const FEATURE_CATEGORIES: { key: FeatureCategoryKey; label: string }[] = [
  { key: "subscriptions-billing", label: "Subscriptions & billing" },
  { key: "memberships-access", label: "Memberships & access" },
  { key: "retention-revenue", label: "Retention & revenue" },
  { key: "operations-insights", label: "Operations & insights" },
  { key: "product-entitlements", label: "Product & entitlements" },
];

export const FEATURES: Feature[] = [
  {
    slug: "subscriptions-and-recurring-products",
    category: "subscriptions-billing",
    icon: Repeat,
    name: "Subscriptions",
    cardDescription:
      "Turn any product into a simple or variable subscription — flexible cycles, trials, sign-up fees, and plan switching with proration.",
    tier: "Free + Pro",
    seoTitle: "WooCommerce Subscription Products & Recurring Billing",
    metaDescription:
      "Turn any WooCommerce product into a subscription — simple or variable, with daily-to-yearly billing cycles, free trials, sign-up fees, and plan switching with 3 proration methods.",
    h1: "Turn any WooCommerce product into a subscription",
    heroSubtitle:
      "Create simple or variable recurring products with flexible billing cycles, free trials, sign-up fees, and upgrade or downgrade plan switching — all in the free core.",
    heroHighlights: [
      "Simple & variable products",
      "Daily-to-yearly billing",
      "Plan switching with proration",
    ],
    intro:
      "ArraySubs subscription products let you ==sell anything on a recurring basis==. Choose daily, weekly, monthly, yearly, or custom billing cycles, add free trials and sign-up fees, set different renewal prices, and let customers ==switch plans with automatic proration==. ==Pricing is locked at purchase==, so product changes never affect existing subscribers.",
    capabilities: [
      {
        title: "Simple & variable products",
        description:
          "Make any WooCommerce product recurring, with per-variation billing, trials, and pricing.",
      },
      {
        title: "Flexible billing cycles",
        description:
          "Daily, weekly, monthly, yearly, or custom-day intervals and lengths up to 365 periods — or unlimited.",
      },
      {
        title: "Trials & sign-up fees",
        description:
          "Configurable free-trial days, one-time sign-up fees, and different renewal prices.",
      },
      {
        title: "Plan switching with proration",
        description:
          "Upgrade, downgrade, or crossgrade with three proration modes: immediate, at renewal, or none.",
      },
      {
        title: "Price locking",
        description:
          "Customers keep the price they signed up at — later product edits never change their rate.",
      },
      {
        title: "Lifecycle audit trail",
        description:
          "30+ product property changes are tracked so you always know what changed on subscribed products.",
      },
    ],
    stats: [
      { value: "5", label: "Billing cycle types" },
      { value: "365", label: "Max billing periods" },
      { value: "3", label: "Proration methods" },
      { value: "30+", label: "Tracked property changes" },
    ],
    faq: [
      {
        question: "Can I change a product's price after people subscribe?",
        answer:
          "Yes. Existing subscriptions keep the price they were created with — only new purchases use the updated price. Pricing is locked at signup.",
      },
      {
        question: "What's the difference between simple and variable subscriptions?",
        answer:
          "A simple subscription has one recurring price; a variable subscription offers multiple options (for example monthly vs yearly, or tiers), each with its own billing cycle, trial, and price.",
      },
      {
        question: "How does plan switching proration work?",
        answer:
          "When a customer upgrades or downgrades, ArraySubs compares the normalized daily rates and lets you charge or credit the difference immediately, apply it at the next renewal, or switch with no adjustment.",
      },
    ],
    related: [
      "billing-renewals-and-refunds",
      "payment-gateways",
      "customer-portal",
    ],
  },
  {
    slug: "member-access-control",
    category: "memberships-access",
    icon: ShieldCheck,
    name: "Member Access Control",
    cardDescription:
      "Restrict content, products, downloads, and URLs with a rules engine — 10 conditions, 12 operators, and AND/OR nesting.",
    tier: "Free + Pro",
    seoTitle: "WooCommerce Membership & Content Access Control",
    metaDescription:
      "Gate content, products, downloads, and URLs by subscription status with a powerful rules engine — 10 condition types, 12 operators, nested AND/OR logic, role mapping, and content dripping.",
    h1: "Protect content, products, and downloads by subscription",
    heroSubtitle:
      "The most powerful access-control engine in any WooCommerce subscription plugin — 10 condition types, 12 operators, nested AND/OR logic, and seven rule categories.",
    heroHighlights: [
      "10 conditions, 12 operators",
      "Nested AND/OR rules",
      "Role mapping & content dripping",
    ],
    intro:
      "Member Access Control decides exactly what each subscriber can see, buy, download, and reach. Build rules from ==10 condition types and 12 operators==, nest them with AND/OR logic, ==map WordPress roles by subscription status==, gate URLs and downloads, and drip content on a schedule — ==all without code==.",
    capabilities: [
      {
        title: "10 condition types",
        description:
          "Target by subscription status, plan, purchased product, category, lifetime spend, role, feature value, and nested groups.",
      },
      {
        title: "12 comparison operators",
        description:
          "Build precise eligibility with equals, contains, in, greater-than, empty, and more.",
      },
      {
        title: "Nested AND/OR logic",
        description:
          "Combine conditions into groups like 'Active AND (spend > $500 OR role = VIP)'.",
      },
      {
        title: "Role mapping",
        description:
          "Automatically assign or remove WordPress roles across seven subscription states so other plugins respect access.",
      },
      {
        title: "URL & download restriction",
        description:
          "Four URL match patterns with redirect, 404, deny, or login actions, plus gated file downloads.",
      },
      {
        title: "Content dripping & shortcodes",
        description:
          "Release gated content on a schedule and gate inline content with restriction and visibility shortcodes.",
      },
    ],
    stats: [
      { value: "10", label: "Condition types" },
      { value: "12", label: "Operators" },
      { value: "7", label: "Rule categories" },
      { value: "4", label: "URL match patterns" },
    ],
    faq: [
      {
        question: "Can I show different prices to different members?",
        answer:
          "Yes. Ecommerce rules with a 'modify pricing' action display custom prices to members who match your conditions — ideal for member-only discounts.",
      },
      {
        question: "How does nested AND/OR logic work?",
        answer:
          "Group conditions and combine them with AND (all must match) or OR (any can match), then nest groups for complex rules like 'Active AND (spend > $500 OR role = VIP)'.",
      },
      {
        question: "Can I drip content over time?",
        answer:
          "Yes. Date-based dripping releases restricted posts on a schedule — ideal for course progression or phased onboarding.",
      },
    ],
    related: ["customer-portal", "profile-builder", "feature-manager"],
  },
  {
    slug: "billing-renewals-and-refunds",
    category: "subscriptions-billing",
    icon: ReceiptText,
    name: "Billing, Renewals & Refunds",
    cardDescription:
      "Automated renewals, a two-phase grace period, skip & pause, prorated refunds, and trial management.",
    tier: "Free + Pro",
    seoTitle: "WooCommerce Recurring Billing, Renewals & Refunds",
    metaDescription:
      "Automate recurring invoicing with a two-phase grace period, skip & pause controls, prorated refunds, trial conversion, and renewal sync — recover failed payments before they churn.",
    h1: "Automated billing, smart renewals, and flexible refunds",
    heroSubtitle:
      "A renewal engine that recovers failed payments with a two-phase grace period, lets customers skip and pause, and refunds fairly with proration.",
    heroHighlights: [
      "Two-phase grace period",
      "Skip & pause renewals",
      "Prorated refunds",
    ],
    intro:
      "The billing engine generates renewal invoices six hours before they're due, routes them to manual or automatic payment, and protects revenue with a ==two-phase grace period== that keeps access active while it ==recovers a failed charge==. Customers can ==skip or pause==, and you can refund prorated, full, or partial amounts.",
    capabilities: [
      {
        title: "Renewal engine",
        description:
          "Background jobs generate invoices 6 hours early, process trial conversions, and catch overdue renewals.",
      },
      {
        title: "Two-phase grace period",
        description:
          "Missed payments stay Active (default 3 days), then On-Hold (default 7 days) before cancelling — paying anytime restores access.",
      },
      {
        title: "Skip & pause",
        description:
          "Customers skip up to 3 cycles or pause up to 30 days (with cooldowns) instead of cancelling.",
      },
      {
        title: "Prorated refunds",
        description:
          "Refund prorated by daily rate, full order, or partial — with a live preview before you confirm.",
      },
      {
        title: "Trial management",
        description:
          "Per-product trial days, sign-up fees during trial, and one-trial-per-customer enforcement.",
      },
      {
        title: "Renewal sync",
        description:
          "Align renewals to a monthly, weekly, or yearly schedule for predictable cash flow.",
      },
    ],
    stats: [
      { value: "6 hrs", label: "Invoice lead time" },
      { value: "2-phase", label: "Grace period" },
      { value: "3", label: "Refund types" },
      { value: "30 days", label: "Max pause" },
    ],
    faq: [
      {
        question: "What happens if a customer misses a payment?",
        answer:
          "The subscription stays Active for a grace window (default 3 days) with full access, then moves to On-Hold (default 7 days) before cancelling. Paying at any point during grace restores it to Active.",
      },
      {
        question: "How is a prorated refund calculated?",
        answer:
          "Daily rate = recurring amount divided by the days in the billing period; the refund equals the daily rate multiplied by the remaining days in the current period.",
      },
      {
        question: "Can customers pause instead of cancelling?",
        answer:
          "Yes. They can pause for up to 30 days (with a maximum number of pauses and a cooldown) and auto-resume, or skip up to three upcoming renewals.",
      },
    ],
    related: [
      "subscriptions-and-recurring-products",
      "payment-gateways",
      "store-credit",
    ],
  },
  {
    slug: "retention-flow-builder",
    category: "retention-revenue",
    icon: HeartHandshake,
    name: "Retention Flow Builder",
    cardDescription:
      "Intercept cancellations with a guided flow — capture reasons and present discount, pause, downgrade, or support offers.",
    tier: "Free",
    seoTitle: "WooCommerce Subscription Retention & Cancellation Flow",
    metaDescription:
      "Reduce churn with a 3-step cancellation flow — capture reasons, then present targeted discount, pause, downgrade, or contact-support offers, with built-in retention analytics. Free.",
    h1: "Stop subscribers from cancelling with smart retention flows",
    heroSubtitle:
      "When a customer clicks cancel, intercept the moment with a guided flow that captures their reason and offers a discount, a pause, a downgrade, or support — before they leave.",
    heroHighlights: [
      "3-step cancellation flow",
      "4 retention offer types",
      "Built-in save analytics",
    ],
    intro:
      "The Retention Flow Builder turns the cancel button into a ==save opportunity==. A three-step modal asks why the customer is leaving, then shows ==targeted offers based on that reason==. Every interaction feeds retention analytics so you can see your save rate and optimize over time. It's ==included free== — no other WooCommerce subscription plugin ships it.",
    capabilities: [
      {
        title: "3-step cancellation flow",
        description:
          "Select a reason, see retention offers, then confirm — with an undo option for end-of-period cancellations.",
      },
      {
        title: "7 cancellation reasons",
        description:
          "Seven default reasons plus your own custom reasons and a free-text field for 'other'.",
      },
      {
        title: "4 offer types",
        description:
          "Present a discount, a pause, a downgrade, or a contact-support link — targeted per reason.",
      },
      {
        title: "Per-reason targeting",
        description:
          "Map specific reasons to specific offers, with eligibility by value, spend, or remaining days.",
      },
      {
        title: "Retention analytics",
        description:
          "Eight KPIs including save rate, plus churn-reason and offer-distribution charts and a trend line.",
      },
    ],
    stats: [
      { value: "4", label: "Retention offer types" },
      { value: "7", label: "Default reasons" },
      { value: "8", label: "Analytics KPIs" },
      { value: "Free", label: "Included in core" },
    ],
    faq: [
      {
        question: "Can I offer different retention offers to different customers?",
        answer:
          "Yes. Map each cancellation reason to specific offers — for example, 'too expensive' shows a discount and a downgrade, while 'technical issues' shows contact support.",
      },
      {
        question: "How is save rate calculated?",
        answer:
          "Save rate = offers accepted divided by offers shown, times 100. Saving even 40 of 100 cancellations at $30/month recovers about $14,400/year in MRR.",
      },
      {
        question: "Is the retention flow really free?",
        answer:
          "Yes — the full cancellation flow, all four offer types, and retention analytics are part of the free ArraySubs core.",
      },
    ],
    related: ["customer-portal", "store-credit", "analytics"],
  },
  {
    slug: "customer-portal",
    category: "memberships-access",
    icon: CircleUser,
    name: "Customer Portal",
    cardDescription:
      "A self-service hub in My Account where subscribers view, change plans, skip, pause, cancel, and reactivate.",
    tier: "Free + Pro",
    seoTitle: "WooCommerce Subscription Customer Portal & Self-Service",
    metaDescription:
      "Give subscribers a self-service portal inside WooCommerce My Account — view subscriptions, switch plans with proration, skip, pause, cancel, reactivate, and (Pro) manage payment methods.",
    h1: "Give subscribers a self-service portal to manage everything",
    heroSubtitle:
      "A complete subscription hub inside WooCommerce My Account — customers manage their own plans without ever opening a support ticket.",
    heroHighlights: [
      "Self-service My Account",
      "Plan switch, skip & pause",
      "Fewer support tickets",
    ],
    intro:
      "The customer portal puts subscribers ==in control==. From My Account they can view every subscription and its history, ==switch plans with a proration preview==, skip a renewal, pause, cancel with an undo option, reactivate, and — with Pro — update payment methods, shipping, store credit, and entitlements. Self-service means ==fewer tickets and happier customers==.",
    capabilities: [
      {
        title: "My Subscriptions list & detail",
        description:
          "A paginated list and a 9-row detail view with related orders, refunds, and a notes timeline.",
      },
      {
        title: "Plan switching",
        description:
          "Upgrade, downgrade, or crossgrade with a proration preview before confirming.",
      },
      {
        title: "Skip & pause",
        description:
          "Skip upcoming renewals or pause temporarily, with undo and modify controls.",
      },
      {
        title: "Cancel & reactivate",
        description:
          "Cancel immediately or at period end (with retention offers) and reactivate anytime.",
      },
      {
        title: "Payment & shipping (Pro)",
        description:
          "Update the card on file, toggle auto-renew, and change shipping before the cutoff.",
      },
      {
        title: "My Features & Store Credit (Pro)",
        description:
          "See entitlements and store-credit balance, history, and top-ups.",
      },
    ],
    stats: [
      { value: "24/7", label: "Self-service" },
      { value: "9", label: "Detail rows" },
      { value: "Free", label: "Core portal" },
      { value: "0", label: "Support tickets needed" },
    ],
    faq: [
      {
        question: "Can customers change their own payment method?",
        answer:
          "Yes, with Pro. The portal runs a gateway-specific flow — an in-page Stripe Elements form, or a secure re-authorization redirect for PayPal and Paddle.",
      },
      {
        question: "What happens when a customer skips a renewal?",
        answer:
          "The next payment date moves forward by the number of skipped cycles. They can undo the skip or change the skip count anytime before it takes effect.",
      },
      {
        question: "Does the portal reduce support load?",
        answer:
          "Significantly — customers handle plan changes, skips, pauses, cancellations, and reactivations themselves, around the clock, without contacting you.",
      },
    ],
    related: [
      "subscriptions-and-recurring-products",
      "billing-renewals-and-refunds",
      "profile-builder",
    ],
  },
  {
    slug: "store-credit",
    category: "retention-revenue",
    icon: Wallet,
    name: "Store Credit",
    cardDescription:
      "A virtual wallet with eight credit sources, auto-apply to renewals, expiration, top-ups, and four emails.",
    tier: "Pro",
    seoTitle: "WooCommerce Store Credit for Subscriptions",
    metaDescription:
      "A built-in store-credit wallet — issue, refund-to-credit, sell top-ups with bonuses, auto-apply at renewal, manage expiration, and notify customers with four dedicated emails. Pro.",
    h1: "A built-in store credit system for WooCommerce subscriptions",
    heroSubtitle:
      "Turn refunds into retained revenue and reward loyalty with a virtual wallet that auto-applies to renewals and orders.",
    heroHighlights: [
      "8 credit sources",
      "Auto-applies to renewals",
      "Purchasable top-ups",
    ],
    intro:
      "Store Credit gives every customer a ==wallet they can earn, buy, and spend== across subscriptions and orders. Credit can come from eight sources — downgrades, refunds, admin adjustments, promotions, and purchasable top-ups — and ==auto-applies to renewals==. ==Refund to credit to avoid card friction==, set expiration to create urgency, and keep customers informed with four dedicated emails.",
    capabilities: [
      {
        title: "Two credit levels",
        description:
          "Subscription-level credit (from downgrades) is spent first, then customer-level credit (refunds, purchases, admin).",
      },
      {
        title: "8 credit sources",
        description:
          "Downgrades, refunds, admin adjustments, promotions, purchases, renewal and order application, and expiry.",
      },
      {
        title: "Auto-apply to renewals",
        description:
          "Credit is applied to renewal invoices automatically, reducing failed payments.",
      },
      {
        title: "Refund to store credit",
        description:
          "Refund as credit with a balance preview — no card round-trip, and credit and gateway refunds can mix.",
      },
      {
        title: "Purchasable top-ups",
        description:
          "Sell a store-credit product with fixed or custom amounts and a bonus percentage (buy $50, get $55).",
      },
      {
        title: "Expiration & emails",
        description:
          "Configurable expiry with a daily job and four emails: added, used, expiring, and expired.",
      },
    ],
    stats: [
      { value: "8", label: "Credit sources" },
      { value: "2", label: "Credit levels" },
      { value: "4", label: "Store-credit emails" },
      { value: "Pro", label: "Feature tier" },
    ],
    faq: [
      {
        question: "Which credit is used first?",
        answer:
          "Subscription-level credit from downgrades is consumed first, then customer-level credit from refunds, purchases, and admin adjustments.",
      },
      {
        question: "Can store credit expire?",
        answer:
          "Yes. Set an expiration period and a daily job expires old credit. Customers get a 7-day 'expiring soon' email and an 'expired' notice.",
      },
      {
        question: "How is store credit a retention tool?",
        answer:
          "Downgrade credits and refund-to-credit keep money in your store, and auto-apply makes renewals cheaper — all reasons to stay instead of cancel.",
      },
    ],
    related: [
      "retention-flow-builder",
      "billing-renewals-and-refunds",
      "emails",
    ],
  },
  {
    slug: "checkout-builder",
    category: "operations-insights",
    icon: LayoutGrid,
    name: "Checkout Builder",
    cardDescription:
      "A drag-and-drop checkout editor with 27 field types, multi-step layouts, and conditional logic.",
    tier: "Pro",
    seoTitle: "WooCommerce Checkout Builder for Subscriptions",
    metaDescription:
      "Design a custom subscription checkout with a drag-and-drop editor — 27 field types, multi-step layouts, conditional visibility, and a design panel. No code. Pro.",
    h1: "Build a subscription checkout that converts",
    heroSubtitle:
      "A visual, drag-and-drop checkout editor with 27 field types, multi-step flows, and conditional logic — brand-perfect checkout without touching code.",
    heroHighlights: [
      "27 field types",
      "Multi-step checkout",
      "Conditional field logic",
    ],
    intro:
      "The Checkout Builder lets you design the checkout your store needs. Drag from ==27 field types==, split the form into multiple steps, ==show or hide fields with conditional logic==, and style everything from a design panel. Custom fields ==flow through the whole subscription lifecycle== — initial order, renewals, and the customer portal.",
    capabilities: [
      {
        title: "27 field types",
        description:
          "Nine standard, nine advanced (uploads, date and time, color, grid), and nine layout elements.",
      },
      {
        title: "Multi-step checkout",
        description:
          "Split checkout into unlimited steps with numbered tabs or a progress bar to lift completion.",
      },
      {
        title: "Conditional visibility",
        description:
          "Show or hide fields based on other answers using five operators — hidden fields skip validation.",
      },
      {
        title: "Section layouts & design panel",
        description:
          "One-to-three-column sections, per-field widths, and full control of colors, spacing, and radius.",
      },
      {
        title: "Data that flows everywhere",
        description:
          "Custom fields save as order meta and can copy to the subscription and every renewal.",
      },
      {
        title: "File uploads at checkout",
        description:
          "Collect documents during checkout with type and size limits for onboarding workflows.",
      },
    ],
    stats: [
      { value: "27", label: "Field types" },
      { value: "5", label: "Visibility operators" },
      { value: "Multi-step", label: "Checkout flows" },
      { value: "No code", label: "Visual editor" },
    ],
    faq: [
      {
        question: "Can I show a field only when a customer picks a certain option?",
        answer:
          "Yes. Conditional visibility rules show or hide fields based on another field's value, using operators like is, contains, and starts-with. Hidden fields are excluded from validation.",
      },
      {
        question: "Where does the custom checkout data go?",
        answer:
          "Every field saves as order meta with an arraysubs custom-field prefix. Toggle 'copy to subscription' to persist it on the subscription, or 'copy to renewal orders' to include it on every invoice.",
      },
      {
        question: "Does it require the classic checkout?",
        answer:
          "The drag-and-drop editor targets the classic (shortcode) WooCommerce checkout; standard subscription checkout also supports the block checkout.",
      },
    ],
    related: [
      "payment-gateways",
      "subscriptions-and-recurring-products",
      "profile-builder",
    ],
  },
  {
    slug: "analytics",
    category: "operations-insights",
    icon: ChartColumn,
    name: "Advanced Analytics",
    cardDescription:
      "MRR, churn, ARPU and 40+ reports — a Reports Hub and retention analytics free, a performance dashboard in Pro.",
    tier: "Free + Pro",
    seoTitle: "WooCommerce Subscription Analytics — MRR, Churn & LTV",
    metaDescription:
      "Track MRR, churn, ARPU, and retention with a Reports Hub and retention analytics in the free core, plus a 10-KPI performance dashboard and WooCommerce Analytics extension in Pro.",
    h1: "Subscription analytics that help you grow",
    heroSubtitle:
      "Know your MRR, churn, and retention at a glance — with a free Reports Hub and retention analytics, and a Pro performance dashboard built into WooCommerce.",
    heroHighlights: [
      "MRR, churn & ARPU",
      "40+ subscription reports",
      "Performance dashboard",
    ],
    intro:
      "ArraySubs answers the questions that matter: how fast am I growing, who's churning, and is my retention working? The free core ships a Reports Hub linking ==40+ reports plus retention analytics==. Pro adds a performance dashboard with ==10 KPIs, six trend charts, and five leaderboards==, and extends ==WooCommerce's own Analytics== with subscription data.",
    capabilities: [
      {
        title: "Reports Hub (Free)",
        description:
          "40+ report links across 12 categories with a summary bar and quick navigation.",
      },
      {
        title: "Retention analytics (Free)",
        description:
          "Eight KPIs, churn-reason and offer charts, and a saves-vs-cancellations trend.",
      },
      {
        title: "Performance dashboard (Pro)",
        description:
          "10 KPIs — MRR, churn rate, ARPU, revenue at risk — with six trend charts.",
      },
      {
        title: "Leaderboards (Pro)",
        description:
          "Top products by active subs and revenue, top churning products, and recent activity.",
      },
      {
        title: "WooCommerce Analytics extension (Pro)",
        description:
          "Order-type columns, subscription-revenue cards, and filters inside native Analytics.",
      },
      {
        title: "Order-type classification",
        description:
          "Six order types auto-classified with a backfill tool for historical orders.",
      },
    ],
    stats: [
      { value: "40+", label: "Reports" },
      { value: "10", label: "Dashboard KPIs" },
      { value: "6", label: "Trend charts" },
      { value: "MRR", label: "Churn · ARPU" },
    ],
    faq: [
      {
        question: "What is MRR and why does it matter?",
        answer:
          "MRR (monthly recurring revenue) normalizes all active subscriptions to a monthly figure. It's the clearest single measure of predictable, recurring business health.",
      },
      {
        question: "How is churn rate calculated?",
        answer:
          "Churn rate = subscriptions churned in the period divided by active at the start, times 100 — the percentage of your subscriber base you lost.",
      },
      {
        question: "What's free versus Pro?",
        answer:
          "The Reports Hub and retention analytics are free. The 10-KPI performance dashboard, leaderboards, and the WooCommerce Analytics extension are Pro.",
      },
    ],
    related: [
      "retention-flow-builder",
      "audits-and-logs",
      "manage-subscriptions",
    ],
  },
  {
    slug: "emails",
    category: "retention-revenue",
    icon: Mail,
    name: "Emails",
    cardDescription:
      "Automated lifecycle emails — 13 customer and 3 admin emails free, plus 4 store-credit emails in Pro.",
    tier: "Free + Pro",
    seoTitle: "WooCommerce Subscription Email Notifications",
    metaDescription:
      "Automated subscription lifecycle emails — 13 customer and 3 admin emails in the free core, plus 4 store-credit emails in Pro — all customizable with 50+ placeholders.",
    h1: "Keep subscribers informed with automated emails",
    heroSubtitle:
      "Sixteen lifecycle emails in the free core — renewals, payments, trials, cancellations — all built on the WooCommerce email framework and fully customizable.",
    heroHighlights: [
      "16 lifecycle emails",
      "50+ placeholders",
      "Renewal reminders",
    ],
    intro:
      "Every subscription event triggers the right email automatically. The free core ships ==13 customer emails and 3 admin emails== covering the full lifecycle, and Pro adds ==four store-credit emails==. Each one inherits your WooCommerce template, supports HTML or plain text, and exposes ==50+ placeholders== so the subject, heading, and content match your brand.",
    capabilities: [
      {
        title: "13 customer emails",
        description:
          "New subscription, trial started and converted, renewal reminder and invoice, payment success and failure, on-hold, cancelled, expired, reactivated, and more.",
      },
      {
        title: "3 admin emails",
        description:
          "Alerts for new subscriptions, cancellations, and failed payments.",
      },
      {
        title: "4 store-credit emails (Pro)",
        description:
          "Credit added, used, expiring, and expired notifications.",
      },
      {
        title: "Renewal reminders",
        description:
          "Send a reminder a configurable number of days before renewal (default 3) to cut failed payments.",
      },
      {
        title: "50+ placeholders",
        description:
          "Personalize subject, heading, and content with dynamic subscription and customer data.",
      },
      {
        title: "Full customization",
        description:
          "Per-email enable/disable, subject, heading, content, and type — with theme template overrides.",
      },
    ],
    stats: [
      { value: "13", label: "Customer emails" },
      { value: "3", label: "Admin emails" },
      { value: "50+", label: "Placeholders" },
      { value: "4", label: "Store-credit emails (Pro)" },
    ],
    faq: [
      {
        question: "Can I customize the subject and body?",
        answer:
          "Yes. Every email has configurable subject, heading, and additional-content fields, and you can override the full template from your theme or child theme.",
      },
      {
        question: "When does the renewal reminder send?",
        answer:
          "A configurable number of days before the next payment (default 3), giving customers time to update a card and reducing failed renewals.",
      },
    ],
    related: ["billing-renewals-and-refunds", "store-credit", "customer-portal"],
  },
  {
    slug: "payment-gateways",
    category: "subscriptions-billing",
    icon: CreditCard,
    name: "Payment Gateways",
    cardDescription:
      "Manual renewals with any WooCommerce gateway free; automatic Stripe, PayPal, and Paddle billing in Pro.",
    tier: "Free + Pro",
    seoTitle: "WooCommerce Subscription Payment Gateways — Stripe, PayPal, Paddle",
    metaDescription:
      "Accept recurring payments with any WooCommerce gateway for manual renewals (free), or automatic billing via Stripe, PayPal, and Paddle (merchant of record) in Pro.",
    h1: "Accept recurring payments with any gateway",
    heroSubtitle:
      "Manual renewals work with any WooCommerce gateway out of the box. Add automatic billing with Stripe, PayPal, or Paddle in Pro.",
    heroHighlights: [
      "Any WooCommerce gateway",
      "Stripe, PayPal & Paddle",
      "Automatic recurring billing",
    ],
    intro:
      "ArraySubs handles subscription checkout for free with ==any WooCommerce payment gateway== using manual renewals. Pro adds ==fully automatic recurring payments== through Stripe (with SCA/3DS and card auto-update), PayPal billing agreements, and Paddle as ==merchant of record== — plus a customer auto-renew toggle and a gateway health dashboard.",
    capabilities: [
      {
        title: "Subscription checkout (Free)",
        description:
          "Cart validation, one-click checkout, trial handling, and plan switching at checkout, on classic and block flows.",
      },
      {
        title: "Stripe (Pro)",
        description:
          "PaymentIntents, SCA/3DS, card auto-update, dispute handling, and 13 webhook events.",
      },
      {
        title: "PayPal (Pro)",
        description:
          "Gateway-managed billing agreements with Smart Payment Buttons and trial support.",
      },
      {
        title: "Paddle (Pro)",
        description:
          "Merchant of record handling tax and VAT across 200+ countries, with native pause and resume.",
      },
      {
        title: "Auto-renew toggle (Pro)",
        description:
          "Customers switch a subscription to manual invoice collection and back, keeping their method on file.",
      },
      {
        title: "Gateway health dashboard (Pro)",
        description:
          "Per-gateway status, webhook log, and capability badges so nothing fails silently.",
      },
    ],
    stats: [
      { value: "3", label: "Automatic gateways (Pro)" },
      { value: "200+", label: "Paddle tax countries" },
      { value: "Any", label: "Gateway for manual renewals" },
      { value: "SCA", label: "3DS ready" },
    ],
    faq: [
      {
        question: "Which gateway should I choose?",
        answer:
          "Stripe for maximum control and automation, PayPal for customers who prefer it, and Paddle for international stores that want VAT and tax handled for them.",
      },
      {
        question: "Do I need Pro to take recurring payments?",
        answer:
          "No. The free core supports manual renewals with any WooCommerce gateway — customers pay each renewal invoice. Pro adds hands-off automatic billing.",
      },
    ],
    related: [
      "billing-renewals-and-refunds",
      "checkout-builder",
      "subscriptions-and-recurring-products",
    ],
  },
  {
    slug: "easy-setup",
    category: "operations-insights",
    icon: Wand2,
    name: "Easy Setup",
    cardDescription:
      "A 9-step wizard with 7 business profiles, plus JSON export/import with section-level control.",
    tier: "Free",
    seoTitle: "WooCommerce Subscription Setup Wizard",
    metaDescription:
      "Configure your entire subscription engine in minutes with a 9-step wizard and 7 business-type profiles, then back up and migrate with JSON export/import across 8 sections. Free.",
    h1: "Set up WooCommerce subscriptions in minutes",
    heroSubtitle:
      "A 9-step wizard with seven business-type profiles configures billing, checkout, retention, access, and emails for you — then export and import settings as JSON.",
    heroHighlights: [
      "9-step setup wizard",
      "7 business profiles",
      "JSON export & import",
    ],
    intro:
      "The setup hub gets a new store live fast. Answer ==nine guided steps== — the wizard ==adapts to your business type== (SaaS, box, membership, content, services, nonprofit, or custom) and applies sensible defaults to billing, checkout, retention, access control, and emails. Export your configuration as ==JSON for backup or migration==, and import selectively across eight sections.",
    capabilities: [
      {
        title: "9-step wizard",
        description:
          "Covers business model, billing rules, checkout, portal, retention, access, emails, and optional modules.",
      },
      {
        title: "7 business profiles",
        description:
          "SaaS, box, membership, content, services, nonprofit, and custom — each with best-practice defaults.",
      },
      {
        title: "Conditional questions",
        description:
          "Steps adapt to earlier answers so you only see what's relevant.",
      },
      {
        title: "Settings export",
        description:
          "One-click JSON download with payment API keys stripped automatically for safety.",
      },
      {
        title: "Selective import",
        description:
          "Import all or just some of eight sections — update emails without touching billing.",
      },
      {
        title: "Multi-store consistency",
        description:
          "Export once and import on many sites for consistent client handoffs.",
      },
    ],
    stats: [
      { value: "9", label: "Wizard steps" },
      { value: "7", label: "Business profiles" },
      { value: "8", label: "Import sections" },
      { value: "<10 min", label: "Typical setup" },
    ],
    faq: [
      {
        question: "Can I move settings to another store?",
        answer:
          "Yes. Export the full configuration as JSON and import it on another site — choosing which sections to apply. Payment API keys are stripped automatically.",
      },
      {
        question: "What if I want to undo a settings change?",
        answer:
          "Export a backup before experimenting, then import it back and restore only the sections you need.",
      },
    ],
    related: [
      "subscriptions-and-recurring-products",
      "manage-subscriptions",
      "emails",
    ],
  },
  {
    slug: "audits-and-logs",
    category: "operations-insights",
    icon: ClipboardList,
    name: "Audits & Logs",
    cardDescription:
      "An activity timeline, scheduled-job logs, and a gateway health dashboard — full operational visibility.",
    tier: "Pro",
    seoTitle: "WooCommerce Subscription Audit Logs & Activity Trail",
    metaDescription:
      "Get full visibility with an activity audit timeline across 8 entity types, scheduled-job logs for 20+ background jobs, and a gateway health dashboard with webhook monitoring. Pro.",
    h1: "A complete audit trail for your subscriptions",
    heroSubtitle:
      "See every change, every scheduled job, and every gateway interaction — so nothing happens in the dark.",
    heroHighlights: [
      "Activity audit timeline",
      "Scheduled-job logs",
      "Gateway health dashboard",
    ],
    intro:
      "Audits & Logs gives operators ==total visibility==. The activity audit records changes across ==eight entity types== with old-to-new diffs and author roles, scheduled-job logs expose every background job and its status, and the gateway health dashboard shows whether your webhooks are connected — turning ==silent failures into things you can see and fix==.",
    capabilities: [
      {
        title: "Activity audits",
        description:
          "A centralized timeline across 8 entity types with structured change diffs and four author roles.",
      },
      {
        title: "Scheduled-job logs",
        description:
          "Full history of 20+ job types across 6 categories with status, duration, and error messages.",
      },
      {
        title: "Gateway health dashboard",
        description:
          "Per-gateway status, last-webhook time, capability badges, and a 30-day webhook log.",
      },
      {
        title: "Powerful filters",
        description:
          "Filter the audit by date, entity type, author role, subscription, and customer.",
      },
      {
        title: "Signature verification",
        description:
          "Each webhook event shows its signature-verification status for security.",
      },
      {
        title: "Troubleshooting guides",
        description:
          "Built-in guidance for renewal failures, portal errors, and access-rule conflicts.",
      },
    ],
    stats: [
      { value: "8", label: "Audited entity types" },
      { value: "20+", label: "Tracked job types" },
      { value: "4", label: "Author roles" },
      { value: "30 days", label: "Webhook retention" },
    ],
    faq: [
      {
        question: "How do I know if a background job failed?",
        answer:
          "Scheduled-job logs mark failed jobs with a Failed status and capture the error message, so you can see exactly what broke and retry or investigate.",
      },
      {
        question: "What does a 'System' author mean in the audit?",
        answer:
          "System marks an automated action from a scheduled job — like a renewal invoice or trial conversion — distinct from admin or customer actions.",
      },
    ],
    related: ["analytics", "manage-subscriptions", "payment-gateways"],
  },
  {
    slug: "manage-subscriptions",
    category: "operations-insights",
    icon: Settings2,
    name: "Manage Subscriptions",
    cardDescription:
      "An admin dashboard to list, search, create, edit, and manage every subscription with a 21-event notes trail.",
    tier: "Free + Pro",
    seoTitle: "WooCommerce Manage Subscriptions Admin Dashboard",
    metaDescription:
      "Administer every subscription from one dashboard — list and search by status, create and edit, a 17-card detail view, six lifecycle statuses, CSV/JSON export, and 21 automated notes.",
    h1: "A powerful dashboard to manage every subscription",
    heroSubtitle:
      "List, search, create, edit, and manage every subscription from one admin interface — with full lifecycle control and a detailed audit trail.",
    heroHighlights: [
      "List, search & export",
      "17-card detail view",
      "21 automated notes",
    ],
    intro:
      "Manage Subscriptions is ==mission control for your recurring revenue==. Browse and search across seven status tabs, create or edit any subscription, and open a detail view with ==17 information cards== (plus conditional cards for gateways, checkout fields, and shipping). Six lifecycle statuses, a two-phase grace period, and ==21 automated notes== keep everything auditable.",
    capabilities: [
      {
        title: "List, search & export",
        description:
          "Seven status tabs, search by ID, customer, or product, and CSV/JSON export of 15 fields.",
      },
      {
        title: "Create & edit",
        description:
          "Build subscriptions by hand or edit any field — customer, product, status, dates, and billing.",
      },
      {
        title: "17-card detail view",
        description:
          "Overview, customer, product, schedule, dates, related orders, refunds, notes, and logs at a glance.",
      },
      {
        title: "Six lifecycle statuses",
        description:
          "Active, Trial, On-Hold, Cancelled, Expired, and Pending with a two-phase grace period.",
      },
      {
        title: "21 automated notes",
        description:
          "Every key event is logged automatically — status changes, payments, plan switches, and more.",
      },
      {
        title: "Conditional Pro cards",
        description:
          "Gateway info, checkout-builder fields, and shipping cards appear when relevant.",
      },
    ],
    stats: [
      { value: "7", label: "Status tabs" },
      { value: "17", label: "Detail cards" },
      { value: "21", label: "Automated notes" },
      { value: "6", label: "Lifecycle statuses" },
    ],
    faq: [
      {
        question: "Can I create a subscription manually?",
        answer:
          "Yes. Admins can create subscriptions and set the customer, product, status, dates, and billing configuration, then edit any field later.",
      },
      {
        question: "How does the two-phase grace period work?",
        answer:
          "On a missed payment the subscription stays Active (default 3 days), then moves to On-Hold (default 7 days) before cancelling. Paying anytime restores it to Active.",
      },
    ],
    related: ["billing-renewals-and-refunds", "audits-and-logs", "analytics"],
  },
  {
    slug: "profile-builder",
    category: "memberships-access",
    icon: UserCog,
    name: "Profile Builder",
    cardDescription:
      "Custom profile fields, avatar upload, a My Account editor, and a library of content shortcodes.",
    tier: "Free + Pro",
    seoTitle: "WooCommerce Profile Builder, Avatars & Shortcodes",
    metaDescription:
      "Add custom profile fields and avatar uploads, reorder the My Account menu, and gate content with a library of shortcodes — personalize the member experience without code. Free.",
    h1: "Personalize the member experience with profiles & shortcodes",
    heroSubtitle:
      "Custom profile fields, avatar uploads, a drag-and-drop My Account editor, and a library of shortcodes — a polished member area without code.",
    heroHighlights: [
      "Custom profile fields",
      "Avatar uploads",
      "My Account editor",
    ],
    intro:
      "Profile Builder shapes the member experience. Add ==custom profile fields== (six types) that appear in My Account and the admin, let customers upload avatars that ==replace Gravatar site-wide==, reorder and rename the My Account menu, and gate or personalize content with ==restriction and visibility shortcodes==.",
    capabilities: [
      {
        title: "Custom profile fields",
        description:
          "Six field types — text, textarea, select, date, checkbox, and secure file upload — shown in My Account and admin.",
      },
      {
        title: "Avatar upload",
        description:
          "Customers upload avatars that replace Gravatar site-wide, with size and type limits and a Gravatar fallback.",
      },
      {
        title: "My Account editor",
        description:
          "Drag to reorder, rename, show or hide, and add custom endpoint pages to the account menu.",
      },
      {
        title: "Content shortcodes",
        description:
          "Login, logout, user-name, and visibility shortcodes for dynamic member content.",
      },
      {
        title: "Restriction shortcode",
        description:
          "Gate inline content with the restriction shortcode's 15 attributes and AND/OR logic.",
      },
      {
        title: "Page-builder friendly",
        description:
          "Works with Gutenberg, Elementor, and Bricks for custom account pages.",
      },
    ],
    stats: [
      { value: "6", label: "Profile field types" },
      { value: "15", label: "Restrict attributes" },
      { value: "6", label: "Shortcodes" },
      { value: "Free", label: "Included in core" },
    ],
    faq: [
      {
        question: "Where do custom profile fields appear?",
        answer:
          "On the customer's My Account account-details page and in the WordPress admin when viewing or creating a user. They're stored as user meta.",
      },
      {
        question: "Can I gate content to a specific plan with a shortcode?",
        answer:
          "Yes. Wrap content in the restriction shortcode with a product attribute to require a specific subscription product, or use a feature attribute (Pro) to gate by entitlement.",
      },
    ],
    related: ["member-access-control", "customer-portal", "feature-manager"],
  },
  {
    slug: "feature-manager",
    category: "product-entitlements",
    icon: SlidersHorizontal,
    name: "Feature Manager",
    cardDescription:
      "Define per-plan entitlements — toggles, limits, and details — and show 'What's included' on the product page.",
    tier: "Pro",
    seoTitle: "WooCommerce Subscription Plan Features & Entitlements",
    metaDescription:
      "Define what each plan includes with per-product entitlements — toggles, numeric limits, and text details — shown on the product page and in the portal, with usage tracking. Pro.",
    h1: "Define what each subscription plan includes",
    heroSubtitle:
      "Set per-plan entitlements — toggles, numeric limits, and text details — then show 'What's included' on the storefront and meter usage. Pro.",
    heroHighlights: [
      "Per-plan entitlements",
      "'What's included' display",
      "Usage tracking",
    ],
    intro:
      "Feature Manager makes ==plan value explicit==. Define entitlements per product or variation as toggles (on/off), numbers (limits), or text (descriptions), render a 'What's included' section on the product page, aggregate entitlements in the portal, and ==track usage for metered features like API calls or seats== — fewer pre-sale questions, ==clearer upgrades==.",
    capabilities: [
      {
        title: "3 entitlement types",
        description:
          "Toggle (on/off), number (limits), and text (descriptions), per product and per variation.",
      },
      {
        title: "Feature templates",
        description:
          "Save and reuse feature sets across products for consistency.",
      },
      {
        title: "'What's included' display",
        description:
          "Render entitlements on the product page, updating dynamically per variation.",
      },
      {
        title: "My Features portal page",
        description:
          "Customers see their entitlements per subscription or combined across active plans.",
      },
      {
        title: "Usage tracking",
        description:
          "Six helper functions meter usage for features like API calls, seats, or downloads.",
      },
      {
        title: "Feature-based gating",
        description:
          "Restrict content by entitlement with a feature attribute on the restriction shortcode.",
      },
    ],
    stats: [
      { value: "3", label: "Entitlement types" },
      { value: "2", label: "Aggregation modes" },
      { value: "6", label: "Usage functions" },
      { value: "Pro", label: "Feature tier" },
    ],
    faq: [
      {
        question: "What's the difference between toggle, number, and text features?",
        answer:
          "Toggle is on/off (for example priority support), number is a limit (for example 5 seats or 100 API calls), and text is descriptive (for example 'standard SLA').",
      },
      {
        question: "If a customer has two active plans, which features apply?",
        answer:
          "It depends on the aggregation mode. Combined mode ORs toggles and sums numbers across subscriptions; per-subscription mode shows each plan's features separately.",
      },
    ],
    related: [
      "member-access-control",
      "subscriptions-and-recurring-products",
      "customer-portal",
    ],
  },
];

export const getFeature = (slug: string): Feature | undefined =>
  FEATURES.find((feature) => feature.slug === slug);

export const featuresByCategory = (category: FeatureCategoryKey): Feature[] =>
  FEATURES.filter((feature) => feature.category === category);
