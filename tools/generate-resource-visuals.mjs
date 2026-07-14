import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const palette = {
  purple: "#7c3cff",
  purpleSoft: "#eee7ff",
  orange: "#ff7a1a",
  orangeSoft: "#fff0e4",
  green: "#16a75c",
  greenSoft: "#e6f7ed",
  ink: "#160033",
  muted: "#5a4775",
  border: "#d8c8f4",
  paper: "#fbf9ff",
  white: "#ffffff",
};

const articles = [
  {
    slug: "simple-vs-variable-woocommerce-subscriptions-which-product-type-fits",
    title: "Simple or variable? Choose by customer choice",
    flow: ["One price and term", "Use simple", "Meaningful buyer choices", "Use variable"],
    bars: [["Simple", 3], ["Variable", 6], ["Variable + terms", 9]],
    cards: [["Catalog", "One SKU or selectable variations"], ["Checkout", "Clarity before flexibility"], ["Operations", "Test every purchasable path"]],
  },
  {
    slug: "recurring-vs-fixed-term-subscriptions-choose-the-right-billing-model",
    title: "Choose what ends the agreement",
    flow: ["Continues until cancellation", "Ongoing recurring", "Defined payment count", "Fixed-cycle recurring"],
    bars: [["Ongoing: first charge", 25], ["Fixed-cycle: first charge", 25], ["Prepaid: checkout", 150]],
    cards: [["Ongoing", "No planned end date"], ["Fixed-cycle", "Ends after total payments"], ["Fixed-date", "Everyone shares a calendar end"]],
  },
  {
    slug: "free-trial-paid-trial-or-no-trial-a-subscription-decision-framework",
    title: "Choose a trial by proof, cost, and abuse risk",
    flow: ["Value needs time to prove", "Free trial", "Delivery has real cost", "Paid trial", "Value is obvious now", "No trial"],
    bars: [["No-card free", 8], ["Card-required free", 5], ["Paid", 3], ["No trial", 1]],
    cards: [["Friction", "What must the buyer provide?"], ["Exposure", "What can abuse cost?"], ["Proof", "What event demonstrates value?"]],
  },
  {
    slug: "subscription-sign-up-fees-unit-economics-ux-and-examples",
    title: "A sign-up fee must fund a real first-period cost",
    flow: ["Incremental setup cost?", "Estimate the cost", "Recoverable in margin?", "Reduce or remove fee", "Clear customer value?", "Disclose the fee"],
    bars: [["Recurring period", 40], ["Setup labor", 12], ["Welcome kit", 18]],
    cards: [["Cost basis", "Labor + kit + activation"], ["Customer value", "Explain the one-time work"], ["Refund rule", "Define what is refundable"]],
  },
  {
    slug: "monthly-and-annual-subscription-plans-packaging-without-cannibalization",
    title: "Package monthly and annual plans around commitment",
    flow: ["Need a low-friction entry", "Offer monthly", "Want upfront commitment", "Offer annual", "Both needs are material", "Offer both clearly"],
    bars: [["Monthly checkout", 30], ["Annual monthly equivalent", 25], ["Annual checkout", 300]],
    cards: [["Monthly", "Lower commitment, more billing events"], ["Annual", "More cash upfront, longer promise"], ["Both", "Let buyer intent choose cadence"]],
  },
  {
    slug: "one-time-purchase-and-subscription-on-one-product-when-to-offer-both",
    title: "Buy once or subscribe: earn the second option",
    flow: ["Naturally replenished?", "Measure reorder interval", "Subscription adds value?", "Design subscribe benefit", "Choice stays clear?", "Offer both"],
    bars: [["Buy once", 45], ["Subscribe per delivery", 40], ["Three subscribed deliveries", 120]],
    cards: [["Buy once", "Maximum flexibility"], ["Subscribe", "Convenience + predictable cadence"], ["Dual offer", "Two promises on one page"]],
  },
  {
    slug: "fixed-date-woocommerce-subscriptions-for-cohorts-seasons-and-enrollment-windows",
    title: "Fixed dates coordinate a shared calendar",
    flow: ["Publish enrollment window", "Set shared start", "Choose late-entry rule", "Align billing", "End access consistently", "Archive the cohort"],
    bars: [["Full-term price", 100], ["Prorated late entry", 65], ["Waitlist now", 0]],
    cards: [["Start", "Shared service or access date"], ["Billing", "Aligned renewal boundaries"], ["End", "One explicit cohort close"]],
  },
  {
    slug: "customer-chosen-subscription-duration-use-cases-ux-and-risk-controls",
    title: "Flexible duration needs hard guardrails",
    flow: ["Customer duration changes value?", "Define useful choices", "Set minimum and maximum", "Price each duration", "Explain renewal behavior", "Measure selection"],
    bars: [["1 month", 10], ["3 months", 25], ["6 months", 40], ["12 months", 25]],
    cards: [["Minimum", "Protect setup economics"], ["Maximum", "Limit unsupported promises"], ["Renewal", "State whether the term repeats"]],
  },
  {
    slug: "lifetime-deals-vs-recurring-subscriptions-revenue-support-and-risk",
    title: "Cash now and obligations later must balance",
    flow: ["Ongoing service cost?", "Model support liability", "Recurring value delivered?", "Prefer subscription", "Finite entitlement?", "Lifetime may fit"],
    bars: [["Lifetime checkout", 300], ["Subscription month 1", 30], ["Subscription month 6", 180], ["Subscription month 12", 360]],
    cards: [["Cash timing", "Upfront spike or recurring stream"], ["Support liability", "Service continues after payment"], ["Customer promise", "Define updates, access, and limits"]],
  },
  {
    slug: "subscription-terms-customers-must-see-before-they-pay",
    title: "Put the complete recurring promise before payment",
    flow: ["Product page", "Cart", "Checkout consent", "Confirmation email", "Customer portal", "Audit record"],
    bars: [["Price + cadence", 4], ["Renewal", 4], ["Cancellation", 3], ["Shipping", 3], ["Tax + refund", 2]],
    cards: [["Understandable", "Plain language and readable contrast"], ["Prominent", "Before the payment action"], ["Provable", "Versioned terms + consent record"]],
  },
  {
    slug: "anatomy-of-a-high-converting-woocommerce-subscription-product-page",
    title: "Build the product page around the recurring promise",
    flow: ["Value", "Plan choice", "Price + cadence", "Renewal terms", "Trust proof", "Purchase action"],
    bars: [["Value clarity", 5], ["Billing clarity", 5], ["Proof", 4], ["Objection coverage", 3]],
    cards: [["Promise", "Outcome, audience, and recurring value"], ["Terms", "Due today, renewal, and cancellation"], ["Proof", "Evidence beside the decision"]],
  },
  {
    slug: "woocommerce-subscription-launch-readiness-checklist",
    title: "Prove the full subscription loop before launch",
    flow: ["Configure", "Test signup", "Run renewal", "Force failure", "Recover", "Cancel"],
    bars: [["Product + policy", 6], ["Billing + gateway", 6], ["Lifecycle", 5], ["Operations", 4]],
    cards: [["Prelaunch", "Policies, products, and test data"], ["Launch day", "Queues, webhooks, and checkout"], ["Rollback", "Owners, thresholds, and safe stop"]],
  },
  {
    slug: "can-woocommerce-do-subscriptions-without-a-plugin",
    title: "Separate repeat sales from subscription operations",
    flow: ["Repeat payment only?", "Payment link may fit", "Agreement lifecycle?", "Use an engine", "Custom requirements?", "Price custom ownership"],
    bars: [["Manual workaround", 3], ["Subscription engine", 7], ["Custom build", 10]],
    cards: [["Core", "Products, checkout, orders"], ["Engine", "Schedules, agreements, renewals"], ["Operations", "Retries, portal, reporting"]],
  },
  {
    slug: "how-woocommerce-subscription-renewals-work",
    title: "A renewal is a scheduled transaction workflow",
    flow: ["Due time", "Renewal order", "Payment attempt", "Status update", "Next schedule", "Customer notice"],
    bars: [["Schedule", 1], ["Order", 2], ["Payment", 3], ["Lifecycle", 4]],
    cards: [["Scheduler", "Decides when work becomes due"], ["Gateway", "Attempts or requests payment"], ["Subscription", "Carries the ongoing agreement"]],
  },
  {
    slug: "manual-vs-automatic-subscription-renewals-in-woocommerce",
    title: "Choose who initiates each renewal payment",
    flow: ["Stored token available?", "Automatic path", "Customer action required?", "Manual invoice", "Failure", "Recovery"],
    bars: [["Automatic touchpoints", 2], ["Manual touchpoints", 5], ["Invoice follow-up", 7]],
    cards: [["Automatic", "Gateway charges a stored method"], ["Manual", "Customer completes each payment"], ["Hybrid policy", "Fallbacks and exceptions"]],
  },
  {
    slug: "subscription-order-vs-renewal-order-vs-parent-order",
    title: "Give every subscription record one clear job",
    flow: ["Product", "Checkout", "Parent order", "Subscription", "Renewal order", "Next renewal"],
    bars: [["Parent orders", 1], ["Subscription records", 1], ["Renewal orders after 3 cycles", 3]],
    cards: [["Parent order", "The originating transaction"], ["Subscription", "The live agreement"], ["Renewal order", "One later transaction"]],
  },
  {
    slug: "woocommerce-renewal-synchronization-explained",
    title: "Renewal sync aligns customers to a shared boundary",
    flow: ["Choose boundary", "Classify first period", "Set first charge", "Join shared date", "Renew together", "Reconcile"],
    bars: [["Full first period", 30], ["Prorated first period", 16], ["Deferred first charge", 0]],
    cards: [["Boundary", "Weekday, month day, or annual date"], ["First period", "Full, prorated, or deferred"], ["Operations", "Billing and fulfillment align"]],
  },
  {
    slug: "subscription-proration-methods-compared-charge-credit-or-defer",
    title: "Proration decides who keeps unused value",
    flow: ["Change requested", "Measure remaining value", "Charge or credit", "Apply entitlement", "Set next renewal", "Show the math"],
    bars: [["Unused old-plan value", 20], ["New-plan remainder", 35], ["Immediate net charge", 15]],
    cards: [["Charge", "Collect the new-period difference"], ["Credit", "Return unused paid value"], ["Defer", "Change at the next boundary"]],
  },
  {
    slug: "immediate-vs-next-renewal-plan-changes",
    title: "Match the effective date to value delivery",
    flow: ["Plan change", "Access changes now?", "Calculate settlement", "Or queue change", "Notify customer", "Audit result"],
    bars: [["Immediate upgrade value", 30], ["Unused old value", 12], ["Net settlement", 18]],
    cards: [["Immediate", "Access and money change now"], ["Deferred", "Current promise runs to renewal"], ["Policy", "Upgrade and downgrade may differ"]],
  },
  {
    slug: "early-subscription-renewals-benefits-risks-and-guardrails",
    title: "Early renewal must advance value exactly once",
    flow: ["Eligible window", "Confirm total", "Lock request", "Create payment", "Advance date once", "Issue receipt"],
    bars: [["Days before due", 7], ["Duplicate-risk checks", 4], ["Schedule updates", 1]],
    cards: [["Eligibility", "Window, status, and unpaid orders"], ["Idempotency", "One request creates one renewal"], ["Promise", "Explain date and benefit effects"]],
  },
  {
    slug: "subscription-billing-schedule-vs-shipping-schedule",
    title: "Billing and delivery are separate clocks",
    flow: ["Billing event", "Funds clear", "Release fulfillment", "Pick + pack", "Ship", "Repeat rule"],
    bars: [["Quarterly charges", 4], ["Monthly shipments", 12], ["Annual service review", 1]],
    cards: [["Billing", "When money becomes due"], ["Fulfillment", "When value is delivered"], ["Control", "What failure pauses"]],
  },
  {
    slug: "different-first-and-renewal-prices-subscription-pricing-patterns",
    title: "Price the first period and steady state separately",
    flow: ["Set standard price", "Define first-period job", "Cap subsidy", "Disclose next price", "Measure payback", "Stop weak offer"],
    bars: [["First payment", 10], ["Regular renewal", 30], ["Three renewals", 90]],
    cards: [["Intro price", "A deliberate acquisition investment"], ["Renewal price", "The durable customer promise"], ["Payback", "Contribution recovers subsidy"]],
  },
  {
    slug: "immediate-cancellation-vs-cancel-at-period-end",
    title: "Cancellation timing controls access and future charges",
    flow: ["Cancellation request", "Stop now?", "Settle refund", "Or mark pending", "End at boundary", "Confirm outcome"],
    bars: [["Paid days", 30], ["Days used", 18], ["Days remaining", 12]],
    cards: [["Immediate", "Status and access end now"], ["Period end", "Paid-through value continues"], ["Exceptions", "Fraud, safety, or failed delivery"]],
  },
  {
    slug: "recurring-subscription-coupons-economics-and-abuse-controls",
    title: "Every recurring discount needs a stop rule",
    flow: ["Choose objective", "Set duration", "Model contribution", "Limit eligibility", "Track cohort", "Keep or stop"],
    bars: [["List contribution", 60], ["Coupon cost", 18], ["Discounted contribution", 42]],
    cards: [["Acquisition", "Buy a qualified first conversion"], ["Retention", "Resolve a temporary objection"], ["Control", "Duration, stacking, and identity"]],
  },
  {
    slug: "how-taxes-and-shipping-behave-on-subscription-renewals",
    title: "Recalculate each renewal from current taxable facts",
    flow: ["Renewal due", "Load address", "Price items", "Choose shipping", "Calculate tax", "Create total"],
    bars: [["Products", 80], ["Shipping", 10], ["Tax", 9], ["Renewal total", 99]],
    cards: [["Tax", "Location, class, nexus, and rate"], ["Shipping", "Method, zone, weight, and cadence"], ["Reconcile", "Explain differences from signup"]],
  },
  {
    slug: "changing-a-subscription-renewal-date-safely",
    title: "A renewal-date change is a coordinated migration",
    flow: ["Record reason", "Check pending work", "Choose value policy", "Move schedule", "Verify actions", "Notify customer"],
    bars: [["Old cycle days", 30], ["Days shifted", 8], ["New cycle days", 30]],
    cards: [["Before", "Snapshot dates, orders, and actions"], ["Change", "Move schedule through supported APIs"], ["After", "Verify token, access, and notice"]],
  },
  {
    slug: "multiple-subscriptions-per-customer-policy-cart-and-billing-tradeoffs",
    title: "Choose the duplicate policy before checkout",
    flow: ["Existing active plan?", "Same entitlement?", "Upgrade path?", "Allow duplicate?", "Separate schedule", "Explain account state"],
    bars: [["One active plan", 1], ["Separate product plans", 3], ["Mixed schedules", 5]],
    cards: [["Per customer", "Cap all active agreements"], ["Per product", "Prevent entitlement duplicates"], ["Open model", "Support parallel independent needs"]],
  },
  {
    slug: "failed-subscription-payment-recovery-for-woocommerce",
    title: "Recovery is a controlled path back to paid status",
    flow: ["Failure", "Classify", "Retry", "Notify", "Update payment", "Recover or stop"],
    bars: [["Failed renewals", 100], ["Recovered automatically", 42], ["Recovered by customer", 21], ["Unrecovered", 37]],
    cards: [["Payment", "Decline, token, or gateway condition"], ["Customer", "Clear action and useful context"], ["Lifecycle", "Grace, hold, downgrade, or cancel"]],
  },
  {
    slug: "what-happens-when-a-subscription-payment-fails",
    title: "A failed payment starts a policy branch",
    flow: ["Gateway decline", "Renewal fails", "Subscription updates", "Retry scheduled", "Customer acts", "Recover or stop"],
    bars: [["Attempt 1", 100], ["Retry 1 candidates", 72], ["Retry 2 candidates", 41], ["Escalations", 19]],
    cards: [["Order", "Records the failed transaction"], ["Subscription", "Moves according to policy"], ["Access", "Follows grace and entitlement rules"]],
  },
  {
    slug: "subscription-dunning-strategy-timing-messages-and-stop-rules",
    title: "Dunning coordinates retries, messages, and access",
    flow: ["Detect failure", "Classify signal", "Retry when useful", "Send clear message", "Apply grace rule", "Stop responsibly"],
    bars: [["Attempt window", 14], ["Customer messages", 4], ["Automatic retries", 3], ["Manual review", 1]],
    cards: [["Timing", "Retry on evidence, not habit"], ["Message", "Explain impact and next action"], ["Stop rule", "End cost and customer uncertainty"]],
  },
];

