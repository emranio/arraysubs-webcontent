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
