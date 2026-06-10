import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '../lib/utils'

/**
 * Tooltip derived from Figma component:
 *   - Tooltip (node 6590:48770)
 *
 * direction: up | down | left | right | none (no arrow)
 *   up    → tooltip above trigger  (Radix side="top")
 *   down  → tooltip below trigger  (Radix side="bottom")
 *   left  → tooltip left of trigger  (Radix side="left")
 *   right → tooltip right of trigger (Radix side="right")
 *
 * Figma tokens:
 *   bg: --default/dark #24282d
 *   text: white, 10px/14px medium, 0px tracking, nowrap
 *   padding: 8px H / 4px V
 *   border-radius: 4px
 *   arrow: 12×6 SVG triangle
 */

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

type Direction = 'none' | 'up' | 'down' | 'left' | 'right'

const directionToSide: Record<
  Exclude<Direction, 'none'>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>['side']
> = {
  up: 'top',
  down: 'bottom',
  left: 'left',
  right: 'right',
}

interface TooltipContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
  'side'
> {
  direction?: Direction
  side?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>['side']
}

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, direction = 'up', side: sideProp, children, ...props }, ref) => {
  // Destructure side from props so the spread below cannot override our computed value.
  const side = direction !== 'none' ? directionToSide[direction] : sideProp

  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      side={side}
      className={cn(
        'z-50 rounded bg-action-dark px-2 py-1 font-sans text-sm-description-med500 whitespace-nowrap tracking-normal text-white',
        'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    >
      {children}
      {direction !== 'none' && (
        <TooltipPrimitive.Arrow className="fill-action-dark" width={12} height={6} />
      )}
    </TooltipPrimitive.Content>
  )
})
TooltipContent.displayName = 'TooltipContent'

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent }
export type { TooltipContentProps }
