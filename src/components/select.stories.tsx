import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Select } from './select'

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms?node-id=21401-29339&p=f&t=RS9jFsyUANIC05d3-0',
    },
    docs: {
      description: {
        component: `Single-select dropdown for short closed enumeration lists. For large or async lists with type-ahead use \`Autocomplete\`; for picking multiple use \`MultiSelect\`.

- **size**: \`md\` (40px) inside forms · \`sm\` (32px) for inline filters and table toolbars.`,
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['md', 'sm'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Select>

const FREQUENCY_OPTIONS = [
  { value: 'hourly', label: 'Hourly' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
]

function SelectDemo(props: {
  size?: 'md' | 'sm'
  required?: boolean
  disabled?: boolean
  label?: string
  placeholder?: string
  initial?: string
}) {
  const [value, setValue] = useState(props.initial ?? '')
  return (
    <div className="w-64">
      <Select
        label={props.label ?? 'Frequency'}
        value={value}
        onChange={setValue}
        options={FREQUENCY_OPTIONS}
        placeholder={props.placeholder ?? 'Select frequency'}
        size={props.size}
        required={props.required}
        disabled={props.disabled}
      />
    </div>
  )
}

export const Default: Story = {
  args: { size: 'md', required: false, disabled: false },
  render: (args) => <SelectDemo {...args} />,
}

export const Filled: Story = {
  args: { size: 'md', required: false, disabled: false },
  render: (args) => <SelectDemo {...args} initial="daily" />,
}

export const Small: Story = {
  args: { size: 'sm', required: false, disabled: false },
  render: (args) => <SelectDemo {...args} />,
}

export const Required: Story = {
  args: { size: 'md', required: true, disabled: false },
  render: (args) => <SelectDemo {...args} />,
}

export const Disabled: Story = {
  args: { size: 'md', required: false, disabled: true },
  render: (args) => <SelectDemo {...args} initial="weekly" />,
}