const visualPlans = {
  "simple-vs-variable-woocommerce-subscriptions-which-product-type-fits": { types: ["split", "units", "triangle"], titles: ["Choose by buyer choice", "Configuration load", "Catalog to operations"] },
  "recurring-vs-fixed-term-subscriptions-choose-the-right-billing-model": { types: ["split", "bars", "balance"], titles: ["What ends the agreement?", "Cash timing", "Three term models"] },
  "free-trial-paid-trial-or-no-trial-a-subscription-decision-framework": { types: ["split", "numbers", "triangle"], titles: ["Choose the trial", "Friction and exposure", "Proof of value"] },
  "subscription-sign-up-fees-unit-economics-ux-and-examples": { types: ["split", "stacked", "layers"], titles: ["Does setup need a fee?", "First-period cost", "Fee policy"] },
  "monthly-and-annual-subscription-plans-packaging-without-cannibalization": { types: ["split", "bars", "balance"], titles: ["Monthly, annual, or both?", "Price view", "Package the commitment"] },
  "one-time-purchase-and-subscription-on-one-product-when-to-offer-both": { types: ["split", "bars", "triangle"], titles: ["Earn the second option", "Revenue is not contribution", "Keep the choice clear"] },
  "fixed-date-woocommerce-subscriptions-for-cohorts-seasons-and-enrollment-windows": { types: ["timeline", "numbers", "cycle-system"], titles: ["One shared calendar", "Late-entry policy", "Cohort operating loop"] },
  "customer-chosen-subscription-duration-use-cases-ux-and-risk-controls": { types: ["steps", "pie", "layers"], titles: ["Bound the duration", "Illustrative choice mix", "Duration guardrails"] },
  "lifetime-deals-vs-recurring-subscriptions-revenue-support-and-risk": { types: ["split", "bars", "balance"], titles: ["Cash now or value over time?", "Contribution over time", "Promise and liability"] },
  "subscription-terms-customers-must-see-before-they-pay": { types: ["timeline", "bars", "layers"], titles: ["Terms before payment", "Disclosure coverage", "Understandable and provable"] },
  "anatomy-of-a-high-converting-woocommerce-subscription-product-page": { types: ["steps", "pie", "layers"], titles: ["The buying sequence", "Decision coverage", "Product-page system"] },
  "woocommerce-subscription-launch-readiness-checklist": { types: ["cycle", "bars", "hub"], titles: ["Test the full loop", "Launch scorecard", "Production owners"] },
  "can-woocommerce-do-subscriptions-without-a-plugin": { types: ["split", "bars", "layers"], titles: ["Repeat sales or subscription?", "Operating workload", "Commerce system layers"] },
  "how-woocommerce-subscription-renewals-work": { types: ["cycle", "numbers", "hub"], titles: ["Renewal lifecycle", "One renewal, four records", "System ownership"] },
  "manual-vs-automatic-subscription-renewals-in-woocommerce": { types: ["lanes", "bars", "balance"], titles: ["Who initiates payment?", "Customer touchpoints", "Automatic and manual"] },
  "subscription-order-vs-renewal-order-vs-parent-order": { types: ["timeline", "units", "hub"], titles: ["One record, one job", "Records after three cycles", "Trace the transaction"] },
  "woocommerce-renewal-synchronization-explained": { types: ["timeline", "bars", "triangle"], titles: ["Join a shared boundary", "First-period policy", "Sync operating model"] },
  "subscription-proration-methods-compared-charge-credit-or-defer": { types: ["lanes", "equation-reverse", "triangle"], titles: ["Three change paths", "Proration equation", "Money, access, schedule"] },
  "immediate-vs-next-renewal-plan-changes": { types: ["lanes", "equation", "balance"], titles: ["Now or next renewal?", "Immediate settlement", "Match money to access"] },
  "early-subscription-renewals-benefits-risks-and-guardrails": { types: ["cycle", "numbers", "hub"], titles: ["Advance value once", "Duplicate-risk checks", "Early-renewal owners"] },
  "subscription-billing-schedule-vs-shipping-schedule": { types: ["lanes", "bars", "hub"], titles: ["Two separate clocks", "Billing and delivery events", "Fulfillment control"] },
  "different-first-and-renewal-prices-subscription-pricing-patterns": { types: ["timeline", "bars", "layers"], titles: ["Price step over time", "First and later payments", "Disclosure to reporting"] },
  "immediate-cancellation-vs-cancel-at-period-end": { types: ["lanes", "stacked", "balance"], titles: ["Two cancellation timelines", "Used and remaining value", "Access and refund policy"] },
  "recurring-subscription-coupons-economics-and-abuse-controls": { types: ["cycle", "equation", "hub"], titles: ["Coupon stop rule", "Discount equation", "Coupon controls"] },
  "how-taxes-and-shipping-behave-on-subscription-renewals": { types: ["steps", "stacked-total", "hub"], titles: ["Recalculate the renewal", "Renewal total", "Tax and shipping owners"] },
  "changing-a-subscription-renewal-date-safely": { types: ["timeline", "numbers", "hub"], titles: ["Move the whole schedule", "Old date to new date", "Controlled date change"] },
  "multiple-subscriptions-per-customer-policy-cart-and-billing-tradeoffs": { types: ["stack-flow", "numbers", "hub"], titles: ["Choose the duplicate policy", "Independent schedules", "One order, many agreements"] },
  "failed-subscription-payment-recovery-for-woocommerce": { types: ["cycle", "funnel", "hub"], titles: ["Recovery lifecycle", "Closed-cohort recovery", "Recovery ownership"] },
  "what-happens-when-a-subscription-payment-fails": { types: ["timeline", "funnel", "hub"], titles: ["Failure policy timeline", "Retry candidates", "Order, access, customer"] },
  "subscription-dunning-strategy-timing-messages-and-stop-rules": { types: ["timeline", "numbers", "cycle-system"], titles: ["Dunning sequence", "Timing and contact", "Measure the outcome"] },
};

