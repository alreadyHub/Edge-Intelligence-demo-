'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'
import { useTime } from '@/context/TimeContext'
import { useUpgrade } from '@/context/UpgradeContext'
import { overviewStats, locations, topIssues } from '@/lib/mockData'
import { OverviewCard } from '@/components/dashboard/OverviewCard'
import { TrendChart } from '@/components/dashboard/TrendChart'
import { IssueCard } from '@/components/dashboard/IssueCard'
import { TopPerformers } from '@/components/dashboard/TopPerformers'
import { LocationCard } from '@/components/location/LocationCard'
import { useCompare } from '@/components/layout/TopBar'

function EmptyStateBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-5 mb-6 relative"
    >
      <button
        onClick={onDismiss}
        className="absolute right-4 top-4 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-4">
        <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mb-1">Your insights are building.</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            These are sample insights so you can see what Edge Intelligence will look like for your team.
            Every time a member leaves feedback after a visit, your real insights get richer.
          </p>
          <div className="flex items-center gap-0">
            {[
              { label: 'First feedback', active: true },
              { label: 'Trends emerging', active: false },
              { label: 'Full intelligence', active: false },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-2.5 h-2.5 rounded-full border-2 ${step.active ? 'bg-amber-400 border-amber-400' : 'bg-transparent border-gray-300 dark:border-zinc-700'}`} />
                  <span className={`text-xs mt-1 ${step.active ? 'text-amber-400' : 'text-zinc-400 dark:text-zinc-600'}`}>
                    {step.label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className={`h-px w-16 mb-4 mx-2 ${step.active ? 'bg-amber-400/40' : 'bg-gray-200 dark:bg-zinc-800'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function DashboardPage() {
  const { timeState } = useTime()
  const { upgradeStatus } = useUpgrade()
  const { comparePeriod } = useCompare()
  const [bannerDismissed, setBannerDismissed] = useState(false)

  const stats = overviewStats[timeState === 'day1' ? 'day1' : timeState as '30days' | '90days']

  const compareMultiplier = comparePeriod === 'vs. 30d' ? 1 : comparePeriod === 'vs. 60d' ? 1.5 : 2
  const scoreDelta = timeState === 'day1' ? 0 : parseFloat(((stats.score - 3.5) * compareMultiplier * 0.3).toFixed(1))
  const feedbackDelta = timeState === 'day1' ? 0 : Math.round(stats.feedbackCount * 0.12 * compareMultiplier)

  const maxFrequency = topIssues[0]?.frequency || 1
  const visibleIssues = timeState === 'day1' ? topIssues.slice(0, 2) : timeState === '30days' ? topIssues.slice(0, 4) : topIssues

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <AnimatePresence>
        {timeState === 'day1' && !bannerDismissed && (
          <EmptyStateBanner onDismiss={() => setBannerDismissed(true)} />
        )}
      </AnimatePresence>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <OverviewCard
          title="Overall Score"
          value={stats.score}
          delta={timeState === 'day1' ? undefined : scoreDelta}
          comparePeriod={comparePeriod}
          suffix="/5.0"
          isScore
        />
        <OverviewCard
          title="Total Feedback"
          value={timeState === 'day1' ? 0 : stats.feedbackCount}
          delta={timeState === 'day1' ? undefined : feedbackDelta}
          comparePeriod={comparePeriod}
        />
        <OverviewCard
          title="Locations Tracked"
          value={stats.locationsTracked}
        />
        <OverviewCard
          title="Top Issue This Period"
          value={timeState === 'day1' ? '—' : ''}
          delta={undefined}
        />
      </div>

      {/* Score trend chart */}
      <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Score Trends — All Locations</h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">Weekly average score by location</p>
          </div>
          {upgradeStatus === 'free' && (
            <span className="text-xs bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-zinc-500 rounded px-2 py-1">
              Employee-level trends available in Premium
            </span>
          )}
        </div>
        <TrendChart />
      </div>

      {/* Locations grid */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mb-3">Locations</h2>
        <div className="grid grid-cols-3 gap-4">
          {locations.map(loc => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      </div>

      {/* Top Issues */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mb-3">Top Issues This Period</h2>
        <div className="space-y-2">
          {visibleIssues.map((issue, i) => (
            <IssueCard
              key={issue.name}
              issue={issue}
              rank={i + 1}
              maxFrequency={maxFrequency}
              locked={i >= 3}
            />
          ))}
          {timeState === 'day1' && (
            <p className="text-xs text-zinc-400 dark:text-zinc-600 text-center py-2">More issues will surface as feedback accumulates</p>
          )}
        </div>
      </div>

      {/* Top Performers / Coaching */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mb-3">Performance Intelligence</h2>
        <TopPerformers />
      </div>
    </div>
  )
}
