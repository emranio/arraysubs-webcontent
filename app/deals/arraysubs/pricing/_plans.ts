export type ArraySubsProPlan = {
  id: string;
  name: string;
  sites: number;
  siteLabel: string;
  annualPrice: number;
  lifetimePrice: number;
  badge?: string;
  summary: string;
  bestFor: string;
};

export const CHECKOUT_PRODUCT_ID = "33435";
export const CHECKOUT_PUBLIC_KEY = "pk_ab1c211d5fa5e6aabcd0f9fd43c91";

export const ARRAYSUBS_PRO_PLANS: ArraySubsProPlan[] = [
  {
    id: "54910",
    name: "Personal",
    sites: 1,
    siteLabel: "1 site",
    annualPrice: 129,
    lifetimePrice: 269,
    summary: "The complete Pro feature set for one production store.",
    bestFor:
      "Solo store owners, a single membership site, or one WooCommerce subscription build.",
  },
  {
    id: "55248",
    name: "Professional",
    sites: 10,
    siteLabel: "10 sites",
    annualPrice: 249,
    lifetimePrice: 519,
    badge: "Best value",
    summary:
      "Everything in Pro across client stores, staging sites, and growing portfolios.",
    bestFor:
      "Agencies, freelancers, and operators running multiple subscription stores.",
  },
  {
    id: "55250",
    name: "Agency",
    sites: 1000,
    siteLabel: "1000 sites",
    annualPrice: 489,
    lifetimePrice: 899,
    summary:
      "High-volume licensing for agencies and productized WooCommerce services.",
    bestFor:
      "Large agencies, hosting partners, and teams standardizing ArraySubs across many builds.",
  },
];

export const PRO_PLAN_FEATURES = [
  "Every ArraySubs Pro module and workflow",
  "Store Credit, Checkout Builder, and Feature Manager",
  "Automatic recurring payments with Stripe, PayPal, and Paddle",
  "Advanced analytics, audit logs, Gateway Health, and Member Insight",
  "30-day money-back guarantee",
];

export function getArraySubsProPlan(planId: string) {
  return ARRAYSUBS_PRO_PLANS.find((plan) => plan.id === planId);
}

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
