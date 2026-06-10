import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MdClose } from 'react-icons/md'

import { ButtonDefaultIcon } from './button-default-icon'

describe('ButtonDefaultIcon', () => {
  it('renders without throwing', () => {
    render(
      <ButtonDefaultIcon aria-label="close">
        <MdClose />
      </ButtonDefaultIcon>
    )
    expect(screen.getByRole('button', { name: 'close' })).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(
      <ButtonDefaultIcon aria-label="close" disabled>
        <MdClose />
      </ButtonDefaultIcon>
    )
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows spinner, disables, and sets aria-busy when loading', () => {
    render(
      <ButtonDefaultIcon aria-label="close" loading>
        <MdClose />
      </ButtonDefaultIcon>
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button.querySelector('.animate-spin')).not.toBeNull()
  })

  it('replaces icon with spinner when loading', () => {
    render(
      <ButtonDefaultIcon aria-label="close" loading>
        <span data-testid="icon" />
      </ButtonDefaultIcon>
    )
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
    expect(screen.getByRole('button').querySelector('.animate-spin')).not.toBeNull()
  })

  it('renders as child element when asChild is true', () => {
    render(
      <ButtonDefaultIcon asChild>
        <a href="/test" aria-label="close">
          <MdClose />
        </a>
      </ButtonDefaultIcon>
    )
    const link = screen.getByRole('link', { name: 'close' })
    expect(link).toBeInTheDocument()
    expect(link.tagName).toBe('A')
  })

  it('applies primary color classes by default', () => {
    render(
      <ButtonDefaultIcon aria-label="close">
        <MdClose />
      </ButtonDefaultIcon>
    )
    expect(screen.getByRole('button').className).toContain('bg-primary')
  })

  it('applies secondary color classes when color="secondary"', () => {
    render(
      <ButtonDefaultIcon aria-label="close" color="secondary">
        <MdClose />
      </ButtonDefaultIcon>
    )
    expect(screen.getByRole('button').className).toContain('bg-action')
  })

  it('applies disabled classes when disabled', () => {
    render(
      <ButtonDefaultIcon aria-label="close" disabled>
        <MdClose />
      </ButtonDefaultIcon>
    )
    expect(screen.getByRole('button').className).toContain('disabled:bg-action-disabled-bg')
  })

  it('applies md size class by default', () => {
    render(
      <ButtonDefaultIcon aria-label="close">
        <MdClose />
      </ButtonDefaultIcon>
    )
    expect(screen.getByRole('button').className).toContain('size-8')
  })

  it('applies lg size class when size="lg"', () => {
    render(
      <ButtonDefaultIcon aria-label="close" size="lg">
        <MdClose />
      </ButtonDefaultIcon>
    )
    expect(screen.getByRole('button').className).toContain('size-[38px]')
  })

  it('applies focused border-radius override for lg', () => {
    render(
      <ButtonDefaultIcon aria-label="close" size="lg">
        <MdClose />
      </ButtonDefaultIcon>
    )
    expect(screen.getByRole('button').className).toContain('focus-visible:rounded-[6px]')
  })
})
