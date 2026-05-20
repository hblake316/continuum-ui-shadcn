import * as React from 'react'
import { MdCheckCircle, MdError, MdInfo, MdRemoveCircle, MdWarning } from 'react-icons/md'

import { cn } from '../lib/utils'

/**
 * Inline icon + label pair used to surface a status value in a table cell
 * (or anywhere else). Tone picks the default icon and color; pass `icon` to
 * override the glyph while keeping the tone's color, or pass `className` /
 * a custom `icon` for fully bespoke styling.
 *
 * Color tokens come from the existing OpCon palette (success / warning /
 * error / info) so the indicator stays in sync with other status surfaces.
 *
 * Accessibility:
 * - When rendered icon-only (no `children` and `showIcon` is true), the
 *   wrapper is given `role="img"` so the indicator has a recognizable role;
 *   callers must supply `aria-label` for an accessible name.
 * - When passing a custom `icon`, the caller is responsible for setting
 *   `aria-hidden`, the size class (e.g. `size-4 shrink-0`), and any tone
 *   color. `iconClassName` does NOT apply when `icon` is overridden.
 */

type StatusTone = 'success' | 'warning' | 'error' | 'info' | 'neutral'

interface StatusIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone: StatusTone
  icon?: React.ReactNode
  showIcon?: boolean
  iconClassName?: string
}

const toneIcon: Record<StatusTone, React.ComponentType<{ className?: string }>> = {
  success: MdCheckCircle,
  warning: MdWarning,
  error: MdError,
  info: MdInfo,
  neutral: MdRemoveCircle,
}

const toneColor: Record<StatusTone, string> = {
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  info: 'text-info',
  neutral: 'text-text-secondary',
}

const StatusIndicator = React.forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  ({ tone, icon, showIcon = true, iconClassName, className, children, ...props }, ref) => {
    const DefaultIcon = toneIcon[tone]
    const isIconOnly = children == null && showIcon
    return (
      <span
        ref={ref}
        role={isIconOnly ? 'img' : undefined}
        className={cn('inline-flex items-center gap-1.5 align-middle', className)}
        {...props}
      >
        {showIcon &&
          (icon ?? (
            <DefaultIcon
              aria-hidden="true"
              className={cn('size-4 shrink-0', toneColor[tone], iconClassName)}
            />
          ))}
        {children != null && <span className="min-w-0 truncate">{children}</span>}
      </span>
    )
  }
)
StatusIndicator.displayName = 'StatusIndicator'

export { StatusIndicator }
export type { StatusIndicatorProps, StatusTone }
