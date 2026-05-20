import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, it, expect } from 'vitest'

import { WidgetSkeleton } from './widget-skeleton'

describe('WidgetSkeleton', () => {
  it('renders with role="status" and aria-busy="true"', () => {
    render(<WidgetSkeleton data-testid="skeleton" />)
    const el = screen.getByRole('status')
    expect(el).toBeInTheDocument()
    expect(el).toHaveAttribute('aria-busy', 'true')
  })

  it('applies the default rectangle variant class (rounded)', () => {
    render(<WidgetSkeleton data-testid="skeleton" />)
    const el = screen.getByTestId('skeleton')
    expect(el.className).toContain('rounded')
    expect(el.className).not.toContain('rounded-full')
  })

  it('applies h-3 rounded for the line variant', () => {
    render(<WidgetSkeleton variant="line" data-testid="skeleton" />)
    const el = screen.getByTestId('skeleton')
    expect(el.className).toContain('h-3')
    expect(el.className).toContain('rounded')
  })

  it('applies rounded-full for the circle variant', () => {
    render(<WidgetSkeleton variant="circle" data-testid="skeleton" />)
    const el = screen.getByTestId('skeleton')
    expect(el.className).toContain('rounded-full')
  })

  it('forwards ref to the underlying element', () => {
    const ref = createRef<HTMLDivElement>()
    render(<WidgetSkeleton ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('uses a custom srLabel as aria-label', () => {
    render(<WidgetSkeleton srLabel="Loading widget data" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading widget data')
  })

  it('defaults aria-label to "Loading"', () => {
    render(<WidgetSkeleton />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading')
  })

  it('composes custom className with internal classes', () => {
    render(<WidgetSkeleton className="custom-class h-8" data-testid="skeleton" />)
    const el = screen.getByTestId('skeleton')
    expect(el.className).toContain('custom-class')
    expect(el.className).toContain('h-8')
    expect(el.className).toContain('animate-pulse')
  })

  it('applies the bg-action-disabled-bg brand color class', () => {
    render(<WidgetSkeleton data-testid="skeleton" />)
    const el = screen.getByTestId('skeleton')
    expect(el.className).toContain('bg-action-disabled-bg')
  })
})
