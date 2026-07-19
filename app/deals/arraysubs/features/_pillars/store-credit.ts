import { Wallet } from "lucide-react";
import type { FeaturePillar } from "./types";

export const storeCredit: FeaturePillar = {
  slug: "store-credit",
  icon: Wallet,
  name: "Store Credit",
  cardDescription:
    "A Pro credit wallet for every customer — refund to credit instead of cash, sell prepaid credit packs with a bonus, and keep refund value in the store.",
  tier: "Pro",
  seoTitle: "WooCommerce Store Credit for Subscriptions",
  metaDescription:
    "WooCommerce store credit for subscriptions: ArraySubs Pro adds customer wallets, refund to store credit, credit packs with a bonus, expiry, and 4 credit emails.",
  h1: "Give customers a store credit wallet inside WooCommerce",
  heroSubtitle:
    "ArraySubs Pro adds a per-customer credit wallet to your WooCommerce store — refund to credit instead of cash, sell prepaid credit packs with a bonus percentage, let balances apply at checkout, and keep every movement logged.",
  heroHighlights: [
    "Refund to store credit",
    "Prepaid credit packs with a bonus",
    "Balance & history in My Account",
  ],
  directAnswer:
    "Store Credit is a Pro module in ArraySubs that gives every customer a credit wallet with a balance and full transaction history inside WooCommerce. Admins can add credit manually, issue refunds as store credit instead of cash, and sell prepaid credit packs with an optional bonus percentage; customers see their balance in My Account and spend it at checkout. The free core supplies the workflows around it — full, partial, and prorated refunds, the retention flow, and the customer portal — that credit plugs into.",
  intro:
    "A refund paid back to a card is revenue leaving the store; a refund issued as store credit is revenue waiting to be spent. ArraySubs Pro adds a ==per-customer credit wallet== to WooCommerce with balances, a full transaction history, and expiration rules. Admins can grant credit for goodwill or promotions, route ==refunds to credit instead of cash==, and sell prepaid credit packs that pay a bonus percentage. Customers watch it all from a ==My Account Store Credit page== and spend the balance at checkout.",
  stats: [
    { value: "1", label: "Wallet per customer, full history" },
    { value: "100%", label: "Of refund value can stay in-store" },
    { value: "Bonus %", label: "Optional reward on credit packs" },
    { value: "4", label: "Credit lifecycle emails" },
  ],
  capabilities: [
    {
      title: "Per-customer credit wallet",
      description:
        "Every customer gets a balance with a complete transaction history — what was added, spent, and expired, and why.",
      tier: "Pro",
    },
    {
      title: "Manual credit adjustments",
      description:
        "Add or deduct credit for goodwill, promotions, or migrations from another system, with every movement logged.",
      tier: "Pro",
    },
    {
      title: "Refund to store credit",
      description:
        "Issue any refund as credit instead of cash — the value stays in the store until the customer spends it.",
      tier: "Pro",
    },
    {
      title: "Prepaid credit packs",
      description:
        "Sell credit up front with an optional bonus percentage — pay a set amount, receive that amount plus the bonus.",
      tier: "Pro",
    },
    {
      title: "Store-credit purchase shortcode",
      description:
        "Place the credit purchase form on any page — a top-up page, a pricing page, or a members-only offer.",
      tier: "Pro",
    },
    {
      title: "My Account balance page",
      description:
        "Customers see their current balance and full credit history on a dedicated Store Credit page in My Account.",
      tier: "Pro",
    },
    {
      title: "Credit at checkout",
      description:
        "Balances apply at checkout, reducing what the card is charged — no codes to remember or paste.",
      tier: "Pro",
    },
    {
      title: "Expiration with 4 lifecycle emails",
      description:
        "Set credit expiry and keep customers informed with Credit Added, Credit Used, Credit Expiring, and Credit Expired emails.",
      tier: "Pro",
    },
    {
      title: "Free refund workflows underneath",
      description:
        "Full, partial, and prorated refund tools ship in the free core — Store Credit adds the in-store destination for that value.",
      tier: "Free",
    },
  ],
  sections: [
    {
      id: "what-is-store-credit",
      question: "What is store credit in WooCommerce?",
      paragraphs: [
        "Store credit is a prepaid balance attached to a customer account that can be spent on future orders instead of a card payment. WooCommerce has no native credit system, so ArraySubs Pro adds one: ==a per-customer wallet== with a balance, a full transaction history, and rules for how credit is earned, spent, and expired.",
        "Credit enters the wallet from several directions: an admin grants it for goodwill, promotions, or migrations from another system; a refund is issued as credit; a customer buys a prepaid credit pack; or a plan downgrade produces a credit. ==Every movement is logged==, so support can always answer where a balance came from.",
      ],
    },
    {
      id: "refund-to-credit",
      question: "Can I refund an order to store credit instead of cash?",
      paragraphs: [
        "Yes — with ArraySubs Pro, a refund can be issued as store credit instead of being sent back to the payment method. The option sits inside the same subscription and order refund workflows the free core already provides, so ==full, partial, and prorated refunds== can all land in the wallet.",
        "The difference shows up in revenue: a cash refund leaves the store permanently, while ==refund value issued as credit stays in the store== until the customer spends it on a renewal or a new order. For subscription businesses, that turns refund policy from a pure cost into a second chance at the relationship.",
      ],
    },
    {
      id: "credit-packs",
      question: "Can customers buy store credit with a bonus?",
      paragraphs: [
        "Yes. Credit packs let customers buy prepaid store credit, optionally with a ==bonus percentage on top== — pay a set amount, receive that amount plus the bonus in the wallet. It is the classic prepay mechanic: customers commit funds up front in exchange for extra value, and you collect revenue before the order exists.",
        "Packs are sold through the ==store-credit purchase shortcode==, so the purchase form can live on any page — a dedicated top-up page, a pricing page, or a members-only offer. Purchased credit lands in the wallet immediately and follows the same history, expiry, and email rules as any other credit.",
      ],
    },
    {
      id: "customer-experience",
      question: "How do customers see and spend their credit?",
      paragraphs: [
        "Customers get a dedicated ==Store Credit page inside WooCommerce My Account== showing their current balance and the full transaction history — every credit added, spent, and expired. There is no separate portal or login; the wallet lives beside their subscriptions, orders, and profile.",
        "Spending is just as direct: ==credit applies at checkout==, reducing what the card is charged. Combined with the customer portal's self-service actions, a customer can receive a refund as credit and put it toward their next purchase without ever contacting support.",
      ],
    },
    {
      id: "expiry-emails",
      question: "Does store credit expire and how are customers told?",
      paragraphs: [
        "Yes — credit expiration is supported, so promotional balances do not sit as an open-ended liability on your books. You control the expiry policy, and an approaching expiry gives customers a concrete reason to come back and spend.",
        "Four dedicated emails cover the credit lifecycle end to end. They are ==Pro emails layered on top of the 21 free email types==, and they follow the same WooCommerce email conventions — templates, placeholders, and overrides included:",
      ],
      bullets: [
        "Credit Added — confirms the new balance after a grant, refund, or pack purchase",
        "Credit Used — receipts the spend when credit is applied to an order",
        "Credit Expiring — warns the customer before a balance is lost",
        "Credit Expired — closes the loop when unused credit lapses",
      ],
    },
    {
      id: "credit-as-retention",
      question: "How does store credit reduce refund losses and churn?",
      paragraphs: [
        "Store credit converts moments that normally end in lost revenue into moments that keep the customer engaged. A refund issued as credit ==keeps 100% of the value in the store==; a downgrade credit gives the customer a reason to return; a goodwill grant resolves a complaint without cash leaving the business.",
        "It also completes the free retention flow: when a save offer fails and a customer does cancel, refunding to credit means the money stays available for a future comeback instead of departing with them. ==Retention and refunds work as one system== — the free core supplies the flow, Pro supplies the wallet.",
      ],
    },
  ],
  steps: [
    {
      title: "Activate ArraySubs Pro",
      description:
        "Store Credit is a Pro module — enable Pro on the store where the free core already runs.",
    },
    {
      title: "Set the credit policy",
      description:
        "Decide how credit is granted, whether balances expire, and turn on the four credit lifecycle emails.",
    },
    {
      title: "Publish a credit-pack page",
      description:
        "Place the store-credit purchase shortcode on a page and configure pack amounts with an optional bonus percentage.",
    },
    {
      title: "Route refunds to credit",
      description:
        "When issuing full, partial, or prorated refunds, choose store credit as the destination and keep the value in-store.",
    },
  ],
  planSplit: {
    free: [
      "Full, partial, and prorated refund workflows",
      "Cancellation retention flow with save offers",
      "Customer portal and My Account foundation the wallet builds on",
      "21 lifecycle email types the credit emails extend",
    ],
    pro: [
      "Per-customer credit wallet with balance and transaction history",
      "Manual credit adjustments with every movement logged",
      "Refund to store credit instead of cash",
      "Prepaid credit packs with an optional bonus percentage",
      "Store-credit purchase shortcode for any page",
      "My Account Store Credit page and credit at checkout",
      "Credit expiration plus Added / Used / Expiring / Expired emails",
    ],
  },
  moduleSlugs: [
    "store-credit",
    "manage-refunds",
    "retention-and-refunds",
    "shortcodes",
    "customer-portal",
  ],
  articleSlugs: [
    "subscription-proration-methods-compared-charge-credit-or-defer",
    "involuntary-churn-recovery-checklist",
    "lifetime-deals-vs-recurring-subscriptions-revenue-support-and-risk",
  ],
  useCaseSlugs: ["store-credit-loyalty", "subscription-boxes", "service-businesses"],
  relatedPillars: [
    "retention-flow-builder",
    "billing-renewals-and-refunds",
    "customer-portal",
  ],
  faq: [
    {
      question: "Is store credit included in the free ArraySubs plugin?",
      answer:
        "No. Store Credit is a Pro module. The free core includes the refund workflows, retention flow, and customer portal it plugs into, but wallets, refund-to-credit, credit packs, and the credit emails require Pro.",
    },
    {
      question: "Can I refund a subscription payment to store credit?",
      answer:
        "Yes. Refund-to-credit works within the standard subscription and order refund workflows, including full, partial, and prorated refunds — you choose credit as the destination instead of the original payment method.",
    },
    {
      question: "Can I add credit to a customer's account manually?",
      answer:
        "Yes. Admins can add or adjust credit for goodwill, promotions, or migrations from another system, and every movement is recorded in the customer's transaction history.",
    },
    {
      question: "How do customers buy store credit?",
      answer:
        "Through credit packs sold via the store-credit purchase shortcode. You set the amounts and an optional bonus percentage — pay a set amount, receive that amount plus the bonus as wallet balance.",
    },
    {
      question: "Where do customers check their credit balance?",
      answer:
        "On a dedicated Store Credit page inside WooCommerce My Account, which shows the current balance and the complete transaction history. The balance then applies at checkout.",
    },
    {
      question: "Does store credit expire?",
      answer:
        "It can. Expiration is supported and pairs with two dedicated emails — Credit Expiring and Credit Expired — so customers are warned before a balance lapses and informed after.",
    },
    {
      question: "Which emails does the Store Credit module send?",
      answer:
        "Four: Credit Added, Credit Used, Credit Expiring, and Credit Expired. They are Pro emails on top of the 21 free email types and follow WooCommerce email conventions for templates and overrides.",
    },
  ],
};
