"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { hasFinePointer, prefersReducedMotion } from "@/lib/gsap";

export type GalleryItem = {
  src: string;
  originalSrc?: string;
  alt: string;
  title?: string;
};

type GalleryProps = {
  items: GalleryItem[];
  label?: string;
  caption?: ReactNode;
  captionPosition?: number;
  className?: string;
};

type HoverChip = {
  text: string;
  x: string;
  y: string;
};

const itemLayoutClasses = [
  "mt-[12rem] h-[17rem] w-[19rem] sm:mt-[14rem] sm:h-[20rem] sm:w-[22rem]",
  "mt-[1rem] h-[11rem] w-[12rem] sm:h-[14rem] sm:w-[14rem]",
  "mt-[1rem] h-[11rem] w-[18rem] sm:h-[14rem] sm:w-[22rem]",
  "mt-[15rem] h-[28rem] w-[28rem] sm:mt-[17rem] sm:h-[35rem] sm:w-[38rem]",
  "mt-[18rem] h-[10rem] w-[10rem] sm:mt-[21rem] sm:h-[12rem] sm:w-[12rem]",
  "mt-[17rem] h-[19rem] w-[23rem] sm:mt-[21rem] sm:h-[23rem] sm:w-[29rem]",
  "mt-[37rem] h-[8rem] w-[8rem] sm:mt-[42rem] sm:h-[10rem] sm:w-[10rem]",
  "mt-[37rem] h-[12rem] w-[12rem] sm:mt-[42rem] sm:h-[16rem] sm:w-[16rem]",
  "mt-[5rem] h-[12rem] w-[18rem] sm:mt-[6rem] sm:h-[15rem] sm:w-[22rem]",
];

const dialogTransitionMs = 300;
const imageLoaderMinMs = 450;

function getItemLayoutClass(index: number) {
  return itemLayoutClasses[index % itemLayoutClasses.length];
}

function getDialogImage(item: GalleryItem) {
  return item.originalSrc ?? item.src;
}

function getPointerPositionRem(event: PointerEvent<HTMLElement>) {
  const rootFontSize =
    Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

  return {
    x: `${(event.clientX / rootFontSize).toFixed(3)}rem`,
    y: `${(event.clientY / rootFontSize).toFixed(3)}rem`,
  };
}

