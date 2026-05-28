"use client";

import { useEffect, useRef } from "react";
import { gsap, hasFinePointer, prefersReducedMotion } from "@/lib/gsap";
import styles from "./CustomCursor.module.scss";

/**
 * GSAP mouse-follow cursor: a small dot that tracks instantly and a ring that
 * trails with easing, growing over interactive elements. Uses mix-blend-mode so
 * it stays visible on both light and dark sections. Disabled for touch devices
 * and when reduced motion is requested (native cursor stays).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.dataset.customCursor = "on";
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3" });

    let shown = false;
    const interactive = 'a, button, summary, input, textarea, select, [role="tab"], [data-cursor="hover"]';

    const onMove = (e: PointerEvent) => {
      if (!shown) {
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
        shown = true;
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      if ((e.target as Element)?.closest?.(interactive)) {
        gsap.to(ring, { scale: 1.9, duration: 0.3, ease: "power3" });
      }
    };
    const onOut = (e: PointerEvent) => {
      if ((e.target as Element)?.closest?.(interactive)) {
        gsap.to(ring, { scale: 1, duration: 0.3, ease: "power3" });
      }
    };
    const onLeave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    const onEnter = () => gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      delete document.body.dataset.customCursor;
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  );
}
