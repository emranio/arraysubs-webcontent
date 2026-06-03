"use client";

import { useEffect } from "react";
import {
  gsap,
  prefersReducedMotion,
} from "@/lib/gsap";
import { scrollBackgroundThemes } from "@/lib/colors";

/** Background + foreground pairs keyed by the `data-scroll-bg` value. */
const THEMES = scrollBackgroundThemes;

type ThemeKey = keyof typeof THEMES;

/**
 * Keeps the page-level tone in sync with the scroll stage currently occupying
 * the viewport focus point. Mark participating sections with
 * `data-scroll-bg="dark|highlight|surface|light"`. Their content should use
 * inherited color (Section `surface="transparent"`) so it stays readable while
 * the page background changes.
 */
export function ScrollBackground() {
  useEffect(() => {
    const body = document.body;
    const reduceMotion = prefersReducedMotion();
    let activeKey: ThemeKey | null = null;
    let activeTween: gsap.core.Tween | null = null;

    const scrollSections = () =>
      gsap.utils.toArray<HTMLElement>("[data-scroll-bg]");

    const sectionKey = (section: HTMLElement): ThemeKey => {
      const key = section.dataset.scrollBg as ThemeKey | undefined;
      return key && key in THEMES ? key : "light";
    };

    const themeAtFocusPoint = (): ThemeKey => {
      const focusY = window.innerHeight * 0.5;
      let key: ThemeKey = "light";

      for (const section of scrollSections()) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= focusY && rect.bottom >= focusY) {
          key = sectionKey(section);
        }
      }

      return key;
    };

    const paint = (key: ThemeKey, instant = false) => {
      if (key === activeKey && !instant) return;
      activeKey = key;
      const theme = THEMES[key] ?? THEMES.light;

      activeTween?.kill();
      if (instant || reduceMotion) {
        gsap.set(body, {
          backgroundColor: theme.bg,
          color: theme.fg,
        });
        return;
      }

      activeTween = gsap.to(body, {
        backgroundColor: theme.bg,
        color: theme.fg,
        duration: 0.55,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const sync = (instant = false) => paint(themeAtFocusPoint(), instant);
    let frame: number | null = null;

    const scheduleSync = (instant = false) => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        frame = null;
        sync(instant);
      });
    };

    const onScroll = () => scheduleSync();
    const onResize = () => scheduleSync(true);
    const observer = new MutationObserver(() => scheduleSync(true));

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    observer.observe(body, { childList: true, subtree: true });
    scheduleSync(true);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      activeTween?.kill();
      gsap.set(body, { clearProps: "backgroundColor,color" });
    };
  }, []);

  return null;
}
