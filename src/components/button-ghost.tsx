import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { MdRefresh } from 'react-icons/md'

import { cn } from '../lib/utils'

const buttonGhostVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 shrink-0 rounded',
    'font-sans whitespace-nowrap transition-colors',
    'cursor-pointer select-none bg-transparent',
    'focus-visible:outline-none disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: [
          'text-primary',
          'hover:text-primary-dark hover:bg-primary-hover-subtle',
          'focus-visible:text-primary focus-visible:bg-primary-focus',
          'disabled:text-disabled-text disabled:bg-transparent',
        ],
        secondary: [
          'text-action',
          'hover:text-action-dark hover:bg-action-hover-subtle',
          'focus-visible:text-action focus-visible:bg-action-focus',
          'disabled:text-disabled-text disabled:bg-transparent',
        ],
      },
      size: {
        lg: 'h-[38px] px-4 py-2 text-lg-component-med500',
        md: 'h-8 px-3 py-1.5 text-med-1x-component-med500',
        sm: 'h-[26px] px-2 py-1 text-sm-1x-label-med500',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonGhostProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonGhostVariants> {
  /**
   * Renders as the child element (e.g. a Link) instead of a `<button>`.
   * When true, `loading`, `disabled`, `leftIcon`, and `rightIcon` are ignored —
   * the caller is responsible for all rendering of the child.
   */
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
}

const ButtonGhost = React.forwardRef<HTMLButtonElement, ButtonGhostProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled = false,
      type = 'button',
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(buttonGhostVariants({ variant, size }), className)}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(buttonGhostVariants({ variant, size }), className)}
        {...props}
      >
        {loading ? (
          <MdRefresh size={16} className="shrink-0 animate-spin" aria-hidden />
        ) : (
          leftIcon && (
            <span className="shrink-0 inline-flex items-center" aria-hidden>
              {leftIcon}
            </span>
          )
        )}
        {children}
        {!loading && rightIcon && (
          <span className="shrink-0 inline-flex items-center" aria-hidden>
            {rightIcon}
          </span>
        )}
      </button>
    )
  }
)
ButtonGhost.displayName = 'ButtonGhost'

export { ButtonGhost, buttonGhostVariants }
export type { ButtonGhostProps }
