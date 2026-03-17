'use client'

import { Toaster } from 'sonner'
import { useTheme } from '@/context/ThemeContext'

export function ThemedToaster() {
  const { theme } = useTheme()
  return <Toaster position="bottom-right" theme={theme} />
}
