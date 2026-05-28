import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Chip } from './chip'

describe('Chip', () => {
  it('renders chip content', () => {
    render(<Chip>Label</Chip>)
    expect(screen.getByText('Label')).toBeInTheDocument()
  })

  it('does not render a delete button when onDelete is not provided', () => {
    render(<Chip>Label</Chip>)
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('renders a delete button when onDelete is provided', () => {
    render(<Chip onDelete={() => {}}>Label</Chip>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('uses "Remove" as the default delete button aria-label', () => {
    render(<Chip onDelete={() => {}}>Label</Chip>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Remove')
  })

  it('uses onDeleteAriaLabel when provided', () => {
    render(
      <Chip onDelete={() => {}} onDeleteAriaLabel="Remove filter">
        Label
      </Chip>
    )
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Remove filter')
  })

  it('falls back to "Remove" when onDeleteAriaLabel is an empty string', () => {
    render(
      <Chip onDelete={() => {}} onDeleteAriaLabel="">
        Label
      </Chip>
    )
    // || treats empty string as falsy so "" falls back to "Remove"
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Remove')
  })
})
