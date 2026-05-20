import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * MenuItem derived from Figma component:
 *   - MenuItem (node 6576:50735)
 *
 * Menu item for dropdown/context menus.
 *   States: enabled, hovered, selected, disabled
 *   Optional: icon (left), checkbox, right content (shortcut), divider
 *   Dense mode for compact lists.
 *
 * Figma tokens:
 *   text: 16px medium, text-primary
 *   padding: 16px horizontal, 6px vertical
 *   hover: action-hover-subtle
 *   selected: primary-focus bg
 *   disabled: text-disabled
 */

interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  rightContent?: React.ReactNode
  selected?: boolean
  dense?: boolean
  divider?: boolean
}

const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  (
    { className, icon, rightContent, selected, dense, divider, disabled, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={disabled}
        className={cn(
          'relative flex w-full items-center font-sans font-medium text-base leading-[21.6px] tracking-[0.2px] text-left whitespace-nowrap transition-colors',
          dense ? 'px-4 py-0.5' : 'px-4 py-1.5',
          disabled
            ? 'text-disabled-text pointer-events-none'
            : selected
              ? 'bg-primary-focus text-primary font-semibold'
              : 'text-primary hover:bg-action-hover-subtle',
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0 pr-4">{icon}</span>}

        <span className="flex-1 min-w-0">{children}</span>

        {rightContent && <span className="shrink-0 text-text-secondary">{rightContent}</span>}

        {divider && <span className="absolute bottom-0 left-0 right-0 border-t border-divider" />}
      </button>
    )
  }
)
MenuItem.displayName = 'MenuItem'

export { MenuItem }
export type { MenuItemProps }
