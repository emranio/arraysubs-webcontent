import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrayHashMark } from "./ArrayHashMark";

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
      {withLine && <ArrayHashMark className="text-[0.9em] opacity-65" />}
      {children}
    </span>
  );
}
