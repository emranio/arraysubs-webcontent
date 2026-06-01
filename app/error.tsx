"use client";

import { Button, PageHero } from "@/components/ui";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <PageHero
      variant="compact"
      eyebrow="Error"
      title="Something went wrong"
      subtitle="The page could not load. Try again or return to the design system."
      actions={
        <>
          <Button type="button" size="sm" onClick={reset}>
            Try again
          </Button>
          <Button href="/design-system/" variant="outline" size="sm">
            Design System
          </Button>
        </>
      }
    />
  );
}
