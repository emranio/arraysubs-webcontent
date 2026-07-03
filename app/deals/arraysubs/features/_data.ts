import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  ChartColumn,
  CircleUser,
  ClipboardList,
  CreditCard,
  EyeOff,
  HeartHandshake,
  KeyRound,
  LayoutGrid,
  Lock,
  Mail,
  ReceiptText,
  Repeat,
  ShieldCheck,
  SlidersHorizontal,
  UserCheck,
  UserCog,
  Wand2,
  Wallet,
} from "lucide-react";

/**
 * Manual-aligned source of truth for the ArraySubs feature hub.
 *
 * The user manual exposes 27 dedicated root-level modules:
 * 20 are free/core-accessible and 7 are Pro-only. Keep this file aligned with
 * `user-manual/markdowns/getting-started/before-you-launch.md`.
 */

export type FeatureTier = "Free" | "Pro" | "Free + Pro";

export type FeatureCapability = { title: string; description: string };
export type FeatureStat = { value: string; label: string };
export type FeatureFaq = { question: string; answer: string };
export type FeatureScreenshot = {
  src: string;
  alt: string;
  caption: string;
};

export type FeatureCategoryKey =
  | "setup-configuration"
  | "site-access-toolkit"
  | "products-checkout"
  | "subscription-operations"
  | "member-experience"
  | "retention-revenue"
  | "analytics-infrastructure";

export type Feature = {
  slug: string;
  category: FeatureCategoryKey;
  icon: LucideIcon;
  name: string;
  cardDescription: string;
  tier: FeatureTier;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  heroHighlights: string[];
  intro: string;
  capabilities: FeatureCapability[];
  stats: FeatureStat[];
  faq: FeatureFaq[];
  screenshot?: FeatureScreenshot;
  related: string[];
};

type FeatureInput = Omit<
  Feature,
  "seoTitle" | "metaDescription" | "h1" | "heroSubtitle" | "heroHighlights"
> & {
  summary: string;
  h1?: string;
  seoTitle?: string;
  metaDescription?: string;
  highlights: string[];
};

export const FEATURE_CATEGORIES: { key: FeatureCategoryKey; label: string }[] = [
  { key: "setup-configuration", label: "Setup & configuration" },
  { key: "site-access-toolkit", label: "Site access toolkit" },
  { key: "products-checkout", label: "Products & checkout" },
  { key: "subscription-operations", label: "Subscription operations" },
  { key: "member-experience", label: "Member experience" },
  { key: "retention-revenue", label: "Retention & revenue" },
  { key: "analytics-infrastructure", label: "Analytics & infrastructure" },
];

const buildFeature = ({
  summary,
  h1,
  seoTitle,
  metaDescription,
  highlights,
  ...feature
}: FeatureInput): Feature => ({
  ...feature,
  seoTitle:
    seoTitle ?? `${feature.name} for WooCommerce Subscription Stores`,
  metaDescription: metaDescription ?? summary,
  h1: h1 ?? feature.name,
  heroSubtitle: summary,
  heroHighlights: highlights,
  screenshot:
    feature.screenshot ??
    {
      src: `/arraysubs-manual/${feature.slug}.png`,
      alt: `Annotated ${feature.name} screenshot from the ArraySubs user manual`,
      caption: `Screenshot from the current ${feature.name} user-manual guide.`,
    },
});

