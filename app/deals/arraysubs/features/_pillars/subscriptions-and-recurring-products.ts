import { Repeat } from "lucide-react";
import type { FeaturePillar } from "./types";

export const subscriptionsAndRecurringProducts: FeaturePillar = {
  slug: "subscriptions-and-recurring-products",
  icon: Repeat,
  name: "Subscription Products",
  cardDescription:
    "Turn any WooCommerce product into a recurring plan — simple or variable, with trials, signup fees, intro pricing, lifetime deals, and plan switching.",
  tier: "Free + Pro",
  seoTitle: "WooCommerce Subscription Products & Recurring Billing",
  metaDescription:
    "Create WooCommerce subscription products free: simple or variable plans, daily-to-yearly billing cycles, free trials, signup fees, intro pricing, lifetime deals, and plan switching with 3 proration methods.",
  h1: "Turn any WooCommerce product into a subscription",
  heroSubtitle:
    "ArraySubs adds recurring billing to native WooCommerce products — simple or variable, digital or physical — with trials, signup fees, introductory pricing, lifetime deals, and customer plan switching built in from the free core.",
  heroHighlights: [
    "Simple & variable plans",
    "Trials, fees & intro pricing",
    "Plan switching with proration",
  ],
  directAnswer:
    "ArraySubs turns standard WooCommerce products into subscription products with recurring billing. The free plugin supports simple and variable subscriptions, daily to yearly billing cycles, free trials, one-time signup fees, a different renewal price after checkout, lifetime deals, and upgrade/downgrade plan switching with three proration methods. Pro adds fixed-date subscriptions, customer-chosen duration, recurring shipping, and per-plan feature entitlements.",
  intro:
    "A subscription product in ArraySubs is a normal WooCommerce product with recurring terms attached, so your catalog, cart, taxes, and coupons keep working exactly as WooCommerce intends. ==Sell anything on a recurring basis== — choose the billing period, add a trial or signup fee, set a different renewal price, and let customers ==upgrade or downgrade with automatic proration==. The product engine ships in the ==free core==, with Pro layering on fixed-date periods, customer-chosen duration, and per-plan entitlements.",
  stats: [
    { value: "2", label: "Product modes — simple & variable" },
    { value: "5", label: "Billing period types" },
    { value: "3", label: "Proration methods" },
    { value: "365", label: "Max billing cycles — or unlimited" },
  ],
  capabilities: [
    {
      title: "Simple & variable subscriptions",
      description:
        "Sell one recurring price, or offer variations — monthly vs yearly, tiers, sizes — each with its own price, cycle, and trial.",
      tier: "Free",
    },
    {
      title: "Flexible billing cycles",
      description:
        "Bill daily, weekly, monthly, or yearly with custom intervals, set a fixed number of cycles, or run until cancelled.",
      tier: "Free",
    },
    {
      title: "Free trials & signup fees",
      description:
        "Start with a trial before the first charge, add a one-time setup fee at checkout, or combine both on the same plan.",
      tier: "Free",
    },
    {
      title: "Introductory pricing",
      description:
        "Charge one price at checkout and a different renewal price after the cycles you choose — no coupon gymnastics.",
      tier: "Free",
    },
    {
      title: "Lifetime deals",
      description:
        "Sell one-payment lifetime access that still counts as a subscription for member access rules — with zero renewal invoices.",
      tier: "Free",
    },
    {
      title: "Plan switching with proration",
      description:
        "Let customers upgrade, downgrade, or crossgrade between eligible plans with charge-now, at-renewal, or no-adjustment proration.",
      tier: "Free",
    },
    {
      title: "Fixed-date subscriptions",
      description:
        "Run cohorts, seasons, and annual memberships that end or renew on a calendar date, with enrollment windows.",
      tier: "Pro",
    },
    {
      title: "Customer-chosen duration",
      description:
        "Let buyers pick how many cycles — and optionally which billing period — their subscription runs, within limits you set.",
      tier: "Pro",
    },
    {
      title: "Purchase guardrails",
      description:
        "Enforce one subscription per product or per customer, control mixed carts, and auto-migrate customers to a new plan.",
      tier: "Free",
    },
  ],
  sections: [
    {
      id: "how-it-works",
      question: "How do subscription products work in WooCommerce?",
      paragraphs: [
        "WooCommerce has no native subscription product type — a plugin has to add recurring terms and a renewal engine. ArraySubs does it the WooCommerce-native way: you create a normal product, tick ==Subscription== in the product editor, and set the recurring price, billing period, and optional trial, signup fee, and renewal price. Checkout creates a subscription record linked to the order, and the renewal engine bills against it on schedule.",
        "Because the product stays a real WooCommerce product, everything downstream keeps working: stock, taxes, coupons, shipping zones, and the 500+ payment gateways WooCommerce supports for checkout. There is no parallel catalog to maintain and nothing to sync — the subscription terms live on the product, and the ==subscription record is the source of truth== for renewals, access, and customer self-service.",
      ],
    },
    {
      id: "simple-vs-variable",
      question: "What is the difference between simple and variable subscription products?",
      paragraphs: [
        "A ==simple subscription== has one recurring offer: one price, one billing period, one trial policy. Use it when the decision you want from the buyer is just yes or no — a single membership, one software plan, one box.",
        "A ==variable subscription== is one product with multiple variations, and every variation carries its own subscription terms. Monthly vs yearly billing, Starter vs Pro vs Agency tiers, small vs large box — each variation can have a different price, period, trial, signup fee, and renewal price. Variable products keep plan families on one page, which is better for comparison shopping and for SEO than scattering near-identical products across the catalog.",
      ],
      bullets: [
        "Simple: one recurring price — fastest to set up and clearest to buy",
        "Variable: one product, many plans — each variation has independent billing terms",
        "Both types support trials, signup fees, intro pricing, and plan switching",
      ],
    },
    {
      id: "billing-cycles",
      question: "Which billing cycles, trials, and fees can I configure?",
      paragraphs: [
        "Billing periods run from ==daily to yearly with custom intervals== — every week, every 3 months, every 2 years — and each plan can either renew until cancelled or stop automatically after a set number of cycles. That covers everything from a weekly meal box to a 12-payment annual contract.",
        "On top of the cycle you can layer three pricing levers. A ==free trial== delays the first charge while the subscription starts immediately. A ==one-time signup fee== collects setup or onboarding revenue at checkout without inflating the renewal price. And a ==different renewal price== lets you sell an introductory rate that steps up (or down) to the standing price after the cycles you choose — the cleanest way to run launch offers without coupons.",
      ],
    },
    {
      id: "customer-chosen-duration",
      question: "Can customers choose their own subscription length?",
      paragraphs: [
        "Yes — with Pro, each product has a ==Subscription Type== switch. In ==Flexible Length== mode, buyers pick how many billing cycles they want, up to a maximum you set. In ==Full Flexible== mode they also pick the billing period itself from a list you approve — weekly, monthly, yearly — and the product page shows a live summary of the terms they built.",
        "Every choice is re-validated on the server, carried through cart and checkout, and written into the subscription record, so renewals and automatic expiry follow exactly what the customer selected. It is prepaid flexibility with guardrails: the customer feels in control while your billing stays predictable.",
      ],
    },
    {
      id: "fixed-date",
      question: "Can I sell fixed-date, seasonal, or cohort subscriptions?",
      paragraphs: [
        "Fixed-Date Subscriptions (Pro) end on a ==calendar date instead of a relative length== — perfect for annual memberships that run January to December, sports seasons, school cohorts, and licensing windows. Enrollment windows control when customers can join, and you decide whether the subscription expires at the cutoff or rolls into the next period.",
        "Combined with Flexible Renewal Sync, late joiners can be charged a prorated amount, the full amount, or the full amount covering the next cycle — so mid-season signups stop being a manual bookkeeping problem.",
      ],
    },
    {
      id: "plan-switching",
      question: "How does plan switching and proration work?",
      paragraphs: [
        "Customers outgrow plans, and forcing cancel-and-repurchase is how stores lose them. ArraySubs supports ==upgrades, downgrades, and crossgrades== between eligible products and variations — self-service from the customer portal or staff-assisted from wp-admin — while the subscription record, history, and notes stay continuous.",
        "Money movement follows one of ==three proration methods== you choose per switch policy: charge or credit the difference immediately, settle at the next renewal, or switch with no adjustment. Renewal dates stay aligned with the method, so the invoice a customer sees always matches the plan they are on.",
      ],
    },
    {
      id: "purchase-rules",
      question: "Can I control which subscriptions can be bought together?",
      paragraphs: [
        "Conditional Subscription Rules give the store guardrails at the cart level. Limit customers to ==one active subscription per product== (no accidental duplicates) or ==one subscription per customer== for single-relationship business models — with optional auto-migration that replaces the old plan when a customer checks out with a new one.",
        "You also decide whether subscriptions can share a cart with one-time products, and whether plans with different billing cycles can be purchased in a single checkout. One-click checkout URLs round it out: link a buyer from any sales page or email straight into checkout with the right plan already in the cart.",
      ],
    },
  ],
  steps: [
    {
      title: "Install ArraySubs free",
      description:
        "Install the free core from WordPress.org on any WooCommerce store — no license key or card required.",
    },
    {
      title: "Create a product and tick Subscription",
      description:
        "Add a simple or variable product and enable subscription terms in the product editor.",
    },
    {
      title: "Set the recurring terms",
      description:
        "Choose the billing period and length, then add a trial, signup fee, or renewal price if the offer needs one.",
    },
    {
      title: "Publish and share checkout",
      description:
        "Publish the plan, test it with a one-click checkout URL, and watch the subscription record appear on the first order.",
    },
  ],
  planSplit: {
    free: [
      "Simple and variable subscription products",
      "Daily to yearly billing with custom intervals and lengths",
      "Free trials, signup fees, and a different renewal price",
      "Lifetime deals with no renewal invoices",
      "Plan switching with 3 proration methods",
      "Coupons with recurring discounts and cycle limits",
      "Purchase guardrails and one-click checkout URLs",
    ],
    pro: [
      "Fixed-date subscriptions with enrollment windows",
      "Customer-chosen subscription length and billing period",
      "Recurring shipping charges on physical subscriptions",
      "Per-plan feature entitlements with a product-page “What's included” box",
      "Redirect or 404 direct product URLs to a sales page",
      "Hide billing-cycle and duration details in cart, checkout, and emails",
      "Installment / split payments (coming soon)",
    ],
  },
  moduleSlugs: [
    "subscription-products",
    "free-trials",
    "signup-fees",
    "different-renewal-price",
    "lifetime-deals",
    "fixed-date-subscriptions",
    "customer-chosen-subscription-duration",
    "plan-switching",
    "coupons",
  ],
  articleSlugs: [
    "how-to-add-subscriptions-to-woocommerce",
    "woocommerce-subscription-product-types",
    "simple-vs-variable-woocommerce-subscriptions-which-product-type-fits",
  ],
  useCaseSlugs: ["saas-digital-products", "subscription-boxes", "membership-sites"],
  relatedPillars: [
    "billing-renewals-and-refunds",
    "payment-gateways",
    "feature-manager",
  ],
  faq: [
    {
      question: "Can I turn an existing WooCommerce product into a subscription?",
      answer:
        "Yes. Open the product, enable subscription terms, and set the billing period and price. The product keeps its URL, reviews, and catalog placement — ArraySubs adds recurring behavior on top of the native WooCommerce product.",
    },
    {
      question: "What is the difference between a simple and a variable subscription?",
      answer:
        "A simple subscription sells one recurring price. A variable subscription offers multiple variations — like monthly vs yearly or tiered plans — and each variation carries its own price, billing cycle, trial, and signup fee.",
    },
    {
      question: "Can I offer a free trial and a signup fee on the same product?",
      answer:
        "Yes. The trial delays the first recurring charge while the signup fee is still collected at checkout — a common pattern for service businesses that need onboarding revenue before billing starts.",
    },
    {
      question: "Can the renewal price be different from the first payment?",
      answer:
        "Yes. The Different Renewal Price feature charges one amount at checkout and switches to the configured renewal amount after the number of cycles you choose — ideal for introductory offers without coupon codes.",
    },
    {
      question: "Do WooCommerce coupons work on subscription renewals?",
      answer:
        "Yes. ArraySubs extends WooCommerce coupons with subscription awareness: a coupon can apply once at checkout or recur across renewals, with a cycle limit that stops the discount after the renewals you allow.",
    },
    {
      question: "Can customers pick how long their subscription runs?",
      answer:
        "With ArraySubs Pro, yes. Flexible Length mode lets buyers choose the number of billing cycles up to your maximum; Full Flexible mode also lets them choose the billing period from a list you approve. Every choice is validated server-side.",
    },
    {
      question: "Is the subscription product engine really free?",
      answer:
        "Yes. Simple and variable products, trials, signup fees, intro pricing, lifetime deals, coupons, purchase guardrails, and plan switching with proration all ship in the free core. Pro adds fixed-date subscriptions, customer-chosen duration, recurring shipping, and per-plan entitlements.",
    },
  ],
};
