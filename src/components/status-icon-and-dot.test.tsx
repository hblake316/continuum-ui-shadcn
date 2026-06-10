import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { StatusIconAndDot } from './status-icon-and-dot'

function renderComponent(props: Partial<React.ComponentProps<typeof StatusIconAndDot>> = {}) {
  return render(
    <StatusIconAndDot aria-label="Mail" {...props}>
      <span data-testid="icon" />
    </StatusIconAndDot>
  )
}

describe('StatusIconAndDot', () => {
  // ── Structure ─────────────────────────────────────────────────────────────

  it('renders an accessible button with the given aria-label', () => {
    renderComponent()
    expect(screen.getByRole('button', { name: 'Mail' })).toBeInTheDocument()
  })

  it('renders children inside the button', () => {
    renderComponent()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('outer container is 38×38', () => {
    const { container } = renderComponent()
    expect(container.firstElementChild?.className).toContain('size-[38px]')
  })

  it('inner button is 32×32', () => {
    renderComponent()
    expect(screen.getByRole('button').className).toContain('size-8')
  })

  // ── Icon color ────────────────────────────────────────────────────────────

  it('icon is action-dark grey by default', () => {
    renderComponent()
    expect(screen.getByRole('button').className).toContain('text-action-dark')
  })

  it('icon turns primary blue for non-default color', () => {
    renderComponent({ color: 'primary' })
    expect(screen.getByRole('button').className).toContain('text-primary')
  })

  it('icon turns primary blue for error color', () => {
    renderComponent({ color: 'error' })
    expect(screen.getByRole('button').className).toContain('text-primary')
  })

  // ── Standard variant ──────────────────────────────────────────────────────

  it('standard: renders count text', () => {
    renderComponent({ variant: 'standard', count: '1' })
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('standard: count is included in the accessible button label', () => {
    renderComponent({ variant: 'standard', count: '5' })
    expect(screen.getByRole('button', { name: 'Mail (5)' })).toBeInTheDocument()
  })

  it('standard: no badge renders when count is omitted', () => {
    const { container } = renderComponent({ variant: 'standard' })
    expect(container.querySelector('[aria-hidden="true"]')).toBeNull()
  })

  it('standard default: badge has no background', () => {
    const { container } = renderComponent({ variant: 'standard', color: 'default', count: '1' })
    const badge = container.querySelector('[aria-hidden="true"]')!
    ;['bg-primary', 'bg-secondary', 'bg-error', 'bg-warning', 'bg-info', 'bg-success'].forEach(
      (cls) => expect(badge).not.toHaveClass(cls)
    )
  })

  it('standard default: badge text is action color', () => {
    const { container } = renderComponent({ variant: 'standard', color: 'default', count: '1' })
    const badge = container.querySelector('[aria-hidden="true"]')!
    expect(badge).toHaveClass('text-action')
    expect(badge).not.toHaveClass('text-action-dark')
  })

  it('standard primary: badge has bg-primary', () => {
    const { container } = renderComponent({
      variant: 'standard',
      color: 'primary',
      count: '1',
    })
    const badge = container.querySelector('[aria-hidden="true"]')
    expect(badge?.className).toContain('bg-primary')
    expect(badge?.className).toContain('text-primary-foreground')
  })

  it('standard error: badge has bg-error', () => {
    const { container } = renderComponent({ variant: 'standard', color: 'error', count: '1' })
    expect(container.querySelector('[aria-hidden="true"]')?.className).toContain('bg-error')
  })

  it('standard: badge is positioned at top-right of container', () => {
    const { container } = renderComponent({ variant: 'standard', count: '1' })
    const badge = container.querySelector('[aria-hidden="true"]')
    expect(badge?.className).toContain('top-0')
    expect(badge?.className).toContain('right-0')
  })

  it('standard: badge applies pill classes', () => {
    const { container } = renderComponent({ variant: 'standard', count: '5' })
    const badge = container.querySelector('[aria-hidden="true"]')
    expect(badge?.className).toContain('h-[14px]')
    expect(badge?.className).toContain('rounded-[64px]')
  })

  // ── Dot variant ───────────────────────────────────────────────────────────

  it('dot default: renders no badge', () => {
    const { container } = renderComponent({ variant: 'dot', color: 'default' })
    expect(container.querySelector('[aria-hidden="true"]')).toBeNull()
  })

  it('dot primary: renders a badge circle', () => {
    const { container } = renderComponent({ variant: 'dot', color: 'primary' })
    const dot = container.querySelector('[aria-hidden="true"]')
    expect(dot).not.toBeNull()
    expect(dot?.className).toContain('bg-primary')
    expect(dot?.className).toContain('size-2')
    expect(dot?.className).toContain('rounded-full')
  })

  it('dot success: renders with correct color', () => {
    const { container } = renderComponent({ variant: 'dot', color: 'success' })
    expect(container.querySelector('[aria-hidden="true"]')?.className).toContain('bg-success')
  })

  it('dot: badge is positioned at top-right offset', () => {
    const { container } = renderComponent({ variant: 'dot', color: 'error' })
    const dot = container.querySelector('[aria-hidden="true"]')
    expect(dot?.className).toContain('top-[4px]')
    expect(dot?.className).toContain('right-[3px]')
  })

  // ── count as number ───────────────────────────────────────────────────────

  it('standard: numeric count renders and is included in the accessible label', () => {
    renderComponent({ variant: 'standard', count: 3 })
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Mail (3)' })).toBeInTheDocument()
  })

  // ── asChild ───────────────────────────────────────────────────────────────

  it('asChild: renders child element instead of a button', () => {
    render(
      <StatusIconAndDot aria-label="Mail" asChild>
        <a href="/mail">
          <span data-testid="icon" />
        </a>
      </StatusIconAndDot>
    )
    expect(screen.queryByRole('button')).toBeNull()
    expect(screen.getByRole('link', { name: 'Mail' })).toBeInTheDocument()
  })

  // ── Disabled ──────────────────────────────────────────────────────────────

  it('disables the button when disabled prop is passed', () => {
    renderComponent({ disabled: true })
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
