import { randomBytes, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  ROADMAP_VISITOR_COOKIE,
  ROADMAP_VISITOR_MAX_AGE,
} from "@/lib/roadmap";
import {
  hashRoadmapVisitor,
  readRoadmapStore,
  toPublicRoadmapCards,
  updateRoadmapStore,
} from "@/lib/roadmap-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 8_192;
const MAX_REQUESTS_PER_DAY = 6;
const MAX_GLOBAL_REQUESTS_PER_HOUR = 20;
const MAX_GLOBAL_REQUESTS_PER_DAY = 100;
const MAX_GLOBAL_VOTES_PER_MINUTE = 60;
const MAX_GLOBAL_VOTES_PER_DAY = 2_000;
const MAX_ROADMAP_CARDS = 500;
const REQUEST_COOLDOWN_MS = 30_000;
const MINUTE_MS = 60 * 1_000;
const HOUR_MS = 60 * 60 * 1_000;
const DAY_MS = 24 * 60 * 60 * 1_000;

type RoadmapAction =
  | { action: "consent"; accepted?: unknown }
  | { action: "revoke" }
  | { action: "upvote"; cardId?: unknown }
  | {
      action: "submit";
      title?: unknown;
      description?: unknown;
      website?: unknown;
    };

function noStoreJson(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

function visitorToken(request: NextRequest) {
  const token = request.cookies.get(ROADMAP_VISITOR_COOKIE)?.value ?? "";
  return /^[A-Za-z0-9_-]{43}$/.test(token) ? token : null;
}

function visitorHash(request: NextRequest) {
  const token = visitorToken(request);
  return token ? hashRoadmapVisitor(token) : null;
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";

  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).origin === request.nextUrl.origin;
  } catch {
    return false;
  }
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

