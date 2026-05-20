import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * TextField derived from Figma component:
 *   - TextField/textFieldOnly (node 12451:27729)
 *
 * Outlined text input with label above the field.
 *   size:   lg (60px field) | md (40px field) | sm (32px field)
 *   states: unfilled, enabled, hover, focused, error, disabled, readOnly
 *
 * Figma tokens:
 *   bg: default-less-saturated #f2f2f2
 *   border default: outline-border #cccccd
 *   border focused: primary #0f4bbd
 *   border hover: action-dark #24282d
 *   border error: error #db2328
 *   border radius: 6px
 *   label: 12px, text-primary
 *   hint: 12px, text-secondary (error: error color)
 *   input text: 16px (lg), 14px (md/sm)
 */

const sizeConfig = {
  lg: 'h-[60px] px-2 py-[18px] text-base leading-5',
  md: 'h-10 px-2 py-2 text-sm leading-[19px]',
  sm: 'h-8 px-2 py-1.5 text-[13px] leading-[17px]',
} as const

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'lg' | 'md' | 'sm'
  label?: string
  hint?: string
  error?: string
  required?: boolean
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, size = 'md', label, hint, error, required, disabled, readOnly, ...props }, ref) => {
    const hasError = !!error

    return (
      <div className={cn('flex flex-col gap-0.5 font-sans', className)}>
        {label && (
          <label
            className={cn(
              'text-xs leading-[16.2px] tracking-[0.4px]',
              hasError ? 'text-error' : 'text-text-primary'
            )}
          >
            {label}
            {required && <span className="text-error"> *</span>}
          </label>
        )}

        <input
          ref={ref}
          disabled={disabled}
          readOnly={readOnly}
          className={cn(
            'w-full rounded-[6px] border bg-input font-sans tracking-[0.15px] transition-colors',
            'placeholder:text-text-secondary',
            'focus:outline-none',
            sizeConfig[size],
            hasError
              ? 'border-error text-text-primary'
              : disabled
                ? 'border-input-border text-disabled-text cursor-not-allowed'
                : readOnly
                  ? 'border-input-border text-text-primary cursor-default'
                  : 'border-input-border text-text-primary hover:border-action-dark focus:border-primary'
          )}
          {...props}
        />

        {(hint || error) && (
          <span
            className={cn(
              'text-xs leading-[16.2px] tracking-[0.4px]',
              hasError ? 'text-error' : 'text-text-secondary'
            )}
          >
            {error || hint}
          </span>
        )}
      </div>
    )
  }
)
TextField.displayName = 'TextField'

export { TextField }
export type { TextFieldProps }
