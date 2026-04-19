import path from 'node:path';
import { NextResponse } from 'next/server';

import { buildCorsHeaders } from '@/lib/cors';
import { type PingLogEntry, upsertPingLogEntry } from '@/lib/ping-log';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const LOG_FILE_PATH = process.env.PING_DATA_FILE ?? path.join(process.cwd(), 'ping-data.txt');
const REQUIRED_FIELDS = ['plugin_version', 'site_title', 'site_url', 'site_email'] as const;
const WORDPRESS_USER_AGENT_SITE_URL_PATTERN = /^WordPress\/[\d.]+;\s+(\S+)/iu;
const SUPPORTED_SITE_PROTOCOLS = new Set(['http:', 'https:']);

type RequiredField = (typeof REQUIRED_FIELDS)[number];

type PingPayload = Record<RequiredField, string>;

type ParseResult =
  | { success: true; data: PingPayload }
  | { success: false; message: string; status: number };

type VerificationResult = {
  valid: boolean;
  reason: string;
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: buildCorsHeaders(),
  });
}

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
        headers: buildCorsHeaders(),
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
        headers: buildCorsHeaders(),
      }
    );
  }

  const entry: PingLogEntry = {
    received_at: new Date().toISOString(),
    ...parsedPayload.data,
    user_agent: request.headers.get('user-agent') ?? '',
  };

  await upsertPingLogEntry(LOG_FILE_PATH, entry);

  return NextResponse.json(
    { success: true },
    {
      headers: buildCorsHeaders(),
    }
  );
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

    if (!isSupportedSiteProtocol(parsedUrl.protocol)) {
      throw new Error('Unsupported protocol.');
    }

    // if (process.env.NODE_ENV === 'production' && isUnsafeHost(parsedUrl.hostname)) {
    //   return {
    //     success: false,
    //     message: 'Local and private site URLs are not accepted in production.',
    //     status: 422,
    //   };
    // }

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
      reason: 'WTF you doing bruh??. C541',
    };
  }

  const normalizedSiteUrl = new URL(siteUrl);

  if (!userAgentIncludesHost(userAgent, normalizedSiteUrl.hostname)) {
    return {
      valid: false,
      reason: 'WTF you doing bruh??. C542',
    };
  }

  // const looksLikeWordPress = await isWordPressSite(normalizedSiteUrl);

  // if (!looksLikeWordPress) {
  //   return {
  //     valid: false,
  //     reason: 'WTF you doing bruh??. C543',
  //   };
  // }

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
  return getWordPressSiteUrlFromUserAgent(userAgent) !== null;
}

function userAgentIncludesHost(userAgent: string, expectedHost: string): boolean {
  const userAgentSiteUrl = getWordPressSiteUrlFromUserAgent(userAgent);

  if (!userAgentSiteUrl) {
    return false;
  }

  return userAgentSiteUrl.hostname.toLowerCase() === expectedHost.trim().toLowerCase();
}

function getWordPressSiteUrlFromUserAgent(userAgent: string | null): URL | null {
  if (typeof userAgent !== 'string') {
    return null;
  }

  const match = userAgent.trim().match(WORDPRESS_USER_AGENT_SITE_URL_PATTERN);

  if (!match) {
    return null;
  }

  try {
    const siteUrl = new URL(match[1]);

    return isSupportedSiteProtocol(siteUrl.protocol) ? siteUrl : null;
  } catch {
    return null;
  }
}

function isSupportedSiteProtocol(protocol: string): boolean {
  return SUPPORTED_SITE_PROTOCOLS.has(protocol);
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