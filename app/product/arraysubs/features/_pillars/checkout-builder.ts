import { CreditCard } from "lucide-react";
import type { FeaturePillar } from "./types";

export const checkoutBuilder: FeaturePillar = {
  slug: "checkout-builder",
  icon: CreditCard,
  name: "Checkout Builder",
  cardDescription:
    "Design the classic WooCommerce checkout with drag and drop — 28 element types, multi-step flows, conditional fields, and captured data on every subscription.",
  tier: "Pro",
  seoTitle: "WooCommerce Checkout Builder for Subscriptions",
  metaDescription:
    "WooCommerce checkout builder for subscriptions — 28 drag-and-drop element types, multi-step flows, conditional fields in ArraySubs Pro; one-click URLs are free.",
  h1: "Build a custom WooCommerce checkout for subscriptions",
  heroSubtitle:
    "ArraySubs Pro replaces the fixed classic WooCommerce checkout with a drag-and-drop builder — 28 element types, multi-step flows with a progress indicator, conditional visibility, and styling controls — while the free core contributes one-click checkout URLs, purchase guardrails, and 500+ payment gateways.",
  heroHighlights: [
    "28 drag-and-drop elements",
    "Multi-step with progress bar",
    "Conditional field visibility",
  ],
  directAnswer:
    "Checkout Builder is the ArraySubs Pro drag-and-drop editor for the classic WooCommerce checkout page. It provides 28 element types across standard fields, advanced inputs, and layout blocks, plus multi-step checkout, conditional field visibility, and styling controls — and every captured field is stored on the order, the subscription, and its renewals. The free ArraySubs core adds one-click checkout URLs that skip the cart, purchase guardrails, and checkout through 500+ WooCommerce gateways.",
  intro:
    "The stock WooCommerce checkout asks every buyer the same questions in the same order, no matter what they are subscribing to. Checkout Builder replaces it with a ==drag-and-drop visual editor==: choose from 28 element types, arrange them into ==single or multi-step flows==, and show or hide fields based on what the customer enters. Whatever a field captures lands on the order, the subscription, and its renewal records, so the answers stay useful long after the sale. The builder is Pro; the ==free core== surrounds it with one-click checkout URLs, purchase guardrails, and 500+ payment gateways.",
  stats: [
    { value: "28", label: "Drag-and-drop element types" },
    { value: "3", label: "Element palettes" },
    { value: "9", label: "Standard field types" },
    { value: "1", label: "Click from link to checkout" },
  ],
  capabilities: [
    {
      title: "Drag-and-drop checkout editor",
      description:
        "Redesign the classic WooCommerce checkout visually — drag elements into place, reorder them, and publish without touching a template.",
      tier: "Pro",
    },
    {
      title: "28 element types in 3 palettes",
      description:
        "Standard fields, advanced inputs, and layout & commerce blocks — from text and email to file upload, calendars, and product tables.",
      tier: "Pro",
    },
    {
      title: "Multi-step checkout",
      description:
        "Split checkout into named steps with previous/next navigation and a progress indicator that shows customers where they are.",
      tier: "Pro",
    },
    {
      title: "Conditional field visibility",
      description:
        "Show or hide fields based on customer input, so every buyer sees only the questions that apply to them.",
      tier: "Pro",
    },
    {
      title: "Styling & design controls",
      description:
        "Adjust the checkout's look from a dedicated design controls panel so the page matches the rest of your store.",
      tier: "Pro",
    },
    {
      title: "Field data on subscription records",
      description:
        "Captured answers flow to the order, the subscription, and renewal records, and appear on a checkout-fields card in the admin subscription detail.",
      tier: "Pro",
    },
    {
      title: "One-click checkout URLs",
      description:
        "Link from any ad, email, or sales page straight into checkout with the right plan already in the cart — no cart page detour.",
      tier: "Free",
    },
    {
      title: "Purchase guardrails",
      description:
        "Enforce one subscription per product or per customer and control mixed carts so fast checkout paths stay clean.",
      tier: "Free",
    },
    {
      title: "Cart Info Editor",
      description:
        "Hide first billing-cycle, shipping-charge, and duration details across cart, checkout, mini-cart, and emails when the offer reads better without them.",
      tier: "Pro",
    },
  ],
  sections: [
    {
      id: "what-is-checkout-builder",
      question: "What is a WooCommerce checkout builder?",
      paragraphs: [
        "A WooCommerce checkout builder is a visual editor that replaces the fixed, template-defined checkout form with a layout you design — which fields appear, in what order, across how many steps. WooCommerce ships one checkout layout and expects code for anything else; a builder moves that work into ==a drag-and-drop editor== a store owner can use directly.",
        "In ArraySubs, Checkout Page Builder is the Pro module that does this for the classic WooCommerce checkout page, and it is built subscription-first: every custom field it captures is stored with the order and the subscription that order creates, then ==follows the subscription into its renewal records==. You design the form once and the data keeps working for the life of the plan.",
      ],
    },
    {
      id: "custom-fields",
      question: "Can I add custom fields to the subscription checkout?",
      paragraphs: [
        "Yes — Checkout Builder ships ==28 element types across three palettes==, from a plain text input to a date-range picker and a file upload. Drag an element into the layout, set its label and rules, and it is part of checkout — no code, no separate field-plugin stack.",
        "The range matters because subscriptions tend to need onboarding data at the moment of purchase: a delivery calendar for a box, sizes and preferences, a logo file for a design retainer. Collect it at checkout instead of in a follow-up email, and ==the subscription record is complete from day one==.",
      ],
      bullets: [
        "Standard fields (9): text, number, email, phone, select, multi-select, textarea, checkbox, toggle",
        "Advanced inputs (9): file upload, image select, grid select, color picker, calendar, date, date-time, time, date range",
        "Layout & commerce (10): product table, heading, section, paragraph, alert/notice, billing address, shipping address, visibility rules, and more",
      ],
    },
    {
      id: "multi-step",
      question: "How does multi-step checkout work?",
      paragraphs: [
        "Multi-step checkout splits the form into named steps — Account, Delivery, Payment — connected by previous/next navigation and ==a progress indicator== so customers always know how far along they are. You define the steps in the builder and drag elements into each one, exactly as in a single-step layout.",
        "Shorter screens beat one long form when a subscription checkout has real questions to ask. Group related fields into a step, keep payment last, and each screen asks for ==one decision at a time== instead of presenting a wall of commitment paperwork.",
      ],
    },
    {
      id: "conditional-fields",
      question: "Can checkout fields show conditionally?",
      paragraphs: [
        "Yes. Conditional visibility rules show or hide fields ==based on what the customer enters== — tick “This is a gift” and a gift-message box appears; choose a business account and the tax-ID field shows up. Fields that don't apply never render.",
        "Conditions are configured on the element inside the builder, so the logic lives with the layout rather than in code. The result is one checkout that adapts to each buyer instead of a lowest-common-denominator form that asks ==every buyer everything==.",
      ],
    },
    {
      id: "field-data",
      question: "Where does captured checkout data go?",
      paragraphs: [
        "Captured checkout data is stored with the order and with the subscription that order creates, and it ==carries into renewal records== as the plan bills. Nothing sits in a detached form-submissions table you have to cross-reference by hand.",
        "In wp-admin, the subscription detail screen shows the answers on a dedicated ==checkout-fields card==, next to the status, plan, and billing history staff are already looking at. When a customer asks about the preferences they set at signup, the answer is one screen away — months of renewals later.",
      ],
    },
    {
      id: "streamline-purchase",
      question: "How do I shorten the path from ad to checkout?",
      paragraphs: [
        "Link straight to checkout: one-click checkout URLs — ==free in ArraySubs== — put the chosen plan in the cart and land the buyer directly on the checkout page, so an ad, email, or sales page sits one click from payment. Purchase guardrails keep those fast paths safe with one-per-customer and mixed-cart rules.",
        "Two Pro companions tighten the funnel further. The Cart Info Editor hides first billing-cycle, shipping-charge, and duration details across cart, checkout, mini-cart, and emails when the offer reads better without them; Product Page Redirection sends direct product URLs to ==a sales page or a 404== while checkout links keep working, so buyers only ever see the page built to convert.",
      ],
    },
  ],
  steps: [
    {
      title: "Activate ArraySubs Pro",
      description:
        "Install the free core from WordPress.org, then activate Pro to enable the Checkout Page Builder module.",
    },
    {
      title: "Open the checkout builder",
      description:
        "Launch the drag-and-drop editor for the classic WooCommerce checkout page.",
    },
    {
      title: "Design fields, steps, and conditions",
      description:
        "Drag elements from the three palettes, group them into named steps, and add visibility rules where a field should only sometimes appear.",
    },
    {
      title: "Publish and test a one-click URL",
      description:
        "Save the layout, then follow a direct checkout link to confirm the flow and check the captured data on the subscription record.",
    },
  ],
  planSplit: {
    free: [
      "One-click / direct-to-checkout purchase URLs that skip the cart",
      "Purchase guardrails: one-per-customer, mixed-cart, and migration rules",
      "Checkout and manual renewals through 500+ WooCommerce gateways",
      "WooCommerce tax on checkout and every renewal",
      "Coupons on subscriptions with recurring discounts",
    ],
    pro: [
      "Drag-and-drop visual builder for the classic checkout page",
      "28 element types: standard fields, advanced inputs, layout & commerce",
      "Multi-step checkout with previous/next navigation and a progress indicator",
      "Conditional show/hide rules on any field",
      "Styling and design controls for the checkout look",
      "Captured field data on orders, subscriptions, renewals, and the admin checkout-fields card",
      "Cart Info Editor: hide billing-cycle, shipping, and duration details",
      "Product Page Redirection: send product URLs to a sales page or 404",
    ],
  },
  moduleSlugs: [
    "checkout-page-builder",
    "one-click-checkout-urls",
    "conditional-subscription-rules",
    "redirect-product-page",
    "woocommerce-manual-payments",
  ],
  articleSlugs: [
    "anatomy-of-a-high-converting-woocommerce-subscription-product-page",
    "subscription-terms-customers-must-see-before-they-pay",
    "one-time-purchase-and-subscription-on-one-product-when-to-offer-both",
  ],
  useCaseSlugs: ["saas-digital-products", "service-businesses", "subscription-boxes"],
  relatedPillars: [
    "payment-gateways",
    "subscriptions-and-recurring-products",
    "easy-setup",
  ],
  faq: [
    {
      question: "Is the checkout builder included in the free version of ArraySubs?",
      answer:
        "No. Checkout Page Builder is a Pro module. The free core still improves the purchase path with one-click checkout URLs, purchase guardrails, and checkout through 500+ WooCommerce payment gateways.",
    },
    {
      question: "Does the checkout builder work with the classic WooCommerce checkout?",
      answer:
        "Yes — it is a visual editor purpose-built for the classic WooCommerce checkout page. You design the layout with drag and drop and the classic checkout renders it.",
    },
    {
      question: "Can I build a multi-step checkout in WooCommerce?",
      answer:
        "Yes, with ArraySubs Pro. Split checkout into named steps with previous/next navigation and a progress indicator, and drag any of the 28 element types into each step.",
    },
    {
      question: "What kinds of custom checkout fields can I add?",
      answer:
        "28 element types across three palettes: 9 standard fields like text, email, and select; 9 advanced inputs like file upload, color picker, and date range; and 10 layout and commerce blocks like product tables, sections, and address elements.",
    },
    {
      question: "Where do I see the data customers enter at checkout?",
      answer:
        "Captured fields are stored on the order and the subscription, flow into renewal records, and appear on a checkout-fields card on the admin subscription detail screen.",
    },
    {
      question: "Can I send buyers straight to checkout from an ad or email?",
      answer:
        "Yes — one-click checkout URLs are part of the free core. A direct link adds the right plan to the cart and lands the buyer on checkout, skipping the cart page entirely.",
    },
    {
      question: "Can I hide billing details like the renewal cycle at checkout?",
      answer:
        "With the Pro Cart Info Editor, yes. Hide first billing-cycle, shipping-charge, and duration details across cart, checkout, mini-cart, and emails when the offer reads better without them.",
    },
  ],
};
