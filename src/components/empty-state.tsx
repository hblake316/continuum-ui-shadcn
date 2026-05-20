import * as React from 'react'

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './empty'
import { cn } from '../lib/utils'

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => {
    return (
      <Empty ref={ref} className={cn(className)} {...props}>
        <EmptyHeader>
          {icon && <EmptyMedia variant="icon">{icon}</EmptyMedia>}
          <EmptyTitle>{title}</EmptyTitle>
          {description && <EmptyDescription>{description}</EmptyDescription>}
        </EmptyHeader>
        {action && <EmptyContent>{action}</EmptyContent>}
      </Empty>
    )
  }
)
EmptyState.displayName = 'EmptyState'

export { EmptyState }
export type { EmptyStateProps }
