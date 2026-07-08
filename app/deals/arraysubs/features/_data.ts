import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Blocks,
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
  SquareDashedMousePointer,
  UserCheck,
  UserCog,
  Wand2,
  Wallet,
} from "lucide-react";

/**
 * Manual-aligned source of truth for the ArraySubs feature hub.
 *
 * The hub mixes root-level modules with high-value documented feature
 * surfaces. Keep this file aligned with the current user manual.
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
  | "payment-gateways"
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
  { key: "products-checkout", label: "Products & checkout" },
  { key: "payment-gateways", label: "Payment gateways" },
  { key: "subscription-operations", label: "Subscription operations" },
  { key: "member-experience", label: "Member experience" },
  { key: "site-access-toolkit", label: "Site access toolkit" },
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
    category: "site-access-toolkit",
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
    related: ["subscription-products", "checkout-page-builder", "retention-and-refunds"],
  }),
  buildFeature({
    slug: "checkout-page-builder",
    category: "site-access-toolkit",
    icon: CreditCard,
    name: "Checkout Page Builder",
    cardDescription:
      "Design Pro classic checkout pages with drag-and-drop fields, multi-step layouts, conditional visibility, and styling controls.",
    tier: "Pro",
    summary:
      "Replace the default classic WooCommerce checkout with a branded, subscription-aware builder flow.",
    h1: "Build custom subscription checkout pages",
    highlights: ["Pro builder", "28 element types", "Multi-step checkout"],
    intro:
      "Checkout Page Builder is the Pro visual editor for the classic WooCommerce checkout page. Merchants can ==drag fields and layout elements into single-step or multi-step checkout flows, apply conditional visibility, style the experience, and carry captured field data through to orders, subscriptions, and renewal invoices==.",
    capabilities: [
      {
        title: "Drag-and-drop checkout layout",
        description:
          "Arrange standard fields, advanced inputs, sections, headings, notices, product tables, and order/payment elements.",
      },
      {
        title: "Multi-step navigation",
        description:
          "Split checkout into named steps with previous/next navigation and a customer-facing progress indicator.",
      },
      {
        title: "Conditional field visibility",
        description:
          "Show or hide fields based on customer input so checkout stays relevant to the selected subscription.",
      },
      {
        title: "Captured subscription data",
        description:
          "Stores custom checkout fields with orders and subscriptions so staff can review them later in operations.",
      },
    ],
    stats: [
      { value: "Pro", label: "Availability" },
      { value: "28", label: "Element types" },
      { value: "Steps", label: "Layout mode" },
      { value: "Fields", label: "Captured data" },
    ],
    faq: [
      {
        question: "Does Checkout Page Builder require Pro?",
        answer:
          "Yes. Checkout Page Builder is the Pro visual builder for the classic WooCommerce checkout page.",
      },
      {
        question: "Does it work with subscription records?",
        answer:
          "Yes. Captured checkout field data can flow through to orders, subscriptions, renewals, and subscription detail cards.",
      },
    ],
    related: ["stripe-payments", "subscription-products", "manage-subscriptions"],
  }),
  buildFeature({
    slug: "my-account-page-builder",
    category: "site-access-toolkit",
    icon: CircleUser,
    name: "My Account Page Builder",
    cardDescription:
      "Reorder, rename, hide, and add WooCommerce My Account pages, including custom endpoints linked to WordPress content.",
    tier: "Free + Pro",
    summary:
      "Control the customer account menu and add custom endpoint pages without writing WooCommerce endpoint code.",
    h1: "Build the WooCommerce My Account experience",
    highlights: ["Menu editor", "Custom endpoints", "Pro menu items"],
    intro:
      "My Account Page Builder is the customer-account layout surface from Profile Builder. Merchants can ==reorder, rename, hide, and add WooCommerce My Account pages, link custom endpoints to WordPress pages or custom post types, and manage Pro-added pages such as My Features and Store Credit==.",
    capabilities: [
      {
        title: "Menu ordering and labels",
        description:
          "Drag My Account items into the preferred order and rename labels like Orders, Downloads, or Subscriptions.",
      },
      {
        title: "Visibility controls",
        description:
          "Hide menu items that should not appear in the customer-facing account navigation.",
      },
      {
        title: "Custom endpoint pages",
        description:
          "Add account tabs that render linked WordPress pages, posts, or custom post types inside the My Account wrapper.",
      },
      {
        title: "Pro page integration",
        description:
          "Manage Pro items such as My Features and Store Credit when those modules are active.",
      },
    ],
    stats: [
      { value: "Free", label: "Core editor" },
      { value: "Pro", label: "Extra pages" },
      { value: "Endpoint", label: "Page model" },
      { value: "My Account", label: "Surface" },
    ],
    faq: [
      {
        question: "Can I add a custom page inside My Account?",
        answer:
          "Yes. Add a custom endpoint, choose the linked WordPress content, and it renders inside the My Account layout.",
      },
      {
        question: "Does hiding a menu item block direct access?",
        answer:
          "No. Hiding controls menu visibility. Use member access rules when the endpoint itself needs access control.",
      },
    ],
    related: ["profile-builder", "customer-portal", "wordpress-login-page"],
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
      { value: "8", label: "Site access cards" },
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
      { value: "8", label: "Site access cards" },
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
      { value: "8", label: "Site access cards" },
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
      { value: "8", label: "Site access cards" },
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
    related: ["subscription-products", "woocommerce-manual-payments", "retention-and-refunds"],
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
    related: ["billing-and-renewals", "stripe-payments", "feature-manager"],
  }),
  buildFeature({
    slug: "free-trials",
    category: "products-checkout",
    icon: Repeat,
    name: "Free Trials",
    cardDescription:
      "Offer trial periods before billing starts, collect payment details when needed, and convert trials into renewal schedules.",
    tier: "Free",
    summary:
      "Add trial windows to subscription products and keep trial conversion aligned with billing rules.",
    h1: "Offer subscription trials before the first renewal",
    highlights: ["Trial periods", "Trial conversion", "Subscription products"],
    intro:
      "Free Trials are part of the core subscription product setup. Merchants can ==offer a free trial before recurring billing begins==, collect the needed checkout details, and let ArraySubs calculate the first paid renewal from the trial end date.",
    capabilities: [
      {
        title: "Product-level trial terms",
        description:
          "Set trial length on simple subscription products or per variation for variable subscriptions.",
      },
      {
        title: "Checkout-aware behavior",
        description:
          "Keeps initial checkout, customer messaging, and first renewal scheduling aligned with the trial window.",
      },
      {
        title: "Trial conversion",
        description:
          "Moves trialing subscriptions into the normal renewal flow when the trial ends.",
      },
      {
        title: "Customer clarity",
        description:
          "Displays trial timing in the subscription purchase and account experience.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "Product", label: "Setup scope" },
      { value: "Trial", label: "First phase" },
      { value: "Renewal", label: "Next phase" },
    ],
    faq: [
      {
        question: "Can variations have different trials?",
        answer:
          "Yes. Variable subscription variations can carry their own trial and billing terms.",
      },
      {
        question: "Does a trial skip subscription creation?",
        answer:
          "No. The subscription exists at checkout, then moves into renewal billing after the trial period.",
      },
    ],
    related: ["subscription-products", "billing-and-renewals", "stripe-payments"],
  }),
  buildFeature({
    slug: "signup-fees",
    category: "products-checkout",
    icon: Wallet,
    name: "Signup Fees",
    cardDescription:
      "Charge one-time setup or activation fees at checkout while renewal orders keep the recurring subscription price.",
    tier: "Free",
    summary:
      "Separate one-time activation revenue from recurring subscription charges.",
    h1: "Add one-time signup fees to subscriptions",
    highlights: ["Setup fee", "Checkout charge", "Clean renewals"],
    intro:
      "Signup Fees let merchants ==charge a one-time setup, onboarding, or activation amount at checkout== without inflating the recurring renewal price. They are configured alongside the product's recurring billing terms.",
    capabilities: [
      {
        title: "One-time checkout fee",
        description:
          "Adds the configured signup fee to the initial subscription order.",
      },
      {
        title: "Recurring price separation",
        description:
          "Keeps renewal orders focused on the recurring subscription amount.",
      },
      {
        title: "Variable plan support",
        description:
          "Lets each subscription variation carry its own setup fee when plans differ.",
      },
      {
        title: "Lifecycle consistency",
        description:
          "Stores the fee with product terms so support and exports can explain the first order total.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "1x", label: "Charge timing" },
      { value: "Initial", label: "Order affected" },
      { value: "Renewal", label: "Unaffected price" },
    ],
    faq: [
      {
        question: "Does the signup fee repeat on renewals?",
        answer:
          "No. Signup fees are charged on the initial checkout order only.",
      },
      {
        question: "Can each variation have a different signup fee?",
        answer:
          "Yes. Variable subscription products can define signup fees per variation.",
      },
    ],
    related: ["subscription-products", "woocommerce-tax-handling", "billing-and-renewals"],
  }),
  buildFeature({
    slug: "different-renewal-price",
    category: "products-checkout",
    icon: ReceiptText,
    name: "Different Renewal Price",
    cardDescription:
      "Design introductory subscription pricing that changes to a configured renewal amount after the chosen billing cycles.",
    tier: "Free",
    summary:
      "Use introductory pricing without manually correcting future renewal totals.",
    h1: "Set a different renewal price after checkout",
    highlights: ["Introductory pricing", "Renewal price", "Cycle control"],
    intro:
      "Different Renewal Price supports offers where the first charge and renewal charge should differ. Merchants can ==sell an introductory amount, then move the subscription to its configured renewal price== after the selected number of billing cycles.",
    capabilities: [
      {
        title: "Introductory offer design",
        description:
          "Use a lower, higher, or launch-specific checkout price before normal renewals begin.",
      },
      {
        title: "Renewal price field",
        description:
          "Store the recurring amount that future renewal orders should use.",
      },
      {
        title: "Apply-after control",
        description:
          "Choose when the subscription switches from the intro price to the renewal price.",
      },
      {
        title: "Variation-aware setup",
        description:
          "Let different subscription variations carry different intro and renewal economics.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "Intro", label: "First price" },
      { value: "Renewal", label: "Later price" },
      { value: "Cycle", label: "Switch point" },
    ],
    faq: [
      {
        question: "Is this only for discounts?",
        answer:
          "No. The renewal price can support any planned difference between checkout and future billing.",
      },
      {
        question: "Does it require a coupon?",
        answer:
          "No. It is configured on the subscription product rather than through WooCommerce coupons.",
      },
    ],
    related: ["subscription-products", "coupons", "billing-and-renewals"],
  }),
  buildFeature({
    slug: "one-click-checkout-urls",
    category: "products-checkout",
    icon: CreditCard,
    name: "One-Click Checkout URLs",
    cardDescription:
      "Send buyers from product buttons, sales pages, or direct add-to-cart links straight into subscription checkout.",
    tier: "Free",
    summary:
      "Create direct checkout paths for subscription products while preserving normal cart-safe behavior.",
    h1: "Send subscription buyers straight to checkout",
    highlights: ["Direct checkout", "Add-to-cart URLs", "Cart bypass"],
    intro:
      "One-Click Checkout URLs make subscription purchase paths easier to test and promote. Stores can ==route subscription add-to-cart actions directly to checkout== and use direct checkout links from product settings, sales pages, campaigns, or support messages.",
    capabilities: [
      {
        title: "Cart bypass option",
        description:
          "Redirect subscription add-to-cart actions to checkout instead of leaving customers on product or cart pages.",
      },
      {
        title: "Direct checkout links",
        description:
          "Use add-to-cart checkout URLs for simple products and configured variations.",
      },
      {
        title: "Sales-page friendly",
        description:
          "Pairs with curated product pages, campaigns, and product-page redirects.",
      },
      {
        title: "Checkout-safe behavior",
        description:
          "Keeps ArraySubs checkout validation active even when the cart page is skipped.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "URL", label: "Primary surface" },
      { value: "Cart", label: "Optional bypass" },
      { value: "Checkout", label: "Destination" },
    ],
    faq: [
      {
        question: "Do direct links work with product redirects?",
        answer:
          "Yes. Product-page redirects control direct product-page visits, while add-to-cart and checkout links continue to work.",
      },
      {
        question: "Can I use one-click URLs for variations?",
        answer:
          "Yes. Variation checkout links include the variation selection needed to add the right plan.",
      },
    ],
    related: ["stripe-payments", "redirect-product-page", "subscription-products"],
  }),
  buildFeature({
    slug: "conditional-subscription-rules",
    category: "products-checkout",
    icon: SlidersHorizontal,
    name: "Conditional Subscription Rules",
    cardDescription:
      "Control one subscription per product, one subscription per customer, mixed carts, billing cycles, and migration behavior.",
    tier: "Free",
    summary:
      "Set the store-level guardrails that decide which subscription combinations can be purchased.",
    h1: "Control subscription purchase conditions",
    highlights: ["Cart rules", "Customer limits", "Migration behavior"],
    intro:
      "Conditional Subscription Rules govern how many subscription relationships a customer can create and combine. Stores can ==limit one subscription per product or customer, allow or block mixed carts, control multiple billing cycles, and auto-migrate existing subscriptions== when the customer chooses a new plan.",
    capabilities: [
      {
        title: "One per product",
        description:
          "Prevent customers from buying duplicate active subscriptions for the same product.",
      },
      {
        title: "One per customer",
        description:
          "Keep customers on a single active subscription relationship when the business model requires it.",
      },
      {
        title: "Mixed checkout control",
        description:
          "Choose whether subscription items can be purchased alongside normal WooCommerce products.",
      },
      {
        title: "Billing-cycle guardrails",
        description:
          "Control whether subscriptions with different billing cycles can share one checkout.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "Cart", label: "Validation point" },
      { value: "Customer", label: "Limit scope" },
      { value: "Product", label: "Limit scope" },
    ],
    faq: [
      {
        question: "Can a store block duplicate subscription products?",
        answer:
          "Yes. The one-subscription-per-product setting prevents duplicate active product subscriptions for the same customer.",
      },
      {
        question: "Can a new subscription replace an old one?",
        answer:
          "Yes. Auto migration can move the customer to the new subscription path when one-per-customer behavior is enabled.",
      },
    ],
    related: ["subscription-products", "woocommerce-manual-payments", "customer-portal"],
  }),
  buildFeature({
    slug: "fixed-date-subscriptions",
    category: "products-checkout",
    icon: Repeat,
    name: "Fixed-Date Subscriptions",
    cardDescription:
      "Sell fixed-period memberships with enrollment windows, annual cutoffs, and period-end renewal or expiration behavior.",
    tier: "Pro",
    summary:
      "Create subscriptions that end on a known calendar date instead of only relative billing lengths.",
    h1: "Sell subscriptions tied to fixed dates",
    highlights: ["Pro product module", "Enrollment windows", "Calendar cutoff"],
    intro:
      "Fixed-Date Subscriptions are a Pro product capability for memberships, cohorts, seasons, or licensing windows. Merchants can ==sell subscriptions that run until a specific date, repeat on annual cutoffs, and control whether access renews or expires at period end==.",
    capabilities: [
      {
        title: "Calendar-based end dates",
        description:
          "End subscriptions on a configured date instead of only using a relative subscription length.",
      },
      {
        title: "Recurring annual periods",
        description:
          "Use a repeatable cutoff for yearly cohorts, seasons, memberships, or license windows.",
      },
      {
        title: "Enrollment windows",
        description:
          "Control when customers can join a fixed-period product.",
      },
      {
        title: "Period-end behavior",
        description:
          "Choose whether the subscription expires or renews when the fixed period ends.",
      },
    ],
    stats: [
      { value: "Pro", label: "Availability" },
      { value: "Date", label: "End model" },
      { value: "Window", label: "Enrollment" },
      { value: "Expire", label: "Period option" },
    ],
    faq: [
      {
        question: "When should I use fixed-date subscriptions?",
        answer:
          "Use them for cohort memberships, seasonal access, annual clubs, or licenses that should share a known end date.",
      },
      {
        question: "Can fixed periods renew?",
        answer:
          "Yes. Pro can support fixed periods that renew or expire based on the product configuration.",
      },
    ],
    related: ["subscription-products", "renewal-sync", "feature-manager"],
  }),
  buildFeature({
    slug: "lifetime-deals",
    category: "products-checkout",
    icon: HeartHandshake,
    name: "Lifetime Deals",
    cardDescription:
      "Sell one-time lifetime access through subscription product setup without recurring renewal invoices.",
    tier: "Free",
    summary:
      "Offer lifetime access as a first-class subscription product mode with no recurring billing.",
    h1: "Sell lifetime subscription deals",
    highlights: ["Lifetime access", "One-time payment", "No renewals"],
    intro:
      "Lifetime Deals let merchants ==sell a one-time subscription-style offer that grants ongoing access without recurring renewal invoices==. They are useful for launch promotions, lifetime memberships, and one-time access products that should still participate in subscription-aware access logic.",
    capabilities: [
      {
        title: "Lifetime billing period",
        description:
          "Use the lifetime product mode when access should not generate recurring renewal orders.",
      },
      {
        title: "Subscription-aware access",
        description:
          "Keep lifetime customers compatible with member access, content restrictions, and account experiences.",
      },
      {
        title: "One-time checkout",
        description:
          "Collect the lifetime purchase amount once at checkout.",
      },
      {
        title: "Operational clarity",
        description:
          "Represent lifetime access in subscription records instead of hiding it in unrelated product metadata.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "1x", label: "Payment model" },
      { value: "0", label: "Renewal invoices" },
      { value: "Access", label: "Primary use" },
    ],
    faq: [
      {
        question: "Do lifetime deals renew?",
        answer:
          "No. Lifetime products grant ongoing access without recurring renewal invoices.",
      },
      {
        question: "Can lifetime buyers satisfy member access rules?",
        answer:
          "Yes. Lifetime subscriptions can participate in subscription-aware access conditions.",
      },
    ],
    related: ["subscription-products", "member-access", "feature-manager"],
  }),
  buildFeature({
    slug: "stripe-payments",
    category: "payment-gateways",
    icon: CreditCard,
    name: "First-Class Stripe Support",
    cardDescription:
      "Run ArraySubs-managed automatic renewals through Stripe with saved payment methods, SCA handling, webhooks, and card lifecycle events.",
    tier: "Pro",
    summary:
      "Use Stripe as the first-class automatic payment gateway where ArraySubs remains the billing schedule source of truth.",
    h1: "Run automatic subscription billing with Stripe",
    highlights: ["Pro gateway", "ArraySubs-managed billing", "SCA support"],
    intro:
      "First-Class Stripe Support is the Pro automatic payment path where ==ArraySubs controls the renewal schedule, creates invoices, and sends off-session charge requests to Stripe==. Stripe then returns payment, failure, card, SCA, refund, and dispute events through webhook reconciliation.",
    capabilities: [
      {
        title: "ArraySubs-managed billing",
        description:
          "Keeps the subscription renewal schedule in ArraySubs while Stripe processes each automatic charge.",
      },
      {
        title: "Saved payment methods",
        description:
          "Stores customer and payment method metadata so future renewals can be charged without customer action.",
      },
      {
        title: "SCA and card lifecycle events",
        description:
          "Handles 3D Secure requirements, payment method updates, card auto-updates, and card expiry notices where Stripe provides them.",
      },
      {
        title: "Gateway reconciliation",
        description:
          "Uses Stripe webhooks and ArraySubs gateway logs to reconcile payment success, payment failure, refunds, and disputes.",
      },
    ],
    stats: [
      { value: "Pro", label: "Availability" },
      { value: "Stripe", label: "Gateway" },
      { value: "ArraySubs", label: "Billing owner" },
      { value: "SCA", label: "Auth support" },
    ],
    faq: [
      {
        question: "Who owns the billing schedule with Stripe?",
        answer:
          "ArraySubs owns the schedule. On renewal, ArraySubs creates the invoice and asks Stripe to charge the stored payment method.",
      },
      {
        question: "Does Stripe support synced renewal checkout?",
        answer:
          "Yes. The manual documents Renewal Sync support for manual/offline gateways and Stripe.",
      },
    ],
    related: ["billing-and-renewals", "gateway-health", "woocommerce-tax-handling"],
  }),
  buildFeature({
    slug: "paddle-payments",
    category: "payment-gateways",
    icon: Wallet,
    name: "Paddle Payments",
    cardDescription:
      "Use Paddle gateway-managed subscriptions with Paddle checkout, hosted customer flows, native tax/VAT handling, and webhook sync.",
    tier: "Pro",
    summary:
      "Let Paddle manage the recurring billing agreement while ArraySubs syncs subscription state from webhooks.",
    h1: "Sell subscriptions through Paddle",
    highlights: ["Pro gateway", "Gateway-managed billing", "Native tax handling"],
    intro:
      "Paddle Payments is a Pro gateway-managed billing path. ArraySubs creates the Paddle subscription at checkout, then ==Paddle controls future billing timing and sends webhooks back to ArraySubs when payments, pauses, renewals, or lifecycle events occur==. Paddle is the tax exception because it handles tax/VAT natively as merchant of record.",
    capabilities: [
      {
        title: "Gateway-managed renewals",
        description:
          "Paddle owns the recurring billing schedule and notifies ArraySubs when gateway-side charges occur.",
      },
      {
        title: "Hosted payment and customer flows",
        description:
          "Supports Paddle checkout and gateway-hosted customer payment method updates.",
      },
      {
        title: "Native tax and VAT",
        description:
          "Uses Paddle's merchant-of-record tax/VAT handling instead of WooCommerce tax calculations.",
      },
      {
        title: "Webhook state sync",
        description:
          "Maps Paddle events into ArraySubs subscriptions, renewal orders, notes, and gateway health logs.",
      },
    ],
    stats: [
      { value: "Pro", label: "Availability" },
      { value: "Paddle", label: "Gateway" },
      { value: "Gateway", label: "Billing owner" },
      { value: "Native", label: "Tax handling" },
    ],
    faq: [
      {
        question: "Does WooCommerce calculate tax for Paddle subscriptions?",
        answer:
          "No. Paddle is the exception because Paddle handles tax/VAT natively as merchant of record.",
      },
      {
        question: "Does ArraySubs send local renewal charges to Paddle?",
        answer:
          "No. For gateway-managed billing, ArraySubs waits for Paddle webhooks confirming gateway-side payments.",
      },
    ],
    related: ["billing-and-renewals", "gateway-health", "woocommerce-tax-handling"],
  }),
  buildFeature({
    slug: "paypal-payments",
    category: "payment-gateways",
    icon: Wallet,
    name: "PayPal Payments",
    cardDescription:
      "Use PayPal gateway-managed subscription agreements for automatic renewals, payment method updates, refunds, and webhook sync.",
    tier: "Pro",
    summary:
      "Let PayPal own the billing agreement while ArraySubs tracks renewal events through gateway webhooks.",
    h1: "Sell automatic subscriptions with PayPal",
    highlights: ["Pro gateway", "Gateway-managed billing", "Webhook sync"],
    intro:
      "PayPal Payments is a Pro gateway-managed billing path. During checkout, ArraySubs creates the PayPal billing agreement, then ==PayPal controls future automatic charges and sends webhooks back to ArraySubs for renewal order creation and subscription state updates==.",
    capabilities: [
      {
        title: "PayPal billing agreements",
        description:
          "Creates a PayPal subscription agreement during checkout for future automatic payment collection.",
      },
      {
        title: "Gateway-owned renewal timing",
        description:
          "Uses PayPal as the source of truth for when gateway-side charges occur.",
      },
      {
        title: "Payment method update path",
        description:
          "Supports customer payment updates by creating a new agreement when PayPal requires it.",
      },
      {
        title: "Automatic restrictions",
        description:
          "Enforces PayPal limitations such as no mixed carts, multiple subscriptions, or different billing cycles in one checkout.",
      },
    ],
    stats: [
      { value: "Pro", label: "Availability" },
      { value: "PayPal", label: "Gateway" },
      { value: "Gateway", label: "Billing owner" },
      { value: "Webhook", label: "Sync model" },
    ],
    faq: [
      {
        question: "Can PayPal handle mixed subscription carts?",
        answer:
          "No. The manual notes PayPal restrictions for mixed carts, multiple subscriptions, and different billing cycles in one checkout.",
      },
      {
        question: "Does ArraySubs charge PayPal locally on renewal?",
        answer:
          "No. PayPal owns the recurring agreement and sends webhooks when payments occur.",
      },
    ],
    related: ["billing-and-renewals", "gateway-health", "woocommerce-tax-handling"],
  }),
  buildFeature({
    slug: "woocommerce-manual-payments",
    category: "payment-gateways",
    icon: ReceiptText,
    name: "500+ WooCommerce Manual Payments",
    cardDescription:
      "Use WooCommerce's gateway ecosystem for manual subscription checkout and renewal invoices while automatic renewals stay gateway-specific.",
    tier: "Free",
    summary:
      "Keep subscription billing compatible with WooCommerce manual and offline payment flows.",
    h1: "Use WooCommerce manual payment gateways",
    highlights: ["Free core", "Manual invoices", "WooCommerce gateways"],
    intro:
      "500+ WooCommerce Manual Payments means ArraySubs can work with the wider WooCommerce gateway ecosystem for checkout and manual renewal invoices. Stores can ==create renewal invoices, email payment links, and let customers pay through available WooCommerce payment methods== while automatic off-session renewals remain limited to supported Pro gateways.",
    capabilities: [
      {
        title: "Manual renewal invoices",
        description:
          "Creates pending renewal invoices that customers can pay through WooCommerce checkout.",
      },
      {
        title: "WooCommerce gateway compatibility",
        description:
          "Uses the payment methods available in the WooCommerce checkout flow for manual payments.",
      },
      {
        title: "Offline payment support",
        description:
          "Supports offline or manual methods such as bank transfer where the store completes payment outside automatic charging.",
      },
      {
        title: "Automatic gateway boundary",
        description:
          "Keeps off-session automatic renewal collection limited to Stripe, PayPal, and Paddle Pro gateway integrations.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "500+", label: "WC ecosystem" },
      { value: "Manual", label: "Renewal mode" },
      { value: "Invoice", label: "Payment path" },
    ],
    faq: [
      {
        question: "Do all WooCommerce gateways support automatic renewals?",
        answer:
          "No. The broader WooCommerce gateway ecosystem is for checkout and manual renewal payments. Automatic recurring collection uses supported Pro gateways.",
      },
      {
        question: "Can customers pay renewal invoices manually?",
        answer:
          "Yes. Manual renewals create invoices with payment links that customers can complete through WooCommerce checkout.",
      },
    ],
    related: ["billing-and-renewals", "manage-subscriptions", "woocommerce-tax-handling"],
  }),
  buildFeature({
    slug: "woocommerce-tax-handling",
    category: "payment-gateways",
    icon: ReceiptText,
    name: "WooCommerce Tax Handling",
    cardDescription:
      "Use WooCommerce tax calculations for subscription checkout and renewals except Paddle, which handles tax/VAT natively.",
    tier: "Free + Pro",
    summary:
      "Keep subscription tax aligned with WooCommerce tax rules while respecting Paddle's merchant-of-record model.",
    h1: "Handle subscription taxes through WooCommerce",
    highlights: ["WooCommerce tax", "Renewal taxes", "Paddle exception"],
    intro:
      "WooCommerce Tax Handling keeps subscription checkout and renewal tax behavior aligned with the store's WooCommerce tax configuration. ArraySubs can ==carry WooCommerce tax calculations through manual, Stripe, and PayPal subscription flows, while Paddle remains the exception because Paddle handles tax/VAT natively==.",
    capabilities: [
      {
        title: "WooCommerce tax source",
        description:
          "Uses WooCommerce tax configuration as the source for subscription checkout and renewal tax calculations.",
      },
      {
        title: "Renewal consistency",
        description:
          "Keeps renewal invoices aligned with the subscription product, customer, and store tax context.",
      },
      {
        title: "Gateway-aware handling",
        description:
          "Works with manual, Stripe, and PayPal flows where WooCommerce remains the tax engine.",
      },
      {
        title: "Paddle exception",
        description:
          "Excludes Paddle from WooCommerce tax handling because Paddle calculates and remits tax/VAT natively.",
      },
    ],
    stats: [
      { value: "Free + Pro", label: "Availability" },
      { value: "WooCommerce", label: "Tax source" },
      { value: "Paddle", label: "Exception" },
      { value: "Renewals", label: "Covered flow" },
    ],
    faq: [
      {
        question: "Does Paddle use WooCommerce tax?",
        answer:
          "No. Paddle handles tax and VAT natively, so it is the exception to WooCommerce tax handling.",
      },
      {
        question: "Do manual renewal invoices keep WooCommerce tax behavior?",
        answer:
          "Yes. Manual renewal invoices use WooCommerce checkout and tax behavior.",
      },
    ],
    related: ["stripe-payments", "paypal-payments", "woocommerce-manual-payments"],
  }),
  buildFeature({
    slug: "redirect-product-page",
    category: "member-experience",
    icon: LayoutGrid,
    name: "Product Page Redirection",
    cardDescription:
      "Redirect direct subscription product pages to sales pages or return 404s while checkout links keep working. Pro only.",
    tier: "Pro",
    summary:
      "Control direct access to subscription product pages without breaking checkout or admin product management.",
    h1: "Redirect or hide direct subscription product URLs",
    highlights: ["Pro access module", "301 redirect", "404 option"],
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
    related: ["subscription-products", "one-click-checkout-urls", "member-access"],
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
    related: ["subscription-products", "woocommerce-tax-handling", "customer-portal"],
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
    slug: "create-subscription-admin",
    category: "subscription-operations",
    icon: UserCheck,
    name: "Create Subscription from WP Admin",
    cardDescription:
      "Create subscriptions manually from wp-admin for migrations, phone orders, support corrections, and staff-managed setup.",
    tier: "Free + Pro",
    summary:
      "Let staff create subscription records directly from the admin dashboard when checkout is not the right entry point.",
    h1: "Create subscriptions manually from wp-admin",
    highlights: ["Admin creation", "Manual setup", "Support workflows"],
    intro:
      "Create Subscription from WP Admin covers the staff-managed path inside the main subscription dashboard. Operators can ==create subscription records manually for migrations, phone orders, support corrections, comped accounts, or customers who should not go through public checkout==.",
    capabilities: [
      {
        title: "Manual subscription creation",
        description:
          "Create a subscription record from the admin area instead of requiring a storefront checkout.",
      },
      {
        title: "Customer and product setup",
        description:
          "Attach the subscription to the right customer, product, dates, and operational details.",
      },
      {
        title: "Migration support",
        description:
          "Bring existing subscription relationships into ArraySubs during store migrations or cleanup work.",
      },
      {
        title: "Admin lifecycle continuity",
        description:
          "Created records enter the same notes, billing, portal, and reporting flows as checkout-created subscriptions.",
      },
    ],
    stats: [
      { value: "Free", label: "Core admin" },
      { value: "wp-admin", label: "Entry point" },
      { value: "Staff", label: "Primary actor" },
      { value: "Shared", label: "Lifecycle flow" },
    ],
    faq: [
      {
        question: "Does manual creation bypass normal subscription records?",
        answer:
          "No. Admin-created subscriptions use the same subscription record model and operational views.",
      },
      {
        question: "When should staff create subscriptions manually?",
        answer:
          "Use it for migrations, phone orders, support adjustments, complimentary accounts, or other non-checkout setup work.",
      },
    ],
    related: ["manage-subscriptions", "subscription-notes", "billing-and-renewals"],
  }),
  buildFeature({
    slug: "manage-refunds",
    category: "subscription-operations",
    icon: Wallet,
    name: "Manage Refunds",
    cardDescription:
      "Issue prorated, full, partial, gateway, manual, or Pro store-credit refunds from subscription and order workflows.",
    tier: "Free + Pro",
    summary:
      "Control refund policy and refund execution without separating subscriptions from WooCommerce order history.",
    h1: "Manage subscription refunds from operations",
    highlights: ["Refund settings", "Prorated refunds", "Store-credit option"],
    intro:
      "Manage Refunds covers the operational refund tools around subscriptions. Staff can ==configure refund policy, preview and issue prorated refunds, use WooCommerce order refunds, trigger gateway refunds where supported, and route value into Pro store credit== when that retention path fits the customer.",
    capabilities: [
      {
        title: "Refund policy settings",
        description:
          "Control cancellation refund behavior, automatic gateway refunding, prorated refunds, and minimum refund amounts.",
      },
      {
        title: "Prorated subscription refunds",
        description:
          "Preview and process refunds based on unused subscription time from the subscription detail workflow.",
      },
      {
        title: "Order refund compatibility",
        description:
          "Supports full and partial WooCommerce order refunds where the order is the correct source of truth.",
      },
      {
        title: "Store-credit retention",
        description:
          "Pro can keep value in the store by issuing refund value as store credit when appropriate.",
      },
    ],
    stats: [
      { value: "Free", label: "Refund tools" },
      { value: "Pro", label: "Credit option" },
      { value: "Prorate", label: "Time-based flow" },
      { value: "Order", label: "WC flow" },
    ],
    faq: [
      {
        question: "Can ArraySubs calculate prorated refunds?",
        answer:
          "Yes. The refund workflow can preview and process prorated subscription refunds based on unused time.",
      },
      {
        question: "Which refund path needs Pro?",
        answer:
          "Refunding into store credit depends on the Pro Store Credit module. Standard refund settings and subscription refund operations are available in the core path.",
      },
    ],
    related: ["manage-subscriptions", "store-credit", "retention-and-refunds"],
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
    related: ["stripe-payments", "customer-portal", "emails"],
  }),
  buildFeature({
    slug: "renewal-sync",
    category: "subscription-operations",
    icon: Repeat,
    name: "Renewal Sync",
    cardDescription:
      "Align new subscriptions to predictable billing dates with prorated, full-amount, and Pro flexible first-charge modes.",
    tier: "Free + Pro",
    summary:
      "Align first renewals to billing-cycle boundaries while controlling the first checkout charge.",
    h1: "Sync subscription renewals to predictable billing dates",
    highlights: ["Global sync", "Full or prorated first charge", "Pro flexible segments"],
    intro:
      "Renewal Sync lets eligible new subscriptions ==start on the checkout date but renew on a shared billing-cycle boundary==. Global sync can prorate the first charge or charge the full recurring amount immediately. Pro Flexible Renewal Sync adds product-level cycle segments so early, middle, and late signups can each use the right first-charge behavior.",
    capabilities: [
      {
        title: "Shared renewal boundaries",
        description:
          "Moves the first full renewal to the next day, store week, first day of the month, or January 1 based on the billing period.",
      },
      {
        title: "First-charge control",
        description:
          "Choose whether checkout prorates until the synced date or charges the full recurring amount immediately.",
      },
      {
        title: "Flexible product segments",
        description:
          "Pro products can split the billing cycle into full amount, prorate amount, and charge-full-for-next-cycle segments.",
      },
      {
        title: "Stored renewal schedule",
        description:
          "Saves the synced date as the subscription next payment date so invoices, reminders, gateways, and grace checks stay aligned.",
      },
    ],
    stats: [
      { value: "Free", label: "Global sync" },
      { value: "Pro", label: "Flexible segments" },
      { value: "Full", label: "First charge option" },
      { value: "Prorate", label: "First charge option" },
    ],
    faq: [
      {
        question: "Does Renewal Sync change existing subscriptions?",
        answer:
          "No. It applies to eligible new subscriptions created after the setting or product-level flexible sync is enabled.",
      },
      {
        question: "Which gateways support synced checkout?",
        answer:
          "Manual/offline gateways and Stripe support synced checkout. Unsupported automatic gateways are hidden while a synced subscription is in the cart.",
      },
      {
        question: "When should I use Flexible Renewal Sync?",
        answer:
          "Use the Pro product-level segment picker when early, middle, and late signup windows need different first-charge behavior.",
      },
    ],
    related: ["billing-and-renewals", "subscription-products", "stripe-payments"],
  }),
  buildFeature({
    slug: "auto-retry-failed-payments",
    category: "subscription-operations",
    icon: Repeat,
    name: "Auto-Retry Failed Payments",
    cardDescription:
      "Retry failed automatic renewal payments with scheduled attempts, customer notices, and recovery tracking. Pro only.",
    tier: "Pro",
    summary:
      "Recover failed renewals automatically instead of pushing every payment failure into manual support.",
    h1: "Automatically retry failed subscription payments",
    highlights: ["Pro automation", "Retry schedule", "Recovery emails"],
    intro:
      "Auto-Retry Failed Payments is a Pro renewal recovery workflow. When an automatic renewal charge fails, ArraySubs can ==schedule retry attempts, notify the customer, track recovery status, and keep the subscription in the right grace or hold state== while payment is being recovered.",
    capabilities: [
      {
        title: "Scheduled retry attempts",
        description:
          "Run configured follow-up attempts after an automatic renewal payment fails.",
      },
      {
        title: "Customer recovery notices",
        description:
          "Send failed-payment and retry communication so customers know how to fix billing issues.",
      },
      {
        title: "Grace-state alignment",
        description:
          "Works with the grace period so access does not end before recovery has a fair chance.",
      },
      {
        title: "Operational tracking",
        description:
          "Logs retry activity into subscription notes and related operations views.",
      },
    ],
    stats: [
      { value: "Pro", label: "Availability" },
      { value: "Auto", label: "Retry mode" },
      { value: "Email", label: "Customer notices" },
      { value: "Grace", label: "Recovery state" },
    ],
    faq: [
      {
        question: "Does auto-retry work with manual payments?",
        answer:
          "No. Auto-retry is for supported automatic payment gateways. Manual renewals still use invoices and customer payment links.",
      },
      {
        question: "Does retry cancel access immediately?",
        answer:
          "No. It is designed to work with recovery and grace-period handling before a final failure decision.",
      },
    ],
    related: ["billing-and-renewals", "grace-period-recovery", "stripe-payments"],
  }),
  buildFeature({
    slug: "auto-downgrade-on-failure",
    category: "subscription-operations",
    icon: ShieldCheck,
    name: "Auto-Downgrade on Failure",
    cardDescription:
      "Move customers to a lower plan or fallback access path after unresolved renewal failures. Pro only.",
    tier: "Pro",
    summary:
      "Protect revenue and access continuity by downgrading failed subscriptions after recovery windows are exhausted.",
    h1: "Auto-downgrade subscriptions after failed renewals",
    highlights: ["Pro automation", "Fallback plans", "Failure recovery"],
    intro:
      "Auto-Downgrade on Failure is a Pro recovery automation for stores that prefer a lower-access fallback over full churn. After retry and grace rules are exhausted, ArraySubs can ==move the customer to a configured fallback plan or access tier== so the relationship is preserved instead of simply ending.",
    capabilities: [
      {
        title: "Fallback access path",
        description:
          "Move failed subscriptions into a lower plan, free tier, or reduced-access state when configured.",
      },
      {
        title: "Recovery-window timing",
        description:
          "Runs after retry and grace handling so downgrades happen only after recovery attempts complete.",
      },
      {
        title: "Member access alignment",
        description:
          "Keeps roles, gated content, and plan features aligned with the downgraded subscription.",
      },
      {
        title: "Lifecycle notes",
        description:
          "Records downgrade actions so support can see why the customer's plan changed.",
      },
    ],
    stats: [
      { value: "Pro", label: "Availability" },
      { value: "Fallback", label: "Plan mode" },
      { value: "After retry", label: "Timing" },
      { value: "Access", label: "Synced state" },
    ],
    faq: [
      {
        question: "Is auto-downgrade the same as plan switching?",
        answer:
          "No. Plan switching is customer or admin-initiated. Auto-downgrade is a Pro automation triggered by unresolved payment failure.",
      },
      {
        question: "Can access rules follow the downgraded plan?",
        answer:
          "Yes. Member access and feature conditions should follow the subscription state after the downgrade.",
      },
    ],
    related: ["auto-retry-failed-payments", "plan-switching", "member-access"],
  }),
  buildFeature({
    slug: "grace-period-recovery",
    category: "subscription-operations",
    icon: HeartHandshake,
    name: "2-Phase Grace Period & Recovery",
    cardDescription:
      "Keep access recoverable after failed renewals with warning and final grace phases before cancellation or hold.",
    tier: "Free + Pro",
    summary:
      "Give customers a structured recovery window before a failed renewal becomes a lost subscription.",
    h1: "Use a two-phase grace period for renewal recovery",
    highlights: ["Grace phases", "Recovery window", "Access continuity"],
    intro:
      "2-Phase Grace Period & Recovery gives failed renewals a structured path. Stores can ==warn customers, keep access temporarily recoverable, move into a final grace phase, and only then apply hold, cancellation, or Pro downgrade rules== based on the configured policy.",
    capabilities: [
      {
        title: "Warning phase",
        description:
          "Notify customers that payment needs attention while access can remain recoverable.",
      },
      {
        title: "Final grace phase",
        description:
          "Apply the last recovery window before the subscription moves to its failure outcome.",
      },
      {
        title: "Access coordination",
        description:
          "Keeps portal actions, emails, notes, and member access aligned during recovery.",
      },
      {
        title: "Pro recovery hooks",
        description:
          "Pro retry and downgrade workflows can extend the same recovery lifecycle.",
      },
    ],
    stats: [
      { value: "Free", label: "Grace model" },
      { value: "2", label: "Recovery phases" },
      { value: "Pro", label: "Automation hooks" },
      { value: "Access", label: "Protected state" },
    ],
    faq: [
      {
        question: "Does grace period require Pro?",
        answer:
          "The grace model is part of the core renewal flow. Pro adds automatic retry and downgrade automation around it.",
      },
      {
        question: "Why use two phases?",
        answer:
          "Two phases let stores separate the first warning period from the final recovery window before access changes.",
      },
    ],
    related: ["billing-and-renewals", "auto-retry-failed-payments", "emails"],
  }),
  buildFeature({
    slug: "skip-next-renewal",
    category: "subscription-operations",
    icon: Repeat,
    name: "Skip Next Renewal",
    cardDescription:
      "Let customers or staff skip the next scheduled renewal while keeping the subscription relationship active.",
    tier: "Free",
    summary:
      "Offer a lightweight pause alternative by moving the next renewal forward one cycle.",
    h1: "Skip the next subscription renewal",
    highlights: ["Customer action", "Admin action", "Renewal schedule"],
    intro:
      "Skip Next Renewal lets a customer or staff member ==skip one upcoming billing cycle without cancelling the subscription==. The subscription remains connected to the customer, and the next payment date moves forward according to the plan's billing schedule.",
    capabilities: [
      {
        title: "Customer self-service",
        description:
          "Expose skip controls in the customer portal where the store allows it.",
      },
      {
        title: "Admin support action",
        description:
          "Let support skip a renewal for goodwill, vacation, or temporary billing situations.",
      },
      {
        title: "Schedule recalculation",
        description:
          "Moves the next payment date to the following billing cycle instead of cancelling the record.",
      },
      {
        title: "Lifecycle history",
        description:
          "Records skip actions in the subscription timeline for support context.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "1", label: "Cycle skipped" },
      { value: "Portal", label: "Customer surface" },
      { value: "Admin", label: "Support surface" },
    ],
    faq: [
      {
        question: "Does skipping cancel the subscription?",
        answer:
          "No. It moves the next renewal forward and keeps the subscription relationship active.",
      },
      {
        question: "Can staff skip renewals for customers?",
        answer:
          "Yes. Staff can use skip as a support action when the workflow is enabled.",
      },
    ],
    related: ["customer-portal", "billing-and-renewals", "pause-vacation-mode"],
  }),
  buildFeature({
    slug: "plan-switching",
    category: "subscription-operations",
    icon: SlidersHorizontal,
    name: "Plan Switching",
    cardDescription:
      "Let customers upgrade, downgrade, or crossgrade between eligible subscription products with schedule-aware changes.",
    tier: "Free + Pro",
    summary:
      "Move subscribers between plans without forcing cancellation and repurchase.",
    h1: "Switch subscription plans without starting over",
    highlights: ["Upgrade", "Downgrade", "Crossgrade"],
    intro:
      "Plan Switching lets customers or admins ==upgrade, downgrade, or crossgrade between eligible subscription products== while preserving the relationship, schedule context, notes, and portal history. Proration rules decide how money is handled during the switch.",
    capabilities: [
      {
        title: "Eligible switch paths",
        description:
          "Define which products or variations customers can switch between.",
      },
      {
        title: "Customer and admin flows",
        description:
          "Support self-service plan changes and staff-assisted support changes.",
      },
      {
        title: "Lifecycle continuity",
        description:
          "Keeps the subscription record and operational history connected through the switch.",
      },
      {
        title: "Proration support",
        description:
          "Connects to the proration method chosen for upgrade, downgrade, or crossgrade changes.",
      },
    ],
    stats: [
      { value: "Free", label: "Core switching" },
      { value: "3", label: "Switch types" },
      { value: "Portal", label: "Customer flow" },
      { value: "Admin", label: "Support flow" },
    ],
    faq: [
      {
        question: "What is a crossgrade?",
        answer:
          "A crossgrade moves a customer between plans at the same general level, such as monthly to annual or one sibling tier to another.",
      },
      {
        question: "Does plan switching require a new checkout?",
        answer:
          "No. The switch flow can update the existing subscription instead of requiring cancellation and a fresh purchase.",
      },
    ],
    related: ["proration-methods", "subscription-products", "customer-portal"],
  }),
  buildFeature({
    slug: "proration-methods",
    category: "subscription-operations",
    icon: ReceiptText,
    name: "3 Proration Methods for Plan Switch",
    cardDescription:
      "Control upgrade, downgrade, and crossgrade billing with three proration methods for plan changes.",
    tier: "Free + Pro",
    summary:
      "Choose how unused value and new plan costs are handled when a subscriber changes plans.",
    h1: "Choose the proration method for plan switches",
    highlights: ["3 methods", "Upgrade billing", "Downgrade credits"],
    intro:
      "3 Proration Methods for Plan Switch gives stores control over money movement during plan changes. Depending on the switch policy, ArraySubs can ==charge immediately, credit unused time, or align the financial adjustment with the next renewal== so upgrades and downgrades match the business model.",
    capabilities: [
      {
        title: "Immediate adjustment",
        description:
          "Collect or apply the price difference during the switch when that is the cleanest flow.",
      },
      {
        title: "Unused-time value",
        description:
          "Calculate remaining value from the current plan before moving to the new plan.",
      },
      {
        title: "Renewal-aligned handling",
        description:
          "Apply the plan change around renewal timing when immediate charging is not desired.",
      },
      {
        title: "Switch policy consistency",
        description:
          "Keeps customer portal, admin changes, notes, and renewal dates aligned after the switch.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "3", label: "Methods" },
      { value: "Upgrade", label: "Switch type" },
      { value: "Downgrade", label: "Switch type" },
    ],
    faq: [
      {
        question: "Do all plan switches use the same proration behavior?",
        answer:
          "No. Stores can choose the method that fits their upgrade, downgrade, or crossgrade policy.",
      },
      {
        question: "Does proration update renewal dates?",
        answer:
          "Proration works with the subscription schedule so money handling and renewal timing stay aligned.",
      },
    ],
    related: ["plan-switching", "renewal-sync", "store-credit"],
  }),
  buildFeature({
    slug: "pause-vacation-mode",
    category: "subscription-operations",
    icon: Lock,
    name: "Pause / Vacation Mode",
    cardDescription:
      "Temporarily pause renewals and access for customers who need a break without cancelling their subscription.",
    tier: "Free",
    summary:
      "Give subscribers a temporary break while preserving their account and subscription history.",
    h1: "Pause subscriptions for vacation or temporary breaks",
    highlights: ["Pause", "Resume", "Retention alternative"],
    intro:
      "Pause / Vacation Mode lets stores ==temporarily suspend a subscription instead of cancelling it==. Customers or staff can pause where allowed, resume later, and keep the original subscription history intact.",
    capabilities: [
      {
        title: "Temporary pause",
        description:
          "Stop renewal activity for a temporary period without deleting or cancelling the subscription relationship.",
      },
      {
        title: "Resume flow",
        description:
          "Let customers or staff reactivate the subscription when the break is over.",
      },
      {
        title: "Retention alternative",
        description:
          "Use pause as a save offer before final cancellation or as a goodwill support action.",
      },
      {
        title: "Portal visibility",
        description:
          "Shows pause state and supported actions in the customer subscription experience.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "Pause", label: "Primary action" },
      { value: "Resume", label: "Follow-up" },
      { value: "Portal", label: "Customer surface" },
    ],
    faq: [
      {
        question: "Is pause the same as cancellation?",
        answer:
          "No. Pause is temporary and keeps the subscription relationship ready to resume.",
      },
      {
        question: "Can pause be used as a retention offer?",
        answer:
          "Yes. Pause is commonly used before cancellation when a customer only needs a temporary break.",
      },
    ],
    related: ["customer-portal", "retention-and-refunds", "skip-next-renewal"],
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
    related: ["feature-manager", "restricted-downloads", "multi-login-prevention"],
  }),
  buildFeature({
    slug: "member-discounts",
    category: "member-experience",
    icon: Wallet,
    name: "Member Discounts",
    cardDescription:
      "Offer subscriber-only discounts for products, categories, or targeted purchase paths using member access rules.",
    tier: "Free",
    summary:
      "Reward active members with pricing benefits tied to subscription and commerce conditions.",
    h1: "Create member-only discounts",
    highlights: ["Member pricing", "Access rules", "WooCommerce products"],
    intro:
      "Member Discounts use the Member Access rule engine to ==offer targeted pricing benefits to qualifying subscribers==. Stores can connect discounts to active plans, roles, product history, spend thresholds, or other access conditions so benefits follow membership value.",
    capabilities: [
      {
        title: "Subscription-based discounts",
        description:
          "Offer discounts only to customers who match a configured subscription or membership rule.",
      },
      {
        title: "Product and category targeting",
        description:
          "Apply benefits to selected products, categories, or purchase contexts.",
      },
      {
        title: "Commerce-aware conditions",
        description:
          "Use purchase history, lifetime spend, role, or plan state to qualify the discount.",
      },
      {
        title: "Benefit visibility",
        description:
          "Keep member pricing aligned with shop restrictions, content access, and customer portal status.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "Product", label: "Target scope" },
      { value: "Rule", label: "Condition model" },
      { value: "Member", label: "Benefit owner" },
    ],
    faq: [
      {
        question: "Can discounts depend on subscription status?",
        answer:
          "Yes. Discounts can be tied to the same subscription and membership rules used for access control.",
      },
      {
        question: "Are member discounts separate from coupons?",
        answer:
          "They serve a different purpose. Coupons are customer-entered or campaign discounts, while member discounts are rule-based membership benefits.",
      },
    ],
    related: ["member-access", "shop-access-restrictions", "coupons"],
  }),
  buildFeature({
    slug: "content-dripping",
    category: "member-experience",
    icon: Repeat,
    name: "Content Dripping",
    cardDescription:
      "Release posts, lessons, downloads, or protected sections over time based on subscription timing and access rules.",
    tier: "Free",
    summary:
      "Schedule member content so subscribers receive access in stages instead of all at once.",
    h1: "Drip member content over time",
    highlights: ["Scheduled access", "Lessons and downloads", "Membership timing"],
    intro:
      "Content Dripping lets stores ==unlock protected content after a configured subscription or membership window==. It can support courses, onboarding, file libraries, lessons, private posts, and other staged member experiences.",
    capabilities: [
      {
        title: "Scheduled unlocks",
        description:
          "Delay access until a configured number of days or billing periods after membership starts.",
      },
      {
        title: "Multiple content surfaces",
        description:
          "Use dripping for posts, pages, custom post types, downloads, shortcodes, or partial content sections.",
      },
      {
        title: "Rule-based qualification",
        description:
          "Combine drip timing with subscription, role, product, purchase, or spend conditions.",
      },
      {
        title: "Course and onboarding fit",
        description:
          "Release lessons, modules, and member resources in the order the experience requires.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "Time", label: "Unlock model" },
      { value: "Content", label: "Target type" },
      { value: "Rule", label: "Condition model" },
    ],
    faq: [
      {
        question: "Can content unlock after a delay?",
        answer:
          "Yes. Drip timing can delay access after the customer qualifies for the membership rule.",
      },
      {
        question: "Can dripping work with downloads?",
        answer:
          "Yes. Restricted Downloads can also use schedules so files unlock over time.",
      },
    ],
    related: ["member-access", "restricted-downloads", "cpt-content-restrictions"],
  }),
  buildFeature({
    slug: "restricted-downloads",
    category: "member-experience",
    icon: ReceiptText,
    name: "Restricted Downloads",
    cardDescription:
      "Provision gated downloadable files to qualifying members through My Account Downloads with rules and optional drip schedules.",
    tier: "Free",
    summary:
      "Deliver member-only files through WooCommerce downloads without exposing raw file locations.",
    h1: "Gate downloadable files by membership rules",
    highlights: ["Download rules", "My Account Downloads", "Drip schedules"],
    intro:
      "Restricted Downloads is the Downloads tab inside Member Access. Merchants can ==attach files to rules, define who qualifies, optionally delay availability with scheduling, and show the files in My Account -> Downloads alongside normal WooCommerce downloadable products==.",
    capabilities: [
      {
        title: "Rule-based file provisioning",
        description:
          "Add one or more files to a rule and decide which members qualify with the shared condition builder.",
      },
      {
        title: "My Account delivery",
        description:
          "Displays qualifying files in the customer's WooCommerce My Account Downloads area.",
      },
      {
        title: "Drip availability",
        description:
          "Delay file access with schedules for training programs, course modules, or staged resources.",
      },
      {
        title: "Verified download links",
        description:
          "Serves downloads through signed or verified links instead of exposing the raw file location directly.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "Rule", label: "Access model" },
      { value: "My Account", label: "Delivery" },
      { value: "Drip", label: "Schedule option" },
    ],
    faq: [
      {
        question: "Are Restricted Downloads the same as WooCommerce product downloads?",
        answer:
          "No. They are an additional membership-based layer that appears alongside native WooCommerce downloads.",
      },
      {
        question: "Can files unlock later in the subscription?",
        answer:
          "Yes. Download rules can use schedules so files unlock after the configured membership timing.",
      },
    ],
    related: ["member-access", "advanced-condition-builder", "customer-portal"],
  }),
  buildFeature({
    slug: "shop-access-restrictions",
    category: "member-experience",
    icon: Boxes,
    name: "Shop Restrictions",
    cardDescription:
      "Restrict store, product, or category browsing and purchasing with redirects, 404s, login prompts, or purchase blocks.",
    tier: "Free",
    summary:
      "Use membership rules to decide who can browse, view, or buy products.",
    h1: "Restrict shop access by membership rules",
    highlights: ["Shop access", "Purchase rules", "Cart validation"],
    intro:
      "Shop Restrictions bring the Member Access rule engine into WooCommerce commerce flows. Stores can ==gate the full shop, selected products, product categories, product pages, add-to-cart actions, cart validation, and checkout== by subscription, purchase, role, or spend conditions.",
    capabilities: [
      {
        title: "Store and product targeting",
        description:
          "Apply rules to the full store, selected products, categories, or exclusions.",
      },
      {
        title: "Purchase blocking",
        description:
          "Let products remain visible while preventing unauthorized purchase attempts.",
      },
      {
        title: "Redirect or hide behavior",
        description:
          "Send denied users to login or a specific page, show a message, or return a 404.",
      },
      {
        title: "Checkout enforcement",
        description:
          "Validates access through product pages, add-to-cart flows, carts, checkout, and Store API paths.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "Shop", label: "Rule surface" },
      { value: "Product", label: "Target scope" },
      { value: "Checkout", label: "Enforced at" },
    ],
    faq: [
      {
        question: "Can customers see a product but not buy it?",
        answer:
          "Yes. Shop rules can block purchasing while leaving product visibility intact.",
      },
      {
        question: "Do shop restrictions only affect product pages?",
        answer:
          "No. Rules also protect add-to-cart, cart, checkout, and Store API flows.",
      },
    ],
    related: ["member-access", "conditional-subscription-rules", "subscription-products"],
  }),
  buildFeature({
    slug: "role-based-conditions",
    category: "member-experience",
    icon: UserCheck,
    name: "Role-Based Conditions",
    cardDescription:
      "Assign, remove, or test WordPress roles so subscription state can drive LMS, forum, community, or staff access.",
    tier: "Free",
    summary:
      "Connect subscription rules to native WordPress role behavior.",
    h1: "Use WordPress roles in member access rules",
    highlights: ["Role mapping", "Role checks", "WordPress integration"],
    intro:
      "Role-Based Conditions let stores ==map subscription access into WordPress roles and use role checks inside access rules==. That makes ArraySubs compatible with role-aware plugins for LMS, communities, forums, downloads, and internal member workflows.",
    capabilities: [
      {
        title: "Role mapping rules",
        description:
          "Assign or remove roles when subscription conditions match.",
      },
      {
        title: "Role-based gates",
        description:
          "Use current user roles as conditions inside content, shop, URL, and shortcode restrictions.",
      },
      {
        title: "Subscription-driven access",
        description:
          "Keep roles synchronized with active subscriptions, purchased products, or other rule conditions.",
      },
      {
        title: "Plugin interoperability",
        description:
          "Let other role-aware WordPress tools respond to ArraySubs membership state.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "Roles", label: "WP surface" },
      { value: "Assign", label: "Action" },
      { value: "Remove", label: "Action" },
    ],
    faq: [
      {
        question: "Can ArraySubs assign WordPress roles?",
        answer:
          "Yes. Role mapping rules can assign or remove roles based on subscription-related conditions.",
      },
      {
        question: "Can roles be used as access conditions?",
        answer:
          "Yes. User Role is one of the conditions available to access rules and partial content gates.",
      },
    ],
    related: ["member-access", "advanced-condition-builder", "profile-builder"],
  }),
  buildFeature({
    slug: "product-purchase-value-conditions",
    category: "member-experience",
    icon: ReceiptText,
    name: "Product & Purchase Value Conditions",
    cardDescription:
      "Build access rules from purchased products, variations, categories, tags, and lifetime purchase amount thresholds.",
    tier: "Free",
    summary:
      "Gate membership experiences by what customers bought and how much value they have generated.",
    h1: "Use product history and purchase value as conditions",
    highlights: ["Purchased products", "Lifetime spend", "Variation checks"],
    intro:
      "Product & Purchase Value Conditions let ArraySubs rules evaluate commerce history. Merchants can ==target customers by purchased products, variations, categories, tags, and lifetime purchase amount thresholds== across content, shop, role, URL, and partial-content rules.",
    capabilities: [
      {
        title: "Product history checks",
        description:
          "Match customers who purchased specific products, variations, categories, or tags.",
      },
      {
        title: "Lifetime value thresholds",
        description:
          "Unlock experiences when a customer crosses a configured purchase amount.",
      },
      {
        title: "Commerce-aware gating",
        description:
          "Use purchase history to control content, products, discounts, downloads, or roles.",
      },
      {
        title: "Large catalog support",
        description:
          "Uses searchable selectors instead of preloading every product or variation.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "Product", label: "Condition type" },
      { value: "Variation", label: "Condition type" },
      { value: "Spend", label: "Threshold type" },
    ],
    faq: [
      {
        question: "Can access rules check lifetime purchase amount?",
        answer:
          "Yes. Lifetime Purchase Amount is available as a condition for membership rules.",
      },
      {
        question: "Can rules target product variations?",
        answer:
          "Yes. Product and variation purchase conditions are supported.",
      },
    ],
    related: ["member-access", "shop-access-restrictions", "advanced-condition-builder"],
  }),
  buildFeature({
    slug: "feature-based-conditions",
    category: "member-experience",
    icon: SlidersHorizontal,
    name: "Feature-Based Conditions",
    cardDescription:
      "Use Pro Feature Manager entitlements to unlock content by included features, limits, allowances, or strongest plan value.",
    tier: "Pro",
    summary:
      "Make access decisions from the plan features and numeric allowances customers own.",
    h1: "Gate access by Pro feature entitlements",
    highlights: ["Pro condition", "Feature Manager", "Allowance checks"],
    intro:
      "Feature-Based Conditions connect Member Access to the Pro Feature Manager. Rules can ==unlock content or experiences by feature availability, numeric allowances, summed values, maximum values, or any matching subscribed plan== so access follows the entitlements customers actually bought.",
    capabilities: [
      {
        title: "Feature entitlement checks",
        description:
          "Match customers who have a specific Pro feature assigned through their subscribed plan.",
      },
      {
        title: "Numeric allowance logic",
        description:
          "Evaluate seats, limits, credits, storage, or other numeric feature values.",
      },
      {
        title: "Aggregation modes",
        description:
          "Use sum, max, or any-plan matching when a customer has multiple subscriptions.",
      },
      {
        title: "Builder integrations",
        description:
          "Use feature checks in shortcodes, Elementor Containers, Gutenberg blocks, and access rules.",
      },
    ],
    stats: [
      { value: "Pro", label: "Availability" },
      { value: "Feature", label: "Condition type" },
      { value: "Sum", label: "Aggregation" },
      { value: "Max", label: "Aggregation" },
    ],
    faq: [
      {
        question: "Does this require Feature Manager?",
        answer:
          "Yes. Feature-based conditions depend on the Pro Feature Manager module.",
      },
      {
        question: "Can conditions combine multiple subscribed plans?",
        answer:
          "Yes. Rules can use sum, max, or any-plan aggregation depending on how the feature should be evaluated.",
      },
    ],
    related: ["feature-manager", "member-access", "advanced-condition-builder"],
  }),
  buildFeature({
    slug: "cpt-content-restrictions",
    category: "member-experience",
    icon: Blocks,
    name: "Any CPT & Content Restriction",
    cardDescription:
      "Gate posts, pages, custom post types, taxonomy terms, archives, or selected entries with member access rules.",
    tier: "Free",
    summary:
      "Protect WordPress content beyond one-off pages by targeting post types, terms, and selected entries.",
    h1: "Restrict any post type or content area",
    highlights: ["Custom post types", "Taxonomy targeting", "Archive behavior"],
    intro:
      "Any CPT & Content Restriction lets Member Access protect normal WordPress content and custom content models. Merchants can ==restrict posts, pages, custom post types, taxonomy terms, archives, or selected entries== with redirects, messages, 403 handling, or hidden archive behavior.",
    capabilities: [
      {
        title: "Post type targeting",
        description:
          "Protect all content in a post type or narrow the rule to selected posts and pages.",
      },
      {
        title: "Taxonomy targeting",
        description:
          "Gate categories, tags, or custom taxonomy terms when content organization matters.",
      },
      {
        title: "Archive handling",
        description:
          "Choose whether restricted entries are hidden, shown with locks, or displayed normally in archive views.",
      },
      {
        title: "Content dripping",
        description:
          "Schedule access timing so content can unlock after a configured membership window.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "CPT", label: "Target type" },
      { value: "Term", label: "Target type" },
      { value: "Drip", label: "Schedule option" },
    ],
    faq: [
      {
        question: "Can ArraySubs protect custom post types?",
        answer:
          "Yes. Member Access includes post type rules for pages, posts, and custom post types.",
      },
      {
        question: "Can restricted content be hidden from archives?",
        answer:
          "Yes. Archive behavior can hide restricted entries or show them with lock-style messaging.",
      },
    ],
    related: ["member-access", "url-path-rules", "partial-content-restriction"],
  }),
  buildFeature({
    slug: "url-path-rules",
    category: "member-experience",
    icon: KeyRound,
    name: "URL Path Rules",
    cardDescription:
      "Protect arbitrary site paths with exact, prefix, contains, or regex matching plus priority and exclusion controls.",
    tier: "Free",
    summary:
      "Restrict paths that are not easily represented as a product, post, taxonomy, or shortcode block.",
    h1: "Protect member-only URL paths",
    highlights: ["URL rules", "Regex matching", "Redirect actions"],
    intro:
      "URL Path Rules protect site areas by path instead of content object. Stores can ==match exact URLs, path prefixes, contains patterns, or regular expressions, then redirect, show a message, return a 403, or require login== with priorities and exclusions.",
    capabilities: [
      {
        title: "Flexible path matching",
        description:
          "Use exact, starts-with, contains, or regex matching for protected paths.",
      },
      {
        title: "Priority and exclusions",
        description:
          "Resolve overlapping rules and exempt specific paths from broader restrictions.",
      },
      {
        title: "Multiple denied actions",
        description:
          "Redirect, show a message, return 403, or send visitors to login.",
      },
      {
        title: "Object-independent gating",
        description:
          "Protect routes produced by custom plugins, page builders, or dynamic templates.",
      },
    ],
    stats: [
      { value: "Free", label: "Availability" },
      { value: "4", label: "Match modes" },
      { value: "403", label: "Deny option" },
      { value: "Regex", label: "Advanced mode" },
    ],
    faq: [
      {
        question: "When should I use URL Path Rules?",
        answer:
          "Use them when the protected area is best identified by URL rather than a post, product, taxonomy term, or shortcode section.",
      },
      {
        question: "Can URL rules redirect denied users?",
        answer:
          "Yes. Denied users can be redirected, shown a message, sent to login, or served a 403 response.",
      },
    ],
    related: ["member-access", "cpt-content-restrictions", "redirect-product-page"],
  }),
  buildFeature({
    slug: "partial-content-restriction",
    category: "member-experience",
    icon: SquareDashedMousePointer,
    name: "Partial Content Restriction",
    cardDescription:
      "Protect selected sections inside public pages with shortcodes, Elementor Containers, Gutenberg blocks, or PHP checks.",
    tier: "Free + Pro",
    summary:
      "Gate only the valuable portion of a page while keeping public context and conversion copy visible.",
    h1: "Restrict sections without hiding the full page",
    highlights: ["Shortcodes", "Elementor", "Gutenberg blocks"],
    intro:
      "Partial Content Restriction gives builders and editors section-level control. Teams can ==leave public intros, previews, CTAs, and SEO content visible while hiding premium sections== through shortcodes, Elementor Containers, Gutenberg blocks, or developer checks.",
    capabilities: [
      {
        title: "Shortcode gates",
        description:
          "Wrap protected sections with visibility or restriction shortcodes.",
      },
      {
        title: "Builder-native gates",
        description:
          "Use Elementor Container controls or Gutenberg Restricted Content blocks without manual shortcode wrapping.",
      },
      {
        title: "Public-page strategy",
        description:
          "Keep lead-in content visible while members-only lessons, downloads, or account data stay protected.",
      },
      {
        title: "Shared condition model",
        description:
          "Use the same subscription, role, purchase, spend, and Pro feature conditions as the rule engine.",
      },
    ],
    stats: [
      { value: "Free", label: "Shortcodes" },
      { value: "Free", label: "Blocks" },
      { value: "Pro", label: "Feature checks" },
      { value: "Section", label: "Scope" },
    ],
    faq: [
      {
        question: "Does partial restriction redirect the whole page?",
        answer:
          "No. It is designed to hide or replace selected sections while the rest of the page still renders.",
      },
      {
        question: "Can partial gates use Feature Manager values?",
        answer:
          "Yes. Pro feature conditions can be used where the partial gate supports the shared condition model.",
      },
    ],
    related: ["shortcodes", "elementor-content-restrictions", "gutenberg-content-restrictions"],
  }),
  buildFeature({
    slug: "advanced-condition-builder",
    category: "member-experience",
    icon: SlidersHorizontal,
    name: "Advanced Condition Builder",
    cardDescription:
      "Combine subscription, product, role, purchase, spend, feature, and schedule logic with nested AND/OR condition groups.",
    tier: "Free + Pro",
    summary:
      "Model real membership logic with relational conditions instead of one-dimensional access toggles.",
    h1: "Build advanced relational access conditions",
    highlights: ["Nested AND/OR groups", "Commerce conditions", "Feature conditions"],
    intro:
      "Advanced Condition Builder is the shared rule model behind Member Access and partial content gates. Merchants can ==combine subscription status, products, variations, roles, purchase history, lifetime spend, Pro features, and schedules with nested AND/OR groups== so complex membership logic stays readable.",
    capabilities: [
      {
        title: "Nested condition groups",
        description:
          "Combine top-level and nested AND/OR logic for advanced rule matching.",
      },
      {
        title: "Subscription and commerce logic",
        description:
          "Check active subscriptions, products, variations, categories, tags, and lifetime value.",
      },
      {
        title: "Role and feature logic",
        description:
          "Use WordPress roles in the core path and Pro Feature Manager values when entitlement checks are needed.",
      },
      {
        title: "Scheduled access",
        description:
          "Add drip or timing rules so access can unlock after a membership window.",
      },
    ],
    stats: [
      { value: "Free", label: "Core conditions" },
      { value: "Pro", label: "Feature values" },
      { value: "AND/OR", label: "Logic model" },
      { value: "Drip", label: "Schedule model" },
    ],
    faq: [
      {
        question: "Can conditions be nested?",
        answer:
          "Yes. The rule model supports nested groups so complex AND/OR logic can be represented without separate rules for every case.",
      },
      {
        question: "Which advanced conditions require Pro?",
        answer:
          "Feature Manager values are Pro-only. Subscription, role, product, variation, category, tag, and lifetime spend conditions are part of the core access model.",
      },
    ],
    related: ["member-access", "feature-based-conditions", "shop-access-restrictions"],
  }),
  buildFeature({
    slug: "elementor-content-restrictions",
    category: "member-experience",
    icon: SquareDashedMousePointer,
    name: "Elementor Container Restriction",
    cardDescription:
      "Gate Elementor Containers from the Advanced panel by subscription, role, purchase history, spend, or Pro feature.",
    tier: "Free + Pro",
    summary:
      "Protect Elementor Container sections with the same restriction engine used by ArraySubs shortcodes.",
    h1: "Restrict Elementor sections without shortcodes",
    highlights: ["Elementor Containers", "No shortcode required", "Pro feature checks"],
    intro:
      "Elementor Container Restriction adds an ==ArraySubs Content Restrictions== panel to Elementor Containers. Page builders can gate Flexbox or Grid containers by subscription status, products, variations, purchases, roles, lifetime spend, or Pro Feature Manager entitlements while leaving the rest of the page public.",
    capabilities: [
      {
        title: "Builder-native controls",
        description:
          "Configure restrictions from the Elementor Advanced tab instead of wrapping content with shortcodes.",
      },
      {
        title: "Shared access engine",
        description:
          "Uses the same restrict and visibility behavior as the ArraySubs content-gating shortcodes.",
      },
      {
        title: "Partial-page gating",
        description:
          "Protect only the selected Container while public intros, footers, and calls to action remain visible.",
      },
      {
        title: "Feature conditions",
        description:
          "Pro Feature Manager conditions can unlock sections by toggle features or numeric allowances.",
      },
    ],
    stats: [
      { value: "Free", label: "Core gating" },
      { value: "Pro", label: "Feature checks" },
      { value: "2", label: "Container layouts" },
      { value: "0", label: "Shortcodes needed" },
    ],
    faq: [
      {
        question: "Does this work on every Elementor widget?",
        answer:
          "The controls appear on Elementor Containers. To gate a single widget, place it inside its own Container and gate that Container.",
      },
      {
        question: "Is the restricted content only hidden with CSS?",
        answer:
          "No. For denied visitors, the gated Container content is omitted from the rendered frontend HTML.",
      },
      {
        question: "Can an Elementor gate redirect denied users?",
        answer:
          "No. Container gates are for partial-page protection and show a restricted message. Use URL or post-type rules for full-page redirects.",
      },
    ],
    related: ["member-access", "gutenberg-content-restrictions", "shortcodes"],
  }),
  buildFeature({
    slug: "gutenberg-content-restrictions",
    category: "member-experience",
    icon: Blocks,
    name: "Gutenberg Block Restriction",
    cardDescription:
      "Protect nested WordPress blocks with a Restricted Content block and sidebar rules for members or logged-in users.",
    tier: "Free + Pro",
    summary:
      "Wrap protected block-editor content in a dynamic Restricted Content block.",
    h1: "Restrict Gutenberg blocks by membership rules",
    highlights: ["Restricted Content block", "Nested block protection", "Pro feature checks"],
    intro:
      "Gutenberg Block Restriction adds a ==Restricted Content block== for protecting nested WordPress blocks. Authors place premium lessons, downloads, notices, or plan-specific sections inside the block, then configure subscription, role, purchase, spend, login-state, or Pro feature checks from the block sidebar.",
    capabilities: [
      {
        title: "Nested block gating",
        description:
          "Protect any blocks placed inside the Restricted Content wrapper while surrounding blocks remain public.",
      },
      {
        title: "Sidebar rule controls",
        description:
          "Configure restriction type, subscription status, products, variations, roles, spend, messages, and login behavior.",
      },
      {
        title: "Frontend-only enforcement",
        description:
          "Authors can still edit the protected blocks, while denied frontend visitors receive only the configured fallback message.",
      },
      {
        title: "Plan feature access",
        description:
          "Pro Feature Manager checks can unlock blocks by included capability, combined allowance, or strongest single-plan value.",
      },
    ],
    stats: [
      { value: "Free", label: "Block wrapper" },
      { value: "Pro", label: "Feature checks" },
      { value: "Nested", label: "Protected content" },
      { value: "Editor", label: "Setup surface" },
    ],
    faq: [
      {
        question: "Can editors still see the protected blocks?",
        answer:
          "Yes. The block does not hide inner content in the editor. The restriction applies when the frontend renders.",
      },
      {
        question: "Does the block redirect denied visitors?",
        answer:
          "No. It is for partial-page gating and shows a restricted message. Use URL or post-type rules for full-page redirects.",
      },
      {
        question: "Do product and feature selectors preload every option?",
        answer:
          "No. The selectors load results on demand so large catalogs and feature lists stay manageable.",
      },
    ],
    related: ["member-access", "elementor-content-restrictions", "shortcodes"],
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
    name: "Retention Flow Builder",
    cardDescription:
      "Build a multi-step cancellation flow with reason capture, targeted save offers, and final confirmation.",
    tier: "Free + Pro",
    summary:
      "Reduce churn by collecting cancellation reasons and presenting targeted offers before final cancellation.",
    h1: "Build the pre-cancellation retention flow",
    highlights: ["Cancellation reasons", "Save offers", "Multi-step form"],
    intro:
      "Retention Flow Builder is the cancellation-save workflow for ArraySubs. It lets merchants ==collect a cancellation reason, present targeted retention offers, and guide customers through a multi-step form before the final cancellation confirmation== so recoverable churn has a real intervention point.",
    capabilities: [
      {
        title: "Reason capture",
        description:
          "Ask customers why they are leaving before the cancellation is finalized.",
      },
      {
        title: "Targeted retention offers",
        description:
          "Show discount, pause, downgrade, or contact-support offers based on the selected reason.",
      },
      {
        title: "Multi-step cancellation form",
        description:
          "Moves customers from reason selection to save offers and only then to final cancellation confirmation.",
      },
      {
        title: "Offer outcome tracking",
        description:
          "Logs accepted and declined offers so retention analytics can report what saves revenue.",
      },
    ],
    stats: [
      { value: "Free", label: "Retention flow" },
      { value: "4", label: "Offer types" },
      { value: "3", label: "Form steps" },
      { value: "Reasons", label: "Churn insight" },
    ],
    faq: [
      {
        question: "Are retention offers free?",
        answer:
          "Yes. The core includes retention offers and cancellation reason capture.",
      },
      {
        question: "What happens before cancellation?",
        answer:
          "Customers choose a reason, see any matching save offer, and then continue to the final confirmation only if they still want to cancel.",
      },
    ],
    related: ["retention-analytics", "customer-portal", "manage-refunds"],
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
        question: "Does it depend on Retention Flow Builder?",
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
          "No. Automatic payments are represented in the Payment Gateways section. Gateway Health is the dedicated Pro monitoring module.",
      },
      {
        question: "Which gateways does it help monitor?",
        answer:
          "The manual highlights Stripe, PayPal, and Paddle gateway workflows, plus gateway capabilities and webhook events.",
      },
    ],
    related: ["stripe-payments", "paypal-payments", "paddle-payments"],
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
