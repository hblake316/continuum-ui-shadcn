import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Switch } from './switch'

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    size: { control: 'radio', options: ['lg', 'md', 'sm'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Off: Story = {
  args: { label: 'Notifications', color: 'primary', size: 'md' },
}

export const On: Story = {
  args: { label: 'Notifications', color: 'primary', size: 'md', defaultChecked: true },
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch size="sm" label="Small" defaultChecked />
      <Switch size="md" label="Medium" defaultChecked />
      <Switch size="lg" label="Large" defaultChecked />
    </div>
  ),
}

export const Colors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch color="primary" label="Primary" defaultChecked />
      <Switch color="secondary" label="Secondary" defaultChecked />
    </div>
  ),
}

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
  ),
}

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [checked, setChecked] = useState(false)
    return <Switch label={checked ? 'On' : 'Off'} checked={checked} onCheckedChange={setChecked} />
  },
}
