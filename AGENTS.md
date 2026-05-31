# AGENTS.md

Guidance for AI agents (and humans) working in this repository. Read this
before adding pages or components. Pair it with [DESIGN.md](./DESIGN.md) for the
visual system.

---

## What this is

The marketing site for **ArraySubs** — a free, all-in-one WooCommerce
subscription & membership plugin — built on the umbrella brand **ArrayHash**
(`arrayhash.com`). It is a brand-new **Next.js** app that is being built design
system first.

**Current stage:** only one page exists — the **Design System** at `/`
(`app/page.tsx`). It is a living catalog of every reusable element. We polish the
system here before building the real marketing pages. The design-system route is
`noindex` and will be replaced by the real homepage later.

Marketing copy, SEO keywords, the full site map and page strategy live in
[`marketing-materials/`](./marketing-materials/) — read those when building real
pages.

---

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) + SCSS modules |
| Animation | GSAP 3 (+ ScrollTrigger) via `@gsap/react` |
| Icons | `lucide-react` |
| Language | TypeScript (strict) |
| Class utility | `clsx` + `tailwind-merge` → `cn()` |

## Commands

```bash
npm run dev        # start dev server (http://localhost:3000)
npm run build      # production build (also type-checks)
npm run typecheck  # tsc --noEmit
```

> Note: the npm cache had root-owned files from an old npm bug. If `npm install`
> fails with `EACCES` on `~/.npm`, install with a fresh cache:
> `npm install --cache /tmp/arrayhash-npm-cache`.

---

## Directory map

```
app/
  layout.tsx        Root layout: fonts, metadata, providers, header/footer, skip link
  page.tsx          The Design System page (temporary homepage, noindex)
  globals.css       Tailwind v4 import + @theme design tokens + base layer
  robots.ts         robots.txt
  sitemap.ts        sitemap.xml
components/
  ui/               Reusable UI library (see DESIGN.md). Barrel: components/ui/index.ts
  ui/form/          Form primitives (Field, Input, Select, Textarea, Checkbox, Range, LeadForm)
  animation/        GSAP effects: CustomCursor, Magnetic, ScrollReveal, ScrollBackground
  layout/           SiteHeader, SiteFooter
  seo/              JsonLd component
lib/
  cn.ts             className merge helper
  site.ts           Central site config (name, url, brand, description…)
  seo.ts            createMetadata() + JSON-LD schema builders
  gsap.ts           GSAP registration + reduced-motion / pointer helpers
styles/
  _mixins.scss      Shared SCSS mixins (breakpoints, reduced-motion, visually-hidden)
```

Import alias: `@/*` → repo root (e.g. `@/components/ui`, `@/lib/seo`).

---

## Non-negotiable conventions

1. **Light mode only.** No dark-mode variants. (Dark *sections* exist via the
   `dark` surface, but there is no theme toggle.)
2. **rem everywhere.** Never hard-code `px`. Tailwind's spacing/size scale is rem;
   in SCSS and inline styles use rem. `1rem = 16px`.
3. **1400px max page width.** Wrap page content in `<Container>` (`max-w-page`).
4. **100% flat design.** No box-shadows, no gradients, no glows. Separate
   elements with **borders** and **surface colors**. (See DESIGN.md.)
   *Exception:* the sticky **header**, the desktop **mega menu**, and the
   **mobile fullscreen menu** use a frosted **backdrop-blur** background
   (`bg-background/80 backdrop-blur-md`) — the one place blur is allowed. Never
   add blur to content elements (cards, sections, etc.).
5. **Design tokens are the single source of truth** — defined in `app/globals.css`
   `@theme`. Use the generated utilities (`bg-primary`, `text-dark`,
   `text-display-lg`, `max-w-page`, `rounded-pill`…) or `var(--color-*)` in SCSS.
   Do not invent ad-hoc hex values in components.
6. **Components are generically named and 100% reusable.** Name by *what it is*
   (`Button`, `Accordion`, `IconCard`), never by where it's used. When the same
   element has multiple looks, expose a **`variant` prop named by the style**
   (`<Button variant="outline">`), not a new component.
7. **Fonts:** `font-display` (Funnel Display) for headings, `font-sans`
   (Funnel Sans) for body. Headings already default to Funnel Display.
