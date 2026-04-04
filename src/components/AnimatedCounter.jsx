"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Animates a number from 0 to `value` when it scrolls into view.
 *
 * Props:
 *  - value     target number
 *  - suffix    text after number (e.g. "+", "%", "x")
 *  - prefix    text before number (e.g. "$")
 *  - duration  seconds (default 2)
 *  - className extra class
 */
export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}) {
  const ref = useRef(null);
  const numRef = useRef({ val: 0 });
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useGSAP(
    () => {
      gsap.to(numRef.current, {
        val: value,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          setDisplay(
            `${prefix}${Math.round(numRef.current.val).toLocaleString()}${suffix}`,
          );
        },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
