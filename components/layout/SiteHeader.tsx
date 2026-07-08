"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { HEADER_NAV_ITEMS } from "@/lib/navigation";
import { site, withTrailingSlash } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  const [open, setOpen] = useState(false); // mobile fullscreen menu
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const pathname = usePathname() ?? "";
  const isArraySubsPath = withTrailingSlash(pathname).startsWith(
    "/deals/arraysubs/",
  );
  const logoSubtitle = isArraySubsPath
    ? `${site.brand} - Subscription Manager for WooCommerce`
    : `Plugins, Code, and Commerce Solutions for WordPress`;

  // Return focus to the toggle when the mobile menu closes.
  useEffect(() => {
    if (wasOpen.current && !open) toggleRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  const close = () => {
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "top-0 z-50",
        // While the fullscreen menu is open, pin the header with `fixed` instead
        // of `sticky`: the menu's scroll-lock (overflow:hidden) disables sticky
        // pinning, so a scrolled-down page would drop the header off-screen.
        open ? "fixed inset-x-0" : "sticky",
      )}
    >
      {/* Frosted bar — full-width. The blur lives HERE, not on <header>, so the
          fixed MobileMenu stays viewport-sized. */}
      {/* `transform-gpu` promotes the frosted bar to its own compositor layer —
          without it the backdrop-blur repaints a frame late and the sticky
          header appears to drift a few px before catching up during scroll.
          Kept on the bar (not <header>) so it never reparents the fixed menu. */}
      <div className="relative z-[70] transform-gpu border-b border-border bg-background/80 backdrop-blur-md">
        <Container>
          <div className="flex h-16 items-center justify-between gap-6 py-3">
            <Link
              href="/"
              onClick={close}
              className="flex min-w-0 flex-col items-start gap-[0.125rem]"
              aria-label={`${site.name} home`}
            >
              <img
                src={site.logo}
                alt=""
                width={494}
                height={120}
                decoding="async"
                fetchPriority="high"
                className="h-[1.35rem] w-auto sm:h-[1.5rem]"
              />
              <span className="max-w-[15.25rem] truncate text-[0.5625rem] leading-none font-medium tracking-normal text-faint sm:max-w-[18rem] sm:text-[0.625rem] lg:max-w-[15.25rem] xl:max-w-none xl:text-[0.6875rem]">
                {logoSubtitle}
              </span>
            </Link>

            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
              <nav
                aria-label="Primary"
                className="hidden items-center gap-3 xl:gap-5 lg:flex"
              >
                {HEADER_NAV_ITEMS.map((item) => {
                  const isCurrent =
                    pathname === item.href || pathname === item.href.slice(0, -1);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isCurrent ? "page" : undefined}
                      aria-label={
                        item.badge ? `${item.label} ${item.badge}` : undefined
                      }
                      className={cn(
                        "inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium transition-colors hover:text-foreground",
                        isCurrent ? "text-foreground" : "text-muted",
                      )}
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="mt-[-0.875rem] ml-[-0.4375rem] rounded-pill border border-border bg-surface px-1.5 py-0.5 text-[0.625rem] leading-none font-semibold text-primary uppercase">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <Button
                href="/deals/arraysubs/pricing/"
                size="xs"
                magnetic
                onClick={close}
                className="hidden sm:inline-flex"
              >
                Pricing Plans
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
