"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, hasFinePointer, prefersReducedMotion } from "@/lib/gsap";

type MagneticProps = {
  children: ReactNode;
  /** Pull factor (0–1). Higher = follows the cursor more closely. */
  strength?: number;
  className?: string;
};

/**
 * Wraps a single element and pulls it toward the cursor while hovered, easing
 * smoothly back to center on leave (the "button magnet" effect). Uses a single
 * power ease for both follow and return so there is no jumpy start. No-op on
 * touch devices and when reduced motion is requested.
 */
export function Magnetic({ children, strength = 0.4, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;

    // quickTo gives a smooth, continuously-retargeted tween — ideal for
    // following the cursor without restarting/overshooting on every move.
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      // getBoundingClientRect() returns the POST-transform rect, so we must
      // subtract the current GSAP translation to recover the original center —
      // otherwise the target value shrinks every frame and the button settles
      // short of the cursor (and wobbles when held still).
      const rect = el.getBoundingClientRect();
      const currentX = (gsap.getProperty(el, "x") as number) || 0;
      const currentY = (gsap.getProperty(el, "y") as number) || 0;
      const originalCenterX = rect.left + rect.width / 2 - currentX;
      const originalCenterY = rect.top + rect.height / 2 - currentY;
      xTo((event.clientX - originalCenterX) * strength);
      yTo((event.clientY - originalCenterY) * strength);
    };
    // Reuse the same quickTo to glide back to center (smooth, no snap/jank).
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-flex", willChange: "transform" }}
    >
      {children}
    </span>
  );
}
