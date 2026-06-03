import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  GraduationCap,
  Monitor,
  Newspaper,
  Package,
  Users,
} from "lucide-react";

/**
 * Single source of truth for the ArraySubs use-case pages. Each use case lists
 * the feature slugs it relies on (`relatedFeatures`); the reverse mapping
 * (which use cases a feature powers) is derived with `useCasesForFeature`, so
 * the cross-links are defined in exactly one place.
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
      "Sell tiered software licenses and usage-based plans — feature-gated access, automatic billing, and churn-saving retention.",
    seoTitle: "WooCommerce Subscriptions for SaaS & Digital Products",
    metaDescription:
      "Build a SaaS billing system on WooCommerce — tiered plans, feature-gated access, usage top-ups with store credit, automatic Stripe/PayPal/Paddle billing, and retention flows.",
    h1: "Sell SaaS & digital products with recurring billing",
    heroSubtitle:
      "Turn WooCommerce into a full SaaS billing engine — tiered plans, feature entitlements, usage credits, and automatic recurring payments, all on infrastructure you already own.",
    heroHighlights: [
      "Tiered plans & per-plan entitlements",
      "Usage credits & prepaid top-ups",
      "Automatic Stripe, PayPal & Paddle billing",
    ],
    intro:
      "SaaS vendors, plugin shops, and API platforms need four things in one place: ==recurring billing, feature-gated access, usage limits, and churn prevention==. Most teams bolt together a payment gateway, an entitlements hack, a metering script, and a separate cancellation survey — then spend months keeping them in sync. ArraySubs turns WooCommerce into a ==complete SaaS billing engine== instead. Create Basic, Pro, and Enterprise plans as variable subscriptions, define exactly what each tier unlocks with Feature Manager, meter usage with store-credit tokens, automate recurring payments through ==Stripe, PayPal, or Paddle==, and intercept cancellations with targeted retention offers — all from one plugin, with ==no per-transaction billing-platform fees==.",
    stats: [
      { value: "3", label: "Entitlement types" },
      { value: "MRR", label: "Churn & ARPU tracked" },
      { value: "3", label: "Automatic gateways" },
      { value: "<10 min", label: "To live" },
    ],
    audience: [
      {
        title: "Plugin & theme shops",
        description:
          "Sell license tiers with per-plan feature limits and automatic renewals on your own store.",
      },
      {
        title: "API & developer platforms",
        description:
          "Meter API calls or compute with usage credits and prepaid top-ups, and gate docs by plan.",
      },
      {
        title: "Web apps & micro-SaaS",
        description:
          "Run Basic/Pro/Enterprise tiers with trials, proration, and a self-service billing portal.",
      },
      {
        title: "Digital tools & downloads",
        description:
          "Bundle premium downloads and updates behind a subscription with entitlement-based access.",
      },
    ],
    points: [
      {
        problem: "Customers don't know which features their plan includes.",
        solution:
          "Feature Manager defines per-plan entitlements — toggles, numeric limits, and text details — and shows a 'What's included' list on the product page so upgrades are confident.",
      },
      {
        problem: "Failed payments cancel accounts silently.",
        solution:
          "A two-phase grace period keeps access active while it retries, then Pro auto-downgrades to a cheaper tier instead of cancelling — recovering revenue you'd otherwise lose.",
      },
      {
        problem: "Usage-based billing is hard to model in WooCommerce.",
        solution:
          "Store credit acts as a prepaid token wallet — customers buy top-ups, and Feature Manager limits enforce quotas like '100 API calls' for pay-as-you-go or prepaid plans.",
      },
      {
        problem: "Upgrades, downgrades, and proration get messy.",
        solution:
          "Plan switching offers three proration modes (immediate, at renewal, or none) so customers change tiers instantly with the math handled automatically.",
      },
      {
        problem: "Churn insight lives in a separate tool.",
        solution:
          "The Retention Flow captures why customers leave and which offers save them, and analytics surface MRR, churn rate, and ARPU — all in the same plugin.",
      },
      {
        problem: "Trials leak revenue when cards fail at conversion.",
        solution:
          "Trial management runs daily conversions and renewal reminders before the charge, and Pro can auto-downgrade rather than drop a converting trial.",
      },
    ],
    steps: [
      {
        title: "Run the setup wizard",
        description:
          "Choose the SaaS profile and ArraySubs preconfigures billing, grace periods, and checkout for software.",
      },
      {
        title: "Create your plan tiers",
        description:
          "Build Basic, Pro, and Enterprise as variable subscriptions with their own cycles, trials, and prices.",
      },
      {
        title: "Define entitlements",
        description:
          "Use Feature Manager to set per-plan toggles and numeric limits, then show 'What's included' on each product.",
      },
      {
        title: "Connect automatic payments",
        description:
          "Add Stripe, PayPal, or Paddle for hands-off recurring billing with SCA/3DS support.",
      },
      {
        title: "Turn on retention & analytics",
        description:
          "Enable the Retention Flow and watch MRR, churn, and trial conversion in the dashboard.",
      },
    ],
    playbooks: [
      {
        title: "Freemium with paid upgrades",
        description:
          "A free tier with limited entitlements, a $29/mo Pro that unlocks advanced features, and a 14-day trial that auto-converts.",
      },
      {
        title: "Usage-based API plan",
        description:
          "A base subscription plus prepaid store-credit top-ups, with Feature Manager enforcing a monthly call quota.",
      },
      {
        title: "Three-tier developer license",
        description:
          "Basic, Pro, and Agency tiers gated by Feature Manager, with plan switching and proration as customers grow.",
      },
    ],
    outcomes: [
      "Reduce churn with retention flows that offer discounts or downgrades at cancellation.",
      "Grow MRR with feature-based upsells and usage top-ups in one system.",
      "Scale with automatic Stripe, PayPal, and Paddle billing — no manual invoicing.",
      "Build trust by showing exactly what each tier includes.",
      "Track MRR, churn, ARPU, and trial conversion in real time.",
    ],
    faq: [
      {
        question: "Can I run a credits-based usage model?",
        answer:
          "Yes. Use store credit as a prepaid token wallet — customers buy top-ups to add credit, and Feature Manager numeric limits (like '100 API calls') enforce quotas for pay-as-you-go or prepaid models.",
      },
      {
        question: "What happens when an automatic payment fails?",
        answer:
          "A two-phase grace period keeps the account active for a few days while it retries; Pro can auto-downgrade to a cheaper plan instead of cancelling, saving the revenue.",
      },
      {
        question: "How do I gate features per plan?",
        answer:
          "Member Access Control gates pages, downloads, and URLs by plan, and Feature Manager (Pro) defines per-plan toggles, numeric limits, and text details shown on the product page.",
      },
      {
        question: "Does ArraySubs replace a dedicated billing platform?",
        answer:
          "For most WooCommerce-based SaaS, yes. ArraySubs runs recurring billing, entitlements, metering, dunning, and retention on your own store — without a separate billing service or its per-transaction fees.",
      },
      {
        question: "Can I offer monthly and annual pricing?",
        answer:
          "Yes. A variable subscription can expose monthly and annual options, each with its own price and trial, and customers switch between them with automatic proration.",
      },
      {
        question: "How do trials and SCA/3D Secure work together?",
        answer:
          "Stripe (Pro) uses SetupIntents to securely store a card during a $0 trial, then charges off-session at conversion with full SCA/3DS compliance.",
      },
      {
        question: "Can I gate documentation or premium downloads by plan?",
        answer:
          "Yes. Member Access Control restricts pages, posts, URLs, and downloads by subscription or plan, so premium docs and assets are visible only to the right tiers.",
      },
    ],
    relatedFeatures: [
      "subscriptions-and-recurring-products",
      "feature-manager",
      "member-access-control",
      "retention-flow-builder",
      "store-credit",
      "payment-gateways",
    ],
  },
  {
    slug: "membership-sites",
    icon: Users,
    name: "Membership Sites",
    cardDescription:
      "Run gated communities and premium libraries — tiered access, content dripping, and self-service member management.",
    seoTitle: "Build a Membership Site on WooCommerce",
    metaDescription:
      "Build a complete WooCommerce membership site — restrict content by tier, drip course material, map roles automatically, run recurring billing, and give members a self-service portal.",
    h1: "Build a complete WooCommerce membership site",
    heroSubtitle:
      "Recurring billing, precise content access, member tiers, and content dripping — all in one free plugin, configured in minutes with a guided wizard.",
    heroHighlights: [
      "10 access conditions, AND/OR logic",
      "Scheduled content dripping",
      "Self-service member portal",
    ],
    intro:
      "Membership sites live or die on four things working together: ==recurring billing, precise content access, member tiers, and scheduled content==. Stitch those from separate plugins and you get conflicts, role mismatches, and members emailing you to make every change. ArraySubs does ==all four in one plugin==. Build Silver, Gold, and Platinum plans as variable subscriptions, restrict pages, posts, downloads, and URLs by plan with a ==10-condition rules engine==, drip content on a schedule, and ==map WordPress roles automatically== so the rest of your stack honors your tiers. Members manage their own subscriptions in the portal, and a 9-step wizard configures the whole thing in minutes.",
    stats: [
      { value: "10", label: "Access conditions" },
      { value: "12", label: "Rule operators" },
      { value: "Free", label: "Core, forever" },
      { value: "<10 min", label: "To live" },
    ],
    audience: [
      {
        title: "Coaching & community sites",
        description:
          "Gate courses, calls, and community spaces behind monthly or annual tiers.",
      },
      {
        title: "Premium content libraries",
        description:
          "Restrict articles, videos, and downloads by plan and drip new material weekly.",
      },
      {
        title: "Resource & template vaults",
        description:
          "Sell access to a growing library with member-only pricing and gated downloads.",
      },
      {
        title: "Associations & nonprofits",
        description:
          "Run recurring memberships with role-based perks and fixed-period options.",
      },
    ],
    points: [
      {
        problem: "Building tiers with different access levels is complex.",
        solution:
          "Variable subscriptions define per-tier billing and trials; Member Access Control gates content precisely with nested AND/OR rules.",
      },
      {
        problem: "You want to release material over time, not all at once.",
        solution:
          "Content dripping releases gated posts on a schedule — ideal for phased courses or weekly exclusives.",
      },
      {
        problem: "Other plugins don't respect your membership logic.",
        solution:
          "Role mapping assigns WordPress roles by subscription status, so third-party plugins honor your tiers.",
      },
      {
        problem: "Members email you to upgrade, pause, or cancel.",
        solution:
          "The customer portal hands skip, pause, plan-switch, cancel, and invoice payment to members — cutting support tickets.",
      },
      {
        problem: "Payment failures quietly lose members.",
        solution:
          "A two-phase grace period keeps access active while collecting payment; Pro adds auto-retry and auto-downgrade.",
      },
      {
        problem: "Members sign up mid-month but you want annual cohorts.",
        solution:
          "Renewal sync aligns billing dates, and variable subscriptions let each tier set its own cycle, trial, and sign-up fee.",
      },
    ],
    steps: [
      {
        title: "Run the membership wizard",
        description:
          "Pick the Membership profile to preconfigure access control, billing, and the portal.",
      },
      {
        title: "Create tier plans",
        description:
          "Build Silver/Gold/Platinum as variable subscriptions with per-tier pricing and trials.",
      },
      {
        title: "Gate your content",
        description:
          "Add access rules to restrict pages, posts, downloads, and URLs by plan, with AND/OR logic.",
      },
      {
        title: "Schedule dripping",
        description:
          "Release modules or exclusives over time with date-based content dripping.",
      },
      {
        title: "Enable portal & retention",
        description:
          "Let members self-serve and intercept cancellations with retention offers.",
      },
    ],
    playbooks: [
      {
        title: "Three-tier coaching community",
        description:
          "Silver (community), Gold (+ group calls), Platinum (+ 1:1), with role mapping into a forum plugin.",
      },
      {
        title: "Dripped course membership",
        description:
          "A monthly plan that drips one module per week, with a free trial and an upgrade to lifetime access.",
      },
      {
        title: "Members-only resource vault",
        description:
          "Annual access to a download library with member pricing and multi-login prevention.",
      },
    ],
    outcomes: [
      "Restrict content with surgical precision across pages, posts, downloads, and URLs.",
      "Cut support overhead with a self-service member portal.",
      "Raise lifetime value by offering pauses and downgrades instead of losing members.",
      "Release content on your schedule with dripping.",
      "Automate billing with flexible cycles, trials, and sign-up fees.",
    ],
    faq: [
      {
        question: "Can I run memberships without recurring billing?",
        answer:
          "Yes. Create fixed-period membership products for one-time access, or use the access-control system on its own — subscription billing is optional.",
      },
      {
        question: "How do I stop members sharing logins?",
        answer:
          "Multi-login prevention (Pro) detects concurrent sessions and enforces one active login per subscription, protecting per-seat revenue.",
      },
      {
        question: "Can each tier have its own member discount?",
        answer:
          "Yes. Member discounts apply tier-specific pricing across your store, and variable products let you build multiple tier levels.",
      },
      {
        question: "Can I combine free and paid membership tiers?",
        answer:
          "Yes. Create a free tier with limited access and paid tiers that unlock more, then gate content per plan with access rules.",
      },
      {
        question: "Does it work with my page builder?",
        answer:
          "Yes. Access control and the My Account editor work with Gutenberg, Elementor, and Bricks, and shortcodes gate content inline anywhere.",
      },
      {
        question: "Can members pause instead of cancelling?",
        answer:
          "Yes. The portal offers pause and skip, and the Retention Flow can present a pause or downgrade at cancellation to keep members.",
      },
      {
        question: "How do I drip content fairly for members who join later?",
        answer:
          "Content dripping schedules visibility relative to each member's purchase date, so everyone sees material on the same cadence regardless of when they joined.",
      },
    ],
    relatedFeatures: [
      "member-access-control",
      "subscriptions-and-recurring-products",
      "customer-portal",
      "retention-flow-builder",
      "profile-builder",
      "store-credit",
    ],
  },
  {
    slug: "subscription-boxes",
    icon: Package,
    name: "Subscription Boxes",
    cardDescription:
      "Recurring physical-product deliveries — flexible cycles, skip & pause, batch shipping, and churn-saving offers.",
    seoTitle: "Run a WooCommerce Subscription Box Business",
    metaDescription:
      "Run a subscription box on WooCommerce — recurring billing, skip & pause, renewal sync for batch shipping, retention offers, and tiered box plans for physical products.",
    h1: "Run a subscription box business on WooCommerce",
    heroSubtitle:
      "Recurring billing for physical products, with skip & pause, batch-shipping renewal sync, and retention flows that keep subscribers from churning.",
    heroHighlights: [
      "Skip & pause from the portal",
      "Renewal sync for batch shipping",
      "Retention offers at cancellation",
    ],
    intro:
      "Subscription box businesses have a different shape of problem: recurring physical shipments, customers who need to pause for a month, and churn driven by shipping costs or changing tastes. ArraySubs is built for it. Configure box plans with weekly, monthly, or quarterly cycles and per-tier pricing, let customers ==skip the next box or pause indefinitely== from the portal, ==sync renewals so every box ships on the same day==, and intercept cancellations with a ==discount, pause, or downgrade==. The free core handles the whole flow, and the setup wizard gets most box stores live in ==under ten minutes==.",
    stats: [
      { value: "4+", label: "Billing cycles" },
      { value: "Same-day", label: "Batch shipping" },
      { value: "4", label: "Retention offers" },
      { value: "<10 min", label: "To live" },
    ],
    audience: [
      {
        title: "Food & beverage clubs",
        description:
          "Monthly snack, coffee, or wine boxes with pause options for travel and holidays.",
      },
      {
        title: "Beauty & lifestyle boxes",
        description:
          "Curated monthly boxes with basic, premium, and deluxe tiers.",
      },
      {
        title: "Hobby & collectible crates",
        description:
          "Themed monthly or quarterly crates with skip controls and limited runs.",
      },
      {
        title: "Replenishment & essentials",
        description:
          "Recurring deliveries of consumables with flexible cadence and renewal sync.",
      },
    ],
    points: [
      {
        problem: "Customers have no way to pause or skip a month.",
        solution:
          "The portal offers skip-next and pause-indefinitely, so subscribers stay instead of cancelling.",
      },
      {
        problem: "Cancellations are unpredictable.",
        solution:
          "The Retention Flow asks why they're leaving and offers a discount, pause, or downgrade on the spot.",
      },
      {
        problem: "Payment failures cause silent cancellations.",
        solution:
          "A two-phase grace period keeps the box active while retrying; Pro auto-downgrades instead of losing them.",
      },
      {
        problem: "Variable renewal dates make shipping chaotic.",
        solution:
          "Renewal sync batches all renewals to the same calendar day, so you ship in one run.",
      },
      {
        problem: "You need basic, premium, and deluxe boxes.",
        solution:
          "Variable subscriptions give each box tier its own cycle, sign-up fee, and renewal price.",
      },
      {
        problem: "Shipping address changes arrive too late.",
        solution:
          "Customers update shipping from the portal up to a cutoff before renewal (Pro), so the right address is locked in before fulfillment.",
      },
    ],
    steps: [
      {
        title: "Run the box wizard",
        description:
          "Pick the Subscription Box profile to set lenient grace periods and skip/pause defaults.",
      },
      {
        title: "Create box plans",
        description:
          "Build basic/premium/deluxe as variable subscriptions with their own cycles and prices.",
      },
      {
        title: "Turn on skip & pause",
        description:
          "Enable portal skip-next and pause so subscribers flex instead of cancelling.",
      },
      {
        title: "Sync renewals",
        description:
          "Batch all renewals to one calendar day so fulfillment ships in a single run.",
      },
      {
        title: "Add retention offers",
        description:
          "Configure discount, pause, and downgrade offers to intercept cancellations.",
      },
    ],
    playbooks: [
      {
        title: "Monthly snack club",
        description:
          "A single monthly box with skip-next for travel, renewal sync to the 1st, and a 'pause' retention offer.",
      },
      {
        title: "Tiered beauty box",
        description:
          "Basic/Premium/Deluxe variations, an annual prepaid option, and a downgrade offer at cancel.",
      },
      {
        title: "Quarterly collectible crate",
        description:
          "A quarterly cycle with a limited subscription length and skip controls between drops.",
      },
    ],
    outcomes: [
      "Cut churn with skip and pause options and cancellation interception.",
      "Simplify fulfillment by batching shipments with renewal sync.",
      "Recover failed payments with grace periods before cancelling.",
      "Raise lifetime value by offering downgrades over cancellation.",
      "Scale with automatic billing and self-service management.",
    ],
    faq: [
      {
        question: "Can customers pause without losing their place?",
        answer:
          "Yes. The portal lets subscribers pause indefinitely and reactivate anytime — the box won't ship until they restart, perfect for vacations or budgets.",
      },
      {
        question: "How do I ship all boxes on the same day?",
        answer:
          "Renewal sync aligns renewal dates to a chosen calendar day, so every box renews together and your team ships one batch.",
      },
      {
        question: "Which billing cycles are supported?",
        answer:
          "Daily, weekly, monthly, or yearly, with optional sign-up fees and different renewal prices — and per-tier cycles via variable subscriptions.",
      },
      {
        question: "Can I offer prepaid 3, 6, or 12-month plans?",
        answer:
          "Yes. Set a subscription length (number of cycles) or use yearly billing with a sign-up fee to sell prepaid box runs that end automatically.",
      },
      {
        question: "What happens to a paused box's shipping?",
        answer:
          "A paused subscription doesn't renew or ship until the customer resumes, so you never fulfill a box for someone who's away.",
      },
      {
        question: "Can customers swap to a different box tier?",
        answer:
          "Yes. Plan switching lets them upgrade or downgrade between box tiers with proration, right from the portal.",
      },
    ],
    relatedFeatures: [
      "subscriptions-and-recurring-products",
      "billing-renewals-and-refunds",
      "customer-portal",
      "retention-flow-builder",
      "payment-gateways",
      "emails",
    ],
  },
  {
    slug: "online-courses",
    icon: GraduationCap,
    name: "Online Courses",
    cardDescription:
      "Sell courses with subscription access — drip modules, tiered access, student portals, and recurring billing.",
    seoTitle: "Sell Online Courses with Subscription Access on WooCommerce",
    metaDescription:
      "Build a course membership on WooCommerce — drip modules over time, gate lessons by tier, give students a portal, and run recurring billing without a heavy LMS for basic setups.",
    h1: "Sell online courses with subscription access",
    heroSubtitle:
      "Drip modules over weeks, gate lessons by tier, and let students manage their own plans — ArraySubs handles billing and access without a heavy LMS.",
    heroHighlights: [
      "Drip modules over time",
      "Tiered lesson access",
      "Student self-service portal",
    ],
    intro:
      "Subscription-based courses need three things a plain cart can't give you: ==scheduled content release, tiered access, and a student portal== for lifetime management. ArraySubs supplies the billing and access layer so you don't need a ==heavy LMS== for a straightforward course. ==Drip modules by days-since-enrollment== so learners can't binge ahead, build Free, Basic, and Premium tiers as variable subscriptions, gate advanced lessons by plan, let students upgrade or downgrade themselves, and use ==retention offers to save students== who try to cancel mid-course. Pair it with your page builder's lesson layouts and you have a complete course membership.",
    stats: [
      { value: "Drip", label: "Scheduled modules" },
      { value: "3-tier", label: "Free / Basic / Pro" },
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
          "Run time-released curricula with upgrade paths to group or 1:1 coaching.",
      },
      {
        title: "Tutoring & test prep",
        description:
          "Gate practice sets and lessons by plan and track conversion from free to paid.",
      },
      {
        title: "Certification & CE providers",
        description:
          "Offer annual access tiers with fixed-period or renewing enrollment.",
      },
    ],
    points: [
      {
        problem: "You release modules over time but can't enforce it.",
        solution:
          "Content dripping schedules lessons by days-since-purchase or fixed dates, pacing your curriculum without code.",
      },
      {
        problem: "Free and paid tiers need different access.",
        solution:
          "Variable subscriptions create Free, Basic, and Premium tiers; Member Access Control unlocks advanced modules by plan.",
      },
      {
        problem: "Students want to upgrade mid-course.",
        solution:
          "Plan switching upgrades with automatic proration, or downgrades to keep them enrolled.",
      },
      {
        problem: "Payment failures drop students without warning.",
        solution:
          "A grace period keeps access active while retrying; Pro can auto-downgrade to a free tier instead of cancelling.",
      },
      {
        problem: "You don't know which content retains students.",
        solution:
          "Analytics show trial conversion, churn, and cohort drop-off so you can improve pacing.",
      },
      {
        problem: "You want a free intro that converts to paid.",
        solution:
          "Offer a free tier or trial that unlocks the first module, then gate the rest behind a paid plan with one-click upgrade.",
      },
    ],
    steps: [
      {
        title: "Run the setup wizard",
        description:
          "Choose a content or membership profile to configure access control and billing for courses.",
      },
      {
        title: "Create course tiers",
        description:
          "Build Free/Basic/Premium as variable subscriptions with trials and prices.",
      },
      {
        title: "Drip your modules",
        description:
          "Schedule lessons by days-since-purchase so the curriculum unlocks on your cadence.",
      },
      {
        title: "Gate advanced lessons",
        description:
          "Restrict premium modules and downloads by plan with access rules.",
      },
      {
        title: "Enable portal & analytics",
        description:
          "Let students manage plans and track trial conversion, churn, and ARPU.",
      },
    ],
    playbooks: [
      {
        title: "Dripped flagship course",
        description:
          "A monthly plan that releases one module per week, with a free first lesson and an annual discount.",
      },
      {
        title: "Freemium-to-premium ladder",
        description:
          "A free tier with intro lessons, a Basic tier for the full course, and a Premium tier with coaching.",
      },
      {
        title: "Cohort program with upgrades",
        description:
          "A fixed-period enrollment with a mid-course upgrade to a 1:1 tier via plan switching.",
      },
    ],
    outcomes: [
      "Control pacing with dripped modules — no rushing, no giving everything away at signup.",
      "Monetize free, basic, and premium tiers with automatic per-tier access.",
      "Reduce drop-off by pausing or discounting struggling students.",
      "Track trial conversions, churn, and ARPU per course.",
      "Skip extra LMS costs for basic courses — WooCommerce plus ArraySubs handles billing and access.",
    ],
    faq: [
      {
        question: "Do I need a dedicated LMS?",
        answer:
          "Not for basic courses — ArraySubs handles billing, access, and dripping. For quizzes, certificates, or progress tracking, pair it with a lightweight LMS or your page builder's course features.",
      },
      {
        question: "Can students see their access in the portal?",
        answer:
          "Yes. The portal shows their active subscription and tier, and shortcodes can display course-specific details.",
      },
      {
        question: "How do I offer lifetime access alongside monthly?",
        answer:
          "Use fixed-period membership products for one-time lifetime access, or variable subscriptions with yearly cycles for subscription-based access.",
      },
      {
        question: "Can I add a real LMS later without re-platforming?",
        answer:
          "Yes. ArraySubs controls billing and entitlements; you can layer an LMS on top for quizzes and certificates while ArraySubs keeps managing access.",
      },
      {
        question: "How do early and late students get the same experience?",
        answer:
          "Drip content relative to each student's enrollment date, so everyone progresses through modules on the same schedule no matter when they joined.",
      },
      {
        question: "Can students pay yearly for a discount?",
        answer:
          "Yes. Offer an annual variation at a lower effective price; students can switch between monthly and annual with proration.",
      },
    ],
    relatedFeatures: [
      "member-access-control",
      "subscriptions-and-recurring-products",
      "customer-portal",
      "retention-flow-builder",
      "analytics",
      "profile-builder",
    ],
  },
  {
    slug: "content-publishers",
    icon: Newspaper,
    name: "Content Publishers",
    cardDescription:
      "Paywall articles and media by tier — hard or metered paywalls, scheduled exclusives, and conversion analytics.",
    seoTitle: "WooCommerce Paywall & Content Subscriptions for Publishers",
    metaDescription:
      "Monetize content with a WooCommerce paywall — restrict articles, videos, and downloads by subscription tier, build hard or metered paywalls, drip exclusives, and track conversions.",
    h1: "Monetize content with subscription paywalls",
    heroSubtitle:
      "Gate premium articles and media by tier — hard or metered paywalls, scheduled exclusives, and conversion analytics, all in one plugin.",
    heroHighlights: [
      "Hard or metered paywall",
      "Scheduled exclusive drops",
      "Conversion & churn analytics",
    ],
    intro:
      "Publishers need a paywall that restricts premium content by tier while keeping free content open — without bolting on a separate paywall service that fights your subscription plugin. ArraySubs is the ==paywall and the subscriptions in one==. Gate articles, posts, and URL patterns by plan, build a ==metered 'a few free, then subscribe' model== using purchase-history conditions, ==drip exclusive pieces to loyal subscribers==, and use retention offers to beat paywall fatigue. Analytics show which articles convert readers and which tiers churn, so you can tune pricing and packaging — a complete paywall ==stood up in minutes==.",
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
          "Meter free articles, then gate premium coverage behind monthly or annual plans.",
      },
      {
        title: "Newsletters & blogs",
        description:
          "Run a paid tier with member-only posts and a full archive.",
      },
      {
        title: "Research & data publishers",
        description:
          "Gate reports, datasets, and downloads by subscription tier.",
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
          "Member Access Control combines URL and page restriction with purchase-history conditions to build either model — no code.",
      },
      {
        problem: "Free and premium subscribers see the same content.",
        solution:
          "Content rules gate articles by status or plan, so premium tiers unlock exclusive coverage.",
      },
      {
        problem: "You want to reward loyal subscribers with exclusives.",
        solution:
          "Content dripping schedules premium articles weekly or monthly to keep subscribers engaged.",
      },
      {
        problem: "Subscribers cancel from paywall fatigue.",
        solution:
          "The Retention Flow offers a discount or a free month to save them at the moment of cancellation.",
      },
      {
        problem: "You don't know what drives conversions or churn.",
        solution:
          "Analytics show which content converts and which tiers churn, so you can optimize.",
      },
      {
        problem: "Premium content spans many sections and URLs.",
        solution:
          "URL restriction supports exact, prefix, contains, and regex patterns, so you can gate whole sections, archives, or media paths in one rule.",
      },
    ],
    steps: [
      {
        title: "Choose your paywall model",
        description:
          "Decide hard (all premium gated) or metered (a few free, then gate) — both are rules-based, no code.",
      },
      {
        title: "Create reader tiers",
        description:
          "Build Basic and Premium plans as variable subscriptions with monthly and annual options.",
      },
      {
        title: "Gate premium content",
        description:
          "Restrict articles, sections, and downloads by plan with access and URL rules.",
      },
      {
        title: "Schedule exclusives",
        description:
          "Drip premium pieces on a weekly or monthly cadence to reward subscribers.",
      },
      {
        title: "Track & optimize",
        description:
          "Use analytics to see what converts and what churns, then tune pricing.",
      },
    ],
    playbooks: [
      {
        title: "Metered news paywall",
        description:
          "Three free articles tracked by purchase history, then a Basic monthly plan unlocks the rest.",
      },
      {
        title: "Premium newsletter tier",
        description:
          "A paid tier with member-only posts, a full archive, and a 'free month' retention offer.",
      },
      {
        title: "Research report library",
        description:
          "Annual access gating downloadable reports by plan, with multi-login prevention.",
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
          "Yes. Combine a purchase-history condition with post restriction to build a metered paywall — after the free quota, the next article requires a subscription.",
      },
      {
        question: "How do I show different content to Basic vs Premium?",
        answer:
          "Create access rules per tier — Basic unlocks standard articles, Premium unlocks everything — so each tier sees the right subset.",
      },
      {
        question: "Can I release exclusives on a schedule?",
        answer:
          "Yes. Content dripping schedules article visibility by date or relative to purchase, so premium exclusives publish on your cadence.",
      },
      {
        question: "Will the paywall hurt my SEO?",
        answer:
          "You control what's gated. Keep teasers and metadata public and gate the full body, so search engines still index your pages while the premium content stays members-only.",
      },
      {
        question: "Can subscribers read on multiple devices without sharing?",
        answer:
          "Yes. Multi-login prevention (Pro) allows normal use but blocks concurrent sessions from a shared login, protecting subscription revenue.",
      },
      {
        question: "Can I sell single articles as well as subscriptions?",
        answer:
          "Yes. Because it's built on WooCommerce, you can sell one-off purchases alongside subscriptions and gate content by either.",
      },
    ],
    relatedFeatures: [
      "member-access-control",
      "subscriptions-and-recurring-products",
      "emails",
      "retention-flow-builder",
      "customer-portal",
      "analytics",
    ],
  },
  {
    slug: "service-businesses",
    icon: Briefcase,
    name: "Service Businesses",
    cardDescription:
      "Bill retainers, maintenance, and support plans — tiered plans, pause & skip, automatic billing, and retention.",
    seoTitle: "WooCommerce Recurring Service Subscriptions & Retainers",
    metaDescription:
      "Sell recurring services on WooCommerce — tiered retainers and maintenance plans, flexible billing cycles, sign-up fees, pause and skip, automatic billing, and retention offers.",
    h1: "Sell recurring services with subscription billing",
    heroSubtitle:
      "Bill retainers, maintenance plans, and support packages on a schedule — with tiered plans, pause and skip, and automatic collection.",
    heroHighlights: [
      "Tiered retainers & sign-up fees",
      "Pause without cancelling",
      "Automatic billing & dunning",
    ],
    intro:
      "Service businesses bill for retainers, maintenance, and support that clients expect to pause or adjust month to month — and chasing invoices by hand doesn't scale. ArraySubs gives you ==flexible recurring billing built for services==. Create Bronze, Silver, and Gold plans as variable subscriptions with monthly, quarterly, or annual cycles and onboarding sign-up fees, let clients ==pause or skip from the portal==, ==map subscription status to a client role== your other tools can read, and intercept cancellations with a downgrade or pause. Payments collect automatically through ==Stripe or PayPal==, and a two-phase grace period gives clients time to update a card before service is interrupted.",
    stats: [
      { value: "3", label: "Billing intervals" },
      { value: "2-phase", label: "Grace period" },
      { value: "4", label: "Retention offers" },
      { value: "Auto", label: "Recurring billing" },
    ],
    audience: [
      {
        title: "Agencies & freelancers",
        description:
          "Sell monthly retainers and care plans with sign-up fees for onboarding.",
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
          "Recurring advisory retainers with pause options between engagements.",
      },
    ],
    points: [
      {
        problem: "Tiered service plans with different pricing are tedious to build.",
        solution:
          "Variable subscriptions give each tier its own cycle, sign-up fee, and renewal price; Feature Manager shows what each includes.",
      },
      {
        problem: "Clients need to pause a retainer for a month.",
        solution:
          "The portal's pause-indefinitely lets clients pause when idle and reactivate later — no cancellation.",
      },
      {
        problem: "You invoice manually and chase late payments.",
        solution:
          "Automatic billing collects on schedule, and a grace period gives clients time to update payment before service pauses.",
      },
      {
        problem: "Budget-driven clients cancel.",
        solution:
          "The Retention Flow offers a downgrade to a cheaper tier or a short pause — many stay.",
      },
      {
        problem: "Your support stack can't see who's an active client.",
        solution:
          "Role mapping assigns a client role by subscription status, so your tools restrict service access automatically.",
      },
      {
        problem: "Onboarding work isn't covered by the monthly fee.",
        solution:
          "Add a one-time sign-up fee to any plan so setup or onboarding is billed alongside the first recurring charge.",
      },
    ],
    steps: [
      {
        title: "Run the services wizard",
        description:
          "Pick the Services profile to configure billing, grace periods, and the portal for retainers.",
      },
      {
        title: "Create service tiers",
        description:
          "Build Bronze/Silver/Gold as variable subscriptions with cycles, sign-up fees, and prices.",
      },
      {
        title: "Map client roles",
        description:
          "Assign a client role by subscription status so your support tools recognize active clients.",
      },
      {
        title: "Connect automatic billing",
        description:
          "Add Stripe or PayPal to collect retainers on schedule with no manual invoicing.",
      },
      {
        title: "Enable pause & retention",
        description:
          "Let clients pause between engagements and intercept cancellations with offers.",
      },
    ],
    playbooks: [
      {
        title: "Monthly care plan",
        description:
          "A single monthly maintenance plan with a setup sign-up fee and a pause option for slow seasons.",
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
          "Yes. Variable subscriptions support per-variation intervals — one client on Bronze monthly, another on Gold quarterly, from a single product.",
      },
      {
        question: "What if a client's payment fails?",
        answer:
          "A two-phase grace period (default 3 days active, then 7 on-hold) gives them time to update payment; Pro adds auto-retry and auto-downgrade to keep them active.",
      },
      {
        question: "How do I keep a client from cancelling?",
        answer:
          "The Retention Flow intercepts the cancellation and offers a discount or a pause, and retention analytics show which offers work best.",
      },
      {
        question: "Can I charge an onboarding fee plus a monthly retainer?",
        answer:
          "Yes. Add a sign-up fee to the plan; the client is billed the one-time fee with their first payment, then the recurring amount each cycle.",
      },
      {
        question: "How do my support tools know who's an active client?",
        answer:
          "Role mapping assigns a WordPress role based on subscription status; any plugin or integration that checks roles will see active clients automatically.",
      },
      {
        question: "Can clients manage their own retainer?",
        answer:
          "Yes. The portal lets clients view invoices, pause or skip, switch tiers with proration, and update payment details without emailing you.",
      },
    ],
    relatedFeatures: [
      "subscriptions-and-recurring-products",
      "billing-renewals-and-refunds",
      "customer-portal",
      "retention-flow-builder",
      "payment-gateways",
      "manage-subscriptions",
    ],
  },
];

/**
 * Functionality-focused "Can I…?" capability checks per use case. Rendered as a
 * scannable checklist and merged into the page's FAQ schema. Every answer
 * reflects a real, shipped ArraySubs capability — nothing here is aspirational.
 */
