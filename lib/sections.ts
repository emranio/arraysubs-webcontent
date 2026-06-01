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
      { label: "Color", href: "#foundations" },
      { label: "Typography", href: "#typography" },
      { label: "Big text", href: "#big-text" },
    ],
  },
  {
    title: "Components",
    items: [
      { label: "Buttons", href: "#components" },
      { label: "Section titles & icon cards", href: "#cards" },
      { label: "Offer cards", href: "#offer-cards" },
      { label: "Step cards", href: "#step-cards" },
      { label: "Tag cards", href: "#tag-cards" },
      { label: "Accordion & Tabs", href: "#accordion" },
      { label: "Slider", href: "#slider" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Manifesto", href: "#manifesto" },
      { label: "Statement", href: "#statement" },
    ],
  },
  {
    title: "Forms",
    items: [
      { label: "Controls", href: "#forms" },
      { label: "Lead capture", href: "#lead-capture" },
      { label: "Multi-step", href: "#multistep" },
    ],
  },
  {
    title: "Motion",
    items: [
      { label: "Tone sequence", href: "#scroll-bg" },
      { label: "Get Pro — Free", href: "#cta" },
    ],
  },
];
