import type * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Link } from './link'

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms',
    },
    docs: {
      description: {
        component: `Styled anchor for in-page or external navigation. For action triggers use \`Button\` with \`variant: text\`.

- **color**: \`primary\` for brand-blue links · \`inherit\` to match surrounding text color.
- **underline**: \`hover\` is the default · \`always\` for high-emphasis · \`none\` for chrome-styled links.`,
      },
    },
  },
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
