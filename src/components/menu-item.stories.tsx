import type { Meta, StoryObj } from '@storybook/react'
import { MdContentCopy, MdDeleteOutline, MdEdit, MdOutlineDriveFileMove } from 'react-icons/md'

import { MenuItem } from './menu-item'

const meta: Meta<typeof MenuItem> = {
  title: 'Components/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  argTypes: {
    selected: { control: 'boolean' },
    dense: { control: 'boolean' },
    divider: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof MenuItem>

export const Default: Story = {
  args: { children: 'Edit workflow' },
  render: (args) => (
    <div className="w-56 rounded border border-outline-border bg-background-paper py-1">
      <MenuItem {...args} />
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="w-56 rounded border border-outline-border bg-background-paper py-1">
      <MenuItem icon={<MdEdit size={18} />}>Edit</MenuItem>
      <MenuItem icon={<MdContentCopy size={18} />}>Duplicate</MenuItem>
      <MenuItem icon={<MdOutlineDriveFileMove size={18} />}>Move</MenuItem>
    </div>
  ),
}

export const WithShortcut: Story = {
  render: () => (
    <div className="w-64 rounded border border-outline-border bg-background-paper py-1">
      <MenuItem icon={<MdEdit size={18} />} rightContent="⌘E">
        Edit
      </MenuItem>
      <MenuItem icon={<MdContentCopy size={18} />} rightContent="⌘D">
        Duplicate
      </MenuItem>
      <MenuItem icon={<MdDeleteOutline size={18} />} rightContent="⌫">
        Delete
      </MenuItem>
    </div>
  ),
}

export const Selected: Story = {
  args: { children: 'Selected item', selected: true },
  render: (args) => (
    <div className="w-56 rounded border border-outline-border bg-background-paper py-1">
      <MenuItem {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: { children: 'Disabled item', disabled: true },
  render: (args) => (
    <div className="w-56 rounded border border-outline-border bg-background-paper py-1">
      <MenuItem {...args} />
    </div>
  ),
}

export const Dense: Story = {
  render: () => (
    <div className="w-56 rounded border border-outline-border bg-background-paper py-1">
      <MenuItem dense>Edit</MenuItem>
      <MenuItem dense>Duplicate</MenuItem>
      <MenuItem dense>Move</MenuItem>
      <MenuItem dense>Delete</MenuItem>
    </div>
  ),
}

export const WithDividers: Story = {
  render: () => (
    <div className="w-56 rounded border border-outline-border bg-background-paper py-1">
      <MenuItem icon={<MdEdit size={18} />} divider>
        Edit
      </MenuItem>
      <MenuItem icon={<MdContentCopy size={18} />} divider>
        Duplicate
      </MenuItem>
      <MenuItem icon={<MdDeleteOutline size={18} />}>Delete</MenuItem>
    </div>
  ),
}
