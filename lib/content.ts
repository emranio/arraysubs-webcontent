import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface ContentMeta {
  title: string;
  description: string;
  coverImage?: string;
  schema?: string;
  publish: boolean | string;
  bodyClass?: string;
  template: 'default' | 'canvas' | 'blank' | 'blog';
  author?: string;
  date?: string;
  category?: string;
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

const CONTENT_DIR = path.join(process.cwd(), 'content');

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

  // Check cache
  const cached = contentCache.get(filePath);
  if (cached && cached.mtime === mtime) {
    return cached.result;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  // Check publish status
  const publishValue = data.publish ?? false;
  if (!isPublished(publishValue)) return null;

  const { slug } = resolveSlug(filePath);
  const rt = readingTime(content);
  const coverImage = data.coverImage || extractFirstImage(content);

  const meta: ContentMeta = {
    title: data.title || 'Untitled',
    description: data.description || '',
    coverImage,
    schema: data.schema,
    publish: publishValue,
    bodyClass: data.bodyClass,
    template: data.template || 'default',
    author: data.author,
    date: data.date,
    category: data.category,
    tags: data.tags,
    slug: slug.join('/'),
    contentType,
    readingTime: rt.text,
  };

  const result: ContentItem = { meta, content };
  contentCache.set(filePath, { mtime, result });

  return result;
}

export function getAllContent(contentType: string): ContentMeta[] {
  const dir = path.join(CONTENT_DIR, contentType);
  if (!fs.existsSync(dir)) return [];

  const items: ContentMeta[] = [];

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.mdx')) {
        const raw = fs.readFileSync(fullPath, 'utf-8');
        const { data, content } = matter(raw);

        const publishValue = data.publish ?? false;
        if (!isPublished(publishValue)) continue;

        const { slug } = resolveSlug(fullPath);
        const rt = readingTime(content);
        const coverImage = data.coverImage || extractFirstImage(content);

        items.push({
          title: data.title || 'Untitled',
          description: data.description || '',
          coverImage,
          schema: data.schema,
          publish: publishValue,
          bodyClass: data.bodyClass,
          template: data.template || 'default',
          author: data.author,
          date: data.date,
          category: data.category,
          tags: data.tags,
          slug: slug.join('/'),
          contentType,
          readingTime: rt.text,
        });
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
