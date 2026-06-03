"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SwitchProps = {
  label: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  /** When set, a hidden input submits "on"/"" with the form. */
  name?: string;
  disabled?: boolean;
  description?: ReactNode;
  id?: string;
  className?: string;
};

/**
 * Custom toggle switch using role="switch" on a button (keyboard: Space/Enter).
 * Controlled (`checked`) or uncontrolled (`defaultChecked`).
 */
export function Switch({
  label,
  checked,
  defaultChecked = false,
  onChange,
  name,
  disabled = false,
  description,
  id,
  className,
}: SwitchProps) {
  const autoId = useId();
  const controlId = id ?? autoId;
  const labelId = `${controlId}-label`;
  const descId = description ? `${controlId}-desc` : undefined;

  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const on = isControlled ? checked : internal;

  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <button
        type="button"
        role="switch"
        id={controlId}
        aria-checked={on}
        aria-labelledby={labelId}
        aria-describedby={descId}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          "mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-pill border-2 transition-colors duration-200 disabled:opacity-50",
          on ? "border-dark bg-dark" : "border-border-strong bg-surface",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block size-4 rounded-full bg-background transition-transform duration-200",
            on ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </button>
      <span className="flex flex-col">
        <label id={labelId} htmlFor={controlId} className="cursor-pointer text-sm font-medium">
          {label}
        </label>
        {description && (
          <span id={descId} className="text-sm text-muted">
            {description}
          </span>
        )}
      </span>
      {name && <input type="hidden" name={name} value={on ? "on" : ""} />}
    </div>
  );
}
