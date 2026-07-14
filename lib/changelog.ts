import changelogData from "@/data/changelog.json";

export type ChangelogEntry = {
  product: "ArraySubs" | "ArraySubs Pro";
  edition: "Core" | "Pro";
  version: string;
  releasedAt: string | null;
  changes: string[];
};

export const CHANGELOG_ENTRIES = changelogData as ChangelogEntry[];
