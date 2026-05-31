"use client";

import { useRef, type ReactNode } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Section } from "./Section";

type Color = "white" | "highlight" | "gold" | "primary";

type TextSegment = { type: "text"; text: string; color?: Color };
type PillSegment = {
  type: "pill";
  icon: ReactNode;
  label: string;
  color: Color;
};

export type ManifestoSegment = TextSegment | PillSegment;
export type ManifestoLine = ManifestoSegment[];

type ManifestoProps = {
  /** Each entry is one line; segments mix big text with inline feature pills. */
  lines: ManifestoLine[];
  /** Supporting paragraph rendered at the bottom-right under the lines. */
  description?: ReactNode;
  className?: string;
  id?: string;
};

const textColor: Record<Color, string> = {
  white: "text-on-dark",
  highlight: "text-highlight",
  gold: "text-gold",
  primary: "text-primary",
};

const pillBg: Record<Color, string> = {
  white: "bg-on-dark",
  highlight: "bg-highlight",
  gold: "bg-gold",
  primary: "bg-primary",
};

/**
 * Editorial dark-background feature statement.
 *
 * Motion (skipped under reduced-motion):
 *   - On scroll into view, every letter slides up ~16px and fades in with a
 *     small stagger so the section reveals as one continuous cascade.
 *   - Pills are part of the same cascade, then idle-float forever.
 *   - Dividers fade in subtly underneath the lines.
 *
 * Accessibility: the underlying text is exposed once via an sr-only node and the
 * animated per-letter spans are aria-hidden, so screen readers don't see "T-h-e".
 */
export function Manifesto({
  lines,
  description,
  className,
  id,
}: ManifestoProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;
      registerGsap();

      const reveal = root.querySelectorAll<HTMLElement>("[data-mf-reveal]");
      const dividers = root.querySelectorAll<HTMLElement>("[data-mf-divider]");
      const pills = root.querySelectorAll<HTMLElement>("[data-mf-pill]");

      // Pin the hidden state synchronously (no flash before the reveal fires).
      gsap.set(reveal, { autoAlpha: 0, y: 16 });
      gsap.set(dividers, { autoAlpha: 0 });

      const STAGGER = 0.035;
      const DURATION = 1.0;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });

      tl.to(
        reveal,
        {
          autoAlpha: 1,
          y: 0,
          duration: DURATION,
          ease: "power3.out",
          stagger: STAGGER,
        },
        0,
      );

      tl.to(
        dividers,
        {
          autoAlpha: 1,
          duration: 1.4,
          ease: "power2.out",
          stagger: 0.5,
        },
        0.2,
      );

      // Idle-float starts once the cascade is over (plus a small buffer).
      const revealEnd = reveal.length * STAGGER + DURATION + 0.2;
      pills.forEach((pill, i) => {
        gsap.to(pill, {
          y: -6,
          duration: 2.4 + i * 0.3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: revealEnd + i * 0.15,
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <Section surface="dark" spacing="lg" id={id} className={className}>
      <Container>
        <div ref={rootRef} className="flex flex-col">
          {lines.map((line, i) => (
            <div key={i}>
              {i > 0 && (
                <div
                  data-mf-divider
                  className="h-px w-full bg-on-dark-border"
                />
              )}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-3 py-5 font-display text-5xl leading-[0.9] font-bold tracking-tight sm:gap-x-5 sm:py-7 sm:text-6xl md:text-7xl lg:py-9 lg:text-8xl">
                {line.map((segment, j) =>
                  segment.type === "text" ? (
                    <span
                      key={j}
                      className={cn(
                        "text-balance",
                        textColor[segment.color ?? "white"],
                      )}
                    >
                      {/* Single accessible string; per-letter spans are visual only. */}
                      <span className="sr-only">{segment.text}</span>
                      <span aria-hidden="true">
                        {[...segment.text].map((char, k) =>
                          char === " " ? (
                            <span key={k}> </span>
                          ) : (
                            <span
                              key={k}
                              data-mf-reveal
                              className="inline-block"
                            >
                              {char}
                            </span>
                          ),
                        )}
                      </span>
                    </span>
                  ) : (
                    <ManifestoPill
                      key={j}
                      icon={segment.icon}
                      label={segment.label}
                      color={segment.color}
                    />
                  ),
                )}
              </div>
            </div>
          ))}
        </div>

        {description && (
          <div className="mt-10 ml-auto max-w-md text-base leading-relaxed text-on-dark-muted sm:mt-14 sm:text-lg">
            {description}
          </div>
        )}
      </Container>
    </Section>
  );
}

function ManifestoPill({
  icon,
  label,
  color,
}: {
  icon: ReactNode;
  label: string;
  color: Color;
}) {
  return (
    <span
      data-mf-pill
      data-mf-reveal
      className={cn(
        "relative inline-flex shrink-0 will-change-transform",
        color === "primary" ? "text-on-dark" : "text-dark",
      )}
    >
      <span
        className={cn(
          "absolute -top-2 left-1/2 z-10 inline-flex -translate-x-1/2 -translate-y-1/2 items-center rounded-pill border bg-dark px-2 py-0.5 text-[0.625rem] font-semibold tracking-wide whitespace-nowrap sm:px-3 sm:py-1 sm:text-xs",
          textColor[color],
          color === "white" ? "border-on-dark/30" : "border-current/40",
        )}
      >
        @{label}
      </span>
      <span
        className={cn(
          "inline-flex h-14 w-10 items-center justify-center rounded-full sm:h-20 sm:w-14 md:h-24 md:w-16 lg:h-32 lg:w-20",
          pillBg[color],
        )}
      >
        {icon}
      </span>
    </span>
  );
}
