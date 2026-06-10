import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'

import { ButtonDefault } from './button-default'

describe('ButtonDefault', () => {
  it('renders without throwing', () => {
    render(<ButtonDefault>Click me</ButtonDefault>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies className override', () => {
    render(<ButtonDefault className="my-custom-class">Click</ButtonDefault>)
    expect(screen.getByRole('button')).toHaveClass('my-custom-class')
  })

  it('renders variant classes', () => {
    const { unmount } = render(<ButtonDefault variant="primary">Primary</ButtonDefault>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    unmount()

    render(<ButtonDefault variant="secondary">Secondary</ButtonDefault>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders all sizes without throwing', () => {
    const sizes = ['lg', 'md', 'sm', 'xs'] as const
    for (const size of sizes) {
      const { unmount } = render(<ButtonDefault size={size}>Btn</ButtonDefault>)
      expect(screen.getByRole('button')).toBeInTheDocument()
      unmount()
    }
  })

  it('renders leftIcon', () => {
    render(<ButtonDefault leftIcon={<span data-testid="left-icon" />}>Label</ButtonDefault>)
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })

  it('renders rightIcon', () => {
    render(<ButtonDefault rightIcon={<span data-testid="right-icon" />}>Label</ButtonDefault>)
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  it('shows spinner, disables, and sets aria-busy when loading', () => {
    render(<ButtonDefault loading>Saving</ButtonDefault>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button.querySelector('.animate-spin')).not.toBeNull()
  })

  it('hides leftIcon when loading', () => {
    render(
      <ButtonDefault loading leftIcon={<span data-testid="left-icon" />}>
        Saving
      </ButtonDefault>
    )
    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<ButtonDefault disabled>Nope</ButtonDefault>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('calls onClick handler', () => {
    const onClick = vi.fn()
    render(<ButtonDefault onClick={onClick}>Click</ButtonDefault>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders as child element when asChild is true', () => {
    render(
      <ButtonDefault asChild>
        <a href="/test">Link</a>
      </ButtonDefault>
    )
    const link = screen.getByRole('link', { name: 'Link' })
    expect(link).toBeInTheDocument()
    expect(link.tagName).toBe('A')
  })
})
