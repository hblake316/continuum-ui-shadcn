import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * Badge derived from Figma components:
 *   - Badge (node 6587:47500)
 *   - Badge with Component (node 6587:47527)
 *
 * Generates a small badge to the top-right of its child(ren).
 *   variant: standard (pill with count) | dot (small circle)
 *   color:   default | primary | secondary | error | warning | info | success
 *
 * Figma tokens:
 *   Standard: h-[14px] px-[6.5px] rounded-full, 12px medium text, white
 *   Dot: size-2 rounded-full
 */

const colorMap = {
  default: 'bg-action',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  error: 'bg-error',
  warning: 'bg-warning',
  info: 'bg-info',
  success: 'bg-success',
} as const

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'standard' | 'dot'
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  count?: number
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'standard', color = 'primary', count, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('relative inline-flex', className)} {...props}>
        {children}

        {variant === 'standard' ? (
          <span
            className={cn(
              'absolute top-0 right-0 translate-x-1/2 -translate-y-1/2',
              'inline-flex items-center justify-center h-3.5 min-w-[14px] px-1 rounded-full',
              'font-sans font-medium text-xs leading-[15.96px] tracking-[0.14px] text-background-paper',
              colorMap[color]
            )}
          >
            {count}
          </span>
        ) : (
          <span className={cn('absolute top-1 right-1 size-2 rounded-full', colorMap[color])} />
        )}
      </div>
    )
  }
)
Badge.displayName = 'Badge'

export { Badge }
export type { BadgeProps }
