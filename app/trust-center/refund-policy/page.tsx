import type { Metadata } from "next";
import { CalendarCheck, Mail, ReceiptText, RotateCcw } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { Button, PageHero, StepCard } from "@/components/ui";
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
  title: "Refund Policy",
  description:
    "ArraySubs Pro refund policy. Learn about the 60-day money-back guarantee, Stripe and Freemius payment context, eligibility, renewals, and how to request a refund.",
  path: "/trust-center/refund-policy/",
});

export default function RefundPolicyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Refund Policy", href: "/trust-center/refund-policy/" },
        ]}
        title="60-Day Money-Back Guarantee"
        subtitle="ArraySubs Pro purchases are covered by a 60-day refund window. Refund requests are handled by email and processed through the payment provider used at checkout."
        highlights={[
          "60 calendar days from purchase or renewal",
          "Stripe and Freemius payment context",
          "Card details are not stored by ArrayHash",
        ]}
        actions={
          <Button
            href={`mailto:${site.email}?subject=ArraySubs%20refund%20request`}
            size="lg"
            magnetic
            iconLeft={<Mail className="size-5" />}
          >
            Request a refund
          </Button>
        }
      />

      <PolicyIntro
        facts={[
          { label: "Seller", value: "ArrayHash" },
          { label: "Product", value: "All, sold on site" },
          { label: "Effective date", value: EFFECTIVE_DATE },
          { label: "Last reviewed", value: REVIEWED_DATE },
        ]}
      />

      <PolicyBody>
        <PolicySection
          title="How refund requests work"
          subtitle="Email is the official refund request channel for this policy."
        >
          <div className="grid gap-[0.1875rem] md:grid-cols-3">
            <StepCard
              number={1}
              title="Email request"
              description={`Send your order email, country and order number to ${site.email}.`}
            />
            <StepCard
              number={2}
              title="We locate the order"
              description="ArrayHash checks the Stripe or Freemius transaction and confirms the refund window."
            />
            <StepCard
              number={3}
              title="Refund is issued"
              description="Eligible refunds are returned to the original payment method through the provider."
            />
          </div>
          <PolicyNote title="Information to include">
            <PolicyList
              items={[
                "The email address used at checkout.",
                "Your country.",
                "Order number, invoice number or license key if available.",
                "Purchase or renewal date if available.",
              ]}
            />
          </PolicyNote>
        </PolicySection>

        <PolicySection title="Eligibility">
          <PolicyTable
            caption="Refund eligibility"
            headers={["Item", "Policy"]}
            rows={[
              [
                "Product",
                "ArraySubs Pro licenses purchased through ArrayHash, Stripe or Freemius checkout.",
              ],
              [
                "Window",
                "60 calendar days from the original purchase date or renewal charge date.",
              ],
              [
                "Amount",
                "100% of the eligible purchase or renewal charge.",
              ],
              [
                "Payment method",
                "Refunds are sent to the original payment method through Stripe or Freemius.",
              ],
              [
                "Card details",
                "ArrayHash does not store card numbers or card security codes.",
              ],
            ]}
          />
        </PolicySection>

        <PolicySection title="What is not refundable">
          <PolicyTable
            caption="Non-refundable items"
            headers={["Item", "Reason"]}
            rows={[
              [
                "Purchases older than 60 days",
                "Outside the stated guarantee window.",
              ],
              [
                "Renewals older than 60 days",
                "Outside the renewal refund window.",
              ],
              [
                "Chargebacks or bank disputes filed before contacting ArrayHash",
                "The payment provider or bank dispute process may take control of the transaction.",
              ],
              [
                "Taxes, currency conversion charges or bank fees outside ArrayHash control",
                "These depend on payment provider, bank, card network or local tax handling.",
              ],
            ]}
          />
          <p>
            If you are unsure whether an order qualifies, email{" "}
            <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>
            . Include the order email and country so we can locate the
            transaction.
          </p>
        </PolicySection>

        <PolicySection title="After a refund">
          <div className="grid gap-[0.1875rem] md:grid-cols-3">
            <PolicyNote title="License access">
              <RotateCcw
                aria-hidden="true"
                className="mb-4 size-7 text-primary"
              />
              <p>
                The refunded Pro license may be deactivated or cancelled after
                the refund is issued.
              </p>
            </PolicyNote>
            <PolicyNote title="Payment timing">
              <CalendarCheck
                aria-hidden="true"
                className="mb-4 size-7 text-primary"
              />
              <p>
                Refund arrival time depends on Stripe, Freemius, your bank, card
                network and original payment method.
              </p>
            </PolicyNote>
            <PolicyNote title="Free plugin">
              <ReceiptText
                aria-hidden="true"
                className="mb-4 size-7 text-primary"
              />
              <p>
                The free ArraySubs plugin remains available from WordPress.org
                where applicable.
              </p>
            </PolicyNote>
          </div>
        </PolicySection>

        <PolicySection title="EU and UK consumer rights">
          <p>
            If you are an EU or UK consumer, you may have statutory rights such
            as a cooling-off period for certain digital purchases. This policy is
            intended to sit alongside applicable legal rights and does not limit
            rights that cannot legally be limited.
          </p>
        </PolicySection>

        <PolicySection title="Contact">
          <p>
            Refund requests and billing questions should be sent to{" "}
            <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>
            . For privacy details related to payments, see the{" "}
            <InlineLink href="/trust-center/privacy-policy/">
              Privacy Policy
            </InlineLink>{" "}
            and{" "}
            <InlineLink href="/trust-center/data-safety/">
              Data Safety
            </InlineLink>
            .
          </p>
        </PolicySection>
      </PolicyBody>

      <TrustCrossLinks currentPath="/trust-center/refund-policy/" />
      <TrustContactCta title="Need help with an order or refund?" />
    </>
  );
}
