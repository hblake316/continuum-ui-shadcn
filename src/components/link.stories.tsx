import type * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Link } from './link'

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'inherit'] },
    underline: { control: 'radio', options: ['always', 'hover', 'none'] },
  },
}

export default meta
type Story = StoryObj<typeof Link>

const preventNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()

export const Default: Story = {
  args: {
    children: 'View workflow',
    href: 'https://example.com/workflows/nightly-etl',
    color: 'primary',
    underline: 'always',
    onClick: preventNavigation,
  },
}

export const UnderlineOnHover: Story = {
  args: {
    children: 'View workflow',
    href: 'https://example.com/workflows/nightly-etl',
    color: 'primary',
    underline: 'hover',
    onClick: preventNavigation,
  },
}

export const NoUnderline: Story = {
  args: {
    children: 'View workflow',
    href: 'https://example.com/workflows/nightly-etl',
    color: 'primary',
    underline: 'none',
    onClick: preventNavigation,
  },
}

export const Inherit: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <p className="text-sm text-text-secondary">
      See the{' '}
      <Link
        href="https://example.com/docs/retry-policies"
        color="inherit"
        underline="always"
        onClick={preventNavigation}
      >
        documentation
      </Link>{' '}
      for details on retry policies.
    </p>
  ),
}
