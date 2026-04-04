"use client";

import ScrollReveal from "@/components/ScrollReveal";
import WhyVisual from "@/components/homepage/WhyVisual";

const BLOCKS = [
  {
    heading: "One Plugin Replaces Six",
    body: "Other solutions force you to buy subscriptions from one vendor, memberships from another, retention from a third — and pray they all work together. ArraySubs is a single, integrated system where subscriptions, memberships, billing, Retention Flow, store credit, analytics, and audits share the same data layer. No API bridges. No webhook hacks. No compatibility prayers.",
    proof:
      "15 built-in modules that would normally require 6+ separate plugins.",
    visual: "architecture",
    reverse: false,
  },
  {
    heading: "The Most Powerful Free WooCommerce Subscription Plugin",
    body: "Subscription products (simple & variable), member access control with 10 condition types, recurring billing with 2-phase grace periods, a full customer self-service portal, plan switching with 3 proration methods, skip & pause, the Retention Flow Builder, email notifications, a 9-step setup wizard, profile builder, and manage subscriptions — all free. Not a 14-day trial. Not a feature-locked demo. Free, forever.",
    proof:
      "Core subscription engine + member access + billing + portal + Retention Flow + emails + setup wizard = free forever.",
    visual: "free",
    reverse: true,
  },
  {
    heading: "Stop Churn Before It Happens",
    body: "Every canceled subscription is lost revenue. ArraySubs is the only WooCommerce subscription plugin with a built-in Retention Flow — when a customer clicks Cancel, they pick a reason, then see a targeted offer: a discount, a pause, a downgrade, or a direct support channel. You keep the subscriber. They keep the value.",
    proof:
      "4 retention offer types + per-reason targeting + integrated retention analytics — included free.",
    visual: "retention",
    reverse: false,
  },
];

export default function WhySection() {
  return (
    <section className="hp-section">
      <div className="hp-section__inner">
        <ScrollReveal className="hp-section__center">
          <p className="hp-section__label reveal-item">Why ArraySubs</p>
          <h2 className="hp-section__title reveal-item">
            Built Different. Built Complete.
          </h2>
        </ScrollReveal>

        {BLOCKS.map((block, i) => (
          <ScrollReveal
            key={i}
            className={`hp-why__block${block.reverse ? " hp-why__block--reverse" : ""}`}
          >
            <div className="hp-why__text reveal-item">
              <h3 className="hp-why__heading">{block.heading}</h3>
              <p className="hp-why__body">{block.body}</p>
              <span className="hp-why__proof">{block.proof}</span>
            </div>
            <div className="hp-why__visual reveal-item">
              <WhyVisual variant={block.visual} />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
