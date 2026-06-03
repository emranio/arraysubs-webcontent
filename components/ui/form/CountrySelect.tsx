"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Check, LoaderCircle, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { controlBase } from "./controlClasses";

type CountryOption = {
  label: string;
  value: string;
};

type CountrySelectProps = {
  value?: string;
  defaultValue?: string;
  defaultLabel?: string;
  onChange?: (value: string, option: CountryOption) => void;
  placeholder?: string;
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
  if (length <= 0) return -1;
  if (index < 0) return 0;
  if (index >= length) return length - 1;
  return index;
}

export const CountrySelect = forwardRef<HTMLInputElement, CountrySelectProps>(
  function CountrySelect(
    {
      value,
      defaultValue,
      defaultLabel = "",
      onChange,
      placeholder = "Search country...",
      name,
      disabled = false,
      id,
      className,
      ...aria
    },
    ref,
  ) {
    const autoId = useId();
    const baseId = id ?? autoId;
    const listId = `${baseId}-listbox`;
    const statusId = `${baseId}-status`;

    const isControlled = value !== undefined;
    const [internal, setInternal] = useState(defaultValue ?? "");
    const selected = isControlled ? value : internal;
    const [selectedLabel, setSelectedLabel] = useState(defaultLabel);
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [options, setOptions] = useState<CountryOption[]>([]);

    const rootRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
      if (!open) return;
      const trimmedQuery = query.trim();

      if (!trimmedQuery) {
        setLoading(false);
        setError("");
        setOptions([]);
        setActive(-1);
        return;
      }

      const controller = new AbortController();
      const timer = window.setTimeout(
        () => {
          setLoading(true);
          setError("");

          const params = new URLSearchParams();
          params.set("q", trimmedQuery);
          params.set("limit", "40");

          fetch(`/api/countries?${params.toString()}`, {
            signal: controller.signal,
          })
            .then((response) => {
              if (!response.ok) throw new Error("Country search failed.");
              return response.json() as Promise<{ countries: CountryOption[] }>;
            })
            .then((data) => {
              setOptions(data.countries);
              setActive(data.countries.length > 0 ? 0 : -1);
            })
            .catch((countryError: unknown) => {
              if (controller.signal.aborted) return;
              setOptions([]);
              setActive(-1);
              setError(
                countryError instanceof Error
                  ? countryError.message
                  : "Country search failed.",
              );
            })
            .finally(() => {
              if (!controller.signal.aborted) setLoading(false);
            });
        },
        160,
      );

      return () => {
        window.clearTimeout(timer);
        controller.abort();
      };
    }, [open, query]);

    useEffect(() => {
      if (!open) return;
      const onPointerDown = (event: PointerEvent) => {
        if (rootRef.current?.contains(event.target as Node)) return;
        setOpen(false);
        setQuery("");
        setActive(-1);
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

    const choose = (option: CountryOption) => {
      if (!isControlled) setInternal(option.value);
      setSelectedLabel(option.label);
      onChange?.(option.value, option);
      setQuery("");
      setOpen(false);
      setActive(-1);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setOpen(true);
          setActive((current) => clampIndex(current + 1, options.length));
          break;
        case "ArrowUp":
          event.preventDefault();
          setOpen(true);
          setActive((current) => clampIndex(current - 1, options.length));
          break;
        case "Enter":
          if (!open || active < 0) return;
          event.preventDefault();
          choose(options[active]);
          break;
        case "Escape":
          if (!open) return;
          event.preventDefault();
          setOpen(false);
          setQuery("");
          setActive(-1);
          break;
        case "Tab":
          setOpen(false);
          setQuery("");
          setActive(-1);
          break;
      }
    };

    const visibleValue = open ? query : selectedLabel;

    return (
      <div ref={rootRef} className={cn("relative", className)}>
        <div className="relative">
          <input
            ref={ref}
            id={baseId}
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={
              open && active >= 0 ? `${baseId}-opt-${active}` : undefined
            }
            aria-labelledby={aria["aria-labelledby"]}
            aria-describedby={
              [aria["aria-describedby"], loading ? statusId : undefined]
                .filter(Boolean)
                .join(" ") || undefined
            }
            aria-invalid={aria["aria-invalid"]}
            aria-required={aria["aria-required"]}
            disabled={disabled}
            autoComplete="off"
            placeholder={placeholder}
            value={visibleValue}
            onFocus={() => setOpen(true)}
            onChange={(event) => {
              if (!isControlled) setInternal("");
              setSelectedLabel("");
              setQuery(event.target.value);
              setOpen(true);
            }}
            onKeyDown={onKeyDown}
            className={cn(controlBase, "h-12 pr-10")}
          />
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted"
          />
        </div>

        {open && (
          <div className="absolute z-50 mt-2 w-full rounded-md border border-border bg-background">
            {loading && (
              <p
                id={statusId}
                className="flex items-center gap-2 px-4 py-3 text-sm text-muted"
              >
                <LoaderCircle
                  aria-hidden="true"
                  className="size-4 animate-spin text-primary"
                />
                Loading countries...
              </p>
            )}

            {!loading && error && (
              <p className="px-4 py-3 text-sm font-medium text-danger">{error}</p>
            )}

            {!loading && !error && !query.trim() && (
              <p className="px-4 py-3 text-sm text-muted">
                Type to search countries.
              </p>
            )}

            {!loading && !error && query.trim() && options.length === 0 && (
              <p className="px-4 py-3 text-sm text-muted">No countries found.</p>
            )}

            {!loading && !error && options.length > 0 && (
              <ul
                ref={listRef}
                id={listId}
                role="listbox"
                aria-labelledby={aria["aria-labelledby"]}
                className="max-h-64 overflow-auto py-1"
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
                      onPointerDown={(event) => event.preventDefault()}
                      onClick={() => choose(option)}
                      onPointerEnter={() => setActive(index)}
                      className={cn(
                        "flex cursor-pointer items-center justify-between gap-2 px-4 py-2.5 text-sm",
                        isActive && "bg-surface",
                        isSelected && "font-medium",
                      )}
                    >
                      <span className="truncate">{option.label}</span>
                      {isSelected && (
                        <Check
                          aria-hidden="true"
                          className="size-4 shrink-0 text-dark"
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {name && <input type="hidden" name={name} value={selected} />}
      </div>
    );
  },
);
