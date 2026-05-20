import type { Meta, StoryObj } from '@storybook/react'
import { MdAdd, MdDeleteOutline, MdEdit, MdMoreVert } from 'react-icons/md'

import { IconButton } from './icon-button'

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['contained', 'outlined', 'text'] },
    color: {
      control: 'radio',
      options: ['primary', 'error', 'warning', 'info', 'success', 'action'],
    },
    size: { control: 'radio', options: ['lg', 'md', 'sm', 'xs'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Contained: Story = {
  args: { variant: 'contained', color: 'primary', size: 'md', 'aria-label': 'Add' },
  render: (args) => (
    <IconButton {...args}>
      <MdAdd size={18} />
    </IconButton>
  ),
}

export const Outlined: Story = {
  args: { variant: 'outlined', color: 'primary', size: 'md', 'aria-label': 'Edit' },
  render: (args) => (
    <IconButton {...args}>
      <MdEdit size={18} />
    </IconButton>
  ),
}

export const Text: Story = {
  args: { variant: 'text', color: 'action', size: 'md', 'aria-label': 'More' },
  render: (args) => (
    <IconButton {...args}>
      <MdMoreVert size={18} />
    </IconButton>
  ),
}

export const Destructive: Story = {
  args: { variant: 'contained', color: 'error', size: 'md', 'aria-label': 'Delete' },
  render: (args) => (
    <IconButton {...args}>
      <MdDeleteOutline size={18} />
    </IconButton>
  ),
}

export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton size="xs" aria-label="Add xs">
        <MdAdd size={12} />
      </IconButton>
      <IconButton size="sm" aria-label="Add sm">
        <MdAdd size={14} />
      </IconButton>
      <IconButton size="md" aria-label="Add md">
        <MdAdd size={18} />
      </IconButton>
      <IconButton size="lg" aria-label="Add lg">
        <MdAdd size={20} />
      </IconButton>
    </div>
  ),
}

export const AllColors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {(['primary', 'error', 'warning', 'info', 'success', 'action'] as const).map((color) => (
        <IconButton key={color} color={color} aria-label={color}>
          <MdAdd size={18} />
        </IconButton>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  args: { variant: 'contained', color: 'primary', size: 'md', disabled: true, 'aria-label': 'Add' },
  render: (args) => (
    <IconButton {...args}>
      <MdAdd size={18} />
    </IconButton>
  ),
}
