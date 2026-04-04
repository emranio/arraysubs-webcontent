Key changes from v1:

**Color** — five saturated primaries (teal, amber, coral, purple, blue) all in play. Light tints (`-lt`) pair with dark text from the same ramp for tinted backgrounds — never gray text on a colored surface.

**Card rule enforced** — every bento cell is either a solid color fill (no border) or a white/gray surface with a 1.5px border. The old teal-fill-plus-border cells are gone. One or the other, always.

**Lucide icons** — 6 total across the whole system. Each gets a tinted background bubble using the matching color's `--lt` value. `aria-label` on every `<svg>`. Inline paths, no library load needed for the doc, but the import snippet is shown.

**Lottie strategy** — three loading modes: hero gets `autoplay loop` (ambient), feature bento cells get `scroll-trigger play` via GSAP, hover sections get `hover-play`. Hard limit of 3 Lottie instances per viewport for perf. `renderer: "svg"` over canvas for accessibility. The cells show the pattern with placeholder visuals since Lottie CDN is blocked in the sandbox, but the integration code is production-ready.

**Animation-first** — animated stat counters run on load, float + pulse keyframes on icons, shimmer on the hero title, spring easing on all button hovers. GSAP code block shows the complete pattern including the `matchMedia` wrapper for `prefers-reduced-motion`.