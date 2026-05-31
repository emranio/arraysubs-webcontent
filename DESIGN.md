# DESIGN.md — ArrayHash Design System

The visual language and component contract for the site. Tokens live in
`app/globals.css` (`@theme`); the live reference is the Design System page at `/`.

## Principles

- **Flat.** No shadows, gradients, blurs or glows. Use borders + surface colors.
- **Light mode only.** Dark *sections* exist; there is no theme switch.
- **rem-based & responsive.** `1rem = 16px`. Display sizes scale fluidly with `clamp()`.
- **Accessible by default.** WCAG AA contrast, full keyboard support, `prefers-reduced-motion` honored.
- **Reusable.** Generic component names; styles selected via `variant` props.
- **Max content width 1400px** via `<Container>`.

---

## Color

All colors are CSS custom properties; Tailwind generates `bg-*`, `text-*`,
`border-*` utilities from them. Opacity modifiers work (`bg-primary/15`).

### Brand
| Token | Hex | Utility | Use |
| --- | --- | --- | --- |
| `--color-highlight` | `#e1ff51` | `*-highlight` | Bright accent / marker, badges, hero shape |
| `--color-primary` | `#c2e82e` | `*-primary` | Primary action color (deeper highlight) |
| `--color-primary-strong` | `#a9d016` | `*-primary-strong` | Primary hover/active |
| `--color-dark` | `#01171a` | `*-dark` | Text, dark sections, dark buttons |
| `--color-dark-2` | `#013b43` | `*-dark-2` | Elevated surface on dark |

### Neutral (light)
| Token | Hex | Use |
| --- | --- | --- |
| `--color-background` | `#ffffff` | Page background |
| `--color-surface` | `#f5f8f2` | Subtle section / card surface |
| `--color-surface-2` | `#eef2e8` | Deeper surface (segmented controls) |
| `--color-foreground` | `#01171a` | Body + heading text |
| `--color-muted` | `#4a5f63` | Secondary text (AA on white) |
| `--color-faint` | `#7c8f92` | Tertiary text, placeholders, code labels |
| `--color-border` | `#e3e9e3` | Default borders |
| `--color-border-strong` | `#c9d3cb` | Emphasized borders |

### On dark
`--color-on-dark` `#f1f7f1` · `--color-on-dark-muted` `#9fb6b8` ·
`--color-on-dark-border` `#14474f`. Apply the `on-dark` class (or `Section
surface="dark"`) so the focus ring switches to highlight.

### Feedback
`--color-danger` `#c2362b` · `--color-success` `#1f7a4d`.

**Contrast rules:** `highlight`, `primary` and `primary-strong` are light — only
use them as **backgrounds with dark text**, never as text on white. Dark sections
use `on-dark` text.

---

## Typography

- **Display / headings:** Funnel Display → `font-display`.
- **Body:** Funnel Sans → `font-sans` (default on `<body>`).
- Headings default to Funnel Display, weight 600, tight tracking, balanced wrap.

### Display scale (fluid, `clamp()`)
| Utility | Range |
| --- | --- |
| `text-display-xl` | 3.75 → 10.5rem |
| `text-display-lg` | 3.25 → 7rem |
| `text-display` | 2.75 → 5rem |
| `text-display-sm` | 2.25 → 3.25rem |

### Text scale (fixed rem)
`text-xs` 0.75 · `text-sm` 0.875 · `text-base` 1 · `text-lg` 1.125 ·
`text-xl` 1.25 · `text-2xl` 1.5 · `text-3xl` 1.875 · `text-4xl` 2.25 …up to `text-6xl`.

Body copy is `text-base`/`text-lg`; secondary text adds `text-muted`. Use
`marker-highlight` for a lime highlighter bar behind inline text.

---

## Layout, radii, motion

- **Container:** `<Container width="page|wide|narrow|prose">`. `page` = `max-w-page` (1400px), gutters `px-6 sm:px-8`.
- **Section:** `<Section surface spacing scrollBg>` — surfaces `default|surface|dark|highlight|transparent`; spacing `sm|md|lg`.
- **Radii:** `rounded-{xs,sm,md,lg,xl,2xl}` (0.375 → 2rem) and `rounded-pill`.
- **Motion tokens:** `--ease-out-expo`, `--ease-in-out-smooth`. All GSAP/CSS motion is disabled under `prefers-reduced-motion`.

---

## Components

Import from the barrel: `import { Button, SectionTitle, … } from "@/components/ui"`.

