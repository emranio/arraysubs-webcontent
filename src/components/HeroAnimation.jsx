"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Hero-level entrance animation: staggers children in with scale + opacity.
 *
 * Children should have class .hero-anim-item to be animated individually.
 * Wraps in a div that also gets the GSAP matchMedia for reduced-motion.
 */
export default function HeroAnimation({ children, className = "" }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = ref.current.querySelectorAll(".hero-anim-item");

        gsap.from(items, {
          y: 30,
          autoAlpha: 0,
          scale: 0.97,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
