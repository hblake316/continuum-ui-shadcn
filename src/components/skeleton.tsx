/**
 * Adapted from shadcn/ui upstream `skeleton` primitive.
 *
 * Wrapped in React.forwardRef so callers (notably WidgetSkeleton) can attach
 * refs — needed because this package is on React 18, where `ref` is not a
 * regular prop. When the workspace upgrades to React 19, drop the forwardRef
 * wrapper and re-running `shadcn add skeleton` will produce the upstream
 * idiom directly.
 */
import * as React from 'react'

import { cn } from '../lib/utils'

const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('animate-pulse rounded-md bg-primary/10', className)} {...props} />
  )
)
Skeleton.displayName = 'Skeleton'

export { Skeleton }
