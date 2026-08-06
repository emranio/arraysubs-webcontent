import { Mail } from "lucide-react";
import type { FeaturePillar } from "./types";

export const emails: FeaturePillar = {
  slug: "emails",
  icon: Mail,
  name: "Emails",
  cardDescription:
    "21 lifecycle email types free — renewal reminders, invoices, failed-payment and trial notices, admin alerts — managed through native WooCommerce templates.",
  tier: "Free + Pro",
  seoTitle: "WooCommerce Subscription Email Notifications",
  metaDescription:
    "WooCommerce subscription email notifications: 21 free lifecycle emails — renewal reminders, invoices, failed-payment and trial notices — plus 4 Pro credit emails.",
  h1: "Send every subscription email from WooCommerce automatically",
  heroSubtitle:
    "ArraySubs ships 21 email types in the free core — renewal reminders, invoices, payment failures, trial and cancellation notices, plus admin alerts — all managed through the WooCommerce email system you already know. Pro adds 4 store credit emails.",
  heroHighlights: [
    "21 free email types",
    "Dunning sequence built in",
    "Native WooCommerce templates",
  ],
  directAnswer:
    "ArraySubs sends 21 subscription email types from the free plugin: 17 customer emails covering signup, trials, renewal reminders and invoices, payment success and failure, SCA verification, card expiry, and every status change, plus 4 admin notifications. All follow WooCommerce email conventions — templates, placeholders, and overrides under WooCommerce → Settings → Emails. Pro adds 4 store credit emails for a total of 25.",
  intro:
    "Subscription revenue runs on communication: a renewal that surprises a customer becomes a dispute, and a failed payment nobody mentions becomes churn. ArraySubs ships ==21 email types in the free core== — 17 customer emails and 4 admin alerts — that fire automatically from the subscription lifecycle. They are ==native WooCommerce emails==, managed under WooCommerce → Settings → Emails with the same templates, placeholders, and overrides as your order emails. Pro adds 4 store credit emails, bringing the set to ==25 with Pro==.",
  stats: [
    { value: "21", label: "Email types in the free core" },
    { value: "17", label: "Customer lifecycle emails" },
    { value: "4", label: "Admin notification emails" },
    { value: "25", label: "Total email types with Pro" },
  ],
  capabilities: [
    {
      title: "Signup & trial emails",
      description:
        "New Subscription, Trial Started, and Trial Converted confirm the relationship at every early milestone.",
      tier: "Free",
    },
    {
      title: "Renewal reminders & invoices",
      description:
        "Renewal Reminder goes out before the charge; Renewal Invoice carries a payment link for manual payment flows.",
      tier: "Free",
    },
    {
      title: "Payment outcome emails",
      description:
        "Payment Successful receipts every renewal; Payment Failed opens the recovery conversation the moment a charge fails.",
      tier: "Free",
    },
    {
      title: "Recovery & status sequence",
      description:
        "Subscription On Hold, Expiring Soon, and Expired keep customers informed through the grace window to the final outcome.",
      tier: "Free",
    },
    {
      title: "Card expiry & SCA verification",
      description:
        "Customer Card Expiring warns before a stale card fails; Renewal Requires Verification handles banks that demand authentication.",
      tier: "Free",
    },
    {
      title: "Cancellation & retention notices",
      description:
        "Cancelled, Pending Cancellation, Reactivated, Retention Discount Accepted, and the Auto-Downgrade notice track every exit and save.",
      tier: "Free",
    },
    {
      title: "Admin alerts",
      description:
        "Four admin emails — new subscription, payment failed, cancelled, pending cancellation — with recipient override.",
      tier: "Free",
    },
    {
      title: "WooCommerce-native templates",
      description:
        "HTML and plain-text templates with theme overrides, a placeholder system for subscription data, and previews before sending.",
      tier: "Free",
    },
    {
      title: "Store credit emails",
      description:
        "Credit Added, Credit Used, Credit Expiring, and Credit Expired cover the Pro credit wallet lifecycle.",
      tier: "Pro",
    },
  ],
  sections: [
    {
      id: "which-emails",
      question: "Which subscription emails does WooCommerce send with ArraySubs?",
      paragraphs: [
        "ArraySubs adds 21 subscription email types to WooCommerce in the free core — 17 for customers and 4 for admins — covering the full lifecycle from first signup to final expiry. Pro adds 4 store credit emails for ==25 types in total==.",
        "Every event that changes a subscription has a matching message, so customers are never surprised by a charge, a hold, or a status change. The free set groups into five families:",
      ],
      bullets: [
        "Signup & trial: New Subscription, Trial Started, Trial Converted",
        "Renewal & payment: Renewal Reminder, Renewal Invoice, Payment Successful, Payment Failed",
        "Recovery & verification: Renewal Requires Verification (SCA), Subscription On Hold, Customer Card Expiring, Auto-Downgrade notice",
        "Lifecycle & retention: Expiring Soon, Expired, Cancelled, Pending Cancellation, Reactivated, Retention Discount Accepted",
        "Admin alerts: new subscription, payment failed, cancelled, pending cancellation",
      ],
    },
    {
      id: "renewal-reminders",
      question: "Can I send renewal reminder emails before charging?",
      paragraphs: [
        "Yes — the Renewal Reminder email goes out ==before the renewal charge==, so customers learn about the payment from you rather than from a card statement. Advance notice is the cheapest dispute prevention a subscription store has, and on longer billing cycles it is what customers expect.",
        "For manual payment flows, the ==Renewal Invoice email== follows with a payment link so the customer can settle the renewal themselves. Both emails pull live data from the subscription record — plan, amount, date — through the placeholder system, so the message always matches what will actually be charged.",
      ],
    },
    {
      id: "failed-payment-emails",
      question: "What emails go out when a payment fails?",
      paragraphs: [
        "The moment a renewal charge fails, the customer receives the ==Payment Failed email== and the admin gets a matching alert. If the subscription moves into the grace window, the Subscription On Hold email tells the customer access is at risk and payment needs attention.",
        "From there the sequence runs to a conclusion: Pro's automatic retry sends recovery notices around each new attempt, and if the subscription is never rescued, ==Expiring Soon and Expired== close out the timeline. Two emails work upstream of failure entirely — Customer Card Expiring warns before a saved card causes the failure, and Renewal Requires Verification steps in when a bank demands SCA authentication.",
      ],
    },
    {
      id: "customize-emails",
      question: "Can I customize the subscription email templates?",
      paragraphs: [
        "Yes — every ArraySubs email follows ==WooCommerce email conventions==, so customization works exactly like your order emails. Each type is managed under WooCommerce → Settings → Emails, where you can enable or disable it, edit the subject and heading, and preview the result.",
        "Each email ships as an ==HTML and plain-text template== that your theme can override, and the placeholder system injects subscription data — plan, amount, dates — into subjects and bodies. Admin emails also support a recipient override, so alerts can route to a shared operations inbox instead of the site admin address.",
      ],
    },
    {
      id: "admin-notifications",
      question: "Which events notify the store admin?",
      paragraphs: [
        "Four admin emails ship free: ==Admin New Subscription, Admin Payment Failed, Admin Subscription Cancelled, and Admin Subscription Pending Cancellation==. Together they cover the moments worth knowing about the minute they happen — new revenue, revenue at risk, and revenue walking out the door.",
        "Payment Failed and Pending Cancellation are the operational two: a failed payment may deserve a support touch before the recovery window closes, and a pending cancellation flags a save opportunity while the subscription is still active. With the recipient override, those alerts land with ==the team that acts on them==.",
      ],
    },
    {
      id: "email-vs-automation",
      question: "Do I need a separate email automation tool?",
      paragraphs: [
        "Not for lifecycle email — ArraySubs emails fire from the ==same subscription records== that drive renewals, grace periods, retry attempts, and the retention flow, so there is no external automation platform to connect or keep in sync. When a subscription changes state, the matching email goes out; there is no webhook lag and no mapping table to maintain.",
        "A marketing platform still earns its keep for campaigns, broadcasts, and newsletters — that is a different job. The transactional layer, from ==renewal reminder through dunning to cancellation notice==, is complete out of the box and free.",
      ],
    },
  ],
  steps: [
    {
      title: "Install ArraySubs free",
      description:
        "All 21 email types activate with the free core — no separate email plugin or automation tool required.",
    },
    {
      title: "Open WooCommerce → Settings → Emails",
      description:
        "Review the ArraySubs email types alongside your order emails, and enable or disable each to match your policy.",
    },
    {
      title: "Adjust subjects, content, and recipients",
      description:
        "Edit subjects and headings, use placeholders for subscription data, override templates in your theme, and set admin recipients.",
    },
    {
      title: "Preview and test the sequence",
      description:
        "Preview each template, then run a test subscription through signup, renewal, and a failed payment to watch the sequence fire.",
    },
  ],
  planSplit: {
    free: [
      "21 email types: 17 customer + 4 admin",
      "Renewal Reminder before the charge and Renewal Invoice for manual flows",
      "Payment Failed, On Hold, Expiring Soon, and Expired recovery sequence",
      "Customer Card Expiring warnings and SCA verification requests",
      "Retention Discount Accepted and Auto-Downgrade notices",
      "WooCommerce-native templates, placeholders, overrides, and previews",
    ],
    pro: [
      "4 store credit emails: Credit Added, Used, Expiring, Expired — 25 types total",
      "Automatic failed-payment retry that sends recovery notices between failure and expiry",
      "Auto-downgrade automation that triggers the downgrade notice email",
    ],
  },
  moduleSlugs: [
    "emails",
    "billing-and-renewals",
    "grace-period-recovery",
    "auto-retry-failed-payments",
    "retention-and-refunds",
  ],
  articleSlugs: [
    "failed-payment-email-sequence-a-message-by-message-playbook",
    "subscription-dunning-strategy-timing-messages-and-stop-rules",
    "expired-cards-and-subscription-recovery",
  ],
  useCaseSlugs: [
    "subscription-support-operations",
    "saas-digital-products",
    "subscription-boxes",
  ],
  relatedPillars: [
    "billing-renewals-and-refunds",
    "retention-flow-builder",
    "audits-and-logs",
  ],
  faq: [
    {
      question: "How many subscription emails does ArraySubs send for free?",
      answer:
        "21 types: 17 customer emails across signup, trials, renewals, payments, recovery, and cancellation, plus 4 admin notifications. Pro adds 4 store credit emails for 25 in total.",
    },
    {
      question: "Does ArraySubs send a renewal reminder before charging?",
      answer:
        "Yes. The Renewal Reminder email goes out ahead of the renewal charge, and manual payment flows follow with a Renewal Invoice email containing a payment link.",
    },
    {
      question: "What email does a customer get when their payment fails?",
      answer:
        "The Payment Failed email fires immediately, followed by Subscription On Hold if the subscription enters the grace window. Pro's automatic retry adds recovery notices, and Expiring Soon and Expired complete the sequence if payment is never recovered.",
    },
    {
      question: "Can I edit the subscription email templates?",
      answer:
        "Yes. Every email follows WooCommerce conventions: manage it under WooCommerce → Settings → Emails, edit subjects and headings, override the HTML and plain-text templates in your theme, and use placeholders for subscription data.",
    },
    {
      question: "Can subscription alerts go to a different admin address?",
      answer:
        "Yes. Admin emails support a recipient override, so new-subscription, failed-payment, and cancellation alerts can route to a shared billing or support inbox.",
    },
    {
      question: "Does ArraySubs email customers before a saved card expires?",
      answer:
        "Yes. The Customer Card Expiring email warns customers to update their payment method before an expired card turns into a failed renewal — recovery that happens before the failure exists.",
    },
    {
      question: "Do I need Mailchimp or another automation tool for subscription emails?",
      answer:
        "Not for lifecycle messages. ArraySubs emails fire from the same subscription records as renewals and the retention flow, so the transactional layer is complete and free. Marketing platforms remain useful for campaigns and newsletters.",
    },
  ],
};
