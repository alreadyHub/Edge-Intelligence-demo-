import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDeltaColor(delta: number): string {
  if (delta > 0) return 'text-emerald-400'
  if (delta < 0) return 'text-rose-400'
  return 'text-zinc-400'
}

export function formatDelta(delta: number): string {
  if (delta > 0) return `↑ +${delta.toFixed(1)}`
  if (delta < 0) return `↓ ${delta.toFixed(1)}`
  return `→ 0.0`
}

export function getTrendColor(trend: string): string {
  switch (trend) {
    case 'improving': return 'text-emerald-400'
    case 'declining': return 'text-rose-400'
    default: return 'text-zinc-400'
  }
}

export function getTrendLabel(trend: string): string {
  switch (trend) {
    case 'improving': return '↑ Improving'
    case 'declining': return '↓ Declining'
    default: return '→ Stable'
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'high-performing': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
    case 'improving': return 'text-violet-300 bg-violet-400/10 border-violet-400/20'
    case 'needs-attention': return 'text-amber-400 bg-amber-400/10 border-amber-400/20'
    default: return 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20'
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'high-performing': return 'HIGH PERFORMING'
    case 'improving': return 'IMPROVING'
    case 'needs-attention': return 'NEEDS ATTENTION'
    default: return status.toUpperCase()
  }
}

export function getScoreColor(score: number): string {
  if (score >= 4.5) return 'text-emerald-400'
  if (score >= 4.0) return 'text-zinc-50'
  if (score >= 3.5) return 'text-amber-400'
  return 'text-rose-400'
}
