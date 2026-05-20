import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '../lib/utils'

/**
 * Tooltip derived from Figma component:
 *   - Tooltip (node 6590:48770)
 *
 * Displays informative text on hover/focus.
 * Directions: up, down, left, right (mapped to Radix side).
 *
 * Figma tokens:
 *   bg: action/states/enabled #66686b
 *   text: white, 10px medium, line-height 14px
 *   padding: 8px horizontal, 4px vertical
 *   border-radius: 4px
 *   arrow: 12×6 triangle
 */

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, children, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded bg-action px-2 py-1 font-sans text-[10px] font-medium leading-[14px] tracking-[0.15px] text-background-paper',
      'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  >
    {children}
    <TooltipPrimitive.Arrow className="fill-action" width={12} height={6} />
  </TooltipPrimitive.Content>
))
TooltipContent.displayName = 'TooltipContent'

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent }
