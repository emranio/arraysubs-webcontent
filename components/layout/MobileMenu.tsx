"use client";

import { useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { SECTIONS } from "@/lib/sections";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  /** The header toggle that opens/closes this menu (it doubles as the close X). */
  triggerRef: RefObject<HTMLButtonElement | null>;
};

/**
 * Fullscreen overlay menu for mobile/tablet (below lg). Lists every section
 * on the design-system page, grouped by category, so the visitor can jump to
 * any component. The header toggle floats above the overlay as the close X.
 */
export function MobileMenu({ open, onClose, triggerRef }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    overlayRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const header = triggerRef.current?.closest("header");
      const focusables = Array.from(
        header?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ) ?? [],
      ).filter((el) => el.getClientRects().length > 0);
      if (focusables.length === 0) return;
      event.preventDefault();
      const index = focusables.indexOf(document.activeElement as HTMLElement);
      const nextIndex =
        index === -1
          ? 0
          : event.shiftKey
            ? (index - 1 + focusables.length) % focusables.length
            : (index + 1) % focusables.length;
      focusables[nextIndex].focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, triggerRef]);

  useGSAP(
    () => {
      if (!open || prefersReducedMotion() || !overlayRef.current) return;
      registerGsap();
      const targets = overlayRef.current.querySelectorAll("[data-menu-item]");
      gsap.fromTo(
        overlayRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.04,
          ease: "power3.out",
          delay: 0.08,
        },
      );
    },
    { dependencies: [open], scope: overlayRef },
  );

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Sections"
      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-background lg:hidden"
    >
      <Container className="flex flex-1 flex-col">
        <div className="grid gap-10 py-24 sm:grid-cols-2">
          {SECTIONS.map((category) => (
            <nav
              key={category.title}
              aria-label={category.title}
              data-menu-item
              className="flex flex-col gap-4"
            >
              <h3 className="text-xs font-semibold tracking-widest text-muted uppercase">
                {category.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {category.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between gap-3 rounded-md py-2 text-xl font-display font-bold text-foreground transition-colors hover:text-primary-strong"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-5 shrink-0 text-faint transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary-strong"
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
