import * as React from 'react'

import { Skeleton } from './skeleton'
import { cn } from '../lib/utils'

interface WidgetSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangle' | 'line' | 'circle'
  srLabel?: string
}

const WidgetSkeleton = React.forwardRef<HTMLDivElement, WidgetSkeletonProps>(
  ({ className, variant = 'rectangle', srLabel = 'Loading', ...props }, ref) => {
    const variantClass =
      variant === 'circle' ? 'rounded-full' : variant === 'line' ? 'h-3 rounded' : 'rounded'
    return (
      <Skeleton
        ref={ref}
        role="status"
        aria-busy="true"
        aria-label={srLabel}
        className={cn('bg-action-disabled-bg', variantClass, className)}
        {...props}
      />
    )
  }
)
WidgetSkeleton.displayName = 'WidgetSkeleton'

export { WidgetSkeleton }
export type { WidgetSkeletonProps }
