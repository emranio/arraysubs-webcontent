"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { Button } from "../Button";
import { Field } from "./Field";
import { Input } from "./Input";
import { Textarea } from "./Textarea";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Errors = { name?: string; email?: string; subject?: string; body?: string };

/**
 * Contact form. Client-side validated form matching the LeadForm pattern with
 * inline field errors and an aria-live success state.
 */
export function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [sentTo, setSentTo] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const body = String(data.get("body") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!email) next.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address.";
    if (!subject) next.subject = "Please enter a subject.";
    if (!body) next.body = "Please enter your message.";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      if (next.name) nameRef.current?.focus();
      else if (next.email) emailRef.current?.focus();
      else if (next.subject) subjectRef.current?.focus();
      else if (next.body) bodyRef.current?.focus();
      return;
    }

    setSentTo(email);
    setStatus("success");
    form.reset();
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
        <h3 className="font-display text-xl">Details received</h3>
        <p className="text-muted">
          Thanks for reaching out. We&apos;ll reply to{" "}
          <span className="font-medium text-foreground">{sentTo}</span> within one
          business day.
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
          Send another request
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
        description="We'll only use this to reply or manage your request."
      >
        <Input
          ref={emailRef}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@store.com"
        />
      </Field>

      <Field label="Subject" required error={errors.subject}>
        <Input
          ref={subjectRef}
          name="subject"
          autoComplete="off"
          placeholder="Billing, setup, partnership..."
        />
      </Field>

      <Field
        label="Email body"
        required
        error={errors.body}
        description="Share the details we should read before replying."
      >
        <Textarea
          ref={bodyRef}
          name="body"
          rows={5}
          placeholder="Tell us what you need help with..."
        />
      </Field>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        magnetic
        fullWidth
        iconRight={<Send className="size-5" />}
      >
        Send request
      </Button>

      <p className="text-center text-sm text-muted">
        Prefer email? Write to{" "}
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
