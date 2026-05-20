import * as React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'

import { cn } from '../lib/utils'
import { AutocompleteMenu, AutocompleteMenuItem } from './autocomplete'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

/**
 * Single-select dropdown — a closed-list variant of Autocomplete with no type-ahead.
 *
 * Composes `Popover` + `AutocompleteMenu` for the menu surface so the visual
 * language stays consistent with the Autocomplete picker (`AutocompleteTrigger`).
 * Visual parity with `TextField`: same border tokens, focus/hover/disabled states,
 * label + required affordances.
 *
 * Use this for short enumerated lists (frequency, timezone, entity type). For
 * type-ahead behavior over large lists, use `AutocompleteTrigger` + `AutocompleteMenu`
 * directly.
 *
 *   size: md (40px) | sm (32px)
 *   states: enabled, hover, open (focused), disabled
 */

const sizeConfig = {
  md: 'h-10 px-2 py-2 text-sm leading-[19px]',
  sm: 'h-8 px-2 py-1.5 text-[13px] leading-[17px]',
} as const

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  /** Label rendered above the trigger. Required for accessibility unless `ariaLabel` is passed. */
  label?: string
  /** Currently selected option value. */
  value: string
  /** List of selectable options. */
  options: SelectOption[]
  /** Called with the chosen option's value when the user selects an option. */
  onChange: (value: string) => void
  /** Text shown in the trigger when no option is selected. */
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
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
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
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const selected = options.find((o) => o.value === value)
    const labelId = React.useId()

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
              <span
                className={cn('truncate', !selected && placeholder ? 'text-text-secondary' : '')}
              >
                {selected?.label ?? placeholder ?? ''}
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
            className="max-h-64 w-[var(--radix-popover-trigger-width)] overflow-y-auto p-0"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <AutocompleteMenu>
              {options.map((opt) => (
                <AutocompleteMenuItem
                  key={opt.value}
                  selected={opt.value === value}
                  dense
                  onClick={() => {
                    onChange(opt.value)
                    setOpen(false)
                  }}
                >
                  {opt.label}
                </AutocompleteMenuItem>
              ))}
            </AutocompleteMenu>
          </PopoverContent>
        </Popover>
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Select }
export type { SelectProps, SelectOption }
