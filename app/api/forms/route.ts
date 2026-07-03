import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "emran@arrayhash.com";
const FROM_EMAIL = process.env.GMAIL_SENDER_EMAIL ?? "emran@arrayhash.com";
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "ArrayHash Website <onboarding@resend.dev>";
const GWS_CLI_PATH = process.env.GWS_CLI_PATH ?? "gws";
const GMAIL_SUPPORT_LABEL_NAME = process.env.GMAIL_SUPPORT_LABEL_NAME ?? "ArrayHash Supports";

const execFileAsync = promisify(execFile);

type FormKind = "contact" | "pro-trial";

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

type GmailEmailPayload = {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
};

type GmailMessageResponse = {
  id?: string;
};

type GmailLabel = {
  id?: string;
  name?: string;
};

type GmailLabelsResponse = {
  labels?: GmailLabel[];
};

let gmailSupportLabelIdPromise: Promise<string> | null = null;

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

function stripHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function encodeHeaderValue(value: string) {
  const stripped = stripHeaderValue(value);

  if (/^[\x20-\x7e]*$/.test(stripped)) {
    return stripped;
  }

  return `=?UTF-8?B?${Buffer.from(stripped).toString("base64")}?=`;
}

function formatMailbox(email: string, name?: string) {
  const safeEmail = stripHeaderValue(email);
  const safeName = name ? encodeHeaderValue(name) : "";

  return safeName ? `${safeName} <${safeEmail}>` : safeEmail;
}

function base64Mime(value: Buffer | string) {
  const base64 = Buffer.isBuffer(value)
    ? value.toString("base64")
    : Buffer.from(value, "utf8").toString("base64");

  return base64.replace(/.{1,76}/g, "$&\r\n").trimEnd();
}

function buildAlternativePart(text: string, html: string, boundary: string) {
  return [
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    base64Mime(text),
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    base64Mime(html),
    `--${boundary}--`,
  ].join("\r\n");
}

function buildMimeEmail(payload: GmailEmailPayload) {
  const alternativeBoundary = `arraysubs-alt-${crypto.randomUUID()}`;
  const headers = [
    `From: ${formatMailbox(FROM_EMAIL, "Emran")}`,
    `To: ${formatMailbox(payload.to)}`,
    payload.replyTo ? `Reply-To: ${formatMailbox(payload.replyTo)}` : "",
    `Subject: ${encodeHeaderValue(payload.subject)}`,
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
  ].filter(Boolean);
  const alternativePart = buildAlternativePart(
    payload.text,
    payload.html,
    alternativeBoundary,
  );

  return [
    ...headers,
    `Content-Type: multipart/alternative; boundary="${alternativeBoundary}"`,
    "",
    alternativePart,
  ].join("\r\n");
}

async function sendGmailEmail(payload: GmailEmailPayload) {
  const raw = Buffer.from(buildMimeEmail(payload), "utf8").toString("base64url");
  const { stdout } = await execFileAsync(
    GWS_CLI_PATH,
    [
      "gmail",
      "users",
      "messages",
      "send",
      "--params",
      JSON.stringify({ userId: FROM_EMAIL }),
      "--json",
      JSON.stringify({ raw }),
      "--format",
      "json",
    ],
    {
      cwd: process.cwd(),
      maxBuffer: 1024 * 1024,
    },
  );
  const response = JSON.parse(String(stdout || "{}")) as GmailMessageResponse;

  if (response.id) {
    await markGmailMessageUnread(response.id);
  }
}

async function markGmailMessageUnread(messageId: string) {
  const supportLabelId = await getGmailSupportLabelId();

  await execFileAsync(
    GWS_CLI_PATH,
    [
      "gmail",
      "users",
      "messages",
      "modify",
      "--params",
      JSON.stringify({
        userId: FROM_EMAIL,
        id: messageId,
      }),
      "--json",
      JSON.stringify({
        addLabelIds: ["UNREAD", "INBOX", "IMPORTANT", "STARRED", supportLabelId],
      }),
      "--format",
      "json",
    ],
    {
      cwd: process.cwd(),
      maxBuffer: 1024 * 1024,
    },
  );
}

function getConfiguredGmailSupportLabelId() {
  return process.env.GMAIL_SUPPORT_LABEL_ID?.trim() ?? "";
}

async function getGmailSupportLabelId() {
  const configuredLabelId = getConfiguredGmailSupportLabelId();

  if (configuredLabelId) {
    return configuredLabelId;
  }

  if (!gmailSupportLabelIdPromise) {
    gmailSupportLabelIdPromise = resolveGmailSupportLabelId();
  }

  return gmailSupportLabelIdPromise;
}

async function resolveGmailSupportLabelId() {
  const { stdout } = await execFileAsync(
    GWS_CLI_PATH,
    [
      "gmail",
      "users",
      "labels",
      "list",
      "--params",
      JSON.stringify({ userId: FROM_EMAIL }),
      "--format",
      "json",
    ],
    {
      cwd: process.cwd(),
      maxBuffer: 1024 * 1024,
    },
  );
  const response = JSON.parse(String(stdout || "{}")) as GmailLabelsResponse;
  const label = response.labels?.find(
    (item) => item.name === GMAIL_SUPPORT_LABEL_NAME,
  );

  if (!label?.id) {
    throw new Error(`Gmail label "${GMAIL_SUPPORT_LABEL_NAME}" was not found.`);
  }

  return label.id;
}

