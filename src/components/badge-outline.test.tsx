import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { BadgeOutline } from './badge-outline'

describe('BadgeOutline', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  it('renders children text', () => {
    render(<BadgeOutline>Label</BadgeOutline>)
    expect(screen.getByText('Label')).toBeInTheDocument()
  })

  it('always has a border class', () => {
    const { container } = render(<BadgeOutline>Label</BadgeOutline>)
    expect(container.firstChild).toHaveClass('border')
  })

  it('always has paper background', () => {
    const { container } = render(<BadgeOutline>Label</BadgeOutline>)
    expect(container.firstChild).toHaveClass('bg-background-paper')
  })

  it('renders no delete button by default', () => {
    render(<BadgeOutline>Label</BadgeOutline>)
    expect(screen.queryByRole('button', { name: 'Remove' })).toBeNull()
  })

  it('renders delete button when onDelete is provided', () => {
    render(<BadgeOutline onDelete={() => {}}>Label</BadgeOutline>)
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument()
  })

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn()
    render(<BadgeOutline onDelete={onDelete}>Label</BadgeOutline>)
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }))
    expect(onDelete).toHaveBeenCalledTimes(1)
  })

  it('renders leftIcon when provided', () => {
    render(<BadgeOutline leftIcon={<span data-testid="icon" />}>Label</BadgeOutline>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  // ── Colors — border and text match semantic color ─────────────────────────

  it('primary: uses border-primary and text-primary', () => {
    const { container } = render(<BadgeOutline color="primary">Label</BadgeOutline>)
    const cls = (container.firstChild as HTMLElement).className
    expect(cls).toContain('border-primary')
    expect(cls).toContain('text-primary')
  })

  it('secondary: uses border-outline-border and text-text-primary', () => {
    const { container } = render(<BadgeOutline color="secondary">Label</BadgeOutline>)
    const cls = (container.firstChild as HTMLElement).className
    expect(cls).toContain('border-outline-border')
    expect(cls).toContain('text-text-primary')
  })

  it('accent: uses border-secondary and text-secondary', () => {
    const { container } = render(<BadgeOutline color="accent">Label</BadgeOutline>)
    const cls = (container.firstChild as HTMLElement).className
    expect(cls).toContain('border-secondary')
    expect(cls).toContain('text-secondary')
  })

  it('success: border and text use success token', () => {
    const { container } = render(<BadgeOutline color="success">Label</BadgeOutline>)
    const cls = (container.firstChild as HTMLElement).className
    expect(cls).toContain('border-success')
    expect(cls).toContain('text-success')
  })

  it('warning: border and text use warning token', () => {
    const { container } = render(<BadgeOutline color="warning">Label</BadgeOutline>)
    expect((container.firstChild as HTMLElement).className).toContain('border-warning')
  })

  it('invalid: border and text use error token', () => {
    const { container } = render(<BadgeOutline color="invalid">Label</BadgeOutline>)
    const cls = (container.firstChild as HTMLElement).className
    expect(cls).toContain('border-error')
    expect(cls).toContain('text-error')
  })

  it('info: border and text use info token', () => {
    const { container } = render(<BadgeOutline color="info">Label</BadgeOutline>)
    expect((container.firstChild as HTMLElement).className).toContain('border-info')
  })

  // ── Sizes ─────────────────────────────────────────────────────────────────

  it('applies default size classes', () => {
    const { container } = render(<BadgeOutline>Label</BadgeOutline>)
    const cls = (container.firstChild as HTMLElement).className
    expect(cls).toContain('h-7')
    expect(cls).toContain('rounded-xl')
    expect(cls).toContain('text-med-body-small-reg400')
  })

  it('applies large size classes', () => {
    const { container } = render(<BadgeOutline size="large">Label</BadgeOutline>)
    const cls = (container.firstChild as HTMLElement).className
    expect(cls).toContain('h-[34px]')
    expect(cls).toContain('rounded-[13px]')
  })

  it('small size is fully pill-shaped (rounded-[100px])', () => {
    const { container } = render(<BadgeOutline size="small">Label</BadgeOutline>)
    const cls = (container.firstChild as HTMLElement).className
    expect(cls).toContain('h-[18px]')
    expect(cls).toContain('rounded-[100px]')
  })

  // ── Disabled ──────────────────────────────────────────────────────────────

  it('applies disabled styles when disabled', () => {
    const { container } = render(<BadgeOutline disabled>Label</BadgeOutline>)
    const cls = (container.firstChild as HTMLElement).className
    expect(cls).toContain('border-outline-border')
    expect(cls).toContain('text-disabled-text')
    expect(cls).toContain('pointer-events-none')
  })

  it('sets aria-disabled when disabled', () => {
    const { container } = render(<BadgeOutline disabled>Label</BadgeOutline>)
    expect(container.firstChild).toHaveAttribute('aria-disabled', 'true')
  })

  it('disables the delete button when disabled', () => {
    render(
      <BadgeOutline disabled onDelete={() => {}}>
        Label
      </BadgeOutline>
    )
    expect(screen.getByRole('button', { name: 'Remove' })).toBeDisabled()
  })

  it('does not call onDelete when disabled', () => {
    const onDelete = vi.fn()
    render(
      <BadgeOutline disabled onDelete={onDelete}>
        Label
      </BadgeOutline>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }))
    expect(onDelete).not.toHaveBeenCalled()
  })

  // ── Delete button label ────────────────────────────────────────────────────

  it('uses onDeleteAriaLabel when provided', () => {
    render(
      <BadgeOutline onDelete={() => {}} onDeleteAriaLabel="Cancel Design Mode">
        Label
      </BadgeOutline>
    )
    expect(screen.getByRole('button', { name: 'Cancel Design Mode' })).toBeInTheDocument()
  })

  it('falls back to "Remove" when onDeleteAriaLabel is an empty string', () => {
    render(
      <BadgeOutline onDelete={() => {}} onDeleteAriaLabel="">
        Label
      </BadgeOutline>
    )
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument()
  })
})
