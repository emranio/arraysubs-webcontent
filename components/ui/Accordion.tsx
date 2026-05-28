"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type AccordionItemData = { question: ReactNode; answer: ReactNode };

type AccordionProps = {
  items: AccordionItemData[];
  /** Allow more than one panel open at a time. */
  allowMultiple?: boolean;
  /** Indices open on first render. */
  defaultOpen?: number[];
  className?: string;
};

/**
 * Accessible disclosure list. Buttons expose aria-expanded/aria-controls;
 * panels are regions, animate via CSS grid rows, and become `inert` when
 * collapsed so they leave the tab order and a11y tree.
 */
export function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [open, setOpen] = useState<number[]>(defaultOpen);
  const baseId = useId();

  const toggle = (index: number) =>
    setOpen((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : allowMultiple
          ? [...prev, index]
          : [index],
    );

  return (
    <div className={cn("border-y border-border", className)}>
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const btnId = `${baseId}-btn-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={index} className="border-b border-border last:border-b-0">
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-display text-lg sm:text-xl">
                  {item.question}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-5 shrink-0 text-muted transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="pb-5 text-muted text-pretty">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
