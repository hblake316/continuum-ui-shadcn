import type { Meta, StoryObj } from '@storybook/react-vite'

import { SplitButton } from './split-button'

const meta: Meta<typeof SplitButton> = {
  title: 'Components/SplitButton',
  component: SplitButton,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/IejTYp6kphnHyy3X8QnfTQ/UI-Kit-All-Products-Atoms-variables?node-id=6570-46740&p=f&t=REYypyunqzscArCx-0',
    },
    docs: {
      description: {
        component: `Button with a separate dropdown trigger for related secondary actions (e.g. "Save" + "Save as draft"). Use only when the dropdown items are variations of the main action; otherwise pair \`Button\` with a standalone menu.

- Same \`variant\`/\`color\`/\`size\` system as \`Button\`; provide \`onClickMain\` and \`onClickDropdown\` separately.`,
      },
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['contained', 'outlined'] },
    color: {
      control: 'radio',
      options: ['primary', 'error', 'warning', 'info', 'success', 'action'],
    },
    size: { control: 'radio', options: ['lg', 'md', 'sm'] },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof SplitButton>

export const Contained: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'md',
    children: 'Save',
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    children: 'Save',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'contained',
    color: 'error',
    size: 'md',
    children: 'Delete',
  },
}

export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <SplitButton size="sm">Save</SplitButton>
      <SplitButton size="md">Save</SplitButton>
      <SplitButton size="lg">Save</SplitButton>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'md',
    disabled: true,
    children: 'Save',
  },
}
