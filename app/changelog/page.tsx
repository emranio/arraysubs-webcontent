import type { Metadata } from "next";
import { ChangelogTimeline } from "@/components/updates/ChangelogTimeline";
import { ProductResourceGrid } from "@/components/updates/ProductResourceGrid";
import { Container, PageHero, Section } from "@/components/ui";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Product Changelog",
  description:
    "Follow ArraySubs and ArraySubs Pro releases in one chronological timeline, including new features, improvements, integrations, and fixes.",
  path: "/changelog/",
});

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Changelog", href: "/changelog/" },
        ]}
        title="Product changelog"
        subtitle="One chronological view of ArraySubs core and Pro releases—from the first subscription tools to the latest flexible billing work."
        highlights={[
          "ArraySubs core",
          "ArraySubs Pro",
          "Release notes in date order",
        ]}
      />

      <Section surface="default" spacing="md">
        <Container>
          <ProductResourceGrid active="changelog" />
        </Container>
      </Section>

      <Section
        id="release-timeline"
        surface="surface"
        spacing="md"
        aria-label="ArraySubs release timeline"
      >
        <Container>
          <ChangelogTimeline />
        </Container>
      </Section>
    </>
  );
}
