import type { Metadata } from 'next'
import './globals.css'
import { TimeProvider } from '@/context/TimeContext'
import { UpgradeProvider } from '@/context/UpgradeContext'
import { CompareProvider } from '@/components/layout/TopBar'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import { TrialBanner } from '@/components/freemium/TrialBanner'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Edge Intelligence',
  description: 'Employee and location performance intelligence for fitness operators',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-50 antialiased">
        <TimeProvider>
          <UpgradeProvider>
            <CompareProvider>
              <Sidebar />
              <TopBar />
              <TrialBanner />
              <main className="ml-60 pt-14 min-h-screen">
                {children}
              </main>
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: '#18181b',
                    border: '1px solid #27272a',
                    color: '#fafafa',
                  },
                }}
              />
            </CompareProvider>
          </UpgradeProvider>
        </TimeProvider>
      </body>
    </html>
  )
}
