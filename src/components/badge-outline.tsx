import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { MdCancel } from 'react-icons/md'

import { cn } from '../lib/utils'

/**
 * Badge Outline derived from Figma component.
 *
 * color:  primary | secondary | accent | success | warning | invalid | info
 * size:   large (34px) | default (28px) | small (18px)
 *
 * Always has a 1px solid border in the semantic color. Background is paper
 * (#fffefe) at rest, with light semantic tints on hover/focus. Text matches
 * the border/semantic color. Small size is fully pill-shaped (100px radius).
 */

const badgeOutlineVariants = cva(
  'inline-flex items-center justify-center font-sans whitespace-nowrap transition-colors border bg-background-paper',
  {
    variants: {
      color: {
        primary: [
          'border-primary text-primary',
          'hover:bg-primary-hover-subtle',
          'focus-within:bg-primary-focus',
        ].join(' '),
        secondary: [
          'border-outline-border text-text-primary',
          'hover:bg-action-hover-subtle',
          'focus-within:bg-action-focus',
        ].join(' '),
        accent: [
          'border-secondary text-secondary',
          'hover:bg-secondary-hover-subtle',
          'focus-within:bg-secondary-focus',
        ].join(' '),
        success: [
          'border-success text-success',
          'hover:bg-success-hover-subtle',
          'focus-within:bg-success-focus',
        ].join(' '),
        warning: [
          'border-warning text-warning',
          'hover:bg-warning-hover-subtle',
          'focus-within:bg-warning-focus',
        ].join(' '),
        invalid: [
          'border-error text-error',
          'hover:bg-error-hover-subtle',
          'focus-within:bg-error-focus',
        ].join(' '),
        info: [
          'border-info text-info',
          'hover:bg-info-hover-subtle',
          'focus-within:bg-info-focus',
        ].join(' '),
      },
      size: {
        large: 'h-[34px] rounded-[13px] text-lg-1x-body-default-reg400',
        default: 'h-7 rounded-xl text-med-body-small-reg400',
        // Small is fully pill-shaped per spec
        small: 'h-[18px] rounded-[100px] text-sm-description-med500',
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
  small: { px: 'px-1', gap: 'gap-1', iconSize: 'size-3.5' },
} as const

interface BadgeOutlineProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof badgeOutlineVariants> {
  /** Icon prepended before the label — sized automatically to match the badge size. */
  leftIcon?: React.ReactNode
  /** Renders a delete (×) button and calls this handler when clicked.
   * Do not combine with `role="button"` on the badge — use `ToggleBadge` for that. */
  onDelete?: () => void
  /** Accessible label for the delete button. Defaults to "Remove". */
  onDeleteAriaLabel?: string
  disabled?: boolean
}

const BadgeOutline = React.forwardRef<HTMLSpanElement, BadgeOutlineProps>(
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
          badgeOutlineVariants({ color, size }),
          disabled &&
            'border-outline-border text-disabled-text pointer-events-none hover:bg-background-paper focus-within:bg-background-paper',
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
BadgeOutline.displayName = 'BadgeOutline'

export { BadgeOutline, badgeOutlineVariants }
export type { BadgeOutlineProps }
