"use client";

import { SlidersHorizontal } from "lucide-react";
import { COOKIE_CONSENT_EVENT } from "@/lib/privacy-consent";
import { cn } from "@/lib/cn";

export function PrivacyChoicesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-md text-sm font-semibold text-on-dark/90 transition-colors hover:text-highlight",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight",
        className,
      )}
      onClick={() => window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT))}
    >
      <SlidersHorizontal aria-hidden="true" className="size-4" />
      Privacy Choices
    </button>
  );
}
