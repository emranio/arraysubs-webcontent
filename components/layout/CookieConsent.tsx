"use client";

import Link from "next/link";
import Script from "next/script";
import { X } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_MAX_AGE,
  COOKIE_CONSENT_NAME,
  COOKIE_CONSENT_VERSION,
} from "@/lib/privacy-consent";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

type ConsentSource = "banner" | "preferences" | "privacy-choices";

type CookieConsentState = {
  version: typeof COOKIE_CONSENT_VERSION;
  necessary: true;
  analytics: boolean;
  updatedAt: string;
  source: ConsentSource;
};

type NavigatorWithGpc = Navigator & {
  globalPrivacyControl?: boolean;
};

type WindowWithGtag = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function decodeConsent(): CookieConsentState | null {
  if (typeof document === "undefined") return null;

  const row = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${COOKIE_CONSENT_NAME}=`));

  if (!row) return null;

  try {
    const parsed = JSON.parse(
      decodeURIComponent(row.slice(COOKIE_CONSENT_NAME.length + 1)),
    ) as Partial<CookieConsentState>;

    if (
      parsed.version !== COOKIE_CONSENT_VERSION ||
      parsed.necessary !== true ||
      typeof parsed.analytics !== "boolean"
    ) {
      return null;
    }

    return {
      version: COOKIE_CONSENT_VERSION,
      necessary: true,
      analytics: parsed.analytics,
      updatedAt:
        typeof parsed.updatedAt === "string"
          ? parsed.updatedAt
          : new Date().toISOString(),
      source:
        parsed.source === "banner" ||
        parsed.source === "preferences" ||
        parsed.source === "privacy-choices"
          ? parsed.source
          : "preferences",
    };
  } catch {
    return null;
  }
}

function writeConsent(consent: CookieConsentState) {
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";

  document.cookie = `${COOKIE_CONSENT_NAME}=${encodeURIComponent(
    JSON.stringify(consent),
  )}; Path=/; Max-Age=${COOKIE_CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
}

function expireCookie(name: string, domain?: string) {
  const domainPart = domain ? `; Domain=${domain}` : "";
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax${domainPart}`;
}

function deleteAnalyticsCookies() {
  if (typeof document === "undefined") return;

  const names = document.cookie
    .split(";")
    .map((item) => item.trim().split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));

  const host = window.location.hostname;
  const domains = new Set<string | undefined>([undefined, host]);
  if (host.includes(".")) domains.add(`.${host}`);

  for (const name of names) {
    for (const domain of domains) expireCookie(name, domain);
  }
}

function ConsentAction({
  children,
  onClick,
  tone = "outline",
}: {
  children: string;
  onClick: () => void;
  tone?: "outline" | "plain" | "primary";
}) {
  return (
    <button
      type="button"
      className={[
        "min-h-10 cursor-pointer rounded-md px-3 py-2 text-sm font-semibold transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        tone === "primary"
          ? "bg-primary text-on-dark hover:bg-primary-strong"
          : tone === "plain"
            ? "bg-card text-foreground hover:bg-highlight"
            : "border border-border-strong bg-background text-primary hover:bg-card",
      ].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<CookieConsentState | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [gpcEnabled, setGpcEnabled] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const analyticsEnabled = Boolean(
    consent?.analytics && (GA_MEASUREMENT_ID || GTM_ID),
  );

  useEffect(() => {
    const saved = decodeConsent();
    const hasGpc = Boolean(
      (window.navigator as NavigatorWithGpc).globalPrivacyControl,
    );

    setGpcEnabled(hasGpc);
    setConsent(saved);
    setShowBanner(!saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    const openPreferences = () => {
      previousFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      setShowBanner(false);
      setShowPreferences(true);
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, openPreferences);
    return () =>
      window.removeEventListener(COOKIE_CONSENT_EVENT, openPreferences);
  }, [consent]);

  useEffect(() => {
    if (GA_MEASUREMENT_ID) {
      const gaDisableKey = `ga-disable-${GA_MEASUREMENT_ID}`;
      (window as unknown as Record<string, boolean>)[gaDisableKey] =
        !consent?.analytics;
    }

    if (!consent?.analytics) deleteAnalyticsCookies();
  }, [consent?.analytics]);

  useEffect(() => {
    if (!showPreferences) return;

    const focusable = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    );

    focusable[0]?.focus();
  }, [showPreferences]);

  const saveConsent = (analytics: boolean, source: ConsentSource) => {
    const next: CookieConsentState = {
      version: COOKIE_CONSENT_VERSION,
      necessary: true,
      analytics,
      updatedAt: new Date().toISOString(),
      source,
    };

    writeConsent(next);
    setConsent(next);
    setShowBanner(false);
    setShowPreferences(false);

    if (!analytics) deleteAnalyticsCookies();

    window.dispatchEvent(
      new CustomEvent("arraysubs:cookie-consent-updated", {
        detail: next,
      }),
    );

    previousFocusRef.current?.focus();
  };

  const closePreferences = () => {
    setShowPreferences(false);
    setShowBanner(!consent);
    previousFocusRef.current?.focus();
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      closePreferences();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!mounted) return null;

  return (
    <>
      {analyticsEnabled && GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-consent-gate" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {analyticsEnabled && GTM_ID && (
        <Script id="gtm-consent-gate" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'gtm.start': new Date().getTime(),
              event: 'gtm.js'
            });
            (function(w,d,s,l,i){
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}

      {showBanner && !showPreferences && (
        <section
          aria-labelledby="cookie-consent-title"
          className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-[40rem] rounded-xl border border-border bg-background p-3 text-foreground sm:bottom-4"
        >
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div>
              <h2 id="cookie-consent-title" className="font-display text-lg">
                Cookies
              </h2>
              <p className="mt-1 text-xs leading-5 text-muted">
                Analytics is optional. Advertising cookies are not used.{" "}
                <Link
                  href="/trust-center/privacy-policy/"
                  className="font-semibold text-primary underline decoration-primary decoration-2 underline-offset-4 hover:text-primary-strong"
                >
                  Privacy policy
                </Link>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-[0.1875rem] sm:min-w-[12rem]">
              <ConsentAction
                onClick={() => saveConsent(false, "banner")}
              >
                Reject
              </ConsentAction>
              <ConsentAction
                tone="primary"
                onClick={() => saveConsent(true, "banner")}
              >
                Accept
              </ConsentAction>
            </div>
          </div>
        </section>
      )}

      {showPreferences && (
        <div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-dark/45 p-3 sm:items-center sm:p-4"
          role="presentation"
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            className="max-h-[calc(100dvh-1.5rem)] w-full max-w-[28rem] overflow-y-auto rounded-xl border border-border bg-background p-3 text-foreground sm:max-h-[calc(100dvh-2rem)] sm:p-4"
            onKeyDown={handleDialogKeyDown}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2
                  id="cookie-preferences-title"
                  className="font-display text-lg"
                >
                  Privacy choices
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close privacy choices"
                className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-card"
                onClick={closePreferences}
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>

            <p className="mt-1 text-xs leading-5 text-muted">
              Analytics is optional. Advertising cookies are not used.
            </p>

            {gpcEnabled && (
              <div className="mt-2 rounded-md border border-border bg-card px-3 py-2 text-xs text-muted">
                GPC detected. No sale/share for ads.
              </div>
            )}

            <div className="mt-3 divide-y divide-border rounded-md border border-border bg-card text-sm">
              <div className="flex items-center justify-between gap-3 px-3 py-2">
                <div>
                  <h3 className="font-semibold text-foreground">Necessary</h3>
                  <p className="text-xs text-muted">
                    Site basics and this consent record.
                  </p>
                  <p className="text-xs font-semibold text-faint">
                    Always on · cc_cookie · 6 months
                  </p>
                </div>
                <span className="text-xs font-semibold text-primary">On</span>
              </div>
              <div className="flex items-center justify-between gap-3 px-3 py-2">
                <div>
                  <h3 className="font-semibold text-foreground">Analytics</h3>
                  <p className="text-xs text-muted">
                    Aggregate GA4/GTM measurement. No retargeting.
                  </p>
                  <p className="text-xs font-semibold text-faint">
                    Optional · _ga, _ga_* · up to 2 years
                  </p>
                </div>
                <span className="text-xs font-semibold text-faint">
                  Optional
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-[0.1875rem]">
              <ConsentAction
                onClick={() => saveConsent(false, "preferences")}
              >
                Reject
              </ConsentAction>
              <ConsentAction
                tone="primary"
                onClick={() => saveConsent(true, "preferences")}
              >
                Accept
              </ConsentAction>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
