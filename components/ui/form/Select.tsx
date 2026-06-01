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

export type SelectOption = { label: string; value: string };

type SelectProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** When set, a hidden input submits the value with the form. */
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
 * Custom single-select (no native <select>). Implements the WAI-ARIA
 * select-only combobox pattern: a button trigger + listbox popup, full keyboard
 * support (Up/Down/Home/End/Enter/Esc/Space) via aria-activedescendant.
 */
export function Select({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select…",
  name,
  disabled = false,
  id,
  className,
  ...aria
}: SelectProps) {
  const autoId = useId();
  const baseId = id ?? autoId;
  const listId = `${baseId}-listbox`;

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? "");
  const selected = isControlled ? value : internal;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedIndex = options.findIndex((o) => o.value === selected);
  const selectedLabel = selectedIndex >= 0 ? options[selectedIndex].label : "";

  const openList = (toActive?: number) => {
    if (disabled) return;
    setActive(toActive ?? (selectedIndex >= 0 ? selectedIndex : 0));
    setOpen(true);
  };
  const close = (focusButton = true) => {
    setOpen(false);
    setActive(-1);
    if (focusButton) buttonRef.current?.focus();
  };
  const choose = (index: number) => {
    const option = options[index];
    if (!option) return;
    if (!isControlled) setInternal(option.value);
    onChange?.(option.value);
    close();
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open || active < 0) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        open
          ? setActive((a) => clampIndex(a + 1, options.length))
          : openList();
        break;
      case "ArrowUp":
        event.preventDefault();
        open
          ? setActive((a) => clampIndex(a - 1, options.length))
          : openList();
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        open ? choose(active) : openList();
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
          close();
        }
        break;
      case "Tab":
        if (open) close(false);
        break;
    }
  };

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
        aria-activedescendant={
          open && active >= 0 ? `${baseId}-opt-${active}` : undefined
        }
        aria-labelledby={aria["aria-labelledby"]}
        aria-describedby={aria["aria-describedby"]}
        aria-invalid={aria["aria-invalid"]}
        aria-required={aria["aria-required"]}
        disabled={disabled}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onKeyDown}
        className={cn(
          "flex h-12 w-full items-center justify-between gap-2 rounded-md border border-border bg-background px-4 text-left text-base transition-colors focus:border-dark disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-danger",
          selectedLabel ? "text-foreground" : "text-faint",
        )}
      >
        <span className="truncate">{selectedLabel || placeholder}</span>
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
          aria-labelledby={aria["aria-labelledby"]}
          className="absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-md border border-border bg-background py-1"
        >
          {options.map((option, index) => {
            const isSelected = option.value === selected;
            const isActive = index === active;
            return (
              <li
                key={option.value}
                id={`${baseId}-opt-${index}`}
                data-index={index}
                role="option"
                aria-selected={isSelected}
                onClick={() => choose(index)}
                onPointerEnter={() => setActive(index)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-2 px-4 py-2.5 text-sm",
                  isActive && "bg-surface",
                  isSelected && "font-medium",
                )}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && (
                  <Check aria-hidden="true" className="size-4 shrink-0 text-dark" />
                )}
              </li>
            );
          })}
        </ul>
      )}

      {name && <input type="hidden" name={name} value={selected} />}
    </div>
  );
}
