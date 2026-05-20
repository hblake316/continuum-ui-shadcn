import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '../lib/utils'

/**
 * Slider derived from Figma component:
 *   - Slider/Horizontal (node 6562:39045)
 *   - Slider/Vertical   (node 8528:83581)
 *
 * Continuous or discrete range input.
 *   color:  primary | secondary
 *   size:   md (20px thumb, 6px track) | sm (12px thumb, 2px track)
 *   states: enabled, hover, disabled
 *
 * Figma tokens:
 *   track (active): primary/main or accent/main
 *   rail (inactive): action/states/enabled #66686b at reduced opacity
 *   thumb: primary/main or accent/main, circular, shadow on hover
 *   disabled: text/disabled #979797
 */

const colorConfig = {
  primary: {
    track: 'bg-primary',
    thumb: 'bg-primary border-2 border-primary',
    thumbHover: 'hover:shadow-[0_0_0_8px_rgba(15,75,189,0.16)]',
  },
  secondary: {
    track: 'bg-secondary',
    thumb: 'bg-secondary border-2 border-secondary',
    thumbHover: 'hover:shadow-[0_0_0_8px_rgba(44,149,242,0.16)]',
  },
} as const

const sizeConfig = {
  md: { rail: 'h-1.5', track: 'h-1.5', thumb: 'size-5' },
  sm: { rail: 'h-0.5', track: 'h-0.5', thumb: 'size-3' },
} as const

interface SliderProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  'color'
> {
  color?: 'primary' | 'secondary'
  size?: 'md' | 'sm'
}

const Slider = React.forwardRef<React.ComponentRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, color = 'primary', size = 'md', disabled, ...props }, ref) => {
    const colors = colorConfig[color]
    const sizes = sizeConfig[size]

    return (
      <SliderPrimitive.Root
        ref={ref}
        disabled={disabled}
        className={cn(
          'relative flex w-full touch-none select-none items-center font-sans',
          disabled && 'pointer-events-none',
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track
          className={cn(
            'relative w-full grow overflow-hidden rounded-full',
            sizes.rail,
            disabled ? 'bg-disabled-text/30' : 'bg-action/30'
          )}
        >
          <SliderPrimitive.Range
            className={cn(
              'absolute h-full rounded-full',
              disabled ? 'bg-disabled-text' : colors.track
            )}
          />
        </SliderPrimitive.Track>
        {(props.value ?? props.defaultValue ?? [0]).map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className={cn(
              'block rounded-full shadow-md transition-shadow focus-visible:outline-none',
              sizes.thumb,
              disabled ? 'bg-disabled-text' : cn(colors.thumb, colors.thumbHover)
            )}
          />
        ))}
      </SliderPrimitive.Root>
    )
  }
)
Slider.displayName = 'Slider'

export { Slider }
export type { SliderProps }
