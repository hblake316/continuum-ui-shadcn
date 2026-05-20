import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * TransferList derived from Figma component:
 *   - Transfer List (node 6562:38660)
 *
 * Dual-list picker (shuttle). Two side-by-side lists with buttons
 * to move items between them.
 *
 * Figma tokens:
 *   list bg: default-less-saturated #f2f2f2
 *   list border: outline-border #cccccd
 *   list border-radius: 4px
 *   list item: 16px regular, text-primary, px-4 py-2
 *   gap between lists: 16px
 *   transfer buttons: 26px outlined icon buttons
 *   variant: simple (4 buttons) | enhanced (with header/checkbox)
 */

// ── Icons ───────────────────────────────────────────────────────

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn('size-4', className)}>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  )
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn('size-4', className)}>
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  )
}

function DoubleChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn('size-4', className)}>
      <path
        d="M6 6l6 6-6 6M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DoubleChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn('size-4', className)}>
      <path
        d="M18 6l-6 6 6 6M11 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ── Transfer List Panel ─────────────────────────────────────────

interface TransferListPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode
}

const TransferListPanel = React.forwardRef<HTMLDivElement, TransferListPanelProps>(
  ({ className, header, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col overflow-hidden rounded border border-outline-border bg-input w-[216px]',
        className
      )}
      {...props}
    >
      {header && (
        <div className="border-b border-divider px-4 py-2 text-base font-medium text-text-primary">
          {header}
        </div>
      )}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  )
)
TransferListPanel.displayName = 'TransferListPanel'

// ── Transfer List Item ──────────────────────────────────────────

interface TransferListItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
}

const TransferListItem = React.forwardRef<HTMLButtonElement, TransferListItemProps>(
  ({ className, selected, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        'flex w-full items-center px-4 py-2 text-base leading-[21.6px] tracking-[0.15px] text-text-primary font-sans transition-colors text-left',
        selected ? 'bg-primary-selected' : 'hover:bg-action-hover-subtle',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)
TransferListItem.displayName = 'TransferListItem'

// ── Transfer List Buttons ───────────────────────────────────────

interface TransferListButtonsProps {
  onMoveAllRight?: () => void
  onMoveRight?: () => void
  onMoveLeft?: () => void
  onMoveAllLeft?: () => void
  disableMoveAllRight?: boolean
  disableMoveRight?: boolean
  disableMoveLeft?: boolean
  disableMoveAllLeft?: boolean
  className?: string
}

function TransferListButtons({
  onMoveAllRight,
  onMoveRight,
  onMoveLeft,
  onMoveAllLeft,
  disableMoveAllRight,
  disableMoveRight,
  disableMoveLeft,
  disableMoveAllLeft,
  className,
}: TransferListButtonsProps) {
  const btnBase =
    'inline-flex items-center justify-center rounded size-[26px] border transition-colors focus-visible:outline-none'
  const btnEnabled =
    'bg-background-paper border-primary-focus-ring text-primary hover:bg-primary-hover-subtle'
  const btnDisabled =
    'bg-action-disabled-bg border-outline-border text-disabled-text pointer-events-none'

  return (
    <div className={cn('flex flex-col items-center justify-center gap-2 w-8', className)}>
      <button
        type="button"
        onClick={onMoveAllRight}
        disabled={disableMoveAllRight}
        className={cn(btnBase, disableMoveAllRight ? btnDisabled : btnEnabled)}
        aria-label="Move all right"
      >
        <DoubleChevronRightIcon />
      </button>
      <button
        type="button"
        onClick={onMoveRight}
        disabled={disableMoveRight}
        className={cn(btnBase, disableMoveRight ? btnDisabled : btnEnabled)}
        aria-label="Move selected right"
      >
        <ChevronRightIcon />
      </button>
      <button
        type="button"
        onClick={onMoveLeft}
        disabled={disableMoveLeft}
        className={cn(btnBase, disableMoveLeft ? btnDisabled : btnEnabled)}
        aria-label="Move selected left"
      >
        <ChevronLeftIcon />
      </button>
      <button
        type="button"
        onClick={onMoveAllLeft}
        disabled={disableMoveAllLeft}
        className={cn(btnBase, disableMoveAllLeft ? btnDisabled : btnEnabled)}
        aria-label="Move all left"
      >
        <DoubleChevronLeftIcon />
      </button>
    </div>
  )
}

// ── Transfer List Root ──────────────────────────────────────────

const TransferList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('inline-flex items-start gap-4 font-sans', className)} {...props}>
      {children}
    </div>
  )
)
TransferList.displayName = 'TransferList'

export { TransferList, TransferListPanel, TransferListItem, TransferListButtons }
export type { TransferListPanelProps, TransferListItemProps, TransferListButtonsProps }
