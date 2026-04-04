import HomeHero from "@/components/home/HomeHero";
import HomePageContent from "@/components/home/HomePageContent";
import { faqItems } from "@/components/home/homepageData";
import CanvasLayout from "@/components/layouts/CanvasLayout";
import {
  buildFaqSchema,
  buildMetadata,
  buildOrganizationSchema,
  buildSoftwareApplicationSchema,
  buildWebsiteSchema,
} from "@/lib/seo";

export const metadata = buildMetadata({
  title: "ArraySubs — Free WooCommerce Subscription & Membership Plugin",
  description:
    "Free WooCommerce subscription and membership plugin with automated billing, retention flows, store credit, checkout builder, and analytics.",
  ogTitle: "ArraySubs — All-in-One WooCommerce Subscriptions & Memberships",
  ogDescription:
    "Subscriptions + Memberships + Store Credit + Retention Flow + Analytics + Audits — one plugin, generous free tier.",
  canonical: "/",
  path: "/",
  keywords: [
    "woocommerce subscription plugin",
    "woocommerce subscription plugin free",
    "best woocommerce subscription plugin",
    "woocommerce recurring payments plugin",
    "woocommerce subscription and membership plugin",
  ],
});

const homepageSchema = [
  buildWebsiteSchema(),
  buildSoftwareApplicationSchema(),
  buildOrganizationSchema(),
  buildFaqSchema(faqItems),
];

export default function HomePage() {
  return (
    <CanvasLayout schema={homepageSchema}>
      <HomeHero />
      <HomePageContent />
    </CanvasLayout>
  );
}
