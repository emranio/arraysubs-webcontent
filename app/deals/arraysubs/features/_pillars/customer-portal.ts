import { CircleUser } from "lucide-react";
import type { FeaturePillar } from "./types";

export const customerPortal: FeaturePillar = {
  slug: "customer-portal",
  icon: CircleUser,
  name: "Customer Portal",
  cardDescription:
    "Subscriber self-service inside My Account — view billing and invoices, cancel with undo, pause, skip, and switch plans; Pro adds payment-method updates.",
  tier: "Free + Pro",
  seoTitle: "WooCommerce Subscription Customer Portal & Self-Service",
  metaDescription:
    "WooCommerce subscription customer portal free: subscribers cancel, pause, skip, and switch plans from My Account — Pro adds payment updates and auto-renew control.",
  h1: "Give subscribers a self-service portal in My Account",
  heroSubtitle:
    "ArraySubs turns WooCommerce My Account into a subscription portal — customers see billing terms, invoices, and related orders, then cancel, pause, skip, or switch plans themselves, with Pro adding payment-method and auto-renew control.",
  heroHighlights: [
    "7 core self-service actions",
    "Cancel, pause, skip & switch",
    "Pro payment-method updates",
  ],
  directAnswer:
    "The ArraySubs customer portal is a free subscription self-service area inside WooCommerce My Account. Customers see billing terms, related orders, and invoices for each subscription, and run seven core lifecycle actions — cancel, undo a scheduled cancellation, reactivate, pause, resume, skip the next renewal, and switch plans — plus pay pending renewal invoices. Pro adds payment-method updates for Stripe, PayPal, and Paddle, an auto-renew toggle, and shipping address changes.",
  intro:
    "Every subscription question a customer emails you — when do I renew, how do I cancel, can I switch to annual — is a portal page they could have opened themselves. The free portal puts ==seven lifecycle actions== inside WooCommerce My Account, from cancel-with-undo to plan switching with your store's proration method. Cancel attempts can route through the ==3-step retention flow== before they complete, and every failed portal action is logged for admins. You decide which actions are exposed, and ==Pro adds payment-method updates==, an auto-renew toggle, and shipping address changes.",
  stats: [
    { value: "7", label: "Core self-service actions" },
    { value: "3", label: "Pro payment-update gateways" },
    { value: "3", label: "Proration methods on switch" },
    { value: "0", label: "Tickets for routine changes" },
  ],
  capabilities: [
    {
      title: "My Subscriptions hub",
      description:
        "A subscription list in My Account, opening into per-subscription detail: billing terms, related orders, and invoices.",
      tier: "Free",
    },
    {
      title: "Cancel with undo",
      description:
        "Customers cancel on their own — and can undo a scheduled cancellation before it takes effect.",
      tier: "Free",
    },
    {
      title: "Pause / vacation mode",
      description:
        "Pause the subscription without cancelling, then resume when the customer is ready — history stays intact.",
      tier: "Free",
    },
    {
      title: "Skip next renewal",
      description:
        "Skip one upcoming cycle and move the next payment date forward — the schedule keeps running.",
      tier: "Free",
    },
    {
      title: "Plan switching",
      description:
        "Upgrade, downgrade, or crossgrade between eligible plans, prorated by the store's chosen method.",
      tier: "Free",
    },
    {
      title: "Pay pending renewals",
      description:
        "Customers settle a pending renewal invoice straight from the portal — the fix for manual or failed payments.",
      tier: "Free",
    },
    {
      title: "Retention flow on cancel",
      description:
        "Route every cancel attempt through reason capture and save offers before it completes.",
      tier: "Free",
    },
    {
      title: "Payment method & auto-renew",
      description:
        "Customers update their card or billing agreement on Stripe, PayPal, or Paddle and toggle auto-renew.",
      tier: "Pro",
    },
    {
      title: "Admin visibility",
      description:
        "Portal action failures are logged, and Login as User opens the customer's exact session for support.",
      tier: "Free",
    },
  ],
  sections: [
    {
      id: "what-portal-includes",
      question: "What can customers do in the subscription portal?",
      paragraphs: [
        "Customers manage the full subscription lifecycle from WooCommerce My Account: a My Subscriptions list opens into per-subscription detail with ==billing terms, related orders, and invoices==. From there they run the seven core actions of the free portal — plus pay any pending renewal invoice.",
        "You stay in control of the surface area: store settings decide ==which actions are exposed==, so cancel, pause, and skip each appear only if your policy allows them. Pro extends the same portal with payment-method updates, an auto-renew toggle, and shipping address changes.",
      ],
      bullets: [
        "Cancel — with undo before a scheduled cancellation takes effect",
        "Reactivate a cancelled subscription",
        "Pause / vacation mode — and resume when ready",
        "Skip the next renewal while keeping the schedule",
        "Switch plans — upgrade, downgrade, or crossgrade with proration",
        "Pay a pending renewal invoice",
      ],
    },
    {
      id: "self-service-cancel",
      question: "Can customers cancel their own subscription?",
      paragraphs: [
        "Yes — cancellation is a free, built-in portal action, and it is smarter than a delete button. A customer who cancels can ==undo a scheduled cancellation== from the same screen, which quietly recovers the change-of-heart segment without a support ticket.",
        "Before a cancellation completes, it can route through the ==3-step retention flow==: capture the reason, present a matching save offer — discount, pause, downgrade, or contact support — and only then confirm. The exit stays honest while every cancel attempt gets one real intervention point.",
      ],
    },
    {
      id: "pause-skip-switch",
      question: "Can subscribers pause, skip, or switch plans on their own?",
      paragraphs: [
        "Yes — all three are free portal actions. ==Pause / vacation mode== suspends the subscription without cancelling until the customer resumes it, while skip moves the next payment date forward one cycle and keeps the schedule — two graceful answers for customers who need a break, not an exit.",
        "Plan switching goes further: customers ==upgrade, downgrade, or crossgrade== between the plans you make eligible, and money movement follows the store's proration method — charge now, settle at renewal, or no adjustment. The subscription record stays continuous through the switch, so history and access never reset.",
      ],
    },
    {
      id: "payment-methods",
      question: "How do customers update their payment method?",
      paragraphs: [
        "With ArraySubs Pro, customers update the payment method behind a subscription from the portal on ==Stripe, PayPal, or Paddle== — a new card or a fresh billing agreement, no support involvement. The auto-renew toggle and shipping address updates live in the same Pro action set.",
        "It is the highest-leverage Pro upgrade for stores on automatic renewals, because an expired card is the most common problem a customer can fix alone. And every failed portal action is ==logged for admins==, so when a customer says “it did not work,” support sees exactly what happened.",
      ],
    },
    {
      id: "portal-customization",
      question: "Can I customize the My Account subscription pages?",
      paragraphs: [
        "Yes — the portal lives inside WooCommerce My Account, and the free ==My Account Page Builder== controls that menu: reorder items, rename labels, hide entries, and add custom endpoint pages that render WordPress content inside the account layout.",
        "Profile Builder adds custom profile fields and customer avatars to the same area, and Pro pages — ==My Features and Store Credit== — slot into the menu when those modules are active. The result reads like one coherent member area, not a plugin bolted onto a theme.",
      ],
    },
    {
      id: "support-visibility",
      question: "How does self-service reduce support tickets?",
      paragraphs: [
        "Routine subscription changes stop arriving as tickets because customers make them directly — a cancel, a pause, a skip, a plan switch, or an invoice payment needs zero staff involvement. The requests that used to fill an inbox become ==portal clicks instead of ticket threads==.",
        "When something does go wrong, two free tools shorten the loop: portal action failures are logged for admins, and ==Login as User== opens the customer's exact frontend session — no password requests, no screenshot ping-pong. Support sees what the customer sees and fixes the real problem in one pass.",
      ],
    },
  ],
  steps: [
    {
      title: "Install ArraySubs free",
      description:
        "Install the free core — the customer portal appears inside WooCommerce My Account with no extra setup.",
    },
    {
      title: "Choose the exposed actions",
      description:
        "Decide in settings whether customers can cancel, pause, and skip — the portal only shows what you allow.",
    },
    {
      title: "Configure switching and retention",
      description:
        "Set eligible plan-switch paths and the proration method, and enable the retention flow on cancellation.",
    },
    {
      title: "Test with Login as User",
      description:
        "Open a customer session with Login as User and walk each action end to end the way a subscriber would.",
    },
  ],
  planSplit: {
    free: [
      "My Subscriptions list with billing terms, orders, and invoices",
      "Cancel with undo of a scheduled cancellation, plus reactivate",
      "Pause / vacation mode, resume, and skip next renewal",
      "Plan switching with the store's proration method",
      "Pay pending renewal invoices from the portal",
      "Retention flow interception on cancel",
      "Portal failure logs and Login as User for support",
    ],
    pro: [
      "Self-service payment-method updates on Stripe, PayPal, and Paddle",
      "Auto-renew toggle per subscription",
      "Shipping address updates",
      "My Features and Store Credit account pages",
      "Multi-Login Prevention: concurrent-session limits per account",
    ],
  },
  moduleSlugs: [
    "customer-portal",
    "plan-switching",
    "skip-next-renewal",
    "pause-vacation-mode",
    "my-account-page-builder",
    "multi-login-prevention",
  ],
  articleSlugs: [
    "immediate-cancellation-vs-cancel-at-period-end",
    "subscription-terms-customers-must-see-before-they-pay",
    "manual-vs-automatic-subscription-renewals-in-woocommerce",
  ],
  useCaseSlugs: [
    "saas-digital-products",
    "subscription-support-operations",
    "membership-sites",
  ],
  relatedPillars: [
    "retention-flow-builder",
    "manage-subscriptions",
    "profile-builder",
  ],
  faq: [
    {
      question: "Is the subscription customer portal free?",
      answer:
        "Yes. The portal, the subscription detail views, and all seven core lifecycle actions ship in the free core inside WooCommerce My Account. Pro adds payment-method updates, the auto-renew toggle, and shipping address changes.",
    },
    {
      question: "Can customers cancel a WooCommerce subscription themselves?",
      answer:
        "Yes, when you allow it. Customers cancel from My Account, can undo a scheduled cancellation, and every attempt can pass through the 3-step retention flow — reason, save offer, confirm — before it completes.",
    },
    {
      question: "Can I control which self-service actions customers see?",
      answer:
        "Yes. Settings decide whether cancel, pause, and skip are available, and plan switching only offers the switch paths you configure. The portal shows exactly what your policy allows.",
    },
    {
      question: "How do customers update their card for renewals?",
      answer:
        "With Pro, customers open the subscription in My Account and update the payment method directly on Stripe, PayPal, or Paddle. No support involvement is needed — which matters, because expired cards are the renewal problem customers can fix themselves.",
    },
    {
      question: "Can customers pause instead of cancelling?",
      answer:
        "Yes. Pause / vacation mode is free: the subscription is suspended without cancelling, and the customer resumes it later. Skip next renewal is the lighter option — it moves one payment date forward and keeps the schedule running.",
    },
    {
      question: "What happens when a portal action fails?",
      answer:
        "The failure is logged for admins, so support can see what the customer attempted. Combined with Login as User — which opens the customer's session without a password — most portal reports can be reproduced and resolved in one pass.",
    },
    {
      question: "Does the portal work with a customized My Account page?",
      answer:
        "Yes. The portal renders inside WooCommerce My Account, and the free My Account Page Builder can reorder, rename, and hide menu items or add custom endpoint pages around it.",
    },
  ],
};
