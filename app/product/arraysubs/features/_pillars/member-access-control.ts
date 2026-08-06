import { ShieldCheck } from "lucide-react";
import type { FeaturePillar } from "./types";

export const memberAccessControl: FeaturePillar = {
  slug: "member-access-control",
  icon: ShieldCheck,
  name: "Member Access Control",
  cardDescription:
    "Gate pages, CPTs, URLs, downloads, and the shop with a free rule engine — 8 condition types in nested AND/OR groups, plus dripping, discounts, and role mapping.",
  tier: "Free + Pro",
  seoTitle: "WooCommerce Content Restriction & Member Access Control",
  metaDescription:
    "Restrict WooCommerce pages, CPTs, URLs, downloads, products, and the shop with 8 free condition types. Pro adds feature-entitlement access rules.",
  h1: "Restrict WooCommerce content and products by membership",
  heroSubtitle:
    "One free rule engine gates pages, custom post types, URLs, downloads, discounts, and the shop itself — with conditions that combine in nested AND/OR groups, so real membership tiers fit without duplicated rules.",
  heroHighlights: [
    "8 free condition types",
    "Nested AND/OR rule groups",
    "Shop, URL & download gating",
  ],
  directAnswer:
    "Member Access Control is ArraySubs' free WooCommerce content restriction engine. It gates pages, posts, custom post types, URLs, downloads, products, and the whole shop using eight condition types — from active subscription to lifetime spend and WordPress role — combined in nested AND/OR groups. Pro adds feature-entitlement rules and concurrent-login limits.",
  intro:
    "Most membership plugins charge for the rule engine; ArraySubs ships it in the ==free core==. Build rules from eight condition types — subscriptions, purchases, lifetime spend, WordPress roles — and combine them in ==nested AND/OR groups== that mirror how your tiers actually work. The same conditions drive every surface: page and CPT gating, URL rules, gated downloads, member discounts, shop restrictions, and role mapping. Pro adds a single condition on top — ==per-plan feature entitlements== — so access can follow exactly what each plan includes.",
  stats: [
    { value: "8", label: "Free condition types" },
    { value: "4", label: "URL match modes" },
    { value: "2", label: "Native builder integrations" },
    { value: "$0", label: "For the full rule engine" },
  ],
  capabilities: [
    {
      title: "Nested AND/OR condition builder",
      description:
        "Combine eight condition types — subscription state, purchases, lifetime spend, roles — in nested groups that model real membership tiers.",
      tier: "Free",
    },
    {
      title: "Page, post & CPT gating",
      description:
        "Gate pages, posts, any custom post type, and taxonomy terms, with redirect, message, login-prompt, or 404 behavior on denial.",
      tier: "Free",
    },
    {
      title: "URL rules with regex",
      description:
        "Protect any path with exact, prefix, contains, or regex matching — priorities and exclusions resolve overlapping rules.",
      tier: "Free",
    },
    {
      title: "Partial, in-page restriction",
      description:
        "Gate sections with shortcodes, native Elementor Container controls, or Gutenberg blocks while teasers keep the page public.",
      tier: "Free",
    },
    {
      title: "Content dripping",
      description:
        "Unlock content by days-since-join or a fixed date across posts, pages, CPTs, downloads, and partial sections.",
      tier: "Free",
    },
    {
      title: "Gated downloads",
      description:
        "Deliver member-only files through My Account → Downloads on verified links, with optional drip schedules.",
      tier: "Free",
    },
    {
      title: "Shop & purchase restrictions",
      description:
        "Restrict the shop, products, or categories — enforced across product pages, add-to-cart, cart, checkout, and the Store API.",
      tier: "Free",
    },
    {
      title: "Member discounts & role mapping",
      description:
        "Give members automatic pricing on products and categories, and assign or remove WordPress roles from subscription state.",
      tier: "Free",
    },
    {
      title: "Feature entitlement conditions",
      description:
        "Gate access by the per-plan features customers actually bought, straight from Feature Manager.",
      tier: "Pro",
    },
  ],
  sections: [
    {
      id: "how-restriction-works",
      question: "How does content restriction work in WooCommerce?",
      paragraphs: [
        "WooCommerce has no built-in content restriction, so a membership plugin has to supply the rule layer — in ArraySubs, that layer is free. You create an access rule, pick who qualifies with conditions like an active subscription or a purchased product, choose the surface it protects — pages, custom post types, URLs, downloads, discounts, or the shop — and decide what everyone else sees. ==The rule engine ships in the free core==, so gating is a configuration task, not a Pro upsell.",
        "Denial behavior is set per rule: redirect visitors to login or any page, show a message or teaser in place of the content, or return a 404 as if the content does not exist. A built-in ==conflict detection UI== flags rules that overlap or contradict each other, which keeps large rule sets debuggable as your membership grows.",
      ],
    },
    {
      id: "restriction-conditions",
      question: "What conditions can control who sees content?",
      paragraphs: [
        "Eight condition types ship free, covering subscription state, purchase history, spending, and WordPress roles. Every rule surface — content, URLs, downloads, discounts, shop — reads from the ==same shared condition builder==, so you learn the model once and reuse it everywhere.",
        "Conditions combine in nested AND/OR groups, which is what separates real membership logic from one-dimensional toggles. “Active subscription to Gold OR (purchased the annual course AND lifetime spend above your threshold)” is one readable rule, not three duplicated ones. ==Pro adds a ninth condition type== — feature entitlements from Feature Manager — so access can follow the exact features inside each plan.",
      ],
      bullets: [
        "Active subscription — the customer holds a live subscription to selected plans",
        "Subscription status — match specific lifecycle states, not just active",
        "Subscription variation — target one plan tier inside a variable product",
        "Purchased product / purchased variation — one-time purchase history counts too",
        "Purchased from product group — qualify customers by category-level buying",
        "Lifetime spend — unlock perks once a spend threshold is crossed",
        "WordPress user role — reuse roles from your LMS, forum, or staff setup",
        "Feature entitlement (Pro) — gate by per-plan features from Feature Manager",
      ],
    },
    {
      id: "restrict-products",
      question: "Can I hide products or the whole shop from non-members?",
      paragraphs: [
        "Yes — Ecommerce Rules restrict the entire shop, individual products, or whole categories to the members you define. Denied visitors can be redirected, shown a login prompt or message, or served a 404 — or you can keep a product ==visible but not purchasable==, the members-only catalog pattern that still markets the product to everyone.",
        "Enforcement is not cosmetic. Rules are checked on product pages, add-to-cart actions, the cart, checkout, and the WooCommerce Store API, so a direct URL or a block-theme cart call meets the ==same access check== as the shop page.",
      ],
    },
    {
      id: "partial-content",
      question: "Can I restrict just part of a page?",
      paragraphs: [
        "Yes — partial restriction gates sections inside a public page instead of the whole URL. Wrap any section in the restriction or visibility shortcodes and show a ==teaser to non-members==, so the intro, SEO copy, and upgrade pitch stay public while the premium part stays locked.",
        "Builder users skip shortcodes entirely: ArraySubs adds native restriction controls to the ==Elementor Container Advanced tab== (Flexbox or Grid) and ships Gutenberg block restriction, both reading the same conditions as every other rule. One page can mix public sections, member sections, and per-tier sections.",
      ],
    },
    {
      id: "content-dripping",
      question: "How does content dripping work for memberships?",
      paragraphs: [
        "Content dripping delays access until a member has been subscribed long enough — unlock content by ==days since joining== or on a fixed calendar date. New members start at lesson one instead of binge-downloading the whole library on day one.",
        "Drip schedules attach anywhere the rule engine reaches: posts, pages, custom post types, gated downloads, and partial in-page sections. And because ==dripping is free==, staged onboarding and cohort-style pacing do not require a Pro license.",
      ],
    },
    {
      id: "member-benefits",
      question: "Can members get automatic discounts and gated downloads?",
      paragraphs: [
        "Yes — the same rule engine that restricts content also grants benefits. Discount Rules apply ==member-only pricing== on products and categories automatically for qualifying customers — no coupon codes to distribute or police — while Download Rules deliver files through My Account → Downloads over verified links, with optional drip schedules.",
        "Role Mapping closes the loop with the rest of WordPress: assign or remove WordPress roles as subscription state changes, so role-aware plugins — LMS, forums, communities — follow membership automatically. ==Access, pricing, files, and roles== all answer to one set of conditions.",
      ],
    },
  ],
  steps: [
    {
      title: "Install ArraySubs free",
      description:
        "Install the free core from WordPress.org — the entire access rule engine is included without a license key.",
    },
    {
      title: "Create your first access rule",
      description:
        "Open Member Access, add a rule, and pick the surface to protect: content, CPTs, URLs, downloads, discounts, or the shop.",
    },
    {
      title: "Set the conditions",
      description:
        "Choose who qualifies — subscriptions, purchases, spend, or roles — and nest AND/OR groups if the tier needs them.",
    },
    {
      title: "Choose the denial behavior",
      description:
        "Pick what non-members see — redirect, login prompt, message, teaser, or 404 — then test the page logged out.",
    },
  ],
  planSplit: {
    free: [
      "Access rule engine with 8 condition types and nested AND/OR groups",
      "Page, post, custom post type, and taxonomy restriction",
      "URL rules with exact, prefix, contains, and regex matching",
      "Partial in-page restriction via shortcodes, Elementor, and Gutenberg",
      "Content dripping by days-since-join or fixed date",
      "Gated downloads, member discounts, and shop/purchase restrictions",
      "Role mapping and access-rule conflict detection",
    ],
    pro: [
      "Feature entitlement conditions from the Pro Feature Manager",
      "Numeric allowance checks with sum, max, or any-plan aggregation",
      "Feature checks inside shortcodes, Elementor Containers, and Gutenberg blocks",
      "Login Limit rules — concurrent-session limits with plan-level overrides",
    ],
  },
  moduleSlugs: [
    "member-access",
    "advanced-condition-builder",
    "cpt-content-restrictions",
    "url-path-rules",
    "partial-content-restriction",
    "content-dripping",
    "restricted-downloads",
    "shop-access-restrictions",
    "member-discounts",
  ],
  articleSlugs: [
    "woocommerce-content-restriction-strategy",
    "url-based-content-restriction-prefixes-wildcards-and-regex",
    "and-or-membership-access-rules-explained-with-examples",
  ],
  useCaseSlugs: ["membership-sites", "online-courses", "content-publishers"],
  relatedPillars: ["feature-manager", "customer-portal", "profile-builder"],
  faq: [
    {
      question: "Is the ArraySubs membership rule engine really free?",
      answer:
        "Yes. All eight condition types, nested AND/OR groups, and every rule surface — content, CPTs, URLs, downloads, discounts, shop, and role mapping — ship in the free core. Pro adds feature entitlement conditions and concurrent-login limits.",
    },
    {
      question: "Can I restrict content by WordPress user role?",
      answer:
        "Yes. WordPress user role is one of the eight free condition types, and Role Mapping works in the other direction too — assigning or removing roles based on subscription state so role-aware plugins stay in sync.",
    },
    {
      question: "Can customers see a members-only product without being able to buy it?",
      answer:
        "Yes. Ecommerce Rules can block purchasing while leaving the product visible, which keeps members-only products marketing themselves to non-members. Enforcement covers product pages, add-to-cart, cart, checkout, and the Store API.",
    },
    {
      question: "What do visitors see when content is restricted?",
      answer:
        "You choose per rule: redirect to login or any page, show a message or teaser, or return a 404 as if the content does not exist. Partial restriction can tease the locked section while the rest of the page stays public.",
    },
    {
      question: "Does content restriction work with Elementor and Gutenberg?",
      answer:
        "Yes, natively. Elementor Containers get an ArraySubs restriction section on the Advanced tab (Flexbox or Grid), and Gutenberg gets block-level restriction — no shortcode wrapping in either builder.",
    },
    {
      question: "Can I drip-feed course content to new members?",
      answer:
        "Yes. Content dripping unlocks posts, pages, CPTs, downloads, and partial sections by days-since-join or on a fixed date, and it is part of the free core.",
    },
    {
      question: "How do I restrict a URL or an entire path?",
      answer:
        "URL Rules match exact URLs, path prefixes, contains patterns, or regular expressions, with priorities and exclusions to resolve overlaps. They are the right tool when the protected area is not a single post or product — like pages generated by another plugin.",
    },
  ],
};
