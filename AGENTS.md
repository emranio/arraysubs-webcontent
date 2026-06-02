# AGENTS.md

Single source of truth for agents and humans working in this repository. There
is no separate design guide. Keep this file current when the design system
changes.

---

## Product Context

This is the ArrayHash marketing site for ArraySubs, a WooCommerce subscription
and membership product.

Current working routes:

- `/design-system/` - live catalog for the visual system, reusable components,
  motion patterns, forms, cards, surfaces and CTA treatments.
- `/default-page/` - baseline inner-page layout using the same `PageHero`
  treatment as the design-system page, plus standard page-width content.
- `/` - temporary placeholder until the real homepage ships.

Marketing copy, SEO keywords, sitemap strategy and page-specific content live in
`marketing-materials/`. Read those before building real marketing pages.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16, App Router, Turbopack |
| UI | React 19 |
| Styling | Tailwind CSS v4, CSS-first `@theme`, SCSS modules when needed |
| Animation | GSAP 3, ScrollTrigger, `@gsap/react` |
| Icons | `lucide-react` |
| Language | TypeScript strict |
| Class merging | `clsx` + `tailwind-merge` via `cn()` |

## Commands

```bash
npm run dev        # start dev server at http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # production build and type validation
```

If `npm install` fails with `EACCES` from old root-owned npm cache files, use:

```bash
npm install --cache /tmp/arrayhash-npm-cache
```

## Key Files

```txt
app/
  layout.tsx              Root layout, fonts, metadata, providers, header/footer
  globals.css             Tailwind import, @theme tokens, base layer
  design-system/page.tsx  Live design-system catalog
  default-page/page.tsx   Baseline inner-page example
  not-found.tsx           Light-only 404 page
components/
  ui/                     Reusable UI library, exported from components/ui/index.ts
  ui/form/                Field and custom form primitives
  animation/              GSAP helpers and page motion patterns
  layout/                 SiteHeader, MobileMenu, SiteFooter
  seo/                    JsonLd
lib/
  cn.ts                   Class merge helper
  colors.ts               Token mirror for JS and scroll backgrounds
  gsap.ts                 GSAP registration and motion guards
  navigation.ts           Header and mobile menu links
  seo.ts                  Metadata and JSON-LD helpers
  site.ts                 Site config
styles/
  _mixins.scss            Shared SCSS mixins
```

Use the `@/*` alias for repo-root imports.

---

## Absolute Rules

1. Light theme only. Do not add dark mode, theme toggles, `dark:` Tailwind
   variants, mode detectors, or `prefers-color-scheme` CSS. A `dark` surface is
   a fixed content treatment, not a user theme.
2. Use rem-based sizing. Do not hard-code `px` in components or SCSS. Tailwind
   arbitrary values must also be rem unless the existing API requires a unitless
   or CSS-native value.
3. Unless explicitly specified otherwise, every page title header must use the
   shared `PageHero` component. Do not create page-local hero/title-header
   markup.
4. Unless explicitly specified otherwise, every page content area must use
   `Container` with the design-system `max-w-page` width. Do not invent custom
   page-level max widths.
5. Flat design only. No CSS shadows, drop shadows, glows, glass cards,
   decorative blur, or decorative gradients. Separate surfaces with background
   tokens, borders, spacing and layout.
6. The only blur exceptions are the sticky header bar and mobile fullscreen
   menu: `bg-background/80 backdrop-blur-md` or the existing mobile-menu blur.
   Do not use blur on cards, content panels, sections, heroes, CTAs or forms.
7. Use tokens from `app/globals.css` and generated utilities such as
   `bg-primary`, `text-muted`, `border-border`, `max-w-page` and
   `rounded-pill`. Do not add inline hex values or ad hoc colors in components.
8. Components must be reusable and generically named by what they are. Add new
   looks with typed `variant`, `tone`, `surface` or `size` props instead of
   making page-specific duplicate components.
9. Import reusable UI from `@/components/ui`. Do not rebuild buttons, cards,
   tabs, accordions, breadcrumbs, form fields, containers or section headings in
   page files.
10. Card and panel groups must use one consistent tight gap:
    `gap-[0.1875rem]` for adjacent cards in the same visual group, including
    card grids, stacked cards and side-by-side card columns. Do not mix loose
    outer gaps with tight inner card gaps.
11. Preserve accessibility: one `h1` per page, semantic landmarks, labelled navs,
    visible focus rings, keyboard-operated controls, ARIA for interactive
    widgets and reduced-motion support.
