import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

import { cn } from '../lib/utils'

/**
 * Switch toggle derived from Figma component:
 *   - Switch (node 6564:39128)
 *
 * MUI-style switch: a thin track with a circular knob that overlaps the track
 * and slides between the off/on positions.
 *   color:  primary | secondary
 *   size:   lg (58×38) | md (48×32) | sm (36×26)
 *   states: enabled, hovered, focused, disabled
 *
 * Unchecked: dim track, white thumb (with subtle ring so it's visible on
 *            white backgrounds), thumb at left.
 * Checked:   colored track at 50% opacity, solid colored thumb, thumb at right.
 */

const sizeConfig = {
  lg: {
    root: 'w-[58px] h-[38px]',
    track: 'w-[34px] h-3.5',
    thumb: 'size-5 left-2.5 group-data-[state=checked]:translate-x-[18px]',
  },
  md: {
    root: 'w-12 h-8',
    track: 'w-7 h-3',
    thumb: 'size-4 left-2 group-data-[state=checked]:translate-x-4',
  },
  sm: {
    root: 'w-9 h-[26px]',
    track: 'w-[22px] h-2.5',
    thumb: 'size-3 left-1.5 group-data-[state=checked]:translate-x-3',
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

    return (
      <label
        className={cn(
          'inline-flex items-center gap-2 font-sans',
          disabled ? 'pointer-events-none' : 'cursor-pointer'
        )}
      >
        <SwitchPrimitive.Root
          ref={ref}
          disabled={disabled}
          className={cn(
            'group relative inline-flex shrink-0 items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus-ring',
            sizes.root,
            className
          )}
          {...props}
        >
          {/* Track */}
          <span
            aria-hidden
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors',
              sizes.track,
              disabled
                ? 'bg-disabled-text opacity-50'
                : color === 'primary'
                  ? 'bg-text-primary opacity-[0.38] group-data-[state=checked]:bg-primary group-data-[state=checked]:opacity-50'
                  : 'bg-text-primary opacity-[0.38] group-data-[state=checked]:bg-secondary group-data-[state=checked]:opacity-50'
            )}
          />

          {/* Thumb — absolute so transform composes (Y stays centered, X slides) */}
          <SwitchPrimitive.Thumb
            className={cn(
              'pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full shadow-md transition-transform',
              sizes.thumb,
              disabled
                ? 'bg-disabled-text'
                : color === 'primary'
                  ? 'bg-background-paper ring-1 ring-black/10 group-data-[state=checked]:bg-primary group-data-[state=checked]:ring-0'
                  : 'bg-background-paper ring-1 ring-black/10 group-data-[state=checked]:bg-secondary group-data-[state=checked]:ring-0'
            )}
          />
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
