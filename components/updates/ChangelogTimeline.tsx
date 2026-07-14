"use client";

import { useRef } from "react";
import { Badge, SectionTitle } from "@/components/ui";
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/lib/gsap";
import { CHANGELOG_ENTRIES } from "@/lib/changelog";

const DATE_FORMATTER = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(value: string | null) {
  return value
    ? DATE_FORMATTER.format(new Date(`${value}T00:00:00Z`))
    : "Date not published";
}

export function ChangelogTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = timelineRef.current;
      if (!root) return;

      registerGsap();
      const fill = root.querySelector("[data-timeline-fill]");
      const releases = Array.from(root.querySelectorAll("[data-release]"));

      if (prefersReducedMotion()) {
        if (fill) gsap.set(fill, { scaleY: 1 });
        return;
      }

      if (fill) {
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 78%",
              end: "bottom 72%",
              scrub: 0.6,
            },
          },
        );
      }

      releases.forEach((release) => {
        const card = release.querySelector("[data-release-card]");
        const dot = release.querySelector("[data-release-dot]");

        if (card) {
          gsap.from(card, {
            autoAlpha: 0,
            y: 28,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: release,
              start: "top 88%",
              once: true,
            },
          });
        }

        if (dot) {
          gsap.from(dot, {
            scale: 0,
            duration: 0.45,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: release,
              start: "top 88%",
              once: true,
            },
          });
        }
      });
    },
    { scope: timelineRef },
  );

  return (
    <div>
      <SectionTitle
        eyebrow="Core + Pro"
        title="Every release, one timeline"
        subtitle="A concise public history combined from the canonical ArraySubs and ArraySubs Pro release notes."
      />

      <div ref={timelineRef} className="relative mt-12">
        <div
          aria-hidden="true"
          className="absolute top-3 bottom-3 left-[0.75rem] w-[0.0625rem] bg-border lg:left-[11.75rem]"
        >
          <div
            data-timeline-fill
            className="h-full w-full origin-top bg-primary"
          />
        </div>

        <ol className="grid gap-[0.1875rem]">
          {CHANGELOG_ENTRIES.map((entry) => {
            const formattedDate = formatDate(entry.releasedAt);

            return (
              <li
                key={`${entry.edition}-${entry.version}`}
                data-release
                className="relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-4 lg:grid-cols-[10rem_1.5rem_minmax(0,1fr)]"
              >
                <div className="hidden pt-7 text-right lg:block">
                  {entry.releasedAt ? (
                    <time
                      dateTime={entry.releasedAt}
                      className="text-sm font-semibold text-muted"
                    >
                      {formattedDate}
                    </time>
                  ) : (
                    <span className="text-sm font-semibold text-faint">
                      {formattedDate}
                    </span>
                  )}
                </div>

                <div className="relative z-10 flex justify-center pt-7">
                  <span
                    data-release-dot
                    aria-hidden="true"
                    className="size-4 rounded-full border-[0.1875rem] border-background bg-primary"
                  />
                </div>

                <article
                  data-release-card
                  className="rounded-2xl border border-border bg-card p-5 sm:p-7"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          tone={entry.edition === "Pro" ? "secondary" : "primary"}
                        >
                          {entry.product}
                        </Badge>
                        <span className="text-sm font-semibold text-faint">
                          {entry.edition}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-3xl">
                        Version {entry.version}
                      </h3>
                    </div>
                    <div className="lg:hidden">
                      {entry.releasedAt ? (
                        <time
                          dateTime={entry.releasedAt}
                          className="text-sm font-semibold text-muted"
                        >
                          {formattedDate}
                        </time>
                      ) : (
                        <span className="text-sm font-semibold text-faint">
                          {formattedDate}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="mt-6 grid gap-3">
                    {entry.changes.map((change) => (
                      <li
                        key={change}
                        className="grid grid-cols-[0.5rem_minmax(0,1fr)] items-start gap-3 leading-7 text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.6875rem] size-2 rounded-full bg-primary"
                        />
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
