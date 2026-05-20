import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * Split button derived from Figma components:
 *   - SplitButton/contained  (node 17907:3689)
 *   - SplitButton/outlined   (node 17914:4497)
 *
 * Composite: a main action button + a dropdown trigger, separated by a 0.5px gap.
 * Both halves share the same color and size.
 */

// ── Shared color classes per variant style ──────────────────────

const containedColorMap = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary-dark disabled:bg-action-disabled-bg disabled:text-disabled-text',
  error:
    'bg-error text-error-foreground hover:bg-error-dark disabled:bg-action-disabled-bg disabled:text-disabled-text',
  warning:
    'bg-warning text-warning-foreground hover:bg-warning-dark disabled:bg-action-disabled-bg disabled:text-disabled-text',
  info: 'bg-info text-info-foreground hover:bg-info-dark disabled:bg-action-disabled-bg disabled:text-disabled-text',
  success:
    'bg-success text-success-foreground hover:bg-success-dark disabled:bg-action-disabled-bg disabled:text-disabled-text',
  action:
    'bg-action text-action-foreground hover:bg-action-dark disabled:bg-action-disabled-bg disabled:text-disabled-text',
} as const

const outlinedColorMap = {
  primary:
    'bg-background-paper border border-primary text-primary hover:bg-primary-hover-subtle disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
  error:
    'bg-background-paper border border-error-focus-ring text-error hover:bg-error-hover-subtle disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
  warning:
    'bg-background-paper border border-warning-focus-ring text-warning hover:bg-warning-hover-subtle disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
  info: 'bg-background-paper border border-info-focus-ring text-info hover:bg-info-hover-subtle disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
  success:
    'bg-background-paper border border-success-focus-ring text-success hover:bg-success-hover-subtle disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
  action:
    'bg-background-paper border border-action text-action hover:bg-action-hover-subtle disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
} as const

// ── Size maps ───────────────────────────────────────────────────

const mainSizeMap = {
  lg: 'h-[38px] px-4 py-2 text-[15px] leading-[21px]',
  md: 'h-8 px-3 py-1.5 text-sm leading-[19px]',
  sm: 'h-[26px] px-2.5 py-1 text-[13px] leading-[17px]',
} as const

const triggerSizeMap = {
  lg: 'size-[38px]',
  md: 'size-8',
  sm: 'size-[26px]',
} as const

// ── Chevron icon ────────────────────────────────────────────────

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('size-4', className)}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

// ── Component ───────────────────────────────────────────────────

type SplitButtonColor = 'primary' | 'error' | 'warning' | 'info' | 'success' | 'action'
type SplitButtonSize = 'lg' | 'md' | 'sm'

interface SplitButtonProps {
  variant?: 'contained' | 'outlined'
  color?: SplitButtonColor
  size?: SplitButtonSize
  disabled?: boolean
  className?: string
  children: React.ReactNode
  onClickMain?: React.MouseEventHandler<HTMLButtonElement>
  onClickDropdown?: React.MouseEventHandler<HTMLButtonElement>
  dropdownIcon?: React.ReactNode
}

const SplitButton = React.forwardRef<HTMLDivElement, SplitButtonProps>(
  (
    {
      variant = 'contained',
      color = 'primary',
      size = 'md',
      disabled = false,
      className,
      children,
      onClickMain,
      onClickDropdown,
      dropdownIcon,
    },
    ref
  ) => {
    const colorMap = variant === 'contained' ? containedColorMap : outlinedColorMap
    const colorClasses = colorMap[color]

    return (
      <div
        ref={ref}
        className={cn('inline-flex items-start gap-[0.5px] rounded bg-background-paper', className)}
      >
        {/* Main action button */}
        <button
          type="button"
          disabled={disabled}
          onClick={onClickMain}
          className={cn(
            'inline-flex items-center justify-center gap-2 font-sans font-medium whitespace-nowrap transition-colors rounded-l rounded-r-none focus-visible:outline-none disabled:pointer-events-none',
            colorClasses,
            mainSizeMap[size]
          )}
        >
          {children}
        </button>

        {/* Dropdown trigger */}
        <button
          type="button"
          disabled={disabled}
          onClick={onClickDropdown}
          aria-label="More options"
          className={cn(
            'inline-flex items-center justify-center transition-colors rounded-r rounded-l-none focus-visible:outline-none disabled:pointer-events-none',
            colorClasses,
            triggerSizeMap[size]
          )}
        >
          {dropdownIcon ?? <ChevronDownIcon />}
        </button>
      </div>
    )
  }
)
SplitButton.displayName = 'SplitButton'

export { SplitButton }
export type { SplitButtonProps }
