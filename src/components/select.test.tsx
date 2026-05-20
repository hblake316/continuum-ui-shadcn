import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import { Select } from './select'

const OPTIONS = [
  { value: 'a', label: 'Apple' },
  { value: 'b', label: 'Banana' },
  { value: 'c', label: 'Cherry' },
]

describe('Select', () => {
  const defaultProps = {
    label: 'Fruit',
    value: 'b',
    options: OPTIONS,
    onChange: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders the selected option label in the trigger', () => {
      render(<Select {...defaultProps} />)
      const trigger = screen.getByRole('button', { name: /fruit/i })
      expect(trigger).toHaveTextContent('Banana')
    })

    it('renders the placeholder when no option matches value', () => {
      render(<Select {...defaultProps} value="" placeholder="Pick one" />)
      expect(screen.getByRole('button', { name: /fruit/i })).toHaveTextContent('Pick one')
    })

    it('renders the required asterisk when required', () => {
      render(<Select {...defaultProps} required />)
      const label = screen.getByText('Fruit')
      // The asterisk is rendered as a separate span inside the label
      expect(label).toHaveTextContent('*')
    })

    it('omits the label element when no label prop is provided', () => {
      render(<Select {...defaultProps} label={undefined} ariaLabel="Pick a fruit" />)
      expect(screen.queryByText('Fruit')).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: /pick a fruit/i })).toBeInTheDocument()
    })

    it('applies sm size class config when size="sm"', () => {
      render(<Select {...defaultProps} size="sm" />)
      expect(screen.getByRole('button', { name: /fruit/i })).toHaveClass('h-8')
    })

    it('applies md size class config by default', () => {
      render(<Select {...defaultProps} />)
      expect(screen.getByRole('button', { name: /fruit/i })).toHaveClass('h-10')
    })
  })

  describe('interactions', () => {
    it('opens the menu when the trigger is clicked', () => {
      render(<Select {...defaultProps} />)
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: /fruit/i }))
      expect(screen.getByRole('listbox')).toBeInTheDocument()
      expect(screen.getAllByRole('option')).toHaveLength(3)
    })

    it('marks the option matching value as aria-selected', () => {
      render(<Select {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: /fruit/i }))
      const selected = screen.getByRole('option', { selected: true })
      expect(selected).toHaveTextContent('Banana')
    })

    it('calls onChange with the chosen value and closes the menu when an option is clicked', () => {
      render(<Select {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: /fruit/i }))
      fireEvent.click(screen.getByRole('option', { name: 'Cherry' }))
      expect(defaultProps.onChange).toHaveBeenCalledTimes(1)
      expect(defaultProps.onChange).toHaveBeenCalledWith('c')
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  describe('disabled', () => {
    it('does not open the menu when disabled and the trigger is clicked', () => {
      render(<Select {...defaultProps} disabled />)
      const trigger = screen.getByRole('button', { name: /fruit/i })
      expect(trigger).toBeDisabled()
      fireEvent.click(trigger)
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })
})
