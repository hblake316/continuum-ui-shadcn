import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { StatusDot } from './status-dot'

describe('StatusDot', () => {
  // ── Dot variant ───────────────────────────────────────────────────────────

  it('dot: renders an 8×8 circle (size-2 rounded-full)', () => {
    render(<StatusDot variant="dot" data-testid="dot" />)
    const el = screen.getByTestId('dot')
    expect(el.className).toContain('size-2')
    expect(el.className).toContain('rounded-full')
  })

  it('dot: is aria-hidden', () => {
    render(<StatusDot variant="dot" data-testid="dot" />)
    expect(screen.getByTestId('dot')).toHaveAttribute('aria-hidden', 'true')
  })

  it('dot: children are ignored', () => {
    render(
      <StatusDot variant="dot" data-testid="dot">
        Online
      </StatusDot>
    )
    expect(screen.getByTestId('dot')).toBeEmptyDOMElement()
    expect(screen.queryByText('Online')).toBeNull()
  })

  it('dot: default color uses neutral background', () => {
    render(<StatusDot variant="dot" color="default" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('bg-text-secondary')
  })

  it('dot: primary color', () => {
    render(<StatusDot variant="dot" color="primary" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('bg-primary')
  })

  it('dot: secondary color', () => {
    render(<StatusDot variant="dot" color="secondary" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('bg-secondary')
  })

  it('dot: error color', () => {
    render(<StatusDot variant="dot" color="error" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('bg-error')
  })

  it('dot: warning color', () => {
    render(<StatusDot variant="dot" color="warning" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('bg-warning')
  })

  it('dot: info color', () => {
    render(<StatusDot variant="dot" color="info" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('bg-info')
  })

  it('dot: success color', () => {
    render(<StatusDot variant="dot" color="success" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('bg-success')
  })

  // ── Standard variant ──────────────────────────────────────────────────────

  it('standard: renders children text', () => {
    render(<StatusDot variant="standard">Online</StatusDot>)
    expect(screen.getByText('Online')).toBeInTheDocument()
  })

  it('standard: applies pill shape classes', () => {
    render(
      <StatusDot variant="standard" data-testid="badge">
        Online
      </StatusDot>
    )
    const el = screen.getByTestId('badge')
    expect(el.className).toContain('h-[14px]')
    expect(el.className).toContain('px-[6.5px]')
    expect(el.className).toContain('rounded-[64px]')
  })

  it('standard: applies typography token', () => {
    render(
      <StatusDot variant="standard" data-testid="badge">
        Online
      </StatusDot>
    )
    expect(screen.getByTestId('badge').className).toContain('text-sm-1x-component-reg400')
  })

  it('standard: applies whitespace-nowrap', () => {
    render(
      <StatusDot variant="standard" data-testid="badge">
        Online
      </StatusDot>
    )
    expect(screen.getByTestId('badge').className).toContain('whitespace-nowrap')
  })

  it('standard: default color has no background', () => {
    render(
      <StatusDot variant="standard" color="default" data-testid="badge">
        Default
      </StatusDot>
    )
    const badge = screen.getByTestId('badge')
    ;[
      'bg-primary',
      'bg-secondary',
      'bg-error',
      'bg-warning',
      'bg-info',
      'bg-success',
      'bg-text-secondary',
    ].forEach((cls) => expect(badge).not.toHaveClass(cls))
  })

  it('standard: is not aria-hidden', () => {
    render(
      <StatusDot variant="standard" data-testid="badge">
        Online
      </StatusDot>
    )
    expect(screen.getByTestId('badge')).not.toHaveAttribute('aria-hidden')
  })

  it('standard: default color uses text-text-primary', () => {
    render(
      <StatusDot variant="standard" color="default" data-testid="badge">
        Default
      </StatusDot>
    )
    expect(screen.getByTestId('badge').className).toContain('text-text-primary')
  })

  it('standard: success color applies bg and foreground text', () => {
    render(
      <StatusDot variant="standard" color="success" data-testid="badge">
        Online
      </StatusDot>
    )
    const cls = screen.getByTestId('badge').className
    expect(cls).toContain('bg-success')
    expect(cls).toContain('text-success-foreground')
  })

  it('standard: error color', () => {
    render(
      <StatusDot variant="standard" color="error" data-testid="badge">
        Error
      </StatusDot>
    )
    const cls = screen.getByTestId('badge').className
    expect(cls).toContain('bg-error')
    expect(cls).toContain('text-error-foreground')
  })

  it('standard: warning color', () => {
    render(
      <StatusDot variant="standard" color="warning" data-testid="badge">
        Warning
      </StatusDot>
    )
    expect(screen.getByTestId('badge').className).toContain('bg-warning')
  })

  it('standard: info color', () => {
    render(
      <StatusDot variant="standard" color="info" data-testid="badge">
        Info
      </StatusDot>
    )
    expect(screen.getByTestId('badge').className).toContain('bg-info')
  })

  it('standard: primary color', () => {
    render(
      <StatusDot variant="standard" color="primary" data-testid="badge">
        Primary
      </StatusDot>
    )
    expect(screen.getByTestId('badge').className).toContain('bg-primary')
  })

  it('standard: secondary color', () => {
    render(
      <StatusDot variant="standard" color="secondary" data-testid="badge">
        Secondary
      </StatusDot>
    )
    expect(screen.getByTestId('badge').className).toContain('bg-secondary')
  })
})
