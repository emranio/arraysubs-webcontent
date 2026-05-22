import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const LOCAL_MARKDOWN_IMPORT_PATTERN = String.raw`^import\s+([A-Z][A-Za-z0-9_]*)\s+from\s+['"]((?:\.\.?\/)[^'"]+\.(?:md|mdx))['"]\s*;?\s*$`;
const LOCAL_MARKDOWN_IMPORT_TEST_RE = new RegExp(LOCAL_MARKDOWN_IMPORT_PATTERN, 'm');

interface InlineMarkdownImportsOptions {
  ancestry?: Set<string>;
}

export function hasLocalMarkdownImports(source: string): boolean {
  return LOCAL_MARKDOWN_IMPORT_TEST_RE.test(source);
}

export function inlineLocalMarkdownImports(
  source: string,
  filePath: string,
  options: InlineMarkdownImportsOptions = {}
): string {
  const currentPath = path.resolve(filePath);
  const ancestry = new Set(options.ancestry ?? []);

  if (ancestry.has(currentPath)) {
    throw new Error(`Circular MDX partial import detected: ${currentPath}`);
  }

  ancestry.add(currentPath);

  const importRegex = new RegExp(LOCAL_MARKDOWN_IMPORT_PATTERN, 'gm');
  const matches = [...source.matchAll(importRegex)];

  if (!matches.length) {
    return source.trim();
  }

  let resolvedSource = source.replace(importRegex, '').trim();

  for (const [, componentName, relativeImportPath] of matches) {
    const importedPath = path.resolve(path.dirname(currentPath), relativeImportPath);

    if (!fs.existsSync(importedPath)) {
      throw new Error(
        `Imported MDX partial not found: ${relativeImportPath} from ${currentPath}`
      );
    }

    const importedRaw = fs.readFileSync(importedPath, 'utf-8');
    const { content } = matter(importedRaw);
    const inlinedContent = inlineLocalMarkdownImports(content, importedPath, {
      ancestry,
    });
    const replacement = `\n${inlinedContent}\n`;
    const selfClosingPattern = new RegExp(
      `<${componentName}(?:\\s[^>]*)?\\s*\\/>`,
      'g'
    );
    const wrappedPattern = new RegExp(
      `<${componentName}(?:\\s[^>]*)?\\s*>\\s*<\\/${componentName}>`,
      'g'
    );

    resolvedSource = resolvedSource
      .replace(wrappedPattern, replacement)
      .replace(selfClosingPattern, replacement);
  }

  return resolvedSource.trim();
}
