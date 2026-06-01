"use client";

import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <main
          id="main"
          className="flex min-h-dvh items-center bg-background px-6 py-20 text-foreground sm:px-8"
        >
          <section className="mx-auto flex w-full max-w-page flex-col items-start gap-6">
            <p className="text-sm font-semibold tracking-widest text-muted uppercase">
              Error
            </p>
            <h1 className="font-display text-display-sm text-balance sm:text-display">
              Something went wrong
            </h1>
            <p className="max-w-2xl text-lg text-muted sm:text-xl">
              The page could not load. Try again or return to the design system.
            </p>
            <button
              type="button"
              onClick={reset}
              className="inline-flex cursor-pointer items-center justify-center rounded-pill bg-primary px-5 py-2.5 text-sm font-semibold text-on-dark transition-colors hover:bg-primary-strong"
            >
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
