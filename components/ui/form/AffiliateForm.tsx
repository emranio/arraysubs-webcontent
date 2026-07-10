"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { Button } from "../Button";
import { Field } from "./Field";
import { Input } from "./Input";
import { Textarea } from "./Textarea";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Errors = {
  name?: string;
  email?: string;
  website?: string;
  promotion?: string;
  form?: string;
};

/**
 * Affiliate program application form. Client-side validated with inline field
 * errors and an aria-live success state. On submit it posts `kind: "affiliate"`
 * to `/api/forms`, which fires the three affiliate emails (applicant
 * acknowledgement, a personal note from Emran, and the internal notification).
 */
export function AffiliateForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [errors, setErrors] = useState<Errors>({});
  const [sentTo, setSentTo] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const promotionRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const website = String(data.get("website") ?? "").trim();
    const promotion = String(data.get("promotion") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!email) next.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address.";
    if (!website) next.website = "Share where you'll promote ArraySubs.";
    if (!promotion) next.promotion = "Tell us a little about your audience.";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      if (next.name) nameRef.current?.focus();
      else if (next.email) emailRef.current?.focus();
      else if (next.website) websiteRef.current?.focus();
      else if (next.promotion) promotionRef.current?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "affiliate",
          name,
          email,
          website,
          promotion,
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
            "We could not submit your application. Please email us directly.",
        });
        setStatus("idle");
        return;
      }

      setSentTo(email);
      setStatus("success");
      form.reset();
    } catch {
      setErrors({
        form: "We could not submit your application. Please email us directly.",
      });
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "flex flex-col items-center gap-3 rounded-2xl bg-success/5 p-8 text-center",
          className,
        )}
      >
        <CheckCircle2 aria-hidden="true" className="size-10 text-success" />
        <h3 className="font-display text-xl">Application received</h3>
        <p className="text-muted">
          Thanks for applying to the ArrayHash affiliate program. We&apos;ve sent
          a confirmation to{" "}
          <span className="font-medium text-foreground">{sentTo}</span>{" "}
          and we&apos;ll review your application and reply personally.
        </p>
        <Button
          variant="ghost"
          size="sm"
          iconLeft={<ArrowLeft className="size-4" />}
          onClick={() => {
            setStatus("idle");
            setErrors({});
          }}
        >
          Submit another application
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
      {/* Honeypot — hidden from users, catches naive bots. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="affiliate-company-website">Company website</label>
        <input
          id="affiliate-company-website"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field label="Your name" required error={errors.name}>
        <Input
          ref={nameRef}
          name="name"
          autoComplete="name"
          placeholder="Jane Doe"
        />
      </Field>

      <Field
        label="Email"
        required
        error={errors.email}
        description="We'll send your approval and payout details here."
      >
        <Input
          ref={emailRef}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@store.com"
        />
      </Field>

      <Field
        label="Website, blog, or social profile"
        required
        error={errors.website}
        description="The main place you'll share ArraySubs with your audience."
      >
        <Input
          ref={websiteRef}
          name="website"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="https://yoursite.com  ·  youtube.com/@you"
        />
      </Field>

      <Field
        label="How will you promote ArraySubs?"
        required
        error={errors.promotion}
        description="A sentence or two on your audience — WooCommerce store owners, agencies, a newsletter, a course…"
      >
        <Textarea
          ref={promotionRef}
          name="promotion"
          rows={5}
          placeholder="I run a WooCommerce tutorials channel with ~20k subscribers and review plugins for store owners…"
        />
      </Field>

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
        iconRight={<Send className="size-5" />}
      >
        {status === "submitting" ? "Submitting application..." : "Apply to the program"}
      </Button>

      <p className="text-center text-sm text-muted">
        We use these details to review and manage your application. Read the{" "}
        <Link
          href="/trust-center/privacy-policy/"
          className="font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:decoration-dark"
        >
          Privacy Policy
        </Link>
        . Questions first? Email{" "}
        <a
          href={`mailto:${site.email}`}
          className="font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:decoration-dark"
        >
          {site.email}
        </a>
      </p>
    </form>
  );
}
