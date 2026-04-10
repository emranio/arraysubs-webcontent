import React from 'react';
import {
  Repeat, Receipt, CreditCard, ShieldCheck, CircleUser, UserCog,
  HeartHandshake, Wallet, Mail, BarChart3, ClipboardList, LayoutGrid,
  Settings2, Wand2, ListChecks, RotateCcw, UserCheck, Shuffle,
  Lock, Rocket, Monitor, Users, Package, GraduationCap, Newspaper,
  Briefcase, Download, Sparkles, Check, X, Minus, ArrowRight,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';

const iconMap: Record<string, React.FC<LucideProps>> = {
  'repeat': Repeat,
  'receipt': Receipt,
  'credit-card': CreditCard,
  'shield-check': ShieldCheck,
  'circle-user': CircleUser,
  'user-cog': UserCog,
  'heart-handshake': HeartHandshake,
  'wallet': Wallet,
  'mail': Mail,
  'bar-chart-3': BarChart3,
  'clipboard-list': ClipboardList,
  'layout-grid': LayoutGrid,
  'settings-2': Settings2,
  'wand-2': Wand2,
  'list-checks': ListChecks,
  'rotate-ccw': RotateCcw,
  'user-check': UserCheck,
  'shuffle': Shuffle,
  'lock': Lock,
  'rocket': Rocket,
  'monitor': Monitor,
  'users': Users,
  'package': Package,
  'graduation-cap': GraduationCap,
  'newspaper': Newspaper,
  'briefcase': Briefcase,
  'download': Download,
  'sparkles': Sparkles,
  'check': Check,
  'x': X,
  'minus': Minus,
  'arrow-right': ArrowRight,
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className = '' }: IconProps) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} className={className} />;
}
