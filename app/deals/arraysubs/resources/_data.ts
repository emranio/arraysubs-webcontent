export type EditorialTone = "primary" | "dark" | "highlight";

export type ResourceCategory = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  intro: string[];
  highlights: string[];
};

export type ResourceArticle = {
  id: string;
  slug: string;
  categorySlug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  directAnswer: string;
  publishedAt: string;
  updatedAt: string;
  lastVerifiedAt: string;
  readTime: string;
  format: string;
  author: string;
  reviewer: string;
  keywords: string[];
  cover: {
    label: string;
    image: string;
    tone: EditorialTone;
  };
};

export const RESOURCE_BASE = "/deals/arraysubs/resources/";
export const RESOURCE_PAGE_SIZE = 6;

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    slug: "subscription-foundations",
    name: "Subscription Foundations",
    eyebrow: "Start with the model",
    description:
      "Evidence-backed guides for choosing subscription products, billing terms, renewal paths, and launch rules before touching plugin settings.",
    intro: [
      "A reliable WooCommerce subscription setup begins with business rules, not toggles. These guides help you decide what is recurring, how long the agreement lasts, when customers pay, what happens between renewals, and which self-service actions belong in the customer experience.",
      "Start with the complete setup pillar, then use the supporting explainers to separate products from customer agreements and compare catalog, payment, and delivery models. Each article answers the neutral strategy question first, cites current primary sources, and links to ArraySubs recipes only when you are ready to configure the exact workflow.",
    ],
    highlights: [
      "Choose the product model before the plugin settings",
      "Separate products, agreements, and transaction orders",
      "Test the complete renewal loop before launch",
    ],
  },
  {
    slug: "billing-strategy",
    name: "Billing Strategy",
    eyebrow: "Design the money movement",
    description:
      "Operator-focused guides to renewal mechanics, payment timing, schedule alignment, proration, plan changes, cancellation, discounts, tax, and billing controls.",
    intro: [
      "A subscription billing model is a chain of dates, records, payment attempts, customer promises, and operational decisions. These guides explain each link so finance, support, engineering, and fulfillment teams can work from the same model.",
      "Start with the renewal lifecycle, then compare automatic and manual collection, record relationships, schedule alignment, proration, changes, cancellation, coupons, tax, and shipping. Worked examples are illustrative and product-specific behavior is clearly separated from general WooCommerce concepts.",
    ],
    highlights: [
      "Map every renewal from due time to the next schedule",
      "Choose explicit rules for proration, changes, and cancellation",
      "Reconcile money, tax, shipping, access, and customer communication",
    ],
  },
  {
    slug: "payment-recovery",
    name: "Payment Recovery",
    eyebrow: "Recover revenue responsibly",
    description:
      "Practical playbooks for failed renewal payments, retry decisions, customer communication, grace policy, access outcomes, and measurable dunning operations.",
    intro: [
      "A failed renewal is not one event. It is a branch that can involve the gateway, renewal order, subscription status, retry queue, customer message, payment-method update, entitlement policy, and a final stop decision.",
      "Use these guides to separate what happened from what your configured policy should do next. The goal is to recover valid revenue while keeping the customer informed, limiting duplicate attempts, and ending unrecoverable sequences cleanly.",
    ],
    highlights: [
      "Classify the failure before choosing a recovery action",
      "Coordinate retries, messages, grace, and access",
      "Measure recovery by cohort without relying on unsupported benchmarks",
    ],
  },
];

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    id: "A001",
    slug: "how-to-add-subscriptions-to-woocommerce",
    categorySlug: "subscription-foundations",
    title: "How to Add Subscriptions to WooCommerce: The Complete 2026 Guide",
    seoTitle: "How to Add Subscriptions to WooCommerce (2026 Guide)",
    metaDescription:
      "Learn how to add subscriptions to WooCommerce, choose a billing model and gateway, test renewals, and launch a reliable store with a practical 2026 checklist.",
    excerpt:
      "Design the billing, access, fulfillment, and recovery model; connect the right gateway; then prove signup, renewal, and failure paths before launch.",
    directAnswer:
      "To add subscriptions to WooCommerce, install a subscription engine, choose what recurs and when it ends, configure the product's price and billing schedule, connect a compatible payment gateway, define taxes, shipping, access, and self-service, then test both signup and a renewal order in a sandbox.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "24 min read",
    format: "Pillar guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "how to add subscriptions to WooCommerce",
      "WooCommerce subscriptions",
      "subscription billing",
      "recurring payments",
    ],
    cover: {
      label: "Subscription launch system",
      image: "/blogs/how-to-add-subscriptions-to-woocommerce/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A002",
    slug: "what-is-a-woocommerce-subscription",
    categorySlug: "subscription-foundations",
    title: "What Is a WooCommerce Subscription? Products, Orders, and Renewals Explained",
    seoTitle: "What Is a WooCommerce Subscription? Explained",
    metaDescription:
      "Learn how WooCommerce subscription products, customer agreements, parent orders, renewal orders, and automatic or manual renewals work together in practice.",
    excerpt:
      "Separate the reusable product, live customer agreement, parent order, and renewal orders so every subscription record has one clear job.",
    directAnswer:
      "A WooCommerce subscription is a customer-specific agreement that holds the items, billing schedule, payment method, dates, totals, and status used for future transactions. The customer buys a subscription product; a parent order records signup or the first payment; each later recurring transaction is recorded in a linked renewal order.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "16 min read",
    format: "Explainer",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "what is a WooCommerce subscription",
      "subscription product",
      "renewal order",
      "automatic renewals",
    ],
    cover: {
      label: "Products, agreements, and orders",
      image: "/blogs/what-is-a-woocommerce-subscription/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A003",
    slug: "woocommerce-subscription-product-types",
    categorySlug: "subscription-foundations",
    title: "WooCommerce Subscription Product Types Explained",
    seoTitle: "WooCommerce Subscription Product Types Explained",
    metaDescription:
      "Compare WooCommerce subscription product types by catalog structure, billing model, and delivery, then choose the right setup for a clear, manageable offer.",
    excerpt:
      "Choose subscription products on three axes: catalog structure, payment promise, and what the customer receives—then keep the operating model simple.",
    directAnswer:
      "WooCommerce subscription products are best classified on three axes: product structure, billing model, and fulfillment. Choose a simple product for one offer or a variable product for customer-selectable tiers, then define the payment terms and what the customer receives.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "18 min read",
    format: "Decision guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "WooCommerce subscription product types",
      "simple subscription product",
      "variable subscription product",
      "prepaid subscription",
    ],
    cover: {
      label: "Choose the product model",
      image: "/blogs/woocommerce-subscription-product-types/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A004",
    slug: "simple-vs-variable-woocommerce-subscriptions-which-product-type-fits",
    categorySlug: "subscription-foundations",
    title: "Simple vs Variable WooCommerce Subscriptions: Which Product Type Fits?",
    seoTitle: "Simple vs Variable WooCommerce Subscriptions",
    metaDescription:
      "Compare simple and variable WooCommerce subscriptions by customer choice, pricing, switching, reporting, gateway needs, and maintenance.",
    excerpt:
      "Choose one clear offer or a related variation family by balancing customer choice against configuration, switching, reporting, and QA work.",
    directAnswer:
      "Choose a simple WooCommerce subscription when one product has one price, billing schedule, and entitlement. Choose a variable subscription when customers must select related options—such as tier, size, or monthly versus annual billing—on one product page.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "9 min read",
    format: "Comparison guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "simple vs variable WooCommerce subscriptions",
      "variable subscription product",
      "subscription variations",
      "WooCommerce product structure",
    ],
    cover: {
      label: "Simple or variable? Choose by customer choice",
      image:
        "/blogs/simple-vs-variable-woocommerce-subscriptions-which-product-type-fits/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A005",
    slug: "recurring-vs-fixed-term-subscriptions-choose-the-right-billing-model",
    categorySlug: "subscription-foundations",
    title: "Recurring vs Fixed-Term Subscriptions: Choose the Right Billing Model",
    seoTitle: "Recurring vs Fixed-Term Subscriptions",
    metaDescription:
      "Compare ongoing, fixed-cycle, fixed-date, and prepaid subscriptions by cash timing, access, renewal, cancellation, and WooCommerce setup.",
    excerpt:
      "Separate collection timing from the agreement end, then choose evergreen, fixed-cycle, fixed-date, or genuinely prepaid terms.",
    directAnswer:
      "Choose an ongoing recurring subscription when value continues indefinitely and the customer should keep paying until cancellation. Choose a fixed-term model when delivery or access has a defined finish, then distinguish rolling fixed cycles from shared fixed dates.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "9 min read",
    format: "Decision guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "recurring vs fixed term subscriptions",
      "fixed cycle subscription",
      "fixed date subscription",
      "prepaid subscription",
    ],
    cover: {
      label: "Choose what ends the agreement",
      image:
        "/blogs/recurring-vs-fixed-term-subscriptions-choose-the-right-billing-model/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A006",
    slug: "free-trial-paid-trial-or-no-trial-a-subscription-decision-framework",
    categorySlug: "subscription-foundations",
    title: "Free Trial, Paid Trial, or No Trial? A Subscription Decision Framework",
    seoTitle: "Free Trial, Paid Trial, or No Trial?",
    metaDescription:
      "Choose a subscription free trial, paid evaluation, or no trial using time-to-value, cost, fraud, card timing, disclosure, and contribution economics.",
    excerpt:
      "Choose the evaluation price, card timing, loss ceiling, and end behavior separately—then measure retained contribution, not starts alone.",
    directAnswer:
      "Choose a free trial when customers can reach meaningful value quickly and trial cost and abuse risk are low. Use a paid evaluation or reduced first period when delivery needs commitment, and skip the trial when value is immediate or expensive to reverse.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "10 min read",
    format: "Decision framework",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "subscription free trial vs paid trial",
      "card required trial",
      "no card free trial",
      "trial unit economics",
    ],
    cover: {
      label: "Choose a trial by proof, cost, and abuse risk",
      image:
        "/blogs/free-trial-paid-trial-or-no-trial-a-subscription-decision-framework/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A007",
    slug: "subscription-sign-up-fees-unit-economics-ux-and-examples",
    categorySlug: "subscription-foundations",
    title: "Subscription Sign-Up Fees: Unit Economics, UX, and Examples",
    seoTitle: "Subscription Sign-Up Fees: Costs, UX, and Examples",
    metaDescription:
      "Calculate a defensible subscription sign-up fee, disclose the first payment, plan refunds, and compare SaaS, service, box, and membership examples.",
    excerpt:
      "Tie every setup fee to real one-time work, calculate it from cost and subsidy policy, and make the initial charge and refund rule predictable.",
    directAnswer:
      "Charge a subscription sign-up fee only when starting a customer creates a real, explainable one-time cost such as migration, installation, onboarding labor, or a welcome kit. Base the amount on that cost minus any subsidy you choose to absorb.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "11 min read",
    format: "Economics guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "subscription sign up fee best practices",
      "subscription setup fee",
      "initial subscription payment",
      "sign up fee refund",
    ],
    cover: {
      label: "A sign-up fee must fund a real first-period cost",
      image:
        "/blogs/subscription-sign-up-fees-unit-economics-ux-and-examples/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A008",
    slug: "monthly-and-annual-subscription-plans-packaging-without-cannibalization",
    categorySlug: "subscription-foundations",
    title: "Monthly and Annual Subscription Plans: Packaging Without Cannibalization",
    seoTitle: "Monthly and Annual Subscription Plans",
    metaDescription:
      "Package monthly and annual WooCommerce subscriptions with transparent savings, cash-flow math, honest defaults, cohort tests, and switching guardrails.",
    excerpt:
      "Package two cadences around flexibility and commitment, disclose the complete annual charge, and let mature cohort economics choose emphasis.",
    directAnswer:
      "Offer monthly and annual plans together when customers value both a lower-commitment entry and an upfront annual option. Set the annual price from your own retention, refund, support, and cash data, and show the full annual charge beside its monthly equivalent.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "10 min read",
    format: "Packaging guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "monthly vs annual subscription plans WooCommerce",
      "annual subscription discount",
      "subscription plan packaging",
      "annual billing",
    ],
    cover: {
      label: "Package monthly and annual plans around commitment",
      image:
        "/blogs/monthly-and-annual-subscription-plans-packaging-without-cannibalization/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A009",
    slug: "one-time-purchase-and-subscription-on-one-product-when-to-offer-both",
    categorySlug: "subscription-foundations",
    title: "One-Time Purchase and Subscription on One Product: When to Offer Both",
    seoTitle: "One-Time Purchase and Subscription on One Product",
    metaDescription:
      "Decide when to offer buy once or subscribe on one WooCommerce product using repeat demand, margin, stock, consent, analytics, and platform fit.",
    excerpt:
      "Earn the dual offer with repeat-demand evidence, safe per-delivery contribution, protected inventory, explicit consent, and truthful platform fit.",
    directAnswer:
      "Offer one-time and subscription choices together when customers repeatedly need the same product on a predictable schedule and the recurring price still clears your contribution floor. Current ArraySubs requires separate regular and subscription products rather than a verified same-product chooser.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "10 min read",
    format: "Strategy guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "one time purchase and subscription same product",
      "buy once or subscribe WooCommerce",
      "subscribe and save",
      "subscription inventory",
    ],
    cover: {
      label: "Buy once or subscribe: earn the second option",
      image:
        "/blogs/one-time-purchase-and-subscription-on-one-product-when-to-offer-both/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A010",
    slug: "fixed-date-woocommerce-subscriptions-for-cohorts-seasons-and-enrollment-windows",
    categorySlug: "subscription-foundations",
    title: "Fixed-Date WooCommerce Subscriptions for Cohorts, Seasons, and Enrollment Windows",
    seoTitle: "Fixed-Date WooCommerce Subscriptions",
    metaDescription:
      "Use fixed-date WooCommerce subscriptions for cohorts and seasons with clear enrollment, late-join, billing, timezone, access, and expiration rules.",
    excerpt:
      "Use one shared calendar cutoff only when the cohort or season requires it, then define enrollment, late-entry value, billing, access, and timezone.",
    directAnswer:
      "A fixed-date WooCommerce subscription ends every buyer's agreement on the same calendar cutoff, while fixed duration gives each buyer the same number of cycles from their own start. Use fixed dates for cohorts, seasons, school years, or licenses.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "9 min read",
    format: "Operations guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "fixed date WooCommerce subscriptions",
      "cohort subscription",
      "subscription enrollment window",
      "fixed period membership",
    ],
    cover: {
      label: "Fixed dates coordinate a shared calendar",
      image:
        "/blogs/fixed-date-woocommerce-subscriptions-for-cohorts-seasons-and-enrollment-windows/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A011",
    slug: "customer-chosen-subscription-duration-use-cases-ux-and-risk-controls",
    categorySlug: "subscription-foundations",
    title: "Customer-Chosen Subscription Duration: Use Cases, UX, and Risk Controls",
    seoTitle: "Customer-Chosen Subscription Duration",
    metaDescription:
      "Design customer-chosen WooCommerce subscription durations with bounded terms, clear totals, server validation, lifecycle rules, and ArraySubs status truth.",
    excerpt:
      "Let buyers choose only from merchant-approved finite terms, with complete payment summaries, server validation, and lifecycle guardrails.",
    directAnswer:
      "Customer-chosen subscription duration lets a buyer select a finite term such as 3, 6, or 12 billing cycles within merchant-set limits. Prefer approved choices, disclose total payments and scheduled total, and separate the model from prepaid or installment promises.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "10 min read",
    format: "UX framework",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "customer chosen subscription duration WooCommerce",
      "subscription length selector",
      "finite subscription",
      "subscription UX",
    ],
    cover: {
      label: "Flexible duration needs hard guardrails",
      image:
        "/blogs/customer-chosen-subscription-duration-use-cases-ux-and-risk-controls/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A012",
    slug: "lifetime-deals-vs-recurring-subscriptions-revenue-support-and-risk",
    categorySlug: "subscription-foundations",
    title: "Lifetime Deals vs Recurring Subscriptions: Revenue, Support, and Risk",
    seoTitle: "Lifetime Deals vs Recurring Subscriptions",
    metaDescription:
      "Compare lifetime deals and recurring subscriptions by cash timing, contribution, support reserve, updates, infrastructure, scope, and ArraySubs behavior.",
    excerpt:
      "Balance launch cash against long-tail support and infrastructure, compare matched contribution, and define exactly what lifetime includes.",
    directAnswer:
      "Choose a lifetime deal when one upfront price can fund expected long-term support, infrastructure, updates, refunds, and risk reserve. Choose recurring billing when value and costs continue over time, and compare realized contribution rather than revenue alone.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "10 min read",
    format: "Financial model",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "lifetime deal vs subscription",
      "lifetime deal pricing",
      "subscription contribution",
      "lifetime support reserve",
    ],
    cover: {
      label: "Cash now and obligations later must balance",
      image:
        "/blogs/lifetime-deals-vs-recurring-subscriptions-revenue-support-and-risk/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A013",
    slug: "subscription-terms-customers-must-see-before-they-pay",
    categorySlug: "subscription-foundations",
    title: "Subscription Terms Customers Must See Before They Pay",
    seoTitle: "Subscription Terms Customers Must See Before They Pay",
    metaDescription:
      "Use this WooCommerce subscription disclosure checklist for price, renewal, trial, cancellation, refunds, shipping, tax, consent, and evidence.",
    excerpt:
      "Put the complete recurring promise before payment, repeat it across the customer journey, and preserve evidence of the exact terms accepted.",
    directAnswer:
      "Before payment, show the complete recurring promise in plain language: due-today amount, future amount and cadence, charge timing, trial, duration, automatic renewal, cancellation, refunds, shipping, tax, and what changes after cancellation. Obtain an affirmative action and preserve evidence.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "11 min read",
    format: "Disclosure checklist",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "subscription terms on product page",
      "recurring billing disclosure WooCommerce",
      "subscription checkout terms",
      "automatic renewal consent",
    ],
    cover: {
      label: "Put the complete recurring promise before payment",
      image:
        "/blogs/subscription-terms-customers-must-see-before-they-pay/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A014",
    slug: "anatomy-of-a-high-converting-woocommerce-subscription-product-page",
    categorySlug: "subscription-foundations",
    title: "Anatomy of a High-Converting WooCommerce Subscription Product Page",
    seoTitle: "WooCommerce Subscription Product Page Anatomy",
    metaDescription:
      "Build a clear WooCommerce subscription product page with complete pricing, renewal, cancellation, fulfillment, trust, and checkout information.",
    excerpt:
      "Turn the subscription agreement into a clear product-page hierarchy covering the promise, price sequence, proof, terms, and next action.",
    directAnswer:
      "A strong WooCommerce subscription product page makes the complete agreement understandable before checkout: what the customer receives, what is due today, the recurring amount and cadence, the first renewal date, the minimum term, shipping or access rules, cancellation timing, and the next action.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "9 min read",
    format: "Conversion guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "WooCommerce subscription product page",
      "subscription pricing disclosure",
      "subscription conversion",
    ],
    cover: {
      label: "Subscription page anatomy",
      image:
        "/blogs/anatomy-of-a-high-converting-woocommerce-subscription-product-page/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A015",
    slug: "woocommerce-subscription-launch-readiness-checklist",
    categorySlug: "subscription-foundations",
    title: "WooCommerce Subscription Launch Readiness Checklist",
    seoTitle: "WooCommerce Subscription Launch Checklist",
    metaDescription:
      "Use this WooCommerce subscription launch checklist to verify product terms, gateways, renewals, taxes, shipping, access, recovery, support, and analytics.",
    excerpt:
      "Prove the complete lifecycle with owned launch gates, real orders, gateway evidence, customer communication, and production monitoring.",
    directAnswer:
      "A WooCommerce subscription is ready to launch only after the offer, checkout, renewal, failure, cancellation, fulfillment, and reporting paths have been proven with real test orders.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "9 min read",
    format: "Launch checklist",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "WooCommerce subscription launch checklist",
      "subscription testing",
      "subscription launch readiness",
    ],
    cover: {
      label: "Launch with evidence",
      image: "/blogs/woocommerce-subscription-launch-readiness-checklist/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A016",
    slug: "can-woocommerce-do-subscriptions-without-a-plugin",
    categorySlug: "subscription-foundations",
    title: "Can WooCommerce Do Subscriptions Without a Plugin?",
    seoTitle: "WooCommerce Subscriptions Without a Plugin?",
    metaDescription:
      "Learn what WooCommerce core can and cannot do for subscriptions, when manual recurring orders are workable, and why a lifecycle extension is normally required.",
    excerpt:
      "Separate core commerce building blocks from the agreement, schedule, renewal, recovery, and customer-management system a real subscription needs.",
    directAnswer:
      "WooCommerce core can sell products and create one-time orders, but it does not provide a complete subscription agreement, renewal schedule, recurring-order lifecycle, customer self-service, or failed-payment recovery by itself.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "8 min read",
    format: "Direct answer",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "WooCommerce subscriptions without a plugin",
      "WooCommerce recurring payments",
      "subscription extension",
    ],
    cover: {
      label: "Core versus lifecycle",
      image: "/blogs/can-woocommerce-do-subscriptions-without-a-plugin/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A017",
    slug: "how-woocommerce-subscription-renewals-work",
    categorySlug: "billing-strategy",
    title: "How WooCommerce Subscription Renewals Work",
    seoTitle: "How WooCommerce Subscription Renewals Work",
    metaDescription:
      "Follow a WooCommerce subscription renewal from schedule and invoice creation through payment, webhooks, order status, access, and the next billing date.",
    excerpt:
      "Trace the complete renewal state transition across agreement, scheduled jobs, order, gateway, customer communication, and the next cycle.",
    directAnswer:
      "A WooCommerce subscription renewal turns a stored customer agreement into a new payable order, collects automatically or waits for manual payment, reconciles gateway events, updates status and access, and advances the next date.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "10 min read",
    format: "Pillar guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "how WooCommerce subscription renewals work",
      "renewal order",
      "subscription billing lifecycle",
    ],
    cover: {
      label: "Renewal lifecycle",
      image: "/blogs/how-woocommerce-subscription-renewals-work/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A018",
    slug: "manual-vs-automatic-subscription-renewals-in-woocommerce",
    categorySlug: "billing-strategy",
    title: "Manual vs Automatic Subscription Renewals in WooCommerce",
    seoTitle: "Manual vs Automatic WooCommerce Renewals",
    metaDescription:
      "Compare manual and automatic WooCommerce subscription renewals by customer effort, gateway ownership, retries, reconciliation, cost, and support risk.",
    excerpt:
      "Choose deliberate invoicing or supported automatic collection by comparing ownership, customer action, gateway risk, and total operating effort.",
    directAnswer:
      "Use automatic renewals when the gateway and product support reliable off-session collection and customers expect uninterrupted service. Use manual renewals when each payment needs customer approval, the gateway cannot store a reusable method, or high-touch invoicing is intentional.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "9 min read",
    format: "Comparison guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "manual vs automatic WooCommerce subscription renewals",
      "automatic recurring payments",
      "manual renewal invoice",
    ],
    cover: {
      label: "Manual or automatic",
      image:
        "/blogs/manual-vs-automatic-subscription-renewals-in-woocommerce/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A019",
    slug: "subscription-order-vs-renewal-order-vs-parent-order",
    categorySlug: "billing-strategy",
    title: "Subscription Order vs Renewal Order vs Parent Order",
    seoTitle: "Subscription vs Renewal vs Parent Order",
    metaDescription:
      "Understand WooCommerce subscription records, parent orders, and renewal orders, including what each stores, how they link, and where to troubleshoot.",
    excerpt:
      "Give the product, customer agreement, parent order, and renewal order distinct jobs so troubleshooting and reporting stay accurate.",
    directAnswer:
      "A subscription is the customer’s ongoing agreement, a parent order records the initial checkout, and a renewal order records one later billing cycle. They link to each other but are not interchangeable.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "8 min read",
    format: "Record explainer",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "subscription order vs renewal order",
      "WooCommerce parent order",
      "subscription records",
    ],
    cover: {
      label: "Agreement and orders",
      image:
        "/blogs/subscription-order-vs-renewal-order-vs-parent-order/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A020",
    slug: "woocommerce-renewal-synchronization-explained",
    categorySlug: "billing-strategy",
    title: "WooCommerce Renewal Synchronization Explained",
    seoTitle: "WooCommerce Renewal Synchronization Explained",
    metaDescription:
      "Learn how WooCommerce renewal synchronization aligns billing dates, calculates first charges, handles gateways, and differs from fixed-term subscriptions.",
    excerpt:
      "Align new subscriptions to a shared billing boundary while making the first partial period, gateway support, and operational workload explicit.",
    directAnswer:
      "Renewal synchronization aligns eligible new subscriptions to a shared calendar boundary. It changes the first partial period and next payment date; it does not make every agreement end together.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "8 min read",
    format: "Explainer",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "WooCommerce renewal synchronization",
      "billing date alignment",
      "subscription proration",
    ],
    cover: {
      label: "Align the billing date",
      image: "/blogs/woocommerce-renewal-synchronization-explained/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A021",
    slug: "subscription-proration-methods-compared-charge-credit-or-defer",
    categorySlug: "billing-strategy",
    title: "Subscription Proration Methods Compared: Charge, Credit, or Defer",
    seoTitle: "Subscription Proration Methods Compared",
    metaDescription:
      "Compare immediate subscription proration, deferred plan changes, and full-price replacement with formulas, examples, access timing, and billing anchors.",
    excerpt:
      "Choose immediate proration, a deferred switch, or full-price replacement by aligning money, entitlement timing, credit, and the next anchor.",
    directAnswer:
      "Use immediate proration when access should change now and the customer can settle the unused-value difference. Defer the switch when the current paid entitlement should remain through renewal.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "10 min read",
    format: "Decision guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "subscription proration methods",
      "subscription credit",
      "deferred plan change",
    ],
    cover: {
      label: "Charge, credit, or defer",
      image:
        "/blogs/subscription-proration-methods-compared-charge-credit-or-defer/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A022",
    slug: "immediate-vs-next-renewal-plan-changes",
    categorySlug: "billing-strategy",
    title: "Immediate vs Next-Renewal Subscription Plan Changes",
    seoTitle: "Immediate vs Next-Renewal Plan Changes",
    metaDescription:
      "Choose whether WooCommerce subscription upgrades and downgrades take effect immediately or at renewal, with payment, access, and failure tradeoffs.",
    excerpt:
      "Choose the effective boundary from the entitlement promise, then gate every immediate or deferred change on the correct payment event.",
    directAnswer:
      "Apply a plan change immediately when the customer needs the new entitlement now and any adjustment can be collected before access changes. Apply it at the next renewal when the customer should finish the already-paid period on the current plan.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "8 min read",
    format: "Timing guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "immediate vs next renewal plan change",
      "subscription upgrade",
      "subscription downgrade",
    ],
    cover: {
      label: "Change now or later",
      image: "/blogs/immediate-vs-next-renewal-plan-changes/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A023",
    slug: "early-subscription-renewals-benefits-risks-and-guardrails",
    categorySlug: "billing-strategy",
    title: "Early Subscription Renewals: Benefits, Risks, and Guardrails",
    seoTitle: "Early Subscription Renewals: Risks and Guardrails",
    metaDescription:
      "Evaluate early WooCommerce subscription renewals with rules for eligibility, amount, schedule advancement, duplicate-charge prevention, fulfillment, and refunds.",
    excerpt:
      "Define the paid cycle, next date, gateway ownership, fulfillment result, and duplicate-charge lock before accepting an early renewal.",
    directAnswer:
      "An early renewal lets a customer pay the next scheduled subscription obligation before its due date, but only safely when the store defines the charged cycle, schedule advancement, duplicate-charge protection, fulfillment, refunds, and gateway support.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "8 min read",
    format: "Risk guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "early subscription renewal",
      "renew now",
      "duplicate subscription charge",
    ],
    cover: {
      label: "Pay the next cycle early",
      image:
        "/blogs/early-subscription-renewals-benefits-risks-and-guardrails/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A024",
    slug: "subscription-billing-schedule-vs-shipping-schedule",
    categorySlug: "billing-strategy",
    title: "Subscription Billing Schedule vs Shipping Schedule",
    seoTitle: "Subscription Billing vs Shipping Schedule",
    metaDescription:
      "Separate subscription billing from fulfillment and delivery schedules, then model shipping charges, inventory, address cutoffs, failures, and cancellations.",
    excerpt:
      "Model money and fulfillment as separate schedules, especially when one payment funds several shipments or delivery obligations.",
    directAnswer:
      "A billing schedule decides when the customer is charged; a shipping schedule decides when goods are allocated and delivered. They can differ, but every extra shipment needs its own fulfillment record and policy.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "9 min read",
    format: "Operations guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "subscription billing schedule vs shipping schedule",
      "subscription fulfillment",
      "recurring shipping",
    ],
    cover: {
      label: "Billing versus shipping",
      image: "/blogs/subscription-billing-schedule-vs-shipping-schedule/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A025",
    slug: "different-first-and-renewal-prices-subscription-pricing-patterns",
    categorySlug: "billing-strategy",
    title: "Different First and Renewal Prices: Subscription Pricing Patterns",
    seoTitle: "Different First and Renewal Prices",
    metaDescription:
      "Design a different first and renewal price in WooCommerce with explicit payment counting, contribution modeling, disclosure, coupons, and test cases.",
    excerpt:
      "Use one clearly disclosed introductory price step, count successful paid payments precisely, and model contribution through the transition.",
    directAnswer:
      "Use a different first and renewal price when the same subscription should charge a clearly disclosed introductory amount for a fixed number of successful paid payments, then one stable recurring amount.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "9 min read",
    format: "Pricing guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "different first and renewal price WooCommerce",
      "introductory subscription price",
      "renewal price",
    ],
    cover: {
      label: "Intro price to renewal",
      image:
        "/blogs/different-first-and-renewal-prices-subscription-pricing-patterns/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A026",
    slug: "immediate-cancellation-vs-cancel-at-period-end",
    categorySlug: "billing-strategy",
    title: "Immediate Cancellation vs Cancel at Period End",
    seoTitle: "Immediate vs End-of-Period Cancellation",
    metaDescription:
      "Compare immediate subscription cancellation with cancel at period end across access, renewals, refunds, fulfillment, undo, and customer communication.",
    excerpt:
      "Separate the renewal stop, access end, and refund result, then confirm the exact effective date and undo option to the customer.",
    directAnswer:
      "Cancel immediately when service or access must stop now and the store has a clear refund, fulfillment, and data policy. Cancel at period end when the customer should retain what they already paid for while preventing the next renewal.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "9 min read",
    format: "Policy guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "immediate vs end of period cancellation",
      "cancel subscription",
      "subscription refund",
    ],
    cover: {
      label: "Cancel now or later",
      image: "/blogs/immediate-cancellation-vs-cancel-at-period-end/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A027",
    slug: "recurring-subscription-coupons-economics-and-abuse-controls",
    categorySlug: "billing-strategy",
    title: "Recurring Subscription Coupons: Economics and Abuse Controls",
    seoTitle: "Recurring Subscription Coupon Strategy",
    metaDescription:
      "Design recurring WooCommerce subscription coupons with payment-count rules, contribution math, eligibility, limits, zero-total tests, and abuse controls.",
    excerpt:
      "Define the exact discounted payment sequence, contribution case, eligibility, live restrictions, and safe stop rules before scaling a promotion.",
    directAnswer:
      "Use a recurring coupon only when the promotion’s incremental contribution and retention value can justify its total discount cost. Define whether checkout counts, the successful-payment limit, eligibility, stacking, expiry, and stop conditions.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "10 min read",
    format: "Economics guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "WooCommerce recurring coupon strategy",
      "subscription coupon",
      "coupon abuse controls",
    ],
    cover: {
      label: "Coupon economics",
      image:
        "/blogs/recurring-subscription-coupons-economics-and-abuse-controls/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A028",
    slug: "how-taxes-and-shipping-behave-on-subscription-renewals",
    categorySlug: "billing-strategy",
    title: "How Taxes and Shipping Behave on Subscription Renewals",
    seoTitle: "Subscription Renewal Tax and Shipping",
    metaDescription:
      "Reconcile WooCommerce subscription renewal tax and shipping across stored recurring prices, addresses, shipping policy, discounts, fees, and order totals.",
    excerpt:
      "Reconcile every renewal component—from stored recurring price and shipping through address, tax, discounts, and the gateway transaction.",
    directAnswer:
      "A subscription renewal is a new order, not a copy of the original checkout total. Its charge can combine stored recurring price, recurring shipping policy, current address, discounts or fees, and WooCommerce tax calculation.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "10 min read",
    format: "Reconciliation guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "WooCommerce subscription renewal tax shipping",
      "renewal shipping",
      "subscription tax",
    ],
    cover: {
      label: "Reconcile tax and shipping",
      image: "/blogs/how-taxes-and-shipping-behave-on-subscription-renewals/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A029",
    slug: "changing-a-subscription-renewal-date-safely",
    categorySlug: "billing-strategy",
    title: "Changing a Subscription Renewal Date Safely",
    seoTitle: "Change a Subscription Renewal Date Safely",
    metaDescription:
      "Change a WooCommerce subscription renewal date safely by coordinating orders, scheduled actions, reminders, gateways, access, shipping, and audit history.",
    excerpt:
      "Use a supported lifecycle outcome and move every dependent job, order, gateway date, access rule, and customer promise together.",
    directAnswer:
      "Changing a renewal date safely means changing the subscription’s authoritative schedule and every dependent job—not editing a database date alone.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "10 min read",
    format: "Safety guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "change WooCommerce subscription renewal date",
      "subscription schedule",
      "Action Scheduler",
    ],
    cover: {
      label: "Move dates safely",
      image: "/blogs/changing-a-subscription-renewal-date-safely/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A030",
    slug: "multiple-subscriptions-per-customer-policy-cart-and-billing-tradeoffs",
    categorySlug: "billing-strategy",
    title: "Multiple Subscriptions per Customer: Policy, Cart, and Billing Tradeoffs",
    seoTitle: "Multiple WooCommerce Subscriptions per Customer",
    metaDescription:
      "Decide when to allow multiple WooCommerce subscriptions per customer across carts, quantities, products, billing cycles, gateways, and plan changes.",
    excerpt:
      "Decide independent needs, quantities, account limits, mixed carts, cycles, gateway support, and upgrade routes as separate policy layers.",
    directAnswer:
      "Allow multiple subscriptions when customers genuinely need independent products, quantities, recipients, or billing schedules. Restrict them when a second purchase is usually an accidental duplicate or should be an upgrade.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "9 min read",
    format: "Policy guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "multiple WooCommerce subscriptions per customer",
      "subscription cart policy",
      "subscription gateway restrictions",
    ],
    cover: {
      label: "Allow, limit, or upgrade",
      image:
        "/blogs/multiple-subscriptions-per-customer-policy-cart-and-billing-tradeoffs/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A031",
    slug: "failed-subscription-payment-recovery-for-woocommerce",
    categorySlug: "payment-recovery",
    title: "Failed Subscription Payment Recovery for WooCommerce",
    seoTitle: "WooCommerce Failed Payment Recovery Guide",
    metaDescription:
      "Build a WooCommerce failed subscription payment recovery system with decline routing, safe retries, customer actions, grace, KPIs, and stop rules.",
    excerpt:
      "Build a responsible recovery lifecycle around evidence, decline-specific actions, duplicate-charge safety, customer communication, grace, and closed-cohort measurement.",
    directAnswer:
      "Recover failed subscription payments with a coordinated system: classify the failure, avoid duplicate charges, retry only recoverable declines, send a clear payment-update path, preserve access for defined grace, and stop predictably.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "12 min read",
    format: "Pillar guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "WooCommerce failed subscription payment recovery",
      "failed renewal",
      "involuntary churn",
    ],
    cover: {
      label: "Payment recovery system",
      image: "/blogs/failed-subscription-payment-recovery-for-woocommerce/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A032",
    slug: "what-happens-when-a-subscription-payment-fails",
    categorySlug: "payment-recovery",
    title: "What Happens When a Subscription Payment Fails?",
    seoTitle: "What Happens When a Subscription Payment Fails?",
    metaDescription:
      "See the WooCommerce subscription payment failure timeline across the renewal order, subscription status, retries, grace, access, and cancellation.",
    excerpt:
      "Follow the default failure timeline while keeping the renewal order, subscription, gateway, and access states separate.",
    directAnswer:
      "When a subscription payment fails, the renewal order remains unpaid or becomes failed, the reason is logged, and the customer is prompted to fix or pay it. With ArraySubs defaults, access stays active for three grace days, then moves on-hold.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "8 min read",
    format: "Timeline explainer",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "what happens when subscription payment fails WooCommerce",
      "subscription grace period",
      "failed renewal timeline",
    ],
    cover: {
      label: "After payment fails",
      image: "/blogs/what-happens-when-a-subscription-payment-fails/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A033",
    slug: "subscription-dunning-strategy-timing-messages-and-stop-rules",
    categorySlug: "payment-recovery",
    title: "Subscription Dunning Strategy: Timing, Messages, and Stop Rules",
    seoTitle: "WooCommerce Subscription Dunning Strategy",
    metaDescription:
      "Create a WooCommerce subscription dunning strategy for retry ownership, decline routing, customer messages, grace, access, KPIs, and safe stop rules.",
    excerpt:
      "Coordinate gateway ownership, decline routing, message timing, service policy, recovery measurement, and hard stop rules as one governed system.",
    directAnswer:
      "A subscription dunning strategy is the coordinated policy for failed-payment retries, customer messages, access grace, and the final stop, cancellation, or downgrade action.",
    publishedAt: "2026-07-13",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-13",
    readTime: "10 min read",
    format: "Strategy guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "subscription dunning strategy WooCommerce",
      "dunning emails",
      "payment retry strategy",
    ],
    cover: {
      label: "Dunning strategy",
      image:
        "/blogs/subscription-dunning-strategy-timing-messages-and-stop-rules/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A034",
    slug: "automatic-retry-for-failed-subscription-payments-what-good-looks-like",
    categorySlug: "payment-recovery",
    title: "Automatic Retry for Failed Subscription Payments: What Good Looks Like",
    seoTitle: "Automatic Retry for Failed Subscription Payments",
    metaDescription:
      "Design safe automatic retries for failed subscription payments with decline routing, ownership rules, duplicate-charge checks, timing, and recovery metrics.",
    excerpt:
      "Design a bounded retry system that routes failures correctly, respects collection ownership, prevents duplicate charges, and measures verified recovery.",
    directAnswer:
      "Good automatic retry identifies who owns collection, separates retryable failures from customer-action and stop conditions, verifies the renewal was not already paid, spaces a limited number of attempts inside the grace window, and reconciles payment, subscription, access, and scheduling state after recovery.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    lastVerifiedAt: "2026-07-16",
    readTime: "18 min read",
    format: "Guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "automatic retry failed subscription payments",
      "WooCommerce failed payment retry rules",
      "smart retry recurring payments",
      "failed subscription recovery",
    ],
    cover: {
      label: "Safe automatic payment recovery",
      image:
        "/blogs/automatic-retry-for-failed-subscription-payments-what-good-looks-like/hero.png",
      tone: "primary",
    },
  },
];

