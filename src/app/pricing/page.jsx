import { buildMetadata } from "@/lib/seo";
import CanvasLayout from "@/layouts/page/CanvasLayout";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Simple, transparent pricing for ArraySubs WooCommerce subscriptions and memberships.",
  path: "/pricing",
  keywords: ["WooCommerce subscription pricing", "membership plugin pricing"],
});

export default function PricingPage() {
  return (
    <CanvasLayout>
      <h1>Pricing</h1>
      <p>Pricing — coming soon.</p>
    </CanvasLayout>
  );
}