export const FEATURES: Feature[] = [
  buildFeature({
    slug: "easy-setup-wizard",
    category: "setup-configuration",
    icon: Wand2,
    name: "Easy Setup Wizard",
    cardDescription:
      "Configure the key subscription settings from a guided interview, then export or import settings between stores.",
    tier: "Free + Pro",
    summary:
      "Turn first-time ArraySubs configuration into a guided setup flow with business profiles and settings migration.",
    h1: "Configure ArraySubs with a guided setup wizard",
    highlights: ["9-step wizard", "Business profiles", "Settings import/export"],
    intro:
      "Easy Setup Wizard is a free setup module that ==turns the first configuration pass into a guided interview==. Merchants choose a business profile, answer plain-language questions, apply recommended subscription settings, and use import/export tools to move settings between stores. Pro-only options appear only when ArraySubs Pro is active.",
    capabilities: [
      {
        title: "Guided business setup",
        description:
          "Walks through subscription model, customer experience, cancellation policy, access control, emails, and optional tools.",
      },
      {
        title: "Business profile defaults",
        description:
          "Preloads sensible settings for SaaS, membership, content, service, and physical subscription models.",
      },
      {
        title: "Review before applying",
        description:
          "Shows a final answer summary so merchants can edit any step before saving settings.",
      },
      {
        title: "Settings migration",
        description:
          "Exports and imports supported ArraySubs settings as JSON for staging, migration, or repeatable store setup.",
      },
    ],
    stats: [
      { value: "Free", label: "Core wizard" },
      { value: "9", label: "Wizard steps" },
      { value: "JSON", label: "Settings format" },
      { value: "Pro", label: "Conditional options" },
    ],
    faq: [
      {
        question: "Does the wizard create subscription products?",
        answer:
          "No. The wizard configures supported plugin settings. Products, access rules, cancellation reasons, and email body content are still created manually.",
      },
      {
        question: "Can I run the wizard more than once?",
        answer:
          "Yes. Re-running the wizard overwrites the settings it controls and leaves unrelated manual settings intact.",
      },
      {
        question: "What happens when Pro is inactive?",
        answer:
          "Pro-only wizard options are hidden. Any Pro-specific settings already saved remain dormant until Pro is active again.",
      },
    ],
    related: ["subscription-products", "checkout-and-payments", "retention-and-refunds"],
  }),
  buildFeature({
    slug: "admin-bar-visibility",
    category: "site-access-toolkit",
    icon: EyeOff,
    name: "Admin Bar Visibility",
    cardDescription:
      "Hide the WordPress frontend toolbar for customers while administrators keep their normal shortcuts.",
    tier: "Free",
    summary:
      "Remove customer-facing WordPress admin chrome without affecting administrator shortcuts.",
    h1: "Hide the WordPress admin bar from customers",
    highlights: ["Free Toolkit module", "Frontend cleanup", "Admin-safe"],
    intro:
      "Admin Bar Visibility is a free Toolkit module that ==hides the WordPress frontend toolbar for non-admin users==. Customers see a clean storefront and member area, while administrators keep normal WordPress shortcuts.",
    capabilities: [
      {
        title: "Customer-facing cleanup",
        description:
          "Removes the admin toolbar from the frontend for subscribers and customers.",
      },
      {
        title: "Administrator exemption",
        description:
          "Administrators continue to see the toolbar and retain their normal workflow.",
      },
      {
        title: "Independent toggle",
        description:
          "Can be enabled without turning on dashboard redirects or login routing.",
      },
      {
        title: "Toolkit placement",
        description:
          "Configured from ArraySubs -> Settings -> Toolkit alongside the other access modules.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "1", label: "Primary toggle" },
      { value: "0", label: "Capability changes" },
      { value: "5", label: "Toolkit modules" },
    ],
    faq: [
      {
        question: "Does hiding the admin bar block wp-admin access?",
        answer:
          "No. Admin Bar Visibility is cosmetic. Use Admin Dashboard Access when you also need to redirect unauthorized users away from wp-admin.",
      },
      {
        question: "Can administrators still see the toolbar?",
        answer:
          "Yes. Administrators keep the frontend toolbar so normal management shortcuts still work.",
      },
    ],
    related: ["admin-dashboard-access", "wordpress-login-page", "login-as-user"],
  }),
  buildFeature({
    slug: "admin-dashboard-access",
    category: "site-access-toolkit",
    icon: ShieldCheck,
    name: "Admin Dashboard Access",
    cardDescription:
      "Redirect unauthorized customers away from wp-admin while preserving access for administrators and selected roles.",
    tier: "Free",
    summary:
      "Restrict direct WordPress dashboard access for customers and allow selected staff roles when needed.",
    h1: "Control who can reach the WordPress dashboard",
    highlights: ["Free Toolkit module", "Role allow-list", "Customer redirects"],
    intro:
      "Admin Dashboard Access is a free Toolkit module that ==redirects customers away from wp-admin== while preserving backend access for administrators and any selected staff roles. It keeps the member experience frontend-first without breaking operations.",
    capabilities: [
      {
        title: "wp-admin restriction",
        description:
          "Redirects unauthorized users away from the WordPress dashboard.",
      },
      {
        title: "Custom redirect target",
        description:
          "Sends customers to the My Account page or another configured destination.",
      },
      {
        title: "Allowed roles",
        description:
          "Lets selected staff roles keep dashboard access without granting full administrator status.",
      },
      {
        title: "Safe exclusions",
        description:
          "Preserves login, logout, AJAX, REST, cron, and administrator access paths.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "1", label: "Role allow-list" },
      { value: "1", label: "Redirect target" },
      { value: "5", label: "Toolkit modules" },
    ],
    faq: [
      {
        question: "Will this block administrators?",
        answer:
          "No. Administrators are always allowed. You can also allow selected non-admin staff roles.",
      },
      {
        question: "Does it replace WordPress capability checks?",
        answer:
          "No. It redirects unwanted dashboard visits; it does not grant new capabilities to users.",
      },
    ],
    related: ["admin-bar-visibility", "wordpress-login-page", "login-as-user"],
  }),
  buildFeature({
    slug: "wordpress-login-page",
    category: "site-access-toolkit",
    icon: KeyRound,
    name: "WordPress Login Page",
    cardDescription:
      "Route customer login and registration traffic through WooCommerce My Account instead of wp-login.php.",
    tier: "Free",
    summary:
      "Send customer-facing login traffic to WooCommerce My Account and keep the default WordPress login out of view.",
    h1: "Route customers away from the default WordPress login",
    highlights: ["Free Toolkit module", "My Account routing", "wp-login cleanup"],
    intro:
      "WordPress Login Page is a free Toolkit module that ==routes customer login and registration traffic through WooCommerce My Account== instead of the default WordPress login screen. It keeps the storefront experience consistent for subscribers.",
    capabilities: [
      {
        title: "Login page redirect",
        description:
          "Redirects customer visits to the default WordPress login page.",
      },
      {
        title: "My Account destination",
        description:
          "Uses WooCommerce My Account as the customer-facing login and registration screen.",
      },
      {
        title: "Registration cleanup",
        description:
          "Routes customer registration traffic through the same storefront path.",
      },
      {
        title: "Admin-safe behavior",
        description:
          "Keeps administrator and required WordPress authentication flows available.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "1", label: "Redirect toggle" },
      { value: "My Account", label: "Default target" },
      { value: "5", label: "Toolkit modules" },
    ],
    faq: [
      {
        question: "Does this remove customer login?",
        answer:
          "No. Customers still log in through WooCommerce My Account; the module only hides the default WordPress login path from normal storefront traffic.",
      },
      {
        question: "Can I use it with dashboard access restrictions?",
        answer:
          "Yes. It pairs naturally with Admin Dashboard Access and Admin Bar Visibility for a cleaner customer-facing site.",
      },
    ],
    related: ["customer-portal", "admin-dashboard-access", "login-as-user"],
  }),
  buildFeature({
    slug: "login-as-user",
    category: "site-access-toolkit",
    icon: UserCheck,
    name: "Login as User",
    cardDescription:
      "Let administrators open a customer's frontend session for support, verification, and portal troubleshooting.",
    tier: "Free",
    summary:
      "Impersonate non-admin customers from support contexts without asking for their password.",
    h1: "Support customers from their actual frontend session",
    highlights: ["Free Toolkit module", "Admin impersonation", "Customer support"],
    intro:
      "Login as User is a free Toolkit module that lets administrators ==open a non-admin customer's frontend session== for support, verification, and customer portal troubleshooting. It works without asking for the customer's password.",
    capabilities: [
      {
        title: "Customer impersonation",
        description:
          "Open a customer's frontend session from supported admin contexts.",
      },
      {
        title: "Visible return state",
        description:
          "Shows the impersonation state so administrators can return to their own session.",
      },
      {
        title: "Non-admin only",
        description:
          "Prevents administrator-to-administrator impersonation for safer operations.",
      },
      {
        title: "Session-limit exemption",
        description:
          "Impersonation sessions do not count against Multi-Login Prevention limits.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "Admin", label: "Allowed actor" },
      { value: "0", label: "Customer passwords needed" },
      { value: "5", label: "Toolkit modules" },
    ],
    faq: [
      {
        question: "Can I impersonate another administrator?",
        answer:
          "No. Login as User only supports non-admin customer accounts.",
      },
      {
        question: "Does impersonation count toward Multi-Login Prevention?",
        answer:
          "No. Login as User sessions are excluded from session limits.",
      },
    ],
    related: ["manage-subscriptions", "member-insight", "multi-login-prevention"],
  }),
  buildFeature({
    slug: "multi-login-prevention",
    category: "site-access-toolkit",
    icon: Lock,
    name: "Multi-Login Prevention",
    cardDescription:
      "Limit concurrent sessions per user account and configure plan-level session overrides. Pro only.",
    tier: "Pro",
    summary:
      "Protect paid accounts from casual credential sharing with concurrent-session limits.",
    h1: "Limit shared account sessions",
    highlights: ["Pro Toolkit module", "Session limits", "Plan overrides"],
    intro:
      "Multi-Login Prevention is a Pro Toolkit module that ==limits concurrent sessions per user account== so subscriptions cannot be casually shared across unlimited devices. It supports a global limit, plan-specific overrides, administrator inclusion, and Login as User exclusions.",
    capabilities: [
      {
        title: "Global session limit",
        description:
          "Set the default maximum number of active sessions per customer account.",
      },
      {
        title: "Plan-level overrides",
        description:
          "Allow higher or lower limits for specific subscription products or plans.",
      },
      {
        title: "Oldest-session eviction",
        description:
          "When the limit is exceeded, the oldest session is terminated and the current login succeeds.",
      },
      {
        title: "Impersonation exemption",
        description:
          "Login as User sessions are never counted toward customer limits.",
      },
    ],
    stats: [
      { value: "Pro", label: "Availability" },
      { value: "1", label: "Default max sessions" },
      { value: "Plan", label: "Override scope" },
      { value: "Oldest", label: "Session removed" },
    ],
    faq: [
      {
        question: "Does Multi-Login Prevention block the new login?",
        answer:
          "No. The current login succeeds. If the limit is exceeded, ArraySubs terminates the oldest active session.",
      },
      {
        question: "Can administrators be included?",
        answer:
          "Administrators are exempt by default, but Pro can include administrators if that setting is enabled.",
      },
    ],
    related: ["login-as-user", "member-access", "member-insight"],
  }),
  buildFeature({
    slug: "coupons",
    category: "products-checkout",
    icon: ReceiptText,
    name: "Coupons",
    cardDescription:
      "Apply WooCommerce coupons to subscription products with recurring discounts, cycle limits, and checkout counting.",
    tier: "Free",
    summary:
      "Extend WooCommerce coupons for subscription-aware discounts and renewal-cycle control.",
    h1: "Use coupons with subscription billing",
    highlights: ["WooCommerce coupons", "Recurring discounts", "Cycle limits"],
    intro:
      "Coupons is a free module that ==adds subscription-aware behavior to WooCommerce coupons==. Merchants can apply one-time or recurring discounts, set renewal cycle limits, and decide whether the initial checkout counts toward the discount cycle.",
    capabilities: [
      {
        title: "Subscription-aware discounts",
        description:
          "Apply coupon discounts to initial subscription orders and renewal orders.",
      },
      {
        title: "Recurring cycle limits",
        description:
          "Limit how many renewal cycles a coupon should affect.",
      },
      {
        title: "Initial checkout counting",
        description:
          "Choose whether the first checkout order consumes one coupon cycle.",
      },
      {
        title: "WooCommerce native flow",
        description:
          "Uses familiar WooCommerce coupon management instead of a separate discount system.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "2", label: "Discount phases" },
      { value: "Cycle", label: "Limit scope" },
      { value: "WC", label: "Coupon source" },
    ],
    faq: [
      {
        question: "Do WooCommerce coupons work on renewals?",
        answer:
          "Yes. ArraySubs extends coupon behavior so eligible coupons can apply to renewals with cycle limits.",
      },
      {
        question: "Can a coupon apply only at checkout?",
        answer:
          "Yes. Configure the coupon so it affects the initial order without continuing across renewal cycles.",
      },
    ],
    related: ["subscription-products", "checkout-and-payments", "retention-and-refunds"],
  }),
  buildFeature({
    slug: "subscription-products",
    category: "products-checkout",
    icon: Boxes,
    name: "Subscription Products",
    cardDescription:
      "Create and manage simple or variable subscription products with trials, signup fees, plan logic, and lifecycle behavior.",
    tier: "Free + Pro",
    summary:
      "Turn WooCommerce products into recurring plans with product-level subscription behavior.",
    h1: "Create subscription products in WooCommerce",
    highlights: ["Simple products", "Variable products", "Plan logic"],
    intro:
      "Subscription Products is the product configuration module for ArraySubs. It covers ==simple and variable subscriptions, billing periods, trials, signup fees, different renewal pricing, linked product paths, product lifecycle handling, and Pro product extensions==.",
    capabilities: [
      {
        title: "Simple and variable plans",
        description:
          "Sell one recurring offer or multiple variations with different prices and cycles.",
      },
      {
        title: "Billing terms",
        description:
          "Configure periods, intervals, trials, signup fees, renewal prices, and subscription lengths.",
      },
      {
        title: "Plan relationships",
        description:
          "Define upgrade, downgrade, and crossgrade paths between products.",
      },
      {
        title: "Product lifecycle rules",
        description:
          "Handle deleted products, cached subscription data, and direct checkout test links.",
      },
    ],
    stats: [
      { value: "2", label: "Product modes" },
      { value: "5", label: "Billing periods" },
      { value: "Free", label: "Core setup" },
      { value: "Pro", label: "Product extensions" },
    ],
    faq: [
      {
        question: "Can variable products have subscription terms?",
        answer:
          "Yes. Variations can carry their own subscription price, billing period, trial, and renewal behavior.",
      },
      {
        question: "Which product features require Pro?",
        answer:
          "The core product engine is free. Pro adds product extensions such as Feature Manager, Redirect Product Page, and Subscription Shipping.",
      },
    ],
    related: ["billing-and-renewals", "checkout-and-payments", "feature-manager"],
  }),
  buildFeature({
    slug: "checkout-and-payments",
    category: "products-checkout",
    icon: CreditCard,
    name: "Checkout and Payments",
    cardDescription:
      "Subscription checkout, automatic payments, gateway setup, customer payment methods, and Checkout Builder workflows.",
    tier: "Free + Pro",
    summary:
      "Control how subscriptions are purchased, billed, and collected from checkout through renewal.",
    h1: "Manage subscription checkout and payments",
    highlights: ["Checkout flow", "Automatic payments", "Gateway setup"],
    intro:
      "Checkout and Payments covers ==subscription checkout, cart rules, automatic payment gateways, manual fallback, customer payment methods, and Pro Checkout Builder workflows==. It connects the purchase path to the recurring billing engine.",
    capabilities: [
      {
        title: "Subscription checkout",
        description:
          "Handles subscription cart rules, trial behavior, one-click checkout, and subscription creation.",
      },
      {
        title: "Automatic payments",
        description:
          "Pro supports automatic collection through Stripe, PayPal, and Paddle.",
      },
      {
        title: "Manual fallback",
        description:
          "Stores can still create renewal invoices and accept manual payment flows.",
      },
      {
        title: "Checkout Builder",
        description:
          "Pro adds multi-step checkout customization, 27 field types, and checkout data capture.",
      },
    ],
    stats: [
      { value: "3", label: "Pro gateways" },
      { value: "27", label: "Builder fields" },
      { value: "Manual", label: "Core fallback" },
      { value: "Pro", label: "Automation" },
    ],
    faq: [
      {
        question: "Can ArraySubs work without automatic payments?",
        answer:
          "Yes. The core supports manual renewal invoices. Pro adds automatic collection through supported gateways.",
      },
      {
        question: "Is Checkout Builder a root Pro module?",
        answer:
          "The updated manual groups Checkout Builder under Checkout and Payments rather than counting it as a separate root-level Pro module.",
      },
    ],
    related: ["subscription-products", "billing-and-renewals", "gateway-health"],
  }),
  buildFeature({
    slug: "redirect-product-page",
    category: "products-checkout",
    icon: LayoutGrid,
    name: "Redirect Product Page",
    cardDescription:
      "Send direct subscription product URLs to a sales page or return a 404 while checkout links keep working. Pro only.",
    tier: "Pro",
    summary:
      "Control direct access to subscription product pages without breaking checkout or admin product management.",
    h1: "Redirect or hide direct subscription product URLs",
    highlights: ["Pro product module", "301 redirect", "404 option"],
    intro:
      "Redirect Product Page is a Pro module that ==sends direct subscription product URLs to a custom sales page or returns a 404==. Checkout links and backend product management continue to work, so merchants can sell through curated pages without exposing raw product URLs.",
    capabilities: [
      {
        title: "Custom sales-page redirect",
        description:
          "Redirect product-page visitors to a dedicated landing or sales page.",
      },
      {
        title: "404 handling",
        description:
          "Hide direct product URLs entirely when products should only be reached through checkout links.",
      },
      {
        title: "Checkout-safe behavior",
        description:
          "Keeps add-to-cart and checkout paths working for configured products.",
      },
      {
        title: "Product-level control",
        description:
          "Configure behavior from subscription product settings.",
      },
    ],
    stats: [
      { value: "Pro", label: "Availability" },
      { value: "2", label: "URL behaviors" },
      { value: "301", label: "Redirect type" },
      { value: "404", label: "Hide option" },
    ],
    faq: [
      {
        question: "Does it break checkout links?",
        answer:
          "No. It controls direct product-page visits while checkout and backend product workflows continue to work.",
      },
      {
        question: "Where is it configured?",
        answer:
          "The controls live on the subscription product editing screen.",
      },
    ],
    related: ["subscription-products", "checkout-and-payments", "feature-manager"],
  }),
  buildFeature({
    slug: "subscription-shipping",
    category: "products-checkout",
    icon: Boxes,
    name: "Subscription Shipping",
    cardDescription:
      "Decide whether physical subscription products charge shipping once at checkout or again on each renewal. Pro only.",
    tier: "Pro",
    summary:
      "Configure one-time or recurring shipping charges for physical subscription products.",
    h1: "Control shipping charges for physical subscriptions",
    highlights: ["Pro product module", "One-time shipping", "Recurring shipping"],
    intro:
      "Subscription Shipping is a Pro module for physical subscription products. It lets merchants ==charge shipping only at checkout or charge shipping again on each renewal==, depending on how the product is fulfilled.",
    capabilities: [
      {
        title: "One-time shipping",
        description:
          "Charge shipping at the initial checkout only when future deliveries do not need shipping fees.",
      },
      {
        title: "Recurring shipping",
        description:
          "Repeat shipping charges on renewals for boxes, supplies, and physical recurring shipments.",
      },
      {
        title: "Product-level setup",
        description:
          "Configure shipping behavior on subscription products.",
      },
      {
        title: "Portal-aware display",
        description:
          "Keeps customer-facing subscription details aligned with shipping behavior.",
      },
    ],
    stats: [
      { value: "Pro", label: "Availability" },
      { value: "2", label: "Shipping modes" },
      { value: "1x", label: "Checkout-only option" },
      { value: "Renewal", label: "Recurring option" },
    ],
    faq: [
      {
        question: "Is this for digital subscriptions?",
        answer:
          "No. Subscription Shipping is designed for physical subscription products that may need shipping charges.",
      },
      {
        question: "Can shipping repeat on every renewal?",
        answer:
          "Yes. Pro can charge shipping again on renewals when the product requires recurring fulfillment.",
      },
    ],
    related: ["subscription-products", "checkout-and-payments", "customer-portal"],
  }),
  buildFeature({
    slug: "manage-subscriptions",
    category: "subscription-operations",
    icon: ClipboardList,
    name: "Manage Subscriptions",
    cardDescription:
      "The central admin hub for viewing, creating, editing, exporting, and managing every subscription record.",
    tier: "Free + Pro",
    summary:
      "Operate every subscription from the main admin dashboard with Pro-only detail cards where applicable.",
    h1: "Manage every subscription from one dashboard",
    highlights: ["Admin dashboard", "Lifecycle actions", "Exports"],
    intro:
      "Manage Subscriptions is the central admin module for ArraySubs. It covers ==subscription lists, filters, search, creation, editing, detail screens, lifecycle actions, exports, and Pro-only detail cards== where advanced modules add more data.",
    capabilities: [
      {
        title: "Subscription list",
        description:
          "Search, filter, and open subscription records from the main admin table.",
      },
      {
        title: "Create and edit",
        description:
          "Create subscriptions manually and update supported subscription fields.",
      },
      {
        title: "Detail cards",
        description:
          "Review lifecycle, cancellation, coupons, gateway, checkout field, and shipping information.",
      },
      {
        title: "Exports",
        description:
          "Export filtered subscription data for operations and reporting.",
      },
    ],
    stats: [
      { value: "Free", label: "Core admin" },
      { value: "Pro", label: "Extra cards" },
      { value: "CSV", label: "Export format" },
      { value: "JSON", label: "Export format" },
    ],
    faq: [
      {
        question: "Can I create subscriptions manually?",
        answer:
          "Yes. The admin module includes subscription creation and editing workflows.",
      },
      {
        question: "Which details require Pro?",
        answer:
          "Pro-only cards appear when their modules are active, such as gateway, checkout field, shipping, or feature-related data.",
      },
    ],
    related: ["subscription-notes", "billing-and-renewals", "customer-portal"],
  }),
  buildFeature({
    slug: "subscription-notes",
    category: "subscription-operations",
    icon: ReceiptText,
    name: "Subscription Notes",
    cardDescription:
      "A permanent timeline for lifecycle changes, renewal events, gateway activity, private notes, and customer-visible notes.",
    tier: "Free",
    summary:
      "Keep subscription history auditable with automatic and manual timeline notes.",
    h1: "Track subscription history with notes",
    highlights: ["Free module", "Timeline", "Customer-visible notes"],
    intro:
      "Subscription Notes is a free module that keeps a ==permanent timeline of subscription changes, renewal events, gateway activity, customer-visible notes, and private admin notes==. It gives support and operations teams the context behind each subscription.",
    capabilities: [
      {
        title: "Automatic timeline",
        description:
          "Logs important lifecycle and renewal events without manual admin work.",
      },
      {
        title: "Private admin notes",
        description:
          "Let staff add internal context that customers cannot see.",
      },
      {
        title: "Customer-visible notes",
        description:
          "Publish support notes to the customer-facing subscription record when needed.",
      },
      {
        title: "Gateway context",
        description:
          "Records gateway-related events when payment modules are active.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "2", label: "Manual note types" },
      { value: "Timeline", label: "Display format" },
      { value: "Admin", label: "Primary user" },
    ],
    faq: [
      {
        question: "Can customers see every note?",
        answer:
          "No. Admin notes stay private. Only customer-visible notes are shown to customers.",
      },
      {
        question: "Are notes useful with Pro gateways?",
        answer:
          "Yes. Gateway and payment events add important context to the same subscription timeline.",
      },
    ],
    related: ["manage-subscriptions", "audits-and-logs", "gateway-health"],
  }),
  buildFeature({
    slug: "customer-portal",
    category: "subscription-operations",
    icon: CircleUser,
    name: "Customer Portal",
    cardDescription:
      "Subscriber self-service inside WooCommerce My Account for viewing, cancelling, pausing, switching, and paying subscriptions.",
    tier: "Free + Pro",
    summary:
      "Give customers a self-service hub for subscription details and lifecycle actions.",
    h1: "Let subscribers manage their own subscriptions",
    highlights: ["My Account", "Self-service actions", "Pro payment actions"],
    intro:
      "Customer Portal is the subscriber self-service module inside WooCommerce My Account. Customers can ==view subscriptions, manage cancellation and pause actions, switch plans, pay invoices, update payment details with Pro, and review related order data== without contacting support.",
    capabilities: [
      {
        title: "My Subscriptions list",
        description:
          "Shows customers their subscription records from WooCommerce My Account.",
      },
      {
        title: "Self-service lifecycle actions",
        description:
          "Supports cancel, undo cancellation, plan switch, skip, pause, resume, and reactivate flows.",
      },
      {
        title: "Payment and shipping actions",
        description:
          "Pro adds payment method, auto-renew, and shipping address workflows.",
      },
      {
        title: "Portal page integrations",
        description:
          "Works with My Features, Store Credit, and profile/menu customization modules.",
      },
    ],
    stats: [
      { value: "My Account", label: "Customer home" },
      { value: "7", label: "Core actions" },
      { value: "Pro", label: "Payment actions" },
      { value: "0", label: "Support tickets needed" },
    ],
    faq: [
      {
        question: "Can customers cancel from the portal?",
        answer:
          "Yes. The portal supports cancellation, scheduled cancellation undo, retention offers, and related lifecycle actions.",
      },
      {
        question: "Which portal actions require Pro?",
        answer:
          "Updating payment methods, auto-renew controls, and shipping address updates are Pro workflows.",
      },
    ],
    related: ["manage-subscriptions", "profile-builder", "billing-and-renewals"],
  }),
  buildFeature({
    slug: "billing-and-renewals",
    category: "subscription-operations",
    icon: Repeat,
    name: "Billing and Renewals",
    cardDescription:
      "How ArraySubs creates, schedules, communicates, and collects recurring payments from first invoice to final renewal.",
    tier: "Free + Pro",
    summary:
      "Run the recurring billing engine, renewal invoices, trial conversion, grace flows, and payment communication.",
    h1: "Run recurring billing and renewal operations",
    highlights: ["Renewal invoices", "Grace periods", "Trial conversion"],
    intro:
      "Billing and Renewals is the recurring payment engine. It covers ==renewal invoice generation, manual and automatic payment routing, trial conversion, recovery and grace flows, renewal reminders, payment confirmations, and failure communication==.",
    capabilities: [
      {
        title: "Renewal operations",
        description:
          "Creates and schedules renewal invoices and routes collection through manual or automatic paths.",
      },
      {
        title: "Trial management",
        description:
          "Handles trial start, trial conversion, first renewal calculation, and related settings.",
      },
      {
        title: "Recovery and grace flows",
        description:
          "Uses a two-phase grace period so payment recovery does not cancel access immediately.",
      },
      {
        title: "Renewal communication",
        description:
          "Coordinates reminders, invoices, confirmations, payment failures, and on-hold notices.",
      },
    ],
    stats: [
      { value: "Free", label: "Manual renewals" },
      { value: "Pro", label: "Automatic collection" },
      { value: "2", label: "Grace phases" },
      { value: "Email", label: "Renewal notices" },
    ],
    faq: [
      {
        question: "Does the core plugin support renewals?",
        answer:
          "Yes. The core handles recurring billing and manual renewal invoices. Pro adds automatic gateway collection.",
      },
      {
        question: "What happens after a failed renewal?",
        answer:
          "ArraySubs uses recovery and grace flows instead of cancelling access immediately.",
      },
    ],
    related: ["checkout-and-payments", "customer-portal", "emails"],
  }),
  buildFeature({
    slug: "profile-builder",
    category: "member-experience",
    icon: UserCog,
    name: "Profile Builder",
    cardDescription:
      "Collect custom profile data, manage avatars, rearrange My Account navigation, and add custom endpoint pages.",
    tier: "Free + Pro",
    summary:
      "Customize customer profile fields and the WooCommerce My Account experience.",
    h1: "Customize profiles and My Account pages",
    highlights: ["Custom fields", "Avatar uploads", "Menu editor"],
    intro:
      "Profile Builder and My Account Customization lets merchants ==collect custom profile data, manage avatars, rearrange My Account menu items, add custom endpoint pages, and connect Pro pages like features and store credit into the customer account area==.",
    capabilities: [
      {
        title: "Profile form fields",
        description:
          "Add custom profile fields and control how customer data is collected.",
      },
      {
        title: "Avatar settings",
        description:
          "Let customers upload or manage profile avatars from the account area.",
      },
      {
        title: "My Account editor",
        description:
          "Reorder, rename, hide, and add endpoint pages in WooCommerce My Account.",
      },
      {
        title: "Pro page placement",
        description:
          "Integrates Pro pages such as My Features and Store Credit when those modules are active.",
      },
    ],
    stats: [
      { value: "Free", label: "Core customization" },
      { value: "Pro", label: "Extra page links" },
      { value: "My Account", label: "Primary surface" },
      { value: "Fields", label: "Custom data" },
    ],
    faq: [
      {
        question: "Can I add custom profile fields?",
        answer:
          "Yes. Profile Builder includes custom profile field settings and display controls.",
      },
      {
        question: "Can I reorder My Account menu items?",
        answer:
          "Yes. The My Account editor can reorder, rename, hide, and add endpoint pages.",
      },
    ],
    related: ["customer-portal", "shortcodes", "member-access"],
  }),
  buildFeature({
    slug: "shortcodes",
    category: "member-experience",
    icon: SlidersHorizontal,
    name: "Shortcodes",
    cardDescription:
      "Display login/logout links, personalized user data, gated content, and Pro store credit forms anywhere.",
    tier: "Free + Pro",
    summary:
      "Place account links, personalized content, visibility rules, and Pro store credit forms with shortcodes.",
    h1: "Add subscription-aware shortcodes anywhere",
    highlights: ["Account shortcodes", "Content gating", "Store credit form"],
    intro:
      "Shortcodes is a root module for adding subscription-aware output to WordPress content. It includes ==login/logout links, personalized greetings, gated content with visibility and restriction shortcodes, and a Pro store-credit purchase shortcode==. The same gating engine is also exposed as an ==Elementor Container integration==, so you can lock a section from the builder with no shortcode.",
    capabilities: [
      {
        title: "Account shortcodes",
        description:
          "Display login, logout, and user-specific content in posts, pages, or builders.",
      },
      {
        title: "Content gating",
        description:
          "Use restriction and visibility shortcodes for subscription-aware content blocks.",
      },
      {
        title: "Elementor content restrictions",
        description:
          "Gate any Elementor Container (Flexbox or Grid) by subscription, role, purchase, or feature from the Advanced tab — no shortcode required.",
      },
      {
        title: "Personalized display",
        description:
          "Show customer-specific details without building custom templates.",
      },
      {
        title: "Store credit purchase form",
        description:
          "Pro adds the store-credit purchase shortcode for selling credits.",
      },
    ],
    stats: [
      { value: "Free", label: "Account shortcodes" },
      { value: "Free", label: "Gating shortcodes" },
      { value: "Pro", label: "Credit shortcode" },
      { value: "WP", label: "Content surface" },
    ],
    faq: [
      {
        question: "Can I gate inline content?",
        answer:
          "Yes. The visibility and restriction shortcodes can show or hide content based on access rules.",
      },
      {
        question: "Do I have to type shortcodes in Elementor?",
        answer:
          "No. ArraySubs adds an ArraySubs Content Restrictions section to the Elementor Container's Advanced tab, so you can gate a section by subscription, role, purchase, or feature without typing a shortcode.",
      },
      {
        question: "Which shortcode requires Pro?",
        answer:
          "The store credit purchase shortcode requires the Pro Store Credit module.",
      },
    ],
    related: ["member-access", "profile-builder", "store-credit"],
  }),
  buildFeature({
    slug: "member-access",
    category: "member-experience",
    icon: ShieldCheck,
    name: "Member Access",
    cardDescription:
      "Control who can see, download, and purchase content using flexible rules tied to subscriptions and roles.",
    tier: "Free + Pro",
    summary:
      "Gate content, URLs, products, downloads, roles, discounts, and drip access by subscription conditions.",
    h1: "Control member access and restriction rules",
    highlights: ["Access rules", "Commerce rules", "Content dripping"],
    intro:
      "Member Access and Restriction Rules controls who can ==see, download, and purchase content== using conditions tied to subscription status, purchase history, roles, spending thresholds, and feature entitlements. The Login Limit extension is Pro.",
    capabilities: [
      {
        title: "Access rules",
        description:
          "Build role mapping, URL rules, and post type or taxonomy restrictions.",
      },
      {
        title: "Commerce benefits",
        description:
          "Create member discounts, product purchase restrictions, and download access rules.",
      },
      {
        title: "Content restriction",
        description:
          "Drip content, show gated messages, protect per-post content, and gate Elementor Containers from the builder.",
      },
      {
        title: "Session extension",
        description:
          "Pro adds login limit controls for account-sharing protection.",
      },
    ],
    stats: [
      { value: "Free", label: "Access engine" },
      { value: "Pro", label: "Login limit" },
      { value: "Rules", label: "Primary model" },
      { value: "Roles", label: "WP integration" },
    ],
    faq: [
      {
        question: "Can Member Access restrict products?",
        answer:
          "Yes. It includes ecommerce and benefit rules for purchase restrictions, discounts, and downloads.",
      },
      {
        question: "Is Multi-Login Prevention part of Member Access?",
        answer:
          "The manual treats Multi-Login Prevention as a dedicated Pro Toolkit module. Member Access still documents the related Login Limit extension.",
      },
      {
        question: "Can I gate content in Elementor?",
        answer:
          "Yes. The same restriction engine is exposed on the Elementor Container's Advanced tab, so you can gate a section by subscription, role, purchase, or feature with no shortcode.",
      },
    ],
    related: ["feature-manager", "shortcodes", "multi-login-prevention"],
  }),
  buildFeature({
    slug: "member-insight",
    category: "member-experience",
    icon: UserCog,
    name: "Member Insight",
    cardDescription:
      "Look up any customer, view their subscription and commerce profile, and jump to related support actions. Pro only.",
    tier: "Pro",
    summary:
      "Give support teams a unified customer profile with subscription, commerce, credit, and shortcut context.",
    h1: "See every member relationship in one dashboard",
    highlights: ["Pro module", "Member profiles", "Support shortcuts"],
    intro:
      "Member Insight is a Pro module for looking up any customer and viewing their ==complete subscription and commerce profile== from one dashboard. It brings together profile details, subscription history, purchased products, store credit, addresses, and support shortcuts.",
    capabilities: [
      {
        title: "Member lookup",
        description:
          "Search customers and open a unified member profile.",
      },
      {
        title: "Commerce overview",
        description:
          "Review subscriptions, purchased products, store credit balance, and addresses.",
      },
      {
        title: "Support actions",
        description:
          "Jump to related screens and use Login as Customer where available.",
      },
      {
        title: "Operational insight",
        description:
          "Shows subscriber context for faster support and account decisions.",
      },
    ],
    stats: [
      { value: "Pro", label: "Availability" },
      { value: "1", label: "Unified profile" },
      { value: "4", label: "Commerce areas" },
      { value: "Admin", label: "Primary user" },
    ],
    faq: [
      {
        question: "Is Member Insight available in the free core?",
        answer:
          "No. Member Insight is one of the seven Pro-only root modules in the updated manual.",
      },
      {
        question: "Does it replace Login as User?",
        answer:
          "No. Member Insight is the Pro profile dashboard; Login as User is the free impersonation module it can connect to.",
      },
    ],
    related: ["login-as-user", "store-credit", "manage-subscriptions"],
  }),
  buildFeature({
    slug: "retention-and-refunds",
    category: "retention-revenue",
    icon: HeartHandshake,
    name: "Retention and Refunds",
    cardDescription:
      "Configure cancellation reasons, retention offers, refund policies, prorated refunds, and Pro refund-to-credit flows.",
    tier: "Free + Pro",
    summary:
      "Reduce churn, capture cancellation reasons, present save offers, and manage refund outcomes.",
    h1: "Reduce churn and manage refunds",
    highlights: ["Cancellation reasons", "Retention offers", "Refund policies"],
    intro:
      "Retention, Cancellation, and Refunds is the module for ==cancellation setup, retention offers, retention use cases, refund management, prorated refunds, and Pro refund-to-store-credit outcomes==. It helps merchants understand why customers leave and recover revenue before it is lost.",
    capabilities: [
      {
        title: "Cancellation setup",
        description:
          "Control immediate vs end-of-period cancellation and required reason capture.",
      },
      {
        title: "Retention offers",
        description:
          "Present discount, pause, downgrade, or contact-support offers during cancellation.",
      },
      {
        title: "Refund management",
        description:
          "Handle immediate, end-of-period, prorated, and full-refund subscription behavior.",
      },
      {
        title: "Refund to credit",
        description:
          "Pro can retain value by refunding to store credit instead of payment rails.",
      },
    ],
    stats: [
      { value: "Free", label: "Retention flow" },
      { value: "4", label: "Offer types" },
      { value: "Pro", label: "Credit refunds" },
      { value: "Reasons", label: "Churn insight" },
    ],
    faq: [
      {
        question: "Are retention offers free?",
        answer:
          "Yes. The core includes retention offers and cancellation reason capture.",
      },
      {
        question: "Which refund workflow requires Pro?",
        answer:
          "Refund-to-store-credit depends on the Pro Store Credit module.",
      },
    ],
    related: ["retention-analytics", "store-credit", "customer-portal"],
  }),
  buildFeature({
    slug: "retention-analytics",
    category: "retention-revenue",
    icon: ChartColumn,
    name: "Retention Analytics",
    cardDescription:
      "Understand cancellation reasons, retention offer performance, churn trends, and retained revenue from WooCommerce Analytics.",
    tier: "Free",
    summary:
      "Analyze why customers cancel and which retention offers save revenue.",
    h1: "Measure churn reasons and saved revenue",
    highlights: ["Free module", "Cancellation analytics", "Offer performance"],
    intro:
      "Retention Analytics is a free dedicated analytics module for understanding ==why customers cancel, how retention offers perform, which products have the highest churn, and how much revenue is retained== through save flows.",
    capabilities: [
      {
        title: "Cancellation reason reporting",
        description:
          "Shows which reasons customers choose during cancellation.",
      },
      {
        title: "Offer performance",
        description:
          "Tracks how often retention offers are accepted or declined.",
      },
      {
        title: "Product churn insight",
        description:
          "Highlights which subscriptions or products drive cancellation risk.",
      },
      {
        title: "Retained revenue",
        description:
          "Measures value saved when customers accept retention offers.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "4", label: "Offer types tracked" },
      { value: "Churn", label: "Primary metric" },
      { value: "Revenue", label: "Saved value" },
    ],
    faq: [
      {
        question: "Is Retention Analytics Pro-only?",
        answer:
          "No. The updated manual counts Retention Analytics as a free root-level module.",
      },
      {
        question: "Does it depend on Retention and Refunds?",
        answer:
          "Yes. It reports on cancellation reasons and offers configured through the retention workflow.",
      },
    ],
    related: ["retention-and-refunds", "analytics", "store-credit"],
  }),
  buildFeature({
    slug: "store-credit",
    category: "retention-revenue",
    icon: Wallet,
    name: "Store Credit",
    cardDescription:
      "A Pro wallet system for credit balances, purchase products, credit history, expirations, emails, and refund-to-credit.",
    tier: "Pro",
    summary:
      "Let customers earn and spend flexible store credit across renewals, purchases, refunds, and promotions.",
    h1: "Turn refunds and rewards into store credit",
    highlights: ["Pro module", "Credit wallet", "Refund to credit"],
    intro:
      "Store Credit is a Pro module that gives customers ==a flexible balance they can earn from refunds, downgrades, promotions, or direct purchases== and spend on renewals, new orders, or anything in the store.",
    capabilities: [
      {
        title: "Credit management",
        description:
          "Search customers, view balances, add or deduct credit, and review transaction histories.",
      },
      {
        title: "Credit history",
        description:
          "Track every credit transaction with source and type filtering.",
      },
      {
        title: "Credit purchase product",
        description:
          "Sell credit as a WooCommerce product with fixed or custom amounts.",
      },
      {
        title: "Refund to credit",
        description:
          "Process WooCommerce refunds as store credit to retain value.",
      },
    ],
    stats: [
      { value: "Pro", label: "Availability" },
      { value: "4", label: "Credit emails" },
      { value: "Wallet", label: "Customer balance" },
      { value: "Refund", label: "Credit source" },
    ],
    faq: [
      {
        question: "Can customers buy store credit?",
        answer:
          "Yes. Pro includes a store credit purchase product workflow.",
      },
      {
        question: "Can refunds become credit?",
        answer:
          "Yes. Store Credit supports refund-to-credit from WooCommerce order screens.",
      },
    ],
    related: ["retention-and-refunds", "customer-portal", "emails"],
  }),
  buildFeature({
    slug: "analytics",
    category: "analytics-infrastructure",
    icon: ChartColumn,
    name: "Analytics",
    cardDescription:
      "Track subscription revenue, growth, churn, retention, and customer behavior across reports and WooCommerce Analytics.",
    tier: "Free + Pro",
    summary:
      "Use the reports hub and WooCommerce Analytics extensions to understand subscription performance.",
    h1: "Report on subscription performance",
    highlights: ["Reports hub", "WooCommerce Analytics", "Pro extensions"],
    intro:
      "Analytics and Reports tracks ==subscription revenue, growth, churn, retention, and customer behavior== across a central reports hub and extended WooCommerce Analytics screens. The manual counts it as core-accessible with Pro extensions.",
    capabilities: [
      {
        title: "Reports hub",
        description:
          "Central navigation for subscription reporting and retention analytics.",
      },
      {
        title: "Performance dashboard",
        description:
          "Pro adds KPI cards, time-series charts, and leaderboards for subscription performance.",
      },
      {
        title: "WooCommerce reports extension",
        description:
          "Adds subscription-aware filters, types, and revenue cards to WooCommerce Analytics.",
      },
      {
        title: "Order list enhancements",
        description:
          "Improves order analysis with subscription-specific fields and filters.",
      },
    ],
    stats: [
      { value: "Free", label: "Reports hub" },
      { value: "Pro", label: "Advanced cards" },
      { value: "WC", label: "Analytics surface" },
      { value: "Churn", label: "Tracked metric" },
    ],
    faq: [
      {
        question: "Is Analytics counted as a Pro-only root module?",
        answer:
          "No. The updated manual counts Analytics as a free/core-accessible module with Pro analytics extensions.",
      },
      {
        question: "Where do the reports appear?",
        answer:
          "Reports appear in the ArraySubs reports hub and extended WooCommerce Analytics screens.",
      },
    ],
    related: ["retention-analytics", "gateway-health", "manage-subscriptions"],
  }),
  buildFeature({
    slug: "emails",
    category: "analytics-infrastructure",
    icon: Mail,
    name: "Emails",
    cardDescription:
      "Automated customer and admin emails for subscription signup, renewals, payments, cancellations, trials, and Pro events.",
    tier: "Free + Pro",
    summary:
      "Send lifecycle emails for customers and admins across subscription events and Pro module workflows.",
    h1: "Automate subscription emails and notifications",
    highlights: ["Customer emails", "Admin emails", "Pro credit emails"],
    intro:
      "Emails and Notifications sends automated messages at ==key subscription lifecycle points: signup, trial, renewal, payment, failure, cancellation, retention, card expiry, gateway verification, and store credit events==. Core emails are free; Store Credit and gateway emails require Pro.",
    capabilities: [
      {
        title: "Customer lifecycle emails",
        description:
          "Notify customers about subscription creation, trials, renewals, payments, status changes, and cancellations.",
      },
      {
        title: "Admin notifications",
        description:
          "Alert administrators about new subscriptions, failed payments, scheduled cancellations, and cancellations.",
      },
      {
        title: "Template customization",
        description:
          "Uses WooCommerce email conventions, placeholders, and template override paths.",
      },
      {
        title: "Pro event emails",
        description:
          "Pro adds Store Credit and gateway-related email notifications.",
      },
    ],
    stats: [
      { value: "17", label: "Customer emails" },
      { value: "4", label: "Admin emails" },
      { value: "4", label: "Credit emails" },
      { value: "WC", label: "Email system" },
    ],
    faq: [
      {
        question: "Does ArraySubs use WooCommerce emails?",
        answer:
          "Yes. The email system integrates with WooCommerce email conventions and template overrides.",
      },
      {
        question: "Which emails require Pro?",
        answer:
          "Store Credit emails and some gateway-related email workflows require Pro modules.",
      },
    ],
    related: ["billing-and-renewals", "retention-and-refunds", "store-credit"],
  }),
  buildFeature({
    slug: "audits-and-logs",
    category: "analytics-infrastructure",
    icon: ClipboardList,
    name: "Audits and Logs",
    cardDescription:
      "Troubleshoot subscription actions, scheduled jobs, gateway health, renewal failures, portal actions, and access conflicts.",
    tier: "Free + Pro",
    summary:
      "Track actions and troubleshoot subscription, gateway, renewal, portal, and access issues.",
    h1: "Audit and troubleshoot subscription operations",
    highlights: ["Troubleshooting", "Activity audits", "Scheduled jobs"],
    intro:
      "Audits, Logs, and Troubleshooting tracks ==actions inside the subscription store, scheduled jobs, gateway health, renewal failures, portal action failures, and access conflicts==. The manual counts it as free/core-accessible with Pro audit and log screens.",
    capabilities: [
      {
        title: "Troubleshooting guides",
        description:
          "Diagnose renewal failures, billing issues, portal action failures, and access conflicts.",
      },
      {
        title: "Activity audits",
        description:
          "Pro adds filterable activity records across subscription lifecycle events.",
      },
      {
        title: "Scheduled-job logs",
        description:
          "Pro shows Action Scheduler execution history with status and errors.",
      },
      {
        title: "Gateway diagnostics",
        description:
          "Connects gateway status and webhook monitoring to operational troubleshooting.",
      },
    ],
    stats: [
      { value: "Free", label: "Guides" },
      { value: "Pro", label: "Audit screens" },
      { value: "Jobs", label: "Scheduler logs" },
      { value: "Gateway", label: "Health context" },
    ],
    faq: [
      {
        question: "Is the entire module Pro-only?",
        answer:
          "No. The manual counts Audits and Logs as core-accessible, with Pro-only audit and scheduled-job screens.",
      },
      {
        question: "What can it troubleshoot?",
        answer:
          "It covers renewal failures, billing issues, portal actions, access conflicts, scheduled jobs, and gateway health.",
      },
    ],
    related: ["subscription-notes", "gateway-health", "analytics"],
  }),
  buildFeature({
    slug: "gateway-health",
    category: "analytics-infrastructure",
    icon: CreditCard,
    name: "Gateway Health",
    cardDescription:
      "Monitor gateway connections, subscription counts, webhook URLs, capabilities, and webhook event logs. Pro only.",
    tier: "Pro",
    summary:
      "Monitor payment gateway status and webhook health from one Pro admin screen.",
    h1: "Monitor payment gateway health",
    highlights: ["Pro module", "Webhook monitoring", "Gateway status"],
    intro:
      "Gateway Health is a Pro module for monitoring ==payment gateway connections, subscription counts per gateway, webhook URLs, gateway capabilities, and webhook event logs== from one admin screen.",
    capabilities: [
      {
        title: "Gateway status cards",
        description:
          "Show active gateway status and operational readiness.",
      },
      {
        title: "Subscription counts",
        description:
          "Track how many subscriptions are attached to each payment gateway.",
      },
      {
        title: "Webhook URLs",
        description:
          "Expose gateway webhook URLs for setup and troubleshooting.",
      },
      {
        title: "Webhook event log",
        description:
          "Review gateway webhook events and diagnose payment issues.",
      },
    ],
    stats: [
      { value: "Pro", label: "Availability" },
      { value: "3", label: "Primary gateways" },
      { value: "Webhook", label: "Event log" },
      { value: "Status", label: "Health cards" },
    ],
    faq: [
      {
        question: "Is Gateway Health the same as automatic payments?",
        answer:
          "No. Automatic payments are part of Checkout and Payments. Gateway Health is the dedicated Pro monitoring module.",
      },
      {
        question: "Which gateways does it help monitor?",
        answer:
          "The manual highlights Stripe, PayPal, and Paddle gateway workflows, plus gateway capabilities and webhook events.",
      },
    ],
    related: ["checkout-and-payments", "audits-and-logs", "analytics"],
  }),
  buildFeature({
    slug: "feature-manager",
    category: "products-checkout",
    icon: LayoutGrid,
    name: "Feature Manager",
    cardDescription:
      "Define product entitlements, limits, and capabilities so customers know exactly what each subscription includes. Pro only.",
    tier: "Pro",
    summary:
      "Define named plan entitlements and show customers what each subscription includes.",
    h1: "Define per-plan product entitlements",
    highlights: ["Pro module", "Product features", "Usage display"],
    intro:
      "Feature Manager is a Pro module for defining ==named product entitlements: features, limits, and capabilities==. It can show customers what a plan includes, display My Features in the portal, and support feature logs and usage visibility.",
    capabilities: [
      {
        title: "Feature definitions",
        description:
          "Add, edit, reorder, and template plan features on simple and variable products.",
      },
      {
        title: "Storefront display",
        description:
          "Show a What's Included section so customers can compare plans clearly.",
      },
      {
        title: "Customer My Features page",
        description:
          "Display per-subscription or combined feature entitlements in the portal.",
      },
      {
        title: "Settings and usage visibility",
        description:
          "Control feature display, aggregation mode, usage visibility, and comparisons.",
      },
    ],
    stats: [
      { value: "Pro", label: "Availability" },
      { value: "3", label: "Entitlement styles" },
      { value: "My Features", label: "Portal page" },
      { value: "Product", label: "Setup surface" },
    ],
    faq: [
      {
        question: "Is Feature Manager a Pro-only root module?",
        answer:
          "Yes. The updated manual lists Feature Manager as one of seven Pro-only root modules.",
      },
      {
        question: "Does it only affect product pages?",
        answer:
          "No. It also supports customer-facing My Features display and admin feature logs.",
      },
    ],
    related: ["subscription-products", "member-access", "customer-portal"],
  }),
];

export const getFeature = (slug: string): Feature | undefined =>
  FEATURES.find((feature) => feature.slug === slug);

export const featuresByCategory = (category: FeatureCategoryKey): Feature[] =>
  FEATURES.filter((feature) => feature.category === category);
