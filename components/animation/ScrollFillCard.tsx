"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap";
import { siteColors } from "@/lib/colors";

type ScrollFillCardProps = {
  /** When set, the card renders as a link to this href. */
  href?: string;
  /** Background colour before the reveal; it animates to the class-based bg. */
  fromColor?: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

/**
 * A panel that reveals on scroll: its background fills from `fromColor`
 * (default page white) to its own class-based background while the content
 * fades in. The class-based final state is what renders server-side and under
 * reduced motion, so the panel is always readable without JS.
 */
export function ScrollFillCard({
  href,
  fromColor = siteColors.background,
  className,
  children,
  ...rest
}: ScrollFillCardProps) {
  const elRef = useRef<HTMLElement | null>(null);
  const setRef = (node: HTMLElement | null) => {
    elRef.current = node;
  };

  useGSAP(
    () => {
      registerGsap();
      const el = elRef.current;
      if (!el || prefersReducedMotion()) return;

      // Triggers once the card is well into view (not the instant it peeks in)
      // and plays slowly, so the fill-to-dark and content fade are noticeable.
      // Background fills white -> its class colour first; the (white) content
      // then fades in once the surface is dark enough to read against.
      gsap
        .timeline({
          scrollTrigger: { trigger: el, start: "top 68%", once: true },
        })
        .from(el, {
          backgroundColor: fromColor,
          duration: 1.3,
          ease: "power2.out",
        })
        .from(
          Array.from(el.children),
          {
            autoAlpha: 0,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.15,
          },
          0.6,
        );
    },
    { scope: elRef },
  );

  if (href) {
    return (
      <Link ref={setRef} href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <div ref={setRef} className={className} {...rest}>
      {children}
    </div>
  );
}
