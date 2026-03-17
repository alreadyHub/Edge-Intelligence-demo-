'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { TimeState, TimeContextType } from '@/types'

const TimeContext = createContext<TimeContextType | undefined>(undefined)

export function TimeProvider({ children }: { children: ReactNode }) {
  const [timeState, setTimeState] = useState<TimeState>('30days')

  return (
    <TimeContext.Provider value={{ timeState, setTimeState }}>
      {children}
    </TimeContext.Provider>
  )
}

export function useTime() {
  const ctx = useContext(TimeContext)
  if (!ctx) throw new Error('useTime must be used within TimeProvider')
  return ctx
}
