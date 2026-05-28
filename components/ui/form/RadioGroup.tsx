import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Radio } from "./Radio";

export type RadioOption = { label: string; value: string };

type RadioGroupProps = {
  legend: ReactNode;
  name: string;
  options: RadioOption[];
  /** Controlled selected value. */
  value?: string;
  onChange?: (value: string) => void;
  /** Uncontrolled initial value (ignored when `value` is set). */
  defaultValue?: string;
  description?: ReactNode;
  className?: string;
};

/** Accessible radio group (fieldset + legend) of custom radios. */
export function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
  defaultValue,
  description,
  className,
}: RadioGroupProps) {
  const isControlled = value !== undefined;
  return (
    <fieldset className={cn("flex flex-col gap-3", className)}>
      <legend className="text-sm font-medium">{legend}</legend>
      {description && <p className="-mt-1 text-sm text-muted">{description}</p>}
      <div className="flex flex-col gap-3 pt-1">
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            {...(isControlled
              ? {
                  checked: value === option.value,
                  onChange: () => onChange?.(option.value),
                }
              : { defaultChecked: defaultValue === option.value })}
          />
        ))}
      </div>
    </fieldset>
  );
}
