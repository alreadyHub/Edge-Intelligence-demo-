'use client'

import Link from 'next/link'
import { ArrowRight, Lock } from 'lucide-react'
import { Employee } from '@/types'
import { useTime } from '@/context/TimeContext'
import { useUpgrade } from '@/context/UpgradeContext'
import { getTrendColor, getTrendLabel, getScoreColor } from '@/lib/utils'

interface EmployeeCardProps {
  employee: Employee
}

const locationColors: Record<string, string> = {
  'back-bay': 'bg-violet-600/20 text-violet-300',
  'south-end': 'bg-emerald-400/10 text-emerald-400',
  'cambridge': 'bg-amber-400/10 text-amber-400',
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const { timeState } = useTime()
  const { upgradeStatus } = useUpgrade()
  const isPremium = upgradeStatus !== 'free'
  const scoreKey = timeState === 'day1' ? 'day1' : timeState as '30days' | '90days'

  const initials = employee.name.split(' ').map(n => n[0]).join('')
  const avatarColor = locationColors[employee.locationId] || 'bg-zinc-700 text-zinc-300'

  if (!isPremium) {
    return (
      <div className="relative rounded-lg border border-zinc-800 bg-zinc-900 p-4 overflow-hidden">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${avatarColor}`}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-200 truncate">{employee.name}</p>
            <p className="text-xs text-zinc-500">{employee.role}</p>
          </div>
          <div className="flex items-center gap-1 text-zinc-600">
            <Lock className="w-3.5 h-3.5" />
            <span className="font-mono text-sm">—</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link href={`/employees/${employee.id}`}>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 hover:border-zinc-700 transition-colors cursor-pointer">
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${avatarColor} flex-shrink-0`}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-zinc-100 truncate">{employee.name}</p>
              <span className={`font-mono text-base font-medium flex-shrink-0 ${getScoreColor(employee.scores[scoreKey])}`}>
                {employee.scores[scoreKey].toFixed(1)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-500">{employee.role}</p>
              <span className={`text-xs ${getTrendColor(employee.trend)}`}>
                {getTrendLabel(employee.trend)}
              </span>
            </div>
            {employee.strengths.length > 0 && (
              <p className="text-xs text-zinc-500 mt-1.5 truncate">✓ {employee.strengths[0]}</p>
            )}
            {employee.issues.length > 0 && (
              <p className="text-xs text-amber-400/80 truncate">⚠ {employee.issues[0]}</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-800">
          <span className="text-xs text-zinc-600">
            {employee.feedbackCounts[scoreKey]} responses
          </span>
          <span className="flex items-center gap-1 text-xs text-violet-400">
            View profile <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  )
}
