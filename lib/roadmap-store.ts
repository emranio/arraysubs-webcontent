import "server-only";

import { createHash, randomUUID } from "node:crypto";
import { access, mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  ROADMAP_STATUSES,
  type PublicRoadmapCard,
  type RoadmapStatus,
} from "@/lib/roadmap";

export type RoadmapCardRecord = {
  id: string;
  product: string;
  status: RoadmapStatus;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  submittedByHash: string | null;
  voterHashes: string[];
};

export type RoadmapFile = {
  version: 1;
  cards: RoadmapCardRecord[];
  voteEvents: RoadmapVoteEventRecord[];
};

export type RoadmapVoteEventRecord = {
  visitorHash: string;
  createdAt: string;
};

const MAX_ROADMAP_FILE_BYTES = 5 * 1_024 * 1_024;

let initialization: Promise<void> | null = null;
let writeQueue: Promise<unknown> = Promise.resolve();

function roadmapPath() {
  const configured = process.env.ROADMAP_DATA_PATH?.trim();

  if (!configured) {
    throw new Error("ROADMAP_DATA_PATH is not configured.");
  }

  return path.resolve(process.cwd(), configured);
}

function seedPath() {
  return path.join(process.cwd(), "data", "roadmap.seed.json");
}

function isMissingFile(error: unknown) {
  return (
    error instanceof Error &&
    "code" in error &&
    (error as NodeJS.ErrnoException).code === "ENOENT"
  );
}

function isExistingFile(error: unknown) {
  return (
    error instanceof Error &&
    "code" in error &&
    (error as NodeJS.ErrnoException).code === "EEXIST"
  );
}

async function initializeRoadmapFile() {
  const filePath = roadmapPath();

  try {
    await access(filePath);
    return;
  } catch (error) {
    if (!isMissingFile(error)) throw error;
  }

  await mkdir(path.dirname(filePath), { recursive: true });
  const seed = await readFile(seedPath(), "utf8");

  try {
    await writeFile(filePath, seed, { encoding: "utf8", flag: "wx", mode: 0o600 });
  } catch (error) {
    if (!isExistingFile(error)) throw error;
  }
}

async function ensureRoadmapFile() {
  initialization ??= initializeRoadmapFile();

  try {
    await initialization;
  } catch (error) {
    initialization = null;
    throw error;
  }
}

function isRoadmapStatus(value: unknown): value is RoadmapStatus {
  return ROADMAP_STATUSES.includes(value as RoadmapStatus);
}

function requireString(
  record: Record<string, unknown>,
  key: string,
  allowNull = false,
) {
  const value = record[key];

  if (allowNull && value === null) return null;
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Invalid roadmap field: ${key}`);
  }

  return value;
}

function parseRoadmapFile(raw: string): RoadmapFile {
  const parsed = JSON.parse(raw) as unknown;

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Roadmap data must be a JSON object.");
  }

  const data = parsed as Record<string, unknown>;
  if (
    data.version !== 1 ||
    !Array.isArray(data.cards) ||
    !Array.isArray(data.voteEvents)
  ) {
    throw new Error("Unsupported roadmap data format.");
  }

  const seenIds = new Set<string>();
  const cards = data.cards.map((value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error("Invalid roadmap card.");
    }

    const card = value as Record<string, unknown>;
    const id = requireString(card, "id") as string;
    const status = card.status;

    if (seenIds.has(id)) throw new Error(`Duplicate roadmap card id: ${id}`);
    if (!isRoadmapStatus(status)) {
      throw new Error(`Invalid roadmap status for ${id}.`);
    }
    if (
      !Array.isArray(card.voterHashes) ||
      card.voterHashes.some((hash) => typeof hash !== "string")
    ) {
      throw new Error(`Invalid roadmap voter list for ${id}.`);
    }

    seenIds.add(id);

    return {
      id,
      product: requireString(card, "product") as string,
      status,
      title: requireString(card, "title") as string,
      description: requireString(card, "description") as string,
      createdAt: requireString(card, "createdAt") as string,
      updatedAt: requireString(card, "updatedAt") as string,
      submittedByHash: requireString(card, "submittedByHash", true),
      voterHashes: Array.from(new Set(card.voterHashes as string[])),
    } satisfies RoadmapCardRecord;
  });

  const voteEvents = data.voteEvents.map((value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error("Invalid roadmap vote event.");
    }

    const event = value as Record<string, unknown>;
    return {
      visitorHash: requireString(event, "visitorHash") as string,
      createdAt: requireString(event, "createdAt") as string,
    } satisfies RoadmapVoteEventRecord;
  });

  return { version: 1, cards, voteEvents };
}

export async function readRoadmapStore(): Promise<RoadmapFile> {
  await ensureRoadmapFile();
  return parseRoadmapFile(await readFile(roadmapPath(), "utf8"));
}

async function writeRoadmapStore(data: RoadmapFile) {
  const filePath = roadmapPath();
  const temporaryPath = `${filePath}.${process.pid}.${randomUUID()}.tmp`;
  const contents = `${JSON.stringify(data, null, 2)}\n`;

  if (Buffer.byteLength(contents, "utf8") > MAX_ROADMAP_FILE_BYTES) {
    throw new Error("Roadmap data has reached its configured size limit.");
  }

  await mkdir(path.dirname(filePath), { recursive: true });

  try {
    await writeFile(temporaryPath, contents, {
      encoding: "utf8",
      mode: 0o600,
    });
    await rename(temporaryPath, filePath);
  } finally {
    await rm(temporaryPath, { force: true });
  }
}

export async function updateRoadmapStore(
  mutate: (data: RoadmapFile) => void | Promise<void>,
): Promise<RoadmapFile> {
  const operation = writeQueue.then(async () => {
    const data = await readRoadmapStore();
    await mutate(data);
    await writeRoadmapStore(data);
    return data;
  });

  writeQueue = operation.then(
    () => undefined,
    () => undefined,
  );

  return operation;
}

export function hashRoadmapVisitor(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function toPublicRoadmapCards(
  data: RoadmapFile,
  visitorHash: string | null,
): PublicRoadmapCard[] {
  const statusOrder = new Map(
    ROADMAP_STATUSES.map((status, index) => [status, index]),
  );

  return data.cards
    .map((card) => ({
      id: card.id,
      product: card.product,
      status: card.status,
      title: card.title,
      description: card.description,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
      upvotes: card.voterHashes.length,
      hasUpvoted: Boolean(
        visitorHash && card.voterHashes.includes(visitorHash),
      ),
    }))
    .sort((left, right) => {
      const statusDifference =
        (statusOrder.get(left.status) ?? 0) -
        (statusOrder.get(right.status) ?? 0);
      if (statusDifference !== 0) return statusDifference;
      if (left.status === "requested" && left.upvotes !== right.upvotes) {
        return right.upvotes - left.upvotes;
      }
      return right.createdAt.localeCompare(left.createdAt);
    });
}
