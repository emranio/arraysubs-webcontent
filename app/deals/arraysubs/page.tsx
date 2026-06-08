import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: "ArraySubs",
    description: "ArraySubs for WooCommerce subscription stores.",
    path: "/deals/arraysubs/",
  }),
  title: { absolute: "ArraySubs" },
};

export default function ArraySubsPage() {
  return null;
}
