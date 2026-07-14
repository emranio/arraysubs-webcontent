export const ROADMAP_STATUSES = [
  "requested",
  "planned",
  "in-development",
  "released",
] as const;

export type RoadmapStatus = (typeof ROADMAP_STATUSES)[number];

export type PublicRoadmapCard = {
  id: string;
  product: string;
  status: RoadmapStatus;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  upvotes: number;
  hasUpvoted: boolean;
};

export type RoadmapApiResponse = {
  cards: PublicRoadmapCard[];
  participationEnabled: boolean;
  message?: string;
};

export const ROADMAP_VISITOR_COOKIE = "arraysubs_roadmap_visitor";
export const ROADMAP_VISITOR_MAX_AGE = 60 * 60 * 24 * 365;
