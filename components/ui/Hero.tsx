"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, hasFinePointer, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";

type Tone = "default" | "highlight" | "primary";

type HeroProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Buttons / CTA row. */
  actions?: ReactNode;
  /** Trust badges / logo row beneath the actions. */
  trust?: ReactNode;
  /** Right-column visual. A placeholder mockup is shown if omitted. */
  media?: ReactNode;
  /** Heading element for the title — keep h1 on real pages. */
  headingLevel?: ElementType;
  /** Visual tone — applies a flat brand background + matching decorative shape. */
  tone?: Tone;
  className?: string;
};

const tones: Record<Tone, { bg: string; decor: string }> = {
  default: { bg: "", decor: "bg-highlight" },
  highlight: { bg: "bg-highlight text-dark", decor: "bg-primary" },
  primary: { bg: "bg-primary text-on-dark", decor: "bg-highlight" },
};

/**
 * Landing hero used by the homepage and product landing pages (these omit
 * breadcrumbs). Decorative layers drift with the cursor (GSAP mouse parallax);
 * disabled for touch and reduced-motion users.
 */
export function Hero({
  eyebrow,
  title,
  subtitle,
  actions,
  trust,
  media,
  headingLevel: Heading = "h1",
  tone = "default",
  className,
}: HeroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { bg, decor } = tones[tone];

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !hasFinePointer() || prefersReducedMotion()) return;

    const layers = Array.from(
      root.querySelectorAll<HTMLElement>("[data-parallax]"),
    ).map((el) => ({
      depth: Number.parseFloat(el.dataset.parallax || "20"),
      x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" }),
    }));

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      layers.forEach((l) => {
        l.x(nx * l.depth);
        l.y(ny * l.depth);
      });
    };
    const onLeave = () => layers.forEach((l) => (l.x(0), l.y(0)));

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 lg:pb-28",
        bg,
        className,
      )}
    >
      {/* Decorative, cursor-reactive flat shape (no blur, no gradient) */}
      <div
        aria-hidden="true"
        data-parallax="-30"
        className={cn(
          "pointer-events-none absolute -top-28 -right-28 -z-10 size-[26rem] rounded-full",
          decor,
        )}
      />
      {/* Second decorative shape — only on colored tones for richer depth. */}
      {tone !== "default" && (
        <div
          aria-hidden="true"
          data-parallax="-18"
          className={cn(
            "pointer-events-none absolute -bottom-32 -left-24 -z-10 size-[22rem] rounded-full opacity-70",
            decor,
          )}
        />
      )}

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <Heading className="font-display text-display-sm text-balance sm:text-display">
              {title}
            </Heading>
            {subtitle && (
              <p
                className={cn(
                  "max-w-xl text-lg text-pretty sm:text-xl",
                  tone === "default" ? "text-muted" : "opacity-80",
                )}
              >
                {subtitle}
              </p>
            )}
            {actions && (
              <div className="mt-2 flex flex-wrap items-center gap-4">
                {actions}
              </div>
            )}
            {trust && (
              <div
                className={cn(
                  "mt-4 text-sm",
                  tone === "default" ? "text-muted" : "opacity-70",
                )}
              >
                {trust}
              </div>
            )}
          </div>

          <div data-parallax="14" className="relative">
            {media ?? <HeroMediaPlaceholder />}
          </div>
        </div>
      </Container>
    </div>
  );
}

/** Lightweight browser-window mockup used when no media is provided. */
function HeroMediaPlaceholder() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface text-foreground">
      <div className="flex items-center gap-2 border-b border-border bg-background px-4 py-3">
        <span className="size-3 rounded-full bg-border-strong" />
        <span className="size-3 rounded-full bg-border-strong" />
        <span className="size-3 rounded-full bg-border-strong" />
      </div>
      <div className="grid gap-4 p-6">
        <div className="h-3 w-1/3 rounded-full bg-border-strong" />
        <div className="h-24 rounded-lg bg-primary" />
        <div className="grid grid-cols-3 gap-3">
          <div className="h-16 rounded-lg border border-border bg-background" />
          <div className="h-16 rounded-lg border border-border bg-background" />
          <div className="h-16 rounded-lg border border-border bg-background" />
        </div>
      </div>
    </div>
  );
}
