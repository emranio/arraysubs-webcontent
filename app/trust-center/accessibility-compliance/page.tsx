import type { Metadata } from "next";
import { Accessibility, Keyboard, Mail, MousePointer2 } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { Button, PageHero } from "@/components/ui";
import { site } from "@/lib/site";
import {
  EFFECTIVE_DATE,
  ExternalLink,
  InlineLink,
  PolicyBody,
  PolicyIntro,
  PolicyList,
  PolicyNote,
  PolicySection,
  PolicyTable,
  REVIEWED_DATE,
  TrustContactCta,
  TrustCrossLinks,
} from "../_components";

export const metadata: Metadata = createMetadata({
  title: "Accessibility Compliance",
  description:
    "ArrayHash accessibility statement for ArraySubs pages, including WCAG 2.2 AA target, keyboard navigation, focus visibility, reduced motion, and issue reporting.",
  path: "/trust-center/accessibility-compliance/",
});

export default function AccessibilityCompliancePage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          {
            name: "Accessibility",
            href: "/trust-center/accessibility-compliance/",
          },
        ]}
        title="Accessibility Compliance"
        subtitle="ArrayHash designs ArraySubs marketing and trust pages to be usable with keyboard navigation, visible focus, readable contrast, semantic structure and reduced-motion preferences."
        highlights={[
          "WCAG 2.2 AA target",
          "Keyboard and focus-visible controls",
          "Reduced-motion support",
        ]}
        actions={
          <Button
            href={`mailto:${site.email}?subject=Accessibility%20issue`}
            size="lg"
            magnetic
            iconLeft={<Mail className="size-5" />}
          >
            Report an accessibility issue
          </Button>
        }
      />

      <PolicyIntro
        facts={[
          { label: "Standard", value: "WCAG 2.2 AA target" },
          { label: "Applies to", value: "ArrayHash website" },
          { label: "Effective date", value: EFFECTIVE_DATE },
          { label: "Last reviewed", value: REVIEWED_DATE },
        ]}
      />

      <PolicyBody>
        <PolicySection
          title="Accessibility commitment"
          subtitle="ArrayHash aims to make ArraySubs web pages usable by as many people as possible."
        >
          <p>
            The ArrayHash website is built with semantic landmarks, one main
            content region, clear headings, visible focus indicators,
            keyboard-operated navigation and controls, readable contrast and
            reduced-motion support. The target standard is{" "}
            <ExternalLink href="https://www.w3.org/TR/WCAG22/">
              WCAG 2.2 Level AA
            </ExternalLink>
            .
          </p>
        </PolicySection>

        <PolicySection title="Implemented practices">
          <div className="grid gap-[0.1875rem] md:grid-cols-3">
            <PolicyNote title="Keyboard">
              <Keyboard
                aria-hidden="true"
                className="mb-4 size-7 text-primary"
              />
              <p>
                Header links, mobile menu, buttons, forms, accordions, tabs and
                custom controls are designed for keyboard operation.
              </p>
            </PolicyNote>
            <PolicyNote title="Focus">
              <MousePointer2
                aria-hidden="true"
                className="mb-4 size-7 text-primary"
              />
              <p>
                Focus-visible styles are intentionally visible and must not be
                removed from interactive elements.
              </p>
            </PolicyNote>
            <PolicyNote title="Structure">
              <Accessibility
                aria-hidden="true"
                className="mb-4 size-7 text-primary"
              />
              <p>
                Pages use semantic landmarks, ordered headings, labelled
                navigation, meaningful link text and accessible tables.
              </p>
            </PolicyNote>
          </div>
        </PolicySection>

        <PolicySection title="Accessibility checklist">
          <PolicyTable
            caption="Accessibility checklist"
            headers={["Area", "Commitment"]}
            rows={[
              ["Landmarks", "Pages use header, main, footer and labelled navigation landmarks."],
              ["Headings", "Each page has one h1 and follows an ordered heading structure."],
              ["Keyboard", "Navigation and controls are operable without a mouse."],
              ["Focus", "Interactive elements expose visible focus states."],
              ["Color", "Text and controls are designed for readable contrast across site surfaces."],
              ["Motion", "Motion respects reduced-motion preferences."],
              ["Forms", "Fields use labels, descriptions and announced error states where applicable."],
              ["Tables", "Policy tables use captions, column headers and semantic table markup."],
            ]}
          />
        </PolicySection>

        <PolicySection title="Known limitations and ongoing work">
          <p>
            ArrayHash actively reviews accessibility as pages, forms and
            components change. If a third-party checkout, licensing or embedded
            provider interface is used, that provider&apos;s accessibility
            behavior may affect the final experience inside that flow.
          </p>
          <PolicyList
            items={[
              "We test pages at desktop and mobile widths when shipping new route or layout changes.",
              "We avoid hidden focus, unlabeled controls, inaccessible custom widgets and motion that blocks content.",
              "If an issue is found, ArrayHash prioritizes fixes based on severity, affected workflow and available workaround.",
            ]}
          />
        </PolicySection>

        <PolicySection title="Third-party flows">
          <p>
            Stripe and Freemius may provide checkout, payment, licensing or
            account screens. ArrayHash selects established providers and links to
            their own policies where relevant, but those third-party interfaces
            are controlled by the provider.
          </p>
        </PolicySection>

        <PolicySection title="Report an accessibility barrier">
          <p>
            If you have trouble using any ArrayHash or ArraySubs page, email{" "}
            <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>
            . Include the page URL, browser, device, assistive technology if
            relevant, and what blocked you. Do not include passwords, full card
            details or private customer exports.
          </p>
          <Button
            href={`mailto:${site.email}?subject=Accessibility%20issue`}
            size="lg"
            magnetic
            iconLeft={<Mail className="size-5" />}
          >
            Email accessibility issue
          </Button>
        </PolicySection>
      </PolicyBody>

      <TrustCrossLinks currentPath="/trust-center/accessibility-compliance/" />
      <TrustContactCta title="Need accessibility help?" />
    </>
  );
}
