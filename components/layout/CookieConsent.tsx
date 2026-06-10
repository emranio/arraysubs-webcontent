"use client";

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
  RETARGETING_COOKIE_NAME,
  RETARGETING_ID_LENGTH,
} from "@/lib/privacy-consent";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

type ConsentSource = "banner" | "preferences" | "privacy-choices";

type CookieConsentState = {
  version: typeof COOKIE_CONSENT_VERSION;
  necessary: true;
  // Analytics is required for the site to operate and always on.
  analytics: true;
  // Optional retargeting opt-in.
  retargeting: boolean;
  updatedAt: string;
  source: ConsentSource;
};

type NavigatorWithGpc = Navigator & {
  globalPrivacyControl?: boolean;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const RETARGETING_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateRetargetingId(): string {
  const bytes = new Uint8Array(RETARGETING_ID_LENGTH);
  crypto.getRandomValues(bytes);

  let id = "";
  for (let i = 0; i < RETARGETING_ID_LENGTH; i += 1) {
    id += RETARGETING_ALPHABET[bytes[i] % RETARGETING_ALPHABET.length];
  }
  return id;
}

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
      typeof parsed.retargeting !== "boolean"
    ) {
      return null;
    }

    return {
      version: COOKIE_CONSENT_VERSION,
      necessary: true,
      analytics: true,
      retargeting: parsed.retargeting,
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

function readRetargetingId(): string | null {
  if (typeof document === "undefined") return null;

  const row = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${RETARGETING_COOKIE_NAME}=`));

  return row ? row.slice(RETARGETING_COOKIE_NAME.length + 1) : null;
}

function writeRetargetingCookie() {
  if (typeof document === "undefined") return;

  // Reuse an existing id so the value stays stable across re-consents.
  const id = readRetargetingId() || generateRetargetingId();
  const secure =
    window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = `${RETARGETING_COOKIE_NAME}=${id}; Path=/; Max-Age=${COOKIE_CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
}

function deleteRetargetingCookie() {
  if (typeof document === "undefined") return;

  const host = window.location.hostname;
  const domains = new Set<string | undefined>([undefined, host]);
  if (host.includes(".")) domains.add(`.${host}`);

  for (const domain of domains) expireCookie(RETARGETING_COOKIE_NAME, domain);
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
  const [showPreferences, setShowPreferences] = useState(false);
  const [gpcEnabled, setGpcEnabled] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const saved = decodeConsent();
    const hasGpc = Boolean(
      (window.navigator as NavigatorWithGpc).globalPrivacyControl,
    );

    setGpcEnabled(hasGpc);
    setConsent(saved);
    setShowPreferences(!saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    const openPreferences = () => {
      previousFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      setShowPreferences(true);
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, openPreferences);
    return () =>
      window.removeEventListener(COOKIE_CONSENT_EVENT, openPreferences);
  }, [consent]);

  // Keep the retargeting cookie in sync with the recorded choice.
  useEffect(() => {
    if (!consent) return;

    if (consent.retargeting) writeRetargetingCookie();
    else deleteRetargetingCookie();
  }, [consent?.retargeting]);

  useEffect(() => {
    if (!showPreferences) return;

    const focusable = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    );

    focusable[0]?.focus();
  }, [showPreferences]);

  const saveConsent = (retargeting: boolean, source: ConsentSource) => {
    // Global Privacy Control is a binding opt-out signal — never enable
    // retargeting while it is present.
    const allowRetargeting = retargeting && !gpcEnabled;

    const next: CookieConsentState = {
      version: COOKIE_CONSENT_VERSION,
      necessary: true,
      analytics: true,
      retargeting: allowRetargeting,
      updatedAt: new Date().toISOString(),
      source,
    };

    writeConsent(next);

    if (allowRetargeting) writeRetargetingCookie();
    else deleteRetargetingCookie();

    setConsent(next);
    setShowPreferences(false);

    window.dispatchEvent(
      new CustomEvent("arraysubs:cookie-consent-updated", {
        detail: next,
      }),
    );

    previousFocusRef.current?.focus();
  };

  const closePreferences = () => {
    if (!consent) {
      saveConsent(false, "preferences");
      return;
    }

    setShowPreferences(false);
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
      {/* Analytics is required and always loads, independent of consent. */}
      {GA_MEASUREMENT_ID && (
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

      {GTM_ID && (
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

      {showPreferences && (
        <div
          className="fixed inset-0 z-[90] flex items-end justify-start bg-dark/45 p-3 sm:p-4"
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
              Analytics is required to run the site. Retargeting is optional.
            </p>

            {gpcEnabled && (
              <div className="mt-2 rounded-md border border-border bg-card px-3 py-2 text-xs text-muted">
                GPC detected. Retargeting stays off.
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
                    Always on · cc_cookie
                  </p>
                </div>
                <span className="text-xs font-semibold text-primary">On</span>
              </div>
              <div className="flex items-center justify-between gap-3 px-3 py-2">
                <div>
                  <h3 className="font-semibold text-foreground">Analytics</h3>
                  <p className="text-xs text-muted">
                    Required aggregate GA4/GTM measurement.
                  </p>
                  <p className="text-xs font-semibold text-faint">
                    Always on · _ga, _ga_*
                  </p>
                </div>
                <span className="text-xs font-semibold text-primary">On</span>
              </div>
              <div className="flex items-center justify-between gap-3 px-3 py-2">
                <div>
                  <h3 className="font-semibold text-foreground">Retargeting</h3>
                  <p className="text-xs text-muted">
                    Lets us measure ad campaigns and show relevant ads.
                  </p>
                  <p className="text-xs font-semibold text-faint">
                    Optional · array_hash_re_ok
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
