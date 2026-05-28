import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RadioProps = ComponentPropsWithRef<"input"> & { label: ReactNode };

/**
 * Custom-designed radio (no native appearance). Usually rendered via
 * <RadioGroup>, but can be used standalone. Uses the `peer` pattern.
 */
export function Radio({ label, id, className, ...props }: RadioProps) {
  const autoId = useId();
  const controlId = id ?? autoId;
  return (
    <label
      htmlFor={controlId}
      className={cn(
        "flex cursor-pointer items-start gap-3 text-sm text-muted",
        className,
      )}
    >
      <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
        <input id={controlId} type="radio" className="peer sr-only" {...props} />
        <span
          aria-hidden="true"
          className="col-start-1 row-start-1 size-5 rounded-full border-2 border-border-strong bg-background transition-colors duration-150 peer-checked:border-dark peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-dark peer-disabled:opacity-50"
        />
        <span
          aria-hidden="true"
          className="col-start-1 row-start-1 size-2.5 rounded-full bg-dark opacity-0 transition-opacity duration-150 peer-checked:opacity-100"
        />
      </span>
      <span>{label}</span>
    </label>
  );
}
