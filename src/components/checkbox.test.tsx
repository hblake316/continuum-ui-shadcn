import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Checkbox } from './checkbox'

describe('Checkbox', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  it('renders a checkbox role', () => {
    render(<Checkbox aria-label="accept" />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('renders label text when label prop is provided', () => {
    render(<Checkbox label="Accept terms and conditions" />)
    expect(screen.getByText('Accept terms and conditions')).toBeInTheDocument()
  })

  it('renders no label span when label prop is omitted', () => {
    const { container } = render(<Checkbox aria-label="accept" />)
    expect(container.querySelector('label > span')).toBeNull()
  })

  it('forwards extra props to the checkbox root', () => {
    render(<Checkbox aria-label="accept" data-testid="cb" />)
    expect(screen.getByTestId('cb')).toBeInTheDocument()
  })

  // ── Checked states ────────────────────────────────────────────────────────

  it('sets aria-checked when checked=true', () => {
    render(<Checkbox aria-label="accept" checked />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
  })

  it('sets aria-checked=false when checked=false', () => {
    render(<Checkbox aria-label="accept" checked={false} />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false')
  })

  it('sets aria-checked=mixed for indeterminate', () => {
    render(<Checkbox aria-label="accept" checked="indeterminate" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed')
  })

  // ── Disabled ─────────────────────────────────────────────────────────────

  it('marks the checkbox as disabled', () => {
    render(<Checkbox aria-label="accept" disabled />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('applies pointer-events-none to the label wrapper when disabled', () => {
    const { container } = render(<Checkbox label="Accept" disabled />)
    expect(container.querySelector('label')?.className).toContain('pointer-events-none')
  })

  it('applies disabled text color to label when disabled', () => {
    const { container } = render(<Checkbox label="Accept" disabled />)
    expect(container.querySelector('label > span')?.className).toContain('text-disabled-text')
  })

  it('applies disabled text color to icon when disabled', () => {
    const { container } = render(<Checkbox aria-label="accept" disabled checked />)
    expect(container.querySelector('svg')?.getAttribute('class')).toContain('text-disabled-text')
  })

  // ── Color variants ────────────────────────────────────────────────────────

  it('applies primary icon color when checked and color="primary"', () => {
    const { container } = render(<Checkbox aria-label="accept" color="primary" checked />)
    expect(container.querySelector('svg')?.getAttribute('class')).toContain('text-primary')
  })

  it('applies secondary icon color when checked and color="secondary"', () => {
    const { container } = render(<Checkbox aria-label="accept" color="secondary" checked />)
    expect(container.querySelector('svg')?.getAttribute('class')).toContain('text-text-primary')
  })

  it('applies error icon color when color="invalid" (unchecked)', () => {
    const { container } = render(<Checkbox aria-label="accept" color="invalid" />)
    expect(container.querySelector('svg')?.getAttribute('class')).toContain('text-error')
  })

  it('applies error icon color when color="invalid" and checked', () => {
    const { container } = render(<Checkbox aria-label="accept" color="invalid" checked />)
    expect(container.querySelector('svg')?.getAttribute('class')).toContain('text-error')
  })

  it('applies error label color when color="invalid"', () => {
    const { container } = render(<Checkbox label="Accept" color="invalid" />)
    expect(container.querySelector('label > span')?.className).toContain('text-error')
  })

  // ── Interaction ───────────────────────────────────────────────────────────

  it('calls onCheckedChange when clicked', () => {
    const onCheckedChange = vi.fn()
    render(<Checkbox aria-label="accept" onCheckedChange={onCheckedChange} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onCheckedChange).toHaveBeenCalledTimes(1)
  })

  it('does not call onCheckedChange when disabled', () => {
    const onCheckedChange = vi.fn()
    render(<Checkbox aria-label="accept" disabled onCheckedChange={onCheckedChange} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  // ── Accessibility ─────────────────────────────────────────────────────────

  it('forwards aria-invalid to the checkbox element', () => {
    render(<Checkbox aria-label="accept" aria-invalid />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true')
  })

  // ── Layout ────────────────────────────────────────────────────────────────

  it('has size-6 class on checkbox root', () => {
    render(<Checkbox aria-label="accept" />)
    expect(screen.getByRole('checkbox').className).toContain('size-6')
  })

  it('has gap-2 class on label wrapper', () => {
    const { container } = render(<Checkbox label="Accept" />)
    expect(container.querySelector('label')?.className).toContain('gap-2')
  })
})
