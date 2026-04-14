import fs from 'fs';
import path from 'path';
import { normalizeInternalHref } from '../lib/internal-links';

const root = process.cwd();
const pageDir = path.join(root, 'contents/page');
const articleDir = path.join(root, 'contents/article');
const contentDir = path.join(root, 'contents');
const componentFiles = [
  path.join(root, 'site.config.json'),
  path.join(root, 'components/layout/footer.tsx'),
  path.join(root, 'components/layout/header.tsx'),
  path.join(root, 'components/templates/blog-template.tsx'),
  path.join(root, 'app/not-found.tsx'),
  path.join(root, 'app/page.tsx'),
];

function walk(dir: string, predicate: (value: string) => boolean = () => true): string[] {
  const results: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...walk(fullPath, predicate));
      continue;
    }

    if (predicate(fullPath)) {
      results.push(fullPath);
    }
  }

  return results;
}

function fileToSlug(baseDir: string, filePath: string): string[] {
  const relative = path
    .relative(baseDir, filePath)
    .replace(/\\/g, '/')
    .replace(/\.mdx?$/, '');
  const parts = relative.split('/');

  if (parts[parts.length - 1] === 'index') {
    parts.pop();
  }

  return parts.filter(Boolean);
}

function toRoute(slugParts: string[], prefix = ''): string {
  if (slugParts.length === 0) {
    return prefix || '/';
  }

  const joined = slugParts.join('/');
  return `${prefix}/${joined}/`.replace(/\/+/g, '/');
}

function collectJsonHrefs(value: unknown, hrefs: Array<{ filePath: string; href: string }>) {
  if (Array.isArray(value)) {
    value.forEach((entry) => collectJsonHrefs(entry, hrefs));
    return;
  }

  if (!value || typeof value !== 'object') {
    return;
  }

  for (const [key, child] of Object.entries(value)) {
    if (key === 'href' && typeof child === 'string') {
      hrefs.push({ filePath: 'site.config.json', href: child });
    } else {
      collectJsonHrefs(child, hrefs);
    }
  }
}

const routes = new Set<string>(['/', '/article/', '/articles/']);

for (const filePath of walk(pageDir, (value) => value.endsWith('.mdx'))) {
  routes.add(toRoute(fileToSlug(pageDir, filePath)));
}

for (const filePath of walk(articleDir, (value) => value.endsWith('.mdx'))) {
  const slug = fileToSlug(articleDir, filePath);
  routes.add(toRoute(slug, '/article'));
  routes.add(toRoute(slug, '/articles'));
}

const hrefs: Array<{ filePath: string; href: string }> = [];
const hrefPatterns = [
  /href\s*=\s*["']([^"']+)["']/g,
  /\]\((\/[^)\s]+[^)]*)\)/g,
];

for (const filePath of walk(contentDir, (value) => value.endsWith('.mdx'))) {
  const source = fs.readFileSync(filePath, 'utf8');

  for (const pattern of hrefPatterns) {
    for (const match of source.matchAll(pattern)) {
      hrefs.push({ filePath, href: match[1] });
    }
  }
}

for (const filePath of componentFiles) {
  if (!fs.existsSync(filePath)) {
    continue;
  }

  const source = fs.readFileSync(filePath, 'utf8');

  for (const pattern of hrefPatterns) {
    for (const match of source.matchAll(pattern)) {
      hrefs.push({ filePath, href: match[1] });
    }
  }
}

collectJsonHrefs(JSON.parse(fs.readFileSync(path.join(root, 'site.config.json'), 'utf8')), hrefs);

const failures: string[] = [];

for (const { filePath, href } of hrefs) {
  if (!href.startsWith('/')) {
    continue;
  }

  const normalized = normalizeInternalHref(href);
  const routePath = normalized.replace(/[?#].*$/, '');

  if (!routes.has(routePath)) {
    failures.push(`${path.relative(root, filePath)} :: ${href} -> ${normalized}`);
  }
}

if (failures.length > 0) {
  console.error('Broken internal links found:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Validated ${hrefs.length} internal links against ${routes.size} routes.`);
