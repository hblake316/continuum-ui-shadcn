import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from './text-field'

const meta: Meta<typeof TextField> = {
  title: 'Forms/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['lg', 'md', 'sm'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    label: 'Workflow name',
    placeholder: 'e.g. Nightly ETL',
    size: 'md',
  },
  render: (args) => (
    <div className="w-72">
      <TextField {...args} />
    </div>
  ),
}

export const WithHint: Story = {
  args: {
    label: 'Workflow name',
    placeholder: 'e.g. Nightly ETL',
    hint: 'Must be unique within the environment',
  },
  render: (args) => (
    <div className="w-72">
      <TextField {...args} />
    </div>
  ),
}

export const WithError: Story = {
  args: {
    label: 'Workflow name',
    defaultValue: 'Nightly ETL',
    error: 'A workflow with this name already exists',
  },
  render: (args) => (
    <div className="w-72">
      <TextField {...args} />
    </div>
  ),
}

export const Required: Story = {
  args: { label: 'Workflow name', required: true, placeholder: 'Required field' },
  render: (args) => (
    <div className="w-72">
      <TextField {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: { label: 'Workflow name', defaultValue: 'Nightly ETL', disabled: true },
  render: (args) => (
    <div className="w-72">
      <TextField {...args} />
    </div>
  ),
}

export const ReadOnly: Story = {
  args: { label: 'Workflow ID', defaultValue: 'wf_1a2b3c4d', readOnly: true },
  render: (args) => (
    <div className="w-72">
      <TextField {...args} />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <TextField size="sm" label="Small" placeholder="32px field" />
      <TextField size="md" label="Medium" placeholder="40px field" />
      <TextField size="lg" label="Large" placeholder="60px field" />
    </div>
  ),
}
