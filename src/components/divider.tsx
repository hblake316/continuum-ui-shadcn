import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * Divider derived from Figma components:
 *   - Divider/Horizontal (node 7622:76130)
 *   - Divider/Vertical   (node 7622:76136)
 *
 * A thin line that groups content in lists and layouts.
 * Figma token: Components/divider #dcddde
 * Rendered as a 1px border element (matches Figma implementation).
 */

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical'
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn(
          'shrink-0 border-divider',
          orientation === 'horizontal'
            ? 'w-full border-t border-b-0 border-x-0'
            : 'self-stretch border-l border-r-0 border-y-0',
          className
        )}
        {...props}
      />
    )
  }
)
Divider.displayName = 'Divider'

export { Divider }
export type { DividerProps }
