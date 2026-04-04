import {
  CheckCircle2,
  GitMerge,
  HeartHandshake,
  Layers3,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import LottiePlayer from "@/components/LottiePlayer";
import orbitRings from "@/lottie/orbit-rings.json";
import sparkBurst from "@/lottie/spark-burst.json";

export default function WhyVisual({ variant }) {
  if (variant === "architecture") {
    return (
      <div className="hp-why-visual hp-why-visual--architecture">
        <div className="hp-why-visual__ring">
          <LottiePlayer
            animationData={orbitRings}
            mode="autoplay"
            className="hp-why-visual__lottie"
            ariaLabel="ArraySubs system map"
          />
        </div>
        <div className="hp-why-visual__hub">
          <Layers3 aria-hidden="true" />
          <strong>ArraySubs</strong>
          <span>Unified engine</span>
        </div>
        <div className="hp-why-node hp-why-node--top-left">Subscriptions</div>
        <div className="hp-why-node hp-why-node--top-right">Memberships</div>
        <div className="hp-why-node hp-why-node--bottom-left">Retention</div>
        <div className="hp-why-node hp-why-node--bottom-right">Analytics</div>
      </div>
    );
  }

  if (variant === "free") {
    return (
      <div className="hp-why-visual hp-why-visual--free">
        <div className="hp-free-stack__header">
          <div>
            <p className="hp-visual-kicker">Free forever core</p>
            <h4>Everything you need to launch</h4>
          </div>
          <span className="hp-badge hp-badge--free">Core</span>
        </div>
        <div className="hp-free-stack__list">
          {[
            "Subscription products",
            "Customer portal",
            "Retention flow",
            "Manage subscriptions",
            "Email automation",
            "Easy setup wizard",
          ].map((item) => (
            <div key={item} className="hp-check-row">
              <CheckCircle2 aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="hp-free-stack__footer">
          <div className="hp-mini-chip hp-mini-chip--primary">
            <ShieldCheck aria-hidden="true" />
            <span>No trial trap</span>
          </div>
          <div className="hp-mini-chip hp-mini-chip--amber">
            <Wallet aria-hidden="true" />
            <span>Pro expands later</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hp-why-visual hp-why-visual--retention">
      <div className="hp-retention-flow">
        <div className="hp-retention-flow__spark">
          <LottiePlayer
            animationData={sparkBurst}
            mode="hover"
            className="hp-why-visual__spark"
            ariaLabel="Retention action spark"
          />
        </div>
        <div className="hp-retention-step hp-retention-step--reason">
          <span>1</span>
          <div>
            <strong>Reason selected</strong>
            <p>"Too expensive"</p>
          </div>
        </div>
        <div className="hp-retention-arrow">
          <GitMerge aria-hidden="true" />
        </div>
        <div className="hp-retention-step hp-retention-step--offer">
          <span>2</span>
          <div>
            <strong>Offer shown</strong>
            <p>Pause, discount, downgrade</p>
          </div>
        </div>
        <div className="hp-retention-arrow">
          <HeartHandshake aria-hidden="true" />
        </div>
        <div className="hp-retention-step hp-retention-step--save">
          <span>3</span>
          <div>
            <strong>Subscriber saved</strong>
            <p>Revenue recovered automatically</p>
          </div>
        </div>
      </div>
      <div className="hp-mini-chip hp-mini-chip--purple">
        <Sparkles aria-hidden="true" />
        <span>Built-in churn defense</span>
      </div>
    </div>
  );
}
