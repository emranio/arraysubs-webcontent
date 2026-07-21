import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type MediaFeatureProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  points?: ReactNode[];
  actions?: ReactNode;
  media: ReactNode;
  reverse?: boolean;
  headingLevel?: 2 | 3;
  className?: string;
};

type ProductScreenshotProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: ReactNode;
  className?: string;
  imageClassName?: string;
  eager?: boolean;
};

/**
 * Reusable benefit + visual composition for product-led landing pages.
 * The content remains first in the DOM at every breakpoint; `reverse` only
 * changes the desktop presentation order.
 */
export function MediaFeature({
  eyebrow,
  title,
  description,
  points,
  actions,
  media,
  reverse = false,
  headingLevel = 2,
  className,
}: MediaFeatureProps) {
  const Heading = headingLevel === 3 ? "h3" : "h2";

  return (
    <div
      className={cn(
        "grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20",
        className,
      )}
    >
      <div className={cn("min-w-0", reverse && "lg:order-2")}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading className="mt-4 font-display text-4xl leading-tight text-balance sm:text-display-sm">
          {title}
        </Heading>
        <div className="mt-6 text-lg leading-8 text-muted text-pretty">
          {description}
        </div>

        {points && points.length > 0 && (
          <ul className="mt-7 flex flex-col gap-3">
            {points.map((point, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <Check
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-primary"
                />
                <span className="text-muted text-pretty">{point}</span>
              </li>
            ))}
          </ul>
        )}

        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </div>

      <div className={cn("min-w-0", reverse && "lg:order-1")}>{media}</div>
    </div>
  );
}

/** Flat, un-cropped frame for real product screenshots and their proof note. */
export function ProductScreenshot({
  src,
  alt,
  width,
  height,
  caption,
  className,
  imageClassName,
  eager = false,
}: ProductScreenshotProps) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card p-2 sm:p-3",
        className,
      )}
    >
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={cn("h-auto w-full", imageClassName)}
        />
      </div>
      {caption && (
        <figcaption className="px-2 pt-3 pb-1 text-sm leading-6 text-faint sm:px-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
