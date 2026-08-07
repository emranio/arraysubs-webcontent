"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const INCLUDE_BD_VISITS = process.env.NEXT_PUBLIC_INCLUDE_BD_VISITS === "true";
const ENGAGEMENT_DELAY_MS = 5_000;

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  arraysubsGaLoaded?: boolean;
  arraysubsGtmLoaded?: boolean;
};

function isBrowserUtcPlusSix() {
  return new Date().getTimezoneOffset() === -360;
}

function currentPageDetails() {
  return {
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
  };
}

function loadGoogleAnalytics(analyticsWindow: AnalyticsWindow) {
  if (!GA_MEASUREMENT_ID) return;

  const dataLayer = (analyticsWindow.dataLayer ||= []);

  if (!analyticsWindow.gtag) {
    analyticsWindow.gtag = (...args: unknown[]) => {
      dataLayer.push(args);
    };
  }

  if (!analyticsWindow.arraysubsGaLoaded) {
    analyticsWindow.arraysubsGaLoaded = true;

    const script = document.createElement("script");
    script.id = "arraysubs-google-analytics";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    analyticsWindow.gtag("js", new Date());
    analyticsWindow.gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: false,
    });
  }

  analyticsWindow.gtag("event", "page_view", currentPageDetails());
}

function triggerGoogleTagManager(analyticsWindow: AnalyticsWindow) {
  if (!GTM_ID) return;

  const dataLayer = (analyticsWindow.dataLayer ||= []);

  // Reuse GTM's standard page-view lifecycle event so an existing "All Pages"
  // trigger also runs for qualified Next.js client-side route changes.
  dataLayer.push({
    "gtm.start": Date.now(),
    event: "gtm.js",
    ...currentPageDetails(),
  });

  if (analyticsWindow.arraysubsGtmLoaded) return;

  analyticsWindow.arraysubsGtmLoaded = true;

  const script = document.createElement("script");
  script.id = "arraysubs-google-tag-manager";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

function triggerGoogleTags() {
  const analyticsWindow = window as AnalyticsWindow;

  triggerGoogleTagManager(analyticsWindow);
  loadGoogleAnalytics(analyticsWindow);
}

export function GoogleTagGate() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      (!GA_MEASUREMENT_ID && !GTM_ID) ||
      (!INCLUDE_BD_VISITS && isBrowserUtcPlusSix())
    ) {
      return;
    }

    let hasScrolled = false;
    let hasMovedMouse = false;
    let hasWaited = false;
    let hasTriggered = false;

    const cleanup = () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.clearTimeout(delayTimer);
    };

    const maybeTrigger = () => {
      if (
        hasTriggered ||
        !hasScrolled ||
        !hasMovedMouse ||
        !hasWaited
      ) {
        return;
      }

      hasTriggered = true;
      cleanup();
      triggerGoogleTags();
    };

    const handleScroll = () => {
      hasScrolled = true;
      maybeTrigger();
    };

    const handleMouseMove = () => {
      hasMovedMouse = true;
      maybeTrigger();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const delayTimer = window.setTimeout(() => {
      hasWaited = true;
      maybeTrigger();
    }, ENGAGEMENT_DELAY_MS);

    return cleanup;
  }, [pathname]);

  return null;
}
