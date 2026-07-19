import { HeartHandshake } from "lucide-react";
import type { FeaturePillar } from "./types";

export const retentionFlowBuilder: FeaturePillar = {
  slug: "retention-flow-builder",
  icon: HeartHandshake,
  name: "Retention Flow Builder",
  cardDescription:
    "Intercept every cancel attempt with a free 3-step flow — capture the reason, present a targeted save offer, and measure the revenue you keep.",
  tier: "Free + Pro",
  seoTitle: "WooCommerce Subscription Retention & Cancellation Flow",
  metaDescription:
    "WooCommerce subscription retention built in free: a 3-step cancellation flow captures reasons, shows save offers, and tracks saved revenue. Pro adds payment retry.",
  h1: "Save WooCommerce subscriptions at the moment of cancellation",
  heroSubtitle:
    "ArraySubs intercepts every cancel attempt in the customer portal with a free 3-step retention flow — capture the cancellation reason, present a targeted save offer, and only then confirm — with free analytics on which offers actually keep revenue.",
  heroHighlights: [
    "3-step cancellation save flow",
    "4 targeted save offers",
    "Free retention analytics",
  ],
  directAnswer:
    "ArraySubs includes a cancellation retention flow in the free plugin: when a customer tries to cancel from the portal, a 3-step flow captures the cancellation reason, presents a targeted save offer — discount, pause, downgrade, or contact support — and only then shows the final confirmation. Free Retention Analytics reports cancellation reasons, offer acceptance, and saved revenue. Pro adds involuntary-churn automation around it: automatic failed-payment retry and auto-downgrade to a fallback plan.",
  intro:
    "Most subscription tools treat cancellation as a single destructive click; ArraySubs treats it as a conversation. The free retention flow ==intercepts every cancel attempt== in the customer portal, asks why, and answers that reason with a targeted save offer before the final confirmation. Because reasons and offer outcomes are stored on the subscription record, ==free Retention Analytics== shows exactly which offers keep revenue and which products drive churn. All of it is built into the plugin, not a separate churn add-on.",
  stats: [
    { value: "3", label: "Steps from cancel click to confirmation" },
    { value: "4", label: "Save-offer types" },
    { value: "7", label: "Default cancellation reasons" },
    { value: "$0", label: "The retention flow ships free" },
  ],
  capabilities: [
    {
      title: "Cancellation reason capture",
      description:
        "Ask why before the cancel completes — 7 default reasons ship out of the box, and each answer is stored on the subscription record.",
      tier: "Free",
    },
    {
      title: "Targeted save offers",
      description:
        "Present a discount, a pause, a downgrade, or a contact-support handoff as the middle step of every cancellation.",
      tier: "Free",
    },
    {
      title: "Conditional offer targeting",
      description:
        "Show each offer only for the cancellation reasons and plans you choose, so discounts go where they can actually change the outcome.",
      tier: "Free",
    },
    {
      title: "Final-confirmation guardrail",
      description:
        "Customers reach the confirm button only after the reason and offer steps — one honest intervention, never a blocked exit.",
      tier: "Free",
    },
    {
      title: "Retention Analytics",
      description:
        "A free reporting module for cancellation reasons, save-offer acceptance, churn trends, product-level churn, and saved revenue.",
      tier: "Free",
    },
    {
      title: "Pause and skip levers",
      description:
        "Pause / vacation mode and skip-next-renewal give customers lighter alternatives before they ever reach the cancel button.",
      tier: "Free",
    },
    {
      title: "2-phase grace period",
      description:
        "Failed payments move into a structured recovery window that keeps access alive instead of ending the subscription immediately.",
      tier: "Free",
    },
    {
      title: "Automatic failed-payment retry",
      description:
        "Reschedule failed renewal charges automatically and notify the customer while the subscription stays recoverable.",
      tier: "Pro",
    },
    {
      title: "Auto-downgrade on failed recovery",
      description:
        "When retries are exhausted, move the customer to a fallback plan you choose instead of cancelling outright.",
      tier: "Pro",
    },
  ],
  sections: [
    {
      id: "what-is-retention-flow",
      question: "What is a subscription cancellation flow?",
      paragraphs: [
        "A subscription cancellation flow is a guided sequence that runs between a customer clicking cancel and the cancellation actually happening — instead of ending the subscription instantly, it asks why and offers an alternative. ArraySubs ships this flow in the free core as ==three steps==: capture the cancellation reason, present a targeted save offer, then show the final confirmation.",
        "The flow intercepts cancel attempts in the customer portal, so it catches churn at the exact moment intent is highest. It is ==built into the plugin, not a separate add-on== — reasons, offers, and outcomes live on the same subscription records that billing and renewals already use, so there is nothing to integrate or sync.",
      ],
    },
    {
      id: "cancellation-reasons",
      question: "How do I capture why customers cancel?",
      paragraphs: [
        "ArraySubs asks for a reason as the first step of every cancellation, before the customer ever sees a confirm button. ==Seven default cancellation reasons== ship out of the box — including a temporary-pause reason for customers who never wanted to leave permanently — so you collect structured churn data from day one.",
        "Each selected reason is ==stored on the subscription record==, not in a detached survey tool. Support sees the reason in context, Retention Analytics aggregates reasons across products and time, and save offers can react to the specific reason the customer picked.",
      ],
    },
    {
      id: "save-offers",
      question: "Which save offers can I show before a cancellation?",
      paragraphs: [
        "ArraySubs supports four save-offer types: a discount, a pause, a downgrade, and a contact-support handoff. Each answers a different reason for leaving — ==price objections get a discount, temporary situations get a pause==, over-buyers get a smaller plan, and fixable problems get a human.",
        "Offers are conditional: you decide which cancellation reasons and which plans each offer appears for, so a discount is never spent on someone leaving for an unrelated reason. When a customer accepts a retention discount, a ==confirmation email goes out automatically== — one of the 21 free email types.",
      ],
      bullets: [
        "Discount — counter price-driven cancellations with a targeted offer",
        "Pause — give temporary situations a break instead of an ending",
        "Downgrade — move over-provisioned customers to a plan that fits",
        "Contact support — route fixable problems to a person before they become churn",
      ],
    },
    {
      id: "voluntary-vs-involuntary",
      question: "How do I reduce involuntary churn from failed payments?",
      paragraphs: [
        "Use the recovery stack that runs alongside the retention flow — involuntary churn comes from failed payments rather than decisions, so it never reaches a cancel button and has to be fought on the billing side. The free core starts with a ==2-phase grace period== that keeps access alive after a failed renewal instead of cutting the customer off while they fix a card.",
        "Pro adds the automation on top: ==automatic failed-payment retry== reschedules the charge and notifies the customer, and if recovery still fails, auto-downgrade moves the subscription to a fallback plan you choose instead of cancelling it. A downgraded customer keeps a billing relationship you can win back; a cancelled one is gone.",
      ],
    },
    {
      id: "pause-as-retention",
      question: "Is pausing better than cancelling?",
      paragraphs: [
        "For any customer whose reason is temporary, yes — a pause preserves the subscription record, history, and billing relationship, while a cancellation ends all three. That is why ArraySubs includes a temporary-pause option among the default cancellation reasons and offers ==pause as one of the four save offers==.",
        "The free core also ships two lighter levers customers can use before they ever consider cancelling: ==pause / vacation mode== stops renewals for a break and resumes later, and skip-next-renewal moves one billing cycle forward while keeping the schedule intact. Both are self-service in the customer portal, so a box subscriber going on vacation never has to choose between paying and leaving.",
      ],
    },
    {
      id: "measure-retention",
      question: "How do I measure whether retention offers work?",
      paragraphs: [
        "Use Retention Analytics, the free module that reports on every outcome of the cancellation flow. It breaks down ==which cancellation reasons customers choose==, how often each save offer is accepted or declined, churn trends over time, and which products drive the most cancellations.",
        "The headline metric is saved revenue — the value retained when customers accept an offer instead of completing a cancellation. Because outcomes are logged per offer and per reason, you can ==retire offers that never convert== and lean on the ones that pay for themselves.",
      ],
    },
  ],
  steps: [
    {
      title: "Install ArraySubs free",
      description:
        "Install the free core from WordPress.org — the retention flow and Retention Analytics are included, no license required.",
    },
    {
      title: "Review the cancellation reasons",
      description:
        "Start from the 7 default reasons or adjust the list to match how your customers actually describe leaving.",
    },
    {
      title: "Configure targeted save offers",
      description:
        "Set up discount, pause, downgrade, and contact-support offers, and limit each to the reasons and plans where it makes sense.",
    },
    {
      title: "Track results in Retention Analytics",
      description:
        "Watch offer acceptance, reason breakdowns, and saved revenue, then tune or retire the offers that underperform.",
    },
  ],
  planSplit: {
    free: [
      "3-step cancellation flow with reason capture and final confirmation",
      "4 save-offer types with reason and plan targeting",
      "7 default cancellation reasons stored on the subscription record",
      "Retention Analytics: reasons, offer acceptance, churn trends, saved revenue",
      "Pause / vacation mode and skip-next-renewal as lighter levers",
      "2-phase grace period on failed payments",
      "Retention-discount confirmation email",
    ],
    pro: [
      "Automatic retry of failed renewal payments",
      "Auto-downgrade to a fallback plan when recovery fails",
      "Refund to store credit so refunded value stays in the store",
      "Self-service payment-method updates via Stripe, PayPal, or Paddle",
    ],
  },
  moduleSlugs: [
    "retention-and-refunds",
    "retention-analytics",
    "pause-vacation-mode",
    "skip-next-renewal",
    "auto-downgrade-on-failure",
    "customer-portal",
  ],
  articleSlugs: [
    "subscription-dunning-strategy-timing-messages-and-stop-rules",
    "auto-downgrade-after-payment-failure-when-it-beats-cancellation",
    "involuntary-churn-recovery-checklist",
  ],
  useCaseSlugs: ["saas-digital-products", "membership-sites", "subscription-boxes"],
  relatedPillars: ["store-credit", "customer-portal", "analytics"],
  faq: [
    {
      question: "Is the ArraySubs retention flow really free?",
      answer:
        "Yes. The 3-step cancellation flow, all four save-offer types, the default cancellation reasons, and Retention Analytics ship in the free core. Pro adds involuntary-churn automation such as failed-payment retry and auto-downgrade.",
    },
    {
      question: "Can customers still cancel if they decline the offers?",
      answer:
        "Yes. The flow never blocks cancellation — a customer who declines the save offer continues to the final confirmation and cancels normally. The goal is one honest intervention, not a maze.",
    },
    {
      question: "Can I show different offers for different cancellation reasons?",
      answer:
        "Yes. Offers are conditional: each one can be limited to the cancellation reasons and plans you choose, so a price-driven cancel sees a discount while a temporary situation sees a pause.",
    },
    {
      question: "Where do I see why customers cancelled?",
      answer:
        "Reasons are stored on the subscription record and aggregated in the free Retention Analytics module, which breaks down reasons, save-offer acceptance, churn trends, product-level churn, and saved revenue.",
    },
    {
      question: "What happens when a customer accepts a retention discount?",
      answer:
        "The discount is applied and a confirmation email is sent automatically — one of the 21 free email types — and the accepted offer is logged so analytics can attribute the saved revenue.",
    },
    {
      question: "Does the retention flow handle failed payments too?",
      answer:
        "Failed payments are handled by the adjacent recovery tools: the free 2-phase grace period keeps access alive, and Pro adds automatic payment retry plus auto-downgrade to a fallback plan when recovery fails.",
    },
    {
      question: "Do I need a separate churn tool for WooCommerce subscriptions?",
      answer:
        "No. ArraySubs builds the retention flow into the subscription plugin itself, so reason capture, save offers, and analytics run on the same subscription records as billing — nothing extra to integrate.",
    },
  ],
};
