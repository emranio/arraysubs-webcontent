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
type Size = "xs" | "sm" | "md" | "lg";
type Layers = "3layer" | "2layer";

type OwnProps = {
  variant?: Variant;
  size?: Size;
  /** 2layer removes the rear shadow layer; use on primary-colored sections. */
  layers?: Layers;
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

const variants: Record<
  Variant,
  { shadow: string; edge: string; front: string }
> = {
  primary: {
    shadow: "bg-primary/25",
    edge: "bg-primary-strong",
    front: "bg-primary text-on-dark",
  },
  dark: {
    shadow: "bg-dark/25",
    edge: "bg-dark-edge",
    front: "bg-dark text-on-dark",
  },
  highlight: {
    shadow: "bg-primary/20",
    edge: "bg-primary",
    front: "bg-highlight text-dark",
  },
  outline: {
    shadow: "bg-border/80",
    edge: "bg-border-strong",
    front:
      "border border-b-0 border-border-strong [border-style:groove] bg-background text-primary",
  },
  ghost: {
    shadow: "bg-border/50",
    edge: "bg-border",
    front: "bg-background text-foreground",
  },
};

const sizes: Record<Size, string> = {
  xs: "px-4 py-2 text-sm",
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  layers = "3layer",
  magnetic = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const tone = variants[variant];
  const isTwoLayer = layers === "2layer";

  const classes = cn(
    "group relative inline-flex cursor-pointer rounded-pill border-0 bg-transparent p-0 font-semibold whitespace-nowrap outline-none select-none",
    "disabled:pointer-events-none disabled:opacity-60",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
    isTwoLayer && "button-2layer",
    fullWidth && "w-full",
    className,
  );

  const inner = (
    <>
      {!isTwoLayer && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 translate-y-[0.125rem] rounded-pill transition-transform duration-[600ms] [transition-timing-function:cubic-bezier(0.3,0.7,0.4,1)]",
            "group-hover:translate-y-1 group-hover:duration-[250ms] group-hover:[transition-timing-function:cubic-bezier(0.3,0.7,0.4,1.5)]",
            "group-active:translate-y-[0.0625rem] group-active:duration-[34ms]",
            tone.shadow,
          )}
        />
      )}
      <span
        aria-hidden="true"
        className={cn("absolute inset-0 rounded-pill", tone.edge)}
      />
      <span
        className={cn(
          "relative flex items-center justify-center gap-2 rounded-pill transition-transform duration-[600ms] [transition-timing-function:cubic-bezier(0.3,0.7,0.4,1)] -translate-y-1",
          "group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-hover:[transition-timing-function:cubic-bezier(0.3,0.7,0.4,1.5)]",
          "group-active:-translate-y-0.5 group-active:duration-[34ms]",
          sizes[size],
          tone.front,
          fullWidth && "w-full",
        )}
      >
        {iconLeft && (
          <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:-translate-x-1">
            {iconLeft}
          </span>
        )}
        <span className="select-none">{children}</span>
        {iconRight && (
          <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:translate-x-1">
            {iconRight}
          </span>
        )}
      </span>
    </>
  );

  const element =
    rest.href !== undefined ? (
      <Link
        className={classes}
        data-button-layers={layers}
        {...(rest as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </Link>
    ) : (
      <button
        className={classes}
        data-button-layers={layers}
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
