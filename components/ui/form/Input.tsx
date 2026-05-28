import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/cn";
import { controlBase } from "./controlClasses";

/** Text input. Pair with <Field> for label + a11y wiring. */
export function Input({
  className,
  type = "text",
  ...props
}: ComponentPropsWithRef<"input">) {
  return (
    <input type={type} className={cn(controlBase, "h-12", className)} {...props} />
  );
}
