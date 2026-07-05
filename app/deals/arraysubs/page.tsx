import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createMetadata({
    title:
      "ArraySubs – Effortless Memberships, Subscriptions, Content Restriction & Recurring Payments for WooCommerce",
    description:
      "WooCommerce subscription manager and membership plugin that gives you everything you need to sell subscriptions, manage recurring billing, restrict member-only content, and reduce churn — without paying for multiple plugins or stitching together separate tools.",
    path: "/deals/arraysubs/",
  }),
  title: {
    absolute:
      "ArraySubs – Effortless Memberships, Subscriptions, Content Restriction & Recurring Payments for WooCommerce",
  },
};

export default function ArraySubsPage() {
  return null;
}
