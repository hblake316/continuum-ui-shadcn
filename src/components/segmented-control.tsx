import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * Segmented control derived from Figma components:
 *   - SegmentedControl/contained  (node 17935:3501)
 *   - SegmentedControl/outlined   (node 17942:4829)
 *
 * A toggle group where one segment is active (filled or outlined)
 * and the rest are text-style. Similar to iOS segmented control or
 * MUI ToggleButtonGroup.
 */

// ── Root ────────────────────────────────────────────────────────

interface SegmentedControlProps {
  value: string
  onValueChange: (value: string) => void
  variant?: 'contained' | 'outlined'
  color?: 'primary' | 'action'
  size?: 'md' | 'sm'
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

const SegmentedControlContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
  variant: 'contained' | 'outlined'
  color: 'primary' | 'action'
  size: 'md' | 'sm'
  disabled: boolean
}>({
  value: '',
  onValueChange: () => {},
  variant: 'contained',
  color: 'primary',
  size: 'md',
  disabled: false,
})

const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      value,
      onValueChange,
      variant = 'contained',
      color = 'primary',
      size = 'md',
      disabled = false,
      className,
      children,
    },
    ref
  ) => {
    return (
      <SegmentedControlContext.Provider
        value={{ value, onValueChange, variant, color, size, disabled }}
      >
        <div
          ref={ref}
          role="tablist"
          className={cn(
            'inline-flex items-center rounded border-[0.5px] border-outline-border bg-background-paper',
            size === 'md' ? 'h-8' : 'h-[26px]',
            className
          )}
        >
          {children}
        </div>
      </SegmentedControlContext.Provider>
    )
  }
)
SegmentedControl.displayName = 'SegmentedControl'

// ── Item ────────────────────────────────────────────────────────

const selectedContainedColors = {
  primary: 'bg-primary text-primary-foreground',
  action: 'bg-action text-action-foreground',
} as const

const selectedOutlinedColors = {
  primary: 'border border-primary text-primary',
  action: 'border border-action text-action',
} as const

interface SegmentedControlItemProps {
  value: string
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

const SegmentedControlItem = React.forwardRef<HTMLButtonElement, SegmentedControlItemProps>(
  ({ value: itemValue, disabled: itemDisabled, className, children }, ref) => {
    const ctx = React.useContext(SegmentedControlContext)
    const isSelected = ctx.value === itemValue
    const isDisabled = ctx.disabled || itemDisabled

    const sizeClasses =
      ctx.size === 'md'
        ? 'h-full px-3 py-1.5 text-sm leading-[19px]'
        : 'h-full px-2.5 py-1 text-[13px] leading-[17px]'

    let stateClasses: string

    if (isDisabled && isSelected) {
      stateClasses = 'bg-action-disabled-bg border border-outline-border text-disabled-text'
    } else if (isDisabled) {
      stateClasses = 'text-disabled-text'
    } else if (isSelected) {
      stateClasses =
        ctx.variant === 'contained'
          ? selectedContainedColors[ctx.color]
          : selectedOutlinedColors[ctx.color]
    } else {
      stateClasses = 'text-action hover:bg-action-hover-subtle'
    }

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isSelected}
        disabled={isDisabled}
        onClick={() => ctx.onValueChange(itemValue)}
        className={cn(
          'inline-flex items-center justify-center font-sans font-medium whitespace-nowrap transition-colors first:rounded-l last:rounded-r focus-visible:outline-none disabled:pointer-events-none',
          sizeClasses,
          stateClasses,
          className
        )}
      >
        {children}
      </button>
    )
  }
)
SegmentedControlItem.displayName = 'SegmentedControlItem'

export { SegmentedControl, SegmentedControlItem }
export type { SegmentedControlProps, SegmentedControlItemProps }
