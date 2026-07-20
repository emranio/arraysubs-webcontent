/**
 * GoAffPro affiliate program integration (marketing-site side).
 *
 * The loader is mounted site-wide from `app/layout.tsx`
 * (`<script async src={GOAFFPRO_LOADER_URL}>`, hoisted into <head> by React
 * 19). The loader owns all referral-link parsing and cookie handling itself —
 * which URL params count as a referral code and the 60-day cookie duration
 * are configured in the GoAffPro dashboard, not here.
 *
 * Commissions are NOT reported from the browser. When a Freemius checkout
 * completes in a browser that carries the GoAffPro `ref` cookie, the checkout
 * page posts a referral CLAIM (ref code + purchase identity, no amounts) to
 * the user portal. The portal's Freemius `payment.created` webhook is the
 * money source of truth: it joins the claim and reports the order to GoAffPro
 * server-to-server. See user-portal `lib/goaffpro.ts`.
 */

/** Public GoAffPro shop identifier (safe to expose — it is part of the script URL). */
export const GOAFFPRO_SHOP_ID = "maaeainebo";

export const GOAFFPRO_LOADER_URL = `https://api.goaffpro.com/loader.js?shop=${GOAFFPRO_SHOP_ID}`;

/**
 * Referral-claim intake on the user portal (same app that receives the
 * Freemius webhook). Overridable for local development where the portal runs
 * on a different port.
 */
export const GOAFFPRO_REFERRAL_CLAIM_URL = `${
  process.env.NEXT_PUBLIC_PORTAL_ORIGIN ?? "https://user-portal.arrayhash.com"
}/api/goaffpro/referral/`;

function readCookie(name: string): string {
  if (typeof document === "undefined") return "";

  for (const part of document.cookie.split(/;\s*/)) {
    const eq = part.indexOf("=");

    if (eq > 0 && part.slice(0, eq) === name) {
      try {
        return decodeURIComponent(part.slice(eq + 1));
      } catch {
        return part.slice(eq + 1);
      }
    }
  }

  return "";
}

/** The GoAffPro referral code cookie set by the loader, "" when organic. */
export function getGoaffproRefCode(): string {
  return readCookie("ref");
}

/** The GoAffPro visit id cookie, when the loader has registered the visit. */
export function getGoaffproVisitorId(): string {
  return readCookie("gfp_v_id");
}
