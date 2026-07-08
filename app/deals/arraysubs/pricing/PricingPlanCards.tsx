"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge, Button } from "@/components/ui";
import { ARRAYSUBS_PRO_PLANS, formatUsd } from "./_plans";

type BillingCycle = "yearly" | "lifetime";

const BILLING_OPTIONS: { label: string; value: BillingCycle }[] = [
  { label: "Yearly", value: "yearly" },
  { label: "Lifetime", value: "lifetime" },
];

export function PricingPlanCards() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const isLifetime = billingCycle === "lifetime";
  const accentTone = isLifetime ? "secondary" : "primary";
  const featuredTextClass = "text-on-dark";
  const featuredMutedClass = "text-on-dark";
  const selectedFaceClass = isLifetime
    ? "bg-secondary text-on-dark"
    : "bg-primary text-on-dark";
  const selectedEdgeClass = isLifetime
    ? "bg-secondary-strong"
    : "bg-primary-strong";

  return (
    <>
      <div
        className={cn(
          "mt-8 inline-flex gap-1 rounded-pill border bg-background p-1.5 transition-colors",
          isLifetime ? "border-secondary" : "border-primary",
        )}
        role="radiogroup"
        aria-label="Choose billing option"
      >
        {BILLING_OPTIONS.map((option) => {
          const selected = billingCycle === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setBillingCycle(option.value)}
              className={cn(
                "group relative min-w-32 cursor-pointer rounded-pill border-0 bg-transparent p-0 text-base font-semibold outline-none",
                "focus-visible:outline-2 focus-visible:outline-offset-2",
                isLifetime
                  ? "focus-visible:outline-secondary"
                  : "focus-visible:outline-primary",
              )}
            >
              {selected && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 top-[0.1875rem] bottom-0 rounded-pill",
                    selectedEdgeClass,
                  )}
                />
              )}
              <span
                className={cn(
                  "relative flex min-h-12 items-center justify-center rounded-pill px-6 transition-transform",
                  selected
                    ? cn(
                        "-translate-y-[0.1875rem] group-active:translate-y-0",
                        selectedFaceClass,
                      )
                    : "text-muted hover:text-foreground",
                )}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid items-stretch gap-[0.1875rem] lg:grid-cols-3">
        {ARRAYSUBS_PRO_PLANS.map((plan) => {
          const isFeatured = Boolean(plan.badge);
          const price = isLifetime ? plan.lifetimePrice : plan.annualPrice;
          const priceSuffix = isLifetime ? "/ lifetime" : "/ year";
          const alternateLabel = isLifetime ? "Yearly option" : "Lifetime option";
          const alternatePrice = isLifetime
            ? `${formatUsd(plan.annualPrice)}/year`
            : formatUsd(plan.lifetimePrice);

          return (
            <article
              key={plan.id}
              className={cn(
                "flex h-full flex-col rounded-2xl p-6 transition-colors sm:p-8",
                isFeatured
                  ? isLifetime
                    ? "bg-secondary text-on-dark"
                    : "bg-primary text-on-dark"
                  : "bg-card text-foreground",
              )}
            >
              <div className="flex min-h-8 flex-wrap items-center justify-between gap-3">
                <Badge tone={isFeatured ? "highlight" : accentTone}>
                  {plan.siteLabel}
                </Badge>
                {plan.badge && <Badge tone="dark">{plan.badge}</Badge>}
              </div>

              <h2 className="mt-6 font-display text-3xl sm:text-4xl">
                {plan.name}
              </h2>
              <p
                className={cn(
                  "mt-3 text-pretty",
                  isFeatured ? featuredMutedClass : "text-muted",
                )}
              >
                {plan.summary}
              </p>

              <div className="mt-8">
                <div className="flex items-end gap-2">
                  <span className="font-display text-5xl font-semibold">
                    {formatUsd(price)}
                  </span>
                  <span
                    className={cn(
                      "pb-2 text-sm font-semibold",
                      isFeatured ? featuredMutedClass : "text-muted",
                    )}
                  >
                    {priceSuffix}
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-3 text-sm",
                    isFeatured ? featuredMutedClass : "text-muted",
                  )}
                >
                  {alternateLabel}:{" "}
                  <span
                    className={cn(
                      "font-semibold",
                      isFeatured ? featuredTextClass : "text-foreground",
                    )}
                  >
                    {alternatePrice}
                  </span>
                </p>
              </div>

              <p
                className={cn(
                  "mt-8 text-sm font-semibold",
                  isFeatured ? featuredTextClass : "text-foreground",
                )}
              >
                Best for
              </p>
              <p
                className={cn(
                  "mt-2 text-sm leading-6",
                  isFeatured ? featuredMutedClass : "text-muted",
                )}
              >
                {plan.bestFor}
              </p>

              <div className="mt-auto pt-12">
                <Button
                  href={`/deals/arraysubs/checkout/${plan.id}/`}
                  variant={isFeatured ? "dark" : accentTone}
                  size="lg"
                  fullWidth
                  magnetic
                  layers={isFeatured ? "2layer" : "3layer"}
                  iconRight={<ArrowRight className="size-5" />}
                >
                  Choose {plan.name}
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
