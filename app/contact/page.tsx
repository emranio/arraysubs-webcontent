import type { Metadata } from "next";
import { ArrowUpRight, LifeBuoy, Mail } from "lucide-react";
import { createMetadata, faqSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import {
  Accordion,
  Button,
  Container,
  ContactForm,
  CTA,
  IconCard,
  PageHero,
  Section,
  SectionTitle,
} from "@/components/ui";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with the ArraySubs team. Email us, reach out on Facebook or X, or share your contact details so we can reply within one business day.",
  path: "/contact/",
});

const FAQ_ITEMS = [
  {
    question: "How fast will I hear back?",
    answer:
      "Most messages get a reply within one business day — often the same day. Complex technical issues can take a little longer while we reproduce them, but you'll always get an acknowledgement first.",
  },
  {
    question: "Is support free for the free plugin?",
    answer:
      "Yes. Free and Pro users reach the same inbox, and the Help Center and documentation are open to everyone. We don't gate help behind a paid plan.",
  },
  {
    question: "I think I found a bug — where do I report it?",
    answer:
      "Email us with the steps to reproduce, your WordPress and WooCommerce versions, and a screenshot if you can. The more detail you share, the faster we can fix it.",
  },
  {
    question: "Can you help me migrate from another subscription plugin?",
    answer:
      "Absolutely. Tell us what you're moving from and roughly how many active subscriptions you have, and we'll walk you through the safest path.",
  },
  {
    question: "Can I request a feature?",
    answer:
      "Please do. We read every request and prioritise the ones we hear most. Send it by email or reach out on Facebook or X.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact/" },
        ]}
        title="Let's talk."
        subtitle="Evaluating ArraySubs, stuck on setup, or just want to share feedback? Share your contact details or email us directly. We reply fast, no bots, no ticket maze."
        highlights={[
          "Replies within 1 business day",
          "Talk to the team, not a bot",
          "Free & Pro — same inbox",
        ]}
        actions={
          <>
            <Button
              size="lg"
              magnetic
              href={`mailto:${site.email}`}
              iconLeft={<Mail className="size-5" />}
            >
              Email us
            </Button>
            <Button
              variant="outline"
              size="lg"
              magnetic
              href="https://support.arrayhash.com/arraysubs/"
              iconRight={<ArrowUpRight className="size-5" />}
            >
              Visit the Help Center
            </Button>
          </>
        }
      />

      {/* ---- Form + direct channels ----------------------------------- */}
      <Section surface="surface" spacing="md">
        <Container>
          <div className="grid items-stretch gap-[0.1875rem] lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
            {/* Message form */}
            <div className="h-full rounded-2xl bg-card p-6 text-foreground sm:p-8">
              <h2 className="font-display text-2xl sm:text-3xl">
                Share your contact details
              </h2>
              <p className="mt-2 text-muted">
                This form collects only your name, email, subject and message.
                We&apos;ll use it to reply within one business day.
              </p>
              <ContactForm className="mt-8" />
            </div>

            {/* Direct channels */}
            <ScrollReveal
              y={1}
              className="grid h-full content-start gap-[0.1875rem]"
            >
              <div className="rounded-2xl bg-card p-6 text-foreground sm:p-8">
                <SectionTitle
                  title="Other ways to reach us"
                  subtitle="Pick whatever's easiest — they all reach the same small team."
                  size="sm"
                  className="gap-2"
                />
              </div>
              <IconCard
                icon={<Mail className="size-6" />}
                title="Email us"
                description={site.email}
                href={`mailto:${site.email}`}
              />
              <IconCard
                icon={<FacebookIcon className="size-6" />}
                title="Facebook"
                description="facebook.com/arrayhash"
                href="https://www.facebook.com/arrayhash"
              />
              <IconCard
                icon={<XIcon className="size-6" />}
                title="X (Twitter)"
                description="x.com/arrayhash"
                href="https://x.com/arrayhash"
              />
              <IconCard
                icon={<LifeBuoy className="size-6" />}
                title="Help Center"
                description="support.arrayhash.com"
                href="https://support.arrayhash.com/arraysubs/"
              />
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* ---- FAQ ------------------------------------------------------- */}
      <Section surface="default" spacing="md">
        <Container>
          <SectionTitle
            eyebrow="FAQ"
            title="Before you reach out"
            subtitle="Quick answers to the things people ask most."
            align="center"
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion items={FAQ_ITEMS} defaultOpen={[0]} />
          </div>
        </Container>
        <JsonLd data={faqSchema(FAQ_ITEMS)} />
      </Section>

      {/* ---- Closing CTA ---------------------------------------------- */}
      <Section surface="primary" spacing="md">
        <Container>
          <CTA
            surface="primary"
            flat
            eyebrow="Ready to buy"
            title="Choose an ArraySubs Pro plan"
            subtitle="Personal, Professional, and Agency all include the full Pro feature set. Pick the site count that fits your store."
            actions={
              <>
                <Button
                  href="/deals/arraysubs/pricing/"
                  variant="dark"
                  size="lg"
                  layers="2layer"
                  magnetic
                >
                  View Pricing
                </Button>
                <Button
                  href="https://support.arrayhash.com/arraysubs/"
                  variant="outline"
                  size="lg"
                  layers="2layer"
                  magnetic
                >
                  Help Center
                </Button>
              </>
            }
          />
        </Container>
      </Section>
    </>
  );
}

/* ============================================================================
   Local brand glyphs (currentColor, flat — like ArrayHashMark). lucide-react
   ships no social brand icons, so we inline the Facebook and X marks here.
   ========================================================================== */

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.026 4.388 11.02 10.125 11.927v-8.44H7.078v-3.487h3.047V9.43c0-3.014 1.792-4.68 4.533-4.68 1.313 0 2.686.235 2.686.235v2.97h-1.513c-1.49 0-1.955.93-1.955 1.886v2.265h3.328l-.532 3.487h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  );
}
