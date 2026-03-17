'use client'

import { motion } from 'framer-motion'
import { useTime } from '@/context/TimeContext'
import { TimeState } from '@/types'
import { cn } from '@/lib/utils'

const positions: { value: TimeState; label: string; sublabel: string }[] = [
  { value: 'day1', label: 'Day 1', sublabel: 'as of Day 1' },
  { value: '30days', label: '30 Days', sublabel: '30 days after launch' },
  { value: '90days', label: '90 Days', sublabel: '90 days after launch' },
]

export function TimeSlider() {
  const { timeState, setTimeState } = useTime()

  const currentIndex = positions.findIndex(p => p.value === timeState)
  const current = positions[currentIndex]

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1 bg-zinc-800 rounded-lg p-1">
        {positions.map((pos) => (
          <button
            key={pos.value}
            onClick={() => setTimeState(pos.value)}
            className={cn(
              'relative px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 z-10',
              timeState === pos.value
                ? 'text-zinc-50'
                : 'text-zinc-500 hover:text-zinc-300'
            )}
          >
            {timeState === pos.value && (
              <motion.div
                layoutId="slider-pill"
                className="absolute inset-0 bg-zinc-700 rounded-md"
                style={{ zIndex: -1 }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
              />
            )}
            {pos.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-600">Viewing insights {current.sublabel}</span>
        {timeState === 'day1' && (
          <span className="text-xs bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded px-1.5 py-0.5 font-medium">
            SAMPLE DATA
          </span>
        )}
      </div>
    </div>
  )
}