12. Serve images directly from `public/` with root-relative URLs. Do not use
    `next/image`, image optimizer URLs, or any implementation that emits
    `/_next/image`; keep Next image optimization disabled globally.

---

## Page Assembly

Use this shape for ordinary inner pages unless a spec says otherwise:

```tsx
import { Container, PageHero, Section } from "@/components/ui";

export default function ExamplePage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Example", href: "/example/" },
        ]}
        eyebrow="Category"
        title="Example Page"
        subtitle="Short page summary in readable secondary copy."
      />

      <Section spacing="md">
        <Container>
          {/* page content */}
        </Container>
      </Section>
    </>
  );
}
```

Page rules:

- Use `PageHero` for the design-system intro treatment on every page by default:
  pale full-width auto-height surface, reduced vertical padding, top-aligned
  content, narrow left rail, mark/slash breadcrumb style, oversized purple title,
  intro copy, optional proof points and actions.
- Pass breadcrumb items to `PageHero`; do not manually render `Breadcrumbs` in
  page files unless a component-level exception is needed.
- Put content inside full-bleed `Section` bands, then `Container` inside each
  section.
- The default content width is `Container` width `page` (`max-w-page`, 100rem).
  Use `wide`, `narrow` or `prose` only for a specific local content reason, not
  as a page wrapper replacement.
- Do not place page sections inside card-like wrappers. Sections are full-width
  bands; cards are repeated content items or framed tools only.

## Layout And Surfaces

`Section` is the standard full-bleed band component.

Use `surface` intentionally:

- `default` - white page band. Its contextual `bg-card` becomes the purple-tint
  surface. Use for normal editorial content, text sections and card grids that
  need tinted cards.
- `surface` - pale purple band. Its contextual `bg-card` becomes white. Use to
  alternate pacing after white sections and to make dense component groups feel
  separated.
- `highlight` - light purple emphasis band with dark text. Use for lighter
  decision or offer moments.
- `primary` - saturated purple band with `text-on-dark`. Use for final CTA or
  high-priority action bands. Buttons on this surface should use
  `layers="2layer"`.
- `dark` - fixed dark-purple editorial surface with `text-on-dark`. Use
  sparingly for manifesto, risk, trust or high-focus storytelling sections.
- `transparent` with `scrollBg` - use only for scroll-driven tone sequences
  managed by `ScrollBackground`.

Surface pairing rules:

- Use `bg-card` for cards and panels so cards automatically invert correctly
  between white and tinted sections.
- Use `text-foreground` for primary text on light surfaces, `text-muted` for
  paragraph/supporting copy, and `text-faint` only for short labels, metadata and
  placeholders.
- On `primary` and `dark` surfaces, use `text-on-dark`,
  `text-on-dark-muted`, `border-on-dark-border` and the `on-dark` focus-ring
  context.
- Do not stack colored cards on colored sections unless the component already
  handles the contrast. Prefer contextual `bg-card`.

## Color Tokens

Brand tokens:

- `highlight` (`#EFE7FF`) - pale purple tint for soft surfaces, markers and
  light emphasis.
- `primary` (`#873EFF`) - main CTA/action color, icons, active states and
  saturated CTA surfaces.
- `primary-strong` (`#6F22E6`) - hover/active version of primary.
- `dark` (`#12002B`) - body text, dark sections and dark buttons.
- `dark-2` (`#321167`) - dark-surface secondary tone.

Neutral tokens:

- `background` - white page background.
- `surface` and `card` - contextual light-purple or white surfaces depending on
  the parent section.
- `foreground` - primary text.
- `muted` - readable secondary copy.
- `faint` - labels, placeholders and low-priority metadata.
- `border` and `border-strong` - separators and control/card outlines.

Feedback tokens:

- `danger` - validation and destructive/error text.
- `success` - success states.
- `gold` currently maps to primary purple for ratings.

Do not add a new color because one page feels different. First try existing
surface, card, border, text and badge combinations. Add a token only when the
design system needs a reusable semantic color.

## Typography

- Body font is `font-sans` (Funnel Sans). Headings use `font-display` (Funnel
  Display).
- Use existing text utilities and display tokens. Do not invent one-off
  viewport-based font sizing.
- Page titles use `PageHero`; its title style matches the design-system intro:
  huge purple `font-display` text starting at `text-6xl` and scaling through
  rem-based display sizes on larger screens.
