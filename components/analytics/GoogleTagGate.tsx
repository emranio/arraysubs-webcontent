"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { COOKIE_CONSENT_UPDATED_EVENT } from "@/lib/privacy-consent";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const INCLUDE_BD_VISITS = process.env.NEXT_PUBLIC_INCLUDE_BD_VISITS === "true";
const ENGAGEMENT_DELAY_MS = 5_000;
const CONSENT_UPDATE_DELAY_MS = 3_000;

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  consent_interacted?: boolean;
  arraysubsGaLoaded?: boolean;
  arraysubsGtagExecuted?: boolean;
  arraysubsGtmLoaded?: boolean;
  arraysubsConsentUpdateCompleted?: boolean;
  arraysubsConsentUpdateTimer?: number;
};

const GRANTED_CONSENT = {
  ad_user_data: "granted",
  ad_personalization: "granted",
  ad_storage: "granted",
  analytics_storage: "granted",
} as const;

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

function ensureGtag(analyticsWindow: AnalyticsWindow) {
  const dataLayer = (analyticsWindow.dataLayer ||= []);

  if (!analyticsWindow.gtag) {
    analyticsWindow.gtag = (...args: unknown[]) => {
      dataLayer.push(args);
    };
  }

  return analyticsWindow.gtag;
}

function scheduleGrantedConsentUpdate(analyticsWindow: AnalyticsWindow) {
  if (
    !analyticsWindow.consent_interacted ||
    !analyticsWindow.arraysubsGtagExecuted ||
    !analyticsWindow.gtag ||
    analyticsWindow.arraysubsConsentUpdateCompleted ||
    analyticsWindow.arraysubsConsentUpdateTimer
  ) {
    return;
  }

  analyticsWindow.arraysubsConsentUpdateTimer = window.setTimeout(() => {
    analyticsWindow.arraysubsConsentUpdateTimer = undefined;
    analyticsWindow.gtag?.("consent", "update", GRANTED_CONSENT);
    analyticsWindow.arraysubsConsentUpdateCompleted = true;
  }, CONSENT_UPDATE_DELAY_MS);
}

function loadGoogleAnalytics(analyticsWindow: AnalyticsWindow) {
  if (!GA_MEASUREMENT_ID) return;

  const gtag = ensureGtag(analyticsWindow);

  if (!analyticsWindow.arraysubsGaLoaded) {
    analyticsWindow.arraysubsGaLoaded = true;

    const script = document.createElement("script");
    script.id = "arraysubs-google-analytics";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: false,
    });
    analyticsWindow.arraysubsGtagExecuted = true;
    scheduleGrantedConsentUpdate(analyticsWindow);
  }

  gtag("event", "page_view", currentPageDetails());
}

function triggerGoogleTagManager(analyticsWindow: AnalyticsWindow) {
  if (!GTM_ID) return;

  const dataLayer = (analyticsWindow.dataLayer ||= []);
  ensureGtag(analyticsWindow);

  // Reuse GTM's standard page-view lifecycle event so an existing "All Pages"
  // trigger also runs for qualified Next.js client-side route changes.
  dataLayer.push({
    "gtm.start": Date.now(),
    event: "gtm.js",
    ...currentPageDetails(),
  });

  if (!analyticsWindow.arraysubsGtmLoaded) {
    analyticsWindow.arraysubsGtmLoaded = true;

    const script = document.createElement("script");
    script.id = "arraysubs-google-tag-manager";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);
  }

  if (!analyticsWindow.arraysubsGtagExecuted) {
    analyticsWindow.arraysubsGtagExecuted = true;
    scheduleGrantedConsentUpdate(analyticsWindow);
  }
}

function triggerGoogleTags() {
  const analyticsWindow = window as AnalyticsWindow;

  triggerGoogleTagManager(analyticsWindow);
  loadGoogleAnalytics(analyticsWindow);
}

export function GoogleTagGate() {
  const pathname = usePathname();

  useEffect(() => {
    const analyticsWindow = window as AnalyticsWindow;

    const handleConsentInteraction = () => {
      analyticsWindow.consent_interacted = true;
      analyticsWindow.arraysubsConsentUpdateCompleted = false;

      if (analyticsWindow.arraysubsConsentUpdateTimer) {
        window.clearTimeout(analyticsWindow.arraysubsConsentUpdateTimer);
        analyticsWindow.arraysubsConsentUpdateTimer = undefined;
      }

      scheduleGrantedConsentUpdate(analyticsWindow);
    };

    window.addEventListener(
      COOKIE_CONSENT_UPDATED_EVENT,
      handleConsentInteraction,
    );

    if (
      (!GA_MEASUREMENT_ID && !GTM_ID) ||
      (!INCLUDE_BD_VISITS && isBrowserUtcPlusSix())
    ) {
      return () => {
        window.removeEventListener(
          COOKIE_CONSENT_UPDATED_EVENT,
          handleConsentInteraction,
        );
      };
    }

    let hasScrolled = false;
    let hasMovedMouse = false;
    let hasWaited = false;
    let hasTriggered = false;

    const cleanupEngagementGate = () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.clearTimeout(delayTimer);
    };

    const cleanup = () => {
      cleanupEngagementGate();
      window.removeEventListener(
        COOKIE_CONSENT_UPDATED_EVENT,
        handleConsentInteraction,
      );
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
      cleanupEngagementGate();
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
