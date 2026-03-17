'use client'

import { Lock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface LockedOverlayProps {
  title?: string
  description?: string
  compact?: boolean
}

export function LockedOverlay({
  title = 'Premium Feature',
  description = 'Unlock with a free trial',
  compact = false,
}: LockedOverlayProps) {
  if (compact) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm rounded-lg z-10">
        <div className="flex items-center gap-2 text-zinc-500">
          <Lock className="w-3.5 h-3.5" />
          <span className="text-xs">Premium</span>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/70 backdrop-blur-sm rounded-lg z-10">
      <div className="flex flex-col items-center gap-3 text-center max-w-xs px-4">
        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
          <Lock className="w-5 h-5 text-zinc-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-200">{title}</p>
          <p className="text-xs text-zinc-500 mt-1">{description}</p>
        </div>
        <Link href="/upgrade">
          <Button size="sm">Start Free Trial</Button>
        </Link>
      </div>
    </div>
  )
}
