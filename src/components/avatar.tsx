import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * Avatar derived from Figma component:
 *   - Avatar (node 6587:47403)
 *
 * Displays user initials, an icon, or an image.
 *   variant: circular | square | rounded
 *   size:    lg (40px) | md (32px) | sm (24px)
 *   badge:   optional status indicator dot (bottom-right)
 *
 * Figma tokens:
 *   bg: action/main #66686b
 *   text: paper #fffefe
 *   badge: success/main #007d41 with paper border
 */

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  )
}

const sizeConfig = {
  lg: {
    container: 'size-10',
    text: 'text-[20px] leading-[27px]',
    icon: 'size-6',
    badge: 'size-3 -bottom-0.5 -right-0.5',
    badgeInner: 'inset-[2px]',
  },
  md: {
    container: 'size-8',
    text: 'text-base leading-[22px]',
    icon: 'size-5',
    badge: 'size-2.5 -bottom-0.5 -right-0.5',
    badgeInner: 'inset-[2px]',
  },
  sm: {
    container: 'size-6',
    text: 'text-xs leading-4',
    icon: 'size-4',
    badge: 'size-2 -bottom-px -right-px',
    badgeInner: 'inset-px',
  },
} as const

const variantConfig = {
  circular: 'rounded-full',
  square: 'rounded-none',
  rounded: 'rounded-md',
} as const

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'circular' | 'square' | 'rounded'
  size?: 'lg' | 'md' | 'sm'
  initials?: string
  badge?: boolean
  src?: string
  alt?: string
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    { className, variant = 'circular', size = 'md', initials, badge, src, alt, children, ...props },
    ref
  ) => {
    const sizes = sizeConfig[size]

    return (
      <div ref={ref} className={cn('relative inline-flex', className)} {...props}>
        <div
          className={cn(
            'inline-flex items-center justify-center overflow-hidden bg-action text-background-paper font-sans',
            variantConfig[variant],
            sizes.container
          )}
        >
          {src ? (
            <img src={src} alt={alt || ''} className="size-full object-cover" />
          ) : initials ? (
            <span className={cn('font-normal tracking-[0px] text-center', sizes.text)}>
              {initials}
            </span>
          ) : children ? (
            children
          ) : (
            <PersonIcon className={sizes.icon} />
          )}
        </div>

        {badge && (
          <span className={cn('absolute rounded-full bg-background-paper', sizes.badge)}>
            <span className={cn('absolute rounded-full bg-success', sizes.badgeInner)} />
          </span>
        )}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'

export { Avatar }
export type { AvatarProps }
