"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  ComparisonTable,
  type ComparisonColumn,
  type ComparisonGroup,
  type ComparisonRow,
} from "@/components/ui/ComparisonTable";

type CollapsibleComparisonBaseProps = {
  caption: string;
  className?: string;
  columns: ComparisonColumn[];
  /** Rows kept visible while collapsed (Pro-only rows + a few extras). */
  collapsedRowCount: number;
};

type CollapsibleComparisonProps = CollapsibleComparisonBaseProps &
  (
    | {
        /** Full, pre-sorted row set. Collapsed view slices the first N. */
        rows: ComparisonRow[];
        groups?: never;
      }
    | {
        /** Grouped rows. Group headings are retained when the table is sliced. */
        groups: ComparisonGroup[];
        rows?: never;
      }
  );

function sliceGroups(
  groups: ComparisonGroup[],
  rowCount: number,
): ComparisonGroup[] {
  let remaining = rowCount;

  return groups.flatMap((group) => {
    if (remaining <= 0) return [];

    const rows = group.rows.slice(0, remaining);
    remaining -= rows.length;
    return rows.length > 0 ? [{ ...group, rows }] : [];
  });
}

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
  groups,
  collapsedRowCount,
}: CollapsibleComparisonProps) {
  const [expanded, setExpanded] = useState(false);
  const tableId = useId();

  const allGroups = groups ?? [{ label: "", rows }];
  const totalRowCount = allGroups.reduce(
    (total, group) => total + group.rows.length,
    0,
  );
  const collapsible = totalRowCount > collapsedRowCount;
  const hiddenCount = totalRowCount - collapsedRowCount;
  const showFull = expanded || !collapsible;
  const visibleGroups = showFull
    ? allGroups
    : sliceGroups(allGroups, collapsedRowCount);

  return (
    <div className="flex w-full min-w-0 flex-col items-center gap-6">
      <div id={tableId} className="relative w-full min-w-0">
        <ComparisonTable
          caption={caption}
          columns={columns}
          groups={visibleGroups}
          className={className}
        />
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
