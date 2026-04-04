import { buildMetadata, Schema } from "@/lib/seo";
import SchemaScript from "@/components/SchemaScript";
import CanvasLayout from "@/layouts/page/CanvasLayout";

export const metadata = buildMetadata({
  title: {
    absolute: "ArraySubs — WooCommerce Subscriptions & Memberships",
  },
  description:
    "The all-in-one WooCommerce subscription and membership plugin. Recurring billing, member access, retention flows, and more.",
  path: "/",
  keywords: [
    "WooCommerce subscriptions",
    "WooCommerce memberships",
    "recurring billing",
    "WordPress subscription plugin",
  ],
});

const homeSchema = [
  Schema.organization(),
  Schema.website(),
  Schema.softwareApplication({
    description:
      "The all-in-one WooCommerce subscription and membership plugin.",
  }),
];

export default function HomePage() {
  return (
    <CanvasLayout>
      <SchemaScript schema={homeSchema} />
      <h1>ArraySubs</h1>
      <p>Homepage — coming soon.</p>
    </CanvasLayout>
  );
}
