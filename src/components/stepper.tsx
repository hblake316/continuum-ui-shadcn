import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * Stepper derived from Figma component:
 *   - Stepper (node 6576:50917)
 *
 * Horizontal step indicator for multi-step flows.
 * Each step has a numbered circle + label, connected by lines.
 *   states: active, completed, error, disabled/upcoming
 *
 * Figma tokens:
 *   active: primary/main circle, primary text
 *   completed: primary/main filled check circle
 *   error: error/main circle
 *   upcoming: action/light circle, text-secondary
 *   connector: divider color
 */

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn('size-3.5', className)}>
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  )
}

// ── Stepper Root ────────────────────────────────────────────────

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  activeStep?: number
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, activeStep = 0, children, ...props }, ref) => {
    const steps = React.Children.toArray(children)

    return (
      <div ref={ref} className={cn('flex items-center font-sans', className)} {...props}>
        {steps.map((child, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <div
                className={cn(
                  'flex-1 h-px mx-2',
                  i <= activeStep ? 'bg-primary' : 'bg-outline-border'
                )}
              />
            )}
            {React.isValidElement<StepProps>(child)
              ? React.cloneElement(child, {
                  stepNumber: i + 1,
                  status:
                    child.props.status ??
                    (i < activeStep ? 'completed' : i === activeStep ? 'active' : 'upcoming'),
                })
              : child}
          </React.Fragment>
        ))}
      </div>
    )
  }
)
Stepper.displayName = 'Stepper'

// ── Step ────────────────────────────────────────────────────────

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  stepNumber?: number
  status?: 'active' | 'completed' | 'error' | 'upcoming'
  label?: string
  description?: string
}

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ className, stepNumber = 1, status = 'upcoming', label, description, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center gap-1 shrink-0', className)}
        {...props}
      >
        {/* Circle */}
        <div
          className={cn(
            'inline-flex items-center justify-center size-6 rounded-full text-xs font-normal',
            status === 'active' && 'bg-primary text-primary-foreground',
            status === 'completed' && 'bg-primary text-primary-foreground',
            status === 'error' && 'bg-error text-error-foreground',
            status === 'upcoming' && 'bg-action-light text-text-secondary'
          )}
        >
          {status === 'completed' ? <CheckIcon /> : stepNumber}
        </div>

        {/* Label */}
        {label && (
          <div className="text-center">
            <p
              className={cn(
                'text-xs font-medium leading-[16.2px]',
                status === 'active' && 'text-text-primary',
                status === 'completed' && 'text-text-primary',
                status === 'error' && 'text-error',
                status === 'upcoming' && 'text-text-secondary'
              )}
            >
              {label}
            </p>
            {description && <p className="text-xs text-text-secondary mt-0.5">{description}</p>}
          </div>
        )}
      </div>
    )
  }
)
Step.displayName = 'Step'

export { Stepper, Step }
export type { StepperProps, StepProps }