export const USE_CASE_CAN_DO: Record<string, UseCaseFaq[]> = {
  "saas-digital-products": [
    {
      question: "Can I offer a free trial before charging?",
      answer:
        "Yes. Set a free-trial period on any plan; Stripe stores the card during the trial and charges automatically at conversion.",
    },
    {
      question: "Can I sell monthly and annual versions of the same plan?",
      answer:
        "Yes. A variable subscription can expose monthly and annual options, each with its own price and trial.",
    },
    {
      question: "Can I let customers upgrade from Basic to Pro instantly?",
      answer:
        "Yes. Plan switching upgrades with automatic proration, charged immediately or applied at the next renewal.",
    },
    {
      question: "Can I limit usage like '100 API calls' per plan?",
      answer:
        "Yes. Feature Manager numeric limits define per-plan quotas you can read and enforce in your app.",
    },
    {
      question: "Can I sell prepaid usage credits?",
      answer:
        "Yes. Store credit lets customers buy top-ups (with an optional bonus percentage) that spend down as they use the product.",
    },
    {
      question: "Can I show what each plan includes on the product page?",
      answer:
        "Yes. Feature Manager renders a 'What's included' list that updates per variation.",
    },
    {
      question: "Can I gate documentation or downloads to paying plans?",
      answer:
        "Yes. Member Access Control restricts pages, URLs, and downloads by subscription or plan.",
    },
    {
      question: "Can I automatically retry failed payments?",
      answer:
        "Yes (Pro). Stripe retries on a schedule, and a two-phase grace period keeps access active while it recovers.",
    },
    {
      question: "Can I move a customer to a cheaper plan instead of cancelling?",
      answer:
        "Yes (Pro). Use auto-downgrade on failure, or present a downgrade offer in the Retention Flow.",
    },
    {
      question: "Can I see my MRR and churn rate?",
      answer:
        "Yes. The analytics dashboard tracks MRR, churn rate, ARPU, and trial conversion.",
    },
    {
      question: "Can I charge a one-time setup fee with a subscription?",
      answer:
        "Yes. Add a sign-up fee to any plan, billed alongside the first recurring payment.",
    },
    {
      question: "Can I require SCA / 3D Secure for EU cards?",
      answer:
        "Yes. Stripe (Pro) handles SCA/3DS at checkout and off-session for renewals.",
    },
    {
      question: "Can I apply a coupon to a subscription?",
      answer:
        "Yes. WooCommerce coupons work with subscription plans through the coupon integration.",
    },
    {
      question: "Can I let customers update their card themselves?",
      answer:
        "Yes (Pro). The portal runs a secure Stripe Elements update, or a re-authorization for PayPal and Paddle.",
    },
    {
      question: "Can I export my subscribers to CSV?",
      answer: "Yes. The admin dashboard exports subscriptions to CSV or JSON.",
    },
    {
      question: "Can I customize the renewal and receipt emails?",
      answer:
        "Yes. Every lifecycle email's subject, heading, and content is editable, with theme template overrides.",
    },
    {
      question: "Can I see an audit log of every change?",
      answer:
        "Yes (Pro). Activity audits record changes across subscriptions, payments, and entitlements with author roles.",
    },
    {
      question: "Can I build a multi-step checkout for signups?",
      answer:
        "Yes (Pro). The Checkout Builder supports multi-step layouts and conditional fields with no code.",
    },
  ],
  "membership-sites": [
    {
      question: "Can I create free and paid membership tiers?",
      answer:
        "Yes. Build a free tier plus paid variable-subscription tiers and gate content per plan.",
    },
    {
      question: "Can I restrict individual pages and posts?",
      answer:
        "Yes. Access rules gate pages, posts, custom post types, products, and downloads.",
    },
    {
      question: "Can I drip content over weeks?",
      answer:
        "Yes. Content dripping releases gated material by days-since-join or fixed dates.",
    },
    {
      question: "Can I restrict access by URL?",
      answer:
        "Yes. URL restriction supports exact, prefix, contains, and regex patterns.",
    },
    {
      question: "Can I assign a WordPress role per membership?",
      answer:
        "Yes. Role mapping assigns or removes WordPress roles automatically by subscription status.",
    },
    {
      question: "Can I offer member-only pricing or discounts?",
      answer:
        "Yes. Member discounts apply tier-specific pricing across your store.",
    },
    {
      question: "Can I let members pause their membership?",
      answer:
        "Yes. The portal offers pause and skip so members flex instead of cancelling.",
    },
    {
      question: "Can I stop members sharing one login?",
      answer:
        "Yes (Pro). Multi-login prevention blocks concurrent sessions on a shared account.",
    },
    {
      question: "Can I sell a one-time, fixed-length membership?",
      answer:
        "Yes. Fixed-period membership products grant access for a set time without recurring billing.",
    },
    {
      question: "Can I add custom fields to member profiles?",
      answer:
        "Yes. Profile Builder adds custom fields and avatar uploads to My Account.",
    },
    {
      question: "Can I gate content inside a page with a shortcode?",
      answer:
        "Yes. The restriction and visibility shortcodes gate inline content anywhere.",
    },
    {
      question: "Can I let members cancel and reactivate themselves?",
      answer:
        "Yes. The portal handles cancel (with undo), reactivate, and plan switching without support.",
    },
    {
      question: "Can I drip content by fixed calendar date?",
      answer:
        "Yes. Dripping supports both days-since-join and fixed calendar dates.",
    },
    {
      question: "Can I reorder and rename the My Account menu?",
      answer:
        "Yes. The My Account editor reorders, renames, and hides items, and adds custom endpoint pages.",
    },
    {
      question: "Can I add a free trial to a membership?",
      answer: "Yes. Any plan can include a configurable free-trial period.",
    },
    {
      question: "Can I reactivate a lapsed member?",
      answer:
        "Yes. Members reactivate from the portal, or you can reactivate them from the admin.",
    },
    {
      question: "Can I apply a coupon to a membership?",
      answer: "Yes. WooCommerce coupons work with membership subscriptions.",
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
        "Yes. The portal's skip-next pushes the renewal forward without cancelling.",
    },
    {
      question: "Can I let customers pause for the summer?",
      answer:
        "Yes. Pause-indefinitely stops billing and shipping until they choose to resume.",
    },
    {
      question: "Can I ship every box on the same day?",
      answer:
        "Yes. Renewal sync aligns all renewals to one calendar day for batch fulfillment.",
    },
    {
      question: "Can I offer basic, premium, and deluxe boxes?",
      answer:
        "Yes. Variable subscriptions give each tier its own billing cycle and price.",
    },
    {
      question: "Can I bill weekly, monthly, or quarterly?",
      answer:
        "Yes. Choose daily, weekly, monthly, yearly, or custom-day cycles per plan.",
    },
    {
      question: "Can I sell a prepaid 3- or 6-month box?",
      answer:
        "Yes. Set a subscription length (number of cycles) so the plan ends automatically.",
    },
    {
      question: "Can I let customers change their shipping address?",
      answer:
        "Yes (Pro). Customers update shipping from the portal up to a cutoff each cycle.",
    },
    {
      question: "Can I charge a one-time welcome-box fee?",
      answer: "Yes. Add a sign-up fee that's billed with the first box.",
    },
    {
      question: "Can I let subscribers switch box tiers?",
      answer:
        "Yes. Plan switching upgrades or downgrades between tiers with proration.",
    },
    {
      question: "Can I offer a discount to save a cancelling customer?",
      answer:
        "Yes. The Retention Flow can present a discount, pause, or downgrade at cancellation.",
    },
    {
      question: "Can I apply a coupon to a subscription?",
      answer:
        "Yes. WooCommerce coupons work with subscription products through the coupon integration.",
    },
    {
      question: "Can I use my existing WooCommerce shipping methods?",
      answer:
        "Yes. Boxes use WooCommerce's native shipping, and recurring shipping is supported.",
    },
    {
      question: "Can I set a different renewal price than the first box?",
      answer: "Yes. Set a sign-up fee and a separate renewal price per plan.",
    },
    {
      question: "Can I limit a box run to a set number of shipments?",
      answer:
        "Yes. Set a subscription length so the plan ends after a fixed number of cycles.",
    },
    {
      question: "Can I let customers reactivate a cancelled box?",
      answer: "Yes. Customers reactivate from the portal anytime.",
    },
    {
      question: "Can I email customers before each renewal?",
      answer:
        "Yes. Renewal reminders send a configurable number of days before the charge.",
    },
    {
      question: "Can I export my box subscribers?",
      answer: "Yes. Export subscriptions to CSV or JSON from the admin.",
    },
    {
      question: "Can I run it on HPOS high-performance order storage?",
      answer: "Yes. ArraySubs is fully HPOS compatible.",
    },
  ],
  "online-courses": [
    {
      question: "Can I release modules on a schedule?",
      answer:
        "Yes. Content dripping unlocks lessons by days-since-enrollment or fixed dates.",
    },
    {
      question: "Can I offer a free first lesson?",
      answer:
        "Yes. A free tier or trial unlocks the intro, then gate the rest behind a paid plan.",
    },
    {
      question: "Can I create free, basic, and premium course tiers?",
      answer:
        "Yes. Variable subscriptions create each tier with its own price and access.",
    },
    {
      question: "Can I gate advanced lessons to higher tiers?",
      answer:
        "Yes. Access rules restrict premium modules and downloads by plan.",
    },
    {
      question: "Can I let students upgrade mid-course?",
      answer:
        "Yes. Plan switching upgrades with proration, right from the portal.",
    },
    {
      question: "Can I sell lifetime access?",
      answer:
        "Yes. Use a fixed-period membership or a long yearly cycle for lifetime-style access.",
    },
    {
      question: "Can I track how many students convert from a trial?",
      answer:
        "Yes. Analytics show trial conversion, churn, and ARPU.",
    },
    {
      question: "Can I drip the same way for students who join later?",
      answer:
        "Yes. Dripping is relative to each student's enrollment date, so everyone gets the same pacing.",
    },
    {
      question: "Can I gate downloadable worksheets?",
      answer:
        "Yes. Download restriction gates files by plan or subscription status.",
    },
    {
      question: "Can I add a community or coaching upsell tier?",
      answer:
        "Yes. Add a higher tier as a variation and let students switch up with proration.",
    },
    {
      question: "Can I email students about new modules?",
      answer:
        "Yes. Lifecycle emails are customizable, and you can notify on renewals and changes.",
    },
    {
      question: "Can I keep ArraySubs and add an LMS later?",
      answer:
        "Yes. ArraySubs runs billing and access; layer an LMS on top for quizzes and certificates.",
    },
    {
      question: "Can I require login to view gated lessons?",
      answer:
        "Yes. Access rules and the visibility shortcode gate content by login state and plan.",
    },
    {
      question: "Can I add custom fields to student profiles?",
      answer: "Yes. Profile Builder adds custom fields and avatars to My Account.",
    },
    {
      question: "Can I offer a coupon for a course?",
      answer: "Yes. WooCommerce coupons work with course subscriptions.",
    },
    {
      question: "Can I let students pause a course?",
      answer:
        "Yes. The portal offers pause and skip so students keep their place.",
    },
    {
      question: "Can I see which tiers retain students?",
      answer: "Yes. Analytics track churn and conversion by plan.",
    },
    {
      question: "Can I reactivate a student who lapsed?",
      answer:
        "Yes. Students reactivate from the portal, or you reactivate them in the admin.",
    },
  ],
  "content-publishers": [
    {
      question: "Can I build a metered 'three free articles' paywall?",
      answer:
        "Yes. Combine post restriction with a purchase-history condition to meter free reads.",
    },
    {
      question: "Can I hard-gate all premium articles?",
      answer:
        "Yes. Restrict posts, sections, or URL patterns by plan for a full paywall.",
    },
    {
      question: "Can I gate a whole section or archive by URL?",
      answer:
        "Yes. URL restriction supports exact, prefix, contains, and regex patterns.",
    },
    {
      question: "Can I show different content to Basic and Premium?",
      answer:
        "Yes. Per-tier access rules show each plan the right subset of content.",
    },
    {
      question: "Can I drip exclusive posts weekly?",
      answer:
        "Yes. Content dripping schedules premium pieces on a weekly or monthly cadence.",
    },
    {
      question: "Can I keep teasers public for SEO?",
      answer:
        "Yes. Gate the full body while teasers and metadata stay public and indexable.",
    },
    {
      question: "Can I sell monthly and annual subscriptions?",
      answer:
        "Yes. Variable subscriptions expose monthly and annual options with proration between them.",
    },
    {
      question: "Can I stop password sharing?",
      answer:
        "Yes (Pro). Multi-login prevention blocks concurrent sessions on a shared login.",
    },
    {
      question: "Can I gate downloadable reports or datasets?",
      answer: "Yes. Download restriction gates files by plan.",
    },
    {
      question: "Can I offer a free month to keep a subscriber?",
      answer:
        "Yes. The Retention Flow can present a discount or free period at cancellation.",
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
      question: "Can I restrict downloads like PDFs to subscribers?",
      answer: "Yes. Download restriction gates files by plan or subscription status.",
    },
    {
      question: "Can I show a custom message on gated content?",
      answer:
        "Yes. Restriction rules can show a custom message, redirect, or a login form.",
    },
    {
      question: "Can I drip premium archives by date?",
      answer:
        "Yes. Content dripping schedules visibility by fixed date or relative to purchase.",
    },
    {
      question: "Can I customize subscriber emails?",
      answer: "Yes. Every email's subject, heading, and content is editable.",
    },
    {
      question: "Can I export my subscriber list?",
      answer: "Yes. Export subscriptions to CSV or JSON for your email platform.",
    },
    {
      question: "Can I apply a coupon to a subscription?",
      answer: "Yes. WooCommerce coupons work with subscriptions.",
    },
  ],
  "service-businesses": [
    {
      question: "Can I charge an onboarding fee plus a monthly retainer?",
      answer:
        "Yes. Add a sign-up fee billed with the first recurring payment, then the retainer each cycle.",
    },
    {
      question: "Can I bill clients monthly, quarterly, or annually?",
      answer:
        "Yes. Variable subscriptions support per-variation billing intervals.",
    },
    {
      question: "Can I let a client pause between projects?",
      answer:
        "Yes. The portal's pause-indefinitely stops billing until the client resumes.",
    },
    {
      question: "Can I create Bronze, Silver, and Gold tiers?",
      answer:
        "Yes. Build each tier as a variation with its own cycle, sign-up fee, and price.",
    },
    {
      question: "Can I collect payments automatically?",
      answer:
        "Yes (Pro). Stripe or PayPal collect retainers on schedule — no manual invoicing.",
    },
    {
      question: "Can I show what each service tier includes?",
      answer:
        "Yes (Pro). Feature Manager renders a 'What's included' list on the product page.",
    },
    {
      question: "Can I give clients time to fix a failed card?",
      answer:
        "Yes. A two-phase grace period keeps service active while the client updates payment.",
    },
    {
      question: "Can my support tools tell who's an active client?",
      answer:
        "Yes. Role mapping assigns a client role by subscription status that any role-aware tool can read.",
    },
    {
      question: "Can I downgrade a client instead of losing them?",
      answer:
        "Yes. The Retention Flow offers a downgrade or pause at cancellation.",
    },
    {
      question: "Can clients manage their own retainer?",
      answer:
        "Yes. The portal handles invoices, pause, skip, plan switching, and payment updates.",
    },
    {
      question: "Can I export my subscriptions for reporting?",
      answer:
        "Yes. The admin dashboard exports subscriptions to CSV or JSON.",
    },
    {
      question: "Can I refund a partial month fairly?",
      answer:
        "Yes. Prorated refunds calculate by daily rate for the remaining period.",
    },
    {
      question: "Can I set a different price for renewals vs the first month?",
      answer: "Yes. Set a sign-up fee and a separate renewal price per plan.",
    },
    {
      question: "Can I let clients update their payment method?",
      answer:
        "Yes (Pro). Clients update the card from the portal via a secure flow.",
    },
    {
      question: "Can I see a log of scheduled jobs and webhooks?",
      answer:
        "Yes (Pro). Scheduled-job logs and the gateway health dashboard show background jobs and webhook status.",
    },
    {
      question: "Can I email clients before each renewal?",
      answer:
        "Yes. Renewal reminders send a configurable number of days before billing.",
    },
    {
      question: "Can I apply a coupon or discount to a retainer?",
      answer: "Yes. WooCommerce coupons work with retainer subscriptions.",
    },
    {
      question: "Can I reactivate a paused or cancelled client?",
      answer:
        "Yes. Clients reactivate from the portal, or you reactivate them in the admin.",
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
