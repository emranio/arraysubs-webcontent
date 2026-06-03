"use client";

import { useRef } from "react";
import {
  Check,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap";

type MetricFormat = "moneyK" | "percent" | "integer";

const metrics: {
  label: string;
  value: number;
  format: MetricFormat;
  detail: string;
}[] = [
    { label: "MRR", value: 12.4, format: "moneyK", detail: "+18% month" },
    { label: "Churn", value: 2.1, format: "percent", detail: "save ready" },
    { label: "Saves", value: 34, format: "integer", detail: "this month" },
    { label: "Stack", value: 6, format: "integer", detail: "plugins replaced" },
  ];

const saveFlow = [
  "Customer clicks cancel",
  "Reason captured",
  "Offer shown",
  "Subscriber saved",
];

const billingFeatureTags = [
  "Recurring products",
  "Free trials",
  "Sign-up fees",
  "Variable billing",
  "Manual renewals",
  "Stripe billing",
  "PayPal billing",
  "Paddle MOR",
  "Grace period",
  "Auto retry",
  "Auto downgrade",
  "Invoice payment",
];

const growthFeatureTags = [
  "Member access",
  "URL restriction",
  "Content dripping",
  "Role mapping",
  "Customer portal",
  "Skip & pause",
  "Plan switching",
  "Proration",
  "Retention offers",
  "Store credit",
  "MRR analytics",
  "Churn analytics",
  "Audit logs",
  "Usage limits",
  "Multi-login control",
  "Checkout builder",
];

function formatMetric(value: number, format: MetricFormat) {
  if (format === "moneyK") return `$${value.toFixed(1)}k`;
  if (format === "percent") return `${value.toFixed(1)}%`;
  return `${Math.round(value)}`;
}

function metricLabel(metric: (typeof metrics)[number]) {
  return `${metric.label}: ${formatMetric(metric.value, metric.format)}; ${metric.detail}`;
}

export function HeroProofPanel() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      registerGsap();

      if (prefersReducedMotion()) {
        return;
      }

      const items = root.querySelectorAll<HTMLElement>("[data-proof-item]");

      gsap.from(items, {
        autoAlpha: 0,
        y: "0.75rem",
        duration: 0.72,
        ease: "power3.out",
        stagger: 0.045,
      });
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="relative min-w-0"
      aria-label="ArraySubs subscription, membership, retention and analytics proof panel"
    >
      <div className="grid gap-[0.1875rem]">
        <div data-proof-item className="rounded-xl bg-card p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-pill bg-highlight px-3 py-1 text-xs font-semibold text-dark uppercase">
                <Sparkles className="size-3.5 text-primary" />
                Live retention engine
              </span>
              <p className="mt-3 max-w-4xl text-lg leading-8 font-medium text-muted text-pretty sm:text-xl">
                ArraySubs replaces five disconnected tools with one integrated
                plugin — so you launch in minutes, recover failed payments
                automatically, and turn cancellations into saves.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-pill bg-primary px-3 py-1.5 text-xs font-semibold text-on-dark uppercase">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-highlight"
              />
              Live
            </span>
          </div>

        </div>

        <div data-proof-item className="grid grid-cols-2 gap-[0.1875rem] sm:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl bg-card p-3"
              aria-label={metricLabel(metric)}
            >
              <span className="text-xs font-semibold text-faint uppercase">
                {metric.label}
              </span>
              <span className="mt-2 block font-display text-xl leading-none font-semibold tabular-nums text-foreground">
                {formatMetric(metric.value, metric.format)}
              </span>
              <span className="mt-2 block text-xs font-medium text-primary">
                {metric.detail}
              </span>
            </div>
          ))}
        </div>

        <div className="grid items-stretch gap-[0.1875rem] lg:grid-cols-2">
          <div data-proof-item className="flex h-full flex-col rounded-xl bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-faint uppercase">
                Cancellation save flow
              </span>
              <HeartHandshake className="size-4 text-primary" />
            </div>
            <ol className="mt-3 grid flex-1 gap-[0.1875rem]">
              {saveFlow.map((step, index) => (
                <li
                  key={step}
                  className="flex items-center gap-3 rounded-lg bg-surface px-3 py-2.5"
                >
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-card text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div data-proof-item className="grid h-full gap-[0.1875rem]">
            <div className="rounded-xl bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-faint uppercase">
                  Billing feature tags
                </span>
                <span className="rounded-pill bg-surface px-2.5 py-1 text-xs font-semibold text-primary">
                  Payments
                </span>
              </div>

              <ul className="mt-3 flex flex-wrap gap-[0.1875rem]">
                {billingFeatureTags.map((tag) => (
                  <li
                    key={tag}
                    className="inline-flex items-center rounded-pill border border-border bg-transparent px-2.5 py-1.5 text-xs font-semibold text-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-faint uppercase">
                  Growth feature tags
                </span>
                <span className="rounded-pill bg-surface px-2.5 py-1 text-xs font-semibold text-primary">
                  Store ops
                </span>
              </div>

              <ul className="mt-3 flex flex-wrap gap-[0.1875rem]">
                {growthFeatureTags.map((tag) => (
                  <li
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-transparent px-2.5 py-1.5 text-xs font-semibold text-foreground"
                  >
                    <Check className="size-3.5 shrink-0 text-primary" />
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
