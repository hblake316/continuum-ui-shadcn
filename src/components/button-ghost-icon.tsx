import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { MdRefresh } from 'react-icons/md'

import { cn } from '../lib/utils'

/**
 * Ghost icon-only button derived from Figma components:
 *   - button/ghost-icon
 *
 * color: primary (blue) | secondary (gray)
 * size:  lg (38px) | md (32px) | sm (26px) | xs (16px)
 *
 * Recommended icon sizes: lg → 30px · md → 20px · sm → 18px · xs → 14px
 * Note: md icon is 20px, smaller than ButtonDefaultIcon (24px) and ButtonOutlineIcon (24px).
 * Icon vector inset (Figma): 12.5% top/bottom, 20.83% left/right inside the icon frame.
 *
 * Key differences from other icon button variants:
 *   - No border on any state (pure ghost)
 *   - Transparent background when enabled and disabled
 *   - Hover/focus show a light tint only (no border, no ring)
 */
const buttonGhostIconVariants = cva(
  'inline-flex items-center justify-center rounded font-sans transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:text-disabled-text',
  {
    variants: {
      color: {
        primary: [
          'text-primary',
          'hover:bg-primary-hover-subtle',
          'focus-visible:bg-primary-focus',
        ].join(' '),
        secondary: [
          'text-action',
          'hover:bg-action-hover-subtle',
          'focus-visible:bg-action-focus',
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

interface ButtonGhostIconProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonGhostIconVariants> {
  /**
   * Renders as the child element (e.g. a Link) instead of a `<button>`.
   * When true, `loading`, `disabled`, and `type` are ignored —
   * the caller is responsible for all rendering of the child.
   */
  asChild?: boolean
  loading?: boolean
}

const ButtonGhostIcon = React.forwardRef<HTMLButtonElement, ButtonGhostIconProps>(
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
          className={cn(buttonGhostIconVariants({ color, size, className }))}
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
        className={cn(buttonGhostIconVariants({ color, size, className }))}
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
ButtonGhostIcon.displayName = 'ButtonGhostIcon'

export { ButtonGhostIcon, buttonGhostIconVariants }
export type { ButtonGhostIconProps }
