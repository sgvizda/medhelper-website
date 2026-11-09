import {
  Activity,
  BarChart3,
  Binary,
  Briefcase,
  Building2,
  Calculator,
  FileText,
  GitCompare,
  Hospital,
  HousePlus,
  Languages,
  ListChecks,
  LogIn,
  MessageSquareText,
  Scale,
  ScanText,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wallet,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react'
import type { IconName } from '@/fields'

const map: Record<IconName, LucideIcon> = {
  activity: Activity,
  'shield-check': ShieldCheck,
  'file-text': FileText,
  calculator: Calculator,
  'scan-text': ScanText,
  'user-round': UserRound,
  hospital: Hospital,
  'house-plus': HousePlus,
  'chart-column': BarChart3,
  binary: Binary,
  'briefcase-medical': Briefcase,
  'building-2': Building2,
  scale: Scale,
  'list-checks': ListChecks,
  'git-compare': GitCompare,
  wallet: Wallet,
  languages: Languages,
  sparkles: Sparkles,
  'log-in': LogIn,
  'message-square-text': MessageSquareText,
}

/** Renders a CMS-selected icon by name, with a safe fallback. */
export function Icon({ name, ...props }: { name?: string | null } & LucideProps) {
  const Cmp = (name && map[name as IconName]) || Sparkles
  return <Cmp aria-hidden="true" {...props} />
}
