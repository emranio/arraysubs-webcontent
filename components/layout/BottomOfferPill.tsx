"use client";

import { useRef } from "react";
import Link from "next/link";
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
    text: "Up to 30% discount - early bird limited offer",
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

export function BottomOfferPill() {
  const rootRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label="ArraySubs offer: up to 30% discount, early bird limited offer. Experience it first, spend later."
      className="fixed bottom-5 left-5 z-[60] inline-flex min-h-12 max-w-[calc(100vw-2rem)] items-center gap-3 rounded-pill border border-white/20 bg-primary/78 px-4 py-2.5 text-[0.9375rem] font-bold text-white shadow-[0_1rem_3rem_rgba(15,10,44,0.24)] backdrop-blur-xl will-change-transform sm:bottom-7 sm:left-7 sm:min-h-14 sm:px-5 sm:text-[1.0625rem]"
    >
      <Link
        href={PRICING_HREF}
        aria-label="Up to 30% discount - view ArraySubs pricing"
        className="absolute inset-0 rounded-pill focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none relative grid h-[1.45em] max-w-[calc(100vw-4rem)] overflow-hidden leading-none"
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
                className="pointer-events-auto inline-flex items-center gap-1 rounded-pill bg-[#FE8218] px-2.5 py-1 text-xs font-extrabold leading-none text-white shadow-sm transition-colors hover:bg-[#fe9440] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-[0.8125rem]"
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
