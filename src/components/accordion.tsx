import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

import { cn } from '../lib/utils'

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
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'group flex border border-outline-border bg-background-paper',
      '[&+[data-state]]:border-t-0',
      'first:rounded-t last:rounded-b',
      className
    )}
    {...props}
  >
    <div className="flex-1">{children}</div>
    <div
      role="button"
      tabIndex={0}
      aria-label="Toggle"
      className="flex cursor-pointer items-center px-4"
      onClick={(e) => {
        const trigger = (e.currentTarget as HTMLElement).parentElement?.querySelector('button')
        trigger?.click()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          const trigger = (e.currentTarget as HTMLElement).parentElement?.querySelector('button')
          trigger?.click()
        }
      }}
    >
      <ChevronDownIcon className="text-text-secondary group-data-[state=open]:rotate-180 group-data-[disabled]:text-disabled-text" />
    </div>
  </AccordionPrimitive.Item>
))
AccordionItem.displayName = 'AccordionItem'

// ── Trigger ─────────────────────────────────────────────────────

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center px-4 py-3 text-lg-1x-body-default-reg400 tracking-[0.15px] transition-all',
        'disabled:text-disabled-text disabled:pointer-events-none',
        className
      )}
      {...props}
    >
      <span className="flex-1 text-left text-text-primary group-data-[disabled]:text-disabled-text">
        {children}
      </span>
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
    <div className={cn('p-4 text-med-1x-input-reg400 text-text-secondary', className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = 'AccordionContent'

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