export function getResourceCategory(slug: string) {
  return RESOURCE_CATEGORIES.find((category) => category.slug === slug);
}

export function getResourceArticle(categorySlug: string, articleSlug: string) {
  return RESOURCE_ARTICLES.find(
    (article) =>
      article.categorySlug === categorySlug && article.slug === articleSlug,
  );
}

export function getCategoryArticles(categorySlug: string) {
  return RESOURCE_ARTICLES.filter(
    (article) => article.categorySlug === categorySlug,
  );
}

export function getArticlePath(article: ResourceArticle) {
  return `${RESOURCE_BASE}${article.categorySlug}/${article.slug}/`;
}

export function getCategoryPath(categorySlug: string) {
  return `${RESOURCE_BASE}${categorySlug}/`;
}

export function getRelatedArticles(article: ResourceArticle, limit = 3) {
  const categoryArticles = RESOURCE_ARTICLES.filter(
    (candidate) => candidate.categorySlug === article.categorySlug,
  );
  const currentIndex = categoryArticles.findIndex(
    (candidate) => candidate.slug === article.slug,
  );

  return categoryArticles
    .filter((_, index) => index !== currentIndex)
    .sort((left, right) => {
      const leftIndex = categoryArticles.indexOf(left);
      const rightIndex = categoryArticles.indexOf(right);
      return (
        Math.abs(leftIndex - currentIndex) -
        Math.abs(rightIndex - currentIndex)
      );
    })
    .slice(0, limit);
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function readPageNumber(
  value: string | string[] | undefined,
): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export function paginateArticles(
  articles: ResourceArticle[],
  page: number,
  pageSize = RESOURCE_PAGE_SIZE,
) {
  const totalPages = Math.max(1, Math.ceil(articles.length / pageSize));
  const start = (page - 1) * pageSize;

  return {
    page,
    totalPages,
    totalArticles: articles.length,
    articles: articles.slice(start, start + pageSize),
  };
}
