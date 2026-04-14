import { appendFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const LOG_FILE_PATH = path.join(process.cwd(), 'ping-data.txt');
const REQUIRED_FIELDS = ['plugin_version', 'site_title', 'site_url', 'site_email'] as const;

type RequiredField = (typeof REQUIRED_FIELDS)[number];

type PingPayload = Record<RequiredField, string>;

type ParseResult =
  | { success: true; data: PingPayload }
  | { success: false; message: string; status: number };

type VerificationResult = {
  valid: boolean;
  reason: string;
};

export async function POST(request: Request) {
  const parsedPayload = await parsePayload(request);

  if (!parsedPayload.success) {
    return NextResponse.json(
      {
        success: false,
        message: parsedPayload.message,
      },
      {
        status: parsedPayload.status,
      }
    );
  }

  const verification = await verifyWordPressRequest(
    parsedPayload.data.site_url,
    request.headers.get('user-agent')
  );

  if (!verification.valid) {
    return NextResponse.json(
      {
        success: false,
        message: verification.reason,
      },
      {
        status: 403,
      }
    );
  }

  const entry = {
    received_at: new Date().toISOString(),
    ...parsedPayload.data,
    user_agent: request.headers.get('user-agent') ?? '',
  };

  await appendFile(LOG_FILE_PATH, `${JSON.stringify(entry)}\n`, 'utf8');

  return NextResponse.json({ success: true });
}

async function parsePayload(request: Request): Promise<ParseResult> {
  const contentType = request.headers.get('content-type') ?? '';
  let payload: unknown;

  try {
    if (contentType.includes('application/json')) {
      payload = await request.json();
    } else if (
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data')
    ) {
      payload = Object.fromEntries((await request.formData()).entries());
    } else {
      payload = await request.json();
    }
  } catch {
    return {
      success: false,
      message: 'Invalid request payload.',
      status: 400,
    };
  }

  if (!isRecord(payload)) {
    return {
      success: false,
      message: 'Request payload must be an object.',
      status: 400,
    };
  }

  const normalizedPayload = {} as PingPayload;

  for (const field of REQUIRED_FIELDS) {
    const value = payload[field];

    if (typeof value !== 'string' || value.trim().length === 0) {
      return {
        success: false,
        message: `Missing required field: ${field}.`,
        status: 422,
      };
    }

    normalizedPayload[field] = value.trim();
  }

  if (!isValidEmail(normalizedPayload.site_email)) {
    return {
      success: false,
      message: 'Invalid site_email value.',
      status: 422,
    };
  }

  try {
    const parsedUrl = new URL(normalizedPayload.site_url);

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Unsupported protocol.');
    }

    if (process.env.NODE_ENV === 'production' && isUnsafeHost(parsedUrl.hostname)) {
      return {
        success: false,
        message: 'Local and private site URLs are not accepted in production.',
        status: 422,
      };
    }

    normalizedPayload.site_url = parsedUrl.toString();
  } catch {
    return {
      success: false,
      message: 'Invalid site_url value.',
      status: 422,
    };
  }

  return {
    success: true,
    data: normalizedPayload,
  };
}

async function verifyWordPressRequest(siteUrl: string, userAgent: string | null): Promise<VerificationResult> {
  if (!isWordPressUserAgent(userAgent)) {
    return {
      valid: false,
      reason: 'The request user agent does not match a WordPress site.',
    };
  }

  const normalizedSiteUrl = new URL(siteUrl);

  if (!userAgentIncludesHost(userAgent, normalizedSiteUrl.hostname)) {
    return {
      valid: false,
      reason: 'The request user agent does not match the reported site URL.',
    };
  }

  const looksLikeWordPress = await isWordPressSite(normalizedSiteUrl);

  if (!looksLikeWordPress) {
    return {
      valid: false,
      reason: 'The reported site URL could not be verified as a WordPress site.',
    };
  }

  return {
    valid: true,
    reason: 'verified',
  };
}

async function isWordPressSite(siteUrl: URL): Promise<boolean> {
  const restUrl = new URL('/wp-json/', siteUrl);

  try {
    const restResponse = await fetch(restUrl, {
      headers: {
        Accept: 'application/json',
      },
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });

    if (restResponse.ok) {
      const contentType = restResponse.headers.get('content-type') ?? '';

      if (contentType.includes('application/json')) {
        const data = (await restResponse.json()) as Record<string, unknown>;

        if (
          (Array.isArray(data.namespaces) && data.namespaces.length > 0) ||
          typeof data.routes === 'object' ||
          typeof data.home === 'string' ||
          typeof data.name === 'string'
        ) {
          return true;
        }
      }
    }
  } catch {
    // Fall back to the homepage check below.
  }

  try {
    const pageResponse = await fetch(siteUrl, {
      headers: {
        Accept: 'text/html',
      },
      redirect: 'follow',
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });

    if (!pageResponse.ok) {
      return false;
    }

    const pageHtml = await pageResponse.text();

    return /wp-content|wp-includes|wp-json/i.test(pageHtml);
  } catch {
    return false;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(value);
}

function isWordPressUserAgent(userAgent: string | null): userAgent is string {
  return typeof userAgent === 'string' && /^WordPress\/[\d.]+;\shttps?:\/\//iu.test(userAgent.trim());
}

function userAgentIncludesHost(userAgent: string, expectedHost: string): boolean {
  const match = userAgent.match(/^WordPress\/[\d.]+;\s(https?:\/\/\S+)/iu);

  if (!match) {
    return false;
  }

  try {
    return new URL(match[1]).hostname === expectedHost;
  } catch {
    return false;
  }
}

function isUnsafeHost(hostname: string): boolean {
  const normalizedHost = hostname.trim().toLowerCase();

  if (
    normalizedHost === 'localhost' ||
    normalizedHost === '0.0.0.0' ||
    normalizedHost === '::1' ||
    normalizedHost.endsWith('.local')
  ) {
    return true;
  }

  if (/^(10\.|127\.|169\.254\.|192\.168\.)/u.test(normalizedHost)) {
    return true;
  }

  const privateRangeMatch = normalizedHost.match(/^172\.(\d{1,3})\./u);

  if (privateRangeMatch) {
    const secondOctet = Number(privateRangeMatch[1]);

    if (secondOctet >= 16 && secondOctet <= 31) {
      return true;
    }
  }

  return /^fe80:|^fc00:|^fd00:/u.test(normalizedHost);
}