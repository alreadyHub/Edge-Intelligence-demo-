'use client'

import { Lock } from 'lucide-react'
import Link from 'next/link'
import { employees } from '@/lib/mockData'
import { useTime } from '@/context/TimeContext'
import { useUpgrade } from '@/context/UpgradeContext'
import { getTrendColor, getTrendLabel, getScoreColor } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function TopPerformers() {
  const { timeState } = useTime()
  const { upgradeStatus } = useUpgrade()
  const isPremium = upgradeStatus !== 'free'

  const scoreKey = timeState === 'day1' ? 'day1' : timeState as '30days' | '90days'

  const sorted = [...employees].sort((a, b) => b.scores[scoreKey] - a.scores[scoreKey])
  const topThree = sorted.slice(0, 3)
  const bottomThree = sorted.filter(e => e.trend === 'declining' || e.scores[scoreKey] < 3.5).slice(0, 3)

  if (!isPremium) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {['Top Performers', 'Coaching Opportunities'].map((title) => (
          <Card key={title} className="relative overflow-hidden">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-3 py-6">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-zinc-500" />
                </div>
                <p className="text-sm text-zinc-400 text-center max-w-[200px]">
                  See who&apos;s driving your best results — and who needs support
                </p>
                <Link href="/upgrade">
                  <Button size="sm">Start Free Trial</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>This Month&apos;s Top Performers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topThree.map((emp) => (
            <Link key={emp.id} href={`/employees/${emp.id}`} className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 transition-colors">
              <div className="w-8 h-8 rounded-full bg-violet-600/20 flex items-center justify-center text-xs font-semibold text-violet-300">
                {emp.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-100 font-medium truncate">{emp.name}</p>
                <p className="text-xs text-zinc-500">{emp.locationName}</p>
              </div>
              <div className="text-right">
                <p className={`font-mono text-sm font-medium ${getScoreColor(emp.scores[scoreKey])}`}>
                  {emp.scores[scoreKey].toFixed(1)}
                </p>
                <p className={`text-xs ${getTrendColor(emp.trend)}`}>{getTrendLabel(emp.trend)}</p>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Coaching Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Coaching Opportunities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {bottomThree.map((emp) => (
            <Link key={emp.id} href={`/employees/${emp.id}`} className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 transition-colors">
              <div className="w-8 h-8 rounded-full bg-amber-400/10 flex items-center justify-center text-xs font-semibold text-amber-400">
                {emp.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-100 font-medium truncate">{emp.name}</p>
                <p className="text-xs text-zinc-500 truncate">{emp.issues[0] || 'Needs coaching'}</p>
              </div>
              <div className="text-right">
                <p className={`font-mono text-sm font-medium ${getScoreColor(emp.scores[scoreKey])}`}>
                  {emp.scores[scoreKey].toFixed(1)}
                </p>
                <p className={`text-xs ${getTrendColor(emp.trend)}`}>{getTrendLabel(emp.trend)}</p>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
