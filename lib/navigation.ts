export type NavItem = {
  label: string;
  href: string;
  badge?: string;
};

export const HEADER_NAV_ITEMS: NavItem[] = [
  { label: "ArraySubs", href: "/deals/arraysubs/", badge: "Pro" },
  { label: "Features", href: "/deals/arraysubs/features/" },
  { label: "Use Cases", href: "/deals/arraysubs/use-cases/" },
  { label: "Compare", href: "/deals/arraysubs/alternatives/" },
  { label: "Trust Center", href: "/trust-center/" },
];
