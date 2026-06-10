import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { MdCancel } from 'react-icons/md'

import { cn } from '../lib/utils'

/**
 * Badge Default derived from Figma component.
 *
 * color:  primary | secondary | accent | success | warning | invalid | info
 * size:   large (34px) | default (28px) | small (18px)
 *
 * Secondary is the only light-background color — all others use colored fills
 * with white text. Use leftIcon to prepend an icon; use onDelete to show a
 * delete (×) button.
 */

const badgeDefaultVariants = cva(
  'inline-flex items-center justify-center font-sans whitespace-nowrap transition-colors focus-within:bg-action-focus',
  {
    variants: {
      color: {
        primary: 'bg-primary text-white hover:bg-primary-dark',
        secondary: 'bg-action-selected text-text-primary hover:bg-action-hover-subtle',
        accent: 'bg-secondary text-white hover:bg-secondary-dark',
        success: 'bg-success text-white hover:bg-success-dark',
        warning: 'bg-warning text-white hover:bg-warning-dark',
        invalid: 'bg-error text-white hover:bg-error-dark',
        info: 'bg-info text-white hover:bg-info-dark',
      },
      size: {
        large: 'h-[34px] rounded-[13px] text-lg-1x-body-default-reg400',
        default: 'h-7 rounded-xl text-med-body-small-reg400',
        small: 'h-[18px] rounded-lg text-sm-description-med500',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'default',
    },
  }
)

// Inner content config per size: horizontal padding, gap, icon size
const sizeInnerConfig = {
  large: { px: 'px-[6px]', gap: 'gap-1', iconSize: 'size-6' },
  default: { px: 'px-1', gap: 'gap-1', iconSize: 'size-[18px]' },
  small: { px: 'px-0.5', gap: 'gap-1', iconSize: 'size-3.5' },
} as const

interface BadgeDefaultProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof badgeDefaultVariants> {
  /** Icon prepended before the label — sized automatically to match the badge size. */
  leftIcon?: React.ReactNode
  /** Renders a delete (×) button and calls this handler when clicked.
   * Do not combine with `role="button"` on the badge — use `ToggleBadge` for that. */
  onDelete?: () => void
  /** Accessible label for the delete button. Defaults to "Remove". */
  onDeleteAriaLabel?: string
  disabled?: boolean
}

const BadgeDefault = React.forwardRef<HTMLSpanElement, BadgeDefaultProps>(
  (
    {
      className,
      color = 'primary',
      size = 'default',
      leftIcon,
      onDelete,
      onDeleteAriaLabel,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedSize = (size ?? 'default') as 'large' | 'default' | 'small'
    const inner = sizeInnerConfig[resolvedSize]

    return (
      <span
        ref={ref}
        aria-disabled={disabled || undefined}
        className={cn(
          badgeDefaultVariants({ color, size }),
          disabled && 'bg-action-disabled-bg text-disabled-text pointer-events-none',
          className
        )}
        {...props}
      >
        <span className={cn('flex items-center', inner.px, inner.gap)}>
          {leftIcon && (
            <span
              aria-hidden
              className={cn('flex shrink-0 items-center justify-center', inner.iconSize)}
            >
              {leftIcon}
            </span>
          )}
          {children && <span>{children}</span>}
          {onDelete && (
            <button
              type="button"
              aria-label={onDeleteAriaLabel || 'Remove'}
              disabled={disabled}
              onClick={onDelete}
              className={cn(
                'inline-flex shrink-0 items-center justify-center rounded-full',
                'transition-colors hover:bg-black/10 focus-visible:outline-none',
                inner.iconSize
              )}
            >
              <MdCancel className="size-full" />
            </button>
          )}
        </span>
      </span>
    )
  }
)
BadgeDefault.displayName = 'BadgeDefault'

export { BadgeDefault, badgeDefaultVariants }
export type { BadgeDefaultProps }
