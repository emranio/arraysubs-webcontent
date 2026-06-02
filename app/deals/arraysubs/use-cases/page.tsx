import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { createMetadata, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Button,
  Container,
  CTA,
  Eyebrow,
  IconCard,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";
import { USE_CASES, canDoForUseCase } from "./_data";

export const metadata: Metadata = createMetadata({
  title: "Use Cases — WooCommerce Subscriptions for Every Business",
  description:
    "See how ArraySubs powers subscriptions and memberships for SaaS, membership sites, subscription boxes, online courses, content publishers, and service businesses.",
  path: "/deals/arraysubs/use-cases/",
});

const GET_PRO = "/deals/arraysubs/pricing/#get-pro";

export default function UseCasesHubPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "ArraySubs", href: "/deals/arraysubs/" },
          { name: "Use cases", href: "/deals/arraysubs/use-cases/" },
        ]}
        title="Whatever you sell, ArraySubs powers it"
        subtitle="From digital SaaS to physical subscription boxes — see how store owners run their business model on ArraySubs."
        highlights={[
          "6 business models",
          "One free-forever core",
          "Pro free for 4 months",
        ]}
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

      {/* ---- Use case grid ---------------------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="Use cases"
            title="Built for every subscription business"
            subtitle="Pick the model closest to yours — each guide maps the exact ArraySubs features behind it."
            align="center"
          />
          <div className="mt-12 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((useCase) => (
              <IconCard
                key={useCase.slug}
                icon={<useCase.icon className="size-6" />}
                title={useCase.name}
                description={useCase.cardDescription}
                href={`/deals/arraysubs/use-cases/${useCase.slug}/`}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- "Can I…?" capability checks (consolidated from all use cases) */}
      <Section surface="surface" spacing="md" id="can-i">
        <Container>
          <SectionTitle
            eyebrow="Can I…?"
            title="Yes — ArraySubs can do that"
            subtitle="The specific things store owners ask before they start, grouped by business model. Every answer is a feature that ships today."
            align="center"
          />
          <div className="mt-12 flex flex-col gap-12">
            {USE_CASES.map((useCase) => (
              <div key={useCase.slug}>
                <Eyebrow>{useCase.name}</Eyebrow>
                <div className="mt-5 grid gap-[0.1875rem] sm:grid-cols-2 lg:grid-cols-3">
                  {canDoForUseCase(useCase.slug).map((item) => (
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
            ))}
          </div>
        </Container>
        <JsonLd
          data={faqSchema(
            USE_CASES.flatMap((useCase) => canDoForUseCase(useCase.slug)),
          )}
        />
      </Section>

      {/* ---- CTA -------------------------------------------------------- */}
      <Section surface="primary" spacing="md">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="Early launch offer"
            title="Get ArraySubs Pro — free for 4 months"
            subtitle="Install the free core today, then unlock every Pro module free while early launch is open."
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
