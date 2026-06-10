import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

function renderTooltip(
  content: React.ReactNode,
  props?: Partial<React.ComponentProps<typeof TooltipContent>>
) {
  const result = render(
    <TooltipProvider>
      <Tooltip open>
        <TooltipTrigger>trigger</TooltipTrigger>
        <TooltipContent {...props}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
  // Radix renders the styled tooltip div inside a popper wrapper.
  // getByRole('tooltip') returns Radix's hidden a11y span — use the wrapper
  // selector to reach the actual styled element instead.
  const el = result.baseElement.querySelector<HTMLElement>(
    '[data-radix-popper-content-wrapper] > div'
  )
  // Fail fast if Radix changes its internal DOM structure.
  expect(el).not.toBeNull()
  return { ...result, tooltipEl: el! }
}

describe('Tooltip', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  it('renders the tooltip container when open', () => {
    const { tooltipEl } = renderTooltip('Save changes')
    expect(tooltipEl).not.toBeNull()
  })

  it('renders content text', () => {
    const { tooltipEl } = renderTooltip('Save changes')
    expect(tooltipEl?.textContent).toContain('Save changes')
  })

  it('has a hidden role="tooltip" span for screen readers', () => {
    renderTooltip('Save changes')
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  // ── Styles ────────────────────────────────────────────────────────────────

  it('applies dark background', () => {
    const { tooltipEl } = renderTooltip('Hello')
    expect(tooltipEl?.className).toContain('bg-action-dark')
  })

  it('applies white text', () => {
    const { tooltipEl } = renderTooltip('Hello')
    expect(tooltipEl?.className).toContain('text-white')
  })

  it('applies nowrap', () => {
    const { tooltipEl } = renderTooltip('Hello')
    expect(tooltipEl?.className).toContain('whitespace-nowrap')
  })

  it('applies typography token', () => {
    const { tooltipEl } = renderTooltip('Hello')
    expect(tooltipEl?.className).toContain('text-sm-description-med500')
  })

  it('applies zero letter-spacing', () => {
    const { tooltipEl } = renderTooltip('Hello')
    expect(tooltipEl?.className).toContain('tracking-normal')
  })

  it('applies padding and border-radius classes', () => {
    const { tooltipEl } = renderTooltip('Hello')
    expect(tooltipEl?.className).toContain('px-2')
    expect(tooltipEl?.className).toContain('py-1')
    expect(tooltipEl?.className).toContain('rounded')
  })

  // ── Arrow ─────────────────────────────────────────────────────────────────

  it('renders an arrow SVG by default (direction="up")', () => {
    const { tooltipEl } = renderTooltip('Hello')
    expect(tooltipEl?.querySelector('svg')).not.toBeNull()
  })

  it('does not render an arrow when direction="none"', () => {
    const { tooltipEl } = renderTooltip('Hello', { direction: 'none' })
    expect(tooltipEl?.querySelector('svg')).toBeNull()
  })

  it('renders arrow for direction="down"', () => {
    const { tooltipEl } = renderTooltip('Hello', { direction: 'down' })
    expect(tooltipEl?.querySelector('svg')).not.toBeNull()
  })

  it('renders arrow for direction="left"', () => {
    const { tooltipEl } = renderTooltip('Hello', { direction: 'left' })
    expect(tooltipEl?.querySelector('svg')).not.toBeNull()
  })

  it('renders arrow for direction="right"', () => {
    const { tooltipEl } = renderTooltip('Hello', { direction: 'right' })
    expect(tooltipEl?.querySelector('svg')).not.toBeNull()
  })

  it('arrow has correct fill class', () => {
    const { tooltipEl } = renderTooltip('Hello')
    const arrow = tooltipEl?.querySelector('svg')
    expect(arrow?.getAttribute('class')).toContain('fill-action-dark')
  })

  // ── Direction → side mapping ───────────────────────────────────────────────
  // Radix sets data-side on the tooltip container once positioned.

  it('direction="up" sets data-side="top"', () => {
    const { tooltipEl } = renderTooltip('Hello', { direction: 'up' })
    expect(tooltipEl?.getAttribute('data-side')).toBe('top')
  })

  it('direction="down" sets data-side="bottom"', () => {
    const { tooltipEl } = renderTooltip('Hello', { direction: 'down' })
    expect(tooltipEl?.getAttribute('data-side')).toBe('bottom')
  })

  it('direction="left" sets data-side="left"', () => {
    const { tooltipEl } = renderTooltip('Hello', { direction: 'left' })
    expect(tooltipEl?.getAttribute('data-side')).toBe('left')
  })

  it('direction="right" sets data-side="right"', () => {
    const { tooltipEl } = renderTooltip('Hello', { direction: 'right' })
    expect(tooltipEl?.getAttribute('data-side')).toBe('right')
  })
})
