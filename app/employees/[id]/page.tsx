'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, ChevronDown, ChevronUp, Edit2 } from 'lucide-react'
import Link from 'next/link'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useTime } from '@/context/TimeContext'
import { useUpgrade } from '@/context/UpgradeContext'
import { getEmployee, getLocation } from '@/lib/mockData'
import { PaywallModal } from '@/components/freemium/PaywallModal'
import { SMSBubble } from '@/components/employee/SMSFeedbackPanel'
import { Badge } from '@/components/ui/badge'
import { getTrendColor, getTrendLabel, getScoreColor, getDeltaColor, formatDelta } from '@/lib/utils'
import { motion } from 'framer-motion'

const locationColors: Record<string, string> = {
  'back-bay': 'bg-violet-600/20 text-violet-300',
  'south-end': 'bg-emerald-400/10 text-emerald-400',
  'cambridge': 'bg-amber-400/10 text-amber-400',
}

const locationChartColors: Record<string, string> = {
  'back-bay': '#8b5cf6',
  'south-end': '#34d399',
  'cambridge': '#fbbf24',
}

function ThemeSection({ title, items, messages, type }: {
  title: string
  items: string[]
  messages: import('@/types').SMSMessage[]
  type: 'strength' | 'issue'
  employeeName?: string
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`rounded-lg border p-4 ${
      type === 'strength' ? 'border-emerald-400/20 bg-emerald-400/5' : 'border-amber-400/20 bg-amber-400/5'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className={`text-xs font-semibold uppercase tracking-wider ${
          type === 'strength' ? 'text-emerald-400' : 'text-amber-400'
        }`}>{title}</h4>
        <button onClick={() => setExpanded(!expanded)} className="text-zinc-500 hover:text-zinc-300">
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>
      <ul className="space-y-1 mb-3">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
            <span className={type === 'strength' ? 'text-emerald-400' : 'text-amber-400'}>
              {type === 'strength' ? '✓' : '⚠'}
            </span>
            {item}
          </li>
        ))}
      </ul>
      {expanded && messages.length > 0 && (
        <div className="space-y-2 pt-3 border-t border-zinc-800/50">
          {messages.slice(0, 3).map((msg, i) => (
            <SMSBubble key={i} message={msg} />
          ))}
        </div>
      )}
    </div>
  )
}

interface TooltipEntry { name: string; value: number }
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipEntry[]; label?: string }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-zinc-400 mb-1">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="text-zinc-400">{p.name === 'score' ? 'Score' : 'Location avg'}</span>
          <span className="font-mono text-zinc-100">{p.value?.toFixed(1)}</span>
        </div>
      ))}
    </div>
  )
}

export default function EmployeeDetailPage({ params }: { params: { id: string } }) {
  const employee = getEmployee(params.id)
  const { timeState } = useTime()
  const { upgradeStatus } = useUpgrade()
  const [editingNotes, setEditingNotes] = useState(false)
  const [notes, setNotes] = useState(
    employee?.trend === 'declining'
      ? `Spoke with ${employee?.name?.split(' ')[0]} re: class pacing on Mar 9. Following up in 2 weeks. Watching for improvement in modification offering.`
      : `${employee?.name?.split(' ')[0]} is on a strong trajectory. Continue monthly check-ins and positive reinforcement.`
  )

  const isPremium = upgradeStatus !== 'free'

  if (!employee) notFound()

  if (!isPremium) {
    return (
      <>
        <PaywallModal open={true} onClose={() => {}} />
        <div className="p-6 blur-sm opacity-30 pointer-events-none">
          <div className="h-32 bg-zinc-900 rounded-xl border border-zinc-800" />
        </div>
      </>
    )
  }

  const scoreKey = timeState === 'day1' ? 'day1' : timeState as '30days' | '90days'
  const prevScore = timeState === '90days' ? employee.scores['30days'] : employee.scores.day1
  const delta = employee.scores[scoreKey] - prevScore
  const timeKey = timeState === 'day1' ? '30days' : timeState as '30days' | '90days'

  const location = getLocation(employee.locationId)
  const initials = employee.name.split(' ').map(n => n[0]).join('')
  const avatarColor = locationColors[employee.locationId] || 'bg-zinc-700 text-zinc-300'

  // Build chart data with location avg
  const chartData = employee.weeklyData[timeKey].map((d, i) => ({
    ...d,
    locationAvg: location?.weeklyData[timeKey][i]?.score,
  }))

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link href="/employees" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 mb-4 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Employees
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold ${avatarColor}`}>
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-zinc-50">{employee.name}</h1>
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge
                  className={`border text-xs ${getTrendColor(employee.trend)} bg-transparent border-current/30`}
                  variant="outline"
                >
                  {getTrendLabel(employee.trend)} over 90 days
                </Badge>
              </motion.div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-zinc-400">{employee.role}</span>
              <span className="text-zinc-700">·</span>
              <Link href={`/locations/${employee.locationId}`} className="text-sm text-violet-400 hover:text-violet-300">
                {employee.locationName}
              </Link>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-4xl font-mono font-medium ${getScoreColor(employee.scores[scoreKey])}`}>
              {employee.scores[scoreKey].toFixed(1)}
            </span>
            <span className="text-zinc-600 font-mono">/5.0</span>
          </div>
          <div className={`text-sm font-mono ${getDeltaColor(delta)}`}>{formatDelta(delta)}</div>
          <p className="text-xs text-zinc-600 mt-1">{employee.feedbackCounts[scoreKey]} responses</p>
        </div>
      </div>

      {/* Performance timeline */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 mb-6">
        <h2 className="text-sm font-semibold text-zinc-100 mb-4">Performance Timeline</h2>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="week" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={{ stroke: '#27272a' }} tickLine={false} />
              <YAxis domain={[2, 5]} tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="score"
                stroke={locationChartColors[employee.locationId] || '#8b5cf6'}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
              {location && (
                <Line
                  type="monotone"
                  dataKey="locationAvg"
                  stroke="#52525b"
                  strokeWidth={1.5}
                  strokeDasharray="4 2"
                  dot={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-zinc-600 mt-1">Dashed line = {employee.locationName} location average</p>
      </div>

      {/* What members are saying */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-zinc-100 mb-3">What Members Are Saying</h2>
        <div className="grid grid-cols-2 gap-4">
          <ThemeSection
            title="Strengths"
            items={employee.strengths}
            messages={employee.smsExamples.filter(m => !employee.issues.some(() =>
              m.message.toLowerCase().includes('not') || m.message.toLowerCase().includes('off') || m.message.toLowerCase().includes('distract')
            ))}
            type="strength"
          />
          {employee.issues.length > 0 && (
            <ThemeSection
              title="Needs Attention"
              items={employee.issues}
              messages={employee.smsExamples.filter(m =>
                m.message.toLowerCase().includes('not') ||
                m.message.toLowerCase().includes('off') ||
                m.message.toLowerCase().includes('distract') ||
                m.message.toLowerCase().includes('low') ||
                m.message.toLowerCase().includes('bad') ||
                m.message.toLowerCase().includes('left')
              )}
              type="issue"
            />
          )}
        </div>

        {/* All SMS examples */}
        <div className="mt-4">
          <h3 className="text-xs text-zinc-500 font-medium mb-2 uppercase tracking-wider">Member Feedback</h3>
          <div className="space-y-2">
            {employee.smsExamples.map((msg, i) => (
              <SMSBubble key={i} message={msg} highlightName={employee.name} />
            ))}
          </div>
        </div>
      </div>

      {/* Coaching notes */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-zinc-100">Coaching Notes</h2>
          <button
            onClick={() => setEditingNotes(!editingNotes)}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <Edit2 className="w-3 h-3" />
            {editingNotes ? 'Done' : 'Edit'}
          </button>
        </div>
        {editingNotes ? (
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-sm text-zinc-300 resize-none focus:outline-none focus:ring-1 focus:ring-violet-500"
            rows={4}
          />
        ) : (
          <p className="text-sm text-zinc-400 leading-relaxed">{notes}</p>
        )}
      </div>
    </div>
  )
}
