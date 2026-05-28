"use client";

import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { Magnetic } from "@/components/animation/Magnetic";

/** Style variants are named by their look, per the design-system convention. */
type Variant = "primary" | "dark" | "highlight" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type OwnProps = {
  variant?: Variant;
  size?: Size;
  /** Enable the GSAP "magnet" pull on hover (fine-pointer devices only). */
  magnetic?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonProps = OwnProps &
  (
    | ({ href: string } & Omit<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        keyof OwnProps | "href"
      >)
    | ({ href?: undefined } & Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        keyof OwnProps
      >)
  );

const variants: Record<Variant, string> = {
  primary: "bg-primary text-dark hover:bg-primary-strong",
  dark: "bg-dark text-on-dark hover:bg-dark-2",
  highlight: "bg-highlight text-dark hover:bg-primary",
  // outline + ghost inherit currentColor, so they adapt to light/dark surfaces.
  outline: "border-2 border-current hover:bg-current/10",
  ghost: "hover:bg-current/10",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-base",
  lg: "h-14 px-8 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  magnetic = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const motion = magnetic
    ? "transition-colors duration-200 ease-out"
    : "transition-[transform,background-color,border-color,color] duration-200 ease-out hover:-translate-y-0.5";

  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-pill font-semibold whitespace-nowrap select-none",
    "disabled:pointer-events-none disabled:opacity-50",
    motion,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  const inner = (
    <>
      {iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && (
        <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:translate-x-1">
          {iconRight}
        </span>
      )}
    </>
  );

  const element =
    rest.href !== undefined ? (
      <Link
        className={classes}
        {...(rest as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </Link>
    ) : (
      <button
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {inner}
      </button>
    );

  if (!magnetic) return element;
  return (
    <Magnetic className={fullWidth ? "w-full" : undefined}>{element}</Magnetic>
  );
}
