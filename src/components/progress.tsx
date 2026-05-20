import * as React from 'react'

import { cn } from '../lib/utils'

/**
 * Progress derived from Figma component:
 *   - Progress (node 6586:46832)
 *
 * Linear and circular progress indicators.
 *   color: primary | secondary
 *   variant: determinate (with value) | indeterminate (animated)
 *
 * Figma tokens:
 *   track: action/states/enabled at reduced opacity
 *   bar: primary/main or accent/main
 *   circular: same colors, stroke-based
 */

// ── Linear Progress ─────────────────────────────────────────────

interface LinearProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  color?: 'primary' | 'secondary'
}

const LinearProgress = React.forwardRef<HTMLDivElement, LinearProgressProps>(
  ({ className, value, color = 'primary', ...props }, ref) => {
    const isDeterminate = value !== undefined
    const barColor = color === 'primary' ? 'bg-primary' : 'bg-secondary'

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={isDeterminate ? value : undefined}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn('relative h-1 w-full overflow-hidden rounded-full bg-action/20', className)}
        {...props}
      >
        <div
          className={cn(
            'h-full rounded-full transition-[width] duration-300',
            barColor,
            !isDeterminate && 'animate-indeterminate-bar absolute'
          )}
          style={isDeterminate ? { width: `${Math.min(100, Math.max(0, value))}%` } : undefined}
        />
      </div>
    )
  }
)
LinearProgress.displayName = 'LinearProgress'

// ── Circular Progress ───────────────────────────────────────────

interface CircularProgressProps extends React.SVGAttributes<SVGSVGElement> {
  value?: number
  color?: 'primary' | 'secondary'
  size?: number
  thickness?: number
}

const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  ({ className, value, color = 'primary', size = 40, thickness = 3.6, ...props }, ref) => {
    const isDeterminate = value !== undefined
    const radius = (size - thickness) / 2
    const circumference = 2 * Math.PI * radius
    const strokeColor = color === 'primary' ? 'stroke-primary' : 'stroke-secondary'

    return (
      <svg
        ref={ref}
        role="progressbar"
        aria-valuenow={isDeterminate ? value : undefined}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={cn(!isDeterminate && 'animate-spin', className)}
        {...props}
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={thickness}
          className="stroke-action/20"
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={thickness}
          strokeLinecap="round"
          className={strokeColor}
          strokeDasharray={circumference}
          strokeDashoffset={
            isDeterminate
              ? circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference
              : circumference * 0.75
          }
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: isDeterminate ? 'stroke-dashoffset 0.3s' : undefined }}
        />
      </svg>
    )
  }
)
CircularProgress.displayName = 'CircularProgress'

export { LinearProgress, CircularProgress }
export type { LinearProgressProps, CircularProgressProps }
