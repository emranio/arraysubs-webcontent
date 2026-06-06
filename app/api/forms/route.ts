import { site } from "@/lib/site";

export const runtime = "nodejs";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "emran@arrayhash.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "ArrayHash Website <onboarding@resend.dev>";

type FormKind = "contact" | "pro-license";

type FormPayload = {
  kind?: unknown;
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  body?: unknown;
  country?: unknown;
  business?: unknown;
  consent?: unknown;
  sourcePath?: unknown;
  companyWebsite?: unknown;
};

type NormalizedSubmission = {
  kind: FormKind;
  name: string;
  email: string;
  sourcePath: string;
  subject?: string;
  body?: string;
  country?: string;
  business?: string;
  consent?: boolean;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function readString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function readBoolean(value: unknown) {
  return value === true || value === "true" || value === "on";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizePayload(payload: FormPayload):
  | { ok: true; data: NormalizedSubmission }
  | { ok: false; error: string } {
  const kind = payload.kind === "contact" ? "contact" : payload.kind === "pro-license" ? "pro-license" : null;
  const name = readString(payload.name, 160);
  const email = readString(payload.email, 200).toLowerCase();
  const sourcePath = readString(payload.sourcePath, 300) || "/";

  if (!kind) return { ok: false, error: "Unknown form type." };
  if (!name) return { ok: false, error: "Name is required." };
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "A valid email address is required." };
  }

  if (kind === "contact") {
    const subject = readString(payload.subject, 180);
    const body = readString(payload.body, 4000);

    if (!subject) return { ok: false, error: "Subject is required." };
    if (!body) return { ok: false, error: "Message is required." };

    return {
      ok: true,
      data: { kind, name, email, subject, body, sourcePath },
    };
  }

  const country = readString(payload.country, 160);
  if (!country) return { ok: false, error: "Country is required." };

  return {
    ok: true,
    data: {
      kind,
      name,
      email,
      country,
      sourcePath,
      business: readString(payload.business, 160),
      consent: readBoolean(payload.consent),
    },
  };
}

function rows(data: NormalizedSubmission) {
  const baseRows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Source", data.sourcePath],
    ["Submitted", new Date().toISOString()],
  ];

  if (data.kind === "contact") {
    return [
      ...baseRows,
      ["Subject", data.subject ?? ""],
      ["Message", data.body ?? ""],
    ];
  }

  return [
    ...baseRows,
    ["Country", data.country ?? ""],
    ["Business type", data.business || "Not provided"],
    ["Product updates consent", data.consent ? "Yes" : "No"],
  ];
}

function toText(data: NormalizedSubmission) {
  return rows(data)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

function toHtml(data: NormalizedSubmission) {
  const title =
    data.kind === "contact"
      ? "New ArrayHash contact form submission"
      : "New ArraySubs Pro license request";

  const renderedRows = rows(data)
    .map(
      ([label, value]) => `
        <tr>
          <th style="padding:12px;text-align:left;vertical-align:top;border-bottom:1px solid #DED2F4;color:#12002B;width:180px;">${escapeHtml(label)}</th>
          <td style="padding:12px;vertical-align:top;border-bottom:1px solid #DED2F4;color:#3F2A5C;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#12002B;">
      <h1 style="font-size:24px;line-height:1.2;margin:0 0 16px;">${escapeHtml(title)}</h1>
      <p style="margin:0 0 20px;color:#3F2A5C;">This message was submitted through ${escapeHtml(site.name)}.</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #DED2F4;border-radius:12px;overflow:hidden;">
        <tbody>${renderedRows}</tbody>
      </table>
    </div>
  `;
}

function emailSubject(data: NormalizedSubmission) {
  if (data.kind === "contact") {
    return `[ArrayHash Contact] ${data.subject}`;
  }

  return `[ArraySubs Pro request] ${data.name}`;
}

export async function POST(request: Request) {
  let payload: FormPayload;

  try {
    payload = (await request.json()) as FormPayload;
  } catch {
    return Response.json(
      { ok: false, error: "Invalid form payload." },
      { status: 400 },
    );
  }

  if (readString(payload.companyWebsite, 300)) {
    return Response.json({ ok: true });
  }

  const normalized = normalizePayload(payload);
  if (!normalized.ok) {
    return Response.json(
      { ok: false, error: normalized.error },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { ok: false, error: "Email delivery is not configured." },
      { status: 503 },
    );
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: normalized.data.email,
      subject: emailSubject(normalized.data),
      html: toHtml(normalized.data),
      text: toText(normalized.data),
      tags: [
        { name: "source", value: "website" },
        { name: "form", value: normalized.data.kind.replace("-", "_") },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Resend form email failed", {
      status: response.status,
      error: errorText,
    });

    return Response.json(
      { ok: false, error: "Could not send the email right now." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
