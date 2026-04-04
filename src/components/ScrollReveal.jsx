"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Wraps children and fades+slides them in when they scroll into view.
 *
 * Props:
 *  - y          initial translateY (default 40)
 *  - delay      seconds (default 0)
 *  - duration   seconds (default 0.8)
 *  - stagger    if children use .reveal-item class (default 0.1)
 *  - className  extra class on the wrapper
 *  - as         wrapper element (default "div")
 */
export default function ScrollReveal({
  children,
  y = 40,
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
  className = "",
  as: Tag = "div",
  ...rest
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const items = ref.current.querySelectorAll(".reveal-item");
      const targets = items.length > 0 ? items : ref.current.children;

      if (targets.length === 0) return;

      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
