import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * Autocomplete derived from Figma components:
 *   - Autocomplete Group (node 17625:7228)
 *   - Autocomplete/menuBasic (node 7348:46995)
 *
 * A combobox: text input with dropdown chevron and filterable menu.
 * States: collapsed, open (with menu), filled (value selected).
 * Sizes: lg | md | sm (same as TextField).
 *
 * This is a headless-ish component — consumers wire up their own
 * filtering/selection logic. For a full-featured combobox, pair with
 * @radix-ui/react-popover or cmdk.
 */

// ── Icons ───────────────────────────────────────────────────────

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('size-4 shrink-0', className)}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('size-4 shrink-0', className)}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

// ── Size config ─────────────────────────────────────────────────

const sizeConfig = {
  lg: 'h-[60px] px-2 py-[18px] text-base leading-5',
  md: 'h-10 px-2 py-2 text-sm leading-[19px]',
  sm: 'h-8 px-2 py-1.5 text-[13px] leading-[17px]',
} as const

// ── Autocomplete Trigger ────────────────────────────────────────

interface AutocompleteTriggerProps {
  size?: 'lg' | 'md' | 'sm'
  label?: string
  value?: string
  placeholder?: string
  open?: boolean
  disabled?: boolean
  className?: string
  onInputChange?: (value: string) => void
  onClear?: () => void
  onToggle?: () => void
  inputRef?: React.Ref<HTMLInputElement>
}

const AutocompleteTrigger = React.forwardRef<HTMLDivElement, AutocompleteTriggerProps>(
  (
    {
      size = 'md',
      label,
      value = '',
      placeholder,
      open,
      disabled,
      className,
      onInputChange,
      onClear,
      onToggle,
      inputRef,
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn('flex flex-col gap-0.5 font-sans', className)}>
        {label && (
          <label className="text-xs leading-[16.2px] tracking-[0.4px] text-text-primary">
            {label}
          </label>
        )}

        <div
          className={cn(
            'flex items-center rounded-[6px] border bg-input transition-colors',
            sizeConfig[size],
            disabled
              ? 'border-input-border text-disabled-text cursor-not-allowed'
              : open
                ? 'border-primary'
                : 'border-input-border hover:border-action-dark'
          )}
        >
          <input
            ref={inputRef}
            type="text"
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => onInputChange?.(e.target.value)}
            className="flex-1 bg-transparent outline-none font-sans tracking-[0.15px] placeholder:text-text-secondary min-w-0"
          />

          <div className="flex items-center gap-0.5">
            {value && onClear && (
              <button
                type="button"
                onClick={onClear}
                className="p-0.5 rounded-full text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Clear"
              >
                <CloseIcon />
              </button>
            )}
            <button
              type="button"
              onClick={onToggle}
              disabled={disabled}
              className="p-0.5 text-text-secondary"
              aria-label={open ? 'Close' : 'Open'}
            >
              <ChevronDownIcon className={cn('transition-transform', open && 'rotate-180')} />
            </button>
          </div>
        </div>
      </div>
    )
  }
)
AutocompleteTrigger.displayName = 'AutocompleteTrigger'

// ── Autocomplete Menu ───────────────────────────────────────────

interface AutocompleteMenuProps {
  children: React.ReactNode
  className?: string
}

function AutocompleteMenu({ children, className }: AutocompleteMenuProps) {
  return (
    <div
      role="listbox"
      className={cn(
        'rounded-[4px] border border-input-border bg-background-paper shadow-md overflow-auto max-h-[220px]',
        className
      )}
    >
      {children}
    </div>
  )
}

// ── Autocomplete Menu Item ──────────────────────────────────────

interface AutocompleteMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  dense?: boolean
}

const AutocompleteMenuItem = React.forwardRef<HTMLButtonElement, AutocompleteMenuItemProps>(
  ({ className, selected, dense, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="option"
        aria-selected={selected}
        className={cn(
          'w-full text-left font-sans text-sm tracking-[0.15px] text-text-primary transition-colors',
          'hover:bg-action-hover-subtle',
          dense ? 'px-4 py-1' : 'px-4 py-2',
          selected && 'bg-primary-focus text-primary',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
AutocompleteMenuItem.displayName = 'AutocompleteMenuItem'

export { AutocompleteTrigger, AutocompleteMenu, AutocompleteMenuItem }
export type { AutocompleteTriggerProps, AutocompleteMenuProps, AutocompleteMenuItemProps }
