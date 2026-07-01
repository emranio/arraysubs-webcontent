"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "../Button";
import { Field } from "./Field";
import { Input } from "./Input";
import { Select } from "./Select";
import { Checkbox } from "./Checkbox";
import { CountrySelect } from "./CountrySelect";

type LeadFormErrors = {
  name?: string;
  email?: string;
  country?: string;
  form?: string;
};

/**
 * Lead-capture form (the "Get Pro Access — Free" flow). Client-side validated demo:
 * shows inline errors and an aria-live success state. No backend wired yet.
 */
export function LeadForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const country = String(data.get("country") ?? "").trim();
    const business = String(data.get("business") ?? "").trim();
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

    const next: LeadFormErrors = {};
    if (!name) next.name = "Please enter your full name.";
    if (!emailOk) {
      next.email = email
        ? "Enter a valid email address."
        : "Please enter your email address.";
    }
    if (!country) next.country = "Please choose your country.";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      if (next.name) nameRef.current?.focus();
      else if (next.email) emailRef.current?.focus();
      else if (next.country) countryRef.current?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "pro-license",
          name,
          email,
          country,
          business,
          consent: data.get("consent") === "on",
          companyWebsite: data.get("companyWebsite"),
          sourcePath: window.location.pathname,
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        setErrors({
          form:
            result.error ??
            "We could not send your request. Please email us directly.",
        });
        setStatus("idle");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrors({
        form: "We could not send your request. Please email us directly.",
      });
      setStatus("idle");
    }
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
        <h3 className="font-display text-xl">Request received</h3>
        <p className="text-muted">
          We received your ArraySubs Pro request and will email the license
          details after review.
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
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="lead-company-website">Company website</label>
        <input
          id="lead-company-website"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field label="Full name" required error={errors.name}>
        <Input
          ref={nameRef}
          name="name"
          autoComplete="name"
          placeholder="Jane Doe"
        />
      </Field>

      <Field
        label="Work email"
        required
        error={errors.email}
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

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Business type">
          <Select
            name="business"
            placeholder="Business type"
            options={[
              { label: "SaaS & Digital Products", value: "saas" },
              { label: "Membership Site", value: "membership" },
              { label: "Subscription Box", value: "box" },
              { label: "Online Courses", value: "courses" },
              { label: "Content & Publishing", value: "content" },
              { label: "Service Business", value: "service" },
              { label: "Non-Profit Organization", value: "nonprofit" },
              { label: "Other", value: "other" },
            ]}
          />
        </Field>

        <Field label="Country" required error={errors.country}>
          <CountrySelect
            ref={countryRef}
            name="country"
            placeholder="Search country..."
          />
        </Field>
      </div>

      <Checkbox
        name="consent"
        defaultChecked
        label="Email me product & security updates. No spam — unsubscribe anytime."
      />

      {errors.form && (
        <p role="alert" className="text-sm font-semibold text-danger">
          {errors.form}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        magnetic
        fullWidth
        disabled={status === "submitting"}
        iconRight={<ArrowRight className="size-5" />}
      >
        {status === "submitting" ? "Sending request..." : "Claim My Pro License — Free"}
      </Button>

      <p className="text-center text-sm text-muted">
        No credit card required · 4-month Pro license. We use this form data to
        process your request. Read the{" "}
        <Link
          href="/trust-center/privacy-policy/"
          className="font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:decoration-dark"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
