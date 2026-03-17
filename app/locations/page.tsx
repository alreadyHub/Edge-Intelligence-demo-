'use client'

import { useState } from 'react'
import { useTime } from '@/context/TimeContext'
import { locations } from '@/lib/mockData'
import { LocationCard } from '@/components/location/LocationCard'
import { Button } from '@/components/ui/button'

type SortKey = 'score' | 'feedback' | 'name' | 'status'

const statusOrder = { 'needs-attention': 0, 'improving': 1, 'high-performing': 2 }

export default function LocationsPage() {
  const { timeState } = useTime()
  const [sort, setSort] = useState<SortKey>('score')

  const scoreKey = timeState === 'day1' ? 'day1' : timeState as '30days' | '90days'

  const sorted = [...locations].sort((a, b) => {
    switch (sort) {
      case 'score': return b.scores[scoreKey] - a.scores[scoreKey]
      case 'feedback': return b.feedbackCounts[scoreKey] - a.feedbackCounts[scoreKey]
      case 'name': return a.name.localeCompare(b.name)
      case 'status':
        return statusOrder[a.status[scoreKey]] - statusOrder[b.status[scoreKey]]
      default: return 0
    }
  })

  const sortButtons: { key: SortKey; label: string }[] = [
    { key: 'score', label: 'Score' },
    { key: 'feedback', label: 'Feedback Volume' },
    { key: 'name', label: 'Alphabetical' },
    { key: 'status', label: 'Needs Attention First' },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Locations</h1>
          <span className="text-xs bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 rounded-full px-2 py-0.5">
            {locations.length} active
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 dark:text-zinc-500">Sort by:</span>
          {sortButtons.map(btn => (
            <Button
              key={btn.key}
              variant={sort === btn.key ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setSort(btn.key)}
              className="text-xs h-7"
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {sorted.map(loc => (
          <LocationCard key={loc.id} location={loc} showSparkline />
        ))}
      </div>
    </div>
  )
}
