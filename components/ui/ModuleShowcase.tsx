import { ArrowUpRight, MonitorPlay } from "lucide-react";
import { LetterRevealText } from "@/components/animation/LetterRevealText";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

type ModuleShowcaseProps = {
  moduleCount?: number;
};

export function ModuleShowcase({ moduleCount = 19 }: ModuleShowcaseProps) {
  return (
    <Section
      surface="default"
      spacing="none"
      aria-labelledby="module-showcase-title"
      className="overflow-hidden"
    >
      <Container className="grid min-h-[calc(100svh-4rem)] items-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(24rem,0.72fr)] lg:gap-16 lg:py-24">
        <div className="flex flex-col font-display">
          <Eyebrow className="mb-6 font-display normal-case tracking-normal">
            <LetterRevealText text="Available Modules" delay={0.05} />
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
              delay={0.12}
              stagger={0.018}
            />
            <span className="block whitespace-nowrap">
              <LetterRevealText
                text="Modules"
                ariaHidden
                className="inline text-primary"
                delay={0.26}
                stagger={0.018}
              />
              <LetterRevealText
                text=" for"
                ariaHidden
                className="inline"
                delay={0.39}
                stagger={0.018}
              />
            </span>
            <span className="block">
              <LetterRevealText
                text="Woo"
                ariaHidden
                className="inline"
                delay={0.46}
                stagger={0.018}
              />
              <span className="sm:hidden"><br /></span>
              <LetterRevealText
                text="Commerce"
                ariaHidden
                className="inline"
                delay={0.52}
                stagger={0.018}
              />
            </span>
            <LetterRevealText
              text="Stores"
              ariaHidden
              className="block"
              delay={0.66}
              stagger={0.018}
            />
          </h2>

          <div
            className="mt-8 flex items-end sm:mt-10 lg:mt-12"
            aria-label={`${moduleCount}+ available modules`}
          >
            <span className="sr-only">{moduleCount}+ available modules</span>
            <img
              src="/shapes/module-count-3d.png"
              alt=""
              width={1448}
              height={1086}
              aria-hidden="true"
              className="h-auto w-[15rem] max-w-full sm:w-[21rem] lg:w-[24rem] xl:w-[27rem]"
            />
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
              href="#cta"
              size="md"
              iconRight={<ArrowUpRight aria-hidden="true" className="size-5" />}
            >
              Get Pro Access — Free
            </Button>
            <Button
              href="#demo"
              variant="outline"
              size="md"
              iconLeft={<MonitorPlay aria-hidden="true" className="size-5" />}
            >
              Live Demo
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
