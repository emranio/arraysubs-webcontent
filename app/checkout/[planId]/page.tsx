import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import {
  Button,
  Container,
  PageHero,
  Section,
} from "@/components/ui";
import {
  ARRAYSUBS_PRO_PLANS,
  EARLY_BIRD_DISCOUNT_PERCENT,
  PRO_PLAN_FEATURES,
  formatUsd,
  getArraySubsProPlan,
  getCheckoutHref,
  getDiscountedPrice,
} from "../../deals/arraysubs/pricing/_plans";
import { CheckoutOverlayClient } from "./CheckoutOverlayClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARRAYSUBS_PRO_PLANS.map((plan) => ({ planId: plan.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ planId: string }>;
}): Promise<Metadata> {
  const { planId } = await params;
  const plan = getArraySubsProPlan(planId);

  if (!plan) {
    return {};
  }

  const annualPrice = getDiscountedPrice(plan.annualPrice);
  const lifetimePrice = getDiscountedPrice(plan.lifetimePrice);

  return createMetadata({
    title: `${plan.name} Checkout — ArraySubs Pro`,
    description: `Complete your ArraySubs Pro ${plan.name} checkout securely. ${plan.siteLabel}, ${EARLY_BIRD_DISCOUNT_PERCENT}% off early-bird pricing: ${formatUsd(annualPrice)} yearly, lifetime option ${formatUsd(lifetimePrice)}.`,
    path: getCheckoutHref(plan.id),
    noindex: true,
  });
}

export default async function ArraySubsCheckoutPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;
  const plan = getArraySubsProPlan(planId);

  if (!plan) {
    notFound();
  }

  const annualPrice = getDiscountedPrice(plan.annualPrice);
  const lifetimePrice = getDiscountedPrice(plan.lifetimePrice);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "ArraySubs", href: "/deals/arraysubs/" },
          { name: "Pricing Plan", href: "/deals/arraysubs/pricing/" },
          { name: `${plan.name} Checkout`, href: getCheckoutHref(plan.id) },
        ]}
        title={`${plan.name} checkout.`}
        subtitle="Secure checkout opens automatically on this page. Complete checkout to receive your ArraySubs Pro license and account details."
        highlights={[
          `Plan ID ${plan.id}`,
          plan.siteLabel,
          `${EARLY_BIRD_DISCOUNT_PERCENT}% off early bird`,
          `${formatUsd(annualPrice)} yearly`,
          `${formatUsd(lifetimePrice)} lifetime`,
        ]}
        actions={
          <Button
            href="/deals/arraysubs/pricing/"
            variant="outline"
            size="lg"
            magnetic
            iconLeft={<ArrowLeft className="size-5" />}
          >
            Back to Pricing
          </Button>
        }
      />

      <Section surface="surface" spacing="md">
        <Container>
          <div className="grid items-stretch gap-[0.1875rem] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <aside className="flex h-full flex-col rounded-2xl bg-card p-6 text-foreground sm:p-8">
              <div className="flex items-center gap-3">
                <ShieldCheck aria-hidden="true" className="size-7 text-primary" />
                <h2 className="font-display text-2xl">Order summary</h2>
              </div>
              <div className="mt-7 border-y border-border py-6">
                <p className="text-sm font-semibold tracking-wide text-faint uppercase">
                  ArraySubs Pro {plan.name}
                </p>
                <div className="mt-3 inline-flex items-center rounded-pill bg-[#FE8218] px-2.5 py-1 text-xs font-extrabold tracking-wide text-white uppercase">
                  {EARLY_BIRD_DISCOUNT_PERCENT}% off
                </div>
                <div className="mt-4 flex flex-wrap items-end gap-x-3 gap-y-1">
                  <span className="pb-2 text-sm font-semibold text-muted line-through decoration-muted/70">
                    {formatUsd(plan.annualPrice)}
                  </span>
                  <span className="font-display text-5xl leading-none font-semibold">
                    {formatUsd(annualPrice)}
                  </span>
                  <span className="pb-1.5 text-sm font-semibold text-muted">
                    / year
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">
                  Annual license for {plan.siteLabel}. Lifetime option{" "}
                  <span className="line-through decoration-muted/70">
                    {formatUsd(plan.lifetimePrice)}
                  </span>{" "}
                  <span className="font-semibold text-foreground">
                    {formatUsd(lifetimePrice)}
                  </span>
                  .
                </p>
              </div>
              <p className="mt-6 text-muted text-pretty">{plan.summary}</p>
              <ul className="mt-7 grid gap-3">
                {PRO_PLAN_FEATURES.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm font-medium text-foreground"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-primary"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <CheckoutOverlayClient plan={plan} />
          </div>
        </Container>
      </Section>
    </>
  );
}
