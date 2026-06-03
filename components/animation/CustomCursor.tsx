"use client";

import { useEffect, useRef } from "react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import {
  gsap,
  hasFinePointer,
  prefersReducedMotion,
  registerGsap,
} from "@/lib/gsap";
import styles from "./CustomCursor.module.scss";

/* ---- Rounded shape path builders (24x24 viewBox, centered at 12,12) ------- */
type Point = [number, number];

function pointToward(from: Point, to: Point, dist: number): Point {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy) || 1;
  const d = Math.min(dist, len / 2);
  return [from[0] + (dx / len) * d, from[1] + (dy / len) * d];
}

function roundedPath(verts: Point[], round: number): string {
  const n = verts.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const prev = verts[(i - 1 + n) % n];
    const cur = verts[i];
    const next = verts[(i + 1) % n];
    const a = pointToward(cur, prev, round);
    const b = pointToward(cur, next, round);
    d += `${i === 0 ? "M" : "L"}${a[0].toFixed(2)} ${a[1].toFixed(2)}`;
    d += `Q${cur[0].toFixed(2)} ${cur[1].toFixed(2)} ${b[0].toFixed(2)} ${b[1].toFixed(2)}`;
  }
  return `${d}Z`;
}

function roundedPolygon(
  radius: number,
  sides: number,
  round: number,
  rotation = -Math.PI / 2,
  innerRatio?: number,
): string {
  const cx = 12;
  const cy = 12;
  const count = innerRatio ? sides * 2 : sides;
  const verts: Point[] = [];
  for (let i = 0; i < count; i++) {
    const r = innerRatio && i % 2 === 1 ? radius * innerRatio : radius;
    const a = rotation + (i * 2 * Math.PI) / count;
    verts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return roundedPath(verts, round);
}

const SHAPES = {
  circle: roundedPolygon(9, 10, 100),
  triangle: roundedPolygon(10, 3, 2.6),
  square: roundedPolygon(10, 4, 3.4, -Math.PI / 4),
  hexagon: roundedPolygon(10, 6, 2.6, 0),
};
type ShapeKey = keyof typeof SHAPES;
const SHAPE_KEYS = Object.keys(SHAPES) as ShapeKey[];

/**
 * GSAP cursor companion that follows the system pointer (the native cursor stays
 * visible). A small solid ring trails the pointer; an inverting dot tracks it
 * tightly and morphs into random rounded shapes (triangle/square/hexagon/circle)
 * on fast movement, settling back to a circle when motion slows. Disabled on
 * touch devices and under reduced motion.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    registerGsap();
    gsap.registerPlugin(MorphSVGPlugin);

    const ring = ringRef.current;
    const dot = dotRef.current;
    const path = pathRef.current;
    if (!ring || !dot || !path) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3" });

    let shown = false;
    let lastX = 0;
    let lastY = 0;
    let lastT = performance.now();
    let lastChange = 0;
    let current: ShapeKey = "circle";

    const morphTo = (key: ShapeKey) => {
      if (key === current) return;
      current = key;
      gsap.to(path, { duration: 0.35, ease: "power3.out", morphSVG: SHAPES[key] });
      gsap.fromTo(dot, { scale: 0.65 }, { scale: 1, duration: 0.45, ease: "back.out(2)" });
    };

    const FAST = 1.5; // px per ms
    const interactive =
      'a, button, summary, input, textarea, select, [role="tab"], [role="combobox"], [data-cursor="hover"]';

    const onMove = (event: PointerEvent) => {
      const now = performance.now();
      if (!shown) {
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
        shown = true;
        lastX = event.clientX;
        lastY = event.clientY;
        lastT = now;
      }
      const dt = Math.max(now - lastT, 1);
      const velocity = Math.hypot(event.clientX - lastX, event.clientY - lastY) / dt;
      lastX = event.clientX;
      lastY = event.clientY;
      lastT = now;

      xDot(event.clientX);
      yDot(event.clientY);
      xRing(event.clientX);
      yRing(event.clientY);

      if (velocity > FAST && now - lastChange > 240) {
        lastChange = now;
        const choices = SHAPE_KEYS.filter((k) => k !== current);
        morphTo(choices[Math.floor(Math.random() * choices.length)]);
      }
    };

    const onOver = (event: PointerEvent) => {
      if ((event.target as Element)?.closest?.(interactive)) {
        gsap.to(ring, {
          scale: 1.8,
          // Complement of primary — the ring's `difference` blend inverts it
          // back to primary (#873EFF) over a light background.
          backgroundColor: "rgba(120, 193, 0, 0.3)",
          duration: 0.3,
          ease: "power3",
        });
      }
    };
    const onOut = (event: PointerEvent) => {
      if ((event.target as Element)?.closest?.(interactive)) {
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "rgba(120, 193, 0, 0)", // fade out (complement of primary)
          duration: 0.3,
          ease: "power3",
        });
      }
    };
    const onLeave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    const onEnter = () => gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
      <div ref={dotRef} className={styles.dot} aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path ref={pathRef} d={SHAPES.circle} />
        </svg>
      </div>
    </>
  );
}
