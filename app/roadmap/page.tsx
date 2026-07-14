import type { Metadata } from "next";
import { MessageSquarePlus } from "lucide-react";
import { ProductResourceGrid } from "@/components/updates/ProductResourceGrid";
import { RoadmapBoard } from "@/components/roadmap/RoadmapBoard";
import { Button, Container, PageHero, Section } from "@/components/ui";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Product Roadmap",
  description:
    "View the public ArraySubs roadmap, suggest WooCommerce subscription ideas, and upvote requested, planned, in-development, or released features.",
  path: "/roadmap/",
});

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Roadmap", href: "/roadmap/" },
        ]}
        title="Product roadmaps"
        subtitle="See what the ArraySubs community is asking for, what is planned, what is being built, and what has shipped."
        highlights={[
          "Public and read-only board",
          "Anonymous idea submissions",
          "Upvote any feature",
        ]}
        actions={
          <Button
            href="#requested"
            size="lg"
            magnetic
            iconLeft={<MessageSquarePlus className="size-5" />}
          >
            Suggest an idea
          </Button>
        }
      />

      <Section surface="default" spacing="md">
        <Container>
          <ProductResourceGrid active="roadmap" />
        </Container>
      </Section>

      <Section surface="surface" spacing="md" aria-label="ArraySubs roadmap">
        <Container>
          <RoadmapBoard />
        </Container>
      </Section>
    </>
  );
}
