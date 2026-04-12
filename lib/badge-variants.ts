export const BADGE_VARIANT_ALIASES = {
  gray: 'gray',
  green: 'green',
  indigo: 'indigo',
  amber: 'amber',
  default: 'gray',
  free: 'green',
  pro: 'indigo',
  new: 'amber',
} as const;

export type BadgeVariant = keyof typeof BADGE_VARIANT_ALIASES;
export type BadgeColorVariant = (typeof BADGE_VARIANT_ALIASES)[BadgeVariant];

export const DEFAULT_BADGE_VARIANT: BadgeColorVariant = 'gray';

export function normalizeBadgeVariant(value: unknown): BadgeColorVariant | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed || !(trimmed in BADGE_VARIANT_ALIASES)) {
    return undefined;
  }

  return BADGE_VARIANT_ALIASES[trimmed as BadgeVariant];
}