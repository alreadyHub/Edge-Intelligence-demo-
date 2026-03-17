'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MapPin, Users, Mail, Lock, Zap } from 'lucide-react'
import { useUpgrade } from '@/context/UpgradeContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, href: '/', locked: false },
  { label: 'Locations', icon: MapPin, href: '/locations', locked: false },
  { label: 'Employees', icon: Users, href: '/employees', locked: true },
  { label: 'Reports', icon: Mail, href: '/reports', locked: false },
]

export function Sidebar() {
  const pathname = usePathname()
  const { upgradeStatus } = useUpgrade()

  const isPremium = upgradeStatus === 'premium' || upgradeStatus === 'trial'

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-gray-50 dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded bg-violet-600 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">Edge Intelligence</span>
        </div>
        {upgradeStatus === 'free' && (
          <Badge variant="default" className="text-xs">FREE PLAN</Badge>
        )}
        {upgradeStatus === 'trial' && (
          <Badge variant="premium" className="text-xs">TRIAL — 30 days left</Badge>
        )}
        {upgradeStatus === 'premium' && (
          <Badge variant="premium" className="text-xs">PREMIUM</Badge>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const isLocked = item.locked && !isPremium
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                isActive
                  ? 'bg-gray-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50'
                  : isLocked
                  ? 'text-zinc-400 dark:text-zinc-600 hover:text-zinc-500 dark:hover:text-zinc-500 hover:bg-gray-100 dark:hover:bg-zinc-800/50'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-gray-100 dark:hover:bg-zinc-800'
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
              {isLocked && <Lock className="w-3 h-3 ml-auto text-zinc-400 dark:text-zinc-600" />}
              {isActive && !isLocked && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
        {upgradeStatus === 'free' && (
          <Link href="/upgrade">
            <Button className="w-full text-sm" size="sm">
              Upgrade to Premium
            </Button>
          </Link>
        )}
        {upgradeStatus === 'trial' && (
          <div className="text-xs text-zinc-400 dark:text-zinc-500 text-center">
            <span className="text-violet-400">Trial active</span> — 30 days remaining
          </div>
        )}
        {upgradeStatus === 'premium' && (
          <div className="text-xs text-zinc-400 dark:text-zinc-500 text-center">Premium plan active</div>
        )}
      </div>
    </aside>
  )
}
