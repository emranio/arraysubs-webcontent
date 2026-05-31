"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  const [open, setOpen] = useState(false); // mobile fullscreen menu
  const [megaOpen, setMegaOpen] = useState(false); // desktop mega menu
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sectionsRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Return focus to the toggle when the mobile menu closes.
  useEffect(() => {
    if (wasOpen.current && !open) toggleRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  // Close one when the other opens so they never overlap.
  useEffect(() => {
    if (open) setMegaOpen(false);
  }, [open]);

  const close = () => {
    setOpen(false);
    setMegaOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <Container>
        <div className="relative z-[70] flex h-18 items-center justify-between gap-6 py-3">
          <Link
            href="/"
            onClick={close}
            className="flex items-center gap-2 font-display text-xl font-bold tracking-tight"
            aria-label={`${site.name} home`}
          >
            <span
              aria-hidden="true"
              className="inline-block size-5 rounded-[0.3rem] bg-primary"
            />
            {site.name}
          </Link>

          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            {/* Sections trigger: opens the desktop mega menu */}
            <button
              ref={sectionsRef}
              type="button"
              aria-expanded={megaOpen}
              aria-haspopup="dialog"
              aria-controls="mega-menu"
              onClick={() => setMegaOpen((value) => !value)}
              className="hidden cursor-pointer items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground lg:inline-flex"
            >
              Sections
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "size-4 transition-transform duration-200",
                  megaOpen && "rotate-180",
                )}
              />
            </button>

            <Button href="#cta" size="xs" magnetic onClick={close}>
              Get Pro — Free
            </Button>

            {/* Hamburger / X toggle for mobile/tablet */}
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-haspopup="dialog"
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
              className={cn(
                "group inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors lg:hidden",
                open
                  ? "border-dark bg-dark text-on-dark"
                  : "border-border-strong text-foreground hover:border-dark",
              )}
            >
              <span aria-hidden="true" className="relative block size-5">
                <span
                  className={cn(
                    "absolute left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-out",
                    open
                      ? "top-1/2 -mt-px w-3.5 rotate-45"
                      : "top-[0.3125rem] w-3 group-hover:w-4",
                  )}
                />
                <span
                  className={cn(
                    "absolute top-1/2 left-1/2 -mt-px h-0.5 w-4 -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-out",
                    open && "scale-x-0 opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-out",
                    open
                      ? "top-1/2 -mt-px w-3.5 -rotate-45"
                      : "top-[0.8125rem] w-3 group-hover:w-4",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </Container>

      <div id="mega-menu">
        <MegaMenu
          open={megaOpen}
          onClose={() => setMegaOpen(false)}
          triggerRef={sectionsRef}
        />
      </div>

      <div id="mobile-menu">
        <MobileMenu
          open={open}
          onClose={() => setOpen(false)}
          triggerRef={toggleRef}
        />
      </div>
    </header>
  );
}
