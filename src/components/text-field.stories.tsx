import type { Meta, StoryObj } from '@storybook/react-vite'

import { TextField } from './text-field'

const meta: Meta<typeof TextField> = {
  title: 'Forms/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms?node-id=21401-29205&p=f&t=RS9jFsyUANIC05d3-0',
    },
    docs: {
      description: {
        component: `Single-line text input with label, optional hint, and error state. For multi-line use a textarea; for closed-list values use \`Select\` or \`Autocomplete\`.

- **size**: \`sm\` (32px) for inline filters · \`md\` (40px) default forms · \`lg\` (60px) for splash/onboarding.`,
      },
    },
  },
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
