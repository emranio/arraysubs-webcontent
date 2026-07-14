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
  { label: "ArraySubs", href: "/deals/arraysubs/", badge: "Pro" },
  { label: "Features", href: "/deals/arraysubs/features/" },
  { label: "Use Cases", href: "/deals/arraysubs/use-cases/" },
  { label: "Compare", href: "/deals/arraysubs/alternatives/" },
  {
    label: "Resources",
    href: "/deals/arraysubs/resources/",
    children: [
      { label: "Changelog", href: "/changelog/" },
      { label: "Roadmap", href: "/roadmap/" },
      { label: "Useful articles", href: "/deals/arraysubs/resources/" },
      {
        label: "Knowledge",
        href: "https://support.arrayhash.com/",
        external: true,
      },
      {
        label: "User portal login",
        href: "https://user-portal.arrayhash.com/",
        external: true,
        accent: "primary",
      },
    ],
  },
  { label: "Trust Center", href: "/trust-center/" },
];
