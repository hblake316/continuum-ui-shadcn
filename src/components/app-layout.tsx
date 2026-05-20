import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * AppLayout derived from Figma layout template:
 *   - "Basic Layouts" page (node 18179:11170)
 *
 * Application shell composing sidebar + header + body.
 *
 * Figma dimensions (1920×1080 reference):
 *   Sidebar:  220px wide, full height, 12px top margin
 *   Header:   fills remaining width, 54px tall, 12px top margin
 *   Body:     fills remaining, 12px gap below header, 16px inner padding
 *   Gap between sidebar and content: 12px
 */

// ── Root ────────────────────────────────────────────────────────

type AppLayoutProps = React.HTMLAttributes<HTMLDivElement>

const AppLayout = React.forwardRef<HTMLDivElement, AppLayoutProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex h-screen w-full overflow-hidden font-sans', className)}
      {...props}
    >
      {children}
    </div>
  )
)
AppLayout.displayName = 'AppLayout'

// ── Sidebar ─────────────────────────────────────────────────────

interface AppSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean
}

const AppSidebar = React.forwardRef<HTMLDivElement, AppSidebarProps>(
  ({ className, collapsed, children, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn(
        'shrink-0 pt-3 transition-[width] duration-200',
        collapsed ? 'w-[60px]' : 'w-[220px]',
        className
      )}
      {...props}
    >
      <div className="flex h-[calc(100%-12px)] flex-col overflow-hidden rounded border border-outline-border bg-background-paper">
        {children}
      </div>
    </aside>
  )
)
AppSidebar.displayName = 'AppSidebar'

// ── Main (header + body container) ──────────────────────────────

const AppMain = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-1 flex-col min-w-0 pl-3', className)} {...props}>
      {children}
    </div>
  )
)
AppMain.displayName = 'AppMain'

// ── Header ──────────────────────────────────────────────────────

const AppHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        'shrink-0 mt-3 h-[54px] rounded border border-outline-border bg-background-paper',
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
)
AppHeader.displayName = 'AppHeader'

// ── Body ────────────────────────────────────────────────────────

const AppBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <main
      ref={ref}
      className={cn(
        'flex-1 mt-3 overflow-y-auto rounded border border-outline-border bg-background-paper p-4',
        className
      )}
      {...props}
    >
      {children}
    </main>
  )
)
AppBody.displayName = 'AppBody'

export { AppLayout, AppSidebar, AppMain, AppHeader, AppBody }
export type { AppLayoutProps, AppSidebarProps }