async function readAction(request: NextRequest): Promise<RoadmapAction | null> {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) return null;

  try {
    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) return null;

    const body = JSON.parse(rawBody) as unknown;
    if (!body || typeof body !== "object" || Array.isArray(body)) return null;
    return body as RoadmapAction;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const data = await readRoadmapStore();
    return noStoreJson({
      cards: toPublicRoadmapCards(data, visitorHash(request)),
      participationEnabled: Boolean(visitorToken(request)),
    });
  } catch (error) {
    console.error("Roadmap read failed", error);
    return noStoreJson({ error: "The roadmap is temporarily unavailable." }, 500);
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return noStoreJson({ error: "Invalid request origin." }, 403);
  }

  const body = await readAction(request);
  if (!body || typeof body.action !== "string") {
    return noStoreJson({ error: "Invalid roadmap request." }, 400);
  }

  if (body.action === "consent") {
    if (body.accepted !== true) {
      return noStoreJson({ error: "Consent was not accepted." }, 400);
    }

    try {
      const existingToken = visitorToken(request);
      const token = existingToken ?? randomBytes(32).toString("base64url");
      const data = await readRoadmapStore();
      const response = noStoreJson({
        cards: toPublicRoadmapCards(data, hashRoadmapVisitor(token)),
        participationEnabled: true,
        message: "Roadmap participation is enabled on this browser.",
      });

      if (!existingToken) {
        response.cookies.set({
          name: ROADMAP_VISITOR_COOKIE,
          value: token,
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: ROADMAP_VISITOR_MAX_AGE,
        });
      }

      return response;
    } catch (error) {
      console.error("Roadmap consent failed", error);
      return noStoreJson(
        { error: "Roadmap participation is temporarily unavailable." },
        500,
      );
    }
  }

  if (body.action === "revoke") {
    try {
      const data = await readRoadmapStore();
      const response = noStoreJson({
        cards: toPublicRoadmapCards(data, null),
        participationEnabled: false,
        message: "The roadmap cookie was removed from this browser.",
      });
      response.cookies.set({
        name: ROADMAP_VISITOR_COOKIE,
        value: "",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 0,
        expires: new Date(0),
      });
      return response;
    } catch (error) {
      console.error("Roadmap consent revocation failed", error);
      return noStoreJson(
        { error: "The roadmap cookie could not be removed right now." },
        500,
      );
    }
  }

  const hash = visitorHash(request);
  if (!hash) {
    return noStoreJson(
      {
        error: "Consent is required before submitting or voting.",
        code: "ROADMAP_CONSENT_REQUIRED",
      },
      428,
    );
  }

  try {
    if (body.action === "upvote") {
      const cardId = cleanText(body.cardId, 100);
      if (!cardId) return noStoreJson({ error: "Card id is required." }, 400);

      let alreadyUpvoted = false;
      const data = await updateRoadmapStore((store) => {
        const card = store.cards.find((item) => item.id === cardId);
        if (!card) throw new RoadmapRequestError("Roadmap card not found.", 404);

        if (card.voterHashes.includes(hash)) {
          alreadyUpvoted = true;
          return;
        }

        const now = Date.now();
        store.voteEvents = store.voteEvents.filter((event) => {
          const createdAt = Date.parse(event.createdAt);
          return Number.isFinite(createdAt) && now - createdAt < DAY_MS;
        });

        const votesInLastMinute = store.voteEvents.filter(
          (event) => now - Date.parse(event.createdAt) < MINUTE_MS,
        ).length;
        if (votesInLastMinute >= MAX_GLOBAL_VOTES_PER_MINUTE) {
          throw new RoadmapRequestError(
            "The roadmap is receiving many votes. Please try again shortly.",
            429,
          );
        }
        if (store.voteEvents.length >= MAX_GLOBAL_VOTES_PER_DAY) {
          throw new RoadmapRequestError(
            "The roadmap has reached today's vote limit. Please try again tomorrow.",
            429,
          );
        }

        card.voterHashes.push(hash);
        card.updatedAt = new Date(now).toISOString();
        store.voteEvents.push({
          visitorHash: hash,
          createdAt: card.updatedAt,
        });
      });

      return noStoreJson({
        cards: toPublicRoadmapCards(data, hash),
        participationEnabled: true,
        message: alreadyUpvoted
          ? "Your upvote was already recorded."
          : "Your upvote was added.",
      });
    }

    if (body.action === "submit") {
      const title = cleanText(body.title, 90);
      const description = cleanText(body.description, 280);
      const website = cleanText(body.website, 120);

      if (title.length < 6) {
        return noStoreJson(
          { error: "Use at least 6 characters for the feature title." },
          400,
        );
      }
      if (description.length < 12) {
        return noStoreJson(
          { error: "Use at least 12 characters for the description." },
          400,
        );
      }

      if (website) {
        const data = await readRoadmapStore();
        return noStoreJson({
          cards: toPublicRoadmapCards(data, hash),
          participationEnabled: true,
          message: "Your idea was submitted.",
        });
      }

      const now = Date.now();
      const data = await updateRoadmapStore((store) => {
        if (store.cards.length >= MAX_ROADMAP_CARDS) {
          throw new RoadmapRequestError(
            "The public roadmap is full. Please try again after it is reviewed.",
            429,
          );
        }

        const communityRequestDates = store.cards
          .filter((card) => card.submittedByHash !== null)
          .map((card) => Date.parse(card.createdAt))
          .filter(Number.isFinite);
        const requestsInLastHour = communityRequestDates.filter(
          (createdAt) => now - createdAt < HOUR_MS,
        ).length;
        const requestsInLastDay = communityRequestDates.filter(
          (createdAt) => now - createdAt < DAY_MS,
        ).length;

        if (requestsInLastHour >= MAX_GLOBAL_REQUESTS_PER_HOUR) {
          throw new RoadmapRequestError(
            "The roadmap is receiving many ideas. Please try again later.",
            429,
          );
        }
        if (requestsInLastDay >= MAX_GLOBAL_REQUESTS_PER_DAY) {
          throw new RoadmapRequestError(
            "The roadmap has reached today's idea limit. Please try again tomorrow.",
            429,
          );
        }

        const visitorRequests = store.cards
          .filter((card) => card.submittedByHash === hash)
          .map((card) => Date.parse(card.createdAt))
          .filter(Number.isFinite)
          .sort((left, right) => right - left);

        if (
          visitorRequests[0] &&
          now - visitorRequests[0] < REQUEST_COOLDOWN_MS
        ) {
          throw new RoadmapRequestError(
            "Please wait a moment before submitting another idea.",
            429,
          );
        }

        const recentRequests = visitorRequests.filter(
          (createdAt) => now - createdAt < DAY_MS,
        );
        if (recentRequests.length >= MAX_REQUESTS_PER_DAY) {
          throw new RoadmapRequestError(
            "You have reached the daily idea limit. Please try again tomorrow.",
            429,
          );
        }

        const createdAt = new Date(now).toISOString();
        store.cards.push({
          id: `${slugify(title) || "idea"}-${randomUUID().slice(0, 8)}`,
          product: "arraysubs",
          status: "requested",
          title,
          description,
          createdAt,
          updatedAt: createdAt,
          submittedByHash: hash,
          voterHashes: [],
        });
      });

      return noStoreJson({
        cards: toPublicRoadmapCards(data, hash),
        participationEnabled: true,
        message: "Your idea was added to Requested.",
      });
    }

    return noStoreJson({ error: "Unknown roadmap action." }, 400);
  } catch (error) {
    if (error instanceof RoadmapRequestError) {
      return noStoreJson({ error: error.message }, error.status);
    }

    console.error("Roadmap update failed", error);
    return noStoreJson({ error: "The roadmap could not be updated." }, 500);
  }
}

class RoadmapRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}
