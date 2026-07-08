"use client";

import { useRef } from "react";
import {
  CircleDollarSign,
  HeartHandshake,
  RefreshCw,
  Sparkles,
  Undo2,
  type LucideIcon,
} from "lucide-react";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";
import { Badge, SectionTitle } from "@/components/ui";

type Stat = { value: string; label: string };

const stats: Stat[] = [
  { value: "$12.4k", label: "MRR · +18% this month" },
  { value: "2.1%", label: "Churn · save offers armed" },
  { value: "34", label: "Saves · this month" },
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
      {/* Header: claim on the left, live status + compact stat readout on the right */}
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
        <SectionTitle
          eyebrow="Live retention engine"
          title="Cancellations saved, payments recovered — automatically."
          subtitle="The billing, dunning, and save-offer work six separate plugins used to fight over now runs as one live system on a single subscription record."
        />

        <div className="flex flex-col gap-6">
          <Badge tone="neutral" className="w-fit">
            <span
              data-live-dot
              aria-hidden="true"
              className="mr-1 size-2 rounded-full bg-secondary"
            />
            Live
          </Badge>
          <dl className="flex flex-wrap gap-x-8 gap-y-5 lg:flex-col lg:gap-y-4">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl leading-none font-semibold tabular-nums text-foreground">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 block text-xs font-medium text-faint uppercase">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* One dominant motif: the live event feed (single card, divided rows) */}
      <div className="mt-10 rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="text-xs font-semibold tracking-wide text-faint uppercase">
            Recent retention events
          </span>
          <span className="text-xs font-medium text-faint">Auto-updating</span>
        </div>
        <ul role="list" className="divide-y divide-border">
          {events.map((event) => {
            const Icon = event.icon;
            return (
              <li
                key={event.title}
                data-feed-row
                className="flex items-center gap-4 px-5 py-4"
                aria-label={`${event.title}: ${event.meta} — ${event.tag}, ${event.time}`}
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-highlight text-primary"
                >
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {event.title}
                  </p>
                  <p className="text-xs text-muted text-pretty">{event.meta}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span
                    className={
                      event.positive
                        ? "rounded-pill bg-surface px-2.5 py-0.5 text-xs font-semibold tabular-nums text-secondary"
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
