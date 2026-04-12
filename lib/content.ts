import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import {
  hasLocalMarkdownImports,
  inlineLocalMarkdownImports,
} from '@/lib/mdx-partials';
import {
  DEFAULT_BADGE_VARIANT,
  normalizeBadgeVariant,
  type BadgeColorVariant,
} from '@/lib/badge-variants';

export interface ContentActionButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
}

export interface ContentHeaderTag {
  label: string;
  variant?: BadgeColorVariant;
}

export interface ContentMeta {
  title: string;
  headline?: string;
  description: string;
  coverImage?: string;
  schema?: string;
  publish: boolean | string;
  bodyClass?: string;
  template: 'default' | 'canvas' | 'blank' | 'blog';
  author?: string;
  date?: string;
  category?: string;
  subText?: string;
  actionButtons?: ContentActionButton[];
  headerBadge?: ContentHeaderTag;
  headerTags?: ContentHeaderTag[];
  tags?: string[];
  slug: string;
  contentType: string;
  readingTime: string;
  [key: string]: unknown;
}

export interface ContentItem {
  meta: ContentMeta;
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'contents');

const VALID_TEMPLATES = new Set(['default', 'canvas', 'blank', 'blog']);
const VALID_BUTTON_VARIANTS = new Set(['primary', 'secondary', 'outline', 'text']);
const VALID_BUTTON_SIZES = new Set(['sm', 'md', 'lg']);

// Simple in-memory cache
const contentCache = new Map<string, { mtime: number; result: ContentItem }>();

export function isPublished(publish: boolean | string): boolean {
  if (typeof publish === 'boolean') return publish;
  if (typeof publish === 'string') {
    const publishDate = new Date(publish);
    return publishDate <= new Date();
  }
  return false;
}

function extractFirstImage(content: string): string | undefined {
  const imgMatch = content.match(/!\[.*?\]\((.*?)\)/);
  if (imgMatch) return imgMatch[1];

  const htmlImgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/);
  if (htmlImgMatch) return htmlImgMatch[1];

  return undefined;
}

function getStringValue(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();

  return trimmed ? trimmed : undefined;
}

function normalizeTemplate(value: unknown): ContentMeta['template'] {
  return typeof value === 'string' && VALID_TEMPLATES.has(value)
    ? (value as ContentMeta['template'])
    : 'default';
}

function normalizeActionButtons(value: unknown): ContentActionButton[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const actions = value
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const action = item as Record<string, unknown>;
      const label = getStringValue(action.label);
      const href = getStringValue(action.href);

      if (!label || !href) {
        return null;
      }

      const variant = getStringValue(action.variant);
      const size = getStringValue(action.size);

      return {
        label,
        href,
        ...(variant && VALID_BUTTON_VARIANTS.has(variant) && { variant: variant as ContentActionButton['variant'] }),
        ...(size && VALID_BUTTON_SIZES.has(size) && { size: size as ContentActionButton['size'] }),
      };
    })
    .filter((item): item is ContentActionButton => item !== null);

  return actions.length > 0 ? actions : undefined;
}

function normalizeHeaderTags(value: unknown): ContentHeaderTag[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const tags = value
    .map((item) => {
      if (typeof item === 'string') {
        const label = getStringValue(item);

        return label ? { label, variant: DEFAULT_BADGE_VARIANT } : null;
      }

      if (!item || typeof item !== 'object') {
        return null;
      }

      const tag = item as Record<string, unknown>;
      const label = getStringValue(tag.label);

      if (!label) {
        return null;
      }

      const variant = normalizeBadgeVariant(tag.variant);

      return {
        label,
        ...(variant && { variant }),
      };
    })
    .filter((item): item is ContentHeaderTag => item !== null);

  return tags.length > 0 ? tags : undefined;
}

function normalizeHeaderTag(value: unknown): ContentHeaderTag | undefined {
  if (typeof value === 'string') {
    const label = getStringValue(value);

    return label ? { label, variant: DEFAULT_BADGE_VARIANT } : undefined;
  }

  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const tag = value as Record<string, unknown>;
  const label = getStringValue(tag.label);

  if (!label) {
    return undefined;
  }

  const variant = normalizeBadgeVariant(tag.variant);

  return {
    label,
    ...(variant && { variant }),
  };
}

function normalizeSeoTags(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const tags = value
    .map((item) => {
      if (typeof item === 'string') {
        return getStringValue(item);
      }

      if (!item || typeof item !== 'object') {
        return undefined;
      }

      return getStringValue((item as Record<string, unknown>).label);
    })
    .filter((item): item is string => Boolean(item));

  return tags.length > 0 ? tags : undefined;
}

