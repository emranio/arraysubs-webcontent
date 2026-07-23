import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { Container, PageHero, Section } from "@/components/ui";
import { AUTHOR_BASE, AUTHOR_LIST, getAuthorPath } from "./_data";

export const metadata: Metadata = createMetadata({
  title: "Authors",
  description:
    "The people who write and maintain the ArraySubs resource library, with verifiable experience in WooCommerce subscriptions, memberships, and recurring payments.",
  path: AUTHOR_BASE,
});

export default function AuthorsIndexPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Authors", href: AUTHOR_BASE },
        ]}
        eyebrow="Who writes this library"
        title="Authors"
        subtitle="Every ArraySubs guide is written from first-hand engineering of the plugin, and attributed to a named author with verifiable experience."
      />

      <Section surface="default" spacing="md">
        <Container>
          <div className="grid gap-[0.1875rem] md:grid-cols-2">
            {AUTHOR_LIST.map((author) => (
              <Link
                key={author.slug}
                href={getAuthorPath(author)}
                className="group flex items-center gap-5 rounded-xl bg-card p-6 outline-none transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:p-7"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={author.image}
                  width={author.imageWidth}
                  height={author.imageHeight}
                  alt={`Portrait of ${author.name}`}
                  className="size-20 shrink-0 rounded-xl object-cover sm:size-24"
                />
                <span className="min-w-0">
                  <span className="flex items-center gap-2 font-display text-2xl font-semibold">
                    {author.name}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-5 text-primary transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                  <span className="mt-1 block text-sm font-medium text-primary">
                    {author.jobTitle}
                  </span>
                  <span className="mt-3 block leading-7 text-muted text-pretty">
                    {author.headline}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
