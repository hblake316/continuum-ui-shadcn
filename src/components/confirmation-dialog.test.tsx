import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import { ConfirmationDialog } from './confirmation-dialog'

describe('ConfirmationDialog', () => {
  const defaultProps = {
    open: true,
    title: 'Confirm Action',
    message: 'Are you sure?',
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders title and message', () => {
      render(<ConfirmationDialog {...defaultProps} />)
      expect(screen.getByText('Confirm Action')).toBeInTheDocument()
      expect(screen.getByText('Are you sure?')).toBeInTheDocument()
    })

    it('renders warningMessage when provided', () => {
      render(<ConfirmationDialog {...defaultProps} warningMessage="This cannot be undone." />)
      expect(screen.getByText('This cannot be undone.')).toBeInTheDocument()
    })

    it('does not render warningMessage when not provided', () => {
      render(<ConfirmationDialog {...defaultProps} />)
      expect(screen.queryByText('This cannot be undone.')).not.toBeInTheDocument()
    })

    it('renders errorMessage when provided', () => {
      render(<ConfirmationDialog {...defaultProps} errorMessage="Delete failed." />)
      expect(screen.getByText('Delete failed.')).toBeInTheDocument()
    })

    it('does not render errorMessage when not provided', () => {
      render(<ConfirmationDialog {...defaultProps} />)
      expect(screen.queryByText('Delete failed.')).not.toBeInTheDocument()
    })

    it('does not render when open is false', () => {
      render(<ConfirmationDialog {...defaultProps} open={false} />)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('renders custom confirm and cancel labels', () => {
      render(<ConfirmationDialog {...defaultProps} confirmLabel="Delete" cancelLabel="Keep" />)
      expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /keep/i })).toBeInTheDocument()
    })
  })

  describe('interactions', () => {
    it('calls onConfirm when confirm button is clicked', () => {
      render(<ConfirmationDialog {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: /confirm/i }))
      expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1)
    })

    it('calls onCancel when cancel button is clicked', () => {
      render(<ConfirmationDialog {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: /cancel/i }))
      expect(defaultProps.onCancel).toHaveBeenCalledTimes(1)
    })

    it('calls onCancel when X button is clicked', () => {
      render(<ConfirmationDialog {...defaultProps} />)
      fireEvent.click(screen.getByRole('button', { name: /close/i }))
      expect(defaultProps.onCancel).toHaveBeenCalledTimes(1)
    })
  })

  describe('loading state', () => {
    it('disables confirm and cancel buttons', () => {
      render(<ConfirmationDialog {...defaultProps} loading />)
      expect(screen.getByRole('button', { name: /confirm/i })).toBeDisabled()
      expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled()
    })

    it('shows spinner on confirm button', () => {
      render(<ConfirmationDialog {...defaultProps} loading />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })
  })

  describe('severity', () => {
    it('renders destructive confirm label', () => {
      render(<ConfirmationDialog {...defaultProps} severity="destructive" confirmLabel="Delete" />)
      expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
    })
  })

  // Regression guards for the OpCon design-system footer convention. ConfirmationDialog
  // wraps FormDialog, so we re-assert the contract here too — reverting alignment
  // or button order on either component must fail at least one test.
  describe('footer layout', () => {
    it('renders Cancel before Confirm in DOM order', () => {
      render(<ConfirmationDialog {...defaultProps} />)
      const cancel = screen.getByRole('button', { name: /cancel/i })
      const confirm = screen.getByRole('button', { name: /confirm/i })
      expect(
        cancel.compareDocumentPosition(confirm) & Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy()
    })

    it('right-aligns the footer (justify-end, not justify-center)', () => {
      render(<ConfirmationDialog {...defaultProps} />)
      const footer = screen.getByRole('button', { name: /cancel/i }).parentElement
      expect(footer).toHaveClass('justify-end')
      expect(footer).not.toHaveClass('justify-center')
    })
  })
})
