import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Avatar } from './avatar'

describe('Avatar', () => {
  describe('size classes', () => {
    it('applies size-10 for lg', () => {
      const { container } = render(<Avatar size="lg" initials="AB" />)
      expect(container.firstChild).toHaveClass('size-10')
    })

    it('applies size-8 for md', () => {
      const { container } = render(<Avatar size="md" initials="AB" />)
      expect(container.firstChild).toHaveClass('size-8')
    })

    it('applies size-6 for sm', () => {
      const { container } = render(<Avatar size="sm" initials="AB" />)
      expect(container.firstChild).toHaveClass('size-6')
    })

    it('applies size-3.5 for xs', () => {
      const { container } = render(<Avatar size="xs" initials="AB" />)
      expect(container.firstChild).toHaveClass('size-3.5')
    })
  })

  describe('typography classes', () => {
    it('applies text-lg-2x-initials-reg400 for lg', () => {
      render(<Avatar size="lg" initials="AB" />)
      expect(screen.getByText('AB')).toHaveClass('text-lg-2x-initials-reg400')
    })

    it('applies text-lg-1x-body-default-reg400 for md', () => {
      render(<Avatar size="md" initials="AB" />)
      expect(screen.getByText('AB')).toHaveClass('text-lg-1x-body-default-reg400')
    })

    it('applies text-med-body-small-reg400 for sm', () => {
      render(<Avatar size="sm" initials="AB" />)
      expect(screen.getByText('AB')).toHaveClass('text-med-body-small-reg400')
    })
  })

  describe('content', () => {
    it('renders initials when provided', () => {
      render(<Avatar initials="HB" />)
      expect(screen.getByText('HB')).toBeInTheDocument()
    })

    it('renders icon when content is icon', () => {
      render(<Avatar content="icon" />)
      expect(screen.getByLabelText('User avatar')).toBeInTheDocument()
    })

    it('falls back to icon when no initials provided', () => {
      render(<Avatar />)
      expect(screen.getByLabelText('User avatar')).toBeInTheDocument()
    })
  })

  describe('variant', () => {
    it('applies rounded-full for circular', () => {
      const { container } = render(<Avatar variant="circular" initials="AB" />)
      const root = container.querySelector('[data-slot="avatar"] > span')
      expect(root).toHaveClass('rounded-full')
    })

    it('applies rounded-none for square', () => {
      const { container } = render(<Avatar variant="square" initials="AB" />)
      const root = container.querySelector('[data-slot="avatar"] > span')
      expect(root).toHaveClass('rounded-none')
    })

    it('applies rounded for rounded', () => {
      const { container } = render(<Avatar variant="rounded" initials="AB" />)
      const root = container.querySelector('[data-slot="avatar"] > span')
      expect(root).toHaveClass('rounded')
    })
  })

  describe('badge', () => {
    it('renders badge for lg', () => {
      const { container } = render(<Avatar size="lg" badge initials="AB" />)
      expect(container.querySelector('.bg-success')).toBeInTheDocument()
    })

    it('does not render badge for xs', () => {
      const { container } = render(<Avatar size="xs" badge initials="AB" />)
      expect(container.querySelector('.bg-success')).not.toBeInTheDocument()
    })

    it('does not render badge when badge is false', () => {
      const { container } = render(<Avatar size="lg" initials="AB" />)
      expect(container.querySelector('.bg-success')).not.toBeInTheDocument()
    })
  })

  describe('forwardRef and props spread', () => {
    it('forwards ref to the root element', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>
      render(<Avatar ref={ref} initials="AB" />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
      expect(ref.current).toHaveAttribute('data-slot', 'avatar')
    })

    it('spreads additional HTML attributes', () => {
      render(<Avatar initials="AB" data-testid="my-avatar" id="avatar-1" />)
      const el = screen.getByTestId('my-avatar')
      expect(el).toHaveAttribute('id', 'avatar-1')
    })
  })
})
