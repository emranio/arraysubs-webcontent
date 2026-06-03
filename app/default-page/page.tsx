import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { Container, PageHero, Section } from "@/components/ui";

export const metadata: Metadata = createMetadata({
  title: "Default Page",
  description: "A default ArrayHash page layout for inner page checks.",
  path: "/default-page/",
  noindex: true,
});

export default function DefaultPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Default Page", href: "/default-page/" },
        ]}
        title="Default Page"
        subtitle="A light-only inner page header using the shared PageHero component and the standard page-width container."
      />

      <Section spacing="md">
        <Container>
          <p className="max-w-3xl text-lg leading-8 text-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            interdum, mi vitae dignissim cursus, massa libero consequat sem, sed
            facilisis erat risus in augue. Curabitur porta, nibh at suscipit
            rhoncus, sapien mauris luctus lectus, vitae blandit lorem nisl nec
            velit.
          </p>
        </Container>
      </Section>
    </>
  );
}
