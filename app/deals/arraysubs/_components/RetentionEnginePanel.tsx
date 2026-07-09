"use client";

import { useRef } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  HeartHandshake,
  LifeBuoy,
  MessageSquareText,
  PauseCircle,
  RefreshCw,
  ShieldCheck,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";
import { Badge, Button } from "@/components/ui";

type SavePath = {
  icon: LucideIcon;
  label: string;
};

const savePaths: SavePath[] = [
  { icon: MessageSquareText, label: "Reason capture" },
  { icon: PauseCircle, label: "Pause offer" },
  { icon: HeartHandshake, label: "Downgrade path" },
  { icon: LifeBuoy, label: "Support handoff" },
  { icon: CreditCard, label: "Payment retry" },
  { icon: WalletCards, label: "Store credit" },
];

type WorkflowCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const workflowCards: WorkflowCard[] = [
  {
    icon: MessageSquareText,
    title: "Listen before cancel",
    description:
      "Capture the reason before the final confirmation, so the store can respond with context instead of a dead-end button.",
  },
  {
    icon: HeartHandshake,
    title: "Match the save path",
    description:
      "Present the right next step: pause, downgrade, support, store credit, or a targeted save offer based on the situation.",
  },
  {
    icon: RefreshCw,
    title: "Recover failed renewals",
    description:
      "Retry payments, open a grace window, and guide customers back to active billing without losing the subscription thread.",
  },
  {
    icon: ShieldCheck,
    title: "Keep the story together",
    description:
      "Every decision stays tied to the subscription record, so support, recovery, and reporting all see the same customer path.",
  },
];

export function RetentionEnginePanel() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      registerGsap();
      if (prefersReducedMotion()) return;

      const revealItems = root.querySelectorAll<HTMLElement>(
        "[data-retention-reveal]",
      );

      gsap.from(revealItems, {
        autoAlpha: 0,
        y: "0.75rem",
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="min-w-0"
      aria-label="ArraySubs retention workflow builder"
    >
      <div className="grid gap-[0.1875rem] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-stretch">
        <div
          data-retention-reveal
          className="flex min-h-[34rem] flex-col justify-between rounded-2xl border border-border bg-background p-6 sm:p-8 lg:p-10"
        >
          <div>
            <Badge tone="highlight" className="w-fit">
              Retention save studio
            </Badge>
            <h2 className="mt-6 max-w-4xl font-display text-[2.625rem] leading-[1.02] font-semibold tracking-normal text-foreground text-balance sm:text-[3.5rem] lg:text-[4.5rem]">
              Turn cancellation intent into a guided save path.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted text-pretty sm:text-xl">
              ArraySubs gives every risky subscriber moment a clear next step:
              understand the reason, present the right option, and keep the
              relationship inside WooCommerce.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid gap-[0.1875rem] sm:grid-cols-2">
              {savePaths.map((path) => {
                const Icon = path.icon;
                return (
                  <span
                    key={path.label}
                    className="inline-flex min-h-14 items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground"
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-5 shrink-0 text-primary"
                    />
                    {path.label}
                  </span>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                href="/deals/arraysubs/features/#retention-revenue"
                size="lg"
                magnetic
                iconRight={<ArrowRight aria-hidden="true" className="size-5" />}
              >
                Explore retention tools
              </Button>
              <p className="max-w-sm text-sm font-medium text-muted">
                Built for the moments where a normal cancel button gives up.
              </p>
            </div>
          </div>
        </div>

        <div
          data-retention-reveal
          className="rounded-2xl border border-on-dark-border bg-dark p-5 text-on-dark sm:p-6 lg:min-h-[34rem] lg:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge tone="outline" className="text-on-dark-muted">
              Relationship routing
            </Badge>
            <span className="inline-flex items-center gap-2 rounded-pill border border-on-dark-border px-3 py-1 text-xs font-semibold text-on-dark-muted uppercase">
              <BadgeCheck aria-hidden="true" className="size-4 text-secondary" />
              WooCommerce-native
            </span>
          </div>

          <div className="mt-8 grid gap-[0.1875rem] xl:grid-cols-2">
            <div className="rounded-xl border border-on-dark-border bg-dark-2 p-4">
              <p className="text-xs font-semibold tracking-wide text-on-dark-muted uppercase">
                Exit moment
              </p>
              <p className="mt-3 text-2xl leading-tight font-semibold text-on-dark text-balance">
                A subscriber is about to leave or a renewal needs recovery.
              </p>
            </div>
            <div className="rounded-xl border border-on-dark-border bg-dark-2 p-4">
              <p className="text-xs font-semibold tracking-wide text-on-dark-muted uppercase">
                ArraySubs workflow
              </p>
              <p className="mt-3 text-2xl leading-tight font-semibold text-on-dark text-balance">
                The same subscription record routes the reason, offer, recovery,
                and support context.
              </p>
            </div>
          </div>

          <div className="mt-[0.1875rem] grid gap-[0.1875rem] sm:grid-cols-2">
            {workflowCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  data-retention-reveal
                  className="min-h-52 rounded-xl border border-on-dark-border bg-dark-2 p-5"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex size-11 items-center justify-center rounded-lg bg-highlight text-primary"
                  >
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-normal text-on-dark">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-on-dark-muted text-pretty">
                    {card.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
