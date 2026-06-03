import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "primary" | "dark" | "highlight" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-surface text-muted",
  primary: "bg-primary text-on-dark",
  dark: "bg-dark text-on-dark",
  highlight: "bg-highlight text-dark",
  outline: "border border-current text-current",
};

/** Small status / category pill (e.g. Free, Pro, New). */
export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-xs font-semibold tracking-wide uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
