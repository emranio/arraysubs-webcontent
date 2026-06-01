"use client";

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
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
 * (Left/Right/Up/Down/Home/End). The active panel fades in via GSAP.
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
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !panelRef.current) return;
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
      );
    },
    { dependencies: [active], scope: panelRef },
  );

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

      {tabs.map((tab, index) => {
        const selected = index === active;
        return (
          <div
            key={index}
            role="tabpanel"
            id={`${baseId}-panel-${index}`}
            aria-labelledby={`${baseId}-tab-${index}`}
            hidden={!selected}
            tabIndex={0}
            ref={selected ? panelRef : undefined}
            className="rounded-md focus-visible:outline-none"
          >
            {selected && tab.content}
          </div>
        );
      })}
    </div>
  );
}
