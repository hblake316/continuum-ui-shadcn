import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { MdRefresh } from 'react-icons/md'

import { cn } from '../lib/utils'

/**
 * Icon-only button derived from Figma components:
 *   - button/contained-icon (node 17567:4171)
 *
 * color: primary (blue) | secondary (gray)
 * size:  lg (38px) | md (32px) | sm (26px) | xs (16px)
 *
 * Recommended icon sizes: lg → 30px · md → 24px · sm → 20px · xs → 14px
 * Icon vector inset (Figma): 12.5% top/bottom, 20.83% left/right inside the icon frame.
 */
const buttonDefaultIconVariants = cva(
  'inline-flex items-center justify-center rounded font-sans transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:bg-action-disabled-bg disabled:text-disabled-text',
  {
    variants: {
      color: {
        primary: [
          'bg-primary text-primary-foreground',
          'hover:bg-primary-dark',
          'focus-visible:bg-primary-focus focus-visible:text-primary focus-visible:ring-primary-focus-ring',
        ].join(' '),
        secondary: [
          'bg-action text-action-foreground',
          'hover:bg-action-dark',
          'focus-visible:ring-action-focus',
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
    defaultVariants: {
      color: 'primary',
      size: 'md',
    },
  }
)

interface ButtonDefaultIconProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonDefaultIconVariants> {
  /**
   * Renders as the child element (e.g. a Link) instead of a `<button>`.
   * When true, `loading`, `disabled`, and `type` are ignored —
   * the caller is responsible for all rendering of the child.
   */
  asChild?: boolean
  loading?: boolean
}

const ButtonDefaultIcon = React.forwardRef<HTMLButtonElement, ButtonDefaultIconProps>(
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
          className={cn(buttonDefaultIconVariants({ color, size, className }))}
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
        className={cn(buttonDefaultIconVariants({ color, size, className }))}
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
ButtonDefaultIcon.displayName = 'ButtonDefaultIcon'

export { ButtonDefaultIcon, buttonDefaultIconVariants }
export type { ButtonDefaultIconProps }
