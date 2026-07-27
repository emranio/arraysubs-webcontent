"use client";

import {
  type AnchorHTMLAttributes,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { site } from "@/lib/site";

type MailtoFallbackLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  mailtoUrl: string;
  fallbackUrl?: string;
  fallbackDelay?: number;
};

type ActiveListeners = {
  handleVisibilityChange: () => void;
  handleWindowBlur: () => void;
};

/**
 * Native email link with a contact-form fallback.
 *
 * Browsers cannot reliably report whether a mail protocol handler exists, so
 * losing focus or becoming hidden is treated as a best-effort handoff signal.
 */
export function MailtoFallbackLink({
  mailtoUrl,
  fallbackUrl = site.contactUrl,
  fallbackDelay = 1800,
  onClick,
  children,
  ...rest
}: MailtoFallbackLinkProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRef = useRef(false);
  const handlerOpenedRef = useRef(false);
  const listenersRef = useRef<ActiveListeners | null>(null);

  const cleanup = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const listeners = listenersRef.current;
    if (listeners) {
      document.removeEventListener(
        "visibilitychange",
        listeners.handleVisibilityChange,
      );
      window.removeEventListener("blur", listeners.handleWindowBlur);
      listenersRef.current = null;
    }

    activeRef.current = false;
  }, []);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);

      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();

      if (activeRef.current) {
        return;
      }

      activeRef.current = true;
      handlerOpenedRef.current = false;

      const handleProtocolHandoff = () => {
        handlerOpenedRef.current = true;
        cleanup();
      };
      const listeners = {
        handleVisibilityChange: () => {
          if (document.hidden) {
            handleProtocolHandoff();
          }
        },
        handleWindowBlur: handleProtocolHandoff,
      };

      listenersRef.current = listeners;
      document.addEventListener(
        "visibilitychange",
        listeners.handleVisibilityChange,
      );
      window.addEventListener("blur", listeners.handleWindowBlur);

      try {
        window.location.href = mailtoUrl;
      } catch {
        cleanup();
        window.location.assign(fallbackUrl);
        return;
      }

      timerRef.current = setTimeout(() => {
        const shouldUseFallback =
          !handlerOpenedRef.current &&
          document.visibilityState === "visible" &&
          document.hasFocus();

        cleanup();

        if (shouldUseFallback) {
          window.location.assign(fallbackUrl);
        }
      }, fallbackDelay);
    },
    [cleanup, fallbackDelay, fallbackUrl, mailtoUrl, onClick],
  );

  useEffect(() => cleanup, [cleanup]);

  return (
    <a
      href={fallbackUrl}
      data-mailto={mailtoUrl}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
}
