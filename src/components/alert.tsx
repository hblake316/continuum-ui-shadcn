import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  MdCheck,
  MdClose,
  MdErrorOutline,
  MdWarningAmber,
  MdInfoOutline,
  MdCheckCircleOutline,
} from 'react-icons/md'

import { cn } from '../lib/utils'

const alertVariants = cva(
  [
    'relative flex items-start gap-1.5 w-full rounded border border-solid px-2 py-2',
    'text-sm-1x-label-med500',
    'has-data-[slot=alert-action]:pr-1',
  ],
  {
    variants: {
      severity: {
        basic: [
          'bg-background-paper border-outline-border text-text-primary',
          '[&_[data-slot=alert-description]]:text-text-secondary',
        ],
        error: 'bg-error-alert-bg border-error text-error-alert-content',
        warning: 'bg-warning-alert-bg border-warning text-warning-alert-content',
        info: 'bg-info-alert-bg border-info text-info-alert-content',
        success: 'bg-success-alert-bg border-success text-success-alert-content',
      },
    },
    defaultVariants: {
      severity: 'basic',
    },
  }
)

const severityIconMap: Record<string, React.ReactNode> = {
  basic: <MdCheck className="size-[18px] shrink-0" />,
  error: <MdErrorOutline className="size-[18px] shrink-0" />,
  warning: <MdWarningAmber className="size-[18px] shrink-0" />,
  info: <MdInfoOutline className="size-[18px] shrink-0" />,
  success: <MdCheckCircleOutline className="size-[18px] shrink-0" />,
}

const severityIconColorMap: Record<string, string> = {
  basic: 'text-text-secondary',
  error: 'text-error',
  warning: 'text-warning',
  info: 'text-info',
  success: 'text-success',
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="alert-title" className={cn('text-sm-1x-label-med500', className)} {...props} />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn('text-sm-1x-component-reg400', className)}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="alert-action" className={cn('shrink-0 self-start', className)} {...props} />
  )
}

function Alert({
  className,
  severity = 'basic',
  startIcon = true,
  title,
  action,
  onClose,
  children,
  ...props
}: Omit<React.ComponentProps<'div'>, 'title'> &
  Omit<VariantProps<typeof alertVariants>, 'severity'> & {
    severity?: 'basic' | 'error' | 'warning' | 'info' | 'success'
    startIcon?: boolean
    title?: React.ReactNode
    action?: React.ReactNode
    onClose?: () => void
  }) {
  const childArray = React.Children.toArray(children)
  const actionChildren = childArray.filter(
    (child) => React.isValidElement(child) && child.type === AlertAction
  )
  const contentChildren = childArray.filter(
    (child) => !React.isValidElement(child) || child.type !== AlertAction
  )

  const resolvedAction =
    actionChildren.length > 0 ? (
      actionChildren
    ) : action ? (
      <AlertAction>{action}</AlertAction>
    ) : onClose ? (
      <AlertAction>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={cn(
            'flex items-center justify-center size-[16px] rounded',
            'border border-outline-border bg-background-paper text-text-secondary',
            'hover:bg-action-hover-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
          )}
        >
          <MdClose className="size-[12px]" />
        </button>
      </AlertAction>
    ) : null

  return (
    <div
      data-slot="alert"
      role={severity === 'error' || severity === 'warning' ? 'alert' : 'status'}
      className={cn(alertVariants({ severity }), className)}
      {...props}
    >
      {startIcon && (
        <span className={cn('flex items-start shrink-0 pt-[1px]', severityIconColorMap[severity])}>
          {severityIconMap[severity]}
        </span>
      )}
      <div className="flex flex-1 min-w-0 flex-col gap-0 overflow-hidden">
        {title && <AlertTitle>{title}</AlertTitle>}
        {contentChildren}
      </div>
      {resolvedAction}
    </div>
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
