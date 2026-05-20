import type { Meta, StoryObj } from '@storybook/react'
import { MdAdd, MdDeleteOutline } from 'react-icons/md'

import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['contained', 'outlined', 'text'] },
    color: {
      control: 'radio',
      options: ['primary', 'error', 'warning', 'info', 'success', 'action'],
    },
    size: { control: 'radio', options: ['lg', 'md', 'sm'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Contained: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'md',
    children: 'Button',
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    children: 'Button',
  },
}

export const Text: Story = {
  args: {
    variant: 'text',
    color: 'primary',
    size: 'md',
    children: 'Button',
  },
}

export const WithIcon: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'md',
  },
  render: (args) => (
    <Button {...args}>
      <MdAdd size={16} />
      Create
    </Button>
  ),
}

export const Destructive: Story = {
  args: {
    variant: 'contained',
    color: 'error',
    size: 'md',
  },
  render: (args) => (
    <Button {...args}>
      <MdDeleteOutline size={16} />
      Delete
    </Button>
  ),
}

export const Disabled: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'md',
    disabled: true,
    children: 'Disabled',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button color="primary">Primary</Button>
      <Button color="error">Error</Button>
      <Button color="warning">Warning</Button>
      <Button color="info">Info</Button>
      <Button color="success">Success</Button>
      <Button color="action">Action</Button>
    </div>
  ),
}
