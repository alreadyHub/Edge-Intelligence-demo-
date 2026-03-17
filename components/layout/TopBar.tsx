'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import { TimeSlider } from './TimeSlider'
import { cn } from '@/lib/utils'

const comparePeriods = ['vs. 30d', 'vs. 60d', 'vs. 90d'] as const
export type ComparePeriod = typeof comparePeriods[number]

// We expose a context for comparison period — keep it simple with a local state passed via prop
// Actually let's just use a shared context approach or make it a module-level singleton
// For the prototype, we'll use a simple approach with sessionStorage or just local state

import { createContext, useContext, ReactNode } from 'react'

interface CompareContextType {
  comparePeriod: ComparePeriod
  setComparePeriod: (p: ComparePeriod) => void
}

const CompareContext = createContext<CompareContextType>({
  comparePeriod: 'vs. 30d',
  setComparePeriod: () => {},
})

export function CompareProvider({ children }: { children: ReactNode }) {
  const [comparePeriod, setComparePeriod] = useState<ComparePeriod>('vs. 30d')
  return (
    <CompareContext.Provider value={{ comparePeriod, setComparePeriod }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  return useContext(CompareContext)
}

export function TopBar({ title }: { title?: string }) {
  const { comparePeriod, setComparePeriod } = useCompare()

  return (
    <header className="fixed top-0 left-60 right-0 h-14 bg-zinc-900 border-b border-zinc-800 flex items-center px-6 z-30">
      <div className="flex-1">
        {title && (
          <h1 className="text-sm font-semibold text-zinc-100">{title}</h1>
        )}
      </div>

      <div className="flex-1 flex justify-center">
        <TimeSlider />
      </div>

      <div className="flex-1 flex items-center justify-end gap-3">
        {/* Comparison toggle */}
        <div className="flex items-center gap-1 bg-zinc-800 rounded-lg p-1">
          {comparePeriods.map((p) => (
            <button
              key={p}
              onClick={() => setComparePeriod(p)}
              className={cn(
                'px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
                comparePeriod === p
                  ? 'bg-zinc-700 text-zinc-100'
                  : 'text-zinc-500 hover:text-zinc-300'
              )}
            >
              {p}
            </button>
          ))}
        </div>

        <button className="w-8 h-8 rounded-md flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors">
          <Bell className="w-4 h-4" />
        </button>

        <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-xs font-semibold text-white">
          L
        </div>
      </div>
    </header>
  )
}
