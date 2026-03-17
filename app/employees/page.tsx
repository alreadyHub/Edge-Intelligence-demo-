'use client'

import { useState } from 'react'
import { Users, Search } from 'lucide-react'
import Link from 'next/link'
import { useTime } from '@/context/TimeContext'
import { useUpgrade } from '@/context/UpgradeContext'
import { employees, locations } from '@/lib/mockData'
import { EmployeeCard } from '@/components/employee/EmployeeCard'
import { PaywallModal } from '@/components/freemium/PaywallModal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function EmployeesPage() {
  const { timeState } = useTime()
  const { upgradeStatus } = useUpgrade()
  const [search, setSearch] = useState('')
  const [locationFilter, setLocationFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'score' | 'trend' | 'name' | 'feedback'>('score')
  const [paywallOpen, setPaywallOpen] = useState(false)

  const isPremium = upgradeStatus !== 'free'
  const scoreKey = timeState === 'day1' ? 'day1' : timeState as '30days' | '90days'

  const filtered = employees
    .filter(e => locationFilter === 'all' || e.locationId === locationFilter)
    .filter(e => search === '' || e.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'score': return b.scores[scoreKey] - a.scores[scoreKey]
        case 'feedback': return b.feedbackCounts[scoreKey] - a.feedbackCounts[scoreKey]
        case 'name': return a.name.localeCompare(b.name)
        case 'trend': {
          const order = { improving: 0, stable: 1, declining: 2 }
          return order[a.trend] - order[b.trend]
        }
        default: return 0
      }
    })

  if (!isPremium) {
    return (
      <>
        <PaywallModal open={paywallOpen} onClose={() => setPaywallOpen(false)} />
        <div className="p-6 max-w-5xl mx-auto">
          {/* Full-page lock */}
          <div className="relative">
            {/* Blurred content */}
            <div className="blur-sm opacity-30 pointer-events-none">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-lg font-semibold">Employees</h1>
                <div className="w-48 h-8 bg-zinc-800 rounded" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 h-24" />
                ))}
              </div>
            </div>

            {/* Paywall overlay */}
            <div className="absolute inset-0 flex items-start justify-center pt-24">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 max-w-md w-full shadow-2xl">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-violet-600/20 border border-violet-600/30 flex items-center justify-center">
                    <Users className="w-7 h-7 text-violet-400" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-zinc-50 text-center mb-2">Employee Intelligence</h2>
                <p className="text-sm text-zinc-400 text-center mb-6">
                  See exactly how each instructor is performing based on real member feedback — not guesswork.
                </p>

                <ul className="space-y-2.5 mb-6">
                  {[
                    'Trailing 30/60/90-day performance scores per employee',
                    'Identify top performers and coaching opportunities',
                    'See what members are saying about specific instructors',
                    'Compare employees across locations',
                    'Weekly email digest delivered automatically',
                  ].map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <span className="text-violet-400 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href="/upgrade">
                  <Button className="w-full" size="lg">Start 30-Day Free Trial</Button>
                </Link>
                <p className="text-xs text-zinc-600 text-center mt-2">No credit card required.</p>

                <button
                  onClick={() => setPaywallOpen(true)}
                  className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 mt-3 transition-colors"
                >
                  See a preview ↓
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-zinc-50">Employees</h1>
          <span className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-400 rounded-full px-2 py-0.5">
            {filtered.length} of {employees.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search employees..."
              className="pl-8 w-48 h-8 text-xs"
            />
          </div>
          <select
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
            className="h-8 rounded-md border border-zinc-700 bg-zinc-800 text-xs text-zinc-300 px-2 focus:outline-none focus:ring-1 focus:ring-violet-500"
          >
            <option value="all">All locations</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="h-8 rounded-md border border-zinc-700 bg-zinc-800 text-xs text-zinc-300 px-2 focus:outline-none focus:ring-1 focus:ring-violet-500"
          >
            <option value="score">Sort: Score</option>
            <option value="trend">Sort: Trend</option>
            <option value="feedback">Sort: Feedback</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {filtered.map(emp => (
          <EmployeeCard key={emp.id} employee={emp} />
        ))}
      </div>
    </div>
  )
}
