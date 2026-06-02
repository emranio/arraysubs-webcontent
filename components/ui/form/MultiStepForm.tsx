"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "../Button";
import { Field } from "./Field";
import { Input } from "./Input";
import { Select } from "./Select";
import { Multiselect } from "./Multiselect";
import { RadioGroup } from "./RadioGroup";
import { Switch } from "./Switch";
import { Checkbox } from "./Checkbox";

const STEPS = ["Details", "Business", "Preferences"] as const;

const BUSINESS_OPTIONS = [
  { label: "SaaS & Digital Products", value: "saas" },
  { label: "Membership Site", value: "membership" },
  { label: "Subscription Box", value: "box" },
  { label: "Online Courses", value: "courses" },
];
const TEAM_OPTIONS = [
  { label: "Just me", value: "1" },
  { label: "2–10", value: "2-10" },
  { label: "11–50", value: "11-50" },
  { label: "50+", value: "50+" },
];
const INTEREST_OPTIONS = [
  { label: "Subscriptions", value: "subscriptions" },
  { label: "Memberships", value: "memberships" },
  { label: "Store credit", value: "store-credit" },
  { label: "Analytics", value: "analytics" },
  { label: "Retention flow", value: "retention" },
];

const emailOk = (email: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

/**
 * Multi-step form demo with an accessible stepper: progress is announced,
 * focus moves to each step's heading, steps validate before advancing, and
 * the final step confirms with an aria-live success message.
 */
export function MultiStepForm({ className }: { className?: string }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    business: "",
    team: "",
    interests: [] as string[],
    newsletter: true,
    terms: false,
  });
  const [errors, setErrors] = useState<{ email?: string; terms?: string }>({});

  const headingRef = useRef<HTMLHeadingElement>(null);
  const pendingHeadingFocus = useRef(false);

  // Move focus after user-triggered step changes only. React Strict Mode can
  // run mount effects twice in development, so a plain "skip first render" ref
  // would still focus this deep form demo on initial page navigation.
  useEffect(() => {
    if (!pendingHeadingFocus.current) {
      return;
    }
    pendingHeadingFocus.current = false;
    headingRef.current?.focus();
  }, [step, done]);

  const set = (patch: Partial<typeof data>) =>
    setData((d) => ({ ...d, ...patch }));

  const next = () => {
    if (step === 0 && !emailOk(data.email)) {
      setErrors({ email: data.email ? "Enter a valid email." : "Email is required." });
      return;
    }
    setErrors({});
    pendingHeadingFocus.current = true;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => {
    setErrors({});
    pendingHeadingFocus.current = true;
    setStep((s) => Math.max(s - 1, 0));
  };
  const submit = () => {
    if (!data.terms) {
      setErrors({ terms: "Please accept the terms to continue." });
      return;
    }
    setErrors({});
    setDone(true);
  };

  if (done) {
    return (
      <div
        role="status"
        className={cn(
          "flex flex-col items-center gap-3 rounded-2xl bg-success/5 p-8 text-center",
          className,
        )}
      >
        <CheckCircle2 aria-hidden="true" className="size-10 text-success" />
        <h3 className="font-display text-xl">All set, {data.name || "there"}!</h3>
        <p className="text-muted">
          Your preferences are saved and your Pro license is on its way — Free for
          4 months.
        </p>
      </div>
    );
  }

  const isLast = step === STEPS.length - 1;

  return (
    <div
      className={cn(
        "rounded-2xl bg-card p-6 text-foreground sm:p-8",
        className,
      )}
    >
      {/* Stepper */}
      <ol className="mb-8 flex items-center">
        {STEPS.map((title, i) => {
          const complete = i < step;
          const current = i === step;
          return (
            <li
              key={title}
              className={cn("flex items-center", i < STEPS.length - 1 && "flex-1")}
            >
              <span className="flex items-center gap-2">
                <span
                  aria-current={current ? "step" : undefined}
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border-2 text-sm font-semibold transition-colors",
                    complete && "border-dark bg-dark text-on-dark",
                    current && "border-dark text-dark",
                    !complete && !current && "border-border-strong text-faint",
                  )}
                >
                  {complete ? (
                    <Check aria-hidden="true" strokeWidth={3} className="size-4" />
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={cn(
                    "hidden text-sm font-medium sm:inline",
                    current ? "text-foreground" : "text-muted",
                  )}
                >
                  {title}
                </span>
              </span>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "mx-3 h-0.5 flex-1 rounded-full transition-colors",
                    complete ? "bg-dark" : "bg-border",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>

      <p aria-live="polite" className="sr-only">
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </p>

      <div className="flex flex-col gap-5">
        <h3
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-xl outline-none"
        >
          {step === 0 && "Tell us about you"}
          {step === 1 && "Your business"}
          {step === 2 && "Your preferences"}
        </h3>

        {step === 0 && (
          <>
            <Field label="Full name">
              <Input
                value={data.name}
                onChange={(e) => set({ name: e.target.value })}
                autoComplete="name"
                placeholder="Jane Doe"
              />
            </Field>
            <Field label="Work email" required error={errors.email}>
              <Input
                type="email"
                value={data.email}
                onChange={(e) => set({ email: e.target.value })}
                autoComplete="email"
                placeholder="jane@store.com"
              />
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <RadioGroup
              legend="What are you building?"
              name="business"
              options={BUSINESS_OPTIONS}
              value={data.business}
              onChange={(v) => set({ business: v })}
            />
            <Field label="Team size">
              <Select
                options={TEAM_OPTIONS}
                value={data.team}
                onChange={(v) => set({ team: v })}
                placeholder="Select team size…"
              />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <Field label="Which features interest you?">
              <Multiselect
                options={INTEREST_OPTIONS}
                value={data.interests}
                onChange={(v) => set({ interests: v })}
                placeholder="Pick a few…"
              />
            </Field>
            <Switch
              label="Send me product updates"
              description="Occasional emails about new features. Unsubscribe anytime."
              checked={data.newsletter}
              onChange={(v) => set({ newsletter: v })}
            />
            <div className="flex flex-col gap-1">
              <Checkbox
                label="I agree to the terms and privacy policy."
                checked={data.terms}
                onChange={(e) => set({ terms: e.target.checked })}
              />
              {errors.terms && (
                <p role="alert" className="text-sm font-medium text-danger">
                  {errors.terms}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={back}
          disabled={step === 0}
          iconLeft={<ArrowLeft className="size-5" />}
        >
          Back
        </Button>
        {isLast ? (
          <Button variant="primary" magnetic onClick={submit}>
            Submit
          </Button>
        ) : (
          <Button
            variant="primary"
            magnetic
            onClick={next}
            iconRight={<ArrowRight className="size-5" />}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
