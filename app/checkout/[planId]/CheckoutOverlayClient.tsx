"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { absoluteUrl } from "@/lib/site";
import {
  GOAFFPRO_REFERRAL_CLAIM_URL,
  getGoaffproRefCode,
  getGoaffproVisitorId,
} from "@/lib/goaffpro";
import { Button } from "@/components/ui/Button";
import type { ArraySubsProPlan } from "../../deals/arraysubs/pricing/_plans";
import {
  CHECKOUT_PRODUCT_ID,
  CHECKOUT_PUBLIC_KEY,
  type CheckoutBillingCycle,
  type CheckoutTrialMode,
  EARLY_BIRD_DISCOUNT_PERCENT,
  formatUsd,
  getDiscountedPrice,
} from "../../deals/arraysubs/pricing/_plans";

type CheckoutConfig = {
  product_id: string;
  plan_id: string;
  public_key: string;
  image: string;
};

type CheckoutOpenOptions = {
  name: string;
  plan_id: string;
  licenses: number;
  billing_cycle: CheckoutBillingCycle;
  coupon: string;
  trial?: CheckoutTrialMode;
  purchaseCompleted?: (response: CheckoutResponse) => void;
  success?: (response: CheckoutResponse) => void;
};

type CheckoutPurchase = {
  id?: number | string;
  license_id?: number | string;
  plan_id?: number | string;
  user_id?: number | string;
};

type CheckoutResponse = {
  user?: { email?: string; id?: number | string };
  license?: { key?: string; id?: number | string };
  purchase?: CheckoutPurchase | null;
};

type CheckoutInstance = {
  open: (options: CheckoutOpenOptions) => void;
  close?: () => void;
  destroy?: () => void;
};

declare global {
  interface Window {
    FS?: {
      Checkout: new (config: CheckoutConfig) => CheckoutInstance;
    };
  }
}

const CHECKOUT_SCRIPT_URL = "https://checkout.freemius.com/js/v1/";