const colors = ["#7c3cff", "#ff6b1a", "#16a75c", "#1677ff", "#e83e8c", "#f4bd32"];
const softColors = ["#eee7ff", "#fff0e4", "#e6f7ed", "#e8f1ff", "#fde8f2", "#fff6d6"];
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[char]));

function lines(value, max = 20) {
  const words = String(value).split(/\s+/);
  const output = [];
  let current = "";
  for (const word of words) {
    if (`${current} ${word}`.trim().length > max && current) {
      output.push(current);
      current = word;
    } else current = `${current} ${word}`.trim();
  }
  if (current) output.push(current);
  return output.slice(0, 3);
}

function label(value, x, y, width, size = 13, color = palette.ink, anchor = "middle", weight = 700) {
  const chunks = lines(value, Math.max(8, Math.floor(width / (size * 0.58))));
  const textX = anchor === "middle" ? x + width / 2 : x;
  return `<text x="${textX}" y="${y}" text-anchor="${anchor}" fill="${color}" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}">${chunks.map((chunk, index) => `<tspan x="${textX}" dy="${index ? size * 1.15 : 0}">${esc(chunk)}</tspan>`).join("")}</text>`;
}

function shell(title, kind, body, theme = 0) {
  const surface = [palette.paper, "#fff8f1", "#f3fff8", "#f2f7ff"][theme % 4];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="408" viewBox="0 0 700 408" role="img"><rect width="700" height="408" rx="24" fill="${surface}"/><rect x="24" y="22" width="126" height="24" rx="12" fill="${colors[theme % colors.length]}"/><text x="87" y="39" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="1.2">${esc(kind.toUpperCase())}</text>${label(title, 34, 78, 632, title.length > 31 ? 22 : 26, palette.ink, "start")}${body}</svg>`;
}

const arrowDefs = `<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${palette.ink}"/></marker></defs>`;

function nodeBox(text, x, y, width, height, index, pill = false) {
  const radius = pill ? height / 2 : 16;
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${softColors[index % softColors.length]}" stroke="${colors[index % colors.length]}" stroke-width="2"/>${label(text, x + 10, y + height / 2 - 2, width - 20, 14)}`;
}

function splitVisual(article, title) {
  const pairs = [];
  for (let index = 0; index < article.flow.length; index += 2) pairs.push(article.flow.slice(index, index + 2));
  const gap = pairs.length === 2 ? 100 : 72;
  const start = pairs.length === 2 ? 145 : 122;
  const body = pairs.map(([left, right], index) => {
    const y = start + index * gap;
    return `${nodeBox(left, 48, y, 246, 56, index)}<path d="M310 ${y + 28} H378" stroke="${palette.ink}" stroke-width="3" marker-end="url(#arrow)"/>${nodeBox(right ?? "Define policy", 398, y, 254, 56, index + 1, true)}`;
  }).join("");
  return shell(title, "decision", `${arrowDefs}${body}`, 0);
}

function timelineVisual(article, title) {
  const count = article.flow.length;
  const startX = 66;
  const step = 568 / Math.max(count - 1, 1);
  const y = 238;
  const body = `<path d="M${startX} ${y} H634" stroke="${palette.border}" stroke-width="8" stroke-linecap="round"/>${article.flow.map((item, index) => {
    const x = startX + index * step;
    const above = index % 2 === 0;
    return `<circle cx="${x}" cy="${y}" r="20" fill="${colors[index % colors.length]}"/><text x="${x}" y="${y + 5}" text-anchor="middle" fill="white" font-family="Arial" font-size="13" font-weight="700">${index + 1}</text>${label(item, x - 48, above ? 160 : 296, 96, 12)}`;
  }).join("")}`;
  return shell(title, "timeline", body, 1);
}

function lanesVisual(article, title) {
  const half = Math.ceil(article.flow.length / 2);
  const lanes = [article.flow.slice(0, half), article.flow.slice(half)];
  const body = lanes.map((lane, laneIndex) => {
    const y = 140 + laneIndex * 122;
    const width = 150;
    return `<rect x="38" y="${y + 12}" width="72" height="32" rx="16" fill="${colors[laneIndex]}"/><text x="74" y="${y + 33}" text-anchor="middle" fill="white" font-family="Arial" font-size="11" font-weight="700">PATH ${laneIndex + 1}</text>${lane.map((item, index) => {
      const x = 132 + index * 178;
      const connector = index < lane.length - 1 ? `<path d="M${x + width} ${y + 28} H${x + 174}" stroke="${palette.ink}" stroke-width="3" marker-end="url(#arrow)"/>` : "";
      return `${nodeBox(item, x, y, width, 56, laneIndex + index)}${connector}`;
    }).join("")}`;
  }).join("");
  return shell(title, "two paths", `${arrowDefs}${body}`, 2);
}

function cycleVisual(article, title) {
  const count = article.flow.length;
  const positions = article.flow.map((_, index) => {
    const angle = -Math.PI / 2 + index * Math.PI * 2 / count;
    return [350 + Math.cos(angle) * 238, 242 + Math.sin(angle) * 105];
  });
  const body = `<ellipse cx="350" cy="242" rx="238" ry="105" fill="none" stroke="${palette.border}" stroke-width="5"/><circle cx="350" cy="242" r="54" fill="${palette.ink}"/>${label("CONTROLLED LOOP", 305, 236, 90, 12, "white")}${positions.map(([x, y], index) => `<rect x="${x - 55}" y="${y - 24}" width="110" height="48" rx="24" fill="${softColors[index % softColors.length]}" stroke="${colors[index % colors.length]}" stroke-width="2"/>${label(article.flow[index], x - 46, y - 4, 92, 12)}`).join("")}`;
  return shell(title, "lifecycle", body, 3);
}

function stepsVisual(article, title) {
  const items = article.flow.slice(0, 5);
  const body = items.map((item, index) => {
    const x = 48 + index * 128;
    const y = 280 - index * 34;
    return `<polygon points="${x},${y} ${x + 50},${y - 18} ${x + 112},${y} ${x + 62},${y + 18}" fill="${softColors[index]}"/><rect x="${x}" y="${y}" width="112" height="54" fill="${colors[index]}"/><polygon points="${x + 112},${y} ${x + 128},${y - 10} ${x + 128},${y + 42} ${x + 112},${y + 54}" fill="${colors[(index + 1) % colors.length]}"/><text x="${x + 18}" y="${y + 34}" fill="white" font-family="Arial" font-size="18" font-weight="700">${index + 1}</text>${label(item, x - 4, y + 78, 120, 12)}`;
  }).join("");
  return shell(title, "step art", body, 0);
}

function stackFlowVisual(article, title) {
  const items = article.flow.slice(0, 6);
  const body = items.map((item, index) => {
    const inset = Math.min(index, items.length - 1 - index) * 22;
    const y = 112 + index * 46;
    return `<rect x="${64 + inset}" y="${y}" width="${572 - inset * 2}" height="36" rx="12" fill="${softColors[index % softColors.length]}" stroke="${colors[index % colors.length]}" stroke-width="2"/><circle cx="${88 + inset}" cy="${y + 18}" r="12" fill="${colors[index % colors.length]}"/><text x="${88 + inset}" y="${y + 22}" text-anchor="middle" fill="white" font-family="Arial" font-size="10" font-weight="700">${index + 1}</text>${label(item, 112 + inset, y + 22, 480 - inset * 2, 13, palette.ink, "start")}`;
  }).join("");
  return shell(title, "policy stack", body, 1);
}

function barsVisual(article, title) {
  const data = article.bars.slice(0, 5);
  const max = Math.max(...data.map(([, value]) => value), 1);
  const body = data.map(([name, value], index) => {
    const y = 118 + index * 54;
    const width = 360 * value / max;
    return `${label(name, 42, y + 21, 190, 13, palette.ink, "start")}<rect x="238" y="${y}" width="390" height="30" rx="15" fill="${softColors[index % softColors.length]}"/><rect x="238" y="${y}" width="${Math.max(12, width)}" height="30" rx="15" fill="${colors[index % colors.length]}"/><text x="642" y="${y + 21}" text-anchor="end" fill="${palette.ink}" font-family="Arial" font-size="13" font-weight="700">${value}</text>`;
  }).join("");
  return shell(title, "bar chart", body, 2);
}

function numbersVisual(article, title) {
  const data = article.bars.slice(0, 4);
  const width = 600 / data.length;
  const body = data.map(([name, value], index) => {
    const x = 50 + index * width;
    return `<circle cx="${x + width / 2}" cy="208" r="62" fill="${softColors[index % softColors.length]}" stroke="${colors[index % colors.length]}" stroke-width="5"/><text x="${x + width / 2}" y="220" text-anchor="middle" fill="${palette.ink}" font-family="Arial" font-size="34" font-weight="700">${value}</text>${label(name, x + 8, 304, width - 16, 13)}`;
  }).join("");
  return shell(title, "numbers", body, 3);
}

function unitsVisual(article, title) {
  const data = article.bars.slice(0, 4);
  const body = data.map(([name, value], row) => {
    const y = 122 + row * 68;
    const count = Math.min(12, Math.max(1, Math.round(value)));
    return `${label(name, 42, y + 17, 190, 13, palette.ink, "start")}${Array.from({ length: count }, (_, index) => `<circle cx="${252 + index * 29}" cy="${y + 12}" r="9" fill="${colors[row % colors.length]}"/>`).join("")}<text x="648" y="${y + 17}" text-anchor="end" fill="${palette.ink}" font-family="Arial" font-size="13" font-weight="700">${value}</text>`;
  }).join("");
  return shell(title, "unit model", body, 0);
}

function pieVisual(article, title) {
  const data = article.bars.slice(0, 4);
  const total = data.reduce((sum, [, value]) => sum + value, 0) || 1;
  const radius = 92;
  const circumference = Math.PI * 2 * radius;
  let offset = 0;
  const rings = data.map(([, value], index) => {
    const length = circumference * value / total;
    const ring = `<circle cx="225" cy="232" r="${radius}" fill="none" stroke="${colors[index]}" stroke-width="54" stroke-dasharray="${length} ${circumference - length}" stroke-dashoffset="${-offset}" transform="rotate(-90 225 232)"/>`;
    offset += length;
    return ring;
  }).join("");
  const legend = data.map(([name, value], index) => `<circle cx="410" cy="${150 + index * 52}" r="9" fill="${colors[index]}"/>${label(name, 430, 155 + index * 52, 188, 13, palette.ink, "start")}<text x="648" y="${155 + index * 52}" text-anchor="end" fill="${palette.ink}" font-family="Arial" font-size="13" font-weight="700">${value}</text>`).join("");
  return shell(title, "pie chart", `${rings}<circle cx="225" cy="232" r="54" fill="${palette.paper}"/>${legend}`, 1);
}

function funnelVisual(article, title) {
  const data = article.bars.slice(0, 4);
  const max = Math.max(...data.map(([, value]) => value), 1);
  const body = data.map(([name, value], index) => {
    const width = 250 + 270 * value / max;
    const x = (700 - width) / 2;
    const y = 112 + index * 65;
    return `<path d="M${x} ${y} H${x + width} L${x + width - 25} ${y + 48} H${x + 25} Z" fill="${colors[index]}"/>${label(name, x + 28, y + 28, width - 110, 11, "white", "start")}<text x="${x + width - 35}" y="${y + 29}" text-anchor="end" fill="white" font-family="Arial" font-size="12" font-weight="700">${value}</text>`;
  }).join("");
  return shell(title, "funnel", body, 2);
}

function equationVisual(article, title, reverse = false) {
  const source = reverse ? [article.bars[1], article.bars[0], article.bars[2]] : article.bars.slice(0, 3);
  const body = source.map(([name, value], index) => {
    const x = 46 + index * 226;
    return `<rect x="${x}" y="142" width="156" height="144" rx="22" fill="${softColors[index]}" stroke="${colors[index]}" stroke-width="3"/><text x="${x + 78}" y="212" text-anchor="middle" fill="${palette.ink}" font-family="Arial" font-size="34" font-weight="700">${value}</text>${label(name, x + 16, 248, 124, 12)}`;
  }).join("");
  return shell(title, "equation", `${body}<text x="244" y="225" text-anchor="middle" fill="${palette.ink}" font-family="Arial" font-size="34" font-weight="700">−</text><text x="470" y="225" text-anchor="middle" fill="${palette.ink}" font-family="Arial" font-size="34" font-weight="700">=</text>`, 3);
}

function stackedVisual(article, title, hasTotal = false) {
  const data = hasTotal ? article.bars.slice(0, -1) : article.bars;
  const total = hasTotal ? article.bars.at(-1)[1] : data.reduce((sum, [, value]) => sum + value, 0) || 1;
  let x = 54;
  const width = hasTotal ? 500 : 592;
  const segments = data.map(([name, value], index) => {
    const segmentWidth = width * value / total;
    const result = `<rect x="${x}" y="180" width="${segmentWidth}" height="92" fill="${colors[index]}"/>${segmentWidth > 85 ? label(name, x + 8, 215, segmentWidth - 16, 12, "white") : ""}<text x="${x + segmentWidth / 2}" y="252" text-anchor="middle" fill="white" font-family="Arial" font-size="13" font-weight="700">${value}</text>`;
    x += segmentWidth;
    return result;
  }).join("");
  const totalNode = hasTotal ? `<path d="M${x + 10} 226 H586" stroke="${palette.ink}" stroke-width="3" marker-end="url(#arrow)"/><rect x="600" y="166" width="64" height="120" rx="18" fill="${palette.ink}"/><text x="632" y="235" text-anchor="middle" fill="white" font-family="Arial" font-size="18" font-weight="700">${total}</text>` : "";
  return shell(title, "stacked model", `${arrowDefs}${segments}${totalNode}`, 0);
}

function isoBlock(x, y, width, height, index, title, detail = "") {
  const depth = 20;
  const color = colors[index % colors.length];
  const side = colors[(index + 1) % colors.length];
  return `<polygon points="${x},${y} ${x + depth},${y - depth} ${x + width + depth},${y - depth} ${x + width},${y}" fill="${softColors[index % softColors.length]}" stroke="${color}" stroke-width="2"/><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="4" fill="${color}"/><polygon points="${x + width},${y} ${x + width + depth},${y - depth} ${x + width + depth},${y + height - depth} ${x + width},${y + height}" fill="${side}"/>${label(title, x + 8, y + 36, width - 16, 15, "white")}${detail ? label(detail, x + 8, y + height + 28, width + depth - 16, 12) : ""}`;
}

function triangleVisual(article, title) {
  const [a, b, c] = article.cards;
  const body = `<path d="M350 128 L145 318 H555 Z" fill="none" stroke="${palette.border}" stroke-width="8"/>${nodeBox(a[0], 250, 112, 200, 54, 0, true)}${nodeBox(b[0], 50, 302, 210, 54, 1, true)}${nodeBox(c[0], 440, 302, 210, 54, 2, true)}<circle cx="350" cy="252" r="50" fill="${palette.ink}"/>${label("SAFE MODEL", 306, 248, 88, 12, "white")}`;
  return shell(title, "three-way fit", body, 1);
}

function hubVisual(article, title) {
  const positions = [[48, 134], [470, 134], [260, 302]];
  const connectors = positions.map(([x, y]) => `<path d="M350 242 L${x + 90} ${y + 30}" stroke="${palette.ink}" stroke-width="3"/>`).join("");
  const cards = article.cards.map(([name], index) => nodeBox(name, positions[index][0], positions[index][1], 182, 58, index, true)).join("");
  return shell(title, "system map", `${connectors}<circle cx="350" cy="242" r="58" fill="${palette.ink}"/>${label("ONE SOURCE OF TRUTH", 302, 238, 96, 11, "white")}${cards}`, 2);
}

function layersVisual(article, title) {
  const body = article.cards.map(([name, detail], index) => {
    const x = 54 + index * 28;
    const y = 122 + index * 84;
    const width = 592 - index * 56;
    return `<rect x="${x}" y="${y}" width="${width}" height="64" rx="16" fill="${softColors[index]}" stroke="${colors[index]}" stroke-width="2"/><rect x="${x + 12}" y="${y + 12}" width="40" height="40" rx="20" fill="${colors[index]}"/><text x="${x + 32}" y="${y + 38}" text-anchor="middle" fill="white" font-family="Arial" font-size="14" font-weight="700">${index + 1}</text>${label(name, x + 70, y + 27, 180, 14, palette.ink, "start")}${label(detail, x + 250, y + 25, width - 270, 12, palette.muted, "start", 400)}`;
  }).join("");
  return shell(title, "operating layers", body, 3);
}

function balanceVisual(article, title) {
  const [left, right, foundation] = article.cards;
  const body = `${isoBlock(70, 158, 180, 92, 0, left[0])}${isoBlock(450, 158, 180, 92, 1, right[0])}<path d="M248 285 H452" stroke="${palette.ink}" stroke-width="8" stroke-linecap="round"/><path d="M350 285 V325" stroke="${palette.ink}" stroke-width="8"/><path d="M292 340 H408" stroke="${palette.ink}" stroke-width="14" stroke-linecap="round"/>${label(foundation[0], 270, 378, 160, 12)}`;
  return shell(title, "trade-off", body, 0);
}

function cycleSystemVisual(article, title) {
  const positions = [[350, 142], [165, 302], [535, 302]];
  const body = `<path d="M350 164 L185 284 M195 318 H505 M515 284 L350 164" fill="none" stroke="${palette.border}" stroke-width="6" marker-end="url(#arrow)"/>${article.cards.map(([name], index) => nodeBox(name, positions[index][0] - 82, positions[index][1] - 28, 164, 56, index, true)).join("")}<circle cx="350" cy="258" r="42" fill="${palette.ink}"/>${label("REVIEW", 316, 254, 68, 11, "white")}`;
  return shell(title, "feedback loop", `${arrowDefs}${body}`, 1);
}

function renderVisual(article, type, title) {
  const renderers = {
    split: splitVisual,
    timeline: timelineVisual,
    lanes: lanesVisual,
    cycle: cycleVisual,
    steps: stepsVisual,
    "stack-flow": stackFlowVisual,
    bars: barsVisual,
    numbers: numbersVisual,
    units: unitsVisual,
    pie: pieVisual,
    funnel: funnelVisual,
    equation: equationVisual,
    "equation-reverse": (item, heading) => equationVisual(item, heading, true),
    stacked: stackedVisual,
    "stacked-total": (item, heading) => stackedVisual(item, heading, true),
    triangle: triangleVisual,
    hub: hubVisual,
    layers: layersVisual,
    balance: balanceVisual,
    "cycle-system": cycleSystemVisual,
  };
  return (renderers[type] ?? hubVisual)(article, title);
}

async function writePng(svg, targets) {
  const buffer = await sharp(Buffer.from(svg)).png({ palette: true, colours: 64, dither: 0 }).toBuffer();
  for (const target of targets) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, buffer);
  }
}

