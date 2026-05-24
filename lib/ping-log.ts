import { readFile, writeFile } from 'node:fs/promises';

const GMT_PLUS_SIX_OFFSET_MS = 6 * 60 * 60 * 1000;
const PING_LOG_RETENTION_MS = 5 * 24 * 60 * 60 * 1000;
const EXCLUDED_EMAIL_LOCAL_PART_LENGTH = 8;
const EXCLUDED_EMAIL_LOCAL_PART_DOMAIN_EXCEPTIONS = new Set(['gmail', 'hotmail', 'yahoo', 'icloud']);
const PING_LOG_SEPARATOR = ' | ';

export type PingLogEntry = {
  received_at: string;
  plugin_version: string;
  site_title: string;
  site_url: string;
  site_email: string;
  user_agent: string;
};

let pendingPingLogWrite: Promise<void> = Promise.resolve();

export async function upsertPingLogEntry(logFilePath: string, entry: PingLogEntry): Promise<void> {
  const currentWrite = pendingPingLogWrite.then(async () => {
    const existingContent = await readPingLogFile(logFilePath);
    const nextContent = mergePingLogContent(existingContent, entry);

    await writeFile(logFilePath, nextContent, 'utf8');
  });

  pendingPingLogWrite = currentWrite.catch(() => undefined);

  return currentWrite;
}

export function normalizePingLogContent(existingContent: string): string {
  const lines = existingContent
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const normalizedLines = lines
    .map((line) => normalizePingLogLine(line))
    .filter((line) => !shouldExcludePingLogLine(line));

  if (normalizedLines.length === 0) {
    return '';
  }

  return `${normalizedLines.join('\n')}\n`;
}

export function mergePingLogContent(existingContent: string, nextEntry: PingLogEntry): string {
  const nextEmailKey = getEmailKey(nextEntry.site_email);
  const nextSiteKey = getSiteKey(nextEntry.site_url);
  const shouldExcludeNextEntry = shouldExcludePingLogEmail(nextEntry.site_email);

  if (!nextEmailKey) {
    throw new Error('Ping log entries must include a valid site_email.');
  }

  const lines = existingContent
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const nextLine = formatPingLogLine(nextEntry);
  const existingEntries = lines.map((line) => ({
    emailKey: getEmailKeyFromLine(line),
    normalizedLine: normalizePingLogLine(line),
    receivedAtTime: getReceivedAtTimeFromLine(line),
    siteKey: getSiteKeyFromLine(line),
  }));
  const isNewSite =
    !shouldExcludeNextEntry &&
    nextSiteKey !== null &&
    !existingEntries.some(
      (entry) => entry.siteKey === nextSiteKey && !shouldExcludePingLogEmailKey(entry.emailKey)
    );
  const retentionCutoffTime = isNewSite ? getRetentionCutoffTime(nextEntry.received_at) : null;
  const mergedLines: string[] = [];

  for (const existingEntry of existingEntries) {
    if (shouldExcludePingLogEmailKey(existingEntry.emailKey)) {
      continue;
    }

    if (
      retentionCutoffTime !== null &&
      existingEntry.receivedAtTime !== null &&
      existingEntry.receivedAtTime < retentionCutoffTime
    ) {
      continue;
    }

    if (existingEntry.emailKey !== nextEmailKey) {
      mergedLines.push(existingEntry.normalizedLine);
    }
  }

  if (!shouldExcludeNextEntry) {
    mergedLines.push(nextLine);
  }

  return mergedLines.length > 0 ? `${mergedLines.join('\n')}\n` : '';
}

export function formatPingLogLine(entry: PingLogEntry): string {
  const pluginVersion = entry.plugin_version.trim().startsWith('v')
    ? entry.plugin_version.trim()
    : `v${entry.plugin_version.trim()}`;

  return [
      pluginVersion,
      entry.site_email.trim(),
      formatTimestampForGmtPlusSix(entry.received_at),
      entry.site_url,
      entry.site_title,
  ].join(PING_LOG_SEPARATOR);
}

async function readPingLogFile(logFilePath: string): Promise<string> {
  try {
    return await readFile(logFilePath, 'utf8');
  } catch (error) {
    if (isFileNotFoundError(error)) {
      return '';
    }

    throw error;
  }
}

function getEmailKeyFromLine(line: string): string | null {
  const parsedJsonLine = parseJsonPingLogLine(line);

  if (parsedJsonLine) {
    return getEmailKey(parsedJsonLine.site_email);
  }

  const segments = line.split(PING_LOG_SEPARATOR);

  if (segments.length < 2) {
    return null;
  }

  return getEmailKey(segments[1]);
}

function getSiteKeyFromLine(line: string): string | null {
  const parsedJsonLine = parseJsonPingLogLine(line);

  if (parsedJsonLine) {
    return getSiteKey(parsedJsonLine.site_url);
  }

  const segments = line.split(PING_LOG_SEPARATOR);

  if (segments.length < 4) {
    return null;
  }

  return getSiteKey(segments[3]);
}

function getReceivedAtTimeFromLine(line: string): number | null {
  const parsedJsonLine = parseJsonPingLogLine(line);

  if (parsedJsonLine) {
    return parsePingLogTimestamp(parsedJsonLine.received_at);
  }

  const segments = line.split(PING_LOG_SEPARATOR);

  if (segments.length < 3) {
    return null;
  }

  return parsePingLogTimestamp(segments[2]);
}

