import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['BDO Grotesk', 'sans-serif'],
      },
      fontSize: {
        'lg-2x-initials-reg400': ['20px', { lineHeight: '27px', fontWeight: '400' }],
        'lg-1x-body-default-reg400': ['16px', { lineHeight: '21.6px', fontWeight: '400' }],
        'lg-1x-body-default-demi600': ['16px', { lineHeight: '21.6px', fontWeight: '600' }],
        'lg-component-med500': ['15px', { lineHeight: '21px', fontWeight: '500' }],
        'med-1x-input-reg400': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'med-1x-component-med500': ['14px', { lineHeight: '18.9px', fontWeight: '500' }],
        'med-body-small-reg400': ['13px', { lineHeight: '17.55px', fontWeight: '400' }],
        'med-component-med500': ['13px', { lineHeight: '13.8px', fontWeight: '500' }],
        'med-body-small-demi600': ['13px', { lineHeight: '17.55px', fontWeight: '600' }],
        'sm-1x-label-med500': ['12px', { lineHeight: '20px', fontWeight: '500' }],
        'sm-1x-component-reg400': ['12px', { lineHeight: '13.92px', fontWeight: '400' }],
        'sm-description-med500': ['10px', { lineHeight: '14px', fontWeight: '500' }],
      },
      colors: {
        background: {
          DEFAULT: 'var(--color-background)',
          paper: 'var(--color-background-paper)',
          'default-muted': 'var(--color-background-default)',
          'default-less-saturated': 'var(--color-background-default-less-saturated)',
        },
        // shadcn-compat aliases — keep upstream primitives (Empty, etc.) styled
        // without modification. These point at canonical OpCon tokens; do not
        // introduce new colors here.
        muted: {
          DEFAULT: 'var(--color-background-default-less-saturated)',
          foreground: 'var(--color-text-secondary)',
        },
        foreground: 'var(--color-text-primary)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
          foreground: 'var(--color-primary-foreground)',
          focus: 'var(--color-primary-focus)',
          'focus-ring': 'var(--color-primary-focus-ring)',
          'hover-subtle': 'var(--color-primary-hover-subtle)',
          selected: 'var(--color-primary-selected)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          dark: 'var(--color-error-dark)',
          light: 'var(--color-error-light)',
          foreground: 'var(--color-error-foreground)',
          focus: 'var(--color-error-focus)',
          'focus-ring': 'var(--color-error-focus-ring)',
          'hover-subtle': 'var(--color-error-hover-subtle)',
          'alert-content': 'var(--color-error-alert-content)',
          'alert-bg': 'var(--color-error-alert-bg)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          dark: 'var(--color-warning-dark)',
          light: 'var(--color-warning-light)',
          foreground: 'var(--color-warning-foreground)',
          focus: 'var(--color-warning-focus)',
          'focus-ring': 'var(--color-warning-focus-ring)',
          'hover-subtle': 'var(--color-warning-hover-subtle)',
          'alert-content': 'var(--color-warning-alert-content)',
          'alert-bg': 'var(--color-warning-alert-bg)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          dark: 'var(--color-info-dark)',
          light: 'var(--color-info-light)',
          foreground: 'var(--color-info-foreground)',
          focus: 'var(--color-info-focus)',
          'focus-ring': 'var(--color-info-focus-ring)',
          'hover-subtle': 'var(--color-info-hover-subtle)',
          'alert-content': 'var(--color-info-alert-content)',
          'alert-bg': 'var(--color-info-alert-bg)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          dark: 'var(--color-success-dark)',
          light: 'var(--color-success-light)',
          foreground: 'var(--color-success-foreground)',
          focus: 'var(--color-success-focus)',
          'focus-ring': 'var(--color-success-focus-ring)',
          'hover-subtle': 'var(--color-success-hover-subtle)',
          'alert-content': 'var(--color-success-alert-content)',
          'alert-bg': 'var(--color-success-alert-bg)',
        },
        action: {
          DEFAULT: 'var(--color-action)',
          dark: 'var(--color-action-dark)',
          light: 'var(--color-action-light)',
          foreground: 'var(--color-action-foreground)',
          focus: 'var(--color-action-focus)',
          'focus-ring': 'var(--color-action-focus-ring)',
          'disabled-bg': 'var(--color-action-disabled-bg)',
          'hover-subtle': 'var(--color-action-hover-subtle)',
          selected: 'var(--color-action-selected)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          dark: 'var(--color-secondary-dark)',
          light: 'var(--color-secondary-light)',
          foreground: 'var(--color-secondary-foreground)',
          'hover-subtle': 'var(--color-secondary-hover-subtle)',
          focus: 'var(--color-secondary-focus)',
          selected: 'var(--color-secondary-selected)',
          enabled: 'var(--color-secondary-enabled)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          hyperlink: 'var(--color-text-hyperlink)',
        },
        disabled: {
          text: 'var(--color-disabled-text)',
        },
        divider: 'var(--color-divider)',
        input: {
          DEFAULT: 'var(--color-input-bg)',
          border: 'var(--color-input-border)',
          line: 'var(--color-input-line)',
        },
        outline: {
          border: 'var(--color-outline-border)',
        },
        backdrop: 'var(--color-backdrop)',
        snackbar: {
          bg: 'var(--color-snackbar-bg)',
        },
        brand: {
          'black-pearl': 'var(--color-brand-black-pearl)',
        },
      },
      borderRadius: {
        DEFAULT: '4px',
      },
    },
  },
  plugins: [],
}

export default config
