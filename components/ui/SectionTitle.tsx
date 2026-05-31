import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type Align = "left" | "center";
type Size = "sm" | "md" | "lg" | "display";

type SectionTitleProps = {
  /** Optional small label above the title. */
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Supporting sub text below the title. */
  subtitle?: ReactNode;
  align?: Align;
  /** Heading level — choose for correct document outline (default h2). */
  as?: ElementType;
  size?: Size;
  id?: string;
  className?: string;
  titleClassName?: string;
};

const sizes: Record<Size, string> = {
  sm: "text-2xl sm:text-3xl",
  md: "-ml-[3px] text-3xl sm:text-4xl",
  lg: "-ml-[3px] text-4xl sm:text-display-sm",
  display: "text-display-sm sm:text-display",
};

/** Composed heading block: eyebrow + title + sub text. */
export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as: Heading = "h2",
  size = "lg",
  id,
  className,
  titleClassName,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading
        id={id}
        className={cn("font-display text-balance", sizes[size], titleClassName)}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            "text-lg text-muted text-pretty sm:text-xl",
            align === "center" ? "max-w-2xl" : "max-w-xl",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
