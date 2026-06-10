import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'

import { Alert, AlertAction, AlertDescription, AlertTitle } from './alert'

describe('Alert', () => {
  it('uses role="status" for non-urgent severities', () => {
    render(<Alert severity="basic" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('uses role="alert" for error and warning severities', () => {
    const { rerender } = render(<Alert severity="error" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    rerender(<Alert severity="warning" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  describe('content', () => {
    it('renders title prop', () => {
      render(<Alert title="Something went wrong" />)
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })

    it('renders children as the body', () => {
      render(<Alert>Please try again.</Alert>)
      expect(screen.getByText('Please try again.')).toBeInTheDocument()
    })

    it('renders title and children independently', () => {
      render(<Alert title="Error">Details here.</Alert>)
      expect(screen.getByText('Error')).toBeInTheDocument()
      expect(screen.getByText('Details here.')).toBeInTheDocument()
    })

    it('accepts ReactNode children', () => {
      render(
        <Alert>
          <ul>
            <li>Item one</li>
          </ul>
        </Alert>
      )
      expect(screen.getByText('Item one')).toBeInTheDocument()
    })

    it('AlertAction-only child does not suppress title', () => {
      render(
        <Alert title="Warning">
          <AlertAction>
            <button>Dismiss</button>
          </AlertAction>
        </Alert>
      )
      expect(screen.getByText('Warning')).toBeInTheDocument()
    })
  })

  describe('onClose', () => {
    it('renders a close button when onClose is provided', () => {
      render(<Alert onClose={() => {}} />)
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
    })

    it('does not render a close button when onClose is omitted', () => {
      render(<Alert title="Info" />)
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument()
    })

    it('calls onClose when the close button is clicked', () => {
      const onClose = vi.fn()
      render(<Alert onClose={onClose} />)
      fireEvent.click(screen.getByRole('button', { name: /close/i }))
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('child AlertAction', () => {
    it('renders AlertAction child when no action prop or onClose', () => {
      render(
        <Alert>
          <AlertAction>
            <button>Dismiss</button>
          </AlertAction>
        </Alert>
      )
      expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument()
    })
  })

  describe('startIcon', () => {
    it('renders a severity icon by default', () => {
      const { container } = render(<Alert />)
      expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('hides the icon when startIcon={false}', () => {
      const { container } = render(<Alert startIcon={false} />)
      expect(container.querySelector('svg')).not.toBeInTheDocument()
    })
  })

  describe('sub-components', () => {
    it('AlertTitle renders with data-slot="alert-title"', () => {
      const { container } = render(<AlertTitle>Title</AlertTitle>)
      expect(container.querySelector('[data-slot="alert-title"]')).toBeInTheDocument()
    })

    it('AlertDescription renders with data-slot="alert-description"', () => {
      const { container } = render(<AlertDescription>Desc</AlertDescription>)
      expect(container.querySelector('[data-slot="alert-description"]')).toBeInTheDocument()
    })

    it('AlertAction renders with data-slot="alert-action"', () => {
      const { container } = render(<AlertAction />)
      expect(container.querySelector('[data-slot="alert-action"]')).toBeInTheDocument()
    })
  })
})
