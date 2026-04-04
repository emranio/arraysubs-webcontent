import { buildMetadata, Schema } from "@/lib/seo";
import SchemaScript from "@/components/SchemaScript";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/homepage/AnnouncementBar";
import HeroSection from "@/components/homepage/HeroSection";
import ProblemSection from "@/components/homepage/ProblemSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import WhySection from "@/components/homepage/WhySection";
import GrowthSection from "@/components/homepage/GrowthSection";
import CtaBanner from "@/components/homepage/CtaBanner";

export const metadata = buildMetadata({
  title: {
    absolute: "ArraySubs — Free WooCommerce Subscription & Membership Plugin",
  },
  description:
    "Free WooCommerce subscription & membership plugin with automated billing, retention flows, store credit, checkout builder & analytics. One plugin replaces your entire subscription stack.",
  path: "/",
  keywords: [
    "woocommerce subscription plugin",
    "woocommerce subscription plugin free",
    "best woocommerce subscription plugin",
    "woocommerce recurring payments plugin",
    "woocommerce subscription and membership plugin",
  ],
});

const homeSchema = [
  Schema.organization(),
  Schema.website(),
  Schema.softwareApplication({
    description:
      "Free WooCommerce subscription & membership plugin with automated billing, retention flows, store credit, checkout builder & analytics.",
  }),
  Schema.faq([
    {
      question: "Is ArraySubs really free?",
      answer:
        "Yes. The core plugin with subscriptions, memberships, billing, customer portal, retention flow, email notifications, setup wizard, and more is completely free on WordPress.org. ArraySubs Pro adds premium modules like store credit, checkout builder, analytics, audits, and automatic payments.",
    },
    {
      question: "How many plugins does ArraySubs replace?",
      answer:
        "ArraySubs replaces up to 6 separate plugins — subscriptions, memberships, retention, store credit, checkout customization, and analytics — all in one integrated solution.",
    },
  ]),
];

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main id="main-content">
        <SchemaScript schema={homeSchema} />
        <HeroSection />
        <ProblemSection />
        <FeaturesSection />
        <WhySection />
        <GrowthSection />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
