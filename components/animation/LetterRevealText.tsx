"use client";

import { useRef, type CSSProperties, type ElementType } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap";
import { cn } from "@/lib/cn";

type LetterRevealTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  y?: number;
  ariaHidden?: boolean;
  id?: string;
  style?: CSSProperties;
};

export function LetterRevealText({
  text,
  as: Tag = "span",
  className,
  charClassName,
  delay = 0,
  stagger = 0.025,
  y = 0.8,
  ariaHidden = false,
  id,
  style,
}: LetterRevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const letters = el.querySelectorAll<HTMLElement>("[data-letter]");
      gsap.fromTo(
        letters,
        { autoAlpha: 0, y: y * 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          delay,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      id={id}
      style={style}
      aria-hidden={ariaHidden || undefined}
      aria-label={ariaHidden ? undefined : text}
      className={className}
    >
      <span aria-hidden="true">
        {Array.from(text).map((character, index) => (
          <span
            key={`${character}-${index}`}
            data-letter
            className={cn("inline-block", charClassName)}
          >
            {character === " " ? "\u00A0" : character}
          </span>
        ))}
      </span>
    </Tag>
  );
}
