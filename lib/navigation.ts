export type NavLink = {
  label: string;
  href: string;
  badge?: string;
  external?: boolean;
  accent?: "primary";
};

export type NavItem = NavLink & {
  children?: NavLink[];
};

export const HEADER_NAV_ITEMS: NavItem[] = [
  { label: "ArraySubs", href: "/product/arraysubs/", badge: "Pro" },
  { label: "Features", href: "/product/arraysubs/features/" },
  { label: "Use Cases", href: "/product/arraysubs/use-cases/" },
  { label: "Compare", href: "/product/arraysubs/alternatives/" },
  { label: "Pricing Plans", href: "/product/arraysubs/pricing/" },
  {
    label: "Resources",
    href: "/articles/",
    children: [
      { label: "Changelog", href: "/changelog/" },
      { label: "Roadmap", href: "/roadmap/" },
      { label: "Useful Articles", href: "/articles/" },
      {
        label: "Documentations",
        href: "https://support.arrayhash.com/",
        external: true,
      },
      {
        label: "User Portal Login",
        href: "https://user-portal.arrayhash.com/",
        external: true,
        accent: "primary",
      },
    ],
  },
  { label: "Trust Center", href: "/trust-center/" },
];
