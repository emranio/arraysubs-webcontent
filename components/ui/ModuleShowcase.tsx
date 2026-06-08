import { ArrowUpRight, MonitorPlay } from "lucide-react";
import { cn } from "@/lib/cn";
import { LetterRevealText } from "@/components/animation/LetterRevealText";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

type ModuleShowcaseProps = {
  moduleCount?: number;
  compact?: boolean;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function ModuleShowcase({
  moduleCount = 27,
  compact = false,
  primaryHref = "#cta",
  primaryLabel = "Get Pro Access — Free",
  secondaryHref = "#demo",
  secondaryLabel = "Live Demo",
}: ModuleShowcaseProps) {
  return (
    <Section
      surface="default"
      spacing="none"
      aria-labelledby="module-showcase-title"
      className="overflow-hidden"
    >
      <Container
        className={cn(
          "grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(24rem,0.72fr)] lg:gap-16 lg:py-24",
          !compact && "min-h-[calc(100svh-4rem)]",
        )}
      >
        <div className="flex flex-col font-display">
          <Eyebrow className="mb-6 font-display normal-case tracking-normal">
            <LetterRevealText
              text="Available Modules"
              mode="scrub"
              start="top 92%"
              end="top 54%"
              y={1.1}
              stagger={0.035}
            />
          </Eyebrow>

          <h2
            id="module-showcase-title"
            aria-label={`${moduleCount}+ available modules for WooCommerce stores`}
            className="max-w-[52rem] font-display text-[2.875rem] leading-[0.9] font-bold tracking-normal text-foreground sm:text-[5.25rem] lg:text-[5.25rem] xl:text-[5.75rem]"
          >
            <LetterRevealText
              text="Available"
              ariaHidden
              className="block"
              mode="scrub"
              start="top 92%"
              end="top 44%"
              y={1.35}
              stagger={0.035}
            />
            <span className="block whitespace-nowrap">
              <LetterRevealText
                text="Modules"
                ariaHidden
                className="inline text-primary"
                mode="scrub"
                start="top 90%"
                end="top 42%"
                y={1.35}
                stagger={0.035}
              />
              <LetterRevealText
                text=" for"
                ariaHidden
                className="inline"
                mode="scrub"
                start="top 90%"
                end="top 42%"
                y={1.35}
                stagger={0.035}
              />
            </span>
            <span className="block">
              <LetterRevealText
                text="Woo"
                ariaHidden
                className="inline"
                mode="scrub"
                start="top 88%"
                end="top 40%"
                y={1.35}
                stagger={0.035}
              />
              <span className="sm:hidden"><br /></span>
              <LetterRevealText
                text="Commerce"
                ariaHidden
                className="inline"
                mode="scrub"
                start="top 88%"
                end="top 40%"
                y={1.35}
                stagger={0.035}
              />
            </span>
            <LetterRevealText
              text="Stores"
              ariaHidden
              className="block"
              mode="scrub"
              start="top 86%"
              end="top 38%"
              y={1.35}
              stagger={0.035}
            />
          </h2>

          <div
            className="mt-8 flex items-end sm:mt-10 lg:mt-12"
            aria-label={`${moduleCount}+ available modules`}
          >
            <span className="sr-only">{moduleCount}+ available modules</span>
            <span
              aria-hidden="true"
              className="font-display text-[8rem] leading-[0.8] font-bold tracking-normal text-primary sm:text-[11rem] lg:text-[12.5rem] xl:text-[14rem]"
            >
              {moduleCount}+
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center lg:pt-24">
          <div className="mb-10 flex items-start gap-5 sm:mb-12">
            <img
              src="/shapes/shape-3.webp"
              alt=""
              width={86}
              height={90}
              aria-hidden="true"
              className="mt-3 h-[5.625rem] w-[5.375rem] shrink-0"
            />
            <p className="min-w-0 max-w-[22rem] font-display text-xl leading-tight font-semibold tracking-normal text-foreground sm:text-3xl">
              You do not need extra plugins for premium subscription workflows.
            </p>
          </div>

          <p className="max-w-[39rem] text-lg leading-8 font-normal text-muted sm:text-xl">
            Whether you sell recurring products, memberships, store credit, or
            gated content,{" "}
            <span className="text-foreground">
              ArraySubs keeps the core workflows in one fast WooCommerce
              plugin.
            </span>
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-20 xl:mt-24">
            <Button
              href={primaryHref}
              size="md"
              iconRight={<ArrowUpRight aria-hidden="true" className="size-5" />}
            >
              {primaryLabel}
            </Button>
            <Button
              href={secondaryHref}
              variant="outline"
              size="md"
              iconLeft={<MonitorPlay aria-hidden="true" className="size-5" />}
            >
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