export function Gallery({
  items,
  label = "Image gallery",
  caption,
  captionPosition = 4,
  className,
}: GalleryProps) {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isDialogImageLoaded, setIsDialogImageLoaded] = useState(false);
  const [isDialogLoaderDelayDone, setIsDialogLoaderDelayDone] = useState(false);
  const [hoverChip, setHoverChip] = useState<HoverChip | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const loaderTimerRef = useRef<number | null>(null);
  const hoverChipRef = useRef<HoverChip | null>(null);

  useEffect(() => {
    hoverChipRef.current = hoverChip;
  }, [hoverChip]);

  useEffect(() => {
    if (!activeItem) return;

    const previousOverflow = document.body.style.overflow;
    const animationFrame = window.requestAnimationFrame(() => {
      setIsDialogVisible(true);
    });

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeItem]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }

      if (loaderTimerRef.current) {
        window.clearTimeout(loaderTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (!activeItem) return;

    loaderTimerRef.current = window.setTimeout(() => {
      setIsDialogLoaderDelayDone(true);
      loaderTimerRef.current = null;
    }, imageLoaderMinMs);

    return () => {
      if (loaderTimerRef.current) {
        window.clearTimeout(loaderTimerRef.current);
        loaderTimerRef.current = null;
      }
    };
  }, [activeItem]);

  useEffect(() => {
    const handlePointerAway = (event: globalThis.MouseEvent) => {
      if (!hoverChipRef.current) return;

      const target = document.elementFromPoint(event.clientX, event.clientY);
      if (!(target instanceof Element)) {
        setHoverChip(null);
        return;
      }

      if (!target.closest("[data-gallery-thumbnail='true']")) {
        setHoverChip(null);
      }
    };

    window.addEventListener("pointermove", handlePointerAway);
    window.addEventListener("mousemove", handlePointerAway);
    return () => {
      window.removeEventListener("pointermove", handlePointerAway);
      window.removeEventListener("mousemove", handlePointerAway);
    };
  }, []);

  const openDialog = (item: GalleryItem) => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setHoverChip(null);
    setIsDialogImageLoaded(false);
    setIsDialogLoaderDelayDone(false);
    setIsDialogVisible(false);
    setActiveItem(item);
  };

  const closeDialog = () => {
    if (!activeItem) return;

    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }

    setIsDialogVisible(false);
    closeTimerRef.current = window.setTimeout(
      () => {
        setActiveItem(null);
        closeTimerRef.current = null;
      },
      prefersReducedMotion() ? 0 : dialogTransitionMs,
    );
  };

  useEffect(() => {
    if (!activeItem) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem]);

  const handlePointerMove = (
    event: PointerEvent<HTMLButtonElement>,
    label: string,
  ) => {
    if (!hasFinePointer() || prefersReducedMotion()) {
      setHoverChip(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.75;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.75;
    const position = getPointerPositionRem(event);

    setHoverChip({ text: label, ...position });
    event.currentTarget.style.transform = `translate3d(${x.toFixed(
      3,
    )}rem, ${y.toFixed(3)}rem, 0) scale(1.055)`;
  };

  const handlePointerLeave = (event: PointerEvent<HTMLButtonElement>) => {
    setHoverChip(null);
    event.currentTarget.style.transform = "translate3d(0rem, 0rem, 0) scale(1)";
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const renderedItems = items.map((item, index) => (
    <li
      key={`${item.src}-${index}`}
      className={cn("shrink-0", getItemLayoutClass(index))}
    >
      <button
        type="button"
        data-gallery-thumbnail="true"
        aria-label={`Open ${item.alt}`}
        onClick={() => openDialog(item)}
        onPointerMove={(event) => handlePointerMove(event, item.alt)}
        onPointerEnter={(event) => handlePointerMove(event, item.alt)}
        onPointerLeave={handlePointerLeave}
        className="group block size-full overflow-hidden rounded-xl bg-card outline-none transition-transform duration-500 ease-out will-change-transform focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none"
      >
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      </button>
    </li>
  ));

  const captionIndex = Math.max(
    0,
    Math.min(captionPosition, renderedItems.length),
  );
  const galleryItems = caption
    ? [
        ...renderedItems.slice(0, captionIndex),
        <li
          key="gallery-caption"
          className="mt-[35rem] flex w-[24rem] shrink-0 flex-col justify-end text-foreground sm:mt-[40rem] sm:w-[34rem]"
        >
          {caption}
        </li>,
        ...renderedItems.slice(captionIndex),
      ]
    : renderedItems;
  const isDialogImageReady =
    isDialogImageLoaded && isDialogLoaderDelayDone;

  return (
    <div className={cn("relative min-w-0", className)}>
      <div className="-mx-6 overflow-x-auto px-6 pb-4 sm:-mx-8 sm:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul
          aria-label={label}
          className="flex min-h-[50rem] w-max min-w-full items-start gap-[0.1875rem]"
        >
          {galleryItems}
        </ul>
      </div>

      {hoverChip && !activeItem && (
        <span
          aria-hidden="true"
          className="pointer-events-none fixed z-[80] max-w-[18rem] translate-x-3 translate-y-3 rounded-pill border border-on-dark-border bg-dark px-3 py-1.5 text-xs font-semibold text-on-dark transition-opacity duration-150 ease-out"
          style={{ left: hoverChip.x, top: hoverChip.y }}
        >
          {hoverChip.text}
        </span>
      )}

      {activeItem && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title ?? activeItem.alt}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
          onKeyDown={handleDialogKeyDown}
          className={cn(
            "fixed inset-0 z-[90] flex items-center justify-center bg-dark/85 p-6 text-on-dark backdrop-blur-sm transition-opacity duration-300 ease-out sm:p-10 motion-reduce:transition-none",
            isDialogVisible
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          )}
        >
          <div
            className={cn(
              "flex max-h-[calc(100dvh-3rem)] w-full min-w-0 max-w-[calc(100vw-3rem)] flex-col items-end gap-3 transition-[opacity,transform] duration-300 ease-out sm:max-h-[calc(100dvh-5rem)] sm:max-w-[calc(100vw-5rem)] motion-reduce:transition-none",
              isDialogVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-3 scale-[0.985] opacity-0",
            )}
          >
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close gallery image"
              onClick={closeDialog}
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-on-dark-border bg-dark text-on-dark transition-colors duration-200 hover:bg-dark-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-dark"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
            <div className="relative flex min-h-[14rem] w-full min-w-0 justify-center sm:min-h-[24rem]">
              {!isDialogImageReady && (
                <div
                  role="status"
                  aria-label="Loading full image"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block size-10 animate-spin rounded-full border-2 border-on-dark-border border-t-on-dark motion-reduce:animate-none"
                  />
                </div>
              )}
              <img
                src={getDialogImage(activeItem)}
                alt={activeItem.alt}
                onLoad={() => setIsDialogImageLoaded(true)}
                onError={() => setIsDialogImageLoaded(true)}
                className={cn(
                  "block max-h-[calc(100dvh-9rem)] max-w-full rounded-xl object-contain transition-opacity duration-300 ease-out sm:max-h-[calc(100dvh-11rem)] motion-reduce:transition-none",
                  isDialogImageReady ? "opacity-100" : "opacity-0",
                )}
              />
            </div>
            {activeItem.title && (
              <p className="w-full text-center text-sm text-on-dark-muted">
                {activeItem.title}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
