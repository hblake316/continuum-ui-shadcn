import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Switch } from './switch'

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/IejTYp6kphnHyy3X8QnfTQ/UI-Kit-All-Products-Atoms-variables?node-id=6570-46740&p=f&t=REYypyunqzscArCx-0',
    },
    docs: {
      description: {
        component: `Boolean on/off setting (e.g. feature toggles in preferences). For form-style boolean input use \`Checkbox\`; for momentary press-and-release use \`Toggle\`.

- **size**: \`sm\`/\`md\`/\`lg\` — match the surrounding form density.`,
      },
    },
  },
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

export const OffVsOn: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Side-by-side off and on states. Verifies the thumb (white with subtle ring) is visible on white backgrounds in the off state, and that the thumb actually slides to the right when toggled on.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-8">
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
    </div>
  ),
}
