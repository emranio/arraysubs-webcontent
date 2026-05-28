"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap";

type ScrollRevealProps = {
  children: ReactNode;
  /** Wrapper element. Defaults to a div. */
  as?: ElementType;
  /** Travel distance in rem. */
  y?: number;
  delay?: number;
  /** Stagger direct children instead of revealing the wrapper as one block. */
  stagger?: number;
  className?: string;
};

/**
 * Reveals content as it scrolls into view (fade + rise). Initial hidden state is
 * applied before paint (useLayoutEffect under the hood) to avoid flashes. When
 * reduced motion is on, content renders fully visible with no animation.
 */
export function ScrollReveal({
  children,
  as: Tag = "div",
  y = 1.5,
  delay = 0,
  stagger,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion() || !ref.current) return;

      const yPx = y * 16; // rem -> px for GSAP transforms
      const targets =
        stagger != null ? Array.from(ref.current.children) : ref.current;

      gsap.from(targets, {
        autoAlpha: 0,
        y: yPx,
        duration: 0.85,
        delay,
        ease: "power3.out",
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
