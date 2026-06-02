import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms?node-id=6543-43052&p=f&t=RS9jFsyUANIC05d3-0',
    },
    docs: {
      description: {
        component: `Boolean or tri-state selection. For mutually-exclusive groups use \`RadioGroup\`; for on/off settings use \`Switch\`; for multi-select from a list use \`MultiSelect\`.

- **size**: \`sm\` for dense tables · \`md\` default · \`lg\` for touch targets.
- Set \`indeterminate\` for parent-of-mixed-children rows.`,
      },
    },
  },
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary', 'default'] },
    size: { control: 'radio', options: ['lg', 'md', 'sm'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Unchecked: Story = {
  args: { label: 'Enable notifications', color: 'primary', size: 'md' },
}

export const Checked: Story = {
  args: { label: 'Enable notifications', color: 'primary', size: 'md', checked: true },
}

export const Indeterminate: Story = {
  args: { label: 'Select all', color: 'primary', size: 'md', checked: 'indeterminate' },
}

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-2">
      <Checkbox label="Disabled, unchecked" disabled />
      <Checkbox label="Disabled, checked" disabled checked />
      <Checkbox label="Disabled, indeterminate" disabled checked="indeterminate" />
    </div>
  ),
}

export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-2">
      <Checkbox size="sm" label="Small" defaultChecked />
      <Checkbox size="md" label="Medium" defaultChecked />
      <Checkbox size="lg" label="Large" defaultChecked />
    </div>
  ),
}

export const AllColors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-2">
      <Checkbox color="primary" label="Primary" defaultChecked />
      <Checkbox color="secondary" label="Secondary" defaultChecked />
      <Checkbox color="default" label="Default" defaultChecked />
    </div>
  ),
}

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [checked, setChecked] = useState(false)
    return (
      <Checkbox
        label="Click me"
        checked={checked}
        onCheckedChange={(c) => setChecked(c === true)}
      />
    )
  },
}
