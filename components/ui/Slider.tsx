"use client";

import { Children, useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type SliderProps = {
  /** Each child becomes a slide. */
  children: ReactNode;
  /** Accessible name for the carousel. */
  label: string;
  className?: string;
};

/**
 * Touch-friendly, accessible carousel built on native scroll-snap (so it works
 * without JS) with labelled previous/next controls.
 */
export function Slider({ children, label, className }: SliderProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const slides = Children.toArray(children);

  const scrollByDirection = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: track.clientWidth * 0.8 * direction, behavior: "smooth" });
  };

  const controlClasses =
    "inline-flex size-11 items-center justify-center rounded-full border border-border-strong text-foreground transition-colors duration-200 hover:bg-dark hover:text-on-dark";

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={cn("flex flex-col gap-5", className)}
    >
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => (
          <li
            key={index}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            className="flex-[0_0_85%] snap-start sm:flex-[0_0_46%] lg:flex-[0_0_31.5%]"
          >
            {slide}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => scrollByDirection(-1)}
          aria-label="Previous slides"
          className={controlClasses}
        >
          <ArrowLeft aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByDirection(1)}
          aria-label="Next slides"
          className={controlClasses}
        >
          <ArrowRight aria-hidden="true" className="size-5" />
        </button>
      </div>
    </section>
  );
}
