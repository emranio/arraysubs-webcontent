import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/cn";
import { controlBase } from "./controlClasses";

/** Multi-line text input. Pair with <Field>. */
export function Textarea({
  className,
  rows = 4,
  ...props
}: ComponentPropsWithRef<"textarea">) {
  return (
    <textarea
      rows={rows}
      className={cn(controlBase, "min-h-28 py-3 leading-relaxed", className)}
      {...props}
    />
  );
}
