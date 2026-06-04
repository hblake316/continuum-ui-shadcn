import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'

import { Button } from './button'

describe('Button', () => {
  it('renders without throwing', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies className override', () => {
    render(<Button className="my-custom-class">Click</Button>)
    expect(screen.getByRole('button')).toHaveClass('my-custom-class')
  })

  it('renders variant classes', () => {
    const { unmount } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    unmount()

    render(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders all sizes without throwing', () => {
    const sizes = ['lg', 'md', 'sm', 'xs'] as const
    for (const size of sizes) {
      const { unmount } = render(<Button size={size}>Btn</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
      unmount()
    }
  })

  it('renders leftIcon', () => {
    render(<Button leftIcon={<span data-testid="left-icon" />}>Label</Button>)
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })

  it('renders rightIcon', () => {
    render(<Button rightIcon={<span data-testid="right-icon" />}>Label</Button>)
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  it('shows spinner and disables when loading', () => {
    render(<Button loading>Saving</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button.querySelector('.animate-spin')).not.toBeNull()
  })

  it('hides leftIcon when loading', () => {
    render(
      <Button loading leftIcon={<span data-testid="left-icon" />}>
        Saving
      </Button>,
    )
    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Nope</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('calls onClick handler', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders as child element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>,
    )
    const link = screen.getByRole('link', { name: 'Link' })
    expect(link).toBeInTheDocument()
    expect(link.tagName).toBe('A')
  })
})
