import { LayoutGrid } from "lucide-react";
import type { FeaturePillar } from "./types";

export const manageSubscriptions: FeaturePillar = {
  slug: "manage-subscriptions",
  icon: LayoutGrid,
  name: "Manage Subscriptions",
  cardDescription:
    "The central admin dashboard for every subscription — search, edit, create from wp-admin, export CSV or JSON, and keep a permanent notes timeline.",
  tier: "Free + Pro",
  seoTitle: "WooCommerce Manage Subscriptions Admin Dashboard",
  metaDescription:
    "WooCommerce subscription management dashboard, free: search and filter every subscription, create records from wp-admin, export CSV/JSON — Pro adds Member Insight.",
  h1: "Manage every WooCommerce subscription from one admin dashboard",
  heroSubtitle:
    "One wp-admin dashboard for every subscription: search, filter, and edit records, create subscriptions manually for migrations and phone orders, export filtered CSV or JSON, and troubleshoot with notes, refund workflows, and password-free Login as User.",
  heroHighlights: [
    "Search, filter, edit & export",
    "Create from wp-admin",
    "Password-free support logins",
  ],
  directAnswer:
    "ArraySubs includes a free admin dashboard for managing WooCommerce subscriptions: a searchable, filterable list, detail screens with lifecycle actions, manual subscription creation from wp-admin, CSV and JSON exports, and a permanent notes timeline. Pro adds gateway, checkout-fields, shipping, and Feature Log detail cards, plus Member Insight — a unified customer dashboard. Login as User ships free for password-free support impersonation, and everything is HPOS-compatible.",
  intro:
    "Subscription operations live or die in the admin, so ArraySubs puts ==every subscription in one dashboard== — search it, filter it, open the record, edit supported fields, and run lifecycle actions without leaving wp-admin. Staff can ==create subscriptions manually== for migrations, phone orders, and comped accounts, and every record carries a permanent notes timeline of what happened and why. Filtered ==CSV and JSON exports== cover reporting, finance, and migration work from the same screen.",
  stats: [
    { value: "2", label: "Export formats — CSV & JSON" },
    { value: "3", label: "Note streams on the timeline" },
    { value: "0", label: "Passwords needed for support logins" },
    { value: "100%", label: "HPOS-compatible" },
  ],
  capabilities: [
    {
      title: "Central subscription list",
      description:
        "Search and filter every subscription record, then open any row into a full detail screen — all from one wp-admin page.",
      tier: "Free",
    },
    {
      title: "Edit & lifecycle actions",
      description:
        "Update supported subscription fields and run lifecycle actions directly from the admin record.",
      tier: "Free",
    },
    {
      title: "Create subscriptions in wp-admin",
      description:
        "Add records for migrations, phone orders, support corrections, and comped accounts — with customer details prefilled.",
      tier: "Free",
    },
    {
      title: "CSV & JSON exports",
      description:
        "Export filtered subscription data for finance, reporting, migrations, and custom tooling.",
      tier: "Free",
    },
    {
      title: "Subscription notes timeline",
      description:
        "A permanent record combining automatic lifecycle, renewal, and gateway events with private admin notes and customer-visible notes.",
      tier: "Free",
    },
    {
      title: "Refund workflows on the record",
      description:
        "Issue full or partial refunds, or preview and process a prorated refund based on unused time, from the subscription itself.",
      tier: "Free",
    },
    {
      title: "Pro detail cards",
      description:
        "Gateway, checkout-fields (Checkout Builder data), and shipping cards plus the Feature Log from Feature Manager join the record.",
      tier: "Pro",
    },
    {
      title: "Member Insight",
      description:
        "One unified customer dashboard: look up any member and see their profile and commerce overview in a single screen.",
      tier: "Pro",
    },
    {
      title: "Login as User",
      description:
        "Open a non-admin customer's frontend session for support — no password, excluded from session limits, no admin-to-admin impersonation.",
      tier: "Free",
    },
  ],
  sections: [
    {
      id: "admin-dashboard",
      question: "What does the subscription admin dashboard include?",
      paragraphs: [
        "The dashboard is a central list of every subscription with ==search and filters==, and each row opens a detail screen where staff edit supported fields and run lifecycle actions. It ships in the free core and is the operational home for billing, support, and account work.",
        "It is built for current WooCommerce — ==HPOS-compatible== — and admin, customer portal, and reporting all read the same subscription records. What support sees on the record matches what the customer sees in their account, which removes a whole class of \"works for me\" tickets.",
      ],
    },
    {
      id: "create-manually",
      question: "Can I create a subscription manually from wp-admin?",
      paragraphs: [
        "Yes — creating subscriptions from wp-admin ships free, built for what checkout can't cover: ==migrations, phone orders, support corrections, and comped accounts==. Customer details prefill, so staff aren't retyping what the store already knows.",
        "Admin-created records are not second-class: they enter the ==same lifecycle, notes, portal, and reporting flows== as checkout subscriptions. The customer sees the subscription in their account, and every report counts it.",
      ],
    },
    {
      id: "detail-cards",
      question: "What can I see on a single subscription record?",
      paragraphs: [
        "Every record opens into detail cards, and the free core covers the story of the subscription: ==lifecycle, cancellation, and coupon usage== at a glance.",
        "Pro modules add cards to the same screen: a gateway card for payment context, a checkout-fields card with ==Checkout Builder data captured at purchase==, a shipping card, and the Feature Log from Feature Manager. The record grows with your stack instead of spreading data across admin pages.",
      ],
    },
    {
      id: "notes-timeline",
      question: "How are subscription changes tracked over time?",
      paragraphs: [
        "Every subscription carries a ==permanent notes timeline== with three streams: automatic notes for lifecycle, renewal, and gateway events; private admin notes customers never see; and customer-visible notes for updates worth publishing.",
        "That makes a record self-explanatory months later: who changed what, which renewal failed, what support promised. ==Skip reasons, retry activity, and gateway events== land in the same timeline, so nobody reconstructs history from email threads.",
      ],
      bullets: [
        "Automatic notes: lifecycle, renewal, and gateway events",
        "Private admin notes customers never see",
        "Customer-visible notes for support updates",
      ],
    },
    {
      id: "exports",
      question: "Can I export WooCommerce subscriptions to CSV?",
      paragraphs: [
        "Yes — filtered subscription data exports to ==CSV or JSON== from the dashboard, free. The export follows your active filters, so a segment-level pull is a filter plus one click rather than spreadsheet surgery.",
        "CSV fits finance and reporting workflows; ==JSON fits migrations and custom tooling==. Both formats export the same filtered dataset, so operations and engineering work from identical numbers.",
      ],
    },
    {
      id: "support-tools",
      question: "Which support tools help me troubleshoot a customer's subscription?",
      paragraphs: [
        "Start with ==Login as User== (free): it opens a non-admin customer's frontend session without their password, so staff see exactly what the customer sees. Impersonation sessions are excluded from session limits, and admin-to-admin impersonation is blocked.",
        "Member Insight (Pro) adds ==one unified customer dashboard== — member lookup, profile, and a commerce overview in a single place. Refunds run from the subscription record itself: full, partial, or prorated with a preview, plus refund to store credit with Pro.",
      ],
    },
  ],
  steps: [
    {
      title: "Open the subscription dashboard",
      description:
        "Install ArraySubs free — every subscription appears in one wp-admin list with search and filters.",
    },
    {
      title: "Open a record and act",
      description:
        "Edit supported fields, run lifecycle actions, add notes, and process refunds from the detail screen.",
    },
    {
      title: "Create what checkout can't",
      description:
        "Add subscriptions manually for migrations, phone orders, and comped accounts — customer details prefill.",
    },
    {
      title: "Export for finance and tooling",
      description:
        "Filter the list, then export the matching subscriptions to CSV for reports or JSON for migrations.",
    },
  ],
  planSplit: {
    free: [
      "Central dashboard with search, filters, and detail screens",
      "Manual subscription creation for migrations and phone orders",
      "Lifecycle actions and supported field editing from admin",
      "Filtered exports to CSV and JSON",
      "Notes timeline: automatic events, private notes, customer-visible notes",
      "Full, partial, and prorated refunds from the record",
      "Login as User support impersonation — no password needed",
    ],
    pro: [
      "Gateway, checkout-fields, and shipping detail cards",
      "Feature Log card from Feature Manager",
      "Member Insight: one unified customer dashboard",
      "Refund to store credit instead of cash",
    ],
  },
  moduleSlugs: [
    "manage-subscriptions",
    "create-subscription-admin",
    "subscription-notes",
    "manage-refunds",
    "member-insight",
    "login-as-user",
  ],
  articleSlugs: [
    "subscription-order-vs-renewal-order-vs-parent-order",
    "changing-a-subscription-renewal-date-safely",
    "multiple-subscriptions-per-customer-policy-cart-and-billing-tradeoffs",
  ],
  useCaseSlugs: [
    "subscription-support-operations",
    "service-businesses",
    "b2b-wholesale-memberships",
  ],
  relatedPillars: [
    "customer-portal",
    "audits-and-logs",
    "billing-renewals-and-refunds",
  ],
  faq: [
    {
      question: "Is the ArraySubs subscription dashboard free?",
      answer:
        "Yes. The central list, search and filters, detail screens, editing, lifecycle actions, manual creation, notes, and CSV/JSON exports are all free. Pro adds gateway, checkout-fields, shipping, and Feature Log cards plus Member Insight.",
    },
    {
      question: "Can I create a WooCommerce subscription without a checkout?",
      answer:
        "Yes. Staff create subscriptions directly from wp-admin instead of requiring a storefront checkout — used for migrations, phone orders, support corrections, and comped accounts. Created records join the same lifecycle, notes, portal, and reporting flows as checkout subscriptions.",
    },
    {
      question: "How do I export WooCommerce subscriptions to CSV?",
      answer:
        "Filter the subscription list in the dashboard, then export — the file contains exactly the filtered records. JSON is available alongside CSV for migrations and custom tooling, and both formats are free.",
    },
    {
      question: "What do subscription notes record?",
      answer:
        "Three streams on one permanent timeline: automatic notes for lifecycle, renewal, and gateway events; private admin notes; and customer-visible notes. Support gets the full history of a subscription without leaving the record.",
    },
    {
      question: "Can I log in as a customer to troubleshoot?",
      answer:
        "Yes — Login as User is free. It opens a non-admin customer's frontend session without their password, is excluded from session limits, and blocks admin-to-admin impersonation.",
    },
    {
      question: "What does Member Insight add?",
      answer:
        "Member Insight (Pro) is one unified customer dashboard: look up any member and see their profile and commerce overview in a single screen. It complements the per-subscription record when a ticket spans a customer's whole relationship with the store.",
    },
    {
      question: "Is the dashboard compatible with HPOS?",
      answer:
        "Yes. ArraySubs is HPOS-compatible (high-performance order storage), so the subscription dashboard and its records work on stores running WooCommerce's modern order storage.",
    },
  ],
};
