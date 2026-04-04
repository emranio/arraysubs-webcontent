"use client";

import Link from "next/link";
import { XCircle, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const OLD_ROWS = [
  ["Subscriptions & recurring billing", "Plugin 1"],
  ["Memberships & access control", "Plugin 2"],
  ["Retention / churn prevention", "Plugin 3"],
  ["Store credit / virtual wallet", "Plugin 4"],
  ["Checkout customization", "Plugin 5"],
  ["Analytics & MRR tracking", "Plugin 6"],
  ["Total", "6 plugins, 6 update cycles"],
];

const NEW_ROWS = [
  [
    "Subscriptions + Memberships + Billing + Portal + Emails + Retention + Easy Setup + Manage Subs + Profile Builder",
    "Free core",
  ],
  [
    "+ Store Credit + Checkout Builder + Analytics + Audits + Auto Payments + Feature Manager + Multi-Login Prevention",
    "Pro add-on",
  ],
  ["Total", "One plugin. One update."],
];

export default function ProblemSection() {
  return (
    <section className="hp-section hp-section--alt">
      <div className="hp-section__inner">
        <ScrollReveal>
          <p className="hp-section__label reveal-item">The Problem</p>
          <h2 className="hp-section__title reveal-item">
            You Shouldn&apos;t Need Six Plugins to Sell Subscriptions and
            Memberships
          </h2>
          <p className="hp-section__subtitle reveal-item">
            Most WooCommerce store owners end up stacking a subscription plugin,
            a membership plugin, a retention tool, a store credit add-on, a
            checkout customizer, and an analytics dashboard — just to do what
            should be built into one solution. That&apos;s six update cycles,
            six potential conflicts, and a never-ending compatibility headache.
          </p>
        </ScrollReveal>

        <ScrollReveal className="hp-problem__grid" stagger={0}>
          <div className="hp-compare-card hp-compare-card--old reveal-item">
            <div className="hp-compare-card__heading">
              <XCircle
                aria-hidden="true"
                style={{ color: "var(--color-coral)" }}
              />
              The Old Way
            </div>
            <div className="hp-compare-card__rows">
              {OLD_ROWS.map(([label, tag], i) => (
                <div className="hp-compare-card__row" key={i}>
                  <span>{label}</span>
                  <span className="hp-compare-card__tag">{tag}</span>
                </div>
              ))}
            </div>
            <p className="hp-compare-card__caption">
              Six plugins. Six conflicts waiting to happen.
            </p>
          </div>

          <div className="hp-compare-card hp-compare-card--new reveal-item">
            <div className="hp-compare-card__heading">
              <CheckCircle
                aria-hidden="true"
                style={{ color: "var(--color-primary)" }}
              />
              The ArraySubs Way
            </div>
            <div className="hp-compare-card__rows">
              {NEW_ROWS.map(([label, tag], i) => (
                <div className="hp-compare-card__row" key={i}>
                  <span>{label}</span>
                  <span className="hp-compare-card__tag">{tag}</span>
                </div>
              ))}
            </div>
            <p className="hp-compare-card__caption">
              One plugin. One data layer. Zero conflicts.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal
          className="hp-section__center"
          style={{ marginTop: "var(--space-xl)" }}
        >
          <div
            className="hp-hero__ctas reveal-item"
            style={{ justifyContent: "center" }}
          >
            <Link href="/download/" className="btn btn--primary">
              Download Free Plugin
            </Link>
            <Link
              href="/compare/woocommerce-subscriptions/"
              className="btn btn--secondary"
            >
              See Full Comparison
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
