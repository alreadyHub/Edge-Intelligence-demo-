'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Users, Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface PaywallModalProps {
  open: boolean
  onClose: () => void
}

const features = [
  'Trailing 30/60/90-day performance scores per employee',
  'Identify top performers and coaching opportunities',
  'See what members are saying about specific instructors',
  'Compare employees across locations',
  'Weekly email digest delivered automatically',
]

export function PaywallModal({ open, onClose }: PaywallModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-violet-600/20 border border-violet-600/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-zinc-50">Employee Intelligence</h2>
                  <p className="text-xs text-zinc-500">Premium feature</p>
                </div>
              </div>

              <p className="text-sm text-zinc-400 mb-4">
                See exactly how each instructor is performing based on real member feedback — not guesswork.
              </p>

              <ul className="space-y-2 mb-6">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/upgrade" onClick={onClose}>
                <Button className="w-full">Start 30-Day Free Trial</Button>
              </Link>
              <p className="text-xs text-zinc-600 text-center mt-2">No credit card required. Cancel anytime.</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
