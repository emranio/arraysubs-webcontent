import { ArrowRight, Check } from "lucide-react";
import { faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Accordion,
  Badge,
  Button,
  Container,
  CTA,
  Eyebrow,
  IconCard,
  PageHero,
  Section,
  SectionTitle,
  StepCard,
} from "@/components/ui";
import { getFeature, type FeatureTier } from "../features/_data";
import type { UseCase } from "./_data";
import { highlight } from "../_highlight";

const GET_PRO = "/deals/arraysubs/pricing/";

const tierTone = (tier: FeatureTier) => (tier === "Free" ? "highlight" : "primary");

/**
 * Shared template for every `/deals/arraysubs/use-cases/<slug>/` page. Copy
 * comes from `_data.ts`; the related-feature cards resolve the use case's
 * feature slugs into links to the matching feature pages.
 */
export function UseCaseDetail({ useCase }: { useCase: UseCase }) {
  const relatedFeatures = useCase.relatedFeatures
    .map((slug) => getFeature(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "ArraySubs", href: "/deals/arraysubs/" },
          { name: "Use cases", href: "/deals/arraysubs/use-cases/" },
          {
            name: useCase.name,
            href: `/deals/arraysubs/use-cases/${useCase.slug}/`,
          },
        ]}
        title={useCase.h1}
        subtitle={useCase.heroSubtitle}
        highlights={useCase.heroHighlights}
        actions={
          <Button
            href={GET_PRO}
            size="lg"
            magnetic
            iconRight={<ArrowRight className="size-5" />}
          >
            Get Pro — Free
          </Button>
        }
      />

      {/* ---- Overview + outcomes + stats -------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <p className="text-xl leading-9 text-muted text-pretty sm:text-2xl sm:leading-10">
              {highlight(useCase.intro)}
            </p>
            <div className="rounded-2xl bg-card p-6 text-foreground sm:p-8">
              <Eyebrow>What you get</Eyebrow>
              <ul className="mt-5 flex flex-col gap-3">
                {useCase.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2.5">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-primary"
                    />
                    <span className="text-muted text-pretty">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-[0.1875rem] lg:grid-cols-4">
            {useCase.stats.map((stat) => (
              <li
                key={stat.label}
                className="rounded-2xl bg-card p-6 text-center text-foreground"
              >
                <span className="block font-display text-3xl font-bold text-primary sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-2 block text-sm text-muted text-pretty">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---- Who it's for ----------------------------------------------- */}
      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Who it's for"
            title={`Built for ${useCase.name}`}
            subtitle="If your business looks like one of these, ArraySubs fits."
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-4">
            {useCase.audience.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-card p-6 text-foreground sm:p-8"
              >
                <h3 className="font-display text-lg leading-tight text-balance">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted text-pretty">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Pain -> solution ------------------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="How it works"
            title={`How ArraySubs powers ${useCase.name}`}
            subtitle="The challenges this business model hits — and how ArraySubs solves each one."
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2">
            {useCase.points.map((point) => (
              <div
                key={point.problem}
                className="flex flex-col rounded-2xl bg-card p-6 text-foreground sm:p-8"
              >
                <p className="font-display text-lg text-balance">
                  {point.problem}
                </p>
                <div className="mt-5 flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-on-dark"
                  >
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <p className="text-muted text-pretty">{point.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- How to set it up ------------------------------------------- */}
      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Set up"
            title={`Launch in ${useCase.steps.length} steps`}
            subtitle="From install to a live, billing subscription — no developer required."
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
            {useCase.steps.map((step, index) => (
              <StepCard
                key={step.title}
                number={index + 1}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Example setups --------------------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Playbooks"
            title="Example setups you can build"
            subtitle="Proven configurations to copy as a starting point."
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
            {useCase.playbooks.map((playbook) => (
              <div
                key={playbook.title}
                className="flex flex-col rounded-2xl bg-card p-6 text-foreground sm:p-8"
              >
                <h3 className="font-display text-lg leading-tight text-balance">
                  {playbook.title}
                </h3>
                <p className="mt-3 text-muted text-pretty">
                  {playbook.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Related features (use case -> features) -------------------- */}
      {relatedFeatures.length > 0 && (
        <Section surface="surface" spacing="md">
          <Container>
            <SectionTitle
              eyebrow="Built with"
              title="Features that power this use case"
              subtitle="The ArraySubs modules behind it — explore each in depth."
              align="center"
            />
            <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
              {relatedFeatures.map((feature) => (
                <IconCard
                  key={feature.slug}
                  icon={<feature.icon className="size-6" />}
                  title={feature.name}
                  description={feature.cardDescription}
                  href={`/deals/arraysubs/features/${feature.slug}/`}
                  badge={<Badge tone={tierTone(feature.tier)}>{feature.tier}</Badge>}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ---- FAQ -------------------------------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="FAQ"
            title={`${useCase.name} questions, answered`}
            align="center"
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion items={useCase.faq} defaultOpen={[0]} />
          </div>
        </Container>
        <JsonLd data={faqSchema(useCase.faq)} />
      </Section>

      {/* ---- CTA -------------------------------------------------------- */}
      <Section surface="primary" spacing="md">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="Early launch offer"
            title="Get ArraySubs Pro — free for 4 months"
            subtitle="Start on the free-forever core today, and unlock every Pro feature free while early launch is open."
            microcopy="Limited time · no credit card required"
            actions={
              <Button
                href={GET_PRO}
                variant="dark"
                size="lg"
                layers="2layer"
                magnetic
                iconRight={<ArrowRight className="size-5" />}
              >
                Get Pro — Free
              </Button>
            }
          />
        </Container>
      </Section>
    </>
  );
}
