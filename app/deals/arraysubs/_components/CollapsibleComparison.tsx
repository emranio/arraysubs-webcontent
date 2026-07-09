"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  ComparisonTable,
  type ComparisonColumn,
  type ComparisonRow,
} from "@/components/ui/ComparisonTable";

type CollapsibleComparisonProps = {
  caption: string;
  className?: string;
  columns: ComparisonColumn[];
  /** Full, pre-sorted row set. Collapsed view slices the first N. */
  rows: ComparisonRow[];
  /** Rows kept visible while collapsed (Pro-only rows + a few extras). */
  collapsedRowCount: number;
};

/**
 * Client wrapper that renders a {@link ComparisonTable} with a show-more /
 * show-fewer toggle. Only the lightweight row data is passed in, so the heavy
 * feature source stays on the server. When collapsed it shows the first
 * `collapsedRowCount` rows (the Pro-first sort puts every Pro-only feature at
 * the top) and a text link reveals the rest.
 */
export function CollapsibleComparison({
  caption,
  className,
  columns,
  rows,
  collapsedRowCount,
}: CollapsibleComparisonProps) {
  const [expanded, setExpanded] = useState(false);
  const tableId = useId();

  const collapsible = rows.length > collapsedRowCount;
  const hiddenCount = rows.length - collapsedRowCount;
  const showFull = expanded || !collapsible;
  const visibleRows = showFull ? rows : rows.slice(0, collapsedRowCount);

  return (
    <div className="flex flex-col items-center gap-6">
      <div id={tableId} className="relative w-full">
        <ComparisonTable
          caption={caption}
          columns={columns}
          groups={[{ label: "", rows: visibleRows }]}
          className={className}
        />
        {!showFull && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-2xl bg-gradient-to-t from-card to-transparent"
          />
        )}
      </div>

      {collapsible && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={tableId}
          className="group inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm font-semibold text-primary underline-offset-4 transition-colors hover:text-primary-strong hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {expanded ? "Show fewer features" : `Show more ${hiddenCount} features`}
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-4 transition-transform duration-200",
              expanded && "rotate-180",
            )}
          />
        </button>
      )}
    </div>
  );
}
