import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import { cn } from '../lib/utils'

/**
 * Checkbox derived from Figma component:
 *   - Checkbox (node 6543:43052)
 *
 * Variants:
 *   color:  primary | secondary | default
 *   size:   lg (38px touch, 28px icon) | md (32px touch, 24px icon) | sm (26px touch, 20px icon)
 *   states: enabled, hovered (circular ripple bg), focused (circular ripple bg), disabled
 *
 * Uses @radix-ui/react-checkbox for accessible checked/indeterminate state management.
 */

// ── Size config ─────────────────────────────────────────────────

const sizeConfig = {
  lg: { outer: 'size-[38px] rounded-[19px] p-[9px]', icon: 'size-[28px]' },
  md: { outer: 'size-8 rounded-[16px] p-1', icon: 'size-6' },
  sm: { outer: 'size-[26px] rounded-[13px] p-[3px]', icon: 'size-5' },
} as const

// ── Color config ────────────────────────────────────────────────

const colorConfig = {
  primary: {
    checked: 'text-primary',
    unchecked: 'text-text-secondary',
    hover: 'group-hover:bg-primary-hover-subtle',
    focus: 'group-focus-visible:bg-primary-focus',
  },
  secondary: {
    checked: 'text-secondary',
    unchecked: 'text-text-secondary',
    hover: 'group-hover:bg-secondary-hover-subtle',
    focus: 'group-focus-visible:bg-secondary-focus',
  },
  default: {
    checked: 'text-text-primary',
    unchecked: 'text-text-secondary',
    hover: 'group-hover:bg-action-hover-subtle',
    focus: 'group-focus-visible:bg-action-focus',
  },
} as const

// ── Icons ───────────────────────────────────────────────────────

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  )
}

function IndeterminateIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" />
    </svg>
  )
}

function UncheckedIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
    </svg>
  )
}

// ── Component ───────────────────────────────────────────────────

interface CheckboxProps extends Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  'color'
> {
  color?: 'primary' | 'secondary' | 'default'
  size?: 'lg' | 'md' | 'sm'
  label?: string
}

const Checkbox = React.forwardRef<React.ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, color = 'primary', size = 'md', label, disabled, checked, ...props }, ref) => {
    const sizes = sizeConfig[size]
    const colors = colorConfig[color]
    return (
      <label
        className={cn(
          'inline-flex items-center gap-0 font-sans',
          disabled ? 'pointer-events-none' : 'cursor-pointer'
        )}
      >
        <CheckboxPrimitive.Root
          ref={ref}
          checked={checked}
          disabled={disabled}
          className={cn(
            'group relative inline-flex items-center justify-center focus-visible:outline-none',
            sizes.outer,
            className
          )}
          {...props}
        >
          {/* Hover/focus ripple background */}
          <span
            className={cn(
              'absolute inset-0 rounded-full transition-colors',
              !disabled && colors.hover,
              !disabled && colors.focus
            )}
          />

          {/* Checkbox icon */}
          <CheckboxPrimitive.Indicator forceMount className="relative z-10">
            {checked === 'indeterminate' ? (
              <IndeterminateIcon
                className={cn(sizes.icon, disabled ? 'text-disabled-text' : colors.checked)}
              />
            ) : checked ? (
              <CheckIcon
                className={cn(sizes.icon, disabled ? 'text-disabled-text' : colors.checked)}
              />
            ) : (
              <UncheckedIcon
                className={cn(sizes.icon, disabled ? 'text-disabled-text' : colors.unchecked)}
              />
            )}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

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
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
export type { CheckboxProps }
