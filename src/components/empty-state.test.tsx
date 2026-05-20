import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, it, expect } from 'vitest'

import { EmptyState } from './empty-state'

describe('EmptyState', () => {
  it('renders the title', () => {
    render(<EmptyState title="No items" />)
    expect(screen.getByText('No items')).toBeInTheDocument()
  })

  it('renders the description when provided', () => {
    render(<EmptyState title="No items" description="Try a different search." />)
    expect(screen.getByText('Try a different search.')).toBeInTheDocument()
  })

  it('does not render a description when omitted', () => {
    render(<EmptyState title="No items" />)
    expect(screen.queryByText('Try a different search.')).not.toBeInTheDocument()
  })

  it('renders the icon slot when provided', () => {
    render(<EmptyState title="No items" icon={<svg data-testid="empty-icon" />} />)
    expect(screen.getByTestId('empty-icon')).toBeInTheDocument()
  })

  it('renders the action slot when provided', () => {
    render(<EmptyState title="No items" action={<button type="button">Configure</button>} />)
    expect(screen.getByRole('button', { name: /configure/i })).toBeInTheDocument()
  })

  it('forwards ref to the underlying element', () => {
    const ref = createRef<HTMLDivElement>()
    render(<EmptyState ref={ref} title="No items" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('composes custom className with internal classes', () => {
    render(<EmptyState title="No items" className="my-custom" data-testid="empty" />)
    const el = screen.getByTestId('empty')
    expect(el.className).toContain('my-custom')
    expect(el.className).toContain('flex')
  })
})
