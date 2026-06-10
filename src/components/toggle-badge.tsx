import * as React from 'react'

import { cn } from '../lib/utils'
import { BadgeDefault, type BadgeDefaultProps } from './badge-default'

export interface ToggleBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  pressed: boolean
  size?: BadgeDefaultProps['size']
}

const ToggleBadge = React.forwardRef<HTMLSpanElement, ToggleBadgeProps>(
  ({ pressed, size = 'small', onClick, onKeyDown, className, children, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        e.currentTarget.click()
      }
      onKeyDown?.(e)
    }

    return (
      <BadgeDefault
        ref={ref}
        color={pressed ? 'primary' : 'secondary'}
        size={size}
        role="button"
        tabIndex={0}
        aria-pressed={pressed}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus-ring',
          className
        )}
        {...props}
      >
        {children}
      </BadgeDefault>
    )
  }
)
ToggleBadge.displayName = 'ToggleBadge'

export { ToggleBadge }
