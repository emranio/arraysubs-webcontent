import { cn } from "@/lib/cn";
import { ArrayHashMark } from "./ArrayHashMark";

type EditorialArtworkProps = {
  eyebrow: string;
  title: string;
  image: string;
  tone?: "primary" | "dark" | "highlight";
  byline?: string;
  updatedAt?: string;
  updatedLabel?: string;
  compact?: boolean;
  preserveImageAspect?: boolean;
  className?: string;
};

const tones = {
  primary: {
    shell: "bg-primary text-on-dark",
    muted: "text-on-dark-muted",
    frame: "border-on-dark-border bg-background",
  },
  dark: {
    shell: "bg-dark text-on-dark",
    muted: "text-on-dark-muted",
    frame: "border-on-dark-border bg-background",
  },
  highlight: {
    shell: "bg-dark-2 text-on-dark",
    muted: "text-on-dark-muted",
    frame: "border-on-dark-border bg-background",
  },
} as const;

/** Flat editorial cover treatment shared by resource cards and article pages. */
export function EditorialArtwork({
  eyebrow,
  title,
  image,
  tone = "primary",
  byline,
  updatedAt,
  updatedLabel,
  compact = false,
  preserveImageAspect = false,
  className,
}: EditorialArtworkProps) {
  const palette = tones[tone];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate aspect-[16/10] overflow-hidden rounded-xl",
        palette.shell,
        className,
      )}
    >
      <span className="absolute top-5 left-5 z-20 sm:top-6 sm:left-6">
        <ArrayHashMark className="text-[1.1rem]" />
      </span>

      <div className="absolute inset-y-0 left-[42%] border-l border-current opacity-20" />
      <div className="absolute inset-x-0 top-[32%] border-t border-current opacity-20" />

      <div
        className={cn(
          "absolute left-5 z-20 sm:left-6",
          compact ? "top-5 w-[35%] sm:top-6" : "top-[28%] w-[45%]",
        )}
      >
        <p
          className={cn(
            "text-[0.6875rem] font-semibold tracking-[0.12em] uppercase",
            palette.muted,
            compact && "pl-7 sm:pl-8",
          )}
        >
          ArraySubs field guide
        </p>
        <p
          className={cn(
            "font-display leading-[1.05] font-semibold text-balance",
            compact
              ? "mt-10 text-[1.4rem] leading-[1.1]"
              : "mt-3 text-xl sm:text-2xl lg:text-3xl",
          )}
        >
          {title}
        </p>
      </div>

      <div
        className={cn(
          "absolute right-5 bottom-5 z-10 w-[52%] overflow-hidden rounded-lg border sm:right-6 sm:bottom-6",
          preserveImageAspect ? "aspect-[16/9]" : "h-[54%]",
          palette.frame,
        )}
      >
        <img
          src={image}
          alt=""
          width={1440}
          height={1000}
          decoding="async"
          className={cn(
            "h-full w-full object-top",
            preserveImageAspect ? "object-contain" : "object-cover",
          )}
        />
      </div>

      <div
        className={cn(
          "absolute bottom-5 left-5 z-20 max-w-[38%] text-xs font-semibold sm:bottom-6 sm:left-6 sm:text-sm",
          palette.muted,
        )}
      >
        <p>{eyebrow}</p>
        {byline && <p className="mt-1 text-current">{byline}</p>}
        {updatedAt && updatedLabel && (
          <p className="mt-1 font-medium">
            Updated <time dateTime={updatedAt}>{updatedLabel}</time>
          </p>
        )}
      </div>
    </div>
  );
}
