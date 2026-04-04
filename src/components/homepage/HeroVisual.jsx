"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  BarChart3,
  HeartHandshake,
  Layers3,
  Repeat,
  Wallet,
} from "lucide-react";
import LottiePlayer from "@/components/LottiePlayer";
import orbitRings from "@/lottie/orbit-rings.json";

gsap.registerPlugin(useGSAP);

const METRICS = [
  { label: "Active MRR", value: "+18.4%" },
  { label: "Recovered churn", value: "312" },
  { label: "Failed payments", value: "2.1%" },
];

export default function HeroVisual() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-visual-card", {
          x: 28,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.15,
        });

        gsap.to(".hero-visual-float", {
          y: -16,
          duration: 2.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.18,
            from: "random",
          },
        });

        gsap.to(".hero-visual-glow", {
          scale: 1.08,
          duration: 3.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="hp-hero-visual">
      <div className="hp-hero-visual__glow hero-visual-glow" />
      <div className="hp-hero-visual__orb hero-visual-card hero-visual-float">
        <LottiePlayer
          animationData={orbitRings}
          mode="autoplay"
          className="hp-hero-visual__lottie"
          ariaLabel="Orbiting product animation"
        />
      </div>

      <div className="hp-hero-visual__dashboard hero-visual-card">
        <div className="hp-hero-visual__dashboard-head">
          <div>
            <p className="hp-hero-visual__kicker">ArraySubs command center</p>
            <h3>One data layer. Every revenue system.</h3>
          </div>
          <span className="hp-badge hp-badge--live">Live</span>
        </div>

        <div className="hp-hero-visual__metric-row">
          {METRICS.map((metric) => (
            <div key={metric.label} className="hp-hero-visual__metric">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </div>

        <div className="hp-hero-visual__bars" aria-hidden="true">
          <span className="hp-hero-visual__bar hp-hero-visual__bar--1" />
          <span className="hp-hero-visual__bar hp-hero-visual__bar--2" />
          <span className="hp-hero-visual__bar hp-hero-visual__bar--3" />
          <span className="hp-hero-visual__bar hp-hero-visual__bar--4" />
          <span className="hp-hero-visual__bar hp-hero-visual__bar--5" />
        </div>

        <div className="hp-hero-visual__signal-grid">
          <div className="hp-signal-card">
            <BarChart3 aria-hidden="true" />
            <span>Analytics</span>
          </div>
          <div className="hp-signal-card">
            <Repeat aria-hidden="true" />
            <span>Renewals</span>
          </div>
          <div className="hp-signal-card">
            <HeartHandshake aria-hidden="true" />
            <span>Retention</span>
          </div>
          <div className="hp-signal-card">
            <Wallet aria-hidden="true" />
            <span>Store credit</span>
          </div>
        </div>
      </div>

      <div className="hp-hero-visual__mini hp-hero-visual__mini--top hero-visual-card hero-visual-float">
        <div className="hp-mini-chip hp-mini-chip--primary">
          <HeartHandshake aria-hidden="true" />
          <span>Retention flow active</span>
        </div>
        <strong>Offer discount on cancellation</strong>
        <p>
          Discount, pause, downgrade, or support routing — all inside one flow.
        </p>
      </div>

      <div className="hp-hero-visual__mini hp-hero-visual__mini--bottom hero-visual-card hero-visual-float">
        <div className="hp-mini-chip hp-mini-chip--purple">
          <Layers3 aria-hidden="true" />
          <span>Modules synced</span>
        </div>
        <ul>
          <li>Subscriptions + billing</li>
          <li>Membership access control</li>
          <li>MRR and churn analytics</li>
        </ul>
      </div>
    </div>
  );
}
