import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { MdRefresh } from 'react-icons/md'

import { cn } from '../lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 shrink-0 rounded',
    'font-sans whitespace-nowrap transition-colors',
    'cursor-pointer select-none border-2 border-transparent',
    'focus-visible:outline-none disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary text-primary-foreground',
          'hover:bg-primary-dark',
          'focus-visible:bg-primary-focus focus-visible:border-primary focus-visible:text-primary',
          'disabled:bg-action-disabled-bg disabled:text-disabled-text',
        ],
        secondary: [
          'bg-action text-action-foreground',
          'hover:bg-action-dark',
          'focus-visible:bg-action focus-visible:border-action-disabled-bg',
          'disabled:bg-action-disabled-bg disabled:text-disabled-text',
        ],
      },
      size: {
        lg: 'h-[38px] px-4 py-2 text-lg-component-med500',
        md: 'h-8 px-3 py-1.5 text-med-1x-component-med500',
        sm: 'h-[26px] px-2 py-1 text-sm-1x-label-med500',
        xs: 'h-4 px-1 py-1 gap-0.5 text-sm-description-med500',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    if (asChild) {
      return (
        <Slot ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props}>
          {children}
        </Slot>
      )
    }

    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(buttonVariants({ variant, size }), className)}
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
Button.displayName = 'Button'

export { Button, buttonVariants }
export type { ButtonProps }
