import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 border-gray-300 dark:border-zinc-600',
        premium: 'bg-violet-900/50 text-violet-300 border-violet-700/50',
        success: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
        warning: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
        danger: 'bg-rose-400/10 text-rose-400 border-rose-400/20',
        violet: 'bg-violet-400/10 text-violet-300 border-violet-400/20',
        outline: 'bg-transparent text-zinc-500 dark:text-zinc-400 border-gray-300 dark:border-zinc-700',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
