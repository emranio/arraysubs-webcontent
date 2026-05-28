import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type Surface = "dark" | "primary" | "highlight" | "surface";

const surfaces: Record<Surface, string> = {
  dark: "bg-dark text-on-dark on-dark",
  primary: "bg-primary text-dark",
  highlight: "bg-highlight text-dark",
  surface: "bg-surface text-foreground",
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
  className?: string;
};

/** Reusable call-to-action panel (rounded band). Drop into any Container. */
export function CTA({
  eyebrow,
  title,
  subtitle,
  actions,
  microcopy,
  surface = "dark",
  className,
}: CTAProps) {
  return (
    <div
      data-surface={surface === "dark" ? "dark" : undefined}
      className={cn(
        "relative isolate overflow-hidden rounded-2xl px-6 py-14 text-center sm:px-12 sm:py-20",
        surfaces[surface],
        className,
      )}
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
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
