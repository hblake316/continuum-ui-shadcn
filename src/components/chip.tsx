import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

/**
 * Chip derived from Figma components:
 *   - Chip/Filled   (node 6588:47683)
 *   - Chip/Outlined (node 7611:69671)
 *
 * Compact elements that represent an input, attribute, or action.
 *   variant: filled | outlined
 *   color:   default | primary | secondary | error | warning | info | success
 *   size:    md (32px) | sm (24px)
 *   Optional: thumbnail (left avatar/icon), onDelete (shows × button)
 */

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn('size-[18px]', className)}>
      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
    </svg>
  )
}

const chipVariants = cva(
  'inline-flex items-center rounded-full font-sans font-medium whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        filled: '',
        outlined: 'border bg-background-paper',
      },
      color: {
        default: '',
        primary: '',
        secondary: '',
        error: '',
        warning: '',
        info: '',
        success: '',
      },
      size: {
        md: 'h-8 p-1 text-[13px] leading-[17.92px] tracking-[0.15px]',
        sm: 'h-6 p-0.5 text-[13px] leading-[17.92px] tracking-[0.15px]',
      },
    },
    compoundVariants: [
      // ── Filled ───────────────────────────────────────────────
      { variant: 'filled', color: 'default', className: 'bg-action-disabled-bg text-text-primary' },
      { variant: 'filled', color: 'primary', className: 'bg-primary text-primary-foreground' },
      { variant: 'filled', color: 'secondary', className: 'bg-secondary text-background-paper' },
      { variant: 'filled', color: 'error', className: 'bg-error text-error-foreground' },
      { variant: 'filled', color: 'warning', className: 'bg-warning text-warning-foreground' },
      { variant: 'filled', color: 'info', className: 'bg-info text-info-foreground' },
      { variant: 'filled', color: 'success', className: 'bg-success text-success-foreground' },

      // ── Outlined ─────────────────────────────────────────────
      {
        variant: 'outlined',
        color: 'default',
        className: 'border-outline-border text-text-primary',
      },
      { variant: 'outlined', color: 'primary', className: 'border-primary text-primary' },
      { variant: 'outlined', color: 'secondary', className: 'border-secondary text-secondary' },
      { variant: 'outlined', color: 'error', className: 'border-error text-error' },
      { variant: 'outlined', color: 'warning', className: 'border-warning text-warning' },
      { variant: 'outlined', color: 'info', className: 'border-info text-info' },
      { variant: 'outlined', color: 'success', className: 'border-success text-success' },
    ],
    defaultVariants: {
      variant: 'filled',
      color: 'default',
      size: 'md',
    },
  }
)

interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>, VariantProps<typeof chipVariants> {
  thumbnail?: React.ReactNode
  onDelete?: () => void
  onDeleteAriaLabel?: string
  disabled?: boolean
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      variant,
      color,
      size,
      thumbnail,
      onDelete,
      onDeleteAriaLabel,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          chipVariants({ variant, color, size }),
          disabled && 'opacity-50 pointer-events-none',
          className
        )}
        {...props}
      >
        {thumbnail && <span className="shrink-0">{thumbnail}</span>}

        <span className="px-1.5 py-0.5">{children}</span>

        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            disabled={disabled}
            className="shrink-0 rounded-full opacity-70 hover:opacity-100 transition-opacity"
            aria-label={onDeleteAriaLabel || 'Remove'}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    )
  }
)
Chip.displayName = 'Chip'

export { Chip, chipVariants }
export type { ChipProps }
