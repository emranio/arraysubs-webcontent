import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  withLine?: boolean;
  className?: string;
};

/** Small uppercase label that sits above a heading (a.k.a. section label). */
export function Eyebrow({ children, withLine = true, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted",
        className,
      )}
    >
      {withLine && (
        <span aria-hidden="true" className="opacity-50">/</span>
      )}
      {children}
    </span>
  );
}
