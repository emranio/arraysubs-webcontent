/**
 * Categorized index of every section on the design-system page.
 * Both the desktop mega menu and the mobile fullscreen menu render from this.
 */
export type SectionItem = { label: string; href: string };
export type SectionCategory = { title: string; items: SectionItem[] };

export const SECTIONS: SectionCategory[] = [
  {
    title: "Foundations",
    items: [
      { label: "Color", href: "/design-system/#foundations" },
      { label: "Typography", href: "/design-system/#typography" },
      { label: "Big text", href: "/design-system/#big-text" },
    ],
  },
  {
    title: "Components",
    items: [
      { label: "Buttons", href: "/design-system/#components" },
      { label: "Section titles & icon cards", href: "/design-system/#cards" },
      { label: "Offer cards", href: "/design-system/#offer-cards" },
      { label: "Step cards", href: "/design-system/#step-cards" },
      { label: "Tag cards", href: "/design-system/#tag-cards" },
      { label: "Accordion & Tabs", href: "/design-system/#accordion" },
      { label: "Slider", href: "/design-system/#slider" },
      { label: "Testimonials", href: "/design-system/#testimonials" },
      { label: "Manifesto", href: "/design-system/#manifesto" },
      { label: "Statement", href: "/design-system/#statement" },
    ],
  },
  {
    title: "Forms",
    items: [
      { label: "Controls", href: "/design-system/#forms" },
      { label: "Lead capture", href: "/design-system/#lead-capture" },
      { label: "Multi-step", href: "/design-system/#multistep" },
    ],
  },
  {
    title: "Motion",
    items: [
      { label: "Tone sequence", href: "/design-system/#scroll-bg" },
      { label: "Get Pro — Free", href: "/design-system/#cta" },
    ],
  },
];
