import { Fragment, type ReactNode } from "react";

/**
 * Renders body copy with `==marked==` phrases wrapped in the brand highlight
 * marker, to draw the eye to key points in long lead paragraphs. Plain strings
 * with no markers are returned unchanged.
 *
 * Example: `highlight("Plans start at ==$129/year==.")`
 */
export function highlight(text: string): ReactNode {
  // Capturing split → even indices are plain text, odd indices are marked.
  return text.split(/==(.+?)==/g).map((part, index) =>
    index % 2 === 1 ? (
      <mark
        key={index}
        className="marker-highlight bg-transparent font-medium text-foreground"
      >
        {part}
      </mark>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
