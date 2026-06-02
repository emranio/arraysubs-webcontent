"use client";

import { Children, useRef, type CSSProperties, type ReactNode } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
  useGSAP,
} from "@/lib/gsap";
import { cn } from "@/lib/cn";

type MarqueueProps = {
  /** Each child becomes one marqueued item and can contain any React content. */
  children: ReactNode;
  /** Accessible name for the moving content region. */
  label: string;
  className?: string;
};

const edgeFadeStyle: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
  maskImage:
    "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
};

/**
 * Slow-moving, accessible marquee for arbitrary repeated content. It drifts
 * automatically, responds to page scroll, and fades at the edges with a mask.
 * Reduced-motion users get a static row.
 */
export function Marqueue({ children, label, className }: MarqueueProps) {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const motion = useRef({ auto: 0, scroll: 0, width: 0 });
  const items = Children.toArray(children);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track || prefersReducedMotion()) return;

      const update = () => {
        const width = motion.current.width;
        if (width <= 0) return;
        const x = -((motion.current.auto + motion.current.scroll) % width);
        gsap.set(track, { x });
      };

      const measure = () => {
        motion.current.width = track.scrollWidth / 2;
        update();
      };

      measure();
      const resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(track);

      const scrollTrigger = ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const width = motion.current.width;
          motion.current.scroll = self.progress * Math.min(width * 0.24, 18 * 16);
          update();
        },
      });

      const tick = (_time: number, deltaTime: number) => {
        const width = motion.current.width;
        if (width <= 0) return;
        motion.current.auto = (motion.current.auto + (deltaTime / 1000) * 24) % width;
        update();
      };

      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        scrollTrigger.kill();
        resizeObserver.disconnect();
      };
    },
    { scope: rootRef, dependencies: [items.length] },
  );

  const renderItems = (duplicated = false) =>
    items.map((item, index) => (
      <li
        key={`${duplicated ? "duplicate" : "primary"}-${index}`}
        aria-hidden={duplicated || undefined}
        aria-roledescription={duplicated ? undefined : "marquee item"}
        aria-label={duplicated ? undefined : `${index + 1} of ${items.length}`}
        className="w-[min(85vw,30rem)] shrink-0 sm:w-[27rem] lg:w-[30rem]"
      >
        {item}
      </li>
    ));

  return (
    <section
      ref={rootRef}
      aria-roledescription="marquee"
      aria-label={label}
      className={cn("flex min-w-0 max-w-full flex-col", className)}
    >
      <div
        className="-mx-6 overflow-hidden px-6 sm:-mx-8 sm:px-8"
        style={edgeFadeStyle}
      >
        <ul
          ref={trackRef}
          className="flex w-max min-w-full gap-[0.1875rem] will-change-transform"
        >
          {renderItems()}
          {renderItems(true)}
        </ul>
      </div>
    </section>
  );
}
