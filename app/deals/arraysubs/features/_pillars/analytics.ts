import { ChartColumn } from "lucide-react";
import type { FeaturePillar } from "./types";

export const analytics: FeaturePillar = {
  slug: "analytics",
  icon: ChartColumn,
  name: "Analytics",
  cardDescription:
    "Track MRR, churn, ARPU, and revenue at risk — free subscription reports plus a Pro KPI dashboard inside WooCommerce Analytics.",
  tier: "Free + Pro",
  seoTitle: "WooCommerce Subscription Analytics — MRR, Churn & LTV",
  metaDescription:
    "WooCommerce subscription analytics with free reports plus a Pro dashboard: 10 KPI cards for MRR, churn rate, ARPU, revenue at risk, and trial conversions.",
  h1: "Subscription analytics that live inside WooCommerce",
  heroSubtitle:
    "ArraySubs reports the numbers a subscription business runs on — MRR, churn, ARPU, revenue at risk — from free reports in the plugin to a Pro KPI dashboard inside native WooCommerce Analytics, all read from your own subscription records.",
  heroHighlights: [
    "10 Pro KPI cards",
    "Free retention analytics",
    "Data stays in WordPress",
  ],
  directAnswer:
    "ArraySubs reports on subscription performance directly inside WordPress. The free core includes a subscription Reports hub and Retention Analytics covering cancellation reasons, churn trends, and saved revenue. Pro extends the native WooCommerce Analytics dashboard with 10 subscription KPI cards — including MRR, churn rate, ARPU, revenue at risk, and trial conversions — plus subscription-aware Revenue, Customers, Orders, and Products reports.",
  intro:
    "A subscription store lives or dies on trends: is MRR growing, who is churning, which revenue is at risk this month. ArraySubs answers those questions ==without leaving WordPress== — the free core ships a subscription Reports hub and Retention Analytics, and Pro extends the native WooCommerce Analytics dashboard with ==10 subscription KPI cards== and subscription-aware Revenue, Customers, Orders, and Products reports. Every number reads from the ==same subscription records== that billing, the portal, and retention flows write, so the reports describe what the renewal engine will actually do.",
  stats: [
    { value: "10", label: "Pro KPI performance cards" },
    { value: "4", label: "Extended WooCommerce Analytics reports" },
    { value: "2", label: "Free reporting surfaces" },
    { value: "0", label: "External analytics services required" },
  ],
  capabilities: [
    {
      title: "Subscription Reports hub",
      description:
        "Core subscription reports inside the plugin — the free starting point for growth and revenue questions.",
      tier: "Free",
    },
    {
      title: "Retention Analytics",
      description:
        "Cancellation reasons breakdown, save-offer acceptance, churn trends, product-level churn, and the revenue your save offers retained.",
      tier: "Free",
    },
    {
      title: "10 KPI performance cards",
      description:
        "A subscription overview in WooCommerce Analytics: Active Subscriptions, MRR, New and Churned Subscriptions, Churn Rate, and more.",
      tier: "Pro",
    },
    {
      title: "Extended WooCommerce Analytics reports",
      description:
        "Subscription-aware versions of the Revenue, Customers, Orders, and Products/Variations reports you already use.",
      tier: "Pro",
    },
    {
      title: "Renewal vs parent order classification",
      description:
        "Order-type classification separates first purchases from renewal orders in reporting and the order list.",
      tier: "Pro",
    },
    {
      title: "Lifetime spend tracking",
      description:
        "Per-customer lifetime spend is tracked and can drive member-access conditions — like VIP access at a spend threshold.",
      tier: "Free",
    },
    {
      title: "Member Insight",
      description:
        "A unified per-customer dashboard: look up any member and see their profile and commerce overview on one screen.",
      tier: "Pro",
    },
    {
      title: "Gateway Health monitoring",
      description:
        "Webhook status and connection monitoring per gateway — the operational-log side of the analytics story.",
      tier: "Pro",
    },
  ],
  sections: [
    {
      id: "what-analytics",
      question: "What subscription analytics do I get in WooCommerce?",
      paragraphs: [
        "Two reporting surfaces ship free: a subscription ==Reports hub inside the plugin== for core subscription reports, and Retention Analytics for cancellation reasons, save-offer acceptance, churn trends, product-level churn, and saved revenue. That is real visibility into growth and churn before you spend anything.",
        "ArraySubs Pro adds the dashboard layer: a subscription overview inside native WooCommerce Analytics with ==10 KPI performance cards==, plus subscription-aware versions of the Revenue, Customers, Orders, and Products reports. Because Pro extends WooCommerce Analytics rather than replacing it, your team keeps working in reporting screens they already know.",
      ],
    },
    {
      id: "mrr",
      question: "How is MRR tracked for WooCommerce subscriptions?",
      paragraphs: [
        "MRR (Monthly Recurring Revenue) is one of the ==10 KPI performance cards== ArraySubs Pro adds to the WooCommerce Analytics dashboard, next to Active Subscriptions, New Subscriptions, and Renewal Revenue. The cards read from your live subscription records, so MRR reflects what the renewal engine is actually set to bill — not a spreadsheet you reconcile by hand.",
        "The surrounding cards give MRR its context: how many subscriptions feed it, what churned out of it, and which portion is in danger. The full Pro card set:",
      ],
      bullets: [
        "Active Subscriptions, New Subscriptions, and Churned Subscriptions",
        "MRR (Monthly Recurring Revenue) and Renewal Revenue",
        "Churn Rate and Revenue at Risk",
        "Trial Conversions, ARPU (Average Revenue Per User), and Retention Saves",
      ],
    },
    {
      id: "churn",
      question: "How do I measure subscription churn and retention?",
      paragraphs: [
        "Churn is measured on two surfaces: the Pro dashboard reports ==Churned Subscriptions and Churn Rate== as KPI cards beside your revenue numbers, with Retention Saves counting the cancellations your save offers reversed. One glance tells you whether the leak is growing and whether the interventions are working.",
        "The free Retention Analytics module explains the why behind the rate: a ==cancellation reasons breakdown==, save-offer acceptance, churn trends over time, product-level churn, and the revenue those saves retained. Measuring churn and reducing it run on the same data — the retention flow writes the outcomes that the analytics report.",
      ],
    },
    {
      id: "lifetime-value",
      question: "Can I see customer lifetime value?",
      paragraphs: [
        "Yes — as an analysis built from real inputs, not as a single named report. ArraySubs reports ==ARPU (Average Revenue Per User)== on the Pro dashboard, tracks lifetime spend per customer, and charts churn trends in Retention Analytics; together those are exactly what a lifetime-value calculation is made of.",
        "Lifetime spend does more than sit in a report: it can ==drive member-access conditions==, so a customer who crosses a spend threshold can automatically qualify for VIP content or member pricing. And with Member Insight (Pro), staff see any customer's full picture — profile, subscriptions, and commerce overview — on one screen.",
      ],
    },
    {
      id: "renewal-revenue",
      question: "How do renewal orders show up in WooCommerce reports?",
      paragraphs: [
        "Renewal orders are classified separately from parent orders, so subscription-aware reports can split first purchases from the recurring revenue that follows. In the extended Orders report and the order list, ==order-type classification== keeps new-business revenue and renewal revenue from blurring together — the distinction every subscription metric depends on.",
        "On the dashboard, Renewal Revenue reports what renewals actually collected, while ==Revenue at Risk== flags recurring revenue that is in danger of churning rather than already lost. That is the difference between reading last month and acting on this one.",
      ],
    },
    {
      id: "data-privacy",
      question: "Where does the analytics data live?",
      paragraphs: [
        "In your WordPress database. ArraySubs reads from the ==same subscription records== that billing, the customer portal, and retention flows write — there is no external analytics service, no account to connect, and no customer data leaving your site.",
        "The operational logs follow the same rule. Gateway Health (Pro) records webhook status and gateway events, and the audit and scheduled-job logs (Pro) track what ran and who changed what — ==all stored in WordPress== alongside the subscriptions they describe.",
      ],
    },
  ],
  steps: [
    {
      title: "Install ArraySubs free",
      description:
        "Install the free core and the subscription Reports hub and Retention Analytics start reporting from your subscription records.",
    },
    {
      title: "Open the Reports hub",
      description:
        "Review core subscription reports and the retention breakdown — cancellation reasons, save-offer acceptance, and churn trends.",
    },
    {
      title: "Activate Pro for the KPI dashboard",
      description:
        "ArraySubs Pro adds the subscription overview with 10 performance cards to your native WooCommerce Analytics dashboard.",
    },
    {
      title: "Work the extended reports",
      description:
        "Use the subscription-aware Revenue, Customers, Orders, and Products reports to separate renewal revenue from new business.",
    },
  ],
  planSplit: {
    free: [
      "Subscription Reports hub inside the plugin",
      "Retention Analytics: cancellation reasons and save-offer acceptance",
      "Churn trends, product-level churn, and saved-revenue reporting",
      "Lifetime spend tracked per customer — usable in access rules",
    ],
    pro: [
      "Subscription overview in WooCommerce Analytics with 10 KPI cards",
      "MRR, Churn Rate, ARPU, Revenue at Risk, Trial Conversions, Retention Saves",
      "Subscription-aware Revenue, Customers, Orders, and Products reports",
      "Order-type classification: parent orders vs renewal orders",
      "Member Insight: unified per-customer dashboard",
      "Gateway Health webhook and connection monitoring",
    ],
  },
  moduleSlugs: [
    "analytics",
    "retention-analytics",
    "member-insight",
    "gateway-health",
    "audits-and-logs",
  ],
  articleSlugs: [
    "how-woocommerce-subscription-renewals-work",
    "subscription-payment-failure-codes-a-practical-triage-guide",
    "involuntary-churn-recovery-checklist",
  ],
  useCaseSlugs: [
    "saas-digital-products",
    "subscription-support-operations",
    "content-publishers",
  ],
  relatedPillars: ["audits-and-logs", "retention-flow-builder", "manage-subscriptions"],
  faq: [
    {
      question: "Does ArraySubs track MRR for WooCommerce subscriptions?",
      answer:
        "Yes. ArraySubs Pro adds a subscription overview to the native WooCommerce Analytics dashboard, and MRR (Monthly Recurring Revenue) is one of its 10 KPI performance cards. The number reads from your live subscription records, not from a separate analytics service.",
    },
    {
      question: "Are subscription reports free in ArraySubs?",
      answer:
        "Two surfaces are free: the subscription Reports hub inside the plugin and Retention Analytics, which covers cancellation reasons, save-offer acceptance, churn trends, product-level churn, and saved revenue. Pro adds the KPI dashboard and the extended WooCommerce Analytics reports.",
    },
    {
      question: "How do I measure churn rate for WooCommerce subscriptions?",
      answer:
        "With Pro, Churn Rate and Churned Subscriptions appear as KPI cards on the WooCommerce Analytics subscription overview. The free Retention Analytics module adds the reasons behind the rate — which cancellation reasons customers pick and which products churn most.",
    },
    {
      question: "Can I see the lifetime value of a subscriber?",
      answer:
        "There is no single named LTV report; instead ArraySubs reports ARPU, tracks lifetime spend per customer, and charts churn trends — the inputs a lifetime-value analysis needs. Lifetime spend can even drive member-access rules, like granting VIP pricing at a spend threshold.",
    },
    {
      question: "Do renewal orders show separately from new orders?",
      answer:
        "Yes. Order-type classification separates parent orders from renewal orders in reporting and the order list, and the Pro dashboard reports Renewal Revenue as its own KPI card.",
    },
    {
      question: "What is Revenue at Risk?",
      answer:
        "Revenue at Risk is a Pro KPI card that flags recurring revenue in danger of churning before it is actually lost, so you can intervene while the subscription is still active. It sits alongside Retention Saves, which counts the cancellations your save offers recovered.",
    },
    {
      question: "Does ArraySubs send analytics data to a third-party service?",
      answer:
        "No. Every report reads from subscription records stored in your WordPress database — the same records that billing, the customer portal, and retention flows write. There is no external analytics account to connect and no data leaves your site.",
    },
  ],
};
