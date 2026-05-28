"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type MultiselectOption = { label: string; value: string };

type MultiselectProps = {
  options: MultiselectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  /** When set, one hidden input per selected value is submitted with the form. */
  name?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  "aria-required"?: boolean;
};

function clampIndex(index: number, length: number) {
  if (index < 0) return 0;
  if (index >= length) return length - 1;
  return index;
}

/**
 * Custom multi-select listbox (no native control). Selecting toggles an option
 * and keeps the list open. Implements aria-multiselectable with keyboard support
 * via aria-activedescendant.
 */
export function Multiselect({
  options,
  value,
  defaultValue = [],
  onChange,
  placeholder = "Select…",
  name,
  disabled = false,
  id,
  className,
  ...aria
}: MultiselectProps) {
  const autoId = useId();
  const baseId = id ?? autoId;
  const listId = `${baseId}-listbox`;

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const selected = isControlled ? value : internal;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commit = (next: string[]) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };
  const toggle = (index: number) => {
    const value = options[index]?.value;
    if (value == null) return;
    commit(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        open ? setActive((a) => clampIndex(a + 1, options.length)) : setOpen(true);
        break;
      case "ArrowUp":
        event.preventDefault();
        open ? setActive((a) => clampIndex(a - 1, options.length)) : setOpen(true);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        open ? toggle(active) : setOpen(true);
        break;
      case "Home":
        if (open) {
          event.preventDefault();
          setActive(0);
        }
        break;
      case "End":
        if (open) {
          event.preventDefault();
          setActive(options.length - 1);
        }
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
          buttonRef.current?.focus();
        }
        break;
      case "Tab":
        if (open) setOpen(false);
        break;
    }
  };

  const count = selected.length;
  const triggerText =
    count === 0
      ? placeholder
      : count === 1
        ? (options.find((o) => o.value === selected[0])?.label ?? "1 selected")
        : `${count} selected`;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        id={baseId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${baseId}-opt-${active}` : undefined}
        aria-labelledby={aria["aria-labelledby"]}
        aria-describedby={aria["aria-describedby"]}
        aria-invalid={aria["aria-invalid"]}
        aria-required={aria["aria-required"]}
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className={cn(
          "flex h-12 w-full items-center justify-between gap-2 rounded-md border border-border bg-background px-4 text-left text-base transition-colors focus:border-dark disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-danger",
          count > 0 ? "text-foreground" : "text-faint",
        )}
      >
        <span className="truncate">{triggerText}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-5 shrink-0 text-muted transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-multiselectable="true"
          aria-labelledby={aria["aria-labelledby"]}
          className="absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-md border border-border bg-background py-1"
        >
          {options.map((option, index) => {
            const isSelected = selected.includes(option.value);
            const isActive = index === active;
            return (
              <li
                key={option.value}
                id={`${baseId}-opt-${index}`}
                data-index={index}
                role="option"
                aria-selected={isSelected}
                onClick={() => toggle(index)}
                onPointerEnter={() => setActive(index)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm",
                  isActive && "bg-surface-2",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-4 shrink-0 place-items-center rounded-[0.25rem] border-2 transition-colors",
                    isSelected
                      ? "border-dark bg-dark"
                      : "border-border-strong bg-background",
                  )}
                >
                  {isSelected && (
                    <Check strokeWidth={3} className="size-3 text-on-dark" />
                  )}
                </span>
                <span className="truncate">{option.label}</span>
              </li>
            );
          })}
        </ul>
      )}

      {name &&
        selected.map((v) => (
          <input key={v} type="hidden" name={name} value={v} />
        ))}
    </div>
  );
}
