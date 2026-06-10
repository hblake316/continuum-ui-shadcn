import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * Status Dot derived from Figma component (node 6587:47500).
 *
 * variant: standard (pill badge with text) | dot (8×8 circle, decorative)
 * color:   default | primary | secondary | error | warning | info | success
 *
 * Default color Standard has no background — text only on transparent.
 * Default color Dot uses a neutral gray (text-secondary).
 */

type StatusDotVariant = 'standard' | 'dot'
type StatusDotColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

/** @deprecated StatusDotStatus no longer maps to the old values ('online', 'offline', 'degraded'). Use StatusDotColor instead. */
type StatusDotStatus = StatusDotColor

interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: StatusDotVariant
  color?: StatusDotColor
}

const colorConfig: Record<StatusDotColor, { bg: string; text: string; dotBg: string }> = {
  default: { bg: '', text: 'text-text-primary', dotBg: 'bg-text-secondary' },
  primary: { bg: 'bg-primary', text: 'text-primary-foreground', dotBg: 'bg-primary' },
  secondary: { bg: 'bg-secondary', text: 'text-secondary-foreground', dotBg: 'bg-secondary' },
  error: { bg: 'bg-error', text: 'text-error-foreground', dotBg: 'bg-error' },
  warning: { bg: 'bg-warning', text: 'text-warning-foreground', dotBg: 'bg-warning' },
  info: { bg: 'bg-info', text: 'text-info-foreground', dotBg: 'bg-info' },
  success: { bg: 'bg-success', text: 'text-success-foreground', dotBg: 'bg-success' },
}

const StatusDot = React.forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ className, variant = 'standard', color = 'default', children, ...props }, ref) => {
    const { bg, text, dotBg } = colorConfig[color]

    if (variant === 'dot') {
      // children are intentionally ignored for the dot variant — it is a decorative circle only
      return (
        <span
          ref={ref}
          aria-hidden="true"
          className={cn('inline-block shrink-0 size-2 rounded-full', dotBg, className)}
          {...props}
        />
      )
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center h-[14px] px-[6.5px] rounded-[64px]',
          'font-sans text-sm-1x-component-reg400 whitespace-nowrap tracking-normal',
          bg,
          text,
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)
StatusDot.displayName = 'StatusDot'

export { StatusDot }
export type { StatusDotProps, StatusDotStatus, StatusDotColor, StatusDotVariant }
