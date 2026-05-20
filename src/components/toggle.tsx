import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-full font-sans font-medium whitespace-nowrap transition-colors cursor-pointer select-none border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus-ring',
  {
    variants: {
      size: {
        md: 'h-7 px-3 text-[13px] leading-[17px]',
        sm: 'h-6 px-2.5 text-[12px] leading-[16px]',
      },
    },
    defaultVariants: { size: 'md' },
  }
)

interface ToggleProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof toggleVariants> {
  pressed: boolean
  onPressedChange: (pressed: boolean) => void
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, size, pressed, onPressedChange, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={pressed}
        onClick={() => onPressedChange(!pressed)}
        className={cn(
          toggleVariants({ size }),
          pressed
            ? 'bg-primary text-primary-foreground border-primary'
            : 'bg-background-paper text-text-secondary border-outline-border hover:bg-action-hover hover:text-text-primary',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Toggle.displayName = 'Toggle'

export { Toggle, toggleVariants }
export type { ToggleProps }
