import type { Meta, StoryObj } from '@storybook/react-vite'

import { LinearProgress } from './progress'

const meta: Meta<typeof LinearProgress> = {
  title: 'Components/Progress/Linear',
  component: LinearProgress,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/IejTYp6kphnHyy3X8QnfTQ/UI-Kit-All-Products-Atoms-variables?node-id=6570-46740&p=f&t=REYypyunqzscArCx-0',
    },
    docs: {
      description: {
        component: `Horizontal progress bar. Use determinate (with \`value\`) for known progress, indeterminate for unknown duration. For inline button-sized indicators use \`CircularProgress\`.`,
      },
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    color: { control: 'radio', options: ['primary', 'secondary'] },
  },
}

export default meta
type Story = StoryObj<typeof LinearProgress>

export const Determinate: Story = {
  args: { value: 65, color: 'primary' },
  render: (args) => (
    <div className="w-80">
      <LinearProgress {...args} />
    </div>
  ),
}

export const Indeterminate: Story = {
  args: { color: 'primary' },
  render: (args) => (
    <div className="w-80">
      <LinearProgress {...args} />
    </div>
  ),
}

export const AllColors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <LinearProgress value={40} color="primary" />
      <LinearProgress value={75} color="secondary" />
    </div>
  ),
}
