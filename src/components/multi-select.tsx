import * as React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { cn } from '../lib/utils'
import { Checkbox } from './checkbox'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

/**
 * Multi-select dropdown — closed-list picker with a checkbox menu.
 *
 * Visual parity with `Select`: same trigger surface, label, focus/hover/disabled
 * states. The menu replaces single-select rows with checkboxes; the trigger
 * shows a summary derived from `value`.
 *
 * Default summary: 0 → placeholder, 1 → that option's label, >1 → "N selected".
 * Pass `renderValue` to override.
 *
 *   size: md (40px) | sm (32px)
 *   states: enabled, hover, open (focused), disabled
 */

const sizeConfig = {
  md: 'h-10 px-2 py-2 text-sm leading-[19px]',
  sm: 'h-8 px-2 py-1.5 text-[13px] leading-[17px]',
} as const

interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectProps {
  /** Label rendered above the trigger. Required for accessibility unless `ariaLabel` is passed. */
  label?: string
  /** Currently selected option values. */
  value: string[]
  /** List of selectable options. */
  options: MultiSelectOption[]
  /** Called with the new selection array when an option is toggled. */
  onChange: (value: string[]) => void
  /** Text shown in the trigger when nothing is selected. */
  placeholder?: string
  /** @defaultValue `'md'` */
  size?: 'md' | 'sm'
  /** Renders a red asterisk next to `label`. Visual only — does not enforce validation. */
  required?: boolean
  /** Disables the trigger and prevents opening the menu. */
  disabled?: boolean
  /** Applied to the outer wrapper. Use for layout-level overrides (`w-full`, `mt-4`, etc.). */
  className?: string
  /** Use when `label` is omitted but the trigger still needs an accessible name. */
  ariaLabel?: string
  /** Override the trigger value display. Receives the selected options in `options` order. */
  renderValue?: (selected: MultiSelectOption[]) => React.ReactNode
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      label,
      value,
      options,
      onChange,
      placeholder,
      size = 'md',
      required,
      disabled,
      className,
      ariaLabel,
      renderValue,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const labelId = React.useId()

    const selectedSet = React.useMemo(() => new Set(value), [value])
    const selected = React.useMemo(
      () => options.filter((o) => selectedSet.has(o.value)),
      [options, selectedSet]
    )

    const toggle = (optionValue: string) => {
      if (selectedSet.has(optionValue)) {
        onChange(value.filter((v) => v !== optionValue))
      } else {
        // Preserve `options` order so callers don't see arbitrary click-order arrays.
        const next = options.filter((o) => selectedSet.has(o.value) || o.value === optionValue)
        onChange(next.map((o) => o.value))
      }
    }

    const summary = renderValue
      ? renderValue(selected)
      : selected.length === 0
        ? (placeholder ?? '')
        : selected.length === 1
          ? selected[0].label
          : `${selected.length} selected`

    const isPlaceholder = selected.length === 0 && !renderValue

    return (
      <div className={cn('flex flex-col gap-0.5 font-sans', className)}>
        {label && (
          <label
            id={labelId}
            className="text-xs leading-[16.2px] tracking-[0.4px] text-text-primary"
          >
            {label}
            {required && <span className="text-error"> *</span>}
          </label>
        )}
        <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
          <PopoverTrigger asChild>
            <button
              ref={ref}
              type="button"
              disabled={disabled}
              aria-labelledby={label ? labelId : undefined}
              aria-label={!label ? ariaLabel : undefined}
              className={cn(
                'w-full rounded-[6px] border bg-input font-sans tracking-[0.15px] transition-colors',
                'flex items-center justify-between gap-1 text-left',
                'focus:outline-none',
                sizeConfig[size],
                disabled
                  ? 'cursor-not-allowed border-input-border text-disabled-text'
                  : open
                    ? 'border-primary text-text-primary'
                    : 'border-input-border text-text-primary hover:border-action-dark'
              )}
            >
              <span className={cn('truncate', isPlaceholder && 'text-text-secondary')}>
                {summary}
              </span>
              <MdKeyboardArrowDown
                className={cn(
                  'shrink-0 text-text-secondary transition-transform',
                  open && 'rotate-180'
                )}
                size={16}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="max-h-64 w-[var(--radix-popover-trigger-width)] overflow-y-auto p-2"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div role="listbox" aria-multiselectable className="flex flex-col gap-0.5">
              {options.map((opt) => (
                <Checkbox
                  key={opt.value}
                  checked={selectedSet.has(opt.value)}
                  onCheckedChange={() => toggle(opt.value)}
                  label={opt.label}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  }
)
MultiSelect.displayName = 'MultiSelect'

export { MultiSelect }
export type { MultiSelectProps, MultiSelectOption }
