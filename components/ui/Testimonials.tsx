"use client";

import { useRef, useState } from "react";
import { MoveLeft, MoveRight, Star } from "lucide-react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap";
import { cn } from "@/lib/cn";

export type TestimonialItem = {
  quote: string;
  name: string;
  /** Role / business shown under the name. */
  context: string;
  /** 1–5, defaults to 5. */
  rating?: number;
  /** Optional avatar image URL; initials are shown when omitted. */
  image?: string;
};

type TestimonialsProps = {
  items: TestimonialItem[];
  /** Oversized faded word behind the quote. */
  label?: string;
  className?: string;
};

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Single-quote testimonial carousel: an oversized faded label behind a centered
 * avatar, a 5-star rating, the quote, the author, and prev/next controls.
 * On change the main block fades + glides as one piece (no stagger) and the
 * quote area reserves height, so the controls never jump. Sourced from
 * WordPress.org reviews.
 */
export function Testimonials({
  items,
  label = "Testimonial",
  className,
}: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const direction = useRef(1);
  const mainRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const count = items.length;
  const item = items[index];
  const rating = item.rating ?? 5;

  const go = (dir: 1 | -1) => {
    direction.current = dir;
    setIndex((current) => (current + dir + count) % count);
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      registerGsap();
      // Move the whole block as one piece — smooth, no per-element stagger.
      if (mainRef.current) {
        gsap.fromTo(
          mainRef.current,
          { autoAlpha: 0, x: 28 * direction.current },
          { autoAlpha: 1, x: 0, duration: 0.45, ease: "power2.out" },
        );
      }
      if (authorRef.current) {
        gsap.fromTo(
          authorRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.45, ease: "power2.out" },
        );
      }
    },
    { dependencies: [index] },
  );

  const arrowClasses =
    "group inline-flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-dark text-on-dark transition-colors hover:bg-dark-2";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Testimonials"
      className={cn("relative overflow-hidden", className)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 font-display text-[18vw] leading-none font-bold tracking-tight whitespace-nowrap text-dark/[0.08] uppercase select-none"
      >
        {label}
      </span>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="flex flex-col items-center text-center"
      >
        <div ref={mainRef} className="flex w-full flex-col items-center">
          <div className="size-28 overflow-hidden rounded-2xl bg-dark sm:size-36">
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt={item.name}
                className="size-full object-cover"
              />
            ) : (
              <span className="flex size-full items-center justify-center font-display text-3xl font-bold text-on-dark">
                {initialsOf(item.name)}
              </span>
            )}
          </div>

          <div
            className="mt-6 flex items-center gap-1"
            role="img"
            aria-label={`Rated ${rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                aria-hidden="true"
                className={cn(
                  "size-5",
                  i < rating
                    ? "fill-gold text-gold"
                    : "fill-none text-border-strong",
                )}
              />
            ))}
          </div>

          {/* Reserved height keeps the controls from jumping between quotes. */}
          <div className="mt-6 flex min-h-28 items-center sm:min-h-32 md:min-h-40">
            <blockquote className="max-w-4xl text-2xl leading-none font-medium text-balance sm:text-3xl md:text-4xl">
              “{item.quote}”
            </blockquote>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className={arrowClasses}
          >
            <MoveLeft
              aria-hidden="true"
              className="size-5 transition-transform duration-200 group-hover:-translate-x-1"
            />
          </button>

          <div ref={authorRef} className="flex w-44 flex-col">
            <span className="font-display text-lg font-bold">{item.name}</span>
            <span className="text-sm text-muted">{item.context}</span>
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className={arrowClasses}
          >
            <MoveRight
              aria-hidden="true"
              className="size-5 transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>

        <p className="mt-6 text-xs tracking-wide text-faint uppercase">
          Verified review on WordPress.org
        </p>
      </div>
    </section>
  );
}
