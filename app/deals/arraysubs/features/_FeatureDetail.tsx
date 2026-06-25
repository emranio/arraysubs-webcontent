import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Accordion,
  Badge,
  Button,
  Container,
  CTA,
  IconCard,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";
import { getFeature, type Feature, type FeatureTier } from "./_data";
import { useCasesForFeature } from "../use-cases/_data";
import { highlight } from "../_highlight";

const GET_PRO = "/deals/arraysubs/pricing/";

const tierTone = (tier: FeatureTier) =>
  tier === "Free" ? "highlight" : tier === "Pro" ? "dark" : "primary";

/**
 * Shared template for every `/deals/arraysubs/features/<slug>/` page. All copy
 * comes from `_data.ts`; this only arranges it with the design system.
 */
export function FeatureDetail({ feature }: { feature: Feature }) {
  const related = feature.related
    .map((slug) => getFeature(slug))
    .filter((item): item is Feature => Boolean(item));
  const useCases = useCasesForFeature(feature.slug);
  const hasRelatedContent = related.length > 0 || useCases.length > 0;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "ArraySubs", href: "/deals/arraysubs/" },
          { name: "Features", href: "/deals/arraysubs/features/" },
          {
            name: feature.name,
            href: `/deals/arraysubs/features/${feature.slug}/`,
          },
        ]}
        title={feature.h1}
        subtitle={feature.heroSubtitle}
        highlights={[feature.tier, ...feature.heroHighlights]}
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

      {feature.screenshot && (
        <Section surface="surface" spacing="sm">
          <Container>
            <figure className="mx-auto max-w-6xl">
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <Image
                  src={feature.screenshot.src}
                  alt={feature.screenshot.alt}
                  width={1600}
                  height={1000}
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-center text-sm text-muted">
                {feature.screenshot.caption}
              </figcaption>
            </figure>
          </Container>
        </Section>
      )}

      {/* ---- Overview + key stats --------------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <p className="text-xl leading-9 text-muted text-pretty sm:text-2xl sm:leading-10">
              {highlight(feature.intro)}
            </p>
            <ul className="grid grid-cols-2 gap-[0.1875rem]">
              {feature.stats.map((stat) => (
                <li
                  key={stat.label}
                  className="rounded-2xl bg-card p-6 text-center"
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
          </div>
        </Container>
      </Section>

      {/* ---- Capabilities ----------------------------------------------- */}
      <Section surface="surface" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Capabilities"
            title="Everything this module gives you"
            subtitle={`What you get with ${feature.name} in ArraySubs.`}
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
            {feature.capabilities.map((capability) => (
              <IconCard
                key={capability.title}
                icon={<Check className="size-6" />}
                title={capability.title}
                description={capability.description}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- FAQ -------------------------------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="FAQ"
            title={`${feature.name} questions, answered`}
            align="center"
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion items={feature.faq} defaultOpen={[0]} />
          </div>
        </Container>
        <JsonLd data={faqSchema(feature.faq)} />
      </Section>

      {/* ---- Related features + use cases ------------------------------- */}
      {hasRelatedContent && (
        <Section surface="surface" spacing="md">
          <Container>
            <SectionTitle
              eyebrow="Explore more"
              title="Related features & use cases"
              subtitle="Modules that pair well with this feature, plus the business models it supports."
              align="center"
            />
            <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <IconCard
                  key={item.slug}
                  icon={<item.icon className="size-6" />}
                  title={item.name}
                  description={item.cardDescription}
                  href={`/deals/arraysubs/features/${item.slug}/`}
                  badge={<Badge tone={tierTone(item.tier)}>{item.tier}</Badge>}
                />
              ))}
              {useCases.map((useCase) => (
                <IconCard
                  key={useCase.slug}
                  icon={<useCase.icon className="size-6" />}
                  title={useCase.name}
                  description={useCase.cardDescription}
                  href={`/deals/arraysubs/use-cases/${useCase.slug}/`}
                  badge={<Badge tone="outline">Use case</Badge>}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

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
