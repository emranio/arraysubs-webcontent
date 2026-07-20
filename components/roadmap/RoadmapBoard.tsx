"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowUp,
  Check,
  ChevronDown,
  Heart,
  Lightbulb,
  LoaderCircle,
  Plus,
  Rocket,
} from "lucide-react";
import {
  Badge,
  Button,
  Dialog,
  Field,
  Input,
  SectionTitle,
  Textarea,
} from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
  useGSAP,
} from "@/lib/gsap";
import {
  ROADMAP_STATUSES,
  type PublicRoadmapCard,
  type RoadmapApiResponse,
  type RoadmapStatus,
} from "@/lib/roadmap";

type PendingAction =
  | { type: "upvote"; cardId: string }
  | {
      type: "submit";
      title: string;
      description: string;
      website: string;
    };

type ApiPayload = Partial<RoadmapApiResponse> & {
  error?: string;
  code?: string;
};

const COLUMNS: Record<
  RoadmapStatus,
  {
    title: string;
    description: string;
    badgeTone: "primary" | "info" | "secondary" | "pink";
  }
> = {
  requested: {
    title: "Requested",
    description: "Ideas shared by the community.",
    badgeTone: "primary",
  },
  planned: {
    title: "Planned",
    description: "Accepted for a future release.",
    badgeTone: "info",
  },
  "in-development": {
    title: "In development",
    description: "Actively being built and tested.",
    badgeTone: "secondary",
  },
  released: {
    title: "Released",
    description: "Available in ArraySubs or ArraySubs Pro.",
    badgeTone: "pink",
  },
};

/** Cards rendered per column before the show-more toggle reveals the rest. */
const VISIBLE_CARD_LIMIT = 5;

async function parseResponse(response: Response): Promise<ApiPayload> {
  try {
    return (await response.json()) as ApiPayload;
  } catch {
    return { error: "The roadmap returned an invalid response." };
  }
}

