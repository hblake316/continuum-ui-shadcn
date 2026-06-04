import type { Meta, StoryObj } from '@storybook/react-vite'
import { MdAdd, MdDeleteOutline } from 'react-icons/md'

import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms?node-id=6543-36744&p=f&t=RS9jFsyUANIC05d3-0',
    },
    docs: {
      description: {
        component: `Single-action button built on shadcn patterns with Radix Slot for polymorphism.

- **variant**: \`primary\` for the main CTA · \`secondary\` for supporting actions.
- **size**: \`default\` (32px) · \`small\` (26px) for dense toolbars · \`large\` (38px) for hero CTAs · \`xsmall\` (16px) for inline compact actions.
- **leftIcon / rightIcon**: slot an icon node before or after the label.
- **loading**: replaces the left icon with a spinner and disables the button.
- **asChild**: renders as the child element (e.g. a Link) instead of a \`<button>\`.`,
      },
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary'] },
    size: { control: 'radio', options: ['lg', 'md', 'sm', 'xs'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

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
  render: () => (
    <Button leftIcon={<MdAdd size={16} />}>Create</Button>
  ),
}

export const WithRightIcon: Story = {
  render: () => (
    <Button variant="secondary" rightIcon={<MdDeleteOutline size={16} />}>
      Delete
    </Button>
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
      <Button size="xs">XSmall</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  ),
}
