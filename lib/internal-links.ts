export const APP_HOME_PATH = '/arraysubs/';
export const APP_ROUTE_PREFIX = '/arraysubs';

const ROOT_PRESERVED_PATHS = new Set([
  '/privacy-policy/',
  '/refund-policy/',
  '/terms-of-service/',
  '/data-safety/',
  '/contact/',
]);

const ROOT_PRESERVED_PREFIXES = [
  '/article/',
  '/articles/',
  '/update-checker/',
  '/api/',
  '/_next/',
];

const MOVED_PAGE_PREFIXES = [
  '/compare/',
  '/features/',
  '/gateways/',
  '/use-cases/',
];

const MOVED_PAGE_PATHS = new Set([
  '/download/',
  '/plans/',
  '/changelog/',
]);

function normalizeRoutePath(pathname: string): string {
  const cleanPath = pathname.split(/[?#]/)[0]?.trim() ?? '';

  if (!cleanPath || cleanPath === '/') {
    return '/';
  }

  return `/${cleanPath.replace(/^\/+|\/+$/g, '')}/`;
}

function splitHrefSuffix(href: string) {
  const match = href.match(/^([^?#]*)(.*)$/);

  return {
    pathname: match?.[1] ?? href,
    suffix: match?.[2] ?? '',
  };
}

function isSpecialHref(href: string): boolean {
  return (
    href.startsWith('#')
    || href.startsWith('?')
    || href.startsWith('//')
    || /^[a-z][a-z0-9+.-]*:/i.test(href)
  );
}

export function isArraysubsPath(pathname: string): boolean {
  return normalizeRoutePath(pathname).startsWith(APP_HOME_PATH);
}

export function normalizeInternalHref(href: string): string {
  if (!href || isSpecialHref(href) || !href.startsWith('/')) {
    return href;
  }

  const { pathname, suffix } = splitHrefSuffix(href);
  const normalizedPath = normalizeRoutePath(pathname);

  if (normalizedPath === '/') {
    return `${APP_HOME_PATH}${suffix}`;
  }

  if (normalizedPath.startsWith(APP_HOME_PATH)) {
    return `${normalizedPath}${suffix}`;
  }

  if (ROOT_PRESERVED_PATHS.has(normalizedPath)) {
    return `${normalizedPath}${suffix}`;
  }

  if (ROOT_PRESERVED_PREFIXES.some((prefix) => normalizedPath.startsWith(prefix))) {
    return `${normalizedPath}${suffix}`;
  }

  if (MOVED_PAGE_PATHS.has(normalizedPath) || MOVED_PAGE_PREFIXES.some((prefix) => normalizedPath.startsWith(prefix))) {
    return `${APP_ROUTE_PREFIX}${normalizedPath}${suffix}`;
  }

  return `${normalizedPath}${suffix}`;
}
