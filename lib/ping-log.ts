import { readFile, writeFile } from 'node:fs/promises';

const GMT_PLUS_SIX_OFFSET_MS = 6 * 60 * 60 * 1000;
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
  const shouldExcludeNextEntry = shouldExcludePingLogEmail(nextEntry.site_email);

  if (!nextEmailKey) {
    throw new Error('Ping log entries must include a valid site_email.');
  }

  const lines = existingContent
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const nextLine = formatPingLogLine(nextEntry);
  const mergedLines: string[] = [];

  for (const line of lines) {
    const existingEmailKey = getEmailKeyFromLine(line);
    const normalizedLine = normalizePingLogLine(line);

    if (shouldExcludePingLogEmailKey(existingEmailKey)) {
      continue;
    }

    if (existingEmailKey !== nextEmailKey) {
      mergedLines.push(normalizedLine);
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

function isFileNotFoundError(error: unknown): error is NodeJS.ErrnoException {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT';
}
