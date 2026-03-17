'use client'

import { useState } from 'react'
import { X, Zap } from 'lucide-react'
import Link from 'next/link'
import { useUpgrade } from '@/context/UpgradeContext'

export function TrialBanner() {
  const [dismissed, setDismissed] = useState(false)
  const { upgradeStatus, trialDaysRemaining } = useUpgrade()

  if (upgradeStatus !== 'trial' || dismissed) return null

  return (
    <div className="fixed top-14 left-60 right-0 h-8 bg-violet-600 flex items-center justify-between px-6 z-20">
      <div className="flex items-center gap-2 text-xs text-white">
        <Zap className="w-3 h-3" />
        <span>
          Free trial active — <strong>{trialDaysRemaining} days</strong> remaining.
          Upgrade to keep access after your trial ends.
        </span>
        <Link href="/upgrade" className="underline hover:no-underline font-medium ml-1">
          Upgrade now
        </Link>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-white/70 hover:text-white transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
