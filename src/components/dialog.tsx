import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import { cn } from '../lib/utils'

/**
 * Dialog derived from Figma components:
 *   - dialog        (node 12649:10045)
 *   - dialog/header (node 12649:9985)
 *   - _dialog/body  (node 12649:10377)
 *
 * Modal dialog with header (title + close), body slot, and footer actions.
 *   size: narrow (444px) | wide (600px) | x-wide (900px)
 *
 * Figma tokens:
 *   bg: paper #fffefe
 *   border: outline-border #cccccd
 *   shadow: 0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)
 *   border-radius: 4px
 *   header: 18px BDO Grotesk medium, divider below
 *   body padding: 24px horizontal, 14px vertical
 *   footer padding: 12px horizontal, 14px vertical
 */

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn('size-5', className)}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  )
}

const sizeMap = {
  narrow: 'max-w-[444px]',
  wide: 'max-w-[600px]',
  'x-wide': 'max-w-[900px]',
} as const

// ── Root, Trigger, Portal, Close — re-export from Radix ─────────

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogClose = DialogPrimitive.Close
const DialogPortal = DialogPrimitive.Portal

// ── Overlay (Backdrop) ──────────────────────────────────────────

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = 'DialogOverlay'

// ── Content ─────────────────────────────────────────────────────

interface DialogContentProps extends React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  size?: 'narrow' | 'wide' | 'x-wide'
}

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, size = 'narrow', children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
        'flex w-full flex-col overflow-hidden rounded bg-background-paper border border-outline-border font-sans',
        'shadow-[0px_11px_15px_-7px_rgba(0,0,0,0.2),0px_24px_38px_3px_rgba(0,0,0,0.14),0px_9px_46px_8px_rgba(0,0,0,0.12)]',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        sizeMap[size],
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = 'DialogContent'

// ── Header ──────────────────────────────────────────────────────

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  hideClose?: boolean
  closeDisabled?: boolean
}

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, hideClose, closeDisabled, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col', className)} {...props}>
      <div className="flex items-start justify-between px-3.5 h-[60px]">
        <div className="flex-1 flex items-end h-[55px] pl-0.5">
          <DialogPrimitive.Title className="flex-1 text-[18px] font-medium leading-[23.4px] tracking-[0.15px] text-text-primary">
            {children}
          </DialogPrimitive.Title>
        </div>
        {!hideClose && (
          <div className="flex items-start justify-end pt-2">
            <DialogPrimitive.Close
              aria-label="Close"
              disabled={closeDisabled}
              className="inline-flex items-center justify-center rounded size-8 text-action hover:bg-action-hover-subtle transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none"
            >
              <CloseIcon />
            </DialogPrimitive.Close>
          </div>
        )}
      </div>
    </div>
  )
)
DialogHeader.displayName = 'DialogHeader'

// ── Body ────────────────────────────────────────────────────────

const DialogBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex-1 px-6 py-3.5 text-base leading-[21.6px] tracking-[0.15px] text-text-primary',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
DialogBody.displayName = 'DialogBody'

// ── Footer ──────────────────────────────────────────────────────

const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-end gap-2 px-3 py-3.5', className)}
      {...props}
    >
      {children}
    </div>
  )
)
DialogFooter.displayName = 'DialogFooter'

// ── Description (accessibility) ─────────────────────────────────

const DialogDescription = DialogPrimitive.Description

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogOverlay,
  DialogDescription,
}
export type { DialogContentProps, DialogHeaderProps }