| Component | Key props | Notes |
| --- | --- | --- |
| `Container` | `as`, `width` | Centered 1400px wrapper |
| `Section` | `surface`, `spacing`, `scrollBg`, `as` | Semantic section + surface theme |
| `SectionTitle` | `eyebrow`, `title`, `subtitle`, `align`, `as`, `size` | Eyebrow + heading + sub text |
| `Eyebrow` | `withLine` | Uppercase label |
| `Button` | `variant` (`primary`/`dark`/`highlight`/`outline`/`ghost`), `size` (`xs/sm/md/lg`), `magnetic`, `href`, `iconLeft/Right`, `fullWidth` | Renders `<button>` or Next `<Link>` |
| `Badge` | `tone` (`neutral/primary/dark/highlight/outline`) | Free/Pro/New pills |
| `Breadcrumbs` | `items`, `withSchema` | Inner pages only; emits BreadcrumbList JSON-LD |
| `IconCard` | `icon`, `title`, `description`, `href`, `badge` | Becomes a link when `href` set |
| `OfferCard` | `number`, `badge`, `title`, `eyebrow`, `description`, `metaLabel`, `metaValue`, `metaSuffix`, `featured`, `href` | Numbered tier/offer card with eyebrow + footer stat + arrow CTA |
| `CTA` | `surface`, `eyebrow`, `title`, `subtitle`, `actions`, `microcopy` | Reusable CTA band |
| `Hero` | `eyebrow`, `title`, `subtitle`, `actions`, `trust`, `media`, `headingLevel` | Landing hero, cursor parallax, no breadcrumb |
| `Manifesto` | `lines`, `description` | Dark editorial feature statement: big mixed-color text + inline pills |
| `BigText` | `size`, `variant` (`ink/highlight/primary`), `align`, `as` | Scroll-fill display heading |
| `Accordion` | `items`, `allowMultiple`, `defaultOpen` | ARIA disclosure, animated, `inert` when closed |
| `Tabs` | `tabs`, `defaultIndex`, `label` | ARIA tabs, arrow-key nav, fade panel |
| `Slider` | `children`, `label` | Scroll-snap carousel + labelled controls |
| `Testimonials` | `items`, `label` | Single-quote review carousel with avatar, 5-star rating + prev/next |

### Forms (`@/components/ui` → form primitives)
All controls are **custom-designed** (no native browser appearance) and accessible:

- `Field` — label + description + error + ARIA wiring (`aria-labelledby/describedby/invalid/required`).
- `Input`, `Textarea`, `Range` — text + range inputs.
- `Checkbox`, `Radio`, `RadioGroup` — custom box/circle via the `peer` pattern.
- `Switch` — `role="switch"` toggle (controlled or uncontrolled).
- `Select` — custom single-select listbox combobox (full keyboard nav).
- `Multiselect` — custom multi-select listbox (`aria-multiselectable`).
- `LeadForm` — validated lead-capture demo.
- `MultiStepForm` — multi-step flow with an accessible stepper + focus management.

`Select`/`Multiselect`/`RadioGroup` take `options={{label,value}[]}` and support
controlled (`value`/`onChange`) or uncontrolled (`defaultValue`) use. Wrap
single controls in `<Field>`; `Checkbox`/`Radio`/`Switch` carry their own label.

```tsx
<Field label="Work email" required error={err} description="We'll send your key here.">
  <Input type="email" name="email" />
</Field>
```

### Variant naming rule
One component, many looks. Add a new look as a `variant` value named by its
style — never a second component. Example: a new "soft" button is
`<Button variant="soft">`, defined in the `variants` map in `Button.tsx`.

---

## Accessibility checklist (per page)

- [ ] Exactly one `<h1>`; headings nested in order.
- [ ] Content inside landmarks (`main`, `header`, `footer`, labelled `nav`).
- [ ] All controls keyboard reachable; focus ring visible (don't disable outlines).
- [ ] Inner page has `<Breadcrumbs>`; homepage/landing has `<Hero>` (no breadcrumb).
- [ ] Forms use `<Field>`; errors use `role="alert"`; success uses `role="status"`.
- [ ] Images have `alt`; decorative elements are `aria-hidden`.
- [ ] AA contrast; lime colors only as backgrounds with dark text.
- [ ] Motion gated by `prefers-reduced-motion`.
- [ ] FAQ sections include `FAQPage` JSON-LD.

## Adding a new component

1. Create it in `components/ui/` (or `ui/form/`), generically named, presentational.
2. Use design tokens only (utilities or `var(--token)`); keep it flat; rem sizing.
3. Expose looks via a `variant` prop; type props explicitly.
4. Wire ARIA + keyboard if interactive; gate any motion on reduced-motion.
5. Export it from `components/ui/index.ts`.
6. Add a demo to the Design System page (`app/page.tsx`).
