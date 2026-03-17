'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import { ChevronDown, ChevronUp, Flag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useTime } from '@/context/TimeContext'
import { useUpgrade } from '@/context/UpgradeContext'
import { getLocation, getLocationEmployees } from '@/lib/mockData'
import { TrendChart } from '@/components/dashboard/TrendChart'
import { SMSBubble } from '@/components/employee/SMSFeedbackPanel'
import { EmployeeCard } from '@/components/employee/EmployeeCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getStatusColor, getStatusLabel, getScoreColor, getDeltaColor, formatDelta } from '@/lib/utils'

interface ThemeCardProps {
  theme: string
  samples: import('@/types').SMSMessage[]
  type: 'strength' | 'issue'
}

function ThemeCard({ theme, samples, type }: ThemeCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [flagged, setFlagged] = useState(false)

  return (
    <div className={`rounded-lg border p-3 ${type === 'strength' ? 'border-emerald-400/20 bg-emerald-400/5' : 'border-amber-400/20 bg-amber-400/5'}`}>
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left">
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-200">{theme}</span>
          <div className="flex items-center gap-2">
            {type === 'issue' && (
              <button
                onClick={(e) => { e.stopPropagation(); setFlagged(!flagged) }}
                className={`text-xs flex items-center gap-1 rounded px-1.5 py-0.5 transition-colors ${
                  flagged ? 'text-amber-400 bg-amber-400/10' : 'text-zinc-500 hover:text-amber-400'
                }`}
              >
                <Flag className="w-3 h-3" />
                {flagged ? 'Flagged' : 'Flag'}
              </button>
            )}
            {expanded ? <ChevronUp className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />}
          </div>
        </div>
      </button>
      {expanded && (
        <div className="mt-3 space-y-2">
          {samples.slice(0, 2).map((msg, i) => (
            <SMSBubble key={i} message={msg} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function LocationDetailPage({ params }: { params: { id: string } }) {
  const location = getLocation(params.id)
  const { timeState } = useTime()
  const { upgradeStatus } = useUpgrade()
  const [feedbackCount, setFeedbackCount] = useState(10)
  const isPremium = upgradeStatus !== 'free'

  if (!location) notFound()

  const scoreKey = timeState === 'day1' ? 'day1' : timeState as '30days' | '90days'
  const prevScore = timeState === '90days' ? location.scores['30days'] : location.scores.day1
  const delta = location.scores[scoreKey] - prevScore
  const status = location.status[scoreKey]
  const employees = getLocationEmployees(params.id)
  const feedback = location.recentFeedback.slice(0, feedbackCount)

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Link href="/locations" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 mb-4 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Locations
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-zinc-50">{location.name}</h1>
            <Badge className={`border ${getStatusColor(status)}`} variant="outline">
              {getStatusLabel(status)}
            </Badge>
          </div>
          <p className="text-sm text-zinc-500">{location.city}</p>
        </div>
        <div className="text-right">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-4xl font-mono font-medium ${getScoreColor(location.scores[scoreKey])}`}>
              {location.scores[scoreKey].toFixed(1)}
            </span>
            <span className="text-zinc-600 font-mono">/5.0</span>
          </div>
          <div className={`text-sm font-mono ${getDeltaColor(delta)}`}>{formatDelta(delta)}</div>
          <p className="text-xs text-zinc-600 mt-1">
            {timeState === 'day1' ? 'Sample data' : `${location.feedbackCounts[scoreKey].toLocaleString()} responses`}
          </p>
        </div>
      </div>

      {/* Trend chart */}
      {timeState !== 'day1' && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 mb-6">
          <h2 className="text-sm font-semibold text-zinc-100 mb-4">Score Trend</h2>
          <TrendChart singleLocationId={params.id} />
        </div>
      )}

      {/* Strengths vs Issues */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">What&apos;s Working</h2>
          <div className="space-y-2">
            {location.strengths.map(s => (
              <ThemeCard key={s.theme} theme={s.theme} samples={s.samples} type="strength" />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-zinc-100 mb-3">Needs Attention</h2>
          <div className="space-y-2">
            {location.issues.map(i => (
              <ThemeCard key={i.theme} theme={i.theme} samples={i.samples} type="issue" />
            ))}
          </div>
        </div>
      </div>

      {/* Employee grid */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-zinc-100">Employee Performance</h2>
          {!isPremium && (
            <Link href="/upgrade" className="text-xs text-violet-400 hover:text-violet-300">
              Unlock full profiles →
            </Link>
          )}
        </div>
        {!isPremium && (
          <p className="text-xs text-zinc-500 mb-3">
            See how each instructor is performing based on real member feedback.
          </p>
        )}
        <div className="grid grid-cols-2 gap-3">
          {employees.map(emp => (
            <EmployeeCard key={emp.id} employee={emp} />
          ))}
        </div>
        {!isPremium && (
          <div className="mt-4 rounded-lg border border-violet-600/30 bg-violet-600/5 p-4 flex items-center justify-between">
            <p className="text-sm text-zinc-300">Unlock Employee Intelligence — see scores, trends, and SMS feedback per instructor.</p>
            <Link href="/upgrade">
              <Button size="sm">Start Free Trial</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Feedback feed */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-100 mb-3">Recent Member Feedback</h2>
        <div className="space-y-2">
          {feedback.map((msg, i) => (
            <div key={i} className="relative">
              <SMSBubble message={msg} />
              {msg.employeeName && (
                <span className="absolute top-3 right-3 text-xs bg-violet-900/40 text-violet-300 rounded px-1.5 py-0.5">
                  re: {msg.employeeName}
                </span>
              )}
            </div>
          ))}
        </div>
        {feedbackCount < location.recentFeedback.length && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-3 text-zinc-500"
            onClick={() => setFeedbackCount(c => c + 10)}
          >
            Load more
          </Button>
        )}
      </div>
    </div>
  )
}
