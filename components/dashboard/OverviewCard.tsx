'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card'
import { cn, getDeltaColor, formatDelta } from '@/lib/utils'

interface OverviewCardProps {
  title: string
  value: string | number
  delta?: number
  comparePeriod?: string
  suffix?: string
  isScore?: boolean
}

function AnimatedNumber({ value, isScore }: { value: number; isScore?: boolean }) {
  const motionVal = useMotionValue(value)

  useEffect(() => {
    const controls = animate(motionVal, value, { duration: 0.6, ease: 'easeOut' })
    return controls.stop
  }, [value, motionVal])

  return (
    <motion.span>
      {useTransform(motionVal, (v) =>
        isScore ? v.toFixed(1) : Math.round(v).toLocaleString()
      )}
    </motion.span>
  )
}

export function OverviewCard({
  title,
  value,
  delta,
  comparePeriod = 'vs 30d',
  suffix,
  isScore,
}: OverviewCardProps) {
  const numValue = typeof value === 'number' ? value : parseFloat(String(value))

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs uppercase tracking-wider">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-mono font-medium text-zinc-900 dark:text-zinc-50">
            {isNaN(numValue) ? (
              <span className="text-zinc-300 dark:text-zinc-600 text-lg">—</span>
            ) : (
              <AnimatedNumber value={numValue} isScore={isScore} />
            )}
          </span>
          {suffix && <span className="text-zinc-400 dark:text-zinc-500 text-sm font-mono">{suffix}</span>}
        </div>
        {delta !== undefined && (
          <div className={cn('mt-1.5 text-xs font-mono', getDeltaColor(delta))}>
            {formatDelta(delta)} <span className="text-zinc-400 dark:text-zinc-600">{comparePeriod}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
