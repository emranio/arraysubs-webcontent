import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Briefcase,
  GraduationCap,
  HandCoins,
  Headphones,
  Monitor,
  Newspaper,
  Package,
  Users,
} from "lucide-react";

/**
 * Single source of truth for the ArraySubs use-case pages. Each use case lists
 * the feature slugs it relies on (`relatedFeatures`); the reverse mapping
 * (which use cases a feature powers) is derived with `useCasesForFeature`, so
 * the cross-links are defined in exactly one place. Copy is written against the
 * manual-aligned feature hub in `../features/_data.ts` (67 modules) and tuned
 * for both human conversion and GEO/AI answer extraction.
 */

export type UseCasePoint = { problem: string; solution: string };
export type UseCaseFaq = { question: string; answer: string };
/** Reusable title + description block for audiences, steps, and playbooks. */
export type UseCaseItem = { title: string; description: string };
export type UseCaseStat = { value: string; label: string };

export type UseCase = {
  slug: string;
  icon: LucideIcon;
  name: string;
  /** Short description for hub cards and feature cross-links. */
  cardDescription: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  /** Short proof points shown under the hero subtitle. */
  heroHighlights: string[];
  /** Definition-style overview paragraph (answerable for GEO/AI extraction). */
  intro: string;
  stats: UseCaseStat[];
  /** "Who it's for" — specific sub-audiences within this business model. */
  audience: UseCaseItem[];
  points: UseCasePoint[];
  /** "How to set it up" — ordered steps. */
  steps: UseCaseItem[];
  /** Concrete example setups a store owner can copy. */
  playbooks: UseCaseItem[];
  outcomes: string[];
  faq: UseCaseFaq[];
  /** Feature slugs this use case relies on, in priority order. */
  relatedFeatures: string[];
};

