"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap";
import { HEADER_NAV_ITEMS } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  /** The header toggle that opens/closes this menu (it doubles as the close X). */
  triggerRef: RefObject<HTMLButtonElement | null>;
};

/**
 * Fullscreen overlay menu for mobile/tablet (below lg). The header toggle
 * floats above the overlay as the close X. The overlay stays mounted through
 * its exit animation — it fades + the items slide out before unmounting, so
 * closing is as smooth as opening.
 */
export function MobileMenu({ open, onClose, triggerRef }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  // Keep the overlay in the DOM until the close animation finishes.
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  // Body scroll lock + ESC + focus trap — only while open.
  useEffect(() => {
    if (!open) return;
    // Lock the real scroll container. globals.css sets html `overflow-x: clip`,
    // which makes <html> the scroller — so locking only <body> leaves the page
    // (and the sticky header) scrolling behind the open menu. Lock <html> too.
    const html = document.documentElement;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";
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
      document.body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, triggerRef]);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!mounted || !overlay) return;
      const items = overlay.querySelectorAll("[data-menu-item]");

      // Reduced motion: no tweens — snap in, unmount instantly on close.
      if (prefersReducedMotion()) {
        if (open) {
          gsap.set(overlay, { autoAlpha: 1 });
          gsap.set(items, { autoAlpha: 1, y: 0 });
        } else {
          setMounted(false);
        }
        return;
      }

      registerGsap();

      if (open) {
        gsap.fromTo(
          overlay,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" },
        );
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.04,
            ease: "power3.out",
            delay: 0.08,
            overwrite: "auto",
          },
        );
      } else {
        // Exit: items slide out bottom-up, then the overlay fades, then unmount.
        gsap.to(items, {
          autoAlpha: 0,
          y: 14,
          duration: 0.22,
          stagger: { each: 0.03, from: "end" },
          ease: "power2.in",
          overwrite: "auto",
        });
        gsap.to(overlay, {
          autoAlpha: 0,
          duration: 0.32,
          ease: "power2.inOut",
          delay: 0.05,
          overwrite: "auto",
          onComplete: () => setMounted(false),
        });
      }
    },
    { dependencies: [open, mounted], scope: overlayRef },
  );

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Primary menu"
      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-background/85 backdrop-blur-xl lg:hidden"
    >
      <Container className="flex flex-1 flex-col">
        <nav aria-label="Primary" className="py-24">
          <ul className="flex flex-col gap-3">
            {HEADER_NAV_ITEMS.map((item) => (
              <li key={item.href} data-menu-item>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-center justify-between gap-3 rounded-md py-3 text-xl font-display font-bold text-foreground transition-colors hover:text-primary-strong"
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
      </Container>
    </div>
  );
}
