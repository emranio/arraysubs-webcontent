import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Surface = "default" | "surface" | "dark" | "highlight" | "transparent";
type Spacing = "none" | "sm" | "md" | "lg";
type ScrollBg = "light" | "surface" | "dark" | "highlight";

type SectionProps = {
  as?: ElementType;
  /** Visual surface. `transparent` inherits color (use with scrollBg bands). */
  surface?: Surface;
  spacing?: Spacing;
  /** Opt the section into the scroll-driven page background transition. */
  scrollBg?: ScrollBg;
  id?: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

const surfaces: Record<Surface, string> = {
  default: "bg-background text-foreground",
  surface: "bg-surface text-foreground",
  dark: "bg-dark text-on-dark on-dark",
  highlight: "bg-highlight text-dark",
  transparent: "text-inherit",
};

const spacings: Record<Spacing, string> = {
  none: "",
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-20 sm:py-28 lg:py-32",
};

/** Semantic, full-bleed section with a surface theme and vertical rhythm. */
export function Section({
  as: Tag = "section",
  surface = "default",
  spacing = "lg",
  scrollBg,
  id,
  className,
  children,
  ...aria
}: SectionProps) {
  return (
    <Tag
      id={id}
      data-surface={surface === "dark" ? "dark" : undefined}
      data-scroll-bg={scrollBg}
      className={cn(surfaces[surface], spacings[spacing], className)}
      {...aria}
    >
      {children}
    </Tag>
  );
}
