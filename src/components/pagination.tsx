import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * Pagination derived from Figma component:
 *   - Pagination (node 6598:49047)
 *
 * Numbered page buttons with prev/next arrows.
 *   variant: circular | rounded (square with radius)
 *   color: primary | secondary
 *   states: enabled, hovered, selected, disabled
 *
 * Figma tokens:
 *   selected: primary/main bg, white text (or outlined variant)
 *   unselected: transparent, text-primary
 *   hover: action-hover-subtle
 *   disabled: text-disabled
 *   size: 32px buttons
 */

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  )
}

// ── Pagination Root ─────────────────────────────────────────────

interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'circular' | 'rounded'
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, children, ...props }, ref) => (
    <nav
      ref={ref}
      role="navigation"
      aria-label="Pagination"
      className={cn('inline-flex items-center gap-1 font-sans', className)}
      {...props}
    >
      {children}
    </nav>
  )
)
Pagination.displayName = 'Pagination'

// ── Page Button ─────────────────────────────────────────────────

const sizeConfig = {
  lg: 'size-10 text-base',
  md: 'size-8 text-sm',
  sm: 'size-[26px] text-[13px]',
} as const

interface PaginationItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  variant?: 'circular' | 'rounded'
  size?: 'lg' | 'md' | 'sm'
}

const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
  (
    { className, selected, variant = 'circular', size = 'md', disabled, children, ...props },
    ref
  ) => (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      aria-current={selected ? 'page' : undefined}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none',
        sizeConfig[size],
        variant === 'circular' ? 'rounded-full' : 'rounded',
        disabled
          ? 'text-disabled-text pointer-events-none'
          : selected
            ? 'bg-primary text-primary-foreground'
            : 'text-text-primary hover:bg-action-hover-subtle',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)
PaginationItem.displayName = 'PaginationItem'

// ── Prev / Next ─────────────────────────────────────────────────

const PaginationPrev = React.forwardRef<HTMLButtonElement, Omit<PaginationItemProps, 'children'>>(
  ({ className, variant = 'circular', ...props }, ref) => (
    <PaginationItem
      ref={ref}
      variant={variant}
      aria-label="Previous page"
      className={className}
      {...props}
    >
      <ChevronLeftIcon />
    </PaginationItem>
  )
)
PaginationPrev.displayName = 'PaginationPrev'

const PaginationNext = React.forwardRef<HTMLButtonElement, Omit<PaginationItemProps, 'children'>>(
  ({ className, variant = 'circular', ...props }, ref) => (
    <PaginationItem
      ref={ref}
      variant={variant}
      aria-label="Next page"
      className={className}
      {...props}
    >
      <ChevronRightIcon />
    </PaginationItem>
  )
)
PaginationNext.displayName = 'PaginationNext'

// ── Ellipsis ────────────────────────────────────────────────────

function PaginationEllipsis({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center size-8 text-sm text-text-secondary',
        className
      )}
    >
      ...
    </span>
  )
}

export { Pagination, PaginationItem, PaginationPrev, PaginationNext, PaginationEllipsis }
export type { PaginationProps, PaginationItemProps }
