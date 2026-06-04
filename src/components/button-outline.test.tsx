import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'

import { ButtonOutline } from './button-outline'

describe('ButtonOutline', () => {
  it('renders without throwing', () => {
    render(<ButtonOutline>Click me</ButtonOutline>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies className override', () => {
    render(<ButtonOutline className="my-custom-class">Click</ButtonOutline>)
    expect(screen.getByRole('button')).toHaveClass('my-custom-class')
  })

  it('renders both variants without throwing', () => {
    const { unmount } = render(<ButtonOutline variant="primary">Primary</ButtonOutline>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    unmount()

    render(<ButtonOutline variant="secondary">Secondary</ButtonOutline>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders all sizes without throwing', () => {
    const sizes = ['lg', 'md', 'sm', 'xs'] as const
    for (const size of sizes) {
      const { unmount } = render(<ButtonOutline size={size}>Btn</ButtonOutline>)
      expect(screen.getByRole('button')).toBeInTheDocument()
      unmount()
    }
  })

  it('renders leftIcon', () => {
    render(<ButtonOutline leftIcon={<span data-testid="left-icon" />}>Label</ButtonOutline>)
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })

  it('renders rightIcon', () => {
    render(<ButtonOutline rightIcon={<span data-testid="right-icon" />}>Label</ButtonOutline>)
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  it('does not render icon wrappers when no icons are provided', () => {
    render(<ButtonOutline>Label</ButtonOutline>)
    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument()
    expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<ButtonOutline disabled>Nope</ButtonOutline>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('calls onClick handler', () => {
    const onClick = vi.fn()
    render(<ButtonOutline onClick={onClick}>Click</ButtonOutline>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn()
    render(
      <ButtonOutline disabled onClick={onClick}>
        Nope
      </ButtonOutline>
    )
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
