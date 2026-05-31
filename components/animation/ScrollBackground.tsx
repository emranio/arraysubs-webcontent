"use client";

import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
  useGSAP,
} from "@/lib/gsap";

/** Background + foreground pairs keyed by the `data-scroll-bg` value. */
const THEMES = {
  light: { bg: "#ffffff", fg: "#01171a" },
  surface: { bg: "#f5f8f2", fg: "#01171a" },
  dark: { bg: "#01171a", fg: "#f1f7f1" },
  highlight: { bg: "#e1ff51", fg: "#01171a" },
} as const;

type ThemeKey = keyof typeof THEMES;

/**
 * Smoothly tweens the page background + text color as sections cross the
 * viewport center. Mark participating sections with
 * `data-scroll-bg="dark|highlight|surface|light"`. Their content should use the
 * inherited color (Section `surface="transparent"`) so it flips for contrast.
 * Skipped entirely under reduced motion.
 */
export function ScrollBackground() {
  useGSAP(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const sections = gsap.utils.toArray<HTMLElement>("[data-scroll-bg]");
    if (sections.length === 0) return;

    const triggers = sections.map((section) => {
      const key = (section.dataset.scrollBg as ThemeKey) || "light";
      const theme = THEMES[key] ?? THEMES.light;
      return ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (!self.isActive) return;
          gsap.to(document.body, {
            backgroundColor: theme.bg,
            color: theme.fg,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });
    });

    return () => triggers.forEach((trigger) => trigger.kill());
  });

  return null;
}
