import React from 'react';
import { Check, X } from 'lucide-react';

type CellValue = true | false | string;

interface ComparisonRow {
  feature: string;
  free: CellValue;
  pro: CellValue;
  woo: CellValue;
}

const rows: ComparisonRow[] = [
  { feature: 'Subscription Products (Simple & Variable)', free: true, pro: true, woo: true },
  { feature: 'Flexible Billing Cycles (D/W/M/Y)', free: true, pro: true, woo: true },
  { feature: 'Free Trials', free: true, pro: true, woo: true },
  { feature: 'Sign-up Fees', free: true, pro: true, woo: true },
  { feature: 'Different Renewal Price', free: true, pro: true, woo: false },
  { feature: 'Plan Switching (Upgrade/Downgrade/Crossgrade)', free: true, pro: true, woo: 'Limited' },
  { feature: '3 Proration Methods', free: true, pro: true, woo: 'Partial' },
  { feature: 'Skip Next Renewal', free: true, pro: true, woo: false },
  { feature: 'Pause / Vacation Mode', free: true, pro: true, woo: 'Suspend only' },
  { feature: '2-Phase Grace Period', free: true, pro: true, woo: 'Basic' },
  { feature: 'Renewal Sync', free: true, pro: true, woo: true },
  { feature: 'Content Restriction (10 conditions, AND/OR)', free: true, pro: true, woo: 'Basic rules' },
  { feature: 'Content Dripping', free: true, pro: true, woo: true },
  { feature: 'Role Mapping', free: true, pro: true, woo: false },
  { feature: 'URL Restriction (4 patterns)', free: true, pro: true, woo: false },
  { feature: 'Member Discounts', free: true, pro: true, woo: true },
  { feature: 'Customer Self-Service Portal', free: true, pro: true, woo: true },
  { feature: 'Retention Flow Builder', free: true, pro: true, woo: false },
  { feature: 'Email Notifications (20 emails)', free: true, pro: true, woo: 'Basic' },
  { feature: 'Easy Setup Wizard (9 steps)', free: true, pro: true, woo: false },
  { feature: 'Manage Subscriptions Dashboard', free: true, pro: true, woo: true },
  { feature: 'Profile Builder & Shortcodes', free: true, pro: true, woo: false },
  { feature: 'Coupon Integration', free: true, pro: true, woo: true },
  { feature: 'Store Credit System', free: false, pro: true, woo: false },
  { feature: 'Checkout Builder (27 field types)', free: false, pro: true, woo: false },
  { feature: 'Advanced Analytics (MRR, Churn, ARPU)', free: 'Retention only', pro: true, woo: 'Basic reports' },
  { feature: 'Audit Logs & Activity Timeline', free: false, pro: true, woo: false },
  { feature: 'Gateway Health Dashboard', free: false, pro: true, woo: false },
  { feature: 'Automatic Payments (Stripe, PayPal, Paddle)', free: 'Manual only', pro: true, woo: 'Stripe, PayPal' },
  { feature: 'Paddle (Merchant of Record)', free: false, pro: true, woo: false },
  { feature: 'Auto-Retry Failed Payments', free: false, pro: true, woo: true },
  { feature: 'Auto-Downgrade on Failure', free: false, pro: true, woo: false },
  { feature: 'Multi-Login Prevention', free: false, pro: true, woo: false },
  { feature: 'Feature Manager (per-plan entitlements)', free: false, pro: true, woo: false },
  { feature: 'Fixed Period Membership Product', free: true, pro: true, woo: false },
  { feature: 'HPOS Compatible', free: true, pro: true, woo: true },
];

function CellContent({ value }: { value: CellValue }) {
  if (value === true) return <Check size={18} className="comparison-table__check" />;
  if (value === false) return <X size={18} className="comparison-table__x" />;
  return <span className="comparison-table__partial">{value}</span>;
}

export function ComparisonTable() {
  return (
    <div className="comparison-table-wrapper">
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>ArraySubs Free</th>
            <th>ArraySubs Pro</th>
            <th>Woo Subscriptions + Memberships</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature}>
              <td className="comparison-table__feature">{row.feature}</td>
              <td className="comparison-table__cell"><CellContent value={row.free} /></td>
              <td className="comparison-table__cell"><CellContent value={row.pro} /></td>
              <td className="comparison-table__cell"><CellContent value={row.woo} /></td>
            </tr>
          ))}
          <tr className="comparison-table__footer">
            <td className="comparison-table__feature"><strong>Plugins Required</strong></td>
            <td className="comparison-table__cell"><strong>1</strong></td>
            <td className="comparison-table__cell"><strong>1 + addon</strong></td>
            <td className="comparison-table__cell"><strong>2 separate plugins</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
