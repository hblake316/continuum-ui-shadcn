import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

import { cn } from '../lib/utils'

/**
 * Switch toggle derived from Figma component:
 *   - Switch (node 6564:39128)
 *
 * MUI-style switch: a track with a circular knob that slides.
 *   color:  primary | secondary
 *   size:   lg (58×38) | md (48×32) | sm (36×26)
 *   states: enabled, hovered, focused, disabled
 *
 * Unchecked: dark track at 38% opacity, knob at left
 * Checked:   colored track at 50% opacity, knob slides right
 */

const sizeConfig = {
  lg: {
    root: 'w-[58px] h-[38px]',
    track: 'w-[34px] h-[14px]',
    thumb: 'size-5 data-[state=checked]:translate-x-5',
    thumbContainer: 'size-[38px]',
  },
  md: {
    root: 'w-12 h-8',
    track: 'w-[28px] h-3',
    thumb: 'size-4 data-[state=checked]:translate-x-4',
    thumbContainer: 'size-8',
  },
  sm: {
    root: 'w-9 h-[26px]',
    track: 'w-[22px] h-2.5',
    thumb: 'size-3 data-[state=checked]:translate-x-3',
    thumbContainer: 'size-[26px]',
  },
} as const

const colorConfig = {
  primary: {
    trackChecked: 'bg-primary',
    thumbChecked: 'bg-primary shadow-md',
    hover: 'group-hover:bg-primary-hover-subtle',
    focus: 'group-focus-visible:bg-primary-focus',
  },
  secondary: {
    trackChecked: 'bg-secondary',
    thumbChecked: 'bg-secondary shadow-md',
    hover: 'group-hover:bg-secondary-hover-subtle',
    focus: 'group-focus-visible:bg-secondary-focus',
  },
} as const

interface SwitchProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
  'color'
> {
  color?: 'primary' | 'secondary'
  size?: 'lg' | 'md' | 'sm'
  label?: string
}

const Switch = React.forwardRef<React.ComponentRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, color = 'primary', size = 'md', label, disabled, ...props }, ref) => {
    const sizes = sizeConfig[size]
    const colors = colorConfig[color]

    return (
      <label
        className={cn(
          'inline-flex items-center gap-0 font-sans',
          disabled ? 'pointer-events-none' : 'cursor-pointer'
        )}
      >
        <SwitchPrimitive.Root
          ref={ref}
          disabled={disabled}
          className={cn(
            'group relative inline-flex items-center shrink-0 focus-visible:outline-none',
            sizes.root,
            className
          )}
          {...props}
        >
          {/* Track */}
          <span
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors',
              sizes.track,
              disabled
                ? 'bg-disabled-text opacity-30'
                : 'data-[state=unchecked]:bg-text-primary data-[state=unchecked]:opacity-[0.38]',
              !disabled &&
                `data-[state=checked]:${colors.trackChecked} data-[state=checked]:opacity-50`
            )}
            data-state={props.checked ? 'checked' : props.defaultChecked ? 'checked' : 'unchecked'}
          />

          {/* Thumb with hover ripple */}
          <SwitchPrimitive.Thumb
            className={cn(
              'pointer-events-none relative flex items-center justify-center rounded-full transition-transform',
              sizes.thumbContainer,
              // Ripple on hover/focus
              'before:absolute before:inset-0 before:rounded-full before:transition-colors',
              !disabled && `before:${colors.hover} before:${colors.focus}`
            )}
          >
            <span
              className={cn(
                'block rounded-full shadow-md transition-colors',
                sizes.thumb,
                disabled
                  ? 'bg-disabled-text'
                  : cn(
                      'data-[state=unchecked]:bg-background-paper',
                      `data-[state=checked]:${colors.thumbChecked}`
                    )
              )}
            />
          </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>

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
Switch.displayName = 'Switch'

export { Switch }
export type { SwitchProps }