export function CheckoutOverlayClient({
  plan,
  billingCycle,
  couponCode,
  trialMode,
}: {
  plan: ArraySubsProPlan;
  billingCycle: CheckoutBillingCycle;
  couponCode: string;
  trialMode?: CheckoutTrialMode;
}) {
  const isLifetimeCheckout = billingCycle === "lifetime";
  const originalPrice = isLifetimeCheckout ? plan.lifetimePrice : plan.annualPrice;
  const discountedPrice = getDiscountedPrice(originalPrice);
  const priceSuffix = isLifetimeCheckout ? "lifetime" : "annual";
  const isTrialCheckout = Boolean(trialMode);
  const [scriptReady, setScriptReady] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState(
    "Loading the secure checkout.",
  );
  const openedRef = useRef(false);
  const checkoutRef = useRef<CheckoutInstance | null>(null);
  const claimSentRef = useRef(false);

  /**
   * File a GoAffPro referral claim with the user portal when this browser
   * carries an affiliate ref cookie. The claim links the ref code to the
   * purchase identity only — the actual commission is created later by the
   * portal's Freemius payment webhook, using Freemius' own amounts. Organic
   * checkouts (no ref cookie) post nothing. Fire-and-forget: affiliate
   * tracking must never interrupt the checkout experience. Trial checkouts
   * also file their claim — the payment webhook arrives when the trial
   * converts, within the claim window.
   */
  const sendReferralClaim = useCallback(
    async (response: CheckoutResponse) => {
      if (claimSentRef.current) return;

      const refCode = getGoaffproRefCode();

      if (!refCode) return;

      claimSentRef.current = true;

      try {
        const result = await fetch(GOAFFPRO_REFERRAL_CLAIM_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            refCode,
            visitorId: getGoaffproVisitorId(),
            email: response.user?.email ?? "",
            fsUserId: String(response.user?.id ?? response.purchase?.user_id ?? ""),
            fsLicenseId: String(
              response.purchase?.license_id ?? response.license?.id ?? "",
            ),
            fsPlanId: String(response.purchase?.plan_id ?? plan.id),
            billingCycle,
            sourcePath: window.location.pathname,
          }),
        });

        if (!result.ok) {
          throw new Error(`Referral claim failed (${result.status})`);
        }
      } catch (error) {
        // Allow the later success callback to retry once more.
        claimSentRef.current = false;
        console.error("Affiliate referral claim failed", error);
      }
    },
    [billingCycle, plan.id],
  );

  const closeCheckout = useCallback(() => {
    const checkout = checkoutRef.current;

    if (!checkout) return;

    try {
      if (typeof checkout.close === "function") {
        checkout.close();
      } else if (typeof checkout.destroy === "function") {
        checkout.destroy();
      }
    } catch (error) {
      console.error("Secure checkout failed to close", error);
    }
  }, []);

  useEffect(() => {
    if (window.FS?.Checkout) {
      setScriptReady(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", closeCheckout);
    window.addEventListener("pagehide", closeCheckout);
    window.addEventListener("beforeunload", closeCheckout);

    return () => {
      window.removeEventListener("popstate", closeCheckout);
      window.removeEventListener("pagehide", closeCheckout);
      window.removeEventListener("beforeunload", closeCheckout);
      closeCheckout();
    };
  }, [closeCheckout]);

  const openCheckout = useCallback(() => {
    if (!window.FS?.Checkout) {
      setStatus("error");
      setMessage("Secure checkout could not load. Please refresh the page.");
      return;
    }

    try {
      const checkout =
        checkoutRef.current ??
        new window.FS.Checkout({
          product_id: CHECKOUT_PRODUCT_ID,
          plan_id: plan.id,
          public_key: CHECKOUT_PUBLIC_KEY,
          image: absoluteUrl("/arrayhash-favicon.webp"),
        });

      checkoutRef.current = checkout;
      setStatus("ready");
      setMessage(
        "Secure checkout is ready. If the overlay closes before checkout is complete, use the button below to reopen it.",
      );

      checkout.open({
        name: "ArraySubs Pro",
        plan_id: plan.id,
        licenses: plan.sites,
        billing_cycle: billingCycle,
        coupon: couponCode,
        ...(trialMode ? { trial: trialMode } : {}),
        purchaseCompleted: (response) => {
          void sendReferralClaim(response);
        },
        success: (response) => {
          void sendReferralClaim(response);
          setStatus("success");
          setMessage("Purchase completed. Your license has been confirmed.");
        },
      });
    } catch (error) {
      console.error("Secure checkout failed to open", error);
      setStatus("error");
      setMessage("Secure checkout could not open. Please refresh the page.");
    }
  }, [billingCycle, couponCode, plan.id, plan.sites, sendReferralClaim, trialMode]);

  useEffect(() => {
    if (!scriptReady || openedRef.current) {
      return;
    }

    openedRef.current = true;
    openCheckout();
  }, [openCheckout, scriptReady]);

  const Icon =
    status === "success"
      ? CheckCircle2
      : status === "error"
        ? TriangleAlert
        : status === "loading"
          ? Loader2
          : CheckCircle2;

  return (
    <>
      <Script
        src={CHECKOUT_SCRIPT_URL}
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onError={() => {
          setStatus("error");
          setMessage("Secure checkout could not load. Please refresh the page.");
        }}
      />

      <div
        role="status"
        aria-live="polite"
        className="flex h-full flex-col justify-between rounded-2xl bg-card p-6 text-foreground sm:p-8"
      >
        <div>
          <div className="flex items-center gap-3">
            <Icon
              aria-hidden="true"
              className={
                status === "success"
                  ? "size-7 text-success"
                  : status === "error"
                    ? "size-7 text-danger"
                    : status === "loading"
                      ? "size-7 animate-spin text-primary"
                      : "size-7 text-primary"
              }
            />
            <h2 className="font-display text-2xl">Secure checkout</h2>
          </div>
          <p className="mt-4 text-muted text-pretty">{message}</p>
          {isTrialCheckout && (
            <p className="mt-4 rounded-xl border border-primary/20 bg-primary/8 px-4 py-3 text-sm font-semibold text-foreground text-pretty">
              Trial mode is enabled for this checkout. Freemius will open the
              no-card trial flow when the product plan supports free trials.
            </p>
          )}
          <p className="mt-4 text-sm text-muted text-pretty">
            Selected plan:{" "}
            <span className="font-semibold text-foreground">{plan.name}</span>,{" "}
            {plan.siteLabel}.{" "}
            Coupon{" "}
            <span className="font-semibold text-foreground">{couponCode}</span>
            .{" "}
            <span className="font-semibold text-[#FE8218]">
              {EARLY_BIRD_DISCOUNT_PERCENT}% off
            </span>{" "}
            {priceSuffix} price{" "}
            <span className="line-through decoration-muted/70">
              {formatUsd(originalPrice)}
            </span>{" "}
            <span className="font-semibold text-foreground">
              {formatUsd(discountedPrice)}
            </span>
            .
          </p>
          <div className="mt-7 max-w-sm">
            <Button
              type="button"
              size="lg"
              fullWidth
              magnetic
              disabled={!scriptReady || status === "loading"}
              onClick={openCheckout}
              iconRight={<ArrowRight className="size-5" />}
            >
              Proceed to checkout
            </Button>
          </div>
        </div>

        <p className="mt-8 border-t border-border pt-5 text-sm text-faint">
          If the checkout overlay is closed or blocked, use Proceed to checkout
          again. Refresh only if secure checkout cannot load.
        </p>
      </div>
    </>
  );
}
