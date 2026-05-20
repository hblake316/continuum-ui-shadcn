import type { Meta, StoryObj } from '@storybook/react'
import { MdNotificationsNone } from 'react-icons/md'

import { Badge } from './badge'
import { IconButton } from './icon-button'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['standard', 'dot'] },
    color: {
      control: 'radio',
      options: ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
    count: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Standard: Story = {
  args: { variant: 'standard', color: 'primary', count: 4 },
  render: (args) => (
    <Badge {...args}>
      <IconButton variant="text" color="action">
        <MdNotificationsNone size={20} />
      </IconButton>
    </Badge>
  ),
}

export const Dot: Story = {
  args: { variant: 'dot', color: 'error' },
  render: (args) => (
    <Badge {...args}>
      <IconButton variant="text" color="action">
        <MdNotificationsNone size={20} />
      </IconButton>
    </Badge>
  ),
}

export const AllColors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      {(['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map(
        (color) => (
          <Badge key={color} color={color} count={3}>
            <IconButton variant="text" color="action">
              <MdNotificationsNone size={20} />
            </IconButton>
          </Badge>
        )
      )}
    </div>
  ),
}

export const Dots: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-6">
      {(['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map(
        (color) => (
          <Badge key={color} variant="dot" color={color}>
            <IconButton variant="text" color="action">
              <MdNotificationsNone size={20} />
            </IconButton>
          </Badge>
        )
      )}
    </div>
  ),
}
