import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { createMetadata, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Button,
  Container,
  CTA,
  Eyebrow,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";
import { USE_CASES, canDoForUseCase } from "../_data";

const GET_PRO = "/deals/arraysubs/pricing/";

const ALL_CAN_DO = USE_CASES.flatMap((useCase) => canDoForUseCase(useCase.slug));

export const metadata: Metadata = createMetadata({
  title: "Can I…? — Everything ArraySubs Can Do",
  description:
    "The specific questions store owners ask before they start — free trials, usage limits, plan switching, paywalls, retention offers, store credit, and more. Yes, ArraySubs can do that.",
  path: "/deals/arraysubs/use-cases/can-i/",
});

export default function CanIPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "ArraySubs", href: "/deals/arraysubs/" },
          { name: "Use cases", href: "/deals/arraysubs/use-cases/" },
          { name: "Can I…?", href: "/deals/arraysubs/use-cases/can-i/" },
        ]}
        title="Yes — ArraySubs can do that"
        subtitle={`The specific things store owners ask before they start, grouped by workflow. ${ALL_CAN_DO.length} answers — every one maps to a current ArraySubs module.`}
        highlights={[
          `${ALL_CAN_DO.length} answered questions`,
          `${USE_CASES.length} workflows`,
          "Free & Pro capabilities",
        ]}
        actions={
          <Button
            href={GET_PRO}
            size="lg"
            magnetic
            iconRight={<ArrowRight className="size-5" />}
          >
            Start Trial
          </Button>
        }
        trust="No credit card required"
      />

      <Section surface="default" spacing="md">
        <Container>
          <div className="flex flex-col gap-12">
            {USE_CASES.map((useCase) => {
              const items = canDoForUseCase(useCase.slug);
              if (items.length === 0) return null;
              return (
                <div key={useCase.slug}>
                  <Eyebrow>{useCase.name}</Eyebrow>
                  <div className="mt-5 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                      <div
                        key={item.question}
                        className="flex gap-3 rounded-2xl bg-card p-6 text-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-on-dark"
                        >
                          <Check className="size-4" strokeWidth={3} />
                        </span>
                        <div>
                          <p className="font-display font-semibold text-balance">
                            {item.question}
                          </p>
                          <p className="mt-1.5 text-muted text-pretty">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
        <JsonLd data={faqSchema(ALL_CAN_DO)} />
      </Section>

      {/* ---- CTA -------------------------------------------------------- */}
      <Section surface="primary" spacing="md">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="Paid Pro plans"
            title="Unlock Pro workflows when you need them"
            subtitle="Install the free core today, then choose a paid Pro plan for advanced modules, automation, analytics, and payment workflows."
            microcopy="No credit card required · Plans from $129/year · Lifetime options available"
            actions={
              <Button
                href={GET_PRO}
                variant="dark"
                size="lg"
                layers="2layer"
                magnetic
                iconRight={<ArrowRight className="size-5" />}
                >
                Start Trial
              </Button>
            }
          />
        </Container>
      </Section>
    </>
  );
}
