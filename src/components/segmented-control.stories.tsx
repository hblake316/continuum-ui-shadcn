import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { SegmentedControl, SegmentedControlItem } from './segmented-control'

const meta: Meta<typeof SegmentedControl> = {
  title: 'Forms/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms',
    },
    docs: {
      description: {
        component: `Inline toggle between 2-4 closely-related views or modes. For more options use \`Select\` or \`Tabs\`; for a single binary use \`Switch\` or \`Toggle\`.

- **variant**: \`contained\` (solid selected) for filter bars · \`outlined\` (border selected) for muted toolbar contexts.`,
      },
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['contained', 'outlined'] },
    color: { control: 'radio', options: ['primary', 'action'] },
    size: { control: 'radio', options: ['md', 'sm'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof SegmentedControl>

function ControlDemo(props: {
  variant?: 'contained' | 'outlined'
  color?: 'primary' | 'action'
  size?: 'md' | 'sm'
  disabled?: boolean
}) {
  const [value, setValue] = useState('day')
  return (
    <SegmentedControl {...props} value={value} onValueChange={setValue}>
      <SegmentedControlItem value="day">Day</SegmentedControlItem>
      <SegmentedControlItem value="week">Week</SegmentedControlItem>
      <SegmentedControlItem value="month">Month</SegmentedControlItem>
    </SegmentedControl>
  )
}

export const Contained: Story = {
  args: { variant: 'contained', color: 'primary', size: 'md', disabled: false },
  render: (args) => <ControlDemo {...args} />,
}

export const Outlined: Story = {
  args: { variant: 'outlined', color: 'primary', size: 'md', disabled: false },
  render: (args) => <ControlDemo {...args} />,
}

export const ActionColor: Story = {
  args: { variant: 'contained', color: 'action', size: 'md', disabled: false },
  render: (args) => <ControlDemo {...args} />,
}

export const Small: Story = {
  args: { variant: 'contained', color: 'primary', size: 'sm', disabled: false },
  render: (args) => <ControlDemo {...args} />,
}

export const Disabled: Story = {
  args: { variant: 'contained', color: 'primary', size: 'md', disabled: true },
  render: (args) => <ControlDemo {...args} />,
}
