"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap";
import { cn } from "@/lib/cn";
import styles from "./BigText.module.scss";

type Size = "display" | "display-lg" | "display-xl";
type Variant = "ink" | "highlight" | "primary";

type BigTextProps = {
  children: ReactNode;
  as?: ElementType;
  size?: Size;
  /** ink: dark fill (light bg). highlight/primary: bright fill (dark bg). */
  variant?: Variant;
  align?: "left" | "center";
  className?: string;
  id?: string;
};

const sizeClass: Record<Size, string> = {
  display: "text-display",
  "display-lg": "text-display-lg",
  "display-xl": "text-display-xl",
};

const variantVars: Record<Variant, CSSProperties> = {
  ink: {
    ["--bt-base" as string]: "var(--color-border-strong)",
    ["--bt-fill" as string]: "var(--color-dark)",
  },
  highlight: {
    ["--bt-base" as string]: "var(--color-on-dark-border)",
    ["--bt-fill" as string]: "var(--color-highlight)",
  },
  primary: {
    ["--bt-base" as string]: "var(--color-border-strong)",
    ["--bt-fill" as string]: "var(--color-primary)",
  },
};

/**
 * Oversized display heading whose text "inks in" with color as it scrolls
 * through the viewport (background-clip: text + scrubbed fill). Fully filled and
 * static under reduced motion.
 */
export function BigText({
  children,
  as: Tag = "h2",
  size = "display-lg",
  variant = "ink",
  align = "left",
  className,
  id,
}: BigTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        el.style.setProperty("--fill-progress", "100%");
        return;
      }
      const proxy = { p: 0 };
      gsap.to(proxy, {
        p: 100,
        ease: "none",
        onUpdate: () => el.style.setProperty("--fill-progress", `${proxy.p}%`),
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      id={id}
      style={variantVars[variant]}
      className={cn(
        styles.text,
        "max-w-full break-words font-display [overflow-wrap:anywhere]",
        sizeClass[size],
        align === "center" && "text-center",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
