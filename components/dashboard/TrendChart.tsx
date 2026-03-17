'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts'
import { useTime } from '@/context/TimeContext'
import { useTheme } from '@/context/ThemeContext'
import { locations } from '@/lib/mockData'
import { WeeklyDataPoint } from '@/types'

const locationColors: Record<string, string> = {
  'back-bay': '#8b5cf6',
  'south-end': '#34d399',
  'cambridge': '#fbbf24',
}

interface ChartDataPoint {
  week: string
  [key: string]: number | string
}

function buildChartData(timeKey: '30days' | '90days'): ChartDataPoint[] {
  const allWeeks = new Set<string>()
  locations.forEach(loc => {
    loc.weeklyData[timeKey].forEach((d: WeeklyDataPoint) => allWeeks.add(d.week))
  })

  return Array.from(allWeeks).map(week => {
    const point: ChartDataPoint = { week }
    locations.forEach(loc => {
      const d = loc.weeklyData[timeKey].find((p: WeeklyDataPoint) => p.week === week)
      if (d) point[loc.id] = d.score
    })
    return point
  })
}

interface TooltipPayload { dataKey: string; color: string; value?: number }
interface CustomTooltipProps { active?: boolean; payload?: TooltipPayload[]; label?: string }

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-zinc-500 dark:text-zinc-400 mb-1.5 font-medium">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-zinc-500 dark:text-zinc-400">{locations.find(l => l.id === p.dataKey)?.name}</span>
          <span className="font-mono text-zinc-800 dark:text-zinc-100 ml-auto pl-4">{p.value?.toFixed(1)}</span>
        </div>
      ))}
    </div>
  )
}

export function TrendChart({ singleLocationId }: { singleLocationId?: string }) {
  const { timeState } = useTime()
  const { theme } = useTheme()
  const timeKey = timeState === 'day1' ? '30days' : timeState as '30days' | '90days'

  const tickColor = theme === 'dark' ? '#71717a' : '#a1a1aa'
  const gridColor = theme === 'dark' ? '#27272a' : '#e4e4e7'

  const visibleLocations = singleLocationId
    ? locations.filter(l => l.id === singleLocationId)
    : locations

  const data = timeState === 'day1'
    ? [{ week: 'W1', ...Object.fromEntries(visibleLocations.map(l => [l.id, l.scores.day1])) }]
    : buildChartData(timeKey).filter(d =>
        visibleLocations.some(l => d[l.id] !== undefined)
      )

  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="week"
            tick={{ fill: tickColor, fontSize: 11 }}
            axisLine={{ stroke: gridColor }}
            tickLine={false}
          />
          <YAxis
            domain={[2.5, 5]}
            tick={{ fill: tickColor, fontSize: 11, fontFamily: 'JetBrains Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          {!singleLocationId && (
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
              formatter={(value) => (
                <span style={{ color: tickColor }}>
                  {locations.find(l => l.id === value)?.name || value}
                </span>
              )}
            />
          )}
          {visibleLocations.map(loc => (
            <Line
              key={loc.id}
              type="monotone"
              dataKey={loc.id}
              stroke={locationColors[loc.id]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
