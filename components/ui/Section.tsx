import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Surface =
  | "default"
  | "surface"
  | "primary"
  | "dark"
  | "highlight"
  | "transparent";
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
  default:
    "text-foreground [--section-bg:var(--color-background)] [--color-card:var(--color-surface)]",
  surface:
    "text-foreground [--section-bg:var(--color-surface)] [--color-card:var(--color-background)]",
  primary:
    "text-on-dark on-dark [--section-bg:var(--color-primary)] [--color-card:var(--color-background)]",
  dark:
    "text-on-dark on-dark [--section-bg:var(--color-dark)] [--color-card:var(--color-background)]",
  highlight:
    "text-dark [--section-bg:var(--color-highlight)] [--color-card:var(--color-background)]",
  transparent: "text-inherit [--section-bg:transparent]",
};

const scrollBgCardSurfaces: Record<ScrollBg, string> = {
  light: "[--color-card:var(--color-surface)]",
  surface: "[--color-card:var(--color-background)]",
  dark: "[--color-card:var(--color-background)]",
  highlight: "[--color-card:var(--color-background)]",
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
      data-section-surface={surface}
      data-surface={surface === "dark" || surface === "primary" ? "dark" : undefined}
      data-scroll-bg={scrollBg}
      className={cn(
        "section-surface",
        surfaces[surface],
        surface === "transparent" && scrollBg && scrollBgCardSurfaces[scrollBg],
        spacings[spacing],
        className,
      )}
      {...aria}
    >
      {children}
    </Tag>
  );
}
