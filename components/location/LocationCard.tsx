'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Location } from '@/types'
import { useTime } from '@/context/TimeContext'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  getStatusColor, getStatusLabel, getScoreColor, getDeltaColor, formatDelta
} from '@/lib/utils'
import { TrendChart } from '@/components/dashboard/TrendChart'

interface LocationCardProps {
  location: Location
  showSparkline?: boolean
}

export function LocationCard({ location, showSparkline }: LocationCardProps) {
  const { timeState } = useTime()
  const scoreKey = timeState === 'day1' ? 'day1' : timeState as '30days' | '90days'
  const prevScore = timeState === '90days' ? location.scores['30days'] : location.scores.day1
  const delta = location.scores[scoreKey] - prevScore
  const status = location.status[scoreKey]

  return (
    <Card className="hover:border-gray-300 dark:hover:border-zinc-700 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{location.name}</h3>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">{location.city}</p>
          </div>
          <Badge
            className={`text-xs border ${getStatusColor(status)}`}
            variant="outline"
          >
            {getStatusLabel(status)}
          </Badge>
        </div>

        <div className="flex items-baseline gap-1.5 mb-1">
          <span className={`text-2xl font-mono font-medium ${getScoreColor(location.scores[scoreKey])}`}>
            {timeState === 'day1' && location.feedbackCounts.day1 === 0
              ? location.scores.day1.toFixed(1)
              : location.scores[scoreKey].toFixed(1)}
          </span>
          <span className="text-zinc-400 dark:text-zinc-600 font-mono text-sm">/5.0</span>
        </div>

        <div className={`text-xs font-mono mb-3 ${getDeltaColor(delta)}`}>
          {formatDelta(delta)}
        </div>

        {showSparkline && timeState !== 'day1' && (
          <div className="mb-3 -mx-1">
            <TrendChart singleLocationId={location.id} />
          </div>
        )}

        <div className="space-y-1 mb-3">
          <p className="text-xs text-zinc-400 dark:text-zinc-500 italic">✓ {location.topStrength}</p>
          <p className="text-xs text-amber-400/80 italic">⚠ {location.topIssue}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-400 dark:text-zinc-600">
            {timeState === 'day1' ? 'Sample data' : `${location.feedbackCounts[scoreKey].toLocaleString()} responses`}
          </span>
          <Link
            href={`/locations/${location.id}`}
            className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors"
          >
            View location <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
