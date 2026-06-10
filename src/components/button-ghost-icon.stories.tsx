import type { Meta, StoryObj } from '@storybook/react-vite'
import { MdAdd, MdClose, MdMoreVert } from 'react-icons/md'

import { ButtonGhostIcon } from './button-ghost-icon'

const meta: Meta<typeof ButtonGhostIcon> = {
  title: 'Components/ButtonGhostIcon',
  component: ButtonGhostIcon,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms?node-id=17583-4474&p=f&t=RS9jFsyUANIC05d3-0',
    },
    docs: {
      description: {
        component: `Ghost square icon-only button — no border or background on any state. Use for low-emphasis actions in toolbars or dense UI. Pair with \`Tooltip\` for an accessible label.

- **color**: \`primary\` (blue, default) · \`secondary\` (gray).
- **size**: \`xs\` 16px · \`sm\` 26px · \`md\` 32px (default) · \`lg\` 38px.
- Recommended icon sizes: \`lg\` → 30px · \`md\` → 20px · \`sm\` → 18px · \`xs\` → 14px.
- No border on any state. Hover and focus show a light background tint only.`,
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
type Story = StoryObj<typeof ButtonGhostIcon>

export const Primary: Story = {
  args: { color: 'primary', size: 'md', 'aria-label': 'Add' },
  render: (args) => (
    <ButtonGhostIcon {...args}>
      <MdAdd size={20} />
    </ButtonGhostIcon>
  ),
}

export const Secondary: Story = {
  args: { color: 'secondary', size: 'md', 'aria-label': 'More' },
  render: (args) => (
    <ButtonGhostIcon {...args}>
      <MdMoreVert size={20} />
    </ButtonGhostIcon>
  ),
}

export const FocusedStates: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Visual representation of the focused state. Primary: `primary-focus` tint. Secondary: `action-focus` tint. No border on either — background tint only.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <ButtonGhostIcon aria-label="primary focused" className="bg-primary-focus">
          <MdAdd size={20} />
        </ButtonGhostIcon>
        <span className="text-xs text-text-secondary">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <ButtonGhostIcon
          color="secondary"
          aria-label="secondary focused"
          className="bg-action-focus"
        >
          <MdAdd size={20} />
        </ButtonGhostIcon>
        <span className="text-xs text-text-secondary">Secondary</span>
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <ButtonGhostIcon size="xs" aria-label="xs">
        <MdAdd size={14} />
      </ButtonGhostIcon>
      <ButtonGhostIcon size="sm" aria-label="sm">
        <MdAdd size={18} />
      </ButtonGhostIcon>
      <ButtonGhostIcon size="md" aria-label="md">
        <MdAdd size={20} />
      </ButtonGhostIcon>
      <ButtonGhostIcon size="lg" aria-label="lg">
        <MdAdd size={30} />
      </ButtonGhostIcon>
    </div>
  ),
}

export const AllColors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <ButtonGhostIcon color="primary" aria-label="primary">
        <MdAdd size={20} />
      </ButtonGhostIcon>
      <ButtonGhostIcon color="secondary" aria-label="secondary">
        <MdAdd size={20} />
      </ButtonGhostIcon>
    </div>
  ),
}

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <ButtonGhostIcon color="primary" disabled aria-label="primary disabled">
        <MdClose size={20} />
      </ButtonGhostIcon>
      <ButtonGhostIcon color="secondary" disabled aria-label="secondary disabled">
        <MdClose size={20} />
      </ButtonGhostIcon>
    </div>
  ),
}
