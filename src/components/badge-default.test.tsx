import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { BadgeDefault } from './badge-default'

describe('BadgeDefault', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  it('renders children text', () => {
    render(<BadgeDefault>Label</BadgeDefault>)
    expect(screen.getByText('Label')).toBeInTheDocument()
  })

  it('renders no delete button by default', () => {
    render(<BadgeDefault>Label</BadgeDefault>)
    expect(screen.queryByRole('button', { name: 'Remove' })).toBeNull()
  })

  it('renders delete button when onDelete is provided', () => {
    render(<BadgeDefault onDelete={() => {}}>Label</BadgeDefault>)
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument()
  })

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn()
    render(<BadgeDefault onDelete={onDelete}>Label</BadgeDefault>)
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }))
    expect(onDelete).toHaveBeenCalledTimes(1)
  })

  it('renders leftIcon when provided', () => {
    render(<BadgeDefault leftIcon={<span data-testid="icon" />}>Label</BadgeDefault>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  // ── Colors ────────────────────────────────────────────────────────────────

  it('applies primary background by default', () => {
    const { container } = render(<BadgeDefault>Label</BadgeDefault>)
    expect(container.firstChild).toHaveClass('bg-primary')
  })

  it('applies white text for primary', () => {
    const { container } = render(<BadgeDefault color="primary">Label</BadgeDefault>)
    expect(container.firstChild).toHaveClass('text-white')
  })

  it('applies secondary background and dark text', () => {
    const { container } = render(<BadgeDefault color="secondary">Label</BadgeDefault>)
    const badge = container.firstChild as HTMLElement
    expect(badge.className).toContain('bg-action-selected')
    expect(badge.className).toContain('text-text-primary')
  })

  it('applies accent background', () => {
    const { container } = render(<BadgeDefault color="accent">Label</BadgeDefault>)
    expect(container.firstChild).toHaveClass('bg-secondary')
  })

  it('applies success background', () => {
    const { container } = render(<BadgeDefault color="success">Label</BadgeDefault>)
    expect(container.firstChild).toHaveClass('bg-success')
  })

  it('applies warning background', () => {
    const { container } = render(<BadgeDefault color="warning">Label</BadgeDefault>)
    expect(container.firstChild).toHaveClass('bg-warning')
  })

  it('applies invalid background', () => {
    const { container } = render(<BadgeDefault color="invalid">Label</BadgeDefault>)
    expect(container.firstChild).toHaveClass('bg-error')
  })

  it('applies info background', () => {
    const { container } = render(<BadgeDefault color="info">Label</BadgeDefault>)
    expect(container.firstChild).toHaveClass('bg-info')
  })

  // ── Sizes ────────────────────────────────────────────────────────────────

  it('applies default size classes', () => {
    const { container } = render(<BadgeDefault>Label</BadgeDefault>)
    const badge = container.firstChild as HTMLElement
    expect(badge.className).toContain('h-7')
    expect(badge.className).toContain('rounded-xl')
    expect(badge.className).toContain('text-med-body-small-reg400')
  })

  it('applies large size classes', () => {
    const { container } = render(<BadgeDefault size="large">Label</BadgeDefault>)
    const badge = container.firstChild as HTMLElement
    expect(badge.className).toContain('h-[34px]')
    expect(badge.className).toContain('rounded-[13px]')
    expect(badge.className).toContain('text-lg-1x-body-default-reg400')
  })

  it('applies small size classes', () => {
    const { container } = render(<BadgeDefault size="small">Label</BadgeDefault>)
    const badge = container.firstChild as HTMLElement
    expect(badge.className).toContain('h-[18px]')
    expect(badge.className).toContain('rounded-lg')
    expect(badge.className).toContain('text-sm-description-med500')
  })

  // ── Disabled ─────────────────────────────────────────────────────────────

  it('applies disabled styles when disabled', () => {
    const { container } = render(<BadgeDefault disabled>Label</BadgeDefault>)
    const badge = container.firstChild as HTMLElement
    expect(badge.className).toContain('bg-action-disabled-bg')
    expect(badge.className).toContain('text-disabled-text')
    expect(badge.className).toContain('pointer-events-none')
  })

  it('sets aria-disabled when disabled', () => {
    const { container } = render(<BadgeDefault disabled>Label</BadgeDefault>)
    expect(container.firstChild).toHaveAttribute('aria-disabled', 'true')
  })

  it('disables the delete button when disabled', () => {
    render(
      <BadgeDefault disabled onDelete={() => {}}>
        Label
      </BadgeDefault>
    )
    expect(screen.getByRole('button', { name: 'Remove' })).toBeDisabled()
  })

  it('does not call onDelete when disabled', () => {
    const onDelete = vi.fn()
    render(
      <BadgeDefault disabled onDelete={onDelete}>
        Label
      </BadgeDefault>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }))
    expect(onDelete).not.toHaveBeenCalled()
  })

  // ── Delete button label ────────────────────────────────────────────────────

  it('uses onDeleteAriaLabel when provided', () => {
    render(
      <BadgeDefault onDelete={() => {}} onDeleteAriaLabel="Cancel Design Mode">
        Label
      </BadgeDefault>
    )
    expect(screen.getByRole('button', { name: 'Cancel Design Mode' })).toBeInTheDocument()
  })

  it('falls back to "Remove" when onDeleteAriaLabel is an empty string', () => {
    render(
      <BadgeDefault onDelete={() => {}} onDeleteAriaLabel="">
        Label
      </BadgeDefault>
    )
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument()
  })
})
