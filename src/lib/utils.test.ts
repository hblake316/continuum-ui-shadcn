import { describe, it, expect } from 'vitest'

import { cn } from './utils'

describe('cn / extendTailwindMerge', () => {
  it('keeps both a color token and a custom font-size token when both start with text-', () => {
    const result = cn('text-text-secondary', 'text-med-1x-input-reg400')
    expect(result).toContain('text-text-secondary')
    expect(result).toContain('text-med-1x-input-reg400')
  })

  it('collapses two custom font-size tokens — last one wins', () => {
    const result = cn('text-lg-1x-body-default-reg400', 'text-med-1x-input-reg400')
    expect(result).not.toContain('text-lg-1x-body-default-reg400')
    expect(result).toContain('text-med-1x-input-reg400')
  })

  it('handles falsy values without throwing', () => {
    expect(cn('text-text-secondary', undefined, false, null, '')).toBe('text-text-secondary')
  })
})
