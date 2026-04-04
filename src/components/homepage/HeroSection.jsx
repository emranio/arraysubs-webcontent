"use client";

import Link from "next/link";
import { Download, Sparkles, Check, CreditCard, Layers3 } from "lucide-react";
import HeroAnimation from "@/components/HeroAnimation";
import HeroVisual from "@/components/homepage/HeroVisual";

const PROOF_POINTS = ["15 integrated modules", "40+ reports & KPIs", "4 months of Pro free"];

export default function HeroSection() {
  return (
    <section className="hp-hero">
      <div className="hp-hero__inner">
        <HeroAnimation className="hp-hero__content">
          <p className="hp-hero__eyebrow hero-anim-item">
            Trusted by WooCommerce store owners
          </p>

          <h1 className="hp-hero__title hero-anim-item">
            Stop stacking plugins. <br />
            <span className="shimmer">
              Run subscriptions, memberships, retention &amp; analytics from one loud system.
            </span>
          </h1>

          <p className="hp-hero__subtitle hero-anim-item">
            Create subscription products, protect member-only access, automate
            recurring billing, reduce churn with smart retention flows, and
            track MRR without duct-taping five separate tools together.
          </p>

          <div className="hp-hero__proof hero-anim-item">
            {PROOF_POINTS.map((point) => (
              <span key={point} className="hp-proof-pill">
                <Layers3 aria-hidden="true" />
                {point}
              </span>
            ))}
          </div>

          <div className="hp-hero__ctas hero-anim-item">
            <Link href="/download/" className="btn btn--primary btn--large">
              <Download aria-hidden="true" />
              Download Free
            </Link>
            <Link
              href="/early-access/"
              className="btn btn--secondary btn--large"
            >
              <Sparkles aria-hidden="true" />
              Get Pro Free for 4 Months
            </Link>
          </div>

          <div className="hp-trust hero-anim-item">
            <span className="hp-trust__item">
              <Check aria-hidden="true" />
              Available on WordPress.org
            </span>
            <span className="hp-trust__item">
              <Check aria-hidden="true" />
              WooCommerce 8+
            </span>
            <span className="hp-trust__item">
              <CreditCard aria-hidden="true" />
              Stripe &middot; PayPal &middot; Paddle
            </span>
            <span className="hp-trust__item">
              <Check aria-hidden="true" />
              HPOS Compatible
            </span>
          </div>
        </HeroAnimation>

        <HeroVisual />
      </div>
    </section>
  );
}
