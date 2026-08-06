import { Blocks } from "lucide-react";
import type { FeaturePillar } from "./types";

export const featureManager: FeaturePillar = {
  slug: "feature-manager",
  icon: Blocks,
  name: "Feature Manager",
  cardDescription:
    "Define named entitlements once and attach per-plan values — shown in a What's included box on the product page, on My Features, and enforced by access rules.",
  tier: "Pro",
  seoTitle: "WooCommerce Subscription Plan Features & Entitlements",
  metaDescription:
    "WooCommerce subscription plan features and entitlements in ArraySubs Pro — define once, set per-plan values, show What's included, and gate access by feature.",
  h1: "Define the features and entitlements behind every subscription plan",
  heroSubtitle:
    "ArraySubs Pro adds an entitlement layer to WooCommerce subscriptions: define a feature once, attach a value to every plan or variation, show buyers a What's included comparison on the product page, and let access rules and the customer's My Features page follow the plan automatically.",
  heroHighlights: [
    "Per-plan feature values",
    "What's included on product pages",
    "Feature-based access rules",
  ],
  directAnswer:
    "Feature Manager is the ArraySubs Pro module for subscription plan entitlements in WooCommerce. You define a named feature once — Projects, Seats, Priority support — and attach a value to each plan or variation; the definitions power a What's included box on the product page, a My Features page in My Account, and feature-based access conditions in the rule engine. The free ArraySubs core supplies the subscription products, variable plan tiers, and member access rules that Feature Manager layers entitlements onto.",
  intro:
    "Most stores hardcode their tiers: access rules that name specific products, plan differences that exist only in a pricing-table graphic. Feature Manager replaces that with ==named entitlements== — define Projects, Seats, or Priority support once, then attach a value per plan or variation: 3, 10, Unlimited. The same definitions drive a ==What's included box on the product page==, an aggregated My Features page in the customer's account, and access rules that gate by entitlement instead of by product. Change what a plan includes and ==every surface follows==.",
  stats: [
    { value: "1", label: "Feature definition reused across plans" },
    { value: "3", label: "Surfaces — product page, My Features, access rules" },
    { value: "0", label: "Hardcoded tier rules needed" },
    { value: "Per-plan", label: "Values on products and variations" },
  ],
  capabilities: [
    {
      title: "Named feature definitions",
      description:
        "Define an entitlement once — Projects, Seats, Priority support — and reuse it across every plan instead of re-describing tiers per product.",
      tier: "Pro",
    },
    {
      title: "Per-plan values",
      description:
        "Attach a value to each subscription product or variation — 3 / 10 / Unlimited, no / yes — so tiers differ by value, not by structure.",
      tier: "Pro",
    },
    {
      title: "“What's included” product box",
      description:
        "Show each plan's entitlements on the product page, so plan comparison happens where the buying decision happens.",
      tier: "Pro",
    },
    {
      title: "My Features page",
      description:
        "Give customers an aggregated My Account view of every entitlement they currently hold across their subscriptions.",
      tier: "Pro",
    },
    {
      title: "Feature-based access conditions",
      description:
        "Gate content, products, and downloads by entitlement instead of by product — change a plan's features and access follows.",
      tier: "Pro",
    },
    {
      title: "Feature Log",
      description:
        "See feature and entitlement changes for a subscription recorded on its admin detail screen.",
      tier: "Pro",
    },
    {
      title: "Entitlements follow plan switching",
      description:
        "Upgrades and downgrades change what a customer holds automatically, because entitlements attach to the plan they moved to.",
      tier: "Pro",
    },
    {
      title: "Variable plan tiers",
      description:
        "Build the tier structure itself with variable subscriptions — each variation with its own price, cycle, and trial.",
      tier: "Free",
    },
    {
      title: "Member access rule engine",
      description:
        "Gate pages, posts, downloads, and products by subscription, plan, or role — the engine feature conditions plug into.",
      tier: "Free",
    },
  ],
  sections: [
    {
      id: "what-are-entitlements",
      question: "What are subscription plan features and entitlements?",
      paragraphs: [
        "Subscription plan features — entitlements — are the named things a plan includes: how many projects, how many seats, whether priority support is in. Each entitlement has a name and a per-plan value, so ==Starter can carry 3 where Agency carries Unlimited== without becoming a different feature.",
        "The useful contrast is with WordPress roles: roles say who a customer is, entitlements say ==what their plan includes==. In ArraySubs, Feature Manager is the Pro module that stores these definitions and attaches values per subscription plan, so tier limits stop being hardcoded into content rules and pricing graphics.",
      ],
    },
    {
      id: "define-per-plan",
      question: "How do I define what each plan includes?",
      paragraphs: [
        "Define the feature once, then attach a value per plan. Feature Manager holds the definition — Projects, Storage, Priority support — and every subscription product or variation carries its own value: 3, 10, Unlimited, yes, no. ==One definition, per-plan values==, nothing duplicated.",
        "Because values live on products and variations, the tiers you already sell are the entitlement matrix. A variable subscription with Starter, Pro, and Agency variations needs no parallel structure — open each variation, set its values, and the plan is fully described.",
      ],
    },
    {
      id: "product-page-display",
      question: "Can I show plan features on the product page?",
      paragraphs: [
        "Yes — Feature Manager renders a ==“What's included” feature box on the product page== listing each plan's entitlements. Buyers compare tiers where the buying decision actually happens, not on a separate pricing page that drifts out of date.",
        "The box reads from the same definitions that drive access rules and My Features, so what the product page promises is exactly what the plan delivers. Update a value once and the storefront comparison ==updates with it==.",
      ],
    },
    {
      id: "gate-by-feature",
      question: "Can I restrict content by plan feature instead of by product?",
      paragraphs: [
        "Yes. With Feature Manager active, the member-access rule engine gains a Pro condition type that gates content, products, and downloads ==by feature entitlement== — “has Priority support”, not “bought product #142”.",
        "That is the difference between rules that scale and rules that rot. Product-based conditions need editing every time plans change; feature-based conditions never name a plan, so ==change a plan's features and access follows automatically==. Ten plans behind one rule stays one rule.",
      ],
    },
    {
      id: "customer-view",
      question: "How do customers see what their plan includes?",
      paragraphs: [
        "The My Features page in the customer's My Account shows ==every entitlement they currently hold==, aggregated across all of their subscriptions. A customer with two plans sees one combined view, not two lists to reconcile.",
        "Self-service visibility retires a whole class of ticket — “does my plan include X?” — and the admin side has its mirror: a ==Feature Log== on the subscription detail records entitlement changes for that subscription, so staff can see what changed and when.",
      ],
    },
    {
      id: "saas-tiers",
      question: "How do I model SaaS-style tiers in WooCommerce?",
      paragraphs: [
        "Create a variable subscription for the plan family, give each variation its own price and billing cycle, and attach entitlement values per variation — that is ==Starter / Pro / Agency in native WooCommerce==. The free core supplies the products, the tiers, and plan switching; Feature Manager supplies the entitlement layer.",
        "Upgrades and downgrades stay clean because entitlements follow the plan: switch a customer's variation and their feature values move with the subscription. My Features shows the new allowances, and feature-gated access ==re-evaluates automatically== — no scripts, no role juggling.",
      ],
      bullets: [
        "Variable subscription: one product, one variation per tier, each with its own price and cycle (free core)",
        "Feature Manager: per-variation entitlement values like Projects 3 / 10 / Unlimited (Pro)",
        "Feature-based conditions: gate content and downloads by entitlement, not product (Pro)",
        "Plan switching: upgrades and downgrades carry entitlements with the plan",
      ],
    },
  ],
  steps: [
    {
      title: "Activate Feature Manager in Pro",
      description:
        "Install the free ArraySubs core, activate Pro, and enable the Feature Manager module.",
    },
    {
      title: "Define your named features",
      description:
        "Create the entitlements your plans differ on — Projects, Seats, Priority support — one definition each.",
    },
    {
      title: "Attach values per plan",
      description:
        "Open each subscription product or variation and set its value for every feature: 3, 10, Unlimited, yes, or no.",
    },
    {
      title: "Switch on the surfaces",
      description:
        "Show the What's included box on product pages, point customers to My Features, and add feature-based conditions to your access rules.",
    },
  ],
  planSplit: {
    free: [
      "Simple and variable subscription products — the plans entitlements attach to",
      "Variable tiers with per-variation price, cycle, and trial",
      "Member access rules by subscription, plan, product, or role",
      "Plan switching with upgrades, downgrades, and 3 proration methods",
      "Customer portal in WooCommerce My Account",
    ],
    pro: [
      "Feature Manager: named entitlements defined once",
      "Per-plan values on subscription products and variations",
      "“What's included” feature box on the product page",
      "My Features page aggregating entitlements across subscriptions",
      "Feature-based access conditions in the rule engine",
      "Feature Log of entitlement changes on the subscription detail",
    ],
  },
  moduleSlugs: [
    "feature-manager",
    "feature-based-conditions",
    "member-access",
    "subscription-products",
    "customer-portal",
  ],
  articleSlugs: [
    "wordpress-roles-vs-membership-levels-vs-feature-entitlements",
    "membership-level-strategy-free-paid-lifetime-and-tiered-access",
    "woocommerce-subscriptions-and-memberships-together-the-complete-architecture",
  ],
  useCaseSlugs: ["saas-digital-products", "b2b-wholesale-memberships", "membership-sites"],
  relatedPillars: [
    "member-access-control",
    "subscriptions-and-recurring-products",
    "customer-portal",
  ],
  faq: [
    {
      question: "What is entitlement management for WooCommerce subscriptions?",
      answer:
        "It means defining what each subscription plan includes — features, limits, allowances — as data instead of prose. In ArraySubs, Feature Manager stores named features with per-plan values and reuses them on the product page, in the customer portal, and in access rules.",
    },
    {
      question: "Is Feature Manager available in the free version?",
      answer:
        "No — Feature Manager is an ArraySubs Pro module. The free core provides the foundation it builds on: subscription products, variable plan tiers, member access rules, and plan switching.",
    },
    {
      question: "How is a feature entitlement different from a WordPress role?",
      answer:
        "A role says who the customer is; an entitlement says what their plan includes. Roles work for broad status like member vs non-member, while entitlements carry per-plan values such as Projects: 3 vs Unlimited that roles cannot express.",
    },
    {
      question: "Can I show a plan comparison on the product page?",
      answer:
        "Yes. The What's included feature box lists each plan's entitlements on the product page itself, so buyers compare tiers without leaving the purchase flow.",
    },
    {
      question: "What happens to entitlements when a customer switches plans?",
      answer:
        "They follow the plan. Entitlement values attach to products and variations, so an upgrade or downgrade changes what the customer holds automatically — My Features and feature-based access rules reflect the new plan.",
    },
    {
      question: "Can access rules check a feature instead of a product?",
      answer:
        "Yes. Feature-based conditions are a Pro condition type in the member-access rule engine: gate content, products, or downloads by an entitlement like Priority support, and the rule keeps working as plans change.",
    },
    {
      question: "Where do customers see the features their plan includes?",
      answer:
        "On the My Features page in WooCommerce My Account. It aggregates every entitlement the customer currently holds across their subscriptions into one view.",
    },
  ],
};
