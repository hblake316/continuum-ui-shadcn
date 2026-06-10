import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'

import { ButtonGhost } from './button-ghost'

describe('ButtonGhost', () => {
  it('renders without throwing', () => {
    render(<ButtonGhost>Click me</ButtonGhost>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies className override', () => {
    render(<ButtonGhost className="my-custom-class">Click</ButtonGhost>)
    expect(screen.getByRole('button')).toHaveClass('my-custom-class')
  })

  it('applies primary variant classes', () => {
    render(<ButtonGhost variant="primary">Primary</ButtonGhost>)
    expect(screen.getByRole('button')).toHaveClass('text-primary')
  })

  it('applies secondary variant classes', () => {
    render(<ButtonGhost variant="secondary">Secondary</ButtonGhost>)
    expect(screen.getByRole('button')).toHaveClass('text-action')
  })

  it('applies size classes', () => {
    const sizeClassMap = { lg: 'h-[38px]', md: 'h-8', sm: 'h-[26px]' } as const
    for (const [size, cls] of Object.entries(sizeClassMap) as [
      keyof typeof sizeClassMap,
      string,
    ][]) {
      const { unmount } = render(<ButtonGhost size={size}>Btn</ButtonGhost>)
      expect(screen.getByRole('button')).toHaveClass(cls)
      unmount()
    }
  })

  it('renders leftIcon', () => {
    render(<ButtonGhost leftIcon={<span data-testid="left-icon" />}>Label</ButtonGhost>)
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })

  it('renders rightIcon', () => {
    render(<ButtonGhost rightIcon={<span data-testid="right-icon" />}>Label</ButtonGhost>)
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  it('shows spinner, disables, and sets aria-busy when loading', () => {
    render(<ButtonGhost loading>Saving</ButtonGhost>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button.querySelector('.animate-spin')).not.toBeNull()
  })

  it('hides leftIcon when loading', () => {
    render(
      <ButtonGhost loading leftIcon={<span data-testid="left-icon" />}>
        Saving
      </ButtonGhost>
    )
    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument()
  })

  it('hides rightIcon when loading', () => {
    render(
      <ButtonGhost loading rightIcon={<span data-testid="right-icon" />}>
        Saving
      </ButtonGhost>
    )
    expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<ButtonGhost disabled>Nope</ButtonGhost>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('calls onClick handler', () => {
    const onClick = vi.fn()
    render(<ButtonGhost onClick={onClick}>Click</ButtonGhost>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders as child element when asChild is true', () => {
    render(
      <ButtonGhost asChild>
        <a href="/test">Link</a>
      </ButtonGhost>
    )
    const link = screen.getByRole('link', { name: 'Link' })
    expect(link).toBeInTheDocument()
    expect(link.tagName).toBe('A')
  })
})
