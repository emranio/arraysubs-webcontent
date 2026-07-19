import { ClipboardList } from "lucide-react";
import type { FeaturePillar } from "./types";

export const auditsAndLogs: FeaturePillar = {
  slug: "audits-and-logs",
  icon: ClipboardList,
  name: "Audits & Logs",
  cardDescription:
    "Trace every subscription change — a permanent notes timeline and free failure logs, plus Pro activity audits, job logs, and gateway health.",
  tier: "Free + Pro",
  seoTitle: "WooCommerce Subscription Audit Logs & Activity Trail",
  metaDescription:
    "WooCommerce subscription audit logs: free renewal-failure and portal logs plus Pro activity audits, scheduled job logs, and gateway webhook monitoring.",
  h1: "Keep an audit trail on every WooCommerce subscription",
  heroSubtitle:
    "ArraySubs keeps subscription operations explainable: a permanent per-subscription timeline and free troubleshooting logs in the core, with Pro adding activity audits, scheduled-job logs, and per-gateway webhook monitoring.",
  heroHighlights: [
    "Permanent notes timeline",
    "Free failure logs",
    "Pro audits & job logs",
  ],
  directAnswer:
    "ArraySubs keeps an audit trail on every WooCommerce subscription. The free core includes Subscription Notes — a permanent per-subscription timeline of lifecycle, renewal, and gateway events — plus logs for renewal failures, portal action failures, and access-rule conflicts. Pro adds Activity Audits that record who changed what and when, Scheduled Job Logs for the background jobs that run renewals, and Gateway Health for webhook monitoring.",
  intro:
    "When a customer asks \"why was I charged?\", the answer should come from a record, not a reconstruction. ArraySubs writes a ==permanent timeline on every subscription== — automatic lifecycle, renewal, and gateway events plus private admin notes and customer-visible notes — and backs it with ==free troubleshooting logs== for renewal failures, portal action failures, and access-rule conflicts. Pro adds the accountability layer: activity audits, ==scheduled-job logs==, and per-gateway webhook health. Support answers from the timeline; operations sees where a renewal stopped.",
  stats: [
    { value: "3", label: "Free failure & conflict logs" },
    { value: "3", label: "Note streams per subscription" },
    { value: "2", label: "Pro log systems — audits & jobs" },
    { value: "1", label: "Gateway Health dashboard" },
  ],
  capabilities: [
    {
      title: "Subscription Notes timeline",
      description:
        "Every subscription keeps a permanent timeline of automatic lifecycle, renewal, and gateway events — the first place support looks.",
      tier: "Free",
    },
    {
      title: "Private & customer-visible notes",
      description:
        "Staff add internal context customers never see, or publish a note to the customer-facing subscription record when it helps.",
      tier: "Free",
    },
    {
      title: "Renewal Failures log",
      description:
        "See which renewals failed in one list, so billing problems surface as work items instead of surprise support tickets.",
      tier: "Free",
    },
    {
      title: "Portal Action Failures log",
      description:
        "When a customer's self-service action fails in the portal, the failure is logged for support to chase down.",
      tier: "Free",
    },
    {
      title: "Access-Rule Conflicts detector",
      description:
        "Flags member-access rules that fight each other — before members start reporting content they can't reach.",
      tier: "Free",
    },
    {
      title: "Activity Audits",
      description:
        "A filterable record of who changed what and when across subscription operations — accountability for multi-staff stores.",
      tier: "Pro",
    },
    {
      title: "Scheduled Job Logs",
      description:
        "Visibility into the Action Scheduler jobs behind renewals, retries, and expirations: what ran, what's queued, what failed.",
      tier: "Pro",
    },
    {
      title: "Gateway Health",
      description:
        "Webhook status and connection monitoring per gateway, with gateway event logs and a Stripe webhook refresh control.",
      tier: "Pro",
    },
  ],
  sections: [
    {
      id: "what-is-audit-trail",
      question: "What is a subscription audit trail?",
      paragraphs: [
        "A subscription audit trail is the recorded history of everything that happened to a subscription — lifecycle changes, renewal and gateway events, and the staff actions behind them. Subscriptions live for years and pass through many hands, so ==the record has to outlast anyone's memory== of what was done.",
        "ArraySubs builds the trail in layers: free Subscription Notes write the per-subscription timeline automatically, free logs catch renewal failures, portal action failures, and access-rule conflicts, and Pro adds ==activity audits and scheduled-job logs== across the whole operation. When a customer disputes a charge, support answers from the timeline instead of guessing.",
      ],
    },
    {
      id: "activity-audits",
      question: "Can I see which admin changed a subscription?",
      paragraphs: [
        "Yes — Activity Audits (Pro) record ==who changed what and when== across subscription operations. When a renewal date moves or a plan is switched, the trail shows which account did it, turning \"who touched this subscription?\" from an investigation into a lookup.",
        "For stores with more than one admin, that is the difference between accountability and archaeology. Disputes about a refund, a mis-edited record, or an unexpected cancellation resolve from ==a filterable record==, and the same trail sits alongside the automatic events those changes triggered.",
      ],
    },
    {
      id: "renewal-failures",
      question: "How do I troubleshoot a renewal that didn't run?",
      paragraphs: [
        "Start with the free ==Renewal Failures log== — it shows renewals that didn't complete, so you immediately know whether you are looking at one subscription or a pattern. The affected subscription's own timeline adds the gateway events around the failure.",
        "With Pro, Scheduled Job Logs go a level deeper: renewals, retries, and expirations run as background jobs through Action Scheduler, and the logs show ==what ran, what's queued, and what failed==. A renewal that \"didn't happen\" stops being a mystery — you can see exactly where in the chain it stopped.",
      ],
    },
    {
      id: "portal-failures",
      question: "How do I debug customer portal errors?",
      paragraphs: [
        "Start with the free ==Portal Action Failures log==, which records customer self-service actions that didn't complete — so support sees the failure before the customer writes in, with the subscription it belongs to.",
        "Then pair it with Login as User (free): open the customer's own frontend session without a password, reproduce what they hit, and check it against the log entry and the subscription's timeline. Debugging from ==the customer's actual session== beats debugging from a description of it.",
      ],
    },
    {
      id: "webhook-health",
      question: "How do I monitor payment gateway webhooks?",
      paragraphs: [
        "Gateway Health (Pro) monitors ==webhook status and connections per gateway== — the plumbing automatic renewals depend on. Status cards show each gateway's condition, alongside subscription counts per gateway, the webhook URLs you need for setup, and gateway event logs for diagnosis.",
        "Webhook problems are the silent kind: payments succeed at the gateway while your store never hears about them. Gateway Health surfaces the disconnect, and a ==Stripe webhook refresh control== re-establishes the connection without leaving wp-admin.",
      ],
    },
    {
      id: "notes-timeline",
      question: "What history is kept on each subscription record?",
      paragraphs: [
        "Every subscription record keeps ==three note streams==: an automatic timeline of lifecycle, renewal, and gateway events; private admin notes; and customer-visible notes for messages that belong on the record the customer sees.",
        "The timeline is permanent, so a subscription stays explainable years later — the product engine even tracks ==deleted products and cached product data==, so an old subscription still tells you what it was for. Notes ship free and run on every record.",
      ],
      bullets: [
        "Automatic events: lifecycle, renewal, and gateway activity, logged without admin work",
        "Private admin notes: internal context customers never see",
        "Customer-visible notes: published to the customer-facing subscription record",
      ],
    },
  ],
  steps: [
    {
      title: "Install ArraySubs free",
      description:
        "Subscription Notes and the troubleshooting logs are active from the first subscription — no configuration required.",
    },
    {
      title: "Open the troubleshooting logs",
      description:
        "Renewal failures, portal action failures, and access-rule conflicts each have a dedicated free log to work from.",
    },
    {
      title: "Activate Pro for audits and job logs",
      description:
        "Activity Audits record who changed what and when; Scheduled Job Logs show the background jobs behind renewals and retries.",
    },
    {
      title: "Monitor gateways from Gateway Health",
      description:
        "Watch webhook status and connections per gateway, review event logs, and refresh the Stripe webhook when needed.",
    },
  ],
  planSplit: {
    free: [
      "Subscription Notes: permanent per-subscription timeline",
      "Automatic lifecycle, renewal, and gateway event logging",
      "Private admin notes and customer-visible notes",
      "Renewal Failures log",
      "Portal Action Failures log",
      "Access-Rule Conflicts detector",
      "Login as User for support troubleshooting",
    ],
    pro: [
      "Activity Audits: who changed what and when",
      "Filterable audit records across subscription operations",
      "Scheduled Job Logs: what ran, what's queued, what failed",
      "Action Scheduler visibility for renewals, retries, and expirations",
      "Gateway Health: per-gateway webhook status and connection monitoring",
      "Gateway event logs with a Stripe webhook refresh control",
    ],
  },
  moduleSlugs: [
    "audits-and-logs",
    "gateway-health",
    "subscription-notes",
    "manage-subscriptions",
    "login-as-user",
  ],
  articleSlugs: [
    "subscription-payment-failure-codes-a-practical-triage-guide",
    "what-happens-when-a-subscription-payment-fails",
    "changing-a-subscription-renewal-date-safely",
  ],
  useCaseSlugs: [
    "subscription-support-operations",
    "b2b-wholesale-memberships",
    "saas-digital-products",
  ],
  relatedPillars: ["analytics", "manage-subscriptions", "payment-gateways"],
  faq: [
    {
      question: "Does WooCommerce keep an audit log of subscription changes?",
      answer:
        "WooCommerce itself has no subscription records, so there is nothing native to log. ArraySubs writes a permanent notes timeline on every subscription in the free core, and Pro adds Activity Audits that record who changed what and when across subscription operations.",
    },
    {
      question: "Which logs are free and which need Pro?",
      answer:
        "Free: Subscription Notes plus the Renewal Failures, Portal Action Failures, and Access-Rule Conflicts logs. Pro: Activity Audits, Scheduled Job Logs, and Gateway Health webhook monitoring.",
    },
    {
      question: "How do I find out why a renewal didn't run?",
      answer:
        "Check the free Renewal Failures log first, then the subscription's own timeline for the gateway events around it. With Pro, Scheduled Job Logs show the background job chain — what ran, what's queued, and what failed — so you can see exactly where the renewal stopped.",
    },
    {
      question: "Can customers see admin notes on their subscription?",
      answer:
        "No. Private admin notes stay internal. Customer-visible notes are a separate stream you publish deliberately to the customer-facing subscription record.",
    },
    {
      question: "What are Scheduled Job Logs?",
      answer:
        "Renewals, retries, and expirations run as background jobs through Action Scheduler. Scheduled Job Logs (Pro) make that layer visible — execution history with status and errors — so scheduled work is verifiable instead of assumed.",
    },
    {
      question: "How do I know my payment gateway webhooks are working?",
      answer:
        "Gateway Health (Pro) shows webhook status and connection monitoring per gateway, along with gateway event logs and subscription counts per gateway. For Stripe, a webhook refresh control re-establishes the connection from wp-admin.",
    },
    {
      question: "What happens to subscription history when a product is deleted?",
      answer:
        "The subscription product engine tracks product lifecycle handling, including deleted products and cached product data, so old subscriptions stay explainable. The notes timeline on the subscription itself is permanent.",
    },
  ],
};