export const USE_CASES: UseCase[] = [
  {
    slug: "saas-digital-products",
    icon: Monitor,
    name: "SaaS & Digital Products",
    cardDescription:
      "Sell tiered software licenses and usage-based plans — feature-gated entitlements, automatic Stripe/PayPal/Paddle billing, and churn-saving retention.",
    seoTitle: "WooCommerce Subscriptions for SaaS & Digital Products",
    metaDescription:
      "Build a SaaS billing system on WooCommerce — tiered plans, feature-gated entitlements, usage credits, automatic Stripe, PayPal, and Paddle billing, dunning recovery, and retention flows in one plugin.",
    h1: "Sell SaaS & digital products with recurring billing",
    heroSubtitle:
      "Turn WooCommerce into a full SaaS billing engine — tiered plans, feature entitlements, usage credits, and automatic recurring payments, all on infrastructure you already own.",
    heroHighlights: [
      "Tiered plans & per-plan entitlements",
      "Usage credits & prepaid top-ups",
      "Automatic Stripe, PayPal & Paddle billing",
    ],
    intro:
      "SaaS vendors, plugin shops, and API platforms need four things in one place: ==recurring billing, feature-gated entitlements, usage limits, and churn prevention==. Most teams bolt together a payment gateway, an entitlements hack, a metering script, and a separate cancellation survey — then spend months keeping them in sync. ArraySubs turns WooCommerce into a ==complete SaaS billing engine== instead. Build Basic, Pro, and Enterprise as variable Subscription Products, define exactly what each tier unlocks with Feature Manager, meter usage with Store Credit wallets, collect payments automatically through ==First-Class Stripe Support, PayPal, or Paddle==, recover failed charges with Auto-Retry and a 2-Phase Grace Period, and intercept cancellations with the Retention Flow Builder — all from one plugin, with ==no per-transaction billing-platform fees==.",
    stats: [
      { value: "3-tier", label: "Basic / Pro / Enterprise" },
      { value: "MRR", label: "Churn & ARPU tracked" },
      { value: "3", label: "Automatic gateways" },
      { value: "<10 min", label: "To first live plan" },
    ],
    audience: [
      {
        title: "Plugin & theme shops",
        description:
          "Sell license tiers with per-plan feature limits, automatic renewals, and update access on your own store.",
      },
      {
        title: "API & developer platforms",
        description:
          "Meter API calls or compute with Store Credit tokens and prepaid top-ups, and gate docs by plan.",
      },
      {
        title: "Web apps & micro-SaaS",
        description:
          "Run Basic/Pro/Enterprise tiers with free trials, proration, and a self-service billing portal.",
      },
      {
        title: "Digital tools & downloads",
        description:
          "Bundle premium downloads and updates behind a subscription with Feature Manager entitlements.",
      },
    ],
    points: [
      {
        problem: "Customers don't know which features their plan includes.",
        solution:
          "Feature Manager defines per-plan entitlements — toggles, numeric limits, and text details — and renders a 'What's included' list on the product page so upgrades feel confident. Feature-Based Conditions then gate access to those entitlements.",
      },
      {
        problem: "Failed payments cancel accounts silently.",
        solution:
          "A 2-Phase Grace Period keeps access active while Auto-Retry Failed Payments recharges the card, then Auto-Downgrade on Failure moves the account to a cheaper tier instead of cancelling — recovering revenue you'd otherwise lose.",
      },
      {
        problem: "Usage-based billing is hard to model in WooCommerce.",
        solution:
          "Store Credit acts as a prepaid token wallet — customers buy top-ups (with an optional bonus percentage), and Feature Manager numeric limits enforce quotas like '100 API calls' for pay-as-you-go or prepaid plans.",
      },
      {
        problem: "Upgrades, downgrades, and proration get messy.",
        solution:
          "Plan Switching offers 3 proration methods — charge immediately, apply at the next renewal, or no proration — so customers change tiers instantly with the math handled automatically.",
      },
      {
        problem: "Churn insight lives in a separate tool.",
        solution:
          "The Retention Flow Builder captures why customers leave and which offers save them, Retention Analytics scores each offer, and Analytics surfaces MRR, churn rate, and ARPU — all in the same plugin.",
      },
      {
        problem: "Trials leak revenue when cards fail at conversion.",
        solution:
          "First-Class Stripe Support stores the card with a SetupIntent during a $0 Free Trial and charges off-session at conversion with full SCA/3DS handling, so trials convert cleanly instead of failing.",
      },
    ],
    steps: [
      {
        title: "Run the Easy Setup Wizard",
        description:
          "Choose the SaaS profile and ArraySubs preconfigures billing, grace periods, and checkout for software.",
      },
      {
        title: "Create your plan tiers",
        description:
          "Build Basic, Pro, and Enterprise as variable Subscription Products with their own cycles, trials, and prices.",
      },
      {
        title: "Define entitlements",
        description:
          "Use Feature Manager to set per-plan toggles and numeric limits, then show 'What's included' on each product.",
      },
      {
        title: "Connect automatic payments",
        description:
          "Add First-Class Stripe Support, PayPal, or Paddle for hands-off recurring billing with SCA/3DS support.",
      },
      {
        title: "Turn on retention & analytics",
        description:
          "Enable the Retention Flow Builder and watch MRR, churn, and trial conversion in Analytics.",
      },
    ],
    playbooks: [
      {
        title: "Freemium with paid upgrades",
        description:
          "A free tier with limited Feature Manager entitlements, a $29/mo Pro that unlocks advanced features, and a 14-day trial that auto-converts through Stripe.",
      },
      {
        title: "Usage-based API plan",
        description:
          "A base subscription plus prepaid Store Credit top-ups, with Feature Manager enforcing a monthly call quota and Feature-Based Conditions gating the dashboard.",
      },
      {
        title: "Three-tier developer license",
        description:
          "Basic, Pro, and Agency tiers gated by Feature Manager, with Plan Switching and proration as customers grow, plus annual Fixed-Date licensing windows.",
      },
    ],
    outcomes: [
      "Reduce churn with retention flows that offer discounts or downgrades at cancellation.",
      "Grow MRR with Feature Manager upsells and Store Credit usage top-ups in one system.",
      "Scale with automatic Stripe, PayPal, and Paddle billing — no manual invoicing.",
      "Build trust by showing exactly what each tier includes on the product page.",
      "Track MRR, churn, ARPU, and trial conversion in real time.",
    ],
    faq: [
      {
        question: "Can I run a credits-based usage model on WooCommerce?",
        answer:
          "Yes. Use Store Credit (Pro) as a prepaid token wallet — customers buy top-ups with an optional bonus percentage — and Feature Manager numeric limits (like '100 API calls') enforce quotas for pay-as-you-go or prepaid models.",
      },
      {
        question: "What happens when an automatic payment fails?",
        answer:
          "A 2-Phase Grace Period keeps the account active while Auto-Retry Failed Payments (Pro) recharges the card; if it still fails, Auto-Downgrade on Failure (Pro) moves the customer to a cheaper plan instead of cancelling, saving the revenue.",
      },
      {
        question: "How do I gate features per plan?",
        answer:
          "Member Access gates pages, downloads, and URLs by plan, and Feature Manager (Pro) with Feature-Based Conditions defines per-plan toggles, numeric limits, and text details shown on the product page.",
      },
      {
        question: "Does ArraySubs replace a dedicated billing platform?",
        answer:
          "For most WooCommerce-based SaaS, yes. ArraySubs runs recurring billing, entitlements, metering, dunning, and retention on your own store — without a separate billing service or its per-transaction fees.",
      },
      {
        question: "Can I offer monthly and annual pricing?",
        answer:
          "Yes. A variable Subscription Product can expose monthly and annual options, each with its own price and trial, and customers switch between them with automatic proration.",
      },
      {
        question: "How do trials and SCA / 3D Secure work together?",
        answer:
          "First-Class Stripe Support (Pro) uses a SetupIntent to securely store a card during a $0 trial, then charges off-session at conversion with full SCA/3DS compliance.",
      },
      {
        question: "Can I gate documentation or premium downloads by plan?",
        answer:
          "Yes. Member Access restricts pages, posts, URL paths, and Restricted Downloads by subscription or plan, so premium docs and assets are visible only to the right tiers.",
      },
    ],
    relatedFeatures: [
      "subscription-products",
      "feature-manager",
      "feature-based-conditions",
      "member-access",
      "stripe-payments",
      "paddle-payments",
      "auto-retry-failed-payments",
      "auto-downgrade-on-failure",
      "plan-switching",
      "store-credit",
      "retention-and-refunds",
      "analytics",
      "easy-setup-wizard",
      "checkout-page-builder",
      "customer-chosen-subscription-duration",
    ],
  },
  {
    slug: "membership-sites",
    icon: Users,
    name: "Membership Sites",
    cardDescription:
      "Run gated communities and premium libraries — tiered access, content dripping, role mapping, and self-service member management.",
    seoTitle: "Build a Membership Site on WooCommerce",
    metaDescription:
      "Build a complete WooCommerce membership site — restrict content by tier with 10+ access conditions, drip course material, map roles automatically, run recurring billing, and give members a self-service portal.",
    h1: "Build a complete WooCommerce membership site",
    heroSubtitle:
      "Recurring billing, precise content access, member tiers, and scheduled content dripping — all in one plugin with a generous free core, configured in minutes by a guided wizard.",
    heroHighlights: [
      "10+ access conditions, AND/OR logic",
      "Scheduled content dripping",
      "Self-service member portal",
    ],
    intro:
      "Membership sites live or die on four things working together: ==recurring billing, precise content access, member tiers, and scheduled content==. Stitch those from separate plugins and you get conflicts, role mismatches, and members emailing you to make every change. ArraySubs does ==all four in one plugin==. Build Silver, Gold, and Platinum plans as variable Subscription Products, gate pages, posts, any CPT, URL paths, and Restricted Downloads with a ==10+ condition Member Access engine== that supports nested AND/OR logic, drip content on a schedule, and ==map WordPress roles automatically== so the rest of your stack honors your tiers. Members manage their own subscriptions in the Customer Portal, and the Easy Setup Wizard configures the whole thing in minutes.",
    stats: [
      { value: "10+", label: "Access conditions" },
      { value: "AND/OR", label: "Nested rule logic" },
      { value: "Free", label: "Core, forever" },
      { value: "<10 min", label: "To first live tier" },
    ],
    audience: [
      {
        title: "Coaching & community sites",
        description:
          "Gate courses, calls, and community spaces behind monthly or annual tiers with automatic role mapping.",
      },
      {
        title: "Premium content libraries",
        description:
          "Restrict articles, videos, and downloads by plan and drip new material on a schedule.",
      },
      {
        title: "Resource & template vaults",
        description:
          "Sell access to a growing library with member-only pricing and gated Restricted Downloads.",
      },
      {
        title: "Associations & nonprofits",
        description:
          "Run recurring memberships with role-based perks and Fixed-Date annual cohorts.",
      },
    ],
    points: [
      {
        problem: "Building tiers with different access levels is complex.",
        solution:
          "Variable Subscription Products define per-tier billing and trials; Member Access gates content precisely with the Advanced Condition Builder and nested AND/OR rules across subscription, role, product, and spend conditions.",
      },
      {
        problem: "You want to release material over time, not all at once.",
        solution:
          "Content Dripping releases gated posts, lessons, and downloads on a schedule — by days-since-join or fixed calendar date — ideal for phased courses or weekly exclusives.",
      },
      {
        problem: "Other plugins don't respect your membership logic.",
        solution:
          "Role-Based Conditions assign and remove WordPress roles by subscription status, so third-party plugins and themes honor your tiers automatically.",
      },
      {
        problem: "Members email you to upgrade, pause, or cancel.",
        solution:
          "The Customer Portal hands Skip Next Renewal, Pause / Vacation Mode, Plan Switching, cancel, and invoice payment to members — cutting support tickets.",
      },
      {
        problem: "Payment failures quietly lose members.",
        solution:
          "A 2-Phase Grace Period keeps access active while collecting payment; Pro adds Auto-Retry Failed Payments and Auto-Downgrade on Failure.",
      },
      {
        problem: "Shared logins erode per-seat revenue.",
        solution:
          "Multi-Login Prevention (Pro) caps concurrent sessions per account with plan-level overrides, so one membership can't be spread across a whole team.",
      },
    ],
    steps: [
      {
        title: "Run the membership wizard",
        description:
          "Pick the Membership profile in the Easy Setup Wizard to preconfigure access control, billing, and the portal.",
      },
      {
        title: "Create tier plans",
        description:
          "Build Silver/Gold/Platinum as variable Subscription Products with per-tier pricing and trials.",
      },
      {
        title: "Gate your content",
        description:
          "Add Member Access rules to restrict pages, posts, CPTs, downloads, and URLs by plan, with AND/OR logic.",
      },
      {
        title: "Schedule dripping",
        description:
          "Release modules or exclusives over time with Content Dripping by days-since-join or fixed date.",
      },
      {
        title: "Enable portal & retention",
        description:
          "Let members self-serve in the Customer Portal and intercept cancellations with the Retention Flow Builder.",
      },
    ],
    playbooks: [
      {
        title: "Three-tier coaching community",
        description:
          "Silver (community), Gold (+ group calls), Platinum (+ 1:1), with Role-Based Conditions mapping tiers into a forum plugin.",
      },
      {
        title: "Dripped course membership",
        description:
          "A monthly plan that drips one module per week with Content Dripping, a Free Trial, and a Lifetime Deal upgrade.",
      },
      {
        title: "Members-only resource vault",
        description:
          "Annual access to a Restricted Downloads library with member pricing and Multi-Login Prevention.",
      },
    ],
    outcomes: [
      "Restrict content with surgical precision across pages, posts, CPTs, downloads, and URLs.",
      "Cut support overhead with a self-service Customer Portal.",
      "Raise lifetime value by offering pauses and downgrades instead of losing members.",
      "Release content on your schedule with Content Dripping.",
      "Automate billing with flexible cycles, trials, and sign-up fees.",
    ],
    faq: [
      {
        question: "Can I run memberships without recurring billing?",
        answer:
          "Yes. Create Fixed-Date or Lifetime Deal membership products for one-time access, or use the Member Access system on its own — subscription billing is optional.",
      },
      {
        question: "How do I stop members sharing logins?",
        answer:
          "Multi-Login Prevention (Pro) detects concurrent sessions and enforces a session limit per subscription, with plan-level overrides, protecting per-seat revenue.",
      },
      {
        question: "Can each tier have its own member discount?",
        answer:
          "Yes. Member Discounts apply tier-specific pricing across your store, and variable Subscription Products let you build multiple tier levels.",
      },
      {
        question: "Can I combine free and paid membership tiers?",
        answer:
          "Yes. Create a free tier with limited access and paid tiers that unlock more, then gate content per plan with Member Access rules.",
      },
      {
        question: "Does it work with my page builder?",
        answer:
          "Yes. Member Access works with Gutenberg and Elementor natively — the Elementor Container Restriction gates any Container from its Advanced tab, the Gutenberg Block Restriction wraps nested blocks, and Shortcodes gate inline content anywhere else.",
      },
      {
        question: "Can members pause instead of cancelling?",
        answer:
          "Yes. The Customer Portal offers Pause / Vacation Mode and Skip Next Renewal, and the Retention Flow Builder can present a pause or downgrade at cancellation to keep members.",
      },
      {
        question: "How do I drip content fairly for members who join later?",
        answer:
          "Content Dripping schedules visibility relative to each member's join date, so everyone sees material on the same cadence regardless of when they joined.",
      },
    ],
    relatedFeatures: [
      "member-access",
      "content-dripping",
      "subscription-products",
      "customer-portal",
      "cpt-content-restrictions",
      "restricted-downloads",
      "elementor-content-restrictions",
      "advanced-condition-builder",
      "profile-builder",
      "my-account-page-builder",
      "shortcodes",
      "fixed-date-subscriptions",
      "retention-and-refunds",
    ],
  },
  {
    slug: "subscription-boxes",
    icon: Package,
    name: "Subscription Boxes",
    cardDescription:
      "Recurring physical-product deliveries — flexible cycles, skip & pause, synced batch shipping, and churn-saving retention offers.",
    seoTitle: "Run a WooCommerce Subscription Box Business",
    metaDescription:
      "Run a subscription box on WooCommerce — recurring billing, skip & pause from the portal, Flexible Renewal Sync for batch shipping, recurring shipping charges, retention offers, and tiered box plans.",
    h1: "Run a subscription box business on WooCommerce",
    heroSubtitle:
      "Recurring billing for physical products, with skip & pause, synced batch-shipping renewals, and retention flows that keep subscribers from churning.",
    heroHighlights: [
      "Skip & pause from the portal",
      "Synced renewals for batch shipping",
      "Retention offers at cancellation",
    ],
    intro:
      "Subscription box businesses have a different shape of problem: recurring physical shipments, customers who need to pause for a month, and churn driven by shipping costs or changing tastes. ArraySubs is built for it. Configure box plans with weekly, monthly, or quarterly cycles and per-tier pricing as variable Subscription Products, let customers ==Skip Next Renewal or use Pause / Vacation Mode== from the Customer Portal, ==sync renewals so every box ships on the same day== with Flexible Renewal Sync, add recurring Subscription Shipping charges, and intercept cancellations with a ==discount, pause, or downgrade== from the Retention Flow Builder. The free core handles products, billing, skip, pause, and retention, and the Easy Setup Wizard gets most box stores live in ==under ten minutes==.",
    stats: [
      { value: "4+", label: "Billing cycles" },
      { value: "Same-day", label: "Synced batch shipping" },
      { value: "4", label: "Retention offers" },
      { value: "<10 min", label: "To first live box" },
    ],
    audience: [
      {
        title: "Food & beverage clubs",
        description:
          "Monthly snack, coffee, or wine boxes with Pause / Vacation Mode for travel and holidays.",
      },
      {
        title: "Beauty & lifestyle boxes",
        description:
          "Curated monthly boxes with basic, premium, and deluxe variable tiers.",
      },
      {
        title: "Hobby & collectible crates",
        description:
          "Themed monthly or quarterly crates with Skip Next Renewal and limited-length runs.",
      },
      {
        title: "Replenishment & essentials",
        description:
          "Recurring deliveries of consumables with flexible cadence and synced renewals.",
      },
    ],
    points: [
      {
        problem: "Customers have no way to pause or skip a month.",
        solution:
          "The Customer Portal offers Skip Next Renewal and Pause / Vacation Mode, so subscribers flex their delivery instead of cancelling.",
      },
      {
        problem: "Cancellations are unpredictable.",
        solution:
          "The Retention Flow Builder asks why they're leaving and offers a discount, pause, or downgrade on the spot, and Retention Analytics shows which offers work.",
      },
      {
        problem: "Payment failures cause silent cancellations.",
        solution:
          "A 2-Phase Grace Period keeps the box active while retrying; Pro adds Auto-Retry Failed Payments and Auto-Downgrade on Failure instead of losing them.",
      },
      {
        problem: "Variable renewal dates make shipping chaotic.",
        solution:
          "Flexible Renewal Sync (Pro) batches all renewals to the same calendar day, so you fulfill and ship in one run instead of trickling boxes out all month.",
      },
      {
        problem: "You need basic, premium, and deluxe boxes with shipping.",
        solution:
          "Variable Subscription Products give each box tier its own cycle, sign-up fee, and renewal price, and Subscription Shipping (Pro) adds recurring shipping charges per plan.",
      },
      {
        problem: "You want to sell prepaid multi-month runs.",
        solution:
          "Set a subscription length (number of cycles) so a 3-, 6-, or 12-box run ends automatically, or use Different Renewal Price to change the price after the intro box.",
      },
    ],
    steps: [
      {
        title: "Run the box wizard",
        description:
          "Pick the Subscription Box profile in the Easy Setup Wizard to set lenient grace and skip/pause defaults.",
      },
      {
        title: "Create box plans",
        description:
          "Build basic/premium/deluxe as variable Subscription Products with their own cycles, prices, and shipping.",
      },
      {
        title: "Turn on skip & pause",
        description:
          "Enable Skip Next Renewal and Pause / Vacation Mode in the portal so subscribers flex instead of cancelling.",
      },
      {
        title: "Sync renewals",
        description:
          "Use Flexible Renewal Sync to batch all renewals to one calendar day so fulfillment ships in a single run.",
      },
      {
        title: "Add retention offers",
        description:
          "Configure discount, pause, and downgrade offers in the Retention Flow Builder to intercept cancellations.",
      },
    ],
    playbooks: [
      {
        title: "Monthly snack club",
        description:
          "A single monthly box with Skip Next Renewal for travel, Flexible Renewal Sync to the 1st, and a 'pause' retention offer.",
      },
      {
        title: "Tiered beauty box",
        description:
          "Basic/Premium/Deluxe variations with Subscription Shipping, an annual prepaid option, and a downgrade offer at cancel.",
      },
      {
        title: "Quarterly collectible crate",
        description:
          "A quarterly cycle with a limited subscription length and Skip Next Renewal controls between drops.",
      },
    ],
    outcomes: [
      "Cut churn with skip and pause options and cancellation interception.",
      "Simplify fulfillment by batching shipments with Flexible Renewal Sync.",
      "Recover failed payments with a 2-phase grace period before cancelling.",
      "Raise lifetime value by offering downgrades over cancellation.",
      "Scale with automatic billing and self-service management.",
    ],
    faq: [
      {
        question: "Can customers pause without losing their place?",
        answer:
          "Yes. The Customer Portal lets subscribers use Pause / Vacation Mode indefinitely and reactivate anytime — the box won't ship until they restart, perfect for vacations or budgets.",
      },
      {
        question: "How do I ship all boxes on the same day?",
        answer:
          "Flexible Renewal Sync (Pro) aligns renewal dates to a chosen calendar day, so every box renews together and your team ships one batch instead of fulfilling all month.",
      },
      {
        question: "Which billing cycles are supported?",
        answer:
          "Daily, weekly, monthly, or yearly, with an interval of 1–12 (so quarterly is every 3 months), plus optional sign-up fees and different renewal prices — and per-tier cycles via variable subscriptions.",
      },
      {
        question: "Can I offer prepaid 3, 6, or 12-month plans?",
        answer:
          "Yes. Set a subscription length (number of cycles) or use yearly billing with a sign-up fee to sell prepaid box runs that end automatically.",
      },
      {
        question: "Can I charge shipping on every box?",
        answer:
          "Yes. Boxes use WooCommerce's native shipping, and Subscription Shipping (Pro) adds one-time or recurring shipping charges to each renewal.",
      },
      {
        question: "Can customers swap to a different box tier?",
        answer:
          "Yes. Plan Switching lets them upgrade or downgrade between box tiers with proration, right from the Customer Portal.",
      },
      {
        question: "Does it run on HPOS high-performance order storage?",
        answer:
          "Yes. ArraySubs declares full HPOS (custom order tables) compatibility, so it works on stores using WooCommerce's high-performance order storage.",
      },
    ],
    relatedFeatures: [
      "subscription-products",
      "subscription-shipping",
      "renewal-sync",
      "skip-next-renewal",
      "pause-vacation-mode",
      "customer-portal",
      "billing-and-renewals",
      "different-renewal-price",
      "coupons",
      "woocommerce-manual-payments",
      "early-renew",
      "retention-and-refunds",
      "emails",
    ],
  },
  {
    slug: "online-courses",
    icon: GraduationCap,
    name: "Online Courses",
    cardDescription:
      "Sell courses with subscription access — drip modules, tiered lesson access, student portals, and recurring billing without a heavy LMS.",
    seoTitle: "Sell Online Courses with Subscription Access on WooCommerce",
    metaDescription:
      "Build a course membership on WooCommerce — drip modules over time, gate lessons by tier, gate Restricted Downloads, give students a portal, and run recurring billing without a heavy LMS for basic setups.",
    h1: "Sell online courses with subscription access",
    heroSubtitle:
      "Drip modules over weeks, gate lessons by tier, and let students manage their own plans — ArraySubs handles billing and access without a heavy LMS.",
    heroHighlights: [
      "Drip modules over time",
      "Tiered lesson access",
      "Student self-service portal",
    ],
    intro:
      "Subscription-based courses need three things a plain cart can't give you: ==scheduled content release, tiered access, and a student portal== for lifetime management. ArraySubs supplies the billing and access layer so you don't need a ==heavy LMS== for a straightforward course. ==Drip modules by days-since-enrollment== with Content Dripping so learners can't binge ahead, build Free, Basic, and Premium tiers as variable Subscription Products, gate advanced lessons and Restricted Downloads by plan with Member Access, let students upgrade or downgrade themselves with Plan Switching, and use the ==Retention Flow Builder to save students== who try to cancel mid-course. Pair it with your page builder's lesson layouts — gated by Elementor Container or Gutenberg Block Restriction — for a complete course membership.",
    stats: [
      { value: "Drip", label: "Scheduled modules" },
      { value: "3-tier", label: "Free / Basic / Premium" },
      { value: "ARPU", label: "& churn tracked" },
      { value: "Free", label: "Core, forever" },
    ],
    audience: [
      {
        title: "Independent course creators",
        description:
          "Sell a flagship course as a subscription with dripped modules and a community tier.",
      },
      {
        title: "Cohort & coaching programs",
        description:
          "Run time-released curricula with Plan Switching upgrades to group or 1:1 coaching.",
      },
      {
        title: "Tutoring & test prep",
        description:
          "Gate practice sets and lessons by plan and track conversion from free to paid in Analytics.",
      },
      {
        title: "Certification & CE providers",
        description:
          "Offer annual access tiers with Fixed-Date or renewing enrollment.",
      },
    ],
    points: [
      {
        problem: "You release modules over time but can't enforce it.",
        solution:
          "Content Dripping schedules lessons by days-since-purchase or fixed dates, pacing your curriculum without code.",
      },
      {
        problem: "Free and paid tiers need different access.",
        solution:
          "Variable Subscription Products create Free, Basic, and Premium tiers; Member Access unlocks advanced modules, CPT lessons, and Restricted Downloads by plan.",
      },
      {
        problem: "Students want to upgrade mid-course.",
        solution:
          "Plan Switching upgrades with automatic proration, or downgrades to a cheaper tier to keep them enrolled.",
      },
      {
        problem: "Payment failures drop students without warning.",
        solution:
          "A 2-Phase Grace Period keeps access active while retrying; Pro can Auto-Downgrade on Failure to a free tier instead of cancelling.",
      },
      {
        problem: "You don't know which content retains students.",
        solution:
          "Analytics show trial conversion, churn, and drop-off by plan so you can improve pacing and packaging.",
      },
      {
        problem: "You want a free intro that converts to paid.",
        solution:
          "Offer a Free Trial or free tier that unlocks the first module, use Partial Content Restriction to tease locked lessons, then gate the rest behind a paid plan with one-click upgrade.",
      },
    ],
    steps: [
      {
        title: "Run the setup wizard",
        description:
          "Choose a content or membership profile in the Easy Setup Wizard to configure access control and billing for courses.",
      },
      {
        title: "Create course tiers",
        description:
          "Build Free/Basic/Premium as variable Subscription Products with trials and prices.",
      },
      {
        title: "Drip your modules",
        description:
          "Schedule lessons by days-since-purchase with Content Dripping so the curriculum unlocks on your cadence.",
      },
      {
        title: "Gate advanced lessons",
        description:
          "Restrict premium modules and Restricted Downloads by plan with Member Access rules.",
      },
      {
        title: "Enable portal & analytics",
        description:
          "Let students manage plans in the Customer Portal and track trial conversion, churn, and ARPU in Analytics.",
      },
    ],
    playbooks: [
      {
        title: "Dripped flagship course",
        description:
          "A monthly plan that releases one module per week with Content Dripping, a free first lesson, and an annual discount.",
      },
      {
        title: "Freemium-to-premium ladder",
        description:
          "A free tier with intro lessons, a Basic tier for the full course, and a Premium tier with coaching, connected by Plan Switching.",
      },
      {
        title: "Cohort program with upgrades",
        description:
          "A Fixed-Date enrollment with a mid-course upgrade to a 1:1 tier via Plan Switching.",
      },
    ],
    outcomes: [
      "Control pacing with dripped modules — no rushing, no giving everything away at signup.",
      "Monetize free, basic, and premium tiers with automatic per-tier access.",
      "Reduce drop-off by pausing or downgrading struggling students.",
      "Track trial conversions, churn, and ARPU per course.",
      "Skip extra LMS costs for basic courses — WooCommerce plus ArraySubs handles billing and access.",
    ],
    faq: [
      {
        question: "Do I need a dedicated LMS?",
        answer:
          "Not for basic courses — ArraySubs handles billing, access, and Content Dripping. For quizzes, certificates, or progress tracking, pair it with a lightweight LMS or your page builder's course features.",
      },
      {
        question: "Can students see their access in the portal?",
        answer:
          "Yes. The Customer Portal shows their active subscription and tier, and Shortcodes can display course-specific details inline.",
      },
      {
        question: "How do I offer lifetime access alongside monthly?",
        answer:
          "Use a Lifetime Deal or Fixed-Date membership product for one-time access, or variable subscriptions with yearly cycles for subscription-based access.",
      },
      {
        question: "Can I add a real LMS later without re-platforming?",
        answer:
          "Yes. ArraySubs controls billing and entitlements; you can layer an LMS on top for quizzes and certificates while ArraySubs keeps managing access.",
      },
      {
        question: "How do early and late students get the same experience?",
        answer:
          "Content Dripping is relative to each student's enrollment date, so everyone progresses through modules on the same schedule no matter when they joined.",
      },
      {
        question: "Can students pay yearly for a discount?",
        answer:
          "Yes. Offer an annual variation at a lower effective price; students switch between monthly and annual with proration.",
      },
    ],
    relatedFeatures: [
      "content-dripping",
      "member-access",
      "subscription-products",
      "restricted-downloads",
      "gutenberg-content-restrictions",
      "customer-portal",
      "plan-switching",
      "proration-methods",
      "free-trials",
      "lifetime-deals",
      "profile-builder",
      "analytics",
    ],
  },
  {
    slug: "content-publishers",
    icon: Newspaper,
    name: "Content Publishers",
    cardDescription:
      "Paywall articles and media by tier — hard or metered paywalls, URL-pattern gating, scheduled exclusives, and conversion analytics.",
    seoTitle: "WooCommerce Paywall & Content Subscriptions for Publishers",
    metaDescription:
      "Monetize content with a WooCommerce paywall — restrict articles, videos, and downloads by tier, build hard or metered paywalls with purchase-history rules, gate by URL pattern, drip exclusives, and track conversions.",
    h1: "Monetize content with subscription paywalls",
    heroSubtitle:
      "Gate premium articles and media by tier — hard or metered paywalls, URL-pattern gating, scheduled exclusives, and conversion analytics, all in one plugin.",
    heroHighlights: [
      "Hard or metered paywall",
      "Exact / prefix / contains / regex URL rules",
      "Conversion & churn analytics",
    ],
    intro:
      "Publishers need a paywall that restricts premium content by tier while keeping free content open — without bolting on a separate paywall service that fights your subscription plugin. ArraySubs is the ==paywall and the subscriptions in one==. Gate articles, any CPT, and URL patterns by plan with Member Access, build a ==metered 'a few free, then subscribe' model== using Product & Purchase Value Conditions, keep teasers indexable with Partial Content Restriction, ==drip exclusive pieces to loyal subscribers== with Content Dripping, and use the Retention Flow Builder to beat paywall fatigue. Analytics show which articles convert readers and which tiers churn, so you can tune pricing and packaging — a complete paywall ==stood up in minutes==.",
    stats: [
      { value: "4", label: "URL match patterns" },
      { value: "Hard/metered", label: "Paywall models" },
      { value: "Drip", label: "Scheduled exclusives" },
      { value: "Free", label: "Core, forever" },
    ],
    audience: [
      {
        title: "News & magazine sites",
        description:
          "Meter free articles with purchase-value rules, then gate premium coverage behind monthly or annual plans.",
      },
      {
        title: "Newsletters & blogs",
        description:
          "Run a paid tier with member-only posts and a full archive gated by plan.",
      },
      {
        title: "Research & data publishers",
        description:
          "Gate reports, datasets, and Restricted Downloads by subscription tier.",
      },
      {
        title: "Niche & trade media",
        description:
          "Offer premium analysis and early access to loyal, recurring subscribers.",
      },
    ],
    points: [
      {
        problem: "You need a hard or a metered paywall.",
        solution:
          "Member Access combines URL Path Rules and CPT restriction with Product & Purchase Value Conditions to build either model — hard-gate everything, or meter a few free reads first — with no code.",
      },
      {
        problem: "Free and premium subscribers see the same content.",
        solution:
          "Member Access rules gate articles by status or plan, so premium tiers unlock exclusive coverage while free readers see the rest.",
      },
      {
        problem: "You want to reward loyal subscribers with exclusives.",
        solution:
          "Content Dripping schedules premium articles weekly or monthly to keep subscribers engaged and reduce churn.",
      },
      {
        problem: "Subscribers cancel from paywall fatigue.",
        solution:
          "The Retention Flow Builder offers a discount or a free month to save them at the moment of cancellation, tracked by Retention Analytics.",
      },
      {
        problem: "You don't know what drives conversions or churn.",
        solution:
          "Analytics show which content converts and which tiers churn, so you can optimize pricing and packaging.",
      },
      {
        problem: "Premium content spans many sections and URLs.",
        solution:
          "URL Path Rules support exact, prefix, contains, and regex patterns, so you can gate whole sections, archives, or media paths in one rule.",
      },
    ],
    steps: [
      {
        title: "Choose your paywall model",
        description:
          "Decide hard (all premium gated) or metered (a few free, then gate) — both are Member Access rules, no code.",
      },
      {
        title: "Create reader tiers",
        description:
          "Build Basic and Premium plans as variable Subscription Products with monthly and annual options.",
      },
      {
        title: "Gate premium content",
        description:
          "Restrict articles, sections, and Restricted Downloads by plan with Member Access and URL Path Rules.",
      },
      {
        title: "Schedule exclusives",
        description:
          "Drip premium pieces on a weekly or monthly cadence with Content Dripping to reward subscribers.",
      },
      {
        title: "Track & optimize",
        description:
          "Use Analytics to see what converts and what churns, then tune pricing.",
      },
    ],
    playbooks: [
      {
        title: "Metered news paywall",
        description:
          "Three free articles tracked by Product & Purchase Value Conditions, then a Basic monthly plan unlocks the rest.",
      },
      {
        title: "Premium newsletter tier",
        description:
          "A paid tier with member-only posts, a full archive, and a 'free month' Retention Flow offer.",
      },
      {
        title: "Research report library",
        description:
          "Annual access gating downloadable reports by plan with Restricted Downloads and Multi-Login Prevention.",
      },
    ],
    outcomes: [
      "Convert more free readers by showing the paywall at the right moment.",
      "Reduce fatigue with a metered model that builds trust first.",
      "Raise lifetime value by dripping exclusives to loyal subscribers.",
      "Optimize pricing using conversion and churn analytics.",
      "Avoid paywall-plugin conflicts — it's built into your subscription plugin.",
    ],
    faq: [
      {
        question: "Can I allow a few free articles before the paywall?",
        answer:
          "Yes. Combine Product & Purchase Value Conditions with post restriction to build a metered paywall — after the free quota, the next article requires a subscription.",
      },
      {
        question: "How do I show different content to Basic vs Premium?",
        answer:
          "Create Member Access rules per tier — Basic unlocks standard articles, Premium unlocks everything — so each tier sees the right subset.",
      },
      {
        question: "Can I release exclusives on a schedule?",
        answer:
          "Yes. Content Dripping schedules article visibility by date or relative to purchase, so premium exclusives publish on your cadence.",
      },
      {
        question: "Will the paywall hurt my SEO?",
        answer:
          "You control what's gated. Use Partial Content Restriction to keep teasers and metadata public and gate only the full body, so search engines still index your pages while premium content stays members-only.",
      },
      {
        question: "Can subscribers read on multiple devices without sharing?",
        answer:
          "Yes. Multi-Login Prevention (Pro) allows normal use but blocks concurrent sessions from a shared login, protecting subscription revenue.",
      },
      {
        question: "Can I sell single articles as well as subscriptions?",
        answer:
          "Yes. Because it's built on WooCommerce, you can sell one-off purchases alongside subscriptions and gate content by either.",
      },
    ],
    relatedFeatures: [
      "member-access",
      "cpt-content-restrictions",
      "url-path-rules",
      "partial-content-restriction",
      "content-dripping",
      "product-purchase-value-conditions",
      "redirect-product-page",
      "one-click-checkout-urls",
      "subscription-products",
      "donation-crowdfunding-module",
      "analytics",
    ],
  },
  {
    slug: "service-businesses",
    icon: Briefcase,
    name: "Service Businesses",
    cardDescription:
      "Bill retainers, maintenance, and support plans — tiered plans, sign-up fees, pause & skip, automatic billing, and retention.",
    seoTitle: "WooCommerce Recurring Service Subscriptions & Retainers",
    metaDescription:
      "Sell recurring services on WooCommerce — tiered retainers and maintenance plans, flexible billing cycles, sign-up fees, pause and skip, automatic Stripe/PayPal billing, role mapping, and retention offers.",
    h1: "Sell recurring services with subscription billing",
    heroSubtitle:
      "Bill retainers, maintenance plans, and support packages on a schedule — with tiered plans, pause and skip, role mapping, and automatic collection.",
    heroHighlights: [
      "Tiered retainers & sign-up fees",
      "Pause without cancelling",
      "Automatic billing & dunning",
    ],
    intro:
      "Service businesses bill for retainers, maintenance, and support that clients expect to pause or adjust month to month — and chasing invoices by hand doesn't scale. ArraySubs gives you ==flexible recurring billing built for services==. Create Bronze, Silver, and Gold plans as variable Subscription Products with monthly, quarterly, or annual cycles and onboarding Signup Fees, let clients ==pause or skip from the Customer Portal==, ==map subscription status to a client role== with Role-Based Conditions so your other tools can read it, and intercept cancellations with a downgrade or pause. Payments collect automatically through ==First-Class Stripe Support or PayPal==, and a 2-Phase Grace Period gives clients time to update a card before service is interrupted.",
    stats: [
      { value: "3", label: "Billing intervals" },
      { value: "2-phase", label: "Grace period" },
      { value: "Auto", label: "Stripe / PayPal (Pro)" },
      { value: "4", label: "Retention offers" },
    ],
    audience: [
      {
        title: "Agencies & freelancers",
        description:
          "Sell monthly retainers and care plans with Signup Fees for onboarding.",
      },
      {
        title: "Maintenance & care plans",
        description:
          "Recurring website, equipment, or property maintenance with tiered coverage.",
      },
      {
        title: "Support & SLA packages",
        description:
          "Bronze/Silver/Gold support tiers with role-gated access to your help channels.",
      },
      {
        title: "Consulting & coaching retainers",
        description:
          "Recurring advisory retainers with Pause / Vacation Mode between engagements.",
      },
    ],
    points: [
      {
        problem: "Tiered service plans with different pricing are tedious to build.",
        solution:
          "Variable Subscription Products give each tier its own cycle, Signup Fee, and renewal price; Feature Manager shows what each tier includes on the product page.",
      },
      {
        problem: "Clients need to pause a retainer for a month.",
        solution:
          "The Customer Portal's Pause / Vacation Mode lets clients pause when idle and reactivate later — no cancellation, no lost relationship.",
      },
      {
        problem: "You invoice manually and chase late payments.",
        solution:
          "First-Class Stripe Support and PayPal collect on schedule, and a 2-Phase Grace Period with Auto-Retry gives clients time to update payment before service pauses.",
      },
      {
        problem: "Budget-driven clients cancel.",
        solution:
          "The Retention Flow Builder offers a downgrade to a cheaper tier or a short pause — many stay — and Retention Analytics shows which offers work.",
      },
      {
        problem: "Your support stack can't see who's an active client.",
        solution:
          "Role-Based Conditions assign a client role by subscription status, so your tools restrict service access automatically.",
      },
      {
        problem: "Onboarding work isn't covered by the monthly fee.",
        solution:
          "Add a one-time Signup Fee to any plan so setup or onboarding is billed alongside the first recurring charge, and use Different Renewal Price when the intro month differs.",
      },
    ],
    steps: [
      {
        title: "Run the services wizard",
        description:
          "Pick the Services profile in the Easy Setup Wizard to configure billing, grace periods, and the portal for retainers.",
      },
      {
        title: "Create service tiers",
        description:
          "Build Bronze/Silver/Gold as variable Subscription Products with cycles, Signup Fees, and prices.",
      },
      {
        title: "Map client roles",
        description:
          "Use Role-Based Conditions to assign a client role by subscription status so your support tools recognize active clients.",
      },
      {
        title: "Connect automatic billing",
        description:
          "Add First-Class Stripe Support or PayPal to collect retainers on schedule with no manual invoicing.",
      },
      {
        title: "Enable pause & retention",
        description:
          "Let clients pause between engagements and intercept cancellations with the Retention Flow Builder.",
      },
    ],
    playbooks: [
      {
        title: "Monthly care plan",
        description:
          "A single monthly maintenance plan with a setup Signup Fee and Pause / Vacation Mode for slow seasons.",
      },
      {
        title: "Tiered support SLA",
        description:
          "Bronze/Silver/Gold support tiers, role-gated to a help portal, with quarterly billing options.",
      },
      {
        title: "Consulting retainer",
        description:
          "A monthly advisory retainer with pause between projects and a downgrade offer at cancel.",
      },
    ],
    outcomes: [
      "Predictable recurring revenue with automatic billing and grace periods.",
      "Lower churn with pause and downgrade options.",
      "Less admin — no manual invoicing or follow-ups.",
      "Seamless integration via role mapping for your support stack.",
      "Easy tiering across monthly, quarterly, and annual billing.",
    ],
    faq: [
      {
        question: "Can I bill clients on different schedules?",
        answer:
          "Yes. Variable Subscription Products support per-variation intervals — one client on Bronze monthly, another on Gold quarterly, from a single product.",
      },
      {
        question: "What if a client's payment fails?",
        answer:
          "A 2-Phase Grace Period keeps service active while the client updates payment; Pro adds Auto-Retry Failed Payments and Auto-Downgrade on Failure to keep them active.",
      },
      {
        question: "How do I keep a client from cancelling?",
        answer:
          "The Retention Flow Builder intercepts the cancellation and offers a discount or a pause, and Retention Analytics shows which offers work best.",
      },
      {
        question: "Can I charge an onboarding fee plus a monthly retainer?",
        answer:
          "Yes. Add a Signup Fee to the plan; the client is billed the one-time fee with their first payment, then the recurring amount each cycle.",
      },
      {
        question: "How do my support tools know who's an active client?",
        answer:
          "Role-Based Conditions assign a WordPress role based on subscription status; any plugin or integration that checks roles sees active clients automatically.",
      },
      {
        question: "Can clients manage their own retainer?",
        answer:
          "Yes. The Customer Portal lets clients view invoices, Pause / Vacation Mode or skip, switch tiers with proration, and update payment details without emailing you.",
      },
    ],
    relatedFeatures: [
      "subscription-products",
      "signup-fees",
      "plan-switching",
      "customer-portal",
      "billing-and-renewals",
      "grace-period-recovery",
      "stripe-payments",
      "paypal-payments",
      "role-based-conditions",
      "manage-subscriptions",
      "feature-manager",
      "installment-split-payments",
    ],
  },
  {
    slug: "b2b-wholesale-memberships",
    icon: Building2,
    name: "B2B & Wholesale Memberships",
    cardDescription:
      "Run trade accounts and wholesale tiers with member pricing, gated catalogs, role mapping, login cleanup, and account-sharing controls.",
    seoTitle: "WooCommerce B2B & Wholesale Memberships with ArraySubs",
    metaDescription:
      "Build B2B and wholesale memberships on WooCommerce with recurring trade tiers, member discounts, gated catalogs, purchase-value rules, role mapping, login cleanup, and account-sharing controls.",
    h1: "Run B2B and wholesale memberships on WooCommerce",
    heroSubtitle:
      "Create recurring trade tiers, hide retail-only areas, assign roles automatically, and give approved buyers a clean account portal.",
    heroHighlights: [
      "Wholesale tiers & member pricing",
      "Catalog & shop gating",
      "Role-aware access",
    ],
    intro:
      "B2B and wholesale stores need more than recurring billing. They need ==approved account access, role-based pricing, gated catalogs, download rules, clean login paths, and support tools== that help staff verify what a buyer sees. ArraySubs combines Subscription Products, Member Access, Member Discounts, Shop Restrictions, Role-Based Conditions, Profile Builder, the WordPress access Toolkit, and Pro account-sharing controls into ==one workflow==. Gate wholesale catalogs and pricing to approved buyers, ==map trade tiers to WordPress roles== other plugins can read, route logins through My Account, and cap shared logins with Multi-Login Prevention.",
    stats: [
      { value: "Roles", label: "Buyer segmentation" },
      { value: "Rules", label: "Catalog gating" },
      { value: "Member", label: "Pricing tiers" },
      { value: "Pro", label: "Session limits" },
    ],
    audience: [
      {
        title: "Wholesale catalogs",
        description:
          "Hide trade pricing and bulk products behind approved buyer memberships with Shop Restrictions.",
      },
      {
        title: "Dealer networks",
        description:
          "Assign regional or tier roles with Role-Based Conditions that other WordPress tools can recognize.",
      },
      {
        title: "B2B service portals",
        description:
          "Gate account resources, documents, and support pages by active subscription.",
      },
      {
        title: "Trade associations",
        description:
          "Sell annual memberships with role-based benefits and Member Discounts.",
      },
    ],
    points: [
      {
        problem: "Retail customers and wholesale buyers need different catalogs.",
        solution:
          "Member Access and Shop Restrictions gate products, categories, URLs, and downloads by subscription status, role, or plan — retail sees one store, trade sees another.",
      },
      {
        problem: "Trade buyers need automatic role assignment.",
        solution:
          "Role-Based Conditions assign and remove WordPress roles as subscriptions activate, pause, expire, or cancel.",
      },
      {
        problem: "Wholesale pricing should be member-only.",
        solution:
          "Member Discounts apply member-only pricing, and Product & Purchase Value Conditions can tier access by order history or lifetime spend.",
      },
      {
        problem: "The default WordPress login feels wrong for buyers.",
        solution:
          "Toolkit modules — Admin Bar Visibility, Admin Dashboard Access, and WordPress Login Page — hide admin chrome, restrict wp-admin, and route login through WooCommerce My Account.",
      },
      {
        problem: "Support needs to verify buyer access quickly.",
        solution:
          "Login as User lets administrators open a customer's frontend session without asking for a password, and Create Subscription from WP Admin migrates buyers in.",
      },
      {
        problem: "Shared buyer accounts leak trade pricing.",
        solution:
          "Multi-Login Prevention (Pro) limits concurrent sessions and supports plan-level overrides, so one login can't spread protected pricing.",
      },
    ],
    steps: [
      {
        title: "Create trade tiers",
        description:
          "Build wholesale, dealer, or partner tiers as Subscription Products, with Conditional Subscription Rules for one-per-customer where needed.",
      },
      {
        title: "Map buyer roles",
        description:
          "Use Role-Based Conditions to assign roles to active subscribers so pricing and access rules follow the buyer.",
      },
      {
        title: "Gate catalogs",
        description:
          "Restrict product categories, URLs, downloads, and resource pages by role or plan with Member Access and Shop Restrictions.",
      },
      {
        title: "Clean up account access",
        description:
          "Enable Toolkit modules for admin bar hiding, wp-admin redirects, and My Account login routing.",
      },
      {
        title: "Protect shared accounts",
        description:
          "Use Multi-Login Prevention in Pro when buyer accounts represent paid seats or protected pricing.",
      },
    ],
    playbooks: [
      {
        title: "Approved wholesale catalog",
        description:
          "An annual wholesale membership unlocks protected categories, Member Discounts, and downloadable order forms.",
      },
      {
        title: "Dealer portal",
        description:
          "Dealer tiers map to WordPress roles and unlock region-specific resources, documents, and support pages.",
      },
      {
        title: "Trade association benefits",
        description:
          "Active members get Member Discounts, restricted training content, and a clean My Account member area.",
      },
    ],
    outcomes: [
      "Keep wholesale products and pricing away from retail customers.",
      "Use WordPress roles as a shared access layer for other plugins.",
      "Reduce support time with Login as User and clear subscription records.",
      "Protect member-only benefits with session limits when Pro is active.",
      "Keep customer-facing login and account paths branded through My Account.",
    ],
    faq: [
      {
        question: "Can I hide products from non-wholesale customers?",
        answer:
          "Yes. Member Access and Shop Restrictions restrict products, categories, URLs, and downloads by plan, role, or subscription status.",
      },
      {
        question: "Can buyers get member-only discounts?",
        answer:
          "Yes. Member Discounts apply discounts only to eligible members, and Product & Purchase Value Conditions can tier them by spend.",
      },
      {
        question: "Can I tier access by how much a buyer has spent?",
        answer:
          "Yes. Product & Purchase Value Conditions build access rules from purchased products, categories, variations, or lifetime spend.",
      },
      {
        question: "Can I migrate existing buyers into a plan?",
        answer:
          "Yes. Create Subscription from WP Admin sets up subscriptions manually for migrations, phone orders, or corrections.",
      },
      {
        question: "Can support view the buyer experience?",
        answer:
          "Yes. Login as User lets administrators open a non-admin customer's frontend session for troubleshooting.",
      },
      {
        question: "Can I stop shared wholesale logins?",
        answer:
          "Yes. Multi-Login Prevention (Pro) limits concurrent sessions with global and plan-level controls.",
      },
    ],
    relatedFeatures: [
      "member-access",
      "role-based-conditions",
      "member-discounts",
      "shop-access-restrictions",
      "product-purchase-value-conditions",
      "conditional-subscription-rules",
      "subscription-products",
      "multi-login-prevention",
      "wordpress-login-page",
      "admin-dashboard-access",
      "admin-bar-visibility",
      "woocommerce-tax-handling",
    ],
  },
  {
    slug: "subscription-support-operations",
    icon: Headphones,
    name: "Subscription Support Operations",
    cardDescription:
      "Give support teams the dashboards, notes, impersonation, refunds, audits, and gateway context needed to solve subscription tickets.",
    seoTitle: "Subscription Support Operations for WooCommerce Stores",
    metaDescription:
      "Run subscription support operations with ArraySubs: central subscription records, notes timeline, Login as User, Member Insight, refunds, audits and logs, gateway health, and customer portal troubleshooting.",
    h1: "Support subscription customers without guesswork",
    heroSubtitle:
      "Centralize subscription records, customer timelines, admin impersonation, member profiles, refunds, gateway health, and audit trails for faster support.",
    heroHighlights: [
      "One central subscription record",
      "Login as User impersonation",
      "Audits, logs & gateway health",
    ],
    intro:
      "Subscription support is hard when billing, access, profile data, and gateway state live in separate tools. ArraySubs gives support teams ==Manage Subscriptions, Subscription Notes, Login as User, Customer Portal context, Member Insight, Manage Refunds, Audits and Logs, and Gateway Health== so they can diagnose the ==full customer story from one system==. Read a subscription's timeline, open the customer's own session to see what they see, check webhook and scheduled-job status, and issue a refund or store credit — without jumping across a dozen WooCommerce screens.",
    stats: [
      { value: "1", label: "Central subscription record" },
      { value: "Notes", label: "Full lifecycle timeline" },
      { value: "Login", label: "as User impersonation" },
      { value: "Pro", label: "Insight & gateway health" },
    ],
    audience: [
      {
        title: "Subscription support teams",
        description:
          "Resolve payment, access, cancellation, and portal tickets with full context.",
      },
      {
        title: "Agency operators",
        description:
          "Manage client subscription stores with clean records and troubleshooting paths.",
      },
      {
        title: "Membership managers",
        description:
          "Look up members with Member Insight, verify roles, and confirm what the customer sees.",
      },
      {
        title: "Finance & operations",
        description:
          "Review renewals, refunds, credits, gateway status, and failed scheduled jobs.",
      },
    ],
    points: [
      {
        problem: "Support cannot see why a customer's access changed.",
        solution:
          "Subscription Notes keep a permanent timeline of lifecycle changes, renewal events, gateway activity, and manual admin notes.",
      },
      {
        problem: "The customer says the portal looks wrong.",
        solution:
          "Login as User opens their frontend session so support can verify the exact account state without a password.",
      },
      {
        problem: "Staff jump across WooCommerce screens to understand a customer.",
        solution:
          "Member Insight (Pro) brings profile, subscription, commerce, address, and Store Credit context into one dashboard with quick actions.",
      },
      {
        problem: "Payment failures are hard to diagnose.",
        solution:
          "Gateway Health (Pro) shows gateway status, webhook URLs, capabilities, and event logs, with renewal troubleshooting alongside.",
      },
      {
        problem: "Nobody knows who changed a setting or subscription.",
        solution:
          "Audits and Logs add activity audits and scheduled-job logs in Pro, with troubleshooting guides available from the core path.",
      },
      {
        problem: "Refunds and corrections take too long.",
        solution:
          "Manage Refunds issues prorated, full, or partial refunds — to the gateway, manually, or as Store Credit — and Create Subscription from WP Admin fixes migrations and phone orders.",
      },
    ],
    steps: [
      {
        title: "Start from the subscription",
        description:
          "Open the Manage Subscriptions record and review status, dates, customer, product, notes, and related orders.",
      },
      {
        title: "Read the timeline",
        description:
          "Use Subscription Notes to understand lifecycle, renewal, gateway, and manual support events.",
      },
      {
        title: "Verify the portal",
        description:
          "Use Login as User to confirm what the customer sees in My Account.",
      },
      {
        title: "Open member context",
        description:
          "Use Member Insight in Pro for commerce history, credits, addresses, and shortcuts.",
      },
      {
        title: "Escalate with logs",
        description:
          "Check Audits and Logs and Gateway Health when the issue involves automation, webhooks, or payment events.",
      },
    ],
    playbooks: [
      {
        title: "Payment failed ticket",
        description:
          "Check billing status, renewal notes, Gateway Health, customer payment method, and grace-period state.",
      },
      {
        title: "Missing member access",
        description:
          "Review Role-Based Conditions, Member Access rules, subscription status, and the portal through Login as User.",
      },
      {
        title: "Refund and credit question",
        description:
          "Open the subscription, review notes and related orders, then use Manage Refunds and Store Credit history in Pro.",
      },
    ],
    outcomes: [
      "Resolve tickets with subscription, payment, access, and customer context in one place.",
      "Verify the customer-facing portal without collecting passwords.",
      "Escalate automation issues with gateway, audit, and scheduled-job evidence.",
      "Reduce repeated support loops by keeping notes on the subscription timeline.",
      "Use Pro dashboards when the team needs deeper customer and gateway visibility.",
    ],
    faq: [
      {
        question: "Can support log in as a customer?",
        answer:
          "Yes. Login as User lets administrators impersonate non-admin customers from supported contexts, without asking for a password.",
      },
      {
        question: "Can I see everything that happened on a subscription?",
        answer:
          "Yes. Subscription Notes records lifecycle changes, renewal events, gateway activity, private admin notes, and customer-visible notes on one timeline.",
      },
      {
        question: "Can I diagnose webhook and scheduled-job problems?",
        answer:
          "Yes (Pro). Gateway Health shows gateway status and webhook event logs, and Audits and Logs includes scheduled-job logs and activity audits.",
      },
      {
        question: "Can I export subscriptions for review?",
        answer:
          "Yes. Manage Subscriptions exports filtered subscription data to CSV or JSON for operations and reporting.",
      },
      {
        question: "Which support tools require Pro?",
        answer:
          "Member Insight, Gateway Health, activity audits, and scheduled-job logs are Pro. Core still includes Manage Subscriptions, Subscription Notes, portal context, refunds, and troubleshooting guides.",
      },
      {
        question: "Can I create a subscription manually for a phone order?",
        answer:
          "Yes. Create Subscription from WP Admin builds subscriptions by hand for migrations, phone orders, or support corrections.",
      },
    ],
    relatedFeatures: [
      "manage-subscriptions",
      "subscription-notes",
      "login-as-user",
      "member-insight",
      "manage-refunds",
      "audits-and-logs",
      "gateway-health",
      "create-subscription-admin",
    ],
  },
  {
    slug: "store-credit-loyalty",
    icon: HandCoins,
    name: "Store Credit & Loyalty",
    cardDescription:
      "Use Pro Store Credit for refund retention, loyalty balances, prepaid wallets with bonus top-ups, and credit lifecycle emails.",
    seoTitle: "WooCommerce Store Credit and Loyalty Workflows with ArraySubs",
    metaDescription:
      "Use ArraySubs Pro Store Credit for refund-to-credit, customer wallets, credit purchase products with bonus percentages, transaction histories, expiration, member discounts, and loyalty workflows.",
    h1: "Keep more revenue with store credit workflows",
    heroSubtitle:
      "Turn refunds, downgrades, promotions, and prepaid purchases into spendable customer credit for renewals and new orders.",
    heroHighlights: [
      "Pro Store Credit wallet",
      "Refund to credit",
      "Bonus-percentage top-ups",
    ],
    intro:
      "Store credit is a revenue-retention workflow, not just a balance field. ArraySubs Pro lets merchants ==refund to credit, sell credit purchase products with an optional bonus percentage, manage customer balances, track credit history, send credit lifecycle emails, and show customers their balance in My Account== so refunds and promotions ==stay inside the store==. Pair Store Credit with the Retention Flow Builder and Member Discounts to answer cancellations with value instead of cash, and use Retention Analytics to see which credit offers actually save customers.",
    stats: [
      { value: "Wallet", label: "Customer balance" },
      { value: "Refund", label: "to credit" },
      { value: "+%", label: "Purchase bonus" },
      { value: "4", label: "Credit lifecycle emails" },
    ],
    audience: [
      {
        title: "Subscription stores with refunds",
        description:
          "Offer credit instead of cash when customers cancel, downgrade, or need a partial refund.",
      },
      {
        title: "Loyalty programs",
        description:
          "Issue promotional credit and let customers spend it on renewals or new orders.",
      },
      {
        title: "Prepaid usage businesses",
        description:
          "Sell credit packs with bonus percentages that customers consume across subscription purchases.",
      },
      {
        title: "Support & retention teams",
        description:
          "Use credit as a save offer when discounts or pauses aren't the right fit.",
      },
    ],
    points: [
      {
        problem: "Refunds leave the store forever.",
        solution:
          "Manage Refunds can refund to Store Credit, keeping value in the customer wallet instead of sending it back through the gateway.",
      },
      {
        problem: "Customers need a simple place to see their balance.",
        solution:
          "The Customer Portal and Shortcodes show the Store Credit balance and history inside My Account.",
      },
      {
        problem: "Manual credits are hard to audit.",
        solution:
          "Store Credit management tracks every balance change — source, type, and transaction context — with a full credit history.",
      },
      {
        problem: "Promotional credit expires silently.",
        solution:
          "Store Credit settings support expiration, and credit lifecycle emails notify customers before and after expiry.",
      },
      {
        problem: "You want to sell prepaid credit.",
        solution:
          "The credit purchase product creates WooCommerce products for fixed or custom credit amounts, with an optional bonus percentage.",
      },
      {
        problem: "Retention offers need more than discounts.",
        solution:
          "Pair Store Credit with the Retention Flow Builder and Member Discounts to offer value while preserving cash, tracked by Retention Analytics.",
      },
    ],
    steps: [
      {
        title: "Enable Store Credit",
        description:
          "Turn on the Pro Store Credit module and configure wallet behavior.",
      },
      {
        title: "Configure credit rules",
        description:
          "Set auto-apply, expiration, purchase limits, bonus percentages, and customer-facing settings.",
      },
      {
        title: "Add credit products",
        description:
          "Create fixed or custom-amount credit purchase products in WooCommerce.",
      },
      {
        title: "Connect refund workflows",
        description:
          "Use Manage Refunds to refund to credit from WooCommerce orders when a cash refund isn't required.",
      },
      {
        title: "Notify customers",
        description:
          "Customize Credit Added, Credit Used, Credit Expiring, and Credit Expired emails.",
      },
    ],
    playbooks: [
      {
        title: "Refund retention",
        description:
          "A customer cancels mid-cycle; support refunds the unused period to Store Credit so the value stays available for a future order.",
      },
      {
        title: "Prepaid top-up wallet",
        description:
          "Customers buy credit packs with a bonus percentage and spend the balance on renewals, add-ons, or future purchases.",
      },
      {
        title: "Win-back credit",
        description:
          "A Retention Flow offers credit toward the next renewal instead of a cash discount.",
      },
    ],
    outcomes: [
      "Keep refund value inside the store when appropriate.",
      "Give customers a clear balance and credit history.",
      "Sell prepaid credit products with bonus top-ups and no custom development.",
      "Notify customers before credit expires or changes.",
      "Pair credit with retention workflows for more flexible saves.",
    ],
    faq: [
      {
        question: "Can I refund an order as store credit?",
        answer:
          "Yes (Pro). Manage Refunds includes a refund-to-credit workflow from WooCommerce order screens, keeping value in the customer wallet.",
      },
      {
        question: "Can customers buy credit, and can I add a bonus?",
        answer:
          "Yes (Pro). The credit purchase product sells fixed or custom credit amounts, with an optional bonus percentage — buy $100, get $110.",
      },
      {
        question: "Can customers see their credit balance?",
        answer:
          "Yes. Store Credit appears in the Customer Portal and via Shortcodes in the My Account experience.",
      },
      {
        question: "Can I manually adjust a customer's credit?",
        answer:
          "Yes (Pro). Store Credit management lets admins add or deduct credit and review full transaction histories.",
      },
      {
        question: "Can credit expire?",
        answer:
          "Yes. Store Credit settings include expiration controls, and credit lifecycle emails notify customers before and after expiry.",
      },
      {
        question: "Can I use credit as a retention offer?",
        answer:
          "Yes. Pair Store Credit with the Retention Flow Builder to preserve value when customers cancel or downgrade, and measure it with Retention Analytics.",
      },
    ],
    relatedFeatures: [
      "store-credit",
      "manage-refunds",
      "retention-and-refunds",
      "retention-analytics",
      "member-discounts",
      "customer-portal",
      "member-insight",
      "emails",
    ],
  },
];

