import { cn } from "@/lib/cn";

type ArrayHashMarkProps = {
  className?: string;
  iconClassName?: string;
};

/** Compact ArrayHash marker. Visually renders as [hash] for brand separators. */
export function ArrayHashMark({
  className,
  iconClassName,
}: ArrayHashMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center gap-0.5 font-display font-bold leading-none tracking-normal text-current",
        className,
      )}
    >
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
          focusable="false"
          className={cn("size-[0.9em] shrink-0", iconClassName)}>
          <path id="Path_93" data-name="Path 93" d="M-8.5,12H-11V4h2.5A.5.5,0,0,0-8,3.5.5.5,0,0,0-8.5,3H-11V.5a.5.5,0,0,0-.5-.5.5.5,0,0,0-.5.5V3h-8V.5a.5.5,0,0,0-.5-.5.5.5,0,0,0-.5.5V3h-2.5a.5.5,0,0,0-.5.5.5.5,0,0,0,.5.5H-21v8h-2.5a.5.5,0,0,0-.5.5.5.5,0,0,0,.5.5H-21v2.5a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5V13h8v2.5a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5V13h2.5a.5.5,0,0,0,.5-.5A.5.5,0,0,0-8.5,12ZM-20,12V4h8v8Z" transform="translate(24)" />
        </svg>
      </span>
    </span>
  );
}
