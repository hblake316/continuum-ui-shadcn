import type { Meta, StoryObj } from '@storybook/react-vite'
import { MdAdd, MdDeleteOutline } from 'react-icons/md'

import { ButtonGhost } from './button-ghost'

const meta: Meta<typeof ButtonGhost> = {
  title: 'Components/ButtonGhost',
  component: ButtonGhost,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms?node-id=7602-60726&t=MQTmK7TH8xR7BYtM-0',
    },
    docs: {
      description: {
        component: `Ghost button — transparent background at rest; background fills on hover and focus.

- **variant**: \`primary\` for primary actions · \`secondary\` for supporting actions.
- **size**: \`lg\` (38px) · \`md\` (32px, default) · \`sm\` (26px) for dense toolbars.
- **leftIcon / rightIcon**: slot an icon node before or after the label.
- **loading**: replaces the left icon with a spinner and disables the button.
- **asChild**: renders as the child element (e.g. a Link) instead of a \`<button>\`.`,
      },
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary'] },
    size: { control: 'radio', options: ['lg', 'md', 'sm'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ButtonGhost>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
}

export const WithLeftIcon: Story = {
  render: () => <ButtonGhost leftIcon={<MdAdd size={16} />}>Create</ButtonGhost>,
}

export const WithRightIcon: Story = {
  render: () => (
    <ButtonGhost variant="secondary" rightIcon={<MdDeleteOutline size={16} />}>
      Delete
    </ButtonGhost>
  ),
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Saving…',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ButtonGhost size="sm">Small</ButtonGhost>
      <ButtonGhost size="md">Default</ButtonGhost>
      <ButtonGhost size="lg">Large</ButtonGhost>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ButtonGhost variant="primary">Primary</ButtonGhost>
      <ButtonGhost variant="secondary">Secondary</ButtonGhost>
    </div>
  ),
}
