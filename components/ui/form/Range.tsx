import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/cn";

/** Range slider input. Tinted via accent-color so it stays native + accessible. */
export function Range({ className, ...props }: ComponentPropsWithRef<"input">) {
  return (
    <input
      type="range"
      className={cn(
        "w-full cursor-pointer [accent-color:var(--color-dark)]",
        className,
      )}
      {...props}
    />
  );
}
