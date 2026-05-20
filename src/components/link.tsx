import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * Link derived from Figma component:
 *   - Link (node 6574:50682)
 *
 * Styled anchor element.
 *   color:     primary | inherit
 *   underline: always | hover | none
 *   states:    enabled, hovered, focused
 *
 * Figma tokens:
 *   primary color: #0f4bbd
 *   inherit: currentColor
 *   font: 16px regular, line-height 21.6px, tracking 0.15px
 */

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  color?: 'primary' | 'inherit'
  underline?: 'always' | 'hover' | 'none'
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, color = 'primary', underline = 'always', children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          'font-sans text-base leading-[21.6px] tracking-[0.15px] transition-colors cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm',
          color === 'primary' ? 'text-primary' : 'text-inherit',
          underline === 'always' && 'underline',
          underline === 'hover' && 'no-underline hover:underline',
          underline === 'none' && 'no-underline',
          className
        )}
        {...props}
      >
        {children}
      </a>
    )
  }
)
Link.displayName = 'Link'

export { Link }
export type { LinkProps }
