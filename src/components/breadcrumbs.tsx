import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * Breadcrumbs derived from Figma component:
 *   - breadcrumbs (node 17596:23154)
 *
 * Trail of text links separated by chevron icons.
 * Last item is displayed as a Chip (current page).
 *
 * Figma tokens:
 *   text: 13px medium, primary/main #0f4bbd (links)
 *   separator: chevron-right icon, text-secondary
 *   current: Chip/Filled (default color)
 */

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('size-5 text-text-secondary shrink-0', className)}
    >
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  )
}

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  separator?: React.ReactNode
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, separator, children, ...props }, ref) => {
    const items = React.Children.toArray(children)

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('inline-flex items-center font-sans', className)}
        {...props}
      >
        {items.map((child, i) => (
          <React.Fragment key={i}>
            {i > 0 && (separator ?? <ChevronRightIcon />)}
            {child}
          </React.Fragment>
        ))}
      </nav>
    )
  }
)
Breadcrumbs.displayName = 'Breadcrumbs'

// ── Breadcrumb Link ─────────────────────────────────────────────

const BreadcrumbLink = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      'inline-flex items-center px-2.5 py-1 rounded text-[13px] font-medium leading-[16.9px] text-primary hover:bg-primary-hover-subtle transition-colors',
      className
    )}
    {...props}
  >
    {children}
  </button>
))
BreadcrumbLink.displayName = 'BreadcrumbLink'

// ── Breadcrumb Current ──────────────────────────────────────────

const BreadcrumbCurrent = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      aria-current="page"
      className={cn(
        'inline-flex items-center rounded-full bg-action-disabled-bg px-2 py-0.5 text-[13px] font-medium leading-[17.92px] tracking-[0.15px] text-text-primary',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
)
BreadcrumbCurrent.displayName = 'BreadcrumbCurrent'

export { Breadcrumbs, BreadcrumbLink, BreadcrumbCurrent }
export type { BreadcrumbsProps }
