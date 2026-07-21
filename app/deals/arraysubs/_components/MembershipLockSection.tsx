import {
  ArrowRight,
  BadgePercent,
  CalendarClock,
  Download,
  FileLock2,
  KeyRound,
  Lock,
  LockOpen,
} from "lucide-react";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { Badge, Button, Container, Eyebrow, Section } from "@/components/ui";

const LOCK_CONTROLS = [
  { icon: FileLock2, label: "Content", desc: "Any page, CPT, or block" },
  { icon: Download, label: "Downloads", desc: "Gated My Account files" },
  { icon: CalendarClock, label: "Drip", desc: "Released on a schedule" },
  { icon: BadgePercent, label: "Discounts", desc: "Subscriber-only pricing" },
];

/**
 * Membership / content-restriction showcase — a two-state diptych of the SAME
 * content: a dark, sealed "Visitor view" versus a bright, opened "Member view",
 * bridged by a subscription key. No blur — the locked state is a bordered
 * "Members only" gated message on muted tokens (JSX mockup, no screenshots).
 */
export function MembershipLockSection() {
  return (
    <Section surface="dark" spacing="lg">
      <Container>
        {/* ---- Header (manual, so dark-surface tokens stay legible) -------- */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Eyebrow className="text-on-dark-muted">Membership &amp; access</Eyebrow>
          <h2 className="font-display text-4xl text-balance text-on-dark sm:text-display-sm">
            One subscription flips the lock
          </h2>
          <p className="max-w-xl text-lg text-on-dark-muted text-pretty sm:text-xl">
            Every ArraySubs plan doubles as a membership. The same page,
            download, or Elementor block stays sealed to visitors — and opens
            the instant a subscription qualifies.
          </p>
        </div>

        {/* ---- The diptych: gated <-> unlocked, one tight seam ------------- */}
        <ScrollReveal y={1.5} className="mt-14">
          <div className="grid items-stretch gap-[0.1875rem] md:grid-cols-[1fr_auto_1fr]">
            {/* GATED — dark, sealed panel (NO blur) */}
            <article
              aria-label="Visitor view — this content is locked to members only"
              className="flex flex-col rounded-2xl border border-on-dark-border bg-dark-2 p-6 text-on-dark sm:p-8"
            >
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-on-dark-muted uppercase">
                <Lock aria-hidden="true" className="size-4" />
                Visitor view
              </div>

              <span className="mt-6 inline-flex w-fit items-center rounded-pill border border-on-dark-border px-3 py-1 text-xs font-semibold tracking-wider text-on-dark-muted uppercase">
                Course
              </span>
              <h3 className="mt-4 font-display text-xl leading-tight text-on-dark">
                Scaling Playbook — Chapter 7
              </h3>

              {/* gated message — grouped with a border, never a nested card */}
              <div className="mt-6 flex flex-1 flex-col items-start gap-3 rounded-xl border border-on-dark-border p-5">
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-on-dark-border text-on-dark"
                >
                  <Lock className="size-5" />
                </span>
                <p className="font-display text-base font-semibold text-on-dark">
                  Members only
                </p>
                <p className="text-sm text-on-dark-muted text-pretty">
                  Subscribe to a qualifying plan to open this lesson, its
                  downloads, and the rest of the series.
                </p>
                <span className="mt-1 inline-flex items-center gap-1.5 rounded-pill bg-dark px-3 py-1 text-xs font-semibold text-on-dark-muted">
                  <Lock aria-hidden="true" className="size-3.5" />
                  Locked
                </span>
              </div>
            </article>

            {/* CONNECTOR — the subscription key that flips the state */}
            <div
              aria-hidden="true"
              className="flex flex-col items-center justify-center gap-2 py-2 md:py-0"
            >
              <span className="float-anim inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-on-dark">
                <KeyRound className="size-6" />
              </span>
              <span className="text-xs font-semibold tracking-[0.14em] text-on-dark-muted uppercase">
                Subscribe
              </span>
              <ArrowRight className="size-5 rotate-90 text-primary md:rotate-0" />
            </div>

            {/* UNLOCKED — bright white card, real content revealed */}
            <article
              aria-label="Member view — the same content, unlocked for subscribers"
              className="flex flex-col rounded-2xl bg-card p-6 text-foreground sm:p-8"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-faint uppercase">
                  <LockOpen aria-hidden="true" className="size-4 text-secondary" />
                  Member view
                </div>
                <Badge tone="secondary">Member</Badge>
              </div>

              <span className="mt-6 inline-flex w-fit items-center rounded-pill border border-border px-3 py-1 text-xs font-semibold tracking-wider text-muted uppercase">
                Course
              </span>
              <h3 className="mt-4 font-display text-xl leading-tight text-foreground">
                Scaling Playbook — Chapter 7
              </h3>
              <p className="mt-3 text-sm text-muted text-pretty">
                Pricing ladders, trial-to-paid triggers, and the renewal cadence
                that keeps plans alive — plus the workbook to run it yourself.
              </p>

              {/* unlocked download — grouped with a divider */}
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface text-primary"
                >
                  <Download className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    scaling-playbook-ch7.pdf
                  </p>
                  <p className="text-xs text-faint">Unlocked download · 1.2 MB</p>
                </div>
              </div>

              <div className="mt-4">
                <span className="inline-flex items-center gap-1.5 rounded-pill bg-secondary px-3 py-1 text-xs font-semibold text-on-dark">
                  <BadgePercent aria-hidden="true" className="size-3.5" />
                  Members save 20% on the workbook
                </span>
              </div>
            </article>
          </div>
        </ScrollReveal>

        {/* ---- What the lock controls — a legend, not a card grid ---------- */}
        <ScrollReveal y={1} delay={0.1}>
          <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-x-10 gap-y-6">
            {LOCK_CONTROLS.map(({ icon: Icon, label, desc }) => (
              <li key={label} className="flex items-start gap-2.5 text-left">
                <Icon
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-primary"
                />
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-on-dark">
                    {label}
                  </span>
                  <span className="text-xs text-on-dark-muted">{desc}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center">
            <Button
              href="/deals/arraysubs/features/woocommerce-membership/"
              variant="highlight"
              size="md"
              magnetic
              iconRight={<ArrowRight aria-hidden="true" className="size-4" />}
            >
              See all membership features
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
