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

/** Public archive base. Individual articles intentionally live at /{category}/{slug}/. */
export const RESOURCE_BASE = "/articles/";
export const RESOURCE_PAGE_SIZE = 15;

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
  {
    slug: "membership-strategy",
    name: "Membership Strategy",
    eyebrow: "Turn commerce into access",
    description:
      "Architecture and operating guides for membership models, access rules, content gates, catalogs, downloads, entitlements, paywalls, and lifecycle policy.",
    intro: [
      "A membership system converts products, purchases, subscriptions, roles, and feature values into access decisions. These guides help you separate billing from entitlement, choose the right public and protected surfaces, and document what happens through trial, payment recovery, cancellation, expiration, switching, and re-entry.",
      "Start with the membership-site architecture and subscription-versus-membership comparison, then move into tier design, rule governance, content strategy, catalogs, downloads, SEO, and Boolean conditions. Product behavior is versioned, limitations are explicit, and every high-impact rule is paired with a practical test path.",
    ],
    highlights: [
      "Separate the member promise, commerce record, and access decision",
      "Design recoverable lifecycle and denied-user experiences",
      "Test content, routes, files, products, roles, and caches end to end",
    ],
  },
  {
    slug: "payments-and-compliance",
    name: "Payments & Compliance",
    eyebrow: "Make recurring money reliable",
    description:
      "Evidence-backed comparisons and operating guides for subscription gateways, tokens, SCA, webhooks, tax, Merchant-of-Record choices, and payment compliance.",
    intro: [
      "A subscription payment system is more than a checkout form. It decides who initiates each renewal, where the reusable payment authority lives, how an off-session charge is authenticated, which events update WooCommerce, how customers replace a failed method, and who owns tax, refunds, disputes, and compliance. These guides make those responsibilities explicit before a merchant commits to a gateway or migration.",
      "Start with the gateway comparison, then use the focused Stripe, PayPal, Paddle, manual-billing, SCA, token, webhook, and tax guides to test the exact architecture. Product behavior is verified against current ArraySubs releases and provider documentation, operational limitations are visible, and legal or tax questions are clearly separated from software behavior so engineering, finance, support, and leadership can make one defensible decision together.",
    ],
    highlights: [
      "Choose the renewal and Merchant-of-Record architecture first",
      "Test tokens, authentication, webhooks, refunds, and recovery",
      "Assign operational, tax, and compliance ownership explicitly",
    ],
  },
  {
    slug: "retention-and-churn",
    name: "Retention & Churn",
    eyebrow: "Keep the right customers",
    description:
      "Measurement-first guides for voluntary and involuntary churn, cancellation reasons, ethical exit flows, save offers, customer research, and durable paid-renewal outcomes.",
    intro: [
      "Subscription retention is not one discount button or one dashboard percentage. It begins with a metric dictionary, a journey-level distinction between customer intent and terminal payment failure, and evidence that connects reasons to product, billing, usage, service, fulfillment, and gateway behavior.",
      "Use these guides to build a clear cancellation experience, compare pause, skip, discount, and downgrade interventions, design useful reason capture, and measure later paid renewals and contribution margin without mistaking offer acceptance or repeated event rows for causal retention.",
    ],
    highlights: [
      "Separate voluntary, involuntary, policy, technical, and unresolved journeys",
      "Keep cancellation clear while presenting only relevant eligible alternatives",
      "Measure paid renewals and margin beyond offer acceptance",
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
    publishedAt: "2026-02-23",
    updatedAt: "2026-03-20",
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
    publishedAt: "2026-05-30",
    updatedAt: "2026-06-08",
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
    publishedAt: "2026-04-13",
    updatedAt: "2026-05-05",
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
    publishedAt: "2026-06-12",
    updatedAt: "2026-06-13",
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
    publishedAt: "2026-01-05",
    updatedAt: "2026-05-22",
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
    publishedAt: "2026-06-05",
    updatedAt: "2026-06-17",
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
    publishedAt: "2026-06-06",
    updatedAt: "2026-07-14",
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
    publishedAt: "2026-06-03",
    updatedAt: "2026-06-15",
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
    publishedAt: "2026-07-05",
    updatedAt: "2026-07-16",
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
    publishedAt: "2026-04-01",
    updatedAt: "2026-06-07",
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
    publishedAt: "2026-03-06",
    updatedAt: "2026-05-18",
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
    publishedAt: "2026-02-18",
    updatedAt: "2026-04-11",
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
    publishedAt: "2026-04-03",
    updatedAt: "2026-07-06",
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
    publishedAt: "2026-04-16",
    updatedAt: "2026-04-29",
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
    publishedAt: "2026-06-25",
    updatedAt: "2026-07-05",
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
    publishedAt: "2026-05-22",
    updatedAt: "2026-06-21",
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
    publishedAt: "2026-07-17",
    updatedAt: "2026-07-19",
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
    publishedAt: "2026-04-07",
    updatedAt: "2026-04-16",
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
    publishedAt: "2026-07-19",
    updatedAt: "2026-07-20",
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
    publishedAt: "2026-05-14",
    updatedAt: "2026-05-31",
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
    publishedAt: "2026-03-04",
    updatedAt: "2026-06-03",
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
    publishedAt: "2026-01-20",
    updatedAt: "2026-04-30",
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
    publishedAt: "2026-06-16",
    updatedAt: "2026-06-23",
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
    publishedAt: "2026-03-14",
    updatedAt: "2026-05-28",
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
    publishedAt: "2026-06-27",
    updatedAt: "2026-07-16",
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
    publishedAt: "2026-04-28",
    updatedAt: "2026-04-29",
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
    publishedAt: "2026-01-31",
    updatedAt: "2026-06-14",
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
    publishedAt: "2026-06-14",
    updatedAt: "2026-07-01",
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
    publishedAt: "2026-07-14",
    updatedAt: "2026-07-14",
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
    publishedAt: "2026-01-12",
    updatedAt: "2026-02-06",
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
    publishedAt: "2026-05-25",
    updatedAt: "2026-06-07",
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
    publishedAt: "2026-06-23",
    updatedAt: "2026-06-24",
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
    publishedAt: "2026-06-02",
    updatedAt: "2026-06-25",
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
    publishedAt: "2026-03-21",
    updatedAt: "2026-04-05",
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
  {
    id: "A035",
    slug: "subscription-grace-periods-explained",
    categorySlug: "payment-recovery",
    title: "Subscription Grace Periods Explained",
    seoTitle: "Subscription Grace Periods Explained",
    metaDescription:
      "Learn how subscription grace periods coordinate payment recovery, customer access, fulfillment, on-hold status, cancellation, and late-payment restoration.",
    excerpt:
      "Separate temporary active access from an on-hold recovery window, then align retries, notices, fulfillment, and the final unpaid outcome.",
    directAnswer:
      "A subscription grace period is the defined time after payment becomes due when a customer can still recover the renewal before the subscription reaches its final unpaid state. A two-phase policy separates temporary active access from an on-hold recovery window, so payment retries, customer notices, access, fulfillment, and cancellation do not change at the same moment.",
    publishedAt: "2026-02-04",
    updatedAt: "2026-05-06",
    lastVerifiedAt: "2026-07-16",
    readTime: "17 min read",
    format: "Explainer",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "subscription grace period explained",
      "WooCommerce subscription grace period",
      "failed payment recovery access",
      "two-phase subscription grace period",
    ],
    cover: {
      label: "Grace without ambiguity",
      image: "/blogs/subscription-grace-periods-explained/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A036",
    slug: "expired-cards-and-subscription-recovery",
    categorySlug: "payment-recovery",
    title: "Expired Cards and Subscription Recovery",
    seoTitle: "Expired Cards and Subscription Recovery",
    metaDescription:
      "Recover WooCommerce subscriptions after card expiration with secure updates, correct gateway ownership, payment collection, and full lifecycle reconciliation.",
    excerpt:
      "Treat expiration as a payment-method problem, use the gateway's secure update path, and reconcile every renewal and access record after recovery.",
    directAnswer:
      "An expired card does not make the subscription itself unusable, but it can make the saved payment token unable to fund the next renewal. Recovery requires a secure gateway-hosted update or reauthorization, a correctly timed retry, and reconciliation of the renewal order, subscription status, access, and next billing date after payment succeeds.",
    publishedAt: "2026-03-09",
    updatedAt: "2026-05-28",
    lastVerifiedAt: "2026-07-16",
    readTime: "15 min read",
    format: "Guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "expired card subscription recovery",
      "update expired card WooCommerce subscription",
      "card updater recurring payments",
      "recover subscription after card expiration",
    ],
    cover: {
      label: "Recover expired-card renewals",
      image: "/blogs/expired-cards-and-subscription-recovery/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A037",
    slug: "failed-payment-email-sequence-a-message-by-message-playbook",
    categorySlug: "payment-recovery",
    title: "Failed Payment Email Sequence: A Message-by-Message Playbook",
    seoTitle: "Failed Payment Email Sequence Playbook",
    metaDescription:
      "Build a failed-payment email sequence with state-based triggers, adaptable copy, secure actions, stop rules, access deadlines, and honest recovery metrics.",
    excerpt:
      "Match each message to the real payment state, give one secure recovery action, and stop immediately when the lifecycle changes.",
    directAnswer:
      "A failed-payment email sequence should explain the problem immediately, provide one secure recovery action, increase specificity as the access deadline approaches, and stop as soon as payment succeeds or the lifecycle changes. Each message must match the actual retry, grace, and access policy; a persuasive email cannot fix an incorrect token, webhook, or renewal state.",
    publishedAt: "2026-02-17",
    updatedAt: "2026-03-26",
    lastVerifiedAt: "2026-07-16",
    readTime: "16 min read",
    format: "Guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "failed payment email sequence",
      "subscription payment failed email examples",
      "dunning email copy WooCommerce",
      "card update reminder sequence",
    ],
    cover: {
      label: "Messages that follow payment state",
      image:
        "/blogs/failed-payment-email-sequence-a-message-by-message-playbook/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A038",
    slug: "auto-downgrade-after-payment-failure-when-it-beats-cancellation",
    categorySlug: "payment-recovery",
    title: "Auto-Downgrade After Payment Failure: When It Beats Cancellation",
    seoTitle: "Auto-Downgrade After Subscription Payment Failure",
    metaDescription:
      "Decide when auto-downgrade should replace cancellation after failed subscription payments, with entitlement, gateway, abuse, and reactivation guardrails.",
    excerpt:
      "Use a lower-cost fallback only when it preserves real customer value without creating hidden fulfillment, access, or abuse risk.",
    directAnswer:
      "Auto-downgrade can beat cancellation when a subscription has a genuinely useful lower or free tier, the reduced entitlement is inexpensive to serve, and customers can later reauthorize payment without losing their work. It is usually a poor fit for shipped goods, costly human services, regulated access, or products whose “free” state creates ongoing fulfillment risk.",
    publishedAt: "2026-06-10",
    updatedAt: "2026-06-20",
    lastVerifiedAt: "2026-07-16",
    readTime: "15 min read",
    format: "Strategy guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "auto downgrade after failed subscription payment",
      "failed payment downgrade to free plan",
      "subscription fallback plan strategy",
      "retain user after payment failure",
    ],
    cover: {
      label: "Downgrade instead of cancelling",
      image:
        "/blogs/auto-downgrade-after-payment-failure-when-it-beats-cancellation/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A039",
    slug: "involuntary-churn-recovery-checklist",
    categorySlug: "payment-recovery",
    title: "Involuntary Churn Recovery Checklist",
    seoTitle: "Involuntary Churn Recovery Checklist",
    metaDescription:
      "Audit involuntary churn recovery across gateways, tokens, retries, email, grace, access, support, reconciliation, and closed-cohort measurement.",
    excerpt:
      "Audit prevention, decline routing, retries, communication, access, support, reconciliation, and measurement as one recovery system.",
    directAnswer:
      "An involuntary-churn recovery checklist must cover more than retries: verify gateway and token health, prevent avoidable expiration failures, classify declines, coordinate retries and customer messages, define grace and access rules, reconcile webhooks and renewal orders, give support safe recovery tools, and measure closed cohorts only after every eligible invoice reaches a final state.",
    publishedAt: "2026-06-11",
    updatedAt: "2026-06-22",
    lastVerifiedAt: "2026-07-16",
    readTime: "14 min read",
    format: "Checklist",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "involuntary churn recovery checklist",
      "reduce failed payment churn ecommerce",
      "subscription payment recovery checklist",
      "involuntary churn prevention WooCommerce",
    ],
    cover: {
      label: "Audit the full recovery system",
      image: "/blogs/involuntary-churn-recovery-checklist/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A040",
    slug: "subscription-payment-failure-codes-a-practical-triage-guide",
    categorySlug: "payment-recovery",
    title: "Subscription Payment Failure Codes: A Practical Triage Guide",
    seoTitle: "Subscription Payment Failure Codes: Triage Guide",
    metaDescription:
      "Translate Stripe, PayPal, and Paddle subscription payment failures into retry, update, authenticate, stop, or reconciliation actions safely.",
    excerpt:
      "Translate provider evidence into retry, update, authenticate, stop, or investigate actions without exposing sensitive decline detail.",
    directAnswer:
      "Subscription payment failure codes are gateway evidence, not universal instructions. Translate each code into one merchant action: retry later, ask the customer to update payment details, complete authentication, stop and escalate, or investigate a technical/reconciliation fault. Preserve the raw provider evidence privately, show customers safe language, and verify payment before changing access or retrying manually.",
    publishedAt: "2026-01-29",
    updatedAt: "2026-03-12",
    lastVerifiedAt: "2026-07-16",
    readTime: "14 min read",
    format: "Troubleshooting guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "subscription payment failure codes",
      "Stripe decline codes recurring payments",
      "PayPal subscription payment errors",
      "hard vs soft payment decline",
    ],
    cover: {
      label: "Route failures to the right action",
      image:
        "/blogs/subscription-payment-failure-codes-a-practical-triage-guide/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A041",
    slug: "how-to-create-a-woocommerce-membership-site-architecture-before-configuration",
    categorySlug: "membership-strategy",
    title:
      "How to Create a WooCommerce Membership Site: Architecture Before Configuration",
    seoTitle: "How to Create a WooCommerce Membership Site",
    metaDescription:
      "Plan a WooCommerce membership site by separating the member promise, commerce, source of truth, access rules, lifecycle, portal, and operations.",
    excerpt:
      "Define the member promise, commerce model, access evidence, lifecycle, denied experience, and operating owner before configuring rules.",
    directAnswer:
      "To create a WooCommerce membership site, define the member promise first, then separate six jobs: payment collection, the subscription or purchase record, access conditions, protected-content scope, lifecycle policy, and the customer portal. Choose the WordPress plugin stack only after mapping how signup, payment failure, cancellation, expiration, and re-entry change access.",
    publishedAt: "2026-05-28",
    updatedAt: "2026-07-17",
    lastVerifiedAt: "2026-07-16",
    readTime: "21 min read",
    format: "Pillar guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "how to create a WooCommerce membership site",
      "WooCommerce membership site planning guide",
      "build a paid membership with WooCommerce",
      "subscription membership architecture",
    ],
    cover: {
      label: "Plan membership before configuration",
      image:
        "/blogs/how-to-create-a-woocommerce-membership-site-architecture-before-configuration/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A042",
    slug: "woocommerce-membership-vs-subscription-what-is-the-difference",
    categorySlug: "membership-strategy",
    title: "WooCommerce Membership vs Subscription: What Is the Difference?",
    seoTitle: "WooCommerce Membership vs Subscription",
    metaDescription:
      "Compare WooCommerce memberships and subscriptions: access entitlement versus recurring billing, when to use one or both, and how ArraySubs models them.",
    excerpt:
      "Separate recurring billing from access entitlement, then decide whether one model, both models, or an independent membership ledger fits.",
    directAnswer:
      "In WooCommerce, a subscription is a billing and lifecycle agreement; a membership is an access entitlement. A subscription can sell recurring products without protected content, and a membership can be free, one-time, fixed-term, or lifetime. Use both when recurring payment status should control content, products, discounts, downloads, community, or services.",
    publishedAt: "2026-06-30",
    updatedAt: "2026-07-10",
    lastVerifiedAt: "2026-07-16",
    readTime: "17 min read",
    format: "Comparison",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "WooCommerce membership vs subscription",
      "subscription vs membership difference WooCommerce",
      "WooCommerce subscriptions and memberships",
      "recurring billing vs content access",
    ],
    cover: {
      label: "Billing and access are different",
      image:
        "/blogs/woocommerce-membership-vs-subscription-what-is-the-difference/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A043",
    slug: "woocommerce-subscriptions-and-memberships-together-the-complete-architecture",
    categorySlug: "membership-strategy",
    title:
      "WooCommerce Subscriptions and Memberships Together: The Complete Architecture",
    seoTitle: "WooCommerce Subscriptions and Memberships Together",
    metaDescription:
      "Connect WooCommerce subscription billing to membership access with explicit systems of record, lifecycle contracts, entitlement rules, and reconciliation tests.",
    excerpt:
      "Connect billing to access through an explicit lifecycle contract, reconciliation path, recovery exclusions, and end-to-end transition tests.",
    directAnswer:
      "To run WooCommerce subscriptions and memberships together, choose separate systems of record for money and access, then define an explicit status-to-access contract between them. Every checkout, renewal, failure, grace period, pause, cancellation, expiration, refund, and plan switch must update or re-evaluate the member's entitlements without blocking payment recovery or creating duplicate access.",
    publishedAt: "2026-04-09",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-16",
    readTime: "14 min read",
    format: "Guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "WooCommerce subscriptions and memberships together",
      "recurring membership WooCommerce architecture",
      "connect subscription billing to content access",
      "subscription status controls membership access",
    ],
    cover: {
      label: "Connect money to access safely",
      image:
        "/blogs/woocommerce-subscriptions-and-memberships-together-the-complete-architecture/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A044",
    slug: "membership-level-strategy-free-paid-lifetime-and-tiered-access",
    categorySlug: "membership-strategy",
    title: "Membership Level Strategy: Free, Paid, Lifetime, and Tiered Access",
    seoTitle: "Membership Level Strategy: Free, Paid, and Tiered",
    metaDescription:
      "Design membership levels around distinct outcomes, sustainable delivery, free and lifetime economics, enforceable entitlements, switching, and grandfathering.",
    excerpt:
      "Build tiers around distinct member outcomes, explicit entitlement differences, sustainable delivery cost, switching, and grandfathering policy.",
    directAnswer:
      "A strong membership level strategy gives each tier a distinct member outcome, not merely more features. Start with one clear paid level, add free access only when it creates a deliberate acquisition path, add tiers when segments need meaningfully different value or service cost, and offer lifetime access only when future obligations remain economically supportable.",
    publishedAt: "2026-04-26",
    updatedAt: "2026-05-18",
    lastVerifiedAt: "2026-07-16",
    readTime: "14 min read",
    format: "Strategy guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "membership level strategy",
      "how many membership tiers",
      "free vs paid membership levels",
      "lifetime membership vs recurring membership",
    ],
    cover: {
      label: "Design sustainable membership levels",
      image:
        "/blogs/membership-level-strategy-free-paid-lifetime-and-tiered-access/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A045",
    slug: "woocommerce-content-restriction-strategy",
    categorySlug: "membership-strategy",
    title: "WooCommerce Content Restriction Strategy",
    seoTitle: "WooCommerce Content Restriction Strategy",
    metaDescription:
      "Design WooCommerce content restrictions with deliberate public/member classes, narrow targets, reliable conditions, priority, denied UX, governance, and testing.",
    excerpt:
      "Classify public and protected content first, then govern the narrowest enforceable scope, condition, priority, denied path, and rollback.",
    directAnswer:
      "A sound WooCommerce content restriction strategy classifies content before creating rules: public discovery, preview, member access, tier access, account recovery, and staff-only. For each protected item, define one authoritative condition, the narrowest target scope, rule priority, denied experience, schedule, and test cases. Never gate login, payment recovery, password reset, checkout, or support accidentally.",
    publishedAt: "2026-07-12",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-16",
    readTime: "14 min read",
    format: "Guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "content restriction strategy WooCommerce",
      "WooCommerce gated content best practices",
      "restrict content by subscription plan",
      "membership access control architecture",
    ],
    cover: {
      label: "Govern every access rule",
      image: "/blogs/woocommerce-content-restriction-strategy/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A046",
    slug: "hard-paywall-vs-metered-paywall-vs-freemium-content",
    categorySlug: "membership-strategy",
    title: "Hard Paywall vs Metered Paywall vs Freemium Content",
    seoTitle: "Hard Paywall vs Metered Paywall vs Freemium",
    metaDescription:
      "Compare hard, metered, freemium, and partial-content paywalls by audience habit, discovery, identity, privacy, implementation, and member value.",
    excerpt:
      "Choose a paywall by content uniqueness, audience habit, public proof, identity maturity, member aftercare, and operating burden.",
    directAnswer:
      "Choose a hard paywall when nearly all premium value can sit behind membership, a meter when readers need several complete samples before conversion, and freemium when selected content should remain permanently public while premium resources stay gated. The best model depends on audience habit, content uniqueness, acquisition channels, implementation accuracy, and the value members receive after subscribing.",
    publishedAt: "2026-05-13",
    updatedAt: "2026-07-04",
    lastVerifiedAt: "2026-07-16",
    readTime: "17 min read",
    format: "Comparison",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "hard paywall vs metered paywall vs freemium",
      "best paywall model for WordPress",
      "metered paywall vs membership",
      "partial vs full content restriction",
    ],
    cover: {
      label: "Choose the right paywall model",
      image:
        "/blogs/hard-paywall-vs-metered-paywall-vs-freemium-content/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A047",
    slug: "content-dripping-strategy-for-membership-sites",
    categorySlug: "membership-strategy",
    title: "Content Dripping Strategy for Membership Sites",
    seoTitle: "Content Dripping Strategy for Membership Sites",
    metaDescription:
      "Choose immediate, relative, cohort, completion, editorial, or hybrid content release with explicit anchors, catch-up, notifications, and honest measurement.",
    excerpt:
      "Use delayed release only when sequence, pacing, cohort timing, or ongoing publishing creates value, then document every timing boundary.",
    directAnswer:
      "Use content dripping when sequence, pacing, cohort timing, or ongoing release creates real member value—not merely to delay access. Choose an explicit anchor, release interval, catch-up policy, notification path, and expiry rule; show members what is available next. Offer immediate access when reference use, urgent results, self-paced learning, or experienced members make waiting harmful.",
    publishedAt: "2026-07-20",
    updatedAt: "2026-07-20",
    lastVerifiedAt: "2026-07-16",
    readTime: "13 min read",
    format: "Strategy guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "content dripping strategy membership site",
      "drip content schedule best practices",
      "membership content release schedule",
      "course content dripping strategy",
    ],
    cover: {
      label: "Release content with purpose",
      image: "/blogs/content-dripping-strategy-for-membership-sites/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A048",
    slug: "members-only-products-and-catalogs-in-woocommerce",
    categorySlug: "membership-strategy",
    title: "Members-Only Products and Catalogs in WooCommerce",
    seoTitle: "Members-Only Products and Catalogs in WooCommerce",
    metaDescription:
      "Choose discoverable, private, or login-first WooCommerce member catalogs and enforce product visibility and purchase authorization across every route.",
    excerpt:
      "Choose public discovery with purchase blocking, a genuinely private catalog, or a login-first journey—and secure every commerce path.",
    directAnswer:
      "A WooCommerce members-only catalog can hide products completely, keep product pages discoverable while blocking purchase, or redirect unauthorized visitors to login or pricing. The right model depends on whether organic discovery or inventory privacy matters more. ArraySubs enforces current shop rules across product pages, catalog queries, cart validation, checkout, Store API requests, and qualifying member conditions.",
    publishedAt: "2026-03-19",
    updatedAt: "2026-06-10",
    lastVerifiedAt: "2026-07-16",
    readTime: "14 min read",
    format: "Guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "members only products WooCommerce strategy",
      "private WooCommerce catalog membership",
      "restrict products for members",
      "member only pricing and products",
    ],
    cover: {
      label: "Public, private, or login-first catalog",
      image:
        "/blogs/members-only-products-and-catalogs-in-woocommerce/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A049",
    slug: "seo-for-gated-woocommerce-content",
    categorySlug: "membership-strategy",
    title: "SEO for Gated WooCommerce Content",
    seoTitle: "SEO for Gated WooCommerce Content",
    metaDescription:
      "Plan SEO for gated WooCommerce content with useful public answers, server-side authorization, honest metadata, paywall schema, cache QA, and rendering tests.",
    excerpt:
      "Write separate search and member promises, authorize the premium layer server-side, and validate exactly what crawlers and guests receive.",
    directAnswer:
      "Gated WooCommerce content can rank only to the extent that search engines can crawl useful public material. With ArraySubs server-side gating, an unauthorized crawler receives the same teaser or denial output as a guest, not the protected body. Publish a substantial public answer, gate the premium section, keep metadata honest, and test the rendered guest response in Google Search Console.",
    publishedAt: "2026-04-19",
    updatedAt: "2026-06-16",
    lastVerifiedAt: "2026-07-16",
    readTime: "14 min read",
    format: "Guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "SEO for gated content WooCommerce",
      "membership content SEO",
      "paywall SEO WordPress",
      "index protected content safely",
    ],
    cover: {
      label: "Make gated content discoverable honestly",
      image: "/blogs/seo-for-gated-woocommerce-content/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A050",
    slug: "protecting-membership-downloads-in-wordpress",
    categorySlug: "membership-strategy",
    title: "Protecting Membership Downloads in WordPress",
    seoTitle: "Protecting Membership Downloads in WordPress",
    metaDescription:
      "Protect WordPress membership downloads with request-time authorization, private storage, secure delivery, revocation tests, and honest security boundaries.",
    excerpt:
      "Combine current entitlement checks with a private origin, controlled delivery, revocation tests, and an incident-response plan for leaked objects.",
    directAnswer:
      "To protect membership downloads in WordPress, authorize the member every time the file is requested and prevent direct public access to the underlying object. ArraySubs checks login, a WordPress nonce, current membership conditions, and any release schedule. Sensitive files still need private origin storage or server/CDN enforcement because a public Media Library or permanent CDN URL can bypass the protected endpoint.",
    publishedAt: "2026-04-06",
    updatedAt: "2026-05-25",
    lastVerifiedAt: "2026-07-16",
    readTime: "14 min read",
    format: "Guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "protect membership downloads WordPress",
      "secure WooCommerce member downloads",
      "prevent direct download URL sharing",
      "subscription gated file access",
    ],
    cover: {
      label: "Protect the file, not the button",
      image: "/blogs/protecting-membership-downloads-in-wordpress/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A051",
    slug: "wordpress-roles-vs-membership-levels-vs-feature-entitlements",
    categorySlug: "membership-strategy",
    title: "WordPress Roles vs Membership Levels vs Feature Entitlements",
    seoTitle: "WordPress Roles vs Membership Levels",
    metaDescription:
      "Compare WordPress roles, membership levels, and feature entitlements—and design a subscription access model that avoids stale roles and excessive privilege.",
    excerpt:
      "Keep commercial truth in subscription or purchase records, define granular entitlements, and emit least-privilege roles only for interoperability.",
    directAnswer:
      "WordPress roles answer “what can this account do across WordPress,” membership levels answer “which commercial plan and lifecycle state does this customer currently have,” and feature entitlements answer “which specific capability or limit is available.” Use subscription or purchase records as commercial truth, explicit entitlements for fine-grained access, and least-privilege roles only where WordPress or another plugin needs them.",
    publishedAt: "2026-03-10",
    updatedAt: "2026-05-16",
    lastVerifiedAt: "2026-07-16",
    readTime: "17 min read",
    format: "Comparison",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "WordPress roles vs membership levels",
      "subscription plan vs user role WordPress",
      "membership access vs feature entitlement",
      "roles for WooCommerce members",
    ],
    cover: {
      label: "Separate roles, levels, and entitlements",
      image:
        "/blogs/wordpress-roles-vs-membership-levels-vs-feature-entitlements/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A052",
    slug: "url-based-content-restriction-prefixes-wildcards-and-regex",
    categorySlug: "membership-strategy",
    title: "URL-Based Content Restriction: Prefixes, Wildcards, and Regex",
    seoTitle: "URL-Based Content Restriction in WordPress",
    metaDescription:
      "Use exact, prefix, contains, and regex URL restrictions safely in WordPress, with ArraySubs matching semantics, priority, exclusions, and a QA matrix.",
    excerpt:
      "Choose the least expressive matcher that fits, order specific and broad rules deliberately, and test normalization, exclusions, and redirects.",
    directAnswer:
      "For URL-based content restriction in WordPress, ArraySubs compares the request path—without its query string—using exact, starts-with, contains, or case-insensitive regex matching. Exact, prefix, and contains comparisons are case-sensitive; exclusions are prefix checks; lower priority numbers run first. The first matching, non-excluded URL rule decides access, so broad patterns and overlaps require an explicit test matrix.",
    publishedAt: "2026-02-26",
    updatedAt: "2026-04-24",
    lastVerifiedAt: "2026-07-16",
    readTime: "14 min read",
    format: "Guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "URL based content restriction WordPress",
      "restrict WordPress URL path by membership",
      "wildcard content restriction rules",
      "regex URL access control",
    ],
    cover: {
      label: "Match routes without surprises",
      image:
        "/blogs/url-based-content-restriction-prefixes-wildcards-and-regex/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A053",
    slug: "partial-content-restriction-seo-conversion-and-reader-experience",
    categorySlug: "membership-strategy",
    title:
      "Partial Content Restriction: SEO, Conversion, and Reader Experience",
    seoTitle: "Partial Content Restriction: SEO and Conversion",
    metaDescription:
      "Use partial content restriction without bait-and-switch: preserve useful public answers, gate premium value server-side, and test SEO, conversion, cache, and UX.",
    excerpt:
      "Resolve and prove the public answer, bridge to a concrete premium outcome, then test the server-side boundary by reader segment.",
    directAnswer:
      "Partial content restriction can preserve organic usefulness and create a legitimate membership conversion moment when a complete public answer appears before a server-side gate. ArraySubs can restrict shortcode, Gutenberg block, or Elementor Container content and return a denial message to nonmembers. Only the public response is crawlable by default, so place the boundary according to search intent and measured reader behavior—not a universal word count.",
    publishedAt: "2026-03-05",
    updatedAt: "2026-05-19",
    lastVerifiedAt: "2026-07-16",
    readTime: "14 min read",
    format: "Guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "partial content restriction SEO",
      "gate part of a WordPress page",
      "content teaser membership conversion",
      "inline paywall SEO best practices",
    ],
    cover: {
      label: "Gate deeper value, not the answer",
      image:
        "/blogs/partial-content-restriction-seo-conversion-and-reader-experience/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A054",
    slug: "and-or-membership-access-rules-explained-with-examples",
    categorySlug: "membership-strategy",
    title: "AND/OR Membership Access Rules Explained with Examples",
    seoTitle: "AND/OR Membership Access Rules Explained",
    metaDescription:
      "Translate membership policy into AND, OR, and grouped access rules with truth tables, ArraySubs examples, multi-select caveats, and a complete test checklist.",
    excerpt:
      "Translate plain-language policy into mandatory and alternative facts, build one nested group, and turn every Boolean branch into a test persona.",
    directAnswer:
      "In AND/OR membership access rules, AND means every condition must pass, while OR means any condition can pass. Parentheses define which facts belong together: `A AND (B OR C)` requires A plus either B or C. Current ArraySubs supports a top-level ALL/ANY operator and one nested group level, covering most practical subscription, purchase, role, spend, and feature policies.",
    publishedAt: "2026-06-08",
    updatedAt: "2026-06-24",
    lastVerifiedAt: "2026-07-16",
    readTime: "13 min read",
    format: "Explainer",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "AND OR membership access rules",
      "combine membership access conditions",
      "nested content restriction rules WordPress",
      "membership rule logic examples",
    ],
    cover: {
      label: "Build access logic people can test",
      image:
        "/blogs/and-or-membership-access-rules-explained-with-examples/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A055",
    slug: "preventing-shared-membership-accounts-without-punishing-families",
    categorySlug: "membership-strategy",
    title: "Preventing Shared Membership Accounts Without Punishing Families",
    seoTitle: "Prevent Shared Membership Accounts Fairly",
    metaDescription:
      "Prevent shared membership accounts with session limits, family and team options, accessible exceptions, privacy-aware enforcement, recovery, and appeals.",
    excerpt:
      "Deter unlimited credential sharing with realistic session limits, separate family or team identities, clear recovery, and proportionate review.",
    directAnswer:
      "To prevent shared membership accounts without blocking legitimate households, limit concurrent sessions rather than every device ever used, set allowances by plan, publish the rule before purchase, and provide a fast recovery path. Give families and teams separate-account plans when identity, privacy, progress, or billing belongs to individuals, and review repeated patterns before penalizing anyone.",
    publishedAt: "2026-02-11",
    updatedAt: "2026-03-15",
    lastVerifiedAt: "2026-07-20",
    readTime: "24 min read",
    format: "Strategy guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "prevent shared membership accounts",
      "limit concurrent logins WordPress membership",
      "membership account sharing policy",
      "multi login prevention best practices",
    ],
    cover: {
      label: "Deter sharing without punishing normal use",
      image:
        "/blogs/preventing-shared-membership-accounts-without-punishing-families/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A056",
    slug: "best-payment-gateways-for-woocommerce-subscriptions",
    categorySlug: "payments-and-compliance",
    title: "Best Payment Gateways for WooCommerce Subscriptions in 2026",
    seoTitle: "Best WooCommerce Subscription Gateways (2026)",
    metaDescription:
      "Compare Stripe, PayPal, Paddle, and manual renewal gateways for WooCommerce subscriptions by automation, SCA, recovery, tax ownership, fit, and risk.",
    excerpt:
      "Choose the renewal architecture first, then compare Stripe, PayPal, Paddle, and manual billing by cart fit, recovery, operations, and responsibility.",
    directAnswer:
      "For most WooCommerce subscription stores, Stripe is the best primary automatic-renewal gateway, PayPal is the best additional wallet for customers who actively prefer it, and Paddle is the strongest ArraySubs option for eligible software and digital businesses that want a Merchant of Record. Manual renewals remain valid for invoice-led B2B sales, bank transfer, and regional gateways.",
    publishedAt: "2026-02-11",
    updatedAt: "2026-06-29",
    lastVerifiedAt: "2026-07-22",
    readTime: "33 min read",
    format: "Comparison guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "best payment gateways for WooCommerce subscriptions",
      "WooCommerce recurring payment gateway comparison",
      "Stripe PayPal Paddle subscriptions",
      "automatic subscription renewals",
    ],
    cover: {
      label: "Choose the recurring-payment architecture",
      image:
        "/blogs/best-payment-gateways-for-woocommerce-subscriptions/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A057",
    slug: "stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing",
    categorySlug: "payments-and-compliance",
    title: "Stripe vs PayPal vs Paddle for WooCommerce Recurring Billing",
    seoTitle: "Stripe vs PayPal vs Paddle for Recurring Billing",
    metaDescription:
      "Compare Stripe, PayPal, and Paddle for WooCommerce recurring billing by control, carts, SCA, recovery, tax ownership, webhooks, refunds, and total cost.",
    excerpt:
      "Compare three billing control planes: WooCommerce-led Stripe, buyer-approved PayPal agreements, and Paddle's Merchant-of-Record commerce stack.",
    directAnswer:
      "Choose Stripe when you want WooCommerce to control renewals and need the most flexible carts, saved-payment recovery, and direct payment operations. Add PayPal when buyer preference justifies its one-plan checkout constraints. Choose Paddle for eligible software or digital subscriptions when Merchant-of-Record tax and compliance ownership matters more than Woo-native control.",
    publishedAt: "2026-03-18",
    updatedAt: "2026-07-11",
    lastVerifiedAt: "2026-07-22",
    readTime: "32 min read",
    format: "Comparison guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "Stripe vs PayPal vs Paddle for WooCommerce recurring billing",
      "best subscription gateway Stripe or PayPal",
      "Paddle vs Stripe merchant of record WooCommerce",
      "PayPal vs Paddle recurring payments",
    ],
    cover: {
      label: "Compare recurring-payment control planes",
      image:
        "/blogs/stripe-vs-paypal-vs-paddle-for-woocommerce-recurring-billing/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A058",
    slug: "stripe-recurring-payments-for-woocommerce-how-they-work-and-what-to-test",
    categorySlug: "payments-and-compliance",
    title:
      "Stripe Recurring Payments for WooCommerce: How They Work and What to Test",
    seoTitle: "Stripe Recurring Payments for WooCommerce",
    metaDescription:
      "Learn how WooCommerce Stripe recurring payments work with ArraySubs, including tokens, PaymentIntents, SCA, webhooks, retries, and launch testing.",
    excerpt:
      "Trace a Stripe renewal from reusable payment authority through local scheduling, off-session PaymentIntent states, webhooks, recovery, and reconciliation.",
    directAnswer:
      "Stripe recurring payments for WooCommerce work when checkout creates reusable payment authority, WooCommerce stores a safe payment token, ArraySubs schedules a renewal order, and ArraySubs Pro confirms a new off-session Stripe PaymentIntent when that renewal becomes due. Stripe moves the money, but the WordPress store—not Stripe Billing—owns the subscription schedule in this architecture.",
    publishedAt: "2026-01-24",
    updatedAt: "2026-06-15",
    lastVerifiedAt: "2026-07-22",
    readTime: "29 min read",
    format: "Technical guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "Stripe recurring payments for WooCommerce",
      "WooCommerce Stripe subscription renewals",
      "Stripe saved cards off session payments",
      "test Stripe subscriptions WooCommerce",
    ],
    cover: {
      label: "Test the complete Stripe renewal lifecycle",
      image:
        "/blogs/stripe-recurring-payments-for-woocommerce-how-they-work-and-what-to-test/hero.png",
      tone: "primary",
    },
  },
  {
    id: "A059",
    slug: "paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits",
    categorySlug: "payments-and-compliance",
    title:
      "PayPal Recurring Payments for WooCommerce: Agreements, Renewals, and Limits",
    seoTitle: "PayPal Recurring Payments for WooCommerce",
    metaDescription:
      "Learn how PayPal recurring payments work with WooCommerce and ArraySubs, including approval, plans, webhooks, renewals, refunds, and current limits.",
    excerpt:
      "Trace PayPal Product, Plan, Subscription, approval, sale, and webhook objects—and understand the current cart and lifecycle boundaries.",
    directAnswer:
      "PayPal recurring payments in the current ArraySubs Pro integration use PayPal’s Subscriptions REST API. Checkout creates a PayPal Product, Billing Plan, and Subscription, then redirects the buyer to PayPal for approval. PayPal controls later charges and retries; ArraySubs creates and reconciles WooCommerce renewal orders from scheduled jobs and verified webhooks.",
    publishedAt: "2026-04-04",
    updatedAt: "2026-07-03",
    lastVerifiedAt: "2026-07-22",
    readTime: "27 min read",
    format: "Technical guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "PayPal recurring payments WooCommerce",
      "WooCommerce PayPal subscription renewal",
      "PayPal billing agreement WooCommerce",
      "automatic recurring payments PayPal limitations",
    ],
    cover: {
      label: "Separate approval, settlement, and renewal",
      image:
        "/blogs/paypal-recurring-payments-for-woocommerce-agreements-renewals-and-limits/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A060",
    slug: "paddle-merchant-of-record-for-woocommerce-subscriptions",
    categorySlug: "payments-and-compliance",
    title: "Paddle Merchant of Record for WooCommerce Subscriptions",
    seoTitle: "Paddle Merchant of Record for WooCommerce",
    metaDescription:
      "Learn how Paddle Merchant of Record works with WooCommerce and ArraySubs, including tax, checkout, renewals, webhooks, refunds, payouts, and limits.",
    excerpt:
      "Understand Paddle’s buyer-facing MoR responsibility, remote billing architecture, product synchronization, tax documents, lifecycle, and reconciliation limits.",
    directAnswer:
      "Paddle can be the Merchant of Record for an eligible software or digital subscription sold from a WooCommerce storefront. Paddle becomes the buyer-facing reseller and handles payment collection, applicable sales-tax/VAT administration, transaction documents, refunds, and chargeback operations. The supplier still owns product eligibility, delivery, support, privacy, accounting, and correct ArraySubs–Paddle lifecycle reconciliation.",
    publishedAt: "2026-02-28",
    updatedAt: "2026-05-26",
    lastVerifiedAt: "2026-07-22",
    readTime: "27 min read",
    format: "Technical guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "Paddle Merchant of Record WooCommerce",
      "use Paddle for WooCommerce subscriptions",
      "merchant of record recurring billing WordPress",
      "Paddle subscription tax handling",
    ],
    cover: {
      label: "Map the Merchant-of-Record responsibility shift",
      image:
        "/blogs/paddle-merchant-of-record-for-woocommerce-subscriptions/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A061",
    slug: "automatic-vs-manual-gateway-support-for-subscriptions",
    categorySlug: "payments-and-compliance",
    title: "Automatic vs Manual Gateway Support for Subscriptions",
    seoTitle: "Automatic vs Manual Subscription Gateway Support",
    metaDescription:
      "Learn why a WooCommerce gateway can work at checkout but not auto-renew, and how to qualify tokens, schedules, SCA, invoices, failures, and switching.",
    excerpt:
      "Separate checkout acceptance from true automatic-renewal readiness with a capability ladder, lifecycle tests, fallback safeguards, and gateway-specific schedule ownership.",
    directAnswer:
      "A WooCommerce gateway can work at checkout yet remain manual-only for subscriptions. Automatic renewal needs a subscription-aware integration that preserves reusable customer authority, owns or recognizes the future schedule, handles off-session and authentication states, records one renewal order, and reconciles gateway events. Without that complete chain, a manual renewal invoice is the safe model.",
    publishedAt: "2026-06-04",
    updatedAt: "2026-07-13",
    lastVerifiedAt: "2026-07-22",
    readTime: "34 min read",
    format: "Technical explainer",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "automatic vs manual subscription gateway support",
      "WooCommerce gateway automatic renewal support",
      "manual renewal invoice payment gateway",
      "why a gateway cannot auto renew subscriptions",
    ],
    cover: {
      label: "Qualify the complete renewal lifecycle",
      image:
        "/blogs/automatic-vs-manual-gateway-support-for-subscriptions/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A062",
    slug: "sca-and-3d-secure-for-subscription-renewals",
    categorySlug: "payments-and-compliance",
    title: "SCA and 3D Secure for Subscription Renewals",
    seoTitle: "SCA and 3D Secure for Subscription Renewals",
    metaDescription:
      "Learn how SCA and 3D Secure affect subscription renewals, off-session payments, issuer challenges, Stripe recovery, webhooks, retries, and testing.",
    excerpt:
      "Understand how authenticated setup, off-session renewal, issuer challenges, pending recovery, webhook evidence, and gateway ownership fit together.",
    directAnswer:
      "SCA-ready subscription renewals begin with an authenticated, reusable payment method and clear authority for future charges. Later renewals can be attempted off-session, often as merchant-initiated transactions, but an issuer may still require 3D Secure. The store therefore needs a customer recovery link, reliable webhooks, pending-payment handling, and reconciliation before any retry.",
    publishedAt: "2026-01-15",
    updatedAt: "2026-07-02",
    lastVerifiedAt: "2026-07-22",
    readTime: "29 min read",
    format: "Technical guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "SCA 3D Secure subscription renewals",
      "strong customer authentication recurring payments",
      "off session WooCommerce subscription renewal",
      "3DS failed subscription payment",
    ],
    cover: {
      label: "Recover issuer-required renewal authentication",
      image: "/blogs/sca-and-3d-secure-for-subscription-renewals/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A063",
    slug: "subscription-payment-tokens-and-card-updates-explained",
    categorySlug: "payments-and-compliance",
    title: "Subscription Payment Tokens and Card Updates Explained",
    seoTitle: "Subscription Payment Tokens and Card Updates",
    metaDescription:
      "Learn how WooCommerce subscription payment tokens, provider vaults, card updates, defaults, expiry, portability, and ArraySubs renewal context work.",
    excerpt:
      "Understand provider-vault references, subscription-specific payment context, customer and network updates, portability limits, and renewal verification.",
    directAnswer:
      "A subscription payment token is a gateway-specific reference to a vaulted card or billing authorization, not a portable copy of the card. WooCommerce can store a customer token, but each subscription still needs the correct provider customer, payment-method, mandate, or agreement context. Card updates must reach that renewal context and then be proven with a test renewal.",
    publishedAt: "2026-05-07",
    updatedAt: "2026-06-18",
    lastVerifiedAt: "2026-07-22",
    readTime: "27 min read",
    format: "Technical explainer",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "subscription payment tokens and card updates",
      "WooCommerce subscription payment token",
      "update payment method recurring order",
      "expired card token WooCommerce",
    ],
    cover: {
      label: "Trace each renewal payment reference",
      image:
        "/blogs/subscription-payment-tokens-and-card-updates-explained/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A064",
    slug: "subscription-webhooks-events-every-woocommerce-store-should-monitor",
    categorySlug: "payments-and-compliance",
    title: "Subscription Webhooks: Events Every WooCommerce Store Should Monitor",
    seoTitle: "WooCommerce Subscription Webhooks to Monitor",
    metaDescription:
      "Learn which WooCommerce subscription webhooks to monitor across Stripe, PayPal, and Paddle, with security, idempotency, replay, and reconciliation guidance.",
    excerpt:
      "Build a defensible webhook evidence chain across provider delivery, signature verification, object correlation, idempotent mutation, and reconciliation.",
    directAnswer:
      "WooCommerce subscription webhook monitoring should prove that the provider reached the correct endpoint, the signature was verified, the event matched the right order and subscription, duplicate delivery cannot repeat the business effect, and local state reconciles with provider truth. Monitor the smallest complete event set for payment, lifecycle, access, and repair evidence.",
    publishedAt: "2026-03-02",
    updatedAt: "2026-07-19",
    lastVerifiedAt: "2026-07-22",
    readTime: "27 min read",
    format: "Technical guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "WooCommerce subscription webhooks",
      "Stripe webhook events for subscriptions",
      "PayPal recurring payment webhook monitoring",
      "Paddle subscription webhook health",
    ],
    cover: {
      label: "Verify every subscription payment event",
      image:
        "/blogs/subscription-webhooks-events-every-woocommerce-store-should-monitor/hero.png",
      tone: "dark",
    },
  },
  {
    id: "A065",
    slug: "sales-tax-and-vat-on-woocommerce-subscriptions",
    categorySlug: "payments-and-compliance",
    title: "Sales Tax and VAT on WooCommerce Subscriptions",
    seoTitle: "Sales Tax and VAT on WooCommerce Subscriptions",
    metaDescription:
      "Learn how sales tax and VAT work on WooCommerce subscriptions across signup, renewals, address changes, refunds, Stripe, PayPal, and Paddle MoR.",
    excerpt:
      "Build an auditable subscription-tax workflow across seller responsibility, product taxability, customer location, renewals, refunds, and gateway records.",
    directAnswer:
      "For WooCommerce subscriptions, tax is not a percentage chosen once at signup. The seller must establish registration or nexus, product taxability, customer location and status, and whether the seller or a Merchant of Record owns transaction tax. Each renewal should use valid inputs and leave an auditable order, payment, tax, refund, and invoice trail.",
    publishedAt: "2026-01-31",
    updatedAt: "2026-06-25",
    lastVerifiedAt: "2026-07-22",
    readTime: "33 min read",
    format: "Technical guide",
    author: "Emran",
    reviewer: "ArraySubs Engineering Team",
    keywords: [
      "sales tax and VAT on WooCommerce subscriptions",
      "tax recurring subscription payments WooCommerce",
      "VAT digital subscriptions WordPress",
      "subscription renewal tax rate changes",
    ],
    cover: {
      label: "Reconcile tax across every subscription renewal",
      image:
        "/blogs/sales-tax-and-vat-on-woocommerce-subscriptions/hero.png",
      tone: "highlight",
    },
  },
  {
    id: "A066",
    slug: "merchant-of-record-vs-payment-processor-for-subscription-businesses",
    categorySlug: "payments-and-compliance",
    title:
      "Merchant of Record vs Payment Processor for Subscription Businesses",
    seoTitle: "Merchant of Record vs Payment Processor: Subscription Guide",
    metaDescription:
      "Compare Merchant of Record and payment processor models for subscriptions across tax, invoices, disputes, control, cost, data, and migration risk.",
    excerpt:
      "Map seller identity, tax, invoices, disputes, cash, data, integrations, and exit obligations before choosing a Merchant of Record or processor model.",
    directAnswer:
      "A payment processor moves money while the subscription business remains the seller responsible for tax, invoices, refunds, disputes, compliance, and customer terms. A Merchant of Record becomes the buyer-facing seller for eligible transactions and takes on more of that transaction responsibility, but the supplier still owns product eligibility, delivery, support, privacy, accounting, integration, and exit risk.",
    publishedAt: "2026-05-21",
    updatedAt: "2026-07-06",
    lastVerifiedAt: "2026-07-22",
    readTime: "23 min read",
    format: "Decision guide",
    author: "Emran",
    reviewer: "ArraySubs Product Team",
    keywords: [
      "Merchant of Record vs payment processor subscriptions",
      "subscription payment processor responsibilities",
      "Merchant of Record tax invoices disputes",
      "WooCommerce subscription payment architecture",
    ],
    cover: {
      label: "Assign every subscription-selling responsibility",
      image:
        "/blogs/merchant-of-record-vs-payment-processor-for-subscription-businesses/featured-image.png",
      tone: "highlight",
    },
  },
  {
    id: "A067",
    slug: "migrating-subscription-gateways-without-breaking-renewals",
    categorySlug: "payments-and-compliance",
    title: "Migrating Subscription Gateways Without Breaking Renewals",
    seoTitle: "Migrate a Subscription Gateway Without Breaking Renewals",
    metaDescription:
      "A phased WooCommerce subscription gateway migration runbook covering tokens, mandates, schedules, webhooks, cohorts, reconciliation, rollback, and ArraySubs limits.",
    excerpt:
      "Inventory billing authority and renewal context, prove a pilot cohort, reconcile both systems, and move in bounded waves with an explicit rollback boundary.",
    directAnswer:
      "A safe subscription gateway migration separates new checkout traffic from existing renewal agreements, inventories every subscription's gateway-specific payment authority and billing owner, validates what can and cannot be ported, pilots a small cohort, reconciles local and provider state, and expands only after duplicate-charge, missed-renewal, webhook, and rollback controls pass.",
    publishedAt: "2026-03-27",
    updatedAt: "2026-06-20",
    lastVerifiedAt: "2026-07-22",
    readTime: "23 min read",
    format: "Migration runbook",
    author: "Emran",
    reviewer: "ArraySubs Product Team",
    keywords: [
      "migrate WooCommerce subscription gateway",
      "subscription gateway migration runbook",
      "move recurring payments without failed renewals",
      "payment token migration subscriptions",
    ],
    cover: {
      label: "Move renewal authority in verified cohorts",
      image:
        "/blogs/migrating-subscription-gateways-without-breaking-renewals/featured-image.png",
      tone: "dark",
    },
  },
  {
    id: "A068",
    slug: "choosing-a-subscription-gateway-by-country-and-business-model",
    categorySlug: "payments-and-compliance",
    title: "Choosing a Subscription Gateway by Country and Business Model",
    seoTitle: "Choose a Subscription Gateway by Country and Business Model",
    metaDescription:
      "Use a hard-gate framework to choose a WooCommerce subscription gateway by seller country, product, recurring method, mandate, payout, tax, and integration.",
    excerpt:
      "Eliminate gateways that fail seller-country, product, method, recurring-authority, settlement, compliance, or integration requirements before comparing price.",
    directAnswer:
      "Choose a subscription gateway by applying hard gates in order: seller country and entity eligibility, product/business-model acceptance, customer payment methods, recurring authority and billing ownership, settlement and currencies, tax/compliance responsibility, lifecycle capabilities, and the exact ArraySubs integration. Compare fees only among options that pass every required gate.",
    publishedAt: "2026-06-12",
    updatedAt: "2026-07-18",
    lastVerifiedAt: "2026-07-22",
    readTime: "21 min read",
    format: "Decision framework",
    author: "Emran",
    reviewer: "ArraySubs Product Team",
    keywords: [
      "choose subscription gateway by country",
      "WooCommerce recurring payment gateway business model",
      "subscription payment gateway eligibility",
      "Stripe PayPal Paddle country comparison",
    ],
    cover: {
      label: "Apply hard gates before comparing fees",
      image:
        "/blogs/choosing-a-subscription-gateway-by-country-and-business-model/featured-image.png",
      tone: "primary",
    },
  },
  {
    id: "A069",
    slug: "multi-gateway-resilience-for-subscription-stores",
    categorySlug: "payments-and-compliance",
    title: "Multi-Gateway Resilience for Subscription Stores",
    seoTitle: "Multi-Gateway Resilience for Subscription Stores",
    metaDescription:
      "Design multi-gateway resilience for WooCommerce subscriptions without assuming token portability or automatic renewal failover. Includes metrics, failure domains, and an incident runbook.",
    excerpt:
      "Use gateway diversity for checkout continuity and bounded migration while protecting each subscription's non-portable payment authority and renewal history.",
    directAnswer:
      "Multi-gateway resilience gives a subscription store alternative checkout and migration paths, but it does not provide automatic failover for existing renewals. Tokens, mandates, agreements, remote billing schedules, and customer authorization are gateway-specific. Design resilience around failure-domain isolation, observability, reconciliation, customer-safe recovery, and tested cohort migration.",
    publishedAt: "2026-02-17",
    updatedAt: "2026-05-29",
    lastVerifiedAt: "2026-07-22",
    readTime: "21 min read",
    format: "Architecture guide",
    author: "Emran",
    reviewer: "ArraySubs Product Team",
    keywords: [
      "multi-gateway resilience subscription store",
      "subscription payment gateway failover",
      "WooCommerce recurring payment resilience",
      "multi processor subscription architecture",
    ],
    cover: {
      label: "Isolate gateway failures without false failover",
      image:
        "/blogs/multi-gateway-resilience-for-subscription-stores/featured-image.png",
      tone: "dark",
    },
  },
  {
    id: "A070",
    slug: "how-to-reduce-woocommerce-subscription-churn",
    categorySlug: "retention-and-churn",
    title: "How to Reduce WooCommerce Subscription Churn",
    seoTitle: "How to Reduce WooCommerce Subscription Churn",
    metaDescription:
      "A measurement-first WooCommerce subscription churn guide covering voluntary and involuntary churn, cohorts, failed-payment recovery, cancellation flows, offers, and a 90-day plan.",
    excerpt:
      "Define the churn metric, diagnose the affected cohort, fix root causes, recover failed payments, and measure durable paid-renewal outcomes.",
    directAnswer:
      "Reduce WooCommerce subscription churn with the sequence define, diagnose, prevent, save, recover, win back, and measure incrementality. Separate voluntary cancellation from terminal failed-payment loss, segment by cohort and lifecycle moment, fix product and billing causes before incentives, and treat an offer as successful only when later paid renewals and margin improve at acceptable customer cost.",
    publishedAt: "2026-01-09",
    updatedAt: "2026-07-14",
    lastVerifiedAt: "2026-07-22",
    readTime: "23 min read",
    format: "Operating guide",
    author: "Emran",
    reviewer: "ArraySubs Product Team",
    keywords: [
      "how to reduce WooCommerce subscription churn",
      "subscription retention WooCommerce",
      "voluntary involuntary churn",
      "subscription save offers",
    ],
    cover: {
      label: "Diagnose and repair the churn system",
      image:
        "/blogs/how-to-reduce-woocommerce-subscription-churn/featured-image.png",
      tone: "highlight",
    },
  },
  {
    id: "A071",
    slug: "voluntary-vs-involuntary-churn",
    categorySlug: "retention-and-churn",
    title: "Voluntary vs Involuntary Churn",
    seoTitle: "Voluntary vs Involuntary Churn: A Practical Guide",
    metaDescription:
      "Separate voluntary cancellation from terminal failed-payment churn with clear definitions, evidence, formulas, ownership, and WooCommerce operating playbooks.",
    excerpt:
      "Classify completed churn by first trigger and terminal outcome, keep unresolved payment failures open, and route each cause to the right owner.",
    directAnswer:
      "Voluntary churn is a completed loss whose first material trigger is an explicit customer decision. Involuntary churn is a completed loss after an unintended renewal-payment failure does not recover within the defined retry, grace, and observation policy. Keep merchant-policy, technical, unresolved, and unknown journeys separate instead of inferring cause from status.",
    publishedAt: "2026-04-23",
    updatedAt: "2026-06-11",
    lastVerifiedAt: "2026-07-22",
    readTime: "22 min read",
    format: "Measurement guide",
    author: "Emran",
    reviewer: "ArraySubs Product Team",
    keywords: [
      "voluntary vs involuntary churn",
      "subscription payment failure churn",
      "customer cancellation churn",
      "WooCommerce churn classification",
    ],
    cover: {
      label: "Classify the trigger and completed outcome",
      image: "/blogs/voluntary-vs-involuntary-churn/featured-image.png",
      tone: "primary",
    },
  },
  {
    id: "A072",
    slug: "why-customers-cancel-subscriptions-a-reason-taxonomy",
    categorySlug: "retention-and-churn",
    title: "Why Customers Cancel Subscriptions: A Reason Taxonomy",
    seoTitle: "Why Customers Cancel Subscriptions: Reason Taxonomy",
    metaDescription:
      "Build a useful subscription cancellation-reason taxonomy across price, value, usage, experience, technical, and life-event causes without confusing stated answers with root cause.",
    excerpt:
      "Preserve raw answers, stable reason codes, and evidence-based root-cause hypotheses as separate layers in a versioned cancellation taxonomy.",
    directAnswer:
      "Customers commonly cancel for price or affordability, value or plan fit, usage or timing, experience or service, technical reliability, and external life changes. Treat those as a starting codebook rather than a universal ranking. Preserve the customer's raw answer, map it to a stable versioned code, and require supporting evidence before calling it the root cause.",
    publishedAt: "2026-03-08",
    updatedAt: "2026-07-09",
    lastVerifiedAt: "2026-07-22",
    readTime: "22 min read",
    format: "Taxonomy guide",
    author: "Emran",
    reviewer: "ArraySubs Product Team",
    keywords: [
      "why customers cancel subscriptions",
      "subscription cancellation reason taxonomy",
      "cancellation reason codes",
      "subscription churn root cause",
    ],
    cover: {
      label: "Separate answers, codes, and root-cause evidence",
      image:
        "/blogs/why-customers-cancel-subscriptions-a-reason-taxonomy/featured-image.png",
      tone: "dark",
    },
  },
  {
    id: "A073",
    slug: "anatomy-of-an-effective-subscription-cancellation-flow",
    categorySlug: "retention-and-churn",
    title: "Anatomy of an Effective Subscription Cancellation Flow",
    seoTitle: "Anatomy of an Effective Subscription Cancellation Flow",
    metaDescription:
      "Design a clear subscription cancellation flow with visible actions, plain consequences, one neutral reason, relevant alternatives, confirmed outcomes, accessibility, and reliable measurement.",
    excerpt:
      "Make cancellation findable, explain consequences, ask once, offer only relevant alternatives, preserve a direct exit, and prove the final state.",
    directAnswer:
      "An effective subscription cancellation flow is easy to find, explains immediate or end-of-period consequences, asks only one necessary neutral reason, offers at most a few relevant eligible alternatives, keeps a direct cancellation control visible, prevents duplicate submission, and confirms the committed status, date, billing, access, and fulfillment result.",
    publishedAt: "2026-05-02",
    updatedAt: "2026-07-16",
    lastVerifiedAt: "2026-07-22",
    readTime: "22 min read",
    format: "UX and operations guide",
    author: "Emran",
    reviewer: "ArraySubs Product Team",
    keywords: [
      "subscription cancellation flow",
      "WooCommerce cancellation UX",
      "ethical cancellation design",
      "subscription retention flow",
    ],
    cover: {
      label: "Keep the exit clear and the outcome provable",
      image:
        "/blogs/anatomy-of-an-effective-subscription-cancellation-flow/featured-image.png",
      tone: "primary",
    },
  },
  {
    id: "A074",
    slug: "subscription-save-offers-compared-discount-pause-skip-or-downgrade",
    categorySlug: "retention-and-churn",
    title:
      "Subscription Save Offers Compared: Discount, Pause, Skip, or Downgrade",
    seoTitle: "Subscription Save Offers: Discount, Pause, Skip, Downgrade",
    metaDescription:
      "Compare subscription discount, pause, skip, and downgrade offers by customer problem, eligibility, lifecycle impact, margin, gateway support, and durable renewal outcomes.",
    excerpt:
      "Match price pressure, temporary timing, one unwanted cycle, and lasting plan mismatch to the smallest honest system-supported intervention.",
    directAnswer:
      "Use a short discount for temporary affordability when margin permits, pause for a temporary interruption, skip for exactly one unwanted cycle, and downgrade for a lasting plan or price mismatch. If the system cannot honor the terms or the option does not solve the problem, preserve an easy cancellation. Judge success by later paid renewals and contribution margin, not acceptance.",
    publishedAt: "2026-01-26",
    updatedAt: "2026-06-30",
    lastVerifiedAt: "2026-07-22",
    readTime: "22 min read",
    format: "Comparison guide",
    author: "Emran",
    reviewer: "ArraySubs Product Team",
    keywords: [
      "subscription save offers",
      "subscription discount pause skip downgrade",
      "cancellation retention offers",
      "WooCommerce subscription pause downgrade",
    ],
    cover: {
      label: "Match each offer to the problem it can solve",
      image:
        "/blogs/subscription-save-offers-compared-discount-pause-skip-or-downgrade/featured-image.png",
      tone: "highlight",
    },
  },
  {
    id: "A075",
    slug: "cancellation-survey-questions-that-produce-useful-data",
    categorySlug: "retention-and-churn",
    title: "Cancellation Survey Questions That Produce Useful Data",
    seoTitle: "Cancellation Survey Questions That Produce Useful Data",
    metaDescription:
      "Use neutral cancellation survey questions, stable reason codes, optional detail, privacy controls, quality metrics, and evidence review to produce actionable subscription data.",
    excerpt:
      "Ask one neutral primary reason, preserve optional detail safely, version the codebook, audit survey quality, and keep analysis separate from customer evidence.",
    directAnswer:
      "Ask one neutral primary question with short options for price, value, usage, service, technical reliability, external change, Other, and Prefer not to say. Keep detail optional, store stable keys separately from labels, version every change, restrict raw text, deduplicate cancellation journeys, and report missing, Other, uncodable, duplicate, and version effects.",
    publishedAt: "2026-06-07",
    updatedAt: "2026-07-20",
    lastVerifiedAt: "2026-07-22",
    readTime: "22 min read",
    format: "Survey design guide",
    author: "Emran",
    reviewer: "ArraySubs Product Team",
    keywords: [
      "cancellation survey questions",
      "subscription cancellation questionnaire",
      "cancellation reason survey",
      "subscription churn feedback",
    ],
    cover: {
      label: "Ask less and preserve better evidence",
      image:
        "/blogs/cancellation-survey-questions-that-produce-useful-data/featured-image.png",
      tone: "dark",
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
  return `/${article.categorySlug}/${article.slug}/`;
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
