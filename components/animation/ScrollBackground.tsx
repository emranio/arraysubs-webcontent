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

    const tween = (key: ThemeKey, instant = false) => {
      const theme = THEMES[key] ?? THEMES.light;
      gsap.to(document.body, {
        backgroundColor: theme.bg,
        color: theme.fg,
        duration: instant ? 0 : 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const triggers = sections.map((section) => {
      const key = (section.dataset.scrollBg as ThemeKey) || "light";
      return ScrollTrigger.create({
        trigger: section,
        // `top center` is too late — content is already in view by then.
        // `top 80%` fires as the band enters the lower 20% of the viewport.
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => tween(key),
        onEnterBack: () => tween(key),
      });
    });

    // Sync the body to whichever band is active at mount time. Without this,
    // a reload (or deep-link) mid-band leaves the body at default colors
    // because onEnter only fires on a state CHANGE during scroll.
    const syncInitial = () => {
      const scrollY = window.scrollY;
      let activeKey: ThemeKey | null = null;
      for (let i = 0; i < triggers.length; i++) {
        // The most-recently-passed band wins — that's the one we're "inside".
        if (triggers[i].start <= scrollY) {
          activeKey = (sections[i].dataset.scrollBg as ThemeKey) || "light";
        }
      }
      if (activeKey) tween(activeKey, true);
    };
    // Defer one frame so ScrollTrigger has finished computing `start`/`end`.
    requestAnimationFrame(syncInitial);

    return () => triggers.forEach((trigger) => trigger.kill());
  });

  return null;
}