/**
 * Functionality-focused "Can I…?" capability checks per use case. Rendered as a
 * scannable checklist and merged into the page's FAQ schema. Every answer
 * reflects a real, shipped ArraySubs capability — nothing here is aspirational
 * (coming-soon modules are labelled as such). Written to match the natural-
 * language questions store owners search before buying.
 */
export const USE_CASE_CAN_DO: Record<string, UseCaseFaq[]> = {
  "saas-digital-products": [
    {
      question: "Can I offer a free trial before charging?",
      answer:
        "Yes. Set a Free Trial on any plan; First-Class Stripe Support (Pro) stores the card with a SetupIntent during the trial and charges automatically at conversion.",
    },
    {
      question: "Can I sell monthly and annual versions of the same plan?",
      answer:
        "Yes. A variable Subscription Product exposes monthly and annual options, each with its own price and trial.",
    },
    {
      question: "Can I let customers upgrade from Basic to Pro instantly?",
      answer:
        "Yes. Plan Switching upgrades with automatic proration — charged immediately, applied at the next renewal, or with no proration.",
    },
    {
      question: "Can I limit usage like '100 API calls' per plan?",
      answer:
        "Yes (Pro). Feature Manager numeric limits define per-plan quotas, and Feature-Based Conditions enforce them across your content.",
    },
    {
      question: "Can I sell prepaid usage credits with a bonus?",
      answer:
        "Yes (Pro). Store Credit lets customers buy top-ups with an optional bonus percentage that spend down as they use the product.",
    },
    {
      question: "Can I show what each plan includes on the product page?",
      answer:
        "Yes (Pro). Feature Manager renders a 'What's included' list that updates per variation.",
    },
    {
      question: "Can I gate documentation or downloads to paying plans?",
      answer:
        "Yes. Member Access restricts pages, URL paths, and Restricted Downloads by subscription or plan.",
    },
    {
      question: "Can I automatically retry failed payments?",
      answer:
        "Yes (Pro). Auto-Retry Failed Payments recharges on a schedule while a 2-Phase Grace Period keeps access active during recovery.",
    },
    {
      question: "Can I move a customer to a cheaper plan instead of cancelling?",
      answer:
        "Yes (Pro). Use Auto-Downgrade on Failure, or present a downgrade offer in the Retention Flow Builder.",
    },
    {
      question: "Can I see my MRR and churn rate?",
      answer:
        "Yes. Analytics tracks MRR, churn rate, ARPU, and trial conversion.",
    },
    {
      question: "Can I charge a one-time setup fee with a subscription?",
      answer:
        "Yes. Add a Signup Fee to any plan, billed alongside the first recurring payment.",
    },
    {
      question: "Can I require SCA / 3D Secure for EU cards?",
      answer:
        "Yes (Pro). First-Class Stripe Support handles SCA/3DS at checkout and off-session for renewals.",
    },
    {
      question: "Can I apply a coupon to a subscription?",
      answer:
        "Yes. Coupons extend WooCommerce coupons to subscriptions with recurring discounts and cycle limits.",
    },
    {
      question: "Can I let customers update their card themselves?",
      answer:
        "Yes (Pro). The Customer Portal runs a secure Stripe update, or a re-authorization for PayPal and Paddle.",
    },
    {
      question: "Can I handle EU VAT without configuring tax?",
      answer:
        "Yes (Pro). Paddle Payments acts as merchant of record and handles tax/VAT natively; Stripe and manual flows use WooCommerce Tax Handling.",
    },
    {
      question: "Can I build a multi-step checkout for signups?",
      answer:
        "Yes (Pro). The Checkout Page Builder supports multi-step layouts and conditional fields with no code.",
    },
    {
      question: "Can I let customers renew early or choose their term?",
      answer:
        "Early Renew and Customer-Chosen Subscription Duration are planned Pro modules (coming soon); today, Fixed-Date Subscriptions cover set licensing windows.",
    },
    {
      question: "Can I sell a fixed-price product in installments?",
      answer:
        "Installment / Split Payments is a planned Pro module (coming soon) for splitting a fixed price across scheduled payments.",
    },
    {
      question: "Can I see an audit log of every change?",
      answer:
        "Yes (Pro). Audits and Logs record activity across subscriptions, payments, and entitlements with author roles.",
    },
    {
      question: "Can I export my subscribers to CSV?",
      answer:
        "Yes. Manage Subscriptions exports subscriptions to CSV or JSON.",
    },
  ],
  "membership-sites": [
    {
      question: "Can I create free and paid membership tiers?",
      answer:
        "Yes. Build a free tier plus paid variable-subscription tiers and gate content per plan with Member Access.",
    },
    {
      question: "Can I restrict individual pages, posts, and custom post types?",
      answer:
        "Yes. Any CPT & Content Restriction gates pages, posts, custom post types, taxonomy terms, and archives.",
    },
    {
      question: "Can I drip content over weeks?",
      answer:
        "Yes. Content Dripping releases gated material by days-since-join or fixed calendar dates.",
    },
    {
      question: "Can I restrict access by URL?",
      answer:
        "Yes. URL Path Rules support exact, prefix, contains, and regex patterns.",
    },
    {
      question: "Can I assign a WordPress role per membership?",
      answer:
        "Yes. Role-Based Conditions assign or remove WordPress roles automatically by subscription status.",
    },
    {
      question: "Can I combine several conditions with AND/OR logic?",
      answer:
        "Yes. The Advanced Condition Builder nests AND/OR logic across subscription, product, role, spend, and Pro feature conditions.",
    },
    {
      question: "Can I offer member-only pricing or discounts?",
      answer:
        "Yes. Member Discounts apply tier-specific pricing across your store.",
    },
    {
      question: "Can I let members pause their membership?",
      answer:
        "Yes. The Customer Portal offers Pause / Vacation Mode and Skip Next Renewal so members flex instead of cancelling.",
    },
    {
      question: "Can I stop members sharing one login?",
      answer:
        "Yes (Pro). Multi-Login Prevention blocks concurrent sessions on a shared account with plan-level overrides.",
    },
    {
      question: "Can I sell a one-time or lifetime membership?",
      answer:
        "Yes. Fixed-Date (Pro) membership products grant access for a set period, and Lifetime Deals grant ongoing access with no renewals.",
    },
    {
      question: "Can I add custom fields to member profiles?",
      answer:
        "Yes. Profile Builder adds custom fields and avatar uploads to My Account.",
    },
    {
      question: "Can I gate content inside a page with a shortcode?",
      answer:
        "Yes. Shortcodes and Partial Content Restriction gate inline sections anywhere.",
    },
    {
      question: "Can I gate an Elementor or Gutenberg section?",
      answer:
        "Yes. Elementor Container Restriction gates Containers from the Advanced tab, and Gutenberg Block Restriction wraps nested blocks.",
    },
    {
      question: "Can I reorder and rename the My Account menu?",
      answer:
        "Yes. My Account Page Builder reorders, renames, and hides items, and adds custom endpoint pages.",
    },
    {
      question: "Can I gate access by a Pro feature entitlement?",
      answer:
        "Yes (Pro). Feature-Based Conditions gate content by Feature Manager entitlements and allowances.",
    },
    {
      question: "Can I let members cancel and reactivate themselves?",
      answer:
        "Yes. The Customer Portal handles cancel (with undo), reactivate, and Plan Switching without support.",
    },
    {
      question: "Can I add a free trial to a membership?",
      answer:
        "Yes. Any plan can include a configurable Free Trial period.",
    },
    {
      question: "Can I export my members for an email tool?",
      answer:
        "Yes. Export subscriptions to CSV or JSON for your CRM or email platform.",
    },
  ],
  "subscription-boxes": [
    {
      question: "Can I let customers skip a month?",
      answer:
        "Yes. Skip Next Renewal in the Customer Portal pushes the renewal forward without cancelling.",
    },
    {
      question: "Can I let customers pause for the summer?",
      answer:
        "Yes. Pause / Vacation Mode stops billing and shipping until they choose to resume.",
    },
    {
      question: "Can I ship every box on the same day?",
      answer:
        "Yes (Pro). Flexible Renewal Sync aligns all renewals to one calendar day for batch fulfillment.",
    },
    {
      question: "Can I offer basic, premium, and deluxe boxes?",
      answer:
        "Yes. Variable Subscription Products give each tier its own billing cycle and price.",
    },
    {
      question: "Can I bill weekly, monthly, or quarterly?",
      answer:
        "Yes. Choose daily, weekly, monthly, or yearly with an interval of 1–12 (quarterly is every 3 months).",
    },
    {
      question: "Can I charge recurring shipping on each box?",
      answer:
        "Yes (Pro). Subscription Shipping adds one-time or recurring shipping charges per plan on top of WooCommerce shipping.",
    },
    {
      question: "Can I sell a prepaid 3- or 6-month box?",
      answer:
        "Yes. Set a subscription length (number of cycles) so the plan ends automatically.",
    },
    {
      question: "Can I charge a one-time welcome-box fee?",
      answer:
        "Yes. Add a Signup Fee that's billed with the first box.",
    },
    {
      question: "Can I set a different renewal price than the first box?",
      answer:
        "Yes. Different Renewal Price changes the price after the intro box, or set a separate renewal price per plan.",
    },
    {
      question: "Can I let subscribers switch box tiers?",
      answer:
        "Yes. Plan Switching upgrades or downgrades between tiers with proration.",
    },
    {
      question: "Can I offer a discount to save a cancelling customer?",
      answer:
        "Yes. The Retention Flow Builder presents a discount, pause, or downgrade at cancellation.",
    },
    {
      question: "Can I apply a coupon to a box subscription?",
      answer:
        "Yes. Coupons work with subscription products, including recurring discounts and cycle limits.",
    },
    {
      question: "Can I give a customer time to fix a failed card?",
      answer:
        "Yes. A 2-Phase Grace Period keeps the box active while the card is retried; Pro adds Auto-Retry.",
    },
    {
      question: "Can I email customers before each renewal?",
      answer:
        "Yes. Emails send renewal reminders a configurable number of days before the charge.",
    },
    {
      question: "Can I let customers renew a box early?",
      answer:
        "Early Renew is a planned Pro module (coming soon); today, customers can reactivate and switch plans anytime from the portal.",
    },
    {
      question: "Can I export my box subscribers?",
      answer:
        "Yes. Manage Subscriptions exports subscriptions to CSV or JSON.",
    },
    {
      question: "Can I add a free trial box?",
      answer:
        "Yes. Add a Free Trial so the first box ships before recurring billing begins.",
    },
    {
      question: "Can I run it on HPOS high-performance order storage?",
      answer:
        "Yes. ArraySubs declares full HPOS (custom order tables) compatibility.",
    },
  ],
  "online-courses": [
    {
      question: "Can I release modules on a schedule?",
      answer:
        "Yes. Content Dripping unlocks lessons by days-since-enrollment or fixed dates.",
    },
    {
      question: "Can I offer a free first lesson?",
      answer:
        "Yes. A Free Trial or free tier unlocks the intro, then Member Access gates the rest behind a paid plan.",
    },
    {
      question: "Can I create free, basic, and premium course tiers?",
      answer:
        "Yes. Variable Subscription Products create each tier with its own price and access.",
    },
    {
      question: "Can I gate advanced lessons to higher tiers?",
      answer:
        "Yes. Member Access rules restrict premium modules and CPT lessons by plan.",
    },
    {
      question: "Can I gate an Elementor or Gutenberg lesson block?",
      answer:
        "Yes. Elementor Container Restriction and Gutenberg Block Restriction gate lesson sections natively in the builder.",
    },
    {
      question: "Can I tease a locked lesson without revealing it?",
      answer:
        "Yes. Partial Content Restriction shows an intro and gates the rest of the lesson body.",
    },
    {
      question: "Can I let students upgrade mid-course?",
      answer:
        "Yes. Plan Switching upgrades with proration, right from the Customer Portal.",
    },
    {
      question: "Can I sell lifetime access?",
      answer:
        "Yes. Use a Lifetime Deal or a Fixed-Date (Pro) enrollment for lifetime-style access.",
    },
    {
      question: "Can I track how many students convert from a trial?",
      answer:
        "Yes. Analytics show trial conversion, churn, and ARPU by plan.",
    },
    {
      question: "Can I gate downloadable worksheets?",
      answer:
        "Yes. Restricted Downloads gate files by plan or subscription status.",
    },
    {
      question: "Can I add a community or coaching upsell tier?",
      answer:
        "Yes. Add a higher tier as a variation and let students switch up with proration.",
    },
    {
      question: "Can I email students about new modules?",
      answer:
        "Yes. Emails are customizable, and you can notify on renewals and lifecycle changes.",
    },
    {
      question: "Can I move a lapsing student to a free tier instead of losing them?",
      answer:
        "Yes (Pro). Auto-Downgrade on Failure moves them to a free tier if payment can't be recovered.",
    },
    {
      question: "Can I keep ArraySubs and add an LMS later?",
      answer:
        "Yes. ArraySubs runs billing and access; layer an LMS on top for quizzes and certificates.",
    },
    {
      question: "Can I require login to view gated lessons?",
      answer:
        "Yes. Member Access and the visibility Shortcodes gate content by login state and plan.",
    },
    {
      question: "Can I add custom fields to student profiles?",
      answer:
        "Yes. Profile Builder adds custom fields and avatars to My Account.",
    },
    {
      question: "Can I offer a coupon for a course?",
      answer:
        "Yes. Coupons work with course subscriptions.",
    },
    {
      question: "Can I let students pause a course?",
      answer:
        "Yes. The Customer Portal offers Pause / Vacation Mode and Skip Next Renewal so students keep their place.",
    },
  ],
  "content-publishers": [
    {
      question: "Can I build a metered 'three free articles' paywall?",
      answer:
        "Yes. Combine post restriction with Product & Purchase Value Conditions to meter free reads before requiring a subscription.",
    },
    {
      question: "Can I hard-gate all premium articles?",
      answer:
        "Yes. Member Access restricts posts, CPTs, or URL patterns by plan for a full paywall.",
    },
    {
      question: "Can I gate a whole section or archive by URL?",
      answer:
        "Yes. URL Path Rules support exact, prefix, contains, and regex patterns.",
    },
    {
      question: "Can I show different content to Basic and Premium?",
      answer:
        "Yes. Per-tier Member Access rules show each plan the right subset of content.",
    },
    {
      question: "Can I drip exclusive posts weekly?",
      answer:
        "Yes. Content Dripping schedules premium pieces on a weekly or monthly cadence.",
    },
    {
      question: "Can I keep teasers public for SEO?",
      answer:
        "Yes. Partial Content Restriction gates the full body while teasers and metadata stay public and indexable.",
    },
    {
      question: "Can I sell monthly and annual subscriptions?",
      answer:
        "Yes. Variable Subscription Products expose monthly and annual options with proration between them.",
    },
    {
      question: "Can I stop password sharing?",
      answer:
        "Yes (Pro). Multi-Login Prevention blocks concurrent sessions on a shared login.",
    },
    {
      question: "Can I gate downloadable reports or datasets?",
      answer:
        "Yes. Restricted Downloads gate files by plan or subscription status.",
    },
    {
      question: "Can I offer a free month to keep a subscriber?",
      answer:
        "Yes. The Retention Flow Builder can present a discount or free period at cancellation.",
    },
    {
      question: "Can I sell a single article as well as a subscription?",
      answer:
        "Yes. It's built on WooCommerce, so one-off purchases and subscriptions coexist.",
    },
    {
      question: "Can I see which articles convert readers?",
      answer:
        "Yes. Analytics show conversions and churn so you can tune pricing and packaging.",
    },
    {
      question: "Can I redirect or block visitors from a gated section?",
      answer:
        "Yes. Shop Restrictions and Member Access can redirect, 404, prompt login, or block purchase on gated content.",
    },
    {
      question: "Can I accept reader donations or run a funding campaign?",
      answer:
        "The Donation & Crowdfunding Module is a planned Pro module (coming soon) for recurring supporter contributions.",
    },
    {
      question: "Can I customize subscriber emails?",
      answer:
        "Yes. Every Email's subject, heading, and content is editable.",
    },
    {
      question: "Can I export my subscriber list?",
      answer:
        "Yes. Export subscriptions to CSV or JSON for your email platform.",
    },
    {
      question: "Can I apply a coupon to a subscription?",
      answer:
        "Yes. Coupons work with subscriptions, including recurring discounts.",
    },
  ],
  "service-businesses": [
    {
      question: "Can I charge an onboarding fee plus a monthly retainer?",
      answer:
        "Yes. Add a Signup Fee billed with the first recurring payment, then the retainer each cycle.",
    },
    {
      question: "Can I bill clients monthly, quarterly, or annually?",
      answer:
        "Yes. Variable Subscription Products support per-variation billing intervals.",
    },
    {
      question: "Can I let a client pause between projects?",
      answer:
        "Yes. Pause / Vacation Mode in the portal stops billing until the client resumes.",
    },
    {
      question: "Can I create Bronze, Silver, and Gold tiers?",
      answer:
        "Yes. Build each tier as a variation with its own cycle, Signup Fee, and price.",
    },
    {
      question: "Can I collect payments automatically?",
      answer:
        "Yes (Pro). First-Class Stripe Support or PayPal collect retainers on schedule — no manual invoicing.",
    },
    {
      question: "Can I show what each service tier includes?",
      answer:
        "Yes (Pro). Feature Manager renders a 'What's included' list on the product page.",
    },
    {
      question: "Can I give clients time to fix a failed card?",
      answer:
        "Yes. A 2-Phase Grace Period keeps service active while the client updates payment; Pro adds Auto-Retry.",
    },
    {
      question: "Can my support tools tell who's an active client?",
      answer:
        "Yes. Role-Based Conditions assign a client role by subscription status that any role-aware tool can read.",
    },
    {
      question: "Can I downgrade a client instead of losing them?",
      answer:
        "Yes. The Retention Flow Builder offers a downgrade or pause at cancellation.",
    },
    {
      question: "Can clients manage their own retainer?",
      answer:
        "Yes. The Customer Portal handles invoices, pause, skip, Plan Switching, and payment updates.",
    },
    {
      question: "Can I refund a partial month fairly?",
      answer:
        "Yes. Manage Refunds calculates prorated refunds by daily rate for the remaining period.",
    },
    {
      question: "Can I set a different price for the first month vs renewals?",
      answer:
        "Yes. Use Different Renewal Price, or a Signup Fee plus a separate renewal price per plan.",
    },
    {
      question: "Can I create a subscription for a phone order?",
      answer:
        "Yes. Create Subscription from WP Admin sets up subscriptions manually for phone orders and migrations.",
    },
    {
      question: "Can I see a log of scheduled jobs and webhooks?",
      answer:
        "Yes (Pro). Audits and Logs and Gateway Health show background jobs and webhook status.",
    },
    {
      question: "Can I split a fixed project fee into payments?",
      answer:
        "Installment / Split Payments is a planned Pro module (coming soon) for splitting a fixed price across scheduled payments.",
    },
    {
      question: "Can I email clients before each renewal?",
      answer:
        "Yes. Emails send renewal reminders a configurable number of days before billing.",
    },
    {
      question: "Can I apply a coupon or discount to a retainer?",
      answer:
        "Yes. Coupons work with retainer subscriptions.",
    },
  ],
  "b2b-wholesale-memberships": [
    {
      question: "Can I hide wholesale products from retail customers?",
      answer:
        "Yes. Member Access and Shop Restrictions restrict product categories, URLs, downloads, and pages by role, plan, or subscription status.",
    },
    {
      question: "Can I assign a WordPress role to active buyers?",
      answer:
        "Yes. Role-Based Conditions assign or remove buyer roles as subscriptions activate, pause, expire, or cancel.",
    },
    {
      question: "Can I offer member-only pricing?",
      answer:
        "Yes. Member Discounts apply discounts only to eligible members.",
    },
    {
      question: "Can I tier buyers by lifetime spend or past orders?",
      answer:
        "Yes. Product & Purchase Value Conditions build access rules from purchased products, categories, or lifetime spend.",
    },
    {
      question: "Can I block a purchase for non-members?",
      answer:
        "Yes. Shop Restrictions can redirect, 404, prompt login, or block purchase on gated products.",
    },
    {
      question: "Can I redirect buyers away from wp-admin?",
      answer:
        "Yes. Admin Dashboard Access redirects unauthorized users away from wp-admin while administrators and selected staff roles keep access.",
    },
    {
      question: "Can I hide the WordPress admin bar for buyers?",
      answer:
        "Yes. Admin Bar Visibility hides the frontend toolbar for non-admin customers.",
    },
    {
      question: "Can I route buyer logins through My Account?",
      answer:
        "Yes. WordPress Login Page redirects customer login and registration traffic to WooCommerce My Account.",
    },
    {
      question: "Can support verify what a buyer sees?",
      answer:
        "Yes. Login as User opens a buyer's frontend session without a password.",
    },
    {
      question: "Can I migrate existing buyers into a membership?",
      answer:
        "Yes. Create Subscription from WP Admin sets up subscriptions manually for migrations.",
    },
    {
      question: "Can I combine role and spend rules with AND/OR logic?",
      answer:
        "Yes. The Advanced Condition Builder nests conditions across role, product, spend, and subscription status.",
    },
    {
      question: "Can I stop shared wholesale logins?",
      answer:
        "Yes (Pro). Multi-Login Prevention limits concurrent sessions with global and plan-level controls.",
    },
  ],
  "subscription-support-operations": [
    {
      question: "Can support log in as the customer?",
      answer:
        "Yes. Login as User lets administrators open a non-admin customer's frontend session for troubleshooting.",
    },
    {
      question: "Can I see a subscription timeline?",
      answer:
        "Yes. Subscription Notes logs lifecycle changes, renewal events, gateway activity, admin notes, and customer-visible notes.",
    },
    {
      question: "Can I search a full member profile?",
      answer:
        "Yes (Pro). Member Insight shows profile, subscription, commerce, address, credit, and shortcut context in one place.",
    },
    {
      question: "Can I diagnose webhook problems?",
      answer:
        "Yes (Pro). Gateway Health shows gateway status, webhook URLs, capabilities, and event logs.",
    },
    {
      question: "Can I see scheduled-job failures?",
      answer:
        "Yes (Pro). Audits and Logs includes scheduled-job logs and activity audit screens.",
    },
    {
      question: "Can I refund to the gateway, manually, or as credit?",
      answer:
        "Yes. Manage Refunds issues prorated, full, or partial refunds to the gateway, manually, or as Store Credit (Pro).",
    },
    {
      question: "Can I create a subscription manually?",
      answer:
        "Yes. Create Subscription from WP Admin builds subscriptions for migrations, phone orders, and corrections.",
    },
    {
      question: "Can I keep staff out of wp-admin?",
      answer:
        "Yes. Admin Dashboard Access and Admin Bar Visibility keep non-admin staff on a clean frontend workflow.",
    },
    {
      question: "Can I export subscriptions for support review?",
      answer:
        "Yes. Manage Subscriptions exports filtered subscription data to CSV or JSON.",
    },
    {
      question: "Can I see revenue and churn trends?",
      answer:
        "Yes. Analytics reports revenue, growth, churn, and retention across the store.",
    },
    {
      question: "Can I notify customers of renewals and failures automatically?",
      answer:
        "Yes. Emails send automated lifecycle notifications for renewals, payment failures, and cancellations.",
    },
  ],
  "store-credit-loyalty": [
    {
      question: "Can I refund to store credit?",
      answer:
        "Yes (Pro). Manage Refunds supports refund-to-credit from WooCommerce order screens.",
    },
    {
      question: "Can customers buy credit with a bonus?",
      answer:
        "Yes (Pro). The credit purchase product sells fixed or custom amounts with an optional bonus percentage.",
    },
    {
      question: "Can customers see their balance?",
      answer:
        "Yes. Store Credit appears in the Customer Portal and via Shortcodes in My Account.",
    },
    {
      question: "Can I manually adjust a customer's credit?",
      answer:
        "Yes (Pro). Store Credit management lets admins add or deduct credit and review transaction histories.",
    },
    {
      question: "Can credit expire?",
      answer:
        "Yes. Store Credit settings include expiration controls, and credit emails notify customers before and after expiry.",
    },
    {
      question: "Can I give loyalty or promotional pricing too?",
      answer:
        "Yes. Member Discounts apply loyalty pricing, and Store Credit issues promotional balances customers can spend.",
    },
    {
      question: "Can I use credit as a retention offer?",
      answer:
        "Yes. Pair Store Credit with the Retention Flow Builder to preserve value when customers cancel or downgrade.",
    },
    {
      question: "Can I see which credit offers actually save customers?",
      answer:
        "Yes. Retention Analytics scores retention offers, and Member Insight (Pro) shows each customer's credit context.",
    },
  ],
};

export const canDoForUseCase = (slug: string): UseCaseFaq[] =>
  USE_CASE_CAN_DO[slug] ?? [];

export const getUseCase = (slug: string): UseCase | undefined =>
  USE_CASES.find((useCase) => useCase.slug === slug);

/** Use cases that rely on a given feature — powers the feature → use-case links. */
export const useCasesForFeature = (featureSlug: string): UseCase[] =>
  USE_CASES.filter((useCase) => useCase.relatedFeatures.includes(featureSlug));
