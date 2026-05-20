import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * Card derived from Figma component:
 *   - Card (node 7726:78867)
 *   - Card/Elements/CardHeader (node 6583:46537)
 *   - _Card/Elements/CardContent (node 7611:60498)
 *
 * Composable card with optional border stroke.
 *   Variants: with/without title, with/without footer, with/without stroke
 *
 * Figma tokens:
 *   bg: paper #fffefe
 *   border: outline-border #cccccd (1px, optional)
 *   border-radius: 4px
 *   header padding: 16px
 *   content padding: 16px
 *   footer padding: 12px horizontal, 14px vertical
 *   title: 20px BDO Grotesk medium, text-primary
 *   subtitle: 13px regular, text-secondary
 */

// ── Card Root ───────────────────────────────────────────────────

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  stroke?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, stroke = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col rounded bg-background-paper overflow-hidden font-sans',
          stroke && 'border border-outline-border',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'

// ── Card Header ─────────────────────────────────────────────────

interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  avatar?: React.ReactNode
  action?: React.ReactNode
  dense?: boolean
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, avatar, action, dense = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center p-4', !dense && 'py-5', className)}
        {...props}
      >
        {avatar && <div className="mr-3 shrink-0">{avatar}</div>}

        <div className="flex-1 min-w-0 tracking-[0.15px]">
          {title && (
            <p className="text-[20px] font-medium leading-[26.68px] text-text-primary truncate">
              {title}
            </p>
          )}
          {subtitle && (
            <p className="text-[13px] leading-[17.55px] text-text-secondary truncate">{subtitle}</p>
          )}
          {children}
        </div>

        {action && <div className="ml-3 shrink-0">{action}</div>}
      </div>
    )
  }
)
CardHeader.displayName = 'CardHeader'

// ── Card Content ────────────────────────────────────────────────

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex-1 p-4', className)} {...props}>
        {children}
      </div>
    )
  }
)
CardContent.displayName = 'CardContent'

// ── Card Footer ─────────────────────────────────────────────────

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-end gap-2 px-3 py-3.5', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardContent, CardFooter }
export type { CardProps, CardHeaderProps }
