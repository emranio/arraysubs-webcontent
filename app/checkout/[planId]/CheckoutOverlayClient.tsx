"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { absoluteUrl } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import type { ArraySubsProPlan } from "../../deals/arraysubs/pricing/_plans";
import {
  CHECKOUT_PRODUCT_ID,
  CHECKOUT_PUBLIC_KEY,
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
  licenses: number;
  purchaseCompleted?: (response: CheckoutResponse) => void;
  success?: (response: CheckoutResponse) => void;
};

type CheckoutResponse = {
  user?: { email?: string };
  license?: { key?: string };
};

type CheckoutInstance = {
  open: (options: CheckoutOpenOptions) => void;
};

declare global {
  interface Window {
    FS?: {
      Checkout: new (config: CheckoutConfig) => CheckoutInstance;
    };
  }
}

const CHECKOUT_SCRIPT_URL = "https://checkout.freemius.com/js/v1/";

export function CheckoutOverlayClient({ plan }: { plan: ArraySubsProPlan }) {
  const annualPrice = getDiscountedPrice(plan.annualPrice);
  const lifetimePrice = getDiscountedPrice(plan.lifetimePrice);
  const [scriptReady, setScriptReady] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState(
    "Loading the secure checkout.",
  );
  const openedRef = useRef(false);
  const checkoutRef = useRef<CheckoutInstance | null>(null);

  useEffect(() => {
    if (window.FS?.Checkout) {
      setScriptReady(true);
    }
  }, []);

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
        licenses: plan.sites,
        purchaseCompleted: (response) => {
          console.log("Purchase completed:", response);
          console.log("User email:", response.user?.email);
          console.log("License key:", response.license?.key);
        },
        success: (response) => {
          console.log("Checkout closed after successful purchase:", response);
          console.log("User email:", response.user?.email);
          console.log("License key:", response.license?.key);
          setStatus("success");
          setMessage("Purchase completed. Your license has been confirmed.");
        },
      });
    } catch (error) {
      console.error("Secure checkout failed to open", error);
      setStatus("error");
      setMessage("Secure checkout could not open. Please refresh the page.");
    }
  }, [plan.id, plan.sites]);

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
          <p className="mt-4 text-sm text-muted text-pretty">
            Selected plan:{" "}
            <span className="font-semibold text-foreground">{plan.name}</span>,{" "}
            {plan.siteLabel}.{" "}
            <span className="font-semibold text-[#FE8218]">
              {EARLY_BIRD_DISCOUNT_PERCENT}% off
            </span>{" "}
            annual price{" "}
            <span className="line-through decoration-muted/70">
              {formatUsd(plan.annualPrice)}
            </span>{" "}
            <span className="font-semibold text-foreground">
              {formatUsd(annualPrice)}
            </span>
            ; lifetime option{" "}
            <span className="line-through decoration-muted/70">
              {formatUsd(plan.lifetimePrice)}
            </span>{" "}
            <span className="font-semibold text-foreground">
              {formatUsd(lifetimePrice)}
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
