import type { Meta, StoryObj } from '@storybook/react-vite'
import { MdAdd, MdDeleteOutline } from 'react-icons/md'

import { ButtonDefault } from './button-default'

const meta: Meta<typeof ButtonDefault> = {
  title: 'Components/ButtonDefault',
  component: ButtonDefault,
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
type Story = StoryObj<typeof ButtonDefault>

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
  render: () => <ButtonDefault leftIcon={<MdAdd size={16} />}>Create</ButtonDefault>,
}

export const WithRightIcon: Story = {
  render: () => (
    <ButtonDefault variant="secondary" rightIcon={<MdDeleteOutline size={16} />}>
      Delete
    </ButtonDefault>
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
      <ButtonDefault size="xs">XSmall</ButtonDefault>
      <ButtonDefault size="sm">Small</ButtonDefault>
      <ButtonDefault size="md">Default</ButtonDefault>
      <ButtonDefault size="lg">Large</ButtonDefault>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ButtonDefault variant="primary">Primary</ButtonDefault>
      <ButtonDefault variant="secondary">Secondary</ButtonDefault>
    </div>
  ),
}
