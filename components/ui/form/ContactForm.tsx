"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "../Button";
import { Field } from "./Field";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Select } from "./Select";
import { Checkbox } from "./Checkbox";

const TOPICS = [
  { label: "General question", value: "general" },
  { label: "Sales & pricing", value: "sales" },
  { label: "Technical support", value: "support" },
  { label: "Partnership or press", value: "partnership" },
  { label: "Product feedback", value: "feedback" },
];

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Errors = { name?: string; email?: string; message?: string };

/**
 * Contact form. Client-side validated demo matching the LeadForm pattern: inline
 * field errors, first-invalid focus and an aria-live success state. No backend
 * wired yet — submission resolves to the confirmation panel.
 */
export function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [sentTo, setSentTo] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!email) next.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address.";
    if (!message) next.message = "Please enter a message.";
    else if (message.length < 10)
      next.message = "Tell us a little more (at least 10 characters).";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      if (next.name) nameRef.current?.focus();
      else if (next.email) emailRef.current?.focus();
      else messageRef.current?.focus();
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
        <h3 className="font-display text-xl">Message sent</h3>
        <p className="text-muted">
          Thanks for reaching out — we&apos;ll reply to{" "}
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
          Send another message
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
        description="We'll only use this to reply."
      >
        <Input
          ref={emailRef}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@store.com"
        />
      </Field>

      <Field label="Topic">
        <Select name="topic" placeholder="What's this about?" options={TOPICS} />
      </Field>

      <Field label="Message" required error={errors.message}>
        <Textarea
          ref={messageRef}
          name="message"
          rows={5}
          placeholder="How can we help?"
        />
      </Field>

      <Checkbox
        name="consent"
        label="Send me occasional product updates. No spam — unsubscribe anytime."
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        magnetic
        fullWidth
        iconRight={<Send className="size-5" />}
      >
        Send message
      </Button>

      <p className="text-center text-sm text-muted">
        Prefer email? Write to{" "}
        <a
          href="mailto:emran@arrayhash.com"
          className="font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:decoration-dark"
        >
          emran@arrayhash.com
        </a>
      </p>
    </form>
  );
}
