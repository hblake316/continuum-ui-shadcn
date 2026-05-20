import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import { FormDialog } from './form-dialog'

describe('FormDialog', () => {
  const defaultProps = {
    open: true,
    title: 'Test Title',
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
    children: <p>Dialog content</p>,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders title and children', () => {
      render(<FormDialog {...defaultProps} />)
      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText('Dialog content')).toBeInTheDocument()
    })

    it('renders default confirm and cancel labels', () => {
      render(<FormDialog {...defaultProps} />)
      expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    })

    it('renders custom confirm and cancel labels', () => {
      render(<FormDialog {...defaultProps} confirmLabel="Delete" cancelLabel="Keep" />)
      expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /keep/i })).toBeInTheDocument()
    })

    it('does not render when open is false', () => {
      render(<FormDialog {...defaultProps} open={false} />)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('renders errorMessage below body content', () => {
      render(<FormDialog {...defaultProps} errorMessage="Something went wrong" />)
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })

    it('does not render errorMessage when not provided', () => {
      render(<FormDialog {...defaultProps} />)
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
    })
  })

  describe('interactions', () => {
    it('calls onConfirm when confirm button is clicked', () => {
      render(<FormDialog {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: /confirm/i }))
      expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1)
    })

    it('calls onCancel when cancel button is clicked', () => {
      render(<FormDialog {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: /cancel/i }))
      expect(defaultProps.onCancel).toHaveBeenCalledTimes(1)
    })

    it('calls onCancel when X button is clicked', () => {
      render(<FormDialog {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: /close/i }))
      expect(defaultProps.onCancel).toHaveBeenCalledTimes(1)
    })

    it('calls onCancel when Escape is pressed', () => {
      render(<FormDialog {...defaultProps} />)
      fireEvent.keyDown(document.body, { key: 'Escape' })
      expect(defaultProps.onCancel).toHaveBeenCalledTimes(1)
    })
  })

  describe('loading state', () => {
    it('shows spinner on confirm button', () => {
      render(<FormDialog {...defaultProps} loading />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('disables confirm button', () => {
      render(<FormDialog {...defaultProps} loading />)
      expect(screen.getByRole('button', { name: /confirm/i })).toBeDisabled()
    })

    it('disables cancel button', () => {
      render(<FormDialog {...defaultProps} loading />)
      expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled()
    })

    it('disables X button', () => {
      render(<FormDialog {...defaultProps} loading />)
      expect(screen.getByRole('button', { name: /close/i })).toBeDisabled()
    })

    it('does not call onCancel when Escape is pressed while loading', () => {
      render(<FormDialog {...defaultProps} loading />)
      fireEvent.keyDown(document.body, { key: 'Escape' })
      expect(defaultProps.onCancel).not.toHaveBeenCalled()
    })
  })

  describe('confirmDisabled', () => {
    it('disables confirm button', () => {
      render(<FormDialog {...defaultProps} confirmDisabled />)
      expect(screen.getByRole('button', { name: /confirm/i })).toBeDisabled()
    })

    it('does not disable cancel button', () => {
      render(<FormDialog {...defaultProps} confirmDisabled />)
      expect(screen.getByRole('button', { name: /cancel/i })).not.toBeDisabled()
    })
  })

  // Regression guards for the OpCon design-system footer convention:
  // Cancel appears to the LEFT of the primary action, and the footer is right-aligned.
  // Reverting either of these breaks parity with the Figma source of truth and
  // affects every FormDialog/ConfirmationDialog consumer across products.
  describe('footer layout', () => {
    it('renders Cancel before Confirm in DOM order', () => {
      render(<FormDialog {...defaultProps} />)
      const cancel = screen.getByRole('button', { name: /cancel/i })
      const confirm = screen.getByRole('button', { name: /confirm/i })
      expect(
        cancel.compareDocumentPosition(confirm) & Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy()
    })

    it('right-aligns the footer (justify-end, not justify-center)', () => {
      render(<FormDialog {...defaultProps} />)
      const footer = screen.getByRole('button', { name: /cancel/i }).parentElement
      expect(footer).toHaveClass('justify-end')
      expect(footer).not.toHaveClass('justify-center')
    })
  })
})
