import { useId, type ComponentPropsWithRef, type ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

type CheckboxProps = ComponentPropsWithRef<"input"> & { label: ReactNode };

/**
 * Custom-designed checkbox (no native appearance). The real input is visually
 * hidden but fully functional; the visible box + check reflect its state via the
 * `peer` pattern, preserving keyboard, focus and form semantics.
 */
export function Checkbox({ label, id, className, ...props }: CheckboxProps) {
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
        <input id={controlId} type="checkbox" className="peer sr-only" {...props} />
        <span
          aria-hidden="true"
          className="col-start-1 row-start-1 size-5 rounded-[0.3rem] border-2 border-border-strong bg-background transition-colors duration-150 peer-checked:border-dark peer-checked:bg-dark peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-dark peer-disabled:opacity-50"
        />
        <Check
          aria-hidden="true"
          strokeWidth={3}
          className="col-start-1 row-start-1 size-3.5 text-on-dark opacity-0 transition-opacity duration-150 peer-checked:opacity-100"
        />
      </span>
      <span>{label}</span>
    </label>
  );
}
