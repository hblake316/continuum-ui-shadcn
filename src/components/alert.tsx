import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

/**
 * Alert derived from Figma component:
 *   - Alert (node 6595:48177)
 *
 * Feedback banner with severity icon, title, description, and optional action.
 *   severity: error | warning | info | success
 *   variant:  standard (light bg) | filled (dark bg)
 *
 * Figma tokens:
 *   standard: colored border-left, light alert-bg, dark alert-content text
 *   filled: solid color bg, white text
 */

function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn('size-5 shrink-0', className)}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  )
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn('size-5 shrink-0', className)}>
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  )
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn('size-5 shrink-0', className)}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  )
}

function SuccessIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn('size-5 shrink-0', className)}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  )
}

const severityIcons = {
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
  success: SuccessIcon,
}

const alertVariants = cva('flex items-start gap-3 rounded p-4 font-sans', {
  variants: {
    severity: {
      error: '',
      warning: '',
      info: '',
      success: '',
    },
    variant: {
      standard: 'border-l-4',
      filled: '',
    },
  },
  compoundVariants: [
    // Standard (light bg, colored left border)
    {
      variant: 'standard',
      severity: 'error',
      className: 'bg-error-hover-subtle border-l-error text-error-alert-content',
    },
    {
      variant: 'standard',
      severity: 'warning',
      className: 'bg-warning-alert-bg border-l-warning text-warning-alert-content',
    },
    {
      variant: 'standard',
      severity: 'info',
      className: 'bg-info-hover-subtle border-l-info text-info-alert-content',
    },
    {
      variant: 'standard',
      severity: 'success',
      className: 'bg-success-alert-bg border-l-success text-success-alert-content',
    },

    // Filled (solid color bg, white text)
    { variant: 'filled', severity: 'error', className: 'bg-error text-error-foreground' },
    {
      variant: 'filled',
      severity: 'warning',
      className: 'bg-warning-dark text-warning-foreground',
    },
    { variant: 'filled', severity: 'info', className: 'bg-info text-info-foreground' },
    { variant: 'filled', severity: 'success', className: 'bg-success text-success-foreground' },
  ],
  defaultVariants: {
    severity: 'info',
    variant: 'standard',
  },
})

interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>, VariantProps<typeof alertVariants> {
  title?: React.ReactNode
  action?: React.ReactNode
  icon?: React.ReactNode
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, severity = 'info', variant, title, action, icon, children, ...props }, ref) => {
    const Icon = severityIcons[severity!]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ severity, variant, className }))}
        {...props}
      >
        {icon ?? <Icon />}

        <div className="flex-1 min-w-0">
          {title && <p className="font-medium text-base leading-[21.6px]">{title}</p>}
          {children && <p className="text-sm leading-[17.55px] mt-0.5">{children}</p>}
        </div>

        {action && <div className="shrink-0 self-center">{action}</div>}
      </div>
    )
  }
)
Alert.displayName = 'Alert'

export { Alert, alertVariants }
export type { AlertProps }
