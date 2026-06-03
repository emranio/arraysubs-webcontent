"use client";

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

export type TabItem = { label: string; content: ReactNode };

type TabsProps = {
  tabs: TabItem[];
  defaultIndex?: number;
  /** Accessible name for the tab list. */
  label?: string;
  className?: string;
};

/**
 * WAI-ARIA tabs with roving tabindex and full keyboard support
 * (Left/Right/Up/Down/Home/End). Panels stay mounted and crossfade smoothly
 * so content changes do not remount abruptly.
 */
export function Tabs({
  tabs,
  defaultIndex = 0,
  label = "Content tabs",
  className,
}: TabsProps) {
  const [active, setActive] = useState(defaultIndex);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const count = tabs.length;
    let next = active;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (active + 1) % count;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (active - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="inline-flex flex-wrap gap-1 self-start rounded-pill bg-surface p-1"
      >
        {tabs.map((tab, index) => {
          const selected = index === active;
          return (
            <button
              key={index}
              role="tab"
              id={`${baseId}-tab-${index}`}
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => setActive(index)}
              className={cn(
                "rounded-pill px-5 py-2 text-sm font-semibold transition-colors duration-200",
                selected
                  ? "bg-primary text-on-dark"
                  : "text-muted hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="grid rounded-md">
        {tabs.map((tab, index) => {
          const selected = index === active;
          return (
            <div
              key={index}
              role="tabpanel"
              id={`${baseId}-panel-${index}`}
              aria-labelledby={`${baseId}-tab-${index}`}
              aria-hidden={!selected}
              inert={selected ? undefined : true}
              tabIndex={selected ? 0 : -1}
              className={cn(
                "col-start-1 row-start-1 rounded-md transition-opacity duration-200 ease-out focus-visible:outline-none",
                selected
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0",
              )}
            >
              {tab.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
