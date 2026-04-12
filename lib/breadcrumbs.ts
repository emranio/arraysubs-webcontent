export interface RouteBreadcrumbItem {
  label: string;
  href: string;
}

export function formatBreadcrumbSegment(segment: string): string {
  return decodeURIComponent(segment)
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
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