function normalizePayload(payload: FormPayload):
  | { ok: true; data: NormalizedSubmission }
  | { ok: false; error: string } {
  const kind = payload.kind === "contact" ? "contact" : payload.kind === "pro-trial" ? "pro-trial" : null;
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

function submittedAtUtc() {
  return new Date().toISOString();
}

function pageSlugFromSource(sourcePath: string) {
  const pathOnly = sourcePath.split("?")[0]?.trim() || "/";
  const slug = pathOnly.replace(/^\/+|\/+$/g, "");

  return slug || "home";
}

function signatureText() {
  return [
    "Warm Regards",
    "Emran",
    "Cell & WhatsApp: +8801625000066",
    "LinkedIn: https://www.linkedin.com/in/emranio/",
  ].join("\n");
}

function signatureHtml() {
  return `
    <div style="margin:24px 0 0;color:#000000;font-size:16px;line-height:1.5;font-weight:400;">
      <div style="color:#000000;font-size:16px;line-height:1.25;font-weight:700;margin:0 0 6px;">##</div>
      <div style="color:#000000;font-size:16px;line-height:1.35;font-weight:700;margin:0 0 4px;">Warm Regards</div>
      <div style="color:#000000;margin:0 0 2px;">Emran</div>
      <div style="color:#000000;margin:0 0 2px;">Cell &amp; WhatsApp: +8801625000066</div>
      <div style="color:#000000;margin:0;">LinkedIn: <a href="https://www.linkedin.com/in/emranio/" style="color:#0B57D0;font-weight:400;text-decoration:underline;">https://www.linkedin.com/in/emranio/</a></div>
    </div>
  `;
}

function rows(
  data: NormalizedSubmission,
  submittedAt: string,
) {
  const baseRows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Source", data.sourcePath],
    ["Submitted", submittedAt],
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

function toText(
  data: NormalizedSubmission,
  submittedAt: string,
) {
  return rows(data, submittedAt)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

function toHtml(
  data: NormalizedSubmission,
  submittedAt: string,
) {
  const title =
    data.kind === "contact"
      ? "New ArrayHash contact form submission"
      : "New ArraySubs Pro trial request";

  const renderedRows = rows(data, submittedAt)
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

function customerContactSubject(data: NormalizedSubmission) {
  return `Re: ${data.subject ?? "Your query"}`;
}

function customerContactText(data: NormalizedSubmission, submittedAt: string) {
  const pageSlug = pageSlugFromSource(data.sourcePath);

  return [
    `Hi ${data.name},`,
    "",
    "I received your query, I will get back to you ASAP.",
    "",
    `Subject: ${data.subject ?? ""}`,
    "",
    "Your message:",
    data.body ?? "",
    "",
    `Submitted: ${submittedAt}`,
    `Page: ${pageSlug}`,
    "",
    `>> Note: A query form was submitted from this email ${data.email} at "${pageSlug}" - ArrayHash.`,
    "",
    signatureText(),
  ].join("\n");
}

function customerContactHtml(data: NormalizedSubmission, submittedAt: string) {
  const pageSlug = pageSlugFromSource(data.sourcePath);

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.65;color:#12002B;max-width:680px;margin:0;text-align:left;">
      <p style="margin:0 0 16px;color:#3F2A5C;">Hi ${escapeHtml(data.name)},</p>
      <p style="margin:0 0 20px;color:#3F2A5C;">I received your query, I will get back to you ASAP.</p>

      <div style="padding:18px 20px;border:1px solid #DED2F4;border-radius:14px;background:#F7F3FF;margin:0 0 22px;">
        <p style="margin:0 0 8px;color:#3F2A5C;"><strong>Subject:</strong> ${escapeHtml(data.subject ?? "")}</p>
        <p style="margin:0 0 8px;font-weight:700;color:#12002B;">Your message</p>
        <p style="margin:0 0 16px;color:#3F2A5C;white-space:pre-wrap;">${escapeHtml(data.body ?? "")}</p>
        <p style="margin:0;color:#3F2A5C;"><strong>Date time:</strong> ${escapeHtml(submittedAt)}</p>
        <p style="margin:8px 0 0;color:#3F2A5C;"><strong>Page:</strong> ${escapeHtml(pageSlug)}</p>
      </div>

      <p style="margin:0 0 16px;color:#3F2A5C;">&gt;&gt; Note: A query form was submitted from this email ${escapeHtml(data.email)} at &quot;${escapeHtml(pageSlug)}&quot; - ArrayHash.</p>
      ${signatureHtml()}
    </div>
  `;
}

async function sendResendNotification(
  data: NormalizedSubmission,
  submittedAt: string,
) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: data.email,
      subject: emailSubject(data),
      html: toHtml(data, submittedAt),
      text: toText(data, submittedAt),
      tags: [
        { name: "source", value: "website" },
        { name: "form", value: data.kind.replace("-", "_") },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend notification failed (${response.status}): ${errorText}`);
  }
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

  const submittedAt = submittedAtUtc();

  if (normalized.data.kind === "pro-trial") {
    try {
      await sendResendNotification(normalized.data, submittedAt);
    } catch (error) {
      console.error("Resend form notification failed", error);

      return Response.json(
        { ok: false, error: "Could not send the internal notification right now." },
        { status: 502 },
      );
    }
  }

  try {
    if (normalized.data.kind === "contact") {
      await sendGmailEmail({
        to: normalized.data.email,
        replyTo: TO_EMAIL,
        subject: customerContactSubject(normalized.data),
        html: customerContactHtml(normalized.data, submittedAt),
        text: customerContactText(normalized.data, submittedAt),
      });
    }
  } catch (error) {
    console.error("Gmail customer email failed", error);

    return Response.json(
      { ok: false, error: "Could not send the customer email right now." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
