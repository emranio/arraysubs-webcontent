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
 * Editorial dark-background feature statement: big mixed-color display text
 * across several lines, divided horizontally, with vertical capsule "pills"
 * inline that carry a feature icon + a floating "@label" badge above.
 *
 * Motion (skipped under reduced-motion):
 *  - On scroll into view, each line glides up as one piece (no per-segment
 *    stagger, so it never reflows or feels jumpy).
 *  - Dividers expand left → right.
 *  - Pills pop in with a soft back-ease, then gently float forever.
 */
export function Manifesto({ lines, description, className, id }: ManifestoProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;
      registerGsap();

      const lineEls = root.querySelectorAll<HTMLElement>("[data-mf-line]");
      const dividerEls = root.querySelectorAll<HTMLElement>("[data-mf-divider]");
      const pillEls = root.querySelectorAll<HTMLElement>("[data-mf-pill]");

      // Pin the hidden state synchronously (useLayoutEffect under the hood)
      // so there is no flash of visible content before the reveal fires.
      gsap.set(lineEls, { autoAlpha: 0, y: 50 });
      gsap.set(dividerEls, { scaleX: 0 });
      gsap.set(pillEls, { scale: 0.7 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          once: true,
        },
      });

      tl.to(
        lineEls,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
        },
        0,
      );

      tl.to(
        dividerEls,
        {
          scaleX: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
        },
        0.2,
      );

      tl.to(
        pillEls,
        {
          scale: 1,
          duration: 0.65,
          ease: "back.out(1.6)",
          stagger: 0.12,
        },
        0.25,
      );

      // Gentle, organic float on each pill (slightly different timing per pill).
      pillEls.forEach((pill, i) => {
        gsap.to(pill, {
          y: -6,
          duration: 2.2 + i * 0.25,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 1.3 + i * 0.15,
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
                  className="h-px w-full origin-left bg-on-dark-border"
                />
              )}
              <div
                data-mf-line
                className="flex flex-wrap items-center gap-x-3 gap-y-3 py-5 font-display text-5xl leading-[0.9] font-bold tracking-tight will-change-transform sm:gap-x-5 sm:py-7 sm:text-6xl md:text-7xl lg:py-9 lg:text-8xl"
              >
                {line.map((segment, j) =>
                  segment.type === "text" ? (
                    <span
                      key={j}
                      className={cn(
                        "text-balance",
                        textColor[segment.color ?? "white"],
                      )}
                    >
                      {segment.text}
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
      className="relative inline-flex shrink-0 text-dark will-change-transform"
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
