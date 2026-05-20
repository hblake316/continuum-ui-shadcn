import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { SegmentedControl, SegmentedControlItem } from './segmented-control'

const meta: Meta<typeof SegmentedControl> = {
  title: 'Forms/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
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
