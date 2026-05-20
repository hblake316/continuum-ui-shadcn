import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from './slider'

const meta: Meta<typeof Slider> = {
  title: 'Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    size: { control: 'radio', options: ['md', 'sm'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  args: { defaultValue: [40], min: 0, max: 100, step: 1 },
  render: (args) => (
    <div className="w-80">
      <Slider {...args} />
    </div>
  ),
}

export const Small: Story = {
  args: { defaultValue: [40], size: 'sm' },
  render: (args) => (
    <div className="w-80">
      <Slider {...args} />
    </div>
  ),
}

export const Secondary: Story = {
  args: { defaultValue: [60], color: 'secondary' },
  render: (args) => (
    <div className="w-80">
      <Slider {...args} />
    </div>
  ),
}

export const Range: Story = {
  args: { defaultValue: [20, 80], min: 0, max: 100, step: 1 },
  render: (args) => (
    <div className="w-80">
      <Slider {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: { defaultValue: [40], disabled: true },
  render: (args) => (
    <div className="w-80">
      <Slider {...args} />
    </div>
  ),
}

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [value, setValue] = useState([35])
    return (
      <div className="w-80">
        <p className="mb-2 text-sm text-text-primary">Value: {value[0]}</p>
        <Slider value={value} onValueChange={setValue} />
      </div>
    )
  },
}
