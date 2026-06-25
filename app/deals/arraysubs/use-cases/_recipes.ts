import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  ClipboardList,
  Compass,
  DollarSign,
  HeartPulse,
  LineChart,
  PieChart,
  ScrollText,
  Tags,
  Target,
  Timer,
  ToggleLeft,
  Trophy,
  Workflow,
  BellRing,
  CircleUserRound,
  FormInput,
  Inbox,
  LayoutDashboard,
  Mail,
  MailOpen,
  MapPin,
  Menu,
  RefreshCw,
  Settings2,
  UserSearch,
  ArrowDownCircle,
  ArrowLeftRight,
  BadgeDollarSign,
  BadgePercent,
  Banknote,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  CalendarRange,
  ChevronsDown,
  ChevronsUp,
  CircleDollarSign,
  Code,
  Coins,
  Columns3,
  CreditCard,
  Crown,
  Download,
  Droplets,
  Eye,
  EyeOff,
  FilePen,
  FilePlus,
  FileText,
  Filter,
  Fingerprint,
  FolderLock,
  Gauge,
  Gift,
  GitBranch,
  Globe,
  HandCoins,
  Hash,
  Headphones,
  HeartHandshake,
  History,
  Hourglass,
  Infinity as InfinityIcon,
  KeyRound,
  Layers,
  Layers3,
  LayoutGrid,
  ListChecks,
  Lock,
  LogIn,
  Megaphone,
  MonitorPlay,
  Newspaper,
  Package,
  PackageCheck,
  PauseCircle,
  Percent,
  PiggyBank,
  Receipt,
  Regex,
  Repeat,
  RotateCcw,
  ShieldAlert,
  ShieldBan,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Signpost,
  SkipForward,
  SlidersHorizontal,
  Sparkles,
  Star,
  StickyNote,
  Store,
  Sun,
  Tag,
  Ticket,
  TicketPercent,
  TimerReset,
  TrendingDown,
  TrendingUp,
  Truck,
  Undo2,
  UserCheck,
  UserCog,
  Users,
  Wallet,
} from "lucide-react";
import type { FeatureTier } from "../features/_data";

/**
 * Configuration "recipes" — concrete, copy-me setting combinations grouped by
 * module/topic. Each recipe is a dedicated SEO landing page that pairs a
 * definitional intro, the *exact* settings to enter, and a manual-referenced
 * step-by-step guide. Recipes are grouped on the use-cases hub via `group`.
 *
 * Everything here maps to a real, shipped ArraySubs setting (free or Pro).
 * Manual links resolve against `MANUAL_BASE`; keep `ManualRef.href` aligned
 * with the generated user-manual paths under `user-manual/dist`.
 */

/** Public base for the ArraySubs user manual (static docs site). */
export const MANUAL_BASE = "https://support.arrayhash.com/arraysubs/";

export type ManualRef = {
  /** Human label shown on the link. */
  label: string;
  /** Path appended to `MANUAL_BASE`, e.g. `subscription-products/create-and-configure.html`. */
  href: string;
};

/** A row in the "exact settings" spec table. */
export type RecipeSetting = {
  setting: string;
  value: string;
  /** Where the setting lives, e.g. "Product → Subscription tab" or "General Settings → Trials". */
  where?: string;
};

export type RecipeStep = {
  title: string;
  description: string;
  /** Optional manual page this step is drawn from. */
  manual?: ManualRef;
};

export type RecipeFaq = { question: string; answer: string };

export type Recipe = {
  slug: string;
  /** RecipeGroup.key this recipe belongs to. */
  group: string;
  icon: LucideIcon;
  /** Card + breadcrumb label. */
  name: string;
  cardDescription: string;
  tier: FeatureTier;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  heroHighlights: string[];
  /** Definitional lead paragraph (GEO/AI-extractable). Supports `==marks==`. */
  intro: string;
  /** The exact configuration to enter — the core value of the page. */
  settings: RecipeSetting[];
  /** "What you get" outcomes. */
  outcomes: string[];
  /** Short "best for / when to use" bullets. */
  bestFor: string[];
  /** Manual-referenced setup steps. */
  steps: RecipeStep[];
  /** Good-to-know edge cases. */
  notes: string[];
  faq: RecipeFaq[];
  /** Feature slugs this recipe relies on, priority order. */
  relatedFeatures: string[];
  /** Sibling recipe slugs to cross-link. */
  relatedRecipes?: string[];
};

export type RecipeGroup = {
  key: string;
  eyebrow: string;
  /** Section heading on the hub. */
  label: string;
  /** Section subtitle on the hub. */
  description: string;
  /** Feature slugs (modules) this group is built from. */
  modules: string[];
};

export const RECIPE_GROUPS: RecipeGroup[] = [
  {
    key: "recurring-billing",
    eyebrow: "Recurring billing",
    label: "Subscription & recurring-billing recipes",
    description:
      "Every pricing shape you can build with the Subscription Products and Billing & Renewals modules — signup fees, trials, intro pricing, prepaid runs, recurring shipping, and automatic dunning.",
    modules: [
      "subscription-products",
      "billing-and-renewals",
      "checkout-and-payments",
      "feature-manager",
    ],
  },
  {
    key: "manage-subscriptions",
    eyebrow: "Admin & operations",
    label: "Manage-subscriptions & admin recipes",
    description:
      "Run subscriptions from the back office — purchase-limit combinations, admin create/edit, lifecycle actions, exports and notes, the site-access toolkit (login-as-user, wp-admin lockdown, login routing), refunds, and store-credit management.",
    modules: [
      "manage-subscriptions",
      "subscription-notes",
      "login-as-user",
      "admin-dashboard-access",
      "redirect-product-page",
      "retention-and-refunds",
      "store-credit",
    ],
  },
  {
    key: "retention-coupons",
    eyebrow: "Retention & coupons",
    label: "Retention-flow & coupon recipes",
    description:
      "Win-back offers, cancellation funnels, and promotional discounts built from the Retention Flow and Coupons modules — discounts, pauses, downgrades, and recurring promo codes.",
    modules: [
      "retention-and-refunds",
      "coupons",
      "retention-analytics",
      "store-credit",
    ],
  },
  {
    key: "plan-switching-features",
    eyebrow: "Switching, features & credit",
    label: "Plan-switching, feature & store-credit recipes",
    description:
      "Upgrades, downgrades, and crossgrades with automatic proration; per-tier entitlements and usage limits from Feature Manager; and Store Credit wallets, refund-to-credit, and prepaid top-ups.",
    modules: [
      "feature-manager",
      "subscription-products",
      "customer-portal",
      "store-credit",
    ],
  },
  {
    key: "member-restrictions",
    eyebrow: "Restrict & gate",
    label: "Member restrictions & gated content recipes",
    description:
      "Lock content to the right members — page, post, category, URL and product gating with AND/OR conditions, scheduled content dripping, gated downloads, member pricing, role mapping, shortcodes, and per-tier session limits.",
    modules: [
      "member-access",
      "shortcodes",
      "multi-login-prevention",
      "profile-builder",
      "customer-portal",
    ],
  },
  {
    key: "membership-modules",
    eyebrow: "Membership",
    label: "Membership modules recipes",
    description:
      "The member-experience layer of your membership site — a Manage Members 360° dashboard, custom profile fields and avatars, a customizable My Account, the full self-service portal, and branded lifecycle emails.",
    modules: [
      "member-insight",
      "profile-builder",
      "customer-portal",
      "emails",
    ],
  },
  {
    key: "analytics-growth",
    eyebrow: "Measure & grow",
    label: "Analytics & growth recipes",
    description:
      "Turn data into growth — track MRR, churn, ARPU and trial conversion, see which products, offers and coupons actually move the needle, then protect that revenue with audit trails, job monitoring, and gateway health.",
    modules: [
      "analytics",
      "retention-analytics",
      "audits-and-logs",
      "gateway-health",
    ],
  },
];

/** Manual pages referenced by recipe steps. Keep aligned with the docs site. */
const M = {
  createConfigure: {
    label: "Create & Configure Subscription Products",
    href: "subscription-products/create-and-configure.html",
  },
  planSwitching: {
    label: "Plan Switching & Relationships",
    href: "subscription-products/plan-switching-and-relationships.html",
  },
  productExperience: {
    label: "Product Experience & Display",
    href: "subscription-products/product-experience.html",
  },
  trial: {
    label: "Trial Management",
    href: "billing-and-renewals/trial-management.html",
  },
  grace: {
    label: "Recovery & Grace Flows",
    href: "billing-and-renewals/recovery-and-grace-flows.html",
  },
  renewals: {
    label: "Renewal Operations",
    href: "billing-and-renewals/renewal-operations.html",
  },
  autopay: {
    label: "Automatic Payments",
    href: "checkout-and-payments/automatic-payments/index.html",
  },
  stripe: {
    label: "Stripe Automatic Payments",
    href: "checkout-and-payments/automatic-payments/stripe.html",
  },
  subShipping: {
    label: "Subscription Shipping",
    href: "subscription-shipping/index.html",
  },
  checkoutBuilder: {
    label: "Checkout Builder",
    href: "checkout-and-payments/checkout-builder/index.html",
  },
  checkoutFieldTypes: {
    label: "Checkout Builder Field Types",
    href: "checkout-and-payments/checkout-builder/field-types.html",
  },
  checkoutUseCases: {
    label: "Checkout Builder Use Cases",
    href: "checkout-and-payments/checkout-builder/use-cases.html",
  },
  generalSettings: {
    label: "General Settings",
    href: "settings/general-settings.html",
  },
  cancellation: {
    label: "Cancellation Setup",
    href: "retention-and-refunds/cancellation-setup.html",
  },
  offers: {
    label: "Retention Offers",
    href: "retention-and-refunds/retention-offers.html",
  },
  retentionAnalytics: {
    label: "Retention Analytics",
    href: "retention-analytics/index.html",
  },
  coupons: { label: "Coupons", href: "coupons/index.html" },
  featureManager: {
    label: "Feature Manager",
    href: "feature-manager/index.html",
  },
  featureDefine: {
    label: "Defining Product Features",
    href: "feature-manager/defining-product-features.html",
  },
  featureDisplay: {
    label: "Feature Customer & Storefront Display",
    href: "feature-manager/customer-and-storefront-display.html",
  },
  featureSettings: {
    label: "Feature Manager Settings",
    href: "feature-manager/feature-manager-settings.html",
  },
  storeCredit: { label: "Store Credit", href: "store-credit/index.html" },
  storeCreditSettings: {
    label: "Store Credit Settings",
    href: "store-credit/store-credit-settings.html",
  },
  refundToCredit: {
    label: "Refund to Credit",
    href: "store-credit/refund-to-credit.html",
  },
  creditPurchase: {
    label: "Credit Purchase Product",
    href: "store-credit/purchase-product.html",
  },
  creditEmails: {
    label: "Store Credit Emails",
    href: "store-credit/emails.html",
  },
  manageSubs: {
    label: "Manage Subscriptions",
    href: "manage-subscriptions/index.html",
  },
  subOperations: {
    label: "Subscription Operations",
    href: "manage-subscriptions/subscription-operations.html",
  },
  lifecycle: {
    label: "Lifecycle Management",
    href: "manage-subscriptions/lifecycle-management.html",
  },
  adminTools: {
    label: "Admin Tools & Records",
    href: "manage-subscriptions/admin-tools-and-records.html",
  },
  subNotes: {
    label: "Subscription Notes",
    href: "subscription-notes/index.html",
  },
  loginAsUser: {
    label: "Login as User",
    href: "login-as-user/index.html",
  },
  adminBar: {
    label: "Admin Bar Visibility",
    href: "admin-bar-visibility/index.html",
  },
  adminDashAccess: {
    label: "Admin Dashboard Access",
    href: "admin-dashboard-access/index.html",
  },
  wpLogin: {
    label: "WordPress Login Page",
    href: "wordpress-login-page/index.html",
  },
  redirectProduct: {
    label: "Redirect Product Page",
    href: "redirect-product-page/index.html",
  },
  multiLogin: {
    label: "Multi-Login Prevention",
    href: "multi-login-prevention/index.html",
  },
  toolkitSettings: {
    label: "Toolkit Settings",
    href: "settings/toolkit-settings.html",
  },
  refundMgmt: {
    label: "Refund Management",
    href: "retention-and-refunds/refund-management.html",
  },
  storeCreditMgmt: {
    label: "Store Credit Management",
    href: "store-credit/store-credit-management.html",
  },
  creditHistory: {
    label: "Credit History",
    href: "store-credit/credit-history.html",
  },
  memberAccess: {
    label: "Member Access",
    href: "member-access/index.html",
  },
  accessRules: {
    label: "Access Rules",
    href: "member-access/access-rules.html",
  },
  contentRestriction: {
    label: "Content Restriction",
    href: "member-access/content-restriction.html",
  },
  commerceBenefit: {
    label: "Commerce & Benefit Rules",
    href: "member-access/commerce-and-benefit-rules.html",
  },
  sessionControls: {
    label: "Session & Frontend Controls",
    href: "member-access/session-and-frontend-controls.html",
  },
  memberUseCases: {
    label: "Member Access Use Cases",
    href: "member-access/use-cases.html",
  },
  shortcodes: {
    label: "Shortcodes",
    href: "shortcodes/index.html",
  },
  contentGating: {
    label: "Content-Gating Shortcodes",
    href: "shortcodes/content-gating.html",
  },
  elementorRestrictions: {
    label: "Elementor Content Restrictions",
    href: "shortcodes/elementor-content-restrictions.html",
  },
  accountShortcodes: {
    label: "Account Shortcodes",
    href: "shortcodes/account-shortcodes.html",
  },
  memberInsight: {
    label: "Member Insight (Manage Members)",
    href: "member-insight/index.html",
  },
  memberLookup: {
    label: "Member Lookup & Profiles",
    href: "member-insight/member-lookup-and-profiles.html",
  },
  memberOps: {
    label: "Member Operations",
    href: "member-insight/member-operations.html",
  },
  profileBuilder: {
    label: "Profile Builder",
    href: "profile-builder/index.html",
  },
  profileForm: {
    label: "Profile Form",
    href: "profile-builder/profile-form.html",
  },
  myAccountEditor: {
    label: "My Account Editor",
    href: "profile-builder/my-account-editor.html",
  },
  customerPortal: {
    label: "Customer Portal",
    href: "customer-portal/index.html",
  },
  portalPages: {
    label: "Portal Pages",
    href: "customer-portal/portal-pages.html",
  },
  selfService: {
    label: "Self-Service Actions",
    href: "customer-portal/self-service-actions.html",
  },
  paymentShipping: {
    label: "Payment & Shipping Actions",
    href: "customer-portal/payment-and-shipping.html",
  },
  emails: { label: "Emails", href: "emails/index.html" },
  customerEmails: {
    label: "Customer Emails",
    href: "emails/customer-emails.html",
  },
  adminEmails: {
    label: "Admin Emails",
    href: "emails/admin-emails.html",
  },
  analytics: { label: "Analytics & Reports", href: "analytics/index.html" },
  reportsHub: {
    label: "Reports Hub",
    href: "analytics/reports-hub.html",
  },
  subPerformance: {
    label: "Subscription Performance",
    href: "analytics/subscription-performance.html",
  },
  wcAnalytics: {
    label: "WooCommerce Analytics Extension",
    href: "analytics/woocommerce-analytics-extension.html",
  },
  orderListEnh: {
    label: "Order List Enhancements",
    href: "analytics/order-list-enhancements.html",
  },
  auditsLogs: {
    label: "Audits & Logs",
    href: "audits-and-logs/index.html",
  },
  activityAudits: {
    label: "Activity Audits",
    href: "audits-and-logs/activity-audits.html",
  },
  scheduledJobLogs: {
    label: "Scheduled-Job Logs",
    href: "audits-and-logs/scheduled-job-logs.html",
  },
  gatewayHealth: {
    label: "Gateway Health",
    href: "gateway-health/index.html",
  },
} satisfies Record<string, ManualRef>;

const CTA_GET_PRO = "/deals/arraysubs/pricing/";
export const RECIPE_CTA = CTA_GET_PRO;

export const RECIPES: Recipe[] = [
  // ============================================================
  // GROUP 1 — Recurring billing
  // ============================================================
  {
    slug: "signup-fee-plus-flat-monthly",
    group: "recurring-billing",
    icon: BadgeDollarSign,
    name: "Signup fee + flat monthly fee",
    cardDescription:
      "Charge a one-time onboarding fee at checkout, then a flat recurring price every month — e.g. $50 signup + $100/mo.",
    tier: "Free",
    seoTitle: "WooCommerce Subscription with a Signup Fee + Flat Monthly Fee",
    metaDescription:
      "Set up a WooCommerce subscription that charges a one-time signup fee at checkout plus a flat monthly price. Exact settings for a $50 signup + $100/month plan, step by step.",
    h1: "Signup fee plus a flat monthly fee",
    heroSubtitle:
      "Bill a one-time onboarding or activation fee at checkout, then collect the same flat amount every billing cycle — no trial, no price changes.",
    heroHighlights: [
      "$50 one-time signup fee",
      "$100 flat monthly recurring",
      "Free core — no add-ons",
    ],
    intro:
      "A ==signup fee plus a flat monthly fee== is the most common subscription shape: the customer pays a one-time charge to get started (onboarding, setup, activation, or a welcome kit), then the same recurring amount on every renewal. In ArraySubs this needs ==no code and no extra plugin== — the recurring price is just the product's regular WooCommerce price, and the signup fee is a single field in the Subscription tab. The example below builds a ==$50 signup fee + $100/month== plan, but the same three settings model any amounts you like.",
    settings: [
      {
        setting: "Regular price",
        value: "$100.00",
        where: "Product → General tab",
      },
      {
        setting: "Subscription",
        value: "Enabled (checkbox)",
        where: "Product data panel",
      },
      { setting: "Billing Period", value: "Month", where: "Subscription tab" },
      { setting: "Billing Interval", value: "1", where: "Subscription tab" },
      {
        setting: "Subscription Length",
        value: "0 (never expires)",
        where: "Subscription tab",
      },
      { setting: "Trial Length", value: "0 (no trial)", where: "Subscription tab" },
      { setting: "Sign-up Fee", value: "$50.00", where: "Subscription tab" },
      {
        setting: "Different Renewal Price",
        value: "Off",
        where: "Subscription tab",
      },
    ],
    outcomes: [
      "First order charges $150.00 ($100 first period + $50 signup fee).",
      "Every renewal charges a flat $100.00 — the signup fee never repeats.",
      "Customers see the signup fee broken out as a line item at checkout.",
      "Works on manual and automatic (Stripe/PayPal/Paddle) renewals.",
    ],
    bestFor: [
      "Services with a setup or onboarding cost",
      "Memberships with a one-time joining fee",
      "Equipment or kit rentals with a deposit-style fee",
    ],
    steps: [
      {
        title: "Create the product and set the price",
        description:
          "Add a new product and enter $100.00 as the Regular price on the General tab. This regular price is the recurring charge — there is no separate subscription-price field.",
        manual: M.createConfigure,
      },
      {
        title: "Enable the Subscription checkbox",
        description:
          "In the Product data panel, tick the Subscription checkbox (next to Virtual and Downloadable). A new Subscription tab appears.",
        manual: M.createConfigure,
      },
      {
        title: "Set the billing schedule",
        description:
          "In the Subscription tab, set Billing Period to Month, Billing Interval to 1, and leave Subscription Length at 0 so it renews until cancelled.",
        manual: M.createConfigure,
      },
      {
        title: "Add the signup fee",
        description:
          "Enter 50 in the Sign-up Fee field. It is added to the first order as a separate fee line labelled “Subscription Signup Fee” and is never charged on renewals.",
        manual: M.createConfigure,
      },
      {
        title: "Publish and verify on the product page",
        description:
          "Publish, then open the product. The pricing summary should read “$100.00 / month with a $50.00 signup fee.”",
        manual: M.productExperience,
      },
    ],
    notes: [
      "The signup fee is taxed according to your WooCommerce fee tax settings.",
      "Subscription prices are locked in at purchase — changing the product price later only affects new subscriptions.",
      "A coupon applies to the recurring product price, not the signup fee (the fee follows standard WooCommerce fee behaviour).",
    ],
    faq: [
      {
        question: "Is the signup fee charged again on renewals?",
        answer:
          "No. The signup fee is a one-time charge applied only to the initial order. Every renewal collects just the recurring price ($100.00 in this example).",
      },
      {
        question: "Can I add a free trial on top of the signup fee?",
        answer:
          "Yes. If you set a trial, the recurring price is delayed until the trial ends, but the signup fee is still charged at checkout. See the “trial + signup fee” recipe.",
      },
      {
        question: "Does the customer see the signup fee before paying?",
        answer:
          "Yes. The signup fee appears as a separate line item in the cart and checkout totals, and the product page shows the “+ signup fee” summary.",
      },
    ],
    relatedFeatures: ["subscription-products", "checkout-and-payments", "billing-and-renewals"],
    relatedRecipes: ["high-signup-low-monthly", "trial-with-signup-fee", "annual-prepaid"],
  },
  {
    slug: "no-card-trial-then-monthly",
    group: "recurring-billing",
    icon: Hourglass,
    name: "No-card trial, then monthly",
    cardDescription:
      "Let customers start a free trial without entering a card — e.g. 15 days free, then $100/month once the trial converts.",
    tier: "Free",
    seoTitle: "Free Trial With No Credit Card on WooCommerce Subscriptions",
    metaDescription:
      "Offer a WooCommerce subscription free trial with no credit card required, then bill monthly when it converts. Exact settings for a 15-day no-card trial → $100/month.",
    h1: "Free trial with no card, then monthly billing",
    heroSubtitle:
      "Remove the checkout friction — customers start a 15-day trial without entering payment details, then are asked to pay when the trial converts to a paid plan.",
    heroHighlights: [
      "15-day trial, $0 at checkout",
      "No payment method required",
      "$100/month after conversion",
    ],
    intro:
      "A ==no-card free trial== is the highest-conversion way to let people try a paid plan: there is ==no payment form at all== during signup, so the only thing between a visitor and a trial is their email. ArraySubs supports this by turning **off** the global ==Require Payment Method== setting, so even a $0 trial checks out with no card. When the trial ends, the daily conversion job flips the subscription to Active and schedules the first real charge — at which point the customer is prompted to pay. This recipe builds a ==15-day no-card trial that converts to $100/month==.",
    settings: [
      { setting: "Regular price", value: "$100.00", where: "Product → General tab" },
      { setting: "Subscription", value: "Enabled", where: "Product data panel" },
      { setting: "Billing Period", value: "Month", where: "Subscription tab" },
      { setting: "Billing Interval", value: "1", where: "Subscription tab" },
      { setting: "Trial Length", value: "15", where: "Subscription tab" },
      { setting: "Trial Period", value: "Day", where: "Subscription tab" },
      { setting: "Sign-up Fee", value: "$0.00", where: "Subscription tab" },
      {
        setting: "Require Payment Method",
        value: "Off",
        where: "General Settings → Trials",
      },
      {
        setting: "One Trial Per Customer",
        value: "On (recommended)",
        where: "General Settings → Trials",
      },
    ],
    outcomes: [
      "Customers reach a trial with zero payment friction — $0 and no card.",
      "Subscription is created with Trial status and a 15-day end date.",
      "The Process Trial Conversions job (2 AM daily) converts it to Active.",
      "First $100.00 charge lands one billing cycle after conversion.",
    ],
    bestFor: [
      "SaaS and digital tools optimising trial signups",
      "Communities and content sites that want a low-friction taste",
      "Any plan where a card wall hurts trial starts",
    ],
    steps: [
      {
        title: "Build the monthly product",
        description:
          "Create the product, set Regular price to $100.00, enable Subscription, and set Billing Period = Month, Interval = 1.",
        manual: M.createConfigure,
      },
      {
        title: "Configure the trial on the product",
        description:
          "In the Subscription tab set Trial Length = 15 and Trial Period = Day. Leave the Sign-up Fee at 0 so checkout is truly $0.",
        manual: M.createConfigure,
      },
      {
        title: "Turn off Require Payment Method",
        description:
          "Go to ArraySubs → Settings → General Settings → Trials and disable Require Payment Method. This lets a $0 trial check out without any card.",
        manual: M.trial,
      },
      {
        title: "Decide trial-abuse protection",
        description:
          "Keep One Trial Per Customer enabled so the same customer can’t loop the free trial on this product.",
        manual: M.trial,
      },
      {
        title: "Confirm the conversion path",
        description:
          "Because no card is stored, the customer is prompted to pay when the trial converts. Review how the first renewal invoice is generated after conversion.",
        manual: M.renewals,
      },
    ],
    notes: [
      "With no card on file, conversion to a paid renewal depends on the customer paying the first invoice — expect lower payment-capture than a card-required trial.",
      "The trial conversion job runs once daily at 2 AM; a trial ending overnight converts on the next run.",
      "If you later want guaranteed capture, switch Require Payment Method back on and use the card-required trial recipe.",
    ],
    faq: [
      {
        question: "Will the customer be charged anything at signup?",
        answer:
          "No. With no signup fee and Require Payment Method off, the trial checkout total is $0.00 and no card is collected.",
      },
      {
        question: "When does the first $100 charge happen?",
        answer:
          "One full billing cycle after the trial converts. A 15-day trial purchased on the 1st converts around the 16th, and the first paid renewal is one month after conversion.",
      },
      {
        question: "Can a customer start the trial twice?",
        answer:
          "Not if One Trial Per Customer is enabled — they can only start one trial per product. They can still trial different products.",
      },
    ],
    relatedFeatures: ["subscription-products", "billing-and-renewals", "customer-portal"],
    relatedRecipes: ["card-required-trial-then-monthly", "trial-with-signup-fee", "auto-downgrade-on-trial-expiry"],
  },
  {
    slug: "card-required-trial-then-monthly",
    group: "recurring-billing",
    icon: CreditCard,
    name: "Card-required trial, then monthly",
    cardDescription:
      "Capture a card during a $0 trial with Stripe, then charge automatically when the trial converts — e.g. 14 days, then $49/mo.",
    tier: "Free + Pro",
    seoTitle: "Card-Required Free Trial With Stripe on WooCommerce",
    metaDescription:
      "Run a WooCommerce free trial that captures a card at checkout via Stripe SetupIntent, then charges automatically on conversion. Exact settings for a 14-day trial → $49/month.",
    h1: "Card-required trial that auto-charges on conversion",
    heroSubtitle:
      "Collect a payment method during the $0 trial with Stripe, so billing starts automatically the moment the trial converts — no chasing payment.",
    heroHighlights: [
      "14-day $0 trial",
      "Card captured via Stripe SetupIntent",
      "Auto-charges $49/mo on conversion",
    ],
    intro:
      "A ==card-required trial== maximises trial-to-paid capture: the customer pays $0 today, but a valid payment method is stored at checkout, so when the trial converts the first charge runs ==automatically and off-session==. ArraySubs does this by keeping the global ==Require Payment Method== setting on and using ==Stripe (Pro)==, which creates a SetupIntent to vault the card during the $0 trial — fully SCA/3DS compliant. This recipe builds a ==14-day trial that converts to $49/month== with hands-off billing.",
    settings: [
      { setting: "Regular price", value: "$49.00", where: "Product → General tab" },
      { setting: "Subscription", value: "Enabled", where: "Product data panel" },
      { setting: "Billing Period", value: "Month", where: "Subscription tab" },
      { setting: "Billing Interval", value: "1", where: "Subscription tab" },
      { setting: "Trial Length", value: "14", where: "Subscription tab" },
      { setting: "Trial Period", value: "Day", where: "Subscription tab" },
      {
        setting: "Require Payment Method",
        value: "On",
        where: "General Settings → Trials",
      },
      {
        setting: "Stripe gateway",
        value: "Enabled (Pro)",
        where: "Payments → Automatic Payments",
      },
    ],
    outcomes: [
      "Checkout collects a card via Stripe SetupIntent while charging $0.",
      "Trial converts automatically and charges $49.00 off-session.",
      "SCA/3D Secure is handled at checkout and on renewals.",
      "Far higher trial-to-paid capture than a no-card trial.",
    ],
    bestFor: [
      "SaaS that wants guaranteed conversion at trial end",
      "Higher-priced plans where payment capture matters",
      "EU/UK stores needing SCA-compliant off-session billing",
    ],
    steps: [
      {
        title: "Create the $49 monthly product with a trial",
        description:
          "Set Regular price $49.00, enable Subscription, Billing Period = Month, Interval = 1, Trial Length = 14, Trial Period = Day.",
        manual: M.createConfigure,
      },
      {
        title: "Keep Require Payment Method on",
        description:
          "In General Settings → Trials, ensure Require Payment Method is enabled so a card must be entered even for the $0 trial.",
        manual: M.trial,
      },
      {
        title: "Enable and connect Stripe",
        description:
          "Activate Pro and connect the Stripe gateway. Stripe uses a SetupIntent to store the card during the trial without charging it.",
        manual: M.stripe,
      },
      {
        title: "Confirm trial conversion behaviour",
        description:
          "On conversion the subscription becomes Active and the first $49 charge is taken off-session one billing cycle later.",
        manual: M.trial,
      },
    ],
    notes: [
      "PayPal does not support $0 trial authorisation; use Stripe or Paddle for card-required trials.",
      "The Trial Converted email fires on conversion (unless auto-downgrade handles it instead).",
      "Customers can cancel during the trial from the portal with no charge.",
    ],
    faq: [
      {
        question: "How is a card stored without charging it?",
        answer:
          "Stripe (Pro) creates a SetupIntent at checkout that securely vaults the payment method for later off-session use, so the $0 trial collects a card but takes no payment.",
      },
      {
        question: "Is this SCA / 3D Secure compliant?",
        answer:
          "Yes. Stripe handles SCA/3DS authentication at checkout and supports off-session charges at conversion and on renewals.",
      },
      {
        question: "What if I use PayPal instead of Stripe?",
        answer:
          "PayPal can’t authorise a $0 trial card. Use Stripe or Paddle for card-required trials, or run a no-card trial with PayPal.",
      },
    ],
    relatedFeatures: ["subscription-products", "checkout-and-payments", "billing-and-renewals"],
    relatedRecipes: ["no-card-trial-then-monthly", "stripe-automatic-billing-sca", "auto-downgrade-on-trial-expiry"],
  },
  {
    slug: "trial-with-signup-fee",
    group: "recurring-billing",
    icon: Gift,
    name: "Trial + signup fee",
    cardDescription:
      "Charge a small upfront fee to start a trial, then bill monthly when it converts — e.g. $5 to start a 7-day trial, then $29/mo.",
    tier: "Free",
    seoTitle: "Free Trial With a Signup Fee on WooCommerce Subscriptions",
    metaDescription:
      "Combine a paid signup fee with a free trial on WooCommerce. The customer pays the fee at checkout, then the recurring price starts when the trial ends. Exact settings inside.",
    h1: "Trial with a small signup fee",
    heroSubtitle:
      "Collect a low commitment fee to start the trial — it filters out tyre-kickers while the recurring price stays delayed until the trial converts.",
    heroHighlights: [
      "$5 to start a 7-day trial",
      "Recurring price delayed to conversion",
      "$29/mo after the trial",
    ],
    intro:
      "Pairing a ==trial with a small signup fee== gives you the best of both worlds: the customer commits a token amount upfront (which dramatically improves trial quality and conversion) while the ==full recurring price stays delayed== until the trial ends. In ArraySubs the signup fee is charged at checkout even during a free trial — only the recurring price waits. This recipe builds a ==$5 fee to start a 7-day trial, then $29/month==.",
    settings: [
      { setting: "Regular price", value: "$29.00", where: "Product → General tab" },
      { setting: "Subscription", value: "Enabled", where: "Product data panel" },
      { setting: "Billing Period", value: "Month", where: "Subscription tab" },
      { setting: "Billing Interval", value: "1", where: "Subscription tab" },
      { setting: "Trial Length", value: "7", where: "Subscription tab" },
      { setting: "Trial Period", value: "Day", where: "Subscription tab" },
      { setting: "Sign-up Fee", value: "$5.00", where: "Subscription tab" },
    ],
    outcomes: [
      "Customer pays $5.00 at checkout to begin the trial.",
      "No recurring charge during the 7-day trial.",
      "First $29.00 renewal one billing cycle after conversion.",
      "The $5 fee is one-time and never repeats.",
    ],
    bestFor: [
      "Fitness, membership, and community trials",
      "Filtering low-intent trial signups with a token fee",
      "Offers where a fully free trial attracts abuse",
    ],
    steps: [
      {
        title: "Set the recurring price and schedule",
        description:
          "Create the product with Regular price $29.00, enable Subscription, Billing Period = Month, Interval = 1.",
        manual: M.createConfigure,
      },
      {
        title: "Add the trial",
        description:
          "In the Subscription tab set Trial Length = 7 and Trial Period = Day.",
        manual: M.createConfigure,
      },
      {
        title: "Add the signup fee",
        description:
          "Enter 5 in Sign-up Fee. Because a signup fee is charged even during a free trial, the customer pays $5.00 at checkout.",
        manual: M.trial,
      },
      {
        title: "Decide on card capture",
        description:
          "Keep Require Payment Method on (with Stripe) for automatic conversion, or off to let customers pay the first invoice manually.",
        manual: M.trial,
      },
    ],
    notes: [
      "The trial period does not count toward the completed-payments counter; that starts when the trial converts.",
      "Each variation of a variable product can have its own trial and signup fee.",
      "The $5 fee shows as a separate ‘Subscription Signup Fee’ line at checkout.",
    ],
    faq: [
      {
        question: "Why is the customer charged during a ‘free’ trial?",
        answer:
          "The trial only delays the recurring price. A signup fee is independent and is always charged on the initial order — here, $5.00.",
      },
      {
        question: "Can I make the signup fee bigger than the monthly price?",
        answer:
          "Yes. The signup fee is independent of the recurring price; you can set any amount, larger or smaller than the monthly charge.",
      },
    ],
    relatedFeatures: ["subscription-products", "billing-and-renewals", "checkout-and-payments"],
    relatedRecipes: ["no-card-trial-then-monthly", "signup-fee-plus-flat-monthly", "card-required-trial-then-monthly"],
  },
  {
    slug: "intro-pricing-step-up",
    group: "recurring-billing",
    icon: TrendingUp,
    name: "Intro pricing that steps up",
    cardDescription:
      "Offer a low introductory rate for the first few cycles, then step up to the standard price — e.g. $19/mo for 3 months, then $29/mo.",
    tier: "Free",
    seoTitle: "Introductory Pricing That Steps Up on WooCommerce Subscriptions",
    metaDescription:
      "Set a low intro price for the first N billing cycles, then automatically raise it to the standard rate. Exact ArraySubs settings for $19/mo for 3 months → $29/mo.",
    h1: "Introductory price that steps up after N cycles",
    heroSubtitle:
      "Hook subscribers with a low launch rate, then let the price rise automatically to your standard amount after a set number of cycles — no manual changes.",
    heroHighlights: [
      "$19/mo intro for 3 months",
      "$29/mo standard afterwards",
      "Switch is automatic",
    ],
    intro:
      "==Introductory pricing== lowers the barrier to subscribe, then steps the price up to your real rate once the customer is hooked. ArraySubs handles this with the ==Different Renewal Price== option: you set the low regular price, enable a different renewal price, and tell it after how many cycles the higher amount kicks in. The change is ==fully automatic== and shown to the customer on the product page. This recipe builds ==$19/month for the first 3 months, then $29/month==.",
    settings: [
      {
        setting: "Regular price",
        value: "$19.00 (the intro rate)",
        where: "Product → General tab",
      },
      { setting: "Subscription", value: "Enabled", where: "Product data panel" },
      { setting: "Billing Period", value: "Month", where: "Subscription tab" },
      { setting: "Billing Interval", value: "1", where: "Subscription tab" },
      {
        setting: "Different Renewal Price",
        value: "Enabled",
        where: "Subscription tab",
      },
      { setting: "Renewal Price", value: "$29.00", where: "Subscription tab" },
      {
        setting: "Apply Renewal Price After",
        value: "3 (cycles)",
        where: "Subscription tab",
      },
    ],
    outcomes: [
      "First 3 payments are $19.00 each.",
      "From the 4th cycle onward, renewals are $29.00.",
      "The price step-up requires no manual intervention.",
      "Customers see the full pricing breakdown before they buy.",
    ],
    bestFor: [
      "Launch and promotional pricing",
      "‘Lock in early-bird, grow to standard’ offers",
      "Onboarding discounts that taper off",
    ],
    steps: [
      {
        title: "Set the intro price as the regular price",
        description:
          "Create the product with Regular price $19.00 — this is what customers pay during the intro period.",
        manual: M.createConfigure,
      },
      {
        title: "Enable Different Renewal Price",
        description:
          "In the Subscription tab, tick Different Renewal Price to reveal the renewal fields.",
        manual: M.createConfigure,
      },
      {
        title: "Set the standard price and threshold",
        description:
          "Enter Renewal Price = $29.00 and Apply Renewal Price After = 3. Both fields are required when the option is enabled.",
        manual: M.createConfigure,
      },
      {
        title: "Verify the displayed breakdown",
        description:
          "On the product page, confirm it reads “$19.00/month for 3 months, then $29.00/month.”",
        manual: M.productExperience,
      },
    ],
    notes: [
      "Apply Renewal Price After must be at least 1, and Renewal Price must be greater than 0, or saving fails validation.",
      "The completed-payments counter (which drives the step-up) starts at 0 after any trial converts.",
      "This is independent of coupons — you can still stack a launch coupon on top of the intro price.",
    ],
    faq: [
      {
        question: "Is the price increase automatic?",
        answer:
          "Yes. After the configured number of cycles (3 here), ArraySubs automatically charges the renewal price ($29.00) on every subsequent renewal.",
      },
      {
        question: "Can I step the price down instead of up?",
        answer:
          "Yes. Set a higher regular price and a lower renewal price — see the ‘loss-leader first period’ recipe for the reverse pattern.",
      },
    ],
    relatedFeatures: ["subscription-products", "billing-and-renewals", "coupons"],
    relatedRecipes: ["loss-leader-first-period", "half-off-3-months", "founding-member-locked-price"],
  },
  {
    slug: "loss-leader-first-period",
    group: "recurring-billing",
    icon: TrendingDown,
    name: "$1 first period, then full price",
    cardDescription:
      "Use a cheap or $1 first billing period as a loss-leader, then jump to the standard rate — e.g. $1 first month, then $49/mo.",
    tier: "Free",
    seoTitle: "$1 First Month Then Full Price — WooCommerce Subscriptions",
    metaDescription:
      "Offer a $1 (or low) first billing period as a loss-leader, then charge the full recurring price from cycle two. Exact ArraySubs settings for $1 first month → $49/month.",
    h1: "Loss-leader first period, then full price",
    heroSubtitle:
      "Convert browsers with a near-free first period that still captures a real payment, then move to your standard rate automatically from the next cycle.",
    heroHighlights: [
      "$1 first month",
      "$49/mo from cycle two",
      "Real payment, not a trial",
    ],
    intro:
      "A ==loss-leader first period== is a paid trial alternative: instead of $0, the customer pays a token amount like ==$1 for the first month==, which captures a real, working payment method and filters out non-buyers — then the price jumps to your standard rate. Unlike a free trial, billing is live from day one. ArraySubs builds this with ==Different Renewal Price== set to apply after the first cycle. This recipe creates ==$1 for the first month, then $49/month==.",
    settings: [
      {
        setting: "Regular price",
        value: "$1.00 (first period)",
        where: "Product → General tab",
      },
      { setting: "Subscription", value: "Enabled", where: "Product data panel" },
      { setting: "Billing Period", value: "Month", where: "Subscription tab" },
      { setting: "Billing Interval", value: "1", where: "Subscription tab" },
      { setting: "Trial Length", value: "0 (no trial)", where: "Subscription tab" },
      {
        setting: "Different Renewal Price",
        value: "Enabled",
        where: "Subscription tab",
      },
      { setting: "Renewal Price", value: "$49.00", where: "Subscription tab" },
      {
        setting: "Apply Renewal Price After",
        value: "1 (cycle)",
        where: "Subscription tab",
      },
    ],
    outcomes: [
      "First payment is just $1.00 — but it’s a real charge that validates the card.",
      "From the 2nd cycle onward, renewals are $49.00.",
      "Higher conversion than a free trial, with payment captured upfront.",
      "No trial logic — the subscription is Active immediately.",
    ],
    bestFor: [
      "Aggressive new-customer acquisition",
      "Offers where a working card upfront matters more than $0",
      "Markets where ‘$1 trial’ outperforms ‘free trial’",
    ],
    steps: [
      {
        title: "Set the first-period price",
        description:
          "Create the product with Regular price $1.00. This is the price for the first cycle only.",
        manual: M.createConfigure,
      },
      {
        title: "Enable Different Renewal Price",
        description:
          "Tick Different Renewal Price in the Subscription tab to expose the renewal fields.",
        manual: M.createConfigure,
      },
      {
        title: "Set the full price after one cycle",
        description:
          "Enter Renewal Price = $49.00 and Apply Renewal Price After = 1, so the full price applies from the second payment.",
        manual: M.createConfigure,
      },
      {
        title: "Verify the breakdown and renewal date",
        description:
          "Check the product page reads “$1.00 first month, then $49.00/month,” and review how the first renewal invoice is generated.",
        manual: M.renewals,
      },
    ],
    notes: [
      "This is not a trial — the subscription is Active and billing from the start, which means standard grace/dunning applies if the $1 fails.",
      "Make the first-period value clearly disclosed to avoid chargebacks at the price jump.",
      "Combine with automatic payments (Stripe) so the $49 renewal collects hands-free.",
    ],
    faq: [
      {
        question: "How is this different from a free trial?",
        answer:
          "A trial charges $0 and delays billing; a $1 first period takes a real payment immediately, validating the card and starting the subscription as Active right away.",
      },
      {
        question: "When does the full $49 price start?",
        answer:
          "On the second billing cycle. ‘Apply Renewal Price After = 1’ means the new price applies after the first paid period.",
      },
    ],
    relatedFeatures: ["subscription-products", "billing-and-renewals", "checkout-and-payments"],
    relatedRecipes: ["intro-pricing-step-up", "no-card-trial-then-monthly", "half-off-3-months"],
  },
  {
    slug: "annual-prepaid",
    group: "recurring-billing",
    icon: CalendarDays,
    name: "Annual prepaid plan",
    cardDescription:
      "Bill once a year for a full year of access at a discount — the simplest way to boost cash flow and cut churn.",
    tier: "Free",
    seoTitle: "Annual (Yearly) Subscription Billing on WooCommerce",
    metaDescription:
      "Set up a yearly WooCommerce subscription that bills once a year. Exact ArraySubs settings for an annual prepaid plan, plus how to pair it with a monthly option.",
    h1: "Annual prepaid subscription",
    heroSubtitle:
      "Charge once a year for twelve months of access — better cash flow, fewer renewal failures, and lower churn than month-to-month.",
    heroHighlights: [
      "Bills every 12 months",
      "One renewal per year",
      "Pairs with a monthly option",
    ],
    intro:
      "An ==annual prepaid plan== bills the customer ==once per year== for a full year of access. It’s the single highest-leverage retention lever in subscriptions: one payment means ==12× fewer renewal failures==, stronger cash flow, and customers locked in for a year. In ArraySubs it’s a one-field change — set the Billing Period to Year. This recipe builds a clean annual plan you can also pair with a monthly option using variations.",
    settings: [
      { setting: "Regular price", value: "$249.00 (per year)", where: "Product → General tab" },
      { setting: "Subscription", value: "Enabled", where: "Product data panel" },
      { setting: "Billing Period", value: "Year", where: "Subscription tab" },
      { setting: "Billing Interval", value: "1", where: "Subscription tab" },
      {
        setting: "Subscription Length",
        value: "0 (renews yearly)",
        where: "Subscription tab",
      },
      { setting: "Trial Length", value: "0", where: "Subscription tab" },
    ],
    outcomes: [
      "Customer is charged $249.00 once, then again every 12 months.",
      "Only one renewal event per year — far fewer failed payments.",
      "Effective monthly rate is lower, which customers value.",
      "Easy to offer alongside a monthly plan via variations.",
    ],
    bestFor: [
      "Plans that want to maximise cash flow and retention",
      "Annual memberships and licences",
      "Offering a ‘save with annual’ option next to monthly",
    ],
    steps: [
      {
        title: "Create the yearly product",
        description:
          "Set Regular price to the annual amount ($249.00), enable Subscription, and set Billing Period = Year, Interval = 1.",
        manual: M.createConfigure,
      },
      {
        title: "Leave it open-ended",
        description:
          "Keep Subscription Length = 0 so it renews every year until the customer cancels.",
        manual: M.createConfigure,
      },
      {
        title: "Optional — add a monthly variation",
        description:
          "To offer both, make it a variable subscription with a Monthly and an Annual variation (see the monthly-vs-annual recipe).",
        manual: M.createConfigure,
      },
    ],
    notes: [
      "Renewal reminder emails can be sent a configurable number of days before the annual charge — important for high-value renewals.",
      "For a one-off year that does NOT renew, set Subscription Length to 1 instead of 0.",
      "Annual plans pair well with automatic payments so the yearly charge collects hands-free.",
    ],
    faq: [
      {
        question: "Can customers switch from monthly to annual?",
        answer:
          "Yes. With plan switching configured, customers can upgrade from a monthly to an annual variation with automatic proration.",
      },
      {
        question: "How do I make the annual plan a one-time year, not recurring?",
        answer:
          "Set Subscription Length to 1. The plan charges once for a year and then expires automatically instead of renewing.",
      },
    ],
    relatedFeatures: ["subscription-products", "billing-and-renewals", "emails"],
    relatedRecipes: ["monthly-vs-annual-variable", "prepaid-fixed-cycles", "founding-member-locked-price"],
  },
  {
    slug: "monthly-vs-annual-variable",
    group: "recurring-billing",
    icon: Layers,
    name: "Monthly + annual on one product",
    cardDescription:
      "Offer both a monthly and a discounted annual option under a single product using subscription variations.",
    tier: "Free",
    seoTitle: "Monthly and Annual Plans on One WooCommerce Product",
    metaDescription:
      "Use variable subscriptions to offer monthly and annual billing options on one WooCommerce product, each with its own price and trial. Exact ArraySubs settings inside.",
    h1: "Monthly and annual options on one product",
    heroSubtitle:
      "Let customers pick monthly or annual from a single product page — each variation carries its own price, cycle, and trial.",
    heroHighlights: [
      "One product, two billing options",
      "Per-variation pricing & trials",
      "Customers self-select at checkout",
    ],
    intro:
      "Offering ==monthly and annual side by side== is the classic ‘save with annual’ play — and it converts best when both options live on ==one product page== so customers compare and choose. ArraySubs uses ==variable subscriptions==: a single product with a ‘Billing’ attribute (Monthly / Annual), where each variation has its own independent price, billing cycle, and trial. This recipe builds a $29/month vs $249/year selector.",
    settings: [
      { setting: "Product type", value: "Variable subscription", where: "Product data panel" },
      { setting: "Subscription", value: "Enabled (applies to all variations)", where: "Product data panel" },
      { setting: "Attribute", value: "Billing → Monthly | Annual", where: "Attributes tab" },
      {
        setting: "Monthly variation",
        value: "$29.00 · Period Month · Interval 1",
        where: "Variations tab",
      },
      {
        setting: "Annual variation",
        value: "$249.00 · Period Year · Interval 1",
        where: "Variations tab",
      },
      {
        setting: "Per-variation trial",
        value: "Optional (e.g. 14-day monthly, 30-day annual)",
        where: "Variations tab",
      },
    ],
    outcomes: [
      "One product page presents both billing options in a dropdown.",
      "Subscription details update live as the customer switches options.",
      "Each option keeps independent price, cycle, and trial.",
      "Customers can later switch options with proration (Pro plan switching).",
    ],
    bestFor: [
      "Any plan that wants a ‘save with annual’ upsell",
      "SaaS, memberships, and content with two cadences",
      "Reducing churn by steering buyers to annual",
    ],
    steps: [
      {
        title: "Make it a variable subscription",
        description:
          "Set the product type to Variable product and tick the Subscription checkbox — all variations become subscriptions automatically.",
        manual: M.createConfigure,
      },
      {
        title: "Create the Billing attribute",
        description:
          "On the Attributes tab add an attribute (e.g. ‘Billing’) with values Monthly and Annual, and tick ‘Used for variations’.",
        manual: M.createConfigure,
      },
      {
        title: "Configure each variation",
        description:
          "Generate variations, then set the Monthly variation to $29 / Month / 1 and the Annual variation to $249 / Year / 1. Add per-variation trials if desired.",
        manual: M.createConfigure,
      },
      {
        title: "Optional — enable switching between them",
        description:
          "With Pro plan switching, allow customers to move between monthly and annual with automatic proration.",
        manual: M.planSwitching,
      },
    ],
    notes: [
      "You can’t mix subscription and non-subscription variations — enabling Subscription on the parent applies to all variations.",
      "Each variation has a full, independent set of subscription fields (price, cycle, trial, signup fee, renewal price).",
      "Set the annual price below 12× the monthly price to make the annual saving obvious.",
    ],
    faq: [
      {
        question: "Can each option have a different trial?",
        answer:
          "Yes. Every variation has its own trial length and period — for example, a 14-day trial on monthly and a 30-day trial on annual.",
      },
      {
        question: "Can customers switch from monthly to annual later?",
        answer:
          "Yes, with Pro plan switching enabled. The switch is prorated automatically from the customer portal.",
      },
    ],
    relatedFeatures: ["subscription-products", "billing-and-renewals", "customer-portal"],
    relatedRecipes: ["annual-prepaid", "tiered-bronze-silver-gold", "free-tier-plus-paid"],
  },
  {
    slug: "quarterly-billing",
    group: "recurring-billing",
    icon: CalendarRange,
    name: "Quarterly billing",
    cardDescription:
      "Bill every three months — a middle ground between monthly and annual that lifts average commitment.",
    tier: "Free",
    seoTitle: "Quarterly (Every 3 Months) Subscription Billing on WooCommerce",
    metaDescription:
      "Set up a WooCommerce subscription that bills every 3 months using the billing interval. Exact ArraySubs settings for quarterly recurring billing.",
    h1: "Quarterly subscription billing",
    heroSubtitle:
      "Charge every three months — fewer transactions than monthly, less commitment than annual, and a natural fit for seasonal services.",
    heroHighlights: ["Bills every 3 months", "Interval-based, no add-on", "Great for seasonal plans"],
    intro:
      "==Quarterly billing== charges every three months — a sweet spot that ==cuts transaction count by two-thirds== versus monthly while asking less upfront than annual. ArraySubs builds it by combining a ==Month billing period with an interval of 3==. There is no separate ‘quarterly’ option; the period + interval combo expresses any cadence you need. This recipe sets up a clean every-3-months plan.",
    settings: [
      { setting: "Regular price", value: "$75.00 (per quarter)", where: "Product → General tab" },
      { setting: "Subscription", value: "Enabled", where: "Product data panel" },
      { setting: "Billing Period", value: "Month", where: "Subscription tab" },
      { setting: "Billing Interval", value: "3", where: "Subscription tab" },
      { setting: "Subscription Length", value: "0 (renews)", where: "Subscription tab" },
    ],
    outcomes: [
      "Customer is charged $75.00 every 3 months.",
      "Four renewals a year instead of twelve.",
      "Lower upfront ask than an annual plan.",
      "Works with trials, signup fees, and renewal pricing.",
    ],
    bestFor: [
      "Seasonal services and quarterly boxes",
      "Plans that want fewer renewals than monthly",
      "Coaching or retainers billed per quarter",
    ],
    steps: [
      {
        title: "Set the quarterly price",
        description:
          "Create the product and set Regular price to the per-quarter amount ($75.00).",
        manual: M.createConfigure,
      },
      {
        title: "Set period and interval",
        description:
          "In the Subscription tab set Billing Period = Month and Billing Interval = 3 — that’s ‘every 3 months’.",
        manual: M.createConfigure,
      },
      {
        title: "Confirm the schedule",
        description:
          "Check the product page shows the every-3-months cadence and that the next renewal date lands one quarter out.",
        manual: M.renewals,
      },
    ],
    notes: [
      "Billing Interval accepts 1–12, so you can also build every-2-months (Month/2) or every-6-months (Month/6).",
      "For exact-quarter alignment across customers, renewal sync (used in box businesses) can batch renewals to one date.",
      "The price you enter is the full per-quarter charge, not a monthly equivalent.",
    ],
    faq: [
      {
        question: "Is there a dedicated ‘quarterly’ setting?",
        answer:
          "No — you express quarterly as Billing Period = Month and Billing Interval = 3. The same approach builds any cadence.",
      },
      {
        question: "Can I bill every 6 months instead?",
        answer:
          "Yes. Set Billing Period = Month and Billing Interval = 6 for semi-annual billing.",
      },
    ],
    relatedFeatures: ["subscription-products", "billing-and-renewals"],
    relatedRecipes: ["biweekly-billing", "annual-prepaid", "prepaid-fixed-cycles"],
  },
  {
    slug: "biweekly-billing",
    group: "recurring-billing",
    icon: Repeat,
    name: "Weekly & biweekly billing",
    cardDescription:
      "Charge every week or every two weeks for high-frequency products like meal kits or rentals.",
    tier: "Free",
    seoTitle: "Weekly and Biweekly Subscription Billing on WooCommerce",
    metaDescription:
      "Set up weekly or every-2-weeks WooCommerce subscription billing using the week period and interval. Exact ArraySubs settings for high-frequency recurring plans.",
    h1: "Weekly and biweekly billing",
    heroSubtitle:
      "For meal kits, fresh goods, and rentals — bill every week or every two weeks with a simple period-and-interval combination.",
    heroHighlights: ["Weekly or every 2 weeks", "Ideal for fresh/perishable", "Interval-based"],
    intro:
      "High-frequency products — ==meal kits, fresh produce, pet food, rentals== — need a billing cadence faster than monthly. ArraySubs supports ==weekly and biweekly billing== with the Week period: interval 1 bills weekly, interval 2 bills every two weeks. This recipe shows both, so you can match the rhythm of how your product is actually consumed.",
    settings: [
      { setting: "Regular price", value: "$35.00 (per delivery)", where: "Product → General tab" },
      { setting: "Subscription", value: "Enabled", where: "Product data panel" },
      { setting: "Billing Period", value: "Week", where: "Subscription tab" },
      {
        setting: "Billing Interval",
        value: "1 (weekly) or 2 (biweekly)",
        where: "Subscription tab",
      },
      { setting: "Subscription Length", value: "0 (renews)", where: "Subscription tab" },
    ],
    outcomes: [
      "Weekly (interval 1) or every-two-weeks (interval 2) billing.",
      "Matches the consumption rhythm of fresh and rental goods.",
      "Pairs with skip & pause for travel weeks.",
      "Renewal sync can batch deliveries to one shipping day.",
    ],
    bestFor: [
      "Meal kits and fresh-food boxes",
      "Rentals and equipment hire",
      "Any product consumed weekly",
    ],
    steps: [
      {
        title: "Set the per-delivery price",
        description:
          "Create the product and set Regular price to the per-delivery amount ($35.00).",
        manual: M.createConfigure,
      },
      {
        title: "Choose weekly or biweekly",
        description:
          "Set Billing Period = Week, then Billing Interval = 1 for weekly or 2 for every two weeks.",
        manual: M.createConfigure,
      },
      {
        title: "Add skip & pause for flexibility",
        description:
          "Enable skip and pause so customers can skip a delivery week without cancelling.",
        manual: M.grace,
      },
    ],
    notes: [
      "Weekly billing means weekly renewal jobs — make sure automatic payments are configured to avoid manual collection.",
      "Day-level billing is also possible (Billing Period = Day) for very high frequency.",
      "Pair with subscription shipping (Pro) for recurring shipping costs.",
    ],
    faq: [
      {
        question: "How do I bill every two weeks?",
        answer:
          "Set Billing Period = Week and Billing Interval = 2. Interval 1 is weekly, 2 is biweekly, 4 is roughly monthly-on-weeks.",
      },
      {
        question: "Can customers skip a week?",
        answer:
          "Yes. Enable skip in Skip & Pause settings; customers can skip the next delivery up to the cutoff days before renewal.",
      },
    ],
    relatedFeatures: ["subscription-products", "billing-and-renewals", "subscription-shipping"],
    relatedRecipes: ["quarterly-billing", "skip-and-pause-enabled", "daily-billing"],
  },
  {
    slug: "prepaid-fixed-cycles",
    group: "recurring-billing",
    icon: Hash,
    name: "Prepaid run that auto-ends",
    cardDescription:
      "Sell a fixed number of billing cycles that ends automatically — e.g. a 6-payment plan that stops after the 6th charge.",
    tier: "Free",
    seoTitle: "Fixed-Length Subscription That Auto-Ends on WooCommerce",
    metaDescription:
      "Sell a subscription that runs for a set number of billing cycles and then ends automatically, using Subscription Length. Exact ArraySubs settings for a 6-cycle plan.",
    h1: "Prepaid run that ends after N cycles",
    heroSubtitle:
      "Charge a set number of times, then stop automatically — perfect for installment plans, fixed courses, or limited box runs.",
    heroHighlights: ["Ends after N charges", "No manual cancellation", "Great for installments"],
    intro:
      "Sometimes a subscription should ==stop on its own== after a set number of payments — a ==6-month course, a 12-payment installment plan, or a limited box run==. ArraySubs handles this with ==Subscription Length==: set it to the number of billing cycles and the subscription expires automatically after the final charge. This recipe builds a plan that bills monthly for 6 cycles, then ends.",
    settings: [
      { setting: "Regular price", value: "$40.00", where: "Product → General tab" },
      { setting: "Subscription", value: "Enabled", where: "Product data panel" },
      { setting: "Billing Period", value: "Month", where: "Subscription tab" },
      { setting: "Billing Interval", value: "1", where: "Subscription tab" },
      {
        setting: "Subscription Length",
        value: "6 (cycles, then expires)",
        where: "Subscription tab",
      },
    ],
    outcomes: [
      "Customer is charged $40.00 a month, six times.",
      "After the 6th payment, the subscription expires automatically.",
      "No need for the customer to cancel.",
      "Works for installments, fixed courses, and limited runs.",
    ],
    bestFor: [
      "Installment / pay-over-time plans",
      "Fixed-length courses and programs",
      "Limited subscription-box runs",
    ],
    steps: [
      {
        title: "Set price and monthly cadence",
        description:
          "Create the product, set Regular price $40.00, enable Subscription, Billing Period = Month, Interval = 1.",
        manual: M.createConfigure,
      },
      {
        title: "Set the number of cycles",
        description:
          "Set Subscription Length = 6. The subscription will charge six times and then expire automatically.",
        manual: M.createConfigure,
      },
      {
        title: "Confirm the end behaviour",
        description:
          "Review lifecycle behaviour so you know the subscription moves to Expired (not Cancelled) after the final cycle.",
        manual: M.renewals,
      },
    ],
    notes: [
      "Subscription Length accepts 0–365; 0 means it never expires.",
      "A trial does not count toward the cycle count — six paid cycles still bill after any trial converts.",
      "For a single charge that doesn’t renew at all, use Subscription Length = 1 or a Lifetime Deal.",
    ],
    faq: [
      {
        question: "Does the subscription cancel or expire after the last cycle?",
        answer:
          "It expires automatically after the final billing cycle — no manual cancellation needed, and it’s recorded as Expired, not Cancelled.",
      },
      {
        question: "Can I do a 12-payment installment plan?",
        answer:
          "Yes. Set Subscription Length = 12 with monthly billing for a 12-payment plan that ends after the final charge.",
      },
    ],
    relatedFeatures: ["subscription-products", "billing-and-renewals"],
    relatedRecipes: ["lifetime-deal-one-time", "annual-prepaid", "quarterly-billing"],
  },
  {
    slug: "lifetime-deal-one-time",
    group: "recurring-billing",
    icon: InfinityIcon,
    name: "Lifetime deal (one-time)",
    cardDescription:
      "Sell permanent access for a single payment with no renewals — the classic ‘lifetime deal’ offer.",
    tier: "Free",
    seoTitle: "Lifetime Deal (One-Time Payment) on WooCommerce Subscriptions",
    metaDescription:
      "Sell a lifetime deal — one payment, permanent access, no recurring billing — using the Lifetime Deal billing period in ArraySubs. Exact settings and caveats inside.",
    h1: "Lifetime deal — one payment, no renewals",
    heroSubtitle:
      "Collect a single payment for permanent access. The customer pays once and never renews — ideal for launch promos and AppSumo-style deals.",
    heroHighlights: ["One payment", "Permanent access", "No renewals ever"],
    intro:
      "A ==lifetime deal== collects a ==single payment for permanent access== — no renewals, no recurring charges. It’s a powerful launch and cash-injection tactic. ArraySubs has a dedicated ==Lifetime Deal billing period==: the customer pays once, gets the product as a managed subscription record (so access control and member tooling still apply), and is never billed again. This recipe sets one up.",
    settings: [
      { setting: "Regular price", value: "$299.00 (one-time)", where: "Product → General tab" },
      { setting: "Subscription", value: "Enabled", where: "Product data panel" },
      {
        setting: "Billing Period",
        value: "Lifetime Deal",
        where: "Subscription tab",
      },
      {
        setting: "Billing Interval",
        value: "1 (forced, locked)",
        where: "Subscription tab",
      },
      {
        setting: "Subscription Length",
        value: "Ignored for lifetime",
        where: "Subscription tab",
      },
    ],
    outcomes: [
      "Customer pays $299.00 once and is never charged again.",
      "Access is permanent — no renewal date, no dunning.",
      "Still managed as a subscription, so access rules and roles apply.",
      "Perfect for launch, AppSumo-style, and founder deals.",
    ],
    bestFor: [
      "Launch and early-adopter promotions",
      "AppSumo / deal-site style offers",
      "Products where permanent access is the pitch",
    ],
    steps: [
      {
        title: "Set the one-time price",
        description:
          "Create the product and set Regular price to the lifetime amount ($299.00).",
        manual: M.createConfigure,
      },
      {
        title: "Choose the Lifetime Deal period",
        description:
          "In the Subscription tab set Billing Period = Lifetime Deal. The interval is forced to 1 and subscription length is ignored.",
        manual: M.createConfigure,
      },
      {
        title: "Confirm no renewal is scheduled",
        description:
          "Verify the product page shows a one-time purchase and that no next-payment date is set on the resulting subscription.",
        manual: M.productExperience,
      },
    ],
    notes: [
      "A Lifetime Deal collects one payment and never renews; the billing interval can’t be changed.",
      "Because it’s still a subscription record, Member Access rules and role mapping continue to gate content for lifetime buyers.",
      "Lifetime deals are popular but commit you to ongoing service for a one-time fee — price accordingly.",
    ],
    faq: [
      {
        question: "Will the customer ever be billed again?",
        answer:
          "No. A Lifetime Deal is a single payment with no renewals. No next-payment date is scheduled and no dunning ever runs.",
      },
      {
        question: "Do access rules still work for lifetime buyers?",
        answer:
          "Yes. The purchase is recorded as an active subscription, so Member Access content rules and role mapping continue to apply.",
      },
    ],
    relatedFeatures: ["subscription-products", "member-access"],
    relatedRecipes: ["prepaid-fixed-cycles", "founding-member-locked-price", "free-tier-plus-paid"],
  },
  {
    slug: "free-tier-plus-paid",
    group: "recurring-billing",
    icon: Layers3,
    name: "Free tier + paid upgrade",
    cardDescription:
      "Offer a $0 ‘free forever’ tier alongside a paid tier on one product — the freemium model.",
    tier: "Free",
    seoTitle: "Freemium: Free Tier Plus Paid Upgrade on WooCommerce",
    metaDescription:
      "Build a freemium model on WooCommerce — a $0 free-forever tier and a paid upgrade tier on one product using subscription variations. Exact ArraySubs settings inside.",
    h1: "Free tier plus a paid upgrade",
    heroSubtitle:
      "Let people start on a free-forever plan, then upgrade to paid for more — the freemium funnel, built with subscription variations.",
    heroHighlights: ["$0 free-forever tier", "Paid upgrade tier", "One-click upgrade path"],
    intro:
      "The ==freemium model== — a ==free-forever tier plus a paid upgrade== — is the dominant SaaS funnel because it removes all signup friction and then upsells. ArraySubs builds it with ==variable subscriptions==: a $0 Free variation that still creates a managed subscription (so you can gate features), and a paid variation customers upgrade into. This recipe sets up Free vs Pro on one product.",
    settings: [
      { setting: "Product type", value: "Variable subscription", where: "Product data panel" },
      { setting: "Attribute", value: "Plan → Free | Pro", where: "Attributes tab" },
      {
        setting: "Free variation",
        value: "$0.00 · Month · Interval 1",
        where: "Variations tab",
      },
      {
        setting: "Pro variation",
        value: "$29.00 · Month · Interval 1",
        where: "Variations tab",
      },
      {
        setting: "Feature gating",
        value: "Member Access rules / Feature Manager (Pro)",
        where: "Member Access / Feature Manager",
      },
    ],
    outcomes: [
      "A $0 tier that creates a real subscription record for gating.",
      "A paid tier customers can upgrade into with proration.",
      "Feature differences enforced by access rules or Feature Manager.",
      "Classic free-to-paid funnel on a single product page.",
    ],
    bestFor: [
      "SaaS and digital tools with a free plan",
      "Communities with free and premium tiers",
      "Any product using free-to-paid conversion",
    ],
    steps: [
      {
        title: "Create a variable subscription",
        description:
          "Set product type to Variable product and enable Subscription so all variations are subscriptions.",
        manual: M.createConfigure,
      },
      {
        title: "Add Free and Pro variations",
        description:
          "Create a Plan attribute with Free and Pro values. Set Free to $0.00 / Month and Pro to $29.00 / Month.",
        manual: M.createConfigure,
      },
      {
        title: "Gate the difference",
        description:
          "Use Member Access rules (free) or Feature Manager (Pro) to control what each tier unlocks.",
        manual: M.planSwitching,
      },
      {
        title: "Enable upgrades",
        description:
          "With Pro plan switching, let Free users upgrade to Pro from the customer portal.",
        manual: M.planSwitching,
      },
    ],
    notes: [
      "A $0 variation still creates a subscription, which is what lets you gate features and later upgrade the customer.",
      "Pair with ‘auto-downgrade on trial expiry’ so lapsed trials land on the Free tier instead of cancelling.",
      "Require Payment Method can be off for the free tier to keep signup frictionless.",
    ],
    faq: [
      {
        question: "Does a $0 plan create a subscription?",
        answer:
          "Yes. The free tier creates a managed subscription record at $0, which is what enables feature gating and a clean upgrade path to paid.",
      },
      {
        question: "How do I limit what free users can do?",
        answer:
          "Use Member Access rules to gate pages, downloads, and content, or Feature Manager (Pro) to define per-plan numeric limits and toggles.",
      },
    ],
    relatedFeatures: ["subscription-products", "feature-manager", "member-access"],
    relatedRecipes: ["auto-downgrade-on-trial-expiry", "monthly-vs-annual-variable", "tiered-bronze-silver-gold"],
  },
  {
    slug: "founding-member-locked-price",
    group: "recurring-billing",
    icon: Crown,
    name: "Founding-member locked price",
    cardDescription:
      "Lock early subscribers into a low price forever, even after you raise prices for everyone else.",
    tier: "Free",
    seoTitle: "Founding-Member Price Lock on WooCommerce Subscriptions",
    metaDescription:
      "Reward early subscribers with a price locked in for life. Learn how ArraySubs price lock-in works and the exact settings for a founding-member offer.",
    h1: "Founding-member price, locked for life",
    heroSubtitle:
      "Give early adopters a price that never goes up — even when you raise prices later — using ArraySubs’ automatic price lock-in.",
    heroHighlights: ["Early price locked forever", "Automatic on purchase", "Raise prices risk-free"],
    intro:
      "A ==founding-member offer== rewards early subscribers with a ==price locked in for life==. The mechanic is built into ArraySubs: ==subscription prices are locked at the time of purchase==, so when you raise the product price later, existing subscribers keep paying their original rate — only new subscribers get the new price. This recipe shows how to run a founding-member launch and then raise prices with zero disruption.",
    settings: [
      {
        setting: "Regular price (launch)",
        value: "$15.00 (founding rate)",
        where: "Product → General tab",
      },
      { setting: "Subscription", value: "Enabled", where: "Product data panel" },
      { setting: "Billing Period", value: "Month", where: "Subscription tab" },
      { setting: "Billing Interval", value: "1", where: "Subscription tab" },
      { setting: "Subscription Length", value: "0 (renews)", where: "Subscription tab" },
      {
        setting: "Later price change",
        value: "Raise Regular price (affects new subs only)",
        where: "Product → General tab",
      },
    ],
    outcomes: [
      "Founding members lock in $15.00/month for as long as they stay subscribed.",
      "Raising the price later only affects new subscribers.",
      "No coupons or manual tracking needed — lock-in is automatic.",
      "A genuine scarcity/urgency hook for launch.",
    ],
    bestFor: [
      "Launches that want early-adopter urgency",
      "Plans that intend to raise prices over time",
      "Building a loyal founding cohort",
    ],
    steps: [
      {
        title: "Launch at the founding price",
        description:
          "Set the Regular price to your founding rate ($15.00) and open the plan to early subscribers.",
        manual: M.createConfigure,
      },
      {
        title: "Promote the price-lock promise",
        description:
          "Tell early subscribers their rate is locked for life — this is true because prices lock at purchase time.",
        manual: M.productExperience,
      },
      {
        title: "Raise the price when ready",
        description:
          "Later, increase the Regular price. Existing founding subscribers keep $15.00; only new subscriptions use the new price.",
        manual: M.createConfigure,
      },
    ],
    notes: [
      "Price lock-in is automatic: changing the product price never retroactively updates existing subscriptions.",
      "If a sale price was active at purchase, that sale price becomes the locked-in recurring amount.",
      "Plan switching or admin edits can change a subscription’s price if you ever need to override the lock.",
    ],
    faq: [
      {
        question: "How is the price actually locked?",
        answer:
          "ArraySubs stores the price on the subscription at purchase. Editing the product price afterward only affects new subscriptions — existing ones keep their original locked rate.",
      },
      {
        question: "What if I run a sale during the founding launch?",
        answer:
          "If a scheduled sale price is active when a customer subscribes, that sale price becomes their locked-in recurring amount going forward.",
      },
    ],
    relatedFeatures: ["subscription-products", "billing-and-renewals"],
    relatedRecipes: ["annual-prepaid", "lifetime-deal-one-time", "intro-pricing-step-up"],
  },
  {
    slug: "tiered-bronze-silver-gold",
    group: "recurring-billing",
    icon: LayoutGrid,
    name: "Bronze / Silver / Gold tiers",
    cardDescription:
      "Offer three good-better-best tiers on one product, each with its own price and what’s-included list.",
    tier: "Free + Pro",
    seoTitle: "Bronze, Silver, Gold Subscription Tiers on WooCommerce",
    metaDescription:
      "Build good-better-best subscription tiers on one WooCommerce product with variable subscriptions, and show what each tier includes with Feature Manager. Exact settings inside.",
    h1: "Bronze, Silver, and Gold tiers",
    heroSubtitle:
      "Present three price points on one product page, each with its own cycle and an at-a-glance ‘what’s included’ list.",
    heroHighlights: ["3 good-better-best tiers", "Per-tier pricing", "‘What’s included’ list (Pro)"],
    intro:
      "==Good-better-best tiering== — Bronze, Silver, Gold — is the most reliable way to lift average revenue: most buyers pick the middle, and a few self-select up. ArraySubs builds three tiers as ==variable subscriptions== (each variation a tier with its own price and cycle), and ==Feature Manager (Pro)== renders a ‘what’s included’ comparison so the upgrade is obvious. This recipe sets up three tiers.",
    settings: [
      { setting: "Product type", value: "Variable subscription", where: "Product data panel" },
      { setting: "Attribute", value: "Tier → Bronze | Silver | Gold", where: "Attributes tab" },
      { setting: "Bronze", value: "$19.00 · Month · 1", where: "Variations tab" },
      { setting: "Silver", value: "$39.00 · Month · 1", where: "Variations tab" },
      { setting: "Gold", value: "$79.00 · Month · 1", where: "Variations tab" },
      {
        setting: "Per-tier entitlements",
        value: "Feature Manager toggles & limits (Pro)",
        where: "Feature Manager",
      },
    ],
    outcomes: [
      "Three price points presented on a single product page.",
      "Each tier carries its own price, cycle, and trial.",
      "Feature Manager shows a per-tier ‘what’s included’ list.",
      "Customers can switch tiers with proration (Pro).",
    ],
    bestFor: [
      "SaaS and services with good-better-best pricing",
      "Memberships with escalating perks",
      "Any plan that wants to anchor on a middle tier",
    ],
    steps: [
      {
        title: "Create a variable subscription",
        description:
          "Set product type to Variable product, enable Subscription, and add a Tier attribute with Bronze, Silver, Gold.",
        manual: M.createConfigure,
      },
      {
        title: "Price each tier",
        description:
          "Set Bronze $19, Silver $39, Gold $79 — all Month / Interval 1 (or mix cycles per tier).",
        manual: M.createConfigure,
      },
      {
        title: "Define what each tier includes",
        description:
          "Use Feature Manager (Pro) to set per-tier toggles and numeric limits, rendered as a ‘what’s included’ list on the product page.",
        manual: M.planSwitching,
      },
      {
        title: "Enable tier switching",
        description:
          "Configure plan switching so customers can upgrade or downgrade between tiers with automatic proration.",
        manual: M.planSwitching,
      },
    ],
    notes: [
      "Feature Manager is Pro; without it you can still tier prices and gate content with free Member Access rules.",
      "Each tier’s subscription fields are independent — you can give Gold an annual option too.",
      "Anchor pricing works best when the middle tier is the obvious value pick.",
    ],
    faq: [
      {
        question: "Do I need Pro for tiers?",
        answer:
          "No — variable subscriptions (free) build the tiers and pricing. Feature Manager (Pro) adds the per-tier ‘what’s included’ display and numeric entitlements.",
      },
      {
        question: "Can customers move between tiers?",
        answer:
          "Yes, with Pro plan switching. Upgrades and downgrades are prorated automatically from the customer portal.",
      },
    ],
    relatedFeatures: ["subscription-products", "feature-manager", "member-access"],
    relatedRecipes: ["free-tier-plus-paid", "monthly-vs-annual-variable", "downgrade-offer"],
  },
  {
    slug: "daily-billing",
    group: "recurring-billing",
    icon: Sun,
    name: "Daily billing",
    cardDescription:
      "Charge every day or every few days for very high-frequency access or rentals.",
    tier: "Free",
    seoTitle: "Daily Subscription Billing on WooCommerce",
    metaDescription:
      "Set up daily or every-few-days WooCommerce subscription billing using the day period and interval. Exact ArraySubs settings for high-frequency recurring access.",
    h1: "Daily subscription billing",
    heroSubtitle:
      "For day passes, short-term rentals, and high-frequency access — bill every day or every few days with the Day billing period.",
    heroHighlights: ["Bills daily", "Or every N days", "Day passes & rentals"],
    intro:
      "Some products bill ==by the day== — day passes, short-term equipment rentals, or pay-as-you-go access. ArraySubs supports ==daily billing== with the Day period: interval 1 charges every day, and higher intervals charge every few days. This recipe sets up a clean daily plan; it’s the highest-frequency cadence ArraySubs offers.",
    settings: [
      { setting: "Regular price", value: "$3.00 (per day)", where: "Product → General tab" },
      { setting: "Subscription", value: "Enabled", where: "Product data panel" },
      { setting: "Billing Period", value: "Day", where: "Subscription tab" },
      {
        setting: "Billing Interval",
        value: "1 (daily) or e.g. 7 (weekly-by-days)",
        where: "Subscription tab",
      },
      { setting: "Subscription Length", value: "0 (renews)", where: "Subscription tab" },
    ],
    outcomes: [
      "Customer is charged $3.00 every day.",
      "Higher intervals bill every few days (e.g. Day/7).",
      "Suited to day passes and short rentals.",
      "Combine with a fixed length to cap the run.",
    ],
    bestFor: [
      "Day passes and short-term access",
      "Equipment and short-term rentals",
      "Pay-as-you-go style access",
    ],
    steps: [
      {
        title: "Set the daily price",
        description:
          "Create the product and set Regular price to the per-day amount ($3.00).",
        manual: M.createConfigure,
      },
      {
        title: "Set the Day period",
        description:
          "Set Billing Period = Day and Billing Interval = 1 for daily billing (or a higher interval for every-N-days).",
        manual: M.createConfigure,
      },
      {
        title: "Automate collection",
        description:
          "Daily billing means daily renewal jobs — connect automatic payments so charges collect without manual work.",
        manual: M.autopay,
      },
    ],
    notes: [
      "Daily billing generates frequent renewal orders and emails — automatic payments are strongly recommended.",
      "Cap the run with Subscription Length if you want, e.g. a 30-day pass (Day/1, Length 30).",
      "Renewal reminder timing should be short for daily plans to avoid spamming customers.",
    ],
    faq: [
      {
        question: "Can I bill every 10 days?",
        answer:
          "Yes. Set Billing Period = Day and Billing Interval = 10. Any interval from 1–12 works with the Day period.",
      },
      {
        question: "Won’t daily billing send a lot of emails?",
        answer:
          "It can. Tune renewal reminder timing short (or disable reminders) for daily plans, and rely on automatic payments to keep it hands-off.",
      },
    ],
    relatedFeatures: ["subscription-products", "billing-and-renewals", "checkout-and-payments"],
    relatedRecipes: ["biweekly-billing", "prepaid-fixed-cycles", "quarterly-billing"],
  },
  {
    slug: "high-signup-low-monthly",
    group: "recurring-billing",
    icon: Receipt,
    name: "High setup fee, low monthly",
    cardDescription:
      "Front-load an onboarding or installation fee, then keep the recurring price low — e.g. $99 setup + $29/mo.",
    tier: "Free",
    seoTitle: "High Setup Fee With a Low Monthly Subscription on WooCommerce",
    metaDescription:
      "Charge a large one-time setup or installation fee at checkout, then a low recurring monthly price. Exact ArraySubs settings for a $99 setup + $29/month plan.",
    h1: "High setup fee, low monthly fee",
    heroSubtitle:
      "Cover real onboarding or installation costs upfront with a substantial signup fee, then keep the recurring price attractively low.",
    heroHighlights: ["$99 one-time setup", "$29/mo recurring", "Covers onboarding cost"],
    intro:
      "When getting a customer started has a ==real upfront cost== — installation, hardware, onboarding labour — you front-load it with a ==large signup fee== and keep the recurring price low to stay competitive. This is the same mechanic as the basic signup-fee recipe, tuned for a ==high fee, low monthly== shape: $99 setup + $29/month. The signup fee is charged once at checkout; the recurring price never includes it.",
    settings: [
      { setting: "Regular price", value: "$29.00", where: "Product → General tab" },
      { setting: "Subscription", value: "Enabled", where: "Product data panel" },
      { setting: "Billing Period", value: "Month", where: "Subscription tab" },
      { setting: "Billing Interval", value: "1", where: "Subscription tab" },
      { setting: "Sign-up Fee", value: "$99.00", where: "Subscription tab" },
      { setting: "Subscription Length", value: "0 (renews)", where: "Subscription tab" },
    ],
    outcomes: [
      "First order charges $128.00 ($29 first month + $99 setup).",
      "Every renewal is a low $29.00.",
      "Onboarding/installation cost is recovered immediately.",
      "Low recurring price keeps you competitive.",
    ],
    bestFor: [
      "Installations and hardware-backed services",
      "Done-for-you onboarding with real upfront labour",
      "Agencies billing setup + retainer",
    ],
    steps: [
      {
        title: "Set the low recurring price",
        description:
          "Create the product with Regular price $29.00 and enable Subscription (Month / 1).",
        manual: M.createConfigure,
      },
      {
        title: "Add the large signup fee",
        description:
          "Enter 99 in Sign-up Fee. It’s charged once at checkout as a separate fee line and never repeats.",
        manual: M.createConfigure,
      },
      {
        title: "Verify the first-order total",
        description:
          "Confirm the cart shows $128.00 on the first order and $29.00 on renewals.",
        manual: M.productExperience,
      },
    ],
    notes: [
      "Identical mechanic to ‘signup fee + flat monthly’ — only the ratio differs (big fee, small recurring).",
      "Consider a short trial if you want customers to onboard before the recurring price starts.",
      "The signup fee follows your WooCommerce fee tax settings.",
    ],
    faq: [
      {
        question: "Can the signup fee be larger than several months of subscription?",
        answer:
          "Yes. The signup fee is independent of the recurring price and can be any amount — here it’s more than three months of the $29 fee.",
      },
      {
        question: "Is the setup fee refundable if they cancel early?",
        answer:
          "That’s a policy decision. The fee is a one-time charge; refunds are handled through WooCommerce/ArraySubs refund tools per your terms.",
      },
    ],
    relatedFeatures: ["subscription-products", "checkout-and-payments", "billing-and-renewals"],
    relatedRecipes: ["signup-fee-plus-flat-monthly", "trial-with-signup-fee", "loss-leader-first-period"],
  },
  {
    slug: "lenient-dunning-grace",
    group: "recurring-billing",
    icon: ShieldCheck,
    name: "Lenient failed-payment recovery",
    cardDescription:
      "Give customers a long, forgiving grace period after a failed payment before anything is cancelled.",
    tier: "Free",
    seoTitle: "Lenient Grace Period for Failed Subscription Payments on WooCommerce",
    metaDescription:
      "Configure a long, forgiving grace period for failed WooCommerce subscription renewals. Exact ArraySubs Active/On-Hold grace settings to recover more revenue.",
    h1: "Lenient failed-payment recovery",
    heroSubtitle:
      "Keep access on while you wait for payment — a long two-phase grace period recovers more revenue than fast cancellation.",
    heroHighlights: ["7-day active grace", "14-day on-hold grace", "21 days before cancel"],
    intro:
      "When a renewal payment fails, ArraySubs runs a ==two-phase grace period== instead of cancelling: the subscription stays Active for a while, then moves to On-Hold, and only cancels if the total grace window passes unpaid. A ==lenient configuration== (longer grace) ==recovers more revenue== because most failures are expired cards that customers fix within days. This recipe widens the grace window to 7 + 14 = 21 days.",
    settings: [
      {
        setting: "Active Grace Days",
        value: "7 (stays Active while retrying)",
        where: "General Settings → Renewals",
      },
      {
        setting: "On-Hold Grace Days",
        value: "14 (On-Hold before cancel)",
        where: "General Settings → Renewals",
      },
      {
        setting: "Total grace before cancel",
        value: "21 days (7 + 14)",
        where: "Derived",
      },
      {
        setting: "Invoice Timing",
        value: "6 hours (default) – 2 days",
        where: "General Settings → Renewals",
      },
    ],
    outcomes: [
      "Customer keeps access for 7 days after a failed charge.",
      "Then 14 days On-Hold with restricted access, still recoverable.",
      "Cancellation only after 21 unpaid days total.",
      "Paying at any point instantly restores the subscription.",
    ],
    bestFor: [
      "High-value plans where recovery beats fast cleanup",
      "Manual-payment stores where customers pay invoices by hand",
      "Audiences prone to expired-card failures",
    ],
    steps: [
      {
        title: "Open Renewals settings",
        description:
          "Go to ArraySubs → Settings → General Settings → Renewals.",
        manual: M.generalSettings,
      },
      {
        title: "Widen the grace windows",
        description:
          "Set Active Grace Days = 7 and On-Hold Grace Days = 14. The total grace before cancellation becomes 21 days.",
        manual: M.grace,
      },
      {
        title: "Confirm the recovery flow",
        description:
          "Review how a payment at any stage restores the subscription to Active and advances the next payment date.",
        manual: M.grace,
      },
    ],
    notes: [
      "Recommended ranges: Active Grace 1–7 days, On-Hold Grace 3–14 days.",
      "The overdue checker runs hourly, so transitions can lag the exact boundary by up to an hour.",
      "Make sure Member Access restricts On-Hold subscriptions, or paused-for-nonpayment customers keep full access.",
    ],
    faq: [
      {
        question: "What happens if the customer pays during grace?",
        answer:
          "The subscription is immediately restored to Active, the grace markers clear, and the next payment date advances by one cycle.",
      },
      {
        question: "Is the grace period global or per product?",
        answer:
          "Grace settings are global, configured once in General Settings → Renewals, and apply to all subscription products.",
      },
    ],
    relatedFeatures: ["billing-and-renewals", "checkout-and-payments", "emails"],
    relatedRecipes: ["strict-dunning-grace", "auto-downgrade-on-failed-payment", "stripe-automatic-billing-sca"],
  },
  {
    slug: "strict-dunning-grace",
    group: "recurring-billing",
    icon: ShieldAlert,
    name: "Strict failed-payment cleanup",
    cardDescription:
      "Cancel non-paying subscriptions quickly with a short grace period to keep your active base clean.",
    tier: "Free",
    seoTitle: "Strict Grace Period for Failed Subscription Payments on WooCommerce",
    metaDescription:
      "Configure a short grace period that cancels unpaid WooCommerce subscriptions quickly. Exact ArraySubs Active/On-Hold grace settings for a clean active base.",
    h1: "Strict failed-payment cleanup",
    heroSubtitle:
      "Don’t carry deadweight — a short two-phase grace period restricts access fast and cancels non-payers quickly.",
    heroHighlights: ["1-day active grace", "3-day on-hold grace", "4 days before cancel"],
    intro:
      "If your product has a ==hard marginal cost== per active subscriber (seats, compute, shipping commitments), you want non-payers ==off the books fast==. This recipe tightens the ==two-phase grace period== to the minimum sensible window — 1 day Active, 3 days On-Hold — so access is restricted almost immediately and the subscription cancels after 4 unpaid days. It’s the mirror image of the lenient recipe.",
    settings: [
      {
        setting: "Active Grace Days",
        value: "1 (brief Active window)",
        where: "General Settings → Renewals",
      },
      {
        setting: "On-Hold Grace Days",
        value: "3 (short On-Hold)",
        where: "General Settings → Renewals",
      },
      {
        setting: "Total grace before cancel",
        value: "4 days (1 + 3)",
        where: "Derived",
      },
    ],
    outcomes: [
      "Access is restricted after just 1 day unpaid.",
      "Subscription cancels after 4 unpaid days total.",
      "Active base stays clean — no long deadweight.",
      "Best paired with automatic payments to minimise false failures.",
    ],
    bestFor: [
      "Per-seat or metered products with real marginal cost",
      "Shipping commitments you can’t carry for non-payers",
      "Automatic-payment stores with reliable card capture",
    ],
    steps: [
      {
        title: "Open Renewals settings",
        description:
          "Go to ArraySubs → Settings → General Settings → Renewals.",
        manual: M.generalSettings,
      },
      {
        title: "Tighten the grace windows",
        description:
          "Set Active Grace Days = 1 and On-Hold Grace Days = 3 for a 4-day total grace window before cancellation.",
        manual: M.grace,
      },
      {
        title: "De-risk false failures",
        description:
          "Because the window is short, use automatic payments (Stripe) so genuine cards don’t get cancelled over a slow manual invoice.",
        manual: M.autopay,
      },
    ],
    notes: [
      "Too short a window risks cancelling customers who would have paid — only use this when marginal cost justifies it.",
      "Manual-payment subscriptions need time to pay an invoice; strict grace suits automatic payments best.",
      "The overdue checker runs hourly, so cancellation can lag the 4-day mark by up to an hour.",
    ],
    faq: [
      {
        question: "Won’t a short grace period lose recoverable customers?",
        answer:
          "It can, which is why strict grace is for products with real per-subscriber costs. For most stores, the lenient recipe recovers more revenue.",
      },
      {
        question: "What’s the minimum I can set?",
        answer:
          "The recommended minimums are Active Grace 1 day and On-Hold Grace 3 days. Going lower risks cancelling customers mid-recovery.",
      },
    ],
    relatedFeatures: ["billing-and-renewals", "checkout-and-payments"],
    relatedRecipes: ["lenient-dunning-grace", "auto-downgrade-on-failed-payment", "stripe-automatic-billing-sca"],
  },
  {
    slug: "auto-downgrade-on-trial-expiry",
    group: "recurring-billing",
    icon: ChevronsDown,
    name: "Trial → auto-downgrade to free",
    cardDescription:
      "When a trial ends without payment, automatically move the customer to a free plan instead of cancelling.",
    tier: "Pro",
    seoTitle: "Auto-Downgrade a Trial to a Free Plan on WooCommerce (Pro)",
    metaDescription:
      "Automatically switch an unconverted trial to a free plan instead of cancelling, using ArraySubs Pro plan switching. Exact settings for trial auto-downgrade.",
    h1: "Auto-downgrade a trial to free",
    heroSubtitle:
      "Don’t lose unconverted trials — automatically move them to a free tier so they stay in your ecosystem and can upgrade later.",
    heroHighlights: ["Trial → Free, automatic", "Keeps lapsed trials as users", "Pro plan switching"],
    intro:
      "Most trials don’t convert — but cancelling them ==throws away the relationship==. With ==auto-downgrade on trial expiry (Pro)==, an unconverted trial automatically ==switches to your free tier== instead of cancelling, so the customer keeps a (limited) account and a one-click path to upgrade later. This recipe links a Premium trial to a Free plan and turns on auto-downgrade at trial expiry.",
    settings: [
      {
        setting: "Trial on Premium product",
        value: "e.g. 14-day trial",
        where: "Premium product → Subscription tab",
      },
      {
        setting: "Linked downgrade product",
        value: "Free plan ($0)",
        where: "Product → Linked Products",
      },
      {
        setting: "Auto-downgrade timing",
        value: "On trial expire",
        where: "Plan switching settings (Pro)",
      },
      {
        setting: "Require Payment Method",
        value: "Off (no card needed for a soft trial)",
        where: "General Settings → Trials",
      },
    ],
    outcomes: [
      "Unconverted trials move to the Free tier automatically.",
      "Customer keeps an account and can upgrade anytime.",
      "An Auto Downgrade email explains the change.",
      "No silent cancellation, no lost relationship.",
    ],
    bestFor: [
      "Freemium SaaS with a trial of the paid tier",
      "Products that want to retain lapsed trials",
      "Any plan with a meaningful free tier",
    ],
    steps: [
      {
        title: "Create Free and Premium products",
        description:
          "Build a $0 Free plan and a paid Premium plan (with a trial) — see the freemium recipe for the tier setup.",
        manual: M.createConfigure,
      },
      {
        title: "Link the downgrade path",
        description:
          "On the Premium product’s Linked Products, set the Free plan as the downgrade target.",
        manual: M.planSwitching,
      },
      {
        title: "Enable auto-downgrade on trial expiry",
        description:
          "Turn on auto-downgrade with timing ‘on trial expire’ so unconverted trials switch to Free during the daily conversion job.",
        manual: M.trial,
      },
    ],
    notes: [
      "Requires the Pro plugin and configured plan switching with a downgrade path.",
      "The Auto Downgrade email replaces the Trial Converted email when downgrade handles the conversion.",
      "Pair with a no-card trial so the soft landing on Free needs no payment details.",
    ],
    faq: [
      {
        question: "What does the customer experience at trial end?",
        answer:
          "Instead of cancellation, their subscription switches to the Free plan and they receive an Auto Downgrade email explaining the change and how to upgrade.",
      },
      {
        question: "Does this need Pro?",
        answer:
          "Yes. Auto-downgrade relies on Pro plan switching with a linked downgrade product configured on the trial product.",
      },
    ],
    relatedFeatures: ["billing-and-renewals", "subscription-products", "feature-manager"],
    relatedRecipes: ["free-tier-plus-paid", "no-card-trial-then-monthly", "auto-downgrade-on-failed-payment"],
  },
  {
    slug: "auto-downgrade-on-failed-payment",
    group: "recurring-billing",
    icon: ArrowDownCircle,
    name: "Failed payment → auto-downgrade",
    cardDescription:
      "Instead of cancelling after a failed renewal, automatically move the customer to a cheaper plan.",
    tier: "Pro",
    seoTitle: "Auto-Downgrade on Failed Payment Instead of Cancelling (Pro)",
    metaDescription:
      "When a renewal payment fails, automatically downgrade the customer to a cheaper plan instead of cancelling, using ArraySubs Pro. Exact settings to recover revenue.",
    h1: "Auto-downgrade on failed payment",
    heroSubtitle:
      "Recover revenue you’d otherwise lose — when a renewal fails and grace runs out, move the customer to a cheaper plan instead of cancelling.",
    heroHighlights: ["Failed renewal → cheaper plan", "Beats outright cancellation", "Pro plan switching"],
    intro:
      "When a renewal ultimately fails, the default is cancellation — but a cancelled customer is ==$0 of recovered revenue==. With ==auto-downgrade on payment failure (Pro)==, ArraySubs instead ==moves the customer to a cheaper plan== they can afford, keeping some revenue and the relationship. This recipe links a paid plan to a cheaper one and enables downgrade-on-failure as the endgame of your grace period.",
    settings: [
      {
        setting: "Linked downgrade product",
        value: "Cheaper plan (e.g. $9 Basic)",
        where: "Product → Linked Products",
      },
      {
        setting: "Auto-downgrade timing",
        value: "On payment failure",
        where: "Plan switching settings (Pro)",
      },
      {
        setting: "Active Grace Days",
        value: "3 (default) — retry window first",
        where: "General Settings → Renewals",
      },
      {
        setting: "On-Hold Grace Days",
        value: "7 (default) — before downgrade fires",
        where: "General Settings → Renewals",
      },
    ],
    outcomes: [
      "Failed renewals fall back to a cheaper plan, not cancellation.",
      "You keep partial revenue instead of losing the customer.",
      "Runs after the normal grace/retry window.",
      "Customer is notified of the plan change.",
    ],
    bestFor: [
      "Tiered products with a cheap entry plan",
      "SaaS recovering downgrade revenue from failures",
      "Any plan with a meaningful lower tier",
    ],
    steps: [
      {
        title: "Set up a cheaper target plan",
        description:
          "Create or identify the lower-tier product the customer should fall back to (e.g. a $9 Basic plan).",
        manual: M.createConfigure,
      },
      {
        title: "Link it as the downgrade target",
        description:
          "On the paid product’s Linked Products, set the cheaper plan as the downgrade target.",
        manual: M.planSwitching,
      },
      {
        title: "Enable downgrade on payment failure",
        description:
          "Turn on auto-downgrade with timing ‘on payment failure’ so it fires when the grace period would otherwise cancel the subscription.",
        manual: M.grace,
      },
    ],
    notes: [
      "Requires Pro plan switching with a linked downgrade product.",
      "The normal Active/On-Hold grace period runs first — downgrade is the endgame, not the first response.",
      "Combine with Stripe automatic retries to recover the original plan before any downgrade.",
    ],
    faq: [
      {
        question: "Does downgrade happen immediately on the first failure?",
        answer:
          "No. The two-phase grace period runs first (retrying and restricting access). Auto-downgrade fires only when cancellation would otherwise occur.",
      },
      {
        question: "What plan does the customer land on?",
        answer:
          "Whatever you set as the linked downgrade target — typically your cheapest paid tier or a free plan.",
      },
    ],
    relatedFeatures: ["billing-and-renewals", "subscription-products", "checkout-and-payments"],
    relatedRecipes: ["auto-downgrade-on-trial-expiry", "lenient-dunning-grace", "downgrade-offer"],
  },
  {
    slug: "stripe-automatic-billing-sca",
    group: "recurring-billing",
    icon: Lock,
    name: "Automatic Stripe billing (SCA)",
    cardDescription:
      "Collect every renewal automatically and off-session with Stripe, fully SCA / 3D Secure compliant.",
    tier: "Free + Pro",
    seoTitle: "Automatic Stripe Subscription Billing with SCA / 3DS on WooCommerce",
    metaDescription:
      "Set up hands-off recurring billing with Stripe on WooCommerce — off-session renewals, SCA / 3D Secure compliance, and automatic retries. Exact ArraySubs settings inside.",
    h1: "Automatic Stripe billing with SCA / 3DS",
    heroSubtitle:
      "Stop chasing payments — Stripe charges every renewal automatically and off-session, with SCA / 3D Secure handled for you.",
    heroHighlights: ["Off-session renewals", "SCA / 3DS compliant", "Automatic retries (Pro)"],
    intro:
      "Manual renewals leak revenue — customers forget to pay invoices. ==Automatic Stripe billing (Pro)== charges every renewal ==off-session== from the stored card, with ==SCA / 3D Secure== authentication handled at checkout so EU/UK renewals don’t get declined. Combined with automatic retries, it’s the foundation every other billing recipe should sit on. This recipe turns it on.",
    settings: [
      {
        setting: "Stripe gateway",
        value: "Enabled & connected (Pro)",
        where: "Payments → Automatic Payments",
      },
      {
        setting: "Off-session renewals",
        value: "On (automatic)",
        where: "Stripe settings",
      },
      {
        setting: "SCA / 3D Secure",
        value: "Handled at checkout & on renewals",
        where: "Stripe (built-in)",
      },
      {
        setting: "Payment retries",
        value: "On (Pro recovery)",
        where: "Automatic Payments → Recovery",
      },
    ],
    outcomes: [
      "Every renewal charges automatically — no manual invoicing.",
      "EU/UK cards stay compliant via SCA / 3D Secure.",
      "Failed charges retry on a schedule before grace cancels.",
      "Customers can update cards themselves from the portal (Pro).",
    ],
    bestFor: [
      "Any store that wants hands-off recurring revenue",
      "EU/UK merchants needing SCA compliance",
      "High-volume plans where manual collection doesn’t scale",
    ],
    steps: [
      {
        title: "Enable Pro and connect Stripe",
        description:
          "Activate the Pro plugin and connect your Stripe account under Payments → Automatic Payments.",
        manual: M.stripe,
      },
      {
        title: "Confirm off-session renewals",
        description:
          "Verify renewals are set to charge automatically off-session from the stored payment method.",
        manual: M.autopay,
      },
      {
        title: "Turn on payment recovery",
        description:
          "Enable automatic retries so failed renewals are re-attempted on a schedule before the grace period cancels them.",
        manual: M.grace,
      },
    ],
    notes: [
      "Stripe stores cards via SetupIntent, which also powers card-required $0 trials.",
      "Pair with a sensible grace period so retries have time to succeed before cancellation.",
      "PayPal and Paddle are also supported for automatic payments with their own capabilities.",
    ],
    faq: [
      {
        question: "What is SCA / 3D Secure and do I need it?",
        answer:
          "SCA (Strong Customer Authentication) is required for EU/UK cards. Stripe handles the 3D Secure step at checkout and supports compliant off-session renewals so charges aren’t declined.",
      },
      {
        question: "What happens when an automatic charge fails?",
        answer:
          "Stripe retries on a schedule and the two-phase grace period keeps access active while it recovers — only cancelling if the full window passes unpaid.",
      },
    ],
    relatedFeatures: ["checkout-and-payments", "billing-and-renewals", "customer-portal"],
    relatedRecipes: ["card-required-trial-then-monthly", "lenient-dunning-grace", "auto-downgrade-on-failed-payment"],
  },
  {
    slug: "skip-and-pause-enabled",
    group: "recurring-billing",
    icon: SkipForward,
    name: "Customer skip & pause",
    cardDescription:
      "Let subscribers skip the next renewal or pause for a while instead of cancelling — ideal for boxes and seasonal use.",
    tier: "Free",
    seoTitle: "Let Customers Skip and Pause Subscriptions on WooCommerce",
    metaDescription:
      "Enable customer-facing skip and pause on WooCommerce subscriptions so subscribers can flex instead of cancelling. Exact ArraySubs Skip & Pause settings inside.",
    h1: "Customer skip & pause",
    heroSubtitle:
      "Give subscribers a pressure valve — skip the next renewal or pause for a set time — so they flex instead of cancelling.",
    heroHighlights: ["Skip next renewal", "Pause up to 30 days", "Self-service in the portal"],
    intro:
      "The cheapest churn save is letting customers ==skip or pause== instead of cancel. ArraySubs lets subscribers ==skip the next renewal== (pushing the date forward) or ==pause== the subscription (On-Hold, then auto-resume), all self-service from the customer portal. This recipe enables both with sensible guardrails — a skip cutoff and a max pause duration — so flexibility doesn’t become abuse.",
    settings: [
      {
        setting: "Allow Skip",
        value: "On",
        where: "General Settings → Skip & Pause",
      },
      {
        setting: "Skip cutoff days",
        value: "2 (can’t skip within 2 days of renewal)",
        where: "Skip & Pause",
      },
      {
        setting: "Allow Pause",
        value: "On",
        where: "Skip & Pause",
      },
      {
        setting: "Max pause duration",
        value: "30 days",
        where: "Skip & Pause",
      },
      {
        setting: "Min days between pauses",
        value: "30 days (cooldown)",
        where: "Skip & Pause",
      },
    ],
    outcomes: [
      "Customers skip a renewal (date shifts forward) instead of cancelling.",
      "Customers pause up to 30 days; the subscription auto-resumes.",
      "Next payment date extends by the days paused/skipped.",
      "Fewer cancellations during travel and slow seasons.",
    ],
    bestFor: [
      "Subscription boxes and physical goods",
      "Seasonal or travel-prone audiences",
      "Any plan fighting ‘I need a break’ churn",
    ],
    steps: [
      {
        title: "Open Skip & Pause settings",
        description:
          "Go to ArraySubs → Settings → General Settings → Skip & Pause.",
        manual: M.generalSettings,
      },
      {
        title: "Enable skip with a cutoff",
        description:
          "Turn on Allow Skip and set a cutoff (e.g. 2 days) so customers can’t skip a renewal that’s about to process.",
        manual: M.grace,
      },
      {
        title: "Enable pause with limits",
        description:
          "Turn on Allow Pause, set Max duration = 30 days and a 30-day cooldown between pauses to prevent indefinite free parking.",
        manual: M.grace,
      },
    ],
    notes: [
      "A paused subscription goes On-Hold and generates no invoices; the next payment date shifts forward by the days paused.",
      "Skip pushes the renewal forward by one cycle; pause shifts by actual days.",
      "This self-service pause is separate from the retention-flow pause offer (which auto-resumes after a fixed duration).",
    ],
    faq: [
      {
        question: "What’s the difference between skip and pause?",
        answer:
          "Skip moves the next renewal forward by one billing cycle while the subscription stays Active. Pause sets it On-Hold for a number of days, then auto-resumes, shifting the next payment date by the days paused.",
      },
      {
        question: "Can customers pause forever?",
        answer:
          "No — Max pause duration caps a single pause (e.g. 30 days) and a cooldown prevents back-to-back pauses. For indefinite pausing, use admin controls.",
      },
    ],
    relatedFeatures: ["billing-and-renewals", "customer-portal", "subscription-products"],
    relatedRecipes: ["biweekly-billing", "pause-need-a-break", "seasonal-pause-90"],
  },
  {
    slug: "recurring-shipping-box",
    group: "recurring-billing",
    icon: Truck,
    name: "Charge shipping on every renewal",
    cardDescription:
      "For physical boxes and refills — bill shipping again on each renewal, with an optional flat renewal rate.",
    tier: "Pro",
    seoTitle: "Recurring Shipping on Subscription Renewals (WooCommerce Pro)",
    metaDescription:
      "Charge shipping on every WooCommerce subscription renewal for physical boxes with ArraySubs Pro Subscription Shipping, with an optional flat renewal override. Exact settings inside.",
    h1: "Charge shipping on every renewal",
    heroSubtitle:
      "Physical boxes ship every cycle — so shipping should bill every cycle. Add recurring shipping, with an optional fixed renewal rate.",
    heroHighlights: ["Shipping on each renewal", "Optional flat renewal rate", "Per-variation"],
    intro:
      "Physical subscriptions — ==boxes, refills, consumables== — ship on every renewal, so shipping should ==bill on every renewal too==. ==Subscription Shipping (Pro)== adds a ==Recurring== shipping type to physical subscription products, and an optional ==Renewal Shipping Override== to charge a ==flat rate== (e.g. $5.99) instead of recalculating live rates each cycle. This recipe sets recurring shipping.",
    settings: [
      {
        setting: "Shipping Type",
        value: "Recurring",
        where: "Product → Subscription tab (Pro)",
      },
      {
        setting: "Initial Shipping Override",
        value: "Blank (use WooCommerce rates) or a fixed amount",
        where: "Subscription tab",
      },
      {
        setting: "Renewal Shipping Override",
        value: "Blank (recalculate) or a flat rate (e.g. $5.99)",
        where: "Subscription tab",
      },
      {
        setting: "Shown for",
        value: "Physical (non-virtual/non-downloadable) subscriptions",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Shipping is charged on the initial order and every renewal.",
      "Optionally lock a flat renewal shipping rate.",
      "Renewals use the subscription’s current shipping address.",
      "Each variation can set its own shipping behaviour.",
    ],
    bestFor: [
      "Monthly product boxes and crates",
      "Refill and replenishment subscriptions",
      "Any physical good shipped each cycle",
    ],
    steps: [
      {
        title: "Open the product’s Subscription tab",
        description:
          "Edit a physical (non-virtual) subscription product → Product data → Subscription, where the shipping fields appear (Pro).",
        manual: M.subShipping,
      },
      {
        title: "Set Shipping Type to Recurring",
        description:
          "Choose Recurring so renewal orders include a shipping charge, not just the first order.",
        manual: M.subShipping,
      },
      {
        title: "Optionally set a flat renewal rate",
        description:
          "Leave overrides blank to use live WooCommerce rates, or set a Renewal Shipping Override (e.g. 5.99) for a fixed per-renewal charge.",
        manual: M.subShipping,
      },
    ],
    notes: [
      "If an override is blank, WooCommerce’s normal shipping calculation is used; if set, that stored amount is used on renewal orders.",
      "The shipping fields only appear when the product is a subscription and requires shipping (not virtual/downloadable).",
      "Renewal orders use the current subscription shipping address, not the one copied at original checkout.",
    ],
    faq: [
      {
        question: "Can I charge a fixed shipping amount on renewals?",
        answer:
          "Yes. Set a Renewal Shipping Override (e.g. $5.99) and ArraySubs uses that flat amount on each renewal instead of recalculating live rates.",
      },
      {
        question: "Does each variation support its own shipping?",
        answer:
          "Yes. Each variation can have its own shipping type and override amounts.",
      },
    ],
    relatedFeatures: ["subscription-shipping", "subscription-products", "billing-and-renewals"],
    relatedRecipes: ["one-time-shipping-welcome-kit", "biweekly-billing", "skip-and-pause-enabled"],
  },
  {
    slug: "one-time-shipping-welcome-kit",
    group: "recurring-billing",
    icon: PackageCheck,
    name: "Ship once, then free renewals",
    cardDescription:
      "Charge shipping only on the signup order — ideal for a welcome kit or starter pack with a digital membership.",
    tier: "Pro",
    seoTitle: "One-Time Shipping for a Welcome Kit (WooCommerce Pro)",
    metaDescription:
      "Charge shipping only on the first subscription order (welcome kit / starter pack) with ArraySubs Pro Subscription Shipping, with no shipping on renewals. Exact settings inside.",
    h1: "Ship once, then free renewals",
    heroSubtitle:
      "Send a starter kit at signup, then bill nothing for shipping after — perfect for a digital membership with a one-time physical package.",
    heroHighlights: ["Shipping on signup only", "No renewal shipping", "Welcome-kit ready"],
    intro:
      "Some subscriptions are ==mostly digital with a one-time physical piece== — a welcome kit, a starter pack, a device. With ==Subscription Shipping (Pro)== set to ==One-time==, shipping is ==charged on the signup order only== and ==never on renewals==. This recipe ships once and keeps renewals shipping-free.",
    settings: [
      {
        setting: "Shipping Type",
        value: "One-time",
        where: "Product → Subscription tab (Pro)",
      },
      {
        setting: "Initial order",
        value: "Shipping is charged",
        where: "Behaviour",
      },
      {
        setting: "Renewal orders",
        value: "No shipping charged",
        where: "Behaviour",
      },
      {
        setting: "Initial Shipping Override",
        value: "Optional fixed amount for the signup order",
        where: "Subscription tab",
      },
    ],
    outcomes: [
      "Shipping is charged once, on the signup order.",
      "Renewals never include a shipping charge.",
      "Great for digital plans with a physical welcome kit.",
      "Shipping address is still stored on the subscription.",
    ],
    bestFor: [
      "Digital memberships with a starter kit",
      "One-time hardware/device + service plans",
      "‘Welcome package’ onboarding",
    ],
    steps: [
      {
        title: "Open the product’s Subscription tab",
        description:
          "Edit the physical subscription product → Product data → Subscription to reveal the shipping fields (Pro).",
        manual: M.subShipping,
      },
      {
        title: "Set Shipping Type to One-time",
        description:
          "Choose One-time so the signup order includes shipping but renewal orders do not.",
        manual: M.subShipping,
      },
    ],
    notes: [
      "One-time shipping only controls renewal shipping charges — the subscription still stores a shipping address.",
      "Set an Initial Shipping Override to fix the signup shipping amount instead of using live rates.",
      "Fields appear only on physical (non-virtual/downloadable) subscription products.",
    ],
    faq: [
      {
        question: "Does one-time shipping remove the shipping address?",
        answer:
          "No. The subscription still stores a shipping address — One-time only controls whether renewal orders include a shipping charge.",
      },
      {
        question: "Can I fix the signup shipping cost?",
        answer:
          "Yes. Set an Initial Shipping Override to charge a specific amount on the signup order instead of live carrier rates.",
      },
    ],
    relatedFeatures: ["subscription-shipping", "subscription-products", "checkout-and-payments"],
    relatedRecipes: ["recurring-shipping-box", "lifetime-deal-one-time", "signup-fee-plus-flat-monthly"],
  },
  {
    slug: "custom-checkout-fields",
    group: "recurring-billing",
    icon: ClipboardList,
    name: "Custom checkout fields",
    cardDescription:
      "Collect anything at checkout — dietary prefs, delivery notes, file uploads, sizes — and carry it onto the subscription and renewals.",
    tier: "Pro",
    seoTitle: "Custom Checkout Fields for Subscriptions on WooCommerce (Pro)",
    metaDescription:
      "Add custom fields to the WooCommerce subscription checkout with ArraySubs Pro Checkout Builder — 27 field types — and copy the data to the subscription and renewal orders. Exact settings inside.",
    h1: "Custom checkout fields",
    heroSubtitle:
      "Capture exactly what you need at signup — from dietary preferences to file uploads — and carry it through to the subscription and every renewal.",
    heroHighlights: ["27 field types", "Copy to subscription", "Carries to renewals"],
    intro:
      "Subscriptions often need ==data WooCommerce doesn’t collect== — sizes, dietary prefs, delivery notes, a logo upload. The ==Checkout Builder (Pro)== adds ==custom fields== (==27 field types== across standard, advanced, and layout) to the checkout, then ==copies the values onto the subscription== and ==forward to renewal orders== so fulfillment always has them. This recipe captures custom checkout data.",
    settings: [
      {
        setting: "Checkout Builder · Enabled",
        value: "On (Pro)",
        where: "ArraySubs → Checkout Builder → Settings",
      },
      {
        setting: "Add fields",
        value: "Drag from 27 field types (text, select, upload, date, …)",
        where: "Checkout Builder editor",
      },
      {
        setting: "Copy to subscription",
        value: "On (carry field data to the subscription)",
        where: "Checkout Builder → Settings",
      },
      {
        setting: "Copy to renewal orders",
        value: "On (carry to each renewal)",
        where: "Checkout Builder → Settings",
      },
      {
        setting: "Show on order / subscription",
        value: "Admin · customer · subscription detail toggles",
        where: "Checkout Builder → Settings",
      },
    ],
    outcomes: [
      "Collect any data at checkout with 27 field types.",
      "Custom values copy onto the subscription record.",
      "Values carry forward to every renewal order.",
      "Display them on order and subscription screens.",
    ],
    bestFor: [
      "Boxes needing prefs (size, flavour, dietary)",
      "Services needing delivery notes or uploads",
      "Onboarding data captured at signup",
    ],
    steps: [
      {
        title: "Enable the Checkout Builder",
        description:
          "In ArraySubs → Checkout Builder → Settings, turn Enabled on (Pro). The builder then drives the WooCommerce checkout.",
        manual: M.checkoutBuilder,
      },
      {
        title: "Add your fields",
        description:
          "Open the builder and drag in fields from the 27 types; set each field’s label, key, and required state.",
        manual: M.checkoutFieldTypes,
      },
      {
        title: "Carry data to subscription & renewals",
        description:
          "Enable Copy to subscription and Copy to renewal orders so captured values persist; toggle the Show-on-order/subscription displays as needed.",
        manual: M.checkoutBuilder,
      },
    ],
    notes: [
      "Without Copy to subscription, custom data lives only on the initial checkout order.",
      "File upload fields require Uploads enabled (and a max file size) in Checkout Builder settings.",
      "Custom field values are stored as order meta (`_arraysubs_cf_*`) and appear in WooCommerce CSV exports.",
    ],
    faq: [
      {
        question: "Does the captured data reach renewal orders?",
        answer:
          "Yes, when Copy to subscription and Copy to renewal orders are on — values copy from the order to the subscription and then onto each renewal.",
      },
      {
        question: "Can I collect file uploads at checkout?",
        answer:
          "Yes. Add an Upload field and enable Uploads in Checkout Builder settings; files are stored privately and linked to the order/subscription.",
      },
    ],
    relatedFeatures: ["checkout-and-payments", "subscription-products", "manage-subscriptions"],
    relatedRecipes: ["multi-step-checkout", "conditional-checkout-fields", "signup-fee-plus-flat-monthly"],
  },
  {
    slug: "multi-step-checkout",
    group: "recurring-billing",
    icon: Workflow,
    name: "Multi-step checkout",
    cardDescription:
      "Split a long checkout into friendly steps with a progress indicator to cut form fatigue and lift conversions.",
    tier: "Pro",
    seoTitle: "Multi-Step Subscription Checkout on WooCommerce (Pro)",
    metaDescription:
      "Build a multi-step WooCommerce subscription checkout with ArraySubs Pro Checkout Builder — steps, progress indicator, and branded design. Exact setup inside.",
    h1: "Multi-step checkout",
    heroSubtitle:
      "Long forms scare buyers off — break checkout into clean steps with a progress indicator so it feels effortless.",
    heroHighlights: ["Step-by-step flow", "Progress indicator", "Higher conversion"],
    intro:
      "A wall of fields kills conversion. The ==Checkout Builder (Pro)== turns checkout into a ==multi-step flow== — add two or more steps and it renders ==Previous/Next navigation and a step indicator==, with validation only on final submit so customers can move freely. Style it to match your brand in the Design panel. This recipe builds a multi-step checkout.",
    settings: [
      {
        setting: "Checkout Builder · Enabled",
        value: "On (Pro)",
        where: "Checkout Builder → Settings",
      },
      {
        setting: "Steps",
        value: "2+ steps (+ Add Step) → multi-step mode",
        where: "Checkout Builder editor",
      },
      {
        setting: "Step indicator style",
        value: "numbers (default) · dots · progress-bar",
        where: "Design panel",
      },
      {
        setting: "Step position",
        value: "top (default) · left · hidden",
        where: "Design panel",
      },
    ],
    outcomes: [
      "Checkout splits into friendly, themed steps.",
      "A progress indicator shows where the customer is.",
      "Validation runs on final submit — free movement between steps.",
      "Works on both Classic and Block checkout.",
    ],
    bestFor: [
      "Long checkouts with many fields",
      "Onboarding-heavy signups",
      "Boosting checkout completion",
    ],
    steps: [
      {
        title: "Enable and open the builder",
        description:
          "Turn Checkout Builder Enabled on (Pro), then Open Builder.",
        manual: M.checkoutBuilder,
      },
      {
        title: "Add steps",
        description:
          "Click + Add Step to create two or more steps; drag fields between step tabs and reorder steps as needed.",
        manual: M.checkoutBuilder,
      },
      {
        title: "Style the step navigation",
        description:
          "In the Design panel choose the step indicator style (numbers/dots/progress-bar), position (top/left/hidden), colors, and spacing.",
        manual: M.checkoutBuilder,
      },
    ],
    notes: [
      "One step = single-page checkout; two or more steps activates the multi-step UI.",
      "The Order Info / Payment element is required and auto-re-added to the last step if removed.",
      "Billing email, first/last name, and country are locked fields — reorder them, but they can’t be deleted.",
    ],
    faq: [
      {
        question: "When does validation run in a multi-step checkout?",
        answer:
          "Only when the customer submits the final step — they can move between steps freely without triggering validation, reducing friction.",
      },
      {
        question: "How many steps can I add?",
        answer:
          "No hard limit (minimum 1). In practice 2–4 steps works best for most flows.",
      },
    ],
    relatedFeatures: ["checkout-and-payments", "subscription-products"],
    relatedRecipes: ["custom-checkout-fields", "conditional-checkout-fields", "card-required-trial-then-monthly"],
  },
  {
    slug: "conditional-checkout-fields",
    group: "recurring-billing",
    icon: ToggleLeft,
    name: "Conditional checkout fields",
    cardDescription:
      "Show or hide checkout fields based on earlier answers — e.g. reveal ‘Company name’ only when ‘Business’ is chosen.",
    tier: "Pro",
    seoTitle: "Conditional Checkout Fields on WooCommerce (Pro)",
    metaDescription:
      "Show or hide WooCommerce checkout fields based on other field values with ArraySubs Pro Checkout Builder visibility rules. Exact operators and behavior inside.",
    h1: "Conditional checkout fields",
    heroSubtitle:
      "Keep checkout clean — reveal fields only when they’re relevant, based on what the customer already chose.",
    heroHighlights: ["Show/hide by answer", "Real-time rules", "Hidden = not submitted"],
    intro:
      "Asking everyone everything bloats checkout. ==Visibility rules (Pro)== show or hide a field based on ==another field’s value== — reveal ‘Company name’ only when ‘Customer type’ is ‘Business’. Rules evaluate ==in real time==, combine with AND, and ==hidden fields aren’t validated or submitted==. This recipe adds conditional fields.",
    settings: [
      {
        setting: "Visibility Rules",
        value: "Per field: reference field → operator → value",
        where: "Checkout Builder → field settings",
      },
      {
        setting: "Operators",
        value: "is · is_not · contains · is_empty · is_not_empty",
        where: "Visibility rule",
      },
      {
        setting: "Multiple rules",
        value: "Combined with AND (all must match)",
        where: "Behaviour",
      },
      {
        setting: "Hidden fields",
        value: "Not validated, not submitted",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Fields appear only when relevant to the customer.",
      "Rules evaluate live as the form is filled.",
      "Hidden fields are excluded from validation and submission.",
      "Cleaner, shorter-feeling checkout.",
    ],
    bestFor: [
      "B2B vs B2C checkout branches",
      "Optional add-on details",
      "Reducing irrelevant fields",
    ],
    steps: [
      {
        title: "Select the field to gate",
        description:
          "In the Checkout Builder, select the field that should appear conditionally.",
        manual: M.checkoutBuilder,
      },
      {
        title: "Add a visibility rule",
        description:
          "In Visibility Rules, click Add Rule and set reference field → operator (is / is_not / contains / is_empty / is_not_empty) → value.",
        manual: M.checkoutBuilder,
      },
    ],
    notes: [
      "Multiple rules on one field combine with AND — all must match for it to show.",
      "You can reference any field in the same or an earlier step.",
      "Hidden fields are treated as if they don’t exist — never validated or submitted.",
    ],
    faq: [
      {
        question: "What happens to a hidden field’s data?",
        answer:
          "Nothing is submitted. Hidden fields are excluded from both validation and submission, even if partially filled before being hidden.",
      },
      {
        question: "Can a field depend on more than one answer?",
        answer:
          "Yes. Add multiple rules; they combine with AND, so the field shows only when every rule matches.",
      },
    ],
    relatedFeatures: ["checkout-and-payments", "subscription-products"],
    relatedRecipes: ["custom-checkout-fields", "multi-step-checkout", "free-tier-plus-paid"],
  },

  // ============================================================
  // GROUP 2 — Retention flow & coupons
  // ============================================================
  {
    slug: "discount-too-expensive",
    group: "retention-coupons",
    icon: Percent,
    name: "‘Too expensive’ → discount",
    cardDescription:
      "Catch price-sensitive cancellers with an automatic discount on their next few renewals — e.g. 20% off for 3 cycles.",
    tier: "Free",
    seoTitle: "Save Cancelling Customers With a Retention Discount on WooCommerce",
    metaDescription:
      "When a customer cancels for being ‘too expensive,’ automatically offer a percentage discount for a few renewals. Exact ArraySubs Retention Flow settings inside.",
    h1: "Win back ‘too expensive’ cancellers with a discount",
    heroSubtitle:
      "Show a targeted discount at the exact moment a price-sensitive customer tries to cancel — accepted offers apply automatically to the next renewals.",
    heroHighlights: ["20% off for 3 cycles", "Triggered by ‘too expensive’", "Applies automatically"],
    intro:
      "The single most effective churn save is a ==discount offered at the moment of cancellation==. ArraySubs’ Retention Flow inserts an offer step between the cancellation reason and the final cancel: a customer who selects ==‘Too expensive’== sees a discount card, and accepting it ==automatically reduces their next N renewals== — no coupon codes, no manual edits. This recipe configures a 20%-off-for-3-cycles discount targeted at price objections.",
    settings: [
      {
        setting: "Enable Retention Offers",
        value: "On (master toggle)",
        where: "Retention Flow page",
      },
      {
        setting: "Enable Discount Offer",
        value: "On",
        where: "Retention Flow → Discount Offer",
      },
      {
        setting: "Discount Percentage",
        value: "20%",
        where: "Discount Offer",
      },
      {
        setting: "Number of Billing Cycles",
        value: "3",
        where: "Discount Offer",
      },
      {
        setting: "Show for these reasons",
        value: "Too expensive",
        where: "Discount Offer",
      },
      {
        setting: "Require Cancellation Reason",
        value: "On (so targeting works)",
        where: "Retention Flow page",
      },
    ],
    outcomes: [
      "Price-sensitive cancellers see a 20%-off card before they leave.",
      "Accepting applies the discount to the next 3 renewals automatically.",
      "The pending cancellation is cleared and the subscription stays active.",
      "Every offer shown/accepted is tracked in Retention Analytics.",
    ],
    bestFor: [
      "Any subscription with price-driven churn",
      "Plans with margin to give a temporary discount",
      "Stores wanting automatic, code-free saves",
    ],
    steps: [
      {
        title: "Enable cancellation reasons",
        description:
          "On the Retention Flow page, turn on Require Cancellation Reason so offers can target the ‘Too expensive’ reason.",
        manual: M.cancellation,
      },
      {
        title: "Turn on retention offers",
        description:
          "Enable the master Retention Offers toggle, then enable the Discount Offer.",
        manual: M.offers,
      },
      {
        title: "Configure the discount",
        description:
          "Set Discount Percentage = 20 and Number of Billing Cycles = 3.",
        manual: M.offers,
      },
      {
        title: "Target the price reason",
        description:
          "In ‘Show for these reasons,’ select ‘Too expensive’ so only price-objection cancellers see it.",
        manual: M.offers,
      },
      {
        title: "Measure it",
        description:
          "Watch offer-shown, accepted, and saved-revenue figures in Retention Analytics and tune the percentage.",
        manual: M.retentionAnalytics,
      },
    ],
    notes: [
      "A subscription can only use one retention discount at a time — it won’t be re-offered once accepted.",
      "Discount renewal adjustments are fully automatic on manual payments and Stripe; PayPal/Paddle may need manual handling.",
      "Leave ‘Show for these reasons’ empty to offer the discount for all reasons instead of just price.",
    ],
    faq: [
      {
        question: "Does the discount apply forever?",
        answer:
          "No. It applies for the number of billing cycles you set (3 here). After those cycles, renewals return to full price automatically.",
      },
      {
        question: "Can the customer stack this with a coupon?",
        answer:
          "Both a retention discount and a subscription coupon can be active, but the combined discount is capped so the renewal total never goes negative.",
      },
    ],
    relatedFeatures: ["retention-and-refunds", "retention-analytics", "billing-and-renewals"],
    relatedRecipes: ["aggressive-save-50", "free-month-winback", "downgrade-offer"],
  },
  {
    slug: "pause-need-a-break",
    group: "retention-coupons",
    icon: PauseCircle,
    name: "‘Need a break’ → pause offer",
    cardDescription:
      "Offer a temporary pause instead of cancellation when a customer just needs time off — auto-resumes after the set duration.",
    tier: "Free",
    seoTitle: "Offer a Pause Instead of Cancellation on WooCommerce",
    metaDescription:
      "When a customer wants to cancel for a temporary break, offer a pause that auto-resumes. Exact ArraySubs Retention Flow pause-offer settings inside.",
    h1: "Offer a pause instead of cancellation",
    heroSubtitle:
      "Many cancellations are really ‘I need a break.’ Offer a temporary pause that automatically resumes, and keep the subscriber.",
    heroHighlights: ["30-day pause offer", "Auto-resumes", "Triggered by ‘need a break’"],
    intro:
      "A lot of churn isn’t ‘goodbye’ — it’s ==‘not right now.’== The Retention Flow’s ==pause offer== meets that head-on: a customer who selects ‘Just need a temporary break’ (or ‘Not using it enough’) is offered a ==temporary pause that auto-resumes== after a set number of days. The subscription goes On-Hold, billing stops, and it reactivates on schedule — no lost subscriber. This recipe sets a 30-day pause offer.",
    settings: [
      {
        setting: "Enable Retention Offers",
        value: "On",
        where: "Retention Flow page",
      },
      {
        setting: "Enable Pause Offer",
        value: "On",
        where: "Retention Flow → Pause Offer",
      },
      {
        setting: "Maximum Pause Duration",
        value: "30 days",
        where: "Pause Offer",
      },
      {
        setting: "Show for these reasons",
        value: "Just need a temporary break · Not using it enough",
        where: "Pause Offer",
      },
    ],
    outcomes: [
      "Break-seeking cancellers are offered a 30-day pause.",
      "Accepting moves the subscription to On-Hold and shifts the next payment date.",
      "It auto-resumes to Active on the scheduled date.",
      "Subscriber retained instead of lost.",
    ],
    bestFor: [
      "Boxes, memberships, and seasonal usage",
      "Audiences that travel or go quiet periodically",
      "Any plan with ‘I’ll be back later’ churn",
    ],
    steps: [
      {
        title: "Enable retention offers",
        description:
          "On the Retention Flow page, turn on the master Retention Offers toggle.",
        manual: M.offers,
      },
      {
        title: "Enable the pause offer",
        description:
          "Turn on Enable Pause Offer and set Maximum Pause Duration to 30 days (range 7–90).",
        manual: M.offers,
      },
      {
        title: "Target break reasons",
        description:
          "In ‘Show for these reasons,’ select ‘Just need a temporary break’ and ‘Not using it enough.’",
        manual: M.offers,
      },
    ],
    notes: [
      "The pause duration is fixed — the customer accepts or declines the configured number of days, not a custom value.",
      "A retention pause auto-resumes; there’s no manual resume button for it (unlike a self-service pause).",
      "Pause and Contact Support offers work on all gateways, including PayPal and Paddle.",
    ],
    faq: [
      {
        question: "What happens when the pause ends?",
        answer:
          "On the scheduled resume date the subscription automatically returns to Active, pause metadata clears, and the next payment date is recalculated.",
      },
      {
        question: "How is this different from customer self-service pause?",
        answer:
          "The retention pause is presented during cancellation and auto-resumes after a fixed duration. The self-service pause (Skip & Pause settings) is initiated anytime by the customer.",
      },
    ],
    relatedFeatures: ["retention-and-refunds", "customer-portal", "billing-and-renewals"],
    relatedRecipes: ["seasonal-pause-90", "skip-and-pause-enabled", "discount-too-expensive"],
  },
  {
    slug: "downgrade-offer",
    group: "retention-coupons",
    icon: ChevronsDown,
    name: "Offer a cheaper plan",
    cardDescription:
      "Instead of losing a customer, offer a downgrade to a cheaper plan during cancellation — keeps revenue on the table.",
    tier: "Free + Pro",
    seoTitle: "Offer a Downgrade Instead of Cancellation on WooCommerce",
    metaDescription:
      "When a customer tries to cancel, offer a cheaper plan via the Retention Flow downgrade offer. Requires plan switching. Exact ArraySubs settings inside.",
    h1: "Offer a cheaper plan instead of cancelling",
    heroSubtitle:
      "A downgrade keeps the relationship and some revenue. Present a cheaper plan at cancellation for customers citing price or missing features.",
    heroHighlights: ["Downgrade vs cancel", "Triggered by price/features", "Uses plan switching"],
    intro:
      "Some customers won’t pay your current price but ==would pay something==. The Retention Flow’s ==downgrade offer== keeps that revenue: at cancellation, the customer is shown a path to a ==cheaper plan== instead of leaving entirely. It leans on the ==plan switching== system, so it only appears when you’ve configured downgrade paths on the product. This recipe enables a downgrade offer for price and feature objections.",
    settings: [
      {
        setting: "Linked downgrade products",
        value: "Configured on the subscription product",
        where: "Product → Linked Products",
      },
      {
        setting: "Enable Retention Offers",
        value: "On",
        where: "Retention Flow page",
      },
      {
        setting: "Enable Downgrade Offer",
        value: "On",
        where: "Retention Flow → Downgrade Offer",
      },
      {
        setting: "Show for these reasons",
        value: "Too expensive · Missing features I need",
        where: "Downgrade Offer",
      },
    ],
    outcomes: [
      "Cancellers are offered a cheaper plan instead of leaving.",
      "Accepting routes them through the plan switching flow.",
      "You keep partial revenue and the customer relationship.",
      "Only shows when downgrade paths exist on the product.",
    ],
    bestFor: [
      "Tiered products with a cheaper plan to fall to",
      "Price- and feature-driven churn",
      "Stores already using plan switching",
    ],
    steps: [
      {
        title: "Configure downgrade paths",
        description:
          "On the subscription product’s Linked Products tab, set the cheaper plan(s) as downgrade targets. Without these, the offer has nothing to show.",
        manual: M.planSwitching,
      },
      {
        title: "Enable the downgrade offer",
        description:
          "On the Retention Flow page, enable Retention Offers, then Enable Downgrade Offer.",
        manual: M.offers,
      },
      {
        title: "Target the right reasons",
        description:
          "Select ‘Too expensive’ and ‘Missing features I need’ in ‘Show for these reasons.’",
        manual: M.offers,
      },
    ],
    notes: [
      "The downgrade offer requires Pro plan switching with linked downgrade products — otherwise it won’t appear even if enabled.",
      "Accepting redirects the customer to the plan switching modal to pick the cheaper plan.",
      "Pair with the discount offer so price objectors see both a discount and a downgrade.",
    ],
    faq: [
      {
        question: "Why doesn’t my downgrade offer appear?",
        answer:
          "Most often there are no downgrade products configured. Set downgrade targets on the product’s Linked Products tab; the offer only shows when a cheaper plan exists.",
      },
      {
        question: "Does this work with variable products?",
        answer:
          "Yes. If the customer’s variation has downgrade paths configured via linked products, those options appear in the plan switching flow.",
      },
    ],
    relatedFeatures: ["retention-and-refunds", "subscription-products", "billing-and-renewals"],
    relatedRecipes: ["auto-downgrade-on-failed-payment", "tiered-bronze-silver-gold", "discount-too-expensive"],
  },
  {
    slug: "contact-support-deflect",
    group: "retention-coupons",
    icon: Headphones,
    name: "‘Technical issues’ → support",
    cardDescription:
      "Route customers citing problems to your support team before they cancel, with a direct link to your help hub.",
    tier: "Free",
    seoTitle: "Deflect Cancellations to Support on WooCommerce",
    metaDescription:
      "When a customer cites technical issues at cancellation, route them to your support hub instead of letting them leave. Exact ArraySubs Retention Flow settings inside.",
    h1: "Route ‘technical issues’ to support",
    heroSubtitle:
      "Some cancellations are fixable problems in disguise. Offer a direct line to support before the customer walks.",
    heroHighlights: ["Support link at cancel", "Triggered by ‘technical issues’", "Keeps subscription active"],
    intro:
      "When someone cancels citing ==‘technical issues’ or ‘missing features,’== they often have a ==fixable problem== — not a real intent to leave. The Retention Flow’s ==Contact Support offer== puts a direct link to your help hub in front of them at the cancellation step, so a solvable issue gets solved instead of becoming churn. This recipe routes technical cancellations to support.",
    settings: [
      {
        setting: "Enable Retention Offers",
        value: "On",
        where: "Retention Flow page",
      },
      {
        setting: "Enable Contact Support Offer",
        value: "On",
        where: "Retention Flow → Contact Support",
      },
      {
        setting: "Support Hub URL",
        value: "https://yourstore.com/support (required)",
        where: "Contact Support",
      },
      {
        setting: "Show for these reasons",
        value: "Technical issues · Missing features I need",
        where: "Contact Support",
      },
    ],
    outcomes: [
      "Problem-citing cancellers get a direct support link.",
      "The link opens in a new tab; the subscription stays active.",
      "Fixable issues get resolved instead of churning.",
      "Acceptance is logged for Retention Analytics.",
    ],
    bestFor: [
      "Products where churn is often a support issue",
      "Teams with a responsive help desk",
      "Complex tools with onboarding friction",
    ],
    steps: [
      {
        title: "Enable retention offers",
        description:
          "On the Retention Flow page, turn on the master Retention Offers toggle.",
        manual: M.offers,
      },
      {
        title: "Enable Contact Support and set the URL",
        description:
          "Turn on Enable Contact Support Offer and enter your Support Hub URL — this field is required or the offer won’t appear.",
        manual: M.offers,
      },
      {
        title: "Target problem reasons",
        description:
          "Select ‘Technical issues’ and ‘Missing features I need’ in ‘Show for these reasons.’",
        manual: M.offers,
      },
    ],
    notes: [
      "The Support Hub URL is required — a blank URL hides the offer, and a broken link frustrates already-leaving customers.",
      "Contact Support works on all gateways and doesn’t change the subscription.",
      "Pair with the downgrade offer for ‘missing features’ so customers can both ask for help and see cheaper options.",
    ],
    faq: [
      {
        question: "Does accepting cancel the subscription?",
        answer:
          "No. The support link opens in a new tab, the acceptance is logged, and the subscription remains active.",
      },
      {
        question: "Where should the URL point?",
        answer:
          "To an active support page, help desk, or contact form. Make sure it works — a dead link at the cancellation step costs you the save.",
      },
    ],
    relatedFeatures: ["retention-and-refunds", "retention-analytics", "customer-portal"],
    relatedRecipes: ["downgrade-offer", "multi-offer-other", "discount-too-expensive"],
  },
  {
    slug: "free-month-winback",
    group: "retention-coupons",
    icon: Gift,
    name: "Free month to win back",
    cardDescription:
      "Offer a single free renewal (100% off one cycle) as a high-impact save for customers about to leave.",
    tier: "Free",
    seoTitle: "Offer a Free Month to Save Cancelling Customers on WooCommerce",
    metaDescription:
      "Use a 100%-off single-cycle retention discount to give a free month at cancellation. Exact ArraySubs Retention Flow settings for a free-month win-back.",
    h1: "Offer a free month to win them back",
    heroSubtitle:
      "A single free cycle is a powerful, low-cost save — give one month free at the cancellation step and reset the relationship.",
    heroHighlights: ["100% off 1 cycle", "High-impact save", "Automatic on accept"],
    intro:
      "A ==free month== is a high-impact, low-cost retention save: one free cycle costs you little but ==resets the customer’s decision== and buys time to re-engage them. ArraySubs delivers this as a ==discount offer set to 100% for 1 cycle== — the next renewal is free, then billing resumes normally. This recipe configures a free-month win-back for any cancellation reason.",
    settings: [
      {
        setting: "Enable Retention Offers",
        value: "On",
        where: "Retention Flow page",
      },
      {
        setting: "Enable Discount Offer",
        value: "On",
        where: "Retention Flow → Discount Offer",
      },
      {
        setting: "Discount Percentage",
        value: "100%",
        where: "Discount Offer",
      },
      {
        setting: "Number of Billing Cycles",
        value: "1",
        where: "Discount Offer",
      },
      {
        setting: "Show for these reasons",
        value: "Empty (all reasons)",
        where: "Discount Offer",
      },
      {
        setting: "Custom Headline",
        value: "‘Have a month on us’",
        where: "Discount Offer",
      },
    ],
    outcomes: [
      "Cancellers are offered one free renewal cycle.",
      "Accepting makes the next renewal $0, then full price resumes.",
      "Clears the pending cancellation and keeps them active.",
      "A strong save that costs you a single cycle.",
    ],
    bestFor: [
      "High-LTV plans where one free cycle is worth the save",
      "Win-back campaigns at the cancellation step",
      "Any reason where a discount alone isn’t enough",
    ],
    steps: [
      {
        title: "Enable the discount offer",
        description:
          "On the Retention Flow page, enable Retention Offers, then Enable Discount Offer.",
        manual: M.offers,
      },
      {
        title: "Set it to a full free cycle",
        description:
          "Set Discount Percentage = 100 and Number of Billing Cycles = 1 for one free renewal.",
        manual: M.offers,
      },
      {
        title: "Write the headline and broaden targeting",
        description:
          "Add a custom headline like ‘Have a month on us’ and leave ‘Show for these reasons’ empty to offer it for every reason.",
        manual: M.offers,
      },
    ],
    notes: [
      "Like any retention discount, a free month can only be used once per subscription.",
      "Automatic free-cycle adjustment works on manual payments and Stripe; PayPal/Paddle may need manual handling.",
      "Use sparingly — reserve the 100% offer for your highest-value or hardest-to-replace customers.",
    ],
    faq: [
      {
        question: "Does billing resume after the free month?",
        answer:
          "Yes. With cycles set to 1, only the next renewal is free; the subscription returns to full price on the following renewal automatically.",
      },
      {
        question: "Can I limit who sees the free month?",
        answer:
          "Yes. Target specific cancellation reasons in ‘Show for these reasons,’ or rely on the built-in eligibility conditions (like minimum customer spend).",
      },
    ],
    relatedFeatures: ["retention-and-refunds", "retention-analytics", "store-credit"],
    relatedRecipes: ["discount-too-expensive", "aggressive-save-50", "free-first-month-coupon"],
  },
  {
    slug: "seasonal-pause-90",
    group: "retention-coupons",
    icon: CalendarRange,
    name: "Long seasonal pause",
    cardDescription:
      "Offer a long pause (up to 90 days) for seasonal businesses so customers park their subscription over the off-season.",
    tier: "Free",
    seoTitle: "Long Seasonal Pause Offer on WooCommerce Subscriptions",
    metaDescription:
      "Offer a pause of up to 90 days at cancellation so seasonal customers park their subscription instead of leaving. Exact ArraySubs Retention Flow settings inside.",
    h1: "Long seasonal pause offer",
    heroSubtitle:
      "For seasonal usage, a long pause beats a cancellation — let customers park up to 90 days and auto-resume for the next season.",
    heroHighlights: ["Up to 90-day pause", "Auto-resumes", "Built for seasonal use"],
    intro:
      "Seasonal products — ==summer boxes, winter gear, holiday services== — face predictable off-season churn. Instead of losing those customers, offer a ==long pause of up to 90 days== at cancellation so they ==park the subscription== and it auto-resumes for the next season. This recipe maxes out the pause offer’s duration for seasonal retention.",
    settings: [
      {
        setting: "Enable Retention Offers",
        value: "On",
        where: "Retention Flow page",
      },
      {
        setting: "Enable Pause Offer",
        value: "On",
        where: "Retention Flow → Pause Offer",
      },
      {
        setting: "Maximum Pause Duration",
        value: "90 days (the maximum)",
        where: "Pause Offer",
      },
      {
        setting: "Show for these reasons",
        value: "Just need a temporary break · Not using it enough",
        where: "Pause Offer",
      },
    ],
    outcomes: [
      "Off-season cancellers park for up to 90 days instead of leaving.",
      "No billing or shipping during the pause.",
      "Auto-resumes to Active for the next season.",
      "Seasonal churn converted into a pause.",
    ],
    bestFor: [
      "Seasonal boxes and gear",
      "Holiday and weather-dependent services",
      "Any product with a predictable off-season",
    ],
    steps: [
      {
        title: "Enable the pause offer",
        description:
          "On the Retention Flow page, enable Retention Offers, then Enable Pause Offer.",
        manual: M.offers,
      },
      {
        title: "Set the maximum duration",
        description:
          "Set Maximum Pause Duration to 90 days — the top of the 7–90 range — for a full-season pause.",
        manual: M.offers,
      },
      {
        title: "Target break reasons",
        description:
          "Select ‘Just need a temporary break’ and ‘Not using it enough’ so seasonal cancellers see it.",
        manual: M.offers,
      },
    ],
    notes: [
      "90 days is the maximum a single retention pause allows.",
      "During the pause the subscription is On-Hold; the next payment date shifts forward by the pause length.",
      "For repeat seasonal pausing, combine with the self-service Skip & Pause settings.",
    ],
    faq: [
      {
        question: "Can I pause longer than 90 days?",
        answer:
          "Not via the retention pause offer — 90 days is the cap. For longer parking, use admin controls or an indefinite self-service pause.",
      },
      {
        question: "Will the customer be billed during the pause?",
        answer:
          "No. The subscription is On-Hold for the pause duration — no invoices, no shipping — and resumes automatically afterward.",
      },
    ],
    relatedFeatures: ["retention-and-refunds", "customer-portal", "billing-and-renewals"],
    relatedRecipes: ["pause-need-a-break", "skip-and-pause-enabled", "discount-too-expensive"],
  },
  {
    slug: "end-of-period-cancel-undo",
    group: "retention-coupons",
    icon: Undo2,
    name: "End-of-period cancel + undo",
    cardDescription:
      "Let cancellations take effect at period end (not instantly), keeping access paid-through and offering an undo button.",
    tier: "Free",
    seoTitle: "End-of-Period Cancellation With Undo on WooCommerce",
    metaDescription:
      "Configure WooCommerce subscriptions to cancel at the end of the billing period with an undo option, instead of immediately. Exact ArraySubs settings inside.",
    h1: "End-of-period cancellation with undo",
    heroSubtitle:
      "Don’t cut customers off mid-cycle. Let cancellations take effect at period end, keep their paid access, and give them an undo button.",
    heroHighlights: ["Cancel at period end", "Keeps paid access", "Undo button for second thoughts"],
    intro:
      "How a cancellation is timed quietly drives retention. ==End-of-period cancellation== keeps the customer ==Active until their paid period ends== — they keep what they paid for, no future renewal runs, and crucially they get an ==Undo Cancellation== button to change their mind before it executes. That undo window saves a surprising share of cancellations. This recipe switches cancellation from immediate to end-of-period.",
    settings: [
      {
        setting: "Allow Cancellation",
        value: "On",
        where: "General Settings → Customer Actions",
      },
      {
        setting: "Cancel Immediately",
        value: "Off (= end of period)",
        where: "General Settings → Customer Actions",
      },
      {
        setting: "Require Cancellation Reason",
        value: "On (recommended)",
        where: "Retention Flow page",
      },
    ],
    outcomes: [
      "Cancellations schedule for the end of the paid period.",
      "The customer keeps access until then — no abrupt cut-off.",
      "An Undo Cancellation button lets them reverse it.",
      "No further renewal is charged once scheduled.",
    ],
    bestFor: [
      "Most subscription businesses (recommended default)",
      "Plans where mid-cycle cut-off feels unfair",
      "Maximising second-thought saves",
    ],
    steps: [
      {
        title: "Confirm cancellation is allowed",
        description:
          "In General Settings → Customer Actions, ensure Allow Cancellation is on so the portal shows the Cancel button.",
        manual: M.cancellation,
      },
      {
        title: "Switch to end-of-period",
        description:
          "Disable the Cancel Immediately toggle. Cancellations now schedule for the next payment date instead of taking effect instantly.",
        manual: M.cancellation,
      },
      {
        title: "Require a reason",
        description:
          "On the Retention Flow page, enable Require Cancellation Reason to capture churn data and power targeted offers.",
        manual: M.cancellation,
      },
    ],
    notes: [
      "End-of-period is generally recommended; customers keep paid access and can undo before it executes.",
      "The Cancellation Details card shows the scheduled date and an Undo option for both customers and admins.",
      "Retention offers still appear regardless of timing — accepting one clears the pending cancellation.",
    ],
    faq: [
      {
        question: "Can the customer reverse a scheduled cancellation?",
        answer:
          "Yes. While it’s pending, both the customer (in the portal) and an admin can click Undo Cancellation to keep the subscription renewing normally.",
      },
      {
        question: "Is cancellation timing per-product?",
        answer:
          "No. Cancel Immediately is a global setting for all subscription products. You get per-scenario control through targeted retention offers instead.",
      },
    ],
    relatedFeatures: ["retention-and-refunds", "customer-portal", "manage-subscriptions"],
    relatedRecipes: ["require-reason-targeted-funnel", "discount-too-expensive", "pause-need-a-break"],
  },
  {
    slug: "require-reason-targeted-funnel",
    group: "retention-coupons",
    icon: Filter,
    name: "Full targeted save funnel",
    cardDescription:
      "Require a cancellation reason, then route each reason to the offer most likely to save it — the complete retention funnel.",
    tier: "Free + Pro",
    seoTitle: "Build a Targeted Cancellation Save Funnel on WooCommerce",
    metaDescription:
      "Require a cancellation reason and map each reason to the best retention offer — discount, pause, downgrade, or support. Exact ArraySubs Retention Flow blueprint inside.",
    h1: "The full targeted save funnel",
    heroSubtitle:
      "Require a reason, then show each customer the one offer most likely to save them — discount for price, pause for breaks, support for problems.",
    heroHighlights: ["Reason-required", "Each reason → best offer", "All four offer types"],
    intro:
      "The highest-converting retention setup isn’t one offer — it’s a ==reason-targeted funnel==. Require a cancellation reason, then map ==each reason to the offer most likely to save it==: discount and downgrade for ‘too expensive,’ pause for ‘need a break,’ support for ‘technical issues.’ This recipe is the master blueprint that combines the individual offer recipes into one coherent funnel.",
    settings: [
      {
        setting: "Require Cancellation Reason",
        value: "On",
        where: "Retention Flow page",
      },
      {
        setting: "Discount Offer",
        value: "On · 20% · 3 cycles · reasons: Too expensive",
        where: "Retention Flow",
      },
      {
        setting: "Downgrade Offer",
        value: "On · reasons: Too expensive, Missing features",
        where: "Retention Flow",
      },
      {
        setting: "Pause Offer",
        value: "On · 30 days · reasons: Temporary break, Not using",
        where: "Retention Flow",
      },
      {
        setting: "Contact Support Offer",
        value: "On · URL set · reasons: Technical issues",
        where: "Retention Flow",
      },
    ],
    outcomes: [
      "Every canceller picks a reason, so offers are precisely targeted.",
      "Price objections see a discount and a downgrade.",
      "Break-seekers see a pause; problem-citers see support.",
      "Maximum save rate from a single coherent funnel.",
    ],
    bestFor: [
      "Mature subscriptions optimising churn seriously",
      "Stores with tiers and a support hub in place",
      "Anyone combining the individual offer recipes",
    ],
    steps: [
      {
        title: "Require a cancellation reason",
        description:
          "On the Retention Flow page, enable Require Cancellation Reason and review the 7 default reasons.",
        manual: M.cancellation,
      },
      {
        title: "Map price reasons to discount + downgrade",
        description:
          "Enable the Discount Offer (20%/3 cycles) and Downgrade Offer, both targeted at ‘Too expensive’; add ‘Missing features’ to the downgrade.",
        manual: M.offers,
      },
      {
        title: "Map breaks to pause, problems to support",
        description:
          "Enable the Pause Offer (30 days) for ‘temporary break’/’not using,’ and the Contact Support offer for ‘technical issues.’",
        manual: M.offers,
      },
      {
        title: "Measure and iterate",
        description:
          "Use Retention Analytics to see which reasons dominate and which offers save best, then rebalance.",
        manual: M.retentionAnalytics,
      },
    ],
    notes: [
      "Multiple eligible offers can show at once — a price objector can see both discount and downgrade cards.",
      "The downgrade offer needs Pro plan switching with linked downgrade products.",
      "Always keep an ‘Other’ reason with offers for the unexpected cases.",
    ],
    faq: [
      {
        question: "Can one reason trigger several offers?",
        answer:
          "Yes. ‘Too expensive’ can show both a discount and a downgrade. All eligible offers appear together and the customer chooses one.",
      },
      {
        question: "What if a customer declines everything?",
        answer:
          "They must explicitly click ‘No thanks, continue to cancel.’ Closing the modal does not cancel — and accepting any offer clears the pending cancellation.",
      },
    ],
    relatedFeatures: ["retention-and-refunds", "retention-analytics", "subscription-products"],
    relatedRecipes: ["discount-too-expensive", "downgrade-offer", "end-of-period-cancel-undo"],
  },
  {
    slug: "multi-offer-other",
    group: "retention-coupons",
    icon: LayoutGrid,
    name: "Show every offer for ‘Other’",
    cardDescription:
      "For the catch-all ‘Other’ reason, present all eligible offers at once and let the customer pick what fits.",
    tier: "Free",
    seoTitle: "Show Multiple Retention Offers at Once on WooCommerce",
    metaDescription:
      "Present discount, pause, downgrade, and support offers together for the ‘Other’ cancellation reason. Exact ArraySubs Retention Flow settings for multi-offer.",
    h1: "Show every offer for ‘Other’",
    heroSubtitle:
      "When you can’t predict the reason, show everything. Present all eligible offers together for ‘Other’ and let the customer self-select.",
    heroHighlights: ["All offers at once", "For the ‘Other’ reason", "Customer self-selects"],
    intro:
      "The ==‘Other’ reason== is the wildcard — you don’t know why they’re leaving, so ==don’t guess==. ArraySubs shows ==all eligible offers simultaneously==, so for ‘Other’ you can present discount, pause, downgrade, and support together and let the customer pick whatever resonates. The trick is leaving each offer’s reason targeting empty (which shows it for all reasons) or explicitly including ‘Other.’ This recipe maximises coverage for unpredictable churn.",
    settings: [
      {
        setting: "Enable Retention Offers",
        value: "On",
        where: "Retention Flow page",
      },
      {
        setting: "Offers’ ‘Show for these reasons’",
        value: "Empty (= all reasons, incl. Other)",
        where: "Each offer",
      },
      {
        setting: "Discount Offer",
        value: "On · e.g. 15% · 3 cycles",
        where: "Retention Flow",
      },
      {
        setting: "Pause Offer",
        value: "On · 30 days",
        where: "Retention Flow",
      },
      {
        setting: "‘Other’ reason free-text",
        value: "Enabled automatically",
        where: "Cancellation reasons",
      },
    ],
    outcomes: [
      "‘Other’ cancellers see every eligible offer at once.",
      "The customer self-selects the most relevant save.",
      "Free-text feedback is captured alongside the choice.",
      "Maximum coverage when the reason is unknown.",
    ],
    bestFor: [
      "Catch-all handling for unpredictable churn",
      "Stores still learning their churn reasons",
      "Maximising save options when in doubt",
    ],
    steps: [
      {
        title: "Keep the ‘Other’ reason",
        description:
          "Ensure ‘Other’ is in your cancellation reasons — selecting it reveals a free-text box for feedback.",
        manual: M.cancellation,
      },
      {
        title: "Enable several offers",
        description:
          "Turn on the Discount and Pause offers (and others you support) on the Retention Flow page.",
        manual: M.offers,
      },
      {
        title: "Leave reason targeting empty",
        description:
          "For the offers you want shown to everyone, leave ‘Show for these reasons’ empty — that displays them for all reasons, including ‘Other.’",
        manual: M.offers,
      },
    ],
    notes: [
      "An empty ‘Show for these reasons’ means the offer shows for ALL reasons — the broadest setting.",
      "Built-in eligibility checks (subscription value, customer spend, remaining days) still apply per offer.",
      "Accepting one offer closes the modal — customers can’t stack two in one cancellation.",
    ],
    faq: [
      {
        question: "How many offers can appear together?",
        answer:
          "There’s no limit — every enabled offer the customer is eligible for shows as its own card in the retention modal.",
      },
      {
        question: "Does ‘Other’ capture written feedback?",
        answer:
          "Yes. Selecting ‘Other’ reveals a free-text field, and that feedback is recorded with the cancellation for analysis.",
      },
    ],
    relatedFeatures: ["retention-and-refunds", "retention-analytics"],
    relatedRecipes: ["require-reason-targeted-funnel", "contact-support-deflect", "discount-too-expensive"],
  },
  {
    slug: "aggressive-save-50",
    group: "retention-coupons",
    icon: HeartHandshake,
    name: "Deep 50%-off save",
    cardDescription:
      "Throw a deep, longer discount at high-value cancellers — e.g. 50% off for 6 cycles — to protect lifetime value.",
    tier: "Free",
    seoTitle: "Deep Retention Discount to Save High-Value Customers on WooCommerce",
    metaDescription:
      "Offer a deep, multi-cycle discount (e.g. 50% off for 6 renewals) to retain high-value subscribers at cancellation. Exact ArraySubs Retention Flow settings inside.",
    h1: "Deep 50%-off save for high-value customers",
    heroSubtitle:
      "When the lifetime value is high, a deep discount still wins. Offer a steep, multi-cycle discount to keep your best subscribers.",
    heroHighlights: ["50% off for 6 cycles", "Protects high LTV", "Automatic on accept"],
    intro:
      "For ==high-lifetime-value subscribers==, even a steep discount beats losing them — half-price for six months still earns more than a cancellation. This recipe configures a ==deep 50%-off-for-6-cycles== retention discount. It’s the heavy artillery: combine it with the built-in eligibility conditions so it’s reserved for customers whose value justifies it.",
    settings: [
      {
        setting: "Enable Discount Offer",
        value: "On",
        where: "Retention Flow → Discount Offer",
      },
      {
        setting: "Discount Percentage",
        value: "50%",
        where: "Discount Offer",
      },
      {
        setting: "Number of Billing Cycles",
        value: "6",
        where: "Discount Offer",
      },
      {
        setting: "Show for these reasons",
        value: "Too expensive (or empty for all)",
        where: "Discount Offer",
      },
      {
        setting: "Eligibility (built-in)",
        value: "Subscription value / customer spend gates",
        where: "Automatic",
      },
    ],
    outcomes: [
      "High-value cancellers are offered 50% off for 6 renewals.",
      "Accepting halves the next 6 renewals automatically.",
      "Protects lifetime value that a cancellation would erase.",
      "Built-in eligibility helps reserve it for worthwhile accounts.",
    ],
    bestFor: [
      "High-LTV plans and annual-equivalent customers",
      "‘Last resort’ saves before losing a great customer",
      "Stores with margin to defend retention hard",
    ],
    steps: [
      {
        title: "Enable the discount offer",
        description:
          "On the Retention Flow page, enable Retention Offers, then Enable Discount Offer.",
        manual: M.offers,
      },
      {
        title: "Go deep and long",
        description:
          "Set Discount Percentage = 50 and Number of Billing Cycles = 6 (the upper end of the 1–12 range).",
        manual: M.offers,
      },
      {
        title: "Reserve it for the right customers",
        description:
          "Lean on the built-in eligibility conditions (subscription value, total spend) so a deep discount isn’t shown to low-value accounts.",
        manual: M.offers,
      },
    ],
    notes: [
      "Number of Billing Cycles ranges 1–12; 6 is a strong-but-bounded save.",
      "One discount per subscription — once used, it won’t be re-offered on that subscription.",
      "Discount renewal adjustments are automatic on manual payments and Stripe.",
    ],
    faq: [
      {
        question: "Isn’t 50% off too generous?",
        answer:
          "For high-LTV customers, half price for six months still beats a cancellation. Use eligibility gating so it only reaches accounts whose value justifies it.",
      },
      {
        question: "What happens after the 6 discounted cycles?",
        answer:
          "Renewals automatically return to full price once the 6 cycles are exhausted; the discount metadata is cleaned up.",
      },
    ],
    relatedFeatures: ["retention-and-refunds", "retention-analytics", "billing-and-renewals"],
    relatedRecipes: ["discount-too-expensive", "free-month-winback", "downgrade-offer"],
  },
  {
    slug: "welcome-15-one-time",
    group: "retention-coupons",
    icon: TicketPercent,
    name: "Welcome 15%-off coupon",
    cardDescription:
      "A one-time welcome coupon that discounts only the first payment — renewals stay full price.",
    tier: "Free",
    seoTitle: "One-Time Welcome Coupon for WooCommerce Subscriptions",
    metaDescription:
      "Create a WooCommerce subscription coupon that discounts only the first payment (one-time), with renewals at full price. Exact ArraySubs coupon settings inside.",
    h1: "One-time welcome coupon (first payment only)",
    heroSubtitle:
      "Discount the first payment to win the signup, then charge full price on every renewal — the classic welcome offer.",
    heroHighlights: ["15% off first payment", "Renewals full price", "One-time duration"],
    intro:
      "A ==one-time welcome coupon== lowers the barrier to that ==first signup== without eroding your recurring revenue: it discounts the initial order only, and ==every renewal is full price==. ArraySubs extends WooCommerce coupons with subscription settings to control exactly this. This recipe builds a ‘WELCOME15’ code — 15% off the first payment, then standard pricing.",
    settings: [
      {
        setting: "Coupon code",
        value: "WELCOME15",
        where: "Marketing → Coupons",
      },
      {
        setting: "Discount type / amount",
        value: "Percentage · 15%",
        where: "Coupon → General",
      },
      {
        setting: "Apply to subscriptions",
        value: "On",
        where: "Coupon → ArraySubs Subscription Settings",
      },
      {
        setting: "Discount duration",
        value: "One-time",
        where: "ArraySubs Subscription Settings",
      },
    ],
    outcomes: [
      "Customer gets 15% off the initial order at checkout.",
      "All renewals are charged at full price.",
      "Behaves like a standard WooCommerce coupon on the first order.",
      "Locks in the captured value even if you edit the coupon later.",
    ],
    bestFor: [
      "New-customer acquisition offers",
      "Email/ads welcome promos",
      "Discounting signup without touching recurring revenue",
    ],
    steps: [
      {
        title: "Create the coupon",
        description:
          "Go to Marketing → Coupons, add ‘WELCOME15,’ set Discount type = Percentage and Amount = 15.",
        manual: M.coupons,
      },
      {
        title: "Enable subscription handling",
        description:
          "In the ArraySubs Subscription Settings section of the coupon, tick ‘Apply to subscriptions.’",
        manual: M.coupons,
      },
      {
        title: "Set one-time duration",
        description:
          "Set Discount duration = One-time so the discount applies to the initial order only, then publish.",
        manual: M.coupons,
      },
    ],
    notes: [
      "A regular WooCommerce coupon already behaves as a one-time checkout discount; ‘Apply to subscriptions’ + One-time makes the intent explicit.",
      "Coupons apply to the recurring product price, not the signup fee (the fee follows standard WC behaviour).",
      "Coupon values are locked at capture — editing the coupon later doesn’t change existing subscriptions.",
    ],
    faq: [
      {
        question: "Will this discount renewals too?",
        answer:
          "No. With duration set to One-time, only the initial checkout order is discounted; every renewal is charged at full price.",
      },
      {
        question: "Can customers add a coupon to an existing subscription?",
        answer:
          "No. Coupons are captured at initial checkout only. There’s no self-service way to add one to an already-active subscription.",
      },
    ],
    relatedFeatures: ["coupons", "subscription-products", "checkout-and-payments"],
    relatedRecipes: ["half-off-3-months", "free-first-month-coupon", "fixed-amount-first-order"],
  },
  {
    slug: "half-off-3-months",
    group: "retention-coupons",
    icon: BadgePercent,
    name: "50% off first 3 months",
    cardDescription:
      "A recurring coupon that discounts the first few renewals — e.g. 50% off for 3 months counting the initial order.",
    tier: "Free",
    seoTitle: "Recurring Coupon: 50% Off First 3 Months on WooCommerce",
    metaDescription:
      "Create a recurring WooCommerce subscription coupon that gives 50% off the first 3 payments, then full price. Exact ArraySubs coupon settings and cycle counting inside.",
    h1: "50% off the first 3 months (recurring coupon)",
    heroSubtitle:
      "Carry a discount across the first few renewals, not just checkout — then return to full price automatically.",
    heroHighlights: ["50% off, 3 payments", "Counts initial checkout", "Then full price"],
    intro:
      "A ==recurring coupon== discounts ==more than just checkout== — it carries the discount across the first few renewals, then drops to full price. It’s the strongest acquisition offer because the customer feels the value for months. ArraySubs tracks the remaining cycles per subscription. This recipe builds ‘HALFOFF3’: 50% off for 3 payments, with the initial checkout counted as one of the three.",
    settings: [
      {
        setting: "Coupon code",
        value: "HALFOFF3",
        where: "Marketing → Coupons",
      },
      {
        setting: "Discount type / amount",
        value: "Percentage · 50%",
        where: "Coupon → General",
      },
      {
        setting: "Apply to subscriptions",
        value: "On",
        where: "ArraySubs Subscription Settings",
      },
      {
        setting: "Discount duration",
        value: "Recurring",
        where: "ArraySubs Subscription Settings",
      },
      {
        setting: "Number of renewal cycles",
        value: "3",
        where: "ArraySubs Subscription Settings",
      },
      {
        setting: "Count initial checkout",
        value: "On",
        where: "ArraySubs Subscription Settings",
      },
    ],
    outcomes: [
      "Customer pays 50% off on the initial order and the next 2 renewals.",
      "Three total discounted payments (initial counts as one).",
      "From the 4th payment, full price resumes automatically.",
      "Remaining cycles are tracked per subscription.",
    ],
    bestFor: [
      "Strong acquisition and launch promos",
      "Offers where months of value drive conversion",
      "Competing on a ‘first months cheap’ pitch",
    ],
    steps: [
      {
        title: "Create the percentage coupon",
        description:
          "Add ‘HALFOFF3’ under Marketing → Coupons with Discount type = Percentage, Amount = 50.",
        manual: M.coupons,
      },
      {
        title: "Make it recurring",
        description:
          "In ArraySubs Subscription Settings, enable ‘Apply to subscriptions’ and set Discount duration = Recurring.",
        manual: M.coupons,
      },
      {
        title: "Set cycles and count the first order",
        description:
          "Set Number of renewal cycles = 3 and enable ‘Count initial checkout’ so the first order is one of the three discounted payments.",
        manual: M.coupons,
      },
    ],
    notes: [
      "Without ‘Count initial checkout,’ you’d get the initial order plus 3 discounted renewals (4 total) — enabling it makes it 3 total.",
      "Recurring coupon discounts apply automatically on manual payments and Stripe; other gateways safely skip the renewal discount.",
      "Set cycles to 0 for an unlimited recurring discount instead.",
    ],
    faq: [
      {
        question: "Why count the initial checkout?",
        answer:
          "It controls the math. With it on, the initial order is one of the 3 discounted payments (3 total). With it off, you discount the initial order plus 3 renewals (4 total).",
      },
      {
        question: "What if I change the coupon to 30% later?",
        answer:
          "Existing subscriptions keep the 50% captured at signup — stored values are used, not live ones. Only new subscriptions get 30%.",
      },
    ],
    relatedFeatures: ["coupons", "subscription-products", "billing-and-renewals"],
    relatedRecipes: ["welcome-15-one-time", "lifetime-recurring-10", "intro-pricing-step-up"],
  },
  {
    slug: "lifetime-recurring-10",
    group: "retention-coupons",
    icon: Ticket,
    name: "Lifetime 10%-off coupon",
    cardDescription:
      "A recurring coupon with unlimited cycles that discounts every renewal for the life of the subscription.",
    tier: "Free",
    seoTitle: "Lifetime Recurring Discount Coupon on WooCommerce Subscriptions",
    metaDescription:
      "Create a WooCommerce coupon that discounts every renewal forever (unlimited cycles) — ideal for launch or loyalty pricing. Exact ArraySubs coupon settings inside.",
    h1: "Lifetime recurring discount (unlimited cycles)",
    heroSubtitle:
      "Reward launch buyers or loyal customers with a discount that applies to every renewal, for as long as they stay subscribed.",
    heroHighlights: ["10% off every renewal", "Unlimited cycles", "Great for launch loyalty"],
    intro:
      "A ==lifetime recurring coupon== applies a discount to ==every renewal, indefinitely== — a powerful loyalty and launch hook. ArraySubs supports this by setting the renewal cycle count to ==0 (unlimited)==. This recipe builds ‘LAUNCH10’: a permanent 10% discount on every renewal for the life of the subscription, as long as the coupon still exists in WooCommerce.",
    settings: [
      {
        setting: "Coupon code",
        value: "LAUNCH10",
        where: "Marketing → Coupons",
      },
      {
        setting: "Discount type / amount",
        value: "Percentage · 10%",
        where: "Coupon → General",
      },
      {
        setting: "Apply to subscriptions",
        value: "On",
        where: "ArraySubs Subscription Settings",
      },
      {
        setting: "Discount duration",
        value: "Recurring",
        where: "ArraySubs Subscription Settings",
      },
      {
        setting: "Number of renewal cycles",
        value: "0 (unlimited)",
        where: "ArraySubs Subscription Settings",
      },
    ],
    outcomes: [
      "Every renewal is discounted 10%, with no cycle limit.",
      "The discount lasts as long as the subscription (and coupon) exist.",
      "Captured value is locked even if you later edit the coupon.",
      "A strong loyalty/launch incentive.",
    ],
    bestFor: [
      "Launch-event loyalty pricing",
      "Founding-customer perks via a code",
      "Affiliate/partner permanent discounts",
    ],
    steps: [
      {
        title: "Create the percentage coupon",
        description:
          "Add ‘LAUNCH10’ under Marketing → Coupons with Discount type = Percentage, Amount = 10.",
        manual: M.coupons,
      },
      {
        title: "Make it recurring and unlimited",
        description:
          "Enable ‘Apply to subscriptions,’ set Discount duration = Recurring, and Number of renewal cycles = 0 for unlimited.",
        manual: M.coupons,
      },
      {
        title: "Keep the coupon alive",
        description:
          "Don’t delete or expire the WooCommerce coupon — the recurring discount stops applying if the coupon no longer exists or has expired.",
        manual: M.coupons,
      },
    ],
    notes: [
      "If the WooCommerce coupon is deleted or its expiry passes, the recurring discount stops applying to new renewals.",
      "Stored values are used on renewals, so changing the coupon later doesn’t affect existing subscribers.",
      "A coupon discount and a retention discount can stack, capped so the renewal total never goes negative.",
    ],
    faq: [
      {
        question: "How do I make the discount unlimited?",
        answer:
          "Set Number of renewal cycles to 0. That applies the discount to every renewal for the life of the subscription.",
      },
      {
        question: "What happens if I delete the coupon later?",
        answer:
          "The subscription keeps tracking cycles, but renewal discounting depends on the coupon still existing for validation — deletion can stop the discount and the admin display marks it ‘deleted.’",
      },
    ],
    relatedFeatures: ["coupons", "subscription-products", "billing-and-renewals"],
    relatedRecipes: ["half-off-3-months", "influencer-recurring-20-12", "founding-member-locked-price"],
  },
  {
    slug: "fixed-amount-first-order",
    group: "retention-coupons",
    icon: Banknote,
    name: "Fixed $-off first order",
    cardDescription:
      "A flat cash discount on the first order — e.g. $10 off the initial payment, with renewals at full price.",
    tier: "Free",
    seoTitle: "Fixed Amount Off First Order on WooCommerce Subscriptions",
    metaDescription:
      "Create a fixed-cart WooCommerce coupon that takes a flat amount off the first subscription order. Exact ArraySubs coupon settings for a $10-off welcome offer.",
    h1: "Fixed cash discount on the first order",
    heroSubtitle:
      "Sometimes a flat ‘$10 off’ converts better than a percentage. Apply a fixed cash discount to the initial subscription order.",
    heroHighlights: ["$10 off first order", "Fixed-cart discount", "One-time duration"],
    intro:
      "A ==flat cash discount== — ‘$10 off’ — can convert better than a percentage because the saving is ==concrete==. ArraySubs supports all WooCommerce coupon types, including ==fixed cart==, on subscriptions. This recipe builds a ‘SAVE10’ fixed-cart coupon that takes $10 off the initial order, with renewals at full price.",
    settings: [
      {
        setting: "Coupon code",
        value: "SAVE10",
        where: "Marketing → Coupons",
      },
      {
        setting: "Discount type",
        value: "Fixed cart discount",
        where: "Coupon → General",
      },
      {
        setting: "Coupon amount",
        value: "$10.00",
        where: "Coupon → General",
      },
      {
        setting: "Apply to subscriptions",
        value: "On",
        where: "ArraySubs Subscription Settings",
      },
      {
        setting: "Discount duration",
        value: "One-time",
        where: "ArraySubs Subscription Settings",
      },
    ],
    outcomes: [
      "$10 comes off the initial subscription order.",
      "Renewals are charged at full price.",
      "Concrete cash saving that’s easy to advertise.",
      "Works with the fixed-cart and fixed-product coupon types.",
    ],
    bestFor: [
      "Flat ‘$X off’ welcome promos",
      "Low-priced plans where a percentage feels trivial",
      "Ad creatives that lead with a cash figure",
    ],
    steps: [
      {
        title: "Create a fixed-cart coupon",
        description:
          "Add ‘SAVE10’ under Marketing → Coupons, set Discount type = Fixed cart discount, Amount = 10.",
        manual: M.coupons,
      },
      {
        title: "Enable subscription handling",
        description:
          "In ArraySubs Subscription Settings, tick ‘Apply to subscriptions.’",
        manual: M.coupons,
      },
      {
        title: "Keep it one-time",
        description:
          "Set Discount duration = One-time so only the first order is discounted, then publish.",
        manual: M.coupons,
      },
    ],
    notes: [
      "For recurring fixed discounts, set duration = Recurring; a fixed-cart amount is prorated across eligible line items on each renewal.",
      "Fixed-product coupons are capped at the line item price (amount × quantity).",
      "The coupon applies to the recurring product price, not the signup fee.",
    ],
    faq: [
      {
        question: "Can I make the $10 apply to renewals too?",
        answer:
          "Yes. Set Discount duration = Recurring and a cycle count. A fixed-cart amount is prorated across eligible items on each renewal order.",
      },
      {
        question: "Which coupon types work on subscriptions?",
        answer:
          "All standard WooCommerce types — percentage, fixed cart, and fixed product — are supported on subscription products.",
      },
    ],
    relatedFeatures: ["coupons", "subscription-products", "checkout-and-payments"],
    relatedRecipes: ["welcome-15-one-time", "free-first-month-coupon", "half-off-3-months"],
  },
  {
    slug: "free-first-month-coupon",
    group: "retention-coupons",
    icon: Gift,
    name: "Free first month coupon",
    cardDescription:
      "A 100%-off coupon on the first payment so customers start free, then renew at full price.",
    tier: "Free",
    seoTitle: "Free First Month Coupon on WooCommerce Subscriptions",
    metaDescription:
      "Create a 100%-off WooCommerce subscription coupon that makes the first payment free, then renews at full price. Exact ArraySubs coupon settings inside.",
    h1: "Free first month coupon",
    heroSubtitle:
      "Let customers start completely free with a 100%-off code on the first payment, then bill normally from the first renewal.",
    heroHighlights: ["100% off first payment", "$0 to start", "Full price on renewals"],
    intro:
      "A ==‘free first month’ coupon== is an acquisition staple — the customer pays ==$0 to start== via a 100%-off code, then renews at full price. Unlike a trial, it’s a coupon you can hand out selectively (email, partners, win-back). ArraySubs builds it as a one-time 100% coupon. This recipe creates ‘FREEMONTH’.",
    settings: [
      {
        setting: "Coupon code",
        value: "FREEMONTH",
        where: "Marketing → Coupons",
      },
      {
        setting: "Discount type / amount",
        value: "Percentage · 100%",
        where: "Coupon → General",
      },
      {
        setting: "Apply to subscriptions",
        value: "On",
        where: "ArraySubs Subscription Settings",
      },
      {
        setting: "Discount duration",
        value: "One-time",
        where: "ArraySubs Subscription Settings",
      },
      {
        setting: "Usage limit",
        value: "Optional (e.g. 1 per customer)",
        where: "Coupon → Usage limits",
      },
    ],
    outcomes: [
      "First payment is $0 with the code applied.",
      "Renewals charge full price from the first renewal.",
      "Hand it out selectively (email, partners, win-back).",
      "More controllable than a site-wide free trial.",
    ],
    bestFor: [
      "Targeted acquisition and win-back campaigns",
      "Partner/affiliate ‘first month free’ codes",
      "Promos you don’t want available to everyone",
    ],
    steps: [
      {
        title: "Create a 100% coupon",
        description:
          "Add ‘FREEMONTH’ under Marketing → Coupons with Discount type = Percentage, Amount = 100.",
        manual: M.coupons,
      },
      {
        title: "Enable subscription handling, one-time",
        description:
          "Tick ‘Apply to subscriptions’ and set Discount duration = One-time so only the first payment is free.",
        manual: M.coupons,
      },
      {
        title: "Add usage limits",
        description:
          "Optionally cap usage (e.g. once per customer) under the coupon’s Usage limits to prevent abuse.",
        manual: M.coupons,
      },
    ],
    notes: [
      "If a payment method is required at checkout, a card may still be collected even though the first order is $0.",
      "Want the recurring price free for the first month then full price? One-time 100% already achieves that on the initial order.",
      "Renewals are full price — this is not a recurring free coupon.",
    ],
    faq: [
      {
        question: "How is this different from a free trial?",
        answer:
          "A trial is a product setting available to everyone who buys; a free-first-month coupon is a code you distribute selectively, with WooCommerce usage limits and expiry under your control.",
      },
      {
        question: "Will a card be collected if the first order is $0?",
        answer:
          "Depending on gateway and your Require Payment Method setting, a payment method may still be captured at checkout for the upcoming renewals.",
      },
    ],
    relatedFeatures: ["coupons", "subscription-products", "checkout-and-payments"],
    relatedRecipes: ["welcome-15-one-time", "no-card-trial-then-monthly", "free-month-winback"],
  },
  {
    slug: "influencer-recurring-20-12",
    group: "retention-coupons",
    icon: Megaphone,
    name: "Creator code: 20% for 12 renewals",
    cardDescription:
      "A recurring partner/influencer code that discounts a year of renewals — e.g. 20% off for 12 cycles.",
    tier: "Free",
    seoTitle: "Influencer / Partner Recurring Coupon on WooCommerce",
    metaDescription:
      "Create a recurring WooCommerce coupon for creators and partners that discounts a set number of renewals (e.g. 20% off for 12 cycles). Exact ArraySubs settings inside.",
    h1: "Creator code — 20% off for 12 renewals",
    heroSubtitle:
      "Give influencers and partners a code that rewards their audience with a year of savings, then returns to full price.",
    heroHighlights: ["20% off, 12 cycles", "Audience keeps it ~a year", "Then full price"],
    intro:
      "Creator and partner codes convert best when the audience gets ==lasting value==, not just a checkout discount. A ==recurring coupon for a bounded number of cycles== — 20% off for 12 renewals — gives partners’ audiences ==roughly a year of savings== on a monthly plan, then returns to full price. ArraySubs tracks the remaining cycles per subscriber. This recipe builds a ‘CREATOR20’ partner code.",
    settings: [
      {
        setting: "Coupon code",
        value: "CREATOR20 (or per-partner)",
        where: "Marketing → Coupons",
      },
      {
        setting: "Discount type / amount",
        value: "Percentage · 20%",
        where: "Coupon → General",
      },
      {
        setting: "Apply to subscriptions",
        value: "On",
        where: "ArraySubs Subscription Settings",
      },
      {
        setting: "Discount duration",
        value: "Recurring",
        where: "ArraySubs Subscription Settings",
      },
      {
        setting: "Number of renewal cycles",
        value: "12",
        where: "ArraySubs Subscription Settings",
      },
      {
        setting: "Count initial checkout",
        value: "Optional",
        where: "ArraySubs Subscription Settings",
      },
    ],
    outcomes: [
      "Audience gets 20% off for 12 billing cycles (~a year monthly).",
      "Returns to full price automatically after 12 cycles.",
      "Per-partner codes make attribution easy.",
      "Captured value is locked per subscriber at signup.",
    ],
    bestFor: [
      "Influencer and affiliate partnerships",
      "Bounded ‘a year of savings’ promos",
      "Campaigns needing per-code attribution",
    ],
    steps: [
      {
        title: "Create a per-partner percentage coupon",
        description:
          "Add a code like ‘CREATOR20’ under Marketing → Coupons with Discount type = Percentage, Amount = 20. Use unique codes per partner for attribution.",
        manual: M.coupons,
      },
      {
        title: "Make it recurring for 12 cycles",
        description:
          "Enable ‘Apply to subscriptions,’ set Discount duration = Recurring and Number of renewal cycles = 12.",
        manual: M.coupons,
      },
      {
        title: "Decide initial-order counting",
        description:
          "Enable ‘Count initial checkout’ if you want the first order to be one of the 12; leave it off to discount 12 renewals on top of checkout.",
        manual: M.coupons,
      },
    ],
    notes: [
      "Use unique per-partner codes and WooCommerce usage reports to attribute signups.",
      "Recurring discounts apply automatically on manual payments and Stripe; other gateways skip renewal discounting safely.",
      "Coupon tracking is preserved if the customer switches plans, continuing to apply remaining cycles.",
    ],
    faq: [
      {
        question: "How long does 12 cycles last?",
        answer:
          "On a monthly plan, roughly a year. On a quarterly plan it would be three years — the count is in billing cycles, not months.",
      },
      {
        question: "Can I track which partner drove signups?",
        answer:
          "Yes. Use unique codes per partner; WooCommerce coupon usage and (Pro) order-list coupon filters let you attribute and report on each code.",
      },
    ],
    relatedFeatures: ["coupons", "subscription-products", "analytics"],
    relatedRecipes: ["lifetime-recurring-10", "half-off-3-months", "welcome-15-one-time"],
  },

  // ============================================================
  // GROUP 3 — Plan switching & features
  // ============================================================
  {
    slug: "upgrade-path-tiers",
    group: "plan-switching-features",
    icon: ChevronsUp,
    name: "Upgrade paths between tiers",
    cardDescription:
      "Let customers move up to a higher plan with the price difference prorated automatically — Basic → Pro → Enterprise.",
    tier: "Free",
    seoTitle: "Subscription Upgrade Paths With Proration on WooCommerce",
    metaDescription:
      "Configure upgrade paths between WooCommerce subscription tiers so customers move to a higher plan with the difference prorated automatically. Exact ArraySubs settings inside.",
    h1: "Upgrade paths between plan tiers",
    heroSubtitle:
      "Give customers a one-click path to a higher tier — ArraySubs prorates the unused time and charges only the difference.",
    heroHighlights: ["Basic → Pro → Enterprise", "Difference prorated", "Free core"],
    intro:
      "An ==upgrade path== lets a subscriber move to a ==higher-priced plan== mid-cycle without cancelling and re-buying. ArraySubs handles the money: it ==credits the unused time== on the current plan and ==charges only the difference== for the new one. You define which products a plan can upgrade to on the Linked Products tab; ArraySubs even ==verifies direction by normalized daily rate== so an ‘upgrade’ is always actually pricier. This recipe wires Basic → Pro → Enterprise.",
    settings: [
      {
        setting: "Upgrade to",
        value: "Target higher-priced product(s)",
        where: "Product → Linked Products",
      },
      {
        setting: "Plan switching · Enabled",
        value: "On",
        where: "Settings → Plan Switching",
      },
      {
        setting: "Allow upgrades",
        value: "On",
        where: "Settings → Plan Switching",
      },
      {
        setting: "Proration type",
        value: "Prorate immediately",
        where: "Settings → Plan Switching",
      },
      {
        setting: "Proration rounding",
        value: "Round (default)",
        where: "Settings → Plan Switching",
      },
    ],
    outcomes: [
      "Customers upgrade to a higher tier in one action.",
      "Unused time is credited; only the difference is charged.",
      "A plan_switch order records the full proration math.",
      "Direction is auto-verified by daily rate (±5% tolerance).",
    ],
    bestFor: [
      "Good-better-best SaaS and membership tiers",
      "Any catalog with clear upgrade ladders",
      "Stores that want frictionless expansion revenue",
    ],
    steps: [
      {
        title: "Open the Linked Products tab",
        description:
          "Edit the lower-tier subscription product and open Linked Products. The Subscription Plan Switching section appears for subscription products.",
        manual: M.planSwitching,
      },
      {
        title: "Set the upgrade targets",
        description:
          "In ‘Upgrade to,’ search and select the higher-priced products (e.g. on Basic, add Pro and Enterprise). Repeat per product to build the ladder.",
        manual: M.planSwitching,
      },
      {
        title: "Set proration to immediate",
        description:
          "In Settings → Plan Switching, keep Proration type = Prorate immediately so upgrades charge the difference now.",
        manual: M.planSwitching,
      },
      {
        title: "Confirm direction detection",
        description:
          "ArraySubs compares normalized daily rates — a target beyond +5% is treated as an upgrade regardless of which field it’s in.",
        manual: M.planSwitching,
      },
    ],
    notes: [
      "Paths are one-directional — adding Pro to Basic’s ‘Upgrade to’ does not auto-create a downgrade from Pro to Basic.",
      "For variable products, set switching fields per variation on the Variations tab, not on Linked Products.",
      "A WooCommerce checkout of a replacement plan is always treated as an immediate switch, even under Apply-at-renewal.",
    ],
    faq: [
      {
        question: "How is the upgrade price calculated?",
        answer:
          "ArraySubs credits the unused portion of the current plan (daily rate × days remaining) and charges the new plan minus that credit — the net difference, plus any upgrade fee you set.",
      },
      {
        question: "Can customers upgrade between variations of one product?",
        answer:
          "Yes. Switching paths can connect individual variations, so a Monthly variation can upgrade to an Annual one.",
      },
    ],
    relatedFeatures: ["subscription-products", "billing-and-renewals", "customer-portal"],
    relatedRecipes: ["downgrade-with-credit", "crossgrade-lateral", "tiered-bronze-silver-gold"],
  },
  {
    slug: "downgrade-with-credit",
    group: "plan-switching-features",
    icon: ChevronsDown,
    name: "Downgrade with prorated credit",
    cardDescription:
      "Let customers drop to a cheaper plan and bank the unused balance as store credit instead of losing them.",
    tier: "Free + Pro",
    seoTitle: "Subscription Downgrade With Prorated Store Credit on WooCommerce",
    metaDescription:
      "Let customers downgrade to a cheaper WooCommerce plan and receive the unused balance as store credit. Exact ArraySubs plan-switching + store-credit settings inside.",
    h1: "Downgrade with prorated credit",
    heroSubtitle:
      "A downgrade keeps the customer. Drop them to a cheaper plan and bank the unused time as store credit toward future renewals.",
    heroHighlights: ["Drop to a cheaper plan", "Unused time → store credit", "Retain instead of lose"],
    intro:
      "A ==downgrade path== is a retention tool: rather than cancel, a customer moves to a ==cheaper plan==, and the ==unused balance== on their current plan is returned as ==store credit (Pro)== they can spend on future renewals. You configure downgrade targets on Linked Products; ArraySubs computes the prorated credit automatically. This recipe sets up a downgrade with credit-back.",
    settings: [
      {
        setting: "Downgrade to",
        value: "Target lower-priced product(s)",
        where: "Product → Linked Products",
      },
      {
        setting: "Allow downgrades",
        value: "On",
        where: "Settings → Plan Switching",
      },
      {
        setting: "Proration type",
        value: "Prorate immediately",
        where: "Settings → Plan Switching",
      },
      {
        setting: "Store Credit module",
        value: "Enabled (Pro) — holds the returned balance",
        where: "Settings → Store Credit",
      },
    ],
    outcomes: [
      "Customers self-downgrade instead of cancelling.",
      "Unused time on the old plan is credited back.",
      "With Store Credit (Pro), that balance is spendable on renewals.",
      "Direction is auto-detected as a downgrade by daily rate.",
    ],
    bestFor: [
      "Tiered plans defending against price churn",
      "Pairing with the retention downgrade offer",
      "Keeping value in-store instead of refunding cash",
    ],
    steps: [
      {
        title: "Set downgrade targets",
        description:
          "On the higher-tier product’s Linked Products tab, add the cheaper plan(s) to ‘Downgrade to.’",
        manual: M.planSwitching,
      },
      {
        title: "Keep proration immediate",
        description:
          "With Proration type = Prorate immediately, the unused balance is calculated as a credit at the moment of switch.",
        manual: M.planSwitching,
      },
      {
        title: "Enable Store Credit to hold the balance",
        description:
          "Turn on the Pro Store Credit module so the downgrade’s credit lands in the customer’s wallet for future orders.",
        manual: M.generalSettings,
      },
    ],
    notes: [
      "On a downgrade the net proration is typically a credit (negative charge) rather than a payment.",
      "Store Credit is a Pro module — without it, credit-back handling is limited.",
      "This pairs naturally with the retention ‘downgrade offer’ shown at cancellation.",
    ],
    faq: [
      {
        question: "Does the customer get cash back on a downgrade?",
        answer:
          "By default the unused balance becomes store credit (Pro) toward future renewals, not a cash refund — keeping the value inside your store.",
      },
      {
        question: "How does ArraySubs know it’s a downgrade?",
        answer:
          "It compares normalized daily rates; a target more than 5% cheaper per day is classified as a downgrade automatically.",
      },
    ],
    relatedFeatures: ["subscription-products", "store-credit", "retention-and-refunds"],
    relatedRecipes: ["upgrade-path-tiers", "downgrade-offer", "auto-downgrade-on-failed-payment"],
  },
  {
    slug: "crossgrade-lateral",
    group: "plan-switching-features",
    icon: ArrowLeftRight,
    name: "Crossgrade between similar plans",
    cardDescription:
      "Let customers switch sideways between similarly-priced plans — e.g. swap a Coffee box for a Tea box — with no proration.",
    tier: "Free",
    seoTitle: "Crossgrade Between Similar Subscription Plans on WooCommerce",
    metaDescription:
      "Let customers switch laterally between similarly-priced WooCommerce plans with no proration. Exact ArraySubs crossgrade settings and how direction is detected.",
    h1: "Crossgrade between similar plans",
    heroSubtitle:
      "Some switches aren’t up or down — they’re sideways. Let customers swap between plans of similar value with no proration math.",
    heroHighlights: ["Lateral plan swaps", "No proration by default", "Auto-detected by price"],
    intro:
      "A ==crossgrade== is a ==lateral switch== between plans of ==similar value== — swapping a Coffee box for a Tea box, or Plan A for Plan B at the same price. ArraySubs detects a crossgrade when the two plans’ ==normalized daily rates are within 5%== of each other, and applies ==no proration or credit by default==. You list the swap targets on Linked Products. This recipe enables sideways switching.",
    settings: [
      {
        setting: "Crossgrade to",
        value: "Target similar-priced product(s)",
        where: "Product → Linked Products",
      },
      {
        setting: "Allow crossgrades",
        value: "On",
        where: "Settings → Plan Switching",
      },
      {
        setting: "Direction detection",
        value: "Daily rates within ±5% = crossgrade",
        where: "Automatic",
      },
      {
        setting: "Crossgrade fee",
        value: "$0 (optional flat fee)",
        where: "Settings → Plan Switching",
      },
    ],
    outcomes: [
      "Customers swap sideways between similar plans.",
      "No proration or credit is applied by default.",
      "Crossgrade is auto-detected when prices are within 5%.",
      "An optional flat crossgrade fee can be added.",
    ],
    bestFor: [
      "Boxes with interchangeable variants (flavours, themes)",
      "Same-price plan swaps and re-selections",
      "Letting customers change their mind without cost",
    ],
    steps: [
      {
        title: "Add crossgrade targets",
        description:
          "On the product’s Linked Products tab, add the similar-value product(s) to ‘Crossgrade to.’",
        manual: M.planSwitching,
      },
      {
        title: "Allow crossgrades globally",
        description:
          "In Settings → Plan Switching, ensure Allow crossgrades is on.",
        manual: M.planSwitching,
      },
      {
        title: "Optionally add a swap fee",
        description:
          "Set a Crossgrade fee if you want a small flat charge per sideways switch; leave at $0 for free swaps.",
        manual: M.planSwitching,
      },
    ],
    notes: [
      "If two plans differ by more than 5% per day, ArraySubs reclassifies the switch as an upgrade or downgrade automatically.",
      "Crossgrades apply no proration by default, so timing of the swap doesn’t change the price.",
      "Paths are one-directional — add the reverse crossgrade on the other product too.",
    ],
    faq: [
      {
        question: "Is a crossgrade ever charged?",
        answer:
          "Not by default — crossgrades apply no proration or credit. The only charge is an optional flat crossgrade fee if you configure one.",
      },
      {
        question: "What if the two plans aren’t exactly the same price?",
        answer:
          "As long as their normalized daily rates are within 5%, ArraySubs treats it as a crossgrade. Beyond that, it becomes an upgrade or downgrade.",
      },
    ],
    relatedFeatures: ["subscription-products", "customer-portal"],
    relatedRecipes: ["upgrade-path-tiers", "downgrade-with-credit", "customer-self-serve-switch"],
  },
  {
    slug: "switch-at-renewal",
    group: "plan-switching-features",
    icon: CalendarClock,
    name: "Defer switches to next renewal",
    cardDescription:
      "Schedule plan changes to apply at the next renewal instead of immediately — no mid-cycle proration charge.",
    tier: "Free",
    seoTitle: "Apply Subscription Plan Switches at Next Renewal on WooCommerce",
    metaDescription:
      "Defer WooCommerce plan changes to the next renewal instead of charging immediately, using the Apply-at-renewal proration mode. Exact ArraySubs settings and pending-switch behavior.",
    h1: "Defer plan switches to the next renewal",
    heroSubtitle:
      "Let customers change plans now but pay later — the switch is stored as pending and applied when the next renewal is paid.",
    heroHighlights: ["No mid-cycle charge", "Pending switch stored", "Applies on next renewal"],
    intro:
      "Not every switch should bill immediately. With ==Apply at renewal== proration, a plan change is ==stored as a pending switch==: the current subscription runs unchanged, the ==next renewal invoice is built at the new plan’s price==, and the switch only takes effect ==after that renewal is paid==. No surprise mid-cycle charge. This recipe sets switching to defer to renewal.",
    settings: [
      {
        setting: "Proration type",
        value: "Apply at renewal",
        where: "Settings → Plan Switching",
      },
      {
        setting: "Pending switch",
        value: "Stored: target plan, effective date, price, fee",
        where: "Automatic",
      },
      {
        setting: "Switch fee handling",
        value: "Stored with pending switch, added to renewal",
        where: "Settings → Plan Switching",
      },
    ],
    outcomes: [
      "Customers change plans with no immediate charge.",
      "The next renewal invoice uses the new plan’s price.",
      "The switch applies only after that renewal is paid.",
      "Pending switch details are visible to admin and customer.",
    ],
    bestFor: [
      "Stores avoiding mid-cycle proration confusion",
      "Plans where customers expect ‘changes at next bill’",
      "Cleaner billing with one charge per cycle",
    ],
    steps: [
      {
        title: "Set proration to Apply at renewal",
        description:
          "In Settings → Plan Switching, set Proration type = Apply at renewal. This is a global setting for all switches.",
        manual: M.planSwitching,
      },
      {
        title: "Understand the pending switch",
        description:
          "When a customer switches, ArraySubs stores the target plan, effective renewal date, price, and any fee — shown in both admin and portal views.",
        manual: M.planSwitching,
      },
      {
        title: "Confirm renewal application",
        description:
          "The next renewal invoice is built at the target price; once it’s paid, the subscription is permanently switched.",
        manual: M.renewals,
      },
    ],
    notes: [
      "Proration type is global — you can’t set per-product modes.",
      "A WooCommerce checkout of a replacement plan is always immediate, even under Apply-at-renewal.",
      "Scheduling a second pending switch asks for confirmation before replacing the first; cancelling the subscription clears any pending switch.",
    ],
    faq: [
      {
        question: "Is the customer charged anything when they switch?",
        answer:
          "No. Under Apply-at-renewal nothing is charged at switch time — the new price (plus any stored switch fee) appears on the next renewal invoice.",
      },
      {
        question: "Can a customer change their mind before the renewal?",
        answer:
          "Yes. The pending switch is visible and can be replaced (with confirmation) or cleared if the subscription is cancelled before renewal.",
      },
    ],
    relatedFeatures: ["subscription-products", "billing-and-renewals", "customer-portal"],
    relatedRecipes: ["switch-fees", "upgrade-path-tiers", "customer-self-serve-switch"],
  },
  {
    slug: "switch-fees",
    group: "plan-switching-features",
    icon: Coins,
    name: "Charge a fee to switch plans",
    cardDescription:
      "Add a flat fee on top of proration for upgrades, downgrades, or crossgrades to discourage plan-hopping.",
    tier: "Free",
    seoTitle: "Plan-Switching Fees on WooCommerce Subscriptions",
    metaDescription:
      "Add per-direction flat fees for upgrades, downgrades, and crossgrades on WooCommerce subscriptions. Exact ArraySubs switch-fee settings and how they’re billed.",
    h1: "Charge a fee to switch plans",
    heroSubtitle:
      "Discourage constant plan-hopping with a flat switch fee — configurable separately for upgrades, downgrades, and crossgrades.",
    heroHighlights: ["Per-direction flat fee", "On top of proration", "Free core"],
    intro:
      "If customers ==churn through plans== to game pricing, a ==flat switch fee== adds friction. ArraySubs lets you set a ==separate fee for each direction== — upgrade, downgrade, crossgrade — charged on top of any proration. For immediate switches the fee shows in the proration order; for Apply-at-renewal switches it’s stored with the pending switch so a later settings change won’t alter what the customer was quoted. This recipe adds switch fees.",
    settings: [
      {
        setting: "Upgrade fee",
        value: "e.g. $0 (free upgrades)",
        where: "Settings → Plan Switching",
      },
      {
        setting: "Downgrade fee",
        value: "e.g. $5",
        where: "Settings → Plan Switching",
      },
      {
        setting: "Crossgrade fee",
        value: "e.g. $2",
        where: "Settings → Plan Switching",
      },
      {
        setting: "Fee billing",
        value: "Immediate: in proration order · Renewal: stored with pending",
        where: "Automatic",
      },
    ],
    outcomes: [
      "A flat fee is added per switch direction.",
      "Upgrades can stay free while downgrades/crossgrades cost.",
      "Immediate switches show the fee in the proration order.",
      "Apply-at-renewal switches lock the quoted fee on the pending switch.",
    ],
    bestFor: [
      "Curbing plan-hopping abuse",
      "Recovering admin cost of frequent changes",
      "Keeping upgrades free but charging for lateral/down moves",
    ],
    steps: [
      {
        title: "Open Plan Switching settings",
        description:
          "Go to Settings → Plan Switching and find the switch-fee fields.",
        manual: M.planSwitching,
      },
      {
        title: "Set per-direction fees",
        description:
          "Set Upgrade fee, Downgrade fee, and Crossgrade fee independently — for example $0 / $5 / $2 to keep upgrades free.",
        manual: M.planSwitching,
      },
      {
        title: "Verify how the fee bills",
        description:
          "Immediate switches add the fee to the proration order; Apply-at-renewal switches store it with the pending switch and add it to the renewal.",
        manual: M.planSwitching,
      },
    ],
    notes: [
      "All switch fees default to $0 — switching is free until you set them.",
      "The fee is added on top of the proration calculation, not instead of it.",
      "A later fee change doesn’t alter a fee already quoted on a pending Apply-at-renewal switch.",
    ],
    faq: [
      {
        question: "Can I charge for downgrades but not upgrades?",
        answer:
          "Yes. Each direction has its own fee field — set Upgrade fee to $0 and Downgrade fee to whatever you like.",
      },
      {
        question: "Does the fee replace the proration?",
        answer:
          "No. It’s added on top of the prorated amount, so the customer pays proration plus the flat fee.",
      },
    ],
    relatedFeatures: ["subscription-products", "billing-and-renewals"],
    relatedRecipes: ["switch-at-renewal", "upgrade-path-tiers", "crossgrade-lateral"],
  },
  {
    slug: "customer-self-serve-switch",
    group: "plan-switching-features",
    icon: SlidersHorizontal,
    name: "Let customers switch in the portal",
    cardDescription:
      "Turn on self-service plan switching so customers upgrade, downgrade, or crossgrade themselves — no support ticket.",
    tier: "Free",
    seoTitle: "Self-Service Plan Switching in the Customer Portal on WooCommerce",
    metaDescription:
      "Let WooCommerce subscribers change plans themselves from the customer portal, or restrict switching to admins only. Exact ArraySubs plan-switching settings inside.",
    h1: "Let customers switch plans themselves",
    heroSubtitle:
      "Hand plan changes to the customer — upgrade, downgrade, and crossgrade options appear right on their subscription detail page.",
    heroHighlights: ["Self-service switching", "Cuts support tickets", "Or admin-only"],
    intro:
      "Plan changes shouldn’t need a support ticket. With ==Allow customer switch== on, the configured upgrade/downgrade/crossgrade options appear right on the ==subscription detail page in the customer portal==, so subscribers change plans themselves. Turn it off and switching becomes ==admin-only==. This recipe enables self-service switching on top of your configured paths.",
    settings: [
      {
        setting: "Plan switching · Enabled",
        value: "On",
        where: "Settings → Plan Switching",
      },
      {
        setting: "Allow customer switch",
        value: "On (off = admin-only)",
        where: "Settings → Plan Switching",
      },
      {
        setting: "Allow upgrades / downgrades / crossgrades",
        value: "On (per direction you offer)",
        where: "Settings → Plan Switching",
      },
      {
        setting: "Linked Products paths",
        value: "Configured on each product",
        where: "Product → Linked Products",
      },
    ],
    outcomes: [
      "Switch options appear on the customer’s subscription page.",
      "Customers self-serve upgrades, downgrades, and crossgrades.",
      "Fewer ‘please change my plan’ support tickets.",
      "Toggle off to keep switching admin-only.",
    ],
    bestFor: [
      "Reducing support load on plan changes",
      "Self-service-first subscription products",
      "Empowering customers to right-size their plan",
    ],
    steps: [
      {
        title: "Configure switch paths first",
        description:
          "Set Upgrade/Downgrade/Crossgrade targets on each product’s Linked Products tab — without paths there’s nothing to switch to.",
        manual: M.planSwitching,
      },
      {
        title: "Enable customer switching",
        description:
          "In Settings → Plan Switching, ensure Enabled and Allow customer switch are both on.",
        manual: M.planSwitching,
      },
      {
        title: "Choose which directions are allowed",
        description:
          "Toggle Allow upgrades / downgrades / crossgrades to match what you want customers to do themselves.",
        manual: M.planSwitching,
      },
    ],
    notes: [
      "When Allow customer switch is off, only admins can initiate switches from the subscription screen.",
      "Customers only see paths you configured on the product — empty fields mean no options.",
      "Self-service switching respects your global proration type and switch fees.",
    ],
    faq: [
      {
        question: "Where do customers see switch options?",
        answer:
          "On their subscription detail page in the WooCommerce My Account customer portal, when Allow customer switch is enabled and paths are configured.",
      },
      {
        question: "Can I let admins switch but not customers?",
        answer:
          "Yes. Turn Allow customer switch off — switching is then admin-only from the subscription detail screen.",
      },
    ],
    relatedFeatures: ["customer-portal", "subscription-products", "manage-subscriptions"],
    relatedRecipes: ["upgrade-path-tiers", "switch-at-renewal", "crossgrade-lateral"],
  },
  {
    slug: "whats-included-list",
    group: "plan-switching-features",
    icon: ListChecks,
    name: "‘What’s included’ on the product page",
    cardDescription:
      "Show a clear entitlements list on the product page with Feature Manager — toggles, numeric limits, and text perks.",
    tier: "Pro",
    seoTitle: "Show a ‘What’s Included’ Features List on WooCommerce (Pro)",
    metaDescription:
      "Use ArraySubs Pro Feature Manager to show a ‘What’s Included’ entitlements list on the subscription product page — toggle, number, and text features. Exact settings inside.",
    h1: "Show a ‘What’s included’ list on the product page",
    heroSubtitle:
      "Spell out exactly what a plan unlocks. Feature Manager renders a clean entitlements list on the product page so buyers convert with confidence.",
    heroHighlights: ["Toggle / number / text features", "‘What’s Included’ on product page", "Pro"],
    intro:
      "Buyers convert when they ==know exactly what they get==. ==Feature Manager (Pro)== lets you define named entitlements on a product — ==Toggle== (✓/✗), ==Number== (e.g. 500 or Unlimited), or ==Text== (e.g. ‘48-hour response’) — and renders them as a ==‘What’s Included’ list== on the product page. This recipe defines a feature set and switches the storefront list on.",
    settings: [
      {
        setting: "Enable Feature Manager",
        value: "On (master switch)",
        where: "Settings → Feature Manager",
      },
      {
        setting: "Show on Product Page",
        value: "On (renders ‘What’s Included’)",
        where: "Settings → Feature Manager",
      },
      {
        setting: "Product features",
        value: "Add Toggle / Number / Text features",
        where: "Product → Feature Manager tab",
      },
      {
        setting: "Feature enabled state",
        value: "On per feature (disabled ones are hidden)",
        where: "Product → Feature Manager tab",
      },
    ],
    outcomes: [
      "A ‘What’s Included’ list appears on the product page.",
      "Toggles show ✓/✗, numbers show a value or ‘Unlimited’, text shows the perk.",
      "Features display in the order you set; disabled ones are hidden.",
      "Buyers see entitlements before they purchase.",
    ],
    bestFor: [
      "Plans where ‘what you get’ drives the sale",
      "Simple subscription products with clear perks",
      "Reducing pre-sale questions",
    ],
    steps: [
      {
        title: "Enable Feature Manager",
        description:
          "In Settings → Feature Manager, turn on Enable Feature Manager, then Show on Product Page.",
        manual: M.featureSettings,
      },
      {
        title: "Open the Feature Manager product tab",
        description:
          "Edit the subscription product and open the Feature Manager tab (after Attributes). Click Add Feature.",
        manual: M.featureDefine,
      },
      {
        title: "Define your features",
        description:
          "Add each entitlement with a Name, Type (Toggle / Number / Text), Value, and Enabled = on. Reorder as needed, then Save and Update the product.",
        manual: M.featureDefine,
      },
      {
        title: "Verify the storefront list",
        description:
          "Open the product page and confirm the ‘What’s Included’ section lists your enabled features.",
        manual: M.featureDisplay,
      },
    ],
    notes: [
      "The storefront ‘What’s Included’ list renders on simple subscription products only — variable products show entitlements per tier in My Account instead (see the compare-tiers recipe).",
      "Number features accept a whole number or the word ‘Unlimited’.",
      "Disabling Feature Manager hides the UI but preserves all feature data on products.",
    ],
    faq: [
      {
        question: "What kinds of features can I show?",
        answer:
          "Three types: Toggle (yes/no, shown as ✓/✗), Number (a limit or ‘Unlimited’), and Text (a free-form perk like ‘Gold badge’).",
      },
      {
        question: "Why isn’t the list showing on my variable product?",
        answer:
          "The storefront ‘What’s Included’ display is for simple products. Variable-product entitlements appear per tier on the customer’s My Features page after subscribing.",
      },
    ],
    relatedFeatures: ["feature-manager", "subscription-products", "customer-portal"],
    relatedRecipes: ["compare-tiers-features", "usage-limits-metering", "tiered-bronze-silver-gold"],
  },
  {
    slug: "compare-tiers-features",
    group: "plan-switching-features",
    icon: Columns3,
    name: "Compare features across tiers",
    cardDescription:
      "Define per-variation entitlements so each tier’s features are clear, and customers see exactly what their plan grants.",
    tier: "Pro",
    seoTitle: "Compare Subscription Tier Features on WooCommerce (Pro)",
    metaDescription:
      "Define per-variation entitlements with ArraySubs Pro Feature Manager so each subscription tier’s features are clear in My Account. Exact settings and current display scope.",
    h1: "Compare features across plan tiers",
    heroSubtitle:
      "Give every tier its own entitlements so Basic, Pro, and Enterprise each show exactly what they unlock — in the customer’s My Features view.",
    heroHighlights: ["Per-variation features", "Each tier’s entitlements", "My Features view"],
    intro:
      "When you sell tiers, each one needs ==its own entitlements==. ==Feature Manager (Pro)== supports ==per-variation features== on a variable subscription, so Basic, Pro, and Enterprise each define their own Toggle/Number/Text entitlements. Customers then see exactly what their plan grants on the ==My Features== page. This recipe sets per-tier features for comparison.",
    settings: [
      {
        setting: "Product type",
        value: "Variable subscription (tiers as variations)",
        where: "Product data panel",
      },
      {
        setting: "Per-variation features",
        value: "Define features inside each variation",
        where: "Variations tab → Feature Manager",
      },
      {
        setting: "Show in My Account",
        value: "On (My Features page)",
        where: "Settings → Feature Manager",
      },
      {
        setting: "Enable Feature Comparison",
        value: "Off — reserved for a future in-switch compare UI",
        where: "Settings → Feature Manager",
      },
    ],
    outcomes: [
      "Each tier (variation) carries its own entitlement set.",
      "Customers see their plan’s features on the My Features page.",
      "Per-tier numbers, toggles, and text differentiate plans clearly.",
      "Switching plans swaps entitlements immediately.",
    ],
    bestFor: [
      "Good-better-best variable subscriptions",
      "Making tier differences explicit",
      "Pairing with upgrade/downgrade paths",
    ],
    steps: [
      {
        title: "Build tiers as variations",
        description:
          "Create a variable subscription with a tier attribute (Basic/Pro/Enterprise) — see the Bronze/Silver/Gold recipe for the tier setup.",
        manual: M.createConfigure,
      },
      {
        title: "Define features per variation",
        description:
          "On the Variations tab, open each variation’s Feature Manager section and add that tier’s entitlements (e.g. Projects 5 / 25 / Unlimited).",
        manual: M.featureDefine,
      },
      {
        title: "Show features in My Account",
        description:
          "In Settings → Feature Manager, enable Show in My Account so subscribers see their tier’s entitlements on the My Features page.",
        manual: M.featureDisplay,
      },
    ],
    notes: [
      "The storefront ‘What’s Included’ list is simple-product only; per-tier entitlements on variable products surface in My Account, not on the product page.",
      "The ‘Enable Feature Comparison’ setting is reserved for a future side-by-side compare during plan switching and has no active UI yet — build a visible comparison with your own product-page table or per-tier ‘What’s Included’ pages.",
      "Features are only shown for Active and Trial subscriptions.",
    ],
    faq: [
      {
        question: "Is there a built-in side-by-side comparison table?",
        answer:
          "Not yet on the storefront — the ‘Enable Feature Comparison’ setting is reserved for a future in-switch comparison. Today, define per-variation features (shown in My Features) and build a visible compare table on your sales page.",
      },
      {
        question: "Can each tier have completely different features?",
        answer:
          "Yes. Each variation stores its own independent feature list, so tiers can differ entirely in toggles, numeric limits, and text perks.",
      },
    ],
    relatedFeatures: ["feature-manager", "subscription-products", "customer-portal"],
    relatedRecipes: ["whats-included-list", "usage-limits-metering", "tiered-bronze-silver-gold"],
  },
  {
    slug: "usage-limits-metering",
    group: "plan-switching-features",
    icon: Gauge,
    name: "Usage limits & metering",
    cardDescription:
      "Set numeric entitlement limits per plan (e.g. 1,000 API calls) and show used-vs-limit progress to customers.",
    tier: "Pro",
    seoTitle: "Usage Limits and Metering for Subscriptions on WooCommerce (Pro)",
    metaDescription:
      "Define numeric feature limits (API calls, seats, downloads) per plan with ArraySubs Pro and show used-vs-limit usage in My Account. Exact settings and helper functions inside.",
    h1: "Usage limits & metering per plan",
    heroSubtitle:
      "Cap and display consumption — define a numeric limit per plan and surface ‘used / limit’ progress to customers and admins.",
    heroHighlights: ["Numeric limits per plan", "Used / limit display", "Unlimited supported"],
    intro:
      "Usage-based plans need ==numeric limits== and a way to ==show consumption==. ==Feature Manager (Pro) Number features== act as the entitlement limit — ==1,000 API calls, 10 seats, 50 downloads, or ‘Unlimited’== — and the built-in ==usage tracking== displays ‘used / limit’ in My Account and the admin Feature Log. Your code records actual consumption via helper functions. This recipe sets up a metered limit.",
    settings: [
      {
        setting: "Number feature + value",
        value: "e.g. ‘API Calls’ = 1000 (or ‘Unlimited’)",
        where: "Product → Feature Manager tab",
      },
      {
        setting: "Show Usage Count in My Account",
        value: "On (adds a Usage column)",
        where: "Settings → Feature Manager",
      },
      {
        setting: "Show Usage Count in Admin",
        value: "On (independent of customer toggle)",
        where: "Settings → Feature Manager",
      },
      {
        setting: "Consumption tracking",
        value: "Your code calls arraysubs_increment_feature_usage()",
        where: "Site integration (helper functions)",
      },
    ],
    outcomes: [
      "Each plan defines a numeric limit (or Unlimited).",
      "Customers see ‘3 / 10’ style usage on My Features.",
      "Admins can see usage in the Feature Log independently.",
      "Limits and display are managed; consumption is recorded by your code.",
    ],
    bestFor: [
      "API platforms and metered SaaS",
      "Seat-, download-, or credit-limited plans",
      "Any plan that needs a visible quota",
    ],
    steps: [
      {
        title: "Add a Number feature",
        description:
          "On the product (or each variation), add a Number feature like ‘API Calls’ with the limit value (e.g. 1000) or ‘Unlimited’.",
        manual: M.featureDefine,
      },
      {
        title: "Turn on usage display",
        description:
          "In Settings → Feature Manager, enable Show Usage Count in My Account and/or Show Usage Count in Admin to reveal the Usage column.",
        manual: M.featureSettings,
      },
      {
        title: "Record consumption from your code",
        description:
          "Call the helper functions (arraysubs_increment_feature_usage / arraysubs_update_feature_usage) when the customer consumes the feature; the display updates automatically.",
        manual: M.featureDisplay,
      },
    ],
    notes: [
      "Only Number-type features support usage tracking — toggles and text do not.",
      "Feature Manager defines the limit; your integration must record actual usage via the helper functions.",
      "The customer and admin usage toggles are independent — you can show usage to staff but not customers.",
    ],
    faq: [
      {
        question: "Does ArraySubs count usage automatically?",
        answer:
          "No. It defines the limit and displays progress, but your site’s code records consumption by calling the provided helper functions (e.g. arraysubs_increment_feature_usage).",
      },
      {
        question: "How is an unlimited quota shown?",
        answer:
          "Set the Number feature value to ‘Unlimited’. Usage then displays like ‘3 / Unlimited’ with no cap enforced.",
      },
    ],
    relatedFeatures: ["feature-manager", "subscription-products", "member-insight"],
    relatedRecipes: ["whats-included-list", "compare-tiers-features", "free-tier-plus-paid"],
  },
  {
    slug: "fixed-period-membership",
    group: "plan-switching-features",
    icon: CalendarCheck,
    name: "Fixed end-date membership",
    cardDescription:
      "End every membership on a shared calendar date (e.g. each Aug 31) instead of a rolling cycle — with an enrollment window.",
    tier: "Pro",
    seoTitle: "Fixed End-Date Membership on WooCommerce (Pro)",
    metaDescription:
      "Create WooCommerce memberships that end on a fixed calendar date with an enrollment window, using ArraySubs Pro Fixed Period Membership. Exact settings for an academic-year plan.",
    h1: "Fixed end-date membership",
    heroSubtitle:
      "For seasons, cohorts, and academic years — end every membership on the same calendar date instead of a rolling cycle.",
    heroHighlights: ["Shared end date", "Enrollment window", "Pro"],
    intro:
      "Some memberships should ==all end on the same date== — an academic year, a season, a cohort. ==Fixed Period Membership (Pro)== overrides the rolling subscription length so the plan ends on a ==specific calendar date== (absolute) or a ==recurring annual cutoff== (e.g. every Aug 31), with an optional ==enrollment window==. This recipe builds an academic-year membership.",
    settings: [
      {
        setting: "Use fixed end date",
        value: "On",
        where: "Product → Subscription tab (Pro)",
      },
      {
        setting: "End Date Type",
        value: "Recurring annual cutoff (or Absolute date)",
        where: "Subscription tab",
      },
      {
        setting: "Month / Day",
        value: "August / 31",
        where: "Subscription tab",
      },
      {
        setting: "Enrollment opens / closes",
        value: "Aug 1 / Oct 31 (optional)",
        where: "Subscription tab",
      },
      {
        setting: "At period end",
        value: "Expire (or Renew — recurring only)",
        where: "Subscription tab",
      },
    ],
    outcomes: [
      "All members share the same end date regardless of join date.",
      "Recurring annual rolls to next year if the cutoff already passed.",
      "An enrollment window can limit when the plan is purchasable.",
      "At period end the plan expires (or auto-renews for recurring).",
    ],
    bestFor: [
      "Academic-year and course-cohort access",
      "Seasonal memberships with a fixed close",
      "Any plan where everyone shares one end date",
    ],
    steps: [
      {
        title: "Enable a fixed end date",
        description:
          "On the product’s Subscription tab (Pro), check ‘Use fixed end date’. This overrides the rolling Subscription Length.",
        manual: M.planSwitching,
      },
      {
        title: "Choose the end-date type",
        description:
          "Pick Recurring annual cutoff and set Month = August, Day = 31 (or an Absolute date for a one-off end date).",
        manual: M.planSwitching,
      },
      {
        title: "Set the enrollment window",
        description:
          "Optionally set Enrollment opens (Aug 1) and closes (Oct 31) to limit purchase timing. Set At period end to Expire.",
        manual: M.planSwitching,
      },
    ],
    notes: [
      "Fixed Period Membership is a Pro feature; the Subscription Length field is ignored and cleared to 0 when it’s on.",
      "Absolute-date products become unpurchasable once the date passes; recurring cutoffs roll to the next year.",
      "‘Renew’ at period end is only available for the recurring-annual type.",
    ],
    faq: [
      {
        question: "What if someone joins after the cutoff?",
        answer:
          "For a recurring annual cutoff, if the date has already passed this year, their end date rolls to the next year’s cutoff. For an absolute date, the product becomes unpurchasable once it passes.",
      },
      {
        question: "Can fixed-period memberships still have a trial?",
        answer:
          "Yes. A trial runs from purchase; when it ends billing begins, but the subscription still ends on the fixed date regardless of when the trial started.",
      },
    ],
    relatedFeatures: ["subscription-products", "member-access", "customer-portal"],
    relatedRecipes: ["annual-prepaid", "prepaid-fixed-cycles", "compare-tiers-features"],
  },
  {
    slug: "refund-to-store-credit",
    group: "plan-switching-features",
    icon: RotateCcw,
    name: "Refund to store credit",
    cardDescription:
      "Issue refunds as spendable store credit instead of cash back through the gateway — keep the revenue in-store.",
    tier: "Pro",
    seoTitle: "Refund to Store Credit Instead of Cash on WooCommerce (Pro)",
    metaDescription:
      "Process WooCommerce subscription refunds as store credit instead of a gateway refund, keeping revenue in-store. Exact ArraySubs Store Credit settings and refund flow inside.",
    h1: "Refund to store credit instead of cash",
    heroSubtitle:
      "Make the customer whole without sending money back to their card — convert the refund into store credit they can spend on renewals and new orders.",
    heroHighlights: ["Refund → store credit", "Revenue stays in-store", "Auto-applies to renewals"],
    intro:
      "A refund doesn’t have to mean ==cash leaving your business==. With ==Store Credit (Pro)==, the WooCommerce refund screen gains an ==‘As Store Credit’== method: instead of a gateway refund, the amount is ==deposited into the customer’s credit balance==, which then auto-applies to future renewals. The customer is made whole, you keep the cash, and the relationship survives. This recipe enables refund-to-credit.",
    settings: [
      {
        setting: "Enable Store Credit System",
        value: "On",
        where: "Store Credit → Settings",
      },
      {
        setting: "Refund Method",
        value: "As Store Credit (vs Via Gateway)",
        where: "WooCommerce order → Refund",
      },
      {
        setting: "Auto-Apply to Renewals",
        value: "On (credit pays down next renewals)",
        where: "Store Credit → Settings",
      },
      {
        setting: "Credit Added email",
        value: "On (source: Refund)",
        where: "WooCommerce → Emails",
      },
    ],
    outcomes: [
      "Refunds become spendable credit, not cash back.",
      "Revenue stays in your store; gateway fees avoided.",
      "Credit auto-applies to the customer’s next renewals.",
      "Customer gets a Credit Added email with their new balance.",
    ],
    bestFor: [
      "‘Soft refunds’ that keep the customer relationship",
      "Disputed renewals and partial service credits",
      "Avoiding non-returned gateway processing fees",
    ],
    steps: [
      {
        title: "Enable Store Credit",
        description:
          "Turn on the Store Credit system in ArraySubs → Store Credit → Settings (Pro).",
        manual: M.storeCreditSettings,
      },
      {
        title: "Refund the order as credit",
        description:
          "Open the WooCommerce order, click Refund, choose ‘As Store Credit’, enter the amount and a reason, then process. The panel previews the customer’s new balance.",
        manual: M.refundToCredit,
      },
      {
        title: "Let credit pay future renewals",
        description:
          "With Auto-Apply to Renewals on, the credited balance silently reduces the customer’s next renewal totals.",
        manual: M.storeCreditSettings,
      },
    ],
    notes: [
      "Guest orders can’t be refunded as credit — the order must belong to a registered customer.",
      "Refund-to-credit doesn’t cancel the subscription and there’s no one-click undo (deduct manually via Store Credit Management).",
      "Credit is added at the customer level; it doesn’t reduce the WooCommerce order total in reports.",
    ],
    faq: [
      {
        question: "Does the customer know it’s credit, not a card refund?",
        answer:
          "Yes. They receive the Credit Added email (source: Refund) showing the amount and updated balance, with a link to view it in My Account.",
      },
      {
        question: "Can I split a refund between card and credit?",
        answer:
          "Yes. Process part Via Gateway and part As Store Credit; both are tracked separately on the order and reduce the remaining refundable amount.",
      },
    ],
    relatedFeatures: ["store-credit", "retention-and-refunds", "customer-portal"],
    relatedRecipes: ["auto-apply-credit-renewals", "downgrade-with-credit", "expiring-promo-credit"],
  },
  {
    slug: "auto-apply-credit-renewals",
    group: "plan-switching-features",
    icon: Wallet,
    name: "Auto-apply credit to renewals",
    cardDescription:
      "Let accumulated store credit silently pay down every renewal — subscription credit first, then customer balance.",
    tier: "Pro",
    seoTitle: "Auto-Apply Store Credit to Subscription Renewals on WooCommerce (Pro)",
    metaDescription:
      "Automatically apply store credit to WooCommerce subscription renewals, with an optional minimum order threshold. Exact ArraySubs Store Credit application settings inside.",
    h1: "Auto-apply store credit to renewals",
    heroSubtitle:
      "Put credit to work automatically — every renewal checks the customer’s balance and applies it before charging the card.",
    heroHighlights: ["Silent on every renewal", "Subscription credit first", "Optional minimum threshold"],
    intro:
      "Store credit is only useful if it ==gets spent==. With ==Auto-Apply to Renewals (Pro)== on, every renewal invoice ==checks the customer’s credit== and applies it before charging — ==subscription-level credit first== (e.g. from a downgrade), then customer-level credit. An optional ==minimum order amount== lets you skip applying credit to tiny charges. This recipe configures automatic credit application.",
    settings: [
      {
        setting: "Enable Store Credit System",
        value: "On",
        where: "Store Credit → Settings",
      },
      {
        setting: "Auto-Apply to Renewals",
        value: "On",
        where: "Store Credit → Settings",
      },
      {
        setting: "Minimum Order Amount",
        value: "0 (apply on any total) — or e.g. 50",
        where: "Store Credit → Settings",
      },
      {
        setting: "Allow at Checkout",
        value: "Optional (apply to new subscription orders too)",
        where: "Store Credit → Settings",
      },
    ],
    outcomes: [
      "Credit reduces every renewal automatically — no customer action.",
      "Subscription-level credit is consumed before customer-level.",
      "Applied as a negative fee, keeping the order total intact.",
      "A minimum-order threshold can protect small charges from credit.",
    ],
    bestFor: [
      "Stores issuing refund/downgrade credit that should get used",
      "Loyalty or promo credit that pays down renewals",
      "Hands-off credit redemption",
    ],
    steps: [
      {
        title: "Enable the credit system",
        description:
          "In ArraySubs → Store Credit → Settings, turn on Enable Store Credit System (Pro).",
        manual: M.storeCreditSettings,
      },
      {
        title: "Turn on Auto-Apply to Renewals",
        description:
          "Enable Auto-Apply to Renewals so each renewal invoice consumes available credit (subscription credit first, then customer balance).",
        manual: M.storeCreditSettings,
      },
      {
        title: "Set a minimum order threshold (optional)",
        description:
          "Leave Minimum Order Amount at 0 to apply credit to any renewal, or set a floor (e.g. $50) so small charges bill in full.",
        manual: M.storeCreditSettings,
      },
    ],
    notes: [
      "Auto-apply never exceeds the available balance — the remainder is charged normally.",
      "Subscription-level credit (from downgrades) always applies to that subscription’s renewals while the system is on.",
      "Credit appears as a negative fee line so the original order total stays intact for reporting.",
    ],
    faq: [
      {
        question: "Which credit is used first?",
        answer:
          "Subscription-level credit tied to that subscription is consumed first, then the customer’s general balance covers the rest.",
      },
      {
        question: "Can I stop credit applying to small renewals?",
        answer:
          "Yes. Set a Minimum Order Amount — renewals below it are charged in full and credit is preserved for larger charges.",
      },
    ],
    relatedFeatures: ["store-credit", "billing-and-renewals", "customer-portal"],
    relatedRecipes: ["refund-to-store-credit", "sell-prepaid-credit-bonus", "downgrade-with-credit"],
  },
  {
    slug: "sell-prepaid-credit-bonus",
    group: "plan-switching-features",
    icon: PiggyBank,
    name: "Sell prepaid credit with a bonus",
    cardDescription:
      "Sell store-credit top-ups (optionally with a bonus %) customers prepay and spend on renewals and new orders.",
    tier: "Pro",
    seoTitle: "Sell Prepaid Store Credit With a Bonus on WooCommerce (Pro)",
    metaDescription:
      "Let customers buy prepaid store credit — fixed or custom amounts, with an optional bonus percentage — to spend on subscriptions. Exact ArraySubs Store Credit purchase settings inside.",
    h1: "Sell prepaid credit with a bonus",
    heroSubtitle:
      "Pull revenue forward — let customers buy a credit balance (sweetened with a bonus) and spend it down on renewals and new subscriptions.",
    heroHighlights: ["Prepaid top-ups", "Optional bonus %", "Spend on renewals"],
    intro:
      "Selling ==prepaid credit== pulls revenue forward and boosts loyalty: customers buy a balance — often sweetened with a ==bonus percentage== (pay $100, get $110) — and spend it down over time. ==Store Credit (Pro)== adds a dedicated ==credit purchase product type==, with fixed or custom amounts bounded by min/max limits. This recipe enables credit purchases and a bonus top-up product.",
    settings: [
      {
        setting: "Enable Credit Purchases",
        value: "On",
        where: "Store Credit → Settings",
      },
      {
        setting: "Min / Max / Default Purchase",
        value: "e.g. $25 / $500 / $100 (custom-amount products)",
        where: "Store Credit → Settings",
      },
      {
        setting: "Store Credit product",
        value: "Created in WooCommerce (fixed or custom amount, optional bonus %)",
        where: "Products → Store Credit product",
      },
      {
        setting: "Allow at Checkout",
        value: "On (so bought credit applies to subscription orders)",
        where: "Store Credit → Settings",
      },
    ],
    outcomes: [
      "Customers prepay for a credit balance, optionally with a bonus.",
      "Balance spends down on renewals and new subscriptions.",
      "Custom-amount products honor your min/max/default limits.",
      "Revenue is pulled forward and loyalty increases.",
    ],
    bestFor: [
      "Prepaid / wallet-style businesses",
      "Loyalty programs sweetened with a bonus %",
      "Pulling cash forward with top-up packs",
    ],
    steps: [
      {
        title: "Enable credit purchases",
        description:
          "In ArraySubs → Store Credit → Settings, turn on Enable Credit Purchases and set Min/Max/Default amounts (e.g. $25 / $500 / $100).",
        manual: M.storeCreditSettings,
      },
      {
        title: "Create a Store Credit product",
        description:
          "Add a Store Credit product in WooCommerce — fixed amount or custom amount — and set an optional bonus percentage to sweeten the deal.",
        manual: M.creditPurchase,
      },
      {
        title: "Allow credit at checkout",
        description:
          "Enable Allow at Checkout so the purchased balance can be applied to new subscription orders, and keep Auto-Apply on for renewals.",
        manual: M.storeCreditSettings,
      },
    ],
    notes: [
      "Min/Max/Default amounts apply to custom-amount products; fixed-amount products always grant their set value.",
      "Enabling the setting only exposes the product type — you still create the Store Credit product manually.",
      "A bonus percentage is configured on the credit product (pay $100 → receive $110).",
    ],
    faq: [
      {
        question: "How do I give a bonus for buying credit?",
        answer:
          "Set a bonus percentage on the Store Credit product — a customer paying $100 with a 10% bonus receives $110 of spendable credit.",
      },
      {
        question: "Can customers choose how much to buy?",
        answer:
          "Yes, with a custom-amount credit product bounded by your Min, Max, and Default purchase settings. Fixed-amount products grant a set value instead.",
      },
    ],
    relatedFeatures: ["store-credit", "checkout-and-payments", "customer-portal"],
    relatedRecipes: ["auto-apply-credit-renewals", "refund-to-store-credit", "expiring-promo-credit"],
  },
  {
    slug: "expiring-promo-credit",
    group: "plan-switching-features",
    icon: TimerReset,
    name: "Expiring promotional credit",
    cardDescription:
      "Grant promo credit that expires after a set period to create urgency — with automatic expiry-warning emails.",
    tier: "Pro",
    seoTitle: "Expiring Promotional Store Credit on WooCommerce (Pro)",
    metaDescription:
      "Issue promotional store credit that expires after a set number of days, with automatic warning and expiry emails. Exact ArraySubs Store Credit expiration settings inside.",
    h1: "Expiring promotional credit",
    heroSubtitle:
      "Promo credit that sits forever loses its punch. Set an expiry so customers spend it — with automatic reminders before it lapses.",
    heroHighlights: ["Expires after N days", "7-day warning email", "Creates urgency"],
    intro:
      "Promotional credit that ==never expires== loses urgency and lingers as a liability. ==Store Credit (Pro)== supports an ==expiration period==: each new credit is stamped with an expiry, customers get a ==Credit Expiring email 7 days before==, and a daily job clears lapsed balances (with a ==Credit Expired== notice). This recipe sets a 90-day expiry to drive customers to spend.",
    settings: [
      {
        setting: "Expiration Period (Days)",
        value: "90 (0 = never expires)",
        where: "Store Credit → Settings",
      },
      {
        setting: "Credit Expiring email",
        value: "On (sends 7 days before expiry)",
        where: "WooCommerce → Emails",
      },
      {
        setting: "Credit Expired email",
        value: "On (sends when credit lapses)",
        where: "WooCommerce → Emails",
      },
      {
        setting: "Auto-Apply to Renewals",
        value: "On (so credit gets used before it expires)",
        where: "Store Credit → Settings",
      },
    ],
    outcomes: [
      "New credit expires after the period you set (e.g. 90 days).",
      "Customers get a warning email 7 days before expiry.",
      "Lapsed credit is cleared by a daily job, with an expired notice.",
      "Urgency drives customers to spend their balance.",
    ],
    bestFor: [
      "Promotional and win-back credit grants",
      "Reducing long-lived credit liability",
      "Driving spend with a deadline",
    ],
    steps: [
      {
        title: "Set an expiration period",
        description:
          "In ArraySubs → Store Credit → Settings, set Expiration Period (Days) to 90 (or 30/180/365). 0 means credit never expires.",
        manual: M.storeCreditSettings,
      },
      {
        title: "Enable the credit emails",
        description:
          "Turn on the Credit Expiring (7 days before) and Credit Expired emails so customers are warned in time.",
        manual: M.creditEmails,
      },
      {
        title: "Keep auto-apply on",
        description:
          "With Auto-Apply to Renewals on, credit is consumed on renewals before it has a chance to expire.",
        manual: M.storeCreditSettings,
      },
    ],
    notes: [
      "The expiration period applies only to new credits issued after you set it — existing credit keeps its original (or no) expiry.",
      "Expiry is a single global value; you can’t set different periods per credit source.",
      "The expiration batch runs daily at 3:00 AM server time.",
    ],
    faq: [
      {
        question: "Do existing credits get the new expiry?",
        answer:
          "No. Only credits issued after you set the period receive an expiration date. Previously issued credit is unaffected.",
      },
      {
        question: "Are customers warned before credit expires?",
        answer:
          "Yes. The Credit Expiring email sends 7 days before expiry, and a Credit Expired email sends when the balance lapses (both must be enabled).",
      },
    ],
    relatedFeatures: ["store-credit", "emails", "retention-and-refunds"],
    relatedRecipes: ["sell-prepaid-credit-bonus", "refund-to-store-credit", "free-month-winback"],
  },

  // ============================================================
  // GROUP 4 — Manage subscriptions & admin operations
  // ============================================================
  {
    slug: "multi-subs-per-user",
    group: "manage-subscriptions",
    icon: Users,
    name: "Multiple subscriptions per customer",
    cardDescription:
      "Let one customer hold many subscriptions at once and buy several in a single cart — the default, open model.",
    tier: "Free",
    seoTitle: "Allow Multiple Subscriptions Per Customer on WooCommerce",
    metaDescription:
      "Let one WooCommerce customer hold and buy multiple subscriptions at once. Exact ArraySubs General Settings for a multi-subscription, multi-item-cart model.",
    h1: "Multiple subscriptions per customer",
    heroSubtitle:
      "The open model — a customer can own as many subscriptions as they like and add several to one cart. It’s the default, and this recipe confirms the settings.",
    heroHighlights: ["Many subs per customer", "Several in one cart", "Default model"],
    intro:
      "Most stores want customers to ==hold more than one subscription== — a box plus a membership, two seats, multiple products. ArraySubs allows this ==out of the box==: there’s no per-customer cap, and a customer can ==add several subscriptions to one cart==. This recipe documents the exact General Settings for the open, multi-subscription model so you can confirm (or restore) it.",
    settings: [
      {
        setting: "Allow Multiple Subscriptions in Cart",
        value: "On (default)",
        where: "Settings → General → Multiple Subscriptions",
      },
      {
        setting: "One Subscription Per Customer",
        value: "Off (default)",
        where: "Settings → General → Multiple Subscriptions",
      },
      {
        setting: "One Subscription Per Product",
        value: "Off (default)",
        where: "Settings → General → Multiple Subscriptions",
      },
      {
        setting: "Allow Different Billing Cycles",
        value: "On (mix monthly + yearly in one cart)",
        where: "Settings → General → Multiple Subscriptions",
      },
    ],
    outcomes: [
      "A customer can own unlimited concurrent subscriptions.",
      "Several subscription products can be bought in one order.",
      "Plans with different billing cycles can share a cart.",
      "No checkout blocks — the most permissive model.",
    ],
    bestFor: [
      "Marketplaces and multi-product catalogs",
      "Stores selling add-ons alongside a core plan",
      "Per-seat or per-location subscriptions",
    ],
    steps: [
      {
        title: "Open Multiple Subscriptions settings",
        description:
          "Go to ArraySubs → Settings → General and find the Multiple Subscriptions section.",
        manual: M.generalSettings,
      },
      {
        title: "Keep the open defaults",
        description:
          "Leave Allow Multiple Subscriptions in Cart on, and One Subscription Per Customer / Per Product off.",
        manual: M.generalSettings,
      },
      {
        title: "Allow mixed billing cycles",
        description:
          "Keep Allow Different Billing Cycles on so a customer can check out a monthly and an annual plan together (automatic gateways may add their own limits).",
        manual: M.generalSettings,
      },
    ],
    notes: [
      "Subscriptions always require an account — guest checkout is not available for subscription products (Auto Create Account handles this).",
      "Some automatic gateways restrict mixing different billing cycles in one payment.",
      "To cap customers to a single live subscription instead, see the one-subscription-per-customer recipe.",
    ],
    faq: [
      {
        question: "Is there a limit on how many subscriptions a customer can have?",
        answer:
          "No. By default a customer can hold unlimited concurrent subscriptions and buy several at once. Limits are opt-in via the One Subscription Per Customer / Per Product settings.",
      },
      {
        question: "Can they buy a monthly and an annual plan together?",
        answer:
          "Yes, with Allow Different Billing Cycles on — though some automatic payment gateways may require separate checkouts.",
      },
    ],
    relatedFeatures: ["manage-subscriptions", "subscription-products", "checkout-and-payments"],
    relatedRecipes: ["one-subscription-per-customer", "one-subscription-per-product", "subscriptions-only-checkout"],
  },
  {
    slug: "one-subscription-per-customer",
    group: "manage-subscriptions",
    icon: UserCheck,
    name: "One subscription per customer",
    cardDescription:
      "Limit each customer to a single live subscription — block a second purchase while one is active, trial, on-hold, or pending.",
    tier: "Free",
    seoTitle: "Limit Customers to One Subscription on WooCommerce",
    metaDescription:
      "Restrict each WooCommerce customer to a single active subscription, blocking a second purchase while one is live. Exact ArraySubs General Settings inside.",
    h1: "One subscription per customer",
    heroSubtitle:
      "Keep it one-plan-per-person — block a customer from buying a second subscription while they already hold a live one.",
    heroHighlights: ["One live sub per customer", "Blocks the second purchase", "Free core"],
    intro:
      "Some businesses are ==strictly one-plan-per-person== — a single membership, one seat, one account. With ==One Subscription Per Customer== on, a customer who already has an ==active, trial, on-hold, or pending== subscription is ==blocked from buying another==. This recipe enforces the single-subscription model.",
    settings: [
      {
        setting: "One Subscription Per Customer",
        value: "On",
        where: "Settings → General → Multiple Subscriptions",
      },
      {
        setting: "Blocks when existing status is",
        value: "Active · Trial · On-Hold · Pending",
        where: "Behaviour",
      },
      {
        setting: "Auto Migrate to New Subscription",
        value: "Off (hard block) — On = replace instead",
        where: "Settings → General → Multiple Subscriptions",
      },
      {
        setting: "Check runs at",
        value: "Add-to-cart (logged in) + checkout (guests/returning)",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "A customer can hold only one live subscription at a time.",
      "A second purchase is blocked while one is active/trial/on-hold/pending.",
      "Enforced at add-to-cart and again at checkout.",
      "Pairs with auto-migrate to replace instead of block.",
    ],
    bestFor: [
      "Single-membership communities and apps",
      "One-seat-per-account products",
      "Anywhere a second concurrent plan makes no sense",
    ],
    steps: [
      {
        title: "Enable the limit",
        description:
          "In ArraySubs → Settings → General → Multiple Subscriptions, turn on One Subscription Per Customer.",
        manual: M.generalSettings,
      },
      {
        title: "Decide block vs replace",
        description:
          "Leave Auto Migrate off for a hard block, or turn it on to replace the existing plan on checkout (see the auto-migrate recipe).",
        manual: M.generalSettings,
      },
      {
        title: "Verify the customer experience",
        description:
          "A blocked customer is told they already have a subscription; the check fires at add-to-cart for logged-in users and at checkout for guests/returning emails.",
        manual: M.generalSettings,
      },
    ],
    notes: [
      "The block considers active, trial, on-hold, and pending statuses as ‘live’.",
      "Cancelled or expired subscriptions don’t block a new purchase.",
      "To let the new plan replace the old automatically, enable Auto Migrate.",
    ],
    faq: [
      {
        question: "What counts as an existing subscription?",
        answer:
          "Any subscription in active, trial, on-hold, or pending status blocks a new purchase. Cancelled and expired ones do not.",
      },
      {
        question: "Can I let them switch instead of being blocked?",
        answer:
          "Yes. Turn on Auto Migrate to New Subscription so checkout replaces the existing plan via plan-switching proration.",
      },
    ],
    relatedFeatures: ["manage-subscriptions", "subscription-products"],
    relatedRecipes: ["one-sub-auto-migrate", "multi-subs-per-user", "one-subscription-per-product"],
  },
  {
    slug: "one-sub-auto-migrate",
    group: "manage-subscriptions",
    icon: UserCog,
    name: "Auto-replace on new purchase",
    cardDescription:
      "When a one-sub customer buys a new plan, automatically replace their existing subscription via plan-switch proration.",
    tier: "Free",
    seoTitle: "Auto-Migrate to a New Subscription on Checkout (WooCommerce)",
    metaDescription:
      "Replace a customer’s existing subscription with a new one at checkout instead of blocking, using ArraySubs Auto Migrate. Exact settings and matching rules inside.",
    h1: "Auto-replace the existing subscription on purchase",
    heroSubtitle:
      "For one-plan-per-customer stores — when a customer buys a different plan, swap them over automatically instead of blocking the sale.",
    heroHighlights: ["Replaces, not blocks", "Plan-switch proration", "Free core"],
    intro:
      "If you enforce ==one subscription per customer==, a blocked checkout can cost a sale. ==Auto Migrate to New Subscription== turns that block into an ==automatic switch==: buying a new plan ==replaces the existing one== using plan-switching proration. It only fires when ArraySubs matches ==exactly one== existing subscription and the new product is a valid switch target. This recipe enables auto-replace.",
    settings: [
      {
        setting: "One Subscription Per Customer",
        value: "On (required)",
        where: "Settings → General → Multiple Subscriptions",
      },
      {
        setting: "Auto Migrate to New Subscription Upon Checkout",
        value: "On",
        where: "Settings → General → Multiple Subscriptions",
      },
      {
        setting: "Pricing on migrate",
        value: "Plan-switch proration (upgrade/downgrade/crossgrade)",
        where: "Plan Switching",
      },
      {
        setting: "Fires only when",
        value: "Exactly one existing sub + new product is an allowed switch target",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "A new purchase replaces the existing subscription automatically.",
      "Pricing uses plan-switch proration, not a double charge.",
      "No lost sale from a hard block.",
      "Falls back to ‘switch manually’ if multiple subs match.",
    ],
    bestFor: [
      "One-plan stores that still want easy upgrades",
      "Turning blocked checkouts into switches",
      "Simple ‘change my plan by buying the new one’ flows",
    ],
    steps: [
      {
        title: "Enable the one-sub limit",
        description:
          "Turn on One Subscription Per Customer — Auto Migrate only appears when this is on.",
        manual: M.generalSettings,
      },
      {
        title: "Turn on Auto Migrate",
        description:
          "Enable Auto Migrate to New Subscription Upon Checkout so a new purchase replaces the existing plan instead of being blocked.",
        manual: M.generalSettings,
      },
      {
        title: "Set up switch targets",
        description:
          "Ensure the new product is a valid plan-switch target (Linked Products), since migrate uses the plan-switching proration path.",
        manual: M.planSwitching,
      },
    ],
    notes: [
      "Auto Migrate only works when exactly one existing subscription matches and the new product is an allowed switch target.",
      "If multiple subscriptions match, checkout stops and asks the customer to switch manually.",
      "Pricing follows your global proration type (immediate / at renewal / none).",
    ],
    faq: [
      {
        question: "What happens to the old subscription?",
        answer:
          "It’s replaced by the new plan via the plan-switching flow, with proration applied — the customer ends up on a single, current subscription.",
      },
      {
        question: "When does auto-migrate NOT fire?",
        answer:
          "When the customer has more than one matching subscription, or the new product isn’t a configured switch target — then checkout asks them to switch manually.",
      },
    ],
    relatedFeatures: ["manage-subscriptions", "subscription-products"],
    relatedRecipes: ["one-subscription-per-customer", "upgrade-path-tiers", "customer-self-serve-switch"],
  },
  {
    slug: "one-subscription-per-product",
    group: "manage-subscriptions",
    icon: Package,
    name: "One of each plan per cart",
    cardDescription:
      "Cap each subscription product to quantity one in the cart, while still allowing different plans together.",
    tier: "Free",
    seoTitle: "Limit Subscription Quantity to One Per Product (WooCommerce)",
    metaDescription:
      "Cap each WooCommerce subscription product to a single unit in the cart while allowing different plans together. Exact ArraySubs setting inside.",
    h1: "One of each plan per cart",
    heroSubtitle:
      "Stop customers buying five copies of the same plan — cap each subscription product to quantity one, while different plans can still share the cart.",
    heroHighlights: ["Qty 1 per plan", "Different plans still allowed", "Cart-level rule"],
    intro:
      "A membership or seat usually shouldn’t be bought ==five times in one go==. ==One Subscription Per Product== caps each subscription product to ==quantity one in the cart==, while still letting a customer add ==different== subscription plans together. It’s a cart-level rule — it doesn’t look at what the customer already owns. This recipe enables it.",
    settings: [
      {
        setting: "One Subscription Per Product",
        value: "On",
        where: "Settings → General → Multiple Subscriptions",
      },
      {
        setting: "Scope",
        value: "Current cart only (per subscription product)",
        where: "Behaviour",
      },
      {
        setting: "Allow Multiple Subscriptions in Cart",
        value: "On (so different plans can coexist)",
        where: "Settings → General → Multiple Subscriptions",
      },
    ],
    outcomes: [
      "Each subscription plan can appear only once per cart.",
      "Different plans can still be purchased together.",
      "Prevents accidental multi-quantity subscription orders.",
      "Ignores subscriptions the customer already owns.",
    ],
    bestFor: [
      "Memberships and seats that should be singular",
      "Catalogs where qty>1 of a plan is meaningless",
      "Cleaner subscription carts",
    ],
    steps: [
      {
        title: "Enable the per-product cap",
        description:
          "In Settings → General → Multiple Subscriptions, turn on One Subscription Per Product.",
        manual: M.generalSettings,
      },
      {
        title: "Keep multi-plan carts open",
        description:
          "Leave Allow Multiple Subscriptions in Cart on so customers can still combine different plans, each capped at one.",
        manual: M.generalSettings,
      },
    ],
    notes: [
      "This is a cart-quantity rule — it does not consider subscriptions the customer already owns.",
      "To limit how many subscriptions a customer can own, use One Subscription Per Customer instead.",
      "Combine with Allow Mixed Checkout off to also keep one-time products out.",
    ],
    faq: [
      {
        question: "Can customers still buy two different plans?",
        answer:
          "Yes. This only caps each individual subscription product to quantity one; different plans can share the cart.",
      },
      {
        question: "Does it stop a customer owning the same plan twice over time?",
        answer:
          "No — it’s a per-cart rule. Use One Subscription Per Customer to limit ownership across orders.",
      },
    ],
    relatedFeatures: ["manage-subscriptions", "subscription-products"],
    relatedRecipes: ["multi-subs-per-user", "one-subscription-per-customer", "subscriptions-only-checkout"],
  },
  {
    slug: "subscriptions-only-checkout",
    group: "manage-subscriptions",
    icon: ShoppingCart,
    name: "Subscriptions-only checkout",
    cardDescription:
      "Keep subscriptions and one-time products in separate orders by disabling mixed checkout.",
    tier: "Free",
    seoTitle: "Separate Subscription and One-Time Product Checkouts (WooCommerce)",
    metaDescription:
      "Force subscriptions and regular products into separate WooCommerce orders by disabling mixed checkout. Exact ArraySubs setting and trade-offs inside.",
    h1: "Subscriptions-only checkout (no mixed cart)",
    heroSubtitle:
      "Keep recurring and one-time purchases cleanly separated — disable mixed checkout so a cart is either subscriptions or regular products.",
    heroHighlights: ["No mixed carts", "Cleaner billing", "Free core"],
    intro:
      "Mixing a ==subscription with one-time products== in one order can complicate billing, taxes, and gateway handling. Turning off ==Allow Mixed Checkout== forces ==separate orders== — a cart is either subscription items or regular products, not both. This recipe enforces subscriptions-only checkout.",
    settings: [
      {
        setting: "Allow Mixed Checkout",
        value: "Off",
        where: "Settings → General → Multiple Subscriptions",
      },
      {
        setting: "Effect",
        value: "Subscription + non-subscription items can’t share an order",
        where: "Behaviour",
      },
      {
        setting: "Allow Multiple Subscriptions in Cart",
        value: "On or Off (independent choice)",
        where: "Settings → General → Multiple Subscriptions",
      },
    ],
    outcomes: [
      "Subscriptions and one-time products check out separately.",
      "Cleaner recurring orders and renewal handling.",
      "Fewer gateway edge cases from mixed carts.",
      "Independent of the multi-subscription settings.",
    ],
    bestFor: [
      "Stores wanting tidy recurring-only orders",
      "Avoiding tax/gateway quirks from mixed carts",
      "Clear separation of one-time vs recurring revenue",
    ],
    steps: [
      {
        title: "Disable mixed checkout",
        description:
          "In Settings → General → Multiple Subscriptions, turn Allow Mixed Checkout off.",
        manual: M.generalSettings,
      },
      {
        title: "Decide multi-subscription behaviour",
        description:
          "Independently choose whether multiple subscriptions can share a cart (Allow Multiple Subscriptions in Cart).",
        manual: M.generalSettings,
      },
    ],
    notes: [
      "Customers adding a subscription to a cart with regular products are prompted to check out separately.",
      "This is independent of the per-customer and per-product limits.",
      "Subscriptions always require an account regardless of this setting.",
    ],
    faq: [
      {
        question: "Can customers still buy regular products from my store?",
        answer:
          "Yes — they just can’t combine them with a subscription in the same order. Regular products check out normally on their own.",
      },
      {
        question: "Does this affect multiple subscriptions in a cart?",
        answer:
          "No. Mixed checkout only governs subscription + non-subscription mixing; multi-subscription carts are a separate setting.",
      },
    ],
    relatedFeatures: ["manage-subscriptions", "checkout-and-payments"],
    relatedRecipes: ["multi-subs-per-user", "one-subscription-per-product", "one-subscription-per-customer"],
  },
  {
    slug: "admin-create-subscription",
    group: "manage-subscriptions",
    icon: FilePlus,
    name: "Create a subscription from admin",
    cardDescription:
      "Build a brand-new subscription by hand in the admin — pick the customer, product, schedule, trial, and addresses.",
    tier: "Free",
    seoTitle: "Manually Create a Subscription in the Admin (WooCommerce)",
    metaDescription:
      "Create a new WooCommerce subscription by hand from the ArraySubs admin — customer, product, billing schedule, trial, renewal price, and addresses. Exact flow inside.",
    h1: "Create a subscription from the admin panel",
    heroSubtitle:
      "Onboard a customer manually — build a subscription from scratch in the admin with full control over product, schedule, trial, and billing details.",
    heroHighlights: ["Add New in admin", "Full schedule control", "Starts Pending → Active"],
    intro:
      "Sometimes you need to ==create a subscription by hand== — migrating a customer, setting up a deal, or fixing an edge case. ArraySubs adds an ==Add New== flow under ArraySubs → Subscriptions with a five-section form: customer, product & schedule, trial, different renewal price, and billing/shipping addresses. The subscription is ==created as Pending==; you then set it Active to start billing. This recipe walks the flow.",
    settings: [
      {
        setting: "Where",
        value: "ArraySubs → Subscriptions → Add New",
        where: "Admin",
      },
      {
        setting: "Required fields",
        value: "Customer · Subscription Product · Quantity · Recurring Amount · Billing Interval/Period",
        where: "Create Subscription form",
      },
      {
        setting: "Auto-filled from product",
        value: "Amount, interval, period, length, trial, signup fee, renewal price (overridable)",
        where: "Create Subscription form",
      },
      {
        setting: "Created status",
        value: "Pending (set to Active to start billing)",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Create a subscription manually for any registered customer.",
      "Override amount, schedule, trial, and renewal price as needed.",
      "Capture billing and shipping addresses on creation.",
      "Starts Pending; activate it to begin renewals.",
    ],
    bestFor: [
      "Migrating customers from another system",
      "Manual deals, comps, and edge cases",
      "Support fixing or recreating a subscription",
    ],
    steps: [
      {
        title: "Open the create form",
        description:
          "Go to ArraySubs → Subscriptions and click Add New. Requires Admin or Shop Manager and at least one published subscription product.",
        manual: M.subOperations,
      },
      {
        title: "Pick customer, product, and schedule",
        description:
          "Search the customer, choose the subscription product (and variation), set quantity, recurring amount, billing interval and period. Product fields auto-fill and are overridable.",
        manual: M.subOperations,
      },
      {
        title: "Add trial, renewal price, and addresses",
        description:
          "Optionally set a trial, a different renewal price after N payments, the invoice email, and billing/shipping addresses.",
        manual: M.subOperations,
      },
      {
        title: "Create, then activate",
        description:
          "Save to create it as Pending, then open it and change status to Active to schedule the first renewal.",
        manual: M.lifecycle,
      },
    ],
    notes: [
      "Every subscription must be linked to a subscription product — you can’t create a product-less one.",
      "The form always creates a Pending subscription; it can’t be created directly as Active.",
      "Billing Interval is disabled for Lifetime Deal products.",
    ],
    faq: [
      {
        question: "Why is my new subscription not billing?",
        answer:
          "Admin-created subscriptions start in Pending. Open the subscription and change its status to Active to schedule renewals and start billing.",
      },
      {
        question: "Can I set a custom recurring amount?",
        answer:
          "Yes. The amount auto-fills from the product but is fully overridable on the create form, along with interval, period, length, trial, and renewal price.",
      },
    ],
    relatedFeatures: ["manage-subscriptions", "subscription-products"],
    relatedRecipes: ["admin-edit-subscription", "admin-manage-lifecycle", "subscription-notes-timeline"],
  },
  {
    slug: "admin-edit-subscription",
    group: "manage-subscriptions",
    icon: FilePen,
    name: "Edit a subscription from admin",
    cardDescription:
      "Update a subscription’s invoice email, billing/shipping addresses, and status from the admin edit screen.",
    tier: "Free",
    seoTitle: "Edit a Subscription in the Admin (WooCommerce)",
    metaDescription:
      "Edit WooCommerce subscription details from the ArraySubs admin — invoice email, addresses, and status. Learn what’s editable vs system-calculated.",
    h1: "Edit a subscription from the admin",
    heroSubtitle:
      "Fix contact details and addresses, and change status — while ArraySubs keeps billing dates accurate automatically.",
    heroHighlights: ["Edit email & addresses", "Change status inline", "Dates stay automatic"],
    intro:
      "Day-to-day admin edits — a ==new address, corrected invoice email, a status change==. The ArraySubs edit form exposes exactly those, while keeping ==price, product, and dates system-controlled== so billing stays consistent. The product, customer, and recurring amount are read-only here (change product via plan switching); the ==next payment date is calculated automatically==. This recipe covers what you can and can’t edit.",
    settings: [
      {
        setting: "Editable",
        value: "Invoice email · Billing address · Shipping address",
        where: "Edit Subscription form",
      },
      {
        setting: "Status change",
        value: "Inline dropdown → 6 statuses, with confirmation",
        where: "Edit form summary card",
      },
      {
        setting: "Read-only",
        value: "Product/variation · Customer · Recurring amount/schedule",
        where: "Edit Subscription form",
      },
      {
        setting: "Next payment date",
        value: "Not editable — calculated from schedule & lifecycle events",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Correct invoice email and billing/shipping addresses.",
      "Change status (activate, hold, cancel) with a confirmation prompt.",
      "Billing dates stay accurate — calculated, not hand-set.",
      "Price/product changes routed through the right tools, not ad-hoc edits.",
    ],
    bestFor: [
      "Support correcting customer details",
      "Manual status changes",
      "Keeping billing data consistent",
    ],
    steps: [
      {
        title: "Open the edit form",
        description:
          "From ArraySubs → Subscriptions, use the Edit row action (or Edit Subscription on the detail screen).",
        manual: M.subOperations,
      },
      {
        title: "Update contact and addresses",
        description:
          "Edit the invoice email and the billing/shipping address fields, then Update Subscription.",
        manual: M.subOperations,
      },
      {
        title: "Change status if needed",
        description:
          "Use the status dropdown in the summary card; each target (Active, On Hold, Cancelled, …) shows a confirmation of its effect.",
        manual: M.lifecycle,
      },
    ],
    notes: [
      "Product, customer, and recurring amount are read-only here — change the plan via plan switching, not the edit form.",
      "The next payment date is no longer editable; ArraySubs derives it from the schedule, renewals, and lifecycle events (reactivate/skip/pause).",
      "Changing status to Cancelled here is immediate and captures no reason — use the detail-page Cancel button for a reason + audit.",
    ],
    faq: [
      {
        question: "Why can’t I edit the next payment date?",
        answer:
          "ArraySubs calculates it automatically from the billing schedule, renewal processing, and lifecycle events so billing stays consistent. Manual date editing was removed.",
      },
      {
        question: "How do I change the plan or price?",
        answer:
          "Use plan switching (upgrade/downgrade/crossgrade) rather than the edit form — product and recurring amount are read-only on edit.",
      },
    ],
    relatedFeatures: ["manage-subscriptions", "subscription-products"],
    relatedRecipes: ["admin-create-subscription", "admin-manage-lifecycle", "upgrade-path-tiers"],
  },
  {
    slug: "admin-manage-lifecycle",
    group: "manage-subscriptions",
    icon: Activity,
    name: "Cancel, hold, resume & expire",
    cardDescription:
      "Drive a subscription through its lifecycle from admin — cancel (now or end-of-period), undo, put on hold, reactivate.",
    tier: "Free",
    seoTitle: "Manage Subscription Lifecycle From the Admin (WooCommerce)",
    metaDescription:
      "Cancel, hold, reactivate, and expire WooCommerce subscriptions from the ArraySubs admin — immediate vs end-of-period cancellation with undo. Exact actions inside.",
    h1: "Cancel, hold, resume, and expire — from admin",
    heroSubtitle:
      "Full lifecycle control from the back office: cancel now or at period end, undo a scheduled cancel, put on hold, and reactivate.",
    heroHighlights: ["Immediate or end-of-period cancel", "Undo scheduled cancel", "Hold & reactivate"],
    intro:
      "Admins need to ==drive a subscription through its lifecycle==: the six statuses are Pending, Active, Trial, On-Hold, Cancelled, and Expired. From the detail page you can ==cancel immediately or at end-of-period== (with a reason), ==undo a scheduled cancellation==, ==put a subscription on hold==, and ==reactivate== an on-hold or cancelled one. This recipe maps the admin lifecycle actions and their effects.",
    settings: [
      {
        setting: "Cancel Subscription (detail page)",
        value: "Cancel Immediately or Cancel at End of Period (+ reason)",
        where: "Subscription detail → Cancel",
      },
      {
        setting: "Undo Scheduled Cancellation",
        value: "Available while an end-of-period cancel is pending",
        where: "Subscription detail",
      },
      {
        setting: "Status change",
        value: "On Hold · Active (reactivate) · Cancelled",
        where: "Edit form status dropdown",
      },
      {
        setting: "Expire",
        value: "Auto at length limit; fixed end date is Pro",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Cancel now (immediate) or schedule for the period end.",
      "Reverse a scheduled cancel with Undo before it runs.",
      "Put a subscription On Hold and reactivate later.",
      "Understand Cancelled vs Expired and what each clears.",
    ],
    bestFor: [
      "Support handling cancellations and holds",
      "Reversing mistaken cancellations",
      "Reactivating lapsed customers",
    ],
    steps: [
      {
        title: "Cancel with a reason",
        description:
          "On the subscription detail page, click Cancel Subscription, choose Immediately or End of Period, add an optional reason, and confirm.",
        manual: M.lifecycle,
      },
      {
        title: "Undo if needed",
        description:
          "While an end-of-period cancel is pending, use Undo Scheduled Cancellation to resume normal renewals.",
        manual: M.lifecycle,
      },
      {
        title: "Hold and reactivate",
        description:
          "Use the status dropdown to set On Hold (pauses renewals) or back to Active (reactivate), each with a confirmation of its effect.",
        manual: M.lifecycle,
      },
    ],
    notes: [
      "End-of-period cancellation keeps the subscription Active until the next payment date, then auto-cancels; no email is sent until it executes.",
      "Immediate cancellation removes all future scheduled actions and emails the customer.",
      "Expired = reached length limit or fixed end date (Pro); Cancelled = stopped by someone/non-payment — different recorded meta.",
    ],
    faq: [
      {
        question: "Can I undo a cancellation?",
        answer:
          "Only an end-of-period (scheduled) cancellation, via Undo Scheduled Cancellation before the date arrives. Immediate cancellations can be reactivated by setting status back to Active.",
      },
      {
        question: "What’s the difference between On Hold and Cancelled?",
        answer:
          "On Hold pauses renewals and can be reactivated; Cancelled is terminal (though you can still reactivate by setting Active). Overdue subscriptions move Active → On Hold → Cancelled via the grace period.",
      },
    ],
    relatedFeatures: ["manage-subscriptions", "billing-and-renewals", "retention-and-refunds"],
    relatedRecipes: ["admin-edit-subscription", "end-of-period-cancel-undo", "prorated-refund"],
  },
  {
    slug: "export-subscriptions",
    group: "manage-subscriptions",
    icon: Download,
    name: "Export subscriptions (CSV/JSON)",
    cardDescription:
      "Export your subscriptions to CSV (filtered by status) or JSON for reporting, migration, or your CRM.",
    tier: "Free",
    seoTitle: "Export WooCommerce Subscriptions to CSV or JSON",
    metaDescription:
      "Export ArraySubs subscriptions to a 15-field CSV (filtered by status) or JSON via REST for reporting and migration. Exact fields and steps inside.",
    h1: "Export subscriptions to CSV or JSON",
    heroSubtitle:
      "Get your subscription data out — a status-filtered CSV for spreadsheets, or JSON via REST for integrations and migration.",
    heroHighlights: ["Status-filtered CSV", "15 data fields", "JSON via REST"],
    intro:
      "You need your data ==out of the store== for reporting, a migration, or a CRM sync. ArraySubs exports the subscription list to a ==15-field CSV== (scoped to the current status tab, so switch to Active to export only active) in ==Excel-friendly UTF-8==, and to ==JSON via a REST endpoint==. This recipe covers both.",
    settings: [
      {
        setting: "Export CSV",
        value: "Button atop ArraySubs → Subscriptions",
        where: "Admin",
      },
      {
        setting: "Scope",
        value: "All subscriptions matching the current status tab",
        where: "Behaviour",
      },
      {
        setting: "CSV fields",
        value: "15 (ID, status, customer, product, amount, dates, payment method, …)",
        where: "Export",
      },
      {
        setting: "JSON export",
        value: "GET /arraysubs/v1/subscriptions/export?format=json",
        where: "REST API",
      },
    ],
    outcomes: [
      "Download a CSV of subscriptions matching the selected status.",
      "Open cleanly in Excel (UTF-8 with BOM).",
      "Pull JSON via REST for integrations or migration.",
      "15 fields covering customer, product, schedule, and dates.",
    ],
    bestFor: [
      "Reporting and finance reconciliation",
      "Migrating to or from another system",
      "Feeding a CRM or email platform",
    ],
    steps: [
      {
        title: "Filter to the set you want",
        description:
          "On ArraySubs → Subscriptions, pick a status tab (e.g. Active) — the CSV export is scoped to the current filter.",
        manual: M.adminTools,
      },
      {
        title: "Export CSV",
        description:
          "Click Export CSV at the top of the list to download a timestamped, UTF-8 (BOM) file with 15 fields per subscription.",
        manual: M.adminTools,
      },
      {
        title: "Or pull JSON via REST",
        description:
          "Call GET /arraysubs/v1/subscriptions/export?format=json for the same data as a JSON array, ideal for integrations.",
        manual: M.adminTools,
      },
    ],
    notes: [
      "The CSV exports exactly the rows matching the current status tab — switch tabs to change scope.",
      "There are no bulk status-change actions; export is the multi-record operation.",
      "JSON export is REST-only (no button in the UI).",
    ],
    faq: [
      {
        question: "Can I export only active subscriptions?",
        answer:
          "Yes. Switch to the Active status tab first — Export CSV exports only the subscriptions matching the current filter.",
      },
      {
        question: "What fields are in the CSV?",
        answer:
          "Fifteen, including subscription ID, status, customer name/email, product, recurring amount, currency, billing cycle, start/next/last/end dates, total payments, payment method, and created date.",
      },
    ],
    relatedFeatures: ["manage-subscriptions", "analytics"],
    relatedRecipes: ["subscription-notes-timeline", "admin-manage-lifecycle", "credit-history-audit"],
  },
  {
    slug: "subscription-notes-timeline",
    group: "manage-subscriptions",
    icon: StickyNote,
    name: "Notes & payment timeline",
    cardDescription:
      "Keep a per-subscription record — system events, private admin notes, and customer-visible notes on one timeline.",
    tier: "Free",
    seoTitle: "Subscription Notes and Payment Timeline (WooCommerce)",
    metaDescription:
      "Track every subscription event with ArraySubs notes and the payment timeline — system, admin, customer, and gateway entries, private or customer-visible. Details inside.",
    h1: "Subscription notes & payment timeline",
    heroSubtitle:
      "Never lose the thread — lifecycle changes, payments, and your own notes live on one per-subscription timeline.",
    heroHighlights: ["System + admin + customer notes", "Private or customer-visible", "Payment timeline"],
    intro:
      "Good support needs ==the full history of a subscription==. ArraySubs auto-logs ==system notes== for status changes, payments, renewals, trial conversions, plan switches, and more — each tagged ==System, Admin, Customer, or Gateway==. You can add your own ==private (admin-only) or customer-visible== notes, and the ==Payment Timeline== merges order events and notes chronologically. This recipe covers the per-subscription record.",
    settings: [
      {
        setting: "Note authors",
        value: "System · Admin · Customer · Gateway (badge per note)",
        where: "Subscription detail → Notes",
      },
      {
        setting: "Add Note type",
        value: "Private (admins only) or Customer (shown in My Account)",
        where: "Subscription detail → Notes",
      },
      {
        setting: "Auto-logged events",
        value: "Status, payments, renewals, trial conversion, plan/qty/amount changes",
        where: "Behaviour",
      },
      {
        setting: "Payment Timeline",
        value: "Merged order events + notes; 5 latest, Show All",
        where: "Subscription detail",
      },
    ],
    outcomes: [
      "A complete, chronological record per subscription.",
      "Add private notes for staff or customer-visible notes.",
      "See renewal-invoice, success, failure, and retry events.",
      "Diagnose ‘what happened’ without guesswork.",
    ],
    bestFor: [
      "Support diagnosing access/payment issues",
      "Audit trails for subscription changes",
      "Leaving context for the next agent",
    ],
    steps: [
      {
        title: "Open the subscription detail",
        description:
          "From ArraySubs → Subscriptions, open a subscription and scroll to the Subscription Notes and Payment Timeline cards.",
        manual: M.subNotes,
      },
      {
        title: "Read the timeline",
        description:
          "Use the Payment Timeline (newest first, 5 shown with Show All) to see renewal invoices, successes, failures, and retries.",
        manual: M.adminTools,
      },
      {
        title: "Add a note",
        description:
          "Use Add Note, choose Private or Customer-visible, and save. Customer notes also appear in My Account.",
        manual: M.subNotes,
      },
    ],
    notes: [
      "System notes are created automatically and can be deleted but not edited.",
      "Customer-visible notes appear to the customer in My Account — keep sensitive context Private.",
      "Renewal events are classified from system metadata, not note wording.",
    ],
    faq: [
      {
        question: "Will customers see my notes?",
        answer:
          "Only notes you mark as Customer-visible. Private notes are admin-only. System notes follow their own visibility.",
      },
      {
        question: "What events get logged automatically?",
        answer:
          "Status changes, payment completions and failures, renewal-invoice creation, trial conversion, product/quantity/amount changes, plan switches, payment-method changes, and reactivation.",
      },
    ],
    relatedFeatures: ["subscription-notes", "manage-subscriptions"],
    relatedRecipes: ["admin-manage-lifecycle", "login-as-customer", "export-subscriptions"],
  },
  {
    slug: "login-as-customer",
    group: "manage-subscriptions",
    icon: LogIn,
    name: "Log in as a customer",
    cardDescription:
      "Open a customer’s frontend session from the admin to see exactly what they see — no password needed.",
    tier: "Free",
    seoTitle: "Log In as a Customer (Admin Impersonation) on WooCommerce",
    metaDescription:
      "Impersonate a non-admin customer’s frontend session from the ArraySubs admin to troubleshoot My Account and access — no password required. Exact behavior inside.",
    h1: "Log in as a customer to troubleshoot",
    heroSubtitle:
      "See the store through the customer’s eyes — open their frontend session from the admin to verify access, portal state, and what they’re reporting.",
    heroHighlights: ["No password needed", "See their exact view", "Admins only"],
    intro:
      "‘It looks wrong on my account’ is impossible to debug blind. ==Login as User== lets an admin ==open a non-admin customer’s frontend session== — no password — to see ==exactly what they see== in My Account, including subscriptions, access, and entitlements. A visible bar lets you return to admin. This recipe enables and uses it.",
    settings: [
      {
        setting: "Enable Login as User",
        value: "On (enabled by default)",
        where: "Settings → Toolkit → Login as User",
      },
      {
        setting: "Action button",
        value: "‘Login as Customer’ on Users, orders, subscriptions",
        where: "Admin",
      },
      {
        setting: "Restrictions",
        value: "Admins only; cannot impersonate other administrators",
        where: "Behaviour",
      },
      {
        setting: "Session counting",
        value: "Impersonation never counts toward Multi-Login limits",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "View a customer’s My Account exactly as they do.",
      "Verify access rules, portal state, and entitlements live.",
      "No password collection — admin-initiated and safe.",
      "Return to your admin account from the impersonation bar.",
    ],
    bestFor: [
      "Support reproducing ‘it looks wrong’ reports",
      "Verifying access/content gating per customer",
      "Confirming portal actions before advising",
    ],
    steps: [
      {
        title: "Confirm the module is on",
        description:
          "In Settings → Toolkit → Login as User, ensure Enable Login as User is on (it’s on by default).",
        manual: M.loginAsUser,
      },
      {
        title: "Start impersonating",
        description:
          "Click Login as Customer from the WordPress Users list, a user profile, a WooCommerce order, or a subscription detail page.",
        manual: M.loginAsUser,
      },
      {
        title: "Return to admin",
        description:
          "Use the frontend bar’s return link to switch back to your administrator account when done.",
        manual: M.loginAsUser,
      },
    ],
    notes: [
      "Only administrators can impersonate, and admin-to-admin impersonation is blocked.",
      "Impersonation sessions never count toward Multi-Login Prevention limits.",
      "Pro adds a Login as Customer entry point from Manage Members profiles too.",
    ],
    faq: [
      {
        question: "Do I need the customer’s password?",
        answer:
          "No. Login as User opens their frontend session directly from the admin — no password is needed or collected.",
      },
      {
        question: "Can I log in as another admin?",
        answer:
          "No. Admin-to-admin impersonation is not supported; the action is disabled for users with the Administrator role.",
      },
    ],
    relatedFeatures: ["login-as-user", "manage-subscriptions", "member-access"],
    relatedRecipes: ["subscription-notes-timeline", "restrict-wp-admin", "hide-admin-bar"],
  },
  {
    slug: "hide-admin-bar",
    group: "manage-subscriptions",
    icon: EyeOff,
    name: "Hide the admin bar for customers",
    cardDescription:
      "Remove the WordPress toolbar on the frontend for non-admins so customers see a clean, branded site.",
    tier: "Free",
    seoTitle: "Hide the WordPress Admin Bar for Non-Admins (WooCommerce)",
    metaDescription:
      "Remove the WordPress frontend toolbar for non-administrator users with ArraySubs. Exact Toolkit setting and what it does (and doesn’t) do.",
    h1: "Hide the admin bar for customers",
    heroSubtitle:
      "Lose the gray WordPress toolbar for everyone but admins — a cleaner, more professional frontend for your members.",
    heroHighlights: ["Cleaner frontend", "Admins keep it", "One toggle"],
    intro:
      "The WordPress ==admin toolbar== on the frontend looks unprofessional to logged-in customers. This toolkit toggle ==removes it for non-administrators== (admins always keep it). It’s purely ==cosmetic== — it doesn’t change capabilities or block wp-admin. This recipe hides it.",
    settings: [
      {
        setting: "Hide admin bar for non-admin users",
        value: "On (default Off)",
        where: "Settings → Toolkit → Admin Bar",
      },
      {
        setting: "Administrators",
        value: "Always see the admin bar regardless",
        where: "Behaviour",
      },
      {
        setting: "Scope",
        value: "Frontend display only; doesn’t block wp-admin",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Non-admin customers no longer see the WP toolbar.",
      "Administrators keep the toolbar for their own work.",
      "A cleaner, more branded member experience.",
      "No capability or role changes.",
    ],
    bestFor: [
      "Membership sites and portals",
      "Any store wanting a polished frontend",
      "Pairing with wp-admin lockdown",
    ],
    steps: [
      {
        title: "Open Toolkit settings",
        description:
          "Go to ArraySubs → Settings → Toolkit → Admin Bar.",
        manual: M.toolkitSettings,
      },
      {
        title: "Enable the toggle",
        description:
          "Turn on Hide admin bar for non-admin users and Save Settings.",
        manual: M.adminBar,
      },
    ],
    notes: [
      "Cosmetic only — it doesn’t remove capabilities or stop a user typing /wp-admin. Pair with Admin Dashboard Access to block that.",
      "Administrators always see the admin bar.",
      "Affects the frontend view only.",
    ],
    faq: [
      {
        question: "Does this stop customers reaching wp-admin?",
        answer:
          "No. It only hides the frontend toolbar. To redirect non-staff away from wp-admin, use the Admin Dashboard Access recipe.",
      },
      {
        question: "Will admins lose the toolbar too?",
        answer:
          "No. Administrators always keep the admin bar regardless of this setting.",
      },
    ],
    relatedFeatures: ["admin-bar-visibility", "manage-subscriptions"],
    relatedRecipes: ["restrict-wp-admin", "brand-login-myaccount", "login-as-customer"],
  },
  {
    slug: "restrict-wp-admin",
    group: "manage-subscriptions",
    icon: ShieldBan,
    name: "Lock customers out of wp-admin",
    cardDescription:
      "Redirect non-staff away from /wp-admin to My Account (or a 404), while admins and chosen roles keep access.",
    tier: "Free",
    seoTitle: "Restrict wp-admin Access for Customers (WooCommerce)",
    metaDescription:
      "Redirect non-staff users away from the WordPress dashboard to My Account or a 404 with ArraySubs, while admins and selected roles keep access. Exact settings inside.",
    h1: "Lock customers out of the WordPress dashboard",
    heroSubtitle:
      "Customers have no business in wp-admin — redirect them to My Account (or a 404) while your team keeps full access.",
    heroHighlights: ["Redirect non-staff", "Admins + chosen roles exempt", "AJAX/REST unaffected"],
    intro:
      "Letting customers reach ==/wp-admin== is confusing and a support risk. ==Admin Dashboard Access== ==redirects unauthorized users== away from the dashboard — to ==My Account or a 404== — while ==administrators (always) and any roles you allow== keep access. Crucially, ==AJAX, REST, and cron are never blocked==, so the store keeps working. This recipe locks it down.",
    settings: [
      {
        setting: "Restrict wp-admin access",
        value: "On (default Off)",
        where: "Settings → Toolkit → Admin Dashboard Access",
      },
      {
        setting: "Redirect unauthorized users to",
        value: "WooCommerce My Account (default) or 404",
        where: "Admin Dashboard Access",
      },
      {
        setting: "Allowed roles",
        value: "Add roles (e.g. Shop Manager); additive to admins",
        where: "Admin Dashboard Access",
      },
      {
        setting: "Never blocked",
        value: "Admins · AJAX · REST API · WP-Cron · Action Scheduler",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Customers visiting /wp-admin are redirected away.",
      "Administrators always keep dashboard access.",
      "Add staff roles (e.g. Shop Manager) to the allow-list.",
      "Background jobs and the storefront keep working.",
    ],
    bestFor: [
      "Membership and customer portals",
      "Keeping non-staff out of the back office",
      "Reducing accidental admin access",
    ],
    steps: [
      {
        title: "Open Admin Dashboard Access",
        description:
          "Go to ArraySubs → Settings → Toolkit → Admin Dashboard Access.",
        manual: M.adminDashAccess,
      },
      {
        title: "Restrict and choose a redirect",
        description:
          "Turn on Restrict wp-admin access and set the redirect to WooCommerce My Account (recommended) or a 404.",
        manual: M.adminDashAccess,
      },
      {
        title: "Allow your staff roles",
        description:
          "Add roles like Shop Manager to Allowed roles — administrators are always allowed and don’t need adding.",
        manual: M.adminDashAccess,
      },
    ],
    notes: [
      "Allowed roles is additive on top of the always-on Administrator exemption.",
      "AJAX, REST API, WP-Cron, and Action Scheduler are never blocked — only direct browser visits are redirected.",
      "Pair with Hide Admin Bar and WordPress Login Page for a fully customer-facing experience.",
    ],
    faq: [
      {
        question: "Will this break checkout or background jobs?",
        answer:
          "No. The restriction only redirects direct browser visits to admin pages. AJAX, REST, WP-Cron, and Action Scheduler are never blocked.",
      },
      {
        question: "Can shop staff still use the dashboard?",
        answer:
          "Yes. Administrators are always exempt, and you can add other roles (e.g. Shop Manager) to the Allowed roles list.",
      },
    ],
    relatedFeatures: ["admin-dashboard-access", "manage-subscriptions"],
    relatedRecipes: ["hide-admin-bar", "brand-login-myaccount", "login-as-customer"],
  },
  {
    slug: "brand-login-myaccount",
    group: "manage-subscriptions",
    icon: KeyRound,
    name: "Route login through My Account",
    cardDescription:
      "Send wp-login.php visits to WooCommerce My Account so customers log in and register on your branded page.",
    tier: "Free",
    seoTitle: "Redirect wp-login.php to WooCommerce My Account",
    metaDescription:
      "Funnel WordPress login and registration through WooCommerce My Account with ArraySubs, hiding wp-login.php. Exact Toolkit settings and what still works.",
    h1: "Route login through My Account",
    heroSubtitle:
      "No more bare wp-login.php — funnel customer login and registration through your branded WooCommerce My Account page.",
    heroHighlights: ["Hide wp-login.php", "Branded My Account login", "Reset/logout still work"],
    intro:
      "The default ==wp-login.php== screen is off-brand and screams ‘WordPress’. ==WordPress Login Page== redirects login/registration to your ==WooCommerce My Account== page so customers stay on a ==branded experience==. Password resets, email verification, and logout ==still work==. This recipe routes login through My Account.",
    settings: [
      {
        setting: "Hide WordPress login page",
        value: "On (default Off)",
        where: "Settings → Toolkit → WordPress Login Page",
      },
      {
        setting: "Redirect login page to",
        value: "WooCommerce My Account (default) or 404",
        where: "WordPress Login Page",
      },
      {
        setting: "Still works",
        value: "Password reset · email verification · logout",
        where: "Behaviour",
      },
      {
        setting: "Prerequisite",
        value: "Published My Account page with the WooCommerce account block/shortcode",
        where: "Setup",
      },
    ],
    outcomes: [
      "wp-login.php visitors land on branded My Account.",
      "Login and registration happen on your page.",
      "Password reset, verification, and logout keep working.",
      "Third-party links to the WP login are caught too.",
    ],
    bestFor: [
      "Membership sites and portals",
      "Brand-consistent customer login",
      "Hiding the generic WordPress login",
    ],
    steps: [
      {
        title: "Confirm a My Account page exists",
        description:
          "Ensure you have a published My Account page using the WooCommerce account block or [woocommerce_my_account] shortcode.",
        manual: M.wpLogin,
      },
      {
        title: "Hide and redirect the login page",
        description:
          "In Settings → Toolkit → WordPress Login Page, turn on Hide WordPress login page and set the redirect to WooCommerce My Account.",
        manual: M.wpLogin,
      },
    ],
    notes: [
      "Password reset links, email verification callbacks, and logout requests still function when the login page is hidden.",
      "If WooCommerce registration is disabled, visitors see only the login form on My Account.",
      "Caching plugins can serve a stale wp-login.php — clear caches if the redirect seems inactive.",
    ],
    faq: [
      {
        question: "Will password resets still work?",
        answer:
          "Yes. Reset links, email verification, and logout continue to work; only the standard login/registration screens are redirected to My Account.",
      },
      {
        question: "Do I need a My Account page?",
        answer:
          "Yes — a published page with the WooCommerce account block/shortcode is required as the redirect destination.",
      },
    ],
    relatedFeatures: ["wordpress-login-page", "customer-portal", "manage-subscriptions"],
    relatedRecipes: ["restrict-wp-admin", "hide-admin-bar", "limit-concurrent-logins"],
  },
  {
    slug: "redirect-product-page",
    group: "manage-subscriptions",
    icon: Signpost,
    name: "Redirect the product page",
    cardDescription:
      "Send a subscription product’s public URL to a custom sales page (301) or a 404, while checkout keeps working.",
    tier: "Pro",
    seoTitle: "Redirect a Subscription Product Page to a Sales Page (WooCommerce Pro)",
    metaDescription:
      "Redirect a WooCommerce subscription product’s URL to a custom landing page (301) or a 404 with ArraySubs Pro, while add-to-cart and checkout still work. Exact settings inside.",
    h1: "Redirect the product page to your sales page",
    heroSubtitle:
      "Drive buyers to a designed landing page instead of the default product template — 301 to your sales page or 404 a checkout-only product.",
    heroHighlights: ["301 to a sales page", "Or 404 a hidden product", "Checkout still works"],
    intro:
      "Default WooCommerce product templates rarely sell as well as a ==designed landing page==. ==Redirect Product Page (Pro)== sends a subscription product’s ==public URL== to a custom page (==301==) or returns a ==404== for checkout-only products — while ==add-to-cart and checkout keep working== and sitemaps auto-exclude the product. This recipe redirects a product page.",
    settings: [
      {
        setting: "Enable redirect",
        value: "On (per product)",
        where: "Product → Subscription tab",
      },
      {
        setting: "Redirect action",
        value: "301 Redirect or 404 Not Found",
        where: "Product → Subscription tab",
      },
      {
        setting: "Redirect to page",
        value: "Your custom sales/landing page",
        where: "Product → Subscription tab",
      },
      {
        setting: "Not affected",
        value: "add-to-cart links · checkout · REST · admin editing",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "The product URL 301s to your designed sales page.",
      "Or returns a 404 for checkout-only products.",
      "Add-to-cart and checkout links keep working.",
      "Sitemaps (core, Yoast, Rank Math) auto-exclude the product.",
    ],
    bestFor: [
      "Funnels with a custom landing page",
      "Checkout-only / non-discoverable products",
      "Keeping buyers on a high-converting page",
    ],
    steps: [
      {
        title: "Open the product’s Subscription tab",
        description:
          "Edit the subscription product → Product data → Subscription, and find the redirect fields (Pro).",
        manual: M.redirectProduct,
      },
      {
        title: "Enable and choose the action",
        description:
          "Turn on Enable redirect, pick 301 Redirect (and select the destination page) or 404 Not Found.",
        manual: M.redirectProduct,
      },
    ],
    notes: [
      "Requires ArraySubs Pro; configured per product, not in Toolkit settings.",
      "Direct add-to-cart links, checkout, REST, and admin product editing are not affected; admins aren’t redirected.",
      "For variable products the redirect applies to the parent product page.",
    ],
    faq: [
      {
        question: "Can customers still buy the product?",
        answer:
          "Yes. Only the public product-page URL is redirected — add-to-cart links and checkout continue to work normally.",
      },
      {
        question: "Will the redirected product still appear in my sitemap?",
        answer:
          "No. Pro automatically excludes redirected/hidden products from WordPress core sitemaps and from Yoast and Rank Math.",
      },
    ],
    relatedFeatures: ["redirect-product-page", "subscription-products"],
    relatedRecipes: ["brand-login-myaccount", "restrict-wp-admin", "whats-included-list"],
  },
  {
    slug: "limit-concurrent-logins",
    group: "manage-subscriptions",
    icon: Fingerprint,
    name: "Limit concurrent logins",
    cardDescription:
      "Stop account sharing by capping concurrent sessions per user — the oldest session is logged out on excess.",
    tier: "Pro",
    seoTitle: "Limit Concurrent Logins / Stop Account Sharing (WooCommerce Pro)",
    metaDescription:
      "Cap concurrent sessions per user with ArraySubs Pro Multi-Login Prevention to stop credential sharing. Exact settings, admin exemption, and per-plan overrides inside.",
    h1: "Limit concurrent logins to stop sharing",
    heroSubtitle:
      "Protect per-seat revenue — cap how many devices can be logged into one account at once; the oldest session drops when the limit is exceeded.",
    heroHighlights: ["Max sessions per user", "Oldest session evicted", "Per-plan overrides"],
    intro:
      "Credential sharing ==leaks revenue==. ==Multi-Login Prevention (Pro)== caps ==concurrent sessions per account==; when a new login exceeds the limit, the ==oldest session is logged out== and the new login always succeeds. Administrators are exempt by default, and ==per-plan overrides== live in Member Access → Login Limit. This recipe sets a global session cap.",
    settings: [
      {
        setting: "Enable Multi-Login Prevention",
        value: "On (default Off, Pro)",
        where: "Settings → Toolkit → Multi-Login Prevention",
      },
      {
        setting: "Default max sessions per user",
        value: "1 (minimum 1)",
        where: "Settings → Toolkit → Multi-Login Prevention",
      },
      {
        setting: "Apply to administrators",
        value: "Off (recommended)",
        where: "Settings → Toolkit → Multi-Login Prevention",
      },
      {
        setting: "Per-plan override",
        value: "Member Access → Login Limit (highest limit wins)",
        where: "Member Access",
      },
    ],
    outcomes: [
      "Each account is capped to N concurrent sessions.",
      "Exceeding the cap logs out the oldest session.",
      "Admins are exempt unless you opt them in.",
      "Different plans can get different limits via Login Limit rules.",
    ],
    bestFor: [
      "Paywalled content and courses",
      "Per-seat and per-account plans",
      "Anywhere password sharing erodes revenue",
    ],
    steps: [
      {
        title: "Enable the global cap",
        description:
          "In Settings → Toolkit → Multi-Login Prevention (Pro), turn it on and set Default max sessions per user (e.g. 1).",
        manual: M.multiLogin,
      },
      {
        title: "Decide on admins",
        description:
          "Leave Apply to administrators off so your own multi-device logins aren’t evicted.",
        manual: M.multiLogin,
      },
      {
        title: "Add per-plan overrides (optional)",
        description:
          "For tier-specific limits (e.g. Team = 5), add Login Limit rules in Member Access — the highest matching limit wins.",
        manual: M.multiLogin,
      },
    ],
    notes: [
      "The newest login always succeeds; the oldest session is destroyed (visible on its next page load).",
      "Login-as-User impersonation sessions never count toward the limit.",
      "Per-plan Login Limit rules override the global Toolkit default.",
    ],
    faq: [
      {
        question: "What happens when the limit is exceeded?",
        answer:
          "The new login succeeds and the oldest active session is logged out automatically — so a shared password can’t keep extra devices signed in.",
      },
      {
        question: "Can different plans have different limits?",
        answer:
          "Yes. Set a global default in Toolkit, then add per-plan Login Limit rules in Member Access; when several match, the highest limit applies.",
      },
    ],
    relatedFeatures: ["multi-login-prevention", "member-access", "manage-subscriptions"],
    relatedRecipes: ["brand-login-myaccount", "restrict-wp-admin", "login-as-customer"],
  },
  {
    slug: "prorated-refund",
    group: "manage-subscriptions",
    icon: Undo2,
    name: "Issue a prorated refund",
    cardDescription:
      "Refund only the unused days of the current billing cycle, calculated automatically — optionally cancelling after.",
    tier: "Free",
    seoTitle: "Prorated Subscription Refunds on WooCommerce",
    metaDescription:
      "Refund the unused portion of a WooCommerce subscription’s billing cycle automatically with ArraySubs. Exact formula, settings, and whether it cancels the subscription.",
    h1: "Issue a prorated refund",
    heroSubtitle:
      "Refund fairly — return only the unused days of the current cycle, calculated by daily rate, with the option to cancel after.",
    heroHighlights: ["Unused-days refund", "Auto-calculated", "Optional cancel-after"],
    intro:
      "When a customer leaves mid-cycle, a ==prorated refund== returns only the ==unused portion==. ArraySubs computes it as ==(recurring amount ÷ days in cycle) × unused days==, from the subscription detail page, and by default ==cancels after refunding== (toggleable). A preview shows the math before you commit. This recipe issues one.",
    settings: [
      {
        setting: "Allow Prorated Refunds",
        value: "Enabled (default)",
        where: "Settings → Refunds",
      },
      {
        setting: "Prorated Refund",
        value: "Button on the subscription detail page",
        where: "Subscription detail",
      },
      {
        setting: "Formula",
        value: "(Recurring ÷ days in cycle) × unused days (Month = 30)",
        where: "Behaviour",
      },
      {
        setting: "Cancel after refund",
        value: "Default Yes (can disable)",
        where: "Prorated Refund options",
      },
      {
        setting: "Minimum Refund Amount",
        value: "0 (refunds below this aren’t processed)",
        where: "Settings → Refunds",
      },
    ],
    outcomes: [
      "Refund only the unused days of the current cycle.",
      "Amount calculated automatically by daily rate.",
      "Choose whether to cancel the subscription after.",
      "Preview the exact amount before processing.",
    ],
    bestFor: [
      "Fair mid-cycle cancellations",
      "Goodwill partial refunds",
      "Service-credit-style adjustments",
    ],
    steps: [
      {
        title: "Confirm prorated refunds are enabled",
        description:
          "In ArraySubs → Settings → Refunds, ensure Allow Prorated Refunds is enabled.",
        manual: M.refundMgmt,
      },
      {
        title: "Open the subscription and preview",
        description:
          "On the subscription detail page, click Prorated Refund; the preview shows unused days, daily rate, and the calculated amount.",
        manual: M.refundMgmt,
      },
      {
        title: "Process (and choose cancel-after)",
        description:
          "Add an optional reason and process. Leave cancel-after on to end the subscription, or turn it off to keep it active.",
        manual: M.refundMgmt,
      },
    ],
    notes: [
      "Months use a 30-day approximation in the proration math.",
      "If the calculated amount is below Minimum Refund Amount, it won’t be processed.",
      "Refunds are admin-only; customers can cancel but not self-refund.",
    ],
    faq: [
      {
        question: "How is the prorated amount calculated?",
        answer:
          "Recurring amount ÷ days in the billing cycle × unused days. For example $30/month cancelled 10 days in refunds $20 (20 unused days × $1/day).",
      },
      {
        question: "Does a prorated refund cancel the subscription?",
        answer:
          "By default yes (cancel-after is on), but you can disable it to refund without cancelling.",
      },
    ],
    relatedFeatures: ["retention-and-refunds", "manage-subscriptions", "store-credit"],
    relatedRecipes: ["refund-on-cancellation", "refund-to-store-credit", "admin-manage-lifecycle"],
  },
  {
    slug: "refund-on-cancellation",
    group: "manage-subscriptions",
    icon: CircleDollarSign,
    name: "Refund-on-cancellation policy",
    cardDescription:
      "Decide what a full refund does to the subscription — cancel now, cancel at period end, or leave it untouched.",
    tier: "Free",
    seoTitle: "Refund-on-Cancellation Policy for WooCommerce Subscriptions",
    metaDescription:
      "Control what happens to a WooCommerce subscription when its latest order is fully refunded — immediate cancel, end-of-period, or no change. Exact ArraySubs settings inside.",
    h1: "Set your refund-on-cancellation policy",
    heroSubtitle:
      "Tie refunds to subscription status the way you want — a full refund can cancel immediately, schedule for period end, or change nothing.",
    heroHighlights: ["3 policies", "Gateway auto-refund", "Minimum refund guard"],
    intro:
      "When you ==fully refund a subscription’s latest order==, what should happen to the subscription? ArraySubs lets you choose: ==Allow Immediate Refund== (cancel now), ==Refund at End of Period== (keep access until the period ends), or ==No Automatic Refund== (refund changes nothing — you manage status manually). You also control ==automatic gateway refunds== and a ==minimum refund amount==. This recipe sets the policy.",
    settings: [
      {
        setting: "Refund on Cancellation",
        value: "Allow Immediate Refund (default) · Refund at End of Period · No Automatic Refund",
        where: "Settings → Refunds",
      },
      {
        setting: "Automatic Gateway Refund",
        value: "Enabled (default) — sends money back via gateway",
        where: "Settings → Refunds",
      },
      {
        setting: "Minimum Refund Amount",
        value: "0 (no minimum)",
        where: "Settings → Refunds",
      },
      {
        setting: "Applies to",
        value: "Full refund of the latest paid order only",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "A full refund cancels immediately, at period end, or not at all.",
      "Gateway refunds can return money automatically (Stripe/PayPal/Paddle).",
      "Tiny refunds can be blocked with a minimum.",
      "Partial/older-order refunds never auto-change status.",
    ],
    bestFor: [
      "Aligning refunds with your cancellation policy",
      "Avoiding gateway fees on tiny refunds",
      "Controlling access after a refund",
    ],
    steps: [
      {
        title: "Open Refunds settings",
        description:
          "Go to ArraySubs → Settings → Refunds.",
        manual: M.refundMgmt,
      },
      {
        title: "Choose the cancellation behaviour",
        description:
          "Set Refund on Cancellation to Immediate, End of Period, or No Automatic Refund to match your policy.",
        manual: M.refundMgmt,
      },
      {
        title: "Tune gateway refund + minimum",
        description:
          "Keep Automatic Gateway Refund on to return money via the gateway, and set a Minimum Refund Amount if you want to skip tiny refunds.",
        manual: M.refundMgmt,
      },
    ],
    notes: [
      "Only a full refund of the latest paid order triggers subscription behaviour; partial or older-order refunds don’t.",
      "With Automatic Gateway Refund off, refunds are recorded as manual — you move the money in the processor yourself.",
      "The minimum applies to all refund types, including prorated and store-credit refunds.",
    ],
    faq: [
      {
        question: "Can a refund keep the customer’s access until period end?",
        answer:
          "Yes. Set Refund on Cancellation to ‘Refund at End of Period’ — the subscription stays active until the next payment date, then cancels.",
      },
      {
        question: "Can I refund without changing the subscription at all?",
        answer:
          "Yes. Choose ‘No Automatic Refund’ — refunding an order then has no automatic effect on subscription status; you manage it manually.",
      },
    ],
    relatedFeatures: ["retention-and-refunds", "manage-subscriptions"],
    relatedRecipes: ["prorated-refund", "refund-to-store-credit", "end-of-period-cancel-undo"],
  },
  {
    slug: "admin-store-credit-adjust",
    group: "manage-subscriptions",
    icon: HandCoins,
    name: "Adjust a customer’s store credit",
    cardDescription:
      "Add or deduct a customer’s store-credit balance by hand from the admin, with a reason for the audit trail.",
    tier: "Pro",
    seoTitle: "Manually Adjust Store Credit From the Admin (WooCommerce Pro)",
    metaDescription:
      "Add or deduct a WooCommerce customer’s store-credit balance manually with ArraySubs Pro, with a logged reason. Exact Manage Credits flow and limits inside.",
    h1: "Adjust a customer’s store credit",
    heroSubtitle:
      "Hand a goodwill credit or correct a balance — add or deduct store credit per customer from the admin, with a note for the record.",
    heroHighlights: ["Add or deduct", "Per-customer", "Logged with a reason"],
    intro:
      "Support often needs to ==grant goodwill credit== or ==correct a balance==. ==Store Credit Management (Pro)== lets an admin ==add or deduct a customer’s credit== from ArraySubs → Store Credit → Manage Credits: search the customer, enter an amount, choose ==Add or Deduct==, and add a note. Adjustments log as ==Admin Adjustment== and email the customer when credit is added. This recipe makes a manual adjustment.",
    settings: [
      {
        setting: "Where",
        value: "ArraySubs → Store Credit → Manage Credits",
        where: "Admin (Pro)",
      },
      {
        setting: "Find customer",
        value: "Search by name / username / email (2+ chars)",
        where: "Manage Credits",
      },
      {
        setting: "Adjust Credit fields",
        value: "Amount · Type (Add / Deduct) · Note",
        where: "Manage Credits",
      },
      {
        setting: "Logged as",
        value: "‘Admin Adjustment’ source; Credit Added email on add",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Add or deduct a customer’s credit balance instantly.",
      "Attach a reason note for the audit trail.",
      "Customer gets a Credit Added email on additions.",
      "Adjustments appear in Credit History as ‘Admin Adjustment’.",
    ],
    bestFor: [
      "Goodwill credits and corrections",
      "Compensating service issues",
      "Manual credit grants outside refunds",
    ],
    steps: [
      {
        title: "Open Manage Credits",
        description:
          "Go to ArraySubs → Store Credit → Manage Credits (Pro; Store Credit must be enabled).",
        manual: M.storeCreditMgmt,
      },
      {
        title: "Find the customer",
        description:
          "Search by name, username, or email (2+ characters) and select them to load their balance and history.",
        manual: M.storeCreditMgmt,
      },
      {
        title: "Apply the adjustment",
        description:
          "Enter an Amount, set Type to Add or Deduct, add a Note, and click Apply Adjustment. You can’t deduct more than the current balance.",
        manual: M.storeCreditMgmt,
      },
    ],
    notes: [
      "This manages customer-level (account-wide) credit; subscription-level credit from downgrades lives on the subscription detail page.",
      "There’s no bulk adjust — adjustments are per customer.",
      "The log records the note but not which admin made the change.",
    ],
    faq: [
      {
        question: "Can I deduct more than the customer has?",
        answer:
          "No. Deducting more than the current balance is blocked with an error — you can only deduct up to the available amount.",
      },
      {
        question: "Does the customer get notified?",
        answer:
          "On additions, yes — the Credit Added email fires (if enabled). Deductions are logged but don’t email by default.",
      },
    ],
    relatedFeatures: ["store-credit", "manage-subscriptions", "member-insight"],
    relatedRecipes: ["credit-history-audit", "refund-to-store-credit", "auto-apply-credit-renewals"],
  },
  {
    slug: "credit-history-audit",
    group: "manage-subscriptions",
    icon: History,
    name: "Audit store-credit history",
    cardDescription:
      "Review every credit transaction across all customers — filter by source and type to audit balances.",
    tier: "Pro",
    seoTitle: "Store Credit History & Audit Log (WooCommerce Pro)",
    metaDescription:
      "Audit every store-credit transaction across customers with ArraySubs Pro — filter by source (refund, downgrade, admin, expired…) and type. Exact columns and filters inside.",
    h1: "Audit store-credit history",
    heroSubtitle:
      "See where every credit came from and went — a global, filterable log of credits and debits across all customers.",
    heroHighlights: ["All customers", "Filter by source & type", "Per-transaction detail"],
    intro:
      "When balances need ==explaining or auditing==, the global ==Credit History== log (Pro) lists ==every transaction across all customers== — ID, date, customer, description, and amount (green credits, red debits). ==Filter by source== (Plan Downgrade, Refund, Admin Adjustment, Promotional, Credit Purchase, Applied to Renewal, Applied to Order, Expired) and ==by type== (credit/debit). This recipe audits credit activity.",
    settings: [
      {
        setting: "Where",
        value: "ArraySubs → Store Credit → Credit History",
        where: "Admin (Pro)",
      },
      {
        setting: "Columns",
        value: "ID · Date · Customer · Description · Amount · Actions",
        where: "Credit History",
      },
      {
        setting: "Filter by Source",
        value: "Downgrade · Refund · Admin · Promotional · Purchase · Renewal · Order · Expired",
        where: "Credit History",
      },
      {
        setting: "Filter by Type",
        value: "Credit (added) · Debit (deducted)",
        where: "Credit History",
      },
    ],
    outcomes: [
      "Review all credit transactions in one place.",
      "Filter by source and type (filters combine).",
      "Trace each credit to its origin and subscription.",
      "Explain any balance with a full audit trail.",
    ],
    bestFor: [
      "Finance reconciliation and audits",
      "Investigating a disputed balance",
      "Understanding credit sources at a glance",
    ],
    steps: [
      {
        title: "Open Credit History",
        description:
          "Go to ArraySubs → Store Credit → Credit History (Pro).",
        manual: M.creditHistory,
      },
      {
        title: "Filter to what you need",
        description:
          "Combine the Source and Type filters (e.g. Refund + Credit Added) to isolate transactions; the count updates and pagination resets.",
        manual: M.creditHistory,
      },
      {
        title: "Trace a transaction",
        description:
          "Use the Description’s ‘Subscription: #ID’ link to jump to the related subscription where applicable.",
        manual: M.creditHistory,
      },
    ],
    notes: [
      "Deleting a log entry only removes the record — it does not reverse the credit or change any balance.",
      "There’s no built-in export; pull history via the REST API if you need a file.",
      "For one customer’s history, use Manage Credits and search — this page has no per-customer filter.",
    ],
    faq: [
      {
        question: "What sources can I filter by?",
        answer:
          "Plan Downgrade, Refund, Admin Adjustment, Promotional, Credit Purchase, Applied to Renewal, Applied to Order, and Expired — combined with a credit/debit type filter.",
      },
      {
        question: "Does deleting a log entry undo the credit?",
        answer:
          "No. Deletion removes only the log record; it never reverses the transaction or changes the customer’s balance.",
      },
    ],
    relatedFeatures: ["store-credit", "manage-subscriptions"],
    relatedRecipes: ["admin-store-credit-adjust", "refund-to-store-credit", "export-subscriptions"],
  },

  // ============================================================
  // GROUP 5 — Member restrictions & gated content
  // ============================================================
  {
    slug: "restrict-pages-by-plan",
    group: "member-restrictions",
    icon: Lock,
    name: "Restrict pages & posts by plan",
    cardDescription:
      "Gate any page, post, or custom post type to subscribers — show a custom message to everyone else.",
    tier: "Free",
    seoTitle: "Restrict Pages and Posts by Subscription on WooCommerce",
    metaDescription:
      "Gate WooCommerce pages, posts, and custom post types to active subscribers with ArraySubs Member Access. Exact Post Type rule settings and actions inside.",
    h1: "Restrict pages and posts by subscription",
    heroSubtitle:
      "The core paywall — gate any content type to active subscribers and show non-members a custom message or redirect.",
    heroHighlights: ["Gate any post type", "Active-subscription condition", "Custom message or redirect"],
    intro:
      "The foundation of any membership is ==gating content to subscribers==. A Member Access ==Post Type rule== gates ==pages, posts, or any custom post type== behind a condition like ==Has Active Subscription==, and shows everyone else a ==message, redirect, or 403==. This recipe builds the core ‘members-only content’ rule.",
    settings: [
      {
        setting: "Rule tab",
        value: "Member Access → Post Types",
        where: "Member Access",
      },
      {
        setting: "IF condition",
        value: "Has Active Subscription (optionally specific products)",
        where: "Rule conditions",
      },
      {
        setting: "Target Type",
        value: "Entire Post Type / Taxonomy / Specific Posts",
        where: "Rule target",
      },
      {
        setting: "Action",
        value: "Message (default) · Redirect · 403 Forbidden",
        where: "Rule action",
      },
      {
        setting: "Archive Behavior",
        value: "Hide / Show with lock / Show normally",
        where: "Rule action",
      },
    ],
    outcomes: [
      "Members see the content; everyone else sees your message.",
      "Works on pages, posts, and custom post types.",
      "Choose how restricted items appear in archives.",
      "No code — rules-based gating.",
    ],
    bestFor: [
      "Membership sites and gated resources",
      "Premium articles and guides",
      "Any ‘subscribers only’ content",
    ],
    steps: [
      {
        title: "Create a Post Type rule",
        description:
          "Go to Member Access → Post Types and add a rule; give it a name and enable it.",
        manual: M.accessRules,
      },
      {
        title: "Set the condition and target",
        description:
          "Add the condition Has Active Subscription, then choose the target (Entire Post Type, a Taxonomy, or Specific Posts).",
        manual: M.accessRules,
      },
      {
        title: "Pick the action and archive behavior",
        description:
          "Set the action to Message (or Redirect/403) and choose how restricted items appear in archives (Hide, Show with lock, Show normally).",
        manual: M.contentRestriction,
      },
    ],
    notes: [
      "Per-post restrictions (set on the post itself) take priority over general Post Type rules.",
      "Messages support merge tags like {pricing_link} and {login_link}; a global default message is used if none is set.",
      "Conditions default to active and trial subscriptions — add on-hold/paused explicitly if you want those to keep access.",
    ],
    faq: [
      {
        question: "Can I gate custom post types, not just posts?",
        answer:
          "Yes. The Post Type rule works on any registered post type — pages, posts, products, and custom types — by entire type, taxonomy term, or specific IDs.",
      },
      {
        question: "What do non-members see?",
        answer:
          "Whatever you choose: a custom restriction message (default), a redirect to a page like pricing, or a 403 Forbidden response.",
      },
    ],
    relatedFeatures: ["member-access", "subscription-products", "customer-portal"],
    relatedRecipes: ["paywall-by-category", "gate-specific-pages", "archive-teaser-lock"],
  },
  {
    slug: "paywall-by-category",
    group: "member-restrictions",
    icon: Newspaper,
    name: "Paywall a whole category",
    cardDescription:
      "Gate every post in a category or tag at once — perfect for a ‘Premium’ section that grows automatically.",
    tier: "Free",
    seoTitle: "Paywall a Category or Tag on WooCommerce",
    metaDescription:
      "Gate an entire category or tag of posts behind a subscription with ArraySubs Member Access taxonomy targeting. New posts in the term are auto-gated. Exact settings inside.",
    h1: "Paywall an entire category or tag",
    heroSubtitle:
      "Gate by taxonomy, not post-by-post — every article in your ‘Premium’ category is members-only, and new ones inherit the rule automatically.",
    heroHighlights: ["Gate by category/tag", "New posts auto-gated", "Set-and-forget"],
    intro:
      "Gating articles one by one doesn’t scale. ==Taxonomy targeting== gates ==every post in a category or tag== with a single rule — so a ‘Premium’ category is members-only and ==new posts you add inherit the gate automatically==. This recipe paywalls a category.",
    settings: [
      {
        setting: "Rule tab",
        value: "Member Access → Post Types",
        where: "Member Access",
      },
      {
        setting: "Target Type",
        value: "Taxonomy",
        where: "Rule target",
      },
      {
        setting: "Taxonomy + Terms",
        value: "e.g. Category → ‘Premium Articles’",
        where: "Rule target",
      },
      {
        setting: "IF condition",
        value: "Has Active Subscription",
        where: "Rule conditions",
      },
      {
        setting: "Action / Archive",
        value: "Message · Show normally (keep teasers in listings)",
        where: "Rule action",
      },
    ],
    outcomes: [
      "Every post in the term is gated by one rule.",
      "New posts added to the term are gated automatically.",
      "Keep titles/excerpts public for SEO with ‘Show normally’.",
      "Members read the full content; others see your message.",
    ],
    bestFor: [
      "Magazines and publishers with premium sections",
      "Growing libraries that shouldn’t need per-post rules",
      "Section-based paywalls",
    ],
    steps: [
      {
        title: "Add a Post Type rule, target Taxonomy",
        description:
          "In Member Access → Post Types, add a rule and set Target Type = Taxonomy.",
        manual: M.accessRules,
      },
      {
        title: "Choose the term",
        description:
          "Select the taxonomy (e.g. Category) and the term(s) to gate, such as ‘Premium Articles’.",
        manual: M.accessRules,
      },
      {
        title: "Set condition and archive behavior",
        description:
          "Require Has Active Subscription, set the action to Message, and choose Show normally to keep teasers indexable.",
        manual: M.contentRestriction,
      },
    ],
    notes: [
      "‘Show normally’ keeps titles and excerpts public (good for SEO) while gating the body; ‘Hide’ removes them from archives entirely.",
      "Works with categories, tags, and custom taxonomies.",
      "Combine with content dripping to release premium posts on a schedule.",
    ],
    faq: [
      {
        question: "Do new posts in the category get gated automatically?",
        answer:
          "Yes. Taxonomy targeting gates the term, so any post you later assign to that category or tag is automatically covered.",
      },
      {
        question: "Will this hurt my SEO?",
        answer:
          "Not if you use ‘Show normally’ — titles and excerpts stay public and indexable while the full body is gated.",
      },
    ],
    relatedFeatures: ["member-access", "subscription-products"],
    relatedRecipes: ["restrict-pages-by-plan", "archive-teaser-lock", "drip-course-content"],
  },
  {
    slug: "gate-specific-pages",
    group: "member-restrictions",
    icon: FileText,
    name: "Gate specific pages",
    cardDescription:
      "Hand-pick individual pages or posts to lock — ideal for a few premium resources without gating a whole type.",
    tier: "Free",
    seoTitle: "Gate Specific Pages or Posts on WooCommerce",
    metaDescription:
      "Restrict individually selected WooCommerce pages or posts to members with ArraySubs Member Access ‘Specific Posts’ targeting. Exact settings inside.",
    h1: "Gate hand-picked pages",
    heroSubtitle:
      "Lock just the pages you choose — a precise rule for a handful of premium resources, leaving everything else public.",
    heroHighlights: ["Pick exact pages/posts", "Leave the rest public", "Precise control"],
    intro:
      "Sometimes you only need to gate ==a few specific pages== — a resource hub, a private guide, a tool. ==Specific Posts== targeting lets you ==hand-pick the exact pages or posts== to lock by ID, leaving the rest of your site open. This recipe gates a chosen set.",
    settings: [
      {
        setting: "Target Type",
        value: "Specific Posts",
        where: "Member Access → Post Types",
      },
      {
        setting: "Post Type + Posts/Pages",
        value: "Pick exact pages/posts (AJAX search)",
        where: "Rule target",
      },
      {
        setting: "IF condition",
        value: "Has Active Subscription (or role / spend / purchase)",
        where: "Rule conditions",
      },
      {
        setting: "Action",
        value: "Message · Redirect · 403",
        where: "Rule action",
      },
    ],
    outcomes: [
      "Only the selected pages/posts are gated.",
      "Everything else stays public.",
      "Mix conditions (plan, role, spend) on the same rule.",
      "Precise, low-risk gating.",
    ],
    bestFor: [
      "A handful of premium resources",
      "Private tools or hubs",
      "Targeted gating without a whole-type rule",
    ],
    steps: [
      {
        title: "Add a rule with Specific Posts target",
        description:
          "In Member Access → Post Types, add a rule and set Target Type = Specific Posts.",
        manual: M.accessRules,
      },
      {
        title: "Search and select the pages",
        description:
          "Choose the post type, then search and add the exact pages/posts to gate.",
        manual: M.accessRules,
      },
      {
        title: "Set the condition and action",
        description:
          "Require an active subscription (or another condition) and choose the action shown to non-members.",
        manual: M.contentRestriction,
      },
    ],
    notes: [
      "For a single page, you can also restrict it from the post’s own settings — per-post restrictions outrank Post Type rules.",
      "You can combine multiple conditions (e.g. plan AND role) with AND/OR logic.",
      "Use Specific Posts when a taxonomy or whole-type rule would over-gate.",
    ],
    faq: [
      {
        question: "When should I use Specific Posts vs a category rule?",
        answer:
          "Use Specific Posts for a small, fixed set of pages. Use Taxonomy targeting when you want every post in a category/tag (including future ones) gated.",
      },
      {
        question: "Can I gate a single page without a rule?",
        answer:
          "Yes. Enable restriction on the post itself — those per-post conditions take priority over general Post Type rules.",
      },
    ],
    relatedFeatures: ["member-access", "subscription-products"],
    relatedRecipes: ["restrict-pages-by-plan", "paywall-by-category", "inline-content-gating"],
  },
  {
    slug: "archive-teaser-lock",
    group: "member-restrictions",
    icon: Eye,
    name: "Teasers with a lock in listings",
    cardDescription:
      "Show restricted posts in archives with a lock icon and teaser, gating the full content only on click.",
    tier: "Free",
    seoTitle: "Show Locked Teasers in Archives on WooCommerce",
    metaDescription:
      "Display restricted posts in WooCommerce archives with a lock indicator and teaser, gating full content on click, using ArraySubs archive behavior. Exact settings inside.",
    h1: "Teaser-and-lock in listings",
    heroSubtitle:
      "Tease, don’t hide — let premium posts appear in archives with a lock so visitors see what they’re missing and convert.",
    heroHighlights: ["Visible in archives", "Lock indicator", "Gate on click"],
    intro:
      "Hiding premium posts entirely means visitors never know they exist. ==Show with lock== archive behavior keeps restricted posts ==visible in listings with a lock indicator== (and titles/excerpts), gating the ==full content only when clicked== — turning your archive into a conversion surface. This recipe sets teaser-and-lock.",
    settings: [
      {
        setting: "Rule tab",
        value: "Member Access → Post Types",
        where: "Member Access",
      },
      {
        setting: "Archive Behavior",
        value: "Show with lock (or Show normally)",
        where: "Rule action",
      },
      {
        setting: "Action (on open)",
        value: "Message with a View Plans / Log In call-to-action",
        where: "Rule action",
      },
      {
        setting: "IF condition",
        value: "Has Active Subscription",
        where: "Rule conditions",
      },
    ],
    outcomes: [
      "Premium posts stay visible in archives with a lock.",
      "Titles and excerpts tease the gated content.",
      "Full content gates on click with an upgrade prompt.",
      "Higher conversion than hiding content outright.",
    ],
    bestFor: [
      "Publishers wanting paywall discovery",
      "Course catalogs and resource libraries",
      "Driving upgrades from listings",
    ],
    steps: [
      {
        title: "Edit your content rule’s archive behavior",
        description:
          "On a Post Type rule (e.g. your premium category), set Archive Behavior to Show with lock.",
        manual: M.contentRestriction,
      },
      {
        title: "Set an enticing restriction message",
        description:
          "Use the Message action with a View Plans & Pricing button (the default restriction page includes pricing and login links).",
        manual: M.contentRestriction,
      },
    ],
    notes: [
      "‘Show with lock’ displays the post in archives with a lock; ‘Show normally’ shows it without a lock and gates only on open; ‘Hide’ removes it from listings.",
      "The default restriction page includes a View Plans & Pricing button and (for logged-out users) a Log In button.",
      "Pair with merge tags ({pricing_link}) to point straight at your plans.",
    ],
    faq: [
      {
        question: "What’s the difference between the archive behaviors?",
        answer:
          "Hide removes restricted posts from archives; Show with lock shows them with a lock indicator; Show normally shows them unmarked and gates only when opened.",
      },
      {
        question: "Can the lock screen link to my pricing page?",
        answer:
          "Yes. The default restriction page includes a View Plans & Pricing button, and messages support the {pricing_link} merge tag.",
      },
    ],
    relatedFeatures: ["member-access", "subscription-products"],
    relatedRecipes: ["paywall-by-category", "restrict-pages-by-plan", "inline-content-gating"],
  },
  {
    slug: "url-prefix-lockdown",
    group: "member-restrictions",
    icon: Globe,
    name: "Lock a URL path (with exclusions)",
    cardDescription:
      "Gate everything under a path like /members/ with a URL rule — and exempt a few public pages.",
    tier: "Free",
    seoTitle: "Restrict Access by URL Path on WooCommerce",
    metaDescription:
      "Gate a whole URL path (e.g. /members/) behind a subscription with ArraySubs URL rules, with exclusions for public pages. Exact pattern types and actions inside.",
    h1: "Lock down a URL path",
    heroSubtitle:
      "Protect an entire section by its URL — gate everything under /members/ while leaving a preview or about page public.",
    heroHighlights: ["Prefix match", "Exclude public pages", "Redirect non-members"],
    intro:
      "When a members area lives under ==one URL path==, gate it by URL instead of page-by-page. A ==URL rule== with a ==Prefix== pattern (e.g. ==/members/==) locks everything beneath it, with ==Exclusions== for any public pages and a ==Redirect== for non-members. This recipe locks a path.",
    settings: [
      {
        setting: "Rule tab",
        value: "Member Access → URL",
        where: "Member Access",
      },
      {
        setting: "Pattern Type + Pattern",
        value: "Prefix · /members/",
        where: "Rule target",
      },
      {
        setting: "Exclusions",
        value: "e.g. /members/about/, /members/preview/",
        where: "Rule target",
      },
      {
        setting: "Priority",
        value: "10 (lower = evaluated first)",
        where: "Rule target",
      },
      {
        setting: "Action",
        value: "Redirect (default) · Message · 403 · Login",
        where: "Rule action",
      },
    ],
    outcomes: [
      "Everything under the path requires a subscription.",
      "Named public pages are exempted via exclusions.",
      "Non-members are redirected (e.g. to pricing).",
      "One rule covers an entire section.",
    ],
    bestFor: [
      "A members area under a single path",
      "Gating app/dashboard routes",
      "Whole-section protection",
    ],
    steps: [
      {
        title: "Add a URL rule",
        description:
          "In Member Access → URL, add a rule, set Pattern Type = Prefix and the Pattern to your path (e.g. /members/).",
        manual: M.accessRules,
      },
      {
        title: "Add exclusions and priority",
        description:
          "List any public sub-paths in Exclusions, and set Priority (1–100, lower runs first) if rules might overlap.",
        manual: M.accessRules,
      },
      {
        title: "Choose the action + condition",
        description:
          "Set the action (Redirect to pricing is common) and require Has Active Subscription.",
        manual: M.contentRestriction,
      },
    ],
    notes: [
      "URL matching checks the path only (not query strings) and applies to frontend page loads, not wp-admin or REST.",
      "Pattern types: Prefix, Contains, Exact, Regex.",
      "Lower Priority numbers are evaluated first; the first failing rule wins.",
    ],
    faq: [
      {
        question: "Can I keep a couple of pages public inside the path?",
        answer:
          "Yes. Add them to the rule’s Exclusions list (comma-separated paths) and they’re exempt from the restriction.",
      },
      {
        question: "Does URL gating affect wp-admin or the API?",
        answer:
          "No. URL rules apply to frontend page loads only — not wp-admin or REST API requests.",
      },
    ],
    relatedFeatures: ["member-access", "subscription-products"],
    relatedRecipes: ["url-regex-gating", "restrict-pages-by-plan", "members-only-catalog"],
  },
  {
    slug: "url-regex-gating",
    group: "member-restrictions",
    icon: Regex,
    name: "Gate URLs with regex",
    cardDescription:
      "Match dynamic URL patterns — like /forum/board-12/ or /courses/level-3 — with a regular-expression URL rule.",
    tier: "Free",
    seoTitle: "Regex URL Access Rules on WooCommerce",
    metaDescription:
      "Gate dynamic URL patterns with regular-expression rules in ArraySubs Member Access — e.g. forum boards or numbered course levels. Exact regex pattern setup inside.",
    h1: "Gate dynamic URLs with regex",
    heroSubtitle:
      "For patterned URLs that change — forum boards, numbered levels, dated paths — match them all with one regular expression.",
    heroHighlights: ["Regex pattern", "Matches dynamic paths", "One rule, many URLs"],
    intro:
      "Some sections have ==dynamic, patterned URLs== — ==/forum/board-12/==, ==/courses/level-3== — that a prefix can’t target precisely. A ==Regex== URL rule matches them all with ==one regular expression==, gating a whole family of paths while leaving public ones (announcements, rules) open. This recipe gates by regex.",
    settings: [
      {
        setting: "Pattern Type",
        value: "Regex",
        where: "Member Access → URL",
      },
      {
        setting: "URL Pattern",
        value: "e.g. ^/forum/board-[0-9]+/",
        where: "Rule target",
      },
      {
        setting: "Action",
        value: "Login (or Redirect / Message / 403)",
        where: "Rule action",
      },
      {
        setting: "IF condition",
        value: "Has Active Subscription",
        where: "Rule conditions",
      },
    ],
    outcomes: [
      "One regex covers a whole family of dynamic URLs.",
      "Public paths stay open; patterned ones are gated.",
      "Send non-members to login or pricing.",
      "Precise control over complex URL structures.",
    ],
    bestFor: [
      "Forums with numbered boards",
      "Courses with leveled URLs",
      "Any patterned, dynamic path",
    ],
    steps: [
      {
        title: "Add a URL rule with Regex",
        description:
          "In Member Access → URL, add a rule and set Pattern Type = Regex.",
        manual: M.accessRules,
      },
      {
        title: "Write the pattern",
        description:
          "Enter a regex such as ^/forum/board-[0-9]+/ to match all numbered boards.",
        manual: M.accessRules,
      },
      {
        title: "Set action and priority",
        description:
          "Choose an action (e.g. Login) and a Priority so this rule evaluates before broader ones.",
        manual: M.contentRestriction,
      },
    ],
    notes: [
      "Regex matches the URL path only (no query strings).",
      "Test patterns carefully — an over-broad regex can gate more than intended.",
      "Lower Priority numbers run first; the first failing rule applies.",
    ],
    faq: [
      {
        question: "What regex syntax is supported?",
        answer:
          "Standard PHP/PCRE-style patterns against the URL path, e.g. ^/courses/level-[0-9]+$ to match numbered levels.",
      },
      {
        question: "Can I keep some forum pages public?",
        answer:
          "Yes — either craft the regex to exclude them, or add a higher-priority allow path; announcements and rules can stay open.",
      },
    ],
    relatedFeatures: ["member-access", "subscription-products"],
    relatedRecipes: ["url-prefix-lockdown", "combined-conditions", "session-limit-per-tier"],
  },
  {
    slug: "members-only-catalog",
    group: "member-restrictions",
    icon: Store,
    name: "Members-only product catalog",
    cardDescription:
      "Hide or block-purchase products for non-members — a wholesale or members-only store behind a subscription.",
    tier: "Free",
    seoTitle: "Members-Only / Wholesale Product Catalog on WooCommerce",
    metaDescription:
      "Restrict WooCommerce products to members with ArraySubs Ecommerce rules — block purchase or redirect non-members. Build a wholesale or members-only catalog. Exact settings inside.",
    h1: "Members-only product catalog",
    heroSubtitle:
      "Gate the shop itself — let only approved members buy, with non-members blocked or redirected to join.",
    heroHighlights: ["Block purchase", "Or redirect to join", "Wholesale-ready"],
    intro:
      "Wholesale and members-only stores need the ==catalog itself gated==. An ==Ecommerce rule== restricts products to subscribers, with non-members ==blocked from purchasing== or ==redirected to a join page==. It covers shop pages, search, related products, cart validation, and even the Store API. This recipe gates the catalog.",
    settings: [
      {
        setting: "Rule tab",
        value: "Member Access → Ecommerce",
        where: "Member Access",
      },
      {
        setting: "IF condition",
        value: "Has Active Subscription (e.g. ‘Wholesale Membership’)",
        where: "Rule conditions",
      },
      {
        setting: "Restriction Scope",
        value: "All products / Specific products / Specific categories",
        where: "Rule target",
      },
      {
        setting: "Action",
        value: "Block purchase (default) · 404 · Redirect to login · Redirect to page",
        where: "Rule action",
      },
    ],
    outcomes: [
      "Only members can purchase the gated products.",
      "Non-members are blocked or redirected to join.",
      "Covers shop, search, related items, cart, and Store API.",
      "Scope to all products, specific products, or categories.",
    ],
    bestFor: [
      "Wholesale / trade catalogs",
      "Members-only stores",
      "Approved-buyer pricing and access",
    ],
    steps: [
      {
        title: "Create an Ecommerce rule",
        description:
          "In Member Access → Ecommerce, add a rule requiring the relevant subscription (e.g. Wholesale Membership).",
        manual: M.commerceBenefit,
      },
      {
        title: "Scope the products",
        description:
          "Set the restriction scope to All products, Specific products, or Specific categories (with optional exclusions).",
        manual: M.commerceBenefit,
      },
      {
        title: "Choose the action",
        description:
          "Pick Block purchase, Redirect to page (e.g. /become-a-member), Redirect to login, or 404.",
        manual: M.commerceBenefit,
      },
    ],
    notes: [
      "Restrictions apply at product level, not per variation — gating a variable product gates all its variations.",
      "Block purchase keeps the product visible but disables add-to-cart; 404 hides it everywhere including sitemaps.",
      "Admins can still see restricted products in wp-admin even if they don’t qualify.",
    ],
    faq: [
      {
        question: "Can I hide products completely from non-members?",
        answer:
          "Yes. Use the 404 action — the product is hidden from catalogs, search, related/upsell, widgets, REST, and XML sitemaps for non-qualifying visitors.",
      },
      {
        question: "Can I restrict only some products?",
        answer:
          "Yes. Scope the rule to specific products or categories (with exclusions) instead of all products.",
      },
    ],
    relatedFeatures: ["member-access", "subscription-products"],
    relatedRecipes: ["hide-products-404", "member-pricing", "role-mapping-by-plan"],
  },
  {
    slug: "hide-products-404",
    group: "member-restrictions",
    icon: ShoppingBag,
    name: "Hide products from non-members",
    cardDescription:
      "Make restricted products return 404 and vanish from catalogs, search, and sitemaps for non-qualifying visitors.",
    tier: "Free",
    seoTitle: "Hide WooCommerce Products From Non-Members (404)",
    metaDescription:
      "Completely hide WooCommerce products from non-members with ArraySubs — 404 the product and remove it from catalogs, search, related items, and sitemaps. Exact settings inside.",
    h1: "Hide products from non-members entirely",
    heroSubtitle:
      "Not just block — disappear. Restricted products return 404 and drop out of every catalog, search, and sitemap for non-members.",
    heroHighlights: ["404 the product", "Gone from catalogs & search", "Excluded from sitemaps"],
    intro:
      "Some products should be ==invisible to non-members== — secret tiers, exclusive drops, supplier-only items. The Ecommerce ==404 action== makes a restricted product ==return 404== and ==vanish from catalogs, search, related/upsell, widgets, REST, and XML sitemaps== for anyone who doesn’t qualify. This recipe hides products completely.",
    settings: [
      {
        setting: "Rule tab",
        value: "Member Access → Ecommerce",
        where: "Member Access",
      },
      {
        setting: "Action",
        value: "404 Not Found",
        where: "Rule action",
      },
      {
        setting: "IF condition",
        value: "Has Active Subscription / Role / Lifetime spend",
        where: "Rule conditions",
      },
      {
        setting: "Schedule (optional)",
        value: "Drip access by days-since-subscription-start",
        where: "Rule schedule",
      },
    ],
    outcomes: [
      "Restricted products 404 for non-members.",
      "Removed from shop, search, related, widgets, REST.",
      "Excluded from WordPress, Yoast, and Rank Math sitemaps.",
      "Truly hidden, not just unbuyable.",
    ],
    bestFor: [
      "Secret or exclusive products",
      "Supplier-only catalogs",
      "Hiding tiers from the wrong audience",
    ],
    steps: [
      {
        title: "Create an Ecommerce rule with 404",
        description:
          "In Member Access → Ecommerce, add a rule, scope the products, and set the action to 404 Not Found.",
        manual: M.commerceBenefit,
      },
      {
        title: "Set the qualifying condition",
        description:
          "Require the subscription, role, or spend that should be allowed to see the product.",
        manual: M.commerceBenefit,
      },
    ],
    notes: [
      "404 hides the product everywhere for non-qualifying visitors; Block purchase keeps it visible but unbuyable.",
      "Sitemaps (core, Yoast, Rank Math) automatically exclude 404-gated products.",
      "Add a Schedule to reveal supplier/exclusive products only after a membership matures.",
    ],
    faq: [
      {
        question: "Will hidden products leak via search or sitemap?",
        answer:
          "No. The 404 action removes them from catalogs, search, related/upsell, widgets, the REST API, and XML sitemaps for non-qualifying visitors.",
      },
      {
        question: "Can I reveal a product only after N days of membership?",
        answer:
          "Yes. Add a Schedule (days/weeks/months since subscription start) so access opens once the membership matures.",
      },
    ],
    relatedFeatures: ["member-access", "subscription-products"],
    relatedRecipes: ["members-only-catalog", "spend-based-vip", "combined-conditions"],
  },
  {
    slug: "member-pricing",
    group: "member-restrictions",
    icon: Percent,
    name: "Member pricing & discounts",
    cardDescription:
      "Give subscribers automatic member pricing across the store — a percentage off, shown alongside the regular price.",
    tier: "Free",
    seoTitle: "Automatic Member Pricing on WooCommerce",
    metaDescription:
      "Give WooCommerce subscribers automatic member pricing with ArraySubs Discount rules — percentage or fixed, per item or per cart. Exact settings and stacking behavior inside.",
    h1: "Automatic member pricing",
    heroSubtitle:
      "Reward members with store-wide pricing — a percentage off applied automatically, with the original and member price both shown.",
    heroHighlights: ["Auto member %", "Original + member price shown", "Logged-in only"],
    intro:
      "Member pricing is a core perk. A ==Discount rule== gives subscribers an ==automatic percentage (or fixed) discount== across products or categories — applied at the cart and ==shown next to the regular price== so members see the value. It’s ==logged-in only==, and when rules overlap the ==lowest price wins==. This recipe sets member pricing.",
    settings: [
      {
        setting: "Rule tab",
        value: "Member Access → Discount",
        where: "Member Access",
      },
      {
        setting: "Discount Type / Value",
        value: "Percentage · e.g. 15 (or Fixed amount)",
        where: "Rule action",
      },
      {
        setting: "Apply discount to",
        value: "All products / Specific products / Categories / Tags",
        where: "Rule target",
      },
      {
        setting: "IF condition",
        value: "Has Active Subscription (the member plan)",
        where: "Rule conditions",
      },
    ],
    outcomes: [
      "Members get an automatic discount across the store.",
      "Original and member prices both display.",
      "Scope to all products, specific items, categories, or tags.",
      "Lowest price wins when multiple rules match.",
    ],
    bestFor: [
      "Membership perks and loyalty pricing",
      "Trade / wholesale member rates",
      "Store-wide subscriber discounts",
    ],
    steps: [
      {
        title: "Create a Discount rule",
        description:
          "In Member Access → Discount, add a rule requiring the member subscription.",
        manual: M.commerceBenefit,
      },
      {
        title: "Set the discount and scope",
        description:
          "Choose Percentage (e.g. 15%) or Fixed, then scope to all products or specific products/categories/tags (with exclusions).",
        manual: M.commerceBenefit,
      },
    ],
    notes: [
      "Only logged-in users get member pricing — guests never see it.",
      "Calculated against the regular price by default (doesn’t stack on sale price unless you enable it via filter); coexists with coupons by default.",
      "When multiple discount rules match, the lowest resulting price applies — discounts don’t stack.",
    ],
    faq: [
      {
        question: "Do guests see member pricing?",
        answer:
          "No. Member discounts apply only to logged-in users who match the rule; guests always see the regular price.",
      },
      {
        question: "Does it stack with coupons or sales?",
        answer:
          "It coexists with WooCommerce coupons by default and is calculated against the regular (not sale) price unless you enable stacking via the provided filters.",
      },
    ],
    relatedFeatures: ["member-access", "subscription-products", "store-credit"],
    relatedRecipes: ["per-cart-discount", "members-only-catalog", "role-mapping-by-plan"],
  },
  {
    slug: "per-cart-discount",
    group: "member-restrictions",
    icon: Tag,
    name: "Per-cart member discount",
    cardDescription:
      "Give high-value members a flat amount off the whole cart — shown as a negative fee at checkout.",
    tier: "Free",
    seoTitle: "Per-Cart Member Discount on WooCommerce",
    metaDescription:
      "Apply a flat per-cart discount for members with ArraySubs Discount rules, shown as a negative fee line. Exact settings for a fixed cart-level member benefit inside.",
    h1: "Flat per-cart member discount",
    heroSubtitle:
      "Reward members with a flat amount off the entire order — e.g. Gold members get $25 off any cart.",
    heroHighlights: ["Flat off the cart", "Negative fee line", "Tier-specific"],
    intro:
      "Sometimes a ==flat cart-level benefit== beats per-item pricing — ‘Gold members get ==$25 off any order==’. A ==Fixed== Discount rule with ==Apply To = Per cart== applies the amount once at the cart total, shown as a ==negative fee line==. This recipe sets a per-cart member discount.",
    settings: [
      {
        setting: "Discount Type",
        value: "Fixed amount",
        where: "Member Access → Discount",
      },
      {
        setting: "Apply To",
        value: "Per cart (only shown for fixed-amount)",
        where: "Rule action",
      },
      {
        setting: "Discount Value",
        value: "e.g. 25",
        where: "Rule action",
      },
      {
        setting: "IF condition",
        value: "Has Active Subscription (e.g. ‘Gold Plan’)",
        where: "Rule conditions",
      },
    ],
    outcomes: [
      "A flat amount comes off the whole cart for members.",
      "Shown as a clear negative fee at checkout.",
      "Targeted to a specific tier (e.g. Gold).",
      "Distinct from per-item member pricing.",
    ],
    bestFor: [
      "High-value tier perks",
      "‘$X off any order’ member benefits",
      "Cart-level loyalty rewards",
    ],
    steps: [
      {
        title: "Create a fixed Discount rule",
        description:
          "In Member Access → Discount, add a rule, set Discount Type = Fixed and the value (e.g. 25).",
        manual: M.commerceBenefit,
      },
      {
        title: "Set Apply To = Per cart",
        description:
          "Choose Per cart so the amount applies once to the order total, and require the member plan as the condition.",
        manual: M.commerceBenefit,
      },
    ],
    notes: [
      "Apply To (Per item / Per cart) only appears for fixed-amount discounts; percentage discounts are per-item.",
      "Per-cart discounts show as a negative fee after totals, offset against any per-item savings to avoid double-discounting.",
      "A per-cart minimum-cart cap requires the provided developer filter.",
    ],
    faq: [
      {
        question: "How does a per-cart discount appear to the customer?",
        answer:
          "As a negative fee line on the cart/checkout (e.g. −$25), applied once to the order rather than per product.",
      },
      {
        question: "Can I use per-cart with a percentage?",
        answer:
          "No — Per cart vs Per item only applies to fixed-amount discounts. Percentage discounts are applied per item.",
      },
    ],
    relatedFeatures: ["member-access", "subscription-products"],
    relatedRecipes: ["member-pricing", "members-only-catalog", "spend-based-vip"],
  },
  {
    slug: "gated-downloads",
    group: "member-restrictions",
    icon: FolderLock,
    name: "Subscription-gated downloads",
    cardDescription:
      "Provision downloadable files to members through My Account — a library that appears only for active plans.",
    tier: "Free",
    seoTitle: "Subscription-Gated File Downloads on WooCommerce",
    metaDescription:
      "Deliver downloadable files to active subscribers via My Account with ArraySubs Download rules, served over signed URLs. Exact settings for a gated file library inside.",
    h1: "Subscription-gated downloads",
    heroSubtitle:
      "Hand members a growing file library — templates, assets, resources — that appears in My Account only while their plan is active.",
    heroHighlights: ["Files in My Account", "Signed-URL delivery", "Appears for active plans"],
    intro:
      "Digital memberships often promise a ==downloadable library==. A ==Download rule== provisions files to subscribers through ==My Account → Downloads==, served via ==signed URLs==, appearing only while the plan is ==active==. Add files anytime and they show up for eligible members. This recipe gates downloads.",
    settings: [
      {
        setting: "Rule tab",
        value: "Member Access → Downloads",
        where: "Member Access",
      },
      {
        setting: "Files",
        value: "Add files (display name + Media Library), reorderable",
        where: "Rule target",
      },
      {
        setting: "IF condition",
        value: "Has Active Subscription (e.g. ‘Pro Plan’)",
        where: "Rule conditions",
      },
      {
        setting: "Delivery",
        value: "Signed URLs (local) / redirects (external)",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Members get files in My Account → Downloads.",
      "Files delivered securely via signed URLs.",
      "Library appears only for active subscriptions.",
      "Coexists with native WooCommerce downloads.",
    ],
    bestFor: [
      "Template / asset libraries",
      "Resource memberships",
      "Gated PDFs, datasets, and media",
    ],
    steps: [
      {
        title: "Create a Download rule",
        description:
          "In Member Access → Downloads, add a rule requiring the plan that unlocks the files.",
        manual: M.commerceBenefit,
      },
      {
        title: "Add your files",
        description:
          "Add each file with a display name from the Media Library; reorder by drag-and-drop. They appear on the member’s My Account → Downloads.",
        manual: M.commerceBenefit,
      },
    ],
    notes: [
      "Local files are served via signed URLs with nonce verification; external (CDN) files are served as redirects.",
      "When a subscription expires, files are immediately removed from the member’s list.",
      "To cap how often files can be downloaded, add usage limits (see the download-limits recipe).",
    ],
    faq: [
      {
        question: "Where do members find their files?",
        answer:
          "On My Account → Downloads, alongside any native WooCommerce downloads — the gated library appears only while their subscription is active.",
      },
      {
        question: "Are the files protected from direct access?",
        answer:
          "Yes. Local files are served through signed URLs with nonce verification; external files are served as redirects.",
      },
    ],
    relatedFeatures: ["member-access", "subscription-products", "customer-portal"],
    relatedRecipes: ["download-usage-limits", "drip-downloads-staged", "restrict-pages-by-plan"],
  },
  {
    slug: "download-usage-limits",
    group: "member-restrictions",
    icon: Gauge,
    name: "Download limits & metering",
    cardDescription:
      "Cap how many times members can download per day, week, month, year, or lifetime — with a progress bar.",
    tier: "Free",
    seoTitle: "Download Limits and Metering on WooCommerce",
    metaDescription:
      "Cap member downloads per period (day/week/month/year/lifetime) with ArraySubs, with usage progress and renewal resets. Exact Download rule limit settings inside.",
    h1: "Download limits & metering",
    heroSubtitle:
      "Protect a file library from abuse — cap downloads per period and show members their usage against the limit.",
    heroHighlights: ["Per-period caps", "Usage progress bar", "Renewal reset option"],
    intro:
      "An unlimited file library invites abuse. ==Download usage tracking== caps how many times members can download over a ==day, week, month, year, or lifetime==, shows ==used/remaining with a progress bar== (and a warning near the cap), and can ==reset on renewal==. This recipe meters downloads.",
    settings: [
      {
        setting: "Rule tab",
        value: "Member Access → Downloads",
        where: "Member Access",
      },
      {
        setting: "Limit period",
        value: "day / week / month / year / lifetime",
        where: "Rule download limit",
      },
      {
        setting: "Reset",
        value: "Automatic at period boundary; optional reset on renewal",
        where: "Rule download limit",
      },
      {
        setting: "Member display",
        value: "Used/remaining + progress bar; warning at 90%",
        where: "My Account → Downloads",
      },
    ],
    outcomes: [
      "Cap downloads per chosen period.",
      "Members see used/remaining with a progress bar.",
      "Warning indicator appears near the limit (90%).",
      "Optionally reset the allowance on renewal.",
    ],
    bestFor: [
      "Stock/asset libraries with fair-use caps",
      "Preventing bulk-download abuse",
      "Quota-based download perks",
    ],
    steps: [
      {
        title: "Open a Download rule",
        description:
          "In Member Access → Downloads, edit (or create) the rule whose files you want to meter.",
        manual: M.commerceBenefit,
      },
      {
        title: "Set the limit and period",
        description:
          "Configure the download limit and its period (day/week/month/year/lifetime), and choose whether it resets on renewal.",
        manual: M.commerceBenefit,
      },
    ],
    notes: [
      "Usage resets automatically when a new period boundary is crossed.",
      "A warning indicator appears at 90% of the allowance.",
      "Renewal reset (optional) refreshes the allowance when a subscription renewal payment completes.",
    ],
    faq: [
      {
        question: "What periods can I limit by?",
        answer:
          "Per day, week, month, year, or lifetime. Usage resets automatically at each period boundary (and optionally on renewal).",
      },
      {
        question: "Do members see how many downloads they have left?",
        answer:
          "Yes. My Account → Downloads shows used/remaining with a progress bar and a warning near the limit.",
      },
    ],
    relatedFeatures: ["member-access", "customer-portal", "feature-manager"],
    relatedRecipes: ["gated-downloads", "drip-downloads-staged", "usage-limits-metering"],
  },
  {
    slug: "role-mapping-by-plan",
    group: "member-restrictions",
    icon: UserCog,
    name: "Map WordPress roles to plans",
    cardDescription:
      "Auto-assign and remove WordPress roles as subscriptions start, pause, and end — so other plugins honor your tiers.",
    tier: "Free",
    seoTitle: "Map WordPress Roles to Subscriptions on WooCommerce",
    metaDescription:
      "Automatically assign and remove WordPress roles based on subscription status with ArraySubs Role Mapping. Exact add/remove, on-hold, and fallback settings inside.",
    h1: "Map WordPress roles to subscription plans",
    heroSubtitle:
      "Make your whole stack tier-aware — assign a role when a plan activates and strip it when it ends, automatically.",
    heroHighlights: ["Auto role on activate", "Strip on cancel", "Fallback role"],
    intro:
      "Roles are the ==shared language of WordPress plugins==. ==Role Mapping== assigns a WordPress role when a subscription is ==active/trial== and removes it when the subscription ==ends== — so forums, LMSs, and other tools ==honor your tiers automatically==. You control ==on-hold behavior== and a ==fallback role==. This recipe maps roles to a plan.",
    settings: [
      {
        setting: "Rule tab",
        value: "Member Access → Role Mapping",
        where: "Member Access",
      },
      {
        setting: "Add Roles / Remove Roles",
        value: "Roles to grant / strip when the rule matches",
        where: "Rule action",
      },
      {
        setting: "On Hold Behavior",
        value: "Keep roles (default) / Remove roles",
        where: "Rule action",
      },
      {
        setting: "Fallback Role",
        value: "Assigned only if the user has no roles left",
        where: "Rule action",
      },
    ],
    outcomes: [
      "Active/trial subscribers get the mapped role automatically.",
      "Roles are stripped when the subscription ends.",
      "Choose whether on-hold members keep their role.",
      "A fallback role prevents role-less accounts.",
    ],
    bestFor: [
      "Integrating forums, LMSs, and role-aware plugins",
      "Tier-based access across the stack",
      "Clean role lifecycle automation",
    ],
    steps: [
      {
        title: "Create a Role Mapping rule",
        description:
          "In Member Access → Role Mapping, add a rule with the condition Has Active Subscription to the plan.",
        manual: M.accessRules,
      },
      {
        title: "Set add/remove roles",
        description:
          "Choose the role(s) to Add when active and any to Remove; set On Hold Behavior and a Fallback Role.",
        manual: M.accessRules,
      },
    ],
    notes: [
      "On cancel/expire, mapped roles are removed only if no other active subscription still grants them; the fallback role applies if the user would be left with none.",
      "Role Mapping rules don’t support content dripping schedules.",
      "Plan switching re-syncs roles — old-plan roles removed, new-plan roles added.",
    ],
    faq: [
      {
        question: "What happens to roles when a subscription is on hold?",
        answer:
          "You decide: On Hold Behavior = Keep roles retains them during a hold, or Remove roles strips them until reactivation.",
      },
      {
        question: "Will other plugins respect these roles?",
        answer:
          "Yes — roles are standard WordPress roles, so any role-aware plugin (forums, LMS, etc.) honors them automatically.",
      },
    ],
    relatedFeatures: ["member-access", "subscription-products"],
    relatedRecipes: ["tiered-roles-platform", "members-only-catalog", "restrict-pages-by-plan"],
  },
  {
    slug: "tiered-roles-platform",
    group: "member-restrictions",
    icon: Layers3,
    name: "Tiered roles (Starter/Pro/Enterprise)",
    cardDescription:
      "Map each plan tier to its own role and strip lower-tier roles on upgrade — clean role hierarchy across tiers.",
    tier: "Free",
    seoTitle: "Tiered Role Mapping for Subscription Plans on WooCommerce",
    metaDescription:
      "Assign Starter/Pro/Enterprise roles per plan and remove lower-tier roles on upgrade with ArraySubs Role Mapping. Exact multi-rule setup inside.",
    h1: "Tiered roles for a platform",
    heroSubtitle:
      "Keep a clean role hierarchy — each tier grants its own role and removes the ones below it, so access always matches the current plan.",
    heroHighlights: ["Role per tier", "Strip lower roles", "Clean hierarchy"],
    intro:
      "Multi-tier platforms need ==one role per tier== that stays consistent through upgrades. With ==per-tier Role Mapping rules==, Starter/Pro/Enterprise each ==add their own role and remove lower-tier roles==, so a customer’s roles always reflect their ==current plan==. This recipe builds tiered roles.",
    settings: [
      {
        setting: "One rule per tier",
        value: "Starter · Pro · Enterprise (separate rules)",
        where: "Member Access → Role Mapping",
      },
      {
        setting: "Each rule",
        value: "Add tier role · Remove lower-tier roles",
        where: "Rule action",
      },
      {
        setting: "On Hold Behavior",
        value: "Keep or Remove per tier",
        where: "Rule action",
      },
      {
        setting: "Fallback Role",
        value: "e.g. a basic ‘customer’ role",
        where: "Rule action",
      },
    ],
    outcomes: [
      "Each tier maps to its own WordPress role.",
      "Upgrading strips lower-tier roles automatically.",
      "Roles always match the active plan.",
      "Downstream tools see the correct tier.",
    ],
    bestFor: [
      "SaaS and learning platforms with tiers",
      "Role-driven feature gating",
      "Clean upgrade/downgrade role hygiene",
    ],
    steps: [
      {
        title: "Create a rule per tier",
        description:
          "In Member Access → Role Mapping, add one rule per plan (Starter, Pro, Enterprise), each conditioned on that plan’s active subscription.",
        manual: M.accessRules,
      },
      {
        title: "Add the tier role, remove lower ones",
        description:
          "On each rule, Add the tier’s role and Remove the lower-tier roles; set On Hold Behavior and a Fallback Role.",
        manual: M.accessRules,
      },
    ],
    notes: [
      "Plan switching re-syncs roles automatically, so an upgrade/downgrade lands on the right role set.",
      "If multiple rules grant the same role, it persists until all granting subscriptions end.",
      "Role Mapping has no dripping schedule — roles apply immediately on status change.",
    ],
    faq: [
      {
        question: "What happens to roles when a customer upgrades?",
        answer:
          "The new tier’s rule adds its role and removes lower-tier roles, and plan switching re-syncs everything — so roles always match the current plan.",
      },
      {
        question: "Can a user end up with no role?",
        answer:
          "Set a Fallback Role; it’s assigned only when a user would otherwise be left with no roles after removals.",
      },
    ],
    relatedFeatures: ["member-access", "subscription-products", "feature-manager"],
    relatedRecipes: ["role-mapping-by-plan", "tiered-bronze-silver-gold", "feature-gated-content"],
  },
  {
    slug: "drip-course-content",
    group: "member-restrictions",
    icon: Droplets,
    name: "Drip course content weekly",
    cardDescription:
      "Release gated modules on a schedule — week 1 now, week 2 after 7 days — measured from each member’s start date.",
    tier: "Free",
    seoTitle: "Drip Course Content on a Schedule (WooCommerce)",
    metaDescription:
      "Release gated content over time with ArraySubs content dripping — by days, weeks, or months since each member’s subscription start. Exact schedule settings inside.",
    h1: "Drip course content over time",
    heroSubtitle:
      "Pace your curriculum — unlock each module a set time after a member joins, so everyone gets the same journey regardless of when they start.",
    heroHighlights: ["Days/weeks/months delay", "From each member’s start", "Fair for late joiners"],
    intro:
      "Dripping ==paces a course== so learners can’t binge ahead and late joiners get the ==same experience==. Add a ==Schedule== to a content rule: each module unlocks a ==delay (days/weeks/months) after the member’s subscription start==. This recipe drips weekly modules.",
    settings: [
      {
        setting: "Schedule on the rule",
        value: "Enabled (on Post Type / Download / URL rules)",
        where: "Member Access rule → Schedule",
      },
      {
        setting: "Delay value + unit",
        value: "e.g. 7 Days, 14 Days, … (per module rule)",
        where: "Rule schedule",
      },
      {
        setting: "Anchor",
        value: "Days since the member’s subscription start date",
        where: "Behaviour",
      },
      {
        setting: "Typical setup",
        value: "One rule per module/week, increasing delays",
        where: "Pattern",
      },
    ],
    outcomes: [
      "Modules unlock on a schedule, not all at once.",
      "Timed from each member’s own start date.",
      "Late joiners get the same paced journey.",
      "No code — just a delay on each content rule.",
    ],
    bestFor: [
      "Online courses and cohorts",
      "Onboarding sequences",
      "Phased content releases",
    ],
    steps: [
      {
        title: "Gate each module",
        description:
          "Create a Post Type rule per module (e.g. one per week’s category), each requiring the course subscription.",
        manual: M.contentRestriction,
      },
      {
        title: "Add an increasing delay",
        description:
          "On each rule’s Schedule, set the delay (Module 1 = 0, Module 2 = 7 Days, Module 3 = 14 Days, …) measured from subscription start.",
        manual: M.contentRestriction,
      },
    ],
    notes: [
      "Dripping is relative to the member’s earliest qualifying subscription start date — there’s no fixed-calendar-date option.",
      "Month delays use a fixed 30-day month in the math.",
      "Schedules work on URL, Post Type, Download, Ecommerce, and Discount rules — not Role Mapping or Login Limit.",
    ],
    faq: [
      {
        question: "Is dripping by date or by days-since-join?",
        answer:
          "By days/weeks/months since the member’s subscription start — so everyone progresses on the same cadence regardless of when they joined.",
      },
      {
        question: "Can I drip downloads too?",
        answer:
          "Yes. Schedules apply to Download rules as well — see the staged-downloads recipe.",
      },
    ],
    relatedFeatures: ["member-access", "subscription-products"],
    relatedRecipes: ["drip-downloads-staged", "paywall-by-category", "restrict-pages-by-plan"],
  },
  {
    slug: "drip-downloads-staged",
    group: "member-restrictions",
    icon: CalendarClock,
    name: "Stage downloads over time",
    cardDescription:
      "Release downloadable modules in stages — file set 1 immediately, set 2 after 14 days, set 3 after 28.",
    tier: "Free",
    seoTitle: "Drip / Stage Downloads Over Time on WooCommerce",
    metaDescription:
      "Release downloadable files in timed stages with ArraySubs Download rules plus scheduling — measured from subscription start. Exact staged-download setup inside.",
    h1: "Stage downloads over time",
    heroSubtitle:
      "Don’t hand over everything on day one — release downloadable modules in waves, timed from each member’s start.",
    heroHighlights: ["Staged file releases", "Timed from start", "Per-stage rules"],
    intro:
      "For training programs and toolkits, ==staging downloads== keeps members engaged and prevents day-one dumps. Combine ==Download rules== with a ==Schedule==: stage 1 unlocks immediately, stage 2 after 14 days, stage 3 after 28 — all measured from ==subscription start==. This recipe stages downloads.",
    settings: [
      {
        setting: "Rules",
        value: "One Download rule per stage",
        where: "Member Access → Downloads",
      },
      {
        setting: "Schedule per stage",
        value: "Stage 1 = 0, Stage 2 = 14 Days, Stage 3 = 28 Days",
        where: "Rule schedule",
      },
      {
        setting: "Condition",
        value: "Has Active Subscription (the program plan)",
        where: "Rule conditions",
      },
      {
        setting: "Anchor",
        value: "Days since subscription start",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Files unlock in timed waves, not all at once.",
      "Each stage opens a set delay after joining.",
      "Keeps a program paced and engaging.",
      "Reuses the gated-downloads delivery (signed URLs).",
    ],
    bestFor: [
      "Training programs and toolkits",
      "Phased resource delivery",
      "Preventing day-one content dumps",
    ],
    steps: [
      {
        title: "Create a Download rule per stage",
        description:
          "In Member Access → Downloads, add a rule per stage with that stage’s files, all requiring the program subscription.",
        manual: M.commerceBenefit,
      },
      {
        title: "Set staged delays",
        description:
          "On each rule’s Schedule, set increasing delays (0, 14 Days, 28 Days, …) measured from subscription start.",
        manual: M.contentRestriction,
      },
    ],
    notes: [
      "Dripping is relative to subscription start (days/weeks/months), not a fixed date.",
      "Combine with download usage limits to also cap how often staged files can be pulled.",
      "Files appear in My Account → Downloads as each stage opens.",
    ],
    faq: [
      {
        question: "Can different files unlock at different times?",
        answer:
          "Yes. Use a separate Download rule per stage, each with its own schedule delay measured from the member’s start date.",
      },
      {
        question: "Do staged downloads still use secure delivery?",
        answer:
          "Yes — like all gated downloads, local files use signed URLs and external files are served as redirects.",
      },
    ],
    relatedFeatures: ["member-access", "customer-portal", "subscription-products"],
    relatedRecipes: ["gated-downloads", "download-usage-limits", "drip-course-content"],
  },
  {
    slug: "spend-based-vip",
    group: "member-restrictions",
    icon: Star,
    name: "VIP access by lifetime spend",
    cardDescription:
      "Unlock content or perks once a customer’s total spend crosses a threshold — e.g. VIP area at $500 lifetime.",
    tier: "Free",
    seoTitle: "Unlock Content by Lifetime Spend on WooCommerce",
    metaDescription:
      "Gate content and perks by a customer’s lifetime purchase amount with ArraySubs access conditions. Exact operator settings for a spend-based VIP tier inside.",
    h1: "VIP access by lifetime spend",
    heroSubtitle:
      "Reward your biggest customers automatically — unlock a VIP area or perk once total spend crosses your threshold.",
    heroHighlights: ["Lifetime-spend condition", "Auto VIP unlock", "No manual tagging"],
    intro:
      "Your ==best customers== deserve automatic perks. The ==Lifetime Purchase Amount== condition gates content or pricing once a customer’s ==total spend crosses a threshold== (with operators like ≥), so a ==VIP area unlocks at $500== without manual tagging. This recipe builds spend-based VIP access.",
    settings: [
      {
        setting: "IF condition",
        value: "Lifetime Purchase Amount ≥ 500",
        where: "Any Member Access rule",
      },
      {
        setting: "Operators",
        value: "≥, >, =, <, ≤",
        where: "Condition",
      },
      {
        setting: "Apply on",
        value: "Post Type / URL / Discount / Ecommerce / Download rule",
        where: "Member Access",
      },
      {
        setting: "Combine with",
        value: "AND/OR other conditions (plan, role)",
        where: "Condition logic",
      },
    ],
    outcomes: [
      "VIP content/perks unlock at a spend threshold.",
      "No manual tagging — based on real lifetime spend.",
      "Use any operator (≥, >, =, <, ≤).",
      "Combine with plan or role conditions.",
    ],
    bestFor: [
      "VIP tiers and loyalty perks",
      "High-spender rewards",
      "Spend-gated content or pricing",
    ],
    steps: [
      {
        title: "Create the rule you want to gate",
        description:
          "Pick the rule type (e.g. a Post Type rule for a VIP page, or a Discount rule for VIP pricing).",
        manual: M.accessRules,
      },
      {
        title: "Add the lifetime-spend condition",
        description:
          "Add the Lifetime Purchase Amount condition with an operator and threshold (e.g. ≥ $500).",
        manual: M.accessRules,
      },
    ],
    notes: [
      "Lifetime Purchase Amount reflects the customer’s total spend across all orders, not just subscriptions.",
      "Combine with a plan or role condition using AND/OR for layered VIP rules.",
      "Only logged-in users are evaluated for spend-based gating.",
    ],
    faq: [
      {
        question: "Does spend include one-time purchases?",
        answer:
          "Yes. The Lifetime Purchase Amount condition uses the customer’s total spend across all orders, not only subscription payments.",
      },
      {
        question: "Can I combine spend with a plan requirement?",
        answer:
          "Yes. Use AND/OR logic — e.g. ‘Enterprise plan OR lifetime spend ≥ $5,000’ — to build flexible VIP rules.",
      },
    ],
    relatedFeatures: ["member-access", "subscription-products", "store-credit"],
    relatedRecipes: ["combined-conditions", "purchase-history-gate", "member-pricing"],
  },
  {
    slug: "purchase-history-gate",
    group: "member-restrictions",
    icon: Receipt,
    name: "Gate by past purchase (no subscription)",
    cardDescription:
      "Unlock content for anyone who bought a specific product — even without a subscription.",
    tier: "Free",
    seoTitle: "Gate Content by Past Purchase on WooCommerce",
    metaDescription:
      "Restrict content to customers who purchased a specific product (subscription not required) with ArraySubs purchase-history conditions. Exact settings inside.",
    h1: "Gate by past purchase",
    heroSubtitle:
      "Reward buyers, not just subscribers — unlock content for anyone who purchased a specific product, ever.",
    heroHighlights: ["Purchased-product condition", "No subscription needed", "Buyer-only content"],
    intro:
      "Not all gated content needs a ==subscription==. The ==Purchased Product== condition unlocks content for ==anyone who bought a specific product== (any order) — bonus material for a course buyer, resources for a product owner. This recipe gates by purchase history.",
    settings: [
      {
        setting: "IF condition",
        value: "Purchased Product (specific product/variation)",
        where: "Any Member Access rule",
      },
      {
        setting: "Related conditions",
        value: "Purchased Variation · Purchased from Category/Tag",
        where: "Condition",
      },
      {
        setting: "Apply on",
        value: "Post Type / URL / Download rule",
        where: "Member Access",
      },
      {
        setting: "Archive Behavior",
        value: "Hide (keep buyer-only content out of listings)",
        where: "Rule action",
      },
    ],
    outcomes: [
      "Buyers of a product unlock the gated content.",
      "No subscription required.",
      "Also gate by variation or by category/tag purchase.",
      "Great for post-purchase bonus material.",
    ],
    bestFor: [
      "Bonus content for product buyers",
      "One-time-purchase resource unlocks",
      "Course or kit owner perks",
    ],
    steps: [
      {
        title: "Create the content rule",
        description:
          "Add a Post Type (or URL/Download) rule targeting the buyer-only content.",
        manual: M.accessRules,
      },
      {
        title: "Add the Purchased Product condition",
        description:
          "Set the condition to Purchased Product and choose the product (or use Purchased Variation / from Category/Tag).",
        manual: M.accessRules,
      },
    ],
    notes: [
      "Purchase-history conditions check any completed order — a subscription is not required.",
      "Combine with a subscription condition via OR to grant access to buyers OR subscribers.",
      "Use Hide archive behavior to keep buyer-only posts out of public listings.",
    ],
    faq: [
      {
        question: "Does the customer need an active subscription?",
        answer:
          "No. The Purchased Product condition only requires that they bought the product in any completed order.",
      },
      {
        question: "Can I grant access to buyers OR subscribers?",
        answer:
          "Yes. Combine a Purchased Product condition and a Has Active Subscription condition with OR logic.",
      },
    ],
    relatedFeatures: ["member-access", "subscription-products"],
    relatedRecipes: ["combined-conditions", "spend-based-vip", "gate-specific-pages"],
  },
  {
    slug: "combined-conditions",
    group: "member-restrictions",
    icon: GitBranch,
    name: "Combine conditions (AND/OR)",
    cardDescription:
      "Build nuanced access from multiple conditions — e.g. ‘Enterprise plan OR lifetime spend ≥ $5,000’.",
    tier: "Free",
    seoTitle: "Combine Access Conditions With AND/OR on WooCommerce",
    metaDescription:
      "Build complex access rules with AND/OR logic and nested condition groups in ArraySubs Member Access — plan, role, spend, and purchase combined. Exact setup inside.",
    h1: "Combine conditions with AND/OR logic",
    heroSubtitle:
      "Real access rules aren’t one-dimensional — combine plan, role, spend, and purchase conditions with AND/OR and nested groups.",
    heroHighlights: ["AND / OR logic", "Nested groups", "Layered access"],
    intro:
      "Sophisticated access needs ==more than one condition==. ArraySubs rules combine conditions with ==AND/OR== and ==nested groups== — e.g. ‘Has Active Subscription to Product A ==AND== (Lifetime Spend ≥ $500 ==OR== Role is VIP)’. This recipe builds layered, combined-condition access.",
    settings: [
      {
        setting: "Top-level logic",
        value: "AND (all match) / OR (any match)",
        where: "Rule conditions",
      },
      {
        setting: "Condition groups",
        value: "Nested groups, each with their own AND/OR",
        where: "Rule conditions",
      },
      {
        setting: "Available conditions",
        value: "Subscription · Variation · Purchase · Category · Spend · Role · Feature (Pro)",
        where: "Rule conditions",
      },
      {
        setting: "Example",
        value: "Enterprise sub OR lifetime spend ≥ $5,000",
        where: "Pattern",
      },
    ],
    outcomes: [
      "Mix multiple conditions in one rule.",
      "Use AND/OR and nested groups for precision.",
      "Grant access from several qualifying paths.",
      "Model real-world tier logic.",
    ],
    bestFor: [
      "Multi-tier content with several access paths",
      "‘Plan OR spend OR role’ unlocks",
      "Precise enterprise gating",
    ],
    steps: [
      {
        title: "Add multiple conditions",
        description:
          "On any rule, add the conditions you need (plan, role, spend, purchase, feature) and set the top-level AND/OR.",
        manual: M.accessRules,
      },
      {
        title: "Nest groups for complex logic",
        description:
          "Create condition groups (each with their own AND/OR) to express logic like ‘A AND (B OR C)’.",
        manual: M.accessRules,
      },
    ],
    notes: [
      "Rules are evaluated in order; for most rule types the first matching rule wins (for discounts, the best price wins).",
      "Feature Value conditions require Pro and Feature Manager.",
      "Keep rules readable — name them clearly since names aren’t shown to customers.",
    ],
    faq: [
      {
        question: "Can I express ‘A AND (B OR C)’?",
        answer:
          "Yes. Use a nested condition group: top-level AND with condition A, plus a group containing B OR C.",
      },
      {
        question: "Which conditions can I combine?",
        answer:
          "Subscription, subscription variation, purchased product/variation, purchased from category/tag, lifetime spend, user role, and (Pro) feature value.",
      },
    ],
    relatedFeatures: ["member-access", "subscription-products", "feature-manager"],
    relatedRecipes: ["spend-based-vip", "purchase-history-gate", "feature-gated-content"],
  },
  {
    slug: "feature-gated-content",
    group: "member-restrictions",
    icon: KeyRound,
    name: "Gate by Feature Manager entitlement",
    cardDescription:
      "Unlock content based on a Feature Manager value — e.g. show team-admin docs only when team seats ≥ 10.",
    tier: "Pro",
    seoTitle: "Gate Content by Feature Entitlement on WooCommerce (Pro)",
    metaDescription:
      "Restrict content by a Feature Manager entitlement value with ArraySubs Pro — operators and aggregation across subscriptions. Exact Feature Value condition settings inside.",
    h1: "Gate content by feature entitlement",
    heroSubtitle:
      "Tie content to entitlements, not just plans — reveal advanced docs only when a member’s feature value meets a threshold.",
    heroHighlights: ["Feature Value condition", "Operators + aggregation", "Pro"],
    intro:
      "When access should track an ==entitlement== rather than a plan name, the ==Feature Value== condition (Pro) gates content by a ==Feature Manager value== — e.g. show team-admin docs only when ==team seats ≥ 10==, with operators and ==sum/max/any aggregation== across the member’s subscriptions. This recipe gates by feature.",
    settings: [
      {
        setting: "IF condition",
        value: "Feature Value (e.g. team_seats ≥ 10)",
        where: "Member Access rule (Pro)",
      },
      {
        setting: "Aggregation",
        value: "sum / max / any (across subscriptions)",
        where: "Condition",
      },
      {
        setting: "Operators",
        value: "≥, >, =, <, ≤",
        where: "Condition",
      },
      {
        setting: "Requires",
        value: "Pro + Feature Manager features defined",
        where: "Setup",
      },
    ],
    outcomes: [
      "Content unlocks based on an entitlement value.",
      "Aggregate feature values across subscriptions.",
      "Use any comparison operator.",
      "Access tracks entitlements, not plan labels.",
    ],
    bestFor: [
      "SaaS entitlement-based access",
      "Seat- or quota-driven content",
      "Feature-tied documentation",
    ],
    steps: [
      {
        title: "Define the feature",
        description:
          "Set up the feature in Feature Manager (e.g. a Number feature ‘team_seats’) on the relevant plans.",
        manual: M.accessRules,
      },
      {
        title: "Gate content by Feature Value",
        description:
          "On a content rule, add the Feature Value condition with the key, operator, threshold, and aggregation (sum/max/any).",
        manual: M.contentRestriction,
      },
    ],
    notes: [
      "Feature Value conditions require Pro and Feature Manager features defined on products.",
      "The same condition is available in the [arraysubs_restrict] shortcode for inline gating.",
      "Aggregation controls how values combine across multiple active subscriptions.",
    ],
    faq: [
      {
        question: "How does aggregation work?",
        answer:
          "Choose sum (add values across subscriptions), max (highest single value), or any (has the feature at all) when a member holds multiple subscriptions.",
      },
      {
        question: "Can I use this inline in a page?",
        answer:
          "Yes. The [arraysubs_restrict] shortcode supports feature, feature_min, feature_op, and aggregation attributes for inline feature gating.",
      },
    ],
    relatedFeatures: ["feature-manager", "member-access", "subscription-products"],
    relatedRecipes: ["combined-conditions", "inline-content-gating", "usage-limits-metering"],
  },
  {
    slug: "inline-content-gating",
    group: "member-restrictions",
    icon: Code,
    name: "Inline content gating (shortcode)",
    cardDescription:
      "Wrap just part of a page with [arraysubs_restrict] — public intro, gated premium section, all on one page.",
    tier: "Free",
    seoTitle: "Inline Content Gating With Shortcodes on WooCommerce",
    metaDescription:
      "Gate part of a page with the [arraysubs_restrict] shortcode — by status, product, role, spend, or feature — with a custom message or redirect. Exact attributes inside.",
    h1: "Inline content gating with shortcodes",
    heroSubtitle:
      "Gate a section, not a whole page — keep the intro public and lock just the premium block with a shortcode.",
    heroHighlights: ["Wrap any block", "Conditions inline", "Public + gated on one page"],
    intro:
      "Sometimes you want a ==public intro and a gated section on the same page==. The ==[arraysubs_restrict]== shortcode wraps ==just the premium block==, gating it by ==status, product, role, lifetime spend, or feature==, with a ==custom message or redirect== for non-members. This recipe gates inline content.",
    settings: [
      {
        setting: "Shortcode",
        value: "[arraysubs_restrict] … [/arraysubs_restrict]",
        where: "Any page/post/widget",
      },
      {
        setting: "Key attributes",
        value: "status · products · roles · lifetime_spent · feature (Pro)",
        where: "Shortcode",
      },
      {
        setting: "Logic + fallback",
        value: "condition=and|or · message · redirect · login_required",
        where: "Shortcode",
      },
      {
        setting: "Admin bypass",
        value: "show_to_admins (default true)",
        where: "Shortcode",
      },
    ],
    outcomes: [
      "Gate a single section, leaving the rest public.",
      "Combine conditions inline (AND/OR).",
      "Show a custom message or redirect non-members.",
      "Restricted content is omitted from page source entirely.",
    ],
    bestFor: [
      "Teaser + premium on one page",
      "Sales pages with member-only blocks",
      "Granular, in-content gating",
    ],
    steps: [
      {
        title: "Wrap the premium block",
        description:
          "In the editor, wrap the gated content in [arraysubs_restrict status=\"active\"] … [/arraysubs_restrict].",
        manual: M.contentGating,
      },
      {
        title: "Tune conditions and fallback",
        description:
          "Add attributes (products, roles, lifetime_spent, feature) and set condition (and/or), plus a message or redirect for non-members.",
        manual: M.contentGating,
      },
    ],
    notes: [
      "Restricted content is omitted from the page source entirely (not just CSS-hidden).",
      "If both message and redirect are set, redirect wins on the frontend.",
      "Feature attributes require Pro + Feature Manager; admins see content by default (show_to_admins).",
    ],
    faq: [
      {
        question: "Can I gate by more than subscription status?",
        answer:
          "Yes. The shortcode supports products, variations, purchased, lifetime_spent, roles, and (Pro) feature conditions, combined with and/or.",
      },
      {
        question: "Is the hidden content truly protected?",
        answer:
          "Yes. Restricted content is omitted from the rendered page source entirely, not hidden with CSS.",
      },
    ],
    relatedFeatures: ["shortcodes", "member-access", "feature-manager"],
    relatedRecipes: ["restrict-elementor-section", "login-personalization", "feature-gated-content"],
  },
  {
    slug: "restrict-elementor-section",
    group: "member-restrictions",
    icon: LayoutGrid,
    name: "Gate an Elementor section",
    cardDescription:
      "Lock any Elementor Container (Flexbox or Grid) to members from the builder — no shortcode to type.",
    tier: "Free",
    seoTitle: "Restrict an Elementor Section to Members (WooCommerce)",
    metaDescription:
      "Gate any Elementor Container to subscribers from the Advanced tab — by status, product, role, spend, or feature — with no shortcode. Exact controls inside.",
    h1: "Gate an Elementor section to members",
    heroSubtitle:
      "Lock a Container from the Elementor panel — keep the rest of the page public and gate just the section that matters.",
    heroHighlights: ["Container controls", "No shortcode", "Flexbox + Grid"],
    intro:
      "If you build with Elementor, gate ==any Container== from the builder itself. The ==ArraySubs Content Restrictions== section on the Container's ==Advanced tab== locks everything inside it by ==status, product, variation, purchase, role, lifetime spend, or feature (Pro)== — the same engine as the [arraysubs_restrict] shortcode, with ==no shortcode to type==. This recipe gates an Elementor section.",
    settings: [
      {
        setting: "Where",
        value: "Select Container → Advanced → ArraySubs Content Restrictions",
        where: "Elementor editor",
      },
      {
        setting: "Enable Restriction + Restriction Type",
        value: "Yes · Subscription / Role / Purchase (restrict) or Login state (visibility)",
        where: "Container controls",
      },
      {
        setting: "Conditions",
        value: "Subscription Status · Products · Variations · Purchased · Roles · Minimum Lifetime Spend · Plan Feature (Pro)",
        where: "Container controls",
      },
      {
        setting: "Logic + fallback",
        value: "Match Logic AND/OR · Restricted Message · Require Login · Always Show To Admins",
        where: "Container controls",
      },
    ],
    outcomes: [
      "Gate a single Container, leaving the rest of the page public.",
      "Searchable product, variation, and feature pickers — no IDs to look up.",
      "Show a custom restricted message to non-members.",
      "Restricted content is omitted from the page source entirely.",
    ],
    bestFor: [
      "Elementor-built sales and lesson pages",
      "Member-only blocks (videos, downloads, pricing)",
      "Teams who prefer the builder over shortcodes",
    ],
    steps: [
      {
        title: "Open the Container's restriction controls",
        description:
          "Select the Container (Flexbox or Grid), open the Advanced tab, and expand ArraySubs Content Restrictions. Turn Enable Restriction to Yes.",
        manual: M.elementorRestrictions,
      },
      {
        title: "Pick a type and set conditions",
        description:
          "Choose Subscription / Role / Purchase (restrict) and set conditions (status, products, roles, spend, or a Pro feature), or choose Login state (visibility). Add a Restricted Message and tune Require Login / Always Show To Admins.",
        manual: M.elementorRestrictions,
      },
    ],
    notes: [
      "The controls live on the Container element only — wrap a single widget in its own Container to gate it.",
      "Restriction never applies inside the Elementor editor/preview; test on the live page.",
      "Enabling restriction with no conditions leaves the container unrestricted (it won't block logged-out visitors).",
      "There is no redirect option here (a partial section can't safely redirect the whole page) — use the Restricted Message, or Member Access page/URL rules for full-page redirects.",
      "Feature conditions require Pro + Feature Manager; admins see content by default (Always Show To Admins).",
    ],
    faq: [
      {
        question: "Do I need to write shortcodes?",
        answer:
          "No. The Container controls produce the same result as [arraysubs_restrict] / [arraysubs_visibility], configured entirely from Elementor's panel.",
      },
      {
        question: "Does it work on the Grid container?",
        answer:
          "Yes. Both the Flexbox and Grid layout presets of the Elementor Container element are supported.",
      },
      {
        question: "Can I keep part of the page public?",
        answer:
          "Yes. Enable restriction only on the Container that holds the members-only content; everything in other containers stays public.",
      },
    ],
    relatedFeatures: ["member-access", "shortcodes", "feature-manager"],
    relatedRecipes: ["inline-content-gating", "feature-gated-content", "restrict-pages-by-plan"],
  },
  {
    slug: "login-personalization",
    group: "member-restrictions",
    icon: Sparkles,
    name: "Login-state personalization",
    cardDescription:
      "Show different content to logged-in vs logged-out visitors and greet members by name with account shortcodes.",
    tier: "Free",
    seoTitle: "Personalize by Login State With Shortcodes (WooCommerce)",
    metaDescription:
      "Swap content for logged-in vs logged-out visitors and greet members by name using ArraySubs [arraysubs_visibility], [arraysubs_login], and [arraysubs_user]. Exact usage inside.",
    h1: "Personalize by login state",
    heroSubtitle:
      "Greet members and prompt guests — show the right content and a personal touch based on whether someone is signed in.",
    heroHighlights: ["Logged-in vs out", "Greet by name", "Login/logout links"],
    intro:
      "Small personalization lifts conversion. ==[arraysubs_visibility]== shows or hides content by ==login state==, ==[arraysubs_user]== greets members ==by name== (with a fallback for guests), and ==[arraysubs_login]/[arraysubs_logout]== render the right link. This recipe personalizes headers, CTAs, and widgets.",
    settings: [
      {
        setting: "[arraysubs_visibility]",
        value: "show=\"logged_in\" | \"logged_out\" + fallback",
        where: "Any page/widget",
      },
      {
        setting: "[arraysubs_user]",
        value: "field=\"first_name\" fallback=\"Welcome, visitor!\"",
        where: "Any page/widget",
      },
      {
        setting: "[arraysubs_login] / [arraysubs_logout]",
        value: "text, url, redirect attributes",
        where: "Any page/widget",
      },
      {
        setting: "Note",
        value: "Visibility checks login state only (not subscription)",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Show guests a login CTA and members a greeting.",
      "Greet members by name with a guest fallback.",
      "Render correct login/logout links automatically.",
      "Personalize headers, landing pages, and widgets.",
    ],
    bestFor: [
      "Personalized headers and nav",
      "Landing-page CTAs by login state",
      "Sidebar welcome widgets",
    ],
    steps: [
      {
        title: "Swap content by login state",
        description:
          "Wrap guest content in [arraysubs_visibility show=\"logged_out\"] and member content in [arraysubs_visibility show=\"logged_in\"], using fallbacks as needed.",
        manual: M.accountShortcodes,
      },
      {
        title: "Add a greeting and links",
        description:
          "Use [arraysubs_user field=\"first_name\" fallback=\"there\"] for a greeting and [arraysubs_login]/[arraysubs_logout] for the right link.",
        manual: M.accountShortcodes,
      },
    ],
    notes: [
      "[arraysubs_visibility] checks login state only — for subscription/role gating use [arraysubs_restrict].",
      "[arraysubs_user] output is plain text and HTML-escaped; fields include display_name, username, first_name, last_name, full_name.",
      "Login/logout links hide themselves automatically based on the current login state.",
    ],
    faq: [
      {
        question: "Does visibility check subscriptions?",
        answer:
          "No. [arraysubs_visibility] only checks logged-in vs logged-out. To gate by subscription, role, spend, or feature, use [arraysubs_restrict].",
      },
      {
        question: "Can I greet members by first name?",
        answer:
          "Yes. [arraysubs_user field=\"first_name\" fallback=\"there\"] shows the member’s first name, or your fallback for guests.",
      },
    ],
    relatedFeatures: ["shortcodes", "profile-builder", "customer-portal"],
    relatedRecipes: ["inline-content-gating", "brand-login-myaccount", "restrict-pages-by-plan"],
  },
  {
    slug: "session-limit-per-tier",
    group: "member-restrictions",
    icon: MonitorPlay,
    name: "Per-tier session limits",
    cardDescription:
      "Give each plan its own concurrent-device limit — Basic 1 screen, Standard 3, Premium 5 — streaming-style.",
    tier: "Pro",
    seoTitle: "Per-Tier Concurrent Session Limits on WooCommerce (Pro)",
    metaDescription:
      "Set different concurrent-device limits per subscription tier with ArraySubs Pro Login Limit rules — e.g. Basic 1, Standard 3, Premium 5. Exact rule settings inside.",
    h1: "Per-tier session limits (streaming-style)",
    heroSubtitle:
      "Sell screens like the streaming services — each plan gets its own number of simultaneous logins, enforced automatically.",
    heroHighlights: ["Limit by plan", "Basic 1 / Standard 3 / Premium 5", "Highest match wins"],
    intro:
      "Streaming taught everyone that ==‘number of screens’ is a sellable feature==. ==Login Limit rules== (Pro) cap ==concurrent sessions per plan== — Basic 1, Standard 3, Premium 5 — and when a member exceeds it, the ==oldest session drops==. Unlike the global cap, these are ==per-tier==. (For the store-wide anti-sharing cap, see the Manage-subscriptions ‘limit concurrent logins’ recipe.) This recipe sets per-tier seats.",
    settings: [
      {
        setting: "Prerequisite",
        value: "Multi-Login Prevention enabled (Settings → Toolkit, Pro)",
        where: "Toolkit",
      },
      {
        setting: "Rule tab",
        value: "Member Access → Login Limit",
        where: "Member Access (Pro)",
      },
      {
        setting: "Per-tier rules",
        value: "Basic = 1 · Standard = 3 · Premium = 5 (Max Allowed Sessions)",
        where: "Login Limit rules",
      },
      {
        setting: "Resolution",
        value: "When multiple rules match, the highest limit wins",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Each tier gets its own simultaneous-device allowance.",
      "Exceeding the limit logs out the oldest session.",
      "Higher tiers sell more ‘screens’.",
      "Falls back to the global default when no rule matches.",
    ],
    bestFor: [
      "Streaming and media memberships",
      "Per-seat content products",
      "‘More screens’ as an upsell",
    ],
    steps: [
      {
        title: "Enable Multi-Login Prevention",
        description:
          "Turn on Multi-Login Prevention in Settings → Toolkit (Pro) — the Login Limit tab appears only when it’s enabled.",
        manual: M.sessionControls,
      },
      {
        title: "Add a Login Limit rule per tier",
        description:
          "In Member Access → Login Limit, add a rule per plan with its Max Allowed Sessions (e.g. Basic 1, Standard 3, Premium 5).",
        manual: M.sessionControls,
      },
    ],
    notes: [
      "When several rules match a user, the highest Max Allowed Sessions applies (most permissive).",
      "Per-tier Login Limit rules override the global default set in Toolkit.",
      "Login-as-User impersonation sessions never count toward the limit.",
    ],
    faq: [
      {
        question: "How is this different from the global login cap?",
        answer:
          "The global cap (Toolkit) applies one limit to everyone; Login Limit rules set different limits per plan/tier. When both apply, the highest matching limit wins.",
      },
      {
        question: "What happens when a member opens too many sessions?",
        answer:
          "The newest login succeeds and the oldest session is logged out automatically, keeping the member within their tier’s allowance.",
      },
    ],
    relatedFeatures: ["multi-login-prevention", "member-access", "subscription-products"],
    relatedRecipes: ["limit-concurrent-logins", "tiered-roles-platform", "feature-gated-content"],
  },

  // ============================================================
  // GROUP 6 — Membership modules (member experience)
  // ============================================================
  {
    slug: "member-360-profile",
    group: "membership-modules",
    icon: UserSearch,
    name: "Member 360° profile dashboard",
    cardDescription:
      "Pull up any member’s full picture — spend, orders, subscriptions, credit, and addresses — on one Manage Members screen.",
    tier: "Pro",
    seoTitle: "Member 360 Profile Dashboard on WooCommerce (Pro)",
    metaDescription:
      "See every member’s spend, orders, subscriptions, store credit, and addresses on one ArraySubs Pro Manage Members dashboard, with login-as-customer and quick links. Details inside.",
    h1: "A 360° view of every member",
    heroSubtitle:
      "Stop hopping between screens — search a member and see lifetime spend, orders, subscriptions, credit, and addresses in one dashboard.",
    heroHighlights: ["Lifetime spend & orders", "All subscriptions & credit", "Login as customer"],
    intro:
      "Running a membership means ==answering ‘who is this member and what do they have?’== constantly. ==Member Insight (Pro)== adds a ==Manage Members== dashboard: search by name/email, then see a ==stats grid (total spent, orders, active & total subscriptions, store credit, refunds)==, every subscription, non-subscription purchases, and addresses — plus ==Login as Customer== and quick links to orders, credit, and features. This recipe sets up the 360° profile.",
    settings: [
      {
        setting: "Where",
        value: "ArraySubs → Manage Members (Pro)",
        where: "Admin",
      },
      {
        setting: "Find a Member",
        value: "Search name / username / email (2+ chars)",
        where: "Manage Members",
      },
      {
        setting: "Stats grid",
        value: "Total Spent · Orders · Active/Total Subs · Store Credit · Refunds",
        where: "Member profile",
      },
      {
        setting: "Actions",
        value: "Login as Customer · Edit User · View Orders / Manage Credit / Show Features",
        where: "Member profile",
      },
    ],
    outcomes: [
      "One screen shows a member’s full commerce picture.",
      "See every subscription and non-subscription purchase.",
      "Jump to orders, store credit, or feature entitlements.",
      "Open the member’s session with Login as Customer.",
    ],
    bestFor: [
      "Support resolving member questions fast",
      "Membership operators needing member context",
      "Finance reviewing spend, credit, and refunds",
    ],
    steps: [
      {
        title: "Open Manage Members",
        description:
          "Go to ArraySubs → Manage Members (Pro). You can also reach a profile from a subscription, order, or user screen via the Member Details shortcuts.",
        manual: M.memberInsight,
      },
      {
        title: "Search and open a member",
        description:
          "Type a name, username, or email (2+ chars) and pick a result to load the full profile dashboard.",
        manual: M.memberLookup,
      },
      {
        title: "Act from the profile",
        description:
          "Use Login as Customer, Edit User, or the quick links (View Orders, Manage Store Credit, Show Features) to take the next step.",
        manual: M.memberOps,
      },
    ],
    notes: [
      "Member Insight is a Pro module — deactivating Pro removes Manage Members and the Member Details shortcuts.",
      "The profile is read-context: edit subscriptions on the subscription screen, credit on the Store Credit page, and details via Edit User.",
      "Store Credit and Feature stats require those Pro features enabled.",
    ],
    faq: [
      {
        question: "Where can I open a member profile from?",
        answer:
          "From Manage Members search, a subscription’s customer link, a WooCommerce order, the WordPress user screen, or the Analytics customers report — all jump to the same dashboard.",
      },
      {
        question: "Can I edit the member here?",
        answer:
          "It’s a context dashboard — use Login as Customer, Edit User, the subscription detail screen, or the Store Credit page to make changes.",
      },
    ],
    relatedFeatures: ["member-insight", "manage-subscriptions", "store-credit"],
    relatedRecipes: ["login-as-customer", "admin-store-credit-adjust", "self-service-subscriptions"],
  },
  {
    slug: "custom-profile-fields",
    group: "membership-modules",
    icon: FormInput,
    name: "Custom member profile fields",
    cardDescription:
      "Collect extra data from members — text, select, date, checkbox, or file fields added to My Account and the admin profile.",
    tier: "Free",
    seoTitle: "Custom Profile Fields for Members on WooCommerce",
    metaDescription:
      "Add custom profile fields (text, select, date, checkbox, file) to the WooCommerce My Account and admin user profile with ArraySubs Profile Builder. Exact field types inside.",
    h1: "Custom member profile fields",
    heroSubtitle:
      "Capture what your membership needs — add custom fields to the account profile, shown to members in My Account and to you in the admin.",
    heroHighlights: ["6 field types", "My Account + admin", "Required & validated"],
    intro:
      "Memberships often need ==more than name and email== — a company, a member ID, preferences, an uploaded document. ==Profile Builder (Free)== adds ==custom profile fields== to ==My Account → Account Details== (and the admin user profile), with ==six field types==: text, textarea, select, date, checkbox, and file upload. This recipe adds custom member fields.",
    settings: [
      {
        setting: "Where",
        value: "ArraySubs → Profile Builder → Profile Form",
        where: "Admin",
      },
      {
        setting: "Enable custom profile fields",
        value: "On",
        where: "Profile Form",
      },
      {
        setting: "Field types",
        value: "Text · Textarea · Select · Date · Checkbox · File Upload",
        where: "Field editor",
      },
      {
        setting: "Per field",
        value: "Label · Key · Required · Help text (file: types + max size)",
        where: "Field editor",
      },
    ],
    outcomes: [
      "Collect custom data on the member’s account profile.",
      "Choose from six field types, mark fields required.",
      "Fields show in My Account and the admin user profile.",
      "Data stored as user meta; changes are audit-logged.",
    ],
    bestFor: [
      "Member IDs, company, or preferences",
      "Collecting documents via file fields",
      "Any membership needing extra profile data",
    ],
    steps: [
      {
        title: "Enable custom fields",
        description:
          "In ArraySubs → Profile Builder → Profile Form, turn on Enable custom profile fields.",
        manual: M.profileForm,
      },
      {
        title: "Add and configure fields",
        description:
          "Click Add Field, set the Label, Type (text/textarea/select/date/checkbox/file), Required, and help text; reorder by dragging. Save Configuration.",
        manual: M.profileForm,
      },
    ],
    notes: [
      "Fields appear on My Account → Account Details and the admin Users → Edit User screen — not at WooCommerce checkout (use Checkout Builder for that, Pro).",
      "Checkbox fields can’t be marked required; file uploads validate type and size.",
      "Disabling or deleting a field never deletes already-stored member data.",
    ],
    faq: [
      {
        question: "What field types are available?",
        answer:
          "Text, textarea, select (dropdown), date, checkbox, and file upload — each with a label, key, optional help text, and (most) a required toggle.",
      },
      {
        question: "Do these fields show at checkout?",
        answer:
          "No. Profile fields appear on the account profile and admin user screen. For checkout fields, use the Pro Checkout Builder.",
      },
    ],
    relatedFeatures: ["profile-builder", "customer-portal"],
    relatedRecipes: ["member-avatars", "customize-my-account-menu", "login-personalization"],
  },
  {
    slug: "member-avatars",
    group: "membership-modules",
    icon: CircleUserRound,
    name: "Member avatar uploads",
    cardDescription:
      "Let members upload a profile photo from My Account, with size and file-type limits — falls back to Gravatar.",
    tier: "Free",
    seoTitle: "Member Avatar Uploads on WooCommerce",
    metaDescription:
      "Let WooCommerce members upload a profile photo from My Account with ArraySubs Profile Builder, with max-size and file-type controls and Gravatar fallback. Exact settings inside.",
    h1: "Let members upload an avatar",
    heroSubtitle:
      "Make accounts feel personal — let members set a profile photo from My Account, with your size and file-type rules.",
    heroHighlights: ["Upload from My Account", "Size & type limits", "Gravatar fallback"],
    intro:
      "A profile photo makes a membership feel like ==an account, not a transaction==. ==Profile Builder (Free)== adds an ==avatar uploader== to My Account (and the admin user screen), with a configurable ==max file size== and ==allowed file types==, falling back to ==Gravatar== when none is set. This recipe enables member avatars.",
    settings: [
      {
        setting: "Enable avatar upload",
        value: "On (default)",
        where: "Profile Builder → Profile Form → Avatar Settings",
      },
      {
        setting: "Max File Size (MB)",
        value: "2 (range 1–20)",
        where: "Avatar Settings",
      },
      {
        setting: "Allowed File Types",
        value: "jpg, jpeg, png, gif, webp (editable)",
        where: "Avatar Settings",
      },
      {
        setting: "Fallback",
        value: "Gravatar when no custom avatar is set",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Members upload a profile photo from My Account.",
      "Enforce max size and allowed file types.",
      "Instant upload via REST — no page reload.",
      "Falls back to Gravatar when none is set.",
    ],
    bestFor: [
      "Community and profile-driven memberships",
      "Personalized member accounts",
      "Forums and directories",
    ],
    steps: [
      {
        title: "Open Avatar Settings",
        description:
          "Go to ArraySubs → Profile Builder → Profile Form → Avatar Settings.",
        manual: M.profileForm,
      },
      {
        title: "Enable and set limits",
        description:
          "Turn on Enable avatar upload, set Max File Size (MB) and Allowed File Types, then Save Configuration.",
        manual: M.profileForm,
      },
    ],
    notes: [
      "Avatar upload is optional by design — it can’t be made required.",
      "Files are stored in a protected uploads directory, but avatar URLs are directly accessible — don’t use for sensitive files.",
      "Removing an avatar deletes the file and falls back to Gravatar.",
    ],
    faq: [
      {
        question: "What happens if a member doesn’t upload a photo?",
        answer:
          "Their Gravatar (based on account email) is shown as the fallback.",
      },
      {
        question: "Can I limit file size and type?",
        answer:
          "Yes. Set Max File Size (1–20 MB) and a comma-separated list of allowed image extensions in Avatar Settings.",
      },
    ],
    relatedFeatures: ["profile-builder", "customer-portal"],
    relatedRecipes: ["custom-profile-fields", "customize-my-account-menu", "member-360-profile"],
  },
  {
    slug: "customize-my-account-menu",
    group: "membership-modules",
    icon: Menu,
    name: "Customize the My Account menu",
    cardDescription:
      "Reorder, rename, or hide WooCommerce My Account tabs — including the Subscriptions, Features, and Store Credit items.",
    tier: "Free",
    seoTitle: "Customize the WooCommerce My Account Menu",
    metaDescription:
      "Reorder, rename, and hide My Account menu items (including Subscriptions, My Features, Store Credit) with ArraySubs Profile Builder’s My Account Editor. Exact capabilities inside.",
    h1: "Customize the My Account menu",
    heroSubtitle:
      "Make My Account yours — drag to reorder, rename labels, and hide items so members see a clean, on-brand navigation.",
    heroHighlights: ["Reorder & rename", "Hide items", "No code"],
    intro:
      "The default WooCommerce ==My Account menu== rarely matches a membership’s priorities. The ==My Account Editor (Free)== lets you ==reorder, rename, and hide== menu items — including ArraySubs’ ==Subscriptions, My Features, and Store Credit== tabs — so members get a tidy, branded portal. This recipe customizes the menu.",
    settings: [
      {
        setting: "Where",
        value: "ArraySubs → Profile Builder → My Account",
        where: "Admin",
      },
      {
        setting: "Master toggle",
        value: "Enable My Account menu items customization",
        where: "My Account Editor",
      },
      {
        setting: "Per item",
        value: "Reorder (drag) · Rename (custom label) · Hide (toggle)",
        where: "My Account Editor",
      },
      {
        setting: "Manages",
        value: "Default WooCommerce items + Subscriptions/Features/Store Credit",
        where: "My Account Editor",
      },
    ],
    outcomes: [
      "Reorder menu items to match member priorities.",
      "Rename labels (e.g. ‘Subscriptions’ → ‘My Plan’).",
      "Hide items you don’t want shown.",
      "Controls ArraySubs and Pro tabs too.",
    ],
    bestFor: [
      "Branded member portals",
      "Simplifying the account navigation",
      "Renaming tabs to your language",
    ],
    steps: [
      {
        title: "Enable customization",
        description:
          "In ArraySubs → Profile Builder → My Account, turn on Enable My Account menu items customization.",
        manual: M.myAccountEditor,
      },
      {
        title: "Reorder, rename, hide",
        description:
          "Drag items to reorder, set a custom label to rename, and toggle visibility to hide; Save Configuration.",
        manual: M.myAccountEditor,
      },
    ],
    notes: [
      "This editor is the source of truth for the Subscriptions tab label and order (General Settings no longer has those fields).",
      "Hiding an item removes it from the menu but does NOT block its endpoint URL — it’s visibility only, not access control.",
      "Default WooCommerce items can be reordered/renamed/hidden but not deleted.",
    ],
    faq: [
      {
        question: "Can I rename the Subscriptions tab?",
        answer:
          "Yes. Set a custom label on the Subscriptions item in the My Account Editor — it’s now the source of truth for that tab’s name and position.",
      },
      {
        question: "Does hiding a tab block access to it?",
        answer:
          "No. Hiding controls menu visibility only; the endpoint URL is still reachable. Use Member Access for actual access control.",
      },
    ],
    relatedFeatures: ["profile-builder", "customer-portal"],
    relatedRecipes: ["my-account-custom-pages", "custom-profile-fields", "self-service-subscriptions"],
  },
  {
    slug: "my-account-custom-pages",
    group: "membership-modules",
    icon: LayoutDashboard,
    name: "Add custom My Account pages",
    cardDescription:
      "Add your own tabs to My Account — link a WordPress page or post as a clean /my-account/ endpoint.",
    tier: "Free",
    seoTitle: "Add Custom Pages to WooCommerce My Account",
    metaDescription:
      "Add custom endpoint pages to the WooCommerce My Account menu with ArraySubs — link any WordPress page or post as a clean /my-account/ URL. Exact setup inside.",
    h1: "Add custom pages to My Account",
    heroSubtitle:
      "Put member resources where members look — add custom tabs that render any WordPress page inside My Account.",
    heroHighlights: ["Custom account tabs", "Link any page/post", "Clean endpoint URLs"],
    intro:
      "Members expect their ==resources inside their account==, not scattered across the site. The ==My Account Editor (Free)== lets you ==add custom endpoint pages== — a new tab that renders any ==WordPress page or post== at a clean ==/my-account/<slug>/== URL, with an option to redirect the original page there. This recipe adds custom account pages.",
    settings: [
      {
        setting: "Add Custom Item",
        value: "Creates a new My Account menu tab",
        where: "Profile Builder → My Account",
      },
      {
        setting: "Fields",
        value: "Menu Label · Endpoint Slug · Linked Content (page/post)",
        where: "Custom item",
      },
      {
        setting: "Prevent direct access",
        value: "Optional — redirect the original URL to the account version",
        where: "Custom item",
      },
      {
        setting: "URL",
        value: "/my-account/<slug>/ (clean endpoint)",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Add member-only resource tabs to My Account.",
      "Render any published page/post inside the account.",
      "Clean /my-account/<slug>/ URLs, page-builder friendly.",
      "Optionally redirect the original page to the account tab.",
    ],
    bestFor: [
      "Member resource hubs and guides",
      "Onboarding or welcome tabs",
      "Keeping content inside the account",
    ],
    steps: [
      {
        title: "Add a custom item",
        description:
          "In Profile Builder → My Account, click Add Custom Item.",
        manual: M.myAccountEditor,
      },
      {
        title: "Set label, slug, and content",
        description:
          "Enter a Menu Label, an Endpoint Slug, and search-select the Linked Content (a published page or post). Optionally enable Prevent direct access.",
        manual: M.myAccountEditor,
      },
    ],
    notes: [
      "Only published content can be linked; rewrite rules auto-flush after saving.",
      "Endpoint slugs can’t collide with reserved WooCommerce endpoints (orders, downloads, etc.).",
      "Custom endpoints have no access control beyond WooCommerce’s logged-in requirement — gate sensitive content with Member Access.",
    ],
    faq: [
      {
        question: "Can the custom tab show a page builder layout?",
        answer:
          "Yes. It runs the native WordPress post loop inside the My Account wrapper, so Gutenberg, Elementor, and Bricks content render correctly.",
      },
      {
        question: "Will the original page still be public?",
        answer:
          "By default yes; enable Prevent direct access to 302-redirect the original URL to the My Account version.",
      },
    ],
    relatedFeatures: ["profile-builder", "customer-portal"],
    relatedRecipes: ["customize-my-account-menu", "restrict-pages-by-plan", "custom-profile-fields"],
  },
  {
    slug: "self-service-subscriptions",
    group: "membership-modules",
    icon: Settings2,
    name: "Self-service subscription portal",
    cardDescription:
      "Give members a My Account hub to view subscriptions and self-serve — cancel, skip, pause, switch — by your rules.",
    tier: "Free + Pro",
    seoTitle: "Self-Service Subscription Portal on WooCommerce",
    metaDescription:
      "Give members a WooCommerce My Account portal to view and manage subscriptions — cancel, skip, pause, switch plan — gated by your settings. Exact actions and toggles inside.",
    h1: "The self-service subscription portal",
    heroSubtitle:
      "Cut support tickets — members view their subscriptions and take the actions you allow, right from My Account.",
    heroHighlights: ["My Subscriptions hub", "Actions you control", "Fewer tickets"],
    intro:
      "Members want to ==manage their own subscriptions==. ArraySubs’ ==Subscriptions tab== in My Account lists every subscription and opens a detail page where members ==self-serve the actions you enable== — ==cancel, skip, pause, change plan==, update payment/shipping — each governed by a Customer Actions toggle. This recipe sets up the self-service portal.",
    settings: [
      {
        setting: "Portal pages",
        value: "My Subscriptions + View Subscription (My Account)",
        where: "Storefront → My Account → Subscriptions",
      },
      {
        setting: "Allow Cancellation / Pause / Reactivation",
        value: "Toggles per action",
        where: "Settings → General → Customer Actions",
      },
      {
        setting: "Skip / Plan switching",
        value: "Enabled via Skip & Pause / Plan Switching settings",
        where: "Settings → General",
      },
      {
        setting: "Rule",
        value: "Buttons appear only for enabled actions + eligible status",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Members see all their subscriptions in My Account.",
      "They self-serve only the actions you’ve enabled.",
      "Actions show only for eligible statuses.",
      "Far fewer ‘please change my plan’ tickets.",
    ],
    bestFor: [
      "Any membership reducing support load",
      "Self-service-first subscriptions",
      "Giving members control safely",
    ],
    steps: [
      {
        title: "Enable the actions you want",
        description:
          "In Settings → General → Customer Actions, toggle Allow Cancellation, Pause, and Reactivation; enable Skip and Plan Switching in their sections.",
        manual: M.selfService,
      },
      {
        title: "Point members to the portal",
        description:
          "Members open My Account → Subscriptions, then View a subscription to access the enabled self-service actions.",
        manual: M.portalPages,
      },
    ],
    notes: [
      "Buttons appear only when the matching action is enabled and the subscription status is eligible.",
      "Reactivation has no portal button in the current version — members reactivate by paying a pending renewal, or an admin reactivates from the back office.",
      "Cancellation can trigger the Retention Flow (reasons + save offers) before completing.",
    ],
    faq: [
      {
        question: "Which actions can members take themselves?",
        answer:
          "Whatever you enable: cancel (immediate or end-of-period with undo), skip a renewal, pause, change plan (if linked products exist), and update payment/shipping. Each is governed by a setting.",
      },
      {
        question: "Can members reactivate from the portal?",
        answer:
          "Not via a dedicated button in the current version — they reactivate by paying a pending renewal invoice, or an admin reactivates them.",
      },
    ],
    relatedFeatures: ["customer-portal", "manage-subscriptions", "retention-and-refunds"],
    relatedRecipes: ["member-update-payment", "member-update-shipping", "member-auto-renew-toggle"],
  },
  {
    slug: "member-update-payment",
    group: "membership-modules",
    icon: CreditCard,
    name: "Let members update their card",
    cardDescription:
      "Members update their payment method from My Account via a secure gateway flow — Stripe, PayPal, or Paddle.",
    tier: "Pro",
    seoTitle: "Let Members Update Their Payment Method on WooCommerce (Pro)",
    metaDescription:
      "Let WooCommerce members update their saved card from My Account via a secure Stripe/PayPal/Paddle flow with ArraySubs Pro. Exact behavior and card-on-file display inside.",
    h1: "Let members update their payment method",
    heroSubtitle:
      "Stop card-failure churn — members update their card themselves through a secure, gateway-hosted flow from My Account.",
    heroHighlights: ["Self-service card update", "Stripe / PayPal / Paddle", "Card-on-file shown"],
    intro:
      "Failed renewals are often just ==an expired card==. With automatic payments (==Pro==), members can ==update their payment method== from the subscription detail page via a ==secure, gateway-hosted flow== — Stripe, PayPal, or Paddle — and see their ==card-on-file (brand + last 4 + expiry)==. This recipe enables self-service card updates.",
    settings: [
      {
        setting: "Requires",
        value: "Pro + an automatic gateway that supports updates",
        where: "Payments → Automatic Payments",
      },
      {
        setting: "Card on file",
        value: "Brand + last 4 + expiry shown on the subscription",
        where: "My Account → subscription detail",
      },
      {
        setting: "Update flow",
        value: "Redirect to Stripe / PayPal / Paddle, returns to detail",
        where: "Behaviour",
      },
      {
        setting: "Effect",
        value: "Applies to future charges, not the current cycle",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Members replace their card without contacting support.",
      "Secure, gateway-hosted update (no card data on your site).",
      "Card brand, last 4, and expiry are shown.",
      "Recovers renewals that would fail on an old card.",
    ],
    bestFor: [
      "Any membership on automatic billing",
      "Reducing involuntary churn",
      "EU/UK stores (re-auth via gateway)",
    ],
    steps: [
      {
        title: "Use an automatic gateway",
        description:
          "Activate Pro and connect Stripe, PayPal, or Paddle — the update link appears only when the gateway supports updates.",
        manual: M.paymentShipping,
      },
      {
        title: "Members update from the portal",
        description:
          "On the subscription detail page, the member clicks Update payment method and completes the gateway-hosted flow, returning to the portal.",
        manual: M.paymentShipping,
      },
    ],
    notes: [
      "Updating affects future charges only, not the current cycle.",
      "Not all gateways support updates — when unsupported, only the current card details show.",
      "Gateway specifics: Stripe hosted session, PayPal billing-agreement update, Paddle update portal.",
    ],
    faq: [
      {
        question: "Is card data stored on my site?",
        answer:
          "No. The update happens through a secure gateway-hosted flow (Stripe/PayPal/Paddle); your site only stores a reference and shows brand/last-4/expiry.",
      },
      {
        question: "Does updating re-charge the current renewal?",
        answer:
          "No. A new payment method applies to future charges; it doesn’t retroactively change the current cycle.",
      },
    ],
    relatedFeatures: ["customer-portal", "checkout-and-payments", "billing-and-renewals"],
    relatedRecipes: ["member-auto-renew-toggle", "self-service-subscriptions", "stripe-automatic-billing-sca"],
  },
  {
    slug: "member-update-shipping",
    group: "membership-modules",
    icon: MapPin,
    name: "Let members update shipping",
    cardDescription:
      "Members change their shipping address from My Account; renewals use the latest address, with a pre-renewal cutoff.",
    tier: "Free + Pro",
    seoTitle: "Let Members Update Shipping Address on WooCommerce",
    metaDescription:
      "Let WooCommerce members update their subscription shipping address from My Account with ArraySubs; renewals use the current address, blocked within 3 days of renewal. Details inside.",
    h1: "Let members update their shipping address",
    heroSubtitle:
      "Boxes ship to the right place — members update their shipping address from My Account, and renewals use the latest one.",
    heroHighlights: ["Self-service address", "Renewals use latest", "Pre-renewal cutoff"],
    intro:
      "Physical memberships need the ==current shipping address== at fulfillment. For shippable subscriptions, members can ==update their shipping address== from the subscription detail page; ==renewal orders use the latest address==, and updates are ==blocked within 3 days of renewal== so fulfillment isn’t disrupted. This recipe enables shipping-address self-service.",
    settings: [
      {
        setting: "Shows for",
        value: "Shippable subscriptions, status Active/On-Hold/Trial",
        where: "My Account → subscription detail",
      },
      {
        setting: "Update Shipping Address",
        value: "Modal with full address fields",
        where: "Subscription detail",
      },
      {
        setting: "Cutoff",
        value: "Hidden within 3 days of next payment (filterable)",
        where: "Behaviour",
      },
      {
        setting: "Effect",
        value: "Applies to future renewal orders; adds a subscription note",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Members fix their shipping address themselves.",
      "Renewal orders use the current address, not the old one.",
      "A pre-renewal cutoff protects fulfillment.",
      "Each change is noted on the subscription.",
    ],
    bestFor: [
      "Subscription boxes and physical goods",
      "Members who move or travel",
      "Reducing mis-shipped renewals",
    ],
    steps: [
      {
        title: "Use a shippable product",
        description:
          "The section appears automatically for subscriptions whose product requires shipping (Active/On-Hold/Trial).",
        manual: M.paymentShipping,
      },
      {
        title: "Member updates the address",
        description:
          "On the subscription detail page, the member clicks Update Shipping Address, edits the form, and saves — applied to future renewals.",
        manual: M.paymentShipping,
      },
    ],
    notes: [
      "Updates are blocked within 3 days of the next payment (default; adjustable only via the shipping-address-cutoff filter).",
      "Changes affect future renewal orders only; a country change may alter tax/shipping amounts.",
      "Pairs with the Subscription Shipping (Pro) recipes that control recurring vs one-time shipping charges.",
    ],
    faq: [
      {
        question: "Which address do renewals use?",
        answer:
          "The current subscription shipping address — not the one copied at original checkout — so updates take effect on the next renewal.",
      },
      {
        question: "Why can’t a member update right before renewal?",
        answer:
          "A 3-day cutoff hides the update near the renewal date so fulfillment isn’t disrupted; it’s adjustable via a filter.",
      },
    ],
    relatedFeatures: ["customer-portal", "subscription-shipping", "manage-subscriptions"],
    relatedRecipes: ["recurring-shipping-box", "self-service-subscriptions", "member-update-payment"],
  },
  {
    slug: "member-auto-renew-toggle",
    group: "membership-modules",
    icon: RefreshCw,
    name: "Member auto-renew toggle",
    cardDescription:
      "Let members switch off auto-renew and pay by invoice instead — without cancelling — from My Account.",
    tier: "Pro",
    seoTitle: "Customer Auto-Renew Toggle on WooCommerce (Pro)",
    metaDescription:
      "Let WooCommerce members turn off auto-renew and pay renewals manually (without cancelling) from My Account with ArraySubs Pro. Exact setting and gateway behavior inside.",
    h1: "Let members turn off auto-renew",
    heroSubtitle:
      "Offer a softer option than cancelling — members switch off auto-renew and pay each renewal by invoice instead.",
    heroHighlights: ["Off ≠ cancel", "Manual invoice next cycle", "Re-enable anytime"],
    intro:
      "Some members don’t want to ==cancel==, they just want to ==stop automatic charges==. With automatic payments (==Pro==), the ==Allow Auto-Renew Toggle== lets members ==switch off auto-renew== from My Account — the subscription ==stays active== but the next renewal becomes a ==manual invoice== they pay themselves. This recipe enables the auto-renew toggle.",
    settings: [
      {
        setting: "Allow Customers to Turn Off Auto-Renew",
        value: "On (Pro)",
        where: "Settings → General → Automatic Payments",
      },
      {
        setting: "Requires",
        value: "Pro + automatic gateway + non-lifetime subscription",
        where: "Behaviour",
      },
      {
        setting: "Off behavior",
        value: "Stays active; next renewal is a manual invoice",
        where: "Behaviour",
      },
      {
        setting: "Re-enable",
        value: "Anytime if a valid payment method is on file",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Members stop auto-charges without cancelling.",
      "Renewals continue as manual invoices.",
      "They can re-enable auto-renew anytime.",
      "A softer alternative that retains the subscription.",
    ],
    bestFor: [
      "Members nervous about auto-charges",
      "Reducing cancellations from billing anxiety",
      "Offering manual-pay flexibility",
    ],
    steps: [
      {
        title: "Enable the toggle",
        description:
          "In Settings → General → Automatic Payments, turn on Allow Customers to Turn Off Auto-Renew (Pro).",
        manual: M.paymentShipping,
      },
      {
        title: "Members toggle it in the portal",
        description:
          "On the subscription detail page (automatic gateway, non-lifetime), the member switches auto-renew off; the next renewal becomes a manual invoice.",
        manual: M.paymentShipping,
      },
    ],
    notes: [
      "Turning auto-renew off does not cancel the subscription and does not delay renewals — invoices still generate on schedule, only auto-collection stops.",
      "Re-enabling requires a valid payment method; an expired/removed method must be refreshed first.",
      "Gateway behavior differs: Stripe stops auto-charges, PayPal cancels the billing agreement, Paddle pauses at Paddle.",
    ],
    faq: [
      {
        question: "Does turning off auto-renew cancel the subscription?",
        answer:
          "No. It stays active; the member simply receives a manual invoice at each renewal instead of being auto-charged, and can re-enable anytime.",
      },
      {
        question: "What does the member need to turn it back on?",
        answer:
          "A valid payment method on file. If the card expired or was removed, they must update it before re-enabling auto-renew.",
      },
    ],
    relatedFeatures: ["customer-portal", "checkout-and-payments", "billing-and-renewals"],
    relatedRecipes: ["member-update-payment", "self-service-subscriptions", "no-card-trial-then-monthly"],
  },
  {
    slug: "member-store-credit-page",
    group: "membership-modules",
    icon: Wallet,
    name: "Member store-credit page",
    cardDescription:
      "Give members a My Account page to see their credit balance, transaction history, and buy more credit.",
    tier: "Pro",
    seoTitle: "Member Store Credit Page in My Account (WooCommerce Pro)",
    metaDescription:
      "Show members their store-credit balance, transaction history, and a buy-more-credit option in WooCommerce My Account with ArraySubs Pro. Exact page contents inside.",
    h1: "A store-credit page for members",
    heroSubtitle:
      "Make credit visible and usable — members see their balance, history, and (optionally) buy more, all in My Account.",
    heroHighlights: ["Balance + history", "Expiring-credit warning", "Buy more credit"],
    intro:
      "If you issue ==store credit==, members need somewhere to ==see and use it==. ==Store Credit (Pro)== adds a ==Store Credit== page to My Account showing ==balance, transaction history==, an ==expiring-soon warning==, and — when credit purchases are on — a ==buy-more-credit== section. This recipe surfaces the member credit page.",
    settings: [
      {
        setting: "Page",
        value: "My Account → Store Credit (/my-account/store-credit/)",
        where: "Storefront (Pro)",
      },
      {
        setting: "Requires",
        value: "Pro + Store Credit enabled",
        where: "Settings → Store Credit",
      },
      {
        setting: "Shows",
        value: "Balance · transaction history · expiring-soon warning",
        where: "Store Credit page",
      },
      {
        setting: "Buy more credit",
        value: "Shown when credit purchases are enabled",
        where: "Store Credit page",
      },
    ],
    outcomes: [
      "Members see their current credit balance.",
      "Full transaction history with sources.",
      "A warning for credit expiring within 30 days.",
      "Optional buy-more-credit (fixed or custom amount).",
    ],
    bestFor: [
      "Memberships using store credit / wallets",
      "Loyalty and refund-to-credit programs",
      "Prepaid-credit businesses",
    ],
    steps: [
      {
        title: "Enable Store Credit",
        description:
          "Turn on the Pro Store Credit system; the Store Credit My Account page appears automatically.",
        manual: M.customerPortal,
      },
      {
        title: "Position the menu item",
        description:
          "Use the My Account Editor to rename or reorder the Store Credit tab as desired.",
        manual: M.myAccountEditor,
      },
    ],
    notes: [
      "The page shows a ‘credit expiring within 30 days’ warning when expiration is configured.",
      "Buy-more-credit appears only when credit purchases are enabled (see the prepaid-credit recipe).",
      "Balance and history are also visible to admins via Store Credit Management and Credit History.",
    ],
    faq: [
      {
        question: "Can members buy credit from this page?",
        answer:
          "Yes, when credit purchases are enabled — the page shows fixed and/or custom-amount credit products with any configured bonus.",
      },
      {
        question: "Will members be warned before credit expires?",
        answer:
          "Yes. The page highlights credit expiring within the next 30 days, and the Credit Expiring email also notifies them.",
      },
    ],
    relatedFeatures: ["store-credit", "customer-portal", "emails"],
    relatedRecipes: ["sell-prepaid-credit-bonus", "expiring-promo-credit", "self-service-subscriptions"],
  },
  {
    slug: "customize-lifecycle-emails",
    group: "membership-modules",
    icon: Mail,
    name: "Customize lifecycle emails",
    cardDescription:
      "Edit the subject, heading, and content of every subscription email, with placeholders and theme template overrides.",
    tier: "Free + Pro",
    seoTitle: "Customize Subscription Lifecycle Emails on WooCommerce",
    metaDescription:
      "Edit every ArraySubs subscription email’s subject, heading, and content in WooCommerce email settings, with placeholders and theme template overrides. Exact options inside.",
    h1: "Customize your lifecycle emails",
    heroSubtitle:
      "Make every subscription email sound like you — edit subjects, headings, and content, with placeholders and full template overrides.",
    heroHighlights: ["Edit subject/heading/content", "Placeholders", "Theme overrides"],
    intro:
      "Subscription emails are ==member touchpoints==, so they should be on-brand. ArraySubs registers its emails in ==WooCommerce → Settings → Emails== (prefixed ==[ArraySubs]==), where each email’s ==subject, heading, additional content, and type (HTML/plain)== are editable — with a ==Placeholder Helper== and ==theme template overrides== for full control. This recipe customizes lifecycle emails.",
    settings: [
      {
        setting: "Where",
        value: "WooCommerce → Settings → Emails → [ArraySubs] …",
        where: "WooCommerce",
      },
      {
        setting: "Editable per email",
        value: "Enable/disable · Subject · Heading · Additional content · Type",
        where: "Email settings",
      },
      {
        setting: "Placeholders",
        value: "{customer_name}, {subscription_id}, {next_payment_date}, …",
        where: "Placeholder Helper",
      },
      {
        setting: "Template overrides",
        value: "Copy templates into your theme’s woocommerce/emails/",
        where: "Theme",
      },
    ],
    outcomes: [
      "Every subscription email matches your brand voice.",
      "Insert member/subscription data via placeholders.",
      "Toggle individual emails on or off.",
      "Override full templates in your theme when needed.",
    ],
    bestFor: [
      "Branded, on-voice member emails",
      "Localizing email copy",
      "Fine-grained email control",
    ],
    steps: [
      {
        title: "Open WooCommerce email settings",
        description:
          "Go to WooCommerce → Settings → Emails and find the [ArraySubs] emails; click Manage on one.",
        manual: M.emails,
      },
      {
        title: "Edit subject, heading, content",
        description:
          "Update the subject, heading, and additional content (use the Placeholder Helper to insert data), and choose HTML/plain/multipart.",
        manual: M.customerEmails,
      },
      {
        title: "Override the template (optional)",
        description:
          "For layout changes, copy the email template into your theme’s woocommerce/emails/ folder and edit there.",
        manual: M.emails,
      },
    ],
    notes: [
      "All ArraySubs emails inherit your WooCommerce email styling (logo, colors, footer).",
      "Some emails are gateway/Pro-gated or not yet wired (e.g. Trial Ending and Expiring Soon reminders have settings but aren’t sent in the current release).",
      "Store Credit emails are separate (Pro) and use their own placeholder set.",
    ],
    faq: [
      {
        question: "Where do I edit ArraySubs emails?",
        answer:
          "In WooCommerce → Settings → Emails — ArraySubs has no separate email page. Each [ArraySubs] email exposes subject, heading, content, and type.",
      },
      {
        question: "Can I change the email layout, not just text?",
        answer:
          "Yes. Copy the email template into your theme’s woocommerce/emails/ directory and customize it there so it survives updates.",
      },
    ],
    relatedFeatures: ["emails", "billing-and-renewals", "customer-portal"],
    relatedRecipes: ["renewal-reminder-timing", "admin-notification-emails", "branded-membership-emails"],
  },
  {
    slug: "renewal-reminder-timing",
    group: "membership-modules",
    icon: BellRing,
    name: "Renewal reminder timing",
    cardDescription:
      "Set how many days before a renewal members get a heads-up email — reducing surprise charges and disputes.",
    tier: "Free",
    seoTitle: "Renewal Reminder Email Timing on WooCommerce",
    metaDescription:
      "Set how many days before renewal ArraySubs sends the renewal reminder email to members, reducing surprise charges. Exact setting and range inside.",
    h1: "Set renewal reminder timing",
    heroSubtitle:
      "Fewer surprise-charge disputes — give members a heads-up a set number of days before each renewal.",
    heroHighlights: ["Days-before reminder", "Cuts disputes", "Free core"],
    intro:
      "A ==renewal reminder== before the charge ==reduces disputes and involuntary churn== — members aren’t surprised. ArraySubs sends a ==Renewal Reminder== email a configurable number of ==days before the next payment==. This recipe sets the reminder timing.",
    settings: [
      {
        setting: "Renewal Reminder (Days Before)",
        value: "3 (range 1–30)",
        where: "Settings → General → Email Reminder Schedule",
      },
      {
        setting: "Email",
        value: "Renewal Reminder ([ArraySubs] in WooCommerce → Emails)",
        where: "WooCommerce → Emails",
      },
      {
        setting: "Delivery",
        value: "Scheduled per subscription; reschedules if the date changes",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Members get a heads-up before each renewal.",
      "Set the lead time from 1 to 30 days.",
      "Fewer surprise-charge disputes and chargebacks.",
      "Reschedules automatically if the renewal date shifts.",
    ],
    bestFor: [
      "Higher-priced or annual plans",
      "Reducing chargebacks and churn",
      "Transparent billing",
    ],
    steps: [
      {
        title: "Set the lead time",
        description:
          "In Settings → General → Email Reminder Schedule, set Renewal Reminder (Days Before), e.g. 3 (range 1–30).",
        manual: M.emails,
      },
      {
        title: "Confirm the email is enabled",
        description:
          "In WooCommerce → Settings → Emails, ensure the [ArraySubs] Renewal Reminder email is enabled and edit its copy if desired.",
        manual: M.customerEmails,
      },
    ],
    notes: [
      "The Renewal Reminder is the only scheduled reminder fully wired in the current release.",
      "Trial Ending and Expiring Soon reminder settings exist but aren’t sent yet — don’t rely on them.",
      "Reminders are scheduled on activation and after each successful renewal.",
    ],
    faq: [
      {
        question: "How far ahead can I remind members?",
        answer:
          "From 1 to 30 days before the next payment date. The default is 3 days.",
      },
      {
        question: "Do trial-ending and expiring-soon reminders work?",
        answer:
          "Their settings are exposed, but in the current release only the Renewal Reminder is actually sent.",
      },
    ],
    relatedFeatures: ["emails", "billing-and-renewals"],
    relatedRecipes: ["customize-lifecycle-emails", "admin-notification-emails", "lenient-dunning-grace"],
  },
  {
    slug: "admin-notification-emails",
    group: "membership-modules",
    icon: Inbox,
    name: "Admin notification emails",
    cardDescription:
      "Get notified of new subscriptions, failed payments, and cancellations — with a custom recipient and toggles.",
    tier: "Free",
    seoTitle: "Admin Notification Emails for Subscriptions on WooCommerce",
    metaDescription:
      "Get admin emails for new subscriptions, failed payments, and cancellations with ArraySubs, with a custom recipient and per-email toggles. Exact emails and settings inside.",
    h1: "Stay on top with admin emails",
    heroSubtitle:
      "Know the moment it matters — get notified of new subscriptions, failed payments, and cancellations, sent where you want.",
    heroHighlights: ["New sub / failed / cancelled", "Custom recipient", "Per-email toggles"],
    intro:
      "As the operator you want to ==know about key events==. ArraySubs sends ==admin notification emails== for ==new subscriptions, failed payments, cancellations, and pending cancellations==, to the site admin or a ==custom recipient==, with ==quick toggles== for the main ones. This recipe configures admin alerts.",
    settings: [
      {
        setting: "Admin emails",
        value: "New Subscription · Payment Failed · Cancelled · Pending Cancellation",
        where: "WooCommerce → Emails ([ArraySubs])",
      },
      {
        setting: "Recipient",
        value: "Custom admin email (overrides site admin)",
        where: "Settings → Emails (admin_email)",
      },
      {
        setting: "Quick toggles",
        value: "Admin New Subscription / Cancelled / Payment Failed",
        where: "ArraySubs email settings",
      },
      {
        setting: "Note",
        value: "No admin email for reactivations",
        where: "Behaviour",
      },
    ],
    outcomes: [
      "Get alerted on new subscriptions and cancellations.",
      "Know immediately when a payment fails.",
      "Route alerts to a custom recipient (e.g. a shared inbox).",
      "Toggle each main admin email on or off.",
    ],
    bestFor: [
      "Operators tracking signups and churn",
      "Finance watching failed payments",
      "Routing alerts to a team inbox",
    ],
    steps: [
      {
        title: "Set the recipient",
        description:
          "In the ArraySubs email settings, set a custom admin email (or leave blank to use the WordPress site admin address).",
        manual: M.adminEmails,
      },
      {
        title: "Toggle the alerts you want",
        description:
          "Enable Admin New Subscription, Admin Subscription Cancelled, and Admin Payment Failed; manage the pending-cancellation admin email in WooCommerce → Emails.",
        manual: M.adminEmails,
      },
    ],
    notes: [
      "Quick toggles cover New Subscription, Cancelled, and Payment Failed; the pending-cancellation admin email is managed only in WooCommerce → Emails.",
      "There is no admin email for reactivations.",
      "Each admin email links straight to the subscription in the ArraySubs admin.",
    ],
    faq: [
      {
        question: "Can I send admin alerts to more than the site admin?",
        answer:
          "Yes. Set a custom admin email in the ArraySubs email settings, or edit the Recipient(s) field on each admin email in WooCommerce → Emails (comma-separated).",
      },
      {
        question: "Do I get notified when a member reactivates?",
        answer:
          "No. There’s no admin reactivation email — admin alerts cover new subscriptions, failed payments, cancellations, and pending cancellations.",
      },
    ],
    relatedFeatures: ["emails", "manage-subscriptions"],
    relatedRecipes: ["customize-lifecycle-emails", "renewal-reminder-timing", "branded-membership-emails"],
  },
  {
    slug: "branded-membership-emails",
    group: "membership-modules",
    icon: MailOpen,
    name: "Brand your membership emails",
    cardDescription:
      "Apply your logo, colors, and footer to every subscription email through WooCommerce’s email branding.",
    tier: "Free + Pro",
    seoTitle: "Brand Your Subscription Emails on WooCommerce",
    metaDescription:
      "Apply your logo, colors, and footer to every ArraySubs subscription email via WooCommerce email branding, with HTML/plain options and template overrides. Exact approach inside.",
    h1: "Brand your membership emails",
    heroSubtitle:
      "Consistent, professional emails — every subscription message carries your logo, colors, and footer automatically.",
    heroHighlights: ["Logo, colors, footer", "HTML or plain", "Consistent everywhere"],
    intro:
      "Because ArraySubs emails ride on the ==WooCommerce email framework==, they ==inherit your store’s email branding== — logo, colors, and footer — automatically. Set the branding once in ==WooCommerce → Settings → Emails== and ==every subscription and credit email== looks consistent. This recipe brands your membership emails.",
    settings: [
      {
        setting: "Email branding",
        value: "Header image (logo), base/background colors, footer text",
        where: "WooCommerce → Settings → Emails → Email sender / template options",
      },
      {
        setting: "Applies to",
        value: "All [ArraySubs] subscription, admin, and credit emails",
        where: "Behaviour",
      },
      {
        setting: "Per-email type",
        value: "HTML / Plain text / Multipart",
        where: "Each email’s settings",
      },
      {
        setting: "Deep changes",
        value: "Theme template overrides in woocommerce/emails/",
        where: "Theme",
      },
    ],
    outcomes: [
      "Every subscription email carries your branding.",
      "Set logo, colors, and footer once — applies everywhere.",
      "Choose HTML or plain per email.",
      "Override templates for bespoke layouts.",
    ],
    bestFor: [
      "Professional, on-brand member comms",
      "Agencies delivering polished stores",
      "Consistent email identity",
    ],
    steps: [
      {
        title: "Set WooCommerce email branding",
        description:
          "In WooCommerce → Settings → Emails, set the header image (logo), colors, and footer text — these apply to all emails.",
        manual: M.emails,
      },
      {
        title: "Confirm on an ArraySubs email",
        description:
          "Open any [ArraySubs] email and send a test; it inherits the store branding. Override the template in your theme for deeper changes.",
        manual: M.emails,
      },
    ],
    notes: [
      "Branding is WooCommerce-wide — it covers ArraySubs subscription, admin, and (Pro) Store Credit emails alike.",
      "Plain-text variants live in a plain/ subdirectory when overriding templates.",
      "Never edit plugin email files directly — use theme overrides so changes survive updates.",
    ],
    faq: [
      {
        question: "Do I have to brand each ArraySubs email separately?",
        answer:
          "No. They inherit your WooCommerce email branding (logo, colors, footer) automatically — set it once and it applies to all of them.",
      },
      {
        question: "Can I fully redesign an email?",
        answer:
          "Yes. Copy its template into your theme’s woocommerce/emails/ folder (plain-text in the plain/ subfolder) and customize it there.",
      },
    ],
    relatedFeatures: ["emails", "customer-portal"],
    relatedRecipes: ["customize-lifecycle-emails", "admin-notification-emails", "renewal-reminder-timing"],
  },

  // ============================================================
  // GROUP 7 — Analytics & growth
  // ============================================================
  {
    slug: "track-mrr-growth",
    group: "analytics-growth",
    icon: LineChart,
    name: "Track MRR, churn & ARPU",
    cardDescription:
      "Know the numbers that grow a subscription business — MRR, churn rate, ARPU, trial conversion, and revenue at risk on one dashboard.",
    tier: "Pro",
    seoTitle: "Track MRR, Churn, and ARPU on WooCommerce (Pro)",
    metaDescription:
      "See MRR, churn rate, ARPU, trial conversion, renewal revenue, and revenue at risk on the ArraySubs Pro subscription dashboard. The KPIs that grow a subscription business.",
    h1: "Track the metrics that grow your business",
    heroSubtitle:
      "You can’t grow what you don’t measure — get MRR, churn, ARPU, trial conversion, and revenue at risk at a glance, with period-over-period change.",
    heroHighlights: ["MRR · churn · ARPU", "Trial conversion & saves", "Period comparison"],
    intro:
      "Growth starts with ==knowing your numbers==. The ==Subscription Performance Dashboard (Pro)== puts ==10 KPI cards== on your WooCommerce Analytics overview — ==MRR, Active Subscriptions, New, Churned, Churn Rate, Trial Conversions, Renewal Revenue, Revenue at Risk, ARPU, and Retention Saves== — each with ==period-over-period change==. This recipe turns it on so you can spot what’s working and what’s leaking.",
    settings: [
      {
        setting: "Where",
        value: "WooCommerce → Analytics → Overview (Pro)",
        where: "Storefront admin",
      },
      {
        setting: "KPI cards",
        value: "MRR · Active · New · Churned · Churn Rate · Trial Conv. · Renewal Rev. · Revenue at Risk · ARPU · Saves",
        where: "Performance Dashboard",
      },
      {
        setting: "MRR basis",
        value: "Active + trial subs, normalized to monthly",
        where: "Metric definition",
      },
      {
        setting: "Comparison",
        value: "Equal-length previous period",
        where: "Date range selector",
      },
    ],
    outcomes: [
      "See MRR, churn, ARPU, and trial conversion at a glance.",
      "Spot revenue at risk (on-hold + pending cancellations).",
      "Compare any period against the one before it.",
      "Click a card to drill into the underlying orders.",
    ],
    bestFor: [
      "Operators steering growth by the numbers",
      "Investors / board reporting",
      "Spotting churn and revenue leaks early",
    ],
    steps: [
      {
        title: "Activate Pro analytics",
        description:
          "With ArraySubs Pro active, open WooCommerce → Analytics → Overview — the subscription KPI cards appear automatically.",
        manual: M.subPerformance,
      },
      {
        title: "Set your date range",
        description:
          "Use the WooCommerce Admin date picker; each card compares to the equal-length prior period.",
        manual: M.subPerformance,
      },
      {
        title: "Drill into the drivers",
        description:
          "Click cards to jump to the filtered Orders, Revenue, Customers, or Retention reports behind each metric.",
        manual: M.subPerformance,
      },
    ],
    notes: [
      "MRR includes trial subscriptions (committed recurring revenue) and normalizes daily/weekly/yearly plans to a monthly rate.",
      "Revenue at Risk is a real-time snapshot (no period comparison).",
      "Card data caches for ~1 hour and refreshes when a subscription or order status changes.",
    ],
    faq: [
      {
        question: "How is MRR calculated?",
        answer:
          "It sums all active and trial subscription amounts normalized to a monthly rate — e.g. a $120/year plan contributes $10 MRR.",
      },
      {
        question: "What counts as ‘revenue at risk’?",
        answer:
          "Normalized monthly revenue from on-hold subscriptions plus active/trial subscriptions that have a pending end-of-period cancellation.",
      },
    ],
    relatedFeatures: ["analytics", "billing-and-renewals", "retention-and-refunds"],
    relatedRecipes: ["subscription-growth-charts", "trial-conversion-optimization", "retention-analytics-insights"],
  },
  {
    slug: "subscription-growth-charts",
    group: "analytics-growth",
    icon: BarChart3,
    name: "Growth trend charts",
    cardDescription:
      "See MRR, net growth, churn, renewal revenue, and trial conversion trending over time — spot momentum and inflection points.",
    tier: "Pro",
    seoTitle: "Subscription Growth Trend Charts on WooCommerce (Pro)",
    metaDescription:
      "Visualize MRR, net subscription growth, churn rate, renewal revenue, trial conversion, and active subs over time with ArraySubs Pro time-series charts. Spot trends and act.",
    h1: "See your growth trending over time",
    heroSubtitle:
      "A number is a snapshot; a trend tells the story — chart MRR, net growth, churn, and conversion across days, weeks, months, or quarters.",
    heroHighlights: ["6 time-series charts", "Auto interval", "Spot momentum"],
    intro:
      "Single numbers hide the ==direction of travel==. The Performance Dashboard adds ==6 time-series charts (Pro)== — ==MRR, Net Subscription Growth, Renewal Revenue, Churn Rate, Trial Conversion Rate, and Active Subscriptions== — with the interval auto-chosen from your date range. This recipe surfaces the trends so you can tell whether a change actually moved growth.",
    settings: [
      {
        setting: "Where",
        value: "WooCommerce → Analytics → Overview (Pro)",
        where: "Storefront admin",
      },
      {
        setting: "Charts",
        value: "MRR · Net Growth · Renewal Revenue · Churn Rate · Trial Conversion · Active Subs",
        where: "Performance Dashboard",
      },
      {
        setting: "Interval",
        value: "Auto: ≤7d daily · 8–60d weekly · 61–365d monthly · >365d quarterly",
        where: "Date range",
      },
    ],
    outcomes: [
      "See MRR and growth trending, not just today’s value.",
      "Catch churn or conversion turning the wrong way early.",
      "Tie a pricing/retention change to its effect on the curve.",
      "Interval adapts to the range you pick.",
    ],
    bestFor: [
      "Tracking the impact of changes over time",
      "Board / investor trend reporting",
      "Catching inflection points",
    ],
    steps: [
      {
        title: "Open the Overview dashboard",
        description:
          "WooCommerce → Analytics → Overview (Pro) shows the subscription charts as tabs below the KPI cards.",
        manual: M.subPerformance,
      },
      {
        title: "Pick a metric and range",
        description:
          "Switch chart tabs (MRR, Net Growth, Churn, …) and set a date range; the interval auto-selects (or override day/week/month/quarter/year).",
        manual: M.subPerformance,
      },
    ],
    notes: [
      "Charts respect the WooCommerce Admin date range and show a delta vs the equivalent previous period.",
      "Churn Rate is ‘lower is better’; the chart colors reflect that.",
      "Pairs with the KPI-card recipe — cards for the snapshot, charts for the trend.",
    ],
    faq: [
      {
        question: "Can I change the chart interval?",
        answer:
          "It auto-selects from your date range (daily up to quarterly), and you can manually choose day, week, month, quarter, or year.",
      },
      {
        question: "Which trends are available?",
        answer:
          "MRR, net subscription growth, renewal revenue, churn rate, trial conversion rate, and active subscriptions.",
      },
    ],
    relatedFeatures: ["analytics", "billing-and-renewals"],
    relatedRecipes: ["track-mrr-growth", "product-customer-leaderboards", "retention-analytics-insights"],
  },
  {
    slug: "product-customer-leaderboards",
    group: "analytics-growth",
    icon: Trophy,
    name: "Top products & customers",
    cardDescription:
      "See your best products, highest-value subscribers, and worst churn — so you can double down on what grows and fix what bleeds.",
    tier: "Pro",
    seoTitle: "Subscription Leaderboards: Top Products & Customers (WooCommerce Pro)",
    metaDescription:
      "See top subscription products by active count and revenue, highest-LTV subscribers, top cancellation reasons, and highest-churn products with ArraySubs Pro leaderboards.",
    h1: "Double down on what grows",
    heroSubtitle:
      "Find your winners and your leaks — top products, highest-value subscribers, biggest churn drivers — and put your effort where it pays.",
    heroHighlights: ["Top products & subscribers", "Highest-churn products", "Top cancel reasons"],
    intro:
      "Growth is ==more of what works, less of what doesn’t==. The Performance Dashboard adds ==5 leaderboards (Pro)==: ==Top Subscription Products (by active count and by revenue), Top Subscribers by lifetime value, Top Cancellation Reasons, and Highest-Churn Products==. This recipe shows where to invest and what to fix.",
    settings: [
      {
        setting: "Where",
        value: "WooCommerce → Analytics → Overview (Pro)",
        where: "Storefront admin",
      },
      {
        setting: "Leaderboards",
        value: "Top products (active / revenue) · Top subscribers (LTV) · Top cancel reasons · Highest-churn products",
        where: "Performance Dashboard",
      },
      {
        setting: "Links",
        value: "Products link to edit; subscribers link to Manage Members",
        where: "Leaderboard rows",
      },
    ],
    outcomes: [
      "Identify your highest-MRR and best-selling products.",
      "Spot your most valuable subscribers (LTV).",
      "See which products churn worst — and why.",
      "Focus marketing and product effort where it pays.",
    ],
    bestFor: [
      "Prioritizing product and marketing investment",
      "Spotting and fixing high-churn products",
      "Recognizing and retaining top customers",
    ],
    steps: [
      {
        title: "Open the Overview leaderboards",
        description:
          "WooCommerce → Analytics → Overview (Pro) shows the leaderboards in the leaderboard section; they respect the date picker.",
        manual: M.subPerformance,
      },
      {
        title: "Act on the rankings",
        description:
          "Jump from a product row to its editor, or a subscriber row to their Manage Members profile, to take the next step.",
        manual: M.subPerformance,
      },
    ],
    notes: [
      "Revenue leaderboards filter by order date; active-count leaderboards by subscription start date.",
      "Top Cancellation Reasons and Highest-Churn Products show you exactly where retention work pays off.",
      "Leaderboards group by the effective product (variation if the subscription is tied to it).",
    ],
    faq: [
      {
        question: "How do I find which products lose the most customers?",
        answer:
          "The Highest-Churn Products leaderboard ranks products by cancellation volume and churn rate, and Top Cancellation Reasons shows why.",
      },
      {
        question: "Can I see my most valuable customers?",
        answer:
          "Yes — Top Subscribers by lifetime value ranks customers by total spend and active subscriptions, linking to each member profile.",
      },
    ],
    relatedFeatures: ["analytics", "member-insight", "retention-and-refunds"],
    relatedRecipes: ["track-mrr-growth", "retention-analytics-insights", "subscription-revenue-reports"],
  },
  {
    slug: "retention-analytics-insights",
    group: "analytics-growth",
    icon: PieChart,
    name: "Retention & churn analytics",
    cardDescription:
      "Measure why customers leave and which save offers work — cut churn with data instead of guesswork. Free.",
    tier: "Free",
    seoTitle: "Retention & Churn Analytics on WooCommerce (Free)",
    metaDescription:
      "Measure cancellations, churn rate, cancellation reasons, retention-offer success, and retained revenue with ArraySubs free Retention Analytics. Cut churn with data.",
    h1: "Cut churn with retention analytics",
    heroSubtitle:
      "Churn is the silent growth killer — see why customers leave, which offers save them, and how much revenue you’re keeping. Free.",
    heroHighlights: ["Churn & reasons", "Offer success rate", "Retained revenue"],
    intro:
      "Reducing churn compounds growth — and it’s ==free to measure== in ArraySubs. ==Retention Analytics== (WooCommerce → Analytics → Retention) shows ==total cancellations, churn rate, average age and payments at cancel, offers shown vs accepted, offer success rate, and retained revenue==, plus a ==cancellation-reasons pie== and an activity log. This recipe turns churn into an action list.",
    settings: [
      {
        setting: "Where",
        value: "WooCommerce → Analytics → Retention (Free)",
        where: "Storefront admin",
      },
      {
        setting: "KPI cards",
        value: "Cancellations · Churn Rate · Avg age/payments at cancel · Offers shown/accepted · Success rate · Retained revenue",
        where: "Retention Analytics",
      },
      {
        setting: "Charts",
        value: "Churn-reasons pie · offer accepted/declined · trend lines",
        where: "Retention Analytics",
      },
      {
        setting: "Activity log",
        value: "Every cancel, scheduled cancel, undo, offer shown/accepted/declined",
        where: "Retention Analytics",
      },
    ],
    outcomes: [
      "See exactly why customers cancel (reason breakdown).",
      "Measure which retention offers actually save subscriptions.",
      "Track retained revenue from accepted offers.",
      "Spot churn trends and act — all on the free plan.",
    ],
    bestFor: [
      "Any subscription fighting churn",
      "Tuning the Retention Flow with data",
      "Proving retention ROI",
    ],
    steps: [
      {
        title: "Open Retention Analytics",
        description:
          "Go to WooCommerce → Analytics → Retention (free). Set the date range and optional product filter.",
        manual: M.retentionAnalytics,
      },
      {
        title: "Read reasons & offer performance",
        description:
          "Use the churn-reasons pie and offer chart to see why people leave and which offers convert; check the success rate and retained revenue.",
        manual: M.retentionAnalytics,
      },
      {
        title: "Tune your Retention Flow",
        description:
          "Feed the insights back into your retention offers (discount/pause/downgrade targeting) to lift the save rate.",
        manual: M.offers,
      },
    ],
    notes: [
      "Retention Analytics is free — no Pro license needed.",
      "Cancellations are backfilled from history on activation; offer interactions are only logged from then on (in real time).",
      "Its churn rate uses a different denominator than the Pro dashboard’s (live subscribers at period start), so the two can differ.",
    ],
    faq: [
      {
        question: "Do I need Pro for retention analytics?",
        answer:
          "No. Retention Analytics is part of the free core; the Pro Performance Dashboard adds broader MRR/growth analytics on top.",
      },
      {
        question: "Can I see which offers save the most customers?",
        answer:
          "Yes — the offer chart and success-rate card show offers shown vs accepted, and Retained Revenue shows the recurring revenue saved.",
      },
    ],
    relatedFeatures: ["retention-analytics", "retention-and-refunds", "analytics"],
    relatedRecipes: ["discount-too-expensive", "track-mrr-growth", "product-customer-leaderboards"],
  },
  {
    slug: "trial-conversion-optimization",
    group: "analytics-growth",
    icon: Target,
    name: "Optimize trial conversion",
    cardDescription:
      "Measure trial-to-paid conversion over time so you can test trial length, card-required, and onboarding to lift it.",
    tier: "Pro",
    seoTitle: "Trial Conversion Rate Analytics on WooCommerce (Pro)",
    metaDescription:
      "Track trial-to-paid conversion rate over time with ArraySubs Pro analytics, then optimize trial length, payment-capture, and onboarding to grow paid subscriptions.",
    h1: "Optimize trial-to-paid conversion",
    heroSubtitle:
      "Trials are where growth is won or lost — measure the conversion rate, then test what lifts it.",
    heroHighlights: ["Conversion % over time", "Test trial settings", "Grow paid subs"],
    intro:
      "If trials feed your funnel, ==trial-to-paid conversion is a top growth lever==. The Performance Dashboard tracks ==Trial Conversions== as a KPI card and a ==trend chart (Pro)== — trials that ended and converted ÷ trials ended. This recipe uses that number to test trial length, card-required vs no-card, and onboarding, then watch the rate move.",
    settings: [
      {
        setting: "Metric",
        value: "Trial Conversion Rate (card + trend chart)",
        where: "WooCommerce → Analytics → Overview (Pro)",
      },
      {
        setting: "Definition",
        value: "Trials ended in period that are now active ÷ total trials ended",
        where: "Metric",
      },
      {
        setting: "Levers to test",
        value: "Trial length · Require Payment Method · onboarding emails",
        where: "Product / General Settings",
      },
    ],
    outcomes: [
      "Know your true trial-to-paid conversion rate.",
      "See it trend as you change trial settings.",
      "Test card-required vs no-card and trial length with evidence.",
      "Grow paid subscriptions from the same trial volume.",
    ],
    bestFor: [
      "SaaS and any trial-led funnel",
      "Deciding card-required vs no-card trials",
      "Improving onboarding",
    ],
    steps: [
      {
        title: "Read the conversion metric",
        description:
          "On WooCommerce → Analytics → Overview (Pro), check the Trial Conversions card and the Trial Conversion Rate chart over a meaningful range.",
        manual: M.subPerformance,
      },
      {
        title: "Change one lever",
        description:
          "Adjust a single variable — trial length, Require Payment Method, or onboarding — using the relevant subscription/trial settings.",
        manual: M.trial,
      },
      {
        title: "Watch the rate move",
        description:
          "Compare conversion before vs after on the trend chart to confirm the change actually helped.",
        manual: M.subPerformance,
      },
    ],
    notes: [
      "Only trials whose trial-end date falls in the selected period count — ongoing trials are excluded.",
      "Card-required trials (Stripe) typically convert higher than no-card; measure the trade-off against trial starts.",
      "Pair with the trial recipes in the recurring-billing group to implement each test.",
    ],
    faq: [
      {
        question: "How is trial conversion measured?",
        answer:
          "Trials that ended within the period and are now active, divided by all trials that ended in the period.",
      },
      {
        question: "What should I test to improve it?",
        answer:
          "Trial length, whether a payment method is required (card-required vs no-card), and onboarding/reminder emails — change one at a time and watch the trend.",
      },
    ],
    relatedFeatures: ["analytics", "billing-and-renewals", "checkout-and-payments"],
    relatedRecipes: ["card-required-trial-then-monthly", "no-card-trial-then-monthly", "track-mrr-growth"],
  },
  {
    slug: "coupon-promo-insights",
    group: "analytics-growth",
    icon: Tags,
    name: "Coupon & promo insights",
    cardDescription:
      "Filter orders by type and coupon to see which promos actually drive signups and renewals — not just redemptions.",
    tier: "Pro",
    seoTitle: "Coupon and Promo Order Insights on WooCommerce (Pro)",
    metaDescription:
      "Add order-type and coupon columns and filters to the WooCommerce orders list with ArraySubs Pro, and see which promotions drive signups vs renewals. Exact setup inside.",
    h1: "See which promos actually grow revenue",
    heroSubtitle:
      "A coupon that gets redeemed isn’t the same as one that grows revenue — slice orders by type and coupon to see what really works.",
    heroHighlights: ["Type + coupon columns", "Filter & count", "Promo ROI"],
    intro:
      "Promos drive growth only if they bring ==the right orders==. ==Order List Enhancements (Pro)== add ==Type and Coupon columns== to WooCommerce → Orders, with ==filters by order type and coupon== and an ==embedded report panel== of per-type counts. This recipe lets you see whether a coupon drove ==new subscriptions vs just discounted renewals==.",
    settings: [
      {
        setting: "Where",
        value: "WooCommerce → Orders (Pro)",
        where: "Storefront admin",
      },
      {
        setting: "Columns",
        value: "Order Type (Subs Purchase/Trial/Renew/Upgrade/Credit/Other) + Coupon(s)",
        where: "Orders list",
      },
      {
        setting: "Filters",
        value: "Type · Coupon · Subscription-products-only (combinable)",
        where: "Orders list",
      },
      {
        setting: "Report panel",
        value: "Total orders + per-type counts + orders-with-coupon",
        where: "Orders list",
      },
    ],
    outcomes: [
      "See each order’s type and coupon at a glance.",
      "Filter to ‘coupon X on new subscriptions’ vs renewals.",
      "Count how promos split across order types.",
      "Judge promo ROI, not just redemptions.",
    ],
    bestFor: [
      "Measuring promotion and coupon ROI",
      "Separating acquisition from renewal discounts",
      "Finance reconciling order types",
    ],
    steps: [
      {
        title: "Enable Pro & backfill order types",
        description:
          "With Pro active, open WooCommerce → Orders; if older orders are unclassified, click Compute Order Types to backfill (batched, non-destructive).",
        manual: M.orderListEnh,
      },
      {
        title: "Filter by type and coupon",
        description:
          "Use the Type, Coupon, and Subscription-products-only filters together (e.g. Type = Subs Purchase + Coupon = WELCOME15) and read the report panel counts.",
        manual: M.orderListEnh,
      },
    ],
    notes: [
      "Order type is computed automatically (Credit Purchase → Subs Trial → Subs Renew → Subs Upgrade → Subs Purchase → Other) — not manually editable.",
      "For multi-type include/exclude analysis, use the advanced Type filter in Analytics → Orders.",
      "The coupon filter lists only codes actually used on orders.",
    ],
    faq: [
      {
        question: "Can I tell if a coupon drove new signups or just cheaper renewals?",
        answer:
          "Yes. Filter by Coupon and Order Type together — Subs Purchase/Trial = acquisition, Subs Renew = renewals — to see exactly where the discount landed.",
      },
      {
        question: "Why don’t my old orders show a type?",
        answer:
          "Orders created before Pro need a one-time backfill — click Compute Order Types on the orders page; it’s batched and non-destructive.",
      },
    ],
    relatedFeatures: ["analytics", "coupons", "manage-subscriptions"],
    relatedRecipes: ["subscription-revenue-reports", "half-off-3-months", "welcome-15-one-time"],
  },
  {
    slug: "subscription-revenue-reports",
    group: "analytics-growth",
    icon: DollarSign,
    name: "Subscription-aware WooCommerce reports",
    cardDescription:
      "Add order-type filters and renewal/upgrade/credit revenue cards to native WooCommerce Analytics for true subscription reporting.",
    tier: "Pro",
    seoTitle: "Subscription-Aware WooCommerce Analytics Reports (Pro)",
    metaDescription:
      "Extend WooCommerce Analytics with order-type columns/filters, renewal/upgrade/credit revenue cards, and subscription-only product reports using ArraySubs Pro. Exact details inside.",
    h1: "Subscription-aware WooCommerce reports",
    heroSubtitle:
      "WooCommerce Analytics doesn’t know what a renewal is — ArraySubs teaches it, so your revenue reports finally reflect the subscription business.",
    heroHighlights: ["Order-type filters", "Renewal/upgrade revenue", "Subscription-only reports"],
    intro:
      "Native WooCommerce Analytics lumps ==renewals, upgrades, and one-off sales together==. The ==WooCommerce Analytics Extension (Pro)== fixes that: an ==order Type column and filters==, ==Subs Renew / Subs Upgrade / Credit Purchase revenue cards== on the Revenue report, ==subscription-only== Product/Variation reports, and ==Member Details== links on Customers. This recipe makes WooCommerce reporting subscription-aware.",
    settings: [
      {
        setting: "Orders report",
        value: "Type column + quick + advanced (is / is-not) type filters",
        where: "WooCommerce → Analytics → Orders (Pro)",
      },
      {
        setting: "Revenue report",
        value: "Subs Renew · Subs Upgrade · Credit Purchase revenue cards",
        where: "WooCommerce → Analytics → Revenue",
      },
      {
        setting: "Products / Variations",
        value: "‘Subscription only’ filter",
        where: "WooCommerce → Analytics",
      },
      {
        setting: "Customers",
        value: "Member Details link per customer",
        where: "WooCommerce → Analytics → Customers",
      },
    ],
    outcomes: [
      "Separate renewal, upgrade, and one-off revenue.",
      "Filter any orders report by subscription order type.",
      "Report on subscription products/variations only.",
      "Jump from a customer to their member profile.",
    ],
    bestFor: [
      "Accurate subscription revenue reporting",
      "Finance separating recurring vs one-off",
      "Product teams analyzing subscription lines",
    ],
    steps: [
      {
        title: "Open the extended reports",
        description:
          "With Pro active, the Type column/filters and revenue cards appear automatically across WooCommerce → Analytics (Orders, Revenue, Products, Variations, Customers).",
        manual: M.wcAnalytics,
      },
      {
        title: "Filter and read subscription revenue",
        description:
          "Use the Type filters (quick or advanced is/is-not) and the Subs Renew / Upgrade / Credit revenue cards to isolate subscription revenue.",
        manual: M.wcAnalytics,
      },
    ],
    notes: [
      "Applying a type or subscription-only filter recalculates standard WooCommerce totals to the filtered set.",
      "Works with both HPOS and legacy order storage; multiple filters combine with AND by default (add match=any for OR).",
      "Run the order-type backfill once so pre-Pro orders are classified.",
    ],
    faq: [
      {
        question: "Can I see renewal revenue separately from new sales?",
        answer:
          "Yes. The Revenue report adds Subs Renew, Subs Upgrade, and Credit Purchase cards, and the Orders report can filter to each type.",
      },
      {
        question: "Can I report on subscription products only?",
        answer:
          "Yes. The Products and Variations reports add a ‘Subscription only’ filter.",
      },
    ],
    relatedFeatures: ["analytics", "manage-subscriptions", "member-insight"],
    relatedRecipes: ["coupon-promo-insights", "track-mrr-growth", "product-customer-leaderboards"],
  },
  {
    slug: "reports-hub-directory",
    group: "analytics-growth",
    icon: Compass,
    name: "The reports hub",
    cardDescription:
      "One directory linking every report and data screen — find the metric you need without hunting through menus. Free.",
    tier: "Free",
    seoTitle: "ArraySubs Reports Hub — Every Subscription Report in One Place",
    metaDescription:
      "The ArraySubs Reports Hub is a free directory linking every subscription report and data screen, organized by category. Find the metric you need fast.",
    h1: "Every report, one directory",
    heroSubtitle:
      "Stop hunting through menus — the Reports Hub indexes every report and data screen, organized by category, so you find the right metric fast.",
    heroHighlights: ["40+ reports indexed", "12 categories", "Free directory"],
    intro:
      "As your data grows, ==finding the right report== matters. The ==Reports Hub (Free)== — ArraySubs → Reports — is a ==central directory== that links every report and data screen across the ecosystem, ==organized into 12 categories== (performance, leaderboards, retention, orders, revenue, members, store credit, audit logs, and more). Pro reports are listed too, so you can see what’s available. This recipe is your map.",
    settings: [
      {
        setting: "Where",
        value: "ArraySubs → Reports (Free)",
        where: "Admin",
      },
      {
        setting: "Contents",
        value: "40+ report links across 12 categories",
        where: "Reports Hub",
      },
      {
        setting: "Each card",
        value: "Title · description · Free/Pro badge · link",
        where: "Reports Hub",
      },
    ],
    outcomes: [
      "Find any report fast from one directory.",
      "See free and Pro reports side by side.",
      "Jump straight to the data screen you need.",
      "Discover reports you didn’t know existed.",
    ],
    bestFor: [
      "Teams navigating a growing report set",
      "Onboarding new staff to the data",
      "Discovering available analytics",
    ],
    steps: [
      {
        title: "Open the Reports Hub",
        description:
          "Go to ArraySubs → Reports — a directory page (it links out to live reports rather than showing data inline).",
        manual: M.reportsHub,
      },
      {
        title: "Jump to a report",
        description:
          "Browse by category or use the quick-nav pills, then click any card to open the actual report.",
        manual: M.reportsHub,
      },
    ],
    notes: [
      "The hub is a launchpad — it links to reports, it doesn’t render charts itself.",
      "Pro report cards appear even without Pro so you can see the upgrade value.",
      "Free categories include Retention Analytics and Subscriptions; most others are Pro.",
    ],
    faq: [
      {
        question: "Does the Reports Hub need Pro?",
        answer:
          "No. The hub itself is free and lists free reports (like Retention Analytics and Subscriptions) alongside the Pro reports.",
      },
      {
        question: "Does the hub show the data?",
        answer:
          "No — it’s a directory that links to each report’s live screen, organized into 12 categories.",
      },
    ],
    relatedFeatures: ["analytics", "retention-analytics", "manage-subscriptions"],
    relatedRecipes: ["track-mrr-growth", "retention-analytics-insights", "subscription-revenue-reports"],
  },
  {
    slug: "activity-audit-trail",
    group: "analytics-growth",
    icon: ScrollText,
    name: "Activity audit trail",
    cardDescription:
      "Know who changed what — a searchable log of every subscription, settings, payment, and access change. Protect the business as you scale.",
    tier: "Pro",
    seoTitle: "Subscription Activity Audit Trail on WooCommerce (Pro)",
    metaDescription:
      "Track who changed what across subscriptions, settings, payments, and access with the ArraySubs Pro activity audit trail — by admin, customer, system, or gateway. Details inside.",
    h1: "Know who changed what",
    heroSubtitle:
      "Scaling a team means accountability — a searchable trail of every change, by admin, customer, system, or gateway, with before/after values.",
    heroHighlights: ["Who · what · when", "Before/after diffs", "Filter & search"],
    intro:
      "As a subscription business ==grows a team==, you need ==accountability==. ==Activity Audits (Pro)== record ==every action== across subscriptions, members, products, orders, coupons, emails, and settings — tagged by ==author (System/Admin/Customer/Gateway)== and ==entity type==, with a ==before/after diff== of what changed. This recipe gives you the audit trail to scale safely.",
    settings: [
      {
        setting: "Where",
        value: "ArraySubs → Audits → Activity Audits (Pro)",
        where: "Admin",
      },
      {
        setting: "Author roles",
        value: "System · Admin · Customer · Gateway",
        where: "Audit entry",
      },
      {
        setting: "Filters",
        value: "Author role · entity type · date range · search",
        where: "Activity Audits",
      },
      {
        setting: "Change details",
        value: "Field-level previous vs changed values",
        where: "Audit entry → changes",
      },
    ],
    outcomes: [
      "See who changed what, when, and to which record.",
      "Inspect field-level before/after diffs.",
      "Filter by author, entity, date, or keyword.",
      "Accountability and traceability as you scale.",
    ],
    bestFor: [
      "Teams with multiple admins/support staff",
      "Compliance and dispute investigation",
      "Tracing an unexpected change",
    ],
    steps: [
      {
        title: "Open Activity Audits",
        description:
          "Go to ArraySubs → Audits → Activity Audits (Pro). The Audits menu appears only with Pro active.",
        manual: M.activityAudits,
      },
      {
        title: "Filter and inspect",
        description:
          "Filter by author role, entity type, date, or search; click ‘changes →’ on an entry to see field-level previous vs new values.",
        manual: M.activityAudits,
      },
    ],
    notes: [
      "Subscription, member, order, and system entries are always recorded; product/coupon/email/settings logging can be toggled.",
      "Entries persist indefinitely; there’s no CSV/JSON export.",
      "Actions before Pro activation aren’t retroactively logged.",
    ],
    faq: [
      {
        question: "Can I see exactly what a field changed from and to?",
        answer:
          "Yes. The ‘changes →’ link on an entry opens a diff showing each changed field’s previous and new value.",
      },
      {
        question: "Who can trigger logged actions?",
        answer:
          "Entries are tagged by author: System (jobs), Admin, Customer (portal), or Gateway (webhook) — so you always know the source.",
      },
    ],
    relatedFeatures: ["audits-and-logs", "manage-subscriptions", "member-insight"],
    relatedRecipes: ["scheduled-job-monitor", "gateway-health-monitor", "subscription-notes-timeline"],
  },
  {
    slug: "scheduled-job-monitor",
    group: "analytics-growth",
    icon: Timer,
    name: "Monitor background jobs",
    cardDescription:
      "Watch renewals, trial conversions, and reminders run — catch a failed job before it costs you revenue.",
    tier: "Pro",
    seoTitle: "Scheduled-Job Logs for Subscriptions on WooCommerce (Pro)",
    metaDescription:
      "Monitor ArraySubs background jobs — renewals, trial conversions, reminders, status changes — with Pro Scheduled-Job Logs, and catch failures before they cost revenue.",
    h1: "Monitor the jobs that bill your customers",
    heroSubtitle:
      "Your revenue runs on background jobs — watch renewals, trial conversions, and reminders succeed, and catch failures fast.",
    heroHighlights: ["Renewal & trial jobs", "Success / failed status", "Protect revenue"],
    intro:
      "Recurring revenue depends on ==background jobs== — renewals, trial conversions, overdue checks, reminder emails. ==Scheduled-Job Logs (Pro)== record ==every ArraySubs job run== with ==Success/Failed status==, the job label, linked subscription, and any error. This recipe lets you ==catch a failing renewal job before it quietly costs you revenue==.",
    settings: [
      {
        setting: "Where",
        value: "ArraySubs → Audits → Scheduled-Job Logs (Pro)",
        where: "Admin",
      },
      {
        setting: "Logged jobs",
        value: "Renewals · trial conversions · overdue checks · emails · lifecycle · maintenance · gateway",
        where: "Scheduled-Job Logs",
      },
      {
        setting: "Status",
        value: "Success or Failed (failed rows highlighted)",
        where: "Log entry",
      },
      {
        setting: "Per entry",
        value: "Timestamp · job label · linked subscription · error message",
        where: "Log entry",
      },
    ],
    outcomes: [
      "Confirm renewals and conversions are running.",
      "Spot failed jobs immediately (highlighted red).",
      "Jump to the affected subscription from a log row.",
      "Protect revenue by catching automation failures.",
    ],
    bestFor: [
      "Stores relying on automatic renewals",
      "Diagnosing missed renewals or conversions",
      "Revenue-protection monitoring",
    ],
    steps: [
      {
        title: "Open Scheduled-Job Logs",
        description:
          "Go to ArraySubs → Audits → Scheduled-Job Logs (Pro); job logging is always on.",
        manual: M.scheduledJobLogs,
      },
      {
        title: "Scan for failures",
        description:
          "Filter by date and look for red Failed rows; open the linked subscription and read the error to act.",
        manual: M.scheduledJobLogs,
      },
    ],
    notes: [
      "The screen is read-only — to retry a job, use WooCommerce → Status → Scheduled Actions.",
      "Only ArraySubs (`arraysubs_`) jobs are logged; logs persist indefinitely.",
      "A lock-related ‘failed’ entry just means another run was in progress (safety mechanism, retried next run).",
    ],
    faq: [
      {
        question: "How do I know if renewals are actually running?",
        answer:
          "The Scheduled-Job Logs show each renewal job with a Success/Failed status and the linked subscription, so you can confirm or diagnose at a glance.",
      },
      {
        question: "Can I retry a failed job here?",
        answer:
          "Not from this read-only screen — retry from WooCommerce → Status → Scheduled Actions.",
      },
    ],
    relatedFeatures: ["audits-and-logs", "billing-and-renewals", "gateway-health"],
    relatedRecipes: ["activity-audit-trail", "gateway-health-monitor", "lenient-dunning-grace"],
  },
  {
    slug: "gateway-health-monitor",
    group: "analytics-growth",
    icon: HeartPulse,
    name: "Gateway health monitor",
    cardDescription:
      "One screen for gateway status, webhook activity, and per-gateway subscription counts — stop silent revenue leaks.",
    tier: "Pro",
    seoTitle: "Payment Gateway Health Dashboard on WooCommerce (Pro)",
    metaDescription:
      "Monitor Stripe/PayPal/Paddle connection status, webhook event logs, and per-gateway subscription counts with the ArraySubs Pro Gateway Health dashboard. Stop revenue leaks.",
    h1: "Keep the money flowing — gateway health",
    heroSubtitle:
      "A broken webhook can silently stop renewals — monitor every gateway’s status and webhook activity from one screen.",
    heroHighlights: ["Gateway status", "Webhook event log", "Catch silent failures"],
    intro:
      "Automatic revenue depends on ==healthy gateways and working webhooks== — and a broken webhook fails ==silently==. The ==Gateway Health Dashboard (Pro)== shows ==each gateway’s connection status, per-gateway subscription counts, last-webhook timestamp, capabilities, and a webhook event log==. This recipe helps you ==catch a gateway problem before renewals quietly stop==.",
    settings: [
      {
        setting: "Where",
        value: "ArraySubs → Settings → Payment Gateways (Pro)",
        where: "Admin",
      },
      {
        setting: "Per-gateway card",
        value: "Status · subscription count · last webhook · capabilities · webhook URL",
        where: "Gateway Health",
      },
      {
        setting: "Statuses",
        value: "Connected · Connected (Test) · Needs Setup · Disabled · Unavailable",
        where: "Gateway card",
      },
      {
        setting: "Webhook event log",
        value: "Gateway · event ID · type · processed-at (filterable)",
        where: "Gateway Health",
      },
    ],
    outcomes: [
      "Confirm each gateway is connected and receiving webhooks.",
      "See per-gateway active subscription counts.",
      "Catch a stale ‘last webhook’ before renewals fail.",
      "Diagnose missing-renewal incidents fast.",
    ],
    bestFor: [
      "Stores on automatic payments (Stripe/PayPal/Paddle)",
      "After a site migration or URL/SSL change",
      "Diagnosing missing or failed renewals",
    ],
    steps: [
      {
        title: "Open Gateway Health",
        description:
          "Go to ArraySubs → Settings → Payment Gateways (Pro) to see a status card per gateway.",
        manual: M.gatewayHealth,
      },
      {
        title: "Verify status and webhooks",
        description:
          "Confirm each gateway shows Connected, expand for the webhook URL and capabilities, and check the event log and ‘last webhook’ timestamp.",
        manual: M.gatewayHealth,
      },
    ],
    notes: [
      "A ‘last webhook = Never’ or a long-stale timestamp often means a webhook config problem — a common silent cause of missed renewals.",
      "Webhook events are retained ~30 days; the log can’t be cleared manually.",
      "Check after any migration, URL change, SSL update, or gateway config change.",
    ],
    faq: [
      {
        question: "Why did renewals stop without errors?",
        answer:
          "Often a broken webhook after a migration or URL change. Gateway Health shows a stale ‘last webhook’ and the event log so you can spot and fix it.",
      },
      {
        question: "Which gateways does it cover?",
        answer:
          "All registered gateways (Stripe, PayPal, Paddle), including disabled ones, with per-gateway status, capabilities, and webhook history.",
      },
    ],
    relatedFeatures: ["gateway-health", "checkout-and-payments", "billing-and-renewals"],
    relatedRecipes: ["scheduled-job-monitor", "activity-audit-trail", "stripe-automatic-billing-sca"],
  },
];

export const getRecipe = (slug: string): Recipe | undefined =>
  RECIPES.find((recipe) => recipe.slug === slug);

/** Recipes in a given group, in array order. */
export const recipesForGroup = (groupKey: string): Recipe[] =>
  RECIPES.filter((recipe) => recipe.group === groupKey);

/** Recipes that rely on a given feature — powers feature → recipe links. */
export const recipesForFeature = (featureSlug: string): Recipe[] =>
  RECIPES.filter((recipe) => recipe.relatedFeatures.includes(featureSlug));

/** Resolve a manual reference to its absolute docs URL. */
export const manualUrl = (ref: ManualRef): string => `${MANUAL_BASE}${ref.href}`;
