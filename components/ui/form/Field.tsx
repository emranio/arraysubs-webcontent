import {
  cloneElement,
  isValidElement,
  useId,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type FieldProps = {
  label: ReactNode;
  /** A single control element (Input / Textarea / Select / …). */
  children: ReactElement;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  /** Visually hide the label but keep it for assistive tech. */
  hideLabel?: boolean;
  className?: string;
};

/**
 * Labelled form field. Generates a stable id, links label → control, and wires
 * aria-describedby (description + error), aria-invalid and aria-required onto
 * the child control automatically.
 */
export function Field({
  label,
  children,
  description,
  error,
  required = false,
  hideLabel = false,
  className,
}: FieldProps) {
  const id = useId();
  const controlId = `${id}-control`;
  const labelId = `${id}-label`;
  const descId = description ? `${id}-desc` : undefined;
  const errId = error ? `${id}-err` : undefined;
  const describedBy =
    [descId, errId].filter(Boolean).join(" ") || undefined;

  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        ...(children.props as Record<string, unknown>),
        id: controlId,
        // aria-labelledby makes the label work for custom (button-based)
        // controls too, not just native inputs.
        "aria-labelledby": labelId,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        "aria-required": required ? true : undefined,
      })
    : children;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        id={labelId}
        htmlFor={controlId}
        className={cn("text-sm font-medium", hideLabel && "sr-only")}
      >
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-danger">
              {" *"}
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      {description && (
        <p id={descId} className="text-sm text-muted">
          {description}
        </p>
      )}
      {control}
      {error && (
        <p id={errId} role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
