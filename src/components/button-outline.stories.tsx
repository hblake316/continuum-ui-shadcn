import type { Meta, StoryObj } from '@storybook/react-vite'
import { MdAdd, MdDeleteOutline } from 'react-icons/md'

import { ButtonOutline } from './button-outline'

const meta: Meta<typeof ButtonOutline> = {
  title: 'Components/ButtonOutline',
  component: ButtonOutline,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms?node-id=7602-60727',
    },
    docs: {
      description: {
        component: `Outlined variant of the action button with a visible border instead of a filled background.

- **variant**: \`primary\` for the main outlined CTA · \`secondary\` for supporting outlined actions.
- **size**: \`lg\` (38px) · \`md\` (32px, default) · \`sm\` (26px) for dense toolbars · \`xs\` (16px) for inline compact actions.
- **leftIcon / rightIcon**: slot an icon node before or after the label.`,
      },
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary'] },
    size: { control: 'radio', options: ['lg', 'md', 'sm', 'xs'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ButtonOutline>

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
  render: () => <ButtonOutline leftIcon={<MdAdd size={16} />}>Create</ButtonOutline>,
}

export const WithRightIcon: Story = {
  render: () => (
    <ButtonOutline variant="secondary" rightIcon={<MdDeleteOutline size={16} />}>
      Delete
    </ButtonOutline>
  ),
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
      <ButtonOutline size="xs">XSmall</ButtonOutline>
      <ButtonOutline size="sm">Small</ButtonOutline>
      <ButtonOutline size="md">Medium</ButtonOutline>
      <ButtonOutline size="lg">Large</ButtonOutline>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ButtonOutline variant="primary">Primary</ButtonOutline>
      <ButtonOutline variant="secondary">Secondary</ButtonOutline>
    </div>
  ),
}
