"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const NAV = [
  { label: "Foundations", href: "#foundations" },
  { label: "Components", href: "#components" },
  { label: "Forms", href: "#forms" },
  { label: "Motion", href: "#motion" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <Container>
        <div className="flex h-18 items-center justify-between gap-6 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-xl font-bold tracking-tight"
            aria-label={`${site.name} home`}
          >
            <span
              aria-hidden="true"
              className="inline-block size-5 rounded-[0.3rem] bg-primary"
            />
            {site.name}
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm font-medium text-muted">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <Button href="#cta" size="sm" magnetic>
              Get Pro — Free
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </Container>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="border-t border-border bg-background lg:hidden"
        >
          <Container>
            <ul className="flex flex-col gap-1 py-4 text-base font-medium">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-3 transition-colors hover:bg-surface"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Button href="#cta" fullWidth onClick={() => setOpen(false)}>
                  Get Pro — Free
                </Button>
              </li>
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
