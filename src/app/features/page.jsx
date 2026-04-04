import { buildMetadata } from "@/lib/seo";
import CanvasLayout from "@/layouts/page/CanvasLayout";

export const metadata = buildMetadata({
  title: "Features",
  description:
    "Explore all ArraySubs features — subscriptions, memberships, billing, retention, and more.",
  path: "/features",
  keywords: [
    "WooCommerce subscription features",
    "membership features",
    "recurring billing features",
  ],
});

export default function FeaturesPage() {
  return (
    <CanvasLayout>
      <h1>Features</h1>
      <p>Features hub — coming soon.</p>
    </CanvasLayout>
  );
}
