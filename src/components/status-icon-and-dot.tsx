import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '../lib/utils'

/**
 * Status Icon and Dot — composite component.
 *
 * A 32×32 ghost icon button inside a 38×38 relative container, with an
 * absolutely positioned badge at the top-right corner.
 *
 * variant: standard (pill with count) | dot (8×8 circle)
 * color:   default | primary | secondary | error | warning | info | success
 *
 * Default color Standard: no background, text is action (#66686b).
 * Default color Dot: no badge rendered at all.
 * Icon color: action-dark (grey) when default, primary blue otherwise.
 *
 * Always provide aria-label for accessible button labelling.
 */

type StatusIconAndDotVariant = 'standard' | 'dot'
type StatusIconAndDotColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'

interface StatusIconAndDotProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'color' | 'className' | 'aria-label'
> {
  /** Icon content — sized by the caller (spec: 20×20px). */
  children: React.ReactNode
  variant?: StatusIconAndDotVariant
  color?: StatusIconAndDotColor
  /** Badge label for standard variant (e.g. "1", "99+"). */
  count?: string | number
  /**
   * Accessible label forwarded to the inner button. Required.
   *
   * When `variant="dot"`, the dot is aria-hidden and its color is the only
   * state signal. Reflect the dot state in this label when the color carries
   * meaning (e.g. `"Mail – 3 errors"` for an error dot).
   */
  'aria-label': string
  /**
   * Renders the inner button as the child element (e.g. a Link or div).
   * Use when a non-interactive presentation is needed or when you need a
   * different interactive element (e.g. `<a>`).
   */
  asChild?: boolean
  /** Applied to the outer 38×38 container. */
  className?: string
}

const badgeConfig: Record<StatusIconAndDotColor, { bg: string; text: string }> = {
  default: { bg: '', text: 'text-action' },
  primary: { bg: 'bg-primary', text: 'text-primary-foreground' },
  secondary: { bg: 'bg-secondary', text: 'text-secondary-foreground' },
  error: { bg: 'bg-error', text: 'text-error-foreground' },
  warning: { bg: 'bg-warning', text: 'text-warning-foreground' },
  info: { bg: 'bg-info', text: 'text-info-foreground' },
  success: { bg: 'bg-success', text: 'text-success-foreground' },
}

const StatusIconAndDot = React.forwardRef<HTMLButtonElement, StatusIconAndDotProps>(
  (
    {
      children,
      variant = 'standard',
      color = 'default',
      count,
      'aria-label': ariaLabel,
      asChild = false,
      className,
      type = 'button',
      ...buttonProps
    },
    ref
  ) => {
    const { bg, text } = badgeConfig[color]
    const isDefault = color === 'default'
    const iconColor = isDefault ? 'text-action-dark' : 'text-primary'
    const hoverColor = isDefault ? 'hover:bg-action-hover-subtle' : 'hover:bg-primary-hover-subtle'
    const focusColor = isDefault
      ? 'focus-visible:bg-action-focus focus-visible:ring-2 focus-visible:ring-action-focus-ring'
      : 'focus-visible:bg-primary-focus focus-visible:ring-2 focus-visible:ring-primary-focus-ring'

    const countText = count != null ? String(count) : null
    const accessibleLabel =
      variant === 'standard' && countText != null ? `${ariaLabel} (${countText})` : ariaLabel

    const buttonClass = cn(
      'inline-flex size-8 flex-none items-center justify-center rounded font-sans',
      'transition-colors focus-visible:outline-none',
      'disabled:pointer-events-none disabled:text-disabled-text',
      iconColor,
      hoverColor,
      focusColor
    )

    const innerButton = asChild ? (
      <Slot ref={ref} aria-label={accessibleLabel} {...buttonProps} className={buttonClass}>
        {children}
      </Slot>
    ) : (
      <button
        ref={ref}
        type={type}
        aria-label={accessibleLabel}
        {...buttonProps}
        className={buttonClass}
      >
        {children}
      </button>
    )

    return (
      <div className={cn('relative flex size-[38px] items-end justify-center', className)}>
        {/* 32×32 ghost icon button — ref forwards to this element */}
        {innerButton}

        {/* Standard (pill) badge — only rendered when count is provided */}
        {variant === 'standard' && count != null && (
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute right-0 top-0 inline-flex items-center',
              'h-[14px] px-[6.5px] rounded-[64px]',
              'font-sans text-sm-1x-component-reg400 whitespace-nowrap tracking-normal',
              bg,
              text
            )}
          >
            {count}
          </span>
        )}

        {/* Dot badge — not rendered for default color */}
        {variant === 'dot' && !isDefault && (
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute right-[3px] top-[4px]',
              'size-2 rounded-full',
              bg
            )}
          />
        )}
      </div>
    )
  }
)
StatusIconAndDot.displayName = 'StatusIconAndDot'

export { StatusIconAndDot }
export type { StatusIconAndDotProps, StatusIconAndDotVariant, StatusIconAndDotColor }
