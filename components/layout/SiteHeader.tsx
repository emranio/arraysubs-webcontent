"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { HEADER_NAV_ITEMS } from "@/lib/navigation";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  const [open, setOpen] = useState(false); // mobile fullscreen menu
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const pathname = usePathname();

  // Return focus to the toggle when the mobile menu closes.
  useEffect(() => {
    if (wasOpen.current && !open) toggleRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  const close = () => {
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Frosted bar — full-width. The blur lives HERE, not on <header>, so the
          fixed MobileMenu stays viewport-sized. */}
      <div className="relative z-[70] border-b border-border bg-background/80 backdrop-blur-md">
        <Container>
          <div className="flex h-16 items-center justify-between gap-6 py-3">
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
              <nav
                aria-label="Primary"
                className="hidden items-center gap-5 lg:flex"
              >
                {HEADER_NAV_ITEMS.map((item) => {
                  const isCurrent =
                    pathname === item.href || pathname === item.href.slice(0, -1);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isCurrent ? "page" : undefined}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-foreground",
                        isCurrent ? "text-foreground" : "text-muted",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <Button
                href="#cta"
                size="xs"
                magnetic
                onClick={close}
                className="hidden sm:inline-flex"
              >
                Get Pro Access — Free
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
                        ? "top-1/2 -mt-px w-4 rotate-45"
                        : "top-[0.1875rem] w-[1.125rem] group-hover:w-5",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute top-1/2 left-1/2 -mt-px h-0.5 w-[1.125rem] -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-out",
                      open && "scale-x-0 opacity-0",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-out",
                      open
                        ? "top-1/2 -mt-px w-4 -rotate-45"
                        : "top-[0.9375rem] w-[1.125rem] group-hover:w-5",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </Container>
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
