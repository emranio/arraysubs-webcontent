"use client";

import { useRef, type ReactNode } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { ArrayHashMark } from "./ArrayHashMark";

export type StatementSegment = {
  text: string;
  /** Render in italic — mix with regular for the editorial cadence. */
  italic?: boolean;
};

type StatementProps = {
  /** Small accent above/beside the heading. */
  eyebrow?: string;
  /** Mixed-style heading — an array of text + italic segments. */
  heading: StatementSegment[];
  /** Supporting paragraph rendered in the left column on desktop. */
  description?: ReactNode;
  /** Optional CTA (Button) under the heading. */
  cta?: ReactNode;
  className?: string;
};

/**
 * Editorial two-column statement.
 *
 * Left column: an ArrayHash-marked eyebrow at the top and a supporting
 * paragraph at the bottom. Right column: an oversized heading that mixes
 * regular and italic runs, plus an optional CTA.
 *
 * Scroll animation: every WORD in the heading is wrapped in its own span and
 * slides up + fades in with a small stagger when the section enters the
 * viewport. Skipped under `prefers-reduced-motion`.
 */
export function Statement({
  eyebrow,
  heading,
  description,
  cta,
  className,
}: StatementProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;
      registerGsap();

      const words = root.querySelectorAll<HTMLElement>("[data-statement-word]");
      gsap.set(words, { autoAlpha: 0, y: 32 });
      gsap.to(words, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.04,
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "grid gap-12 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-20",
        className,
      )}
    >
      <div className="flex flex-col justify-between gap-10">
        {eyebrow && (
          <p className="inline-flex items-center gap-2 font-display text-2xl tracking-tight">
            <ArrayHashMark className="text-faint text-[0.7em]" />
            <em className="font-medium not-italic">{eyebrow}</em>
          </p>
        )}
        {description && (
          <p className="text-base text-muted">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-10">
        <h2 className="font-display text-4xl leading-[1.05] font-medium sm:text-5xl md:text-6xl lg:text-[4.5rem]">
          {/* Single accessible string for screen readers */}
          <span className="sr-only">
            {heading.map((seg) => seg.text).join("")}
          </span>
          <span aria-hidden="true">
            {heading.map((seg, i) =>
              // Split each segment into words so we can animate them
              // individually, keeping spaces as text nodes so the line still
              // wraps at word boundaries.
              seg.text.split(/(\s+)/).map((part, j) => {
                if (part === "") return null;
                if (/^\s+$/.test(part)) {
                  return <span key={`${i}-${j}`}>{part}</span>;
                }
                return (
                  <span
                    key={`${i}-${j}`}
                    data-statement-word
                    className={cn(
                      "inline-block",
                      seg.italic && "font-display italic",
                    )}
                  >
                    {part}
                  </span>
                );
              }),
            )}
          </span>
        </h2>
        {cta && <div className="flex flex-wrap items-center gap-3">{cta}</div>}
      </div>
    </div>
  );
}
