import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { TimeProvider } from '@/context/TimeContext'
import { UpgradeProvider } from '@/context/UpgradeContext'
import { CompareProvider } from '@/components/layout/TopBar'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import { TrialBanner } from '@/components/freemium/TrialBanner'
import { ThemedToaster } from '@/components/layout/ThemedToaster'

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Set theme before hydration to prevent flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark')})()` }} />
      </head>
      <body className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 antialiased transition-colors duration-200">
        <ThemeProvider>
          <TimeProvider>
            <UpgradeProvider>
              <CompareProvider>
                <Sidebar />
                <TopBar />
                <TrialBanner />
                <main className="ml-60 pt-14 min-h-screen">
                  {children}
                </main>
                <ThemedToaster />
              </CompareProvider>
            </UpgradeProvider>
          </TimeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
