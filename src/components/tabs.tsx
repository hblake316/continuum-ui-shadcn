import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * Tabs derived from Figma component:
 *   - Tabs (node 6579:45052)
 *
 * Horizontal tab navigation for switching content panels.
 * States: enabled, hovered, selected, disabled.
 * Variants: text-only, icon+text.
 *
 * Figma tokens:
 *   selected: primary/main border-bottom, primary text
 *   unselected: text-secondary, no border
 *   hover: action-hover-subtle bg
 *   disabled: text-disabled
 *   indicator: 2px bottom border, primary/main
 */

// ── Tab List ────────────────────────────────────────────────────

const TabList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="tablist"
      className={cn('inline-flex items-end border-b border-divider font-sans', className)}
      {...props}
    >
      {children}
    </div>
  )
)
TabList.displayName = 'TabList'

// ── Tab ─────────────────────────────────────────────────────────

interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  icon?: React.ReactNode
}

const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ className, selected, icon, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={selected}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium leading-[17.92px] tracking-[0.15px] transition-colors whitespace-nowrap',
        'border-b-2 -mb-px',
        'focus-visible:outline-none',
        disabled
          ? 'border-transparent text-disabled-text pointer-events-none'
          : selected
            ? 'border-primary text-primary'
            : 'border-transparent text-text-secondary hover:bg-action-hover-subtle hover:text-text-primary',
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  )
)
Tab.displayName = 'Tab'

// ── Tab Panel ───────────────────────────────────────────────────

interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean
}

const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, selected = true, children, ...props }, ref) => {
    if (!selected) return null
    return (
      <div ref={ref} role="tabpanel" className={cn('pt-4', className)} {...props}>
        {children}
      </div>
    )
  }
)
TabPanel.displayName = 'TabPanel'

export { TabList, Tab, TabPanel }
export type { TabProps, TabPanelProps }
