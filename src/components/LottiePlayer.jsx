"use client";

import { useRef } from "react";
import Lottie from "lottie-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Lottie wrapper with three loading modes per design system:
 *
 *  - "autoplay"       hero ambient loop (autoplay + loop)
 *  - "scroll"         play on scroll-trigger via GSAP
 *  - "hover"          play on hover
 *
 * Props:
 *  - animationData   imported Lottie JSON (required)
 *  - mode            "autoplay" | "scroll" | "hover" (default "scroll")
 *  - className       extra class
 *  - style           inline style object
 *  - ariaLabel       accessible label
 */
export default function LottiePlayer({
  animationData,
  mode = "scroll",
  className = "",
  style = {},
  ariaLabel = "Animated illustration",
}) {
  const containerRef = useRef(null);
  const lottieRef = useRef(null);

  const isAutoplay = mode === "autoplay";
  const isHover = mode === "hover";

  useGSAP(
    () => {
      if (mode !== "scroll" || !containerRef.current) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          lottieRef.current?.play();
        },
      });
    },
    { scope: containerRef, dependencies: [mode] },
  );

  const handleMouseEnter = () => {
    if (isHover && lottieRef.current) {
      lottieRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (isHover && lottieRef.current) {
      lottieRef.current.stop();
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="img"
      aria-label={ariaLabel}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={isAutoplay}
        autoplay={isAutoplay}
        renderer="svg"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