function createContentMeta(
  data: Record<string, unknown>,
  contentType: string,
  slug: string[],
  readingTimeText: string,
  coverImage?: string,
  publishValue?: boolean | string
): ContentMeta {
  const template = normalizeTemplate(data.template);
  const rawHeadline = data.headline;
  const rawSubText = data.subText ?? data['sub-text'];
  const rawActionButtons = data.actionButtons ?? data['action-buttons'] ?? data.actions;
  const rawHeaderBadge = data.headerBadge ?? data['header-badge'];
  const rawHeaderTags = data.headerTags ?? data['header-tags'] ?? (template === 'blog' ? undefined : data.tags);
  const rawSeoTags = template === 'blog' ? data.tags : data.seoTags ?? data['seo-tags'];

  return {
    title: getStringValue(data.title) || 'Untitled',
    headline: getStringValue(rawHeadline),
    description: getStringValue(data.description) || '',
    coverImage,
    schema: getStringValue(data.schema),
    publish: publishValue ?? false,
    bodyClass: getStringValue(data.bodyClass),
    template,
    author: getStringValue(data.author),
    date: getStringValue(data.date),
    category: getStringValue(data.category),
    subText: getStringValue(rawSubText),
    actionButtons: normalizeActionButtons(rawActionButtons),
    headerBadge: normalizeHeaderTag(rawHeaderBadge),
    headerTags: normalizeHeaderTags(rawHeaderTags),
    tags: normalizeSeoTags(rawSeoTags),
    slug: slug.join('/'),
    contentType,
    readingTime: readingTimeText,
  };
}

export function resolveSlug(filePath: string): { slug: string[]; contentType: string } {
  const relative = path.relative(CONTENT_DIR, filePath);
  const parts = relative.replace(/\.mdx?$/, '').split(path.sep);
  const contentType = parts[0] ?? '';

  let slugParts = parts.slice(1);

  // Remove trailing 'index'
  if (slugParts[slugParts.length - 1] === 'index') {
    slugParts = slugParts.slice(0, -1);
  }

  return { slug: slugParts, contentType };
}

export function getContentBySlug(
  contentType: string,
  slugParts: string[]
): ContentItem | null {
  // Try exact file match first, then index
  // Skip _ prefixed slug parts (partials/fragments)
  if (slugParts.some(part => part.startsWith('_'))) return null;

  const possiblePaths = [
    path.join(CONTENT_DIR, contentType, ...slugParts) + '.mdx',
    path.join(CONTENT_DIR, contentType, ...slugParts, 'index.mdx'),
  ];

  let filePath: string | null = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      filePath = p;
      break;
    }
  }

  if (!filePath) return null;

  const stat = fs.statSync(filePath);
  const mtime = stat.mtimeMs;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const shouldBypassCache = hasLocalMarkdownImports(raw);

  // Check cache
  if (!shouldBypassCache) {
    const cached = contentCache.get(filePath);
    if (cached && cached.mtime === mtime) {
      return cached.result;
    }
  }

  const { data, content } = matter(raw);
  const resolvedContent = inlineLocalMarkdownImports(content, filePath);

  // Check publish status
  const publishValue = data.publish ?? false;
  if (!isPublished(publishValue)) return null;

  const { slug } = resolveSlug(filePath);
  const rt = readingTime(resolvedContent);
  const coverImage = data.coverImage || extractFirstImage(resolvedContent);

  const meta = createContentMeta(
    data as Record<string, unknown>,
    contentType,
    slug,
    rt.text,
    coverImage,
    publishValue
  );

  const result: ContentItem = { meta, content: resolvedContent };

  if (!shouldBypassCache) {
    contentCache.set(filePath, { mtime, result });
  }

  return result;
}

export function getAllContent(contentType: string): ContentMeta[] {
  const dir = path.join(CONTENT_DIR, contentType);
  if (!fs.existsSync(dir)) return [];

  const items: ContentMeta[] = [];

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      // Skip files and directories starting with _
      if (entry.name.startsWith('_')) continue;

      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.mdx')) {
        const raw = fs.readFileSync(fullPath, 'utf-8');
        const { data, content } = matter(raw);
        const resolvedContent = inlineLocalMarkdownImports(content, fullPath);

        const publishValue = data.publish ?? false;
        if (!isPublished(publishValue)) continue;

        const { slug } = resolveSlug(fullPath);
        const rt = readingTime(resolvedContent);
        const coverImage = data.coverImage || extractFirstImage(resolvedContent);

        items.push(
          createContentMeta(
            data as Record<string, unknown>,
            contentType,
            slug,
            rt.text,
            coverImage,
            publishValue
          )
        );
      }
    }
  }

  walk(dir);

  // Sort by date descending for blog-like content
  items.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  return items;
}

export function getAllSlugs(contentType: string): string[][] {
  const dir = path.join(CONTENT_DIR, contentType);
  if (!fs.existsSync(dir)) return [];

  const slugs: string[][] = [];

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      // Skip files and directories starting with _
      if (entry.name.startsWith('_')) continue;

      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.mdx')) {
        const raw = fs.readFileSync(fullPath, 'utf-8');
        const { data } = matter(raw);

        const publishValue = data.publish ?? false;
        if (!isPublished(publishValue)) continue;

        const { slug } = resolveSlug(fullPath);
        slugs.push(slug);
      }
    }
  }

  walk(dir);
  return slugs;
}
