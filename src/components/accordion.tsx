import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

import { cn } from '../lib/utils'

/**
 * Accordion derived from Figma component:
 *   - Accordion (node 6583:46084)
 *
 * Expandable sections with heading + secondary heading + content slot.
 * Bordered, with divider between items. Chevron rotates on expand.
 *
 * Figma tokens:
 *   bg: paper #fffefe
 *   border: outline-border #cccccd
 *   divider: #dcddde
 *   heading: 16px regular, text-primary
 *   secondary heading: 16px regular, text-secondary
 *   padding: 16px horizontal, 12px vertical
 */

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('size-5 transition-transform', className)}
    >
      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
    </svg>
  )
}

// ── Root ────────────────────────────────────────────────────────

const Accordion = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root ref={ref} className={cn('w-full font-sans', className)} {...props} />
))
Accordion.displayName = 'Accordion'

// ── Item ────────────────────────────────────────────────────────

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'border border-outline-border bg-background-paper',
      '[&+[data-state]]:border-t-0',
      'first:rounded-t last:rounded-b',
      className
    )}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

// ── Trigger ─────────────────────────────────────────────────────

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> {
  secondaryHeading?: React.ReactNode
}

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, secondaryHeading, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center px-4 py-3 text-base leading-[21.6px] tracking-[0.15px] transition-all',
        'disabled:text-disabled-text disabled:pointer-events-none',
        '[&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      <span className="flex-1 text-left text-text-primary">{children}</span>
      {secondaryHeading && (
        <span className="flex-1 text-left text-text-secondary">{secondaryHeading}</span>
      )}
      <ChevronDownIcon className="shrink-0 text-text-secondary" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = 'AccordionTrigger'

// ── Content ─────────────────────────────────────────────────────

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('border-t border-divider p-4', className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = 'AccordionContent'

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
export type { AccordionTriggerProps }
