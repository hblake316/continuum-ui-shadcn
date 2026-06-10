import type { Meta, StoryObj } from '@storybook/react-vite'
import { MdAdd, MdClose, MdMoreVert } from 'react-icons/md'

import { ButtonOutlineIcon } from './button-outline-icon'

const meta: Meta<typeof ButtonOutlineIcon> = {
  title: 'Components/ButtonOutlineIcon',
  component: ButtonOutlineIcon,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/GhfBr6ptdMmkDrLpibdKqn/UI-Kit-All-Apps-Shadcn-Atoms?node-id=17583-1259&p=f&t=RS9jFsyUANIC05d3-0',
    },
    docs: {
      description: {
        component: `Outlined square icon-only button. Use when a lighter visual weight than \`ButtonDefaultIcon\` is needed. Pair with \`Tooltip\` for an accessible label.

- **color**: \`primary\` (blue border, default) · \`secondary\` (gray border).
- **size**: \`xs\` 16px · \`sm\` 26px · \`md\` 32px (default) · \`lg\` 38px.
- Recommended icon sizes: \`lg\` → 30px · \`md\` → 24px · \`sm\` → 18px · \`xs\` → 14px.
- Border is always present: 1px enabled/hover · 2px focused · 0.5px disabled.`,
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
type Story = StoryObj<typeof ButtonOutlineIcon>

export const Primary: Story = {
  args: { color: 'primary', size: 'md', 'aria-label': 'Add' },
  render: (args) => (
    <ButtonOutlineIcon {...args}>
      <MdAdd size={24} />
    </ButtonOutlineIcon>
  ),
}

export const Secondary: Story = {
  args: { color: 'secondary', size: 'md', 'aria-label': 'More' },
  render: (args) => (
    <ButtonOutlineIcon {...args}>
      <MdMoreVert size={24} />
    </ButtonOutlineIcon>
  ),
}

export const FocusedStates: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Visual representation of the focused state. Primary: 2px `primary` border, background unchanged. Secondary: 2px `action` border, background unchanged.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <ButtonOutlineIcon aria-label="primary focused" className="border-2 border-primary">
          <MdAdd size={24} />
        </ButtonOutlineIcon>
        <span className="text-xs text-text-secondary">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <ButtonOutlineIcon
          color="secondary"
          aria-label="secondary focused"
          className="border-2 border-action"
        >
          <MdAdd size={24} />
        </ButtonOutlineIcon>
        <span className="text-xs text-text-secondary">Secondary</span>
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <ButtonOutlineIcon size="xs" aria-label="xs">
        <MdAdd size={14} />
      </ButtonOutlineIcon>
      <ButtonOutlineIcon size="sm" aria-label="sm">
        <MdAdd size={18} />
      </ButtonOutlineIcon>
      <ButtonOutlineIcon size="md" aria-label="md">
        <MdAdd size={24} />
      </ButtonOutlineIcon>
      <ButtonOutlineIcon size="lg" aria-label="lg">
        <MdAdd size={30} />
      </ButtonOutlineIcon>
    </div>
  ),
}

export const AllColors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <ButtonOutlineIcon color="primary" aria-label="primary">
        <MdAdd size={24} />
      </ButtonOutlineIcon>
      <ButtonOutlineIcon color="secondary" aria-label="secondary">
        <MdAdd size={24} />
      </ButtonOutlineIcon>
    </div>
  ),
}

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <ButtonOutlineIcon color="primary" disabled aria-label="primary disabled">
        <MdClose size={24} />
      </ButtonOutlineIcon>
      <ButtonOutlineIcon color="secondary" disabled aria-label="secondary disabled">
        <MdClose size={24} />
      </ButtonOutlineIcon>
    </div>
  ),
}
