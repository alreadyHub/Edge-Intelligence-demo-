'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { toast } from 'sonner'
import { useUpgrade } from '@/context/UpgradeContext'
import { locations } from '@/lib/mockData'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

function EmailPreview() {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-zinc-700 overflow-hidden shadow-xl">
      {/* Email client chrome */}
      <div className="bg-gray-100 dark:bg-zinc-800 px-4 py-2.5 border-b border-gray-200 dark:border-zinc-700 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-zinc-400 dark:text-zinc-500">Weekly Digest Preview</span>
        </div>
      </div>

      {/* Email body — always light (simulates email client) */}
      <div className="bg-white p-6 font-mono text-[13px] leading-relaxed text-gray-800 max-h-[600px] overflow-y-auto">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">E</span>
            </div>
            <div>
              <div className="font-bold text-purple-700 text-sm">EDGE INTELLIGENCE</div>
              <div className="text-xs text-gray-500">Weekly Performance Digest</div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="text-xs text-gray-400 mb-1">To: lesley@healthworks.com</div>
            <div className="font-bold text-base">Your Edge Intelligence Weekly Digest — Week of Mar 10</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="text-xs text-gray-500 mb-1">BACK BAY — OVERALL SCORE THIS WEEK</div>
            <div className="text-3xl font-bold text-purple-700">4.5 <span className="text-lg text-gray-500 font-normal">/ 5.0</span></div>
            <div className="text-sm text-green-600 font-medium">↑ +0.2 vs. last week</div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">WHAT&apos;S WORKING</div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <div className="font-medium">Instructor energy remains your #1 strength</div>
                  <div className="text-gray-500 mt-0.5 italic text-xs">
                    &quot;Sarah&apos;s 7am class is the only reason I get out of bed.&quot; — Member #4821, Mar 12
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <div className="font-medium">Marcus is trending up — 3rd consecutive week of improvement</div>
                  <div className="text-gray-500 text-xs mt-0.5">Score: 4.2 → 4.5 over 3 weeks</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">NEEDS ATTENTION</div>
            <div className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">⚠</span>
              <div>
                <div className="font-medium">Lily C. — score declined for the 2nd consecutive week (3.4)</div>
                <div className="text-gray-500 mt-0.5 text-xs">Members are flagging low energy in evening classes.</div>
                <div className="text-gray-500 mt-0.5 italic text-xs">
                  &quot;I left the 6pm class early. The pacing was really off.&quot; — Member #4409, Mar 7
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">THIS WEEK&apos;S FEEDBACK VOLUME</div>
            <div className="text-sm space-y-1">
              <div>📩 54 members responded <span className="text-green-600">(↑ 12% vs. last week)</span></div>
              <div className="text-gray-500">📍 Feedback collected via Edge SMS after each visit</div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 flex gap-4 text-xs">
            <a href="#" className="text-purple-600 font-medium">View Full Report →</a>
            <a href="#" className="text-gray-500">Manage Settings →</a>
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4 text-xs text-gray-400">
            <div className="font-medium text-gray-500">Powered by Edge Intelligence</div>
            <div>You&apos;re receiving this because you opted into weekly digests. <a href="#" className="underline">Unsubscribe</a></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ReportsPage() {
  const { upgradeStatus } = useUpgrade()
  const isPremium = upgradeStatus !== 'free'
  const [cadence, setCadence] = useState<'weekly' | 'monthly'>('weekly')
  const [email, setEmail] = useState('')
  const [selectedLocations, setSelectedLocations] = useState<string[]>(locations.map(l => l.id))
  const [includeEmployees, setIncludeEmployees] = useState(false)
  const [saved, setSaved] = useState(false)

  const toggleLocation = (id: string) => {
    setSelectedLocations(prev =>
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    )
  }

  const handleSave = () => {
    setSaved(true)
    const nextDate = cadence === 'weekly' ? 'next Monday' : 'first of next month'
    toast.success(`You're all set. Your first report arrives ${nextDate}.`)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Reports</h1>

      <div className="grid grid-cols-2 gap-6 items-start">
        {/* Settings */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cadence */}
              <div>
                <label className="text-xs text-zinc-400 dark:text-zinc-500 mb-2 block">Delivery cadence</label>
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-zinc-800 rounded-lg p-1 w-fit">
                  {(['weekly', 'monthly'] as const).map(c => (
                    <button
                      key={c}
                      onClick={() => setCadence(c)}
                      className={cn(
                        'px-4 py-1.5 rounded-md text-xs font-medium capitalize transition-colors',
                        cadence === c ? 'bg-gray-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs text-zinc-400 dark:text-zinc-500 mb-2 block">Delivery email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@yourorganization.com"
                />
              </div>

              {/* Locations */}
              <div>
                <label className="text-xs text-zinc-400 dark:text-zinc-500 mb-2 block">Locations included</label>
                <div className="space-y-2">
                  {locations.map(loc => (
                    <label key={loc.id} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(loc.id)}
                        onChange={() => toggleLocation(loc.id)}
                        className="rounded border-gray-300 dark:border-zinc-600 accent-violet-500"
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{loc.name}</span>
                      <span className="text-xs text-zinc-400 dark:text-zinc-600">{loc.city}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Employee breakdown */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm text-zinc-700 dark:text-zinc-300">Include employee breakdown</label>
                  {!isPremium && (
                    <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-0.5">Employee-level reporting available in Premium</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {!isPremium && <Badge variant="premium" className="text-xs">Premium</Badge>}
                  <Switch
                    checked={isPremium && includeEmployees}
                    onCheckedChange={isPremium ? setIncludeEmployees : undefined}
                    disabled={!isPremium}
                  />
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleSave}
                disabled={!email}
              >
                {saved ? (
                  <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Saved!</span>
                ) : (
                  'Save Preferences'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Email preview */}
        <div>
          <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mb-3">Report Preview</h2>
          <EmailPreview />
        </div>
      </div>
    </div>
  )
}
