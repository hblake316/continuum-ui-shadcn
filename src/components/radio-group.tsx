import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'

import { cn } from '../lib/utils'

/**
 * Radio button derived from Figma component:
 *   - Radio (node 6558:39273)
 *   - Radio/with Form Group (node 6558:39344)
 *
 * Variants:
 *   color (item): default | invalid
 *   state (group): default | invalid (driven by error prop)
 *   states: enabled, hovered (circular ripple), focused (circular ripple), disabled
 *
 * Icon 20×20px · Gap between items: 8px · Group direction: column
 */

// ── Color config ──────────────────────────────────────────────────────────────

const colorConfig = {
  default: {
    selected: 'text-primary',
    unselected: 'text-text-secondary',
    label: 'text-text-primary',
    hover: 'group-hover:bg-primary-hover-subtle',
    focus: 'group-focus-visible:bg-primary-focus',
  },
  invalid: {
    selected: 'text-error',
    unselected: 'text-error',
    label: 'text-error',
    hover: 'group-hover:bg-error-hover-subtle',
    focus: 'group-focus-visible:bg-error-focus',
  },
} as const

// ── RadioGroup Root ───────────────────────────────────────────────────────────

interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  label?: string
  description?: string
  error?: string
}

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, label, description, error, children, ...props }, ref) => {
  const isInvalid = !!error
  return (
    <fieldset className={cn('flex flex-col gap-2', className)}>
      {label && (
        <legend
          className={cn('text-sm-1x-label-med500', isInvalid ? 'text-error' : 'text-text-primary')}
        >
          {label}
        </legend>
      )}
      {description && (
        <p className="w-[172px] text-sm-description-med500 text-text-secondary">{description}</p>
      )}
      <RadioGroupPrimitive.Root className="flex flex-col gap-2" ref={ref} {...props}>
        {children}
      </RadioGroupPrimitive.Root>
      {error && <p className="text-sm-description-med500 text-error">{error}</p>}
    </fieldset>
  )
})
RadioGroup.displayName = 'RadioGroup'

// ── RadioGroupItem ────────────────────────────────────────────────────────────

interface RadioGroupItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
  'color'
> {
  color?: 'default' | 'invalid'
  label?: string
  description?: string
}

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, color = 'default', label, description, disabled, ...props }, ref) => {
  const colors = colorConfig[color]

  return (
    <label
      className={cn(
        'inline-flex gap-2 pl-0.5 font-sans',
        description ? 'items-start' : 'items-center',
        disabled ? 'pointer-events-none' : 'cursor-pointer'
      )}
    >
      <RadioGroupPrimitive.Item
        ref={ref}
        disabled={disabled}
        className={cn(
          'group relative flex size-5 flex-none items-center justify-center rounded-full focus-visible:outline-none',
          className
        )}
        {...props}
      >
        {/* Hover/focus ripple — extends beyond the icon for a comfortable touch affordance */}
        <span
          className={cn(
            'absolute -inset-[6px] rounded-full transition-colors',
            !disabled && colors.hover,
            !disabled && colors.focus
          )}
        />

        {/* Unselected icon — always mounted; visually covered by the selected icon when checked */}
        <MdRadioButtonUnchecked
          className={cn(
            'relative z-10 size-5',
            disabled ? 'text-disabled-text' : colors.unselected
          )}
        />

        {/* Selected icon — mounted only when checked via Indicator */}
        <RadioGroupPrimitive.Indicator className="absolute inset-0 z-20 flex items-center justify-center">
          <MdRadioButtonChecked
            className={cn('size-5', disabled ? 'text-disabled-text' : colors.selected)}
          />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <span
              className={cn(
                'text-sm-1x-label-med500 max-w-[250px]',
                disabled ? 'text-disabled-text' : colors.label
              )}
            >
              {label}
            </span>
          )}
          {description && (
            <span className="w-[172px] text-sm-description-med500 text-text-secondary">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  )
})
RadioGroupItem.displayName = 'RadioGroupItem'

export { RadioGroup, RadioGroupItem }
export type { RadioGroupProps, RadioGroupItemProps }
