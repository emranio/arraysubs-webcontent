"use client";

import { Button, PageHero } from "@/components/ui";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <PageHero
      eyebrow="Error"
      title="Something went wrong"
      subtitle="The page could not load. Try again or return home."
      actions={
        <>
          <Button type="button" size="sm" onClick={reset}>
            Try again
          </Button>
          <Button href="/" variant="outline" size="sm">
            Back to Home
          </Button>
        </>
      }
    />
  );
}
