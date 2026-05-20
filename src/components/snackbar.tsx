import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * Snackbar derived from Figma component:
 *   - Snackbar (node 6586:47081)
 *
 * Brief toast notification bar.
 *
 * Figma tokens:
 *   bg: snackbar-background #24282d
 *   text: white, 13px regular
 *   border-radius: 4px
 *   padding: 16px horizontal, 6px vertical
 *   shadow: elevation/8
 *   action: outlined button (small)
 *   close: 20px × icon
 */

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn('size-5', className)}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  )
}

interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  message: string
  action?: React.ReactNode
  onClose?: () => void
}

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  ({ className, open = true, message, action, onClose, ...props }, ref) => {
    if (!open) return null

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'inline-flex items-center gap-2 rounded bg-action-dark px-4 py-1.5 font-sans',
          'shadow-[0px_5px_5px_0px_rgba(0,0,0,0.2),0px_8px_10px_0px_rgba(0,0,0,0.14),0px_3px_14px_0px_rgba(0,0,0,0.12)]',
          className
        )}
        {...props}
      >
        <span className="py-2 text-[13px] leading-[17.55px] tracking-[0.15px] text-background-paper whitespace-nowrap">
          {message}
        </span>

        {action && <span className="shrink-0">{action}</span>}

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 p-1 rounded-full text-background-paper hover:text-background-paper/80 transition-colors"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    )
  }
)
Snackbar.displayName = 'Snackbar'

export { Snackbar }
export type { SnackbarProps }
