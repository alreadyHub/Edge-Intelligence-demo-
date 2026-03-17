'use client'

import { useState } from 'react'
import { Check, ArrowRight, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useUpgrade } from '@/context/UpgradeContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  'Employee performance scores — trailing 30/60/90 days',
  'Identify top performers and coaching opportunities automatically',
  'See the exact feedback driving every score',
  'Compare employees across all your locations',
  'Weekly digest delivered to your inbox — no dashboard required',
]

export default function UpgradePage() {
  const [email, setEmail] = useState('')
  const [orgName, setOrgName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { setUpgradeStatus } = useUpgrade()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setUpgradeStatus('trial')
  }

  const handleGoToEmployees = () => {
    router.push('/employees')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="flex-[3] p-12 flex flex-col justify-center max-w-2xl">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-6 h-6 rounded bg-violet-600 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-zinc-300">Edge Intelligence</span>
        </div>

        <h1 className="text-4xl font-bold text-zinc-50 mb-4 leading-tight">
          Unlock Employee Intelligence
        </h1>
        <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
          Your members are already telling you which instructors are thriving and which need support.
          Edge Intelligence makes it visible.
        </p>

        <ul className="space-y-3 mb-8">
          {features.map(f => (
            <li key={f} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-violet-600/20 border border-violet-600/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-violet-400" />
              </div>
              <span className="text-zinc-300 text-sm">{f}</span>
            </li>
          ))}
        </ul>

        {/* Social proof */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <p className="text-sm text-zinc-300 italic leading-relaxed mb-3">
            "This is exactly what I've been trying to build manually. I've been doing this with
            spreadsheets for years."
          </p>
          <p className="text-xs text-zinc-600">— Fitness Director, Boston</p>
        </div>

        <p className="text-xs text-zinc-600 mt-6">
          30-day free trial. No credit card required. Cancel anytime.
        </p>
      </div>

      {/* Right side */}
      <div className="flex-[2] flex items-center justify-center p-12 border-l border-zinc-800">
        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-base font-semibold text-zinc-100 mb-1">Start your free trial</h2>
                    <p className="text-xs text-zinc-500 mb-5">No credit card required</p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div>
                        <label className="text-xs text-zinc-500 mb-1.5 block">Work email</label>
                        <Input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="you@yourorganization.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs text-zinc-500 mb-1.5 block">Studio / gym name</label>
                        <Input
                          type="text"
                          value={orgName}
                          onChange={e => setOrgName(e.target.value)}
                          placeholder="Healthworks Back Bay"
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" size="lg">
                        Start Free Trial
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>

                    <p className="text-xs text-zinc-600 text-center mt-3">
                      Your insights are already collecting. You're just unlocking the view.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.4, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-violet-600/20 border-2 border-violet-500 flex items-center justify-center mx-auto mb-5"
                >
                  <Check className="w-8 h-8 text-violet-400" />
                </motion.div>

                <h2 className="text-2xl font-bold text-zinc-50 mb-2">You're in. Trial activated.</h2>
                <p className="text-sm text-zinc-400 mb-6">
                  Employee Intelligence is now unlocked for 30 days. Explore your team's performance below.
                </p>

                <Button onClick={handleGoToEmployees} className="w-full" size="lg">
                  View Employee Performance
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
