import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderDefault(overrides: any = {}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = { type: 'multiple' as const, ...overrides } as any
  return render(
    <Accordion {...props}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section one</AccordionTrigger>
        <AccordionContent>Content one</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section two</AccordionTrigger>
        <AccordionContent>Content two</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

describe('Accordion', () => {
  describe('rendering', () => {
    it('renders a trigger button for each item', () => {
      renderDefault()
      expect(screen.getByRole('button', { name: /section one/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /section two/i })).toBeInTheDocument()
    })

    it('renders items closed by default', () => {
      renderDefault()
      expect(screen.getByRole('button', { name: /section one/i })).toHaveAttribute(
        'data-state',
        'closed'
      )
    })

    it('opens the defaultValue item on mount', () => {
      renderDefault({ defaultValue: 'item-2' })
      expect(screen.getByRole('button', { name: /section two/i })).toHaveAttribute(
        'data-state',
        'open'
      )
    })

    it('renders a disabled item as a disabled button', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" disabled>
            <AccordionTrigger>Restricted</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      expect(screen.getByRole('button', { name: /restricted/i })).toBeDisabled()
    })
  })

  describe('interactions', () => {
    it('opens an item when its trigger is clicked', () => {
      renderDefault()
      fireEvent.click(screen.getByRole('button', { name: /section one/i }))
      expect(screen.getByRole('button', { name: /section one/i })).toHaveAttribute(
        'data-state',
        'open'
      )
    })

    it('collapses an open item when its trigger is clicked again', () => {
      renderDefault()
      const trigger = screen.getByRole('button', { name: /section one/i })
      fireEvent.click(trigger)
      fireEvent.click(trigger)
      expect(trigger).toHaveAttribute('data-state', 'closed')
    })

    it('closes the open item when another is opened (single type)', () => {
      renderDefault({ type: 'single', collapsible: true })
      fireEvent.click(screen.getByRole('button', { name: /section one/i }))
      fireEvent.click(screen.getByRole('button', { name: /section two/i }))
      expect(screen.getByRole('button', { name: /section one/i })).toHaveAttribute(
        'data-state',
        'closed'
      )
      expect(screen.getByRole('button', { name: /section two/i })).toHaveAttribute(
        'data-state',
        'open'
      )
    })

    it('allows multiple items open simultaneously (multiple type)', () => {
      render(
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>Section one</AccordionTrigger>
            <AccordionContent>Content one</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Section two</AccordionTrigger>
            <AccordionContent>Content two</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      fireEvent.click(screen.getByRole('button', { name: /section one/i }))
      fireEvent.click(screen.getByRole('button', { name: /section two/i }))
      expect(screen.getByRole('button', { name: /section one/i })).toHaveAttribute(
        'data-state',
        'open'
      )
      expect(screen.getByRole('button', { name: /section two/i })).toHaveAttribute(
        'data-state',
        'open'
      )
    })
  })

  describe('chevron column', () => {
    it('opens the item when the chevron column is clicked', () => {
      const { container } = renderDefault()
      const chevronDiv = container.querySelector('svg')?.parentElement as HTMLElement
      fireEvent.click(chevronDiv)
      expect(screen.getByRole('button', { name: /section one/i })).toHaveAttribute(
        'data-state',
        'open'
      )
    })

    it('collapses an open item when the chevron column is clicked', () => {
      const { container } = renderDefault()
      const trigger = screen.getByRole('button', { name: /section one/i })
      fireEvent.click(trigger)
      const chevronDiv = container.querySelector('svg')?.parentElement as HTMLElement
      fireEvent.click(chevronDiv)
      expect(trigger).toHaveAttribute('data-state', 'closed')
    })

    it('is reachable by keyboard (has role=button and aria-label)', () => {
      const { container } = renderDefault()
      const chevronDiv = container.querySelector('[role="button"][aria-label="Toggle"]')
      expect(chevronDiv).not.toBeNull()
      expect(chevronDiv).toHaveAttribute('tabindex', '0')
    })

    it('opens the item when Enter is pressed on the chevron', () => {
      const { container } = renderDefault()
      const chevronDiv = container.querySelector(
        '[role="button"][aria-label="Toggle"]'
      ) as HTMLElement
      fireEvent.keyDown(chevronDiv, { key: 'Enter' })
      expect(screen.getByRole('button', { name: /section one/i })).toHaveAttribute(
        'data-state',
        'open'
      )
    })

    it('opens the item when Space is pressed on the chevron', () => {
      const { container } = renderDefault()
      const chevronDiv = container.querySelector(
        '[role="button"][aria-label="Toggle"]'
      ) as HTMLElement
      fireEvent.keyDown(chevronDiv, { key: ' ' })
      expect(screen.getByRole('button', { name: /section one/i })).toHaveAttribute(
        'data-state',
        'open'
      )
    })

    it('sets data-state=open on the AccordionItem element when opened (drives group-* rotation)', () => {
      renderDefault()
      const trigger = screen.getByRole('button', { name: /section one/i })
      fireEvent.click(trigger)
      const item = trigger.closest('[data-orientation="vertical"][data-state]')
      expect(item).toHaveAttribute('data-state', 'open')
    })
  })
})
