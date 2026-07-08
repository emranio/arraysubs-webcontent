import {
  ComparisonTable,
  type ComparisonCell,
  type ComparisonColumn,
  type ComparisonGroup,
} from "@/components/ui";
import { FEATURES, type FeatureTier } from "../features/_data";

type FreeVsProTableProps = {
  caption?: string;
  className?: string;
  freeOffer?: string;
  proOffer?: string;
};

const CHECK: ComparisonCell = { kind: "check" };
const NO: ComparisonCell = { kind: "no" };

const TIER_SORT_ORDER: Record<FeatureTier, number> = {
  Pro: 0,
  "Free + Pro": 1,
  Free: 2,
};

const GROUPS: ComparisonGroup[] = [
  {
    label: "",
    rows: FEATURES
      .map((feature, index) => ({ feature, index }))
      .sort(
        (a, b) =>
          TIER_SORT_ORDER[a.feature.tier] - TIER_SORT_ORDER[b.feature.tier] ||
          a.index - b.index,
      )
      .map(({ feature }) => ({
        feature: feature.name,
        cells: {
          free: feature.tier === "Pro" ? NO : CHECK,
          pro: CHECK,
        },
      })),
  },
];

export function FreeVsProTable({
  caption = "ArraySubs feature availability in the Free core versus Pro, listed as one Pro-first feature table.",
  className,
  freeOffer = "Free core",
  proOffer = "Pro upgrade",
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
    <ComparisonTable
      caption={caption}
      columns={columns}
      groups={GROUPS}
      className={className}
    />
  );
}
