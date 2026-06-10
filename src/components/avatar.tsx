import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { MdPerson } from 'react-icons/md'

import { cn } from '../lib/utils'

const sizeClasses: Record<string, string> = {
  lg: 'size-10',
  md: 'size-8',
  sm: 'size-6',
  xs: 'size-3.5',
}

const typographyClasses: Record<string, string> = {
  lg: 'text-lg-2x-initials-reg400',
  md: 'text-lg-1x-body-default-reg400',
  sm: 'text-med-body-small-reg400 tracking-[0.15px]',
  xs: 'text-[8px] font-medium leading-[14px] tracking-[0.15px]',
}

const radiusClasses: Record<string, string> = {
  circular: 'rounded-full',
  rounded: 'rounded',
  square: 'rounded-none',
}

const badgeSizeClasses: Record<string, string | null> = {
  lg: 'size-3',
  md: 'size-3',
  sm: 'size-2',
  xs: null,
}

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'lg' | 'md' | 'sm' | 'xs'
  variant?: 'circular' | 'rounded' | 'square'
  content?: 'text' | 'icon'
  badge?: boolean
  initials?: string
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      size = 'lg',
      variant = 'circular',
      content = 'text',
      badge = false,
      initials,
      className,
      ...props
    },
    ref
  ) => {
    const radiusClass = radiusClasses[variant]
    const badgeSize = badgeSizeClasses[size]

    return (
      <div
        ref={ref}
        data-slot="avatar"
        className={cn('relative inline-flex shrink-0 select-none', sizeClasses[size], className)}
        {...props}
      >
        <AvatarPrimitive.Root className={cn('size-full overflow-hidden', radiusClass)}>
          <AvatarPrimitive.Fallback
            className={cn(
              'flex size-full items-center justify-center bg-action text-background-paper',
              typographyClasses[size],
              radiusClass
            )}
          >
            {content === 'icon' || !initials ? (
              <MdPerson className="size-[60%]" aria-label="User avatar" />
            ) : (
              initials
            )}
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>

        {badge && badgeSize && (
          <span
            aria-hidden="true"
            className={cn(
              'absolute bottom-0 right-0 z-10 rounded-full bg-success ring-2 ring-background-paper',
              badgeSize
            )}
          />
        )}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'

export { Avatar }
