import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { RadioGroup, RadioGroupItem } from './radio-group'

describe('RadioGroup', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  it('renders a radiogroup role', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" />
      </RadioGroup>
    )
    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
  })

  it('renders radio items', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" />
      </RadioGroup>
    )
    expect(screen.getAllByRole('radio')).toHaveLength(2)
  })

  it('renders the group label as a legend', () => {
    const { container } = render(
      <RadioGroup label="Pick one">
        <RadioGroupItem value="a" />
      </RadioGroup>
    )
    expect(container.querySelector('legend')?.textContent).toBe('Pick one')
  })

  it('renders description text when provided', () => {
    render(
      <RadioGroup label="Pick one" description="Choose carefully.">
        <RadioGroupItem value="a" />
      </RadioGroup>
    )
    expect(screen.getByText('Choose carefully.')).toBeInTheDocument()
  })

  it('renders error message when error prop is provided', () => {
    render(
      <RadioGroup error="Selection required">
        <RadioGroupItem value="a" />
      </RadioGroup>
    )
    expect(screen.getByText('Selection required')).toBeInTheDocument()
  })

  it('renders no error message when error prop is omitted', () => {
    render(
      <RadioGroup label="Pick one">
        <RadioGroupItem value="a" />
      </RadioGroup>
    )
    expect(screen.queryByText(/required/i)).toBeNull()
  })

  // ── Label ────────────────────────────────────────────────────────────────

  it('renders item label text', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="Option A" />
      </RadioGroup>
    )
    expect(screen.getByText('Option A')).toBeInTheDocument()
  })

  it('renders no label span when item label is omitted', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" aria-label="option a" />
      </RadioGroup>
    )
    const radio = screen.getByRole('radio')
    expect(radio.closest('label')?.querySelector(':scope > span')).toBeNull()
  })

  // ── Item description ─────────────────────────────────────────────────────

  it('renders item description text when provided', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="Option A" description="Hint for option A." />
      </RadioGroup>
    )
    expect(screen.getByText('Hint for option A.')).toBeInTheDocument()
  })

  it('applies secondary color to item description', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="Option A" description="Hint text" />
      </RadioGroup>
    )
    expect(screen.getByText('Hint text').className).toContain('text-text-secondary')
  })

  it('aligns label wrapper to top when description is present', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="Option A" description="Hint text" />
      </RadioGroup>
    )
    const wrapper = screen.getByRole('radio').closest('label')
    expect(wrapper?.className).toContain('items-start')
  })

  // ── Invalid state ────────────────────────────────────────────────────────

  it('applies error color to legend when error prop is set', () => {
    const { container } = render(
      <RadioGroup label="Pick one" error="Required">
        <RadioGroupItem value="a" />
      </RadioGroup>
    )
    expect(container.querySelector('legend')?.className).toContain('text-error')
  })

  it('applies primary color to legend when no error', () => {
    const { container } = render(
      <RadioGroup label="Pick one">
        <RadioGroupItem value="a" />
      </RadioGroup>
    )
    expect(container.querySelector('legend')?.className).toContain('text-text-primary')
  })

  it('applies error label color when item color="invalid"', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="Option A" color="invalid" />
      </RadioGroup>
    )
    const labelSpan = screen.getByText('Option A')
    expect(labelSpan.className).toContain('text-error')
  })

  it('applies primary label color when item color="default"', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="Option A" color="default" />
      </RadioGroup>
    )
    expect(screen.getByText('Option A').className).toContain('text-text-primary')
  })

  // ── Disabled ─────────────────────────────────────────────────────────────

  it('marks a radio item as disabled', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="Option A" disabled />
      </RadioGroup>
    )
    expect(screen.getByRole('radio')).toBeDisabled()
  })

  it('applies pointer-events-none to item label wrapper when disabled', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="Option A" disabled />
      </RadioGroup>
    )
    const wrapper = screen.getByRole('radio').closest('label')
    expect(wrapper?.className).toContain('pointer-events-none')
  })

  it('applies disabled text color to item label when disabled', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="Option A" disabled />
      </RadioGroup>
    )
    expect(screen.getByText('Option A').className).toContain('text-disabled-text')
  })

  it('applies disabled text color to selected icon when disabled', () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" label="Option A" disabled />
      </RadioGroup>
    )
    const svgs = screen.getByRole('radio').querySelectorAll('svg')
    svgs.forEach((svg) => {
      expect(svg.getAttribute('class')).toContain('text-disabled-text')
    })
  })

  // ── Interaction ───────────────────────────────────────────────────────────

  it('calls onValueChange when a radio item is clicked', () => {
    const onValueChange = vi.fn()
    render(
      <RadioGroup onValueChange={onValueChange}>
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" />
      </RadioGroup>
    )
    fireEvent.click(screen.getAllByRole('radio')[1])
    expect(onValueChange).toHaveBeenCalledWith('b')
  })

  it('does not call onValueChange when item is disabled', () => {
    const onValueChange = vi.fn()
    render(
      <RadioGroup onValueChange={onValueChange}>
        <RadioGroupItem value="a" label="Option A" disabled />
      </RadioGroup>
    )
    fireEvent.click(screen.getByRole('radio'))
    expect(onValueChange).not.toHaveBeenCalled()
  })

  // ── Layout ────────────────────────────────────────────────────────────────

  it('applies 20×20 size to radio item', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" aria-label="a" />
      </RadioGroup>
    )
    expect(screen.getByRole('radio').className).toContain('size-5')
  })

  it('applies 8px gap between icon and label', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="Option A" />
      </RadioGroup>
    )
    const wrapper = screen.getByRole('radio').closest('label')
    expect(wrapper?.className).toContain('gap-2')
  })
})
