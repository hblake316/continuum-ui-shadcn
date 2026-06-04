import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'lg-2x-initials-reg400',
            'lg-1x-body-default-reg400',
            'lg-1x-body-default-demi600',
            'lg-component-med500',
            'med-1x-input-reg400',
            'med-1x-component-med500',
            'med-body-small-reg400',
            'med-component-med500',
            'med-body-small-demi600',
            'sm-1x-label-med500',
            'sm-1x-component-reg400',
            'sm-description-med500',
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
