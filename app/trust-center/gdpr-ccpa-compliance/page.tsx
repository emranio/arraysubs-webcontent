import type { Metadata } from "next";
import { Mail, Scale } from "lucide-react";
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
  title: "GDPR and CCPA Compliance",
  description:
    "ArrayHash GDPR, UK GDPR, CCPA and CPRA compliance information for ArraySubs website data, GA4, Stripe, Freemius, privacy rights, and no-sale commitments.",
  path: "/trust-center/gdpr-ccpa-compliance/",
});

export default function GdprCcpaCompliancePage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          {
            name: "GDPR and CCPA",
            href: "/trust-center/gdpr-ccpa-compliance/",
          },
        ]}
        title="GDPR and CCPA Compliance"
        subtitle="ArrayHash supports privacy rights for website, signup, newsletter, support, checkout and license data, while keeping merchant WordPress store data outside ArrayHash collection."
        highlights={[
          "No sale of personal data",
          "Rights requests by email",
          "No plugin telemetry",
        ]}
        actions={
          <Button
            href={`mailto:${site.email}?subject=Privacy%20rights%20request`}
            size="lg"
            magnetic
            iconLeft={<Mail className="size-5" />}
          >
            Submit rights request
          </Button>
        }
      />

      <PolicyIntro
        facts={[
          { label: "Covered laws", value: "GDPR, UK GDPR, CCPA/CPRA" },
          { label: "Response target", value: "Within 30 days" },
          { label: "Effective date", value: EFFECTIVE_DATE },
          { label: "Last reviewed", value: REVIEWED_DATE },
        ]}
      />

      <PolicyBody>
        <PolicySection title="What this page covers">
          <p>
            This page explains how ArrayHash handles privacy rights and regional
            privacy controls for personal data processed through the ArrayHash
            website, ArraySubs signup, newsletter, support, contact, checkout,
            payment, license, refund and account workflows.
          </p>
          <PolicyNote title="Merchant store data is not collected by ArrayHash">
            <p>
              ArraySubs does not send WooCommerce store metrics, customer data,
              WordPress admin emails, user emails, plugin installation events,
              activation events, usage telemetry or logs to ArrayHash. Merchants
              remain responsible for GDPR, UK GDPR, CCPA/CPRA and other privacy
              obligations for data inside their own WordPress and WooCommerce
              stores.
            </p>
          </PolicyNote>
        </PolicySection>

        <PolicySection title="Rights you can request">
          <PolicyTable
            caption="Privacy rights request types"
            headers={["Right", "What it means"]}
            rows={[
              ["Access", "Ask what personal data ArrayHash holds about you."],
              ["Correction", "Ask ArrayHash to correct inaccurate personal data."],
              ["Deletion", "Ask ArrayHash to delete personal data where deletion is legally available."],
              ["Restriction", "Ask ArrayHash to limit processing where applicable."],
              ["Portability", "Ask for a copy of data in a portable format where applicable."],
              ["Objection", "Object to processing based on legitimate interests where applicable."],
              ["Withdraw consent", "Withdraw consent for newsletter or analytics where consent is the basis."],
              ["Opt out of sale or sharing", "ArrayHash does not sell personal data or share it for cross-context behavioral advertising."],
            ]}
          />
        </PolicySection>

        <PolicySection title="How to make a request">
          <PolicyList
            items={[
              <>Email <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>.</>,
              "Use the email address connected to your signup, newsletter, support, contact, checkout or license record.",
              "Include your country and the right you want to exercise.",
              "For payment or license requests, include the order number, invoice number or license key if available.",
              "Do not send passwords, full card numbers, secret keys, customer exports or unnecessary store data.",
            ]}
          />
          <p>
            ArrayHash may need to verify your identity before completing a
            request. We respond within 30 days unless a legally permitted
            extension applies.
          </p>
        </PolicySection>

        <PolicySection title="No sale or cross-context advertising sharing">
          <p>
            ArrayHash does not sell personal data. ArrayHash does not use
            advertising pixels, retargeting pixels, heatmaps or session
            recordings. GA4 is used for aggregate website analytics, not
            advertising retargeting.
          </p>
          <PolicyTable
            caption="CCPA and CPRA posture"
            headers={["Practice", "ArrayHash position"]}
            rows={[
              ["Sale of personal data", "No."],
              ["Sharing for cross-context behavioral advertising", "No."],
              ["Advertising or retargeting pixels", "No."],
              ["Sensitive personal information use beyond necessary purposes", "No."],
              ["Discrimination for exercising rights", "No."],
            ]}
          />
        </PolicySection>

        <PolicySection title="Lawful bases and consent">
          <PolicyTable
            caption="Lawful bases and consent controls"
            headers={["Processing", "Basis or control"]}
            rows={[
              ["Signup, support and contact forms", "Contract or pre-contractual steps."],
              ["Newsletter", "Consent, with unsubscribe available."],
              ["GA4 analytics", "Consent where required and legitimate interests where permitted."],
              ["Stripe and Freemius payments, licenses and tax records", "Contract and legal obligation."],
              ["Security logs and abuse prevention", "Legitimate interests."],
            ]}
          />
        </PolicySection>

        <PolicySection title="Providers and international transfers">
          <p>
            ArrayHash uses Google Analytics 4, Stripe, Freemius and hosting
            providers. These providers may process data in countries outside your
            own. Provider privacy, security and transfer mechanisms apply to
            their processing.
          </p>
          <PolicyList
            items={[
              <>
                Stripe privacy information:{" "}
                <ExternalLink href="https://stripe.com/privacy">
                  stripe.com/privacy
                </ExternalLink>
                .
              </>,
              <>
                Freemius privacy information:{" "}
                <ExternalLink href="https://freemius.com/privacy/">
                  freemius.com/privacy
                </ExternalLink>
                .
              </>,
              <>
                GDPR rights reference:{" "}
                <ExternalLink href="https://www.edpb.europa.eu/sme-data-protection-guide/respect-individuals-rights_en">
                  European Data Protection Board guide
                </ExternalLink>
                .
              </>,
              <>
                CCPA reference:{" "}
                <ExternalLink href="https://oag.ca.gov/privacy/ccpa">
                  California Attorney General CCPA page
                </ExternalLink>
                .
              </>,
            ]}
          />
        </PolicySection>

        <PolicySection title="Controller and processor roles">
          <PolicyNote title="ArrayHash website data">
            <p>
              ArrayHash is the controller for personal data collected through
              its own website, signup, newsletter, support, contact, checkout,
              license, refund and account workflows.
            </p>
          </PolicyNote>
          <PolicyNote title="Merchant WooCommerce data">
            <p>
              A merchant using ArraySubs in a WooCommerce store is the controller
              for customer and store data processed in that WordPress
              installation. ArrayHash is not a processor for that store data
              unless a separate written agreement says otherwise.
            </p>
          </PolicyNote>
        </PolicySection>

        <PolicySection title="Contact">
          <p>
            Privacy rights requests should be sent to{" "}
            <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>
            . Put &quot;Privacy rights request&quot; in the subject line.
          </p>
          <Button
            href={`mailto:${site.email}?subject=Privacy%20rights%20request`}
            size="lg"
            magnetic
            iconLeft={<Scale className="size-5" />}
          >
            Email privacy rights request
          </Button>
        </PolicySection>
      </PolicyBody>

      <TrustCrossLinks currentPath="/trust-center/gdpr-ccpa-compliance/" />
      <TrustContactCta title="Need help with a privacy rights request?" />
    </>
  );
}
