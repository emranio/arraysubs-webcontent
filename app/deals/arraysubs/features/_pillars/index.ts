import type { FeaturePillar } from "./types";
import { subscriptionsAndRecurringProducts } from "./subscriptions-and-recurring-products";
import { memberAccessControl } from "./member-access-control";
import { billingRenewalsAndRefunds } from "./billing-renewals-and-refunds";
import { retentionFlowBuilder } from "./retention-flow-builder";
import { customerPortal } from "./customer-portal";
import { storeCredit } from "./store-credit";
import { checkoutBuilder } from "./checkout-builder";
import { analytics } from "./analytics";
import { emails } from "./emails";
import { paymentGateways } from "./payment-gateways";
import { easySetup } from "./easy-setup";
import { auditsAndLogs } from "./audits-and-logs";
import { manageSubscriptions } from "./manage-subscriptions";
import { profileBuilder } from "./profile-builder";
import { featureManager } from "./feature-manager";

/**
 * The 15 evergreen feature pillar pages, in display order. Slugs and
 * seoTitles are LOCKED — see `./types.ts`.
 */
export const PILLARS: FeaturePillar[] = [
  subscriptionsAndRecurringProducts,
  memberAccessControl,
  billingRenewalsAndRefunds,
  retentionFlowBuilder,
  customerPortal,
  storeCredit,
  checkoutBuilder,
  analytics,
  emails,
  paymentGateways,
  easySetup,
  auditsAndLogs,
  manageSubscriptions,
  profileBuilder,
  featureManager,
];

export const getPillar = (slug: string): FeaturePillar | undefined =>
  PILLARS.find((pillar) => pillar.slug === slug);

export const pillarPath = (slug: string) =>
  `/deals/arraysubs/features/${slug}/`;

/**
 * Reverse map: granular hub-module slug -> owning pillar slug. Used to turn
 * hub feature cards into links to the deep-dive guide that covers them. When
 * a module appears in several pillars, the first pillar in display order wins.
 */
const MODULE_TO_PILLAR = new Map<string, string>();
for (const pillar of PILLARS) {
  for (const moduleSlug of pillar.moduleSlugs) {
    if (!MODULE_TO_PILLAR.has(moduleSlug)) {
      MODULE_TO_PILLAR.set(moduleSlug, pillar.slug);
    }
  }
}

export const pillarPathForModule = (moduleSlug: string): string | undefined => {
  const pillarSlug = MODULE_TO_PILLAR.get(moduleSlug);
  return pillarSlug ? pillarPath(pillarSlug) : undefined;
};
