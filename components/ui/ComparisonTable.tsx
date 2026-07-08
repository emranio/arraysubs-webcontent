import { Fragment, type ReactNode } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge } from "./Badge";

/**
 * One cell in a comparison row. Generic so the table works for any
 * plan/feature matrix, not just pricing:
 * - `check`   feature is included (optional short note shown beside the tick)
 * - `no`      feature is not included
 * - `partial` partial support, with an optional short label
 * - `text`    an arbitrary short value (e.g. "Manual only", "1 + add-on")
 */
export type ComparisonCell =
  | { kind: "check"; note?: string }
  | { kind: "no" }
  | { kind: "partial"; label?: string }
  | { kind: "text"; value: ReactNode };

export type ComparisonColumn = {
  /** Stable key used to look the cell up on each row. */
  key: string;
  name: string;
  /** Short line under the name (e.g. a price or offer). */
  offer?: string;
  /** Visually emphasise this column (e.g. the recommended plan). */
  featured?: boolean;
};

export type ComparisonRow = {
  feature: string;
  /** Optional sub-label under the feature name. */
  hint?: string;
  /** Cells keyed by column `key`; a missing key renders as "not included". */
  cells: Record<string, ComparisonCell>;
};

export type ComparisonGroup = {
  label: string;
  rows: ComparisonRow[];
};

type ComparisonTableProps = {
  columns: ComparisonColumn[];
  groups: ComparisonGroup[];
  /** Full-sentence summary for screen readers / AI extraction. */
  caption: string;
  className?: string;
};

/**
 * Accessible, flat feature-comparison table. Server component, structure-only —
 * all column/row data is passed in. Renders a semantic `<table>` with a
 * captioned, scope-wired header, an emphasised featured column, and a sticky
 * first column so the feature labels stay in view while the plans scroll
 * horizontally on small screens. Status is never conveyed by colour alone —
 * every cell carries an icon plus visually-hidden text.
 */
export function ComparisonTable({
  columns,
  groups,
  caption,
  className,
}: ComparisonTableProps) {
  const colSpan = columns.length + 1;

  return (
    <div
      role="region"
      aria-label={caption}
      tabIndex={0}
      className={cn(
        // `relative` keeps the cells' absolutely-positioned sr-only status text
        // contained — otherwise it escapes and widens the page on mobile.
        "relative overflow-x-auto rounded-2xl border border-border bg-card",
        className,
      )}
    >
      <table className="w-full min-w-[44rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>

        <thead>
          <tr className="border-b border-border">
            <th
              scope="col"
              className="sticky left-0 z-[2] bg-card px-5 py-5 align-bottom"
            >
              <span className="text-sm font-semibold text-faint">
                Compare plans
              </span>
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  "px-5 py-5 text-center align-bottom",
                  col.featured
                    ? "border-l border-border bg-primary text-on-dark"
                    : "text-foreground",
                )}
              >
                <span className="flex flex-col items-center gap-1.5">
                  {col.featured && <Badge tone="highlight">Best value</Badge>}
                  <span className="font-display text-lg font-semibold sm:text-xl">
                    {col.name}
                  </span>
                  {col.offer && (
                    <span
                      className={cn(
                        "text-sm font-medium",
                        col.featured ? "text-on-dark" : "text-muted",
                      )}
                    >
                      {col.offer}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {groups.map((group, groupIndex) => (
            <Fragment key={group.label}>
              {group.label && (
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={colSpan}
                    className={cn(
                      "bg-card px-5 pb-2 text-left text-xs font-semibold tracking-[0.18em] text-faint uppercase",
                      groupIndex === 0
                        ? "pt-5"
                        : "border-t border-border pt-8",
                    )}
                  >
                    {group.label}
                  </th>
                </tr>
              )}

              {group.rows.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-border last:border-b-0"
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-[1] bg-card px-5 py-4 text-left text-sm font-medium text-foreground"
                  >
                    {row.feature}
                    {row.hint && (
                      <span className="mt-0.5 block text-xs font-normal text-faint">
                        {row.hint}
                      </span>
                    )}
                  </th>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "px-5 py-4 text-center align-middle text-sm",
                        col.featured && "border-l border-border bg-primary/[0.05]",
                      )}
                    >
                      <CellValue
                        cell={row.cells[col.key] ?? { kind: "no" }}
                        featured={col.featured}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Renders a single cell's value with an icon + visually-hidden status text. */
function CellValue({
  cell,
  featured,
}: {
  cell: ComparisonCell;
  /** Featured columns get a primary tick; others render a muted/gray tick. */
  featured?: boolean;
}) {
  switch (cell.kind) {
    case "check":
      return (
        <span className="inline-flex items-center justify-center gap-1.5">
          <span
            aria-hidden="true"
            className={cn(
              "inline-flex size-6 items-center justify-center rounded-full text-on-dark",
              featured ? "bg-primary" : "bg-faint",
            )}
          >
            <Check className="size-4" strokeWidth={3} />
          </span>
          <span className="sr-only">
            Included{cell.note ? `: ${cell.note}` : ""}
          </span>
          {cell.note && (
            <span aria-hidden="true" className="text-xs font-medium text-muted">
              {cell.note}
            </span>
          )}
        </span>
      );
    case "no":
      return (
        <span className="inline-flex items-center justify-center">
          <Minus aria-hidden="true" className="size-5 text-faint" />
          <span className="sr-only">Not included</span>
        </span>
      );
    case "partial":
      return (
        <span className="inline-flex items-center justify-center">
          <span className="text-xs font-medium text-muted">
            {cell.label ?? "Partial"}
          </span>
          <span className="sr-only">Partial</span>
        </span>
      );
    case "text":
      return <span className="text-xs font-medium text-muted">{cell.value}</span>;
  }
}