for (const article of articles) {
  const plan = visualPlans[article.slug];
  const directory = path.join(process.cwd(), "blogs", article.slug);
  const publicDirectory = path.join(process.cwd(), "public", "blogs", article.slug);
  const names = ["decision-visual.png", "model-visual.png", "operating-visual.png"];
  for (let index = 0; index < names.length; index++) {
    await writePng(renderVisual(article, plan.types[index], plan.titles[index]), [path.join(directory, names[index]), path.join(publicDirectory, names[index])]);
  }

  const postPath = path.join(directory, "post.md");
  let markdown = fs.readFileSync(postPath, "utf8");
  const replacements = [
    ["decision-flow.svg", names[0], `${plan.titles[0]} — a focused ${plan.types[0].replaceAll("-", " ")} for ${article.title}.`],
    ["worked-model-bars.svg", names[1], `${plan.titles[1]} — an illustrative ${plan.types[1].replaceAll("-", " ")} for ${article.title}.`],
    ["operating-model.svg", names[2], `${plan.titles[2]} — a focused ${plan.types[2].replaceAll("-", " ")} for ${article.title}.`],
  ];
  for (const [oldName, newName, alt] of replacements) {
    const imagePattern = new RegExp(`!\\[[^\\]]*\\]\\(\\/blogs\\/${article.slug}\\/${oldName.replace(".", "\\.")}\\)`);
    markdown = markdown.replace(imagePattern, `![${alt}](/blogs/${article.slug}/${newName})`);
  }
  fs.writeFileSync(postPath, markdown, "utf8");

  for (const root of [directory, publicDirectory]) {
    for (const oldName of ["decision-flow.svg", "worked-model-bars.svg", "operating-model.svg"]) {
      const oldPath = path.join(root, oldName);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
  }
}

const blogRoot = path.join(process.cwd(), "blogs");
for (const slug of fs.readdirSync(blogRoot)) {
  const directory = path.join(blogRoot, slug);
  if (!fs.statSync(directory).isDirectory()) continue;
  const publicDirectory = path.join(process.cwd(), "public", "blogs", slug);
  const postPath = path.join(directory, "post.md");
  let markdown = fs.existsSync(postPath) ? fs.readFileSync(postPath, "utf8") : "";
  for (const name of fs.readdirSync(directory).filter((file) => file.endsWith(".svg"))) {
    const source = path.join(directory, name);
    const pngName = name.replace(/\.svg$/, ".png");
    const png = await sharp(source, { density: 144 }).resize({ width: 700, withoutEnlargement: false }).png({ palette: true, colours: 64, dither: 0 }).toBuffer();
    fs.writeFileSync(path.join(directory, pngName), png);
    fs.mkdirSync(publicDirectory, { recursive: true });
    fs.writeFileSync(path.join(publicDirectory, pngName), png);
    markdown = markdown.replaceAll(`/blogs/${slug}/${name}`, `/blogs/${slug}/${pngName}`);
    fs.unlinkSync(source);
    const publicSource = path.join(publicDirectory, name);
    if (fs.existsSync(publicSource)) fs.unlinkSync(publicSource);
  }
  if (postPath && markdown) fs.writeFileSync(postPath, markdown, "utf8");
}

console.log(`Generated ${articles.length * 3} focused 700px PNGs and removed blog SVG assets.`);
