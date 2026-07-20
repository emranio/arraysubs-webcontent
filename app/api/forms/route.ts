import { execFile } from "node:child_process";
import { promisify } from "node:util";

export const runtime = "nodejs";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "emran@arrayhash.com";
const FROM_EMAIL = process.env.GMAIL_SENDER_EMAIL ?? "emran@arrayhash.com";
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "ArrayHash Website <onboarding@resend.dev>";
const GWS_CLI_PATH = process.env.GWS_CLI_PATH ?? "gws";
const GMAIL_SUPPORT_LABEL_NAME = process.env.GMAIL_SUPPORT_LABEL_NAME ?? "ArrayHash Supports";

const execFileAsync = promisify(execFile);

type FormPayload = {
  kind?: unknown;
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  body?: unknown;
  sourcePath?: unknown;
  companyWebsite?: unknown;
};

type NormalizedSubmission = {
  kind: "contact";
  name: string;
  email: string;
  sourcePath: string;
  subject?: string;
  body?: string;
};

type ResendOptions = {
  from?: string;
  tags?: { name: string; value: string }[];
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

async function gmailSendRaw(payload: GmailEmailPayload): Promise<string | undefined> {
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

  return response.id;
}

async function sendGmailEmail(payload: GmailEmailPayload) {
  const messageId = await gmailSendRaw(payload);

  if (messageId) {
    // The message is already delivered — labeling is best-effort. Never let a
    // post-send label failure propagate, or the caller would treat the send as
    // failed and re-deliver a duplicate through the Resend fallback.
    try {
      await markGmailMessageUnread(messageId);
    } catch (labelError) {
      console.error("Contact auto-reply labeling failed (already sent)", labelError);
    }
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
    // Don't cache a rejection for the process lifetime — let the next submission
    // retry instead of permanently degrading the auto-reply labeling.
    gmailSupportLabelIdPromise.catch(() => {
      gmailSupportLabelIdPromise = null;
    });
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
  const kind = payload.kind === "contact" ? "contact" : null;
  const name = readString(payload.name, 160);
  const email = readString(payload.email, 200).toLowerCase();
  const sourcePath = readString(payload.sourcePath, 300) || "/";

  if (!kind) return { ok: false, error: "Unknown form type." };
  if (!name) return { ok: false, error: "Name is required." };
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "A valid email address is required." };
  }

  const subject = readString(payload.subject, 180);
  const body = readString(payload.body, 4000);

  if (!subject) return { ok: false, error: "Subject is required." };
  if (!body) return { ok: false, error: "Message is required." };

  return {
    ok: true,
    data: { kind, name, email, subject, body, sourcePath },
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

/**
 * Resend fallback for a direct customer email (e.g. the contact auto-reply)
 * when the Google Workspace send fails. Sent from the website Resend address
 * with reply-to pointing at the real support mailbox.
 */
async function sendResendEmail(
  payload: GmailEmailPayload,
  options: ResendOptions = {},
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
      from: options.from ?? RESEND_FROM_EMAIL,
      to: [payload.to],
      reply_to: payload.replyTo ?? TO_EMAIL,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      tags: options.tags ?? [
        { name: "source", value: "website" },
        { name: "form", value: "contact_autoreply" },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend email failed (${response.status}): ${errorText}`);
  }
}


/* ---- Basic abuse protection --------------------------------------------
   In-memory per-IP throttle. Not a substitute for a real WAF/CAPTCHA, but it
   stops a single client from using this public form as an email amplifier.
   The store resets per process; behind multiple instances each caps its own
   share, which is acceptable for this low-volume marketing endpoint.
   ------------------------------------------------------------------------ */

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 6; // submissions per window, per client IP
const rateLimitHits = new Map<string, number[]>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (rateLimitHits.get(key) ?? []).filter((t) => t > windowStart);
  recent.push(now);
  rateLimitHits.set(key, recent);

  // Opportunistic cleanup so the map can't grow without bound.
  if (rateLimitHits.size > 5000) {
    for (const [k, times] of rateLimitHits) {
      if (!times.some((t) => t > windowStart)) rateLimitHits.delete(k);
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return Response.json(
      {
        ok: false,
        error: "Too many submissions. Please wait a few minutes and try again.",
      },
      { status: 429 },
    );
  }

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

  try {
    const customerPayload: GmailEmailPayload = {
      to: normalized.data.email,
      replyTo: TO_EMAIL,
      subject: customerContactSubject(normalized.data),
      html: customerContactHtml(normalized.data, submittedAt),
      text: customerContactText(normalized.data, submittedAt),
    };

    try {
      await sendGmailEmail(customerPayload);
    } catch (gmailError) {
      // Workspace mailbox unavailable — deliver through Resend so the
      // customer still gets their acknowledgement.
      console.error("Gmail customer email failed; falling back to Resend", gmailError);
      await sendResendEmail(customerPayload);
    }
  } catch (error) {
    console.error("Customer email failed (Gmail and Resend)", error);

    return Response.json(
      { ok: false, error: "Could not send the customer email right now." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
