"use client";

import {
  TrendingUp,
  ShieldCheck,
  Zap,
  BarChart3,
  Clock,
  Layers,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";

const STATS = [
  { value: 15, suffix: "+", label: "Integrated Modules", color: "primary" },
  { value: 40, suffix: "+", label: "Analytics Reports", color: "amber" },
  { value: 6, suffix: "x", label: "Fewer Plugin Conflicts", color: "purple" },
  { value: 10, suffix: "+", label: "Access Condition Types", color: "blue" },
];

const BENEFITS = [
  {
    icon: TrendingUp,
    color: "primary",
    title: "Recover Revenue You're Losing Today",
    desc: "2-phase grace periods, automatic retry logic, and renewal reminders bring back failed payments before they become lost revenue.",
  },
  {
    icon: ShieldCheck,
    color: "blue",
    title: "Protect Every Subscriber",
    desc: "The Retention Flow intercepts cancellations with personalized offers — discount, pause, downgrade, or contact support — keeping subscribers engaged.",
  },
  {
    icon: Zap,
    color: "amber",
    title: "Launch in Minutes, Not Days",
    desc: "The 9-step setup wizard configures your entire subscription engine with one of 7 business-type profiles. Export/import for multi-site migrations.",
  },
  {
    icon: BarChart3,
    color: "purple",
    title: "See Every Metric That Matters",
    desc: "MRR, churn rate, ARPU, trial conversion, retention cohorts — all in a built-in analytics dashboard. No external tools required.",
  },
  {
    icon: Clock,
    color: "coral",
    title: "Automate the Busywork",
    desc: "Billing, invoicing, status transitions, email triggers, store credit application, and payment retries — all handled automatically.",
  },
  {
    icon: Layers,
    color: "blue",
    title: "Scale Without Complexity",
    desc: "One data layer, one update cycle, one support channel. Add Pro modules when you need them — the core free tier already powers real stores.",
  },
];

export default function GrowthSection() {
  return (
    <section className="hp-section hp-section--purple-tint">
      <div className="hp-section__inner hp-section__center">
        <ScrollReveal>
          <p className="hp-section__label reveal-item">Growth Engine</p>
          <h2 className="hp-section__title reveal-item">
            Built to Grow Your Business at Max
          </h2>
          <p className="hp-section__subtitle reveal-item">
            Every feature exists for one reason — to grow your subscription
            revenue, protect it from churn, and free you from busywork.
          </p>
        </ScrollReveal>

        <ScrollReveal className="hp-growth__stats" stagger={0.1}>
          {STATS.map((s, i) => (
            <div className={`hp-stat hp-stat--${s.color} reveal-item`} key={i}>
              <AnimatedCounter
                value={s.value}
                suffix={s.suffix}
                className="hp-stat__number"
              />
              <p className="hp-stat__label">{s.label}</p>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal className="hp-benefits" stagger={0.08}>
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                className={`hp-benefit hp-benefit--${b.color} reveal-item`}
                key={i}
              >
                <div className="hp-benefit__icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="hp-benefit__title">{b.title}</h3>
                <p className="hp-benefit__desc">{b.desc}</p>
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
