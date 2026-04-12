import siteConfig from '@/site.config.json';

export interface RouteBreadcrumbItem {
  label: string;
  href: string;
}

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
      labels.set(normalizeRoutePath(item.href), item.label);
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

  return segments.map((segment, index) => ({
    label: formatBreadcrumbSegment(segment),
    href: `/${segments.slice(0, index + 1).join('/')}/`,
  }));
}

export function getRouteBreadcrumbs(pathname: string, currentLabel?: string): RouteBreadcrumbItem[] {
  const normalizedPath = normalizeRoutePath(pathname);

  if (normalizedPath === '/') {
    return [];
  }

  const segments = normalizedPath.split('/').filter(Boolean);

  return segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}/`;
    const fallbackLabel = toTitleCase(formatBreadcrumbSegment(segment));
    const isCurrent = index === segments.length - 1;

    return {
      href,
      label: getRouteLabel(href) ?? (isCurrent && currentLabel ? currentLabel : fallbackLabel),
    };
  });
}