"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
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
  /** Prevents overlapping transitions when a user clicks rapidly. */
  const transitioning = useRef(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  /** Active grab-drag gesture state. */
  const drag = useRef({ active: false, startX: 0, dx: 0 });
  const count = items.length;
  const item = items[index];
  const rating = item.rating ?? 5;

  const SLIDE = 32;
  /** Horizontal drag distance (px) that commits to prev/next. */
  const DRAG_THRESHOLD = 60;

  const go = (dir: 1 | -1) => {
    if (transitioning.current) return;
    direction.current = dir;
    if (prefersReducedMotion()) {
      setIndex((current) => (current + dir + count) % count);
      return;
    }
    transitioning.current = true;
    // Fade + slide the CURRENT slide out — opposite to the travel direction.
    const targets = [mainRef.current, authorRef.current].filter(Boolean);
    gsap.to(targets, {
      autoAlpha: 0,
      x: -SLIDE * dir,
      duration: 0.3,
      ease: "power2.in",
      overwrite: "auto",
      onComplete: () => {
        // Swap content. useGSAP[index] handles the IN animation from the
        // opposite side — the block teleports across while invisible.
        setIndex((current) => (current + dir + count) % count);
      },
    });
  };

  // --- Grab & drag to go prev/next (pointer + touch) ---
  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (transitioning.current) return;
    // Let the prev/next buttons keep their own click behaviour.
    if ((event.target as HTMLElement).closest("button")) return;
    drag.current = { active: true, startX: event.clientX, dx: 0 };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.dx = event.clientX - drag.current.startX;
    if (prefersReducedMotion()) return;
    // Live follow, damped so it feels weighty.
    const targets = [mainRef.current, authorRef.current].filter(Boolean);
    gsap.set(targets, { x: drag.current.dx * 0.5 });
  };
  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const { dx } = drag.current;
    drag.current.active = false;
    try {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    } catch {}
    if (Math.abs(dx) > DRAG_THRESHOLD) {
      // Drag left → next, drag right → previous.
      go(dx < 0 ? 1 : -1);
    } else if (!prefersReducedMotion()) {
      // Under threshold: snap back into place.
      const targets = [mainRef.current, authorRef.current].filter(Boolean);
      gsap.to(targets, { x: 0, duration: 0.3, ease: "power2.out" });
    }
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        transitioning.current = false;
        return;
      }
      registerGsap();
      const startX = SLIDE * direction.current;
      // The two refs share a single tween so they never desync.
      const targets = [mainRef.current, authorRef.current].filter(Boolean);
      gsap.fromTo(
        targets,
        { autoAlpha: 0, x: startX },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.55,
          ease: "power2.out",
          overwrite: "auto",
          onComplete: () => {
            transitioning.current = false;
          },
        },
      );
    },
    { dependencies: [index] },
  );

  const arrowClasses =
    "group inline-flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-dark text-on-dark transition-colors hover:bg-dark-2";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Testimonials"
      className={cn("relative isolate overflow-hidden", className)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/2 z-0 w-full -translate-x-1/2 overflow-hidden text-center font-display text-[18vw] leading-none font-bold tracking-tight whitespace-nowrap text-dark/[0.08] uppercase select-none sm:top-12"
      >
        {label}
      </span>

      <div
        aria-live="polite"
        aria-atomic="true"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(event) => event.preventDefault()}
        className="relative z-10 flex cursor-grab touch-pan-y flex-col items-center text-center select-none active:cursor-grabbing"
      >
        <div ref={mainRef} className="flex w-full flex-col items-center">
          <div className="size-28 overflow-hidden rounded-2xl bg-dark sm:size-36">
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt={item.name}
                draggable={false}
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
