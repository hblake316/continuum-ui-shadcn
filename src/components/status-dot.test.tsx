import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { StatusDot } from './status-dot'

describe('StatusDot', () => {
  it('maps online to bg-success', () => {
    render(<StatusDot status="online" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('bg-success')
  })

  it('maps success to bg-success', () => {
    render(<StatusDot status="success" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('bg-success')
  })

  it('maps offline to bg-error', () => {
    render(<StatusDot status="offline" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('bg-error')
  })

  it('maps error to bg-error', () => {
    render(<StatusDot status="error" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('bg-error')
  })

  it('maps degraded to bg-warning', () => {
    render(<StatusDot status="degraded" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('bg-warning')
  })

  it('maps warning to bg-warning', () => {
    render(<StatusDot status="warning" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('bg-warning')
  })

  it('maps info to bg-info', () => {
    render(<StatusDot status="info" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('bg-info')
  })

  it('adds animate-pulse when pulse is true', () => {
    render(<StatusDot status="online" pulse data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('animate-pulse')
  })

  it('does not add animate-pulse by default', () => {
    render(<StatusDot status="online" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).not.toContain('animate-pulse')
  })

  it('uses size-2 by default', () => {
    render(<StatusDot status="online" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('size-2')
    expect(screen.getByTestId('dot').className).not.toContain('size-2.5')
  })

  it('uses size-2.5 when size="md"', () => {
    render(<StatusDot status="online" size="md" data-testid="dot" />)
    expect(screen.getByTestId('dot').className).toContain('size-2.5')
  })

  it('sets aria-hidden="true"', () => {
    render(<StatusDot status="online" data-testid="dot" />)
    expect(screen.getByTestId('dot')).toHaveAttribute('aria-hidden', 'true')
  })
})
