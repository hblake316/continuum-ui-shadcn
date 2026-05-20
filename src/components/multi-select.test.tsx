import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import { MultiSelect } from './multi-select'

const OPTIONS = [
  { value: 'a', label: 'Apple' },
  { value: 'b', label: 'Banana' },
  { value: 'c', label: 'Cherry' },
]

describe('MultiSelect', () => {
  const defaultProps = {
    label: 'Fruit',
    value: [] as string[],
    options: OPTIONS,
    onChange: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('summary rendering', () => {
    it('shows the placeholder when nothing is selected', () => {
      render(<MultiSelect {...defaultProps} placeholder="Pick fruit" />)
      expect(screen.getByRole('button', { name: /fruit/i })).toHaveTextContent('Pick fruit')
    })

    it("shows the option's label when exactly one is selected", () => {
      render(<MultiSelect {...defaultProps} value={['b']} />)
      expect(screen.getByRole('button', { name: /fruit/i })).toHaveTextContent('Banana')
    })

    it('shows "N selected" when more than one is selected', () => {
      render(<MultiSelect {...defaultProps} value={['a', 'c']} />)
      expect(screen.getByRole('button', { name: /fruit/i })).toHaveTextContent('2 selected')
    })

    it('uses renderValue when provided', () => {
      render(
        <MultiSelect
          {...defaultProps}
          value={['a', 'c']}
          renderValue={(selected) => selected.map((s) => s.label).join(' + ')}
        />
      )
      expect(screen.getByRole('button', { name: /fruit/i })).toHaveTextContent('Apple + Cherry')
    })
  })

  describe('interactions', () => {
    it('opens the menu with one option per checkbox', () => {
      render(<MultiSelect {...defaultProps} />)
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: /fruit/i }))
      const listbox = screen.getByRole('listbox')
      expect(listbox).toHaveAttribute('aria-multiselectable')
      expect(screen.getAllByRole('checkbox')).toHaveLength(3)
    })

    it('adds an unchecked option and preserves options order', () => {
      render(<MultiSelect {...defaultProps} value={['c']} />)
      fireEvent.click(screen.getByRole('button', { name: /fruit/i }))
      fireEvent.click(screen.getByRole('checkbox', { name: 'Apple' }))
      expect(defaultProps.onChange).toHaveBeenCalledWith(['a', 'c'])
    })

    it('removes a checked option', () => {
      render(<MultiSelect {...defaultProps} value={['a', 'b']} />)
      fireEvent.click(screen.getByRole('button', { name: /fruit/i }))
      fireEvent.click(screen.getByRole('checkbox', { name: 'Apple' }))
      expect(defaultProps.onChange).toHaveBeenCalledWith(['b'])
    })

    it('keeps the menu open across multiple toggles', () => {
      render(<MultiSelect {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: /fruit/i }))
      fireEvent.click(screen.getByRole('checkbox', { name: 'Apple' }))
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })
  })

  describe('disabled', () => {
    it('does not open the menu when disabled', () => {
      render(<MultiSelect {...defaultProps} disabled />)
      const trigger = screen.getByRole('button', { name: /fruit/i })
      expect(trigger).toBeDisabled()
      fireEvent.click(trigger)
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })
})
