import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Toggle } from './toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Forms/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['md', 'sm'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Pressed: Story = {
  render: (args) => (
    <Toggle pressed onPressedChange={args.onPressedChange}>
      Active
    </Toggle>
  ),
}

export const Unpressed: Story = {
  render: (args) => (
    <Toggle pressed={false} onPressedChange={args.onPressedChange}>
      Inactive
    </Toggle>
  ),
}

export const Small: Story = {
  render: function SmallStory() {
    const [pressed, setPressed] = useState(false)
    return (
      <Toggle size="sm" pressed={pressed} onPressedChange={setPressed}>
        {pressed ? 'On' : 'Off'}
      </Toggle>
    )
  },
}

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [pressed, setPressed] = useState(false)
    return (
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        {pressed ? 'Subscribed' : 'Subscribe'}
      </Toggle>
    )
  },
}

export const Group: Story = {
  render: function GroupStory() {
    const [tags, setTags] = useState<Record<string, boolean>>({
      production: true,
      staging: false,
      qa: false,
    })
    return (
      <div className="flex flex-wrap items-center gap-2">
        {Object.entries(tags).map(([tag, pressed]) => (
          <Toggle
            key={tag}
            pressed={pressed}
            onPressedChange={(next) => setTags((t) => ({ ...t, [tag]: next }))}
          >
            {tag}
          </Toggle>
        ))}
      </div>
    )
  },
}
