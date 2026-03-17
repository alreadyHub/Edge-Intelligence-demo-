'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Lock } from 'lucide-react'
import { IssueCategory } from '@/types'
import { SMSBubble } from '@/components/employee/SMSFeedbackPanel'
import { Badge } from '@/components/ui/badge'

interface IssueCardProps {
  issue: IssueCategory
  rank: number
  maxFrequency: number
  locked?: boolean
}

export function IssueCard({ issue, rank, maxFrequency, locked }: IssueCardProps) {
  const [expanded, setExpanded] = useState(false)
  const barWidth = (issue.frequency / maxFrequency) * 100

  if (locked) {
    return (
      <div className="relative rounded-lg border border-gray-200 dark:border-zinc-800 p-3 overflow-hidden">
        <div className="blur-sm opacity-40 pointer-events-none">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-zinc-600 dark:text-zinc-300">Issue category</span>
            <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">— mentions</span>
          </div>
          <div className="h-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full w-3/4" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-white/90 dark:bg-zinc-900/90 rounded-md px-3 py-1.5 border border-gray-200 dark:border-zinc-700">
            <Lock className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Unlock in Premium</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 p-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600">#{rank}</span>
            <span className="text-sm text-zinc-700 dark:text-zinc-200">{issue.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{issue.frequency} mentions</span>
            {expanded ? (
              <ChevronUp className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
            )}
          </div>
        </div>

        <div className="h-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full mb-2">
          <div
            className="h-full bg-amber-400/60 rounded-full transition-all duration-500"
            style={{ width: `${barWidth}%` }}
          />
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {issue.locations.map(loc => (
            <Badge key={loc} variant="outline" className="text-xs">{loc}</Badge>
          ))}
        </div>
      </button>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-zinc-800 space-y-2">
          {issue.samples.slice(0, 3).map((msg, i) => (
            <SMSBubble key={i} message={msg} />
          ))}
        </div>
      )}
    </div>
  )
}
