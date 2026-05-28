import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: ElementType;
  /** page = 1400px max. */
  width?: "page" | "wide" | "narrow" | "prose";
  className?: string;
  children: ReactNode;
  id?: string;
};

const widths: Record<NonNullable<ContainerProps["width"]>, string> = {
  page: "max-w-page",
  wide: "max-w-6xl",
  narrow: "max-w-3xl",
  prose: "max-w-2xl",
};

/** Centered, gutter-padded content wrapper. Max page width is 1400px. */
export function Container({
  as: Tag = "div",
  width = "page",
  className,
  children,
  id,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={cn("mx-auto w-full px-6 sm:px-8", widths[width], className)}
    >
      {children}
    </Tag>
  );
}