function normalizePingLogLine(line: string): string {
  const parsedJsonLine = parseJsonPingLogLine(line);

  return parsedJsonLine ? formatPingLogLine(parsedJsonLine) : line;
}

function parseJsonPingLogLine(line: string): PingLogEntry | null {
  try {
    const parsedLine = JSON.parse(line) as Partial<PingLogEntry>;

    if (
      typeof parsedLine.received_at !== 'string' ||
      typeof parsedLine.plugin_version !== 'string' ||
      typeof parsedLine.site_title !== 'string' ||
      typeof parsedLine.site_url !== 'string' ||
      typeof parsedLine.site_email !== 'string'
    ) {
      return null;
    }

    return {
      received_at: parsedLine.received_at,
      plugin_version: parsedLine.plugin_version,
      site_title: parsedLine.site_title,
      site_url: parsedLine.site_url,
      site_email: parsedLine.site_email,
      user_agent: typeof parsedLine.user_agent === 'string' ? parsedLine.user_agent : '',
    };
  } catch {
    return null;
  }
}

function getEmailKey(siteEmail: string): string | null {
  const normalizedEmail = siteEmail.trim().toLowerCase();

  return normalizedEmail.length > 0 ? normalizedEmail : null;
}

function getSiteKey(siteUrl: string): string | null {
  const normalizedSiteUrl = siteUrl.trim();

  if (normalizedSiteUrl.length === 0) {
    return null;
  }

  try {
    return new URL(normalizedSiteUrl).hostname.toLowerCase();
  } catch {
    return normalizedSiteUrl.toLowerCase();
  }
}

function shouldExcludePingLogLine(line: string): boolean {
  return shouldExcludePingLogEmailKey(getEmailKeyFromLine(line));
}

function shouldExcludePingLogEmail(siteEmail: string): boolean {
  return shouldExcludePingLogEmailKey(getEmailKey(siteEmail));
}

function shouldExcludePingLogEmailKey(emailKey: string | null): boolean {
  if (!emailKey) {
    return false;
  }

  const atSymbolIndex = emailKey.indexOf('@');

  if (atSymbolIndex <= 0) {
    return false;
  }

  const localPart = emailKey.slice(0, atSymbolIndex);
  const domainPart = emailKey.slice(atSymbolIndex + 1);
  const domainLabel = domainPart.split('.', 1)[0];

  if (EXCLUDED_EMAIL_LOCAL_PART_DOMAIN_EXCEPTIONS.has(domainLabel)) {
    return false;
  }

  return localPart.length === EXCLUDED_EMAIL_LOCAL_PART_LENGTH;
}

function formatTimestampForGmtPlusSix(receivedAt: string): string {
  const parsedDate = new Date(receivedAt);

  if (Number.isNaN(parsedDate.getTime())) {
    return receivedAt;
  }

  const gmtPlusSixDate = new Date(parsedDate.getTime() + GMT_PLUS_SIX_OFFSET_MS);
  const year = gmtPlusSixDate.getUTCFullYear();
  const month = String(gmtPlusSixDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(gmtPlusSixDate.getUTCDate()).padStart(2, '0');
  const hours = gmtPlusSixDate.getUTCHours();
  const minutes = String(gmtPlusSixDate.getUTCMinutes()).padStart(2, '0');
  const twelveHour = hours % 12 || 12;
  const meridiem = hours >= 12 ? 'PM' : 'AM';

  return `${year}-${month}-${day} ${twelveHour}:${minutes}${meridiem}`;
}

function getRetentionCutoffTime(receivedAt: string): number | null {
  const receivedAtTime = parsePingLogTimestamp(receivedAt);

  return receivedAtTime === null ? null : receivedAtTime - PING_LOG_RETENTION_MS;
}

function parsePingLogTimestamp(timestamp: string): number | null {
  const gmtPlusSixTimestamp = parseGmtPlusSixTimestamp(timestamp);

  if (gmtPlusSixTimestamp !== null) {
    return gmtPlusSixTimestamp;
  }

  const parsedDate = new Date(timestamp);
  const parsedTime = parsedDate.getTime();

  return Number.isNaN(parsedTime) ? null : parsedTime;
}

function parseGmtPlusSixTimestamp(timestamp: string): number | null {
  const match = timestamp
    .trim()
    .match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{1,2}):(\d{2})\s*(AM|PM)$/iu);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const twelveHour = Number(match[4]);
  const minute = Number(match[5]);
  const meridiem = match[6].toUpperCase();

  if (twelveHour < 1 || twelveHour > 12 || minute < 0 || minute > 59) {
    return null;
  }

  const hour = (twelveHour % 12) + (meridiem === 'PM' ? 12 : 0);
  const gmtPlusSixTime = Date.UTC(year, month - 1, day, hour, minute);
  const parsedDate = new Date(gmtPlusSixTime);

  if (
    parsedDate.getUTCFullYear() !== year ||
    parsedDate.getUTCMonth() !== month - 1 ||
    parsedDate.getUTCDate() !== day ||
    parsedDate.getUTCHours() !== hour ||
    parsedDate.getUTCMinutes() !== minute
  ) {
    return null;
  }

  return gmtPlusSixTime - GMT_PLUS_SIX_OFFSET_MS;
}

function isFileNotFoundError(error: unknown): error is NodeJS.ErrnoException {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT';
}
