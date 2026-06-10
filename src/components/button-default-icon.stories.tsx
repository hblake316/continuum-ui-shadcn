import type { Meta, StoryObj } from '@storybook/react-vite'
import { MdAdd, MdClose, MdMoreVert } from 'react-icons/md'

import { ButtonDefaultIcon } from './button-default-icon'

const meta: Meta<typeof ButtonDefaultIcon> = {
  title: 'Components/ButtonDefaultIcon',
  component: ButtonDefaultIcon,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms?node-id=17567-4171&p=f&t=RS9jFsyUANIC05d3-0',
    },
    docs: {
      description: {
        component: `Square icon-only button. Use for toolbar actions, table-row affordances, and dense UI. Pair with \`Tooltip\` for an accessible label.

- **color**: \`primary\` (blue, default) · \`secondary\` (gray).
- **size**: \`xs\` 16px · \`sm\` 26px · \`md\` 32px (default) · \`lg\` 38px.
- Recommended icon sizes: \`lg\` → 30px · \`md\` → 24px · \`sm\` → 20px · \`xs\` → 14px.`,
      },
    },
  },
  argTypes: {
    color: { control: 'radio', options: ['primary', 'secondary'] },
    size: { control: 'radio', options: ['lg', 'md', 'sm', 'xs'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ButtonDefaultIcon>

export const Primary: Story = {
  args: { color: 'primary', size: 'md', 'aria-label': 'Add' },
  render: (args) => (
    <ButtonDefaultIcon {...args}>
      <MdAdd size={24} />
    </ButtonDefaultIcon>
  ),
}

export const Secondary: Story = {
  args: { color: 'secondary', size: 'md', 'aria-label': 'More' },
  render: (args) => (
    <ButtonDefaultIcon {...args}>
      <MdMoreVert size={24} />
    </ButtonDefaultIcon>
  ),
}

export const FocusedStates: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Visual representation of the focused state. Primary: background shifts to `primary-focus` with a dark blue icon, 2px `primary-focus-ring` border. Secondary: background unchanged, 2px `action-focus` border.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <ButtonDefaultIcon
          aria-label="primary focused"
          className="!bg-primary-focus !text-primary ring-2 ring-primary-focus-ring ring-offset-0"
        >
          <MdAdd size={24} />
        </ButtonDefaultIcon>
        <span className="text-xs text-text-secondary">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <ButtonDefaultIcon
          color="secondary"
          aria-label="secondary focused"
          className="ring-2 ring-action-focus ring-offset-0"
        >
          <MdAdd size={24} />
        </ButtonDefaultIcon>
        <span className="text-xs text-text-secondary">Secondary</span>
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <ButtonDefaultIcon size="xs" aria-label="xs">
        <MdAdd size={14} />
      </ButtonDefaultIcon>
      <ButtonDefaultIcon size="sm" aria-label="sm">
        <MdAdd size={20} />
      </ButtonDefaultIcon>
      <ButtonDefaultIcon size="md" aria-label="md">
        <MdAdd size={24} />
      </ButtonDefaultIcon>
      <ButtonDefaultIcon size="lg" aria-label="lg">
        <MdAdd size={30} />
      </ButtonDefaultIcon>
    </div>
  ),
}

export const AllColors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <ButtonDefaultIcon color="primary" aria-label="primary">
        <MdAdd size={24} />
      </ButtonDefaultIcon>
      <ButtonDefaultIcon color="secondary" aria-label="secondary">
        <MdAdd size={24} />
      </ButtonDefaultIcon>
    </div>
  ),
}

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <ButtonDefaultIcon color="primary" disabled aria-label="primary disabled">
        <MdClose size={24} />
      </ButtonDefaultIcon>
      <ButtonDefaultIcon color="secondary" disabled aria-label="secondary disabled">
        <MdClose size={24} />
      </ButtonDefaultIcon>
    </div>
  ),
}
