import type { Metadata } from "next";
import { FileCheck2, Mail } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { Button, PageHero } from "@/components/ui";
import { site } from "@/lib/site";
import {
  EFFECTIVE_DATE,
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
  title: "Terms of Service",
  description:
    "Terms governing use of the ArrayHash website and ArraySubs Pro licenses, including payments, renewals, refunds, acceptable use, third-party services, and warranty limits.",
  path: "/trust-center/terms-of-service/",
});

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Terms of Service", href: "/trust-center/terms-of-service/" },
        ]}
        title="Terms of Service"
        subtitle="These terms govern use of the ArrayHash website, ArraySubs Pro licenses, payment and licensing workflows, and related support communications."
        highlights={[
          "Payment and licensing providers power checkout",
          "Refunds follow the 30-day policy",
          "Free plugin availability remains separate from Pro licensing",
        ]}
        actions={
          <Button
            href="/trust-center/refund-policy/"
            size="lg"
            magnetic
            iconLeft={<FileCheck2 className="size-5" />}
          >
            View refund policy
          </Button>
        }
      />

      <PolicyIntro
        facts={[
          { label: "Service provider", value: "ArrayHash" },
          { label: "Product", value: "All, sold on site" },
          { label: "Effective date", value: EFFECTIVE_DATE },
          { label: "Last reviewed", value: REVIEWED_DATE },
        ]}
      />

      <PolicyBody>
        <PolicySection title="Definitions">
          <PolicyTable
            caption="Terms definitions"
            headers={["Term", "Meaning"]}
            rows={[
              ["ArrayHash, we, us", "The business operating this website and the ArraySubs commercial offering."],
              ["ArraySubs", "The WooCommerce subscription and membership product."],
              ["ArraySubs Pro", "The paid or licensed version of ArraySubs distributed through ArrayHash payment and licensing flows."],
              ["Website", "arrayhash.com, including ArraySubs marketing and trust-center pages."],
              ["You", "A visitor, customer, license holder, merchant or organization using the website or ArraySubs Pro."],
            ]}
          />
        </PolicySection>

        <PolicySection title="Acceptance">
          <p>
            By using the website, creating a signup, joining the newsletter,
            contacting support, buying ArraySubs Pro, managing a license or using
            ArraySubs Pro, you agree to these terms.
          </p>
          <PolicyList
            items={[
              "You must be at least 18 years old or the age of majority in your jurisdiction.",
              "If you act for an organization, you confirm that you have authority to bind that organization.",
              "You are responsible for keeping account, license and billing information accurate.",
            ]}
          />
        </PolicySection>

        <PolicySection title="License and product access">
          <p>
            ArraySubs Pro licenses are granted, not sold. A license gives you a
            non-exclusive, non-transferable right to use ArraySubs Pro according
            to the license tier, site count and commercial terms shown at
            checkout or in your account.
          </p>
          <PolicyList
            items={[
              "License keys and account access may not be shared, resold or sublicensed.",
              "Using ArraySubs Pro beyond the purchased site count may require an upgrade.",
              "ArrayHash may suspend or terminate a Pro license if these terms are violated.",
              "The free ArraySubs plugin, where available through WordPress.org, remains governed by its open-source license and WordPress.org distribution terms.",
            ]}
          />
        </PolicySection>

        <PolicySection title="Payments, billing and licensing providers">
          <p>
            Payment and licensing providers are active for checkout, payment
            processing, license and account management, taxes where applicable,
            fraud prevention, transaction support and refunds. ArrayHash does
            not store full card numbers or card security codes.
          </p>
          <PolicyTable
            caption="Provider responsibilities"
            headers={["Provider", "Role"]}
            rows={[
              ["Stripe", "Payment processing and card handling."],
              ["Checkout and licensing provider", "Checkout, licensing, accounts, invoices, taxes where applicable, transaction support and refund workflows."],
              ["ArrayHash", "Product, website, customer communication, license policy, refund policy and support."],
            ]}
          />
        </PolicySection>

        <PolicySection title="Renewals, cancellations and refunds">
          <PolicyList
            items={[
              "If a license is sold as recurring, it may renew automatically unless cancelled before renewal.",
              "Prices, taxes and renewal terms are shown through the checkout or account flow.",
              "Refunds are governed by the 30-day Refund Policy.",
              "Cancellation stops future renewal charges but does not automatically create a refund outside the Refund Policy.",
            ]}
          />
          <p>
            Read the{" "}
            <InlineLink href="/trust-center/refund-policy/">
              Refund Policy
            </InlineLink>{" "}
            for eligibility, timing and request instructions.
          </p>
        </PolicySection>

        <PolicySection title="No plugin telemetry">
          <PolicyNote title="What ArrayHash does not receive from ArraySubs">
            <PolicyList
              items={[
                "Plugin or theme installation and activation events.",
                "Feature usage telemetry.",
                "WooCommerce revenue, order, product, subscription or customer metrics.",
                "WordPress admin emails, WordPress user emails or customer emails from your store.",
                "WordPress, WooCommerce, PHP or plugin logs.",
              ]}
            />
          </PolicyNote>
        </PolicySection>

        <PolicySection title="Acceptable use">
          <PolicyList
            items={[
              "Do not use the website or ArraySubs Pro to violate law, privacy rights or intellectual-property rights.",
              "Do not attempt unauthorized access to ArrayHash, payment or provider systems.",
              "Do not distribute malware, spam, phishing content or harmful code through workflows involving ArrayHash services.",
              "Do not bypass license limits, payment controls or account restrictions.",
              "Do not submit secrets, passwords, full card details or unnecessary customer exports to support.",
            ]}
          />
        </PolicySection>

        <PolicySection title="Intellectual property">
          <p>
            ArrayHash, ArraySubs names, website copy, interface designs, logos,
            commercial content and proprietary product materials belong to
            ArrayHash or its licensors. You may not copy, resell or redistribute
            proprietary materials except where expressly allowed by law, license
            terms or written permission.
          </p>
        </PolicySection>

        <PolicySection title="Third-party services">
          <p>
            ArraySubs may work with WordPress, WooCommerce, payment gateways,
            hosting providers, email providers and other third-party services
            configured by the merchant. Those services are controlled by their
            own terms, privacy policies, availability and technical behavior.
          </p>
        </PolicySection>

        <PolicySection title="Disclaimer and limitation of liability">
          <p>
            The website and ArraySubs Pro are provided as available and as
            permitted by law. ArrayHash does not promise uninterrupted,
            error-free or universally compatible operation. You should test
            plugin updates on a staging site before using them in production.
          </p>
          <p>
            To the maximum extent permitted by law, ArrayHash is not liable for
            indirect, incidental, special, consequential or punitive damages, or
            for losses arising from third-party services, merchant
            configuration, hosting failures, payment gateway behavior or data
            managed in your own WordPress store.
          </p>
        </PolicySection>

        <PolicySection title="Changes, termination and contact">
          <p>
            ArrayHash may update these terms when product, payment, licensing,
            legal or provider practices change. Material changes are reflected
            by the last reviewed date on this page.
          </p>
          <p>
            Questions can be sent to{" "}
            <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>
            .
          </p>
          <Button
            href={`mailto:${site.email}`}
            size="lg"
            magnetic
            iconLeft={<Mail className="size-5" />}
          >
            Email terms question
          </Button>
        </PolicySection>
      </PolicyBody>

      <TrustCrossLinks currentPath="/trust-center/terms-of-service/" />
      <TrustContactCta title="Have a terms or billing question?" />
    </>
  );
}
