"use client";

import Link from "next/link";
import {
  Repeat,
  Receipt,
  CreditCard,
  ShieldCheck,
  CircleUser,
  UserCog,
  HeartHandshake,
  Wallet,
  Mail,
  BarChart3,
  ClipboardList,
  LayoutGrid,
  Settings2,
  Wand2,
  ListChecks,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const FEATURES = [
  {
    icon: Repeat,
    color: "primary",
    badge: "free",
    title: "Subscriptions & Recurring Products",
    desc: "Turn any product into a subscription — simple or variable — with flexible billing cycles, free trials, sign-up fees, and per-variation config.",
    link: "/features/subscriptions/",
  },
  {
    icon: Receipt,
    color: "primary",
    badge: "mixed",
    title: "Billing, Renewals & Refunds",
    desc: "Automated renewal invoicing, 2-phase grace periods, skip & pause, prorated refunds, renewal sync, and 6 billing lifecycle email triggers.",
    link: "/features/billing/",
  },
  {
    icon: CreditCard,
    color: "primary",
    badge: "mixed",
    title: "Payment Gateways",
    desc: "Manual renewal with any WooCommerce gateway (free). Automatic recurring with Stripe, PayPal, and Paddle — Pro.",
    link: "/features/payment-gateways/",
  },
  {
    icon: ShieldCheck,
    color: "blue",
    badge: "free",
    title: "Member Access Control",
    desc: "Restrict content, products, downloads, and URLs with 10 condition types, 12 operators, nested AND/OR groups, role mapping, and dripping.",
    link: "/features/membership/",
  },
  {
    icon: CircleUser,
    color: "blue",
    badge: "mixed",
    title: "Customer Portal",
    desc: "Self-service subscription hub — customers can view, skip, pause, switch plans, cancel, reactivate, and pay invoices.",
    link: "/features/customer-portal/",
  },
  {
    icon: UserCog,
    color: "blue",
    badge: "mixed",
    title: "Profile Builder & Shortcodes",
    desc: "Custom profile fields, avatar uploads, My Account nav editor, and visibility/restriction shortcodes.",
    link: "/features/profile-builder/",
  },
  {
    icon: HeartHandshake,
    color: "amber",
    badge: "free",
    title: "Retention Flow Builder",
    desc: "Intercept cancellations with a guided flow — capture reasons, present targeted offers, and save subscribers before they leave.",
    link: "/features/retention/",
  },
  {
    icon: Wallet,
    color: "amber",
    badge: "pro",
    title: "Store Credit System",
    desc: "Virtual wallet with 8 credit sources, auto-apply to renewals, checkout application, expiration, and purchases.",
    link: "/features/store-credit/",
  },
  {
    icon: Mail,
    color: "amber",
    badge: "mixed",
    title: "Email Notifications",
    desc: "13 customer, 3 admin, and 4 store credit emails — all triggered by lifecycle events with rich placeholders.",
    link: "/features/emails/",
  },
  {
    icon: BarChart3,
    color: "purple",
    badge: "mixed",
    title: "Advanced Analytics",
    desc: "40+ reports, 10 KPI cards (MRR, churn, ARPU), time-series charts, retention analytics, and a centralized reports hub.",
    link: "/features/analytics/",
  },
  {
    icon: ClipboardList,
    color: "purple",
    badge: "pro",
    title: "Audits & Logs",
    desc: "Activity timeline, scheduled-job logs, and a gateway health dashboard with webhook monitoring.",
    link: "/features/audits/",
  },
  {
    icon: LayoutGrid,
    color: "purple",
    badge: "pro",
    title: "Checkout Builder",
    desc: "Visual drag-and-drop checkout editor with 27 field types, multi-step layouts, conditional logic — no code required.",
    link: "/features/checkout-builder/",
  },
  {
    icon: Settings2,
    color: "coral",
    badge: "free",
    title: "Manage Subscriptions",
    desc: "Admin dashboard with list views, status tabs, inline actions, CSV/JSON export, manual creation, and a 21-event notes timeline.",
    link: "/features/manage-subscriptions/",
  },
  {
    icon: Wand2,
    color: "coral",
    badge: "free",
    title: "Easy Setup Wizard",
    desc: "9-step guided wizard with 7 business profiles that configures your subscription engine in minutes — plus JSON import/export.",
    link: "/features/easy-setup/",
  },
  {
    icon: ListChecks,
    color: "coral",
    badge: "pro",
    title: "Feature Manager",
    desc: "Per-plan entitlements — toggle features, set limits, add details per product. Show 'What's Included' on product pages.",
    link: "/features/feature-manager/",
  },
];

const BADGE_LABELS = {
  free: "Free",
  pro: "Pro",
  mixed: "Free + Pro",
};

export default function FeaturesSection() {
  return (
    <section className="hp-section hp-section--accent-tint">
      <div className="hp-section__inner hp-section__center">
        <ScrollReveal>
          <p className="hp-section__label reveal-item">Features</p>
          <h2 className="hp-section__title reveal-item">
            Everything You Need to Run a Subscription Business
          </h2>
          <p className="hp-section__subtitle reveal-item">
            15 integrated modules. Zero plugin conflicts. From free trials to
            MRR dashboards — built for WooCommerce store owners who want power
            without complexity.
          </p>
        </ScrollReveal>

        <ScrollReveal className="hp-features__grid" stagger={0.06}>
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Link
                href={f.link}
                className="hp-feature-card reveal-item"
                key={i}
              >
                <div
                  className={`hp-feature-card__icon hp-feature-card__icon--${f.color}`}
                >
                  <Icon aria-hidden="true" />
                </div>
                <span
                  className={`hp-feature-card__badge hp-feature-card__badge--${f.badge}`}
                >
                  {BADGE_LABELS[f.badge]}
                </span>
                <h3 className="hp-feature-card__title">{f.title}</h3>
                <p className="hp-feature-card__desc">{f.desc}</p>
              </Link>
            );
          })}
        </ScrollReveal>

        <ScrollReveal>
          <div
            className="hp-hero__ctas reveal-item"
            style={{ justifyContent: "center", marginTop: "var(--space-xl)" }}
          >
            <Link href="/features/" className="btn btn--primary">
              Explore All Features
            </Link>
            <Link href="/download/" className="btn btn--secondary">
              Download Free
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