export function RoadmapBoard() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState<PublicRoadmapCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [notice, setNotice] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [votingCardId, setVotingCardId] = useState<string | null>(null);
  const [consentOpen, setConsentOpen] = useState(false);
  const [consentBusy, setConsentBusy] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  const [expandedColumns, setExpandedColumns] = useState<
    Partial<Record<RoadmapStatus, boolean>>
  >({});

  useEffect(() => {
    const controller = new AbortController();

    async function loadRoadmap() {
      try {
        const response = await fetch("/api/roadmap/", {
          cache: "no-store",
          signal: controller.signal,
        });
        const payload = await parseResponse(response);

        if (!response.ok || !payload.cards) {
          throw new Error(payload.error || "The roadmap could not be loaded.");
        }

        setCards(payload.cards);
      } catch (error) {
        if (controller.signal.aborted) return;
        setLoadError(
          error instanceof Error
            ? error.message
            : "The roadmap could not be loaded.",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadRoadmap();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!notice) return;

    const timeoutId = window.setTimeout(() => setNotice(""), 4_000);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  useEffect(() => {
    if (!actionError) return;

    const timeoutId = window.setTimeout(() => setActionError(""), 5_000);
    return () => window.clearTimeout(timeoutId);
  }, [actionError]);

  useGSAP(
    () => {
      if (loading || !boardRef.current) return;

      registerGsap();
      if (prefersReducedMotion()) return;

      const board = boardRef.current.querySelector("[data-roadmap-board]");
      if (!board) return;

      gsap.from(board, {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: board,
          start: "top 88%",
          once: true,
        },
      });
      ScrollTrigger.refresh();
    },
    {
      dependencies: [loading],
      scope: boardRef,
      revertOnUpdate: true,
    },
  );

  const postAction = async (action: PendingAction) => {
    const body =
      action.type === "upvote"
        ? { action: "upvote", cardId: action.cardId }
        : {
            action: "submit",
            title: action.title,
            description: action.description,
            website: action.website,
          };

    return fetch("/api/roadmap/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  };

  const runAction = async (action: PendingAction) => {
    setActionError("");
    setNotice("");

    if (action.type === "upvote") setVotingCardId(action.cardId);
    else setSubmitting(true);

    try {
      const response = await postAction(action);
      const payload = await parseResponse(response);

      if (
        response.status === 428 &&
        payload.code === "ROADMAP_CONSENT_REQUIRED"
      ) {
        setPendingAction(action);
        setConsentOpen(true);
        return;
      }

      if (!response.ok || !payload.cards) {
        throw new Error(payload.error || "The roadmap could not be updated.");
      }

      setCards(payload.cards);
      setNotice(payload.message || "The roadmap was updated.");

      if (action.type === "submit") {
        setTitle("");
        setDescription("");
        setWebsite("");
        setFormOpen(false);
      }
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "The roadmap could not be updated.",
      );
    } finally {
      if (action.type === "upvote") setVotingCardId(null);
      else setSubmitting(false);
    }
  };

  const acceptConsent = async () => {
    if (!pendingAction) return;

    setConsentBusy(true);
    setActionError("");

    try {
      const response = await fetch("/api/roadmap/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "consent", accepted: true }),
      });
      const payload = await parseResponse(response);

      if (!response.ok) {
        throw new Error(payload.error || "Your choice could not be saved.");
      }

      if (payload.cards) setCards(payload.cards);

      const action = pendingAction;
      setPendingAction(null);
      setConsentOpen(false);
      await runAction(action);
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Your choice could not be saved.",
      );
    } finally {
      setConsentBusy(false);
    }
  };

  const declineConsent = () => {
    if (consentBusy) return;
    setConsentOpen(false);
    setPendingAction(null);
    setNotice("No cookie was set and the roadmap was not changed.");
  };

  const submitIdea = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void runAction({ type: "submit", title, description, website });
  };

  const toggleColumn = (status: RoadmapStatus) =>
    setExpandedColumns((current) => ({
      ...current,
      [status]: !current[status],
    }));

  return (
    <div ref={boardRef}>
      <SectionTitle
        eyebrow="Public roadmap"
        title="Follow the work. Shape what comes next."
        subtitle="The board is read-only, but everyone can suggest ideas and upvote any card without creating an account."
      />

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <Check aria-hidden="true" className="size-4 text-primary" />
          No login required
        </span>
        <span className="inline-flex items-center gap-2">
          <Check aria-hidden="true" className="size-4 text-primary" />
          One upvote per card and browser
        </span>
        <span className="inline-flex items-center gap-2">
          <Check aria-hidden="true" className="size-4 text-primary" />
          Community ideas always enter Requested
        </span>
      </div>

      {notice && (
        <div className="pointer-events-none fixed inset-x-0 bottom-[20vh] z-[80] flex justify-center px-4">
          <p
            className="w-fit max-w-[calc(100vw-2rem)] rounded-pill border border-secondary-strong bg-secondary px-4 py-2 text-center text-sm font-semibold text-on-dark shadow-lg"
            role="status"
          >
            {notice}
          </p>
        </div>
      )}
      {actionError && (
        <div className="pointer-events-none fixed inset-x-0 bottom-[20vh] z-[80] flex justify-center px-4">
          <p
            className="w-fit max-w-[calc(100vw-2rem)] rounded-pill border border-danger bg-danger px-4 py-2 text-center text-sm font-semibold text-on-dark shadow-lg"
            role="alert"
          >
            {actionError}
          </p>
        </div>
      )}

      {loading ? (
        <div className="mt-12 flex min-h-48 items-center justify-center rounded-2xl border border-border bg-card text-muted" role="status">
          <LoaderCircle aria-hidden="true" className="mr-3 size-5 animate-spin" />
          Loading roadmap…
        </div>
      ) : loadError ? (
        <div className="mt-12 rounded-2xl border border-danger bg-background p-6 text-danger" role="alert">
          {loadError}
        </div>
      ) : (
        <div
          data-roadmap-board
          className="mt-12 grid gap-[0.1875rem] md:grid-cols-2 xl:grid-cols-4"
        >
          {ROADMAP_STATUSES.map((status) => {
            const column = COLUMNS[status];
            const columnCards = cards.filter((card) => card.status === status);
            const expanded = expandedColumns[status] ?? false;
            const collapsible = columnCards.length > VISIBLE_CARD_LIMIT;
            const hiddenCount = columnCards.length - VISIBLE_CARD_LIMIT;
            const visibleCards =
              collapsible && !expanded
                ? columnCards.slice(0, VISIBLE_CARD_LIMIT)
                : columnCards;

            return (
              <section
                key={status}
                id={status}
                aria-labelledby={`${status}-heading`}
                className="min-w-0 border-t border-border pt-5 md:px-2 xl:px-3"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <h3 id={`${status}-heading`} className="font-display text-xl">
                      {column.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {column.description}
                    </p>
                  </div>
                  <Badge tone={column.badgeTone}>
                    {status === "released" && (
                      <Rocket aria-hidden="true" className="size-3.5" />
                    )}
                    {columnCards.length}
                  </Badge>
                </div>

                <div id={`${status}-cards`} className="grid gap-[0.1875rem]">
                  {status === "requested" && (
                    <RequestIdeaForm
                      open={formOpen}
                      onOpen={() => setFormOpen(true)}
                      onClose={() => setFormOpen(false)}
                      onSubmit={submitIdea}
                      title={title}
                      setTitle={setTitle}
                      description={description}
                      setDescription={setDescription}
                      website={website}
                      setWebsite={setWebsite}
                      submitting={submitting}
                    />
                  )}

                  {visibleCards.map((card) => (
                    <RoadmapCard
                      key={card.id}
                      card={card}
                      voting={votingCardId === card.id}
                      onUpvote={() =>
                        void runAction({ type: "upvote", cardId: card.id })
                      }
                    />
                  ))}

                  {collapsible && (
                    <button
                      type="button"
                      onClick={() => toggleColumn(status)}
                      aria-expanded={expanded}
                      aria-controls={`${status}-cards`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-pill px-2 py-2 text-sm font-semibold text-primary underline-offset-4 transition-colors hover:text-primary-strong hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {expanded ? "Show fewer" : `Show ${hiddenCount} more`}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "size-4 transition-transform duration-200",
                          expanded && "rotate-180",
                        )}
                      />
                    </button>
                  )}

                  {columnCards.length === 0 && (
                    <div className="rounded-xl border border-dashed border-border bg-background/55 p-5 text-sm leading-6 text-muted">
                      {status === "requested"
                        ? "No community requests yet. Add the first idea."
                        : status === "in-development"
                          ? "No item is publicly marked in development right now."
                          : "Nothing is listed here yet."}
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      )}

      <Dialog
        open={consentOpen}
        onClose={declineConsent}
        title="Remember your roadmap action?"
        description="To prevent ordinary duplicate votes and repeated submissions, ArraySubs can save one anonymous first-party cookie on this browser."
      >
        <div className="rounded-xl border border-border bg-card p-4 text-sm leading-6 text-muted">
          <p>
            The cookie contains a random identifier, not your name or email. It
            is created only after you choose Allow and continue, lasts for one
            year, and is not added to the site-wide consent notice.
          </p>
          <p className="mt-3">
            Read the details in the{" "}
            <Link
              href="/trust-center/privacy-policy/#roadmap-participation"
              className="font-semibold text-primary underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-[0.1875rem]">
          <Button
            type="button"
            variant="outline"
            size="sm"
            layers="2layer"
            disabled={consentBusy}
            onClick={declineConsent}
            fullWidth
          >
            Not now
          </Button>
          <Button
            type="button"
            size="sm"
            layers="2layer"
            disabled={consentBusy}
            iconLeft={
              consentBusy ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : undefined
            }
            onClick={() => void acceptConsent()}
            fullWidth
          >
            {consentBusy ? "Saving…" : "Allow and continue"}
          </Button>
        </div>
      </Dialog>
    </div>
  );
}

function RequestIdeaForm({
  open,
  onOpen,
  onClose,
  onSubmit,
  title,
  setTitle,
  description,
  setDescription,
  website,
  setWebsite,
  submitting,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  website: string;
  setWebsite: (value: string) => void;
  submitting: boolean;
}) {
  if (!open) {
    return (
      <div className="rounded-xl border border-primary bg-background p-4">
        <Lightbulb aria-hidden="true" className="size-5 text-primary" />
        <p className="mt-3 text-sm leading-6 text-muted">
          Missing something useful? Put it on the board.
        </p>
        <Button
          type="button"
          variant="primary"
          size="xs"
          layers="2layer"
          iconLeft={<Plus className="size-4" />}
          className="mt-4"
          onClick={onOpen}
          fullWidth
        >
          Suggest an idea
        </Button>
      </div>
    );
  }

  return (
    <form
      id="roadmap-request-form"
      onSubmit={onSubmit}
      className="rounded-xl border border-primary bg-background p-4"
    >
      <h4 className="font-display text-lg">Add an idea</h4>
      <div className="mt-4 grid gap-4">
        <Field label="Feature title" required>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            minLength={6}
            maxLength={90}
            placeholder="A short, specific title"
            disabled={submitting}
            required
          />
        </Field>
        <Field
          label="Why it would help"
          description="Keep it practical and concise."
          required
        >
          <Textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            minLength={12}
            maxLength={280}
            rows={4}
            placeholder="Describe the problem or outcome"
            disabled={submitting}
            required
          />
        </Field>
        <div
          aria-hidden="true"
          className="absolute left-[-100rem] h-[0.0625rem] w-[0.0625rem] overflow-hidden"
        >
          <label htmlFor="roadmap-website">Website</label>
          <input
            id="roadmap-website"
            name="website"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-[0.1875rem]">
        <Button
          type="button"
          variant="outline"
          size="xs"
          layers="2layer"
          onClick={onClose}
          disabled={submitting}
          fullWidth
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="xs"
          layers="2layer"
          disabled={submitting}
          iconLeft={
            submitting ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : undefined
          }
          fullWidth
        >
          {submitting ? "Submitting…" : "Add request"}
        </Button>
      </div>
    </form>
  );
}

function RoadmapCard({
  card,
  voting,
  onUpvote,
}: {
  card: PublicRoadmapCard;
  voting: boolean;
  onUpvote: () => void;
}) {
  const voteLabel = card.hasUpvoted ? "Upvoted" : "Upvote";

  return (
    <article className="rounded-xl border border-border bg-card p-4">
      <div className="min-w-0">
        <h4 className="font-display text-lg">{card.title}</h4>
        {card.isCommunityRequest && (
          <p className="mt-2 text-xs font-semibold tracking-wide text-primary uppercase">
            Requested by a customer
          </p>
        )}
      </div>
      <p className="mt-2 text-sm leading-6 text-muted">{card.description}</p>
      <div
        className={`mt-4 flex items-center gap-3 ${card.status === "released" ? "justify-end" : "justify-between"}`}
      >
        {card.status !== "released" && (
          <Button
            type="button"
            variant={card.hasUpvoted ? "highlight" : "outline"}
            size="xxs"
            layers="2layer"
            iconLeft={
              voting ? (
                <LoaderCircle className="size-3.5 animate-spin" />
              ) : (
                <ArrowUp className="size-3.5" />
              )
            }
            aria-pressed={card.hasUpvoted}
            disabled={voting || card.hasUpvoted}
            onClick={onUpvote}
          >
            {voting ? "Voting…" : voteLabel}
          </Button>
        )}
        {card.upvotes > 0 && (
          <span
            aria-label={`${card.upvotes} ${card.upvotes === 1 ? "upvote" : "upvotes"}`}
            className="relative flex size-6 shrink-0 items-center justify-center"
          >
            <Heart
              aria-hidden="true"
              className="absolute inset-0 size-6 fill-pink text-pink"
            />
            <span
              aria-hidden="true"
              className="relative z-10 -mt-px text-[0.625rem] leading-none font-bold tracking-tight text-on-dark"
            >
              {card.upvotes}
            </span>
          </span>
        )}
      </div>
    </article>
  );
}
