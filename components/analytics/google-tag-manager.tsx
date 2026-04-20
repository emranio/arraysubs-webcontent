'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    __webContentLoadGtm?: () => void;
    __webContentGtmLoaded?: boolean;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

type GoogleTagManagerTrackerProps = {
  gtmId: string;
};

function loadGtm(gtmId: string): void {
  if (window.__webContentGtmLoaded) {
    return;
  }

  window.__webContentGtmLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}&l=dataLayer`;
  document.body.appendChild(script);
}

export function GoogleTagManagerTracker({ gtmId }: GoogleTagManagerTrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPathRef = useRef<string | null>(null);
  const previousLocationRef = useRef<string | null>(null);
  const search = searchParams?.toString() ?? '';

  useEffect(() => {
    if (!gtmId) {
      return;
    }

    window.__webContentGtmLoaded = window.__webContentGtmLoaded || false;
    window.dataLayer = window.dataLayer || [];

    const events = ['scroll', 'click', 'touchstart', 'mousemove', 'keydown'] as const;
    const handler = () => loadGtm(gtmId);

    events.forEach((evt) => {
      window.addEventListener(evt, handler, { once: true, passive: true });
    });

    const timer = window.setTimeout(handler, 5000);

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handler));
      window.clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gtmId]);

  useEffect(() => {
    if (!gtmId) {
      return;
    }

    const currentPath = search ? `${pathname}?${search}` : pathname;
    const currentLocation = window.location.href;

    if (lastTrackedPathRef.current === currentPath) {
      return;
    }

    const isFirstPageView = lastTrackedPathRef.current === null;
    lastTrackedPathRef.current = currentPath;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_view',
      page_title: document.title,
      page_path: currentPath,
      page_location: currentLocation,
      page_referrer: isFirstPageView ? document.referrer : (previousLocationRef.current ?? document.referrer),
    });

    previousLocationRef.current = currentLocation;
  }, [gtmId, pathname, search]);

  return null;
}