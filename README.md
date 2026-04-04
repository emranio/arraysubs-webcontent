# ArraySubs Website

Static-first Next.js marketing site for `arraysubs.com`.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Output

- Production export goes to `out/`
- Safe for static hosting on R2
- No dynamic image resizing is used

## Layouts

- `CanvasLayout` — header, footer, blank content container
- `DefaultLayout` — same shell plus page title and breadcrumb

## SEO helpers

Use `buildMetadata()` from `src/lib/seo.js` and pass optional schema objects into the page layout component.