8. **Card grid gaps.** *Separated* card grids — cards with their own rounded
   border (IconCard, OfferCard, StepCard) — use a tight `gap-[0.1875rem]` (3px)
   for columns and rows; never `gap-4`/`gap-6`. *Connected* card grids — square,
   borderless cells inside a `bg-border`-tinted, `overflow-hidden rounded-2xl`
   container (e.g. Tag cards) — use **`gap-px`** so each divider is a single
   crisp 1px hairline. Never use a thicker gap in a connected grid: 3px+ between
   square cells reads as a doubled border.
9. **1px borders on grid cards.** Card borders are always 1px (`border`), never
   `border-2`. With rule 8 this guarantees every grid divider is a single 1px
   line, never doubled.

## Accessibility (must pass)

- Semantic landmarks: one `<main id="main">`, `<header>`, `<footer>`, `<nav>` with
  `aria-label`. Keep a single `<h1>` per page; nest headings in order.
- Every interactive control is keyboard operable with a visible focus ring
  (handled globally via `:focus-visible`). Don't remove outlines.
- Accordions/Tabs/Sliders ship correct ARIA — reuse the components, don't rebuild.
- Forms: wrap controls in `<Field>` so label, description, error and
  `aria-describedby`/`aria-invalid` are wired automatically.
- **All motion respects `prefers-reduced-motion`.** GSAP helpers in `lib/gsap.ts`
  (`prefersReducedMotion`, `hasFinePointer`) gate every effect; CSS also clamps
  transitions/animations. Never add motion that ignores this.
- Maintain WCAG AA contrast. Dark text (`--color-foreground`) on light; the
  purple `primary`/`primary-strong` are **backgrounds with on-dark text**.
  `highlight` is a light tint that uses dark text.

## Motion patterns (GSAP)

Reuse the building blocks in `components/animation/`:

- `CustomCursor` (mouse-follow dot+ring, mix-blend) — mounted once in layout.
- `Magnetic` — wrap a button/element for the magnet pull. `<Button magnetic>` does this.
- `ScrollReveal` — fade/rise on scroll; supports `stagger` for children.
- `ScrollBackground` — page bg/text color tween; opt a section in with
  `<Section surface="transparent" scrollBg="dark">`.
- `BigText` — oversized heading whose text "inks in" on scroll.
- `Hero` — landing hero with cursor parallax.

Register plugins via `registerGsap()` inside an effect — never at module top level.

## SEO / GEO

- Per-page metadata: `export const metadata = createMetadata({ title, description, path, noindex? })` from `lib/seo.ts`.
- Structured data: build with `organizationSchema()`, `websiteSchema()`,
  `softwareApplicationSchema()`, `breadcrumbSchema()`, `faqSchema()` and render via
  `<JsonLd data={…} />`. Add `FAQPage` JSON-LD to any FAQ section.
- **Breadcrumbs vs Hero:** inner pages get `<Breadcrumbs>` (emits BreadcrumbList
  JSON-LD). The homepage and product landing pages get a `<Hero>` and **no
  breadcrumb**.
- Update `app/sitemap.ts` when a new indexable page ships.
- Write quotable, direct-answer copy and use comparison tables / definition
  blocks — the content strategy targets AI answer engines (see marketing-materials).

## Brand facts

- Product is always written **ArraySubs** (one word). Umbrella site is **ArrayHash**.
- URL structure: product pages under `/deals/arraysubs/`, trust/legal under
  `/trust-center/`. `arrayhash.com/` will redirect to the product landing.
- Primary CTA copy: **"Get Pro — Free [No Strings Attached]"**; secondary: **"Live Demo"**.
  Early-access offer: 4 months of Pro free, no credit card. No pricing tables during
  the early-access phase.
- Support email: `emran@arraysubs.com`. Docs/support live at
  `support.arrayhash.com`. **Do not reference a GitHub repo anywhere.**

## Do / Don't

- ✅ Add new looks as `variant` props; extend `@theme` tokens for new colors.
- ✅ Keep components presentational and reusable; pass content via props/children.
- ✅ Test real UI in the browser (golden path + keyboard + reduced motion) before
  claiming done.
- ❌ No shadows/gradients/blurs (flat design).
- ❌ No `px` literals, no inline hex, no second component for a style variant.
- ❌ Don't add a theme toggle or dark mode.
- ❌ Don't mention a GitHub repository.
