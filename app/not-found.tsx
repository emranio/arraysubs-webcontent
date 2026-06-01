import type { Metadata } from "next";
import { Button, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <PageHero
      variant="compact"
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "404", href: "/404/" },
      ]}
      withBreadcrumbSchema={false}
      eyebrow="404"
      title="Page not found"
      subtitle="The page you requested does not exist or has moved."
      actions={
        <Button href="/design-system/" size="sm">
          Design System
        </Button>
      }
    />
  );
}
