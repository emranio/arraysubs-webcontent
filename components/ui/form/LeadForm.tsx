"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "../Button";
import { Field } from "./Field";
import { Input } from "./Input";
import { Select } from "./Select";
import { Checkbox } from "./Checkbox";

/**
 * Lead-capture form (the "Get Pro Access — Free" flow). Client-side validated demo:
 * shows inline errors and an aria-live success state. No backend wired yet.
 */
export function LeadForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [emailError, setEmailError] = useState<string>();
  const emailRef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

    if (!emailOk) {
      setEmailError(
        email ? "Enter a valid email address." : "Please enter your email address.",
      );
      emailRef.current?.focus();
      return;
    }
    setEmailError(undefined);
    setStatus("success");
    form.reset();
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "flex flex-col items-center gap-3 rounded-xl bg-success/5 p-8 text-center",
          className,
        )}
      >
        <CheckCircle2 aria-hidden="true" className="size-10 text-success" />
        <h3 className="font-display text-xl">You&apos;re on the list</h3>
        <p className="text-muted">
          Check your inbox — your Pro license key is on its way — Free for 4 months.
        </p>
        <Button variant="ghost" size="sm" onClick={() => setStatus("idle")}>
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-5", className)}
    >
      <Field label="Full name">
        <Input name="name" autoComplete="name" placeholder="Jane Doe" />
      </Field>

      <Field
        label="Work email"
        required
        error={emailError}
        description="We'll send your license key here."
      >
        <Input
          ref={emailRef}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@store.com"
        />
      </Field>

      <Field label="Business type">
        <Select
          name="business"
          placeholder="Select your business type…"
          options={[
            { label: "SaaS & Digital Products", value: "saas" },
            { label: "Membership Site", value: "membership" },
            { label: "Subscription Box", value: "box" },
            { label: "Online Courses", value: "courses" },
            { label: "Content & Publishing", value: "content" },
            { label: "Service Business", value: "service" },
          ]}
        />
      </Field>

      <Checkbox
        name="consent"
        label="Email me product updates. No spam — unsubscribe anytime."
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        magnetic
        fullWidth
        iconRight={<ArrowRight className="size-5" />}
      >
        Claim My Pro License — Free
      </Button>

      <p className="text-center text-sm text-muted">
        No credit card required · 4-month Pro license
      </p>
    </form>
  );
}
