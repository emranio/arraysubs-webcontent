import fs from "node:fs";
import path from "node:path";

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
];

const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
}[char]));

const shell = (title, subtitle, body) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title>
  <desc id="desc">${esc(subtitle)}</desc>
  <rect width="1200" height="700" rx="36" fill="${palette.paper}"/>
  <rect x="32" y="32" width="1136" height="636" rx="28" fill="none" stroke="${palette.border}" stroke-width="2"/>
  <text x="72" y="92" fill="${palette.purple}" font-family="Arial, sans-serif" font-size="15" font-weight="700" letter-spacing="2">ARRAYSUBS FIELD GUIDE</text>
  <text x="72" y="142" fill="${palette.ink}" font-family="Arial, sans-serif" font-size="34" font-weight="700">${esc(title)}</text>
  <text x="72" y="178" fill="${palette.muted}" font-family="Arial, sans-serif" font-size="17">${esc(subtitle)}</text>
  ${body}
</svg>`;

function flowSvg(article) {
  const count = article.flow.length;
  const nodeWidth = count > 4 ? 155 : 225;
  const gap = count > 4 ? 25 : 42;
  const total = count * nodeWidth + (count - 1) * gap;
  const start = (1200 - total) / 2;
  const y = 300;
  const colors = [palette.purpleSoft, palette.orangeSoft, palette.greenSoft];
  const strokes = [palette.purple, palette.orange, palette.green];
  const nodes = article.flow.map((label, index) => {
    const x = start + index * (nodeWidth + gap);
    const arrow = index < count - 1
      ? `<path d="M ${x + nodeWidth + 7} ${y + 70} H ${x + nodeWidth + gap - 10}" stroke="${palette.ink}" stroke-width="4" stroke-linecap="round"/><path d="M ${x + nodeWidth + gap - 22} ${y + 58} L ${x + nodeWidth + gap - 10} ${y + 70} L ${x + nodeWidth + gap - 22} ${y + 82}" fill="none" stroke="${palette.ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`
      : "";
    return `${arrow}<rect x="${x}" y="${y}" width="${nodeWidth}" height="140" rx="22" fill="${colors[index % 3]}" stroke="${strokes[index % 3]}" stroke-width="2"/><circle cx="${x + 28}" cy="${y + 30}" r="15" fill="${strokes[index % 3]}"/><text x="${x + 28}" y="${y + 36}" text-anchor="middle" fill="white" font-family="Arial" font-size="15" font-weight="700">${index + 1}</text><foreignObject x="${x + 20}" y="${y + 55}" width="${nodeWidth - 40}" height="70"><div xmlns="http://www.w3.org/1999/xhtml" style="font:700 18px Arial;color:${palette.ink};line-height:1.25;text-align:center">${esc(label)}</div></foreignObject>`;
  }).join("");
  return shell(article.title, "Decision path — read from left to right", `${nodes}<rect x="310" y="535" width="580" height="64" rx="32" fill="${palette.ink}"/><text x="600" y="574" text-anchor="middle" fill="white" font-family="Arial" font-size="18" font-weight="700">Make the customer promise explicit before configuration</text>`);
}

function barsSvg(article) {
  const max = Math.max(...article.bars.map(([, value]) => value), 1);
  const chartLeft = 330;
  const chartWidth = 760;
  const rows = article.bars.map(([label, value], index) => {
    const y = 270 + index * 76;
    const width = Math.max(8, (value / max) * chartWidth);
    const fill = [palette.purple, palette.green, palette.orange][index % 3];
    return `<text x="290" y="${y + 26}" text-anchor="end" fill="${palette.ink}" font-family="Arial" font-size="17" font-weight="700">${esc(label)}</text><rect x="${chartLeft}" y="${y}" width="${chartWidth}" height="38" rx="12" fill="${palette.white}" stroke="${palette.border}"/><rect x="${chartLeft}" y="${y}" width="${width}" height="38" rx="12" fill="${fill}"/><text x="${Math.min(chartLeft + width + 14, 1110)}" y="${y + 26}" fill="${palette.ink}" font-family="Arial" font-size="16" font-weight="700">${value}</text>`;
  }).join("");
  return shell(`${article.title}: worked model`, "Values illustrate the decision framework; they are not observed customer performance", `${rows}<text x="600" y="625" text-anchor="middle" fill="${palette.muted}" font-family="Arial" font-size="15">Replace the example inputs with your own prices, costs, and policies.</text>`);
}

function cardsSvg(article) {
  const cards = article.cards.map(([label, text], index) => {
    const x = 80 + index * 365;
    const fill = [palette.purpleSoft, palette.orangeSoft, palette.greenSoft][index];
    const accent = [palette.purple, palette.orange, palette.green][index];
    return `<rect x="${x}" y="280" width="315" height="250" rx="26" fill="${fill}" stroke="${accent}" stroke-width="2"/><circle cx="${x + 48}" cy="330" r="26" fill="${accent}"/><text x="${x + 48}" y="338" text-anchor="middle" fill="white" font-family="Arial" font-size="22" font-weight="700">${index + 1}</text><text x="${x + 86}" y="338" fill="${palette.ink}" font-family="Arial" font-size="24" font-weight="700">${esc(label)}</text><foreignObject x="${x + 28}" y="380" width="259" height="100"><div xmlns="http://www.w3.org/1999/xhtml" style="font:18px Arial;color:${palette.muted};line-height:1.45">${esc(text)}</div></foreignObject>`;
  }).join("");
  const person = `<circle cx="600" cy="590" r="18" fill="${palette.ink}"/><path d="M 566 652 Q 570 610 600 610 Q 630 610 634 652" fill="${palette.ink}"/><path d="M 576 624 L 540 600 M 624 624 L 660 600" stroke="${palette.ink}" stroke-width="9" stroke-linecap="round"/>`;
  return shell(`${article.title}: operating model`, "Three responsibilities the subscription team must make explicit", `${cards}${person}`);
}

for (const article of articles) {
  const targets = [
    path.join(process.cwd(), "blogs", article.slug),
    path.join(process.cwd(), "public", "blogs", article.slug),
  ];
  const files = {
    "decision-flow.svg": flowSvg(article),
    "worked-model-bars.svg": barsSvg(article),
    "operating-model.svg": cardsSvg(article),
  };
  for (const target of targets) {
    fs.mkdirSync(target, { recursive: true });
    for (const [name, svg] of Object.entries(files)) {
      fs.writeFileSync(path.join(target, name), svg.trimStart(), "utf8");
    }
  }
}

console.log(`Generated ${articles.length * 3} SVGs in blogs/ and public/blogs/.`);