- Large landing headlines in the current design-system intro can use explicit
  display-scale classes, but ordinary page headers should not duplicate that
  markup.
- Section headings use `SectionTitle` with `size="lg"` by default. Use `md` for
  two-column component demos and `display` only for major editorial moments.
- Body copy is usually `text-base`, `text-lg`, or `sm:text-xl` for leads. Use
  `leading-8` for long readable paragraphs.
- Use `text-muted` for paragraphs, subtitles and descriptions. Use `text-faint`
  only for short code labels, helper labels and metadata.
- Keep headings balanced with existing `text-balance`; keep paragraphs readable
  with `text-pretty`.
- Use `Eyebrow` for small section labels instead of hand-written uppercase label
  styling.

## Cards And Grids

The design system is flat and dense. Cards do not use shadows.

Use existing card components:

- `IconCard` - feature/module cards with icon, title, description, optional
  badge and optional whole-card link.
- `OfferCard` - tier/package/offer cards with sequence number, badge, eyebrow,
  description, stat and arrow CTA.
- `StepCard` - numbered process/how-it-works cards with large outlined numbers.
- `TagCard` - capability tiles with a tag pill; use `bare` when tiling in a
  connected-looking grid.
- `Testimonials` - full review carousel.
- `Slider` - scroll-snap carousel shell for repeated cards.

Grid rules:

- Separated card grids, stacked cards and side-by-side card columns use
  `gap-[0.1875rem]`. This is the established tight design-system rhythm and it
  must stay consistent across every adjacent card in the same visual group.
- Do not use loose `gap-4`, `gap-6`, `gap-8`, `gap-10` or larger spacing between
  cards unless the cards are not visually part of one group.
- Do not stagger or independently translate adjacent cards inside a tight card
  group. Reveal the group as one unit so the visible gap remains consistent
  during motion.
- Cards use `bg-card`, not hard-coded white/tint, so parent section surfaces
  control contrast.
- Card rounding is usually `rounded-xl` or `rounded-2xl`; compact controls use
  `rounded-md`; pills use `rounded-pill`.
- Card borders are at most `border` (1px) unless the existing form/control
  component intentionally uses `border-2` for an input indicator.
- Hover motion may translate cards slightly or change fills. It must remain
  simple, token-based and reduced-motion safe. Do not add shadows to hover
  states.
- Do not nest cards inside cards. If content needs grouping inside a card, use
  borders, dividers, spacing or typography.

## Buttons, Links And CTAs

Use `Button` for actions.

Button variants:

- `primary` - main action on light surfaces.
- `dark` - strong action, especially on light/highlight backgrounds.
- `highlight` - light-purple action with dark text.
- `outline` - secondary action.
- `ghost` - low-emphasis action.

Button rules:

- Buttons default to `layers="3layer"`. This uses flat token-colored layers, not
  CSS `box-shadow`.
- On `primary` sections or saturated CTA bands, use `layers="2layer"`.
- Use `magnetic` only on prominent CTAs or design-system demos, never on every
  tiny utility action.
- Use `iconLeft` and `iconRight` with `lucide-react` icons for clearer actions.
- Keep button text short enough to fit at mobile widths.
- Use `CTA` for repeated final-action bands. Use `flat` when the parent
  `Section surface` already owns the background.

## Forms

Use the form primitives exported from `@/components/ui`.

- Wrap standalone inputs in `Field` so label, description, error,
  `aria-describedby`, `aria-invalid` and required state are wired correctly.
- Use `Input`, `Textarea`, `Range`, `Checkbox`, `RadioGroup`, `Switch`,
  `Select`, `Multiselect`, `LeadForm` and `MultiStepForm` instead of native
  browser-default controls in page files.
- `Select` and `Multiselect` are custom accessible listbox controls. Do not
  replace them with native selects unless explicitly requested.
- Error text uses `danger`; success panels use `success` and appropriate live
  region behavior from the existing components.
- Do not add browser-default appearances, custom focus removal or unlabeled
  controls.

## Motion And Interaction

Motion must support the content, not decorate it.

Use existing helpers:

- `CustomCursor` - mounted once in layout.
- `Magnetic` - button hover pull; already integrated through `Button magnetic`.
- `ScrollReveal` - fade/rise reveal on scroll, with optional stagger.
- `ScrollBackground` - page background/text tone changes for sections with
  `surface="transparent"` and `scrollBg`.
- `BigText` - oversized scroll-fill text.
- `PageHero` - shared page-title header matching the design-system intro
  treatment.
