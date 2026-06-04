import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const buttonOutlineVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 overflow-hidden rounded',
    'whitespace-nowrap',
    'border border-transparent',
    'transition-colors',
    'focus-visible:outline-none',
    'disabled:pointer-events-none disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-background-paper text-primary border-primary-focus-ring',
          'hover:bg-primary-hover-subtle hover:border-primary-focus-ring',
          'focus-visible:border-2 focus-visible:bg-background-paper focus-visible:border-primary focus-visible:text-primary',
        ],
        secondary: [
          'bg-background-paper text-action-dark border-action-main',
          'hover:bg-action-states-hover hover:border-components-outlineBorder',
          'focus-visible:bg-action-states-focus focus-visible:border-components-outlineBorder focus-visible:text-action-main',
        ],
      },
      size: {
        lg: 'h-[38px] px-4 py-2 text-lg-component-med500',
        md: 'h-[32px] px-3 py-[6px] text-med-1x-component-med500',
        sm: 'h-[26px] px-[10px] py-1 text-sm-1x-label-med500',
        xs: 'h-[16px] px-1 text-sm-description-med500',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

const iconSizeMap: Record<NonNullable<ButtonOutlineProps['size']>, string> = {
  lg: 'size-[22px]',
  md: 'size-[20px]',
  sm: 'size-[18px]',
  xs: 'size-[14px]',
}

export interface ButtonOutlineProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonOutlineVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const ButtonOutline = React.forwardRef<HTMLButtonElement, ButtonOutlineProps>(
  ({ className, variant, size, leftIcon, rightIcon, children, ...props }, ref) => {
    const iconClass = iconSizeMap[size ?? 'md']
    return (
      <button
        ref={ref}
        className={cn(buttonOutlineVariants({ variant, size }), className)}
        {...props}
      >
        {leftIcon && (
          <span className={cn('shrink-0 flex items-center justify-center', iconClass)}>
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && (
          <span className={cn('shrink-0 flex items-center justify-center', iconClass)}>
            {rightIcon}
          </span>
        )}
      </button>
    )
  }
)

ButtonOutline.displayName = 'ButtonOutline'
