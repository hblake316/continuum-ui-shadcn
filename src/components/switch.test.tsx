import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Switch } from './switch'

describe('Switch', () => {
  it('renders the switch input', () => {
    render(<Switch aria-label="toggle" />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('renders label text when label prop is provided', () => {
    render(<Switch label="Enable feature" />)
    expect(screen.getByText('Enable feature')).toBeInTheDocument()
  })

  it('renders no label text when label prop is omitted', () => {
    const { container } = render(<Switch aria-label="toggle" />)
    expect(container.querySelector('span.text-base')).toBeNull()
  })

  it('marks the switch as disabled when disabled prop is true', () => {
    render(<Switch aria-label="toggle" disabled />)
    expect(screen.getByRole('switch')).toBeDisabled()
  })

  it('track span has aria-hidden', () => {
    const { container } = render(<Switch aria-label="toggle" />)
    // The track is the first span inside the switch root
    const track = container.querySelector('button > span')
    expect(track).toHaveAttribute('aria-hidden', 'true')
  })

  it('switch root has focus-visible ring classes', () => {
    render(<Switch aria-label="toggle" />)
    expect(screen.getByRole('switch').className).toContain('focus-visible:ring-2')
    expect(screen.getByRole('switch').className).toContain('focus-visible:ring-primary-focus-ring')
  })

  it('applies md size classes by default', () => {
    render(<Switch aria-label="toggle" />)
    expect(screen.getByRole('switch').className).toContain('w-12')
    expect(screen.getByRole('switch').className).toContain('h-8')
  })

  it('applies lg size classes when size="lg"', () => {
    render(<Switch aria-label="toggle" size="lg" />)
    expect(screen.getByRole('switch').className).toContain('w-[58px]')
    expect(screen.getByRole('switch').className).toContain('h-[38px]')
  })

  it('applies sm size classes when size="sm"', () => {
    render(<Switch aria-label="toggle" size="sm" />)
    expect(screen.getByRole('switch').className).toContain('w-9')
    expect(screen.getByRole('switch').className).toContain('h-[26px]')
  })

  it('applies primary color track classes by default', () => {
    const { container } = render(<Switch aria-label="toggle" />)
    const track = container.querySelector('button > span')
    expect(track?.className).toContain('group-data-[state=checked]:bg-primary')
  })

  it('applies secondary color track classes when color="secondary"', () => {
    const { container } = render(<Switch aria-label="toggle" color="secondary" />)
    const track = container.querySelector('button > span')
    expect(track?.className).toContain('group-data-[state=checked]:bg-secondary')
  })

  it('applies disabled track classes when disabled', () => {
    const { container } = render(<Switch aria-label="toggle" disabled />)
    const track = container.querySelector('button > span')
    expect(track?.className).toContain('bg-disabled-text')
    expect(track?.className).toContain('opacity-50')
  })
})
