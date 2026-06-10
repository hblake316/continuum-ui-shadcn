import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MdClose } from 'react-icons/md'

import { ButtonGhostIcon } from './button-ghost-icon'

describe('ButtonGhostIcon', () => {
  it('renders without throwing', () => {
    render(
      <ButtonGhostIcon aria-label="close">
        <MdClose />
      </ButtonGhostIcon>
    )
    expect(screen.getByRole('button', { name: 'close' })).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(
      <ButtonGhostIcon aria-label="close" disabled>
        <MdClose />
      </ButtonGhostIcon>
    )
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows spinner, disables, and sets aria-busy when loading', () => {
    render(
      <ButtonGhostIcon aria-label="close" loading>
        <MdClose />
      </ButtonGhostIcon>
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button.querySelector('.animate-spin')).not.toBeNull()
  })

  it('replaces icon with spinner when loading', () => {
    render(
      <ButtonGhostIcon aria-label="close" loading>
        <span data-testid="icon" />
      </ButtonGhostIcon>
    )
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
    expect(screen.getByRole('button').querySelector('.animate-spin')).not.toBeNull()
  })

  it('renders as child element when asChild is true', () => {
    render(
      <ButtonGhostIcon asChild>
        <a href="/test" aria-label="close">
          <MdClose />
        </a>
      </ButtonGhostIcon>
    )
    const link = screen.getByRole('link', { name: 'close' })
    expect(link).toBeInTheDocument()
    expect(link.tagName).toBe('A')
  })

  // ── No border ─────────────────────────────────────────────────────────────

  it('has no border class', () => {
    render(
      <ButtonGhostIcon aria-label="close">
        <MdClose />
      </ButtonGhostIcon>
    )
    expect(screen.getByRole('button').className).not.toContain('border')
  })

  // ── Color variants ────────────────────────────────────────────────────────

  it('applies primary text color by default', () => {
    render(
      <ButtonGhostIcon aria-label="close">
        <MdClose />
      </ButtonGhostIcon>
    )
    expect(screen.getByRole('button').className).toContain('text-primary')
  })

  it('applies secondary text color when color="secondary"', () => {
    render(
      <ButtonGhostIcon aria-label="close" color="secondary">
        <MdClose />
      </ButtonGhostIcon>
    )
    expect(screen.getByRole('button').className).toContain('text-action')
  })

  it('applies disabled text color when disabled', () => {
    render(
      <ButtonGhostIcon aria-label="close" disabled>
        <MdClose />
      </ButtonGhostIcon>
    )
    expect(screen.getByRole('button').className).toContain('disabled:text-disabled-text')
  })

  // ── Hover / focus tint ────────────────────────────────────────────────────

  it('applies primary hover tint class', () => {
    render(
      <ButtonGhostIcon aria-label="close">
        <MdClose />
      </ButtonGhostIcon>
    )
    expect(screen.getByRole('button').className).toContain('hover:bg-primary-hover-subtle')
  })

  it('applies secondary hover tint class', () => {
    render(
      <ButtonGhostIcon aria-label="close" color="secondary">
        <MdClose />
      </ButtonGhostIcon>
    )
    expect(screen.getByRole('button').className).toContain('hover:bg-action-hover-subtle')
  })

  it('applies primary focus tint class', () => {
    render(
      <ButtonGhostIcon aria-label="close">
        <MdClose />
      </ButtonGhostIcon>
    )
    expect(screen.getByRole('button').className).toContain('focus-visible:bg-primary-focus')
  })

  it('applies secondary focus tint class', () => {
    render(
      <ButtonGhostIcon aria-label="close" color="secondary">
        <MdClose />
      </ButtonGhostIcon>
    )
    expect(screen.getByRole('button').className).toContain('focus-visible:bg-action-focus')
  })

  // ── Size variants ─────────────────────────────────────────────────────────

  it('applies md size class by default', () => {
    render(
      <ButtonGhostIcon aria-label="close">
        <MdClose />
      </ButtonGhostIcon>
    )
    expect(screen.getByRole('button').className).toContain('size-8')
  })

  it('applies lg size class when size="lg"', () => {
    render(
      <ButtonGhostIcon aria-label="close" size="lg">
        <MdClose />
      </ButtonGhostIcon>
    )
    expect(screen.getByRole('button').className).toContain('size-[38px]')
  })

  it('applies sm size class when size="sm"', () => {
    render(
      <ButtonGhostIcon aria-label="close" size="sm">
        <MdClose />
      </ButtonGhostIcon>
    )
    expect(screen.getByRole('button').className).toContain('size-[26px]')
  })

  it('applies xs size class when size="xs"', () => {
    render(
      <ButtonGhostIcon aria-label="close" size="xs">
        <MdClose />
      </ButtonGhostIcon>
    )
    expect(screen.getByRole('button').className).toContain('size-4')
  })

  it('applies 6px focused border-radius for lg size', () => {
    render(
      <ButtonGhostIcon aria-label="close" size="lg">
        <MdClose />
      </ButtonGhostIcon>
    )
    expect(screen.getByRole('button').className).toContain('focus-visible:rounded-[6px]')
  })
})
