import { Wallet } from "lucide-react";
import type { FeaturePillar } from "./types";

export const paymentGateways: FeaturePillar = {
  slug: "payment-gateways",
  icon: Wallet,
  name: "Payment Gateways",
  cardDescription:
    "Checkout and manual renewals on 500+ WooCommerce gateways free — Pro adds automatic billing via Stripe with SCA, PayPal agreements, and Paddle as merchant of record.",
  tier: "Free + Pro",
  seoTitle: "WooCommerce Subscription Payment Gateways — Stripe, PayPal, Paddle",
  metaDescription:
    "WooCommerce subscription payment gateways: 500+ free for checkout and manual renewals — Pro adds automatic Stripe billing with SCA, PayPal, and Paddle native VAT.",
  h1: "Take recurring payments with Stripe, PayPal, Paddle, or any WooCommerce gateway",
  heroSubtitle:
    "The free core takes subscription checkout and manual renewal invoices on 500+ WooCommerce-compatible gateways; ArraySubs Pro adds automatic off-session billing through Stripe, PayPal billing agreements, and Paddle as merchant of record — with Gateway Health watching the webhooks.",
  heroHighlights: [
    "500+ gateways free",
    "Stripe, PayPal & Paddle automatic",
    "SCA / 3D Secure ready",
  ],
  directAnswer:
    "ArraySubs supports subscription checkout and manual renewal invoices through 500+ WooCommerce-compatible gateways in the free plugin, including offline methods like bank transfer. ArraySubs Pro adds automatic off-session renewals through three gateways: Stripe with saved cards and SCA handling, PayPal billing agreements, and Paddle as merchant of record with native VAT. Pro also brings customer self-service payment-method updates and Gateway Health webhook monitoring.",
  intro:
    "A subscription plugin is only as useful as the gateways it can bill through. ArraySubs keeps checkout open on ==500+ WooCommerce-compatible gateways== in the free core — every renewal can be paid manually through an invoice link — while Pro adds ==automatic off-session collection== through Stripe, PayPal, and Paddle. Each integration follows its gateway's model: ArraySubs drives the Stripe schedule, PayPal owns its billing agreements, and ==Paddle acts as merchant of record== with native VAT.",
  stats: [
    { value: "500+", label: "Gateways for checkout & manual renewals" },
    { value: "3", label: "Automatic Pro gateways" },
    { value: "1", label: "Merchant-of-record option" },
    { value: "SCA", label: "3D Secure–ready renewals" },
  ],
  capabilities: [
    {
      title: "500+ gateways at checkout",
      description:
        "Take subscription orders through any WooCommerce-compatible gateway — cards, wallets, and offline methods like bank transfer.",
      tier: "Free",
    },
    {
      title: "Manual renewal invoices",
      description:
        "Each renewal creates a pending invoice with a payment link the customer pays through your existing gateways.",
      tier: "Free",
    },
    {
      title: "First-class Stripe billing",
      description:
        "ArraySubs owns the schedule, creates each renewal invoice, and charges saved payment methods off-session with SCA handled.",
      tier: "Pro",
    },
    {
      title: "Stripe card lifecycle",
      description:
        "Card auto-updates and expiring-card notices head off failures early; Stripe Express payment methods are supported at checkout.",
      tier: "Pro",
    },
    {
      title: "PayPal billing agreements",
      description:
        "Checkout creates the agreement, PayPal owns future charge timing, and webhooks create renewal orders and sync state.",
      tier: "Pro",
    },
    {
      title: "Paddle merchant of record",
      description:
        "Paddle handles tax and VAT natively, with hosted checkout, hosted payment-method flows, and product sync to Paddle.",
      tier: "Pro",
    },
    {
      title: "Self-service payment updates",
      description:
        "Customers update their own payment method for Stripe, PayPal, and Paddle subscriptions — no support ticket needed.",
      tier: "Pro",
    },
    {
      title: "Gateway Health monitoring",
      description:
        "One dashboard for webhook status, connection health, and gateway event logs, so broken webhooks surface fast.",
      tier: "Pro",
    },
    {
      title: "WooCommerce tax on renewals",
      description:
        "Manual, Stripe, and PayPal flows use your WooCommerce tax configuration on checkout and every renewal; Paddle is the native-VAT exception.",
      tier: "Free",
    },
  ],
  sections: [
    {
      id: "which-gateways",
      question: "Which payment gateways work with WooCommerce subscriptions?",
      paragraphs: [
        "All of them, for checkout: ArraySubs takes subscription orders and manual renewal invoices through ==500+ WooCommerce-compatible gateways==, including offline methods like bank transfer. That part is free and requires nothing beyond the gateways your store already runs.",
        "Automatic renewals — charging the customer off-session without a click — are gateway-specific and come with Pro: ==Stripe, PayPal, and Paddle==. Every other gateway keeps working in manual mode, where each renewal generates an invoice with a payment link.",
      ],
      bullets: [
        "Free: checkout + manual renewal invoices on 500+ gateways",
        "Pro: automatic off-session renewals via Stripe, PayPal, or Paddle",
        "Gateways without automatic support still collect renewals manually",
      ],
    },
    {
      id: "stripe",
      question: "How does Stripe subscription billing work in WooCommerce?",
      paragraphs: [
        "Stripe is the first-class integration: ==ArraySubs owns the billing schedule==, creates each renewal invoice, and charges the customer's saved payment method off-session — with SCA and 3D Secure handled when banks require them. Stripe Express payment methods are supported at checkout.",
        "The integration also manages the card lifecycle — ==card auto-updates and expiring-card notices== — so fewer renewals fail in the first place. Webhook reconciliation keeps records straight: payments, refunds, and disputes sync back automatically, with a webhook status view and a manual refresh button when you want to force a check.",
      ],
    },
    {
      id: "paypal",
      question: "Can I take recurring PayPal payments in WooCommerce?",
      paragraphs: [
        "Yes — with ArraySubs Pro, checkout creates a ==PayPal billing agreement==, and PayPal then owns the timing of future charges. Webhooks flow back into your store, creating renewal orders and keeping subscription state in sync.",
        "PayPal's model comes with real restrictions worth knowing before you commit, and ArraySubs enforces them automatically at checkout. Customers update their payment method by ==creating a new agreement== when PayPal requires it.",
      ],
      bullets: [
        "No mixed carts in a PayPal checkout",
        "No multiple subscriptions in one PayPal checkout",
        "No differing billing cycles in a single PayPal checkout",
      ],
    },
    {
      id: "paddle",
      question: "What does Paddle as merchant of record mean for my store?",
      paragraphs: [
        "It means Paddle is the seller of record for the transaction and ==handles tax and VAT natively== — the one exception to WooCommerce tax handling in ArraySubs. For stores selling internationally, tax calculation and remittance sit with Paddle instead of your bookkeeping.",
        "Billing is gateway-managed: your products sync to Paddle, customers pay through ==Paddle's hosted checkout==, and payment-method updates use hosted customer flows. Webhooks sync every gateway-side event back into ArraySubs subscriptions, renewal orders, and notes.",
      ],
    },
    {
      id: "manual-gateways",
      question: "Do subscriptions work without an automatic payment gateway?",
      paragraphs: [
        "Yes — the free core is built for exactly that. Each renewal creates a ==pending invoice with a payment link==, and the customer pays it through any of the 500+ WooCommerce-compatible gateways, including bank transfer and other offline methods.",
        "Manual renewals fit invoicing-driven B2B, markets where cards are rare, and stores whose gateway has no automatic support. The renewal schedule, reminders, and grace handling all run the same way — ==only the collection step waits for the customer==.",
      ],
    },
    {
      id: "gateway-health",
      question: "How do I know my gateway webhooks are healthy?",
      paragraphs: [
        "Gateway Health (Pro) is the dashboard for exactly this: it monitors ==webhook status, connection health, and gateway event logs== in one admin screen, so a silently broken webhook shows up before customers do.",
        "For Stripe, webhook reconciliation goes further: payments, refunds, and disputes are reconciled from webhook events, with a status view and a ==manual webhook refresh button== for on-demand checks. When a renewal looks off, the event log is the first place to look.",
      ],
    },
  ],
  steps: [
    {
      title: "Start with your existing gateways",
      description:
        "Install ArraySubs free and take subscription checkout and manual renewal invoices through the gateways your store already runs.",
    },
    {
      title: "Connect an automatic Pro gateway",
      description:
        "Add Stripe for ArraySubs-managed off-session billing, PayPal for billing agreements, or Paddle for merchant-of-record VAT.",
    },
    {
      title: "Verify webhooks in Gateway Health",
      description:
        "Check webhook status and connection health so payment, refund, and dispute events sync back to subscription records.",
    },
    {
      title: "Test one full renewal cycle",
      description:
        "Place a test order, confirm the renewal order and webhook events, and try the customer payment-method update flow.",
    },
  ],
  planSplit: {
    free: [
      "Subscription checkout on 500+ WooCommerce-compatible gateways",
      "Manual renewal invoices with customer payment links",
      "Offline methods such as bank transfer",
      "WooCommerce tax on checkout and every renewal",
      "The same renewal schedule, reminders, and grace handling Pro uses",
    ],
    pro: [
      "Automatic off-session Stripe billing with saved cards and SCA",
      "Stripe card auto-updates, expiring-card notices, and Express payment methods",
      "PayPal billing agreements with webhook renewal sync",
      "Paddle merchant of record with native VAT and hosted flows",
      "Customer self-service payment-method updates",
      "Gateway Health webhook and connection monitoring",
    ],
  },
  moduleSlugs: [
    "stripe-payments",
    "paypal-payments",
    "paddle-payments",
    "woocommerce-manual-payments",
    "woocommerce-tax-handling",
    "gateway-health",
  ],
  articleSlugs: [
    "manual-vs-automatic-subscription-renewals-in-woocommerce",
    "what-happens-when-a-subscription-payment-fails",
    "subscription-payment-failure-codes-a-practical-triage-guide",
  ],
  useCaseSlugs: [
    "saas-digital-products",
    "b2b-wholesale-memberships",
    "content-publishers",
  ],
  relatedPillars: [
    "billing-renewals-and-refunds",
    "checkout-builder",
    "audits-and-logs",
  ],
  faq: [
    {
      question: "Do I need Stripe to sell subscriptions with ArraySubs?",
      answer:
        "No. The free core sells subscriptions through 500+ WooCommerce-compatible gateways with manual renewal invoices. Stripe is the Pro path for automatic off-session renewals with saved cards and SCA handling.",
    },
    {
      question: "Which gateways charge subscription renewals automatically?",
      answer:
        "Three, all Pro: Stripe (ArraySubs-managed schedule with saved cards), PayPal (gateway-managed billing agreements), and Paddle (gateway-managed, merchant of record). All other gateways collect renewals manually through invoice payment links.",
    },
    {
      question: "Does ArraySubs handle SCA and 3D Secure?",
      answer:
        "Yes. The Pro Stripe integration handles SCA and 3D Secure requirements, including off-session renewal charges against saved cards, so renewals complete when banks require strong authentication.",
    },
    {
      question: "Can customers update their payment method themselves?",
      answer:
        "Yes, with Pro: self-service payment-method updates work for Stripe, PayPal, and Paddle. Stripe also supports card auto-updates and expiring-card notices, PayPal updates happen by creating a new agreement, and Paddle uses hosted customer flows.",
    },
    {
      question: "What are PayPal's restrictions for subscription checkout?",
      answer:
        "One PayPal checkout cannot contain a mixed cart, multiple subscriptions, or items with differing billing cycles. ArraySubs enforces these restrictions automatically so customers never end up with a broken agreement.",
    },
    {
      question: "Who handles VAT when I sell through Paddle?",
      answer:
        "Paddle does, natively, as merchant of record — the one exception to WooCommerce tax handling in ArraySubs. Manual, Stripe, and PayPal flows keep using your WooCommerce tax configuration on checkout and renewals.",
    },
    {
      question: "Does Flexible Renewal Sync work with every gateway?",
      answer:
        "No. Synced checkout supports manual and offline gateways plus Stripe. Automatic gateways that cannot sync are hidden while a synced item is in the cart, so customers only see methods that will bill correctly.",
    },
  ],
};
