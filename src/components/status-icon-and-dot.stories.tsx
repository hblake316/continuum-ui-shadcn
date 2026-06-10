import type { Meta, StoryObj } from '@storybook/react-vite'
import { MdMailOutline } from 'react-icons/md'

import { StatusIconAndDot } from './status-icon-and-dot'

const meta: Meta<typeof StatusIconAndDot> = {
  title: 'Components/StatusIconAndDot',
  component: StatusIconAndDot,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Ghost icon button (32×32) inside a 38×38 container, with an absolutely positioned badge at the top-right corner.

- **variant**: \`standard\` (pill with \`count\`) · \`dot\` (8×8 circle).
- **color**: \`default\` · \`primary\` · \`secondary\` · \`error\` · \`warning\` · \`info\` · \`success\`.
- \`default\` Standard: badge has no background; text is action gray.
- \`default\` Dot: no badge rendered at all.
- Icon turns primary blue for any non-default color; stays action-dark gray for default.`,
      },
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['standard', 'dot'] },
    color: {
      control: 'radio',
      options: ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
    count: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof StatusIconAndDot>

export const Default: Story = {
  args: { variant: 'standard', color: 'default', count: '1', 'aria-label': 'Mail' },
  render: (args) => (
    <StatusIconAndDot {...args}>
      <MdMailOutline size={20} />
    </StatusIconAndDot>
  ),
}

export const AllColorsStandard: Story = {
  name: 'All Colors — Standard',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-end gap-4">
      {(['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map(
        (color) => (
          <StatusIconAndDot
            key={color}
            variant="standard"
            color={color}
            count="1"
            aria-label={`Mail — ${color}`}
          >
            <MdMailOutline size={20} />
          </StatusIconAndDot>
        )
      )}
    </div>
  ),
}

export const AllColorsDot: Story = {
  name: 'All Colors — Dot',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-end gap-4">
      {(['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map(
        (color) => (
          <StatusIconAndDot key={color} variant="dot" color={color} aria-label={`Mail — ${color}`}>
            <MdMailOutline size={20} />
          </StatusIconAndDot>
        )
      )}
    </div>
  ),
}
