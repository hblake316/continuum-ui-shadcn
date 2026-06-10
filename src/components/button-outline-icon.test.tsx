import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MdClose } from 'react-icons/md'

import { ButtonOutlineIcon } from './button-outline-icon'

describe('ButtonOutlineIcon', () => {
  it('renders without throwing', () => {
    render(
      <ButtonOutlineIcon aria-label="close">
        <MdClose />
      </ButtonOutlineIcon>
    )
    expect(screen.getByRole('button', { name: 'close' })).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(
      <ButtonOutlineIcon aria-label="close" disabled>
        <MdClose />
      </ButtonOutlineIcon>
    )
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows spinner, disables, and sets aria-busy when loading', () => {
    render(
      <ButtonOutlineIcon aria-label="close" loading>
        <MdClose />
      </ButtonOutlineIcon>
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button.querySelector('.animate-spin')).not.toBeNull()
  })

  it('replaces icon with spinner when loading', () => {
    render(
      <ButtonOutlineIcon aria-label="close" loading>
        <span data-testid="icon" />
      </ButtonOutlineIcon>
    )
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
    expect(screen.getByRole('button').querySelector('.animate-spin')).not.toBeNull()
  })

  it('renders as child element when asChild is true', () => {
    render(
      <ButtonOutlineIcon asChild>
        <a href="/test" aria-label="close">
          <MdClose />
        </a>
      </ButtonOutlineIcon>
    )
    const link = screen.getByRole('link', { name: 'close' })
    expect(link).toBeInTheDocument()
    expect(link.tagName).toBe('A')
  })

  // ── Border (always present) ───────────────────────────────────────────────

  it('always has a border class', () => {
    render(
      <ButtonOutlineIcon aria-label="close">
        <MdClose />
      </ButtonOutlineIcon>
    )
    expect(screen.getByRole('button').className).toContain('border')
  })

  it('applies hairline disabled border classes', () => {
    render(
      <ButtonOutlineIcon aria-label="close" disabled>
        <MdClose />
      </ButtonOutlineIcon>
    )
    const cls = screen.getByRole('button').className
    expect(cls).toContain('disabled:border-[0.5px]')
    expect(cls).toContain('disabled:border-outline-border')
  })

  // ── Color variants ────────────────────────────────────────────────────────

  it('applies primary border and background by default', () => {
    render(
      <ButtonOutlineIcon aria-label="close">
        <MdClose />
      </ButtonOutlineIcon>
    )
    const cls = screen.getByRole('button').className
    expect(cls).toContain('bg-background-paper')
    expect(cls).toContain('border-primary-focus-ring')
    expect(cls).toContain('text-primary')
  })

  it('applies secondary border and background when color="secondary"', () => {
    render(
      <ButtonOutlineIcon aria-label="close" color="secondary">
        <MdClose />
      </ButtonOutlineIcon>
    )
    const cls = screen.getByRole('button').className
    expect(cls).toContain('bg-background-paper')
    expect(cls).toContain('border-action')
    expect(cls).toContain('text-action')
  })

  // ── Size variants ─────────────────────────────────────────────────────────

  it('applies md size class by default', () => {
    render(
      <ButtonOutlineIcon aria-label="close">
        <MdClose />
      </ButtonOutlineIcon>
    )
    expect(screen.getByRole('button').className).toContain('size-8')
  })

  it('applies lg size class when size="lg"', () => {
    render(
      <ButtonOutlineIcon aria-label="close" size="lg">
        <MdClose />
      </ButtonOutlineIcon>
    )
    expect(screen.getByRole('button').className).toContain('size-[38px]')
  })

  it('applies sm size class when size="sm"', () => {
    render(
      <ButtonOutlineIcon aria-label="close" size="sm">
        <MdClose />
      </ButtonOutlineIcon>
    )
    expect(screen.getByRole('button').className).toContain('size-[26px]')
  })

  it('applies xs size class when size="xs"', () => {
    render(
      <ButtonOutlineIcon aria-label="close" size="xs">
        <MdClose />
      </ButtonOutlineIcon>
    )
    expect(screen.getByRole('button').className).toContain('size-4')
  })

  // ── Focus ring ────────────────────────────────────────────────────────────

  it('applies 2px focused border class', () => {
    render(
      <ButtonOutlineIcon aria-label="close">
        <MdClose />
      </ButtonOutlineIcon>
    )
    expect(screen.getByRole('button').className).toContain('focus-visible:border-2')
  })

  it('applies 1.5px focused border for xs size', () => {
    render(
      <ButtonOutlineIcon aria-label="close" size="xs">
        <MdClose />
      </ButtonOutlineIcon>
    )
    expect(screen.getByRole('button').className).toContain('focus-visible:border-[1.5px]')
  })

  it('applies 6px focused border-radius for lg size', () => {
    render(
      <ButtonOutlineIcon aria-label="close" size="lg">
        <MdClose />
      </ButtonOutlineIcon>
    )
    expect(screen.getByRole('button').className).toContain('focus-visible:rounded-[6px]')
  })
})
