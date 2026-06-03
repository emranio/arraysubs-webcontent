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
  const motion = useRef({
    auto: 0,
    scroll: 0,
    width: 0,
    drag: 0,
    velocity: 0,
    dragging: false,
    lastX: 0,
  });
  const items = Children.toArray(children);

  useGSAP(
    () => {
      registerGsap();
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;

      const update = () => {
        const width = motion.current.width;
        if (width <= 0) return;
        // Wrap the combined offset so dragging in either direction loops cleanly.
        const raw =
          motion.current.auto + motion.current.scroll - motion.current.drag;
        const x = -(((raw % width) + width) % width);
        gsap.set(track, { x });
      };

      const measure = () => {
        motion.current.width = track.scrollWidth / 2;
        update();
      };

      measure();
      const resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(track);

      // --- Grab & drag to slide (pointer + touch). Works with reduced motion too. ---
      const onPointerDown = (event: PointerEvent) => {
        motion.current.dragging = true;
        motion.current.velocity = 0;
        motion.current.lastX = event.clientX;
        track.style.cursor = "grabbing";
        try {
          track.setPointerCapture(event.pointerId);
        } catch {}
      };
      const onPointerMove = (event: PointerEvent) => {
        if (!motion.current.dragging) return;
        const dx = event.clientX - motion.current.lastX;
        motion.current.lastX = event.clientX;
        motion.current.drag += dx;
        motion.current.velocity = dx;
        update();
      };
      const onPointerUp = (event: PointerEvent) => {
        if (!motion.current.dragging) return;
        motion.current.dragging = false;
        track.style.cursor = "";
        try {
          track.releasePointerCapture(event.pointerId);
        } catch {}
      };
      const onDragStart = (event: Event) => event.preventDefault();

      track.addEventListener("pointerdown", onPointerDown);
      track.addEventListener("pointermove", onPointerMove);
      track.addEventListener("pointerup", onPointerUp);
      track.addEventListener("pointercancel", onPointerUp);
      track.addEventListener("dragstart", onDragStart);

      const removeDragListeners = () => {
        track.removeEventListener("pointerdown", onPointerDown);
        track.removeEventListener("pointermove", onPointerMove);
        track.removeEventListener("pointerup", onPointerUp);
        track.removeEventListener("pointercancel", onPointerUp);
        track.removeEventListener("dragstart", onDragStart);
      };

      if (prefersReducedMotion()) {
        // Static row, but still allow manual grab-drag.
        return () => {
          resizeObserver.disconnect();
          removeDragListeners();
        };
      }

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
        if (motion.current.dragging) {
          update();
          return;
        }
        // Inertia after release, then resume the auto drift.
        if (Math.abs(motion.current.velocity) > 0.05) {
          motion.current.drag += motion.current.velocity;
          motion.current.velocity *= 0.9;
        }
        motion.current.auto = (motion.current.auto + (deltaTime / 1000) * 24) % width;
        update();
      };

      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        scrollTrigger.kill();
        resizeObserver.disconnect();
        removeDragListeners();
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
          className="flex w-max min-w-full cursor-grab touch-pan-y gap-[0.1875rem] select-none will-change-transform"
        >
          {renderItems()}
          {renderItems(true)}
        </ul>
      </div>
    </section>
  );
}
