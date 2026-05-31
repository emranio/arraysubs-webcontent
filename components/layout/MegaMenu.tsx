"use client";

import { useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SECTIONS } from "@/lib/sections";

type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
  /** The header button that toggles this panel. Used for the outside-click test. */
  triggerRef: RefObject<HTMLButtonElement | null>;
};

/**
 * Desktop mega menu: a panel below the header that lists every section on the
 * design-system page, grouped into four columns by category. Closes on outside
 * pointerdown or Escape.
 */
export function MegaMenu({ open, onClose, triggerRef }: MegaMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Sections"
      className="absolute inset-x-0 top-full z-40 hidden border-b border-border bg-background lg:block"
    >
      <Container>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-10 md:grid-cols-4">
          {SECTIONS.map((category) => (
            <nav
              key={category.title}
              aria-label={category.title}
              className="flex flex-col gap-4"
            >
              <h3 className="text-xs font-semibold tracking-widest text-muted uppercase">
                {category.title}
              </h3>
              <ul className="flex flex-col gap-1">
                {category.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between gap-2 rounded-md px-2 py-2 text-base font-medium text-foreground transition-colors hover:bg-surface"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 text-faint opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>
    </div>
  );
}
