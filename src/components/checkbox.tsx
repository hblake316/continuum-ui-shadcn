import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { MdCheckBox, MdCheckBoxOutlineBlank, MdIndeterminateCheckBox } from 'react-icons/md'

import { cn } from '../lib/utils'

/**
 * Checkbox derived from Figma component:
 *   - Checkbox (node 6543:43052)
 *
 * Variants:
 *   color:  primary | secondary | invalid
 *   states: enabled, hovered (2px focus ring), focused (3px focus ring), disabled
 *
 * Hit area 24×24px · Icon 18×18px · Focus ring 13.5×13.5px (2px border-radius)
 */

// ── Color config ──────────────────────────────────────────────────────────────

const colorConfig = {
  primary: {
    checked: 'text-primary',
    unchecked: 'text-text-secondary',
    label: 'text-text-primary',
    ringHover: 'group-hover:border-primary-hover-subtle',
    ringFocus: 'group-focus-visible:border-primary-hover-subtle',
  },
  secondary: {
    checked: 'text-text-primary',
    unchecked: 'text-text-secondary',
    label: 'text-text-primary',
    ringHover: 'group-hover:border-action-focus',
    ringFocus: 'group-focus-visible:border-action-selected',
  },
  invalid: {
    checked: 'text-error',
    unchecked: 'text-error',
    label: 'text-error',
    ringHover: 'group-hover:border-error-focus',
    ringFocus: 'group-focus-visible:border-error-focus',
  },
} as const

// ── Component ─────────────────────────────────────────────────────────────────

interface CheckboxProps extends Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  'color'
> {
  color?: 'primary' | 'secondary' | 'invalid'
  label?: string
}

const Checkbox = React.forwardRef<React.ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, color = 'primary', label, disabled, checked, ...props }, ref) => {
    const colors = colorConfig[color]
    const isDisabledIndeterminate = disabled && checked === 'indeterminate'

    return (
      <label
        className={cn(
          'inline-flex items-start gap-2 font-sans',
          disabled ? 'pointer-events-none' : 'cursor-pointer'
        )}
      >
        <CheckboxPrimitive.Root
          ref={ref}
          checked={checked}
          disabled={disabled}
          className={cn(
            'group relative flex size-6 flex-none items-center justify-center focus-visible:outline-none',
            className
          )}
          {...props}
        >
          {/* Icon: 18×18px (12.5% inset from 24×24 hit area = 3px each side) */}
          <CheckboxPrimitive.Indicator forceMount>
            {checked === 'indeterminate' ? (
              <MdIndeterminateCheckBox
                className={cn('size-[18px]', disabled ? 'text-disabled-text' : colors.checked)}
              />
            ) : checked ? (
              <MdCheckBox
                className={cn('size-[18px]', disabled ? 'text-disabled-text' : colors.checked)}
              />
            ) : (
              <MdCheckBoxOutlineBlank
                className={cn('size-[18px]', disabled ? 'text-disabled-text' : colors.unchecked)}
              />
            )}
          </CheckboxPrimitive.Indicator>

          {/* Focus ring: 13.5×13.5px aligned to the SVG drawn border.
            inset-[5.25px] = 3px (icon margin) + 2.25px (12.5% of 18px icon). */}
          <span
            className={cn(
              'pointer-events-none absolute inset-[5.25px] rounded-sm border-0 border-solid border-transparent',
              !disabled && [
                'group-hover:border-2',
                colors.ringHover,
                'group-focus-visible:border-[3px]',
                colors.ringFocus,
              ]
            )}
          />
        </CheckboxPrimitive.Root>

        {label && (
          <span
            className={cn(
              'text-sm-1x-label-med500 whitespace-nowrap',
              isDisabledIndeterminate ? 'pt-1' : 'pt-0.5',
              disabled ? 'text-disabled-text' : colors.label
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
