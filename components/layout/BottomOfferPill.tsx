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

const OFFER_MESSAGES = [
  {
    text: "Up to 35% discount - early bird limited offer",
  },
  {
    text: "Experience it first, spend later",
    cta: {
      label: "Start trial",
      href: "/checkout/54910/",
    },
  },
];

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

      const lettersByMessage = messages.map((message) =>
        gsap.utils.toArray<HTMLElement>("[data-offer-pill-letter]", message),
      );
      const ctas = messages.map((message) =>
        message.querySelector<HTMLElement>("[data-offer-pill-cta]"),
      );

      gsap.set(messages, { autoAlpha: 0 });
      gsap.set(messages[0], { autoAlpha: 1 });
      gsap.set(lettersByMessage[0], { autoAlpha: 1, yPercent: 0 });
      gsap.set(ctas.filter(Boolean), { autoAlpha: 0, yPercent: 80 });
      lettersByMessage.slice(1).forEach((letters) => {
        gsap.set(letters, { autoAlpha: 0, yPercent: 105 });
      });

      if (prefersReducedMotion() || messages.length < 2) return;

      gsap.to(root, {
        y: -4,
        duration: 2.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      const timeline = gsap.timeline({ repeat: -1 });

      messages.forEach((message, index) => {
        const currentLetters = lettersByMessage[index];
        const currentCta = ctas[index];
        const nextIndex = (index + 1) % messages.length;
        const next = messages[nextIndex];
        const nextLetters = lettersByMessage[nextIndex];
        const nextCta = ctas[nextIndex];

        timeline.to(currentLetters, {
          autoAlpha: 0,
          yPercent: -105,
          duration: 0.28,
          delay: 3,
          ease: "power2.in",
          stagger: { each: 0.012, from: "start" },
        });

        if (currentCta) {
          timeline.to(
            currentCta,
            {
              autoAlpha: 0,
              yPercent: -60,
              duration: 0.2,
              ease: "power2.in",
            },
            "<",
          );
        }

        timeline
          .set(message, { autoAlpha: 0 })
          .set(next, { autoAlpha: 1 })
          .fromTo(
            nextLetters,
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

        if (nextCta) {
          timeline.fromTo(
            nextCta,
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
      });
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label="ArraySubs offer: up to 35% discount, early bird limited offer. Experience it first, spend later."
      className="fixed bottom-5 left-5 z-[60] inline-flex min-h-12 max-w-[calc(100vw-2rem)] items-center gap-3 rounded-pill border border-white/20 bg-primary/78 px-4 py-2.5 text-sm font-bold text-white shadow-[0_1rem_3rem_rgba(15,10,44,0.24)] backdrop-blur-xl will-change-transform sm:bottom-7 sm:left-7 sm:min-h-14 sm:px-5 sm:text-[0.9375rem]"
    >
      <span className="sr-only">
        Up to 35% discount, early bird limited offer. Experience it first,
        spend later.
      </span>
      <span
        aria-hidden="true"
        className="relative grid h-[1.45em] max-w-[min(27rem,calc(100vw-4rem))] overflow-hidden leading-none"
      >
        {OFFER_MESSAGES.map((message, messageIndex) => (
          <span
            key={message.text}
            data-offer-pill-message
            className={cn(
              "col-start-1 row-start-1 flex items-center gap-2 whitespace-nowrap",
              messageIndex === 0 ? "opacity-100" : "opacity-0",
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
            {message.cta ? (
              <span data-offer-pill-cta className="inline-flex">
                <Link
                  href={message.cta.href}
                  className="inline-flex items-center gap-1 rounded-pill bg-white px-2.5 py-1 text-[0.6875rem] font-extrabold leading-none text-primary shadow-sm transition-colors hover:bg-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-xs"
                >
                  <span>{message.cta.label}</span>
                  <ArrowUpRight aria-hidden="true" className="size-3" />
                </Link>
              </span>
            ) : null}
          </span>
        ))}
      </span>
    </div>
  );
}
