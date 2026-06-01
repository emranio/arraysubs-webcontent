import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type Surface = "highlight" | "primary" | "dark" | "surface";

const surfaces: Record<Surface, string> = {
  highlight: "bg-highlight text-dark",
  primary: "bg-primary text-on-dark",
  dark: "bg-dark text-on-dark on-dark",
  surface: "bg-surface text-foreground",
};

const flatSurfaces: Record<Surface, string> = {
  highlight: "text-dark",
  primary: "text-on-dark on-dark",
  dark: "text-on-dark on-dark",
  surface: "text-foreground",
};

/** Decorative tone-on-tone shapes for the bright surfaces (flat, no gradient). */
const BRIGHT_DECOR: Partial<
  Record<Surface, { topRight: string; bottomLeft: string }>
> = {
  // Mirrors the Hero `highlight` tone: light tint bg with primary shapes.
  highlight: { topRight: "bg-primary", bottomLeft: "bg-primary" },
};

type CTAProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Buttons / links. */
  actions?: ReactNode;
  /** Reassurance line under the actions. */
  microcopy?: ReactNode;
  surface?: Surface;
  /** Drops the panel fill/rounding so the parent section owns the background. */
  flat?: boolean;
  className?: string;
};

/**
 * Reusable call-to-action panel. Bright surfaces (`highlight`, `primary`) get
 * a pair of oversized tone-on-tone decorative circles for visual depth — no
 * gradients, all flat tones.
 */
export function CTA({
  eyebrow,
  title,
  subtitle,
  actions,
  microcopy,
  surface = "primary",
  flat = false,
  className,
}: CTAProps) {
  const decor = flat ? undefined : BRIGHT_DECOR[surface];
  const onPrimarySurface = surface === "primary" || surface === "dark";

  return (
    <div
      data-surface={surface === "dark" ? "dark" : undefined}
      className={cn(
        "relative isolate text-center",
        flat
          ? "px-0 py-0"
          : cn(
              "overflow-hidden rounded-2xl px-6 py-14 sm:px-12 sm:py-20",
              surfaces[surface],
            ),
        flat && flatSurfaces[surface],
        className,
      )}
    >
      {decor && (
        <>
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute -top-28 -right-28 size-[26rem] rounded-full",
              decor.topRight,
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute -bottom-32 -left-24 size-[22rem] rounded-full opacity-70",
              decor.bottomLeft,
            )}
          />
        </>
      )}

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-5">
        {eyebrow && (
          <Eyebrow className={onPrimarySurface ? "text-on-dark" : undefined}>
            {eyebrow}
          </Eyebrow>
        )}
        <h2 className="font-display text-3xl text-balance sm:text-display-sm">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-pretty opacity-90 sm:text-xl">{subtitle}</p>
        )}
        {actions && (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            {actions}
          </div>
        )}
        {microcopy && <p className="text-sm opacity-70">{microcopy}</p>}
      </div>
    </div>
  );
}
