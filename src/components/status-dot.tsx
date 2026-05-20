import * as React from 'react'

import { cn } from '../lib/utils'

type StatusDotStatus = 'online' | 'offline' | 'degraded' | 'success' | 'error' | 'warning' | 'info'

interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: StatusDotStatus
  pulse?: boolean
  size?: 'sm' | 'md'
}

const statusToClass: Record<StatusDotStatus, string> = {
  online: 'bg-success',
  success: 'bg-success',
  offline: 'bg-error',
  error: 'bg-error',
  degraded: 'bg-warning',
  warning: 'bg-warning',
  info: 'bg-info',
}

const StatusDot = React.forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ className, status, pulse = false, size = 'sm', ...props }, ref) => {
    const sizeClass = size === 'md' ? 'size-2.5' : 'size-2'
    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn(
          'inline-block shrink-0 rounded-full',
          sizeClass,
          statusToClass[status],
          pulse && 'animate-pulse',
          className
        )}
        {...props}
      />
    )
  }
)
StatusDot.displayName = 'StatusDot'

export { StatusDot }
export type { StatusDotProps, StatusDotStatus }
