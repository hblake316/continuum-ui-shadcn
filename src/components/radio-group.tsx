import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { cn } from '../lib/utils'

/**
 * Radio button derived from Figma component:
 *   - Radio (node 6558:39273)
 *   - Radio/with Form Group (node 6558:39344)
 *
 * Same size/color/state system as Checkbox:
 *   color:  primary | secondary | default
 *   size:   lg (38px touch) | md (32px touch) | sm (26px touch)
 *   states: enabled, hovered (circular ripple), focused (circular ripple), disabled
 */

// ── Size config ─────────────────────────────────────────────────

const sizeConfig = {
  lg: { outer: 'size-[38px] p-[9px]', icon: 'size-5' },
  md: { outer: 'size-8 p-1', icon: 'size-4' },
  sm: { outer: 'size-[26px] p-[3px]', icon: 'size-3' },
} as const

// ── Color config ────────────────────────────────────────────────

const colorConfig = {
  primary: {
    selected: 'text-primary',
    unselected: 'text-text-secondary',
    hover: 'group-hover:bg-primary-hover-subtle',
    focus: 'group-focus-visible:bg-primary-focus',
  },
  secondary: {
    selected: 'text-secondary',
    unselected: 'text-text-secondary',
    hover: 'group-hover:bg-secondary-hover-subtle',
    focus: 'group-focus-visible:bg-secondary-focus',
  },
  default: {
    selected: 'text-text-primary',
    unselected: 'text-text-secondary',
    hover: 'group-hover:bg-action-hover-subtle',
    focus: 'group-focus-visible:bg-action-focus',
  },
} as const

// ── RadioGroup Root ─────────────────────────────────────────────

interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  label?: string
  error?: string
}

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, label, error, children, ...props }, ref) => {
  return (
    <fieldset className={cn('flex flex-col gap-1', className)}>
      {label && (
        <legend className={cn('text-xs font-sans', error ? 'text-error' : 'text-text-secondary')}>
          {label}
        </legend>
      )}
      <RadioGroupPrimitive.Root className="flex flex-col gap-0" ref={ref} {...props}>
        {children}
      </RadioGroupPrimitive.Root>
      {error && <p className="text-xs font-sans text-error">{error}</p>}
    </fieldset>
  )
})
RadioGroup.displayName = 'RadioGroup'

// ── RadioGroupItem ──────────────────────────────────────────────

interface RadioGroupItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
  'color'
> {
  color?: 'primary' | 'secondary' | 'default'
  size?: 'lg' | 'md' | 'sm'
  label?: string
}

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, color = 'primary', size = 'md', label, disabled, ...props }, ref) => {
  const sizes = sizeConfig[size]
  const colors = colorConfig[color]

  return (
    <label
      className={cn(
        'inline-flex items-center gap-0 font-sans',
        disabled ? 'pointer-events-none' : 'cursor-pointer'
      )}
    >
      <RadioGroupPrimitive.Item
        ref={ref}
        disabled={disabled}
        className={cn(
          'group relative inline-flex items-center justify-center rounded-full focus-visible:outline-none',
          sizes.outer,
          className
        )}
        {...props}
      >
        {/* Hover/focus ripple */}
        <span
          className={cn(
            'absolute inset-0 rounded-full transition-colors',
            !disabled && colors.hover,
            !disabled && colors.focus
          )}
        />

        {/* Radio circle */}
        <span className="relative z-10">
          <RadioGroupPrimitive.Indicator asChild>
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className={cn(sizes.icon, disabled ? 'text-disabled-text' : colors.selected)}
            >
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            </svg>
          </RadioGroupPrimitive.Indicator>
        </span>

        {/* Unchecked circle (shown when not checked) */}
        <span className="absolute z-10 data-[state=checked]:hidden">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={cn(sizes.icon, disabled ? 'text-disabled-text' : colors.unselected)}
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
          </svg>
        </span>
      </RadioGroupPrimitive.Item>

      {label && (
        <span
          className={cn(
            'text-base leading-[21.6px] tracking-[0.15px]',
            disabled ? 'text-disabled-text' : 'text-text-primary'
          )}
        >
          {label}
        </span>
      )}
    </label>
  )
})
RadioGroupItem.displayName = 'RadioGroupItem'

export { RadioGroup, RadioGroupItem }
export type { RadioGroupProps, RadioGroupItemProps }
