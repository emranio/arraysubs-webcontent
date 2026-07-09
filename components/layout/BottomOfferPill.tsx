"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap";

const PRICING_HREF = "/deals/arraysubs/pricing/";

const OFFER_MESSAGES = [
  {
    text: "Limited time - Up to 30% discount",
    cta: {
      label: "Get offer",
      href: PRICING_HREF,
    },
  },
  {
    text: "Experience it first, spend later",
    cta: {
      label: "Start trial",
      href: PRICING_HREF,
    },
  },
];

const HOLD_SECONDS = 3;
const SHOW_AFTER_SCROLL_REM = 4;

export function BottomOfferPill() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname() ?? "";
  const isCheckoutPath = pathname.startsWith("/checkout/");

  useEffect(() => {
    if (isCheckoutPath) return;

    let frameId: number | null = null;

    const getThreshold = () => {
      const rootFontSize = Number.parseFloat(
        window.getComputedStyle(document.documentElement).fontSize,
      );

      return (Number.isFinite(rootFontSize) ? rootFontSize : 16) *
        SHOW_AFTER_SCROLL_REM;
    };

    const updateVisibility = () => {
      frameId = null;
      const nextVisible = window.scrollY >= getThreshold();
      setIsVisible((current) =>
        current === nextVisible ? current : nextVisible,
      );
    };

    const scheduleVisibilityUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();

    window.addEventListener("scroll", scheduleVisibilityUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleVisibilityUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleVisibilityUpdate);
      window.removeEventListener("resize", scheduleVisibilityUpdate);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [isCheckoutPath]);

  useGSAP(
    () => {
      registerGsap();

      const root = rootRef.current;
      if (!root) return;

      const messages = gsap.utils.toArray<HTMLElement>(
        "[data-offer-pill-message]",
        root,
      );

      if (messages.length === 0) return;

      // Static fallback: the first message is already visible via classes.
      if (prefersReducedMotion() || messages.length < 2) return;

      const lettersByMessage = messages.map((message) =>
        gsap.utils.toArray<HTMLElement>("[data-offer-pill-letter]", message),
      );
      const ctas = messages.map((message) =>
        message.querySelector<HTMLElement>("[data-offer-pill-cta]"),
      );

      // Message containers stay visible; letters and CTAs carry visibility so
      // the repeating timeline never depends on container-level toggling.
      gsap.set(messages, { autoAlpha: 1 });
      gsap.set(lettersByMessage.flat(), { autoAlpha: 0, yPercent: 105 });
      gsap.set(ctas.filter(Boolean), { autoAlpha: 0, yPercent: 80 });

      gsap.to(root, {
        y: -4,
        duration: 2.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Each message runs a self-contained in -> hold -> out block, so the
      // timeline ends in the same all-hidden state it starts from and the
      // infinite repeat wraps seamlessly.
      const timeline = gsap.timeline({ repeat: -1 });

      messages.forEach((_, index) => {
        const letters = lettersByMessage[index];
        const cta = ctas[index];

        timeline.fromTo(
          letters,
          { autoAlpha: 0, yPercent: 105 },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.36,
            ease: "power3.out",
            immediateRender: false,
            stagger: { each: 0.015, from: "start" },
          },
        );

        if (cta) {
          timeline.fromTo(
            cta,
            { autoAlpha: 0, yPercent: 80 },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 0.24,
              ease: "power3.out",
              immediateRender: false,
            },
            "<0.16",
          );
        }

        timeline.to(
          letters,
          {
            autoAlpha: 0,
            yPercent: -105,
            duration: 0.28,
            ease: "power2.in",
            stagger: { each: 0.012, from: "start" },
          },
          `+=${HOLD_SECONDS}`,
        );

        if (cta) {
          timeline.to(
            cta,
            {
              autoAlpha: 0,
              yPercent: -60,
              duration: 0.2,
              ease: "power2.in",
            },
            "<",
          );
        }
      });
    },
    { scope: rootRef },
  );

  if (isCheckoutPath) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      role="region"
      aria-hidden={!isVisible}
      aria-label="ArraySubs offer: up to 30% discount, early bird limited offer. Experience it first, spend later."
      className={cn(
        "fixed right-5 bottom-5 left-5 z-[60] inline-flex min-h-12 min-w-0 items-center justify-center gap-3 rounded-pill  bg-[color-mix(in_srgb,var(--color-offer)_70%,transparent)] px-4 py-2.5 text-[0.9375rem] font-bold text-orange-950 backdrop-blur-sm transition-opacity duration-300 ease-out will-change-[opacity,transform] sm:right-auto sm:bottom-5 sm:left-7 sm:min-h-14 sm:max-w-[calc(100vw-2rem)] sm:px-5 sm:text-[1.0625rem]",
        isVisible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <Link
        href={PRICING_HREF}
        aria-label="Up to 30% discount - view ArraySubs pricing"
        tabIndex={isVisible ? undefined : -1}
        className="absolute inset-0 rounded-pill focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none relative grid h-[1.45em] max-w-full min-w-0 overflow-hidden leading-none"
      >
        {OFFER_MESSAGES.map((message, messageIndex) => (
          <span
            key={message.text}
            data-offer-pill-message
            className={cn(
              "col-start-1 row-start-1 flex items-center gap-2 whitespace-nowrap",
              messageIndex === 0 ? "opacity-100" : "invisible opacity-0",
            )}
          >
            <span className="inline-flex">
              {Array.from(message.text).map((letter, letterIndex) => (
                <span
                  // The message text is static, so this index key is stable.
                  key={`${message.text}-${letterIndex}`}
                  data-offer-pill-letter
                  className="inline-block will-change-transform"
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </span>
            <span data-offer-pill-cta className="inline-flex">
              <Link
                href={message.cta.href}
                tabIndex={isVisible ? undefined : -1}
                className="pointer-events-auto inline-flex items-center gap-1 rounded-pill bg-primary px-1.5 py-1 font-extrabold leading-none text-on-dark transition-colors hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white "
              >
                <span>{message.cta.label}</span>
                <ArrowUpRight aria-hidden="true" className="size-3" />
              </Link>
            </span>
          </span>
        ))}
      </span>
    </div>
  );
}
