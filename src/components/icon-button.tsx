import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

/**
 * Icon button variants derived from Figma components:
 *   - button/contained-icon  (node 17567:4171)
 *   - button/outlined-icon   (node 17583:1259)
 *   - button/text-icon       (node 17583:4474)
 *
 * Square buttons with icon content only.
 * Same color system as Button, different sizing (square).
 */
const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded font-sans transition-colors focus-visible:outline-none disabled:pointer-events-none',
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
        lg: 'size-[38px]',
        md: 'size-8',
        sm: 'size-[26px]',
        xs: 'size-4',
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
          'bg-background-paper border-primary text-primary hover:bg-primary-hover-subtle hover:border-primary-focus-ring focus-visible:border-2 focus-visible:border-primary disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
      },
      {
        variant: 'outlined',
        color: 'error',
        className:
          'bg-background-paper border-error-focus-ring text-error hover:bg-error-hover-subtle focus-visible:border-2 focus-visible:border-error disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
      },
      {
        variant: 'outlined',
        color: 'warning',
        className:
          'bg-background-paper border-warning-focus-ring text-warning hover:bg-warning-hover-subtle focus-visible:border-2 focus-visible:border-warning disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
      },
      {
        variant: 'outlined',
        color: 'info',
        className:
          'bg-background-paper border-info-focus-ring text-info hover:bg-info-hover-subtle focus-visible:border-2 focus-visible:border-info disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
      },
      {
        variant: 'outlined',
        color: 'success',
        className:
          'bg-background-paper border-success-focus-ring text-success hover:bg-success-hover-subtle focus-visible:border-2 focus-visible:border-success disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
      },
      {
        variant: 'outlined',
        color: 'action',
        className:
          'bg-background-paper border-action text-action hover:bg-action-hover-subtle hover:border-outline-border focus-visible:border-2 focus-visible:border-action disabled:bg-action-disabled-bg disabled:border-action-disabled-bg disabled:text-disabled-text',
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

interface IconButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, color, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(iconButtonVariants({ variant, color, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
IconButton.displayName = 'IconButton'

export { IconButton, iconButtonVariants }
export type { IconButtonProps }