- `Manifesto`, `Statement`, `Testimonials`, `Accordion`, `Tabs` and form
  controls already include their own interaction patterns.

Motion rules:

- Register GSAP only inside effects with `registerGsap()`. Never register at
  module top level.
- Gate pointer effects with `hasFinePointer()` and all animation with
  `prefersReducedMotion()`.
- Do not animate layout in a way that causes text overlap or content jumps.
- Do not auto-focus controls or headings on route load. Only move focus after a
  user-triggered step change, menu open, modal open or validation event.
- Keep durations modest and easing consistent with existing helpers.

## Header, Navigation And Footer

- Header navigation is a simple link list from `lib/navigation.ts`. Do not add a
  mega menu unless explicitly requested.
- The sticky header is allowed to use a frosted background and border. Keep it
  flat and compact.
- The mobile menu is a fullscreen dialog below `lg`, with trapped focus, Escape
  close and body-scroll lock.
- Header and footer content still use `Container`.
- Footer is a fixed dark surface with on-dark text and simple link columns.

## SEO And Content

- Use `createMetadata({ title, description, path, noindex? })` for page
  metadata.
- Use JSON-LD helpers from `lib/seo.ts`: `organizationSchema`,
  `websiteSchema`, `softwareApplicationSchema`, `breadcrumbSchema` and
  `faqSchema`.
- `PageHero` breadcrumbs emit breadcrumb JSON-LD by default. Set
  `withBreadcrumbSchema={false}` only for non-indexed utility pages such as 404.
- Update `app/sitemap.ts` when an indexable page ships.
- Use direct, answerable copy. Favor specific claims, comparison tables,
  definition blocks and FAQ sections where appropriate.
- Read `marketing-materials/` before writing real product, trust, comparison or
  support pages.

## Brand And Offer Facts

- Product name: `ArraySubs`.
- Umbrella brand: `ArrayHash`.
- Product pages live under `/deals/arraysubs/`.
- Trust/legal pages live under `/trust-center/`.
- Primary CTA: `Get ArraySubs Pro for 4 Months — Free`.
- Secondary CTA: `Live Demo`.
- Early-access offer: ArraySubs Pro for 4 months — Free, no credit card, no pricing table
  during the early-access phase.
- Support email: `emran@arraysubs.com`.
- Docs/support: `support.arrayhash.com`.
- Do not reference a GitHub repository in public marketing copy.

## Accessibility Checklist

Every page must satisfy:

- One `<main id="main">`.
- One `<h1>`, supplied by `PageHero` unless explicitly specified otherwise.
- Heading levels in order.
- `<header>`, `<footer>` and labelled `<nav>` landmarks.
- Visible `:focus-visible` ring; never remove outlines.
- Keyboard support for menus, tabs, accordions, sliders and form controls.
- Decorative elements marked `aria-hidden`.
- Images have useful `alt` text unless decorative.
- Forms use labels and announced errors/status messages.
- AA contrast across all surfaces.
- Motion respects reduced-motion settings.

## Build And Verification

Verification should scale with the risk of the change. Do not run
`npm run build` on every small iteration just because a UI file changed.

Before saying a UI task is done:

1. Run `npm run typecheck`.
2. Run `git diff --check`.
3. Verify affected pages in the browser at desktop and mobile widths.
4. Run `npm run build` only for new pages, route changes, metadata/sitemap
   changes, root layout/provider changes, shared component API changes, or
   changes with a realistic production-build risk. For small copy, spacing,
   styling and browser-comment fixes, skip build unless typecheck or browser
   verification exposes a production-only concern.
5. For new pages, check route load, header navigation, scroll position, one
   `h1`, `PageHero`, breadcrumbs, content container width and no console errors.
6. If build is intentionally skipped, mention that in the final response.

## Do Not Do

- Do not create another design guide file. Keep design-system instructions here.
- Do not use dark mode, theme toggles, mode detection or `prefers-color-scheme`.
- Do not use `px`, inline hex colors, CSS shadows, decorative gradients, glows
  or content blur.
- Do not create one-off page heroes, section title blocks, button styles, cards
  or form controls.
- Do not use large loose card-grid gaps for design-system card grids.
- Do not hide the native system pointer.
- Do not put cards inside cards.
- Do not add decorative blobs, orbs, bokeh, glass panels or glossy effects.
- Do not add a landing-page marketing wrapper when the task is to build an
  actual page, tool, form or component.
