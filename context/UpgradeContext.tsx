'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { UpgradeStatus, UpgradeContextType } from '@/types'

const UpgradeContext = createContext<UpgradeContextType | undefined>(undefined)

export function UpgradeProvider({ children }: { children: ReactNode }) {
  const [upgradeStatus, setUpgradeStatus] = useState<UpgradeStatus>('free')

  return (
    <UpgradeContext.Provider value={{
      upgradeStatus,
      setUpgradeStatus,
      trialDaysRemaining: 30,
    }}>
      {children}
    </UpgradeContext.Provider>
  )
}

export function useUpgrade() {
  const ctx = useContext(UpgradeContext)
  if (!ctx) throw new Error('useUpgrade must be used within UpgradeProvider')
  return ctx
}
