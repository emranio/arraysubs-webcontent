"use client";

import { useRef } from "react";
import {
  CircleDollarSign,
  HeartHandshake,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Undo2,
  type LucideIcon,
} from "lucide-react";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";
import { Badge, Button, SectionTitle } from "@/components/ui";

type Stat = { value: string; label: string; detail: string };

const stats: Stat[] = [
  { value: "$12.4k", label: "Protected MRR", detail: "+18% this month" },
  { value: "2.1%", label: "Churn risk", detail: "Save offers armed" },
  { value: "34", label: "Recovered accounts", detail: "This month" },
];

type FeedEvent = {
  icon: LucideIcon;
  title: string;
  meta: string;
  tag: string;
  positive: boolean;
  time: string;
};

/** Illustrative mock of the retention engine at work — not live customer data. */
const events: FeedEvent[] = [
  {
    icon: RefreshCw,
    title: "Renewal recovered",
    meta: "Pro Monthly · card retried automatically",
    tag: "+$29",
    positive: true,
    time: "just now",
  },
  {
    icon: HeartHandshake,
    title: "Cancellation saved",
    meta: "Reason captured, then 20% offer accepted",
    tag: "saved",
    positive: true,
    time: "2m ago",
  },
  {
    icon: CircleDollarSign,
    title: "Failed payment retried",
    meta: "Smart dunning · attempt 2 cleared",
    tag: "success",
    positive: true,
    time: "6m ago",
  },
  {
    icon: Sparkles,
    title: "Trial converted",
    meta: "10-day trial rolled into Pro annual",
    tag: "+$149",
    positive: true,
    time: "11m ago",
  },
  {
    icon: Undo2,
    title: "Paused instead of cancelled",
    meta: "Subscription resumes in 30 days",
    tag: "retained",
    positive: false,
    time: "18m ago",
  },
  {
    icon: ShieldCheck,
    title: "Grace window opened",
    meta: "Access held while recovery email sent",
    tag: "protected",
    positive: true,
    time: "24m ago",
  },
];

/**
 * "Live retention engine" proof panel — a JSX product mockup (no screenshots).
 * A compact claim + stat readout above a single dominant live-event feed, so the
 * whole billing/dunning/save story reads as one system working in real time.
 */
export function RetentionEnginePanel() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      registerGsap();
      if (prefersReducedMotion()) return;

      const rows = root.querySelectorAll<HTMLElement>("[data-feed-row]");
      gsap.from(rows, {
        autoAlpha: 0,
        y: "0.5rem",
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });

      const dot = root.querySelector<HTMLElement>("[data-live-dot]");
      if (dot) {
        gsap.to(dot, {
          opacity: 0.35,
          duration: 1.1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="min-w-0"
      aria-label="ArraySubs live retention engine — recent recovery and save events"
    >
      {/* Header: claim on the left, redesigned live recovery dashboard on the right */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.48fr)] lg:items-start">
        <SectionTitle
          eyebrow="Live retention engine"
          title="Cancellations saved, payments recovered — automatically."
          subtitle="The billing, dunning, and save-offer work six separate plugins used to fight over now runs as one live system on a single subscription record."
        />

        <aside
          className="grid gap-[0.1875rem]"
          aria-label="Live retention performance summary"
        >
          <div className="flex items-center justify-between gap-4">
            <Badge tone="neutral" className="w-fit">
              <span
                data-live-dot
                aria-hidden="true"
                className="mr-1 size-2 rounded-full bg-primary"
              />
              Live recovery pulse
            </Badge>
            <span className="text-xs font-semibold tracking-wide text-primary uppercase">
              Auto-syncing
            </span>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold tracking-wide text-faint uppercase">
              Revenue protected
            </p>
            <p className="mt-2 font-display text-5xl leading-none font-semibold tabular-nums text-foreground">
              $12.4k
            </p>
            <p className="mt-2 text-sm text-muted">
              Recovered from retries, save offers, and grace-period workflows
              this month.
            </p>
          </div>

          <dl className="grid gap-[0.1875rem] sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-background p-3"
              >
                <dt className="text-xs font-semibold tracking-wide text-faint uppercase">
                  {stat.label}
                </dt>
                <dd className="mt-2">
                  <span className="block font-display text-2xl leading-none font-semibold tabular-nums text-foreground">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 block text-xs font-medium text-primary">
                    {stat.detail}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <Button
            href="/deals/arraysubs/features/#retention-revenue"
            variant="outline"
            size="sm"
            className="mt-4 justify-self-start"
            iconRight={<Sparkles aria-hidden="true" className="size-4" />}
          >
            See retention tools
          </Button>
        </aside>
      </div>

      {/* Six compact cards: recent events in the same retention pipeline. */}
      <div className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold tracking-wide text-faint uppercase">
            Recent retention events
          </span>
          <span className="text-xs font-medium text-faint">Auto-updating</span>
        </div>
        <ul role="list" className="mt-4 grid gap-[0.1875rem] md:grid-cols-2">
          {events.map((event) => {
            const Icon = event.icon;
            return (
              <li
                key={event.title}
                data-feed-row
                className="grid min-h-32 grid-cols-[auto_1fr] gap-x-4 gap-y-5 rounded-xl border border-border bg-card p-4"
                aria-label={`${event.title}: ${event.meta} — ${event.tag}, ${event.time}`}
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-highlight text-primary"
                >
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {event.title}
                  </p>
                  <p className="text-xs text-muted text-pretty">{event.meta}</p>
                </div>
                <div className="col-span-2 flex items-end justify-between gap-3 border-t border-border pt-3">
                  <span
                    className={
                      event.positive
                        ? "rounded-pill bg-highlight px-2.5 py-0.5 text-xs font-semibold tabular-nums text-primary"
                        : "rounded-pill bg-surface px-2.5 py-0.5 text-xs font-semibold text-muted"
                    }
                  >
                    {event.tag}
                  </span>
                  <span className="text-xs font-medium text-faint">
                    {event.time}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
