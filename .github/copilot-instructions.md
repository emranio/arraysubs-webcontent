# Project Instructions

## Overview

This is a Next.js website using the **Bun runtime**. It serves SEO-optimized pages from MDX content files. Always use the latest stable versions of all libraries and dependencies.

## Tech Stack

- **Runtime**: Bun (not Node.js)
- **Framework**: Next.js (latest, App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: SCSS — class-based, component-based. BEM naming convention.
- **State**: Zustand (only if needed)
- **Content**: MDX files in `/content/`
- **Config**: Root JSON for site config, `.env` / `.env.production` / `.env.example` for deploy values

### Forbidden

- No CSS-in-JS (no styled-components, no emotion)
- No Tailwind CSS
- No UI component libraries (no MUI, no Chakra, no shadcn)
- No database
- No CSS Modules
- No Node.js-specific APIs — use Bun-compatible equivalents

## Architecture

### Code Organization

- Component-based codebase with small, focused files
- Each component in its own file — avoid large monolithic files
- Keep files under ~150 lines; split into multiple files if larger
- Co-locate component SCSS modules alongside their component files

### Content Directory (`/content/`)

All MDX files, images, videos, and PDFs live under `/content/`. The directory structure defines URL routing:

```
/content/page/my-page-slug.mdx        → /my-page-slug/
/content/page/parent/child.mdx        → /parent/child/
/content/page/parent/index.mdx        → /parent/

/content/article/my-awesome-article.mdx → /article/my-awesome-article/

/content/documentations/how-to-boo.mdx  → /documentations/how-to-boo/
/content/documentations/a/b.mdx         → /documentations/a/b/
/content/documentations/a/index.mdx     → /documentations/a/
```

The `page` content type is special — it maps directly to the root without the `/page/` prefix.

### MDX Frontmatter Schema

Every MDX file has YAML frontmatter with these fields:

```yaml
---
title: "Page Title"                    # Required
description: "Meta description"        # Required
coverImage: "relative/to/content.jpg"  # Optional — falls back to first image in body
schema: |                              # Optional — page-specific JSON-LD
  { "@type": "Product", ... }
publish: true                          # true | false | "2026-04-15T10:00:00Z" — default false
bodyClass: "custom-class"              # Optional
template: "default"                    # default | canvas | blank | blog

# Blog-specific (when template: blog)
author: "Author Name"
date: "2026-04-09"
category: "Category"
tags: ["tag1", "tag2"]
---
```

### Templates

| Template | Layout |
|----------|--------|
| `default` | Header, footer, title, breadcrumb |
| `canvas` | Header, footer only |
| `blank` | Completely empty — no chrome |
| `blog` | Header, footer, title, author, date, category, tags |

Templates, styles, and schemas live in their own dedicated directories (not in `/content/`).

### Schema (JSON-LD)

Schema is layered and additive:
1. **Common schemas** (Organization, Person) — applied to all pages
2. **Template-specific schema** — appended based on template type
3. **Content-specific schema** — appended from frontmatter `schema` field

## Caching & Performance

### MDX Compilation Caching

- Check MDX file `mtime` (last modified timestamp) before recompiling
- Only recompile/re-render if the file has changed since last compilation
- Cache compiled MDX output for reuse

### Route-Level Caching

- **Direct/static pages**: Statically cached at build time (SSG)
- **Param-based pages**: Request-level caching — first visitor triggers render, subsequent visitors get cached response
- All routes must use full route resolution (no partial routing)

### Performance Targets

- Optimize for high Google PageSpeed scores
- Minimize JavaScript bundle size
- Use proper image optimization (Next.js Image component or equivalent)
- Implement proper code splitting

## SEO Standards

### Meta & Open Graph

- Generate comprehensive `<head>` metadata from frontmatter: `title`, `description`, `coverImage`
- Include Open Graph tags (`og:title`, `og:description`, `og:image`, etc.)
- Include Twitter Card tags
- Include canonical URLs
- If `coverImage` is not set, extract the first image from the MDX body as the OG image

### Accessibility & SEO Attributes

- **Images**: If `alt` is missing, use the content `title`. If `title` attribute is missing, use the `alt` text
- **Links**: All `<a>` tags must have a `title` attribute
- Use semantic HTML (`<article>`, `<nav>`, `<main>`, `<section>`, etc.)
- Proper heading hierarchy (single `<h1>` per page)

### Publishing

- `publish: false` — content is not rendered or accessible (default)
- `publish: true` — content is live
- `publish: "2026-04-15T10:00:00Z"` — scheduled publishing, auto-publishes at the specified date/time

## Build & Dev

Use VS Code tasks (defined in `.vscode/tasks.json`) instead of running terminal commands directly:

- **Dev server**: Run the `dev` task (`bun run dev`)
- **Build**: Run the `build` task (`bun run build`) — this is the default build task
- **Lint**: Run the `lint` task (`bun run lint`)

## Conventions

- Use `bun` for all package management (`bun install`, `bun add`, `bun run`)
- Use `bunx` instead of `npx`
- Prefer named exports over default exports
- Use absolute imports with path aliases (e.g., `@/components/...`)
- No inline styles — all styling through SCSS BEM class names
- Environment variables: only deployment-related values in `.env`; site configuration in a root JSON config file
- smaller files with focused responsibilities; avoid large monolithic files
- Max page container width: 1600px
- Use `rem` units for all sizing in CSS
- Define CSS variables in a global SCSS file and use them throughout the stylesheets
