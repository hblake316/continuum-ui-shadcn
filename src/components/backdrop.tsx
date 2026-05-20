import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * Backdrop derived from Figma component:
 *   - Backdrop
 *
 * Semi-transparent overlay used to provide emphasis on a particular element.
 * Figma: black at ~50% opacity, covers full viewport.
 */

interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
}

const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  ({ className, open, children, ...props }, ref) => {
    if (!open) return null

    return (
      <div
        ref={ref}
        className={cn('fixed inset-0 z-50 flex items-center justify-center bg-black/50', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Backdrop.displayName = 'Backdrop'

export { Backdrop }
export type { BackdropProps }
