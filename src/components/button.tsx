import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

/**
 * Button variants derived from Figma button components:
 *   - button/contained  (node 6543:36744)
 *   - button/outlined   (node 7602:60727)
 *   - button/text        (node 7602:60726)
 *
 * Dimensions:
 *   variant: contained | outlined | text
 *   color:   primary | error | warning | info | success | action
 *   size:    lg (38px) | md (32px) | sm (26px)
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded font-sans font-medium whitespace-nowrap transition-colors focus-visible:outline-none disabled:pointer-events-none',
  {
    variants: {
      variant: {
        contained: '',
        outlined: 'border',
        text: '',
      },
      color: {
        primary: '',
        error: '',
        warning: '',
        info: '',
        success: '',
        action: '',
      },
      size: {
        lg: 'h-[38px] px-4 py-2 text-[15px] leading-[21px]',
        md: 'h-8 px-3 py-1.5 text-sm leading-[19px]',
        sm: 'h-[26px] px-3 py-1 text-[13px] leading-[17px]',
      },
    },
    compoundVariants: [
      // ── Contained ──────────────────────────────────────────────
      {
        variant: 'contained',
        color: 'primary',
        className:
          'bg-primary text-primary-foreground hover:bg-primary-dark focus-visible:bg-primary-focus focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-primary-focus-ring disabled:bg-action-disabled-bg disabled:text-disabled-text',
      },
      {
        variant: 'contained',
        color: 'error',
        className:
          'bg-error text-error-foreground hover:bg-error-dark focus-visible:ring-2 focus-visible:ring-error-focus-ring disabled:bg-action-disabled-bg disabled:text-disabled-text',
      },
      {
        variant: 'contained',
        color: 'warning',
        className:
          'bg-warning text-warning-foreground hover:bg-warning-dark focus-visible:ring-2 focus-visible:ring-warning-focus-ring disabled:bg-action-disabled-bg disabled:text-disabled-text',
      },
      {
        variant: 'contained',
        color: 'info',
        className:
          'bg-info text-info-foreground hover:bg-info-dark focus-visible:ring-2 focus-visible:ring-info-focus-ring disabled:bg-action-disabled-bg disabled:text-disabled-text',
      },
      {
        variant: 'contained',
        color: 'success',
        className:
          'bg-success text-success-foreground hover:bg-success-dark focus-visible:ring-2 focus-visible:ring-success-focus-ring disabled:bg-action-disabled-bg disabled:text-disabled-text',
      },
      {
        variant: 'contained',
        color: 'action',
        className:
          'bg-action text-action-foreground hover:bg-action-dark focus-visible:ring-2 focus-visible:ring-action-focus-ring disabled:bg-action-disabled-bg disabled:text-disabled-text',
      },

      // ── Outlined ───────────────────────────────────────────────
      {
        variant: 'outlined',
        color: 'primary',
        className:
          'bg-background-paper border-primary text-primary hover:bg-action-hover-subtle hover:border-primary-dark focus-visible:border-2 focus-visible:border-primary disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
      },
      {
        variant: 'outlined',
        color: 'error',
        className:
          'bg-background-paper border-error text-error hover:bg-action-hover-subtle hover:border-error-dark focus-visible:border-2 focus-visible:border-error disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
      },
      {
        variant: 'outlined',
        color: 'warning',
        className:
          'bg-background-paper border-warning text-warning hover:bg-action-hover-subtle hover:border-warning-dark focus-visible:border-2 focus-visible:border-warning disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
      },
      {
        variant: 'outlined',
        color: 'info',
        className:
          'bg-background-paper border-info text-info hover:bg-action-hover-subtle hover:border-info-dark focus-visible:border-2 focus-visible:border-info disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
      },
      {
        variant: 'outlined',
        color: 'success',
        className:
          'bg-background-paper border-success text-success hover:bg-action-hover-subtle hover:border-success-dark focus-visible:border-2 focus-visible:border-success disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
      },
      {
        variant: 'outlined',
        color: 'action',
        className:
          'bg-background-paper border-action text-action hover:bg-action-hover-subtle hover:border-action-dark focus-visible:border-2 focus-visible:border-action disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
      },

      // ── Text ───────────────────────────────────────────────────
      {
        variant: 'text',
        color: 'primary',
        className:
          'text-primary hover:bg-primary-hover-subtle focus-visible:bg-primary-focus disabled:text-disabled-text',
      },
      {
        variant: 'text',
        color: 'error',
        className:
          'text-error hover:bg-error-hover-subtle focus-visible:bg-error-focus disabled:text-disabled-text',
      },
      {
        variant: 'text',
        color: 'warning',
        className:
          'text-warning hover:bg-warning-hover-subtle focus-visible:bg-warning-focus disabled:text-disabled-text',
      },
      {
        variant: 'text',
        color: 'info',
        className:
          'text-info hover:bg-info-hover-subtle focus-visible:bg-info-focus disabled:text-disabled-text',
      },
      {
        variant: 'text',
        color: 'success',
        className:
          'text-success hover:bg-success-hover-subtle focus-visible:bg-success-focus disabled:text-disabled-text',
      },
      {
        variant: 'text',
        color: 'action',
        className:
          'text-action hover:bg-action-hover-subtle hover:text-action-dark focus-visible:bg-action-focus disabled:text-disabled-text',
      },
    ],
    defaultVariants: {
      variant: 'contained',
      color: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, color, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
export type { ButtonProps }
