import {
  type ComparisonCell,
  type ComparisonColumn,
  type ComparisonRow,
} from "@/components/ui/ComparisonTable";
import { CollapsibleComparison } from "./CollapsibleComparison";
import { FREE_VS_PRO_GROUPS, type FvpRow } from "./freeVsProRows";

type FreeVsProTableProps = {
  caption?: string;
  className?: string;
  freeOffer?: string;
  proOffer?: string;
};

const NO: ComparisonCell = { kind: "no" };

const toRow = (row: FvpRow): ComparisonRow => ({
  feature: row.label,
  hint: row.hint,
  cells: {
    free: row.proOnly ? NO : { kind: "check", note: row.freeNote },
    pro: { kind: "check", note: row.proNote },
  },
});

// Flatten the authored capability groups into one Pro-first list: every
// Pro-only capability sorts to the top (that's the upgrade story), then
// everything the free core already includes. Order within each tier follows
// the authored order. Computed once on the server.
const ALL_ROWS: FvpRow[] = FREE_VS_PRO_GROUPS.flatMap((group) => group.rows);
const PRO_ROWS = ALL_ROWS.filter((row) => row.proOnly);
const CORE_ROWS = ALL_ROWS.filter((row) => !row.proOnly);
const ROWS: ComparisonRow[] = [...PRO_ROWS, ...CORE_ROWS].map(toRow);

// Collapsed view keeps every Pro-only capability (they sort to the top) plus 4
// extra rows; the rest hide behind the "Show more N features" link.
const COLLAPSED_ROW_COUNT = PRO_ROWS.length + 4;

export function FreeVsProTable({
  caption = "ArraySubs Free core versus Pro — one capability comparison with every Pro-only upgrade listed first, then everything the free core includes.",
  className,
  freeOffer = "$0 — free forever",
  proOffer = "Annual & lifetime plans",
}: FreeVsProTableProps) {
  const columns: ComparisonColumn[] = [
    { key: "free", name: "ArraySubs Free", offer: freeOffer },
    {
      key: "pro",
      name: "ArraySubs Pro",
      offer: proOffer,
      featured: true,
    },
  ];

  return (
    <CollapsibleComparison
      caption={caption}
      className={className}
      columns={columns}
      rows={ROWS}
      collapsedRowCount={COLLAPSED_ROW_COUNT}
    />
  );
}
