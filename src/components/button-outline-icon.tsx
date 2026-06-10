import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { MdRefresh } from 'react-icons/md'

import { cn } from '../lib/utils'

/**
 * Outlined icon-only button derived from Figma components:
 *   - button/outlined-icon (node 17583:1259)
 *
 * color: primary (blue) | secondary (gray)
 * size:  lg (38px) | md (32px) | sm (26px) | xs (16px)
 *
 * Recommended icon sizes: lg → 30px · md → 24px · sm → 18px · xs → 14px
 * Icon vector inset (Figma): 12.5% top/bottom, 20.83% left/right inside the icon frame.
 *
 * Key differences from ButtonDefaultIcon:
 *   - Always has a visible border (1px enabled/hover, 2px focus, 0.5px disabled)
 *   - Background is paper (#fffefe) not a solid fill
 *   - Hover shows a light tint instead of a dark fill
 */
const buttonOutlineIconVariants = cva(
  'inline-flex items-center justify-center rounded border font-sans transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:bg-action-disabled-bg disabled:border-[0.5px] disabled:border-outline-border disabled:text-disabled-text',
  {
    variants: {
      color: {
        primary: [
          'bg-background-paper text-primary border-primary-focus-ring',
          'hover:bg-primary-hover-subtle',
          'focus-visible:border-2 focus-visible:border-primary',
        ].join(' '),
        secondary: [
          'bg-background-paper text-action border-action',
          'hover:bg-action-hover-subtle',
          'focus-visible:border-2 focus-visible:border-action',
        ].join(' '),
      },
      size: {
        // Large: focused state uses 6px border-radius per spec
        lg: 'size-[38px] focus-visible:rounded-[6px]',
        md: 'size-8',
        sm: 'size-[26px]',
        xs: 'size-4',
      },
    },
    compoundVariants: [
      // x-small focused: 1.5px border (narrower than the standard 2px per spec)
      { size: 'xs', className: 'focus-visible:border-[1.5px]' },
    ],
    defaultVariants: {
      color: 'primary',
      size: 'md',
    },
  }
)

interface ButtonOutlineIconProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonOutlineIconVariants> {
  /**
   * Renders as the child element (e.g. a Link) instead of a `<button>`.
   * When true, `loading`, `disabled`, and `type` are ignored —
   * the caller is responsible for all rendering of the child.
   */
  asChild?: boolean
  loading?: boolean
}

const ButtonOutlineIcon = React.forwardRef<HTMLButtonElement, ButtonOutlineIconProps>(
  (
    {
      className,
      color,
      size,
      asChild = false,
      loading = false,
      disabled = false,
      type = 'button',
      children,
      ...props
    },
    ref
  ) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonOutlineIconVariants({ color, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    const isDisabled = disabled || loading

    return (
      <button
        className={cn(buttonOutlineIconVariants({ color, size, className }))}
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? <MdRefresh size={16} className="shrink-0 animate-spin" aria-hidden /> : children}
      </button>
    )
  }
)
ButtonOutlineIcon.displayName = 'ButtonOutlineIcon'

export { ButtonOutlineIcon, buttonOutlineIconVariants }
export type { ButtonOutlineIconProps }
