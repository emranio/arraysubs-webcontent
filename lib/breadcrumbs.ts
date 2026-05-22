import siteConfig from '@/site.config.json';
import { APP_HOME_PATH, normalizeInternalHref } from '@/lib/internal-links';

export interface RouteBreadcrumbItem {
  label: string;
  href: string;
  className?: string;
}

const ARRAYSUBS_BREADCRUMB: RouteBreadcrumbItem = {
  label: 'arraysubs',
  href: APP_HOME_PATH,
  className: 'breadcrumb__section',
};

interface NavigationItem {
  label: string;
  href?: string | null;
  children?: NavigationItem[];
  sections?: Array<{
    links?: NavigationItem[];
  }>;
}

const STATIC_ROUTE_LABELS: Record<string, string> = {
  '/article/': 'Blog',
  '/articles/': 'Blog',
};

function toTitleCase(value: string): string {
  return value
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function normalizeRoutePath(pathname: string): string {
  const cleanPath = pathname.split(/[?#]/)[0]?.trim() ?? '';

  if (!cleanPath || cleanPath === '/') {
    return '/';
  }

  return `/${cleanPath.replace(/^\/+|\/+$/g, '')}/`;
}

function collectRouteLabels(items: NavigationItem[], labels: Map<string, string>) {
  for (const item of items) {
    if (item.href) {
      labels.set(normalizeRoutePath(normalizeInternalHref(item.href)), item.label);
    }

    if (item.children) {
      collectRouteLabels(item.children, labels);
    }

    if (item.sections) {
      for (const section of item.sections) {
        if (section.links) {
          collectRouteLabels(section.links, labels);
        }
      }
    }
  }
}

function createRouteLabelMap(): Map<string, string> {
  const labels = new Map<string, string>();

  Object.entries(STATIC_ROUTE_LABELS).forEach(([href, label]) => {
    labels.set(normalizeRoutePath(href), label);
  });

  collectRouteLabels(siteConfig.navigation.main as NavigationItem[], labels);

  return labels;
}

const ROUTE_LABELS = createRouteLabelMap();

export function formatBreadcrumbSegment(segment: string): string {
  return decodeURIComponent(segment)
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

export function normalizeBreadcrumbPath(pathname: string): string {
  return normalizeRoutePath(pathname);
}

export function getRouteLabel(pathname: string): string | undefined {
  return ROUTE_LABELS.get(normalizeRoutePath(pathname));
}

export function getPageRouteBreadcrumbs(slug: string): RouteBreadcrumbItem[] {
  const segments = slug
    .split('/')
    .map((segment) => segment.trim())
    .filter(Boolean);

  const baseSegments = segments[0] === 'arraysubs' ? ['arraysubs'] : [];
  const visibleSegments = baseSegments.length > 0 ? segments.slice(1) : segments;

  const items: RouteBreadcrumbItem[] = visibleSegments.map((segment, index) => ({
    label: formatBreadcrumbSegment(segment),
    href: `/${[...baseSegments, ...visibleSegments.slice(0, index + 1)].join('/')}/`,
  }));

  if (baseSegments.length > 0) {
    items.unshift(ARRAYSUBS_BREADCRUMB);
  }

  return items;
}

export function getRouteBreadcrumbs(pathname: string, currentLabel?: string): RouteBreadcrumbItem[] {
  const normalizedPath = normalizeRoutePath(pathname);

  if (normalizedPath === '/' || normalizedPath === APP_HOME_PATH) {
    return [];
  }

  const segments = normalizedPath.split('/').filter(Boolean);
  const baseSegments = segments[0] === 'arraysubs' ? ['arraysubs'] : [];
  const visibleSegments = baseSegments.length > 0 ? segments.slice(1) : segments;

  const items: RouteBreadcrumbItem[] = visibleSegments.map((segment, index) => {
    const href = `/${[...baseSegments, ...visibleSegments.slice(0, index + 1)].join('/')}/`;
    const fallbackLabel = toTitleCase(formatBreadcrumbSegment(segment));
    const isCurrent = index === visibleSegments.length - 1;

    return {
      href,
      label: getRouteLabel(href) ?? (isCurrent && currentLabel ? currentLabel : fallbackLabel),
    };
  });

  if (baseSegments.length > 0) {
    items.unshift(ARRAYSUBS_BREADCRUMB);
  }

  return items;
}