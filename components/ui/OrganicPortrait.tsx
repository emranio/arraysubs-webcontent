"use client";

import { useRef } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap";
import { cn } from "@/lib/cn";
import styles from "./OrganicPortrait.module.scss";

type OrganicPortraitProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  className?: string;
};

/**
 * Organic image frame with a flat brand backing shape. The entrance and slow
 * mask morph mirror the portrait treatment on emran.io while respecting this
 * site's reduced-motion and token-based styling rules.
 */
export function OrganicPortrait({
  src,
  alt,
  width,
  height,
  caption,
  className,
}: OrganicPortraitProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();

      const root = rootRef.current;
      if (!root) return;

      if (prefersReducedMotion()) {
        gsap.set(root, { autoAlpha: 1, scale: 1, rotation: 0 });
        return;
      }

      gsap.fromTo(
        root,
        { autoAlpha: 0, scale: 0.9, rotation: -4 },
        {
          autoAlpha: 1,
          scale: 1,
          rotation: 0,
          duration: 1.1,
          delay: 0.1,
          ease: "expo.out",
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <figure
      ref={rootRef}
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[26rem] will-change-transform xl:max-w-[28rem]",
        className,
      )}
      data-organic-portrait
    >
      <div
        className="absolute inset-0 grid place-items-center text-offer"
        aria-hidden="true"
      >
        <svg
          className="size-[116%] max-w-none overflow-visible"
          viewBox="0 0 500 500"
          focusable="false"
        >
          <path
            d="M421.5 317.5Q393 385 318 418Q243 451 168 418Q93 385 71.5 310Q50 235 86 162Q122 89 201 69.5Q280 50 353 89.5Q426 129 442 201.5Q458 274 421.5 317.5Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="absolute inset-0 grid place-items-center">
        <div
          className={cn(
            styles.mask,
            "relative h-[88%] w-[88%] overflow-hidden border-[0.375rem] border-background",
          )}
          data-organic-portrait-mask
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            width={width}
            height={height}
            alt={alt}
            loading="eager"
            decoding="async"
            className="h-full w-full scale-110 object-cover object-center"
          />
        </div>
      </div>

      {caption && <figcaption className="sr-only">{caption}</figcaption>}
    </figure>
  );
}
